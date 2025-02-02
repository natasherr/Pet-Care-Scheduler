import { useEffect, useState, useContext } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { toast } from "react-toastify"; 
import { PetCareContext } from "../context/PetCareContext";
import { UserContext } from "../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

export default function Appointments() {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useContext(PetCareContext);
  const { current_user } = useContext(UserContext);

  const [pet, setPet] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Function to format the date
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formatDate(appointmentDate); // Format the appointment date

    if (editingAppointment) {
      updateAppointment(pet, formattedDate, type, status, editingAppointment.appointment_id);
      setEditingAppointment(null);
    } else {
      addAppointment(pet, formattedDate, type, status);
    }
    setPet("");
    setAppointmentDate("");
    setType("");
    setStatus("Scheduled");
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setPet(appointment.pet);
    
    // Format the appointment date to yyyy-MM-dd
    const date = new Date(appointment.appointment_date);
    const formattedDate = date.toISOString().split("T")[0]; // Get the date in yyyy-MM-dd format
    setAppointmentDate(formattedDate);
    
    setType(appointment.type);
    setStatus(appointment.status);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Appointments</h2>
        
        {/* Appointment Form */}
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-800 shadow-md rounded-lg">
          <div className="mb-4">
            <input
              type="number"
              placeholder="Pet ID"
              value={pet}
              onChange={(e) => setPet(e.target.value)}
              required
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
              min={today} // Set the minimum date to today
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Appointment Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {editingAppointment ? "Update Appointment" : "Add Appointment"}
          </button>
        </form>

        {/* Appointment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div key={appointment.appointment_id} className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
              <AppointmentCard appointment={appointment} />
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => handleEdit(appointment)} 
                  className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteAppointment(appointment.appointment_id)} 
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}