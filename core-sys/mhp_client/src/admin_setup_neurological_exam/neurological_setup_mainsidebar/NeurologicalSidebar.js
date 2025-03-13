import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const NeurologicalSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/parietal-lobe" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/parietal-lobe"><i className="fas menu-icon fa-plus-circle"></i> Parietal Lobe</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/frontal-lobe" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/frontal-lobe"><i className="fas menu-icon fa-plus-circle"></i> Frontal Lobe</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/temporal-lobe" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/temporal-lobe"><i className="fas menu-icon fa-plus-circle"></i> Temporal Lobe</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/occipital-lobe" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/occipital-lobe"><i className="fas menu-icon fa-plus-circle"></i> Occipital Lobe</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/continuous" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/continuous"><i className="fas menu-icon fa-plus-circle"></i> Continuous</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/intermittent" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/intermittent"><i className="fas menu-icon fa-plus-circle"></i> Intermittent</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/speech-nurologies" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/speech-nurologies"><i className="fas menu-icon fa-plus-circle"></i> Speech</Link>
                        </li>
                        
                     
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default NeurologicalSidebar;