import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginPage";
import HomePage from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Home" element={<HomePage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
