import { useEffect, useState } from "react";
import API from "../api";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");
  const [upi, setUpi] = useState("");
  const [bank, setBank] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const res = await API.get("/vendors");
      setVendors(res.data);
    } catch (err) {
      setError("Failed to fetch vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const addVendor = async () => {
    try {
      if (!name) return setError("Vendor name required");

      await API.post("/vendors", {
        name,
        upi_id: upi,
        bank_account: bank,
        ifsc,
      });

      setName("");
      setUpi("");
      setBank("");
      setIfsc("");
      fetchVendors();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating vendor");
    }
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4"> Vendors Management</h3>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="card shadow p-4 mb-4" style={{ borderRadius: "12px" }}>
        <h5 className="mb-3">Add New Vendor</h5>

        <div className="row g-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Vendor Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="UPI ID"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Bank Account"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="IFSC"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
            />
          </div>

          <div className="col-md-1 d-grid">
            <button
              className="btn btn-primary"
              onClick={addVendor}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="card shadow p-3" style={{ borderRadius: "12px" }}>
        <h5 className="mb-3">Vendor List</h5>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border"></div>
          </div>
        ) : (
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>UPI</th>
                <th>Bank Account</th>
                <th>IFSC</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No vendors found
                  </td>
                </tr>
              ) : (
                vendors.map((v) => (
                  <tr key={v.id}>
                    <td>{v.name}</td>
                    <td>{v.upi_id || "-"}</td>
                    <td>{v.bank_account || "-"}</td>
                    <td>{v.ifsc || "-"}</td>
                    <td>
                      {v.is_active ? (
                        <span className="badge bg-success">
                          Active
                        </span>
                      ) : (
                        <span className="badge bg-danger">
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Vendors;