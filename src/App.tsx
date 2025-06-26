import "./App.css";
import Header from "./components/Header/Header";
import Taskbar from "./components/Taskbar/Taskbar";
import AddTaskbar from "./pages/AddTaskbar";
import DashboardPage from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import store from "./store/store"
import "./i18n";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      {/* <DashBoardUsers /> */}
      {/* <AddTaskbar /> */}
      {/* <Header /> */}
      {/* <ProjectsList /> */}
      {/* <LoginForm /> */}
      {/* <DashboardPage /> */}
      {/* <Taskbar /> */}
      <AddTaskbar />
    </Provider>
  );
}

export default App;
