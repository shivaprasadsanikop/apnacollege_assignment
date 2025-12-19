import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginPage from "./components/login/LoginPage";
import React from "react";
import AuthRoute from "./AuthRoute"; // import the wrapper
import Dashboard from "./components/main/Dashboard";
import Profile from "./components/main/Profile";
import Topics from "./components/topics/Topics";
import Progress from "./components/main/Progress";

function App() {
  return (
    <React.Fragment>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/profile" element={<Profile />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/progress" element={<Progress />} /> 
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;