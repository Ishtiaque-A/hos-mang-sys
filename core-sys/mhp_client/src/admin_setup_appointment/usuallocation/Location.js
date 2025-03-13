import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddDashboard from '../AddDashboard/AddDashboard';
import MaterialTable from 'material-table';
import Swal from "sweetalert2";

class Location extends Component {
    state = {
        locations: [],
        loading: true,
    }

    //Data Show in API link
    async componentDidMount() {
        const res = await axios.get(`/location`);
        // console.log(res.data.locations);
        if (res.data.status === 200) {
            console.log(res.data.locations);
            this.setState({
                locations: res.data.locations,
                loading: false,
            });
        }
    }

    deleteLocation = async (e, id) => {

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
                axios.delete(`/delete-location/${id}`).then(res => {
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
            title: "Location Name", field: `usual_location_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-location/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteLocation(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    render() {
        //Data Show in table
        var student_HTML_TABLE = "";
        if (this.state.loading) {
            student_HTML_TABLE = <tr><td colSpan="7"> Loading... </td></tr>;
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
                                    <h6>Usual Location
                                        <Link to='/add-location' className="btn btn-primary btn-sm float-end"> Add Location </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.locations}
                                        options={{
                                            search: true,
                                            // filtering: filter,
                                            showTitle: false,
                                            searchFieldAlignment: "left",
                                            pageSize: 5,
                                            pageSizeOptions: [5, 10, 20, 50, 100],
                                            emptyRowsWhenPaging:false
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

export default Location;