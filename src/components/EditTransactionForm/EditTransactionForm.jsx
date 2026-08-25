import { useState } from "react";
import { useDispatch } from "react-redux";
import css from "./EditTransactionForm.module.css"; // CSS Modülü yüklendi

export const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(transaction.amount);
  const [comment, setComment] = useState(transaction.comment || "");
  const [transactionDate, setTransactionDate] = useState(
    new Date(transaction.transactionDate).toISOString().split("T")[0],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      id: transaction.id,
      amount: Number(amount),
      comment,
      transactionDate,
    };

    console.log("Güncellenen veri:", updatedData);
    onClose();
  };

  return (
    <form className={css.editTransactionForm} onSubmit={handleSubmit}>
      <div className={css.formField}>
        <label>Tutar</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className={css.formField}>
        <label>Tarih</label>
        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          required
        />
      </div>

      <div className={css.formField}>
        <label>Yorum</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
        />
      </div>

      <div className={css.formActions}>
        <button type="submit" className={css.saveBtn}>
          Save
        </button>

        <button type="button" className={css.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};
