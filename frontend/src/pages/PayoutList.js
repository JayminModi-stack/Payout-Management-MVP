import { useEffect, useState, useContext } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PayoutList() {
  const [payouts, setPayouts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [status, setStatus] = useState("");
  const [vendor, setVendor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { logout, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchVendors = async () => {
    try {
      const res = await API.get("/vendors");
      setVendors(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load vendors");
      setVendors([]);
    }
  };

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(`/payouts?status=${status}&vendor=${vendor}`);
      console.log("Payouts API response:", res.data);
      setPayouts(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching payouts");
      setPayouts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    fetchPayouts();
  }, [status, vendor]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Payouts Dashboard ({role})</h3>
      </div>

      <div className="card shadow p-3 mb-4" style={{ borderRadius: "12px" }}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Filter by Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Filter by Vendor</label>
            <select
              className="form-select"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            >
              <option value="">All Vendors</option>
              {vendors.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow p-3" style={{ borderRadius: "12px" }}>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border"></div>
          </div>
        ) : payouts.length === 0 ? (
          <p className="text-center">No payouts found</p>
        ) : (
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p._id}>
                  <td>#{p._id}</td>
                  <td>{p.vendor.name}</td>
                  <td>₹ {p.amount}</td>
                  <td>
                    <span
                      className={`badge ${p.status === "Approved"
                          ? "bg-success"
                          : p.status === "Rejected"
                            ? "bg-danger"
                            : p.status === "Submitted"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/payout/${p._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PayoutList;