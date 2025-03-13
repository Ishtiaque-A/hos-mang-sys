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
                            <Link className={`${location.pathname == "/appearance" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/appearance"><i className="fas menu-icon fa-plus-circle"></i> Appearance </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname == "/behaviour" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/behaviour"><i className="fas menu-icon fa-plus-circle"></i> Behaviour </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname == "/attitude-towards-examination" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/attitude-towards-examination"><i className="fas menu-icon fa-plus-circle"></i> Attitute Towards Examination </Link>
                            <Link className={`${location.pathname == "/mood" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/mood"><i className="fas menu-icon fa-plus-circle"></i> Mood </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname == "/affect" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/affect"><i className="fas menu-icon fa-plus-circle"></i> Affect </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname == "/appropriteness" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/appropriteness"><i className="fas menu-icon fa-plus-circle"></i> Appropriteness </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname == "/attitute" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/attitute"><i className="fas menu-icon fa-plus-circle"></i> Attitute Towards </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname == "/speech" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/speech"><i className="fas menu-icon fa-plus-circle"></i> Speech </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname == "/perceptual" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/perceptual"><i className="fas menu-icon fa-plus-circle"></i> Perceptual Disturbances</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default MheMainSetupSidebar;