import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';

function EditPictureUpperLimbDermatomes(props) {

    const [PULimbDermatomes, setPULimbDermatomes] = useState([]);
    const [error, setError] = useState([]);
    const [picture, setPicture] = useState('');

    const [image_error, setimage_error] = useState();
    const [imageUrl, setimageUrl] = useState();

    let navigate = useNavigate();

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
        axios.get(`/edit-picture-upper-limb-dermatomes/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setPULimbDermatomes(res.data.PULimbDermatomes);
                setPicture(res.data.PULimbDermatomes.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setPULimbDermatomes({ ...PULimbDermatomes, [e.target.name]: e.target.value });
    }



    const formData = new FormData();

    formData.append('image', picture.image);
    formData.append('PULimbDermatomes_name', PULimbDermatomes.PULimbDermatomes_name);


    const updatePictureUpperLimbDermatomesInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.post(`/update-picture-upper-limb-dermatomes/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setPULimbDermatomes({
                    ...PULimbDermatomes,

                });

                document.getElementById('PatientImageUrl').value = '';

                setError('');
                navigate(`/picture-upper-limb-dermatomes/`);
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
                        <CnsTwoSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Vocal Fremitus
                                    <Link to={'/picture-upper-limb-dermatomes'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="PictureUpperLimbDermatomesForm" onSubmit={updatePictureUpperLimbDermatomesInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">


                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={PULimbDermatomes.PULimbDermatomes_name} className="form-control" name="PULimbDermatomes_name" onChange={handleInput} />
                                                <span className="text-danger">{error.PULimbDermatomes_name}</span>

                                            </div>

                                            <div className="form-group mt-3">
                                                <label htmlFor="inputEmail4"
                                                    className="form-label col-form-label col-form-label-sm">Picture upper limb dermatomes Image </label>
                                                <input type="file" name="image" id="PatientImageUrl" className="form-control form-control-sm" onChange={handleImage}
                                                />

                                                {
                                                    image_error == null ? <p className="doc_image_size">Image size must be less than 2 mb</p> : <p className="docimage_error">{image_error}</p>
                                                }

                                                {imageUrl == null ? <img src={`${global.img_url}/images/files/PULimbDermatomes/${picture}`} className="doctorImageUrlPreview" /> :
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

export default EditPictureUpperLimbDermatomes;
