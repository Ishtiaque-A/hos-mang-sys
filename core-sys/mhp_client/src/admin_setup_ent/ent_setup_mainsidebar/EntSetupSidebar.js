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
                            <Link className={`${location.pathname == "/ear-canal" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/ear-canal"><i className="fas menu-icon fa-plus-circle"></i>Ear Canal</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname == "/ear-lesion" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/ear-lesion"><i className="fas menu-icon fa-plus-circle"></i>Ear Lesion</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/tympanic-membrane" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tympanic-membrane"><i className="fas menu-icon fa-plus-circle"></i>Tympanic Membrane/Glue Ear</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/mastoid" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/mastoid"><i className="fas menu-icon fa-plus-circle"></i>Mastoid</Link>
                        </li>   
                      <li>
                           <Link className={`${location.pathname == "/posterior" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/posterior"><i className="fas menu-icon fa-plus-circle"></i>Posterior Auricular</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/tunning-fork" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tunning-fork"><i className="fas menu-icon fa-plus-circle"></i>Tunning Fork</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/weberTest" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/weberTest"><i className="fas menu-icon fa-plus-circle"></i>Weber Test</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/throat" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/throat"><i className="fas menu-icon fa-plus-circle"></i>Throat</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/ulser" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/ulser"><i className="fas menu-icon fa-plus-circle"></i>Ulser</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/tongue" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tongue"><i className="fas menu-icon fa-plus-circle"></i>Tongue</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/tonsil" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tonsil"><i className="fas menu-icon fa-plus-circle"></i>Tonsil</Link>
                        </li>  
                        <li>
                           <Link className={`${location.pathname == "/nose" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/nose"><i className="fas menu-icon fa-plus-circle"></i>Nose</Link>
                        </li>  
                        
                        <li>
                           <Link className={`${location.pathname == "/tongueLesion" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tongueLesion"><i className="fas menu-icon fa-plus-circle"></i>Tongue Lesion</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/ear" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/ear"><i className="fas menu-icon fa-plus-circle"></i>Ear</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/ear-discharge" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/ear-discharge"><i className="fas menu-icon fa-plus-circle"></i>Ear Discharge</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/deafness" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/deafness"><i className="fas menu-icon fa-plus-circle"></i>Deafness</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/ent-others" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/ent-others"><i className="fas menu-icon fa-plus-circle"></i>Ent others</Link>
                        </li>
                        <li>
                           <Link className={`${location.pathname == "/renne-test" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/renne-test"><i className="fas menu-icon fa-plus-circle"></i>Renne Test</Link>
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default HistorySetupSidebar;