import { use, useContext, useEffect, useState } from "react";
import { getAvailableTasks, assignTask, getMyTask } from "../axios/axios.api";
import { UserContext } from "../context/userSession";

const TaskPage = () => {
    const [availableTasks, setAvailableTasks] = useState([]);
    const [myTask, setMyTask] = useState([]);
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        // Check if user is available before fetching tasks 
        if (!user || !user.id) {
            console.log("User is not available yet, skipping fetchMyTask");
            return;
        }
        const fetchMyTask = async () => {
            try {
                const response = await getMyTask(user.id);
                setMyTask(response);
                console.log("My Task:", response);
            } catch (error) {
                console.error("Error fetching my tasks:", error);
            }
        };
        fetchMyTask();
    }, [user]);


    const fetchTasks = async () => {
        try {
            const response = await getAvailableTasks();
            setAvailableTasks(response);
        } catch (error) {
            toast.error("Error fetching tasks: " + error.message);
        }
    };

    const handleAccept = async (taskId, userId) => {
        try {
            const response = await assignTask(taskId, userId);
            setMessage(
                `You have accepted the task: ${response.title} with ID: ${response.id}`
            )
            fetchTasks();
        } catch (error) {
            setMessage("Error accepting task: You already have an active task.");
        }
    };

    const handleComplete = async (taskId, userId) => {
        try {
            await completeTask(taskId, userId);
            setMessage("Task completion requested. Processing...");
            // Optionally, you can refresh the task list after completing a task
            fetchTasks();
        } catch (error) {
            setMessage("Error completing task: " + error.message);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="max-w-7xl h-screen mx-auto p-10 py-10 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Task Management</h1>

            {/* My Task Section */}
            <h2 className="text-xl font-semibold">Your Task</h2>
            {myTask.length > 0 ? (
                myTask.map((myTask) => (
                    <div className="mb-6">

                        <div className="border p-4 rounded shadow my-2 bg-yellow-100 flex justify-between items-center">
                            <div>
                                <p><strong> {myTask.title}</strong></p>
                                <p>{myTask.description}</p>
                                <p>Status: {myTask.status}</p>
                                <p>Create At: {myTask.createdAt}</p>
                            </div>
                            <div>
                                {myTask.status === "IN_PROGRESS" && (
                                    <button
                                        onClick={() => handleComplete(myTask.id)}
                                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        Mark as Completed
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <p className="mb-4 text-gray-600">You have no tasks assigned.</p>
            )}


            {/* Available Tasks */}
            <h2 className="text-xl font-semibold mb-2">Available Tasks</h2>
            {message && (
                <div className="mt-4 p-2 mb-3 bg-blue-100 text-black-800 rounded">
                    {message}
                </div>
            )}
            <div className="grid gap-4">
                {availableTasks.length > 0 ? (
                    availableTasks.map((task) => (
                        <div
                            key={task.id}
                            className="border p-4 rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <p><strong>{task.title}</strong></p>
                                <p>{task.description}</p>
                                <p>Status: {task.status}</p>
                                <p>Create At: {task.createdAt}</p>
                            </div>
                            <button
                                onClick={() => handleAccept(task.id, user.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Accept Task
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No available tasks at the moment.</p>
                )}
            </div>

        </div >
    );
};

export default TaskPage;
