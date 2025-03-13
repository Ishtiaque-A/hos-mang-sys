import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import WomensHealthSidebar from '../womens_health_seup_mainsidebar/WomensHealthSidebar';

function Obstetrics() {

    const [obstetrics, setObstetrics] = useState([]);

    useEffect(() => {
        axios.get(`/obstetrics`).then(res => {
            if (res.data.status === 200) {
                setObstetrics(res.data.obstetricsName);
            }
        });

    }, []);

    const deleteObstetrics = (e, id) => {

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
                axios.delete(`/delete-obstetrics/${id}`).then(res => {
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
            title: "Obstetrics Name", field: `name`

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },
        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-obstetrics/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteObstetrics(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    
    return (
        <>
           
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                    <WomensHealthSidebar/>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Obstetrics
                                    <Link to='/add-obstetrics' className="btn btn-primary btn-sm float-end"> Add Obstetrics </Link>
                                </h6>
                            </div>
                            <div className="card-body">                              
                                <MaterialTable
                                    columns={columns}
                                    data={obstetrics}
                                    options={{
                                        search: true,
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

export default Obstetrics;