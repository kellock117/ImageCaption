import React from "react";
import Login from "../components/admin/login.component";
import NavBar from "../components/admin/navbar.component";
import History from "../components/admin/history.component";
import { useAuth } from "../utils/authContext";

export default function Admin() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      <NavBar />
      <div className="auth-inner">{currentUser ? <History /> : <Login />}</div>
    </div>
  );
}
