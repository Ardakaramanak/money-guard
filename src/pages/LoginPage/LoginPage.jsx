import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <main className={css.page}>
      <LoginForm />
    </main>
  );
};

export default LoginPage;