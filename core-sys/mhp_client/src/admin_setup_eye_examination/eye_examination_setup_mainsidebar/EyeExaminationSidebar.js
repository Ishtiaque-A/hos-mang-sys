import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const EyeExaminationSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/lesion-middle" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/lesion-middle"><i className="fas menu-icon fa-plus-circle"></i> Lesion Middle</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/lesion-right" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/lesion-right"><i className="fas menu-icon fa-plus-circle"></i> Lesion Right</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/external-observation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/external-observation"><i className="fas menu-icon fa-plus-circle"></i> External Observation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/phoria-one" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/phoria-one"><i className="fas menu-icon fa-plus-circle"></i> Phoria One</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/phoria-two" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/phoria-two"><i className="fas menu-icon fa-plus-circle"></i> Phoria Two</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/shape" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/shape"><i className="fas menu-icon fa-plus-circle"></i> Shape</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pursuits" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pursuits"><i className="fas menu-icon fa-plus-circle"></i> Pursuits</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/saccades" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/saccades"><i className="fas menu-icon fa-plus-circle"></i> Saccades</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/neuro-opthal" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/neuro-opthal"><i className="fas menu-icon fa-plus-circle"></i> Neuro Opthal</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/swollen-eye-lid" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/swollen-eye-lid"><i className="fas menu-icon fa-plus-circle"></i> Swollen Eye Lid</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/lesion" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/lesion"><i className="fas menu-icon fa-plus-circle"></i> Lesion</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default EyeExaminationSidebar;