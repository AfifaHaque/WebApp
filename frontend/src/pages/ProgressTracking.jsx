import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks";

function ProgressTracking() {
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
        console.error("Progress load error:", error);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in progress"
  ).length;

  const overallProgress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const courseProgress = useMemo(() => {
    const groupedTasks = {};

    tasks.forEach((task) => {
      const course =
        task.course_name ||
        task.courseName ||
        "General Tasks";

      if (!groupedTasks[course]) {
        groupedTasks[course] = {
          total: 0,
          completed: 0,
        };
      }

      groupedTasks[course].total += 1;

      if (task.status === "completed") {
        groupedTasks[course].completed += 1;
      }
    });

    return Object.entries(groupedTasks).map(
      ([course, values]) => ({
        course,
        total: values.total,
        completed: values.completed,
        percentage:
          values.total === 0
            ? 0
            : Math.round(
                (values.completed / values.total) * 100
              ),
      })
    );
  }, [tasks]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Progress Tracking</h2>
          <p>Monitor your task completion progress.</p>
        </div>
      </div>

      <section className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgressTasks}</p>
        </div>
      </section>

      <section className="content-card">
        <h3>Overall Progress</h3>
        <h2>{overallProgress}%</h2>
        <p>Overall task completion</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </section>

      <section className="content-card">
        <h3>Course-wise Progress</h3>

        {courseProgress.length === 0 ? (
          <p>No task progress available yet.</p>
        ) : (
          <div className="task-list">
            {courseProgress.map((course) => (
              <div
                className="task-item"
                key={course.course}
              >
                <div style={{ width: "100%" }}>
                  <h3>{course.course}</h3>

                  <p>
                    {course.completed} out of {course.total} tasks
                    completed
                  </p>

                  <strong>{course.percentage}%</strong>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${course.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProgressTracking;