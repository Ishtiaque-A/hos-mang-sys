import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import AddDashboard from "../AddDashboard/AddDashboard";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
class Title extends Component {

    // pass data to table row
    state = {
        title: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {
        const res = await axios.get('/title');
        // console.log(res.data.title);
        if (res.data.status === 200) {
            this.setState({
                title: res.data.title,
                loading: false,
            });
        }

    }

    deleteTitle = async (e, id) => {

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
                axios.delete(`/delete-title/${id}`).then(res => {
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
            title: "Title Name", field: `title_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-title/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteTitle(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    render() {
        return (
            <>
                <div className="ms-2">
                    <div className="row">
                        <div className="col-md-3">
                            <AddDashboard />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="custom-card">
                                <div className="card-header">
                                    <h6>Title
                                        <Link to='/add-title' className="btn btn-primary btn-sm float-end"> Add Title </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.title}
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

export default Title;