import React, { useState } from "react";
import "./Signup.css";
import Button from "../../Components/Button/Button";
import { useAuthProvider } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Signup() {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthProvider();

  const schema = yup.object().shape({
    FirstName: yup.string().min(5).max(20).required(),
    LastName: yup.string().max(20).required(),
    Email: yup.string().email().required(),
    Password: yup.string().min(8).max(32).required(),
    Phone: yup.string().min(10).max(12).required(),
    State: yup.string().required(),
    Gender: yup.string().required(),
    Terms: yup.boolean().oneOf([true], "Agree to the terms and conditions!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    await signup(data);
    reset();
  };

  return (
    <div className="Form">
      <div className="signupHeading">
        <h1>Signup</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <input
            className="inputForm"
            type="text"
            placeholder="First Name"
            {...register("FirstName")}
          ></input>

          <input
            className="inputForm"
            type="text"
            placeholder="Last Name"
            {...register("LastName")}
          ></input>
        </div>
        <p className="errorInfo">{errors.FirstName?.message}</p>
        <p className="errorInfo">{errors.LastName?.message}</p>

        <input
          className="inputForm"
          type="email"
          id="email"
          placeholder="Email"
          {...register("Email")}
        ></input>
        <p className="errorInfo">{errors.Email?.message}</p>

        <input
          className="inputForm"
          type="number"
          id="phone"
          placeholder="Phone"
          {...register("Phone")}
        ></input>
        <p className="errorInfo">{errors.Phone?.message}</p>

        <input
          className="inputForm"
          type="password"
          placeholder="Password"
          {...register("Password")}
        ></input>
        {errors.Password && (
          <p className="errorInfo">{errors.Password.message}</p>
        )}

        <div className="field">
          <select id="state" className="inputForm" {...register("State")}>
            <option value="">State</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Goa">Goa</option>
          </select>
        </div>
        <p className="errorInfo">{errors.State?.message}</p>

        <div className="radioSelect">
          <p>Select your Gender: </p>
          <input
            className="radioButtons"
            {...register("Gender")}
            type="radio"
            value="Male"
            id="male"
          />
          <label htmlFor="male">Male </label>

          <input
            className="radioButtons"
            {...register("Gender")}
            type="radio"
            value="Female"
            id="female"
          />
          <label htmlFor="female">Female </label>
        </div>
        <p className="errorInfo">{errors.Gender ? "This is required" : ""}</p>

        <div className="field">
          <input
            type="checkbox"
            className="checkBox"
            id="terms"
            {...register("Terms")}
          ></input>
          <label htmlFor="terms"> I Agree to the Terms and conditions.</label>
        </div>
        <p className="errorInfo">{errors.Terms?.message}</p>

        <Button content="Submit" disabled={loading} />
        <div className="info">
          Already have an account?{" "}
          <Link className="signupLink" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
