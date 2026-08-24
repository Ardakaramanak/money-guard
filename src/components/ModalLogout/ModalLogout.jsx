import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logout } from "../../redux/auth/operations";
import css from "./ModalLogout.module.css";

const ModalLogout = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Logout failed",
      );
    } finally {
      onClose();
      navigate("/login", { replace: true });
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2 className={css.title}>Money Guard</h2>

        <p className={css.text}>
          Are you sure you want to log out?
        </p>

        <button
          className={css.logoutButton}
          type="button"
          onClick={handleLogout}
        >
          LOG OUT
        </button>

        <button
          className={css.cancelButton}
          type="button"
          onClick={onClose}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default ModalLogout;