import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Popper } from '@mui/material';

const PatientCard = () => {

    const [patients, setPatients] = useState([]);
    const [statuses, setStatusesList] = useState([]);
    const [status, setStatus] = useState("status");
    const [genders, setGenderDropdown] = useState([]);
    const [sex, setSex] = useState("sex");
    const [sortedData, setSortededData] = useState([]);

    const [vitalSign, setvitalSign] = useState([]);
    const [name, setName] = useState("name");

    useEffect(() => {
        axios.get('vital-sign').then(res => {
            if (res.data.status === 200) {
                setvitalSign(res.data.vitalSign);
            }
        })


    }, []);

    useEffect(() => {
        axios.get(`/patients`).then(res => {
            if (res.data.status === 200) {
                console.log("patients", res.data.patients);
                setPatients(res.data.patients);
                setSortededData(res.data.patients);
                setGenderDropdown(res.data.genders);
                setStatusesList(res.data.statuses);
            }
        });
    }, []);

    //  // Filters option gender
    useEffect(() => {
        if (sex === 'sex') {
            setSortededData(patients)
        } else {
            setSortededData(patients.filter(patient => patient.patient_birth_sex?.birth_sex_name.toLowerCase() === sex.toLowerCase()))
        }
    }, [sex]);


    // Filters option status
    useEffect(() => {
        if (status === 'status') {
            setSortededData(patients)
        } else {
            setSortededData(patients.filter(patient => patient.statuses?.status_name.toLowerCase() === status.toLowerCase()))
        }

    }, [status]);


    // Filters option vital sign
    useEffect(() => {
        if (name === 'name') {
            setSortededData(patients)
        } else {
            setSortededData(patients.filter(patient => patient.vitalSign?.name.toLowerCase() === name.toLowerCase()))
        }

    }, [name]);
    const [patientId, setPatientId] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setPatientId(event.target.getAttribute("patientId"));
    };
    const open = Boolean(anchorEl);
    const id1 = open ? 'simple-popper' : undefined;
    let navigate = useNavigate();
    const handleProfile = () => {
        let path = `/patients-profile/${patientId}`;
        navigate(path);
        setPatientId('');
    }

    return (
        <>
            <div className='container font-size-patient pt-2 px-2'>
                <div className="custom-card flex-grow-1">
                    <h5 className="fw-normal  text-start py-2 px-1 mb-2 text-login">Patient Card</h5>
                </div>
                <div className='custom-card'>
                    <div className="">
                        <div className="patient-card-filter row p-2 ms-2">

                            <div className="col-md-3 me-1">
                                <select className="form-select form-select-sm" id="autoSizingSelect"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option selected value={"status"}>Status</option>
                                    {
                                        statuses.map((item) => {
                                            return (
                                                <option value={item.status_name} key={item.id}>{item.status_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3 me-1">
                                <select class="form-select form-select-sm"
                                    value={sex}
                                    // label="Age"
                                    onChange={(e) => setSex(e.target.value)} id="autoSizingSelect">
                                    <option selected value={"sex"}>Gender</option>
                                    {
                                        genders.map((item) => {
                                            return (
                                                <option value={item.birth_sex_name} key={item.id}>{item.birth_sex_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3 me-1">
                                <input type="text" onChange={(e) => setSortededData(patients.filter(item => item.patient_first_name.toLowerCase().match(e.target.value.toLowerCase())))} placeholder='Search' className="form-control form-control-sm" />
                            </div>

                        </div>
                        <div className="row patient-card-content mt-4">

                            {
                                sortedData.map((item, index) => (
                                    <div key={index} className="col-md-4 p-2">
                                        <div className="patient-card p-3 ms-4 me-4">
                                            <div className="patient-card-icon clearfix">
                                                <i onClick={handleClick} style={{ fontSize: "18px", cursor: "pointer" }} patientId={item.id} className="fas float-end me-1 fa-ellipsis-h"></i>
                                                <Popper id={id1} open={open} anchorEl={anchorEl} placement={'bottom-end'}>
                                                    <Box sx={{ p: 1, bgcolor: '#ffff' }}>
                                                        <div className='all-app-list-contact-popover'>
                                                            <button onClick={handleProfile}><i className="far fa-user me-1"></i> Profile</button>
                                                            <button className='mb-3'> <a style={{ color: "#363636", textDecoration: "none" }} href={`tel: ${item.patient_mobile_phone}`}><i className="far fa-phone-alt me-1"></i> Make Call</a> </button>
                                                        </div>
                                                    </Box>
                                                </Popper>
                                            </div>
                                            <div className="patient-card-img">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={`${global.img_url}/images/files/${item.patient_images}`} alt="" className="img-fluid d-inline" />
                                                    </div>
                                                    <div className="col-8 mt-2">
                                                        <h6 className='d-inline'>
                                                            {item.fullName}
                                                        </h6> <br />
                                                        <span>
                                                            HN: {item.patient_hn_number}
                                                        </span> <br />
                                                        <p className="d-inline">{item.patient_birth_sex?.birth_sex_name}</p>
                                                        <p className="d-inline"> 29 Yrs.</p>
                                                        <p className="d-inline p-card">
                                                            <span style={{ color: "red" }}>
                                                                {item.ptn_blood_group_id}
                                                            </span>+

                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="patient-card-detail mt-3">
                                                <p>
                                                    <span>Dr. Charlie Dias Nulla pariatur fugiat sit reprehenderit Dr. Charlie Dias Nulla pariatur fugiat sit reprehenderit  labore occaecat exercitation</span>
                                                    <span className="fav-read-more"> Read More...</span>
                                                </p>
                                            </div>
                                            <div className="patient-card-address mt-3">
                                                <p><i className="fal fa-map-marker-alt me-1"> </i>  {item.patient_address1} </p>
                                                <p><i className="fal fa-phone-alt me-1"></i> {item.patient_mobile_phone} </p>
                                            </div>
                                            <div className="patient-card-booking mt-4">
                                                <Link to="/main">
                                                    <button className="patient-card-booking-app">Make Appointment</button>
                                                </Link>
                                                <button className="patient-card-booking-follow">Follow UP</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        {/* <div className="patietn-card-pagination text-center">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    <li className="page-item active"><a class="page-link" href="#">1</a></li>
                                    <li className="page-item"><a class="page-link" href="#">2</a></li>
                                    <li className="page-item"><a class="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div> */}
                    </div>
                </div>
            </div>

        </>
    );
};

export default PatientCard;

