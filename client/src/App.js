import { useState, useEffect, Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import Registration from "./components/Registration/Registration";
import CreateCompliant from "./components/CreateCompliant/CreateCompliant";
import { getUserDetails } from "./helper/SessionHelper";
import AdminDashBoard from "./components/AdminDashboard/AdminDashBoard";

function App() {
  const [user, setUser] = useState(getUserDetails());

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(getUserDetails()); // Refresh user details periodically
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    );
  }

  const role = user.role;

  return (
    <BrowserRouter>
      <Routes>
        {role === "admin" ? (
          <>
            <Route path="/" element={<AdminDashBoard />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCompliant />} />
            <Route path="/create/:id" element={<CreateCompliant />} />
          </>
        )}
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
