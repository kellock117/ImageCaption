import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../../utils/authContext";

export default function NavBar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          Show And Tell
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li>
              {currentUser ? (
                <button onClick={logout} className="btn btn-primary">
                  logout
                </button>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
