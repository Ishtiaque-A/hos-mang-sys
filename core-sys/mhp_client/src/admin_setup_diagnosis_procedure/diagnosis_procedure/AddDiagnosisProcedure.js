import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';



function AddDiagnosisProcedure() {

    const [DiagnosisProcedure, setDiagnosisProcedure] = useState({
        DiagnosisProcedure_type: "",
        DiagnosisProcedure_code: "",
        DiagnosisProcedure_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setDiagnosisProcedure({
            ...DiagnosisProcedure, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('DiagnosisProcedure_type', DiagnosisProcedure.DiagnosisProcedure_type);
    formData.append('DiagnosisProcedure_code', DiagnosisProcedure.DiagnosisProcedure_code);
    formData.append('DiagnosisProcedure_name', DiagnosisProcedure.DiagnosisProcedure_name);

    const submitDiagnosisProcedure = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log("submitDiagnosisProcedure", DiagnosisProcedure);
        console.log(e)
        axios.post(`/save-diagnosis-procedure`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setDiagnosisProcedure({
                    DiagnosisProcedure_type: "",
                    DiagnosisProcedure_code: "",
                    DiagnosisProcedure_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setDiagnosisProcedure({ ...DiagnosisProcedure, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <DiagnosisProcedureSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Diagnosis/Procedure
                                        <Link to={'/diagnosis-procedure'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DiagnosisProcedureForm" onSubmit={submitDiagnosisProcedure}>
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
                                                        <option value="ResonForVisit">Reason For Visit</option>
                                                    </select>
                                                    <span className="text-danger">{DiagnosisProcedure.error_list.DiagnosisProcedure_type}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_code" className="col-form-label-sm"> Code </label>
                                                    <input type="text" value={DiagnosisProcedure.DiagnosisProcedure_code} className="form-control" name="DiagnosisProcedure_code" onChange={handleInput} />
                                                    <span className="text-danger">{DiagnosisProcedure.error_list.DiagnosisProcedure_code}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={DiagnosisProcedure.DiagnosisProcedure_name} className="form-control" name="DiagnosisProcedure_name" onChange={handleInput} />
                                                    <span className="text-danger">{DiagnosisProcedure.error_list.DiagnosisProcedure_name}</span>
                                                </div>

                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                        className="fas fa-save"  ></i> Save
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
        </div>
    )
}

export default AddDiagnosisProcedure;



// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import swal from 'sweetalert';
// import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';


// function AddDiagnosisProcedure() {


//     const [statuslist, setStatusList] = useState([]);
//     const [DiagnosisProcedure, setDiagnosisProcedure] = useState({
//         DiagnosisProcedure_name: "",
//         status_id: "",
//         selection_criteria: "",
//         error_list: [],
//     });

//     useEffect(() => {
//         axios.get(`/examination-name-dropdown`).then(res => {
//             console.log(res.data.status_list);
//             if (res.data.status === 200) {
//                 setStatusList(res.data.status_list);
//             }
//         })
//     },
//         []);

//     const handleInput = (e) => {
//         setDiagnosisProcedure({
//             ...DiagnosisProcedure, [e.target.name]: e.target.value
//         });
//     }

//     const submitCanal = (e) => {
//         e.preventDefault();
//         const data = {
//             DiagnosisProcedure_name: DiagnosisProcedure.DiagnosisProcedure_name,
//             status_id: DiagnosisProcedure.status_id,
//             selection_criteria: DiagnosisProcedure.selection_criteria,
//         }

//         axios.post(`/save-diagnosis-procedure`, data).then(res => {
//             if (res.data.status == 200) {
//                 swal("Success", res.data.message, "success");
//                 setDiagnosisProcedure({
//                     DiagnosisProcedure_name: "",
//                     status_id: "",
//                     selection_criteria: "",
//                     error_list: [],

//                 });
//             }
//             else if (res.data.status == 400) {
//                 setDiagnosisProcedure({ ...DiagnosisProcedure, error_list: res.data.errors });

//             }

//         })
//     }

//     return (
//         <div>
//             <>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-3">
//                             < DiagnosisProcedureSetupSidebar />
//                         </div>
//                         <div className="col-md-9 mt-3">
//                             <div className="card">
//                                 <div className="card-header">
//                                     <h6 className="card-title"> Add Diagnosis Procedure
//                                         <Link to={'/diagnosis-procedure'} className="btn btn-primary btn-sm float-end"> Back </Link>
//                                     </h6>
//                                 </div>
//                                 <div className="card-body">
//                                     <form id="DiagnosisProcedureForm" onSubmit={submitCanal}>
//                                         <div className="card-body">

//                                             <div className="col-md-12">


//                                                 <div className="form-group">
//                                                     <label htmlFor="DiagnosisProcedure_name" className="col-form-label-sm"> Name </label>
//                                                     <input type="text" value={DiagnosisProcedure.DiagnosisProcedure_name} className="form-control" name="DiagnosisProcedure_name" onChange={handleInput} />
//                                                     <span className="text-danger">{DiagnosisProcedure.error_list.DiagnosisProcedure_name}</span>

//                                                 </div>
//                                                 <div>
//                                                     <label htmlFor="inputPassword4"
//                                                         className="form-label  col-form-label col-form-label-sm">Examination Name</label>

//                                                     <select id="inputState" onChange={handleInput} value={DiagnosisProcedure.status_id} name="status_id"
//                                                         className="form-select  col-form-label-sm font-size-patient">
//                                                         <option selected>Select</option>
//                                                         {
//                                                             statuslist.map((item) => {
//                                                                 return (
//                                                                     <option value={item.id} key={item.id}>{item.examinationHeading_name}</option>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </select>
//                                                     <span className="text-danger">{DiagnosisProcedure.error_list.status_id}</span>

//                                                 </div>

//                                                 <span className="text-danger">{DiagnosisProcedure.error_list.selection_criteria}</span>


//                                                 <div className="float-right">
//                                                     <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
//                                                         className="fas fa-save"></i> Save
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </>
//         </div>
//     )
// }

// export default AddDiagnosisProcedure
