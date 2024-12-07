import LoginForm from "./pages/Login/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard";
import RequireAuth from './components/RequireAuth';
import { Routes, Route, Navigate } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import Layout from "./components/Layout/Layout";
import './App.css'

function App() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        
        {/* Private Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />} >
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<RegisterForm/>} />
            </Route>
          </Route>
        </Route>

        {/* Redirect root to /login or a public route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
}

export default App;