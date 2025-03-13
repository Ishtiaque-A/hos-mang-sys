import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';

const ReferralFollowUp = () => {
    return (
        <div>
             <Sidebar1></Sidebar1>
            <div className="container mb-5 font-size-patient pt-5" >
                <Link exact to={"/DatabaseSearch"} className="text-decoration-none navbar-brand lh-1"><h2 className="fw-normal pt-4 mb-4 text-login" >Referral Follow-up</h2></Link>
                <form className="row g-3 ms-4">
                    <div className="container-fluid col-11 d-flex justify-content-md-between pt-0 ">
                        <div className="row col-md-4">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm text-muted">Start date:</label>
                            <div className="col-sm-6">
                                <input type="date" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="" />
                            </div>
                        </div>
                        <div className="row col-md-4">
                            <label for="colFormLabelSm" className="col-sm-6 col-form-label col-form-label-sm text-muted">Messaging Provider:</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Messaging Provider" />
                            </div>
                        </div>
                        <div className="row  col-md-4">
                            <label for="inputEmail3" className="col-sm-4 col-form-label col-form-label-sm text-muted">Status:</label>
                            <div className="col-sm-6">
                                <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
                                    <option selected>All</option>
                                    <option>Dhaka</option>
                                    <option>Rangpur</option>
                                    <option>Dhaka</option>
                                    <option>Dhaka</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="container col-12 pt-3 mb-3 ">
                        <div className="col-12 offset-1">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" for="gridCheck">
                                    Hide positive acknowledgedments
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="container col-11 shadow border border-1 p-4" style={{ backgroundColor: "#EBFFE4" }}>
                    <form className="row g-1">
                        <div className="table-responsive pt-1">
                            <table className="table table-bordered border-secondary border border-2 ">
                                <thead style={{ backgroundColor: "#D8FECB" }}>
                                    <tr>
                                        <th scope="col" className="text-muted">Date</th>
                                        <th scope="col" className="text-muted">Patient</th>
                                        <th scope="col" className="text-muted">Address</th>
                                        <th scope="col" className="text-muted">Provider</th>
                                        <th scope="col" className="text-muted">Messaging provider</th>
                                        <th scope="col" className="text-muted">Message ID</th>
                                        <th scope="col" className="text-muted">Status</th>
                                        <th scope="col" className="text-muted">Details</th>
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

                <div className="container-fluid  d-flex justify-content-md-start pt-5 offset-md-1">
                    <div className="row col-md-6">
                        <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm text-muted">Current logged in:</label>
                        <div className="col-sm-6">
                            <input type="email" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Logged in" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralFollowUp;