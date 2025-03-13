import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function EditVolume(props) {

    const [statuslist, setStatusList] = useState([]);
    const [volume, setvolume] = useState([]);
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
        axios.get(`/edit-volume/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                // console.log(res.data.volume)
                setvolume(res.data.volume);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    useEffect(() => {

        axios.get(`/volume-status`).then(res => {

            if (res.data.status === 200) {

                setStatusList(res.data.status_list);
            }
        })


    }, []);


    const handleInput = (e) => {
        e.persist();
        setvolume({ ...volume, [e.target.name]: e.target.value });
    }

    const updatevolume = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = volume;
        axios.post(`/update-volume/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setvolume({
                    ...volume,

                });
                setError('');
                navigate("/volume");
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
                                <h6 className="card-title"> Edit Volume
                                    <Link to={'/volume'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="volumeForm" onSubmit={updatevolume}>
                                    <div className="card-body">

                                        <div className="col-md-12">


                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={volume.volume_name} className="form-control" name="volume_name" onChange={handleInput} />
                                                <span className="text-danger">{error.volume_name}</span>

                                            </div>


                                            <div>
                                                <label htmlFor="inputPassword4"
                                                    className="form-label  col-form-label col-form-label-sm">Status</label>

                                                <select id="inputState" onChange={handleInput} value={volume.status_id} name="volume_status"
                                                    className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {
                                                        statuslist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.history_exam_status_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>



                                            <div className='form-group mt-3'>
                                                <label htmlFor="history_name" className="col-form-label-sm mt-1"><b className='me-3'>Selection </b> </label>

                                                <div class="form-check form-check-inline ">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} value="single" checked={volume.selection_criteria == 'single' ? true : ''} name="selection_criteria" id="inlineRadio1" />
                                                    <label className="form-check-label" for="inlineRadio1"> <span style={{ marginLeft: "-28px" }}>Single </span></label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" value="multiple" checked={volume.selection_criteria == 'multiple' ? true : ''} id="inlineRadio2" />
                                                    <label className="form-check-label" for="inlineRadio2"> <span style={{ marginLeft: "-28px" }}>Multiple </span></label>
                                                </div>
                                                <span className="text-danger"></span>
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

export default EditVolume
