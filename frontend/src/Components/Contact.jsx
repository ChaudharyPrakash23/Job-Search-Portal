import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-white py-6 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-6xl mx-auto text-center mt-12">
        <motion.h2
          className="text-4xl font-bold text-blue-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="text-gray-700 text-lg max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Have questions or need assistance? Reach out to us through any of the
          following channels.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
        <motion.div
          className="bg-blue-50 p-6 rounded-2xl shadow-lg text-center"
          whileHover={{ scale: 1.05 }}
        >
          <FaEnvelope className="text-blue-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-900">Email Us</h3>
          <p className="text-gray-600 mt-2">example@gmail.com</p>
        </motion.div>

        <motion.div
          className="bg-blue-50 p-6 rounded-2xl shadow-lg text-center"
          whileHover={{ scale: 1.05 }}
        >
          <FaPhone className="text-blue-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-900">Call Us</h3>
          <p className="text-gray-600 mt-2">+(977)9876543210</p>
        </motion.div>

        <motion.div
          className="bg-blue-50 p-6 rounded-2xl shadow-lg text-center"
          whileHover={{ scale: 1.05 }}
        >
          <FaMapMarkerAlt className="text-blue-600 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-900">Visit Us</h3>
          <p className="text-gray-600 mt-2">Gwarko Chowk, Lalitpur, Nepal</p>
        </motion.div>
      </div>

      <div className="map m-1 h-60 md:h-72 lg:h-96 bg-white rounded-md my-3">
        <h1 className="flex justify-center mx-1 text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold">
          Find Us
        </h1>
        <div className="border border-gray-400 mx-1 h-48 md:h-60 lg:h-80 mt-2 rounded-md overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.6728079769987!2d85.32822837447073!3d27.665593027333674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190029da6561%3A0x95b502700ced6e5b!2sThe%20key%20concern!5e0!3m2!1sne!2snp!4v1737886781137!5m2!1sne!2snp"
            width="1200"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
