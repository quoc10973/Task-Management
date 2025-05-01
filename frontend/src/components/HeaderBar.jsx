import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userSession";

const HeaderBar = () => {
    const { user } = useContext(UserContext);
    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Task Management System
                </Link>

                <nav className="space-x-6">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/profile" className="hover:underline">
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
                </nav>
            </div>
        </header>
    );
};

export default HeaderBar;
