// src/pages/DashboardPage.js
import React from "react";

const DashboardPage = () => {
  console.log("hello");
  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard!</h2>
      <p>This is a protected route, and only logged-in users can see it.</p>
    </div>
  );
};

export default DashboardPage;
