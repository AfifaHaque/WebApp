import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/materials`;

function FileManager() {
  const [materials, setMaterials] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    url: "",
    description: "",
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        API_URL,
        getAuthHeader()
      );

      setMaterials(response.data);
    } catch (error) {
      console.error("Load materials error:", error);

      if (error.response?.status === 401) {
        alert("Your login token is missing or expired.");
      }
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleAddMaterial = async (event) => {
    event.preventDefault();

    if (!formData.title || !formData.course) {
      alert("Please enter the title and course name.");
      return;
    }

    try {
      await axios.post(
        API_URL,
        formData,
        getAuthHeader()
      );

      setFormData({
        title: "",
        course: "",
        url: "",
        description: "",
      });

      await fetchMaterials();
    } catch (error) {
      console.error("Add material error:", error);
      alert("Failed to add material.");
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this material?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/${materialId}`,
        getAuthHeader()
      );

      await fetchMaterials();
    } catch (error) {
      console.error("Delete material error:", error);
      alert("Failed to delete material.");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>File Manager</h2>
          <p>
            Organize study materials, notes, links, and resources.
          </p>
        </div>
      </div>

      <section className="content-card">
        <h3>Add Study Material</h3>

        <form
          className="task-form"
          onSubmit={handleAddMaterial}
        >
          <input
            type="text"
            name="title"
            placeholder="Material title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="course"
            placeholder="Course name"
            value={formData.course}
            onChange={handleChange}
          />

          <input
            type="url"
            name="url"
            placeholder="File link or resource URL"
            value={formData.url}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Material description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">
            Add Material
          </button>
        </form>
      </section>

      <section className="content-card">
        <h3>Study Materials</h3>

        {materials.length === 0 ? (
          <p>No study materials added yet.</p>
        ) : (
          <div className="task-list">
            {materials.map((material) => (
              <div
                className="task-item"
                key={material._id || material.id}
              >
                <div>
                  <h3>{material.title}</h3>
                  <p>{material.course}</p>

                  {material.description && (
                    <small>
                      {material.description}
                    </small>
                  )}

                  {material.url && (
                    <p>
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Resource
                      </a>
                    </p>
                  )}
                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDeleteMaterial(
                      material._id || material.id
                    )
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

export default FileManager;