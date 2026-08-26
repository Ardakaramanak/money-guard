import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTransactions } from "../../redux/transactions/operations";
import {
  selectTransactionsError,
  selectTransactionsLoading,
} from "../../redux/transactions/selectors";

import { fetchTransactionCategories } from "../../redux/finance/operations";

import { TransactionsList } from "../../components/TransactionsList/TransactionsList";
import { ButtonAddTransactions } from "../../components/ButtonAddTransactions/ButtonAddTransactions";

const HomeTab = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectTransactionsLoading);
  const error = useSelector(selectTransactionsError);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchTransactionCategories());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section style={{ width: "100%", overflowX: "hidden", display: "block" }}>
      <TransactionsList />
      <ButtonAddTransactions />
    </section>
  );
};

export default HomeTab;
