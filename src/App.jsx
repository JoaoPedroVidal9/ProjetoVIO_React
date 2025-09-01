import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListEvents from "./pages/listEvents";
import ListUsers from "./pages/listUsers";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <ListEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <ListUsers />
              </ProtectedRoute>
            }
          />
          <Route path="/createev" element={<CreateEvent />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>}
          />
          <Route path="/proc" element={<ProtectedRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
