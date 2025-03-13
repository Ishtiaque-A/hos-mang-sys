import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import LabSetupSidebar from './LabSetupSidebar';

const EditLabTestName = () => {

    const [labTestNameEdit, setLabTestNameEdit] = useState({
        test_name: "",
        test_type_id: "",
     
    });

    const [testNameList, setTestNameList] = useState([]);

    const [error, setError] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.get(`/edit-lab-test-name/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setLabTestNameEdit(res.data.testName);
            } else if (res.data.status === 404) {
                setError(res.data.errors);
            }

        });

    }, []);


    const handleInput = (e) => {
        setLabTestNameEdit({ ...labTestNameEdit, [e.target.name]: e.target.value });
    }

    const updateLabTestNameInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.post(`/update-lab-test-name/${lastpart}`, labTestNameEdit).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setLabTestNameEdit({
                    ...labTestNameEdit,

                });
                navigate(`/lab_test_name`);

            } else {
                setError(res.data.errors)
            }
        });
    }

    useEffect(() => {
        axios.get(`/lab-test-name`)
            .then(res => {
                if (res.data.status === 200) {
                    setTestNameList(res.data.testName);
                }
            })
    }, []);


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <LabSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Edit Lab Test Name
                                    <Link to={'/lab_test_name'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="pathologyLabratoryForm" onSubmit={updateLabTestNameInput}>
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div>
                                                <label htmlFor="inputPassword4" className="form-label  col-form-label col-form-label-sm">Test Type Id</label>

                                                <select id="inputState" value={testNameList.test_type_id} name="test_type_id" className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {
                                                        testNameList.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.id}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className="text-danger">{error.test_type_id}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm">Name</label>
                                                <input type="text" value={labTestNameEdit.test_name} className="form-control" name="test_name" onChange={handleInput} />
                                                <span className="text-danger">{error.test_name}</span>
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
    );
};

export default EditLabTestName;
