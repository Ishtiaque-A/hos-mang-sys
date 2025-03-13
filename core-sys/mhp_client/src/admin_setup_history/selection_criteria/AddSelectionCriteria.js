import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function AddSelectionCriteria() {

    const [selection_criteriaInput, setSelectionCriteria] = useState({
        selection_criteria_name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setSelectionCriteria({ ...selection_criteriaInput, [e.target.name]: e.target.value })
    }

    const submitSelectionCriteria = (e) => {
        e.preventDefault();

        const data = {
            selection_criteria_name: selection_criteriaInput.selection_criteria_name,
        }

        axios.post(`/save-selection-criteria`, data).then(res => {

            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setSelectionCriteria({
                    ...selection_criteriaInput,
                    selection_criteria_name: '',
                    error_list: [],
                });

            } else if (res.data.status === 400) {
                setSelectionCriteria({ ...selection_criteriaInput, error_list: res.data.errors });
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
                                <h6 className="card-title"> Add Selection Criteria
                                    <Link to={'/selection-criteria'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitSelectionCriteria} id="selection_criteriaForms">
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="selection_criteria_name" className="col-form-label-sm">Selection Criteria Name</label>
                                                <input type="text" onChange={handleInput} value={selection_criteriaInput.selection_criteria_name} className="form-control" name="selection_criteria_name" />
                                                <span className="text-danger">{selection_criteriaInput.error_list.selection_criteria_name}</span>
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

export default AddSelectionCriteria;