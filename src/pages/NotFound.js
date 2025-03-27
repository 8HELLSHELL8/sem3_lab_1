import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
        <h1>error 404 - Page not found</h1>
        <Link to="/">Back to main page</Link> 
        </div>
    );
}


export default NotFound;