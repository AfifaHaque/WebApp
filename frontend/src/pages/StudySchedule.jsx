import { useState } from "react";

function StudySchedule() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      course_name: "Numerical Methods",
      study_date: "2026-07-10",
      start_time: "08:00",
      end_time: "10:00",
      topic: "Bisection and Newton-Raphson Method",
      notes: "Practice solved examples and formulas.",
    },
    {
      id: 2,
      course_name: "Web Application",
      study_date: "2026-07-11",
      start_time: "14:00",
      end_time: "16:00",
      topic: "React Frontend Pages",
      notes: "Complete frontend page design.",
    },
  ]);

  const [formData, setFormData] = useState({
    course_name: "",
    study_date: "",
    start_time: "",
    end_time: "",
    topic: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();

    if (
      !formData.course_name ||
      !formData.study_date ||
      !formData.start_time ||
      !formData.end_time ||
      !formData.topic
    ) {
      alert("Please fill in course name, date, time, and topic.");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      ...formData,
    };

    setSchedules([newSchedule, ...schedules]);

    setFormData({
      course_name: "",
      study_date: "",
      start_time: "",
      end_time: "",
      topic: "",
      notes: "",
    });
  };

  const handleDeleteSchedule = (id) => {
    const filteredSchedules = schedules.filter((schedule) => schedule.id !== id);
    setSchedules(filteredSchedules);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Study Schedule</h2>
          <p>Plan your study sessions by course, date, time, and topic.</p>
        </div>
      </div>

      <section className="content-card">
        <h3>Add Study Schedule</h3>

        <form className="schedule-form" onSubmit={handleAddSchedule}>
          <input
            type="text"
            name="course_name"
            placeholder="Course name"
            value={formData.course_name}
            onChange={handleChange}
          />

          <input
            type="date"
            name="study_date"
            value={formData.study_date}
            onChange={handleChange}
          />

          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
          />

          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
          />

          <input
            type="text"
            name="topic"
            placeholder="Study topic"
            value={formData.topic}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Add Schedule</button>
        </form>
      </section>

      <section className="content-card">
        <h3>My Study Schedule</h3>

        <div className="schedule-list">
          {schedules.map((schedule) => (
            <div className="schedule-card" key={schedule.id}>
              <div>
                <h3>{schedule.course_name}</h3>
                <p>{schedule.topic}</p>
                <small>
                  {schedule.study_date} | {schedule.start_time} -{" "}
                  {schedule.end_time}
                </small>
                <p className="schedule-notes">{schedule.notes}</p>
              </div>

              <button onClick={() => handleDeleteSchedule(schedule.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StudySchedule;
