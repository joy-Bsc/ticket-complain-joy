import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import "../../assets/css/style.css";
import { Link, useNavigate } from "react-router-dom";
import { clearSession, getUserDetails } from "../../helper/SessionHelper";
import { DeleteCompliantRequest, GetUserTickets } from "../../APIRequest/APIRequest";

const Home = () => {
  const [compliants, setCompliants] = useState([]);
  const navigate = useNavigate();
  const userDetails = getUserDetails();

  useEffect(() => {
    if (userDetails && userDetails.id) {
      GetUserTickets(userDetails.id)
        .then((res) => {
          console.log(res);
          if (Array.isArray(res)) {
            setCompliants(res);
          } else {
            console.error("Expected an array but got:", res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []); 

  const handleDelete = (id) => {
    console.log(id);
    DeleteCompliantRequest(id)
      .then((res) => {
        console.log(res.message);
        if (res.message === "Ticket deleted successfully") {
          setCompliants((prev) => prev.filter((compliant) => compliant.id !== id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    clearSession();
    navigate("/signin");
    window.location.reload();
  };

  return (
    <div className="mt-6">
      <Link className="plus" to="/create">
        <BsPlusLg />
      </Link>
      {Array.isArray(compliants) && compliants.map((compliant) => (
        <div className="container mb-3" key={compliant.id}>
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">{compliant.subject}</h5>
              <p className="card-text">{compliant.description}</p>
              <p className="-mt-2 card-text">
                status: <span className="badge bg-primary">{compliant.status}</span>
                <br />
                <Link to={`/create/${compliant.id}`} className="mt-3 btn btn-primary">
                  update
                </Link>
                <br />
                <button onClick={() => handleDelete(compliant.id)} className="btn btn-primary">
                  delete
                </button>
              </p>
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleLogout} className="btn btn-primary plus p-4">Logout</button>
    </div>
  );
};

export default Home;