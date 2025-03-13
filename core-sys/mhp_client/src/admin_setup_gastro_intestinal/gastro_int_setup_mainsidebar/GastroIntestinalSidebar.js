import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const GastroIntestinalSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body add-dashboard g-doc-scroll">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/skin" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/skin"><i className="fas menu-icon fa-plus-circle"></i> Skin</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/hand-and-finger" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/hand-and-finger"><i className="fas menu-icon fa-plus-circle"></i> Hand And Finger</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/left-supraclavicular-node" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/left-supraclavicular-node"><i className="fas menu-icon fa-plus-circle"></i> Left Supraclavicular Node</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/tongue-mouth" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tongue-mouth"><i className="fas menu-icon fa-plus-circle"></i> Tongue Mouth</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/abdomen" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/abdomen"><i className="fas menu-icon fa-plus-circle"></i> Abdomen</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/bruit" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/bruit"><i className="fas menu-icon fa-plus-circle"></i> Bruit</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/non-tender-tenderness" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/non-tender-tenderness"><i className="fas menu-icon fa-plus-circle"></i> Tenderness</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/no-masses-mass" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/no-masses-mass"><i className="fas menu-icon fa-plus-circle"></i> Mass</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/hernias" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/hernias"><i className="fas menu-icon fa-plus-circle"></i> Hernias</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/hernias-inguinal" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/hernias-inguinal"><i className="fas menu-icon fa-plus-circle"></i> Hernias Inguinal</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/hernias-femoral" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/hernias-femoral"><i className="fas menu-icon fa-plus-circle"></i> Hernias Femoral</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/per-rectal" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/per-rectal"><i className="fas menu-icon fa-plus-circle"></i> Per Rectal</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/sigmoidoscopy" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/sigmoidoscopy"><i className="fas menu-icon fa-plus-circle"></i> Sigmoidoscopy</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/sigmoidoscopy-guaiac-test" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/sigmoidoscopy-guaiac-test"><i className="fas menu-icon fa-plus-circle"></i> Sigmoidoscopy-Guaiac Test</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/site" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/site"><i className="fas menu-icon fa-plus-circle"></i> Site</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/radiation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/radiation"><i className="fas menu-icon fa-plus-circle"></i> Radiation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pattern" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pattern"><i className="fas menu-icon fa-plus-circle"></i> Pattern</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/duration" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/duration"><i className="fas menu-icon fa-plus-circle"></i> Duration</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/frequency" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/frequency"><i className="fas menu-icon fa-plus-circle"></i> Frequency</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/score" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/score"><i className="fas menu-icon fa-plus-circle"></i> Score</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/vomiting" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/vomiting"><i className="fas menu-icon fa-plus-circle"></i> Vomiting</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/dysphagia" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/dysphagia"><i className="fas menu-icon fa-plus-circle"></i>Dysphagia</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/diarrhoea" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/diarrhoea"><i className="fas menu-icon fa-plus-circle"></i> Diarrhoea</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/stool-type" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/stool-type"><i className="fas menu-icon fa-plus-circle"></i> Stool Type</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pr-bleed" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pr-bleed"><i className="fas menu-icon fa-plus-circle"></i> PR Bleed</Link>
                        </li>
                        
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default GastroIntestinalSidebar;