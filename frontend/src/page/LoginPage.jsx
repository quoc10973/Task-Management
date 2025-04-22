import { useState } from "react";
import { login } from "../axios/axios.api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (!response?.id || !response?.email) {
                throw new Error("Invalid email or password");
            }
            const userData = response
            sessionStorage.setItem("user", JSON.stringify(userData));

            console.log("Đăng nhập thành công:", userData);

            navigate("/task");
        } catch (err) {
            setError("Login Failed: " + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-signika">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Sign In
                </h2>
                {error && (
                    <div className="mb-4 text-sm text-red-600 text-center bg-red-100 border border-red-300 px-3 py-2 rounded-lg">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
