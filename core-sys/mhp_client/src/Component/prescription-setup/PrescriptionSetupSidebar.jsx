import React from 'react';
import '../../admin_setup_billing/billing_setup_sidebar/AddDashboard.css';
import { Link, useLocation } from 'react-router-dom';

const PrescriptionSetupSidebar = () => {
  const location = useLocation();
  return (
    <div>
      <div className='custom-card mt-2'>
        <div className='card-body'>
          <ul className='setup-list'>
            <li>
              <Link
                className={`${
                  location.pathname === '/prescription-setup'
                    ? 'active-menu'
                    : ''
                } text-decoration-none set-up-btn`}
                to='/prescription-setup'
              >
                <i class='fas menu-icon fa-plus-circle'></i> Prescription Setup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionSetupSidebar;
