import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import MaterialTable from 'material-table';
import Swal from "sweetalert2";

class OccupationalHazards extends Component {

    state = {
        occupational_hazards: [],
        loading: true,
    }


    async componentDidMount() {
        const res = await axios.get('/occupational-hazards');

        if (res.data.status === 200) {
            this.setState({
                occupational_hazards: res.data.occupational_hazards,
                loading: false,
            });
        }
    }

    deleteoccupational_hazards = async (e, id) => {
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
                axios.delete(`/delete-occupational-hazards/${id}`).then(res => {
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
            title: "Occupational Hazards Name", field: `occupational_hazards_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-occupational-hazards/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteoccupational_hazards(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    render() {

        var occupational_hazards_html_table = "";

        if (this.state.loading) {

            occupational_hazards_html_table = <tr>
                <td colSpan="/">Loading..</td>
            </tr>;

        } else {
            occupational_hazards_html_table =
                this.state.occupational_hazards.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.occupational_hazards_name}</td>
                            {/* <td>{item.created_at}</td>
                            <td>{item.updated_at}</td> */}
                            <td>
                                <Link to={`/edit-occupational-hazards/${item.id}`} class="btn action-btn btn-info btn-sm"><i class="fas fa-edit"></i></Link>&nbsp;
                                <button onClick={(e) => this.deleteoccupational_hazards(e, item.id)} className="btn action-btn btn-danger btn-sm"> <i class="fas fa-trash"></i> </button>
                            </td>
                        </tr>
                    );
                });
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
                                    <h6 className="card-title"> Occupational Hazards
                                        <Link to={'/add-occupational-hazards'} className="btn btn-primary btn-sm float-end"> Add occupational Hazards </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    {/* <table id="categories" className="table dataTable no-footer dtr-inline">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Religion Name</th>
                                                <th>Created At</th>
                                                <th>Updated At</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {occupational_hazards_html_table}

                                        </tbody>

                                    </table> */}
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.occupational_hazards}
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

export default OccupationalHazards;