import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import AnatomySetUpSidebar from '../anatomy_setup_mainsidebar/AnatomySetupSidebar';

function EditSubBodyPart(props) {

    const [statuslist, setStatusList] = useState([]);
    const [SubBodyPart, setSubBodyPart] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-sub-body-part/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setSubBodyPart(res.data.SubBodyPart);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    useEffect(() => {

        axios.get(`/main-body-part`).then(res => {
            if (res.data.status === 200) {
                setStatusList(res.data.MainBodyPart);
            }
        })
    }, []);


    const handleInput = (e) => {
        e.persist();
        setSubBodyPart({ ...SubBodyPart, [e.target.name]: e.target.value });
    }

    const updateSubBodyPartInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = SubBodyPart;
        axios.post(`/update-sub-body-part/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setSubBodyPart({
                    ...SubBodyPart,

                });
                setError('')
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
                        <AnatomySetUpSidebar />
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Sub-body part
                                    <Link to={'/sub-body-part'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="SubBodyPartForm" onSubmit={updateSubBodyPartInput}>
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="SubBodyPart_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={SubBodyPart.SubBodyPart_name} className="form-control" name="SubBodyPart_name" onChange={handleInput} />
                                                <span className="text-danger">{error.SubBodyPart_name}</span>
                                            </div>
                                            <div>
                                                <label htmlFor="inputPassword4"
                                                    className="form-label  col-form-label col-form-label-sm">Main Body part</label>

                                                <select id="inputState" onChange={handleInput} value={SubBodyPart.MainBodyPart_id} name="MainBodyPart_id"
                                                    className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {
                                                        statuslist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.MainBodyPart_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
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

export default EditSubBodyPart;
