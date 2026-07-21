import React from 'react'
import { Link, Outlet } from 'react-router'
import { useAuthDispatch } from '../context/AuthContext'

const AdminLayout = () => {
  const dispatch = useAuthDispatch();
   const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };
  return (
    <>
     <div>
      <Link to="/admin">Dashboard</Link><br />
      <Link to="/admin/products">Products</Link><br />
      <Link>Add Products</Link> <br />
      <button onClick={handleLogout}>Log Out</button>
     </div>
      <Outlet />
    </>
  )
}

export default AdminLayout
