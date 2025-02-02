import { useEffect, useState, useContext } from "react";
import RoutineCard from "../components/RoutineCard";
import { toast } from "react-toastify";
import { PetCareContext } from "../context/PetCareContext";
import { UserContext } from "../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

export default function Routines() {
  const { routines, addRoutine, updateRoutine, deleteRoutine } = useContext(PetCareContext);
  const { current_user } = useContext(UserContext);

  const [pet, setPet] = useState("");
  const [routineDate, setRoutineDate] = useState("");
  const [type, setType] = useState("");
  const [editingRoutine, setEditingRoutine] = useState(null);

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
    const formattedDate = formatDate(routineDate); // Format the routine date

    if (editingRoutine) {
      updateRoutine(pet, formattedDate, type, editingRoutine.routine_id);
      toast.success("Routine updated successfully!");
      setEditingRoutine(null);
    } else {
      addRoutine(pet, formattedDate, type);
      toast.success("Routine added successfully!");
    }
    setPet("");
    setRoutineDate("");
    setType("");
  };

  const handleEdit = (routine) => {
    setEditingRoutine(routine);
    setPet(routine.pet);
    
    // Format the routine date to yyyy-MM-dd
    const date = new Date(routine.routine_date);
    const formattedDate = date.toISOString().split("T")[0]; // Get the date in yyyy-MM-dd format
    setRoutineDate(formattedDate);
    
    setType(routine.type);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Routines</h2>
        
        {/* Routine Form */}
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-800 shadow-md rounded-lg">
          <div className="mb-4">
            <input
              type="text"
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
              placeholder="Routine Date"
              value={routineDate}
              onChange={(e) => setRoutineDate(e.target.value)}
              required
              min={today} // Set the minimum date to today
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Routine Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {editingRoutine ? "Update Routine" : "Add Routine"}
          </button>
        </form>

        {/* Routine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routines.map((routine) => (
            <div key={routine.routine_id} className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
              <RoutineCard routine={routine} />
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => handleEdit(routine)} 
                  className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button 
                  onClick={() => {
                    deleteRoutine(routine.routine_id);
                    toast.success("Routine deleted successfully!");
                  }} 
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