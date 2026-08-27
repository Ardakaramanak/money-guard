import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";

import { updateTransaction } from "../../redux/transactions/operations";
import css from "./EditTransactionForm.module.css";

export const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(Math.abs(transaction.amount));
  const [comment, setComment] = useState(transaction.comment || "");
  const [transactionDate, setTransactionDate] = useState(
    new Date(transaction.transactionDate),
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalAmount =
      transaction.type === "EXPENSE"
        ? -Math.abs(Number(amount))
        : Math.abs(Number(amount));

    const updatedData = {
      id: transaction.id,
      transactionDate: transactionDate.toISOString(),
      type: transaction.type,
      categoryId: transaction.categoryId,
      comment: comment,
      amount: finalAmount,
    };

    toast
      .promise(dispatch(updateTransaction(updatedData)).unwrap(), {
        loading: "İşlem güncelleniyor...",
        success: "İşlem başarıyla güncellendi! 📝",
        error: (err) =>
          `Güncelleme başarısız: ${err || "Bilinmeyen bir hata oluştu."}`,
      })
      .then(() => {
        onClose(); // İstek başarılı olduğunda modal kapatılır
      })
      .catch((error) => {
        console.error("Güncelleme hatası:", error);
      });
  };

  const isIncome = transaction.type === "INCOME";

  return (
    <div className={css.formContainer}>
      <button
        type="button"
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Close"
      >
        <IoClose size={24} />
      </button>
      <h2 className={css.modalTitle}>Edit transaction</h2>
      <div className={css.typeIndicatorContainer}>
        <span
          className={`${css.typeLabel} ${isIncome ? css.activeIncome : css.inactiveLabel}`}
        >
          Income
        </span>
        <span className={css.divider}>/</span>
        <span
          className={`${css.typeLabel} ${!isIncome ? css.activeExpense : css.inactiveLabel}`}
        >
          Expense
        </span>
      </div>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.rowFields}>
          <div className={css.fieldGroup}>
            <input
              type="number"
              step="any"
              placeholder="0.00"
              className={`${css.input} ${css.amountInput}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className={css.fieldGroupRelative}>
            <DatePicker
              className={css.input}
              selected={transactionDate}
              onChange={(date) => setTransactionDate(date)}
              dateFormat="dd.MM.yyyy"
              wrapperClassName={css.datePickerWrapper}
              required
            />
            <MdOutlineCalendarMonth className={css.calendarIcon} size={20} />
          </div>
        </div>

        <div className={css.fieldGroupFull}>
          <input
            type="text"
            placeholder="Comment"
            className={css.input}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <div className={css.formActions}>
          <button type="submit" className={css.saveBtn}>
            SAVE
          </button>
          <button type="button" className={css.cancelBtn} onClick={onClose}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};
