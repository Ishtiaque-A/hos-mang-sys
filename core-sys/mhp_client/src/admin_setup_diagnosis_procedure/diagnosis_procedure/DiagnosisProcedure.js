import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';


function DiagnosisProcedure() {

    const [DiagnosisProcedure, setDiagnosisProcedure] = useState([]);
    const storageData = JSON.parse(localStorage?.getItem("diagnosisProcedureData"));
    console.log(storageData)
    useEffect(() => {

        axios.get(`/diagnosis-procedure`).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                console.log(res.data.DiagnosisProcedure);
                setDiagnosisProcedure(res.data.DiagnosisProcedure);
                localStorage.setItem("diagnosisProcedureData", JSON.stringify(res.data.DiagnosisProcedure));
            }

        });

    }, []);

    const deleteDiagnosisProcedure = (e, id) => {

        e.preventDefault();
        const thisClicked = e.currentTarget;
        //  thisClicked.innerText = "Deleting";

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-diagnosis-procedure/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                        //   swal("Success", res.data.message, "success");
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })


    }


    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

            width: "40 !important"
        },
        {
            title: "Type", field: `DiagnosisProcedure_type`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Code", field: `DiagnosisProcedure_code`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Name", field: `DiagnosisProcedure_name`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Action", field: "", render: (row) => <div><Link to={`/edit-diagnosis-procedure/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteDiagnosisProcedure(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
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
                                    <Link to='/add-diagnosis-procedure' className="btn btn-primary btn-sm float-end"> Add  </Link>
                                </h6>
                            </div>
                            <div className="card-body">

                                <MaterialTable
                                    columns={columns}
                                    data={DiagnosisProcedure}
                                    options={{
                                        searech: true,
                                        // filtering: filter,
                                        showTitle: false,
                                        searechFieldAlignment: "left",
                                        pageSize: 5,
                                        emptyRowsWhenPaging: false,
                                        pageSizeOptions: [5, 10, 20, 50, 100]
                                    }}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default DiagnosisProcedure;


// import axios from 'axios';
// import MaterialTable from 'material-table';
// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';


// function DiagnosisProcedure() {
//     const [DiagnosisProcedure, setDiagnosisProcedure] = useState([]);

//     useEffect(() => {
//         axios.get(`/diagnosis-procedure`).then(res => {
//             if (res.data.status === 200) {
//                 console.log(res.data.commonHistory);
//                 setDiagnosisProcedure(res.data.commonHistory);
//             }

//         });

//     }, []);

//     const deleteDiagnosisProcedure = (e, id) => {

//         e.preventDefault();
//         const thisClicked = e.currentTarget;
//         //  thisClicked.innerText = "Deleting";

//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axios.delete(`/delete-diagnosis-procedure/${id}`).then(res => {
//                     if (res.data.status === 200) {
//                         thisClicked.closest("tr").remove();
//                         //   swal("Success", res.data.message, "success");
//                     }
//                 });
//                 Swal.fire(
//                     'Deleted!',
//                     'Your data has been deleted.',
//                     'success'
//                 )
//             }
//         })


//     }


//     const columns = [
//         {
//             title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

//             width: "40 !important"
//         },
//         {
//             title: "Diagnosis Procedure Name", field: `DiagnosisProcedure_name`

//             , cellStyle: {
//                 marginLeft: 50,
//                 width: 600
//             },
//         },
//         {
//             title: "Diagnosis/Procedure", field: `examination_heading.examinationHeading_name`

//             , cellStyle: {
//                 marginLeft: 50,
//                 width: 600
//             },
//         },

//         {
//             title: "Action", field: "", render: (row) => <div><Link to={`/edit-diagnosis-procedure/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
//                 <button onClick={(e) => deleteDiagnosisProcedure(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
//         },
//     ];
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
//                                 <h6 className="card-title">Diagnosis Procedure
//                                     <Link to='/add-diagnosis-procedure' className="btn btn-primary btn-sm float-end"> Add  </Link>
//                                 </h6>
//                             </div>
//                             <div className="card-body">

//                                 <MaterialTable
//                                     columns={columns}
//                                     data={DiagnosisProcedure}
//                                     options={{
//                                         search: true,
//                                         // filtering: filter,
//                                         showTitle: false,
//                                         searchFieldAlignment: "left",
//                                         pageSize: 5,
//                                         emptyRowsWhenPaging: false,
//                                         pageSizeOptions: [5, 10, 20, 50, 100]
//                                     }}

//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>

//     )
// }

// export default DiagnosisProcedure