import { Navigate, Route, Routes } from "react-router-dom";

import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";

import HomeTab from "../../tabs/HomeTab/HomeTab";
import StatisticsTab from "../../tabs/StatisticsTab/StatisticsTab";

import css from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <div className={css.page}>
      <Header />

      <main className={css.main}>
        <aside className={css.sidebar}>
          <Navigation />
          <Balance />
          <Currency />
        </aside>

        <section className={css.content}>
          <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />
          </Routes>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;