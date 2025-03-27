import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



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
        <div>
          <h1>Device detailed info</h1>
          <div>
            <label>
              Device name:{" "}
              <strong>{name}</strong>
            </label>
            <br />
            <label>
              Location:{" "}
              <strong>{location}</strong>
            </label>
          </div>
    
          <div style={{ marginTop: "20px" }}>
            <button onClick={() => navigate("/")}>Back</button>
            <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
              Delete device
            </button>
            <button onClick={() => setIsEditing(true)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
          </div>
    
          {isEditing && (
            <div style={{ marginTop: "20px" }}>
              <h3>Edit info</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <label>
                  New name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <br />
                <label>
                  New location:
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </label>
                <br />
                <button type="submit">Save changes</button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ marginLeft: "10px" }}
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

