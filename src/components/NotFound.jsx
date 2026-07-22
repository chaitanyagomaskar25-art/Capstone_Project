import { Link } from "react-router";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "80px",
          margin: 0,
          color: "#2563eb",
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p style={{ color: "gray" }}>
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/home"
        style={{
          textDecoration: "none",
          background: "#2563eb",
          color: "white",
          padding: "10px 20px",
          borderRadius: "6px",
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;