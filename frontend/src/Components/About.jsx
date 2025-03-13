import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaBullhorn, FaRegLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto text-center">

        <motion.h2
          className="text-4xl font-bold text-blue-900 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Welcome to our Job Search Portal! We provide the latest job
          opportunities tailored to your skills and preferences. Our platform
          helps you connect with top employers and take the next step in your
          career. Whether you're looking for a job in tech, healthcare, or any
          other industry, we have a variety of listings to explore.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-4xl text-blue-900 mb-4">
              <FaSearch />
            </div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Job Search</h3>
            <p className="text-gray-700">
              Explore thousands of job listings that match your skills and interests.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="text-4xl text-blue-900 mb-4">
              <FaBullhorn />
            </div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Notifications</h3>
            <p className="text-gray-700">
              Get real-time notifications about new jobs and updates that matter to you.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div className="text-4xl text-blue-900 mb-4">
              <FaRegLightbulb />
            </div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Career Insights</h3>
            <p className="text-gray-700">
              Receive expert tips and advice to enhance your career and job search strategy.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Link
            to="/jobs"
            className="bg-blue-900 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          >
            Browse Jobs Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
