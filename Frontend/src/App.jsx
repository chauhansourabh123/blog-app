import { useState, useEffect, useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import Creators from "./pages/Creators.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Myblogs from "./pages/Myblogs.jsx";
import Create from "./pages/Create.jsx";
import Myprofile from "./pages/Myprofile.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Footer from "./component/Footer.jsx";
import Navbar from "./component/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";
import { Context } from "./context/Context.jsx";
import Image from "./pages/Image.jsx";
import Error from "./pages/Error.jsx";

const ProtectedRoute = ({ element }) => {
  const { loggedInUser } = useContext(Context);
  return loggedInUser ? element : <Navigate to="/login" />;
};

const App = () => {
  const location = useLocation();
  const hide = ["/login", "/signup", "/dashboard"].includes(location.pathname);

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300`}
    >
      {!hide && <Navbar />}
      <div
        
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/blogs"
            element={<ProtectedRoute element={<Blogs />} />}
          />
          <Route
            path="/creators"
            element={<ProtectedRoute element={<Creators />} />}
          />
          <Route
            path="/about"
            element={<ProtectedRoute element={<About />} />}
          />
          <Route
            path="/contact"
            element={<ProtectedRoute element={<Contact />} />}
          />
          <Route
            path="/my-blogs"
            element={<ProtectedRoute element={<Myblogs />} />}
          />
          <Route
            path="/create-blogs"
            element={<ProtectedRoute element={<Create />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Myprofile />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/image/:id"
            element={<ProtectedRoute element={<Image />} />}
          />
          <Route
            path="*"
            element={<ProtectedRoute element={<Error />} />}
          />
        </Routes>
      </div>

      {!hide && <Footer />}
     
    </div>
  );
};

export default App;
