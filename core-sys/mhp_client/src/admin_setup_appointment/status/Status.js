import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import swal from 'sweetalert';
import Swal from 'sweetalert2'
import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import MaterialTable from "material-table";
import Footer from "../../Component/Footer/Footer";

class Status extends Component {

    // pass data to table row
    state = {
        statuses: [],
        loading: true,
    }



    // get all data from api
    async componentDidMount() {
        const res = await axios.get('/status');
       // console.log("Status",res.data.statuses);
        if (res.data.status === 200) {
            this.setState({
                statuses: res.data.statuses,
                loading: false,
            });
        }

    }

    deleteStatus = async (e, id) => {

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
                axios.delete(`/delete-status/${id}`).then(res => {
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
            title: "Status Name", field: `status_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },

        {
            title: "Status Color ", field: `color`,render: (row) => 
                <div style={{backgroundColor:row.color,height:'22px',width:'22px',borderRadius:'50%'}}>

                 </div>

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },

        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-status/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteStatus(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    render() {

        var html_table = "";
        if (this.state.loading) {
            html_table = <tr>
                <td>Loading..</td>
            </tr>
        }
        console.log("status state",this.state.statuses)
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
                                    <h6>Status
                                        <Link to='/add-status' className="btn btn-primary btn-sm float-end"> Add Status </Link>
                                    </h6>
                                </div>
                                <div className="card-body">

                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.statuses}
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

export default Status;