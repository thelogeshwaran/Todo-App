import React, { useRef, useState } from "react";
import "./Signup.css";
import Button from "../../Components/Button/Button";
import { useAuthProvider } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const { login } = useAuthProvider();

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setLoading(false);
      alert("Failed to connect");
    }
  }
  return (
    <div className="Form">
      <form className="form-signup" onSubmit={(event) => handleSignUp(event)}>
        <div className="signupHeading">
          <h1>Welcome Back!</h1>
        </div>

        <input
          className="inputForm"
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        ></input>

        <input
          placeholder="Password"
          className="inputForm"
          id="signup-password"
          type="password"
          ref={passwordRef}
          required
        ></input>
        <Button content="Login" disabled={loading}></Button>
        <div>
          Don't have an account?{" "}
          <Link className="signupLink" to="/signup">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
