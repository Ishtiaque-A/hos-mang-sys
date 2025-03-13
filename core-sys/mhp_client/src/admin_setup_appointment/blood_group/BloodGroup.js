import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import AddDashboard from "../AddDashboard/AddDashboard";

import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import MaterialTable from "material-table";
import Footer from "../../Component/Footer/Footer";
import Swal from "sweetalert2";

class BloodGroup extends Component {

    // pass data to table row
    state = {
        blood_group: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {
        const res = await axios.get('/blood-group');
        // console.log(res);
        if (res.data.status === 200) {
            this.setState({
                blood_group: res.data.blood_group,
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
            title: "Blood Group Name", field: `blood_group_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-blood-group/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteBloodGroup(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    deleteBloodGroup = async (e, id) => {

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
                axios.delete(`/delete-blood-group/${id}`).then(res => {
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
                                    <h6 className="ms-3">Blood Group
                                        <Link to={'/add-blood-group'} className="btn btn-primary btn-sm me-3 float-end"> Add Blood Group </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    {/* <table className="table dataTable no-footer dtr-inline">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>BloodGroup Name</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {html_table}

                                    </tbody>

                                </table> */}
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.blood_group}
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

export default BloodGroup;