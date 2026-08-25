import css from './StatisticsTable.module.css';

const StatisticsTable = ({ summary }) => {
  const categories = summary?.categoriesSummary ?? [];
  const income = Number(summary?.incomeSummary ?? 0);
  const expenses = Number(summary?.expenseSummary ?? 0);

  return (
    <div className={css.table}>
      <div className={css.header}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      <div className={css.rows}>
        {categories.map((category, index) => {
          const name = category.name ?? category.category ?? 'Unknown';
          const total = Number(category.total ?? category.amount ?? 0);

          return (
            <div className={css.row} key={`${name}-${index}`}>
              <div className={css.category}>
                <span className={css.categoryMarker} aria-hidden="true" />
                <span>{name}</span>
              </div>
              <span className={css.amount}>{total.toFixed(2)}</span>
            </div>
          );
        })}
      </div>

      <div className={css.totals}>
        <div className={css.totalRow}>
          <span>Expenses</span>
          <span className={css.expenses}>{expenses.toFixed(2)}</span>
        </div>

        <div className={css.totalRow}>
          <span>Income</span>
          <span className={css.income}>{income.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;