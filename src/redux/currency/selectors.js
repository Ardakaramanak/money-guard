export const selectCurrencyRates = (state) => state.currency.rates;

export const selectCurrencyLoading = (state) => state.currency.isLoading;

export const selectCurrencyError = (state) => state.currency.error;