import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function EditExamHistoryExtension() {

    const [specialistInput, setSpecialist] = useState([]);
    const [exam_name_list, setExamName] = useState([]);
    const [history_name_list, setHistoryName] = useState([]);
    const [error, setError] = useState([]);
 let navigate = useNavigate()
    useEffect(() => {

        axios.get('/examhistext-dropdown').then(res=>{
            if (res.data.status === 200)
            {
                setExamName(res.data.exam_name);
                setHistoryName(res.data.history_name);
            }
        })

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const specialist_id = props.match.params.id;
        axios.get(`/edit-history-extension/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setSpecialist(res.data.history_extension);
            } else if (res.data.status === 404) {

                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setSpecialist({ ...specialistInput, [e.target.name]: e.target.value });
    }

    const updateExamHistory = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = specialistInput;
        axios.post(`/update-history-extension/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setSpecialist({
                    ...specialistInput,
                });
                setError('');
                navigate("/history-extension");
            } else {
                // console.log(res.data.errors);
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
                                <h6 className="card-title"> Edit Exam History Extension
                                    <Link to={'/history-extension'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateExamHistory} id="examinationForms">
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="inputPassword4"
                                                       className="form-label  col-form-label col-form-label-sm"> Exam History Extension Name </label>
                                                <select name="examination_name_id" type="text" onChange={handleInput} value={specialistInput.examination_name_id} id="examination_name_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {
                                                        exam_name_list.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.examination_code} - {item.examination_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                               
                                            </div>
                                            <span className="text-danger">{error.examination_name_id}</span>
                                            <div className="form-group">
                                                <label htmlFor="inputPassword4"
                                                       className="form-label  col-form-label col-form-label-sm"> History Name </label>
                                                <select name="history_name_id" type="text" onChange={handleInput} value={specialistInput.history_name_id} id="history_name_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>

                                                    {
                                                        history_name_list.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.history_code} - {item.history_name}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                               
                                            </div>
                                            <span className="text-danger">{error.history_name_id}</span>

                                            <div className="form-group">
                                                <label htmlFor="extension_code" className="col-form-label-sm"> Extension Code </label>
                                                <input type="text" onChange={handleInput} value={specialistInput.extension_code} className="form-control" name="extension_code" />
                                                <span className="text-danger">{error.extension_code}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="extension_name" className="col-form-label-sm"> Extension Name </label>
                                                <input type="text" onChange={handleInput} value={specialistInput.extension_name} className="form-control" name="extension_name" />
                                                <span className="text-danger">{error.extension_name}</span>
                                            </div>

                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
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

export default EditExamHistoryExtension;