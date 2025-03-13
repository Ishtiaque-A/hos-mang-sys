import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ImmunisationSetupSidebar from '../immunisation_setup_sidebar/ImmunisationSetupSidebar';

const VaccineAgainst = () => {
    const [VaccineAgainst, setVaccineAgainst] = useState([]);
    useEffect(() => {
        axios.get(`/vaccine-against`).then(res => {
            if (res.data.status === 200) {
                setVaccineAgainst(res.data.vaccine_tags);
            }
        });

    }, []);

    console.log("vacc", VaccineAgainst)

    const deleteVaccineAgainst = (e, id) => {

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
                axios.delete(`/delete-vaccine-against/${id}`).then(res => {
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
            title: "Vaccine Name", field: `vaccine_name`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Vaccine Against", field: `against_tags`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Name of Manufacturer", field: `Name_of_Manufacturer`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Validity", field: `Validity`

            , cellStyle: {
                marginLeft: 50,
                width: 200
            },
        },
        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-vaccine-against/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteVaccineAgainst(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ImmunisationSetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Vaccine Against
                                <Link to='/add-vaccine-against' className="btn btn-primary btn-sm float-end"> Add  </Link>
                            </h6>
                        </div>
                        <div className="card-body">

                            <MaterialTable
                                columns={columns}
                                data={VaccineAgainst}
                                options={{
                                    search: true,
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
    );
};

export default VaccineAgainst;