import React, { useState, useEffect } from 'react';
import './DoctorsInbox.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import DoctorsInboxPatientDetail from './DoctorsInboxPatientDetail';
import axios from "axios";
import moment from 'moment';

const DoctorsInbox = () => {
    const [smallMenu, setSmallMenu] = useState(false);
    const popover = (
        <Popover id="popover-basic" style={{ marginTop: "-6px" }}>
            <div className='g-doc-patient-contex-menu'>
                <span><i className="far fa-user me-1"></i> Profile </span>
            </div>
        </Popover>
    );

    const doctorId = JSON.parse(localStorage.getItem('userData'))?.user_id;


    const [doctorAllLabPatients, setDoctorAllLabPatients] = useState([]);
    const [patientId, setPatientId] = useState('');

    useEffect(() => {
        axios.get(`/doctor-inbox-lab-module/${doctorId}`).then(res => {
            if (res.data.status == 200) {
                setDoctorAllLabPatients(res.data.doc_labs_patient);
                setPatientId(res.data.doc_labs_patient[0].patient_id)

            }
        });

    }, [doctorId])


    const [individualPatientReport, setIndividualPatientReport] = useState();
    useEffect(() => {
        axios.get(`/doctor-inbox-lab-module-patients-report/${doctorId}/${patientId}`).then(res => {
            if (res.data.status == 200) {
                setIndividualPatientReport(res.data.patient_labs);

            }
        });

    }, [doctorId, patientId])

    const [searchTerm, setSearchTerm] = useState("");

    const handlePatientSearch = (e) => {
        setSearchTerm(e.target.value);

    }

    console.log(doctorAllLabPatients, 'individualPatientReport')
    return (
        <div className='ms-2'>
            <div className="custom-card mt-2 p-2 d-flex justify-content-between">
                <h5 className="card-title">Doctor's Inbox</h5>
            </div>
            <div className='great-doc-container ms-1 mt-2'>
                <div className="row">
                    <div className={`${smallMenu ? "col-1" : "col-2"} g-doc-left-content custom-card`}>
                        <div className="g-doc-left-content-top clearfix">
                            {!smallMenu ?
                                <>
                                    <span className='float-end ms-1'><i onClick={() => setSmallMenu(!smallMenu)} className="fal fa-chevron-circle-left"></i></span>
                                </>

                                :
                                <span className='float-end ms-1'><i onClick={() => setSmallMenu(!smallMenu)} className="fal fa-chevron-circle-right"></i></span>
                            }
                            {!smallMenu &&
                                <input type="text" placeholder='search' onChange={handlePatientSearch} className="form-control form-control-sm mb-2" />
                            }
                        </div>

                        <div style={{ background: "#ffff" }} className="g-doc-left-content">

                            <h6 style={{ fontSize: "14px" }}>Patient</h6>
                            <div className="g-doc-paiten-list-container">
                                <ul>
                                    {
                                        doctorAllLabPatients?.length > 0 ?

                                            doctorAllLabPatients.filter((val) => {
                                                if (searchTerm == "") {
                                                    return val;
                                                } else if (val?.patient_first_name?.toLowerCase().includes(searchTerm?.toLowerCase())
                                                ) {
                                                    return val;
                                                }
                                            }).map((data, index) => {
                                                return (
                                                    <li onClick={() => setPatientId(data.patient_id)} className={`d-flex g-doc-left-patient ${patientId === data.patient_id ? "active" : ""} mb-2`}>
                                                        {/* <li onClick={() => setPatientId(data.patient_id)} className="mb-2 d-flex g-doc-left-patient"> */}
                                                        <div className=''>
                                                            <img src={`${global.img_url}/images/files/${data.patient_images}`} alt="" className={`img-fluid me-1 ${!smallMenu ? "mt-1" : ""}`} />
                                                            {/* {row.patient_images !== "" ? <img className="me-2" src={`${global.img_url}/images/files/${row.patient_images}`} width="20px" alt="No Image" /> */}
                                                        </div>
                                                        {
                                                            !smallMenu &&
                                                            <div className='g-doc-left-patient-detail ms-2'>
                                                                <h6 className='d-inline'>{data.patient_first_name}</h6>
                                                                <OverlayTrigger
                                                                    trigger="click" placement="bottom-end" overlay={popover} rootClose="true"
                                                                >
                                                                    <i style={{ cursor: "pointer" }} className="fas fa-ellipsis-h float-end text-white"></i>
                                                                </OverlayTrigger>
                                                                <br />
                                                                <span>{data.patient_address1}</span> <br />
                                                                <span><i className="fal fa-clock me-1"></i> {moment(data.date).format('LL')}</span>
                                                            </div>
                                                        }
                                                    </li>
                                                )
                                            })
                                            :
                                            <p className='text-center text-danger mt-lg-5'>Records are not available</p>
                                    }
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className={`${smallMenu ? "col-11" : "col-10"}`}>
                        <DoctorsInboxPatientDetail singlePatientReport={individualPatientReport} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorsInbox;