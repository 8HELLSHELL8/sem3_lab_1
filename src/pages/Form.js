import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <label>
                Device name:
                <input type="text"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
            </label>
            <br/>
        
            <label>
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    required
                />
            </label>
            <br/>

            <button type="submit">Save data</button>
        </form>

    );  
};
export default Form;





