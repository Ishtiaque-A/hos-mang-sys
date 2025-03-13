import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const LabSetupSidebar = () => {


    const location = useLocation();

    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                        {/* <li>
                            <Link className={`${location.pathname === "/lab_test_group" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/lab_test_group"><i class="fas menu-icon fa-plus-circle"></i> Test Group </Link>
                        </li> */}
                        <li>
                            <Link className={`${location.pathname === "/lab_test_type" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/lab_test_type"><i class="fas menu-icon fa-plus-circle"></i> Test Type </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/lab_test_name" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/lab_test_name"><i class="fas menu-icon fa-plus-circle"></i> Test Name </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LabSetupSidebar;