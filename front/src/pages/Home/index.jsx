
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <ul>
            <li>
                <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );
}