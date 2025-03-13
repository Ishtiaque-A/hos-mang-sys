import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AddDashboard.css'


const ImmunisationSetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                        <li>
                            <Link className={`${location.pathname === "/billing-provider" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                to="/billing-provider">
                                    <i class="fas menu-icon fa-plus-circle"></i> Billing Provider </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/given-by" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                to="/given-by">
                                    <i class="fas menu-icon fa-plus-circle"></i> Given by </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/batch-no" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                to="/batch-no">
                                    <i class="fas menu-icon fa-plus-circle"></i> Batch no. </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/immunisation-route" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                to="/immunisation-route">
                                    <i class="fas menu-icon fa-plus-circle"></i> Route</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/immunisation-site" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                to="/immunisation-site">
                                    <i class="fas menu-icon fa-plus-circle"></i> Site</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/vaccine-name" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                to="/vaccine-name">
                                    <i class="fas menu-icon fa-plus-circle"></i> Vaccine Name</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/vaccine-against" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                to="/vaccine-against">
                                    <i class="fas menu-icon fa-plus-circle"></i> Vaccine Against</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default ImmunisationSetupSidebar;