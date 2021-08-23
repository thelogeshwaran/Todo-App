import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import styles from "./ReactForm.module.css";

function ReactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.Form}>
      <div className={styles.heading}>
        <h1>Enter your Details</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name:</label>
        <input
          className={styles.inputForm}
          type="text"
          id="firstName"
          {...register("First name")}
        ></input>

        <label htmlFor="lastName">Last Name:</label>
        <input
          className={styles.inputForm}
          type="text"
          id="lastName"
          {...register("Last name")}
        ></input>

        <label htmlFor="email">Email:</label>
        <input
          className={styles.inputForm}
          type="text"
          id="email"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        ></input>
        {errors.Email && (
          <p className={styles.errorInfo}>Enter a valid Email</p>
        )}

        <label htmlFor="phone">Phone No:</label>
        <input
          className={styles.inputForm}
          type="text"
          id="phone"
          {...register("Phone", {
            required: true,
            minLength: 10,
            maxLength: 12,
          })}
        ></input>
        {errors.Phone && (
          <p className={styles.errorInfo}>Enter a valid Phone No</p>
        )}

        <label htmlFor="state">State: </label>
        <select
          id="state"
          className={styles.inputForm}
          {...register("State", { required: true })}
        >
          <option value="">Select...</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Goa">Goa</option>
        </select>
        {errors.State && (
          <p className={styles.errorInfo}>Select a valid option</p>
        )}

        <div className={styles.radioSelect}>
          <p>Select your Gender: </p>
          <input
            className={styles.radioButtons}
            {...register("Gender", { required: true })}
            type="radio"
            value="Male"
            id="male"
          />
          <label htmlFor="male">Male </label>

          <input
            className={styles.radioButtons}
            {...register("Gender", { required: true })}
            type="radio"
            value="Female"
            id="female"
          />
          <label htmlFor="female">Female </label>
        </div>
        {errors.Gender && (
          <p className={styles.errorInfo}>Select a valid option</p>
        )}

        <Button content="Submit" />
      </form>
    </div>
  );
}

export default ReactForm;
