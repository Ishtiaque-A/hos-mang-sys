import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const WomensHealthSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/volume-women" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/volume-women"><i className="fas menu-icon fa-plus-circle"></i> Volume</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pv-bleeding" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pv-bleeding"><i className="fas menu-icon fa-plus-circle"></i> PV Bleeding</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pv-discharge" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pv-discharge"><i className="fas menu-icon fa-plus-circle"></i> PV Discharge</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/vulval" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/vulval"><i className="fas menu-icon fa-plus-circle"></i> Vulval</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/miscarriage" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/miscarriage"><i className="fas menu-icon fa-plus-circle"></i> Miscarriage</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/breast-lump" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/breast-lump"><i className="fas menu-icon fa-plus-circle"></i> Breast Lump</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/breast-pain" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/breast-pain"><i className="fas menu-icon fa-plus-circle"></i> Breast Pain</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/breast-nipple-discharge" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/breast-nipple-discharge"><i className="fas menu-icon fa-plus-circle"></i> Breast Nipple Discharge</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/vulva" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/vulva"><i className="fas menu-icon fa-plus-circle"></i> Vulva</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pelvic-mass" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pelvic-mass"><i className="fas menu-icon fa-plus-circle"></i> Pelvic Mass</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/bartholin-glandes" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/bartholin-glandes"><i className="fas menu-icon fa-plus-circle"></i> Bartholin Glandes</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/cervix" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/cervix"><i className="fas menu-icon fa-plus-circle"></i> Cervix</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/cst" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/cst"><i className="fas menu-icon fa-plus-circle"></i> CST</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/gynecologies" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/gynecologies"><i className="fas menu-icon fa-plus-circle"></i> Gynecologies</Link>
                        </li>                
                        <li>
                            <Link className={`${location.pathname === "/obstetrics" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/obstetrics"><i className="fas menu-icon fa-plus-circle"></i> Obstetrics</Link>
                        </li>           
                        <li>
                            <Link className={`${location.pathname === "/breast" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/breast"><i className="fas menu-icon fa-plus-circle"></i> Breast</Link>
                        </li>           
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WomensHealthSidebar;