import { useEffect, useState } from "react";
import { getAvailableTasks } from "../axios/axios.api";
import { toast } from "react-toastify";

const TaskPage = () => {
    const [availableTasks, setAvailableTasks] = useState([]);
    const [myTask, setMyTask] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await getAvailableTasks();
            setAvailableTasks(response);
        } catch (error) {
            toast.error("Lỗi khi tải tasks");
        }
    };

    const handleAccept = async (taskId) => {
        try {
            await acceptTask(taskId);
            toast.success("Đã nhận task!");
            fetchTasks();
        } catch (error) {
            toast.error("Không thể nhận task");
        }
    };

    const handleComplete = async (taskId) => {
        try {
            await completeTask(taskId);
            toast.success("Đã hoàn thành task!");
            fetchTasks();
        } catch (error) {
            toast.error("Không thể hoàn thành task");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="max-w-7xl h-screen mx-auto p-10 py-10 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Task Management</h1>

            {/* My Task Section */}
            {myTask ? (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Your Task</h2>
                    <div className="border p-4 rounded shadow my-2 bg-yellow-100">
                        <p><strong>{myTask.title}</strong></p>
                        <p>Status: {myTask.status}</p>
                        <p>Description: {myTask.description}</p>
                        {myTask.status === "in_progress" && (
                            <button
                                onClick={() => handleComplete(myTask.id)}
                                className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Mark as Completed
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p className="mb-4 text-gray-600">You have no tasks assigned.</p>
            )
            }

            {/* Available Tasks */}
            <h2 className="text-xl font-semibold mb-2">Available Tasks</h2>
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
                                onClick={() => handleAccept(task.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Nhận task
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Không có task nào khả dụng.</p>
                )}
            </div>
        </div >
    );
};

export default TaskPage;
