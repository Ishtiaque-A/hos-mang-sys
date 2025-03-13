import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';

function PictureUpperLimbDermatomes() {
    const [PULimbDermatomes, setPULimbDermatomes] = useState([]);

    useEffect(() => {
        axios.get(`/picture-upper-limb-dermatomes`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.PULimbDermatomes);
                setPULimbDermatomes(res.data.PULimbDermatomes);
            }

        });

    }, []);

    const deletePULimbDermatomes = (e, id) => {

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
                axios.delete(`/delete-picture-upper-limb-dermatomes/${id}`).then(res => {
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
            title: "Picture upper limb dermatomes  Name", field: `PULimbDermatomes_name`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Image", field: `PULimbDermatomes_name`, render: (row) => <div>
                {row.image !== "" ? <img className="me-2" src={`${global.img_url}/images/files/PULimbDermatomes/${row.image}`} width="50px" alt="No Image" /> : <img className="me-2" src={`https://static.thenounproject.com/png/363640-200.png`} width="20px" alt="No Image" />}                 </div>

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },

        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-picture-upper-limb-dermatomes/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deletePULimbDermatomes(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
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
                                <h6 className="card-title">Picture upper limb dermatomes
                                    <Link to='/add-picture-upper-limb-dermatomes' className="btn btn-primary btn-sm float-end"> Add Picture upper limb dermatomes </Link>
                                </h6>
                            </div>
                            <div className="card-body">

                                <MaterialTable
                                    columns={columns}
                                    data={PULimbDermatomes}
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

export default PictureUpperLimbDermatomes;