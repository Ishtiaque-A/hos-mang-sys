import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';
import AddDashboard from '../AddDashboard/AddDashboard';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import MaterialTable from 'material-table';
import Footer from "../../Component/Footer/Footer";
import Swal from "sweetalert2";

class Occupation extends Component {
    state = {
        occupations: []
    }

    // Data Show in API link
    async componentDidMount() {
        const res = await axios.get(`/occupation`);
        // console.log(res.data.occupations);
        if (res.data.status === 200) {
            this.setState({
                occupations: res.data.occupations,
                loading: false,
            });
        }
    }

    deleteOccupation = async (e, id) => {

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
                axios.delete(`/delete-occupation/${id}`).then(res => {
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
            title: "Occupation Name", field: `occupation_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-occupation/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteOccupation(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    render() {
    
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
                                    <h6>Occupation
                                        <Link to={'/add-occupation'} className="btn btn-primary btn-sm float-end"> Add Occupation </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.occupations}
                                        options={{
                                            search: true,
                                            // filtering: filter,
                                            showTitle: false,
                                            searchFieldAlignment: "left",
                                            pageSize: 5,
                                            pageSizeOptions: [5, 10, 20, 50, 100],
                                            emptyRowsWhenPaging: false,
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

export default Occupation;