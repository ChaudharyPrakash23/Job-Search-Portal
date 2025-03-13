import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { clearJobActions } from "../redux/slice/jobActionSlice";  
import { FaUser } from "react-icons/fa";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());           
    dispatch(clearJobActions());  
    navigate("/jobs");          
  };

  return (
    <nav className="bg-blue-900 text-white w-full shadow-lg mb-2">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-2">
        <div>
          <Link to="/" className="text-2xl font-bold">
            Job Search Portal
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 text-lg">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/jobs" className="hover:text-gray-300">Jobs</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>

        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2">
                <FaUser className="text-white" />
                <span className="text-red-500">{user?.firstname}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-900 px-4 rounded-md font-semibold hover:bg-gray-300 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-900 px-4 rounded-md font-semibold hover:bg-gray-300 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-900 px-4 rounded-md font-semibold hover:bg-gray-300 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-blue-800 p-6 flex flex-col space-y-4"
          >
            <Link
              to="/"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/jobs"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Jobs
            </Link>
            <Link
              to="/contact"
              className="text-lg hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  <FaUser className="text-white" />
                  <span className="text-red-500">{user.firstName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-900 text-center px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-900 text-center px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
