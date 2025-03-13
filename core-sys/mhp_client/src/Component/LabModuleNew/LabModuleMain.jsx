import "./LabModule.css";
import { Link, Outlet, useLocation } from "react-router-dom";
function LabModuleMain() {
  const location = useLocation();
  return (
    <div className="home-main mt-2 ms-2">
      <div className="ms-1">
        <div className="row">
          <div className="custom-card">
            <h5 className="p-2">Lab Module-LAB Panel</h5>
          </div>
          <div className="main-pan mt-2 ">
            <div className="row">
              <div className="col-md-2" style={{ cursor: "pointer" }}>
                <div className="custom-card">
                  <div className="card-body g-doc-scroll">
                    <ul className="setup-list">
                      <li className="">
                        <Link
                          to="lab-center-service"
                          className={`${
                            location.pathname ===
                            "/lab-module-new/lab-center-service"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                        >
                          <i class="fas menu-icon fa-plus-circle"></i>Lab
                          Service
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname === "/lab-module-new/test-group"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="test-group"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Test
                          Group
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname ===
                            "/lab-module-new/test-category"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="test-category"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Test
                          Category
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname ===
                            "/lab-module-new/test-sub-category"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="test-sub-category"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Test Sub
                          Category
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname === "/lab-module-new/test-name"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="test-name"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Test Name
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname ===
                            "/lab-module-new/test-name-config"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="test-name-config"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Test Name
                          Config
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname ===
                            "/lab-module-new/parameter-group"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="parameter-group"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Parameter
                          Group
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname === "/lab-module-new/specimen"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="specimen"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Specimen
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname === "/lab-module-new/collector"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="collector"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Collector
                          Setup
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname ===
                            "/lab-module-new/marketer-setup"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="marketer-setup"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Marketer
                          Setup
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname === "/lab-module-new/shift-setup"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="shift-setup"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Shift
                          Setup
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname === "/lab-module-new/point-master"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="point-master"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Point
                          Master
                        </Link>
                      </li>

                      <li className="">
                        <Link
                          className={`${
                            location.pathname === "/lab-module-new/points-plan"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="points-plan"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Points
                          Plan
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname ===
                            "/lab-module-new/assigned-points-plan"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="assigned-points-plan"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i>Assigned
                          Points Plan
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname ===
                            "/lab-module-new/lab-points-report"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="lab-points-report"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Points
                          Plan Report
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          className={`${
                            location.pathname ===
                            "/lab-module-new/lab-points-redeem"
                              ? "active-menu"
                              : ""
                          } text-decoration-none set-up-btn`}
                          to="lab-points-redeem"
                        >
                          <i class="fas menu-icon fa-plus-circle"></i> Points
                          Plan Redeem
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-10">
                <div className="lab-module-tab-bar mb-2">
                  <div
                    className="d-flex align-items-center justify-content-around rounded-2 py-1 px-3"
                    style={{ backgroundColor: "#69B128" }}
                  >
                    <Link to="lab-center-details">
                      <button
                        className={` ${
                          location.pathname ===
                          "/lab-module-new/lab-center-details"
                            ? "btn-lab-active"
                            : "btn-lab"
                        }`}
                      >
                        <span>1</span> Center Details
                      </button>
                    </Link>
                    <Link to="lab-rate-list">
                      <button
                        className={` ${
                          location.pathname === "/lab-module-new/lab-rate-list"
                            ? "btn-lab-active"
                            : "btn-lab"
                        }`}
                      >
                        <span>2</span> Rate List
                      </button>
                    </Link>
                    <Link to="lab-letterhead">
                      <button
                        className={` ${
                          location.pathname === "/lab-module-new/lab-letterhead"
                            ? "btn-lab-active"
                            : "btn-lab"
                        }`}
                      >
                        <span>3</span> Letterhead & E-sign
                      </button>
                    </Link>
                    <Link to="lab-sms">
                      <button
                        className={`${
                          location.pathname === "/lab-module-new/lab-sms"
                            ? "btn-lab-active"
                            : "btn-lab"
                        }`}
                      >
                        <span>4</span> Sms
                      </button>
                    </Link>
                  </div>
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabModuleMain;
