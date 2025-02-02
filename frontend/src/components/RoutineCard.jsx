export default function RoutineCard({ routine }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">{routine.type}</h3>
        <p className="text-gray-600">Date: {new Date(routine.routine_date).toLocaleString()}</p>
      </div>
    );
  }