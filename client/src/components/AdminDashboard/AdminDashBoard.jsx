import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import { GetAllTickets, UpdateStatusRequest } from "../../APIRequest/APIRequest";
import { clearSession, getUserDetails } from "../../helper/SessionHelper";
import { useNavigate } from "react-router-dom";

function AdminDashBoard() {
  const [showModal, setShowModal] = useState(false);
  const [allComplaints, setAllComplaints] = useState([]); 
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const navigate = useNavigate();
  const userDetails = getUserDetails();

  useEffect(() => {
    let isMounted = true; 
    GetAllTickets()
      .then((res) => {
        if (isMounted) {
          if (Array.isArray(res)) {
            setAllComplaints(res);
          } else {
            console.error("API response is not an array:", res);
            setAllComplaints([]); 
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
        setAllComplaints([]); 
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateClick = (id) => {
    console.log("Update button clicked for complaint ID:", id);
    setSelectedComplaintId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComplaintId(null);
  };

  const updateStatus = () => {
    const status = document.querySelector(".form-select").value;
    console.log("Updating status for complaint ID:", selectedComplaintId, "New status:", status);

    UpdateStatusRequest(selectedComplaintId, status)
      .then((res) => {
        console.log(res.message);
        if (res.message === "Status updated successfully") {
          setAllComplaints((prev) =>
            prev.map((complaint) =>
              complaint.id === selectedComplaintId ? { ...complaint, status } : complaint
            )
          );
          handleCloseModal();
        }
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  const handleLogout = () => {
    clearSession();
    navigate("/signin");
    window.location.reload();
  };

  return (
    <div className="mt-6">
      <h1 className="text-center mb-5">Welcome to Admin Dashboard</h1>

      {allComplaints.length > 0 ? (
        allComplaints.map((complaint) => (
          <div className="container mb-3" key={complaint.id}>
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">{complaint.subject}</h5>
                <p className="card-text">{complaint.description}</p>
                <p className="card-text">
                  Status: <span className="badge bg-primary">{complaint.status}</span>
                  <button onClick={() => handleUpdateClick(complaint.id)} className="admin btn btn-primary">
                    Update
                  </button>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No complaints found.</p>
      )}

      <button onClick={handleLogout} className="btn btn-primary plus p-4">
        Logout
      </button>

      {showModal && (
        <div
          className="modal"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fefefe",
              padding: "20px",
              border: "1px solid #888",
              width: "80%",
              maxWidth: "500px",
              borderRadius: "8px",
            }}
          >
            <span className="close" onClick={handleCloseModal} style={{ color: "#aaa", float: "right", fontSize: "28px", fontWeight: "bold" }}>
              &times;
            </span>
            <h2>Update Status</h2>
            <select className="form-select">
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            <button onClick={updateStatus} className="btn btn-primary mt-3">
              Update Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashBoard;
