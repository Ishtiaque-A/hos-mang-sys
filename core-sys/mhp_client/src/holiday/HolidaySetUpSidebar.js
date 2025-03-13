import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../admin_setup_billing/billing_setup_sidebar/AddDashboard.css'
const HolidaySetUpSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">

                        <li>
                            <Link className={`${location.pathname === "/holiday-group" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/holiday-group">
                                <i class="fas menu-icon fa-plus-circle"></i> Holiday Group </Link>
                        </li>

                        <li>
                            <Link className={`${location.pathname === "/holiday-sub-group" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/holiday-sub-group">
                                <i class="fas menu-icon fa-plus-circle"></i> Holiday Sub Group </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/weekend-holiday" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/weekend-holiday">
                                <i class="fas menu-icon fa-plus-circle"></i> Holiday Weekend </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default HolidaySetUpSidebar;