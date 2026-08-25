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
import { TransactionsList } from "../../components/TransactionsList/TransactionsList";
import { ButtonAddTransactions } from "../../components/ButtonAddTransactions/ButtonAddTransactions";

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
    <section style={{ position: "relative", minHeight: "100%" }}>
      {/* Mevcut işlem tablonuz */}
      <TransactionsList />

      {/* 2. Sağ alt köşede duracak olan buton bileşenimiz */}
      <ButtonAddTransactions />
    </section>
  );
};

export default HomeTab;
