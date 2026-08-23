import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as yup from "yup";
import * as PasswordStrengthBarModule from "react-password-strength-bar";

import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const PasswordStrengthBar =
  PasswordStrengthBarModule.default?.default ??
  PasswordStrengthBarModule.default;

const schema = yup.object({
  username: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.auth.isLoading);

  const {
    register: registerField,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = async ({ username, email, password }) => {
    try {
      await dispatch(
        register({
          username,
          email,
          password,
        }),
      ).unwrap();

      toast.success("Registration successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Unable to register",
      );
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.title}>Money Guard</h1>

      <div className={css.field}>
        <input
          className={css.input}
          type="text"
          placeholder="Name"
          autoComplete="username"
          {...registerField("username")}
        />

        {errors.username && (
          <p className={css.error}>{errors.username.message}</p>
        )}
      </div>

      <div className={css.field}>
        <input
          className={css.input}
          type="email"
          placeholder="E-mail"
          autoComplete="email"
          {...registerField("email")}
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
          autoComplete="new-password"
          {...registerField("password")}
        />

        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={css.field}>
        <input
          className={css.input}
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          {...registerField("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className={css.error}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className={css.progress}>
        {PasswordStrengthBar && (
          <PasswordStrengthBar
            password={password || ""}
            minLength={6}
          />
        )}
      </div>

      <button
        className={css.primaryButton}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "REGISTERING..." : "REGISTER"}
      </button>

      <Link className={css.secondaryLink} to="/login">
        LOG IN
      </Link>
    </form>
  );
};

export default RegistrationForm;