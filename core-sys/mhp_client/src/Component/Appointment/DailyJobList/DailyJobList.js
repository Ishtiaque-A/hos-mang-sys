import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';

const DailyJobList = () => {
    return (
        <>
 <Sidebar1></Sidebar1>
 <div>
            <div className="container mb-5 font-size-patient pt-5" >
                <Link exact to={"/UncompletedAppointments"} className="text-decoration-none"> <h2 className="fw-normal  text-start pt-3 mb-3 text-login" >Daily Job List</h2></Link>

                <div className="container col-11 shadow border border-1 p-4" style={{ backgroundColor: "#EBFFE4" }}>
                    <div className="container pt-3 mb-4">
                        <form className="row g-1">
                            <div className="table-responsive pt-1">
                                <table className="table table-bordered border-secondary border border-2 ">
                                    <thead style={{ backgroundColor: "#D8FFCB" }}>
                                        <tr>
                                            <th scope="col" className="text-muted">Due Date</th>
                                            <th scope="col" className="text-muted">Action</th>
                                            <th scope="col" className="text-muted">Priority</th>
                                            <th scope="col" className="text-muted">Patient</th>
                                            <th scope="col" className="text-muted">Person entered list</th>
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
                    <nav className="navbar navbar-light" >
                    <div className="row">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="gridCheck" />
                            <label className="form-check-label text-muted" for="gridCheck">
                               Show over due item only
                            </label>
                        </div>
                    </div>
                        <div className="row col-sm-10 justify-content-center">
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#FFDCC8" }} role="button"><span className="text-nowrap">Open Patient</span></a>
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#D1FFC6" }} role="button"><span className="text-nowrap">Add</span></a>
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#C7FFF4" }} role="button"><span className="text-nowrap">Edit</span></a>
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#FFC7C8" }} role="button"><span className="text-nowrap">Delete</span></a>
                            <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#DDC8FF" }} role="button"><span className="text-nowrap">Close</span></a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
</>
       
    );
};

export default DailyJobList;