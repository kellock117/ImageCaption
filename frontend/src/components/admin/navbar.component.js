import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../../utils/authContext";
import "./css/adnavbar.css"

export default function NavBar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="nav">
        <Link className="site-title" to={"/"}>
          Show And Tell
        </Link>
          <ul>
            <li>
              {currentUser ? (
                <button className="logButton" onClick={logout}>
                  Logout
                </button>
              ) : null}
            </li>
          </ul>
    </nav>
  );
}
