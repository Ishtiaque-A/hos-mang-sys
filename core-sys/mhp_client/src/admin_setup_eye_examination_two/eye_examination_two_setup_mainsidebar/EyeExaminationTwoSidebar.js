import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const EyeExaminationTwoSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                       
                       
                        <li>
                            <Link className={`${location.pathname === "/worth-4-dot" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/worth-4-dot"><i className="fas menu-icon fa-plus-circle"></i> Worth 4 Dot</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/eom-convergence" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/eom-convergence"><i className="fas menu-icon fa-plus-circle"></i> Convergence</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/eom-accomodation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/eom-accomodation"><i className="fas menu-icon fa-plus-circle"></i> Accomodation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/dry-retinoscopy" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/dry-retinoscopy"><i className="fas menu-icon fa-plus-circle"></i> Dry Retinoscopy</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/maddox-wing" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/maddox-wing"><i className="fas menu-icon fa-plus-circle"></i> Maddox Wing</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/mid-line-crossing" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/mid-line-crossing"><i className="fas menu-icon fa-plus-circle"></i> Mid Line Crossing</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pen-grip" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pen-grip"><i className="fas menu-icon fa-plus-circle"></i> Pen Grip</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pen-grip-right" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pen-grip-right"><i className="fas menu-icon fa-plus-circle"></i> Pen Grip Right</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/posture" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/posture"><i className="fas menu-icon fa-plus-circle"></i> Posture</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/color-vision" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/color-vision"><i className="fas menu-icon fa-plus-circle"></i> Color Vision</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/dilate" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/dilate"><i className="fas menu-icon fa-plus-circle"></i> Dilate</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/cd-disc" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/cd-disc"><i className="fas menu-icon fa-plus-circle"></i> CD Disc</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/neuro-opthalmology" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/neuro-opthalmology"><i className="fas menu-icon fa-plus-circle"></i> Neuro Opthalmology</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default EyeExaminationTwoSidebar;