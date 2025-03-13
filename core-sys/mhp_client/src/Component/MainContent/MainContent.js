import React, { useEffect } from 'react';
import AppointmentBook from '../Appointment/AppointmentBook/AppointmentBook';
import Sidebar1 from '../Sidebar1/Sidebar1';


const MainContent = () => {

    // useEffect(() => {
    //    window.location.reload(true)
    // }, [])

    return (
        <div>
             <Sidebar1></Sidebar1>
            <AppointmentBook></AppointmentBook>
          
        </div>
    );
};

export default MainContent;