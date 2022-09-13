import React, { useRef, useState } from "react";
import { useAuth } from "../../utils/authContext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Invalid input");
    }

    setLoading(false);
  }

  return (
    <form action="#">
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          ref={emailRef}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          ref={passwordRef}
          required
        />
      </div>
      <div className="d-grid">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
      {error}
    </form>
  );
}
