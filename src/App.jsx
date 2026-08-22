import { Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import AdminDashboard from "./pages/AdminDashboard";



import ManagerDashboard from "./pages/ManagerDashboard";
import Unauthorized from "./pages/Unauthorized";
import RoleProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Register />} />

      <Route path="/signin" element={<Signin />} />

      {/* USER */}
      <Route element={<RoleProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* PROJECT MANAGER */}
      <Route
        element={
          <RoleProtectedRoute allowedRoles={["projectManager"]} />
        }
      >
        <Route
          path="/project-manager/dashboard"
          element={<ManagerDashboard />}
        />
      </Route>

      {/* ADMIN */}
      <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />

    </Routes>
  );
}

export default App;