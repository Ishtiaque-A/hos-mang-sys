import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';
import Swal from "sweetalert2";

function HistoryExamStatus() {
    const [history_exam_statuslist, setHistoryExamStatusList] = useState([]);

    useEffect(() => {
        axios.get(`/history-exam-status`).then(res => {
            console.log(res.data.history_exam_status);
            if (res.status === 200) {
                setHistoryExamStatusList(res.data.history_exam_status);
            }

        });

    }, []);

    const deleteHistoryExamStatus = (e, id) => {

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
                axios.delete(`/delete-history-exam-status/${id}`).then(res => {
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

//         e.preventDefault();
//
//         const thisClicked = e.currentTarget;
//         thisClicked.innerText = "Deleting";
//
//         axios.delete(`/delete-history-exam-status/${id}`).then(res => {
//             if (res.data.status === 200) {
//                 console.log(res.data.message);
// // alert(res.data.message);
//                 thisClicked.closest("tr").remove();
//                 swal("Success", res.data.message, "success");
//             } else if (res.data.status === 404) {
//                 thisClicked.innerText = "Delete";
//             }
//         });

    }

    var view_history_exam_status_HTML_TABLE = "";

    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

              width: "40 !important"
        },
        {
            title: "History Exam Status Name", field: `history_exam_status_name`

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-history-exam-status/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteHistoryExamStatus(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <>
           
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <HistorySetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">History Exam Status
                                    <Link to='/add-history-exam-status' className="btn btn-primary btn-sm float-end"> Add History Exam Status </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                
                                <MaterialTable
                                    columns={columns}
                                    data={history_exam_statuslist}
                                    options={{
                                        search: true,
                                        // filtering: filter,
                                        showTitle: false,
                                        searchFieldAlignment: "left",
                                        pageSize: 5,
                                        emptyRowsWhenPaging:false,
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

export default HistoryExamStatus;