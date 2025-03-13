import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import axios from "axios";
import MaterialTable from 'material-table';
import Swal from "sweetalert2";

class AdviceSuggestion extends Component {

    state = {
        advice_suggestions: [],
        loading: true,
    }


    async componentDidMount() {
        const res = await axios.get('/advice-suggestion');

        if (res.data.status === 200) {
            this.setState({
                advice_suggestions: res.data.advice_suggestions,
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
                axios.delete(`/delete-advice-suggestion/${id}`).then(res => {
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
            title: "Advice Suggestion Name", field: `advice_suggestions_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-advice-suggestion/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteTobaccoType(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    render() {

        var advice_suggestions_html_table = "";

        if (this.state.loading) {

            advice_suggestions_html_table = <tr>
                <td colSpan="/">Loading..</td>
            </tr>;

        } 


        return (
            <>
               
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <DoctorsSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className='card'>
                                <div className="card-header">
                                    <h6 className="card-title"> Advice Suggestion
                                        <Link to={'/add-advice-suggestion'} className="btn btn-primary btn-sm float-end"> Add Advice Suggestion </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                <MaterialTable
                                        columns={this.columns}
                                        data={this.state.advice_suggestions}
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

export default AdviceSuggestion;