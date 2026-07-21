import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Welcome Admin 👋</p>

      <ul>
        <li>
          <Link to="/admin/products">
            Manage Products
          </Link>
        </li>

        <li>
          <Link to="/admin/add-product">
            Add Product
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;