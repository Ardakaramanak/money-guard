import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../redux/transactions/operations";
import { ModalEditTransaction } from "../ModalEditTransaction/ModalEditTransaction";
import css from "./TransactionsItem.module.css"; // CSS Modülü içeri aktarıldı

export const TransactionsItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { id, transactionDate, type, comment, amount } = transaction;

  const handleDelete = () => {
    if (window.confirm("Bu işlemi silmek istediğinize emin misiniz?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const isIncome = type === "INCOME";
  // Tür rengini CSS değişkenleri üzerinden dinamik yönetiyoruz
  const typeColor = isIncome
    ? "var(--orange-color, #ff9800)"
    : "var(--coral-color, #ff6b6b)";

  return (
    <>
      {/* 1. MASAÜSTÜ VE TABLET İÇİN TABLO SATIRI */}
      <tr className={css.desktopRow}>
        <td>{new Date(transactionDate).toLocaleDateString()}</td>
        <td style={{ color: typeColor }}>{isIncome ? "+" : "-"}</td>
        <td>{/* İşlem Kategorisi */}</td>
        <td>{comment || "-"}</td>
        <td style={{ color: typeColor, fontWeight: "bold" }}>{amount}</td>
        <td>
          <button
            type="button"
            className={css.editIconBtn}
            onClick={openEditModal}
            title="Düzenle"
          >
            ✏️ button
          </button>
        </td>
        <td>
          <button
            type="button"
            className={css.deleteBtn}
            onClick={handleDelete}
          >
            Delete
          </button>
        </td>
      </tr>

      {/* 2. MOBİL CİHAZLAR İÇİN KART GÖRÜNÜMÜ */}
      <div
        className={`${css.mobileCard} ${isIncome ? css.incomeBorder : css.expenseBorder}`}
      >
        <div className={css.cardLine}>
          <span>Tarih</span>
          <span>{new Date(transactionDate).toLocaleDateString()}</span>
        </div>
        <div className={css.cardLine}>
          <span>Tür</span>
          <span style={{ color: typeColor }}>
            {isIncome ? "Gelir" : "Gider"}
          </span>
        </div>
        <div className={css.cardLine}>
          <span>Kategori</span>
          <span>{/* İşlem Kategorisi */}</span>
        </div>
        <div className={css.cardLine}>
          <span>Yorum</span>
          <span>{comment || "-"}</span>
        </div>
        <div className={css.cardLine}>
          <span>Tutar</span>
          <span style={{ color: typeColor, fontWeight: "bold" }}>
            {isIncome ? amount : `-${amount}`}
          </span>
        </div>
        <div className={css.cardActionsRow}>
          <button
            type="button"
            className={css.editIconBtnMobile}
            onClick={openEditModal}
          >
            ✏️ button
          </button>
          <button
            type="button"
            className={css.deleteBtnMobile}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* 3. DÜZENLEME MODAL PENCERESİ */}
      {isEditModalOpen && (
        <ModalEditTransaction
          transaction={transaction}
          onClose={closeEditModal}
        />
      )}
    </>
  );
};
