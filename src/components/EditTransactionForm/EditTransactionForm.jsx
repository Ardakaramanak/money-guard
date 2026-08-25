import { useState } from "react";
import { useDispatch } from "react-redux";
// 1. Kendi transactions operations dosyanızdan thunk'ı içeri aktarın
import { updateTransaction } from "../../redux/transactions/operations";
import css from "./EditTransactionForm.module.css";

export const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(transaction.amount);
  const [comment, setComment] = useState(transaction.comment || "");
  const [transactionDate, setTransactionDate] = useState(
    new Date(transaction.transactionDate).toISOString().split("T")[0],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Tutar Kontrolü: Gider (EXPENSE) ise tutarın negatif, Gelirsa pozitif gitmesi gerekir
    const finalAmount =
      transaction.type === "EXPENSE"
        ? -Math.abs(Number(amount))
        : Math.abs(Number(amount));

    // 2. GoIT Backend Güncelleme İsteğinde 'id' ve 'type' alanlarını gövdeden (body) AYRI tutabilir
    // veya tam paket isteyebilir. Çakışmayı önlemek için tam uyumlu paket hazırlıyoruz:
    const updatedData = {
      id: transaction.id, // İşlem ID'si (Thunk içinde URL'e koymak için gerekebilir)
      transactionDate: new Date(transactionDate).toISOString(), // Tarihi ISO dizisine çeviriyoruz
      type: transaction.type, // İşlem türü (INCOME/EXPENSE) değiştirilemez, aynen koruyoruz
      categoryId: transaction.categoryId, // Mevcut kategori kimliğini aynen koruyoruz
      comment: comment, // Kullanıcının değiştirdiği yeni yorum
      amount: finalAmount, // Kullanıcının değiştirdiği yeni tutar
    };

    // 3. Redux Thunk operasyonunu tetikliyoruz
    dispatch(updateTransaction(updatedData))
      .unwrap()
      .then(() => {
        onClose(); // İşlem başarılıysa modal pencereyi kapat
      })
      .catch((error) => {
        // Backend'den dönen asıl hatayı yakalıyoruz
        alert("Güncelleme sırasında bir hata oluştu: " + error);
      });
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
