import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/authContext";
import Main from "./pages/main.js";
import Admin from "./pages/admin.js";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
