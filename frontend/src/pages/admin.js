import React from "react";
import Login from "../components/admin/login.component";
import NavBar from "../components/admin/navbar.component";
import CaptionHistory from "../components/admin/captionHistory.component";
import VQAHistory from "../components/admin/vqaHistory.component";
import { useAuth } from "../utils/authContext";

export default function Admin() {
  const { currentUser } = useAuth();

  return (
    <div className="App">
      <NavBar />
      <div className="auth-inner">
        {currentUser ? (
          <>
            <CaptionHistory />
            <VQAHistory />
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
