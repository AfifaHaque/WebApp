function Home() {
  return (
    <div className="page">
      <section className="hero-section">
        <h2>Welcome back, Student</h2>
        <p>
          This dashboard gives a quick overview of your study tasks, deadlines,
          and progress.
        </p>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>12</p>
        </div>

        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p>5</p>
        </div>

        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>7</p>
        </div>

        <div className="stat-card">
          <h3>Progress</h3>
          <p>58%</p>
        </div>
      </section>

      <section className="content-card">
        <h3>Upcoming Deadlines</h3>

        <ul className="deadline-list">
          <li>
            <span>Numerical Methods Assignment</span>
            <strong>10 July 2026</strong>
          </li>
          <li>
            <span>WebApp Project Report</span>
            <strong>15 July 2026</strong>
          </li>
          <li>
            <span>Database Quiz Preparation</span>
            <strong>20 July 2026</strong>
          </li>
        </ul>
      </section>

      <section className="quick-actions">
        <a href="/tasks">Manage Tasks</a>
        <a href="/calendar">View Calendar</a>
        <a href="/progress">Track Progress</a>
      </section>
    </div>
  );
}

export default Home;