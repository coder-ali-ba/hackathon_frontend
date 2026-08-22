import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication cookies
    Cookies.remove("token", { path: "/" });
    Cookies.remove("userType", { path: "/" });

    // Optional: remove localStorage data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");

    console.log("Token after logout:", Cookies.get("token"));

    // Redirect
    navigate("/signin", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition"
    >
      Logout
    </button>
  );
}

export default Logout;