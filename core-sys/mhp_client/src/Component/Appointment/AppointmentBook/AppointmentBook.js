
import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import '../../../../node_modules/react-calendar/dist/Calendar.css';
import '../AppointmentBook/AppointmentBook.css';
import { Link } from 'react-router-dom';
import AppointmentScheduler from './AppointmentScheduler';
import Sidebar1 from '../../Sidebar1/Sidebar1';
import Footer from "../../Footer/Footer";

const AppointmentBook = () => {
    return (
        <div>
             <Sidebar1></Sidebar1>
            <div className="container mb-5 font-size-patient pt-5" >
               <Link to ="/AppointmentBook"   className="text-decoration-none"><h2 className="fw-normal pt-4 mb-4 text-login" >Appointment Booking</h2></Link>
            <AppointmentScheduler />
                
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AppointmentBook;