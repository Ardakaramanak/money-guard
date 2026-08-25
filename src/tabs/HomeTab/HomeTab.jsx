import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTransactionCategories,
  fetchTransactions,
} from "../../redux/finance/operations";
import {
  selectFinanceError,
  selectFinanceLoading,
} from "../../redux/finance/selectors";

import { fetchTransactions as fetchMyTransactions } from "../../redux/transactions/operations";
import { TransactionsList } from "../../components/TransactionsList/TransactionsList";

const HomeTab = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFinanceLoading);
  const error = useSelector(selectFinanceError);

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
    <section>
      <TransactionsList />
    </section>
  );
};

export default HomeTab;
