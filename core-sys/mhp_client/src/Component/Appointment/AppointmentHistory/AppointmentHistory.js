import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';

const AppointmentHistory = () => {
    return (
        <>
 <Sidebar1></Sidebar1>
 <div>
            <div className="container mb-5 font-size-patient pt-5" >
            <Link to ="/AppointmentHistory"   className="text-decoration-none"><h2 className="fw-normal pt-4 mb-4 text-login" >Appointment History</h2></Link>
                <div className="container col-11 shadow border border-1 p-4" style={{ backgroundColor: "#EBFFE4" }}>
                    <form className="row g-3">

                        <div className="container-fluid  d-flex justify-content-md-start pt-0 ">
                            <div className="row col-md-6">
                                <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted">Search for:</label>
                                <div className="col-sm-8">
                                    <input type="search" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Search" />
                                </div>
                            </div>
                            <div className="form-check form-check-inline me-5 pt-1">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label className="form-check-label text-muted" for="inlineRadio1">Name/D.O.B</label>
                            </div>
                            <div className="form-check form-check-inline me-5 pt-1">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label className="form-check-label text-muted" for="inlineRadio2">NID</label>
                            </div>
                            <div className="form-check form-check-inline me-5 pt-1">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label className="form-check-label text-muted" for="inlineRadio2">Medical Record (MRN) No</label>
                            </div>
                        </div>
                        <div className="col-md-10 offset-md-1">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" for="gridCheck">
                                    Include Inactive Patient
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" for="gridCheck">
                                    Include Deceased Patient
                                </label>
                            </div>
                        </div>
                        <div className="table-responsive pt-3">
                            <table className="table table-bordered border-secondary border border-2 ">
                                <thead style={{ backgroundColor: "#D8FECB" }}>
                                    <tr>
                                        <th scope="col" className="text-muted">Name</th>
                                        <th scope="col" className="text-muted">Age</th>
                                        <th scope="col" className="text-muted">Address</th>
                                        <th scope="col" className="text-muted">D.O.B</th>
                                        <th scope="col" className="text-muted">Medical record no</th>
                                    </tr>
                                </thead>
                                <tbody className=" table-light border-secondary border border-2">
                                    <tr>
                                        <th scope="row"> </th>
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
                                    </tr>
                                    <tr>
                                        <th scope="row"> </th>
                                        <td > </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div className="container col-md-12 d-flex justify-content-between pt-1 mb-4">
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#FFDCC8" }} role="button"><span className="text-nowrap">View</span></a>
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#DDFEC7" }} role="button"><span className="text-nowrap">Print</span></a>
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CFC8FC" }} role="button"><span className="text-nowrap">Recover</span></a>
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CCFDF4" }} role="button"><span className="text-nowrap">Save</span></a>
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFC8F9" }} role="button"><span className="text-nowrap">Close</span></a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
</>
      
    );
};

export default AppointmentHistory;