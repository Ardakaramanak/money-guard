import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

import { selectIsLoading as selectAuthLoading } from "../../redux/auth/selectors";
import { selectFinanceLoading } from "../../redux/finance/selectors";
import { selectCurrencyLoading } from "../../redux/currency/selectors";

const Loader = () => {
  const authLoading = useSelector(selectAuthLoading);
  const financeLoading = useSelector(selectFinanceLoading);
  const currencyLoading = useSelector(selectCurrencyLoading);

  const isLoading = authLoading || financeLoading || currencyLoading;

  if (!isLoading) {
    return null;
  }

  return (
    <div>
      <Oval
        height={60}
        width={60}
        visible
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;