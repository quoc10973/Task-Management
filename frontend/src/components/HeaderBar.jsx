import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userSession";

const HeaderBar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Task Management System
                </Link>

                <nav className="space-x-6 font-poppins">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="#" className="hover:underline">
                        Profile
                    </Link>
                    <Link to="/task" className="hover:underline">
                        Tasks
                    </Link>
                    {user ? (
                        <span className="text-sm">Welcome, {user.name}</span>
                    ) : (
                        <Link to="/login" className="hover:underline">
                            Login
                        </Link>
                    )}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="hover:underline ml-4"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/#" className="hover:underline">
                            Register
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default HeaderBar;
