import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from "axios";
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';
import MaterialTable from "material-table";
import Swal from "sweetalert2";

class Religions extends Component {

    state = {
        religions: [],
        loading: true,
    }


    async componentDidMount() {
        const res = await axios.get('/religions');

        if (res.data.status === 200) {
            this.setState({
                religions: res.data.religions,
                loading: false,
            });
        }
    }

    deleteReligion = async (e, id) => {
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
                axios.delete(`/delete-religion/${id}`).then(res => {
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
            title: "Religion Name", field: `religion_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-religion/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
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
                            <div className='card'>
                                <div className="card-header">
                                    <h6 className="ms-3 ">Religions
                                        <Link to={'/add-religions'} className="btn btn-primary btn-sm me-3 float-end"> Add Religion </Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.religions}
                                        options={{
                                            search: true,
                                            // filtering: filter,
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

        );
    }
}

export default Religions;