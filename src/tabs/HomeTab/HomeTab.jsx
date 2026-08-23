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

  return <section />;
};

export default HomeTab;