import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';
import './DeletedClinicalData.css';

const DeletedClinicalData = () => {
    return (
        <>
 <Sidebar1></Sidebar1>
 <div className="container mb-5 font-size-patient pt-5" >
            <Link  to={"/DeletedClinicalData"} className="text-decoration-none navbar-brand lh-1"><h2 className="fw-normal pt-4 mb-4 text-login" >Deleted Clinical Data </h2></Link>
            <div className="container col-11 shadow border border-1 p-4" style={{ backgroundColor: "#EBFFE4" }}>
                <form className="row g-3">
                    <div className="container-fluid  d-flex justify-content-md-start pt-0 ">
                        <div className="form-check form-check-inline me-5">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                            <label className="form-check-label text-muted" for="inlineRadio1">By data type</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                            <label className="form-check-label text-muted" for="inlineRadio2">By patient</label>
                        </div>
                    </div>
                    <div className="container-fluid  d-flex justify-content-md-start pt-0 ">

                        <div className="row  col-md-4">
                            <label for="inputEmail3" className="col-sm-5 col-form-label col-form-label-sm text-muted">Type of data:</label>
                            <div className="col-sm-6">
                                <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
                                    <option selected>Choose location</option>
                                    <option>Dhaka</option>
                                    <option>Rangpur</option>
                                    <option>Dhaka</option>
                                    <option>Dhaka</option>
                                </select>
                            </div>
                        </div>
                        <div className="row col-md-4">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm text-muted">Start date:</label>
                            <div className="col-sm-6">
                                <input type="date" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="" />
                            </div>
                        </div>
                        <div className="row col-md-4">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm text-muted">End date:</label>
                            <div className="col-sm-6">
                                <input type="date" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive pt-3">
                        <table className="table table-bordered border-secondary border border-2 ">
                            <thead style={{ backgroundColor: "#D8FECB" }}>
                                <tr>
                                    <th scope="col" className="text-muted">Patient</th>
                                    <th scope="col" className="text-muted">Visit date</th>
                                    <th scope="col" className="text-muted">Provider</th>
                                    <th scope="col" className="text-muted">Visite type</th>
                                    <th scope="col" className="text-muted">Date deleted</th>
                                    <th scope="col" className="text-muted">Deleted by</th>
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
                                </tr>
                                <tr>
                                    <th scope="row"> </th>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="row  col-md-4 pt-3">
                        <label for="inputEmail3" className="col-sm-4 col-form-label col-form-label-sm text-muted">Order by:</label>
                        <div className="col-sm-6">
                            <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
                                <option selected>Choose title</option>
                                <option>Patient</option>
                                <option>Doctor</option>
                                <option>Sister</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </div>

                    <div className="container col-md-8 d-flex justify-content-end pt-5">
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#FFDCC8" }} role="button"><span className="text-nowrap">View</span></a>
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#DDFEC7" }} role="button"><span className="text-nowrap">Print</span></a>
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CFC8FC" }} role="button"><span className="text-nowrap">Recover</span></a>
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CCFDF4" }} role="button"><span className="text-nowrap">Save</span></a>
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFC8F9" }} role="button"><span className="text-nowrap">Close</span></a>
                    </div>

                </form>
            </div>
        </div>
</>
     
    );
};

export default DeletedClinicalData;