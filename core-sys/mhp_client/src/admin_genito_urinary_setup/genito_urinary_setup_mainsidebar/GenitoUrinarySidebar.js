import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const GenitoUrinarySidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/renal-mass" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/renal-mass"><i className="fas menu-icon fa-plus-circle"></i> Renal mass</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/urine-analysis" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/urine-analysis"><i className="fas menu-icon fa-plus-circle"></i> Urine analysis</Link>
                        </li>
                       
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default GenitoUrinarySidebar;