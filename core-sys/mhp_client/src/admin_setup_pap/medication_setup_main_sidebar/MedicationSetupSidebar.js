import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const MedicationSetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/services-name" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/services-name">
                                    <i className="fas menu-icon fa-plus-circle"></i> Facility/Services </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/unit-name" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/unit-name">
                                    <i className="fas menu-icon fa-plus-circle"></i> Ward/Unit </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/code-must-be-circled-reason" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/code-must-be-circled-reason">
                                    <i className="fas menu-icon fa-plus-circle"></i> Code MUST be circled</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/guidelines-only-recommended" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/guidelines-only-recommended">
                                    <i className="fas menu-icon fa-plus-circle"></i> Guidelines only</Link>
                        </li>
                       
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default MedicationSetupSidebar;