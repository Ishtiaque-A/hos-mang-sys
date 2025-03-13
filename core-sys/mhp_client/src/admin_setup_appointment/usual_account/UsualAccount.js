import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import MaterialTable from "material-table";
import Footer from "../../Component/Footer/Footer";
import Swal from "sweetalert2";

class UsualAccount extends Component {

    // pass data to table row
    state = {
        usual_account: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {
        const res = await axios.get('/usual-account');
        // console.log(res.data.usual_account);
        if (res.data.status === 200) {
            this.setState({
                usual_account: res.data.usual_account,
                loading: false,
            });
        }

    }

    deleteusual_account = async (e, id) => {

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
                axios.delete(`/delete-usual-account/${id}`).then(res => {
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
            title: "Usual Account Name", field: `usual_account_name`

            , cellStyle: {
                width: 600,
                marginLeft: 50
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-usual-account/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => this.deleteusual_account(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    render() {

        var html_table = "";
        if (this.state.loading) {
            html_table = <tr>
                <td>Loading..</td>
            </tr>
        }
        // else {
        //     html_table =
        //         this.state.usual_account.map((item) => {
        //             return (
        //                 <tr key={item.id}>
        //                     <td>{item.id}</td>
        //                     <td>{item.usual_account_name}</td>
        //                     <td>{item.created_at}</td>
        //                     <td>{item.updated_at}</td>
        //                     <td>
        //                         <Link to={`/edit-usual-account/${item.id}`} class="btn action-btn btn-info btn-sm"><i class="fas fa-edit"></i></Link>&nbsp;
        //                         <button onClick={(e) => this.deleteusual_account(e, item.id)} className="btn action-btn btn-danger btn-sm"> <i class="fas fa-trash"></i> </button>
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
                            <AddDashboard />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6>Usual Account
                                        <Link to='/add-usual-account' className="btn btn-primary btn-sm float-end"> Add Usual Account </Link>
                                    </h6>
                                </div>
                                <div className="card-body">

                                    <MaterialTable
                                        columns={this.columns}
                                        data={this.state.usual_account}
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

export default UsualAccount;