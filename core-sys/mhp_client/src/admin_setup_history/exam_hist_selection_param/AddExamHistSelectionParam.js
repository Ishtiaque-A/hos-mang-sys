import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function AddExamHistSelectionParam() {
   

    const [errorlist, setError] = useState([]);
    const [selectionparameterInput, setPatient] = useState({

        selection_parameter_code: '',
        selection_parameter_name: '',
        // error_list: [],

    });

    const handleInput = (e) => {
        e.persist();
        setPatient({ ...selectionparameterInput, [e.target.name]: e.target.value });
    }

    const submitExamination = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('selection_parameter_code', selectionparameterInput.selection_parameter_code);
        formData.append('selection_parameter_name', selectionparameterInput.selection_parameter_name);

        axios.post(`/save-selection-parameter`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setPatient({
                    ...selectionparameterInput,
                    selection_parameter_code: '',
                    selection_parameter_name: '',
                    // error_list: [],
                });
                setError([]);
             
            } else {
                setError(res.data.errors);
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
                                <h6 className="card-title"> Add Exam History Selection Parameter
                                    <Link to={'/selection-parameter'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitExamination} id="selectionparameterForms">
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="selection_parameter_code" className="col-form-label-sm"> Selection Parameter Code </label>
                                                <input type="text" onChange={handleInput} value={selectionparameterInput.selection_parameter_code} className="form-control" name="selection_parameter_code" />
                                                <span className="text-danger">{errorlist.selection_parameter_code}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="selection_parameter_name" className="col-form-label-sm"> Selection Parameter Name </label>
                                                <input type="text" onChange={handleInput} value={selectionparameterInput.selection_parameter_name} className="form-control" name="selection_parameter_name" />
                                                <span className="text-danger">{errorlist.selection_parameter_name}</span>
                                            </div>
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

export default AddExamHistSelectionParam;

