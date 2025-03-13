import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import MaterialTable from 'material-table';
import Footer from '../../Component/Footer/Footer';
import Swal from "sweetalert2";

class All_visit extends Component {
    state = {
        visitors: [],
        loading: true,
    }

    // Data Show in API link
    async componentDidMount() {
        const res = await axios.get(`/all-visit`);
        console.log(res);
        if (res.data.status === 200) {
            this.setState({
                visitors: res.data.visitors,
                loading: false,
            });
        }
    }

    deleteVisit = async (e, id) => {

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
                axios.delete(`/delete-visitor/${id}`).then(res => {
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
            title: "Visit Type Name", field: `visit_type_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-visitor/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteVisit(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    render() {
        // Data Show in table
        var student_HTML_TABLE = "";
        if (this.state.loading) {
            student_HTML_TABLE = <tr><td colSpan="7"> Loading... </td></tr>;
        } 
        // else {
        //     student_HTML_TABLE =
        //         this.state.visitors.map((item) => {
        //             return (
        //                 <tr key={item.id}>
        //                     <td>{item.id}</td>
        //                     <td>{item.visit_type_name}</td>
        //                     {/* <td>{item.status}</td> */}
        //                     <td>
        //                         <Link to={`/edit-visitor/${item.id}`} class="btn action-btn btn-info btn-sm"><i class="fas fa-edit"></i></Link>&nbsp;
        //                         <button onClick={(e) => this.deleteVisit(e, item.id)} className="btn action-btn btn-danger btn-sm"> <i class="fas fa-trash"></i> </button>
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
                            <DoctorsSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">

                                    <h6 className="card-title">Visit Type
                                        <Link to='/add-visit' className="btn btn-primary btn-sm float-end"> Add Visit </Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    {/* <table className="table">
                                        <thead>
                                            <tr>
                                                <td>Id</td>
                                                <td>Visit Type Name</td>
                                                <td>Status</td>
                                                <td>Action</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {student_HTML_TABLE}
                                        </tbody>
                                    </table> */}
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.visitors}
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

export default All_visit;