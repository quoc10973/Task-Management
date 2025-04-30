import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import LoginPage from '../page/LoginPage'
import TaskPage from '../page/TaskPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/task" element={<TaskPage />} />
            </Route >
        </Routes>
    )
}

export default AppRoutes