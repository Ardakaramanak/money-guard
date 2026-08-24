import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import {
  selectTransactions,
  selectTransactionsLoading,
  selectTransactionsError,
} from "../../redux/transactions/selectors";
import { TransactionsItem } from "../TransactionsItem/TransactionsItem";
import css from "./TransactionsList.module.css"; // CSS Modülü içeri aktarıldı

export const TransactionsList = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectTransactionsLoading);
  const error = useSelector(selectTransactionsError);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (isLoading) {
    return <p className={css.transactionsLoading}>İşlemler yükleniyor...</p>;
  }

  if (error) {
    return <p className={css.transactionsError}>Hata oluştu: {error}</p>;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className={css.transactionsPlaceholder}>
        <p>Henüz hiç finansal işlem gerçekleştirmediniz.</p>
      </div>
    );
  }

  return (
    <div className={css.transactionsListContainer}>
      {/* MASAÜSTÜ VE TABLET TABLOSU */}
      <table className={css.transactionsTable}>
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Tür</th>
            <th>Kategori</th>
            <th>Yorum</th>
            <th>Tutar</th>
            <th>Düzenle</th>
            <th>Aksiyon</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionsItem key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>

      {/* MOBİL KART LİSTESİ */}
      <div className={css.transactionsMobileWrapper}>
        {transactions.map((transaction) => (
          <TransactionsItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};
