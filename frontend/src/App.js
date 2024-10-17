import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import HomePage from "./pages/Home";
import TestPage from './pages/test';
import RequireAuth from './components/requireAuth';
import { Routes, Route, Navigate } from "react-router-dom";
import PersistLogin from "./components/persistLogin";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/register" element={<RegisterForm/>} />
      
      {/* Private Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Route>

      {/* Redirect root to /login or a public route */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;