import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as yup from "yup";

import { login } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.auth.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Unable to log in",
      );
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.title}>Money Guard</h1>

      <div className={css.field}>
        <input
          className={css.input}
          type="email"
          placeholder="E-mail"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && (
          <p className={css.error}>{errors.email.message}</p>
        )}
      </div>

      <div className={css.field}>
        <input
          className={css.input}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password")}
        />

        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>

      <button
        className={css.primaryButton}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "LOGGING IN..." : "LOG IN"}
      </button>

      <Link className={css.secondaryLink} to="/register">
        REGISTER
      </Link>
    </form>
  );
};

export default LoginForm;