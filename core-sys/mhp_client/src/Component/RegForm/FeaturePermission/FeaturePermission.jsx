import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import LeftMenuBar from '../leftMenubar/LeftMenuBar';
const FeaturePermission = () => {
    const [featurePermission, setfeaturePermission] = useState([]);

    useEffect(() => {
        axios.get(`/feature-permission`).then(res => {
            if (res.data.status === 200) {
                setfeaturePermission(res.data.MhpFeaturePermission);
            }

        });

    }, []);


    const deleteRole = (e, id) => {

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
                axios.delete(`/delete-feature-permission/${id}`).then(res => {
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
            cellStyle: {
                maxWidth: 40
            },
        },
        {
            title: "Page Name", field: `name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },

        {
            title: "Slug", field: `slug`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-feature-permission/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) =>deleteRole(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <div className="ms-2 mt-2 mb-3">
                <div className="row">
                <div className="col-md-3">
                <LeftMenuBar />
             </div>
                    <div className="col-md-9">
                        <div className="custom-card">
                            <div className="card-header">
                                <h6 className="card-title">Feature Permission
                                    <Link to='/add-feature-permission' className="btn btn-primary btn-sm float-end"> Add  </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                
                                <MaterialTable
                                    columns={columns}
                                    data={featurePermission}
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
    );
};

export default FeaturePermission;