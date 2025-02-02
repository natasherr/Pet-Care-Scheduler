import React, { useEffect, useState, useContext } from "react";
import PetCard from "../components/PetCard";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { PetCareContext } from "../context/PetCareContext";
import { UserContext } from "../context/UserContext";

export default function Pets() {
  
  const { pets, addPet, updatePet, deletePet } = useContext(PetCareContext);
  const { current_user } = useContext(UserContext);
  
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [editingPet, setEditingPet] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting pet data:', { name, breed, age });
    if (editingPet) {
      updatePet(name, breed, age, editingPet.pet_id); 
      setEditingPet(null);
    } else {
      addPet(name, breed, age); 
    }
    setName("");
    setBreed(""); 
    setAge("");
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setName(pet.name);
    setBreed(pet.breed);
    setAge(pet.age);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Pets</h2>
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-800 shadow-md rounded-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Pet Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Pet Age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              required
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Pet Breed" 
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
              className="border border-gray-600 rounded-lg p-2 mr-2 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {editingPet ? "Update Pet" : "Add Pet"}
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {pets && pets.length > 0 ? (
    pets.map((pet) => (
      <div key={pet.pet_id} className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
        <PetCard pet={pet} />
        <div className="mt-4 flex space-x-2">
          <button 
            onClick={() => handleEdit(pet)} 
            className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            Edit
          </button>
          <button 
            onClick={() => deletePet(pet.pet_id)} 
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-white text-center col-span-full">No pets found</p>
  )}
</div>
      </div>
    </div>
  );
}