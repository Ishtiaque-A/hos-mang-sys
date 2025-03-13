import React from "react";
import { Link, useLocation } from "react-router-dom";

const PatientAdmissionSetupSidebar = () => {
  const menuItems = [
    {
      title: "Doctor's Task Category",
      name: "Doctor's Task Category",
      link: "/doctor-task-category",
    },
    {
      title: "Nurse's Task Category",
      name: "Nurse's Task Category",
      link: "/nurse-task-category",
    },
    {
      title: "Doctor's Task",
      name: "Doctor's Task",
      link: "/doctor-task",
    },
    {
      title: "Nurse's Task",
      name: "Nurse's Task",
      link: "/nurse-task",
    },
  ];
  const location = useLocation();
  return (
    <div>
      <div className="custom-card mt-2">
        <div className="card-body">
          <ul className="setup-list">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  className={`${
                    location.pathname === item.link ? "active-menu" : ""
                  } text-decoration-none set-up-btn`}
                  to={item.link}
                >
                  <i className="fas menu-icon fa-plus-circle"></i> {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientAdmissionSetupSidebar;
