import React, { FC } from "react";
import { useForm } from "react-hook-form";
import FormField from "components/molecules/FormField/FormField";
import { Button } from "components/atoms/Button/Button";

import { ILoginData } from "hooks/useAuth";

interface ILoginFormProps {
  handleLogIn: (data: ILoginData) => void;
  shouldDisableSubmit: boolean;
}

const LoginForm: FC<ILoginFormProps> = ({
  handleLogIn,
  shouldDisableSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(handleLogIn)}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormField
        label="username"
        id="username"
        placeholder="Username"
        {...register("username", { required: true })}
      />
      {errors.username && <span>Username is required</span>}
      <FormField
        label="password"
        id="password"
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>Password is required</span>}

      <Button type="submit" disabled={shouldDisableSubmit} isBig>
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
