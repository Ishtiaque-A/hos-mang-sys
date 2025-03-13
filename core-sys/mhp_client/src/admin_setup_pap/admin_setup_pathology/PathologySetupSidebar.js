import React from 'react';
import { Link,useLocation } from 'react-router-dom';


const PathologySetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                      <li>
                         <Link className={`${location.pathname==="/pathology-laboratory"?"active-menu":""} text-decoration-none set-up-btn`} 
                         to="/pathology-laboratory"><i className="fas menu-icon fa-plus-circle"></i>Laboratory</Link>
                        </li>    
                         
                      <li>
                         <Link className={`${location.pathname==="/pathalogy-test-name"?"active-menu":""} text-decoration-none set-up-btn`} 
                         to="/pathalogy-test-name"><i className="fas menu-icon fa-plus-circle"></i>Test Name</Link>
                        </li>    
                        <li>
                         <Link className={`${location.pathname==="/clinical-details"?"active-menu":""} text-decoration-none set-up-btn`} 
                         to="/clinical-details"><i className="fas menu-icon fa-plus-circle"></i>Clinical Details</Link>
                        </li>   
                        <li>
                         <Link className={`${location.pathname==="/favourite-test"?"active-menu":""} text-decoration-none set-up-btn`} 
                         to="/favourite-test"><i className="fas menu-icon fa-plus-circle"></i>Favourite Test</Link>
                        </li>   
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PathologySetupSidebar;