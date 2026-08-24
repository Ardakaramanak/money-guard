import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import css from "./Navigation.module.css";

const Navigation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <nav className={css.navigation}>
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          `${css.link} ${isActive ? css.active : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) =>
          `${css.link} ${isActive ? css.active : ""}`
        }
      >
        Statistics
      </NavLink>

      {isMobile && (
        <NavLink
          to="/dashboard/currency"
          className={({ isActive }) =>
            `${css.link} ${isActive ? css.active : ""}`
          }
        >
          Currency
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;