import { useState } from "react";

function StudySchedule() {
  const [schedules, setSchedules] = useState([]);

  const [formData, setFormData] = useState({
    course: "",
    date: "",
    startTime: "",
    endTime: "",
    topic: "",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleAddSchedule = (event) => {
    event.preventDefault();

    if (
      !formData.course ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.topic
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      ...formData,
    };

    setSchedules((previousSchedules) => [
      ...previousSchedules,
      newSchedule,
    ]);

    setFormData({
      course: "",
      date: "",
      startTime: "",
      endTime: "",
      topic: "",
      notes: "",
    });
  };

  const handleDeleteSchedule = (scheduleId) => {
    setSchedules((previousSchedules) =>
      previousSchedules.filter(
        (schedule) => schedule.id !== scheduleId
      )
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Study Schedule</h2>
          <p>Create and organize your personal study sessions.</p>
        </div>
      </div>

      <section className="content-card">
        <h3>Add Study Schedule</h3>

        <form className="task-form" onSubmit={handleAddSchedule}>
          <input
            type="text"
            name="course"
            placeholder="Course name"
            value={formData.course}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
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
          />

          <button type="submit">Add Schedule</button>
        </form>
      </section>

      <section className="content-card">
        <h3>My Study Schedule</h3>

        {schedules.length === 0 ? (
          <p>No study schedules added yet.</p>
        ) : (
          <div className="task-list">
            {schedules.map((schedule) => (
              <div className="task-item" key={schedule.id}>
                <div>
                  <h3>{schedule.course}</h3>
                  <p>{schedule.topic}</p>

                  <small>
                    {schedule.date} | {schedule.startTime} -{" "}
                    {schedule.endTime}
                  </small>

                  {schedule.notes && <p>{schedule.notes}</p>}
                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDeleteSchedule(schedule.id)
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default StudySchedule;