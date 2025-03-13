import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';


function EditDiagnosisProcedure(props) {

    const [DiagnosisProcedure, setDiagnosisProcedure] = useState([]);
    const [error, setError] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-diagnosis-procedure/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                // console.log(res.data.DiagnosisProcedure);
                setDiagnosisProcedure(res.data.DiagnosisProcedure);
                // setPicture(res.data.DiagnosisProcedure.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setDiagnosisProcedure({ ...DiagnosisProcedure, [e.target.name]: e.target.value });
    }

    const updateDiagnosisProcedureInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('DiagnosisProcedure_type', DiagnosisProcedure.DiagnosisProcedure_type);
        formData.append('DiagnosisProcedure_code', DiagnosisProcedure.DiagnosisProcedure_code);
        formData.append('DiagnosisProcedure_name', DiagnosisProcedure.DiagnosisProcedure_name);


        axios.post(`/update-diagnosis-procedure/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setDiagnosisProcedure({
                    ...DiagnosisProcedure,

                });
                navigate(`/diagnosis-procedure/`);

            } else {
                setError(res.data.errors)
            }
        });

    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        < DiagnosisProcedureSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Diagnosis/Procedure
                                    <Link to={'/diagnosis-procedure'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="DiagnosisProcedureForm" onSubmit={updateDiagnosisProcedureInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">
                                           
                                            <div className="form-group">
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Type</label>
                                                    <select id="inputState" onChange={(e) => setDiagnosisProcedure({
                                                        ...DiagnosisProcedure, DiagnosisProcedure_type: e.target.value
                                                    })}
                                                        className="form-select  col-form-label-sm font-size-patient" aria-label="Default select example">
                                                        <option selected>Select</option>
                                                        <option value="Diagnosis">Diagnosis</option>
                                                        <option value="Procedure">Procedure</option>
                                                        <option value="ReasonForVisit">Reason For Visit</option>
                                                    </select>
                                                </div>

                                            <div className="form-group">
                                                <label htmlFor="diagnosis_procedure_code" className="col-form-label-sm"> Code </label>
                                                <input type="text" value={DiagnosisProcedure.DiagnosisProcedure_code} className="form-control" name="DiagnosisProcedure_code" onChange={handleInput} />
                                                <span className="text-danger">{error.DiagnosisProcedure_code}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={DiagnosisProcedure.DiagnosisProcedure_name} className="form-control" name="DiagnosisProcedure_name" onChange={handleInput} />
                                                <span className="text-danger">{error.DiagnosisProcedure_name}</span>
                                            </div>

                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default EditDiagnosisProcedure;



// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import swal from 'sweetalert';
// import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';


// function EditDiagnosisProcedure(props) {

//     const [statuslist, setStatusList] = useState([]);
//     const [DiagnosisProcedure, setDiagnosisProcedure] = useState([]);
//     const [error, setError] = useState([]);

//     useEffect(() => {

//         var url = window.location.href;
//         var urlsplit = url.split("/");
//         var lastpart = urlsplit[urlsplit.length - 1];
//         if (lastpart === '') {
//             lastpart = urlsplit[urlsplit.length - 2];
//         }

//         // const carotid_id = props.match.params.id;
//         axios.get(`/edit-diagnosis-procedure/${lastpart}`).then(res => {

//             if (res.data.status === 200) {
//                 setDiagnosisProcedure(res.data.commonHistory);
//             } else if (res.data.status === 404) {
//                 setError(res.data.errors);

//             }

//         });

//     }, []);


//     useEffect(() => {

//         axios.get(`/examination-name-dropdown`).then(res => {
//             console.log(res.data.status_list);
//             if (res.data.status === 200) {
//                 setStatusList(res.data.status_list);
//             }
//         })


//     }, []);


//     const handleInput = (e) => {
//         e.persist();
//         setDiagnosisProcedure({ ...DiagnosisProcedure, [e.target.name]: e.target.value });
//     }

//     const updateCanalInput = (e) => {
//         e.preventDefault();

//         var url = window.location.href;
//         var urlsplit = url.split("/");
//         var lastpart = urlsplit[urlsplit.length - 1];
//         if (lastpart === '') {
//             lastpart = urlsplit[urlsplit.length - 2];
//         }

//         const data = DiagnosisProcedure;
//         axios.post(`/update-diagnosis-procedure/${lastpart}`, data).then(res => {
//             if (res.data.status === 200) {
//                 swal("Success", res.data.message, "success");

//                 setDiagnosisProcedure({
//                     ...DiagnosisProcedure,

//                 });
//                 setError('')
//             } else {
//                 setError(res.data.errors)
//             }
//         });

//     }


//     return (
//         <>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-3">
//                         < DiagnosisProcedureSetupSidebar />
//                     </div>
//                     <div className="col-md-9 mt-3">
//                         <div className="card">
//                             <div className="card-header">
//                                 <h6 className="card-title"> Edit Diagnosis Procedure
//                                     <Link to={'/diagnosis-procedure'} className="btn btn-primary btn-sm float-end"> Back </Link>
//                                 </h6>
//                             </div>
//                             <div className="card-body">
//                                 <form id="DiagnosisProcedureForm" onSubmit={updateCanalInput}>
//                                     <div className="card-body">

//                                         <div className="col-md-12">


//                                             <div className="form-group">
//                                                 <label htmlFor="DiagnosisProcedure_name" className="col-form-label-sm"> Name </label>
//                                                 <input type="text" value={DiagnosisProcedure.DiagnosisProcedure_name} className="form-control" name="DiagnosisProcedure_name" onChange={handleInput} />
//                                                 <span className="text-danger">{error.DiagnosisProcedure_name}</span>

//                                             </div>


//                                             <div>
//                                                 <label htmlFor="inputPassword4"
//                                                     className="form-label  col-form-label col-form-label-sm">Examination Name</label>

//                                                 <select id="inputState" onChange={handleInput} value={DiagnosisProcedure.status_id} name="status_id"
//                                                     className="form-select  col-form-label-sm font-size-patient">
//                                                     <option selected>Select</option>
//                                                     {
//                                                         statuslist.map((item) => {
//                                                             return (
//                                                                 <option value={item.id} key={item.id}>{item.examinationHeading_name}</option>
//                                                             )
//                                                         })
//                                                     }
//                                                 </select>
//                                             </div>




//                                             <div className="float-right">
//                                                 <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
//                                                     className="fas fa-save"></i> Update
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </>

//     )
// }

// export default EditDiagnosisProcedure
