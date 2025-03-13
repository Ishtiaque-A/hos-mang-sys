import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import DashboardNav from '../DashboardNav/DashboardNav';
import LoginForm from '../LoginForm/LoginForm';

const Sidebar1 = () => {
    return (
        <div>
            <Navbar />
            <DashboardNav></DashboardNav>
        </div>
    );
};

export default Sidebar1;