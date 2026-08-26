import React, { useEffect } from "react";
import { AddTransactionForm } from "../AddTransactionForm/AddTransactionForm";
import css from "./ModalAddTransaction.module.css"; // Dosya isminiz farklıysa güncelleyin

export const ModalAddTransaction = ({ onClose }) => {
  // ESC tuşuna basınca modalın kapanmasını sağlayan fonksiyon
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Arka plana (backdrop) tıklayınca modalın kapanmasını sağlayan fonksiyon
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      {/* 
        Mükerrer siyah başlık şeridi ve dışarıdaki butonlar tamamen temizlendi.
        Sadece içerideki mor kutu çağrılıyor.
      */}
      <AddTransactionForm onClose={onClose} />
    </div>
  );
};
