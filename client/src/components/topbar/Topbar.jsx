import React from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authServices";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "../../redux/features/auth/authSlice";

export default function Topbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Contacts
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#" aria-disabled="true" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
