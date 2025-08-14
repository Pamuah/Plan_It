// src/components/BudgetTracker.jsx
import { useState } from "react";

export default function BudgetTracker() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ category: "", cost: "" });

  const totalCost = expenses.reduce(
    (sum, e) => sum + parseFloat(e.cost || 0),
    0
  );

  const addExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...form, id: Date.now() }]);
    setForm({ category: "", cost: "" });
  };

  return (
    <div className="p-4 text-gray-400 bg-black rounded-lg shadow">
      <h2 className="mb-4 text-xl font-bold text-purple-500">Budget Tracker</h2>

      <form onSubmit={addExpense} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Category"
          className="w-1/2 p-2 border rounded placeholder:text-gray-500"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cost"
          className="w-1/4 p-2 border rounded placeholder:text-gray-500"
          value={form.cost}
          onChange={(e) => setForm({ ...form, cost: e.target.value })}
        />
        <button className="px-4 py-2 text-white bg-purple-500 rounded">
          Add
        </button>
      </form>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category} - ${expense.cost}
          </li>
        ))}
      </ul>

      <p className="mt-4 font-bold">Total: ${totalCost.toFixed(2)}</p>
    </div>
  );
}
