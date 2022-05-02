import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useNavigate, Routes  } from 'react-router-dom'

    
const AdminRoute = ({ children }) => {
    const Navigate = useNavigate();
    const userSignIn = useSelector((state) => state.userSignIn)
    const { userInfo } = userSignIn
    return userInfo && userInfo.isAdmin === 1 ? children : <Navigate to='/login' />
};

export default AdminRoute




