import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../utils/authContext";

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logout();
    } catch {
      setError("Cannot log out");
    }

    setLoading(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/sign-in"}>
          Show And Tell
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/sign-in"}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/sign-up"}>
                Sign up
              </Link>
            </li>
            <li>
              {currentUser ? (
                <button onClick={handleSubmit} className="btn btn-primary">
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
