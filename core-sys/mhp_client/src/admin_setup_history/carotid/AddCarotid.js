import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function AddCarotid() {

    const [carotidInput, setCarotid] = useState({
        carotid_name: '',
        selection_criteria:"",
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCarotid({ ...carotidInput, [e.target.name]: e.target.value })
    }

    const submitCarotid = (e) => {
        e.preventDefault();

        const data = {
            selection_criteria: carotidInput.selection_criteria,
            carotid_name: carotidInput.carotid_name,
        }

        axios.post(`/save-carotid`, data).then(res => {

            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setCarotid({
                    ...carotidInput,

                    selection_criteria: '',
                    carotid_name: '',
                    error_list: [],
                });

            } else if (res.data.status === 400) {
                setCarotid({ ...carotidInput, error_list: res.data.errors });
            }

        });
    }

    return (
        <>
           
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <HistorySetupSidebar></HistorySetupSidebar>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Add Carotid
                                    <Link to={'/carotid'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitCarotid} id="carotidForms">
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="carotid_name" className="col-form-label-sm">Carotid Name</label>
                                                <input type="text" onChange={handleInput} value={carotidInput.carotid_name} className="form-control" name="carotid_name" />
                                                <span className="text-danger">{carotidInput.error_list.carotid_name}</span>
                                            </div>
                                          
                                        <div className='form-group mt-3'>
                                                <label htmlFor="history_name" className="col-form-label-sm mt-1  "><b className='me-3'>Selection </b></label>
                                                <div class="form-check form-check-inline  ">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria"id="inlineRadio1" value="single"/>
                                                    <label className="form-check-label" for="inlineRadio1"> <span style={{marginLeft:"-28px"}}>Single </span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" id="inlineRadio2" value="multiple"/>
                                                    <label className="form-check-label" for="inlineRadio2"> <span style={{marginLeft:"-28px"}}>Multiple </span></label>
                                            </div>
                                        </div>
                                        
                                        <span className="text-danger">{carotidInput.error_list.selection_criteria}</span>

                                     <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Save
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

    )
}

export default AddCarotid;