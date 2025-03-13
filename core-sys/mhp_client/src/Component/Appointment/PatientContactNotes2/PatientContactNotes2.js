// import React from 'react';

// const PatientContactNotes2 = () => {
//     return (
//         <div>
//             <div className="container mb-4 font-size-patient pt-5" >
//                 <h2 className="fw-normal pt-4 mb-3 text-login" >Patient Contact Notes 2 </h2>
//                 <div className="container col-md-12 shadow border border-1 " style={{ backgroundColor: "#EBFFE4" }}>
//                     <h6 className=" text-muted pt-2">Contact Notes:</h6>
//                     <form className="p-2">
//                         <div className=" font-size-patient mb-2">

//                             <div className="row g-2">
//                                 <div className="col-12 ">
//                                     <div className="row col-md-3">
//                                         <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Reason:</label>
//                                         <div className="col-sm-9">
//                                             <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
//                                                 <option selected>All</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Rangpur</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Dhaka</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="row col-md-3 ">
//                                         <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Method:</label>
//                                         <div className="col-sm-9">
//                                             <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
//                                                 <option selected>All</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Rangpur</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Dhaka</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="row  col-md-3">
//                                         <label for="inputEmail3" className=" col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Message status:</label>
//                                         <div className="col-sm-7">
//                                             <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
//                                                 <option selected>All</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Rangpur</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Dhaka</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="row col-md-3">


//                                         <div className="col-sm-12">
//                                         <a href="#" className=" col-sm-12  text-decoration-none shadow btn-sm text-center border border-0 rounded text-muted" style={{ backgroundColor: "#FFDCC8" }} role="button"><span className="text-nowrap ">Refresh message statuses</span></a>
//                                             {/* <input class="col-form-label-sm font-size-patient text-muted" style={{ backgroundColor: "#FBC3C4" }} type="button" value="Refresh message statuses" /> */}
//                                         </div>
//                                         {/* <label for="inputEmail3" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Message status: </label>
//                                         <div className="col-sm-9">
//                                             <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
//                                                 <option selected>All</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Rangpur</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Dhaka</option>
//                                             </select>
//                                         </div> */}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="row g-2 pt-2">
//                                 <div className="col-12  d-flex justify-content-between">
//                                     <div className="row col-md-3">
//                                         <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Reason:</label>
//                                         <div className="col-sm-9">
//                                             <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
//                                                 <option selected>All</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Rangpur</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Dhaka</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="row col-md-3 ">
//                                         <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Method:</label>
//                                         <div className="col-sm-9">
//                                             <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
//                                                 <option selected>All</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Rangpur</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Dhaka</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="row  col-md-3">
//                                         <label for="inputEmail3" className=" col-sm-4 col-form-label col-form-label-sm text-muted font-size-patient">Message status:</label>
//                                         <div className="col-sm-8">
//                                             <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
//                                                 <option selected>All</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Rangpur</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Dhaka</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="row col-md-3 ">

//                                         {/* <label for="inputEmail3" className="col-sm-3 col-form-label col-form-label-sm font-size-patient text-muted"></label> */}
//                                         {/* <div className="col-sm-12">
//                                             <input class="btn col-sm-12 col-form-label-sm font-size-patient text-muted" style={{ backgroundColor: "#FBC3C4" }} type="button" value="Refresh message statuses" />
//                                         </div> */}
//                                         <label for="inputEmail3" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Message status: </label>
//                                         <div className="col-sm-9">
//                                             <select id="inputState" className="form-select form-select-sm font-size-patient text-muted">
//                                                 <option selected>All</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Rangpur</option>
//                                                 <option>Dhaka</option>
//                                                 <option>Dhaka</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>


//                         </div>

//                         <div className="table-responsive pt-1">
//                             <table className="table table-bordered border-secondary border border-2 ">
//                                 <thead style={{ backgroundColor: "#D8FECB" }}>
//                                     <tr>
//                                         <th scope="col" className="text-muted">Date</th>
//                                         <th scope="col" className="text-muted">Patient</th>
//                                         <th scope="col" className="text-muted">Address</th>
//                                         <th scope="col" className="text-muted">Provider</th>
//                                         <th scope="col" className="text-muted">Messaging provider</th>
//                                         <th scope="col" className="text-muted">Message ID</th>
//                                         <th scope="col" className="text-muted">Status</th>
//                                         <th scope="col" className="text-muted">Details</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className=" table-light border-secondary border border-2">
//                                     <tr>
//                                         <th scope="row"> </th>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                     </tr>
//                                     <tr>
//                                         <th scope="row"> </th>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                     </tr>
//                                     <tr>
//                                         <th scope="row"> </th>
//                                         <td > </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                         <td> </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                         <h6 className="font-size-patient-contact-note text-muted ">User Comments:</h6>
//                         <div className="row g-2 ">
//                             <div className="mb-3 ">
//                                 {/* <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label> */}
//                                 <textarea className="form-control font-size-patient border border-1 rounded" id="exampleFormControlTextarea1" rows="6" placeholder="User comments"></textarea>
//                             </div>
//                             <div className=" col-12  d-flex justify-content-end">
//                                 <div className="row col-md-6">
//                                     <label for="colFormLabelSm" className="col-sm-3 col-form-label col-form-label-sm text-muted font-size-patient">Message Status:</label>
//                                     <div className="col-sm-9">
//                                         <input type="text" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" placeholder="Home phone" />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-12 mb-3 pt-3 d-flex justify-content-end">
//                                 <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted me-3" style={{ backgroundColor: "#CCFDF4" }} role="button"><span className="text-nowrap">Save</span></a>
//                                 <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FBC3C4" }} role="button"><span className="text-nowrap">Cancel</span></a>
//                             </div>
//                         </div>
//                     </form>

//                 </div>
//             </div>
//         </div>

//     );
// };

// export default PatientContactNotes2;


import React from 'react';

const PatientContactNotes2 = () => {
    return (
        <div>
            <div className="container mb-4 font-size-patient pt-5" >
                <h2 className="fw-normal pt-4 mb-3 text-login" >Patient Contact Notes 2 </h2>
                <div className="container col-md-12 shadow border border-1 " style={{ backgroundColor: "#EBFFE4" }}>
                    <h6 className=" text-muted pt-2">Contact Notes:</h6>
                    <form className="p-2">
                        <div className=" font-size-patient mb-2">
                            <div className="row ">
                                <div className="col-md-3">
                                    <div className="row">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Reason:</label>
                                        <div className="col-sm-7">
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
                                <div className="col-md-3">
                                    <div className="row">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">method:</label>
                                        <div className="col-sm-7">
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
                                <div className="col-md-3">
                                    <div className="row">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Message status:</label>
                                        <div className="col-sm-7">
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
                                <div className="col-md-3">
                                    <div className="row">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Origin:</label>
                                        <div className="col-sm-7">
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

                            </div>
                            <div className="row pt-2">
                                <div className="col-md-3">
                                    <div className="row">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Betwwen:</label>
                                        <div className="col-sm-7">
                                            <input type="date" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="row">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">and</label>
                                        <div className="col-sm-7">
                                            <input type="date" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="row">
                                        <label for="colFormLabelSm" className="col-sm-5 col-form-label col-form-label-sm text-muted font-size-patient">Location:</label>
                                        <div className="col-sm-7">
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
                                <div className="col-md-3">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#E3E9C6" }} value="Refresh message statuses" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="table-responsive pt-1">
                            <table className="table table-bordered border-secondary border border-1 ">
                                <thead style={{ backgroundColor: "#D8FECB" }}>
                                    <tr>
                                        <th scope="col" className="text-muted">Date</th>
                                        <th scope="col" className="text-muted">Patient</th>
                                        <th scope="col" className="text-muted">Reason</th>
                                        <th scope="col" className="text-muted">Origin</th>
                                        <th scope="col" className="text-muted">Method</th>
                                        <th scope="col" className="text-muted">Recovery by</th>
                                        <th scope="col" className="text-muted">Comments</th>
                                        <th scope="col" className="text-muted">Not</th>
                                        <th scope="col" className="text-muted">Repo</th>
                                        <th scope="col" className="text-muted">Message status</th>
                                        <th scope="col" className="text-muted">Location</th>
                                    </tr>
                                </thead>
                                <tbody className=" table-light border-secondary border border-1">
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
                                        <td> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="row  pt-2 mb-2">
                            <div className="col-md-4 ">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                    <label class="form-check-label font-size-patient text-muted" for="inlineCheckbox1"> Show deleted</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                                    <label class="form-check-label font-size-patient text-muted" for="inlineCheckbox2">Show only contact notes with replies</label>
                                </div>
                            </div>
                            <div className="col-md-8 btn-group">
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#FEFECA" }} value="Add" />
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#D2FFC6" }} value="View" />
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#F0B6B5" }} value="Deleted" />
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#C4F7FA" }} value="Print" />
                                <input type="button" className="form-control form-control-sm font-size-patient" id="colFormLabelSm" style={{ backgroundColor: "#BABEE8" }} value="Message status" />
                            </div>
                        </div>
                    </form>
                    
                    <div className="container-fluid col-12 mb-3 pt-2 d-flex justify-content-end">
                        <a href="#" className="col-sm-2 text-decoration-none shadow btn-sm text-center border border-1 rounded text-muted" style={{ backgroundColor: "#FEC09E" }} role="button"><span className="text-nowrap">Close</span></a>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PatientContactNotes2;