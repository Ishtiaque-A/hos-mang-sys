import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const CareSetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/care-suggestion" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/care-suggestion"><i className="fas menu-icon fa-plus-circle"></i> Care Suggestion </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/care-details" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/care-details"><i className="fas menu-icon fa-plus-circle"></i>  Suggestion Details </Link>
                        </li>
                       
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default CareSetupSidebar;