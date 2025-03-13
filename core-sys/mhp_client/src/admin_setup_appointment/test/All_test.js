import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import MaterialTable from 'material-table';
import Swal from "sweetalert2";

class All_test extends Component {
    state = {
        tests: []
    }

    // Data Show in API link
    async componentDidMount() {
        const res = await axios.get(`/all-test`);
        console.log(res);
        if (res.data.status === 200) {
            this.setState({
                tests: res.data.tests
            });
        }
    }

    deleteTest = async (e, id) => {

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
                axios.delete(`/delete-test/${id}`).then(res => {
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
            title: "Test Name", field: `test_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-test/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteTest(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    render() {
        // var student_HTML_TABLE = "";
        // student_HTML_TABLE =
        //     this.state.tests.map((item) => {
        //         return (
        //             <tr key={item.id}>
        //                 <td>{item.id}</td>
        //                 <td>{item.test_name}</td>
        //                 {/* <td>{item.status}</td> */}
        //                 <td>
        //                     <Link to={`/edit-test/${item.id}`} class="btn action-btn btn-info btn-sm"><i class="fas fa-edit"></i></Link>&nbsp;
        //                     <button onClick={(e) => this.deleteTest(e, item.id)} className="btn action-btn btn-danger btn-sm"> <i class="fas fa-trash"></i> </button>
        //                 </td>
        //             </tr>
        //         );
        //     });

        return (
            <>
                
                <div className="ms-2">
                    <div className="row">
                        <div className="col-md-3">
                            <DoctorsSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="custom-card card">
                                <div className="card-header">
                                    <h6> Test Type
                                        <Link to='/add-test' className="btn btn-primary btn-sm float-end"> Add Test </Link>
                                    </h6>
                                </div>
                                <div className="card-body pt-3">
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.tests}
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

export default All_test;