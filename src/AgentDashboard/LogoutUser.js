import React, { useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";


function LogoutUser() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.clear();
        navigate('/admin')},[navigate])

  return (
    <div>Logout</div>
  )
}

export default LogoutUser