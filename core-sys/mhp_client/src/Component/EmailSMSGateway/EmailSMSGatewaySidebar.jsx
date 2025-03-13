import React from "react";
import "../../admin_setup_billing/billing_setup_sidebar/AddDashboard.css";
import { Link, useLocation } from "react-router-dom";

const EmailSMSGatewaySidebar = () => {
  const location = useLocation();
  return (
    <div>
      <div className="custom-card mt-2">
        <div className="card-body">
          <ul className="setup-list">
            <li>
              <Link
                className={`${
                  location.pathname === "/sms-gateway-setup"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/sms-gateway-setup"
              >
                <i class="fas menu-icon fa-plus-circle"></i>SMS Gateway Setup
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/sms-dashboard" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/sms-dashboard"
              >
                <i class="fas menu-icon fa-plus-circle"></i>SMS Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  location.pathname === "/sms-package" ? "active-menu" : ""
                } text-decoration-none set-up-btn`}
                to="/sms-package"
              >
                <i class="fas menu-icon fa-plus-circle"></i>SMS Package
              </Link>
            </li>
            {/* <li>
              <Link
                className={`${
                  location.pathname === "/email-gateway-setup"
                    ? "active-menu"
                    : ""
                } text-decoration-none set-up-btn`}
                to="/email-gateway-setup"
              >
                <i class="fas menu-icon fa-plus-circle"></i>Email Gateway Setup
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailSMSGatewaySidebar;
