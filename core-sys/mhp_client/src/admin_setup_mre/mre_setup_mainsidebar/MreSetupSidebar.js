import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css'
const MreSetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body add-dashboard g-doc-scroll">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/breathsound" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/breathsound"><i className="fas menu-icon fa-plus-circle"></i> Breath Sound</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/abnormal-breathing" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/abnormal-breathing"><i className="fas menu-icon fa-plus-circle"></i> Abnormal Breathing</Link>
                        </li>
                     
                        <li>
                            <Link className={`${location.pathname === "/chest-expansion" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/chest-expansion"><i className="fas menu-icon fa-plus-circle"></i> Chest Expansion</Link>
                        </li>

                        <li>
                            <Link className={`${location.pathname === "/wheering" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/wheering"><i className="fas menu-icon fa-plus-circle"></i> Wheering</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/chestshape" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/chestshape"><i className="fas menu-icon fa-plus-circle"></i> Chest Shape</Link>
                        </li>
                     
                        <li>
                            <Link className={`${location.pathname === "/percussion" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/percussion"><i className="fas menu-icon fa-plus-circle"></i> Percussion</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/vocal-fremitus" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/vocal-fremitus"><i className="fas menu-icon fa-plus-circle"></i> Vocal Fremitus</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/vocal-resonance" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/vocal-resonance"><i className="fas menu-icon fa-plus-circle"></i> Vocal Resonance</Link>
                        </li> 
                         <li>
                            <Link className={`${location.pathname === "/crepitation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/crepitation"><i className="fas menu-icon fa-plus-circle"></i> Crepitation</Link>
                        </li>

                        <li>
                            <Link className={`${location.pathname === "/symptoms" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/symptoms"><i className="fas menu-icon fa-plus-circle"></i> Symptoms</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pembertons" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pembertons"><i className="fas menu-icon fa-plus-circle"></i> Pembertons</Link>
                        </li>
                        
                         {/* morshed curd start */}
                         <li>
                            <Link className={`${location.pathname === "/cough" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/cough"><i className="fas menu-icon fa-plus-circle"></i> Cough</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/dyspnea" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/dyspnea"><i className="fas menu-icon fa-plus-circle"></i> Dyspnea</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/dyspnea-class" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/dyspnea-class"><i className="fas menu-icon fa-plus-circle"></i> Dyspnea class</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/medical-history" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/medical-history"><i className="fas menu-icon fa-plus-circle"></i> Medical History</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/sleep-apnoea-risk" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/sleep-apnoea-risk"><i className="fas menu-icon fa-plus-circle"></i> Sleep Apnoea Risk</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/questionnaire" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/questionnaire"><i className="fas menu-icon fa-plus-circle"></i> Questionnaire</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/exmanination-list" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/exmanination-list"><i className="fas menu-icon fa-plus-circle"></i> Exmanination List</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/cripatation-left" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/cripatation-left"><i className="fas menu-icon fa-plus-circle"></i> Cripatation Left</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/cripatation-right" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/cripatation-right"><i className="fas menu-icon fa-plus-circle"></i> Cripatation Right</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/cripatation-both" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/cripatation-both"><i className="fas menu-icon fa-plus-circle"></i> Cripatation Both</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/wheezing-left" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/wheezing-left"><i className="fas menu-icon fa-plus-circle"></i> Wheezing Left</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/wheezing-right" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/wheezing-right"><i className="fas menu-icon fa-plus-circle"></i> Wheezing Right</Link>
                        </li>
                         <li>
                            <Link className={`${location.pathname === "/wheezing-both" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/wheezing-both"><i className="fas menu-icon fa-plus-circle"></i> Wheezing Both</Link>
                        </li>
                       
                        
                        {/* morshed curd end */}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default MreSetupSidebar;