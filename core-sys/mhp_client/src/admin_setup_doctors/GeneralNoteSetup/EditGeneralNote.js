import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import DoctorsSetupSidebar from '../doctors_setup_sidebar/DoctorsSetupSidebar';
const EditGeneralNote = () => {
    const [generalNote, setGeneralNote] = useState({
        name: ""
    });

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-general-note/${params.id}`).then(res => {

            if (res.data.status === 200) {
                setGeneralNote(res.data.note[0]);
            }

        });

    }, [params.id]);

    const updateNote = (e) => {
        e.preventDefault();
        const data = generalNote;
        axios.post(`/update-general-note/${params.id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                navigate('/general-note-setup')
            }
        });

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <DoctorsSetupSidebar />
                </div>
                <div className="col-md-9 mt-3">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Edit General Note
                                <Link to={'/general-note-setup'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="EarCanalForm" onSubmit={updateNote}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="form-group mt-2">
                                            <label htmlFor="history_name" className="col-form-label-sm"> General Note Name</label>
                                            <input type="text" value={generalNote.name} className="form-control form-control-sm" name="fee_name" onChange={(e) => setGeneralNote({ name: e.target.value })} />

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

export default EditGeneralNote;