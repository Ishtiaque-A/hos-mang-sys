import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AnatomySetUpSidebar from '../anatomy_setup_mainsidebar/AnatomySetupSidebar';

function SymptomsAnatomy() {
    const [SymptomsAnatomy, setSymptomsAnatomy] = useState([]);
    useEffect(() => {
        axios.get(`/symptoms-anatomy`).then(res => {
            if (res.data.status === 200) {
                setSymptomsAnatomy(res.data.symptoms_anatomy);
            }

        });

    }, []);

    const deleteSymptomsAnatomy = (e, id) => {
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
                axios.delete(`/delete-symptoms-anatomy/${id}`).then(res => {
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
            title: "Symptoms Name", field: `symptom_name`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Main body part", render: (row) => <div>
                {
                    row.MainBodyPart_name
                }
            </div>

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Sub-body part", render: (row) => <div>
                {
                    row.SubBodyPart_name
                }
            </div>

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        }, {
            title: "Selection", render: (row) => <div>
                {
                    row.side_selection_name
                }
            </div>

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Gender", render: (row) => <div>
                {
                    row.birth_sex_name===null? row.gender_id: row.birth_sex_name
                }
            </div>

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },

        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-symptoms-anatomy/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteSymptomsAnatomy(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <AnatomySetUpSidebar />
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Symptoms
                                    <Link to='/add-symptoms-anatomy' className="btn btn-primary btn-sm float-end"> Add  </Link>
                                </h6>
                            </div>
                            <div className="card-body">

                                <MaterialTable
                                    columns={columns}
                                    data={SymptomsAnatomy}
                                    options={{
                                        search: true,
                                        // filtering: filter,
                                        showTitle: false,
                                        searchFieldAlignment: "left",
                                        pageSize: 10,
                                        emptyRowsWhenPaging: false,
                                        pageSizeOptions: [10, 20, 50, 100]
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

export default SymptomsAnatomy