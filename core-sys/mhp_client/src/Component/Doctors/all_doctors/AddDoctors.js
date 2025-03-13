import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import image3 from '../../../Images/image3.jpg';
import '../../Patients/AddNewPatient/AddNewPatient.css';
import swal from 'sweetalert';
import Sidebar1 from "../../Sidebar1/Sidebar1";

function AddNewDoctors() {

    const [titlelist, setTitlelist] = useState([]);
    const [genderlist, setGenderlist] = useState([]);
    const [citylist, setCitylist] = useState([]);
    const [contactvialist, setContactvialist] = useState([]);

    const [usualproviderlist, setUsualproviderlist] = useState([]);
    const [departmentlist, setDepartmentlist] = useState([]);
    const [specialistlist, setSpecialistlist] = useState([]);

    const [patientInput, setPatient] = useState({

        dr_identity_no: '',
        title: '',
        department_id: '',
        specialists_id: '',
        dr_family_name: '',
        dr_given_name: '',
        dr_middle_name: '',
        dr_preferred_name: '',
        dr_address_line_1: '',
        dr_address_line_2: '',
        dr_bmdc_reg_no: '',
        dr_email: '',
        dr_dob: '',
        dr_birth_sex_id: '',
        dr_city_id: '',
        dr_postal_code: '',
        dr_home_phone: '',
        dr_work_phone: '',
        dr_mobile_phone: '',
        dr_contact_via_id: '',
        dr_provider_id: '',

    });


    const handleInput = (e) => {
        e.persist();
        setPatient({ ...patientInput, [e.target.name]: e.target.value });
    }



    useEffect(() => {
        axios.get(`/title-dropdown`).then(res => {
            if (res.data.status === 200) {
                setTitlelist(res.data.title);
            }
        })
        axios.get(`/gender-dropdown`).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.gender);
                setGenderlist(res.data.gender);
            }
        })

        axios.get(`/city-dropdown`).then(res => {
            if (res.data.status === 200) {
                setCitylist(res.data.city);
                // setContactvialist(res.data.contactvia);
                // setUsualproviderlist(res.data.usualprovider);
                // setDepartmentlist(res.data.department);
                // setSpecialistlist(res.data.specialist);
            }
        })




    }, []);


    const submitDoctor = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('dr_identity_no', patientInput.dr_identity_no);
        formData.append('title', patientInput.title);
        formData.append('department_id', patientInput.department_id);
        formData.append('specialists_id', patientInput.specialists_id);
        formData.append('dr_family_name', patientInput.dr_family_name);
        formData.append('dr_given_name', patientInput.dr_given_name);
        formData.append('dr_middle_name', patientInput.dr_middle_name);
        formData.append('dr_preferred_name', patientInput.dr_preferred_name);
        formData.append('dr_address_line_1', patientInput.dr_address_line_1);
        formData.append('dr_address_line_2', patientInput.dr_address_line_2);
        formData.append('dr_bmdc_reg_no', patientInput.dr_bmdc_reg_no);
        formData.append('dr_email', patientInput.dr_email);
        formData.append('dr_dob', patientInput.dr_dob);
        formData.append('dr_birth_sex_id', patientInput.dr_birth_sex_id);
        formData.append('dr_city_id', patientInput.dr_city_id);
        formData.append('dr_postal_code', patientInput.dr_postal_code);
        formData.append('dr_home_phone', patientInput.dr_home_phone);
        formData.append('dr_work_phone', patientInput.dr_work_phone);
        formData.append('dr_mobile_phone', patientInput.dr_mobile_phone);
        formData.append('dr_contact_via_id', patientInput.dr_contact_via_id);
        formData.append('dr_provider_id', patientInput.dr_provider_id);

        axios.post(`/save-doctors`, formData).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.message);

                swal("Success", res.data.message, "success");

                setPatient({
                    ...patientInput,

                    dr_identity_no: '',
                    title: '',
                    department_id: '',
                    specialists_id: '',
                    dr_family_name: '',
                    dr_given_name: '',
                    dr_middle_name: '',
                    dr_preferred_name: '',
                    dr_address_line_1: '',
                    dr_address_line_2: '',
                    dr_bmdc_reg_no: '',
                    dr_email: '',
                    dr_dob: '',
                    dr_birth_sex_id: '',
                    dr_city_id: '',
                    dr_postal_code: '',
                    dr_home_phone: '',
                    dr_work_phone: '',
                    dr_mobile_phone: '',
                    dr_contact_via_id: '',
                    dr_provider_id: '',

                });

            }
        });
    }


    return (
        <>
            <div className="container mb-5 font-size-patient pt-5">
                <h2 className="fw-normal  text-start pt-4 mb-3 text-login">Add Doctors

                    <Link to={'/doctors'} className="btn btn-primary btn-sm float-end"> Back </Link>
                </h2>
                <div className="shadow border border-1">
                    <div className="row p-3" style={{ backgroundColor: "#F4F6F9" }}>
                        <div className="col-md-3 mb-3">
                            <div className="list-group " id="list-tab">
                                <a className="list-group-item list-group-item-action active " id="list-home-list"
                                    data-toggle="list" href="#list-home">Personal Information</a>
                                {/* <a className="list-group-item list-group-item-action " id="list-profile-list"
                                   data-toggle="list" href="#list-profile">Academic</a>
                                   <a className="list-group-item list-group-item-action " id="list-profile-list"
                                   data-toggle="list" href="#list-profile">Professional Certificates</a>
                                <a className="list-group-item list-group-item-action " id="list-messages-list"
                                   data-toggle="list" href="#list-messages">License and Training</a>
                                <a className="list-group-item list-group-item-action " id="list-settings-list"
                                   data-toggle="list" href="#list-settings">Work Experience</a>
                                   <a className="list-group-item list-group-item-action " id="list-settings-list"
                                   data-toggle="list" href="#list-settings">Time Slot</a> */}
                            </div>
                        </div>
                        <div className="col-md-9 ">
                            <form className="" onSubmit={submitDoctor}>
                                <div className="card mb-3">
                                    <div className="ml-3 mt-3 px-3">
                                        <div className="d-flex bd-highlight">
                                            <div className="p-2 flex-grow-1 bd-highlight"> <h5> Personal Information </h5> </div>
                                            <div className="p-2 bd-highlight">
                                                <button type="submit" className="btn btn-sm btn-success text-uppercase float-right"><i
                                                    className="fas fa-save"></i> Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm"> Doctors Identity No. </label>
                                            <input name="dr_identity_no" type="text" className="form-control form-control-sm "
                                                onChange={handleInput} value={patientInput.dr_identity_no} id="inputEmail4" />
                                            <span className="span_desc">Enter doctors identity number.</span>
                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Doctors Title</label>
                                            <select id="inputState" name="title" onChange={handleInput} value={patientInput.title}
                                                className="form-select  col-form-label-sm font-size-patient">
                                                <option selected>Select</option>

                                                {
                                                    titlelist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.title_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Family Name</label>
                                            <input name="dr_family_name" type="text" className="form-control form-control-sm "
                                                onChange={handleInput} value={patientInput.dr_family_name} id="inputEmail4" />
                                            <span className="span_desc">Enter family name.</span>
                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Given Name</label>
                                            <input name="dr_given_name" type="text" className="form-control form-control-sm "
                                                onChange={handleInput} value={patientInput.dr_given_name} id="inputEmail4" />
                                            <span className="span_desc">Enter given name.</span>
                                        </div>



                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Middle Name</label>
                                            <input name="dr_middle_name" type="text" onChange={handleInput} value={patientInput.dr_middle_name} className="form-control form-control-sm "
                                                id="inputEmail4" />
                                            <span className="span_desc">Enter middlename.</span>

                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Preferred
                                                Name</label>
                                            <input name="dr_preferred_name" type="text" onChange={handleInput} value={patientInput.dr_preferred_name} className="form-control form-control-sm "
                                                id="inputEmail4" />
                                            <span className="span_desc">Enter preferred name.</span>

                                        </div>
                                        <div className="col-md-12 px-3">
                                            <label htmlFor="exampleFormControlTextarea1"
                                                className="form-label col-form-label col-form-label-sm">Address Line
                                                1</label>
                                            <textarea name="dr_address_line_1" onChange={handleInput} value={patientInput.dr_address_line_1} className="form-control" id="exampleFormControlTextarea1"
                                                rows="2"></textarea>
                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="exampleFormControlTextarea1"
                                                className="form-label col-form-label col-form-label-sm">Address Line
                                                2</label>
                                            <textarea name="dr_address_line_2" onChange={handleInput} value={patientInput.dr_address_line_2} className="form-control" id="exampleFormControlTextarea1"
                                                rows="2"></textarea>
                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">BMDC Reg No.</label>
                                            <input type="text" name="dr_bmdc_reg_no" className="form-control form-control-sm" onChange={handleInput} value={patientInput.dr_bmdc_reg_no}
                                                id="inputEmail4" />

                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Email</label>
                                            <input type="email" name="dr_email" className="form-control form-control-sm" onChange={handleInput} value={patientInput.dr_email}
                                                id="inputEmail4" />

                                        </div>

                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Date of Birth</label>
                                            <input type="date" name="dr_dob" className="form-control form-control-sm" onChange={handleInput} value={patientInput.dr_dob}
                                                id="inputEmail4" />

                                        </div>

                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm"> Gender </label>
                                            <select name="dr_birth_sex_id" onChange={handleInput} value={patientInput.dr_birth_sex_id} id="inputState"
                                                className="form-select  col-form-label-sm font-size-patient">
                                                <option selected>Select</option>

                                                {
                                                    genderlist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.birth_sex_name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>

                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">City</label>
                                            <select id="inputState" name="dr_city_id" onChange={handleInput} value={patientInput.dr_city_id}
                                                className="form-select  col-form-label-sm font-size-patient">
                                                <option selected>Select</option>
                                                {
                                                    citylist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.city_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Post Code</label>
                                            <input type="text" name="dr_postal_code" className="form-control form-control-sm" onChange={handleInput} value={patientInput.dr_postal_code}
                                                id="inputEmail4" />

                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Home Phone</label>
                                            <input type="text" name="dr_home_phone" className="form-control form-control-sm" onChange={handleInput} value={patientInput.dr_home_phone}
                                                id="inputEmail4" />

                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Work Phone</label>
                                            <input type="text" name="dr_work_phone" className="form-control form-control-sm" onChange={handleInput} value={patientInput.dr_work_phone}
                                                id="inputEmail4" />

                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Mobile Phone</label>
                                            <input type="text" name="dr_mobile_phone" className="form-control form-control-sm" onChange={handleInput} value={patientInput.dr_mobile_phone}
                                                id="inputEmail4" />

                                        </div>

                                        <div className="col-md-12 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm">Contact
                                                Via </label>
                                            <select id="inputState"
                                                name="dr_contact_via_id" onChange={handleInput} value={patientInput.dr_contact_via_id} className="form-select  col-form-label-sm font-size-patient">
                                                <option selected>Select</option>

                                                {
                                                    contactvialist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.contact_via_name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>

                                        <div className="col-md-12 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm"> Departments </label>
                                            <select id="inputState"
                                                name="department_id" onChange={handleInput} value={patientInput.department_id} className="form-select  col-form-label-sm font-size-patient">
                                                <option selected>Select</option>

                                                {
                                                    departmentlist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.departments_name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className="col-md-12 px-3">
                                            <label htmlFor="inputEmail4"
                                                className="form-label col-form-label col-form-label-sm"> Specialists </label>
                                            <select id="inputState"
                                                name="specialists_id" onChange={handleInput} value={patientInput.specialists_id} className="form-select  col-form-label-sm font-size-patient">
                                                <option selected>Select</option>

                                                {
                                                    specialistlist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.specialists_name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className="col-md-12 p-1 px-3">
                                            <label htmlFor="inputState"
                                                className="form-label col-form-label col-form-label-sm">Usual
                                                Provider</label>
                                            <select id="inputState" name="dr_provider_id" onChange={handleInput} value={patientInput.dr_provider_id}
                                                className="form-select col-form-label-sm font-size-patient">
                                                <option selected>Select</option>

                                                {
                                                    usualproviderlist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.usual_provider_name}</option>
                                                        )
                                                    })
                                                }

                                            </select>


                                            <button type="submit" className="btn btn-success float-end mt-2 btn-sm text-uppercase text-right"><i
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
        </>





    )
}

export default AddNewDoctors;
