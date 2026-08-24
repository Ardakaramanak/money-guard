import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrencyRates } from "../../redux/currency/operations";
import {
  selectCurrencyError,
  selectCurrencyLoading,
  selectCurrencyRates,
} from "../../redux/currency/selectors";
import css from "./Currency.module.css";

const Currency = () => {
  const dispatch = useDispatch();

  const rates = useSelector(selectCurrencyRates);
  const isLoading = useSelector(selectCurrencyLoading);
  const error = useSelector(selectCurrencyError);

  useEffect(() => {
    dispatch(getCurrencyRates());
  }, [dispatch]);

  const usd = rates.find(
    (rate) => rate.currencyCodeA === 840 && rate.currencyCodeB === 980,
  );

  const eur = rates.find(
    (rate) => rate.currencyCodeA === 978 && rate.currencyCodeB === 980,
  );

  if (isLoading) {
    return <p className={css.message}>Loading currency...</p>;
  }

  if (error) {
    return <p className={css.message}>{error}</p>;
  }

  return (
    <div className={css.currency}>
      <div className={css.headerRow}>
        <span>Currency</span>
        <span>Purchase</span>
        <span>Sale</span>
      </div>

      <div className={css.row}>
        <span>USD</span>
        <span>{usd?.rateBuy?.toFixed(2) ?? "-"}</span>
        <span>{usd?.rateSell?.toFixed(2) ?? "-"}</span>
      </div>

      <div className={css.row}>
        <span>EUR</span>
        <span>{eur?.rateBuy?.toFixed(2) ?? "-"}</span>
        <span>{eur?.rateSell?.toFixed(2) ?? "-"}</span>
      </div>

      <div className={css.chartPlaceholder} />
    </div>
  );
};

export default Currency;