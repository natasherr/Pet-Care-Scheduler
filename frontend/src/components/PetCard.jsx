export default function PetCard({ pet }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">{pet.name}</h3>
        <p className="text-gray-600">{pet.breed}</p>
        <p className="text-gray-600">Age: {pet.age}</p>
      </div>
    );
  }