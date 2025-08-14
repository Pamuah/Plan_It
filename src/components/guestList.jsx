// src/components/GuestList.jsx
import { useState } from "react";

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", rsvp: "Pending" });

  const addGuest = (e) => {
    e.preventDefault();
    setGuests([...guests, { ...form, id: Date.now() }]);
    setForm({ name: "", email: "", rsvp: "Pending" });
  };

  return (
    <div className="p-4 rounded-lg shadow bg-black/80">
      <h2 className="mb-4 text-xl font-bold text-gray-400">Guest List</h2>

      <form onSubmit={addGuest} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          className="w-1/3 p-2 border border-gray-500 rounded placeholder:text-gray-500 "
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-1/3 p-2 border border-gray-500 rounded placeholder:text-gray-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <select
          className="p-2 border border-gray-500 rounded placeholder:text-gray-500"
          value={form.rsvp}
          onChange={(e) => setForm({ ...form, rsvp: e.target.value })}
        >
          <option>Pending</option>
          <option>Yes</option>
          <option>No</option>
        </select>
        <button className="px-4 py-2 text-white bg-orange-500 rounded">
          Add
        </button>
      </form>

      <table className="w-full text-gray-400 border border-collapse ">
        <thead>
          <tr className="">
            <th className="p-2 border border-gray-500">Name</th>
            <th className="p-2 border border-gray-500">Email</th>
            <th className="p-2 border border-gray-500">RSVP</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td className="p-2 border border-gray-500 ">{guest.name}</td>
              <td className="p-2 border border-gray-500">{guest.email}</td>
              <td className="p-2 border border-gray-500">{guest.rsvp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
