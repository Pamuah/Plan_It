import { useState, useMemo } from "react";

const CATEGORIES = [
  "Venue",
  "Catering",
  "Decorations",
  "Entertainment",
  "Photography",
  "Transport",
  "Attire",
  "Invitations",
  "Other",
];

const STATUS_STYLES = {
  Paid: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Pending: "bg-amber-100 text-amber-700 border border-amber-200",
};

export default function BudgetTracker() {
  const [budget, setBudget] = useState("");
  const [editingBudget, setEB] = useState(false);
  const [budgetInput, setBI] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    category: "",
    description: "",
    cost: "",
    status: "Pending",
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [filterCat, setFilterCat] = useState("All");

  const totalSpent = useMemo(
    () => expenses.reduce((s, e) => s + parseFloat(e.cost || 0), 0),
    [expenses],
  );
  const totalPaid = useMemo(
    () =>
      expenses
        .filter((e) => e.status === "Paid")
        .reduce((s, e) => s + parseFloat(e.cost || 0), 0),
    [expenses],
  );
  const remaining = budget ? parseFloat(budget) - totalSpent : null;
  const pct = budget
    ? Math.min((totalSpent / parseFloat(budget)) * 100, 100)
    : 0;

  const validate = () => {
    const e = {};
    if (!form.category) e.category = "Select a category.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.cost || isNaN(form.cost) || parseFloat(form.cost) <= 0)
      e.cost = "Enter a valid amount.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    if (editId !== null) {
      setExpenses(
        expenses.map((e) => (e.id === editId ? { ...form, id: editId } : e)),
      );
      setEditId(null);
    } else {
      setExpenses([...expenses, { ...form, id: Date.now() }]);
    }
    setForm({ category: "", description: "", cost: "", status: "Pending" });
    setErrors({});
  };

  const deleteExpense = (id) =>
    setExpenses(expenses.filter((e) => e.id !== id));
  const startEdit = (exp) => {
    setForm({ ...exp });
    setEditId(exp.id);
    setErrors({});
  };
  const toggleStatus = (id) =>
    setExpenses(
      expenses.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "Paid" ? "Pending" : "Paid" }
          : e,
      ),
    );

  const displayed =
    filterCat === "All"
      ? expenses
      : expenses.filter((e) => e.category === filterCat);

  const inputCls = (field) =>
    `w-full px-3 py-2 text-sm border rounded-md bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
      errors[field] ? "border-red-400" : "border-slate-200"
    }`;

  // Breakdown by category
  const breakdown = useMemo(() => {
    const map = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + parseFloat(e.cost || 0);
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  return (
    <div className="space-y-6">
      {/* ── Budget Overview ── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Budget",
            value: budget ? `$${parseFloat(budget).toLocaleString()}` : "—",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Total Spent",
            value: `$${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            color: "text-slate-800",
            bg: "bg-slate-50",
          },
          {
            label: "Paid",
            value: `$${totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Remaining",
            value:
              remaining !== null
                ? `$${remaining.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                : "—",
            color:
              remaining !== null && remaining < 0
                ? "text-red-500"
                : "text-blue-600",
            bg:
              remaining !== null && remaining < 0 ? "bg-red-50" : "bg-blue-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`${s.bg} rounded-xl px-5 py-4 border border-slate-100`}
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Budget Progress Bar ── */}
      {budget && (
        <div className="p-5 bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium text-slate-600">Budget Used</span>
            <span
              className={`font-bold ${pct >= 90 ? "text-red-500" : pct >= 70 ? "text-amber-500" : "text-emerald-600"}`}
            >
              {pct.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-400" : "bg-emerald-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          {remaining < 0 && (
            <p className="mt-2 text-xs font-medium text-red-500">
              ⚠ Over budget by ${Math.abs(remaining).toFixed(2)}
            </p>
          )}
        </div>
      )}

      {/* ── Set Budget ── */}
      <div className="flex items-center gap-4 p-5 bg-white border shadow-sm rounded-xl border-slate-200">
        <span className="text-sm font-semibold text-slate-600">
          Total Budget:
        </span>
        {editingBudget ? (
          <>
            <input
              type="number"
              placeholder="Enter total budget"
              className="flex-1 px-3 py-2 text-sm border rounded-md border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={budgetInput}
              onChange={(e) => setBI(e.target.value)}
            />
            <button
              onClick={() => {
                setBudget(budgetInput);
                setEB(false);
              }}
              className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
            >
              Set
            </button>
            <button
              onClick={() => setEB(false)}
              className="px-4 py-2 text-sm transition rounded-md cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="flex-1 text-lg font-bold text-slate-800">
              {budget ? `$${parseFloat(budget).toLocaleString()}` : "Not set"}
            </span>
            <button
              onClick={() => {
                setBI(budget);
                setEB(true);
              }}
              className="px-4 py-2 text-sm transition rounded-md cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              {budget ? "Edit" : "Set Budget"}
            </button>
          </>
        )}
      </div>

      {/* ── Add Expense Form ── */}
      <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
        <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-slate-600">
          {editId !== null ? "Edit Expense" : "Add Expense"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          <div>
            <select
              className={inputCls("category")}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category *</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-red-500">{errors.category}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Description *"
              className={inputCls("description")}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              placeholder="Amount (USD) *"
              className={inputCls("cost")}
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
            />
            {errors.cost && (
              <p className="mt-1 text-xs text-red-500">{errors.cost}</p>
            )}
          </div>
          <div className="flex gap-3">
            <select
              className={`flex-1 ${inputCls("status")}`}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Pending</option>
              <option>Paid</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
            >
              {editId !== null ? "Save" : "Add"}
            </button>
            {editId !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm({
                    category: "",
                    description: "",
                    cost: "",
                    status: "Pending",
                  });
                  setErrors({});
                }}
                className="px-4 py-2 text-sm transition rounded-md cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── Filter by Category ── */}
      {expenses.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {[
            "All",
            ...CATEGORIES.filter((c) => expenses.some((e) => e.category === c)),
          ].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition cursor-pointer ${
                filterCat === c
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* ── Expense List ── */}
      <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
        {displayed.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <svg
              className="w-10 h-10 mx-auto mb-3 opacity-40"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
            <p className="text-sm font-medium">No expenses yet</p>
            <p className="mt-1 text-xs">Add your first expense above.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 border-slate-200">
                {["Category", "Description", "Amount", "Status", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-xs font-semibold tracking-wider text-left uppercase text-slate-500"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayed.map((exp) => (
                <tr
                  key={exp.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-700">
                    {exp.description}
                  </td>
                  <td className="px-5 py-3 font-semibold text-slate-800">
                    $
                    {parseFloat(exp.cost).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleStatus(exp.id)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full transition cursor-pointer ${STATUS_STYLES[exp.status]}`}
                    >
                      {exp.status}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(exp)}
                        className="transition cursor-pointer text-slate-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="transition cursor-pointer text-slate-400 hover:text-red-500"
                        title="Delete"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t bg-slate-50 border-slate-200">
                <td
                  colSpan={2}
                  className="px-5 py-3 text-sm font-bold text-slate-700"
                >
                  Total
                </td>
                <td className="px-5 py-3 text-sm font-bold text-slate-800">
                  $
                  {displayed
                    .reduce((s, e) => s + parseFloat(e.cost || 0), 0)
                    .toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* ── Category Breakdown ── */}
      {breakdown.length > 0 && (
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-slate-600">
            Spending by Category
          </h3>
          <div className="space-y-3">
            {breakdown.map(([cat, amount]) => {
              const pct = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-slate-600">{cat}</span>
                    <span className="font-bold text-slate-800">
                      $
                      {amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}{" "}
                      <span className="text-xs font-normal text-slate-400">
                        ({pct.toFixed(1)}%)
                      </span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full transition-all duration-500 bg-blue-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
