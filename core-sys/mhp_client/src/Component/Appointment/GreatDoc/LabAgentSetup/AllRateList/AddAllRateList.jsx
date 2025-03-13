import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import LabAgentSetupLayout from '../LabAgentSetupLayout';

const AddAllRateList = () => {
    const [rateListCategory, setRateListCategory] = useState([]);
    const [genderList, setGenderList] = useState([]);
    useEffect(() => {
        axios.get(`/lab-agent-rate-list-category`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.category);
                setRateListCategory(res.data.category);
            }

        });
        axios.get(`/gender-dropdown`).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.gender);
                setGenderList(res.data.gender);
            }
        })

    }, []);
    const [rateList, setRateList] = useState({
        name: "",
        categoryId: "",
        gender: "",
        fee:"",
        preBooking:"",
        details:"",
        code:"",
        revenue:""

    })
    const [imgError, setImgError] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const submitRateList = (e) => {
        e.preventDefault();
        const rateListData = new FormData();
        rateListData.append("name", rateList.name)
        rateListData.append("code", rateList.code)
        rateListData.append("categoryId", rateList.categoryId)
        rateListData.append("gender", rateList.gender)
        rateListData.append("fee", rateList.fee)
        rateListData.append("preBooking", rateList.preBooking)
        rateListData.append("details", rateList.details)
        rateListData.append("revenue", rateList.revenue)
        if (rateList.name && rateList.code && rateList.categoryId) {
            axios.post('add-rate-list-all', rateListData)
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
    console.log(rateList)
    return (
        <LabAgentSetupLayout>
            <div className="card mt-2">
                <div className="card-header">
                    <h6 className="card-title"> Add Rate List
                        <Link to={'/all-rate-list'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="DiagnosisProcedureForm" onSubmit={submitRateList}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="">
                                        <label htmlFor="diagnosis_procedure_code" className="col-form-label-sm"> Item Code </label>
                                        <input type="text" value={rateList.code} className="form-control" name="name" onChange={(e) => setRateList({ ...rateList, code: e.target.value })} />
                                    </div>
                                    <div className="">
                                        <label htmlFor="diagnosis_procedure_code" className="col-form-label-sm"> Test Name</label>
                                        <input type="text" value={rateList.name} className="form-control" name="name" onChange={(e) => setRateList({ ...rateList, name: e.target.value })} />
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="diagnosis_procedure_code" className="col-form-label-sm"> Fee</label>
                                        <input type="text" value={rateList.fee} className="form-control" name="name" onChange={(e) => setRateList({ ...rateList, fee: e.target.value })} />
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="diagnosis_procedure_code" className="col-form-label-sm"> Revenue</label>
                                        <input type="text" value={rateList.revenue} className="form-control" name="name" onChange={(e) => setRateList({ ...rateList, revenue: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="">
                                        <label htmlFor="inputPassword4"
                                            className="form-label  col-form-label col-form-label-sm">Rate List Category</label>
                                        <select id="inputState" value={rateList.categoryId} onChange={(e) => setRateList({ ...rateList, categoryId: e.target.value })}
                                            className="form-select  col-form-label-sm font-size-patient" aria-label="Default select example">
                                            <option>Select</option>
                                            {
                                                rateListCategory.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="">
                                        <label htmlFor="inputPassword4"
                                            className="form-label  col-form-label col-form-label-sm">Gender</label>
                                        <select id="inputState" value={rateList.gender} onChange={(e) => setRateList({ ...rateList, gender: e.target.value })}
                                            className="form-select  col-form-label-sm font-size-patient" aria-label="Default select example">
                                            <option>Select</option>
                                            {
                                                genderList.map(item => <option key={item.id} value={item.id}>{item.birth_sex_name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className=" mt-1">
                                        <label className="me-2 d-block"> Pre Booking ?</label>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input mt-1" onChange={(e) => setRateList({ ...rateList, preBooking: e.target.value })} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Yes" />
                                            <label class="" for="inlineRadio1">Yes</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input mt-1" onChange={(e) => setRateList({ ...rateList, preBooking: e.target.value })} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="No" />
                                            <label class="" for="inlineRadio1">No</label>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label htmlFor="diagnosis_procedure_code" className="col-form-label-sm"> Details </label>
                                        <textarea class="form-control" onChange={(e) => setRateList({ ...rateList, details: e.target.value })} placeholder="Enter Details Here.." id="floatingTextarea2" style={{ height: "80px" }}></textarea>
                                    </div>
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

export default AddAllRateList;