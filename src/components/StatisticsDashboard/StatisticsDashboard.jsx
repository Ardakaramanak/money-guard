import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionSummary } from '../../redux/transactions/operations';
import { selectTransactionsSummary } from '../../redux/transactions/selectors';
import Chart from '../Chart/Chart';
import StatisticsTable from '../StatisticsTable/StatisticsTable';
import css from './StatisticsDashboard.module.css';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const summary = useSelector(selectTransactionsSummary);

  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactionSummary({ month, year }));
  }, [dispatch, month, year]);

  const chartData = useMemo(() => {
    const categories = summary?.categoriesSummary ?? [];

    return {
      labels: categories.map(
        category => category.name ?? category.category
      ),
      values: categories.map(category =>
        Number(category.total ?? category.amount ?? 0)
      ),
    };
  }, [summary]);

  const years = useMemo(() => {
    const currentYear = currentDate.getFullYear();

    return Array.from(
      { length: 5 },
      (_, index) => currentYear - index
    );
  }, [currentDate]);

  const selectedMonth = MONTHS[month - 1];

  return (
    <section className={css.dashboard}>
      <h1 className={css.title}>Statistics</h1>

      <div className={css.content}>
        <div className={css.chartColumn}>
          <Chart data={chartData} />
        </div>

        <div className={css.details}>
          <div className={css.filters}>
            <div className={css.filter}>
              <span className={css.filterLabel}>Month</span>

              <div className={css.dropdown}>
                <button
                  type="button"
                  className={css.dropdownButton}
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === 'month' ? null : 'month'
                    )
                  }
                >
                  <span>{selectedMonth}</span>
                  <span
                    className={`${css.arrow} ${
                      openDropdown === 'month' ? css.arrowOpen : ''
                    }`}
                  >
                   ⌄
                  </span>
                </button>

                {openDropdown === 'month' && (
                  <div className={css.dropdownMenu}>
                    {MONTHS.map((monthName, index) => (
                      <button
                        type="button"
                        className={`${css.dropdownOption} ${
                          month === index + 1
                            ? css.dropdownOptionActive
                            : ''
                        }`}
                        key={monthName}
                        onClick={() => {
                          setMonth(index + 1);
                          setOpenDropdown(null);
                        }}
                      >
                        {monthName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={css.filter}>
              <span className={css.filterLabel}>Year</span>

              <div className={css.dropdown}>
                <button
                  type="button"
                  className={css.dropdownButton}
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === 'year' ? null : 'year'
                    )
                  }
                >
                  <span>{year}</span>
                  <span
                    className={`${css.arrow} ${
                      openDropdown === 'year' ? css.arrowOpen : ''
                    }`}
                  >
                   ⌄
                  </span>
                </button>

                {openDropdown === 'year' && (
                  <div className={css.dropdownMenu}>
                    {years.map(yearOption => (
                      <button
                        type="button"
                        className={`${css.dropdownOption} ${
                          year === yearOption
                            ? css.dropdownOptionActive
                            : ''
                        }`}
                        key={yearOption}
                        onClick={() => {
                          setYear(yearOption);
                          setOpenDropdown(null);
                        }}
                      >
                        {yearOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <StatisticsTable summary={summary} />
        </div>
      </div>
    </section>
  );
};

export default StatisticsDashboard;