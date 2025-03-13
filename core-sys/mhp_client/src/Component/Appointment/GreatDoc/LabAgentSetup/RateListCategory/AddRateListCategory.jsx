import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import LabAgentSetupLayout from '../LabAgentSetupLayout';

const AddRateListCategory = () => {
    const [rateListCategory, setRateListCategory] = useState({
        name: "",
        icon: ""
    })
    const [imgError, setImgError] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const submitRateListCategory = (e) => {
        e.preventDefault();
        const categoryData = new FormData();
        categoryData.append("name", rateListCategory.name)
        categoryData.append("icon", rateListCategory.icon)
        if (rateListCategory.name && rateListCategory.icon) {
            axios.post('add-rate-list-category', categoryData)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
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
        } else {
            setImgError("File size must be less than 2 mb !");
        }
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
                                <div className="float-right">
                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                        className="fas fa-save"  ></i> Save
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

export default AddRateListCategory;