import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");

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