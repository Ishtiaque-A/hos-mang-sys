import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './leftbar.css'
const LeftMenuBar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card">
                <div className="card-body">
                    <ul className="setup-list">
                       <li className="">
                            <Link className={`${location.pathname=="/user-role"?"active-menu":""} text-decoration-none set-up-btn`} to="/user-role"><i class="fas menu-icon fa-plus-circle"></i> User Role</Link>
                        </li>
                        {/* <li className="">
                            <Link className={`${location.pathname=="/feature-permission"?"active-menu":""} text-decoration-none set-up-btn`} to="/feature-permission"><i class="fas menu-icon fa-plus-circle"></i>Feature Permission</Link>
                        </li> */}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default LeftMenuBar;