import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// let data = [];

// async function loadData() {
//     try{
//         const response = await axios.get("http://localhost:5000/items");
//         data = response.data;
//         console.log("Data loaded successfully ", data);
//     } catch (error) {
//         console.error("Error in query: ", error);
//     }
// }

// await loadData();

const Home = () => {


    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);



    return (
        <div>
            <h1>Device list</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <Link to={"/detail/${item.id}"}> {item.name} </Link>
                    </li>
                ))}
            </ul>
            <Link to="/add">Add device</Link>
            
        </div>

    );
};


export default Home;