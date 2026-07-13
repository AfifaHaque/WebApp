import { useState } from "react";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState("2026-07-10");

  const tasks = [
    {
      id: 1,
      title: "Numerical Methods Assignment",
      date: "2026-07-10",
      priority: "High",
    },
    {
      id: 2,
      title: "WebApp Project Report",
      date: "2026-07-15",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Database Quiz Preparation",
      date: "2026-07-20",
      priority: "Low",
    },
  ];

  const calendarDays = [
    "", "", "", 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, "",
  ];

  const hasTask = (day) => {
    const dayString = day.toString().padStart(2, "0");
    return tasks.some((task) => task.date === `2026-07-${dayString}`);
  };

  const handleDateClick = (day) => {
    if (!day) return;

    const dayString = day.toString().padStart(2, "0");
    setSelectedDate(`2026-07-${dayString}`);
  };

  const selectedTasks = tasks.filter((task) => task.date === selectedDate);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Calendar View</h2>
          <p>View your academic tasks and deadlines in a monthly calendar.</p>
        </div>
      </div>

      <section className="calendar-layout">
        <div className="content-card">
          <div className="calendar-header">
            <h3>July 2026</h3>
            <p>Click a date to view related tasks.</p>
          </div>

          <div className="calendar-weekdays">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                className={`calendar-day ${
                  day && hasTask(day) ? "has-task" : ""
                } ${
                  day &&
                  selectedDate ===
                    `2026-07-${day.toString().padStart(2, "0")}`
                    ? "selected-day"
                    : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="content-card">
          <h3>Tasks on {selectedDate}</h3>

          {selectedTasks.length > 0 ? (
            <div className="calendar-task-list">
              {selectedTasks.map((task) => (
                <div className="calendar-task" key={task.id}>
                  <h4>{task.title}</h4>
                  <p>Priority: {task.priority}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-text">No tasks found for this date.</p>
          )}
        </div>
      </section>

      <section className="content-card">
        <h3>Deadline Overview</h3>

        <div className="calendar-task-list">
          {tasks.map((task) => (
            <div className="calendar-task" key={task.id}>
              <h4>{task.title}</h4>
              <p>
                Date: {task.date} | Priority: {task.priority}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CalendarView;