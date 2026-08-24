import { useState } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selectors";
import ModalLogout from "../ModalLogout/ModalLogout";
import css from "./Header.module.css";

const Header = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const user = useSelector(selectUser);

  const username = user?.email
    ? user.email.split("@")[0]
    : user?.username || "User";

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <div className={css.logo}>Money Guard</div>

          <div className={css.userMenu}>
            <span className={css.username}>{username}</span>

            <span className={css.divider} />

            <button
              className={css.exitButton}
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      {isLogoutModalOpen && (
        <ModalLogout
          onClose={() => setIsLogoutModalOpen(false)}
        />
      )}
    </>
  );
};

export default Header;