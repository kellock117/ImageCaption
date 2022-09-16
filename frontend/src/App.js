import "./App.css";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./utils/authContext";
import Admin from "./pages/admin.js";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
