import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';
import './AddDoctors.css'
import crush from '../../../Images/crush.jpg'
const DoctorsTimeSlotDetails = () => {
    return (
        <>
            <div className="container">
                <h4 className=" time-slot-heading  pb-3 ">Doctor's Time Slot
                    <Link to={'/doctors'} className="btn btn-primary btn-sm float-end"> Back </Link>
                </h4>
                <div className="row time-slot-detail">
                    <div className="card">
                        <div className="doctor-container">
                            <img className='img fluid d-inline' src={crush} alt="" />
                            <h6 className="doctor-name d-inline ms-3">Dr. Charlie Dias</h6>
                        </div>
                        <div className="doctor-status mt-3">
                            <button className={`btn btn-outline active-doctor ms-2 me-1`}>All</button>
                            <button className={`btn btn-outline  ms-2 me-1`}>Active</button>
                            <button className={`btn btn-outline  ms-2 me-1`}>Inactive</button>
                        </div>
                        <div className="filter-container mt-3">
                            <input className="search-box me-2" type="text" placeholder="Search" aria-label="Search" />
                            <input className="search-box me-2" type="date" />
                            <select className="filter-select">
                                <option selected>Select Filter</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <button className='view-icon icon-btn float-end'>
                                <i className="fas fa-print"></i>
                            </button>
                            <button className='view-icon icon-btn me-3 float-end'>
                                <i className="far fa-file-pdf"></i>
                            </button>
                        </div>
                        <div className="tex-center">
                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link details-btn active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Square Hospital</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link details-btn" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Labaid Hospital</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link details-btn" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Appolo Hospital</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link details-btn" id="pills-contact-tab2" data-bs-toggle="pill" data-bs-target="#pills-contact2" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">United Hospital</button>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className='time-table'>
                                    <table className="table table-responsive text-center">
                                        <tbody>

                                            <tr>
                                                <td> <b>Patient Name</b> </td>
                                                <td> <b>Time</b> </td>
                                                <td> <b>Problem</b></td>
                                            </tr>
                                            <tr>
                                                <td>Zain Passaquindici Arcand</td>
                                                <td>08:00 AM</td>
                                                <td>Hyper Tension</td>
                                            </tr>
                                            <tr>
                                                <td>Cooper Press</td>
                                                <td>09:00 AM</td>
                                                <td>Anaphylaxis</td>
                                            </tr>
                                            <tr>
                                                <td>Phillip Dokidis</td>
                                                <td>10:00 AM</td>
                                                <td>Atopic Dermatitis</td>
                                            </tr>
                                            <tr>
                                                <td>Omar Baptista</td>
                                                <td>11:00 AM</td>
                                                <td>Type 2 Diabetics</td>
                                            </tr>
                                            <tr>
                                                <td>Craig Korsgaard</td>
                                                <td>12:00 PM</td>
                                                <td>Hyper Tension</td>
                                            </tr>
                                            <tr>
                                                <td>Craig Korsgaard</td>
                                                <td>01:00 PM</td>
                                                <td>Hyper Tension</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div className='time-table'>
                                    <table className="table table-responsive text-center">
                                        <tbody>

                                            <tr>
                                                <td> <b>Patient Name</b> </td>
                                                <td> <b>Time</b> </td>
                                                <td> <b>Problem</b></td>
                                            </tr>
                                            <tr>
                                                <td>Zain Passaquindici Arcand</td>
                                                <td>08:00 AM</td>
                                                <td>Hyper Tension</td>
                                            </tr>
                                            <tr>
                                                <td>Cooper Press</td>
                                                <td>09:00 AM</td>
                                                <td>Anaphylaxis</td>
                                            </tr>
                                            <tr>
                                                <td>Phillip Dokidis</td>
                                                <td>10:00 AM</td>
                                                <td>Atopic Dermatitis</td>
                                            </tr>
                                            <tr>
                                                <td>Omar Baptista</td>
                                                <td>11:00 AM</td>
                                                <td>Type 2 Diabetics</td>
                                            </tr>
                                            <tr>
                                                <td>Craig Korsgaard</td>
                                                <td>12:00 PM</td>
                                                <td>Hyper Tension</td>
                                            </tr>
                                            <tr>
                                                <td>Craig Korsgaard</td>
                                                <td>01:00 PM</td>
                                                <td>Hyper Tension</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <div className='time-table'>
                                    <table className="table table-responsive text-center">
                                        <tbody>

                                            <tr>
                                                <td> <b>Patient Name</b> </td>
                                                <td> <b>Time</b> </td>
                                                <td> <b>Problem</b></td>
                                            </tr>
                                            <tr>
                                                <td>Zain Passaquindici Arcand</td>
                                                <td>08:00 AM</td>
                                                <td>Hyper Tension</td>
                                            </tr>
                                            <tr>
                                                <td>Cooper Press</td>
                                                <td>09:00 AM</td>
                                                <td>Anaphylaxis</td>
                                            </tr>
                                            <tr>
                                                <td>Phillip Dokidis</td>
                                                <td>10:00 AM</td>
                                                <td>Atopic Dermatitis</td>
                                            </tr>
                                            <tr>
                                                <td>Omar Baptista</td>
                                                <td>11:00 AM</td>
                                                <td>Type 2 Diabetics</td>
                                            </tr>
                                            <tr>
                                                <td>Craig Korsgaard</td>
                                                <td>12:00 PM</td>
                                                <td>Hyper Tension</td>
                                            </tr>
                                            <tr>
                                                <td>Craig Korsgaard</td>
                                                <td>01:00 PM</td>
                                                <td>Hyper Tension</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-contact2" role="tabpanel" aria-labelledby="pills-contact-tab2">
                                <div className='time-table'>
                                    <table className="table table-responsive text-center">
                                        <tbody>

                                            <tr>
                                                <td> <b>Patient Name</b> </td>
                                                <td> <b>Time</b> </td>
                                                <td> <b>Problem</b></td>
                                            </tr>
                                            <tr>
                                                <td>Zain Passaquindici Arcand</td>
                                                <td>08:00 AM</td>
                                                <td>Hyper Tension</td>
                                            </tr>
                                            <tr>
                                                <td>Cooper Press</td>
                                                <td>09:00 AM</td>
                                                <td>Anaphylaxis</td>
                                            </tr>
                                            <tr>
                                                <td>Phillip Dokidis</td>
                                                <td>10:00 AM</td>
                                                <td>Atopic Dermatitis</td>
                                            </tr>
                                            <tr>
                                                <td>Omar Baptista</td>
                                                <td>11:00 AM</td>
                                                <td>Type 2 Diabetics</td>
                                            </tr>
                                            <tr>
                                                <td>Craig Korsgaard</td>
                                                <td>12:00 PM</td>
                                                <td>Hyper Tension</td>
                                            </tr>
                                            <tr>
                                                <td>Craig Korsgaard</td>
                                                <td>01:00 PM</td>
                                                <td>Hyper Tension</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorsTimeSlotDetails;