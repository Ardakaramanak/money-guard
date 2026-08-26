import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../redux/transactions/operations";
import { ModalEditTransaction } from "../ModalEditTransaction/ModalEditTransaction";
import css from "./TransactionsItem.module.css";
import { selectCategories } from "../../redux/finance/selectors";
import { BsPencil } from "react-icons/bs";

export const TransactionsItem = ({ transaction, viewType }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Redux store'dan kategorileri çekiyoruz
  const categories = useSelector(selectCategories);

  const { id, transactionDate, type, comment, amount, categoryId, category } =
    transaction;
  // 2. Dolu olan ID anahtarını seçin
  const targetedCategoryId = categoryId || category;

  // 3. Reaktif bulma mantığı: Eğer categories yüklenmişse arama yap, yoksa hata verme
  const currentCategory =
    categories && categories.length > 0
      ? categories.find((cat) => cat.id === targetedCategoryId)
      : null;

  // 4. Ekrana basılacak nihai metin kuralı
  const categoryName =
    type === "INCOME"
      ? "Gelir"
      : currentCategory
        ? currentCategory.name
        : "Yükleniyor...";
  const handleDelete = () => {
    if (window.confirm("Bu işlemi silmek istediğinize emin misiniz?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const isIncome = type === "INCOME";
  const typeColor = isIncome
    ? "var(--orange-color, #ff9800)"
    : "var(--coral-color, #ff6b6b)";

  // MASAÜSTÜ GÖRÜNÜMÜ RENDER ETMEK
  if (viewType === "desktop") {
    return (
      <>
        <tr className={css.desktopRow}>
          <td>{new Date(transactionDate).toLocaleDateString()}</td>
          <td style={{ color: typeColor }}>{isIncome ? "+" : "-"}</td>
          <td>{categoryName}</td>
          <td>{comment || "-"}</td>
          <td style={{ color: typeColor, fontWeight: "bold" }}>{amount}</td>
          <td>
            <button
              type="button"
              className={css.editIconBtn}
              onClick={openEditModal}
            >
              <BsPencil className={css.pencilIcon} />
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
        {isEditModalOpen && (
          <ModalEditTransaction
            transaction={transaction}
            onClose={closeEditModal}
          />
        )}
      </>
    );
  }

  // MOBİL GÖRÜNÜMÜ RENDER ETMEK
  if (viewType === "mobile") {
    return (
      <>
        <div
          className={`${css.mobileCard} ${isIncome ? css.incomeBorder : css.expenseBorder}`}
        >
          <div className={css.cardLine}>
            <span>Date</span>
            <span>
              {new Date(transactionDate).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </span>
          </div>
          <div className={css.cardLine}>
            <span>Type</span>
            <span>{isIncome ? "+" : "-"}</span>
          </div>
          <div className={css.cardLine}>
            <span>Category</span>
            <span>{categoryName}</span>
          </div>
          <div className={css.cardLine}>
            <span>Comment</span>
            <span className={css.commentText}>{comment || "-"}</span>
          </div>
          <div className={css.cardLine}>
            <span>Sum</span>
            <span style={{ color: typeColor, fontWeight: "bold" }}>
              {Number(amount).toFixed(2)}
            </span>
          </div>

          {/* Görseldeki gibi Delete solda gradyanlı, Edit sağda kalem şeklinde */}
          <div className={css.cardActionsRow}>
            <button
              type="button"
              className={css.deleteBtnMobile}
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className={css.editIconBtnMobile}
              onClick={openEditModal}
            >
              <BsPencil className={css.pencilIcon} /> Edit
            </button>
          </div>
        </div>

        {isEditModalOpen && (
          <ModalEditTransaction
            transaction={transaction}
            onClose={closeEditModal}
          />
        )}
      </>
    );
  }

  return null;
};
