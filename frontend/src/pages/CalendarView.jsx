import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/tasks`;

function CalendarView() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Calendar load error:", error);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

  const tasksForSelectedDate = useMemo(() => {
    if (!selectedDate) {
      return tasks;
    }

    return tasks.filter(
      (task) => task.dueDate === selectedDate
    );
  }, [tasks, selectedDate]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Calendar</h2>
          <p>View your task deadlines by date.</p>
        </div>
      </div>

      <section className="content-card">
        <h3>Select a Date</h3>

        <input
          type="date"
          value={selectedDate}
          onChange={(event) =>
            setSelectedDate(event.target.value)
          }
        />

        {selectedDate && (
          <button onClick={() => setSelectedDate("")}>
            Show All
          </button>
        )}
      </section>

      <section className="content-card">
        <h3>
          {selectedDate
            ? `Tasks for ${selectedDate}`
            : "All Upcoming Deadlines"}
        </h3>

        {tasksForSelectedDate.length === 0 ? (
          <p>No tasks found for this date.</p>
        ) : (
          <div className="task-list">
            {tasksForSelectedDate.map((task) => (
              <div
                className="task-item"
                key={task._id || task.id}
              >
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description || "No description"}</p>

                  <small>
                    Date: {task.dueDate || "No date"} | Priority:{" "}
                    {task.priority || "medium"}
                  </small>
                </div>

                <span className="status-badge">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default CalendarView;