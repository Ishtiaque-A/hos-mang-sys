import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';
import Swal from "sweetalert2";

const IschaemicRiskFactor = () => {
    const [riskFactor, setRiskFactor] = useState([]);

    useEffect(() => {
        axios.get(`/ischaemic-risk-factor`).then(res => {
            if (res.status === 200) {
                setRiskFactor(res.data.riskFactor);
            }

        });

    }, []);

    const deleteIschaemic = (e, id) => {

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
                axios.delete(`/delete-ischaemic-risk-factor/${id}`).then(res => {
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

    }

    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

            width: "40 !important"
        },
        {
            title: "Risk Factor Name", field: `name`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-ischaemic-risk-factor/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteIschaemic(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <HistorySetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Ischaemic Risk Factor
                                    <Link to='/add-ischaemic-risk-factor' className="btn btn-primary btn-sm float-end"> Add </Link>
                                </h6>
                            </div>
                            <div className="card-body">

                                <MaterialTable
                                    columns={columns}
                                    data={riskFactor}
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
        </div>
    );
};

export default IschaemicRiskFactor;