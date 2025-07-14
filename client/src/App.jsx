import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./component/Home/Home";
import Auth from "./component/Auth/Auth";
import Login from "./component/Auth/login";
import Signup from "./component/Auth/signup";
import MainLayout from "./Layout/mainlayout";
import AuthLayout from "./Layout/authlayout";
import SearchResults from "./component/SearchResults/SearchResults";
import AccountHistory from "./component/Account/AccountHistory";
import Header from "./component/Header/Header";
import Banner from "./component/Banner/Banner";
import FAQChatbot from "./component/FAQChatbot/FAQChatbot";
import RecyclePage from './component/Recycle/RecyclePage';

const App = () => {
  // CHANGE 1: Consolidate to single user state
  const [user, setUser] = useState(null);

  // CHANGE 2: Add effect to check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // CHANGE 3: Unified login handler
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // CHANGE 4: Complete logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      {/* CHANGE 5: Pass full user object instead of separate userName */}
      <Routes>
        <Route path="/" element={<MainLayout user={user} onLogout={handleLogout}><Home /></MainLayout>} />
        <Route path="/products" element={<MainLayout user={user} onLogout={handleLogout}><SearchResults /></MainLayout>} />
        <Route
          path="/account/history"
          element={user ? <MainLayout user={user} onLogout={handleLogout}><AccountHistory /></MainLayout> : <Navigate to="/auth" />}
        />
        <Route
          path="/recycle"
          element={user ? <MainLayout user={user} onLogout={handleLogout}><RecyclePage /></MainLayout> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={<MainLayout><Auth /></MainLayout>} />
       <Route
  path="/login"
  element={<MainLayout><Login onLogin={handleLogin} /></MainLayout>}
/>
        <Route
  path="/signup"
  element={<MainLayout><Signup onSignup={handleLogin} /></MainLayout>}
/>
      </Routes>
       <FAQChatbot />
    </BrowserRouter>
  );
};

export default App;



