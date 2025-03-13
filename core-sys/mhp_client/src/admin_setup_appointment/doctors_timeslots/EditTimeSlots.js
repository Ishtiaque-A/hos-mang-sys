import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";

class EditUsualProvider extends Component {
    state = {
        usual_provider_name: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount() {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        // const usual_provider_id = this.props.match.params.id;
        // console.log(usual_provider_id);
        const res = await axios.get(`/edit-usual-provider/${lastpart}`);

        if (res.data.status === 200) {
            this.setState({
                usual_provider_name: res.data.usual_provider.usual_provider_name,
            });
        }
    }

    updateusual_provider = async (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        const res = await axios.put(`/update-usual-provider/${lastpart}`, this.state);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res);
            this.setState({
                usual_provider_name: '',
            });
            //  this.props.history.push('/usual_provider');
        }
    }

    render() {
        return (
            <>
                <Sidebar1></Sidebar1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mt-2">
                            <div className="card-header">
                                <h6 className="card-title"> Usual Provider</h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateusual_provider}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="usual_provider_name" className="col-form-label-sm">Usual Provider Name</label>
                                                <input type="text" onChange={this.handleInput} value={this.state.usual_provider_name} className="form-control" name="usual_provider_name" />
                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-primary text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Update
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default EditUsualProvider;