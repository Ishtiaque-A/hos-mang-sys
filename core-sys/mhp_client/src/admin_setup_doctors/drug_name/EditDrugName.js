
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import Footer from "../../Component/Footer/Footer";
import { Autocomplete, TextField } from "@mui/material";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

class EditDrugName extends Component {
    state = {
        id: '',
        src_primary_key: '',
        strength: '',
        macrohealth_sg: '',
        mims_sg: '',
        mims_type: '',
        guid: '',
        product_types: '',
        drug_name: '',
        qty: '',
        rpts: '',
        restriction: '',
        bpp: '',
        tgp: '',
        generic_id: '',
        drug_description: '',
        error_list: [],
        drugGeneric: [],
        generic_name: ''
    }


    handleInput = (e, id) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log("handleOnSearch", string, results);
    };

    handleOnHover = (result) => {
        // the item hovered
        console.log("handleOnHover", result);
    };

    handleOnSelect = (item) => {
        // the item selected
        console.log("handleOnSelect", item);
        this.setState({
            generic_id: item.id
        });
    };

    handleOnFocus = () => {
        console.log("Focused");
    };

    handleOnClear = () => {
        console.log("Cleared");
    };

    async componentDidMount() {

        axios.get('generic-name').then(res => {
            console.log("Generic", res.data.drugGeneric);
            this.setState({
                drugGeneric: res.data.drugGeneric
            })
        })

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        // const reaction_id = this.props.match.params.id;
        // console.log(reaction_id);
        const res = await axios.get(`/edit-drug-name/${lastpart}`);

        console.log("edit", res.data.drugs);
        if (res.data.status === 200) {
            console.log('check', res.data);
            this.setState({
                src_primary_key: res.data.drugs.src_primary_key,
                strength: res.data.drugs.strength,
                macrohealth_sg: res.data.drugs.macrohealth_sg,
                mims_sg: res.data.drugs.mims_sg,
                mims_type: res.data.drugs.mims_type,
                guid: res.data.drugs.guid,
                product_types: res.data.drugs.product_types,
                drug_name: res.data.drugs.drug_name,
                qty: res.data.drugs.qty,
                rpts: res.data.drugs.rpts,
                restriction: res.data.drugs.restriction,
                bpp: res.data.drugs.bpp,
                tgp: res.data.drugs.tgp,
                generic_id: res.data.drugs.generic_id,
                generic_name: res.data.drugs.generic_name.name,
                drug_description: res.data.drugs.drug_description,
            });
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/drug-name');
        }
    }

    //Update Edit Data
    updateDrugName = async (e, id) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        const res = await axios.put(`/update-drug-name/${lastpart}`, this.state);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res);
            this.setState({
                // drug_name: '',
                error_list: [],
            });
            //  this.props.history.push('/diagnosis');
        }
        else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/DrugName');
        } else {
            this.setState({
                error_list: res.data.validate_error,
            });
        }
    }



    render() {
        console.log("this.sta", this.state)
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
                                    <h6 className="card-title">Edit Drug Name
                                        <Link to={'/drug-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateDrugName}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Source Priamry key</label>
                                                    <input type="number" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.src_primary_key} name="src_primary_key" />
                                                    {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                                                </div>

                                                {/* <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Generic Name</label>
                                                    <select onChange={this.handleInput} value={this.state.generic_id} name="generic_id" className="form-select form-select-sm mb-1" aria-label=".form-select-sm example">
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
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Generic Name</label>
                                                    <ReactSearchAutocomplete
                                                        showIcon={false}
                                                        placeholder={this.state.generic_name}
                                                        items={this.state.drugGeneric}
                                                        resultStringKeyName="name"
                                                        onSearch={this.handleOnSearch}
                                                        onHover={this.handleOnHover}
                                                        onSelect={this.handleOnSelect}
                                                        onFocus={this.handleOnFocus}
                                                        onClear={this.handleOnClear}
                                                        fuseOptions={{ keys: ["name"] }} // Search in the description text as well
                                                        styling={{
                                                            borderRadius: "5px !important",
                                                            zIndex: 3
                                                        }}
                                                    />

                                                    {/* <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={this.state.drugGeneric}
                                                        size="small"
                                                        loadingText='loading...'
                                                        getOptionLabel={(option) => option.name}
                                                        onChange={(e, value) => {
                                                            if (value) {
                                                                this.setState({
                                                                    generic_id: value.id
                                                                });
                                                            }

                                                        }
                                                        }

                                                        renderInput={(params) => <TextField sx={{ width: "100%", height: 20 }} {...params} label={this.state.generic_name} />}
                                                    /> */}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Strength</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.strength} name="strength" />
                                                    {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Macro Health Sg Formulary</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.macrohealth_sg} name="macrohealth_sg" />
                                                    {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Mims Sg</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.mims_sg} name="mims_sg" />
                                                    {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Mims Type</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.mims_type} name="mims_type" />
                                                    {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Guid</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.guid} name="guid" />
                                                    {/* <span className="text-danger">{this.state.error_list.drug_name}</span> */}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Product Types</label>
                                                    <select onChange={this.handleInput} name="product_types" className="form-select form-select-sm mb-1" aria-label=".form-select-sm example" value={this.state.product_types}>
                                                        <option selected>Select</option>

                                                        <option value="mims">Mims</option>
                                                        <option value="non_mims">Non Mims</option>


                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Drug Name</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.drug_name} className="form-control form-control-sm" name="drug_name" />
                                                    <span className="text-danger">{this.state.error_list.drug_name}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Drug Description</label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.drug_description} name="drug_description" onChange={this.handleInput}></textarea>
                                                    <span className="text-danger">{this.state.error_list.drug_description}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Qty</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.qty} name="qty" />
                                                    <span className="text-danger">{this.state.error_list.qty}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Rpts</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.rpts} name="rpts" />
                                                    <span className="text-danger">{this.state.error_list.rpts}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">BPP/</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.bpp} name="bpp" />
                                                    <span className="text-danger">{this.state.error_list.bpp}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Tgp/Spc</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.tgp} name="tgp" />
                                                    <span className="text-danger">{this.state.error_list.tgp}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="drug_name" className="col-form-label-sm">Restriction</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.restriction} name="restriction" />
                                                    <span className="text-danger">{this.state.error_list.restriction}</span>
                                                </div>


                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
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
                </div>

            </>

        );
    }
}

export default EditDrugName;