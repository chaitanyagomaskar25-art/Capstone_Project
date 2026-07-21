import React from 'react'
import { NavLink, Outlet } from 'react-router'
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
      <NavLink to="/admin">Dashboard</NavLink><br />
      <NavLink to="/admin/products">Products</NavLink><br />
      <NavLink to='/admin/add-product'>Add Products</NavLink> <br />
      <button onClick={handleLogout}>Log Out</button>
     </div>
      <Outlet />
    </>
  )
}

export default AdminLayout
