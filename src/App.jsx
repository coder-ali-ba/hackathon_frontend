import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Signin from "./pages/Signin";

import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route 
        path="/signin" 
        element={
          <PublicRoute>
            <Signin />
          </PublicRoute>
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}

        <Route element={<ProtectedRoute />}>
           <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
