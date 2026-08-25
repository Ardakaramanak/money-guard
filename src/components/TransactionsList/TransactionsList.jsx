import { useSelector } from "react-redux";

import {
  selectTransactions,
  selectTransactionsError,
  selectTransactionsLoading,
} from "../../redux/transactions/selectors";
import { TransactionsItem } from "../TransactionsItem/TransactionsItem";

import css from "./TransactionsList.module.css";

export const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectTransactionsLoading);
  const error = useSelector(selectTransactionsError);

  if (isLoading) {
    return (
      <p className={css.transactionsLoading}>
        İşlemler yükleniyor...
      </p>
    );
  }

  if (error) {
    return (
      <p className={css.transactionsError}>
        Hata oluştu: {error}
      </p>
    );
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
            <TransactionsItem
              key={transaction.id}
              transaction={transaction}
              viewType="desktop"
            />
          ))}
        </tbody>
      </table>

      <div className={css.transactionsMobileWrapper}>
        {transactions.map((transaction) => (
          <TransactionsItem
            key={transaction.id}
            transaction={transaction}
            viewType="mobile"
          />
        ))}
      </div>
    </div>
  );
};