import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import MaterialTable from "material-table";
import HistorySetupSidebar from "../history_setup_mainsidebar/HistorySetupSidebar";
import Swal from "sweetalert2";
class IntercostalSpace extends Component {

    // pass data to table row
    state = {
        intercostal_space: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {
        const res = await axios.get('/intercostal-space');
        console.log(res.data.intercostal_space);
        if (res.data.status === 200) {
            this.setState({
                intercostal_space: res.data.intercostal_space,
                loading: false,
            });
        }

    }
    columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,
            cellStyle: {
                maxWidth: 40
            },
        },

        {
            title: "Intercostal Space Name", field: `intercostal_space_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },
        // {
        //     title: "Selection Criteria Name", field: "", render: (row) => <div>{row.selection_criteria.selection_criteria_name}</div>
        //     , cellStyle: {
        //         width: 600,
        //         marginLeft: 50
        //     },
        // },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-intercostal-space/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteIntercostalSpace(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    deleteIntercostalSpace = async (e, id) => {

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
                axios.delete(`/delete-intercostal-space/${id}`).then(res => {
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
                            <HistorySetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="ms-3">Apex Beat Character
                                        <Link to={'/add-intercostal-space'} className="btn btn-primary btn-sm me-3 float-end"> Add Intercostal Space </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                   
                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.intercostal_space}
                                        options={{
                                            search: true,
                                            // filtering: filter,
                                            showTitle: false,
                                            searchFieldAlignment: "left",
                                            pageSize: 10,
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

export default IntercostalSpace;