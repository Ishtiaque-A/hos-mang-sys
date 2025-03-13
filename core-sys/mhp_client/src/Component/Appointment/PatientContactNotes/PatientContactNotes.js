import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';
import "./PatientContactNotes.css";

const PatientContactNotes = () => {
    return (
        <div>
             <Sidebar1></Sidebar1>
            <div className="container mb-4 font-size-patient pt-5" >
            <Link  to={"/PatientContactNotes"} className="text-decoration-none navbar-brand lh-1"><h2 className="fw-normal pt-4 mb-3 text-login" >Patient Contact Notes </h2></Link>
                <div className="container col-md-12 shadow border border-1 " style={{ backgroundColor: "#EBFFE4" }}>
                    <h6 className="fw-normal text-muted pt-2">Contact notes: Patient ki Test</h6>
                    <form className="p-2">
                        <h6 className="font-size-patient-contact-note text-muted">Patient contact details:</h6>
                        <div className=" font-size-patient border border-1 rounded mb-2 bg-white">
                            <div className="row g-2 p-3">
                                <div className="col-12  d-flex justify-content-between">
                                    <div className="row col-md-4">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Patient Name: </label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Patient name" />
                                        </div>
                                    </div>
                                    <div className="row col-md-4 ">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">DOB (age): </label>
                                        <div className="col-sm-7">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="age" />
                                        </div>
                                    </div>
                                    <div className="row  col-md-4">
                                        <label for="inputEmail3" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Preferred contact via: </label>
                                        <div className="col-sm-7">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="contact" />
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-12  d-flex justify-content-between">
                                    <div className="row col-md-4">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Home Phone: </label>
                                        <div className="col-sm-7">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Home phone" />
                                        </div>
                                    </div>
                                    <div className="row col-md-4 ">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Work Phone: </label>
                                        <div className="col-sm-7">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Work phone" />
                                        </div>
                                    </div>
                                    <div className="row  col-md-4">
                                        <label for="inputEmail3" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Mobile Phone: </label>
                                        <div className="col-sm-7">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Mobile phone" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h6 className="font-size-patient-contact-note text-muted ">Other contacts details:</h6>
                        <div className=" font-size-patient border border-1 rounded mb-2 bg-white">
                            <div className="row g-2 p-3">
                                <div className="col-12  d-flex justify-content-between">
                                    <div className="row  col-md-4">
                                        <label for="inputEmail3" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Contact type:</label>
                                        <div className="col-sm-7">
                                            <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
                                                <option selected>Choose location</option>
                                                <option>Dhaka</option>
                                                <option>Rangpur</option>
                                                <option>Dhaka</option>
                                                <option>Dhaka</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row  col-md-8">
                                        {/* <label for="inputEmail3" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Preferred contact via:</label> */}
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-12  d-flex justify-content-between">
                                    <div className="row col-md-4">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Home Phone:</label>
                                        <div className="col-sm-7">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Home phone" />
                                        </div>
                                    </div>
                                    <div className="row col-md-4 ">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Work Phone:</label>
                                        <div className="col-sm-7">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Work phone" />
                                        </div>
                                    </div>
                                    <div className="row  col-md-4">
                                        <label for="inputEmail3" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Mobile Phone:</label>
                                        <div className="col-sm-7">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Mobile phone" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h6 className="font-size-patient-contact-note text-muted ">Communication details:</h6>
                        <div className=" font-size-patient border border-1 rounded mb-2 bg-white">
                            <div className="row g-2 p-3">
                                <div className="col-12  d-flex justify-content-between">
                                    <div className="row  col-md-4">
                                        <label for="inputEmail3" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Contact reason:</label>
                                        <div className="col-sm-7">
                                            <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
                                                <option selected>Choose reason</option>
                                                <option>Dhaka</option>
                                                <option>Rangpur</option>
                                                <option>Dhaka</option>
                                                <option>Dhaka</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row  col-md-4">
                                        <label for="inputEmail3" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Contact Method:</label>
                                        <div className="col-sm-7">
                                            <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
                                                <option selected>Choose location</option>
                                                <option>Dhaka</option>
                                                <option>Rangpur</option>
                                                <option>Dhaka</option>
                                                <option>Dhaka</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row col-md-4 ">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Contact with:</label>
                                        <div className="col-sm-7">
                                            <a href="#" className="col-sm-7 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FBC3C4" }} role="button"><span className="text-nowrap font-size-patient">Patient</span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-12  d-flex justify-content-between">
                                    <div className="row col-md-4">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Contact date:</label>
                                        <div className="col-sm-7">
                                            <input type="date" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Home phone" />
                                        </div>
                                    </div>
                                    <div className="row col-md-4">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Contact attempt no.:</label>
                                        <div className="col-sm-7">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="number" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h6 className="font-size-patient-contact-note text-muted ">User Comments:</h6>
                        <div className="row g-2 ">
                            <div className="mb-3 ">
                                {/* <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label> */}
                                <textarea className="form-control font-size-patient border border-1 rounded" id="exampleFormControlTextarea1" rows="6" placeholder="User comments"></textarea>
                            </div>
                            <div className=" col-12  d-flex justify-content-end">
                                <div className="row col-md-6">
                                    <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Message Status:</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Home phone" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mb-3 pt-3 d-flex justify-content-end">
                                <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CCFDF4" }} role="button"><span className="text-nowrap">Save</span></a>
                                <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FBC3C4" }} role="button"><span className="text-nowrap">Cancel</span></a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PatientContactNotes;


