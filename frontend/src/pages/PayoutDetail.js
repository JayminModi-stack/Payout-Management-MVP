import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useCallback } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

function PayoutDetail() {
  const { id } = useParams();
  const { role } = useContext(AuthContext);
  const [data, setData] = useState(null);

  // useCallback ensures fetchData has stable reference
  const fetchData = useCallback(async () => {
    try {
      const res = await API.get(`/payouts/${id}`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching payout:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const submit = async () => {
    try {
      await API.post(`/payouts/${id}/submit`);
      fetchData();
    } catch (err) {
      console.error("Error submitting payout:", err);
    }
  };

  const approve = async () => {
    try {
      await API.post(`/payouts/${id}/approve`);
      fetchData();
    } catch (err) {
      console.error("Error approving payout:", err);
    }
  };

  const reject = async () => {
    const reason = prompt("Enter reason");
    if (!reason) return;
    try {
      await API.post(`/payouts/${id}/reject`, { reason });
      fetchData();
    } catch (err) {
      console.error("Error rejecting payout:", err);
    }
  };

  if (!data) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  const { payout, audits } = data;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4 mb-4">
        <h3>Payout #{payout.id}</h3>
        <p><strong>Status:</strong> {payout.status}</p>
        <p><strong>Amount:</strong> ₹ {payout.amount}</p>

        {role === "OPS" && payout.status === "Draft" && (
          <button className="btn btn-primary me-2" onClick={submit}>
            Submit
          </button>
        )}

        {role === "FINANCE" && payout.status === "Submitted" && (
          <>
            <button className="btn btn-success me-2" onClick={approve}>
              Approve
            </button>
            <button className="btn btn-danger" onClick={reject}>
              Reject
            </button>
          </>
        )}
      </div>

      <div className="card shadow p-4">
        <h5>Audit Trail</h5>
        {audits.map((a) => (
          <div key={a.id}>
            {a.action} by User {a.performed_by}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PayoutDetail;