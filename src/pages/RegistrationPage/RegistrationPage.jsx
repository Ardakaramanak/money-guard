import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <main className={css.page}>
      <RegistrationForm />
    </main>
  );
};

export default RegistrationPage;