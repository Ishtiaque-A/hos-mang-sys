import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import DoctorsSetupSidebar from "../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar";
import { Autocomplete, TextField } from "@mui/material";

class AddDrugName extends Component {
  // to catch the data from input fields

  // src_primary_key,strength,macrohealth_sg,mims_sg,mims_type,guid

  state = {
    src_primary_key: "",
    strength: "",
    drug_name: "",
    macrohealth_sg: "",
    mims_sg: "",
    mims_type: "",
    guid: "",
    qty: "",
    rpts: "",
    restriction: "",
    bpp: "",
    tgp: "",
    generic_id: "",
    drug_description: "",
    error_list: [],
    drugGeneric: [],
  };

  componentDidMount() {
    axios.get("generic-name").then((res) => {
      console.log("Generic Name Add Drgus", res.data.drugGeneric);
      this.setState({
        drugGeneric: res.data.drugGeneric,
      });
    });
  }

  // handle the input fields

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // pass data to laravel controller

  saveDrugName = async (e) => {
    e.preventDefault();

    console.log("state valu ehcek", this.state);

    const res = await axios.post("/add-drug-name", this.state);

    console.log(res, "add drug name");

    if (res.data.status === 200) {
      swal("Success", res.data.message, "success");

      // console.log(res.data.message);
      this.setState({
        // id: '',
        src_primary_key: "",
        strength: "",
        macrohealth_sg: "",
        mims_sg: "",
        mims_type: "",
        guid: "",
        drug_name: "",
        qty: "",
        rpts: "",
        restriction: "",
        bpp: "",
        tgp: "",
        generic_name: "",
        drug_description: "",
        error_list: [],
        // delete_status: '',
        // created_by: '',
        // updated_by: '',
      });
      const navigate = useNavigate();
      navigate("/drug-name");
    } else {
      this.setState({
        error_list: res.data.validate_error,
      });
    }
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <DoctorsSetupSidebar></DoctorsSetupSidebar>
            </div>
            <div className="col-md-9 mt-3">
              <div className="card">
                <div className="card-header">
                  <h6 className="card-title">
                    Add Drug Name
                    <Link
                      to={"/drug-name"}
                      className="btn btn-primary btn-sm float-end"
                    >
                      Back
                    </Link>
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={this.saveDrugName}>
                    <div className="card-body">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Source Priamry key
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.src_primary_key}
                            name="src_primary_key"
                          />
                          {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                        </div>

                        {/* <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Generic Name</label>
                                                    <select onChange={this.handleInput} name="generic_id" className="form-select form-select-sm mb-1" aria-label=".form-select-sm example">
                                                        <option selected>Select</option>
                                                        {
                                                            this.state.drugGeneric.length > 0 &&
                                                            this.state.drugGeneric.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.id}>{item.name}</option>

                                                                )
                                                            })
                                                        }

                                                    </select>
                                                </div> */}

                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Generic Name
                          </label>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={this.state.drugGeneric}
                            size="small"
                            loadingText="loading..."
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) => {
                              if (value) {
                                this.setState({
                                  generic_id: value.id,
                                });
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                sx={{ width: "100%", height: 20 }}
                                {...params}
                                label="Search"
                              />
                            )}
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Drug Description
                          </label>

                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            value={this.state.drug_description}
                            name="drug_description"
                            onChange={this.handleInput}
                          ></textarea>
                          <span className="text-danger">
                            {this.state.error_list.drug_description}
                          </span>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Strength
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.strength}
                            name="strength"
                          />
                          {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Macro Health Sg Formulary
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.macrohealth_sg}
                            name="macrohealth_sg"
                          />
                          {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Mims Sg
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.mims_sg}
                            name="mims_sg"
                          />
                          {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Mims Type
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.mims_type}
                            name="mims_type"
                          />
                          {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Guid
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.guid}
                            name="guid"
                          />
                          {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Product Types
                          </label>
                          <select
                            onChange={this.handleInput}
                            name="product_types"
                            className="form-select form-select-sm mb-1"
                            aria-label=".form-select-sm example"
                          >
                            <option selected>Select</option>

                            <option key="" value="mims">
                              Mims
                            </option>
                            <option key="" value="non_mims">
                              Non Mims
                            </option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Drug Name
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.drug_name}
                            name="drug_name"
                          />
                          <span className="text-danger">
                            {this.state.error_list.drug_name}
                          </span>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Qty
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.qty}
                            name="qty"
                          />

                          <span className="text-danger">
                            {this.state.error_list.qty}
                          </span>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Rpts
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.rpts}
                            name="rpts"
                          />
                          <span className="text-danger">
                            {this.state.error_list.rpts}
                          </span>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            BPP/
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.bpp}
                            name="bpp"
                          />
                          <span className="text-danger">
                            {this.state.error_list.bpp}
                          </span>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Tgp/Spc
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.tgp}
                            name="tgp"
                          />
                          <span className="text-danger">
                            {this.state.error_list.tgp}
                          </span>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="drug_name"
                            className="col-form-label-sm"
                          >
                            Restriction
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            onChange={this.handleInput}
                            value={this.state.restriction}
                            name="restriction"
                          />
                          <span className="text-danger">
                            {this.state.error_list.restriction}
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

export default AddDrugName;
