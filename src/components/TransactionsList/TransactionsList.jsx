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
      <table className={css.transactionsTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th></th>
            <th></th>
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
