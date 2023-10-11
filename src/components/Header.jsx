import { Link, Navigate } from "react-router-dom";
import '../styles/header.scss'
import { useContext } from "react";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const logoutHandler = async (e) => {
        setLoading(true)
        try {
            await axios.get(
                `${server}/users/logout`,
                {
                },
                {
                    withCredentials: true,
                }
            );

            toast.success("Logged out Successfully");
            setIsAuthenticated(false);
            setLoading(false)
        } catch (error) {
            console.error(error); // Log the error to the console for debugging
            toast.error(error.response ? error.response.data.message : "An error occurred.");
            setIsAuthenticated(true);
            setLoading(false)
        }

    };

    return (
        <nav className="header">
            <div>
                <h2>Todo App</h2>
            </div>
            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                {isAuthenticated ? (
                    <button disabled={loading} className="btn" onClick={logoutHandler}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </article>
        </nav>
    );
};

export default Header;