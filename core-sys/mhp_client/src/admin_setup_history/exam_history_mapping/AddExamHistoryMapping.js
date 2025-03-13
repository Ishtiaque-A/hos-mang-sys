import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function AddExamHistoryMapping() {

    const [examinationlist, setStatusList] = useState([]);
    const [historylist, setHistoryList] = useState([]);
    const [selectionparameterlist, setSelectionParameterList] = useState([]);
    const [selectioncriterialist, setSelectionCriteria] = useState([]);
    const [extensionlist, setExtension] = useState([]);
    const [examhistoryInput, setExamHistory] = useState({

        examination_name_id: '',
        history_name_id: '',
        selection_parameter_id: '',
        selection_criteria_id: '',
        // has_extension: '',
        extension_title: '',
        multiple_extension: '',
        single_selection: '',
        // multiple_selection: '',
        error_list: [],

    });

    useEffect(()=>{
        axios.get('/exam-history-dropdown').then(res=>{
            if (res.data.status === 200)
            {
                // console.log(res.data.selection_criteria);
                setExtension(res.data.extension);
                setSelectionCriteria(res.data.selection_criteria);
                setStatusList(res.data.examination);
                setHistoryList(res.data.history);
                setSelectionParameterList(res.data.selection_parameter)
            }
        })
    }, []);

    const handleInput = (e) => {
        e.persist();
        setExamHistory({ ...examhistoryInput, [e.target.name]: e.target.value })
    }

    const submitExamHistory = (e) => {
        e.preventDefault();
        const data = {
            examination_name_id: examhistoryInput.examination_name_id,
            history_name_id: examhistoryInput.history_name_id,
            selection_parameter_id: examhistoryInput.selection_parameter_id,
            selection_criteria_id: examhistoryInput.selection_criteria_id,
            extension_title: examhistoryInput.extension_title,
            multiple_extension: examhistoryInput.multiple_extension,
            single_selection: examhistoryInput.single_selection,
        }

        axios.post(`/save-exam-history-mapping`, data).then(res => {

            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setExamHistory({
                    ...examhistoryInput,
                    examination_name_id: '',
                    history_name_id: '',
                    selection_parameter_id: '',
                    selection_criteria_id: '',
                    // has_extension: '',
                    extension_title: '',
                    multiple_extension: '',
                    single_selection: '',
                    // multiple_selection: '',
                    error_list: [],
                });

            } else if (res.data.status === 400) {
                setExamHistory({ ...examhistoryInput, error_list: res.data.errors });
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
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Add Exam History Mapping
                                    <Link to={'/exam-history-mapping'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitExamHistory} id="historyForms">
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div>
                                                <label htmlFor="inputPassword4"
                                                       className="form-label  col-form-label col-form-label-sm"> Examination </label>
                                                <select name="examination_name_id" type="text" onChange={handleInput} value={examhistoryInput.examination_name_id} id="inputState"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>

                                                    {
                                                        examinationlist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.examination_code} - {item.examination_name}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="inputPassword4"
                                                       className="form-label  col-form-label col-form-label-sm"> History </label>
                                                <select name="history_name_id" type="text" onChange={handleInput} value={examhistoryInput.history_name_id} id="inputState"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>

                                                    {
                                                        historylist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.history_code} - {item.history_name}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="inputPassword4"
                                                       className="form-label  col-form-label col-form-label-sm"> Selection Parameter </label>
                                                <select name="selection_parameter_id" type="text" onChange={handleInput} value={examhistoryInput.selection_parameter_id} id="inputState"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>

                                                    {
                                                        selectionparameterlist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.selection_parameter_code} - {item.selection_parameter_name}</option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="inputPassword4"
                                                       className="form-label  col-form-label col-form-label-sm"> Selection Criteria </label>
                                                <select name="selection_criteria_id" type="text" onChange={handleInput} value={examhistoryInput.selection_criteria_id} id="inputState"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>

                                                    {
                                                        selectioncriterialist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}> {item.selection_criteria_name} </option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>

                                            {/*<div className="form-group">*/}
                                            {/*    <label htmlFor="history_name" className="col-form-label-sm"> Has Extension </label><br/>*/}
                                            {/*    <div className="form-check">*/}
                                            {/*    <input*/}
                                            {/*        className="form-check-input"*/}
                                            {/*        type="checkbox"*/}
                                            {/*        value=""*/}
                                            {/*        id="flexCheckChecked"*/}
                                            {/*    />*/}
                                            {/*    <label className="form-check-label mt-2" htmlFor="flexCheckChecked">Yes*/}
                                            {/*    </label>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            <div className="form-group">
                                                <label htmlFor="extension_title" className="col-form-label-sm"> Extension Title </label>
                                                <input type="text" onChange={handleInput} value={examhistoryInput.extension_title} className="form-control" name="extension_title" />
                                                <span className="text-danger">{examhistoryInput.error_list.extension_title}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="multiple_extension"> Select Extension </label>
                                                <select name="multiple_extension" type="text" onChange={handleInput} value={examhistoryInput.multiple_extension} id="inputState"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>

                                                    {
                                                        extensionlist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}> {item.extension_name} </option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                                <span className="text-danger">{examhistoryInput.error_list.multiple_extension}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="single_selection" className="col-form-label-sm"> Extension Selection </label>
                                                <select name="single_selection" type="text" onChange={handleInput} value={examhistoryInput.single_selection} id="inputState"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>

                                                    {
                                                        selectioncriterialist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}> {item.selection_criteria_name} </option>
                                                            )
                                                        })
                                                    }

                                                </select>
                                                <span className="text-danger">{examhistoryInput.error_list.single_selection}</span>
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

export default AddExamHistoryMapping;