import React, {useRef} from "react";
import "./Signup.css";
import Button from "../../Components/Button/Button";


function handleSignUp() {}



function Signup() {
    const emailRef = useRef();
const passwordRef = useRef();
  return (
    <div className="signup">
      <form className="form-signup" onSubmit={(event) => handleSignUp(event)}>
        <div className="signup__header">
          <h1>Create New Account</h1>
        </div>
        {/* <div className="signup-block">
          <label for="name">Name</label>
          <input id="name" type="text" required></input>
        </div> */}
        <div className="signup-block">
          <label for="signup-email">E-mail</label>
          <input id="signup-email" type="email" required></input>
        </div>
        <div className="signup-block">
          <label for="signup-password">Password</label>
            <input id="signup-password" type="password" required></input>
        </div>
        <Button content="Signup"></Button>
      </form>
    </div>
  );
}

export default Signup;
