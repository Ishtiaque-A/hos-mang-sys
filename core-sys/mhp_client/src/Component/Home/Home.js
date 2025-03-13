import React from 'react';
import Navbar from "../Navbar/Navbar";
import Sidebar from '../Sidebar/Sidebar';
import AddNewPatient from "../AddNewPatient/AddNewPatient";
import LoginForm from '../LoginForm/LoginForm';
import AppointmentBook from '../AppointmentBook/AppointmentBook';
import UncompletedAppointments from '../UncompletedAppointments/UncompletedAppointments';
import DailyMessages from '../DailyMessages/DailyMessages';
import DeletedClinicalData from '../DeletedClinicalData/DeletedClinicalData';
import DatabaseSearch from '../DatabaseSearch/DatabaseSearch';
import DailyJobList from '../DailyJobList/DailyJobList';
import AppointmentHistory from '../AppointmentHistory/AppointmentHistory';
import ReferralFollowUp from '../ReferralFollowUp/ReferralFollowUp';
import WordProcessor from '../WordProcessor/WordProcessor';
import WaitingRoom from '../WaitingRoom/WaitingRoom';
import ReportsAwaitingAllocations from '../ReportsAwaitingAllocations/ReportsAwaitingAllocations';
import PatientContactNotes from '../PatientContactNotes/PatientContactNotes';
import PatientContactNotes2 from '../PatientContactNotes2/PatientContactNotes2';
import PatientContactNotes3 from '../PatientContactNotes3/PatientContactNotes3';

const Home = () => {
    return (
        <div>
            {/* <Navbar /> */}
            {/* <Sidebar></Sidebar> */}
            <main>
                {/* <Sidebar></Sidebar> */}
                <AppointmentBook></AppointmentBook>
                <UncompletedAppointments></UncompletedAppointments>
                <WaitingRoom></WaitingRoom>
                <AppointmentHistory></AppointmentHistory>
                <DailyJobList></DailyJobList>
                <DatabaseSearch></DatabaseSearch>
                <WordProcessor></WordProcessor>
                <DeletedClinicalData></DeletedClinicalData>
                <ReferralFollowUp></ReferralFollowUp>
                <ReportsAwaitingAllocations></ReportsAwaitingAllocations>
                <DailyMessages></DailyMessages>
                <PatientContactNotes></PatientContactNotes>
                <PatientContactNotes2></PatientContactNotes2>
                <PatientContactNotes3></PatientContactNotes3>
                <AddNewPatient></AddNewPatient>
            </main>
            {/* <LoginForm></LoginForm> */}
        </div>
    );
};

export default Home;