import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

// This function will format the date to the required string format.
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const PetCareContext = createContext();

export const PetCareProvider = ({ children }) => 
  {
    const navigate = useNavigate()
    const {authToken} = useContext(UserContext)
    
    const [pets, setPets] = useState([])
    const [appointments, setAppointments] = useState([])
    const [routines, setRoutines] = useState([])
    const [supplies, setSupplies] = useState([])


    const [onChange, setOnchange] = useState(true)

// ===================================FETCH=============================================
    // Fetch Pets
    useEffect(()=>{
        fetch('https://pet-care-scheduler.onrender.com/pets',{
                method:"GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            .then((response) => response.json())
            .then((response) => {
            setPets(response)
            });
   }, [])


//    Fetch Appointments
   useEffect(()=>{
    fetch('https://pet-care-scheduler.onrender.com/appointments',{
            method:"GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then((response) => response.json())
        .then((response) => {
        setAppointments(response)
        });
   }, [])
   
   //    Fetch Routines
   useEffect(()=>{
    fetch('https://pet-care-scheduler.onrender.com/routines',{
        method:"GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${authToken}`
            }
            })
        .then((response) => response.json())
        .then((response) => {
            setRoutines(response)
            });
            }, [])
        
    
    // Fetch Supplies
    useEffect(()=>{
        fetch('https://pet-care-scheduler.onrender.com/supplies',{
                method:"GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            .then((response) => response.json())
            .then((response) => {
            setSupplies(response)
            });
   }, [])


    // ================================ ADD ====================================

    // Add Pet
    const addPet = (name, breed, age) => 
    {

        toast.loading("Adding Pet ... ")
        fetch("https://pet-care-scheduler.onrender.com/pets/add",{
            method:"POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`

                },
            body: JSON.stringify({
                name, breed, age
            })
        })
        .then((resp)=>resp.json())
        .then((response)=>{
            console.log(response);
            
            if(response.success){
                toast.dismiss()
                toast.success(response.success)
                setOnchange(!onChange)
            }
            else if(response.error){
                toast.dismiss()
                toast.error(response.error)

            }
            else{
                toast.dismiss()
                toast.success("Pet added successfully!")

            }
            
        })
    }

    // Add Appointment
    const addAppointment = (pet, appointment_date, type, status) => 
        {
            const formattedDate = formatDate(appointment_date)
    
            toast.loading("Adding Appointment ... ")
            fetch("https://pet-care-scheduler.onrender.com/appointments",{
                method:"POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`

                    },
                body: JSON.stringify({
                    pet: pet,
                    appointment_date : formattedDate,
                    type : type,
                    status: status
                })
            })
            .then((resp)=>resp.json())
            .then((response)=>{
                console.log(response);
                
                if(response.success){
                    toast.dismiss()
                    toast.success(response.success)
                    setOnchange(!onChange)
                }
                else if(response.error){
                    toast.dismiss()
                    toast.error(response.error)
    
                }
                else{
                    toast.dismiss()
                    toast.error("Failed to add")
    
                }
                
            })
        }


    // Add Routine
    const addRoutine = (pet, routine_date, type) => 
        {
    
            toast.loading("Adding Routine ... ")
            fetch("https://pet-care-scheduler.onrender.com/routines",{
                method:"POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`

                    },
                body: JSON.stringify({
                    pet, routine_date, type
                })
            })
            .then((resp)=>resp.json())
            .then((response)=>{
                console.log(response);
                
                if(response.success){
                    toast.dismiss()
                    toast.success(response.success)
                    setOnchange(!onChange)
                }
                else if(response.error){
                    toast.dismiss()
                    toast.error(response.error)
    
                }
                else{
                    toast.dismiss()
                    toast.success("Routine added successfully!")
    
                }
                
            })
        }

    
    // Add a supply
    const addSupply = (pet, item , quantity) => 
        {
    
            toast.loading("Adding Supply ... ")
            fetch("https://pet-care-scheduler.onrender.com/supplies",{
                method:"POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`

                    },
                body: JSON.stringify({
                    pet,item, quantity
                })
            })
            .then((resp)=>resp.json())
            .then((response)=>{
                console.log(response);
                
                if(response.success){
                    toast.dismiss()
                    toast.success(response.success)
                    setOnchange(!onChange)
                }
                else if(response.error){
                    toast.dismiss()
                    toast.error(response.error)
    
                }
                else{
                    toast.dismiss()
                    toast.success("Supply successfully added!!")
    
                }
                
            })
        }


// ==========================================================================UPDATE===============================================================================

    const updatePet = (name, breed, age, pet_id) => {
        toast.loading("Updating Pet ... ");
        fetch(`https://pet-care-scheduler.onrender.com/pets/update/${pet_id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                name,
                breed,
                age
            })
        })
        .then((resp) => resp.json())
        .then((response) => {
            console.log(response);
            
            if (response.message) {
                toast.dismiss();
                toast.success(response.message);
                setOnchange(!onChange);
            } else if (response.error) {
                toast.dismiss();
                toast.error(response.error);
            } else {
                toast.dismiss();
                toast.error("Failed to update");
            }
        });
    }

   // Update Appointment
    const updateAppointment = (appointment_id, pet, appointment_date, type, status) => {
        toast.loading("Updating Appointment ... ");
        fetch(`https://pet-care-scheduler.onrender.com/appointments/${appointment_id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                pet,
                appointment_date,
                type,
                status
            })
        })
        .then((resp) => resp.json())
        .then((response) => {
            console.log(response);
            if (response.message) {
                toast.dismiss();
                toast.success(response.message);
                setOnchange(!onChange);
            } else if (response.error) {
                toast.dismiss();
                toast.error(response.error);
            } else {
                toast.dismiss();
                toast.error("Failed to update");
            }
        });
    } 

    // Update Supply
    const updateSupply = (supply_id, pet, item, quantity) => {
        toast.loading("Updating Supply ... ");
        fetch(`https://pet-care-scheduler.onrender.com/supplies/${supply_id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                pet,
                item,
                quantity
            })
        })
        .then((resp) => resp.json())
        .then((response) => {
            console.log(response);
            if (response.message) {
                toast.dismiss();
                toast.success(response.message);
                setOnchange(!onChange);
            } else if (response.error) {
                toast.dismiss();
                toast.error(response.error);
            } else {
                toast.dismiss();
                toast.error("Failed to update");
            }
        });
    }

    // Update Routine
    const updateRoutine = (routine_id, pet, routine_date, type) => {
        toast.loading("Updating Routine ... ");
        fetch(`https://pet-care-scheduler.onrender.com/routines/${routine_id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                pet,
                routine_date,
                type
            })
        })
        .then((resp) => resp.json())
        .then((response) => {
            console.log(response);
            if (response.message) {
                toast.dismiss();
                toast.success(response.message);
                setOnchange(!onChange);
            } else if (response.error) {
                toast.dismiss();
                toast.error(response.error);
            } else {
                toast.dismiss();
                toast.error("Failed to update");
            }
        });
    }

// ================================================================================DELETE======================================================================================
    // Delete Pet 
    const deletePet = (pet_id) => 
    {
        toast.loading("Deleting pet ... ")
        fetch(`https://pet-care-scheduler.onrender.com/pets/delete/${pet_id}`,{
            method:"DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`

              }
        })
        .then((resp)=>resp.json())
        .then((response)=>{
            
            if(response.success){
                toast.dismiss()
                toast.success(response.success)
                setOnchange(!onChange)
                navigate("/")

            }
            else if(response.error){
                toast.dismiss()
                toast.error(response.error)

            }
            else{
                toast.dismiss()
                toast.success("Pet deleted successfully!")

            }    
        })
    }


    // Delete Appointment
    const deleteAppointment = (appointment_id) => 
        {
            toast.loading("Deleting todo ... ")
            fetch(`https://pet-care-scheduler.onrender.com/appointments/${appointment_id}`,{
                method:"DELETE",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
    
                  }
            })
            .then((resp)=>resp.json())
            .then((response)=>{
                
                if(response.success){
                    toast.dismiss()
                    toast.success(response.success)
                    setOnchange(!onChange)
                    navigate("/appointments")
    
                }
                else if(response.error){
                    toast.dismiss()
                    toast.error(response.error)
    
                }
                else{
                    toast.dismiss()
                    toast.error("Failed to delete")
    
                }
              
                
            })
        }
    
        // Delete Routine
        const deleteRoutine = (routine_id) => 
            {
                toast.loading("Deleting todo ... ")
                fetch(`https://pet-care-scheduler.onrender.com/routines/${routine_id}`,{
                    method:"DELETE",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
        
                      }
                })
                .then((resp)=>resp.json())
                .then((response)=>{
                    
                    if(response.success){
                        toast.dismiss()
                        toast.success(response.success)
                        setOnchange(!onChange)
                        navigate("/routines")
        
                    }
                    else if(response.error){
                        toast.dismiss()
                        toast.error(response.error)
        
                    }
                    else{
                        toast.dismiss()
                        toast.error("Failed to delete")
        
                    }
                  
                    
                })
            }

            // Delete Supply
            const deleteSupply = (supply_id) => 
                {
                    toast.loading("Deleting todo ... ")
                    fetch(`https://pet-care-scheduler.onrender.com/supplies/${supply_id}`,{
                        method:"DELETE",
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
            
                          }
                    })
                    .then((resp)=>resp.json())
                    .then((response)=>{
                        
                        if(response.success){
                            toast.dismiss()
                            toast.success(response.success)
                            setOnchange(!onChange)
                            navigate("/supplies")
            
                        }
                        else if(response.error){
                            toast.dismiss()
                            toast.error(response.error)
            
                        }
                        else{
                            toast.dismiss()
                            toast.success("Supply deleted successfully!!")
            
                        }
                      
                        
                    })
                }

                
            
  const data = {
    pets,
    appointments,
    routines,
    supplies,

    addPet,
    addAppointment,
    addRoutine,
    addSupply,

    updatePet,
    updateAppointment,
    updateSupply,
    updateRoutine,

    deletePet,
    deleteAppointment,
    deleteRoutine,
    deleteSupply,
  }

  return (
  <PetCareContext.Provider value={data}>
      {children}
  </PetCareContext.Provider>)
}
