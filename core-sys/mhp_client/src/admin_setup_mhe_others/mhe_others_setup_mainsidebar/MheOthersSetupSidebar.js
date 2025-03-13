import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css'


const MheMainSetupSidebar = () => {

    const location = useLocation();

    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                        <li>
                            <Link className={`${location.pathname === "/phq-9-questionnaire" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/phq-9-questionnaire"><i className="fas menu-icon fa-plus-circle"></i> PHQ-9 Questionnaire</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/phq-9-questionnaire-value" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/phq-9-questionnaire-value"><i className="fas menu-icon fa-plus-circle"></i> PHQ-9 Questionnaire value</Link>
                        </li>
                        
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default MheMainSetupSidebar;