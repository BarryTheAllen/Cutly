import { Navigate, Route, Routes } from 'react-router'
import Layout from '../layout/Layout'
import Home from '../pages/Home/Home'
import Registration from '../pages/Registration/Registration'
import Login from '../pages/Login/Login'

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