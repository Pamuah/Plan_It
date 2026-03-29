import { useState, useMemo } from "react";

const RSVP_STYLES = {
  Yes: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  No: "bg-red-100 text-red-600 border border-red-200",
  Pending: "bg-amber-100 text-amber-700 border border-amber-200",
};

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rsvp: "Pending",
    phone: "",
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (guests.some((g) => g.email === form.email && g.id !== editId))
      e.email = "Email already added.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Add / Save ───────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (editId !== null) {
      setGuests(
        guests.map((g) => (g.id === editId ? { ...form, id: editId } : g)),
      );
      setEditId(null);
    } else {
      setGuests([...guests, { ...form, id: Date.now() }]);
    }
    setForm({ name: "", email: "", rsvp: "Pending", phone: "" });
    setErrors({});
  };

  // ── Edit ─────────────────────────────────────────────────────────────────
  const startEdit = (guest) => {
    setForm({
      name: guest.name,
      email: guest.email,
      rsvp: guest.rsvp,
      phone: guest.phone || "",
    });
    setEditId(guest.id);
    setErrors({});
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const deleteGuest = (id) => setGuests(guests.filter((g) => g.id !== id));

  // ── RSVP Quick-update ────────────────────────────────────────────────────
  const updateRsvp = (id, rsvp) =>
    setGuests(guests.map((g) => (g.id === id ? { ...g, rsvp } : g)));

  // ── Filtered list ────────────────────────────────────────────────────────
  const displayed = useMemo(() => {
    return guests.filter((g) => {
      const matchSearch =
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.email.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "All" || g.rsvp === filter;
      return matchSearch && matchFilter;
    });
  }, [guests, search, filter]);

  // ── Stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: guests.length,
      yes: guests.filter((g) => g.rsvp === "Yes").length,
      no: guests.filter((g) => g.rsvp === "No").length,
      pending: guests.filter((g) => g.rsvp === "Pending").length,
    }),
    [guests],
  );

  const inputCls = (field) =>
    `w-full px-3 py-2 text-sm border rounded-md bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
      errors[field] ? "border-red-400" : "border-slate-200"
    }`;

  return (
    <div className="space-y-6">
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Guests",
            value: stats.total,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Attending",
            value: stats.yes,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Not Attending",
            value: stats.no,
            color: "text-red-500",
            bg: "bg-red-50",
          },
          {
            label: "Pending",
            value: stats.pending,
            color: "text-amber-600",
            bg: "bg-amber-50",
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

      {/* ── Add / Edit Form ── */}
      <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
        <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-slate-600">
          {editId !== null ? "Edit Guest" : "Add Guest"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          <div>
            <input
              type="text"
              placeholder="Full Name *"
              className={inputCls("name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address *"
              className={inputCls("email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <input
            type="tel"
            placeholder="Phone (optional)"
            className={inputCls("phone")}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <div className="flex gap-3">
            <select
              className={`flex-1 ${inputCls("rsvp")}`}
              value={form.rsvp}
              onChange={(e) => setForm({ ...form, rsvp: e.target.value })}
            >
              <option>Pending</option>
              <option>Yes</option>
              <option>No</option>
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
                  setForm({ name: "", email: "", rsvp: "Pending", phone: "" });
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

      {/* ── Search + Filter ── */}
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search by name or email…"
          className="flex-1 px-3 py-2 text-sm bg-white border rounded-md border-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {["All", "Yes", "No", "Pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
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
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            <p className="text-sm font-medium">No guests found</p>
            <p className="mt-1 text-xs">
              Add a guest above or adjust your filters.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 border-slate-200">
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left uppercase text-slate-500">
                  Name
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left uppercase text-slate-500">
                  Email
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left uppercase text-slate-500">
                  Phone
                </th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left uppercase text-slate-500">
                  RSVP
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayed.map((guest) => (
                <tr
                  key={guest.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="px-5 py-3 font-medium text-slate-800">
                    {guest.name}
                  </td>
                  <td className="px-5 py-3 text-slate-500">{guest.email}</td>
                  <td className="px-5 py-3 text-slate-400">
                    {guest.phone || "—"}
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={guest.rsvp}
                      onChange={(e) => updateRsvp(guest.id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${RSVP_STYLES[guest.rsvp]}`}
                    >
                      <option>Pending</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(guest)}
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
                        onClick={() => deleteGuest(guest.id)}
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
          </table>
        )}
      </div>

      {guests.length > 0 && (
        <p className="text-xs text-right text-slate-400">
          Showing {displayed.length} of {guests.length} guest
          {guests.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
