import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddDashboard from "../AddDashboard/AddDashboard";
import MaterialTable from "material-table";
import Swal from "sweetalert2";

class UserType extends Component {

    // pass data to table row
    state = {
        user_type: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {
        const res = await axios.get('/user-type');
        // console.log(res);
        if (res.data.status === 200) {
            this.setState({
                user_type: res.data.user_type,
                loading: false,
            });
        }

    }

    deleteUserType = async (e, id) => {

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
                axios.delete(`/delete-user-type/${id}`).then(res => {
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
            title: "User Type Name", field: `user_type_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-user-type/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteUserType(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    render() {

        var html_table = "";
        if (this.state.loading) {
            html_table = <tr>
                <td>Loading..</td>
            </tr>
        }
        // else {
        //     html_table =
        //         this.state.user_type.map((item) => {
        //             return (
        //                 <tr key={item.id}>
        //                     <td>{item.id}</td>
        //                     <td>{item.user_type_name}</td>
        //                     {/* <td>{item.created_at}</td>
        //                     <td>{item.updated_at}</td> */}
        //                     <td>

        //                         <Link to={`/edit-user_type/${item.id}`} class="btn action-btn btn-info btn-sm"><i class="fas fa-edit"></i></Link>&nbsp;
        //                         <button onClick={(e) => this.deleteUserType(e, item.id)} className="btn action-btn btn-danger btn-sm"> <i class="fas fa-trash"></i> </button>

        //                     </td>
        //                 </tr>
        //             );
        //         });
        // }

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
                                    <h6>User Type
                                        <Link to='/add-user-type' className="btn btn-primary btn-sm float-end"> Add User Type </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    {/* <table id="categories" className="table dataTable no-footer dtr-inline">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>UserType Name</th>
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
                                        data={this.state.user_type}
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

export default UserType;