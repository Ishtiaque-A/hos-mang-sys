import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function EditExamHistSelectionParam(props) {

    var url = window.location.href;
    var urlsplit = url.split("/");
    var lastpart = urlsplit[urlsplit.length - 1];
    if (lastpart === '') {
        lastpart = urlsplit[urlsplit.length - 2];
    }
    let navigate = useNavigate();
    const [errorlist, setError] = useState([]);
    const [patientInput, setSelectionParam] = useState({

        selection_parameter_code: '',
        selection_parameter_name: '',
        // error_list: [],

    });

    const handleInput = (e) => {
        e.persist();
        setSelectionParam({ ...patientInput, [e.target.name]: e.target.value });
    }

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.get(`/edit-selection-parameter/${lastpart}`).then(res => {
            setSelectionParam(res.data.selection_parameter);
        });

    }, []);


    // const navigate = useNavigate();
    const updatePatient = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();

        formData.append('selection_parameter_code', patientInput.selection_parameter_code == null ? '' : patientInput.selection_parameter_code);
        formData.append('selection_parameter_name', patientInput.selection_parameter_name == null ? '' : patientInput.selection_parameter_name);

        axios.post(`/update-selection-parameter/${lastpart}`, formData).then(res => {

            if (res.data.status === 200) {

                // console.log(res.data.message);
                swal("Success", res.data.message, "success");

                // setSelectionParam({
                //     ...patientInput,
                //
                //     selection_parameter_code: '',
                //     selection_parameter_name: '',
                //
                // });
                setError([]);
                navigate("/selection-parameter");

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
                                <h6 className="card-title"> Edit Exam History Selection Parameter
                                    <Link to={'/selection-parameter'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updatePatient}>
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="selection_parameter_code" className="col-form-label-sm"> Examination Code </label>
                                                <input type="text" onChange={handleInput} value={patientInput.selection_parameter_code} className="form-control font-size-patient" name="selection_parameter_code" />
                                                <span className="text-danger">{errorlist.selection_parameter_code}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="selection_parameter_name" className="col-form-label-sm"> Examination Name </label>
                                                <input type="text" onChange={handleInput} value={patientInput.selection_parameter_name} className="form-control font-size-patient" name="selection_parameter_name" />
                                                <span className="text-danger">{errorlist.selection_parameter_name}</span>
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

export default EditExamHistSelectionParam;

