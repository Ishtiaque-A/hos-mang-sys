import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function Questionnaire() {
    const [questionnaire, setquestionnaire] = useState([]);

    useEffect(() => {
        axios.get(`/questionnaire`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.questionnaire);
                setquestionnaire(res.data.questionnaire);
            }

        });

    }, []);

    const deletequestionnaire = (e, id) => {

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
                axios.delete(`/delete-questionnaire/${id}`).then(res => {
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

    var view_questionnaire_HTML_TABLE = "";

    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

            width: "40 !important"
        },
        {
            title: "Questionnaire Name", field: `questionnaire_name`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Questionnaire Description", field: `questionnaire_description`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-questionnaire/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deletequestionnaire(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <MreSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Questionnaire
                                    <Link to='/add-questionnaire' className="btn btn-primary btn-sm float-end"> Add Questionnaire </Link>
                                </h6>
                            </div>
                            <div className="card-body">

                                <MaterialTable
                                    columns={columns}
                                    data={questionnaire}
                                    options={{
                                        search: true,
                                        // filtering: filter,
                                        showTitle: false,
                                        searchFieldAlignment: "left",
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

export default Questionnaire;