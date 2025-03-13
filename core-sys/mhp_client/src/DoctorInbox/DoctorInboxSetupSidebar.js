import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DoctorInboxSetupSidebar = () => {

    const location = useLocation();

    return (
        <div>
        <div className="custom-card mt-2">
            <div className="card-body">
                <ul className="setup-list">
                <li>
                <Link className={`${location.pathname==="/the-result-is"?"active-menu":""} text-decoration-none set-up-btn`} to="/the-result-is"><i class="fas menu-icon fa-plus-circle"></i> The result is </Link>
                    </li>
                   
                    <li>
                <Link className={`${location.pathname==="/action-tobe-taken"?"active-menu":""} text-decoration-none set-up-btn`} to="/action-tobe-taken"><i class="fas menu-icon fa-plus-circle"></i> Action To be Taken </Link>
                    </li>
                    <li>
                <Link className={`${location.pathname==="/store-result-in"?"active-menu":""} text-decoration-none set-up-btn`} to="/store-result-in"><i class="fas menu-icon fa-plus-circle"></i> Store Result In </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    );
};

export default DoctorInboxSetupSidebar;