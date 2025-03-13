import React from 'react';

const PatientContactNotes3 = () => {
    return (
        <div>
            <div className="container mb-4 font-size-patient pt-5" >
                <h2 className="fw-normal pt-4 mb-3 text-login" >Patient Contact Notes 3</h2>
                <div className="container col-11 shadow border border-1 " style={{ backgroundColor: "#EBFFE4" }}>

                    <ul className="nav  fs-6 text-muted pt-2">
                        <li className="nav-item me-5"><span className="">Mr Test Patient </span></li>
                        <li className="nav-item"><span className="">Consent for MHP mobile App Use:</span></li>
                    </ul>

                    <form className="p-2">
                        <div className="col-12 font-size-patient border border-1 rounded mb-2 bg-white p-4">
                            <div className="col-md-12 pt-3 mb-3">
                                <div class="form-check font-size-patient">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label class="form-check-label text-muted" for="flexRadioDefault1">
                                        Mr Test Patient has chosen to recive electronic message sand Vertically consented, to:
                                    </label>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-check form-check-inline font-size-patient">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        <label className="form-check-label text-muted" for="gridCheck">
                                            Appointments
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-check form-check-inline font-size-patient ">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        <label className="form-check-label text-muted" for="gridCheck">
                                            Results and Clinical communications
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-check form-check-inline font-size-patient">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        <label className="form-check-label text-muted" for="gridCheck">
                                            Clinical Reminders
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-check form-check-inline font-size-patient ">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        <label className="form-check-label text-muted" for="gridCheck">
                                            Healthy life style information
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 pt-4">
                                <div className="row">
                                    <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Signed constent status: </label>
                                    <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Not Linked: </label>
                                    <div className="col-sm-2">
                                        <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#E3E9C6" }} value="Attached" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" font-size-patient mb-2">
                            <div className="col-md-12 btn-group mb-3 pt-0">
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#FEFECA" }} value="Consent Status" />
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#D2FFC6" }} value="SMS" />
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#F0B6B5" }} value="Enabled/Not Enabled" />
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#C4F7FA" }} value="Location" />
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#BABEE8" }} value="Rampra Clinic" />
                            </div>
                            <div className="row ">
                                <div className="col-md-6">
                                    <div className="row">
                                        <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Mobile: </label>
                                        <div className="col-sm-9">
                                            <input type="contact" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Enater Mobile" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Email: </label>
                                        <div className="col-sm-9">
                                            <input type="email" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Enater Email" />
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="row g-2 ">

                                <div className="col-md-12 mb-3 pt-3 d-flex justify-content-between">
                                    <a href="#" className="col-sm-5 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CCFDF4" }} role="button"><span className="text-nowrap">Patient Opt out Using MHP mobile App</span></a>
                                    <a href="#" className="col-sm-5 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FBC3C4" }} role="button"><span className="text-nowrap">Save</span></a>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    );
};

export default PatientContactNotes3;