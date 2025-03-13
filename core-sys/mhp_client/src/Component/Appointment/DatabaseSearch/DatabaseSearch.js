import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';

const DatabaseSearch = () => {
    return (
        <>
 <Sidebar1></Sidebar1>
 <div className="container mb-5 font-size-patient pt-5" >
            <Link  to={"/DatabaseSearch"} className="text-decoration-none navbar-brand lh-1"><h2 className="fw-normal pt-4 mb-2 text-login" >Database Search </h2></Link>

            <div className="container col-11 d-flex justify-content-between">
                <div className=" row mb-3 col-md-8 ">
                    <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm text-muted">Date Start:</label>
                    <div className="col-sm-10 d-flex mb-3 " id="colFormLabelSm" >
                        <a href="#" className="col-md-4 col-sm-4 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#FFF9C9" }} role="button"><span className="text-nowrap">Diseases</span></a>
                        <a href="#" className="col-md-4 col-sm-4 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#C6FFEF" }} role="button"><span className="text-nowrap">Medications</span></a>
                        <a href="#" className="col-md-4 col-sm-4 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#ECFEC6" }} role="button"><span className="text-nowrap">Demographs</span></a>
                    </div>
                    <div className="col-sm-10 offset-sm-2 d-flex  mb-3" id="colFormLabelSm" >
                        <a href="#" className="col-md-4 col-sm-4 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CFFEC7" }} role="button"><span className="text-nowrap">Visits</span></a>
                        <a href="#" className="col-md-4 col-sm-4 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#C7CDFF" }} role="button"><span className="text-nowrap">immunisations</span></a>
                        <a href="#" className="col-md-4 col-sm-4 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#FFD2FB" }} role="button"><span className="text-nowrap">Observations</span></a>
                    </div>
                    {/* <div className="col-sm-8" id="colFormLabelSm">
                        <div className="row">
                            <a href="#" className="col-sm-3 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFD4CB" }} role="button"><span className="text-nowrap">Start the query</span></a>
                            <a href="#" className="col-sm-3 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFF4D2" }} role="button"><span className="text-nowrap">Search the query</span></a>
                            <a href="#" className="col-sm-3 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFD4CB" }} role="button"><span className="text-nowrap">Start the query</span></a>
                        </div>
                        <div className="row">
                            <a href="#" className="col-sm-3 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFD4CB" }} role="button"><span className="text-nowrap">Start the query</span></a>
                            <a href="#" className="col-sm-3 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFF4D2" }} role="button"><span className="text-nowrap">Search the query</span></a>
                            <a href="#" className="col-sm-3 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFD4CB" }} role="button"><span className="text-nowrap">Start the query</span></a>
                        </div>
                      
                    </div> */}
                </div>
               
                <div className="row col-md-4 " > {/* Not Responsive */}
                    <a href="#" className="col-sm-5 p-2 pt-3 text-center text-decoration-none shadow btn-sm  border border-1 rounded text-muted me-3" style={{ backgroundColor: "#FFF5D2", height: "80px" }} role="button" ><span className=" text-nowrap">Cervical Screening</span></a>
                    <a href="#" className="col-sm-5 p-3 pt-3 text-center  text-decoration-none shadow btn-sm  border border-1 rounded text-muted me-3" style={{ backgroundColor: "#E1E7FF", height: "80px" }} role="button" ><span className=" text-nowrap">Custom</span></a>
                </div>

            </div>

            <div className="container col-12  ">
                <form className="row g-3 ms-4">
                    <div className="col-md-8 me-4">
                        <textarea className="form-control  border border-1 rounded" id="exampleFormControlTextarea1" rows="6"></textarea>
                    </div>

                    <div className="col-md-3">
                        <a href="#" className="row col-sm-10 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFD4CB" }} role="button"><span className="text-nowrap">Start the query</span></a>
                        <a href="#" className="row col-sm-10 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FFF4D2" }} role="button"><span className="text-nowrap">Search the query</span></a>
                        <a href="#" className="row col-sm-10 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#C9FFEF" }} role="button"><span className="text-nowrap">Save</span></a>
                        <a href="#" className="row col-sm-10 mb-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#CFFEC7" }} role="button"><span className="text-nowrap">New query</span></a>
                    </div>


                    <div className="col-12">
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
                </form>
            </div>

            <div className="container col-11 shadow border border-1 p-4" style={{ backgroundColor: "#EBFFE4" }}>
                <form className="row g-1">
                    <div className="table-responsive pt-1">
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
                </form>
            </div>

            <div className="container-fluid  d-flex justify-content-md-start pt-5 ">
                <div className="row col-md-6">
                    <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm text-muted">Current loged in:</label>
                    <div className="col-sm-6">
                        <input type="email" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Date start" />
                    </div>
                </div>
            </div>
        </div>
</>
        
    );
};

export default DatabaseSearch;