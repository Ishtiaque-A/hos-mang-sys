import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import MaterialTable from 'material-table';
import Swal from "sweetalert2";


class DoseName extends Component {

    // pass data to table row
    state = {
        dosesName: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {

        const res = await axios.get('/dose-name');
        // console.log(res.data.dosesName);
        if (res.data.status === 200) {
            this.setState({
                dosesName: res.data.dosesName,
                loading: false,
            });
        }
    }



    deleteDoseName = async (e, id) => {

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
                axios.delete(`/delete-dose-name/${id}`).then(res => {
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
            title: "Test Name", field: `dose_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-dose-name/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteDoseName(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];


    render() {
        var html_table = "";
        if (this.state.loading) {
            html_table = <tr>
                <td>Loading..</td>
            </tr>
        }

        return (
            <>
               
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <DoctorsSetupSidebar></DoctorsSetupSidebar>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className='card'>
                                <div className="card-header">
                                    <h6 className="card-title">Dose Name
                                        <Link to='/add-dose-name' className="btn btn-primary btn-sm float-end"> Add Dose Name</Link>
                                    </h6>
                                </div>
                                <div className="card-body">

                                     <MaterialTable
                                        columns={this.columns}
                                        data={this.state.dosesName}
                                        options={{
                                            search: true,
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

export default DoseName;



