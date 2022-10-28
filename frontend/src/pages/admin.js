import React from "react";
import Login from "../components/admin/login.component";
import NavBar from "../components/admin/navbar.component";
import History from "../components/admin/history.component";
import VQAHistory from "../components/admin/vqaHistory.component";
import { useAuth } from "../utils/authContext";

export default function Admin() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      <NavBar />
      <div>
        <div className="adminParent">
          {currentUser ? (
            <>
              <div className="adminChild"><History /></div>
              <div className="adminChild"><VQAHistory /></div>
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
}
