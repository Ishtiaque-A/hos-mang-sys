import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css'
const HistorySetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body add-dashboard g-doc-scroll">
                    <ul className="setup-list">
                        <li>
                            <Link className={`${location.pathname==="/examination"?"active-menu":""} text-decoration-none set-up-btn`} to="/examination">
                                <i class="fas menu-icon fa-plus-circle"></i> Examination </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname==="/history"?"active-menu":""} text-decoration-none set-up-btn`} to="/history">
                                <i class="fas menu-icon fa-plus-circle"></i> History </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/selection-parameter" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                to="/selection-parameter">
                                    <i className="fas menu-icon fa-plus-circle"></i> Exam History Selection Parameter </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/history-extension" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/history-extension">
                                    <i className="fas menu-icon fa-plus-circle"></i> Exam History Extension </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/carotid" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/carotid">
                                    <i className="fas menu-icon fa-plus-circle"></i> Carotid </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/selection-criteria" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/selection-criteria">
                                    <i className="fas menu-icon fa-plus-circle"></i> Selection Criteria </Link>
                        </li>

                        {/*<li>*/}
                        {/*    <Link className={`${location.pathname === "/exam-history-mapping" ? "active-menu" : ""} text-decoration-none set-up-btn`}*/}
                        {/*          to="/exam-history-mapping">
                        <i className="fas menu-icon fa-plus-circle"></i> Exam History Mapping </Link>*/}
                        {/*</li>*/}

                        <li>
                            <Link className={`${location.pathname === "/apex-beat" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/apex-beat">
                                    <i className="fas menu-icon fa-plus-circle"></i>Apex Beat</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/intercostal-space" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/intercostal-space">
                                    <i className="fas menu-icon fa-plus-circle"></i>Apex Beat Character</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/history-exam-status" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/history-exam-status">
                                    <i className="fas menu-icon fa-plus-circle"></i>History Exam Status</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/heartSound" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/heartSound">
                                    <i className="fas menu-icon fa-plus-circle"></i>Heart Sound</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/volume" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/volume">
                                    <i className="fas menu-icon fa-plus-circle"></i>Volume</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/rediation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/rediation">
                                    <i className="fas menu-icon fa-plus-circle"></i>Rediation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/murmur" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/murmur">
                                    <i className="fas menu-icon fa-plus-circle"></i>Murmur</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/ischaemic-risk-factor" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/ischaemic-risk-factor">
                                    <i className="fas menu-icon fa-plus-circle"></i>Ischaemic Risk Factor</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/others" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/others">
                                    <i className="fas menu-icon fa-plus-circle"></i>Dyspnea</Link>
                        </li>
                       


                    </ul>

                </div>
            </div>
        </div>
    );
};

export default HistorySetupSidebar;