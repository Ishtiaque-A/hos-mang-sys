import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function EditSelectionCriteria(props) {

    const [selection_criteriaInput, setSelectionCriteria] = useState([]);
    const [error, setError] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const selection_criteria_id = props.match.params.id;
        axios.get(`/edit-selection-criteria/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setSelectionCriteria(res.data.selection_criteria);
            } else if (res.data.status === 404) {

                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setSelectionCriteria({ ...selection_criteriaInput, [e.target.name]: e.target.value });
    }

    const updateSelectionCriteria = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = selection_criteriaInput;
        axios.post(`/update-selection-criteria/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setSelectionCriteria({
                    ...selection_criteriaInput,
                    // selection_criteria_name: '',

                });
                setError('');
                navigate("/selection-criteria");
            } else {
                setError(res.data.errors)
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
                                <h6 className="card-title">Edit Selection Criteria
                                    <Link to={'/selection-criteria'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateSelectionCriteria}>
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="selection_criteria_name" className="col-form-label-sm">Selection Criteria Name</label>
                                                <input type="text" onChange={handleInput} value={selection_criteriaInput.selection_criteria_name} className="form-control" name="selection_criteria_name" />
                                                <span className="text-danger">{error.selection_criteria_name}</span>
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

    )

}

export default EditSelectionCriteria;