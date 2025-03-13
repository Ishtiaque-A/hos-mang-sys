import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import swal from "sweetalert";
import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import Footer from "../../Component/Footer/Footer";

class AddAppointmentLength extends Component {
  state = {
    appointment_lengths_name: "",
    error_list: [],
  };
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveappointment_lengths = async (e) => {
    e.preventDefault();

    const res = await axios.post("/save-appointment-lengths", this.state);

    if (res.data.status === 200) {
      swal("Success", res.data.message, "success");
      this.setState({
        appointment_lengths_name: "",
      });
    } else {
      this.setState({
        error_list: res.data.error_msg,
      });
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AddDashboard></AddDashboard>
            </div>
            <div className="col-md-9 mt-2">
              <div className="card">
                <div className="card-header">
                  <h6>
                    Add Appointment Lengths
                    <Link
                      to={"/appointment-length"}
                      className="btn btn-primary btn-sm float-end"
                    >
                      {" "}
                      Back{" "}
                    </Link>
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={this.saveappointment_lengths}>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="asset_color"
                          className="col-form-label-sm"
                        >
                          {" "}
                          Appointment Lengths
                        </label>
                        <input
                          type="text"
                          onChange={this.handleInput}
                          value={this.state.appointment_lengths_name}
                          className="form-control"
                          name="appointment_lengths_name"
                        />
                        <span className="text-danger">
                          {" "}
                          {this.state.error_list.appointment_lengths_name}{" "}
                        </span>
                      </div>
                      <div className="float-right">
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm text-uppercase float-end mt-2"
                        >
                          <i className="fas fa-save"></i> Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddAppointmentLength;
