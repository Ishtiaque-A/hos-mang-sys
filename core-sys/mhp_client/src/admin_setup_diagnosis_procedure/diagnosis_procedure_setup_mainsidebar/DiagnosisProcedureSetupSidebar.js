import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AddDashboard.css'

const DiagnosisProcedureSetupSidebar = () => {
    const location = useLocation();
    return (
        <div className="card mt-2">
            <div className="card-body">
                <ul className="setup-list">
                    <li>
                        <Link className={`${location.pathname === "/diagnosis-procedure" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                            to="/diagnosis-procedure"><i class="fas menu-icon fa-plus-circle"></i> Diagnosis/Procedure/Reason For Visit (ICD10) </Link>
                    </li>
                    <li>
                        <Link className={`${location.pathname === "/diagnosis-procedure-for" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                            to="/diagnosis-procedure-for"><i class="fas menu-icon fa-plus-circle">
                            </i> Diagnosis/Procedure For / Reason For Visit Type</Link>
                    </li>
                    <li>
                        <Link className={`${location.pathname === "/diagnosis-procedure-actions" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                            to="/diagnosis-procedure-actions"><i class="fas menu-icon fa-plus-circle">
                            </i> Diagnosis/Procedure Actions</Link>
                    </li>
                    <li>
                        <Link className={`${location.pathname === "/auto-fill" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                            to="/auto-fill"><i class="fas menu-icon fa-plus-circle">
                            </i> Auto Fill</Link>
                    </li>
                    <li>
                        <Link className={`${location.pathname === "/review-name" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                            to="/review-name"><i class="fas menu-icon fa-plus-circle">
                            </i>Review Name</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DiagnosisProcedureSetupSidebar;