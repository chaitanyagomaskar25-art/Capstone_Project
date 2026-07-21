import { NavLink, useNavigate } from "react-router";
import { useAuthDispatch } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const cartTotalItem = useCart()
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/home/products">Products</NavLink>
      <NavLink to="/home/cart">Cart {cartTotalItem.length}</NavLink>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;