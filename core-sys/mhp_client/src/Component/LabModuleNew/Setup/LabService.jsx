import axios from 'axios';
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function LabService() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get(`/lab-center-services`).then(res => {
            if (res.data.status === 200) {
                setServices(res.data.service);
            }

        });

    }, []);

    const deleteService = (e, id) => {

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
                axios.delete(`/delete-lab-center-services/${id}`).then(res => {
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
            title: "Serivices", field: `name`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/lab-module-new/edit-lab-center-service/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteService(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <div>
            <div className="card">
                <div className="card-header rx-one-button-group">
                    <h6 className="card-title">Lab Center Services
                        <Link to='/lab-module-new/add-lab-center-service' className="btn float-end"> <button className="btn">Add</button>  </Link>
                    </h6>
                </div>
                <div className="card-body">

                    <MaterialTable
                        columns={columns}
                        data={services}
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
        </div >
    )
}
