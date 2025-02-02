export default function SupplyCard({ supply }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">{supply.item}</h3>
        <p className="text-gray-600">Quantity: {supply.quantity}</p>
      </div>
    );
  }