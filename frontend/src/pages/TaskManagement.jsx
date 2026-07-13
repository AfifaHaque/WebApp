import { useState } from "react";

function TaskManagement() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Numerical Methods Assignment",
      course_name: "Numerical Methods",
      task_type: "Assignment",
      deadline: "2026-07-10",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      title: "WebApp Project Report",
      course_name: "Web Application",
      task_type: "Project",
      deadline: "2026-07-15",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Database Quiz Preparation",
      course_name: "Database Management",
      task_type: "Quiz",
      deadline: "2026-07-20",
      priority: "Low",
      status: "Completed",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    course_name: "",
    task_type: "Assignment",
    deadline: "",
    priority: "Medium",
    status: "Pending",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.course_name || !formData.deadline) {
      alert("Please fill in title, course name, and deadline.");
      return;
    }

    const newTask = {
      id: Date.now(),
      ...formData,
    };

    setTasks([newTask, ...tasks]);

    setFormData({
      title: "",
      course_name: "",
      task_type: "Assignment",
      deadline: "",
      priority: "Medium",
      status: "Pending",
    });
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: "Completed" } : task
    );

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.course_name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesPriority = priorityFilter
      ? task.priority === priorityFilter
      : true;

    return matchesSearch && matchesStatus && matchesPriority;
  });

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
          {filteredTasks.map((task) => (
            <div className="task-item" key={task.id}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.course_name}</p>
                <small>
                  {task.task_type} | Deadline: {task.deadline}
                </small>
              </div>

              <div className="task-meta">
                <span className={`badge ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>

                <span className="status-badge">{task.status}</span>

                <button onClick={() => handleCompleteTask(task.id)}>
                  Complete
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TaskManagement;
