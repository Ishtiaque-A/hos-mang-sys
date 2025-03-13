import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';

const UncompletedAppointments = () => {
    return (
        <div>
            <Sidebar1></Sidebar1>
            <div className="container mb-5 font-size-patient pt-5" >
                <Link  to= "/UncompletedAppointments" class="text-decoration-none"> <h2 class="fw-normal  text-start pt-3 mb-3 text-login" >Uncompleted Appointments</h2></Link>
                {/* <div className="shadow border border-1 p-4" style={{ backgroundColor: "#E5FFCC" }}>

                    <nav class="navbar navbar-light">
                        <div class=" col-12 container-fluid d-flex justify-content-md-start pt-0 ms-2">
                            <div class="row mb-3 me-5">
                                <label for="colFormLabelSm" class="col-sm-4 col-form-label col-form-label-sm">Date Start</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Date start" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm">Location</label>
                                <div class="col-sm-9">
                                    <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="enter location" />
                                </div>
                            </div>
                        </div>
                    </nav>
                    <nav class="navbar navbar-light p-3" >
                        <div class="row col-sm-12 container-fluid justify-content-sm-between">
                            <a href="#" class="col-md-2 col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-0 p-2" style={{ backgroundColor: "#CCFF99" }} role="button"><span class="text-nowrap">Mark as did not attend</span></a>
                            <a href="#" class="col-md-2 col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted p-2" style={{ backgroundColor: "#FFE5CC" }} role="button"><span class="text-nowrap">Mark as completed</span></a>
                            <a href="#" class="col-md-2 col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-0 p-2" style={{ backgroundColor: "#CCCCFF" }} role="button"><span class="text-nowrap">Cancel Appointment</span></a>
                            <a href="#" class="col-md-2 col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted p-2" style={{ backgroundColor: "#CCFFFF" }} role="button"><span class="text-nowrap">Create account Invoice</span></a>
                            <a href="#" class="col-md-2 col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-0 p-2" style={{ backgroundColor: "#FFFFCC" }} role="button"><span class="text-nowrap">Follow ups</span></a>
                        </div>
                    </nav>
                </div> */}
                <div className="container col-11 shadow border border-1 p-4" style={{ backgroundColor: "#EBFFE4" }}>
                    <nav class="navbar navbar-light">
                        <div class=" col-12 container-fluid d-flex justify-content-md-start pt-0 ">
                            <div class="row mb-3 me-5">
                                <label for="colFormLabelSm" class="col-sm-4 col-form-label col-form-label-sm text-muted">Date Start</label>
                                <div class="col-sm-8">
                                    <input type="date" class="form-control form-control-sm" id="colFormLabelSm" placeholder="Date start" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="colFormLabelSm" class="col-sm-3 col-form-label col-form-label-sm text-muted">Location</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="enter location" />
                                </div>
                            </div>
                        </div>
                    </nav>
                    <nav class="navbar navbar-light" >
                        <div class="row col-sm-12 justify-content-center">
                            <a href="#" class="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#E7FFCF" }} role="button"><span class="text-nowrap">Mark as did not attend</span></a>
                            <a href="#" class="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#FCE3F9" }} role="button"><span class="text-nowrap">Mark as completed</span></a>
                            <a href="#" class="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CFD4FE" }} role="button"><span class="text-nowrap">Cancel Appointment</span></a>
                            <a href="#" class="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#D0FFF7" }} role="button"><span class="text-nowrap">Create account Invoice</span></a>
                            <a href="#" class="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#DBFFB5" }} role="button"><span class="text-nowrap">Follow ups</span></a>
                        </div>
                    </nav>
                    <div class="container pt-3 mb-4">
                    <form class="row g-1">
                        <div class="table-responsive pt-1">
                            <table class="table table-bordered border-secondary border border-2 ">
                                <thead style={{ backgroundColor: "#E6E5E5" }}>
                                    <tr>
                                        <th scope="col" class="text-muted">Patient</th>
                                        <th scope="col" class="text-muted">Doctor</th>
                                        <th scope="col" class="text-muted">Location</th>
                                        <th scope="col" class="text-muted">Appointment date</th>
                                        <th scope="col" class="text-muted">Appointment Time</th>
                                        <th scope="col" class="text-muted">Type</th>
                                        <th scope="col" class="text-muted">Status</th>
                                        <th scope="col" class="text-muted">Notes</th>
                                    </tr>
                                </thead>
                                <tbody class=" table-light border-secondary border border-2">
                                    <tr>
                                        <th scope="row"> </th>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> </th>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> </th>
                                        <td > </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
};

export default UncompletedAppointments;