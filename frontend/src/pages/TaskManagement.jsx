import { useEffect, useState } from "react";
import axios from "axios";

function TaskManagement() {
  const API_URL = "http://localhost:5000/api/tasks";

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    course_name: "",
    task_type: "Assignment",
    description: "",
    deadline: "",
    priority: "Medium",
    status: "Pending",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const token = localStorage.getItem("token");

  const getAuthHeader = () => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchTasks = async () => {
    try {
      let query = [];

      if (search) {
        query.push(`search=${search}`);
      }

      if (statusFilter) {
        query.push(`status=${statusFilter}`);
      }

      if (priorityFilter) {
        query.push(`priority=${priorityFilter}`);
      }

      const queryString = query.length > 0 ? `?${query.join("&")}` : "";

      const response = await axios.get(`${API_URL}${queryString}`, getAuthHeader());

      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
      alert("Failed to load tasks. Please login first.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter, priorityFilter]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.course_name || !formData.deadline) {
      alert("Please fill in title, course name, and deadline.");
      return;
    }

    try {
      await axios.post(API_URL, formData, getAuthHeader());

      setFormData({
        title: "",
        course_name: "",
        task_type: "Assignment",
        description: "",
        deadline: "",
        priority: "Medium",
        status: "Pending",
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to add task.");
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/complete`, {}, getAuthHeader());
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to complete task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task.");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Task Management</h2>
          <p>Create, search, filter, complete, and delete study tasks.</p>
        </div>
      </div>

      <section className="content-card">
        <h3>Add New Task</h3>

        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="course_name"
            placeholder="Course name"
            value={formData.course_name}
            onChange={handleChange}
          />

          <select
            name="task_type"
            value={formData.task_type}
            onChange={handleChange}
          >
            <option>Assignment</option>
            <option>Quiz</option>
            <option>Exam</option>
            <option>Project</option>
            <option>Reading</option>
            <option>Revision</option>
          </select>

          <input
            type="text"
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button type="submit">Add Task</button>
        </form>
      </section>

      <section className="content-card">
        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by task or course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div className="task-item" key={task._id}>
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.course_name}</p>
                  <small>
                    {task.task_type} | Deadline:{" "}
                    {task.deadline ? task.deadline.slice(0, 10) : "No date"}
                  </small>
                </div>

                <div className="task-meta">
                  <span className={`badge ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>

                  <span className="status-badge">{task.status}</span>

                  <button onClick={() => handleCompleteTask(task._id)}>
                    Complete
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default TaskManagement;