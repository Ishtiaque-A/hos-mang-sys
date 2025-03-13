import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';

const DailyMessages = () => {
    return (
        <div>
             <Sidebar1></Sidebar1>
            <div className="container mb-4 font-size-patient pt-5" >
            <Link to ="/DailyMessages"   className="text-decoration-none"><h2 className="fw-normal pt-4 mb-4 text-login" >Daily Messages </h2></Link>
                <div className="container col-md-11 shadow border border-1 p-4" style={{ backgroundColor: "#EBFFE4" }}>
                    <form className="row g-3">
                        <div className=" col-12 container-fluid d-flex justify-content-md-start pt-0 ">
                            <div className="row col-6">
                                <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm text-muted">Date Start</label>
                                <div className="col-sm-6">
                                    <input type="date" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="" />
                                </div>
                            </div>
                            <div className="row  col-6">
                            <label for="inputEmail3" className="col-sm-4 col-form-label col-form-label-sm text-muted">Display at location</label>
                            <div className="col-sm-8">
                                <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
                                    <option selected>Choose location</option>
                                    <option>Dhaka</option>
                                    <option>Rangpur</option>
                                    <option>Dhaka</option>
                                    <option>Dhaka</option>
                                </select>
                            </div>
                        </div>
                        </div>
                        <div className="col-sm-4">
                            <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
                                <option selected>Choose font name</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="col-sm-2">
                            <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
                                <option selected>Choose page</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div className="col-sm-2 d-flex">
                            <input className="btn btn-sm me-3 px-4" style={{ backgroundColor: "#E0E0E0" }} type="button" value="b" />
                            <input className="btn btn-sm me-3 px-4" style={{ backgroundColor: "#E0E0E0" }} type="button" value="i" />
                            <input className="btn btn-sm me-3 px-4" style={{ backgroundColor: "#E0E0E0" }} type="button" value="u" />
                            <input className="btn btn-sm me-3 px-4" style={{ backgroundColor: "#E0E0E0" }} type="button" value=" " />
                        </div>

                        <div className="mb-3 ">
                            {/* <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label> */}
                            <textarea className="form-control font-size-patient border border-1 rounded" id="exampleFormControlTextarea1" rows="10" placeholder="Write your text"></textarea>
                        </div>


                        <div className="col-12 d-flex justify-content-end">
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CCFDF4" }} role="button"><span className="text-nowrap">Save</span></a>
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FBC3C4" }} role="button"><span className="text-nowrap">Cancel</span></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DailyMessages;