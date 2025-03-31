import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/Form.css'

const Form = () => {

    // Init state dlya ypravleniya inputom
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    // Obnovlenie state dlya name i location
    const handleNameChange = (e) => {
        setName(e.target.value); 
    };
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
   

    const handleSubmit = (e) => {
        e.preventDefault(); // Otkluchenie defaultnogo povedeniya formi

        axios.post('http://localhost:5000/items', { name, location })
            .then(() => {
                console.log("Data successfully sent to server");
                navigate('/') // Back na main page
            })
            .catch((error) => {
                console.error("Error sending data to server: ", error);
            });
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Add New Device</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="form-label">
                        Device Name:
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                            className="form-input"
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={handleLocationChange}
                            required
                            className="form-input"
                        />
                    </label>
                </div>

                <button type="submit" className="form-button">
                    Save Data
                </button>
            </form>
        </div>
    );  
};
export default Form;





