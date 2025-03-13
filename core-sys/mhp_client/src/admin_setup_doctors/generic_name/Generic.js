import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DoctorsSetupSidebar from '../doctors_setup_sidebar/DoctorsSetupSidebar';
import MaterialTable from "material-table";
import Swal from "sweetalert2";

class Generic extends Component {

    // pass data to table row
    state = {
        name: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {
        const res = await axios.get('/generic-name');
        console.log(res);
        if (res.data.status === 200) {
            this.setState({
                name: res.data.drugGeneric,
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
            title: "Generic Name", field: `name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-generic-name/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
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
                axios.delete(`/delete-generic-name/${id}`).then(res => {
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
                            <DoctorsSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="ms-3">Drgus Generic Name
                                        <Link to={'/add-generic-name'} className="btn btn-primary btn-sm me-3 float-end"> Add Generic Name </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                   
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.name}
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

export default Generic;