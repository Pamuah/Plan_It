// src/components/Timeline.jsx
import { useState } from "react";
import { LucidePlus } from "lucide-react";

export default function Timeline() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", time: "" });

  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...form, id: Date.now() }]);
    setForm({ title: "", time: "" });
  };

  return (
    <div className="p-4 text-gray-400 bg-black rounded-lg shadow">
      <h2 className="mb-4 text-xl font-bold text-green-500">Event Timeline</h2>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Task"
          className="w-1/2 p-2 border rounded placeholder:text-gray-500"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <button className="px-4 py-2 text-white bg-green-500 rounded">
          Add
        </button>
      </form>

      <ul className="pl-6 list-disc">
        {tasks.map((task) => (
          <li key={task.id}>
            <span className="font-bold">{task.time}</span> - {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
