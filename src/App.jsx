import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";

import PrivateRoute from "./routes/PrivateRoute";
import RestrictedRoute from "./routes/RestrictedRoute";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Loader />

      <Routes>
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/dashboard"
              component={<LoginPage />}
            />
          }
        />

        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/dashboard"
              component={<RegistrationPage />}
            />
          }
        />

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute redirectTo="/login" component={<DashboardPage />} />
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
