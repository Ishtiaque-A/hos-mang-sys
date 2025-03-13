import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function AddVocalResonance() {


    const [statuslist, setStatusList] = useState([]);
    const [vocalresonance, setvocalresonance] = useState({
        vocalresonance_name: "",
        status_id: "",
        selection_criteria: "",
        image:"",
        error_list: [],
    });
    const [picture, setPicture] = useState({
        image: "",
    });
    const [image_error, setimage_error] = useState();
    const [imageUrl, setimageUrl] = useState();
    const handleImage = (e) => {
        e.persist();

        console.log(e.target.files[0])
        if (e.target.files[0].size < 2000048) {
            setPicture({ image: e.target.files[0] })
            setimage_error(null)
        } else {
            setimage_error("File size must be less than 2 mb !")
        }
        if (e.target.files && e.target.files[0] && e.target.files[0].size < 2000048) {
            setimageUrl(URL.createObjectURL(e.target.files[0]))
        } else {
            setimage_error("File size must be less than 2 mb !")
        }
    }

    const closeImage = () => {
        setimageUrl()
        document.getElementById('PatientImageUrl').value = '';
    }



    useEffect(() => {
        axios.get(`/examination-status-dropdown`).then(res => {
            if (res.data.status === 200) {
                setStatusList(res.data.status_list);
            }
        })
    },
        []);

    const handleInput = (e) => {
        setvocalresonance({
            ...vocalresonance, [e.target.name]: e.target.value
        });
    }
    const formData = new FormData();

    formData.append('image', picture.image);
    formData.append('vocalresonance_name', vocalresonance.vocalresonance_name);
    formData.append('status_id', vocalresonance.status_id);
    formData.append('selection_criteria', vocalresonance.selection_criteria);
    // console.log(formData);
    const submitCanal = (e) => {
        e.preventDefault();

        axios.post(`/save-vocal-resonance`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setvocalresonance({
                    vocalresonance_name: "",
                    status_id: "",
                    selection_criteria: "",
                    image: "",
                    error_list: [],

                });
                setimageUrl(null);
                document.getElementById('PatientImageUrl').value = '';

            }
            else if (res.data.status == 400) {
                setvocalresonance({ ...vocalresonance, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <MreSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Vocal Resonance
                                        <Link to={'/vocal-resonance'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="EarCanalForm" onSubmit={submitCanal}>
                                        <div className="card-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={vocalresonance.vocalresonance_name} className="form-control" name="vocalresonance_name" onChange={handleInput} />
                                                    <span className="text-danger">{vocalresonance.error_list.vocalresonance_name}</span>

                                                </div>
                                                <div>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Status</label>

                                                    <select id="inputState" onChange={handleInput} value={vocalresonance.status_id} name="status_id"
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
                                                    <span className="text-danger">{vocalresonance.error_list.status_id}</span>

                                                </div>


                                                <div className='form-group mt-3'>
                                                    <label htmlFor="history_name" className="col-form-label-sm mt-1  "><b className='me-3'>Selection </b></label>
                                                    <div class="form-check form-check-inline  ">
                                                        <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" id="inlineRadio1" value="single" />
                                                        <label className="form-check-label" for="inlineRadio1"> <span style={{ marginLeft: "-28px" }}>Single </span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" id="inlineRadio2" value="multiple" />
                                                        <label className="form-check-label" for="inlineRadio2"> <span style={{ marginLeft: "-28px" }}>Multiple </span></label>
                                                    </div>
                                                </div>
                                                <span className="text-danger">{vocalresonance.error_list.selection_criteria}</span>



                                                <div className="form-group mt-3">
                                                    <label htmlFor="inputEmail4"
                                                        className="form-label col-form-label col-form-label-sm"> Vocal Resonance Image </label>
                                                    <input type="file" name="image" id="PatientImageUrl" className="form-control form-control-sm" onChange={handleImage}
                                                    />

                                                    {
                                                        image_error == null ? <p className="doc_image_size">Image size must be less than 2 mb</p> : <p className="docimage_error">{image_error}</p>
                                                    }

                                                    {imageUrl == null ? '' :
                                                        <div className="docImage">
                                                            <img src={imageUrl} className="doctorImageUrlPreview" alt="preview image" />
                                                            <i onClick={closeImage} class="far fa-times-circle"></i>
                                                        </div>
                                                    }

                                                </div>
                                                <span className="text-danger">{vocalresonance.error_list.image}</span>



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

export default AddVocalResonance
