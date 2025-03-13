import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import MaterialTable from 'material-table';
import Swal from "sweetalert2";

// import address from '../../Images/address.svg';


class DrugUnit extends Component {

    // pass data to table row
    state = {
        units: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {

        const res = await axios.get('/drug-unit');
        console.log(res);
        if (res.data.status === 200) {
            this.setState({
                units: res.data.units,
                loading: false,
            });
        }
    }



    deleteDrugUnit = async (e, id) => {

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
                axios.delete(`/delete-drug-unit/${id}`).then(res => {
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
            title: "Drug Unit", field: `drug_unit`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-drug-unit/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteDrugUnit(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];


    render() {
        var html_table = "";
        if (this.state.loading) {
            html_table = <tr>
                <td>Loading..</td>
            </tr>
        }
        else {
            html_table =
                this.state.units.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.drug_unit}</td>
                            {/* <td>{item.created_at}</td>
                            <td>{item.updated_at}</td> */}
                            <td>{item.action}
                                <Link to={`/edit-drug-unit/${item.id}`} class="btn action-btn btn-info btn-sm"><i class="fas fa-edit"></i></Link>&nbsp;
                                <button onClick={(e) => this.deleteDrugUnit(e, item.id)} className="btn action-btn btn-danger btn-sm"> <i class="fas fa-trash"></i> </button>
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
                        <div className="col-md-9 mt-2">
                            <div className='card'>
                                <div className="card-header">
                                    <h6 className="card-title">Drug Unit
                                        <Link to='/add-drug-unit' className="btn btn-primary btn-sm float-end"> Add Drug Unit</Link>
                                    </h6>
                                </div>
                                <div className="card-body">

                                    {/* <table id="categories" className="table dataTable no-footer dtr-inline">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Drug Unit</th>
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
                                        data={this.state.units}
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

export default DrugUnit;



