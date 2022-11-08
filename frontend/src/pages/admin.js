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
          {currentUser ? (
            <div>
              <h1>History Page</h1>
              <h3>View captioning and visual question answering history</h3>
                <div className="adminParent">
                  <div className="adminChild1"><History /></div>
                  <div className="adminChild2"><VQAHistory /></div>
                </div>
            </div>
          ) : (
            <Login />
          )}
    </div>
  );
}
