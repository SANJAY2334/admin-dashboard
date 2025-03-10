import { useEffect, useState } from "react";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  const handleClick = (status) => {
    setSelectedStatus(status);
    setFilteredTickets(tickets.filter((ticket) => ticket.status === status));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tickets</h1>
      <div className="grid grid-cols-3 gap-6">
        {["Received", "Resolved", "Pending"].map((status) => (
          <div
            key={status}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
            onClick={() => handleClick(status)}
          >
            <h2 className="text-xl font-semibold">{status} Tickets</h2>
            <p className="text-4xl mt-2">
              {tickets.filter((ticket) => ticket.status === status).length}
            </p>
          </div>
        ))}
      </div>

      {selectedStatus && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{selectedStatus} Tickets</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket._id} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">{ticket.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{ticket.status}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(ticket.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tickets;
