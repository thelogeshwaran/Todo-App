import React, { useRef, useState } from "react";
import "./Signup.css";
import Button from "../../Components/Button/Button";
import { useAuthProvider } from "../../Context/AuthProvider";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const { signup } = useAuthProvider();

  async function handleSignUp(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setLoading(false);
      alert("Failed to connect");
    }
  }
  return (
    <div className="signup">
      <form className="form-signup" onSubmit={(event) => handleSignUp(event)}>
        <div className="signup__header">
          <h1>Create New Account</h1>
        </div>
        <div className="signup-block">
          <label htmlFor="signup-email">E-mail</label>
          <input id="signup-email" type="email" ref={emailRef} required></input>
        </div>
        <div className="signup-block">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            ref={passwordRef}
            required
          ></input>
        </div>
        <div className="signup-block">
          <label htmlFor="confirm-password">Re-Enter Password</label>
          <input
            id="confirm-password"
            type="password"
            ref={confirmPasswordRef}
            required
          ></input>
        </div>
        <Button content="Signup" disabled={loading}></Button>
        <div className="info">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
