import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LabAgentSetupLayout = ({children}) => {
    const location = useLocation()
    return (
        <div className='ms-2'>
            <div className="row">
                <div className="col-md-3">
                    <div className="custom-card mt-2">
                        <div className="card-body">
                            <ul className="setup-list">
                                <li>
                                    <Link className={`${location.pathname === "/all-test" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/rate-list-category"><i class="fas menu-icon fa-plus-circle"></i> Rate list category </Link>
                                </li>
                                <li>
                                    <Link className={`${location.pathname === "/all-visit" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/all-rate-list"><i class="fas menu-icon fa-plus-circle"></i>All rate list </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LabAgentSetupLayout;