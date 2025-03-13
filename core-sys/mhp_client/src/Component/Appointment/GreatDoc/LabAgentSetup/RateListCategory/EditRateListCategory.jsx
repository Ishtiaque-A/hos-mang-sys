import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import LabAgentSetupLayout from '../LabAgentSetupLayout';

const EditRateListCategory = () => {
    const [rateListCategory, setRateListCategory] = useState({
        name: "",
        icon: ""
    })
    const [image, setImage] =useState('')
    const params = useParams();
    useEffect(() => {
        axios.get(`edit-rate-list-category/${params.id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    setRateListCategory(res.data.category)
                    setImage(res.data.category?.icon)
                }
            })
    }, [])
    const [imgError, setImgError] = useState('');
    const [imgUrl, setImgUrl] = useState(null);
    const submitRateListCategory = (e) => {
        e.preventDefault();
        const categoryData = new FormData();
        categoryData.append("name", rateListCategory.name)
        categoryData.append("icon", image)
        if (rateListCategory.name && image) {
            axios.post(`update-rate-list-category/${params.id}`, categoryData)
                .then(res => {
                    if (res.status === 200) {
                        swal("Success", res.data.message, "success");
                    }
                })
        } else {
            toast.error("Please fill out required fields")
        }
    }
    const handleImage = (e) => {
        const { files } = e.target;
        if (files[0]?.size < 2000048) {
            setImgError(null);
            setRateListCategory({ ...rateListCategory, icon: files[0] })
            setImgUrl(URL.createObjectURL(files[0]))
            setImage(files[0])
        } else {
            setImgError("File size must be less than 2 mb !");
        }
    }
    const closeImage = () => {
        setImgUrl()
        document.getElementById('PatientImageUrl').value = '';
    }
    console.log(rateListCategory)
    return (
        <LabAgentSetupLayout>
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Add Rate List Category
                        <Link to={'/rate-list-category'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="DiagnosisProcedureForm" onSubmit={submitRateListCategory}>
                        <div className="card-body">

                            <div className="col-md-12">

                                <div className="form-group">
                                    <label htmlFor="diagnosis_procedure_code" className="col-form-label-sm"> Name </label>
                                    <input type="text" value={rateListCategory.name} className="form-control" name="name" onChange={(e) => setRateListCategory({ ...rateListCategory, name: e.target.value })} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Icon </label>
                                    <input type="file" className="form-control" name="icon" onChange={handleImage} />

                                </div>
                                {imgUrl == null ? <img src={`${global.img_url}/labAgent/images/${rateListCategory.icon}`} className="doctorImageUrlPreview" /> :
                                    <div className="docImage">
                                        <img src={imgUrl} className="doctorImageUrlPreview" alt="preview image" />
                                        <i onClick={closeImage} className="far fa-times-circle"></i>
                                    </div>
                                }
                                <div className="float-right">
                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                        className="fas fa-save"  ></i> Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </LabAgentSetupLayout>
    );
};

export default EditRateListCategory;