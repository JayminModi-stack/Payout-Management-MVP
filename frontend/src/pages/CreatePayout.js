import { useEffect, useState, useContext } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function CreatePayout() {
  const { role } = useContext(AuthContext);
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("UPI");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "OPS") {
      navigate("/payouts");
    } else {
      fetchVendors();
    }
  }, [role, navigate]);

  const fetchVendors = async () => {
    try {
      const res = await API.get("/vendors");
      setVendors(res.data);
    } catch {
      setError("Failed to load vendors");
    }
  };

  const create = async () => {
    try {
      if (!vendorId || !amount) {
        return setError("Vendor and amount required");
      }

      await API.post("/payouts", {
        vendor: vendorId,
        amount,
        mode,
        note,
      });

      navigate("/payouts");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating payout");
    }
  };

  if (role !== "OPS") return null;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4" style={{ borderRadius: "15px" }}>
            <h3 className="mb-4 text-center"> Create Payout</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Select Vendor *</label>
              <select
                className="form-select"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
              >
                <option value="">Choose Vendor</option>
                {vendors.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Amount *</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Mode</label>
              <select
                className="form-select"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="UPI">UPI</option>
                <option value="IMPS">IMPS</option>
                <option value="NEFT">NEFT</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Note</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Optional note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/payouts")}
              >
                Cancel
              </button>

              <button className="btn btn-success" onClick={create}>
                Create Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePayout;