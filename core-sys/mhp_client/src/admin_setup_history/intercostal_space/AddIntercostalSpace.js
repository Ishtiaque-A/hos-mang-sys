import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import HistorySetupSidebar from "../history_setup_mainsidebar/HistorySetupSidebar";

function AddIntercostalSpace() {

    const [intercostal_spaceInput, setIntercostalSpace] = useState({
        intercostal_space_name: '',
        selection_criteria: '',
        error_list: [],
    });
    const [selection_criterialist, setSelectionCriterialist] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setIntercostalSpace({ ...intercostal_spaceInput, [e.target.name]: e.target.value })
    }

  

    const submitIntercostalSpace = (e) => {
        e.preventDefault();

        const data = {
            intercostal_space_name: intercostal_spaceInput.intercostal_space_name,
            selection_criteria: intercostal_spaceInput.selection_criteria,
        }

        axios.post(`/save-intercostal-space`, data).then(res => {
            // console.log(res.data.selection_criteria);
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setIntercostalSpace({
                    ...intercostal_spaceInput,

                    intercostal_space_name: '',
                    selection_criteria: '',
                    error_list: [],

                });

            } else if (res.data.status === 400) {
                setIntercostalSpace({ ...intercostal_spaceInput, error_list: res.data.errors });
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
                                <h6 className="card-title">Add Intercostal Space
                                    <Link to={'/intercostal-space'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitIntercostalSpace} id="intercostal_spaceForms">
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="intercostal_space_name" className="col-form-label-sm">Intercostal Space Name</label>
                                                <input type="text" onChange={handleInput} value={intercostal_spaceInput.intercostal_space_name} className="form-control font-size-patient" name="intercostal_space_name" />
                                                <span className="text-danger">{intercostal_spaceInput.error_list.intercostal_space_name}</span>
                                            </div>

                                            <div className='form-group mt-3'>
                                                <label htmlFor="history_name" className="col-form-label-sm mt-1  "><b className='me-3'>Selection </b></label>
                                                <div class="form-check form-check-inline  ">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria"id="inlineRadio1" value="single" />
                                                    <label className="form-check-label" for="inlineRadio1"> <span style={{marginLeft:"-28px"}}>Single </span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" id="inlineRadio2" value="multiple" />
                                                    <label className="form-check-label" for="inlineRadio2"> <span style={{marginLeft:"-28px"}}>Multiple </span></label>
                                            </div>
                                        </div>
                                        <span className="text-danger">{intercostal_spaceInput.error_list.selection_criteria}</span>


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


export default AddIntercostalSpace;