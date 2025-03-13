import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NoImages from "../../Images/dummy_images.svg";
import '../../imageUrl';

export default function Employee_profile() {

    var url = window.location.href;
    var urlsplit = url.split("/");
    var lastpart = urlsplit[urlsplit.length - 1];
    if (lastpart === '') {
        lastpart = urlsplit[urlsplit.length - 2];
    }
    const [employee, setSingleDoctor] = useState([]);

    useEffect(() => {
        axios.get(`/employee-profile/${lastpart}`).then(res => {

            console.log("Single Doctors", res.data.employee);

            if (res.data.status === 200) {
                setSingleDoctor(res.data.employee);
            }

        })
    }, [])
    return (
        <div className='ms-2 mt-2'>
            <div className="custom-card">
                <h5 className="py-2 px-1">Employee Profile
                    <Link to={'/employee'} className="btn btn-primary btn-sm float-end"> Back </Link>
                </h5>
            </div>
            <div className="custom-card p-2">
                <div className='row'>
                    <div className="col-md-4">
                        <div className="doc-container text-center">

                            {
                                employee.image == null ? <img src={NoImages} alt="" className="doctor" /> :
                                    <img alt="" className="doctor" src={`${global.img_url}/employee/images/${employee.image}`} />
                            }

                            {/*<img src={doctor} alt="" className="doctor" />*/}
                            <h6 className="doc-name mt-3">{employee.title == null ? '' : employee.title.title_name} {employee.first_name == 'null' ? '' : employee.first_name} {employee.middle_name == 'null' ? '' : employee.middle_name} {employee.preferred_name == 'null' ? '' : employee.preferred_name}</h6>
                            <span className='doc-department'>{employee.specialist == null ? '' : employee.specialist.specialists_name}</span>
                        </div>
                        <div className="mt-2">
                            <button className='doc-btn me-1'>General Cardiology</button>
                            <button className='doc-btn'>Echocardiology</button>
                            <button className='doc-btn mt-1'>Adult Congenital Cardiology</button>
                        </div>
                        <div className="mt-2">
                            <p>
                                Dr. Charlie Dias Nulla pariatur fugiat sit is the reprehenderit labore occaecat exercitation ea sunt in nulla culpa. Lorem fugiat quis e anim proident laboris labore sint culpa qui aliqua. Occaecat tempor commodo eiusmod ea laborum  Read More...
                            </p>
                        </div>
                        <div className='doctor-btn-container d-grid  gap-2'>
                            <button className='book-btn' >Book Appointment</button>
                            <button className='outline-btn'>Consult Instantly</button>
                        </div>
                        <div className="doc-app-container mt-2 text-center">
                            <h6>Appointment</h6>
                            <div className="row mt-1">
                                <div className="col-6 today">
                                    <h6>6</h6>
                                    <span>Today’s
                                        Appointment</span>
                                </div>
                                <div className="col-6 upcoming">
                                    <h6>12</h6>
                                    <span>Upcoming
                                        Appointment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mt-2 ps-1 pe-3">
                        <div className="doc-counter-container row">
                            <div className="col-4">
                                <div className='doc-patients text-center p-1'>
                                    <h6>5000+</h6>
                                    <span>Satisfied Patients</span>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className='doc-family text-center p-1'>
                                    <h6>300+</h6>
                                    <span>Families Trust</span>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className='doc-help text-center p-1'>
                                    <h6>24/7</h6>
                                    <span>Emergency Help</span>
                                </div>
                            </div>
                        </div>
                        <div className='doc-treatment-container mt-2 row'>
                            <h6>Treatments</h6>
                            <div className="col-4 mt-3">
                                <div className="treatments">
                                    <p><i className="treatment-icon fas fa-check-circle"></i> Arthroscopy surgery</p>
                                    <p><i className="treatment-icon fas fa-check-circle"></i> Joint replacement surgery</p>
                                    <p><i className="treatment-icon fas fa-check-circle"></i> Bone fracture treatment</p>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="treatments">
                                    <p><i className="treatment-icon fas fa-check-circle"></i> Arthroscopy surgery</p>
                                    <p><i className="treatment-icon fas fa-check-circle"></i> Joint replacement surgery</p>
                                    <p><i className="treatment-icon fas fa-check-circle"></i> Bone fracture treatment</p>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="treatments p-1">
                                    <p><i className="treatment-icon fas fa-check-circle"></i> Arthroscopy surgery</p>
                                    <p><i className="treatment-icon fas fa-check-circle"></i> Joint replacement surgery</p>
                                    <p className='more-treatment'>+ 20 More Treatment</p>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-profile-icon-container clearfix d-block">
                            <i className="m-3 float-end fal fa-file-pdf"></i>
                            <i className="m-3 float-end far fa-print"></i>
                            <i className="m-3 float-end fad fa-edit"></i>
                        </div>
                        <div className='doctor-info-container mt-1'>
                            <div className="doctor-info">
                                <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button className="nav-link doctor-info-btn active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Personal Information</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button className="nav-link doctor-info-btn" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Academic</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button className="nav-link doctor-info-btn" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Training</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button className="nav-link doctor-info-btn" id="pills-contact-tab1" data-bs-toggle="pill" data-bs-target="#pills-contact1" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Professional Certificates</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button className="nav-link doctor-info-btn" id="pills-contact-tab2" data-bs-toggle="pill" data-bs-target="#pills-contact2" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">License</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <div className='custom-card'>
                                            <div className='doc-p-info-container p-3 row'>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Doctors Identity No. : </span>
                                                        <p>{employee.identity_no == 'null' ? '' : employee.identity_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Family Name : </span>
                                                        <p>{employee.first_name == 'null' ? '' : employee.first_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Given Name : </span>
                                                        <p>{employee.given_name == 'null' ? '' : employee.given_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Middle Name : </span>
                                                        <p> {employee.middle_name == 'null' ? '' : employee.middle_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Preferred Name : </span>
                                                        <p> {employee.preferred_name == 'null' ? '' : employee.preferred_name}</p>
                                                    </div>

                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Address Line 1 : </span>
                                                        <p>{employee.address_line_1 == 'null' ? '' : employee.address_line_1}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Address Line 2 : </span>
                                                        <p>{employee.address_line_2 == 'null' ? '' : employee.address_line_2}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>BMDC Reg No. : </span>
                                                        <p>{employee.bmdc_reg_no == 'null' ? '' : employee.bmdc_reg_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Email : </span>
                                                        <p> {employee.email == 'null' ? '' : employee.email} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Date of Birth : </span>
                                                        <p> {employee.dob == 'null' ? '' : employee.dob} </p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Gender : </span>
                                                        <p>{employee.birth_sex == null ? '' : employee.birth_sex.birth_sex_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>City : </span>
                                                        <p>{employee.city == null ? '' : employee.city.city_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Post Code : </span>
                                                        <p>{employee.postal_code == 'null' ? '' : employee.postal_code}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Phone : </span>
                                                        <p> {employee.work_phone == 'null' ? '' : employee.work_phone} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Usual Provider : </span>
                                                        <p>{employee.usual_provider == null ? '' : employee.usual_provider.usual_provider_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div className='custom-card'>
                                            <div className='doc-p-info-container p-3 row'>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Doctors Identity No. : </span>
                                                        <p>{employee.identity_no == 'null' ? '' : employee.identity_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Family Name : </span>
                                                        <p>{employee.first_name == 'null' ? '' : employee.first_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Given Name : </span>
                                                        <p>{employee.given_name == 'null' ? '' : employee.given_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Middle Name : </span>
                                                        <p> {employee.middle_name == 'null' ? '' : employee.middle_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Preferred Name : </span>
                                                        <p> {employee.preferred_name == 'null' ? '' : employee.preferred_name}</p>
                                                    </div>

                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Address Line 1 : </span>
                                                        <p>{employee.address_line_1 == 'null' ? '' : employee.address_line_1}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Address Line 2 : </span>
                                                        <p>{employee.address_line_2 == 'null' ? '' : employee.address_line_2}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>BMDC Reg No. : </span>
                                                        <p>{employee.bmdc_reg_no == 'null' ? '' : employee.bmdc_reg_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Email : </span>
                                                        <p> {employee.email == 'null' ? '' : employee.email} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Date of Birth : </span>
                                                        <p> {employee.dob == 'null' ? '' : employee.dob} </p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Gender : </span>
                                                        <p>{employee.birth_sex == null ? '' : employee.birth_sex.birth_sex_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>City : </span>
                                                        <p>{employee.city == null ? '' : employee.city.city_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Post Code : </span>
                                                        <p>{employee.postal_code == 'null' ? '' : employee.postal_code}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Phone : </span>
                                                        <p> {employee.work_phone == 'null' ? '' : employee.work_phone} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Usual Provider : </span>
                                                        <p>{employee.usual_provider == null ? '' : employee.usual_provider.usual_provider_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                    <div className='custom-card'>
                                            <div className='doc-p-info-container p-3 row'>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Doctors Identity No. : </span>
                                                        <p>{employee.identity_no == 'null' ? '' : employee.identity_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Family Name : </span>
                                                        <p>{employee.first_name == 'null' ? '' : employee.first_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Given Name : </span>
                                                        <p>{employee.given_name == 'null' ? '' : employee.given_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Middle Name : </span>
                                                        <p> {employee.middle_name == 'null' ? '' : employee.middle_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Preferred Name : </span>
                                                        <p> {employee.preferred_name == 'null' ? '' : employee.preferred_name}</p>
                                                    </div>

                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Address Line 1 : </span>
                                                        <p>{employee.address_line_1 == 'null' ? '' : employee.address_line_1}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Address Line 2 : </span>
                                                        <p>{employee.address_line_2 == 'null' ? '' : employee.address_line_2}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>BMDC Reg No. : </span>
                                                        <p>{employee.bmdc_reg_no == 'null' ? '' : employee.bmdc_reg_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Email : </span>
                                                        <p> {employee.email == 'null' ? '' : employee.email} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Date of Birth : </span>
                                                        <p> {employee.dob == 'null' ? '' : employee.dob} </p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Gender : </span>
                                                        <p>{employee.birth_sex == null ? '' : employee.birth_sex.birth_sex_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>City : </span>
                                                        <p>{employee.city == null ? '' : employee.city.city_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Post Code : </span>
                                                        <p>{employee.postal_code == 'null' ? '' : employee.postal_code}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Phone : </span>
                                                        <p> {employee.work_phone == 'null' ? '' : employee.work_phone} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Usual Provider : </span>
                                                        <p>{employee.usual_provider == null ? '' : employee.usual_provider.usual_provider_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact-tab1">
                                    <div className='custom-card'>
                                            <div className='doc-p-info-container p-3 row'>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Doctors Identity No. : </span>
                                                        <p>{employee.identity_no == 'null' ? '' : employee.identity_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Family Name : </span>
                                                        <p>{employee.first_name == 'null' ? '' : employee.first_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Given Name : </span>
                                                        <p>{employee.given_name == 'null' ? '' : employee.given_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Middle Name : </span>
                                                        <p> {employee.middle_name == 'null' ? '' : employee.middle_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Preferred Name : </span>
                                                        <p> {employee.preferred_name == 'null' ? '' : employee.preferred_name}</p>
                                                    </div>

                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Address Line 1 : </span>
                                                        <p>{employee.address_line_1 == 'null' ? '' : employee.address_line_1}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Address Line 2 : </span>
                                                        <p>{employee.address_line_2 == 'null' ? '' : employee.address_line_2}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>BMDC Reg No. : </span>
                                                        <p>{employee.bmdc_reg_no == 'null' ? '' : employee.bmdc_reg_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Email : </span>
                                                        <p> {employee.email == 'null' ? '' : employee.email} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Date of Birth : </span>
                                                        <p> {employee.dob == 'null' ? '' : employee.dob} </p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Gender : </span>
                                                        <p>{employee.birth_sex == null ? '' : employee.birth_sex.birth_sex_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>City : </span>
                                                        <p>{employee.city == null ? '' : employee.city.city_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Post Code : </span>
                                                        <p>{employee.postal_code == 'null' ? '' : employee.postal_code}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Phone : </span>
                                                        <p> {employee.work_phone == 'null' ? '' : employee.work_phone} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Usual Provider : </span>
                                                        <p>{employee.usual_provider == null ? '' : employee.usual_provider.usual_provider_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact2" role="tabpanel" aria-labelledby="pills-contact-tab2">
                                    <div className='custom-card'>
                                            <div className='doc-p-info-container p-3 row'>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Doctors Identity No. : </span>
                                                        <p>{employee.identity_no == 'null' ? '' : employee.identity_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Family Name : </span>
                                                        <p>{employee.first_name == 'null' ? '' : employee.first_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Given Name : </span>
                                                        <p>{employee.given_name == 'null' ? '' : employee.given_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Middle Name : </span>
                                                        <p> {employee.middle_name == 'null' ? '' : employee.middle_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Preferred Name : </span>
                                                        <p> {employee.preferred_name == 'null' ? '' : employee.preferred_name}</p>
                                                    </div>

                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Address Line 1 : </span>
                                                        <p>{employee.address_line_1 == 'null' ? '' : employee.address_line_1}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Address Line 2 : </span>
                                                        <p>{employee.address_line_2 == 'null' ? '' : employee.address_line_2}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>BMDC Reg No. : </span>
                                                        <p>{employee.bmdc_reg_no == 'null' ? '' : employee.bmdc_reg_no}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Email : </span>
                                                        <p> {employee.email == 'null' ? '' : employee.email} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Date of Birth : </span>
                                                        <p> {employee.dob == 'null' ? '' : employee.dob} </p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex">
                                                        <span>Gender : </span>
                                                        <p>{employee.birth_sex == null ? '' : employee.birth_sex.birth_sex_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>City : </span>
                                                        <p>{employee.city == null ? '' : employee.city.city_name}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Post Code : </span>
                                                        <p>{employee.postal_code == 'null' ? '' : employee.postal_code}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Phone : </span>
                                                        <p> {employee.work_phone == 'null' ? '' : employee.work_phone} </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span>Usual Provider : </span>
                                                        <p>{employee.usual_provider == null ? '' : employee.usual_provider.usual_provider_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
