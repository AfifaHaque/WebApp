import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/tasks`;

function DeadlineTracker() {
  const [tasks, setTasks] = useState([]);

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
        console.error("Deadline load error:", error);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (!task.dueDate || task.status === "completed") {
          return false;
        }

        return new Date(task.dueDate) >= today;
      }),
    [tasks]
  );

  const overdueTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (!task.dueDate || task.status === "completed") {
          return false;
        }

        return new Date(task.dueDate) < today;
      }),
    [tasks]
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  const calculateDays = (dueDate) => {
    const difference =
      new Date(dueDate).getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Deadline Tracker</h2>
          <p>Track upcoming, completed, and overdue tasks.</p>
        </div>
      </div>

      <section className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Deadlines</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="stat-card">
          <h3>Upcoming</h3>
          <p>{upcomingTasks.length}</p>
        </div>

        <div className="stat-card">
          <h3>Overdue</h3>
          <p>{overdueTasks.length}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTasks.length}</p>
        </div>
      </section>

      <section className="content-card">
        <h3>Upcoming Deadlines</h3>

        {upcomingTasks.length === 0 ? (
          <p>No upcoming deadlines.</p>
        ) : (
          <div className="task-list">
            {upcomingTasks.map((task) => {
              const daysLeft = calculateDays(task.dueDate);

              return (
                <div
                  className="task-item"
                  key={task._id || task.id}
                >
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description || "No description"}</p>
                    <small>Deadline: {task.dueDate}</small>
                  </div>

                  <div className="task-meta">
                    <span className={`badge ${task.priority}`}>
                      {task.priority}
                    </span>

                    <span className="status-badge">
                      {task.status}
                    </span>

                    <strong>
                      {daysLeft === 0
                        ? "Due today"
                        : `${daysLeft} days left`}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="content-card">
        <h3>Overdue Deadlines</h3>

        {overdueTasks.length === 0 ? (
          <p>No overdue deadlines.</p>
        ) : (
          <div className="task-list">
            {overdueTasks.map((task) => (
              <div
                className="task-item"
                key={task._id || task.id}
              >
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description || "No description"}</p>
                  <small>Deadline: {task.dueDate}</small>
                </div>

                <strong>
                  {Math.abs(calculateDays(task.dueDate))} days late
                </strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DeadlineTracker;