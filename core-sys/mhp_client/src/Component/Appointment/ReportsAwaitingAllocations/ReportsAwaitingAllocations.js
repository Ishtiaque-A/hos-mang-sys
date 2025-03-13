import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';

const ReportsAwaitingAllocations = () => {
    return (
        <div>
             <Sidebar1></Sidebar1>
            <div className="container mb-5 font-size-patient pt-5" >
            <Link  to={"/ReportsAwaitingAllocations"} className="text-decoration-none navbar-brand lh-1"><h2 className="fw-normal pt-4 mb-4 text-login" >Reports Awaiting Allocations</h2></Link>

                <div className="container mx-3">
                    <div className="row col-md-12 pt-1 mb-4">
                        <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm text-muted">Find patient:</label>
                        <div className="col-sm-9">
                            <input type="search" className="form-control col-form-label col-form-label-sm  font-size-patient" id="colFormLabelSm" placeholder="Search" />
                        </div>
                    </div>
                </div>

                <div className="container col-11 shadow border border-1 p-4" style={{ backgroundColor: "#EBFFE4" }}>
                    {/* <form className="">
                        <div className="row">
                            <div className="col-6">
                                <div className="row col-md-12 pt-1">
                                    <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm text-muted">Location:</label>
                                    <div className="col-sm-10">
                                        <input type="search" className="form-control col-form-label col-form-label-sm  font-size-patient" id="colFormLabelSm" placeholder="Search" />
                                    </div>
                                </div>
                                <div className="row col-md-12 pt-3">
                                    <div className="col-sm-12 d-flex">
                                        <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm text-muted">Type:</label>
                                        <span className="form-check pt-2 mx-2  fw-normal">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label  text-muted" for="flexRadioDefault1">
                                                Based on arrival
                                            </label>
                                        </span>
                                        <span className="form-check pt-2 mx-1 fw-normal">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                            <label className="form-check-label  text-muted" for="flexRadioDefault2">
                                                Based on Schedule appointment
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row col-md-12 col-form-label-sm me-3">
                                    <a href="#" className="col-sm-3 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-4" style={{ backgroundColor: "#FFDCC8" }} role="button"><span className="text-nowrap font-size-waiting-room">Start Consultation</span></a>
                                    <a href="#" className="col-sm-3 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-4" style={{ backgroundColor: "#DDFEC7" }} role="button"><span className="text-nowrap font-size-waiting-room">View Patient Record</span></a>
                                    <a href="#" className="col-sm-3 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted " style={{ backgroundColor: "#CFC8FC" }} role="button"><span className="text-nowrap font-size-waiting-room">Crreate Account</span></a>
                                </div>
                                <div className="row col-sm-12 col-form-label-sm me-3 pt-2">
                                    <a href="#" className="col-sm-5 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#FFDCC8" }} role="button"><span className="text-nowrap font-size-waiting-room">In Consultation </span></a>
                                    <a href="#" className="col-sm-5 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted " style={{ backgroundColor: "#DDFEC7" }} role="button"><span className="text-nowrap font-size-waiting-room">Waiting for Billing</span></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 pt-3 d-flex">
                            <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm text-muted">Status:</label>
                            <div className="col-sm-10 col-form-label-sm mb-3">
                                <a href="#" className=" col-sm-2  text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#FFDCC8" }} role="button"><span className="text-nowrap font-size-waiting-room">waiting <i className="fal fa-less-than"></i> 15 min </span></a>
                                <a href="#" className=" col-sm-2  text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#DDFEC7" }} role="button"><span className="text-nowrap font-size-waiting-room">15-30 min</span></a>
                                <a href="#" className=" col-sm-2  text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#CFC8FC" }} role="button"><span className="text-nowrap font-size-waiting-room">30-60 min</span></a>
                                <a href="#" className=" col-sm-2  text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#CCFDF4" }} role="button"><span className="text-nowrap font-size-waiting-room"><i className="fal fa-greater-than"></i>60 min</span></a>
                                <a href="#" className=" col-sm-2  text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#FFC8F9" }} role="button"><span className="text-nowrap font-size-waiting-room">Urgent</span></a>
                                <a href="#" className=" col-sm-2  text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#FFC8F9" }} role="button"><span className="text-nowrap font-size-waiting-room">Waitng for billing</span></a>
                                <a href="#" className=" col-sm-2  text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#FFC8F9" }} role="button"><span className="text-nowrap font-size-waiting-room">In consultations</span></a>
                            </div>
                        </div>
                    </form> */}

                    <div className="table-responsive pt-3">
                        <table className="table table-bordered border-secondary border border-2 ">
                            <thead style={{ backgroundColor: "#D8FECB" }}>
                                <tr>
                                    <th scope="col" className="text-muted">Date</th>
                                    <th scope="col" className="text-muted">Patient named report</th>
                                    <th scope="col" className="text-muted">Test</th>
                                    <th scope="col" className="text-muted">Addressed to</th>
                                    <th scope="col" className="text-muted">Allocated to patient</th>
                                    <th scope="col" className="text-muted">Allocated to user</th>
                                    <th scope="col" className="text-muted">Location</th>
                                    <th scope="col" className="text-muted">Complete</th>
                                    <th scope="col" className="text-muted">Lavoratory/Provider</th>
                                    <th scope="col" className="text-muted">Status</th>
                                </tr>
                            </thead>
                            <tbody className=" table-light border-secondary border border-2">
                                <tr>
                                    <th scope="row"> </th>
                                    <td> </td>
                                    <td> </td>
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
                                    <td> </td>
                                    <td> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <form className="p-2">
                <div className="row container ">
                    <div className="col-6 col-md-6">
                        <div className="row mb-3">
                            <label for="username" className="col-sm-4 col-form-label fw-normal text-muted">Allocated to user: </label>
                            <div className="col-sm-6">
                                <input type="text" name="username" id="username" className="form-control font-size-patient " autoComplete="off" placeholder="Enter your firstname" required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="username" className="col-sm-4 col-form-label fw-normal text-muted">Patient: </label>
                            <div className="col-sm-6">
                                <label className="visually-hidden" for="specificSizeSelect"></label>
                                {/* <textarea className="form-control shadow border border-2" id="specificSizeSelect" rows="3"> */}
                                    <select className="form-select text-muted font-size-patient" id="specificSizeSelect">
                                        <option selected>Choose title</option>
                                        <option value="1">Mr.</option>
                                        <option value="1">Mrs.</option>
                                    </select>
                                {/* </textarea> */}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm text-muted">Current logged in:</label>
                            <div className="col-sm-6">
                                <input type="email" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Logged in" />
                            </div>
                        </div>
                    </div>

                    <div className="col-3 col-md-3">
                        <a href="#" className="row col-sm-8 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted p-2" style={{ backgroundColor: "#FFD4CB" }} role="button"><span className="text-nowrap">Start the query</span></a>
                        <a href="#" className="row col-sm-8 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted p-2" style={{ backgroundColor: "#FFF4D2" }} role="button"><span className="text-nowrap">Search the query</span></a>
                        <a href="#" className="row col-sm-8 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted p-2" style={{ backgroundColor: "#C9FFEF" }} role="button"><span className="text-nowrap">Save</span></a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReportsAwaitingAllocations;