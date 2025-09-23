import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Layout from '../layout/Layout'
import Home from '../pages/Home/Home'
import Registration from '../pages/Profile/Registration/Registration'
import Login from '../pages/Profile/Login/Login'

const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/Login" element={<Login />} />
        </Route>
    </Routes>
  )
}

export default Routing