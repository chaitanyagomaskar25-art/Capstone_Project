import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthDispatch } from "../context/AuthContext";

const Login = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock Admin Login
    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "admin123"
    ) {
      dispatch({
        type: "LOGIN",
        payload: "admin",
      });

      navigate("/admin");
      return;
    }

    // Mock User Login
    if (
      formData.email === "user@gmail.com" &&
      formData.password === "user123"
    ) {
      dispatch({
        type: "LOGIN",
        payload: "user",
      });

      navigate("/home");
      return;
    }

    setError("Invalid Email or Password");
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "100px auto",
      }}
    >
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Login;