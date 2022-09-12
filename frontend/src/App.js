import "./App.css";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
