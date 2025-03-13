import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';

function AddPictureUpperLimbDermatomes() {


    const [PULimbDermatomes, setPULimbDermatomes] = useState({
        PULimbDermatomes_name: "",
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

    const handleInput = (e) => {
        setPULimbDermatomes({
            ...PULimbDermatomes, [e.target.name]: e.target.value
        });
    }
    const formData = new FormData();

    formData.append('image', picture.image);
    formData.append('PULimbDermatomes_name', PULimbDermatomes.PULimbDermatomes_name);
    console.log(formData);
    const submitPictureUpperLimbDermatomes = (e) => {
        e.preventDefault();


        axios.post(`/save-picture-upper-limb-dermatomes`, formData).then(res => {
            //  alert("hgfdhgf")
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setPULimbDermatomes({
                    PULimbDermatomes_name: "",
                    error_list: [],

                });
                setimageUrl(null);
                document.getElementById('PatientImageUrl').value = '';

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <CnsTwoSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Picture upper limb dermatomes
                                        <Link to={'/picture-upper-limb-dermatomes'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="PictureUpperLimbDermatomesForm" onSubmit={submitPictureUpperLimbDermatomes}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={PULimbDermatomes.PULimbDermatomes_name} className="form-control" name="PULimbDermatomes_name" onChange={handleInput} />
                                                    <span className="text-danger">{PULimbDermatomes.error_list.PULimbDermatomes_name}</span>
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label htmlFor="inputEmail4"
                                                        className="form-label col-form-label col-form-label-sm"> Patient Image </label>
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
                                                <span className="text-danger">{PULimbDermatomes.error_list.image}</span>



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

export default AddPictureUpperLimbDermatomes;
