import React, { useRef, useState } from "react";
import "./Signup.css";
import Button from "../../Components/Button/Button";
import { useAuthProvider } from "../../Context/AuthProvider";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const { login } = useAuthProvider();
  let history = useHistory();

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
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
          <h1>Welcome Back!</h1>
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
        <Button content="Login" disabled={loading}></Button>
        <div>
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
