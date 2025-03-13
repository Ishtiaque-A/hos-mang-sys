import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import axios from "axios";
import MaterialTable from 'material-table';
import Swal from "sweetalert2";

class TobaccoCost extends Component {

    state = {
        tobacco_cost_amounts: [],
        loading: true,
    }


    async componentDidMount() {
        const res = await axios.get('/tobacco-cost');

        if (res.data.status === 200) {
            this.setState({
                tobacco_cost_amounts: res.data.tobacco_cost_amounts,
                loading: false,
            });
        }
    }

    deleteTobaccoType = async (e, id) => {
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
                axios.delete(`/delete-tobacco-cost/${id}`).then(res => {
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
            title: "Tobacco Cost Name", field: `tobacco_cost_amounts_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-tobacco-cost/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteTobaccoType(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    render() {

        var tobacco_cost_amounts_html_table = "";

        if (this.state.loading) {

            tobacco_cost_amounts_html_table = <tr>
                <td colSpan="/">Loading..</td>
            </tr>;

        } 
        // else {
        //     tobacco_cost_amounts_html_table =
        //         this.state.tobacco_cost_amounts.map((item) => {
        //             return (
        //                 <tr key={item.id}>
        //                     <td>{item.id}</td>
        //                     <td>{item.tobacco_cost_amounts_name}</td>
        //                     <td>{item.created_at}</td>
        //                     <td>{item.updated_at}</td>
        //                     <td>
        //                         <Link to={`/edit-tobacco-cost/${item.id}`} class="btn action-btn btn-info btn-sm"><i class="fas fa-edit"></i></Link>&nbsp;
        //                         <button onClick={(e) => this.deleteTobaccoType(e, item.id)} className="btn action-btn btn-danger btn-sm"> <i class="fas fa-trash"></i> </button>
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
                            <DoctorsSetupSidebar></DoctorsSetupSidebar>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className='card'>
                                <div className="card-header">
                                    <h6 className="card-title"> Tobacco Cost
                                        <Link to={'/add-tobacco-cost'} className="btn btn-primary btn-sm float-end"> Add Tobacco Cost </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    {/* <table id="categories" className="table dataTable no-footer dtr-inline">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tobacco Cost Name</th>
                                                <th>Created At</th>
                                                <th>Updated At</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {tobacco_cost_amounts_html_table}

                                        </tbody>

                                    </table> */}
                                     <MaterialTable
                                        columns={this.columns}
                                        data={this.state.tobacco_cost_amounts}
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

export default TobaccoCost;