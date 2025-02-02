import { useEffect, useState, useContext } from "react";
import SupplyCard from "../components/SupplyCard";
import { toast } from "react-toastify";
import { PetCareContext } from "../context/PetCareContext";
import { UserContext } from "../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

export default function Supplies() {
  const { supplies, addSupply, updateSupply, deleteSupply } = useContext(PetCareContext);
  const { current_user } = useContext(UserContext);

  const [pet, setPet] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingSupply, setEditingSupply] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingSupply) {
      updateSupply(pet, item, quantity, editingSupply.supply_id);
      toast.success("Supply updated successfully!");
      setEditingSupply(null);
    } else {
      addSupply(pet, item, quantity);
      toast.success("Supply added successfully!");
    }
    setPet("");
    setItem("");
    setQuantity("");
  };

  const handleEdit = (supply) => {
    setEditingSupply(supply);
    setPet(supply.pet);
    setItem(supply.item);
    setQuantity(supply.quantity);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Supplies</h2>
        
        {/* Supply Form */}
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
              type="text"
              placeholder="Supply Item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {editingSupply ? "Update Supply" : "Add Supply"}
          </button>
        </form>

        {/* Supply Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplies.map((supply) => (
            <div key={supply.supply_id} className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
              <SupplyCard supply={supply} />
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => handleEdit(supply)} 
                  className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button 
                  onClick={() => {
                    deleteSupply(supply.supply_id);
                    toast.success("Supply deleted successfully!");
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