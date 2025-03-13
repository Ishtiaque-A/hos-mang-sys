import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import HistorySetupSidebar from "../history_setup_mainsidebar/HistorySetupSidebar";


function EditApexBeat(props) {

    const [apex_beatInput, setApexBeat] = useState([]);
    const [error, setError] = useState([]);
    let navigate = useNavigate();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const apex_beat_id = props.match.params.id;
       
    
        useEffect(() => {
            axios.get(`/edit-apex-beat/${lastpart}`).then(res => {

                if (res.data.status === 200) {
                    console.log(res.data);
                    setApexBeat(res.data.apex_beat);
                } else if (res.data.status === 404) {
    
                    setError(res.data.errors);
    
                }
            })
        },[]);
   


    const handleInput = (e) => {
        e.persist();
        setApexBeat({ ...apex_beatInput, [e.target.name]: e.target.value });
    }

    const updateApexBeat = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        const data = apex_beatInput;
        axios.post(`/update-apex-beat/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.status);
                swal("Success", res.data.message, "success");
                setApexBeat({
                    ...apex_beatInput,
                });
                setError('');
                navigate("/apex-beat");
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
                                <h6 className="card-title">Edit Apex Beat
                                    <Link to={'/apex-beat'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateApexBeat}>
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="apex_beat_name" className="col-form-label-sm"> Apex Beat Name </label>
                                                <input type="text" onChange={handleInput} value={apex_beatInput.apex_beat_name} className="form-control font-size-patient" name="apex_beat_name" />
                                                <span className="text-danger">{error.apex_beat_name}</span>
                                            </div>
                                            <div>


                                            <div className='form-group mt-3'>
                                                <label htmlFor="history_name" className="col-form-label-sm mt-1  "><b className='me-3'>Selection </b></label>
                                                <div class="form-check form-check-inline  ">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria"id="inlineRadio1" value="single" checked={apex_beatInput.selection_criteria=='single'?true:''}/>
                                                    <label className="form-check-label" for="inlineRadio1"> <span style={{marginLeft:"-28px"}}>Single </span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" id="inlineRadio2" value="multiple" checked={apex_beatInput.selection_criteria=='multiple'?true:''}/>
                                                    <label className="form-check-label" for="inlineRadio2"> <span style={{marginLeft:"-28px"}}>Multiple </span></label>
                                            </div>
                                        </div>

                                            <div className="float-right">
                                                <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Update
                                                </button>
                                            </div>

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

export default EditApexBeat;