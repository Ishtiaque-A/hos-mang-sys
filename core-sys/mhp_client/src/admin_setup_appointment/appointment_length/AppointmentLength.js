import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from "axios";
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import MaterialTable from 'material-table';
import Footer from '../../Component/Footer/Footer';
import Swal from "sweetalert2";

class AppointmentLength extends Component {

    state = {
        appointment_lengths: [],
        loading: true,
    }


    async componentDidMount() {
        const res = await axios.get('/appointment-lengths');

        if (res.data.status === 200) {
            this.setState({
                appointment_lengths: res.data.appointment_lengths,
                loading: false,
            });
        }
    }

    deleteReligion = async (e, id) => {

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
                axios.delete(`/delete-appointment-lengths/${id}`).then(res => {
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
    columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,
            cellStyle: {
                maxWidth: 40
            },
        },
        {
            title: "Appointment Length Name", field: `appointment_lengths_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-appointment-length/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteReligion(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    render() {

        var religion_html_table = "";

        if (this.state.loading) {

            religion_html_table = <tr>
                <td colSpan="/">Loading..</td>
            </tr>;

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
                                    <h6>Appointment Length
                                        <Link to={'/add-appointment-length'} className="btn btn-primary btn-sm float-end"> Add Appointment Length </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    {/* <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Appointment Length Name</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {religion_html_table}

                                    </tbody>

                                </table> */}
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.appointment_lengths}
                                        options={{
                                            search: true,
                                            // filtering: filter,
                                            showTitle: false,
                                            searchFieldAlignment: "left",
                                            pageSize: 5,
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

export default AppointmentLength;