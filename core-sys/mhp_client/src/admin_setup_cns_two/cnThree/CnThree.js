import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';

function CnThree() {
    const [cnThree, setcnThree] = useState([]);

    useEffect(() => {
        axios.get(`/cnThree`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.cnThree);
                setcnThree(res.data.cnThree);
            }

        });

    }, []);

    const deletecnThree = (e, id) => {
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
                axios.delete(`/delete-cnThree/${id}`).then(res => {
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

    var view_cnThree_HTML_TABLE = "";

    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

            width: "40 !important"
        },
        {
            title: "CN-III Name", field: `name`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },

        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-cnThree/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deletecnThree(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <CnsTwoSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">CN-III, IV, VI
                                    <Link to={'/add-cnThree'} className="btn btn-primary btn-sm float-end"> Add CN-III, IV, VI </Link>
                                </h6>
                            </div>
                            <div className="card-body">

                                <MaterialTable
                                    columns={columns}
                                    data={cnThree}
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

export default CnThree;