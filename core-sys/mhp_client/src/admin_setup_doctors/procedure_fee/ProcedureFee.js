import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BillingSetupSidebar from '../../admin_setup_billing/billing_setup_sidebar/BillingSetUpSidebar';

function ProcedureFee() {
    const [procedureFee, setprocedureFee] = useState([]);

    useEffect(() => {
        axios.get(`/procedureFee`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.procedureFee);
                setprocedureFee(res.data.procedureFee);
            }

        });

    }, []);

    const deleteprocedureFee = (e, id) => {

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
                axios.delete(`/delete-procedureFee/${id}`).then(res => {
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

            width: 50
        },
        {
            title: "Group Name", field: `procedure_id`,
            render: (row) => <div>{row.procedure?.procedure_name}</div>,


            cellStyle: {
                width: 300
            },
        },
        {
            title: "Sub group ", field: `subProcedure_name`,
            render: (row) => <div>{row.subProcedure_name}</div>,


            cellStyle: {
                width: 300
            },
        },
        {
            title: "Item Code", field: `item_code`,
            cellStyle: {
                width: 100
            },
        },
        {
            title: "Fee Amount", field: `fee_name`,
            render: (row) => <div>{row.fee_name}</div>,


            cellStyle: {
                width: 100
            },
        },
        {
            title: "Description", field: `description`,
            render: (row) => <div>{row?.description?.slice(0, 100)}</div>,
            cellStyle: {
                width: 400
            },
        },
       
        

        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-procedure-fee/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteprocedureFee(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <BillingSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Procedure Fees
                                    <Link to='/add-procedure-fee' className="btn btn-primary btn-sm float-end"> Add  </Link>
                                </h6>
                            </div>
                            <div className="card-body">

                                <MaterialTable
                                    columns={columns}
                                    data={procedureFee}
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

export default ProcedureFee