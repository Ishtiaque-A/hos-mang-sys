import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css'

const AnatomySetUpSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                        <li>
                            <Link className={`${location.pathname==="/main-body-part"?"active-menu":""} text-decoration-none set-up-btn`} 
                               to="/main-body-part"><i class="fas menu-icon fa-plus-circle"></i> Main Body Part </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname==="/sub-body-part"?"active-menu":""} text-decoration-none set-up-btn`} 
                               to="/sub-body-part"><i class="fas menu-icon fa-plus-circle"></i> Sub Body Part </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname==="/symptoms-anatomy"?"active-menu":""} text-decoration-none set-up-btn`} 
                               to="/symptoms-anatomy"><i class="fas menu-icon fa-plus-circle"></i> Symptoms </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AnatomySetUpSidebar;