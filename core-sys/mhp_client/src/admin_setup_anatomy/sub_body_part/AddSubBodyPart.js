import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import AnatomySetUpSidebar from '../anatomy_setup_mainsidebar/AnatomySetupSidebar';

function AddSubBodyPart() {


    const [statuslist, setStatusList] = useState([]);
    const [SubBodyPart, setSubBodyPart] = useState({
        SubBodyPart_name: "",
        MainBodyPart_id: "",
        error_list: [],
    });

    useEffect(() => {
        axios.get(`/main-body-part`).then(res => {
            if (res.data.status === 200) {
                setStatusList(res.data.MainBodyPart);
            }
        })
    },
        []);

    const handleInput = (e) => {
        setSubBodyPart({
            ...SubBodyPart, [e.target.name]: e.target.value
        });
    }

    const submitSubBodyPart = (e) => {
        e.preventDefault();
        axios.post(`/save-sub-body-part`, SubBodyPart).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setSubBodyPart({
                    SubBodyPart_name: "",
                    MainBodyPart_id: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                setSubBodyPart({ ...SubBodyPart, error_list: res.data.errors });
            }
        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <AnatomySetUpSidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title">Add Sub-body part
                                        <Link to={'/sub-body-part'} className="btn btn-primary btn-sm float-end">Back</Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="SubBodyPartForm" onSubmit={submitSubBodyPart}>
                                        <div className="card-body">
                                            <div className="col-md-12">

                                                <div>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-labe col-form-label col-form-label-sm">Main Body Part Name</label>
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
                                                    <span className="text-danger">{SubBodyPart.error_list.MainBodyPart_id}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="SubBodyPart_name" className="col-form-label-sm">Name</label>
                                                    <input type="text" value={SubBodyPart.SubBodyPart_name} className="form-control" name="SubBodyPart_name" onChange={handleInput} />
                                                    <span className="text-danger">{SubBodyPart.error_list.SubBodyPart_name}</span>
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
        </div>
    )
}

export default AddSubBodyPart;
