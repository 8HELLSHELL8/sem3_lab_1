import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {


    // Init state
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async() => {
            try {
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
        <div>
            <h1>Device list</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <Link to={`/detail/${item.id}`}> {item.name} </Link>
                    </li>
                ))}
            </ul>
            <Link to="/add">Add device</Link>
        </div>
    );
};


export default Home;