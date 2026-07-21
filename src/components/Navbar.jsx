import { NavLink, useNavigate } from "react-router";
import { useAuthDispatch } from "../context/AuthContext";

const Navbar = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/home/products">Products</NavLink>
      <NavLink to="/home/cart">Cart</NavLink>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;