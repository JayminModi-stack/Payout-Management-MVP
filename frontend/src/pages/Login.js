import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token, res.data.role);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "15px" }}>

        <h3 className="text-center mb-4"> Payout MVP</h3>

        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center mt-3 text-muted" style={{ fontSize: "14px" }}>
          OPS Login: ops@demo.com <br />
          FIN Login: finance@demo.com
        </p>
      </div>
    </div>
  );
}

export default Login;