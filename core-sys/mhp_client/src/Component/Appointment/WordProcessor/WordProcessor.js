import React from 'react';
import './WordProcessor.css';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';

const WordProcessor = () => {
    return (
        <div>
             <Sidebar1></Sidebar1>
            <div className="container pt-5" >
                <Link exact to={"/WordProcessor"} className="text-decoration-none "><h2 className="fw-normal pt-3 mb-2 text-login" >Word Processor</h2></Link>
                <nav className="navbar navbar-brand col-12 ms-4" >
                    <div className="navbar-fluid d-flex justify-content-between mb-3 ">
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#FFDCC8" }} role="button"><span className="text-nowrap">File</span></a>
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#DDFEC7" }} role="button"><span className="text-nowrap">Print</span></a>
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#CFC8FC" }} role="button"><span className="text-nowrap">Save</span></a>
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#CCFDF4" }} role="button"><span className="text-nowrap">Email</span></a>
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-2" style={{ backgroundColor: "#FFC8F9" }} role="button"><span className="text-nowrap">Add Template</span></a>
                        <span className="col-sm-2 me-2">
                            <select id="inputState" className="form-select form-select-md font-size-patient text-muted ">
                                <option selected>Choose Font</option>
                                <option>Arial</option>
                                <option>New Times Roman</option>
                                <option>Italic</option>
                                <option>Sanserif</option>
                            </select>
                        </span>
                        <span className="col-sm-1 me-2">
                            <select id="inputState" className="form-select form-select-md font-size-patient text-muted me-3">
                                <option selected>Number</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </select>
                        </span>
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#DCC7FF" }} role="button"><span className="text-nowrap">Add Signature</span></a>
                    </div>
                </nav>
                <form className="container mx-3">
                    <div className="row g-3">
                        <h5 className="text-muted">Template fevourites:</h5>
                        <div className="col-3 ">
                            <div className="shadow border border-1 rounded p-3 word-pro-temp-left">
                                <p className="text-muted ">Template name</p>
                                <div className="col-sm-12 font-size-patient">
                                    <div className="row col-sm-12 mx-0 mb-3 pt-5">
                                        <a href="#" className="col-sm-12 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted " style={{ backgroundColor: "#FFDCC8" }} role="button"><span >Template item: click to add</span></a>
                                    </div>
                                    <div className="col-sm-12">
                                        <label for="validationDefault01" className="form-label text-muted">Surname</label>
                                        <input type="text" className="form-control form-control-sm text-muted font-size-patient" id="validationDefault01" value="surname" required />
                                    </div>
                                    <div className="col-sm-12 pt-2">
                                        <label for="validationDefault02" className="form-label text-muted">First name</label>
                                        <input type="text" className="form-control form-control-sm text-muted font-size-patient" id="validationDefault02" value="first name" required />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between pt-3 mb-4">
                                <a href="#" className="col-sm-5 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#FFDCC8" }} role="button"><span className="text-nowrap">Add</span></a>
                                <a href="#" className="col-sm-5 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted " style={{ backgroundColor: "#DDFEC7" }} role="button"><span className="text-nowrap">Delete</span></a>
                            </div>
                        </div>

                        <div className="col-8 shadow border border-1 rounded p-5 word-pro-temp-right ">
                            <div className="col-md-12 shadow border border-1 rounded p-3 word-pro-temp-middle">

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WordProcessor;