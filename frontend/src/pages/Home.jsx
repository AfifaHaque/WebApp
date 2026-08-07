import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/tasks`;

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data);
      } catch (error) {
        console.error("Dashboard load error:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const upcomingDeadlines = tasks
    .filter(
      (task) =>
        task.status !== "completed" &&
        task.dueDate
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate) - new Date(b.dueDate)
    )
    .slice(0, 3);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Student Study Planner</h2>
          <p>Manage your academic tasks, deadlines, and study progress.</p>
        </div>
      </div>

      <section className="dashboard-hero">
        <h2>Welcome back, Student</h2>
        <p>
          Here is an overview of your study tasks, deadlines, and progress.
        </p>
      </section>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <section className="dashboard-grid">
            <div className="stat-card">
              <h3>Total Tasks</h3>
              <p>{totalTasks}</p>
            </div>

            <div className="stat-card">
              <h3>Pending Tasks</h3>
              <p>{pendingTasks}</p>
            </div>

            <div className="stat-card">
              <h3>Completed Tasks</h3>
              <p>{completedTasks}</p>
            </div>

            <div className="stat-card">
              <h3>Progress</h3>
              <p>{progress}%</p>
            </div>
          </section>

          <section className="content-card">
            <h3>Upcoming Deadlines</h3>

            {upcomingDeadlines.length === 0 ? (
              <p>No upcoming deadlines.</p>
            ) : (
              <div className="deadline-list">
                {upcomingDeadlines.map((task) => (
                  <div
                    className="deadline-item"
                    key={task._id || task.id}
                  >
                    <span>{task.title}</span>
                    <strong>{task.dueDate}</strong>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Home;