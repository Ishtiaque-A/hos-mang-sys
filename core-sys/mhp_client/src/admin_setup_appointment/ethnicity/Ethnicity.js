import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddDashboard from "../AddDashboard/AddDashboard";

import MaterialTable from "material-table";
import Swal from "sweetalert2";

class Ethnicity extends Component {

    // pass data to table row
    state = {
        ethnicity: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {
        const res = await axios.get('/ethnicity');
        // console.log(res);
        if (res.data.status === 200) {
            this.setState({
                ethnicity: res.data.ethnicity,
                loading: false,
            });
        }

    }
    columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,
            cellStyle: {
                maxWidth: 40
            },
        },
        {
            title: "Ethnicity Name", field: `ethnicity_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-ethnicity/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteEthnicity(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    deleteEthnicity = async (e, id) => {

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
                axios.delete(`/delete-ethnicity/${id}`).then(res => {
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

    render() {

        var html_table = "";
        if (this.state.loading) {
            html_table = <tr>
                <td>Loading..</td>
            </tr>
        }
        

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
                                    <h6 className="ms-3">Ethnicity
                                        <Link to={'/add-ethnicity'} className="btn btn-primary btn-sm me-3 float-end"> Add Ethnicity </Link>
                                    </h6>
                                </div>
                                <div className="card-body">

                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.ethnicity}
                                        options={{
                                            search: true,
                                            // filtering: filter,
                                            showTitle: false,
                                            searchFieldAlignment: "left",
                                            pageSize: 10,
                                            pageSizeOptions: [5, 10, 20, 50, 100],
                                            emptyRowsWhenPaging:false,
                                        }}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </>
        );
    }
}

export default Ethnicity;