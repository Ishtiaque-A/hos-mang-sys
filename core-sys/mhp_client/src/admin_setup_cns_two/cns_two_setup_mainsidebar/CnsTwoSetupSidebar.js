import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AddDashboard.css";

const CnsTwoSetupSidebar = () => {
  const location = useLocation();
  return (
    <div>
      <div className="custom-card mt-2">
        <div className="card-body add-dashboard g-doc-scroll">
          <ul className="setup-list ">
            <li>
              <Link
                className={`${
                  location.pathname === "/earpalate" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/earpalate"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Ear & Palate
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  location.pathname === "/gasreflex" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/gasreflex"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Gas Reflex
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  location.pathname === "/cnOne" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/cnOne"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Cn-I
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/cnTwo" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/cnTwo"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Cn-II
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/cnThree" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/cnThree"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Cn-III IV VI
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/cnFive" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/cnFive"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Cn-V
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/cn7" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/cn7"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Cn-VII
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/cnSix" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/cnSix"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Cn-VIII
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/cnSeven" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/cnSeven"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Cn-IX,X
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  location.pathname === "/cnEight" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/cnEight"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Cn-XI
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  location.pathname === "/cnNine" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/cnNine"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Cn-XII
              </Link>
            </li>

            {/* <li>
                            <Link className={`${location.pathname === "/cnNine"? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/cnNine"><i className="fas menu-icon fa-plus-circle"></i></Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/cnTen"? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/cnTen"><i className="fas menu-icon fa-plus-circle"></i>Cn-XIII</Link>
                        </li> */}

            {/* morshed start */}

            <li>
              <Link
                className={`${
                  location.pathname === "/left-value" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/left-value"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Left Value
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/right-value" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/right-value"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Right Value
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  location.pathname === "/power" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/power"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Power
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/the-radial-nerve" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/the-radial-nerve"
              >
                <i className="fas menu-icon fa-plus-circle"></i>The Radial Nerve
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/jerk-c1-c8" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/jerk-c1-c8"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Jerk (C1,C8)
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/finger-nose-test" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/finger-nose-test"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Finger Nose Test
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/picture-upper-limb-dermatomes"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/picture-upper-limb-dermatomes"
              >
                <i className="fas menu-icon fa-plus-circle"></i>Picture upper
                limb dermatomes
              </Link>
            </li>
            {/* morshed start */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CnsTwoSetupSidebar;
