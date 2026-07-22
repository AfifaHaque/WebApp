function DeadlineTracker() {
  const deadlines = [
    {
      id: 1,
      title: "Numerical Methods Assignment",
      course_name: "Numerical Methods",
      deadline: "2026-07-10",
      priority: "High",
      status: "Pending",
      days_left: 3,
    },
    {
      id: 2,
      title: "WebApp Project Report",
      course_name: "Web Application",
      deadline: "2026-07-15",
      priority: "Medium",
      status: "In Progress",
      days_left: 8,
    },
    {
      id: 3,
      title: "Database Quiz Preparation",
      course_name: "Database Management",
      deadline: "2026-07-20",
      priority: "Low",
      status: "Completed",
      days_left: 13,
    },
    {
      id: 4,
      title: "Old DLD Lab Report",
      course_name: "Digital Logic Design",
      deadline: "2026-07-01",
      priority: "High",
      status: "Overdue",
      days_left: -6,
    },
  ];

  const upcomingDeadlines = deadlines.filter(
    (deadline) => deadline.days_left >= 0 && deadline.status !== "Completed"
  );

  const overdueDeadlines = deadlines.filter(
    (deadline) => deadline.days_left < 0 || deadline.status === "Overdue"
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Deadline Tracker</h2>
          <p>Track upcoming, completed, and overdue academic deadlines.</p>
        </div>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Deadlines</h3>
          <p>{deadlines.length}</p>
        </div>

        <div className="stat-card">
          <h3>Upcoming</h3>
          <p>{upcomingDeadlines.length}</p>
        </div>

        <div className="stat-card">
          <h3>Overdue</h3>
          <p>{overdueDeadlines.length}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{deadlines.filter((item) => item.status === "Completed").length}</p>
        </div>
      </section>

      <section className="content-card">
        <h3>Upcoming Deadlines</h3>

        <div className="deadline-tracker-list">
          {upcomingDeadlines.map((item) => (
            <div className="deadline-card" key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.course_name}</p>
                <small>Deadline: {item.deadline}</small>
              </div>

              <div className="deadline-info">
                <span className={`badge ${item.priority.toLowerCase()}`}>
                  {item.priority}
                </span>

                <span className="status-badge">{item.status}</span>

                <strong>{item.days_left} days left</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-card">
        <h3>Overdue Deadlines</h3>

        <div className="deadline-tracker-list">
          {overdueDeadlines.map((item) => (
            <div className="deadline-card overdue-card" key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.course_name}</p>
                <small>Deadline: {item.deadline}</small>
              </div>

              <div className="deadline-info">
                <span className={`badge ${item.priority.toLowerCase()}`}>
                  {item.priority}
                </span>

                <span className="overdue-badge">Overdue</span>

                <strong>{Math.abs(item.days_left)} days late</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DeadlineTracker;