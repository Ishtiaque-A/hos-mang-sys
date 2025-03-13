import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css'

const RadiologySetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                    <li>
                          <Link className={`${location.pathname==="/radiology-center"?"active-menu":""} text-decoration-none set-up-btn`} 
                          to="/radiology-center"><i className="fas menu-icon fa-plus-circle">
                            </i> Radiology Center </Link>
                        </li>
                      
                        <li>
                            <Link className={`${location.pathname==="/radiology-test-type"?"active-menu":""} text-decoration-none set-up-btn`} 
                               to="/radiology-test-type"><i className="fas menu-icon fa-plus-circle">
                                </i> Test Type </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname==="/radiology-test-name"?"active-menu":""} text-decoration-none set-up-btn`} 
                               to="/radiology-test-name"><i className="fas menu-icon fa-plus-circle">
                                </i> Test Name </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname==="/clinical-indications"?"active-menu":""} text-decoration-none set-up-btn`} 
                               to="/clinical-indications"><i className="fas menu-icon fa-plus-circle">
                                </i> Clinical Indications </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RadiologySetupSidebar;