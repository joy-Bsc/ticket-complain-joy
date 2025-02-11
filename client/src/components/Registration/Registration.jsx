import React from "react";
import { Fragment, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { RegistrationUser } from "../../APIRequest/APIRequest";


function Registration() {
  const navigate = useNavigate();

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
     const role =  document.querySelector('select').value;

    console.log(nameValue, emailValue, passwordValue,role);

    RegistrationUser(nameValue, emailValue, passwordValue,role)
      .then((res) => {
        console.log(res.message);
        if (res.message === "User created successfully") {
          navigate("/signin");
        }
         
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <div className="mt-6 container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card animated fadeIn w-100 p-3">
              <div className="card-body">
                <h5>Sign Up</h5>
                <br />
                <input
                  ref={name}
                  name="name"
                  aria-label="User Name"
                  placeholder="User Name"
                  className="form-control animated fadeInUp"
                  type="text"
                  required
                />
                <br />
                <input
                  ref={email}
                  name="email"
                  aria-label="email"
                  placeholder="email"
                  className="form-control animated fadeInUp"
                  type="email"
                  required
                />
                <br />
                <input
                  ref={password}
                  name="password"
                  aria-label="User Password"
                  placeholder="User Password"
                  className="form-control animated fadeInUp"
                  type="password"
                  required
                />
                <br />
                <select class="form-select mb-5" aria-label="Default select example">
                  <option selected >Role</option>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
                <button
                  onClick={handleSubmit}
                  className="btn w-100 float-end btn-primary animated fadeInUp"
                >
                  Complete
                </button>
                <div className="text-center w-100">
                  <Link className="text-center" to="/signin">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Registration;
