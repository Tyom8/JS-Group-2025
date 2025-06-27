import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./i18n";
import AddTaskbar from "./pages/AddTaskbar";
import DashboardPage from "./pages/Dashboard";
import Layout from "./pages/Layout";
import LoginForm from "./pages/LoginForm";
import { useAppSelector } from "./store/hooks";
import store from "./store/store";

function AppContent() {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="taskbar" element={<AddTaskbar />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
