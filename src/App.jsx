import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListUsers from "./pages/listUsers";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/users" element={
            <ProtectedRoute>
              <ListUsers />
            </ProtectedRoute>
          } />
          <Route path="/proc" element={<ProtectedRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
