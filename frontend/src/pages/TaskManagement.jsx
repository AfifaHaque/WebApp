import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
    tags: "",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeader());

      // FastAPI returns the task array directly
      setTasks(response.data);
    } catch (error) {
      console.error("Load tasks error:", error);

      if (error.response?.status === 401) {
        alert("Your login token is missing or expired. Please log in again.");
      } else {
        alert("Failed to load tasks.");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!formData.title || !formData.dueDate) {
      alert("Please enter the task title and due date.");
      return;
    }

    const taskData = {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      await axios.post(API_URL, taskData, getAuthHeader());

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        status: "pending",
        tags: "",
      });

      await fetchTasks();
    } catch (error) {
      console.error("Add task error:", error);

      if (error.response?.status === 401) {
        alert("Your login token is missing or expired.");
      } else {
        alert("Failed to add task.");
      }
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.patch(
        `${API_URL}/${taskId}/complete`,
        {},
        getAuthHeader()
      );

      await fetchTasks();
    } catch (error) {
      console.error("Complete task error:", error);
      alert("Failed to complete task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${taskId}`, getAuthHeader());
      await fetchTasks();
    } catch (error) {
      console.error("Delete task error:", error);
      alert("Failed to delete task.");
    }
  };

  // Search and filtering are performed in React
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        task.title?.toLowerCase().includes(searchText) ||
        task.description?.toLowerCase().includes(searchText);

      const matchesStatus =
        !statusFilter || task.status === statusFilter;

      const matchesPriority =
        !priorityFilter || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

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
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="text"
            name="tags"
            placeholder="Tags separated by commas"
            value={formData.tags}
            onChange={handleChange}
          />

          <button type="submit">Add Task</button>
        </form>
      </section>

      <section className="content-card">
        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by title or description"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <div className="task-item" key={task._id || task.id}>
                <div>
                  <h3>{task.title}</h3>

                  <p>{task.description || "No description"}</p>

                  <small>
                    Due date: {task.dueDate || "No date"}
                  </small>

                  {task.tags?.length > 0 && (
                    <small>
                      {" "}
                      | Tags: {task.tags.join(", ")}
                    </small>
                  )}
                </div>

                <div className="task-meta">
                  <span className={`badge ${task.priority}`}>
                    {task.priority}
                  </span>

                  <span className="status-badge">
                    {task.status}
                  </span>

                  {task.status !== "completed" && (
                    <button
                      onClick={() =>
                        handleCompleteTask(task._id || task.id)
                      }
                    >
                      Complete
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDeleteTask(task._id || task.id)
                    }
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