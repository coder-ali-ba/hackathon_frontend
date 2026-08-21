import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import NavigatiionBar from "./components/NavigatiionBar";
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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
