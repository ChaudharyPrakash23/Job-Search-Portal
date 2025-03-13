import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBriefcase, FaClock, FaUsers } from "react-icons/fa";
import homeImage from "../photos/home.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const Home = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 bg-gray-50">

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl py-12">
        <div className="text-center md:text-left max-w-xl">
          <motion.h1
            className="text-blue-900 text-5xl md:text-6xl font-bold drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Find Your Dream Job
          </motion.h1>

          <motion.p
            className="text-gray-700 text-lg md:text-xl mt-4 drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Discover top job opportunities that match your skills and passion.
          </motion.p>

          <motion.div
            className="mt-6 flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Link
              to="/Jobs"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            >
              Browse Jobs
            </Link>
            <Link
              to="/Register"
              className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-gray-200 transition duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        <motion.img
          src={homeImage}
          alt="Job Search"
          className="w-full md:w-1/2 max-w-md mt-10 md:mt-0 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <motion.div
        className="w-full max-w-6xl text-center py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-blue-900 text-4xl font-bold">Why Choose Us?</h2>
        <p className="text-gray-600 text-lg mt-3">
          We provide the best opportunities to help you land your dream job.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { icon: <FaBriefcase />, title: "Top Companies", desc: "Get hired by industry-leading companies worldwide." },
            { icon: <FaClock />, title: "Fast Hiring", desc: "Our platform ensures quick application processing." },
            { icon: <FaUsers />, title: "Networking", desc: "Connect with recruiters and professionals in your field." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center cursor-pointer"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" }}
              viewport={{ once: true }}
            >
              <div className="text-blue-600 text-5xl">{item.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
