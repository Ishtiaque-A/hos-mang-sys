import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DoctorsSetupSidebar from '../doctors_setup_sidebar/DoctorsSetupSidebar';
const AddGeneralNote = () => {
    const [generalNote,setGeneralNote] = useState("");

    const submitCanal = (e) => {
        e.preventDefault();
        const data = {
            name:generalNote
        }

        console.log('datacheck', data);
        axios.post(`/save-general-note`, data).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setGeneralNote('');
            }
        })
    }

    return (
        <div className="ms-2">
            <div className="row">
                <div className="col-md-3">
                    <DoctorsSetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Add General Note
                                <Link to={'/general-note-setup'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="EarCanalForm" onSubmit={submitCanal}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="form-group mt-2">
                                            <label htmlFor="history_name" className="col-form-label-sm"> General Note Name</label>
                                            <input type="text" value={generalNote} className="form-control form-control-sm" name="fee_name" onChange={(e)=>setGeneralNote(e.target.value)} />
                                            

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
    );
};

export default AddGeneralNote;