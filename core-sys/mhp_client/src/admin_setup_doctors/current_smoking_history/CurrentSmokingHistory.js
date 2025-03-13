import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';

import axios from "axios";
import MaterialTable from 'material-table';
import Swal from "sweetalert2";

class CurrentSmokingHistory extends Component {

    state = {
        current_smoking_histories: [],
        loading: true,
    }


    async componentDidMount() {
        const res = await axios.get('/smoking-histories');

        if (res.data.status === 200) {
            this.setState({
                current_smoking_histories: res.data.current_smoking_histories,
                loading: false,
            });
        }
    }

    deleteCurrentSmokingHistory = async (e, id) => {

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
                axios.delete(`/delete-smoking-histories/${id}`).then(res => {
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
    columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,
            cellStyle: {
                maxWidth: 40
            },
        },
        {
            title: "Current Smoking History Name", field: `current_smoking_histories_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-smoking-histories/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteCurrentSmokingHistory(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];


    render() {

        var current_smoking_histories_html_table = "";

        if (this.state.loading) {

            current_smoking_histories_html_table = <tr>
                <td colSpan="/"><h2>Loading..</h2></td>
            </tr>;

        } 


        return (
            <>
              
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <DoctorsSetupSidebar></DoctorsSetupSidebar>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className='card'>
                                <div className="card-header">
                                    <h6 className="card-title"> Current Smoking History
                                        <Link to={'/add-smoking-histories'} className="btn btn-primary btn-sm float-end"> Add Current Smoking History </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    {/* <table id="categories" className="table dataTable no-footer dtr-inline">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Current Smoking History Name</th>
                                                <th>Created At</th>
                                                <th>Updated At</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {current_smoking_histories_html_table}

                                        </tbody>

                                    </table> */}
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.current_smoking_histories}
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

export default CurrentSmokingHistory;