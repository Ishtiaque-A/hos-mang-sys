import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';
import "./WaitingRoom.css";

const WaitingRoom = () => {
    return (
        <>
 <Sidebar1></Sidebar1>
 <div>
            <div className="container mb-5 font-size-patient pt-5" >
            <Link to ="/WaitingRoom"   className="text-decoration-none"><h2 className="fw-normal pt-4 mb-4 text-login" >Waiting Room</h2></Link>
                <div className="container col-11 shadow border border-1 p-4" style={{ backgroundColor: "#EBFFE4" }}>
                    <form className="">
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
                                        {/* <div className="form-check form-check-waiting-room form-check-inline">
                                            <input className="form-check-input form-check-input-waiting-room" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                            <label className="form-check-label form-check-label-waiting-room  text-muted" for="inlineRadio1">Based on arrival</label>
                                        </div>
                                        <div className="form-check form-check-waiting-room form-check-inline">
                                            <input className="form-check-input form-check-input-waiting-room" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                            <label className="form-check-label form-check-label-waiting-room  text-muted" for="inlineRadio2">Based on Schedule appointment</label>
                                        </div> */}
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
                        {/* <div className="row"> */}
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
                        {/* </div> */}
                    </form>

                    <div className="table-responsive pt-3">
                        {/* <table className="table table-bordered border-secondary border border-1 ">
                            <thead style={{ backgroundColor: "#D8FECB" }}>
                                <tr>
                                    <th scope="col" className="text-muted">Patient</th>
                                    <th scope="col" className="text-muted">MRN</th>
                                    <th scope="col" className="text-muted">Scheduled</th>
                                    <th scope="col" className="text-muted">Arrived</th>
                                    <th scope="col" className="text-muted">Waiting</th>
                                    <th scope="col" className="text-muted">Late by</th>
                                    <th scope="col" className="text-muted">Type</th>
                                    <th scope="col" className="text-muted">Booked by</th>
                                    <th scope="col" className="text-muted">Details</th>
                                    <th scope="col" className="text-muted">Location</th>
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
                                    <td > </td>
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
                        </table> */}

                        <table className="table table-bordered border-secondary border border-2 ">
                            <thead style={{ backgroundColor: "#D8FECB" }}>
                                <tr>
                                    <th scope="col" className="text-muted">Patient</th>
                                    <th scope="col" className="text-muted">MRN</th>
                                    <th scope="col" className="text-muted">Scheduled</th>
                                    <th scope="col" className="text-muted">Arrived</th>
                                    <th scope="col" className="text-muted">Waiting</th>
                                    <th scope="col" className="text-muted">Late by</th>
                                    <th scope="col" className="text-muted">Type</th>
                                    <th scope="col" className="text-muted">Booked by</th>
                                    <th scope="col" className="text-muted">Details</th>
                                    <th scope="col" className="text-muted">Location</th>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
</>
       
    );
};

export default WaitingRoom;