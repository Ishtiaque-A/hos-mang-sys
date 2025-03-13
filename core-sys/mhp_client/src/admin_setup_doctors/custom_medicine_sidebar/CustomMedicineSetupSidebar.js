import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AddDashboard.css'
const CustomMedicineSetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">
                        <li>
                            <Link className={`${location.pathname === "/all-ingredient" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/all-ingredient">
                                <i class="fas menu-icon fa-plus-circle"></i> Ingredient Name </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/all-restriction" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/all-restriction">
                                <i class="fas menu-icon fa-plus-circle"></i> Restriction Name </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/all-medicinecategory" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/all-medicinecategory">
                                <i class="fas menu-icon fa-plus-circle"></i> Medicine Category </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/custom-medicine" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/custom-medicine">
                                <i class="fas menu-icon fa-plus-circle"></i> Custom Medicine</Link>
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default CustomMedicineSetupSidebar;