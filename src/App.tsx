import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoardUsers from "./components/DashboardUsers/DashboardUsers";
import "./i18n";
import AddTaskbar from "./pages/AddTaskbar";
import LoginForm from "./pages/LoginForm";
import { useAppSelector } from "./store/hooks";
import store from "./store/store";

function AppContent() {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/">
        <Route path="dashboard" element={<DashBoardUsers />} />
        <Route path="taskbar/:id" element={<AddTaskbar />} />
      </Route>
    </Routes>
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
