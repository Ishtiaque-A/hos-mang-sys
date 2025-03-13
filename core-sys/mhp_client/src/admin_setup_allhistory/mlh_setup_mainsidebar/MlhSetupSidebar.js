import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css'
const MlhSetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                        <li>
                            <Link className={`${location.pathname === "/examination-heading" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/examination-heading"><i className="fas menu-icon fa-plus-circle"></i> Examination Heading</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/common-history" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/common-history"><i className="fas menu-icon fa-plus-circle"></i> Common History</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default MlhSetupSidebar;