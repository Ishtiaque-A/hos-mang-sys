import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";

class TimeSlots extends Component {

    // pass data to table row
    state = {
        usual_provider: [],
        loading: true,
    }


    // get all data from api
    async componentDidMount() {
        const res = await axios.get('/usual-provider');
        // console.log(res.data.usual_provider);
        if (res.data.status === 200) {
            this.setState({
                usual_provider: res.data.usual_provider,
                loading: false,
            });
        }

    }

    deleteusual_provider = async (e, id) => {

        const deleteusual_providerLoad = e.currentTarget;
        deleteusual_providerLoad.innerText = "Deleting";

        const res = await axios.delete(`/delete-usual-provider/${id}`);

        if (res.data.status === 200) {

            // deleteusual_providerLoad.closest('tr').remove();
            deleteusual_providerLoad.closest("tr").remove();
            swal("Success", res.data.message, "success");
            console.log(res.data.message);
        }

    }

    render() {

        var html_table = "";
        if (this.state.loading) {
            html_table = <tr>
                <td>Loading..</td>
            </tr>
        }
        else {
            html_table =
                this.state.usual_provider.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.usual_provider_name}</td>
                            {/* <td>{item.created_at}</td>
                            <td>{item.updated_at}</td> */}
                            <td>
                                <Link to={`/edit-usual-provider/${item.id}`} class="btn action-btn btn-info btn-sm"><i class="fas fa-edit"></i></Link>&nbsp;
                                <button onClick={(e) => this.deleteusual_provider(e, item.id)} className="btn action-btn btn-danger btn-sm"> <i class="fas fa-trash"></i> </button>
                            </td>
                        </tr>
                    );
                });
        }

        return (
            <>
                <Sidebar1></Sidebar1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <AddDashboard />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-usual_provider">Time Slots
                                        <Link to='/add-timeslots' className="btn btn-primary btn-sm float-end"> Add Time Slots </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <table id="categories" className="table dataTable no-footer dtr-inline">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Time Slots</th>
                                                {/* <th>Created At</th>
                                            <th>Updated At</th> */}
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {html_table}

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default TimeSlots;