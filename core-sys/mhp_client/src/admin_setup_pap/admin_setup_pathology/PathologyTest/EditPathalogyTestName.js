import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PathologySetupSidebar from '../PathologySetupSidebar';

const EditPathalogyTestName = () => {

    const [pathologyTest, setpathologyTest] = useState({

    });
    const [error, setError] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-pathalogy-test-name/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setpathologyTest(res.data.edit_pathalogy);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setpathologyTest({ ...pathologyTest, [e.target.name]: e.target.value });
    }

    const updatepathologyTestInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.post(`/update-patalogy-test-name/${lastpart}`, pathologyTest).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setpathologyTest({
                    ...pathologyTest,

                });
                navigate(`/pathalogy-test-name`);

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
                    <PathologySetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Edit Test Name
                                <Link to={'/add-laboratory-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="pathologyTestForm" onSubmit={updatepathologyTestInput}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm">Name</label>
                                            <input type="text" value={pathologyTest.test_name} className="form-control" name="test_name" onChange={handleInput} />
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

export default EditPathalogyTestName;