import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import menu from "../../Images/menu-icon-top.png";
import mhp_logo from "../../Images/img_logo1.png";
import user_logo from "./Icons/user.png";
import patient from "../../Images/PatientNav.png";
import doc from "../../Images/DoctorNav.png";
import greatDoc from "../../Images/Great DocNav.png";
import bill from "../../Images/BillingNav.png";
import employee from "../../Images/EmployeeNav.png";
import appointment from "../../Images/AppointmentNav.png";
// drawer
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import axios from "axios";
import { IoIosMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { TbSettingsCog } from "react-icons/tb";
import useUserData from "../../hooks/useUserData";
import { GoOrganization } from "react-icons/go";
import { GrOrganization } from "react-icons/gr";
// drawer
export default function Nav_bar(props) {
  // navbar toggler
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [isSidebarIconOnly, setSidebarIconOnly] = useState(false);

  const handleToggleSidebar = () => {
    const body = document.body;

    if (
      body.classList.contains("sidebar-toggle-display") ||
      body.classList.contains("sidebar-absolute")
    ) {
      setSidebarHidden((prev) => !prev);
      if (!isSidebarHidden) {
        body.classList.add("sidebar-hidden");
      } else {
        body.classList.remove("sidebar-hidden");
      }
    } else {
      setSidebarIconOnly((prev) => !prev);
      if (!isSidebarIconOnly) {
        body.classList.add("sidebar-icon-only");
      } else {
        body.classList.remove("sidebar-icon-only");
      }
    }
  };
  // navbar
  //drawer
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  //drawer
  const [doctorData, setDoctorData] = useState("");

  const [userInfo, setuserInfo] = useState();
  useEffect(() => {
    const storageData = localStorage.getItem("userData");
    const storageUser = JSON.parse(storageData);
    setuserInfo(storageUser);
    if (storageUser.user_type === "Doctor") {
      axios.get(`/single-doctor/${storageUser.user_id}`).then((res) => {
        if (res.data.status === 200) {
          setDoctorData(res.data.doctor);
        }
      });
    }
  }, []);
  let navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/");
    window.location.reload(true);
  }
  const fixedModules = [
    { name: "Patient", route: "/patients", icon: patient },
    { name: "Doctor", route: "/doctors", icon: doc },
    { name: "Employee", route: "/employee", icon: employee },
    { name: "Billing", route: "/billingPatient", icon: bill },
    { name: "Appointment", route: "/main", icon: appointment },
    { name: "Smart Doc", route: "/great-doc", icon: greatDoc },
  ];
  const [modules, setModules] = useState([
    { name: "Patient", route: "/patients", icon: patient },
    { name: "Doctor", route: "/doctors", icon: doc },
    { name: "Employee", route: "/employee", icon: employee },
    { name: "Billing", route: "/billingPatient", icon: bill },
    { name: "Appointment", route: "/main", icon: appointment },
    { name: "Smart Doc", route: "/great-doc", icon: greatDoc },
  ]);
  const storageData = JSON.parse(localStorage.getItem("userData"));
  const user = useUserData();
  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo" to="/dashboard">
          <img src={mhp_logo} alt="logo" />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/dashboard">
          <img src={mhp_logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button
          className="navbar-toggler nav-toggle-btn navbar-toggler align-self-center"
          // data-toggle="minimize"
          onClick={handleToggleSidebar}
        >
          {/* <span className='icon-menu' /> */}
          <IoIosMenu className="icon-menu" size={22} />
        </button>
        <ul className="navbar-nav mr-lg-2">
          <li className="nav-item nav-search d-none d-lg-block"></li>
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          {user?.isSuperAdmin ? (
            <div className="d-flex justify-content-center align-items-center">
              <GoOrganization size={22} />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                Admin
              </span>
            </div>
          ) : (
            <div
              title={user?.branch_name}
              className="d-flex justify-content-center align-items-center"
            >
              <GrOrganization />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {user?.branch_name}
              </span>
            </div>
          )}
          {(props.isSuperAdmin ||
            (Array.isArray(props.permissionData) &&
              props.permissionData?.some((item) => item.name === "setup"))) && (
            <li className="nav-item">
              <Link to="/all-setup" className="nav-link">
                <TbSettingsCog size={22} />
              </Link>
            </li>
          )}
          <li className="nav-item nav-profile dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              id="profileDropdown"
            >
              {doctorData ? (
                <img
                  alt=""
                  data-bs-toggle="tooltip"
                  title={storageData?.name}
                  src={`${global.img_url}/doctors/images/${doctorData?.dr_images}`}
                />
              ) : (
                <img
                  data-bs-toggle="tooltip"
                  title={storageData?.name}
                  src={user_logo}
                  alt="profile"
                />
              )}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <Link to="user-profile" className="dropdown-item">
                <i className="ti-user text-primary" />
                Profile
              </Link>
              <Link to="password_change" className="dropdown-item">
                <i className="ti-key text-primary" />
                Change password
              </Link>
              <Link to="dashboard" className="dropdown-item">
                <i className="ti-dashboard text-primary" />
                Dashboard
              </Link>
              <a onClick={logout} className="dropdown-item">
                <i className="ti-power-off text-primary" />
                Logout
              </a>
            </div>
          </li>
          {/* <li className="nav-item nav-menu-icon" onClick={toggleDrawer(true)}>
            <img className="img-fluid" src={menu} alt="" />
          </li> */}
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="icon-menu" />
        </button>
      </div>
      <div>
        <SwipeableDrawer
          anchor={"right"}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div style={{ width: "380px" }}>
            <span
              style={{
                fontSize: "20px",
                cursor: "pointer",
              }}
              className="float-right"
              onClick={toggleDrawer(false)}
            >
              <MdClose onClick={toggleDrawer(false)} size={20} />
            </span>
            <div className="nav-menu-container">
              <div className="mx-3">
                <input
                  type="text"
                  onChange={(e) => {
                    const data = modules.filter((item) =>
                      item.name
                        .toLowerCase()
                        .match(e.target.value.toLowerCase())
                    );
                    e.target.value.length > 0
                      ? setModules(data)
                      : setModules(fixedModules);
                  }}
                  className="form-control form-control-sm"
                  placeholder="Search modules"
                />
              </div>
              <div className="nav-menu-content mt-3 mx-4">
                <h6>All modules</h6>
                <div className="row">
                  {modules.map((item, i) => (
                    <div key={i} className="col-6 module-container">
                      <Link to={item.route}>
                        <span className="m-2">
                          <img
                            src={item.icon}
                            alt=""
                            className="img-fluid me-2"
                          />{" "}
                          {item.name}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    </nav>
  );
}
