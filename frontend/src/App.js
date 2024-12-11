import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import RequireAuth from './components/RequireAuth';
import { Routes, Route, Navigate } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import './App.css'
import HomePage from "./pages/Home";

function App() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        
        {/* Private Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterForm/>} />
          </Route>
        </Route>

        {/* Redirect root to /login or a public route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
}

export default App;