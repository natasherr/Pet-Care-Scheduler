export default function AppointmentCard({ appointment }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">{appointment.type}</h3>
        <p className="text-gray-600">Date: {new Date(appointment.appointment_date).toLocaleString()}</p>
        <p className="text-gray-600">Status: {appointment.status}</p>
      </div>
    );
  }