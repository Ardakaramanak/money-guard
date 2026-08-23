import axios from "axios";

const currencyApi = axios.create({
  baseURL: "https://api.monobank.ua",
});

export const fetchCurrencyRates = async () => {
  const response = await currencyApi.get("/bank/currency");

  return response.data;
};

export default currencyApi;