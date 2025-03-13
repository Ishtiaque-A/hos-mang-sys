import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const PhysicalActivityPrescriptionSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/current-excercise-level" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/current-excercise-level">
                                    <i className="fas menu-icon fa-plus-circle"></i> Current Excercise Level</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/aerobic-exercise" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/aerobic-exercise">
                                    <i className="fas menu-icon fa-plus-circle"></i> Aerobic Exercise</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/strength-building" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/strength-building">
                                    <i className="fas menu-icon fa-plus-circle"></i> Strength building</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/endurance" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/endurance">
                                    <i className="fas menu-icon fa-plus-circle"></i> Endurance</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/frequency-physical" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/frequency-physical">
                                    <i className="fas menu-icon fa-plus-circle"></i> Frequency</Link>
                        </li>
                       
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default PhysicalActivityPrescriptionSidebar;