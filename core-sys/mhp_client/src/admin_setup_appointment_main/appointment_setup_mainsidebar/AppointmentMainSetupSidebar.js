import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import AddDashboard from '../../admin_setup_appointment/AddDashboard/AddDashboard';
import './AddDashboard.css'

const AppointmentMainSetupSidebar = () => {
    const location = useLocation();

    return (
        <div>
            <AddDashboard/>
            {/* <div className="card mt-3">
                <div className="card-body">
                    <ul className="setup-list">
                        <li>
                            <Link className={`${location.pathname=="/diagnosis-procedure"?"active-menu":""} text-decoration-none set-up-btn`} 
                               to="/diagnosis-procedure"><i class="fas menu-icon fa-plus-circle"></i> Main Body Part </Link>
                        </li>
                     
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default AppointmentMainSetupSidebar;