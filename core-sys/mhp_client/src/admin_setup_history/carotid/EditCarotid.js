import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function EditCarotid(props) {

    const [carotidInput, setCarotid] = useState([]);
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
        axios.get(`/edit-carotid/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setCarotid(res.data.carotid);
            } else if (res.data.status === 404) {

                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setCarotid({ ...carotidInput, [e.target.name]: e.target.value });
    }

    const updateCarotid = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = carotidInput;
        axios.post(`/update-carotid/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setCarotid({
                    ...carotidInput,
                    // carotid_name: '',

                });
                setError('');
                navigate("/carotid");
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
                                <h6 className="card-title">Edit Carotid
                                    <Link to={'/carotid'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateCarotid}>
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="carotid_name" className="col-form-label-sm">Carotid Name</label>
                                                <input type="text" onChange={handleInput} value={carotidInput.carotid_name} className="form-control" name="carotid_name" />
                                                <span className="text-danger">{error.carotid_name}</span>
                                            </div>

                                            <div className='form-group mt-3'>
                                                <label htmlFor="history_name" className="col-form-label-sm mt-1  "><b className='me-3'>Selection </b></label>
                                                <div class="form-check form-check-inline  ">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria"id="inlineRadio1" value="single" checked={carotidInput.selection_criteria=='single'?true:''}/>
                                                    <label className="form-check-label" for="inlineRadio1"> <span style={{marginLeft:"-28px"}}>Single </span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" id="inlineRadio2" value="multiple" checked={carotidInput.selection_criteria=='multiple'?true:''}/>
                                                    <label className="form-check-label" for="inlineRadio2"> <span style={{marginLeft:"-28px"}}>Multiple </span></label>
                                            </div>
                                        </div>
                                        
                                        {/* <span className="text-danger">{carotidInput.error_list.selection_criteria}</span> */}

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

export default EditCarotid;