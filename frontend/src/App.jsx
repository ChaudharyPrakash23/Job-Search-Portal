import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Jobs from "./Components/Jobs";
import Nav from "./Components/Nav";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createjob from "./Admin/Createjob";
import Dashboard from "./Admin/Dashboard";
import Managejob from "./Admin/Managejob";
import EditJob from "./Admin/EditJob";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createjob"
          element={
            <ProtectedRoute isAdmin={true}>
              <Createjob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/managejob"
          element={
            <ProtectedRoute isAdmin={true}>
              <Managejob />
            </ProtectedRoute>
          }
        />
        <Route path="/edit-job/:jobId" element={<EditJob />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
