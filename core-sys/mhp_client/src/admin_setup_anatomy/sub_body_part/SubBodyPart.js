import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AnatomySetUpSidebar from '../anatomy_setup_mainsidebar/AnatomySetupSidebar';

function SubBodyPart() {
    const [SubBodyPart, setSubBodyPart] = useState([]);

    useEffect(() => {
        axios.get(`/sub-body-part`).then(res => {
            if (res.data.status === 200) {
                setSubBodyPart(res.data.SubBodyPart);
            }

        });

    }, []);

    const deleteSubBodyPart = (e, id) => {

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
                axios.delete(`/delete-sub-body-part/${id}`).then(res => {
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
            title: "Sub Body Part Name", field: `SubBodyPart_name`
            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            // title: "Main Body Part", field: `examination_heading.MainBodyPart_name`
            title: "Main Body Part", 
            render:(row)=><div>{row.MainBodyPart_name} </div>
            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },

        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-sub-body-part/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteSubBodyPart(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
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
                                <h6 className="card-title">Sub-body part
                                    <Link to='/add-sub-body-part' className="btn btn-primary btn-sm float-end"> Add  </Link>
                                </h6>
                            </div>
                            <div className="card-body">

                                <MaterialTable
                                    columns={columns}
                                    data={SubBodyPart}
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

export default SubBodyPart;