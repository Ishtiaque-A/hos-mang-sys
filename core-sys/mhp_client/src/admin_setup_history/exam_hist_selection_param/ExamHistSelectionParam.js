import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';
import Swal from "sweetalert2";

function ExamHistSelectionParam() {

    const [loading, setLoading] = useState(true);
    const [examhistselectparam, setSelectionParameter] = useState([]);

    useEffect(() => {

        axios.get(`/selection-parameter`).then(res => {

            if (res.data.status === 200) {
                // console.log(res.data.selection_parameter)
                setSelectionParameter(res.data.selection_parameter);
                setLoading(false);
            }


        });

    }, []);

    const deletePatient = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

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
                axios.delete(`/delete-selection-parameter/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })


    };

    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

            width: "40 !important"
        },
        {
            title: "Selection Parameter Code", field: "selection_parameter_code", render: (row) => <div>{row.selection_parameter_code == null ? '' : row.selection_parameter_code}</div>
            , cellStyle: {
                width: 300
            },
        },
        {
            title: "Selection Parameter Name", field: "selection_parameter_name", render: (row) => <div>{row.selection_parameter_name == null ? '' : row.selection_parameter_name}</div>, cellStyle: {
                width: 150
            },
        },
        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-selection-parameter/${row.id}`} class="btn action-btn btn-info btn-sm" data-bs-toggle="tooltip" title="Edit Selection Parameter"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deletePatient(e, row.id)} className="btn action-btn btn-danger btn-sm"> <i class="fas fa-trash"></i> </button>&nbsp;
            </div>
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
                                <h6 className="card-title"> Exam History Selection Parameter
                                    <Link to='/add-selection-parameter' className="btn btn-primary btn-sm float-end"> Add Exam History Selection Parameter </Link>
                                </h6>
                            </div>
                            <div className="card-body">

                                <MaterialTable
                                    columns={columns}
                                    data={examhistselectparam}
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

export default ExamHistSelectionParam;
