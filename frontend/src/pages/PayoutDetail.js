import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

function PayoutDetail() {
  const { id } = useParams();
  const { role } = useContext(AuthContext);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await API.get(`/payouts/${id}`);
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const submit = async () => {
    await API.post(`/payouts/${id}/submit`);
    fetchData();
  };

  const approve = async () => {
    await API.post(`/payouts/${id}/approve`);
    fetchData();
  };

  const reject = async () => {
    const reason = prompt("Enter reason");
    if (!reason) return;
    await API.post(`/payouts/${id}/reject`, { reason });
    fetchData();
  };

  if (!data) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  const { payout, audits } = data;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4 mb-4">
        <h3>Payout #{payout.id}</h3>
        <p><strong>Status:</strong> {payout.status}</p>
        <p><strong>Amount:</strong> ₹ {payout.amount}</p>

        {role === "OPS" && payout.status === "Draft" &&
          <button className="btn btn-primary me-2" onClick={submit}>
            Submit
          </button>
        }

        {role === "FINANCE" && payout.status === "Submitted" &&
          <>
            <button className="btn btn-success me-2" onClick={approve}>
              Approve
            </button>
            <button className="btn btn-danger" onClick={reject}>
              Reject
            </button>
          </>
        }
      </div>

      <div className="card shadow p-4">
        <h5>Audit Trail</h5>
        {audits.map(a => (
          <div key={a.id}>
            {a.action} by User {a.performed_by}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PayoutDetail;