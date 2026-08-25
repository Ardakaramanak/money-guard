import { useSelector } from "react-redux";

import { selectTotalBalance } from "../../redux/transactions/selectors";
import css from "./Balance.module.css";

const Balance = () => {
  const totalBalance = useSelector(selectTotalBalance);

  return (
    <div className={css.balance}>
      <p className={css.label}>YOUR BALANCE</p>

      <p className={css.amount}>
        ₴ {Number(totalBalance).toFixed(2)}
      </p>
    </div>
  );
};

export default Balance;