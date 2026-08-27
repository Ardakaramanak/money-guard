import { useEffect } from "react";
import { EditTransactionForm } from "../EditTransactionForm/EditTransactionForm";
import css from "./ModalEditTransaction.module.css";

export const ModalEditTransaction = ({ transaction, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.modalOverlay} onClick={handleOverlayClick}>
      <div className={css.modalContent}>
        <button type="button" className={css.modalCloseBtn} onClick={onClose}>
          &times;
        </button>

        <h2 className={css.modalTitle}>İşlemi Düzenle</h2>

        <EditTransactionForm transaction={transaction} onClose={onClose} />
      </div>
    </div>
  );
};
