import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AddDashboard.css'
const BillingSetupSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body">
                    <ul className="setup-list">

                        <li>
                            <Link className={`${location.pathname === "/digital" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/digital">
                                <i class="fas menu-icon fa-plus-circle"></i> Digital </Link>
                        </li>

                        <li>
                            <Link className={`${location.pathname === "/card" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/card">
                                <i class="fas menu-icon fa-plus-circle"></i> Card </Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/branch" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/branch">
                                <i class="fas menu-icon fa-plus-circle"></i> Branch</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/bank" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/bank">
                                <i class="fas menu-icon fa-plus-circle"></i> Bank</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/accounts" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/accounts">
                                <i class="fas menu-icon fa-plus-circle"></i> Accounts</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/accounts-type" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/accounts-type">
                                <i class="fas menu-icon fa-plus-circle"></i> Accounts Type</Link>
                        </li>

                        {/* <li>
                            <Link className={`${location.pathname === "/doctorFee-name" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/doctorFee-name">
                                <i class="fas menu-icon fa-plus-circle"></i> Accounts Group</Link>
                        </li> */}
                        {/* <li>
                            <Link className={`${location.pathname === "/doctor-fee" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/doctor-fee">
                                <i class="fas menu-icon fa-plus-circle"></i> Doctor Fees </Link>
                        </li> */}
                        <li>
                            <Link className={`${location.pathname === "/procedure-name" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/procedure-name">
                                <i class="fas menu-icon fa-plus-circle"></i> Procedure ( Main group ) </Link>
                        </li>

                        <li>
                            <Link className={`${location.pathname === "/procedure-fee" ? "active-menu" : ""} text-decoration-none set-up-btn`} to="/procedure-fee">
                                <i class="fas menu-icon fa-plus-circle"></i> Procedure Fees ( Sub group ) </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default BillingSetupSidebar;