import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../css/Detail.css'


const Detail = () => {

    const { id } = useParams(); // Dinamicheski poluchaem id is url
    const navigate = useNavigate();

    // Init dlya state
    const [name,setName] = useState('');
    const [location,setLocation] = useState('');
    const [isEditing, setIsEditing] = useState(false); // flag redaktirovaniya

    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/items/${id}`);
                const { name, location } = response.data;
                setName(name);
                setLocation(location);
            } catch (error) {
                console.error("Error uploading device info: ", error);
            }
        };

        fetchDeviceData();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are u sure u want to delete this device?")) {
            try {
                await axios.delete(`http://localhost:5000/items/${id}`);
                navigate("/");

            } catch (error) {
                console.error("Error deleting this device: ", error);
            }
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/items/${id}`, { name, location });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating device info: ", error);
        }
    }

    return (
      <div className="detail-container">
          <h1 className="detail-title">Device Detailed Info</h1>
          <div className="detail-info">
              <label className="detail-label">
                  Device Name: <strong>{name}</strong>
              </label>
              <br />
              <label className="detail-label">
                  Location: <strong>{location}</strong>
              </label>
          </div>

          <div className="detail-actions">
              <button className="detail-button" onClick={() => navigate("/")}>
                  Back
              </button>
              <button className="detail-button danger" onClick={handleDelete}>
                  Delete Device
              </button>
              <button className="detail-button edit" onClick={() => setIsEditing(true)}>
                  Edit
              </button>
          </div>

          {isEditing && (
              <div className="edit-form">
                  <h3 className="edit-title">Edit Info</h3>
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          handleSave();
                      }}
                      className="edit-form-container"
                  >
                      <label className="edit-label">
                          New Name:
                          <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="edit-input"
                          />
                      </label>
                      <br />
                      <label className="edit-label">
                          New Location:
                          <input
                              type="text"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              required
                              className="edit-input"
                          />
                      </label>
                      <br />
                      <button type="submit" className="edit-button save">
                          Save Changes
                      </button>
                      <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="edit-button cancel"
                      >
                          Cancel
                      </button>
                  </form>
              </div>
          )}
      </div>
  );
};

export default Detail;

