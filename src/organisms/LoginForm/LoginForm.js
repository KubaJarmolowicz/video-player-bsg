import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = ({ handleLogIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleLogIn)}>
      <input
        placeholder="Username"
        {...register("username", { required: true })}
      />
      {errors.username && <span>Username is required</span>}
      <input
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>Password is required</span>}

      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
