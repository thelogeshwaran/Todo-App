import React, { useRef, useState } from "react";
import "./Signup.css";
import Button from "../../Components/Button/Button";
import { useAuthProvider } from "../../Context/AuthProvider";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [ loading, setLoading ] = useState(false);
  let history = useHistory();

  const { signup, currentUser } = useAuthProvider();

  async function handleSignUp(e) {
    e.preventDefault();
    try{
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/");
    }
    catch{
      setLoading(false)
      alert("Failed to connect")
    }
  }
  return (
    <div className="signup">
      <form className="form-signup" onSubmit={(event) => handleSignUp(event)}>
        <div className="signup__header">
          <h1>Create New Account</h1>
          {currentUser && currentUser.email}
        </div>
        <div className="signup-block">
          <label htmlFor="signup-email">E-mail</label>
          <input id="signup-email" type="email" ref={emailRef} required></input>
        </div>
        <div className="signup-block">
          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" type="password" ref={passwordRef} required></input>
        </div>
        <Button content="Signup" disabled = {loading}></Button>
        <div className="info"> 
            Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;