import { useState } from "react";
import { ModalAddTransaction } from "../ModalAddTransaction/ModalAddTransaction";
import css from "./ButtonAddTransactions.module.css";

export const ButtonAddTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Ekranın sağ altına sabitlenen, üzerinde "+" simgesi olan buton */}
      <button
        type="button"
        className={css.addTransactionBtn}
        onClick={openModal}
        aria-label="Yeni işlem ekle"
      >
        +
      </button>

      {/* State true olduğunda modal pencereyi açar */}
      {isModalOpen && <ModalAddTransaction onClose={closeModal} />}
    </>
  );
};
