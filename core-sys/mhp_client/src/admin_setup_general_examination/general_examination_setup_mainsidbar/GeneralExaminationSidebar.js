import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const GeneralExaminationSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/dehydration" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/dehydration"><i className="fas menu-icon fa-plus-circle"></i> Dehydration</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/radio-femoral-delay" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/radio-femoral-delay"><i className="fas menu-icon fa-plus-circle"></i> Radio femoral delay</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/nail-sign" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/nail-sign"><i className="fas menu-icon fa-plus-circle"></i> Nail sign</Link>
                        </li>
                       
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default GeneralExaminationSidebar;