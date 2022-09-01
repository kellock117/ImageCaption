import React from "react";
import Login from "../components/admin/login.component";
import NavBar from "../components/admin/navbar.component";

export default function Admin() {
  return (
    <div className="App">
      <NavBar />
      <div className="auth-inner">
        <Login />
      </div>
    </div>
  );
}
