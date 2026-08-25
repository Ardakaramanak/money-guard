import { useEffect } from "react";
import { AddTransactionForm } from "../AddTransactionForm/AddTransactionForm";
import css from "./ModalAddTransaction.module.css";

export const ModalAddTransaction = ({ onClose }) => {
  // Escape tuşu dinleyicisi
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Arka plan kaymasını engelle

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Arka plan (Overlay) tıklama kontrolü
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={css.modalOverlay} onClick={handleOverlayClick}>
      <div className={css.modalContent}>
        <button type="button" className={css.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
        <h2 className={css.modalTitle}>İşlem Ekle</h2>
        <AddTransactionForm onClose={onClose} />
      </div>
    </div>
  );
};
