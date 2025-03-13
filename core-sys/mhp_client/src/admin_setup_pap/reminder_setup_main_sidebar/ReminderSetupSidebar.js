import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AddDashboard.css";

const ReminderSetupSidebar = () => {
  const menuItems = [
    { title: "Anaemic", name: "Anaemic", link: "/round-anaemic-setup" },
    { title: "Jaundiced", name: "Jaundiced", link: "/round-jaundiced-setup" },
    { title: "Cyanosis", name: "Cyanosis", link: "/round-cyanosis-setup" },
    {
      title: "Skin Turgor",
      name: "Skin Turgor",
      link: "/round-skin-turgor-setup",
    },
    { title: "Mucositis", name: "Mucositis", link: "/round-mucositis-setup" },
    { title: "CVS", name: "CVS", link: "/round-cvs-setup" },
    { title: "Skin", name: "Skin", link: "/round-skin-setup" },
    { title: "Abdomen", name: "Abdomen", link: "/round-abdomen-setup" },
    { title: "Chest", name: "Chest", link: "/round-chest-setup" },
    { title: "CNS", name: "CNS", link: "/round-cns-setup" },
    {
      title: "Pathology Result",
      name: "Pathology Result",
      link: "/round-radiology-parameter-setup",
    },
    {
      title: "Drug Since Category",
      name: "Drug Since Category",
      link: "/drug-since-category-setup",
    },
    {
      title: "Drug Since Drugs",
      name: "Drug Since Drugs",
      link: "/drug-since-drugs-setup",
    },
    {
      title: "Treatment Protocol Name",
      name: "Treatment Protocol Name",
      link: "/round-treatment-protocol-name",
    },
    {
      title: "Treatment Protocol Cycle",
      name: "Treatment Protocol Cycle",
      link: "/round-treatment-protocol-cycle",
    },
    {
      title: "Treatment Protocol",
      name: "Treatment Protocol",
      link: "/round-treatment-protocol",
    },
  ];
  const location = useLocation();
  return (
    <div>
      <div className="custom-card mt-2">
        <div className="card-body">
          <ul className="setup-list">
            <li>
              <Link
                className={`${location.pathname == "/reminder-reason" ? "active-menu" : ""
                  } text-decoration-none set-up-btn`}
                to="/reminder-reason"
              >
                <i className="fas menu-icon fa-plus-circle"></i> Reminder Reason
              </Link>
            </li>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  className={`${location.pathname === item.link ? "active-menu" : ""
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

export default ReminderSetupSidebar;
