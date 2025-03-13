import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white py-2 mt-1">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">

        <motion.div
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white">Job Search Portal</span>
        </motion.div>

        <motion.div
          className="hidden md:flex space-x-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/jobs" className="hover:text-gray-300">Jobs</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
        </motion.div>

        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-white hover:text-blue-500 transition duration-300 text-2xl" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-pink-500 transition duration-300 text-2xl" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="text-white hover:text-blue-700 transition duration-300 text-2xl" />
          </a>
        </motion.div>
      </div>

      <motion.div
        className="text-center mt-4 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>&copy; {currentYear} Copyright <span className="font-semibold">Prakash Chaudhary</span>. All Rights Reserved.</p>
      </motion.div>

      <motion.div
        className="text-center mt-2 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      </motion.div>
    </footer>
  );
};

export default Footer;
