import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (location.pathname === "/" && !role) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <Link className="navbar-brand" to="/payouts">
        Payout MVP
      </Link>

      <div className="ms-auto d-flex align-items-center">
        {role && (
          <>
            <span className="text-white me-3">
              Role: {role}
            </span>

            <Link to="/payouts" className="btn btn-outline-light btn-sm me-2">
              Payouts
            </Link>

            <Link to="/vendors" className="btn btn-outline-light btn-sm me-2">
              Vendors
            </Link>

            {role === "OPS" && (
              <Link to="/create" className="btn btn-primary btn-sm me-2">
                + Create
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;