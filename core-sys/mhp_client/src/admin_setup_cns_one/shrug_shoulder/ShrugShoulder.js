import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CnsOneSetupSidebar from '../cns_one_setup_mainsidebar/CnsOneSetupSidebar';

function ShrugShoulder() {
    const [shrugshoulder, setshrugshoulder] = useState([]);

    useEffect(() => {
        axios.get(`/shrugshoulder`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.shrugshoulder);
                setshrugshoulder(res.data.shrugshoulder);
            }

        });

    }, []);

    const deleteshrugshoulder = (e, id) => {

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
                axios.delete(`/delete-shrugshoulder/${id}`).then(res => {
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

    var view_shrugshoulder_HTML_TABLE = "";

    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

              width: "40 !important"
        },
        {
            title: "Shrug The Shoulder", field: `shrugshoulder_name`

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },

        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-shrugshoulder/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteshrugshoulder(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <>
           
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <CnsOneSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Shrug The Shoulder
                                    <Link to='/add-shrugshoulder' className="btn btn-primary btn-sm float-end"> Add Shrug The Shoulder</Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                
                                <MaterialTable
                                    columns={columns}
                                    data={shrugshoulder}
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

export default ShrugShoulder