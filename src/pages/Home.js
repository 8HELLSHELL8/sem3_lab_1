import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/Home.css'

const Home = () => {


    // Init state
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async() => {
            try {

                await new Promise((resolve) => setTimeout(resolve, 1000)); // Spinner

                const response = await axios.get("http://localhost:5000/items");
                setData(response.data); // Updatim state
                setLoading(false)
                console.log("Data loaded successfully ", response.data);
            } catch (error) {
                console.error("Error in query: ", error);
                setLoading(false);
            }
        };

        loadData();
    }, []);


    return (
        <div className="home-container">
            <h1 className="home-title">Device List</h1>

            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading...</p>
                </div>
            ) : (
                <>
                    <ul className="device-list">
                        {data.map((item) => (
                            <li key={item.id} className="device-item">
                                <Link to={`/detail/${item.id}`} className="device-link">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="home-actions">
                        <Link to="/add" className="add-device-button">
                            Add Device
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};


export default Home;