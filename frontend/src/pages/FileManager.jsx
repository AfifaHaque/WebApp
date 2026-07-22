import { useState } from "react";

function FileManager() {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Numerical Methods Notes",
      course_name: "Numerical Methods",
      description: "Notes for bisection, false position, and Newton-Raphson.",
      file_link: "https://example.com/numerical-notes",
    },
    {
      id: 2,
      title: "WebApp Project Documentation",
      course_name: "Web Application",
      description: "Backend API design and ERD documentation.",
      file_link: "https://example.com/webapp-docs",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    course_name: "",
    description: "",
    file_link: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.course_name || !formData.file_link) {
      alert("Please fill in title, course name, and file/link.");
      return;
    }

    const newMaterial = {
      id: Date.now(),
      ...formData,
    };

    setMaterials([newMaterial, ...materials]);

    setFormData({
      title: "",
      course_name: "",
      description: "",
      file_link: "",
    });
  };

  const handleDeleteMaterial = (id) => {
    const filteredMaterials = materials.filter((material) => material.id !== id);
    setMaterials(filteredMaterials);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>File Manager</h2>
          <p>Organize study materials, notes, links, and course resources.</p>
        </div>
      </div>

      <section className="content-card">
        <h3>Add Study Material</h3>

        <form className="file-form" onSubmit={handleAddMaterial}>
          <input
            type="text"
            name="title"
            placeholder="Material title"
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

          <input
            type="text"
            name="file_link"
            placeholder="File link or resource URL"
            value={formData.file_link}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Material description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Add Material</button>
        </form>
      </section>

      <section className="content-card">
        <h3>Study Materials</h3>

        <div className="material-list">
          {materials.map((material) => (
            <div className="material-card" key={material.id}>
              <div>
                <h3>{material.title}</h3>
                <p>{material.course_name}</p>
                <small>{material.description}</small>

                <a
                  href={material.file_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Resource
                </a>
              </div>

              <button onClick={() => handleDeleteMaterial(material.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FileManager;