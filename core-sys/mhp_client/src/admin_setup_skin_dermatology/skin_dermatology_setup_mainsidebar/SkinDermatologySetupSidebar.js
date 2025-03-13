import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css'


const SkinDermatologySetupSidebar = () => {

    const location = useLocation();

    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                        <li>
                            <Link className={`${location.pathname === "/all-body-part-front-back" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/all-body-part-front-back"><i className="fas menu-icon fa-plus-circle"></i> All Body Part Front Back</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/areolar" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/areolar"><i className="fas menu-icon fa-plus-circle"></i> Areolar</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/skin-shape" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/skin-shape"><i className="fas menu-icon fa-plus-circle"></i> Skin Shape</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/color" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/color"><i className="fas menu-icon fa-plus-circle"></i> Color</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/palpation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/palpation"><i className="fas menu-icon fa-plus-circle"></i> Palpation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/temparature" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/temparature"><i className="fas menu-icon fa-plus-circle"></i> Temparature</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/Arrangements" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/Arrangements"><i className="fas menu-icon fa-plus-circle"></i> Arrangements</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/skin-symptoms" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/skin-symptoms"><i className="fas menu-icon fa-plus-circle"></i> Skin Symptoms</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/skin-type" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/skin-type"><i className="fas menu-icon fa-plus-circle"></i> Skin Type</Link>
                        </li>
                        
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default SkinDermatologySetupSidebar;