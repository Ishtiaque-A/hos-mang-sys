import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AddDashboard from '../AddDashboard/AddDashboard';
import Swal from "sweetalert2";

function Country() {
    const [countrylist, setCountryList] = useState([]);

    useEffect(() => {
        axios.get(`/country`).then(res => {
            if (res.status === 200) {
                setCountryList(res.data.country);
            }

        });

    }, []);

    const deleteCountry = (e, id) => {

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
                axios.delete(`/delete-country/${id}`).then(res => {
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

    var view_country_HTML_TABLE = "";

    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

              width: "40 !important"
        },
        {
            title: "Country Name", field: `country_name`

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-country/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteCountry(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <>
     
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <AddDashboard />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6>Country
                                    <Link to='/add-country' className="btn btn-primary btn-sm float-end"> Add Country </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                
                                <MaterialTable
                                    columns={columns}
                                    data={countrylist}
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

export default Country;