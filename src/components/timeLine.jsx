import { useState, useMemo } from "react";

const PRIORITY_STYLES = {
  High: {
    badge: "bg-red-100 text-red-600 border border-red-200",
    dot: "bg-red-500",
  },
  Medium: {
    badge: "bg-amber-100 text-amber-600 border border-amber-200",
    dot: "bg-amber-400",
  },
  Low: {
    badge: "bg-slate-100 text-slate-500 border border-slate-200",
    dot: "bg-slate-400",
  },
};

const STATUS_STYLES = {
  "Not Started": "bg-slate-100 text-slate-500 border border-slate-200",
  "In Progress": "bg-blue-100 text-blue-600 border border-blue-200",
  Done: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

export default function Timeline() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    priority: "Medium",
    status: "Not Started",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.date) e.date = "Date is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    if (editId !== null) {
      setTasks(
        tasks.map((t) => (t.id === editId ? { ...form, id: editId } : t)),
      );
      setEditId(null);
    } else {
      setTasks([...tasks, { ...form, id: Date.now() }]);
    }
    setForm({
      title: "",
      date: "",
      time: "",
      priority: "Medium",
      status: "Not Started",
      notes: "",
    });
    setErrors({});
    setShowForm(false);
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const startEdit = (task) => {
    setForm({ ...task });
    setEditId(task.id);
    setErrors({});
    setShowForm(true);
  };
  const cycleStatus = (id) => {
    const steps = ["Not Started", "In Progress", "Done"];
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status: steps[(steps.indexOf(t.status) + 1) % steps.length],
            }
          : t,
      ),
    );
  };

  // Sort by date then time
  const sorted = useMemo(() => {
    return [...tasks]
      .filter((t) => filter === "All" || t.status === filter)
      .sort((a, b) => {
        const da = new Date(`${a.date}T${a.time || "00:00"}`);
        const db = new Date(`${b.date}T${b.time || "00:00"}`);
        return da - db;
      });
  }, [tasks, filter]);

  // Group by date
  const grouped = useMemo(() => {
    const map = {};
    sorted.forEach((t) => {
      (map[t.date] = map[t.date] || []).push(t);
    });
    return Object.entries(map).sort(([a], [b]) => new Date(a) - new Date(b));
  }, [sorted]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      done: tasks.filter((t) => t.status === "Done").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      upcoming: tasks.filter((t) => t.status === "Not Started").length,
    }),
    [tasks],
  );

  const inputCls = (field) =>
    `w-full px-3 py-2 text-sm border rounded-md bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
      errors[field] ? "border-red-400" : "border-slate-200"
    }`;

  const formatDate = (d) => {
    if (!d) return "";
    const dt = new Date(d + "T12:00:00");
    return dt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isOverdue = (task) => {
    if (task.status === "Done") return false;
    const now = new Date();
    const dt = new Date(`${task.date}T${task.time || "23:59"}`);
    return dt < now;
  };

  return (
    <div className="space-y-6">
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Tasks",
            value: stats.total,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Completed",
            value: stats.done,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Not Started",
            value: stats.upcoming,
            color: "text-slate-600",
            bg: "bg-slate-50",
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

      {/* ── Progress Bar ── */}
      {tasks.length > 0 && (
        <div className="p-5 bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium text-slate-600">Overall Progress</span>
            <span className="font-bold text-blue-600">
              {((stats.done / stats.total) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full transition-all duration-500 bg-blue-500 rounded-full"
              style={{ width: `${(stats.done / stats.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Add Task Button ── */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", "Not Started", "In Progress", "Done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition cursor-pointer ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({
              title: "",
              date: "",
              time: "",
              priority: "Medium",
              status: "Not Started",
              notes: "",
            });
            setErrors({});
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Task
        </button>
      </div>

      {/* ── Add / Edit Form ── */}
      {showForm && (
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-slate-600">
            {editId !== null ? "Edit Task" : "New Task"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Task Title *"
                className={inputCls("title")}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>
            <div>
              <input
                type="date"
                className={inputCls("date")}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-500">{errors.date}</p>
              )}
            </div>
            <input
              type="time"
              className={inputCls("time")}
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
            <select
              className={inputCls("priority")}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select
              className={inputCls("status")}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <div className="md:col-span-2">
              <textarea
                rows={2}
                placeholder="Notes (optional)"
                className={inputCls("notes")}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
              >
                {editId !== null ? "Save" : "Add Task"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setErrors({});
                }}
                className="px-4 py-2 text-sm transition rounded-md cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Timeline ── */}
      {grouped.length === 0 ? (
        <div className="py-16 text-center bg-white border shadow-sm rounded-xl border-slate-200 text-slate-400">
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5m-9-6h.008v.008H12V13.5zm0 3h.008v.008H12v-.008zm-3 0h.008v.008H9v-.008zm6 0h.008v.008H15v-.008z"
            />
          </svg>
          <p className="text-sm font-medium">No tasks yet</p>
          <p className="mt-1 text-xs">
            Click "Add Task" to build your event timeline.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(([date, dayTasks]) => (
            <div key={date}>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs font-bold tracking-wider uppercase text-slate-500 whitespace-nowrap">
                  {formatDate(date)}
                </span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Tasks for that day */}
              <div className="space-y-3">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-white rounded-xl border shadow-sm p-4 flex items-start gap-4 transition-all ${
                      task.status === "Done"
                        ? "opacity-60 border-slate-100"
                        : isOverdue(task)
                          ? "border-red-200 bg-red-50/30"
                          : "border-slate-200"
                    }`}
                  >
                    {/* Priority dot */}
                    <div className="mt-1 shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full ${PRIORITY_STYLES[task.priority].dot}`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`font-semibold text-slate-800 ${task.status === "Done" ? "line-through text-slate-400" : ""}`}
                        >
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority].badge}`}
                          >
                            {task.priority}
                          </span>
                          {isOverdue(task) && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200">
                              Overdue
                            </span>
                          )}
                        </div>
                      </div>
                      {task.time && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          🕐{" "}
                          {new Date(
                            `2000-01-01T${task.time}`,
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                      {task.notes && (
                        <p className="mt-1 text-sm text-slate-500">
                          {task.notes}
                        </p>
                      )}
                      <div className="mt-2">
                        <button
                          onClick={() => cycleStatus(task.id)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full transition cursor-pointer ${STATUS_STYLES[task.status]}`}
                        >
                          {task.status}
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => startEdit(task)}
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
                        onClick={() => deleteTask(task.id)}
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
