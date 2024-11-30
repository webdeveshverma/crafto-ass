import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast("Logout successfully!");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="text-lg font-bold">
        <Link to="/quotes">CRAFTO</Link>
      </div>
      <div className="space-x-4">
        {isLogin && (
          <Fragment>
            <Link to="/quotes" className="hover:underline">
              Quotes
            </Link>
            <Link to="/create" className="hover:underline">
              Create Quote
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
