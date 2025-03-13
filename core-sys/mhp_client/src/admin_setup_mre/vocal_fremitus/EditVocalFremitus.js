import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link} from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function EditVocalFremitus(props) {

    const[statuslist,setStatusList]=useState([]);
    const [vocalfremitus,setvocalfremitus] = useState([]);
    const [error, setError] = useState([]);
    const [picture, setPicture] = useState('');

    const [image_error, setimage_error] = useState();
    const [imageUrl, setimageUrl] = useState();


    const handleImage = (e) => {
        e.persist();

        if (e.target.files[0].size < 2000048) {
            setPicture({ image: e.target.files[0] })
            setimage_error(null)
        } else {
            setimage_error("File size must be less than 2 mb !")
        }
        if (e.target.files && e.target.files[0] && e.target.files[0].size < 2000048) {
            setimageUrl(URL.createObjectURL(e.target.files[0]))
            // setDoctors({ ...doctorsInput, doctorImageUrl: URL.createObjectURL(event.target.files[0]) });
        } else {
            setimage_error("File size must be less than 2 mb !")
        }
    }

    const closeImage = () => {
        setimageUrl()
        document.getElementById('PatientImageUrl').value = '';
    }

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-vocal-fremitus/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setvocalfremitus(res.data.vocalfremitus);
                setPicture(res.data.vocalfremitus.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    useEffect(() => {

        axios.get(`/examination-status-dropdown`).then(res => {
            console.log(res.data.status_list);
            if (res.data.status === 200) {
                setStatusList(res.data.status_list);
            }
        })
        

    }, []);


    const handleInput = (e) => {
        e.persist();
        setvocalfremitus({ ...vocalfremitus, [e.target.name]: e.target.value });
    }


          
    const formData = new FormData();

    formData.append('image', picture.image);
    formData.append('vocalfremitus_name',  vocalfremitus.vocalfremitus_name);
    formData.append('status_id', vocalfremitus.status_id);
    formData.append('selection_criteria', vocalfremitus.selection_criteria);


    const updateCanalInput= (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.post(`/update-vocal-fremitus/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setvocalfremitus({
                    ...vocalfremitus,

                });
                document.getElementById('PatientImageUrl').value = '';

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
            <MreSetupSidebar/>
            </div>
            <div className="col-md-9 mt-3">
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Edit Vocal Fremitus
                        <Link to={'/vocal-fremitus'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="EarCanalForm" onSubmit={updateCanalInput}>
                        <div className="card-body">

                    <div className="col-md-12">
                    
            
                        <div className="form-group">
                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                            <input type="text"  value={vocalfremitus.vocalfremitus_name} className="form-control" name="vocalfremitus_name" onChange={handleInput} />
                            <span className="text-danger">{error.vocalfremitus_name}</span>

                        </div>
                

                        <div>
                        <label htmlFor="inputPassword4"
                                className="form-label  col-form-label col-form-label-sm">Status</label>

                        <select id="inputState" onChange={handleInput} value={vocalfremitus.status_id} name="status_id"
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
                        <input className="form-check-input mt-1" type="radio"onChange={handleInput} value="single" checked={vocalfremitus.selection_criteria=='single'?true:''} name="selection_criteria"  id="inlineRadio1"/>
                        <label className="form-check-label" for="inlineRadio1"> <span style={{marginLeft:"-28px"}}>Single </span></label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" value="multiple" checked={vocalfremitus.selection_criteria=='multiple'?true:''}  id="inlineRadio2"/>
                        <label className="form-check-label" for="inlineRadio2"> <span style={{marginLeft:"-28px"}}>Multiple </span></label>
                </div>
                <span className="text-danger"></span>
            </div>
            <div className="form-group mt-3">
                                                    <label htmlFor="inputEmail4"
                                                        className="form-label col-form-label col-form-label-sm">vocalfremitus Image </label>
                                                    <input type="file" name="image" id="PatientImageUrl" className="form-control form-control-sm" onChange={handleImage}
                                                    />

                                                    {
                                                        image_error == null ? <p className="doc_image_size">Image size must be less than 2 mb</p> : <p className="docimage_error">{image_error}</p>
                                                    }

                                                    {imageUrl == null ? <img src={`${global.img_url}/images/files/vocalfremitus/${picture}`} className="doctorImageUrlPreview" /> :
                                                        <div className="docImage">
                                                            <img src={imageUrl} className="doctorImageUrlPreview" alt="preview image" />
                                                            <i onClick={closeImage} class="far fa-times-circle"></i>
                                                        </div>
                                                    }

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

export default EditVocalFremitus
