function ProgressTracking() {
  const progressData = {
    totalTasks: 12,
    completedTasks: 7,
    pendingTasks: 3,
    inProgressTasks: 2,
    progressPercentage: 58,
  };

  const courseProgress = [
    {
      id: 1,
      course_name: "Numerical Methods",
      total: 4,
      completed: 2,
      percentage: 50,
    },
    {
      id: 2,
      course_name: "Web Application",
      total: 5,
      completed: 4,
      percentage: 80,
    },
    {
      id: 3,
      course_name: "Database Management",
      total: 3,
      completed: 1,
      percentage: 33,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Progress Tracking</h2>
          <p>Monitor your study progress and completed academic tasks.</p>
        </div>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{progressData.totalTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{progressData.completedTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{progressData.pendingTasks}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{progressData.inProgressTasks}</p>
        </div>
      </section>

      <section className="content-card">
        <h3>Overall Progress</h3>

        <div className="progress-summary">
          <div>
            <h2>{progressData.progressPercentage}%</h2>
            <p>Overall task completion</p>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressData.progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </section>

      <section className="content-card">
        <h3>Course-wise Progress</h3>

        <div className="course-progress-list">
          {courseProgress.map((course) => (
            <div className="course-progress-card" key={course.id}>
              <div className="course-progress-header">
                <div>
                  <h3>{course.course_name}</h3>
                  <p>
                    {course.completed} out of {course.total} tasks completed
                  </p>
                </div>

                <strong>{course.percentage}%</strong>
              </div>

              <div className="progress-bar small-progress">
                <div
                  className="progress-fill"
                  style={{ width: `${course.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProgressTracking;
