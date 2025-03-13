import React, { useEffect, useState, useRef } from 'react';
import Sidebar1 from '../../Sidebar1/Sidebar1';
import doctor from '../../../Images/crush.jpg';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Box, Popper } from '@material-ui/core';
import moment from 'moment';

import axios from 'axios';
import '../AppointmentBook/AppointmentBook.css'
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { useBarcode } from 'react-barcodes';
import Barcode from 'react-barcode';
import Modal from 'react-modal';

const AppointmentList = () => {
    const customStyles = {
        content: {
            top: '20%',
            left: '28%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "75%",
            height: "250px",
            background: "#ffffff",
        },
        overlay: { zIndex: 1000 }

    };

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);

    }

    //print code 
    const componentRef = useRef();
    const componentRef2 = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    const [appointment, setAppointment] = useState([]);
    const [appointmentSort, setAppointmentSort] = useState(appointment);
    console.log('appointment sort check', appointmentSort)
    const [doctorInfo, setDoctorInfo] = useState([]);
    const [doctorId, setDoctorId] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [appointmentDoctors, setAppointmentDoctors] = useState([]);
    const [patientId, setPatientId] = useState('');
    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem('userData'))
        const doctorIdGet = storageData.user_id;
        if (doctorIdGet) {
            axios.get(`/appointment-lists/${doctorIdGet}`).then(res => {
                if (res.data.status = 200) {
                    setAppointment(res.data.allAppointment);
                    setAppointmentSort(res.data.allAppointment);
                    setDoctorInfo(res.data.doctorInfo);
                    setLoading(false);
                }

            });
        }

    }, [])


    useEffect(() => {
        axios.get(`/appointment-lists/${doctorId}`).then(res => {
            console.log("appoint ment da", res.data)
            if (res.data.status = 200) {
                setAppointment(res.data.allAppointment);
                setAppointmentSort(res.data.allAppointment);
                setDoctorInfo(res.data.doctorInfo);
                setLoading(false);

            }

        });
    }, [doctorId])



    //appointment all doctors useffect

    useEffect(() => {

        axios.get('/allAppointListDoctors').then(res => {
            if (res.data.status = 200) {
                setAppointmentDoctors(res.data.allAppointmentDoctors);
                // console.log('allAppointment doctors', res.data.allAppointmentDoctors);
                setLoading(false);

            }

        });
    }, [])





    const handleSearch = (e) => {
        console.log("Name", e.target.value);
        // const data = appointmentSort.filter(item => item.patient_name.toLowerCase().includes(e.target.value.toLowerCase()) ||item.birth_sex_name.toLowerCase().includes(e.target.value.toLowerCase()) ||item.status_name.toLowerCase().includes(e.target.value.toLowerCase()) ||item.patient_mobile.toLowerCase().includes(e.target.value.toLowerCase()) ||  
        // item.patient_health_inc_no.toLowerCase().includes(e.target.value.toLowerCase()) );


        const data = appointmentSort.filter(item => item.patient_name.toLowerCase().includes(e.target.value.toLowerCase()));
        if (e.target.value.length > 0) {
            setAppointmentSort(data)
        }
        else {
            setAppointmentSort([...appointment])
        }
    }


    //patientLiveSearch function

    const patientLiveSearch = (e) => {
        setSearchTerm(e.target.value);

    }




    // console.log(userInfo);

    const allStatus = () => {


        const name = "all";
        const allStatus = appointment.filter((currElement) => {
            // console.log(currElement);
            return currElement.status_name !== name;

        })
        setAppointmentSort(allStatus);

        document.getElementById('btn2').classList.remove("active");
        document.getElementById('btn3').classList.remove("active");
        document.getElementById('btn4').classList.remove("active");
        document.getElementById('btn5').classList.remove("active");
        document.getElementById('btn6').classList.remove("active");
        let element = document.getElementById('btn1').classList.add("active");

    }
    const withDoctorStatus = () => {


        const name = "withdoctors";
        const allNotAttend = appointment.filter((currElement) => {
            // console.log(currElement);
            return currElement.status_name == name;

        })
        setAppointmentSort(allNotAttend);


        document.getElementById('btn1').classList.remove("active");
        document.getElementById('btn3').classList.remove("active");
        document.getElementById('btn4').classList.remove("active");
        document.getElementById('btn5').classList.remove("active");
        document.getElementById('btn6').classList.remove("active");
        let element = document.getElementById('btn2').classList.add("active");
    }
    const notAttendStatus = () => {


        const name = "notattend";
        const allNotAttend = appointment.filter((currElement) => {
            // console.log(currElement);
            return currElement.status_name == name;

        })

        setAppointmentSort(allNotAttend);

        document.getElementById('btn1').classList.remove("active");
        document.getElementById('btn2').classList.remove("active");
        document.getElementById('btn4').classList.remove("active");
        document.getElementById('btn5').classList.remove("active");
        document.getElementById('btn6').classList.remove("active");
        let element = document.getElementById('btn3').classList.add("active");

    }
    const waitingStatus = () => {


        const name = "Waiting";
        const allNotAttend = appointment.filter((currElement) => {
            // console.log(currElement);
            return currElement.status_name == name;

        })
        setAppointmentSort(allNotAttend);

        document.getElementById('btn1').classList.remove("active");
        document.getElementById('btn2').classList.remove("active");
        document.getElementById('btn3').classList.remove("active");
        document.getElementById('btn5').classList.remove("active");
        document.getElementById('btn6').classList.remove("active");
        let element = document.getElementById('btn4').classList.add("active");
    }
    const atBillingStatus = () => {


        const name = "attbilling";
        const allBilling = appointment.filter((currElement) => {
            return currElement.status_name == name;

        })
        setAppointmentSort(allBilling);
        document.getElementById('btn1').classList.remove("active");
        document.getElementById('btn2').classList.remove("active");
        document.getElementById('btn3').classList.remove("active");
        document.getElementById('btn4').classList.remove("active");
        document.getElementById('btn6').classList.remove("active");
        let element = document.getElementById('btn5').classList.add("active");

    }
    const unavailableStatus = () => {

        const name = "Unavilable";
        const unavailableStatus = appointment.filter((currElement) => {
            return currElement.status_name == name;

        })
        setAppointmentSort(unavailableStatus);

        document.getElementById('btn1').classList.remove("active");
        document.getElementById('btn2').classList.remove("active");
        document.getElementById('btn3').classList.remove("active");
        document.getElementById('btn4').classList.remove("active");
        document.getElementById('btn5').classList.remove("active");
        let element = document.getElementById('btn6').classList.add("active");

    }


    //status dropdown function
    const statusDropdown = (e) => {
        if (e.target.value == 'notattend') {
            notAttendStatus();
        }
        if (e.target.value == 'Waiting') {
            waitingStatus();

        }
        if (e.target.value == 'all') {
            allStatus();
        }
        if (e.target.value == 'attbilling') {
            atBillingStatus();
        }
        if (e.target.value == 'Unavilable') {
            unavailableStatus();
        }
        if (e.target.value == 'withdoctors') {
            withDoctorStatus();
        }

    }




    //gender dropdown  filter functions 

    const allGender = () => {
        const name = "all";
        const allGender = appointment.filter((currElement) => {
            // console.log(currElement);
            return currElement.birth_sex_name !== name;

        })
        setAppointmentSort(allStatus);

    }

    const maleStatus = () => {
        const name = "Male";
        const maleStatus = appointment.filter((currElement) => {
            // console.log(currElement)
            return currElement.birth_sex_name == name;

        })
        setAppointmentSort(maleStatus);

    }

    const femaleStatus = () => {
        const name = "Female";
        const femaleStatus = appointment.filter((currElement) => {
            return currElement.birth_sex_name == name;

        })
        setAppointmentSort(femaleStatus);

    }

    const otherStatus = () => {
        const name = "Others";
        const otherStatus = appointment.filter((currElement) => {
            return currElement.birth_sex_name == name;

        })
        setAppointmentSort(otherStatus);

    }

    const handleGender = (e) => {

        if (e.target.value == 'male') {
            maleStatus();
        }
        if (e.target.value == 'female') {
            femaleStatus();
        }
        if (e.target.value == 'others') {
            otherStatus();

        }
        if (e.target.value == 'all') {
            allGender();

        }

    }


    const handleDoctorChangeFilter = (e) => {
        console.log('changed', e.target.value);
        setDoctorId(e.target.value);

        console.log('doctor value check', doctorId);

    }



    //route change redirect users profile




    const columns = [

        {
            title: "Name", field: "patient_first_name", render: (row) => <div>{row.patient_images !== "" ? <img className="me-2" src={`${global.img_url}/images/files/${row.patient_images}`} width="20px" alt="No Image" /> : <img className="me-2" src={`https://static.thenounproject.com/png/363640-200.png`} width="20px" alt="No Image" />} {row.patient_name}</div>
            , cellStyle: {
                width: 300
            },
        },
        {
            title: "HIN",
            render: (row) =>
                <div>
                    {row.patient_hn_number == null ? "" : row.patient_hn_number}
                </div>
        },
        {
            title: "DATE", field: `StartTime`, render: (row) => <div>{row.StartTime == null ? '' : moment(row.StartTime).format('MM/DD/YYYY')}</div>

        },
        {
            title: "Gender", field: `birth_sex_name`, render: (row) => <div> {row.birth_sex_name}</div>
        },
        {
            title: "BRANCH",

            render: (row) =>
                <div>
                    {row.usual_provider_name === null ? ' ' : row.usual_provider_name}
                </div>
        },

        {
            title: "STATUS", field: "status_name",
            render: (row) => <div className="">{row.status_name === null ? ' ' : row.status_name}</div>
        },
        {


            title: "PRINT", field: "patient", render: (row) => <div>
                {row.status_name === null ? ' ' : row.status_name === "Arrived" &&
                    <>
                        <i class="fa fa-eye " onClick={() => handleWristBandView(row.patient_id)} style={{ fontSize: '15px' }}></i>&nbsp;
                        <i class="fa fa-print" onClick={() => handleWristBandPrint(row.patient_id)} style={{ fontSize: '15px' }}></i>
                    </>
                }</div>

        },
    ];

    // popover 
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setPatientId(event.target.getAttribute("patientid"));

    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    // popover 


    //current date get

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();


    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/patients-profile/${patientId}`;
        navigate(path);
        setPatientId('');
    }
    const [wristBandShowStatus, setWristBandShowStatus] = useState(false);
    const [printPatientInfo, setPrintPatientInfo] = useState();
    // console.log('printPatientInfo check ', printPatientInfo);

    const [PatientPrintId, setPatientPrintId] = useState('');
    const handleWristBandView = (patientId) => {
        console.log("patient id clicked", patientId)
        setPatientPrintId(patientId)
        setWristBandShowStatus(true);
        openModal();

    }


    const wristBandPrint = useReactToPrint({
        content: () => componentRef2.current,
    });

    const handleWristBandPrint = (patientId) => {
        setPatientPrintId(patientId)
        setWristBandShowStatus(true);
        wristBandPrint();
        // alert('print wrist band')
    }
    useEffect(() => {

        axios.get(`/patient-search-by-id/${PatientPrintId}`).then(res => {
            if (res.data.status = 200) {
                setPrintPatientInfo(res.data.patient);

            }

        });
    }, [PatientPrintId])


    const [childCheck, setChildCheck] = useState('')
    console.log('child check', childCheck)


    useEffect(() => {

        if (printPatientInfo) {
            console.log('patient printinfoc chole asche')
            if (printPatientInfo.patient_dob) {
                const diff = Date.now() - Date.parse(printPatientInfo.patient_dob);
                // console.log('diff check',diff)
                const ageDate = new Date(diff);
                let age = Math.abs(ageDate.getUTCFullYear() - 1970);

                // console.log('age check',age)
                let ageeeeee = age < 12;

                if (ageeeeee) {
                    setChildCheck(true)
                }
                else {
                    setChildCheck(false)

                }
            }
        };



    }, [PatientPrintId, printPatientInfo])

    return (
        <>
            <div className='ms-2'>
                <div className="custom-card mt-2 mb-2 p-2">
                    <h5 className="card-title">Appointment List</h5>
                </div>
                <div className='custom-card'>
                    <div className="p-2">
                        <div className="all-app-doc-filter p-1 row">
                            <div className="col-md-5">
                                <input class="form-control form-control-sm" type="text" placeholder="Search" name="liveSearch" onChange={handleSearch} />
                            </div>
                            <div className="col-md-3">
                                <select class="form-select form-select-sm" id="autoSizingSelect" onChange={handleDoctorChangeFilter} value={doctorId}>
                                    <option value="">All Doctors</option>
                                    {
                                        appointmentDoctors.length !== null && appointmentDoctors.map((item, index) => {
                                            return (
                                                <option value={item.id} key={index} >{item.dr_given_name}</option>
                                            )

                                        })
                                    }


                                </select>
                            </div>
                        </div>
                        <div className="all-app-main mt-3 m-1 p-1 row">
                            <div className="col-md-2 all-app-left-sidebar custom-card">
                                <h6 className='mt-2 mb-2'>Appointments</h6>
                                <ul>
                                    <li className='active' id='btn1' onClick={() => allStatus()}><button className="btn-all-app-left" >All</button></li>
                                    <li className='' id="btn2" onClick={() => withDoctorStatus('withdoctor')}><button className="btn-all-app-left" >With Doctors</button></li>
                                    <li className='' id="btn3" onClick={() => notAttendStatus()}><button className="btn-all-app-left" >Didnot Attend</button></li>
                                    <li className='' id="btn4" onClick={() => waitingStatus()}><button className="btn-all-app-left" >Waiting</button></li>
                                    <li className='' id="btn5" onClick={() => atBillingStatus()}><button className="btn-all-app-left" >At Billing</button></li>
                                    <li className='' id="btn6" onClick={() => unavailableStatus()}><button className="btn-all-app-left" >UnAvailable</button></li>

                                </ul>
                            </div>
                            <div className="col-md-8 all-app-middle">

                                <ul className="nav custom-card mx-1 nav-pills mb-2" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Current</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">History</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link " id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Lab Reports</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link " id="pills-contact-tab1" data-bs-toggle="pill" data-bs-target="#pills-contact1" type="button" role="tab" aria-controls="pills-contact1" aria-selected="false">Medical Reports</button>
                                    </li>
                                </ul>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <div className="custom-card mx-1 p-1">
                                            <div className="row all-app-doc-container">
                                                <div className="col-md-6 all-app-doc-img">
                                                    <div className="row">
                                                        <div className="col-4">

                                                            {
                                                                <div>
                                                                    {doctorInfo !== null && doctorInfo.dr_images !== "" ?
                                                                        <img className="me-2" src={`${global.img_url}/doctors/images/${doctorInfo.dr_images}`} width="20px" alt="No Image" /> : <img className="me-2" src={`https://static.thenounproject.com/png/363640-200.png`} width="20px" alt="No Image" />

                                                                    }

                                                                </div>
                                                            }


                                                        </div>
                                                        <div className="col-8 mt-2">

                                                            <h6>{doctorInfo.length > 0 && doctorInfo.dr_given_name == null ? 'Mr Test Shaheb' : doctorInfo.dr_given_name}</h6>
                                                            <span>Heart Surgeon</span> <br />
                                                            <span>{doctorInfo.length > 0 && doctorInfo.department_name == null || undefined ? 'Null Department' : doctorInfo.department_name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 all-app-doc-detail">
                                                    <div className="row mt-2">
                                                        <div className="col-6">
                                                            <h6>Current Workplace</h6>
                                                            <p><i className="fal fa-circle me-2"></i>Honirampur district lorem Ipsum</p>
                                                            <p><i className="fal fa-circle me-2"></i>Monash Medical Centre</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6>Address</h6>
                                                            <p>{doctorInfo !== null && doctorInfo.dr_address_line_1 == null ? 'Null address' : doctorInfo.dr_address_line_1} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="all-app-list-container mt-4" >
                                                <div className="row">
                                                    <div className="col-md-4 all-app-date">
                                                        <h6>All Appointments</h6>

                                                        <p>{today.toLocaleDateString("en-US", options)}</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <select class="form-select form-select-sm" id="autoSizingSelect" onChange={statusDropdown}>
                                                            <option selected>Status</option>
                                                            <option value="all">All</option>
                                                            <option value="notattend">Not Attend</option>
                                                            <option value="Waiting">Waiting</option>
                                                            <option value="withdoctors">With Doctors</option>
                                                            <option value="Unavilable">UnAvailable</option>
                                                            <option value="attbilling">At Billing</option>
                                                            <option value="withdoctors">With Doctors</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <select class="form-select form-select-sm" id="autoSizingSelect" onChange={handleGender}>
                                                            <option selected>Gender</option>
                                                            <option value="all">All</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="others">Others</option>
                                                        </select>
                                                    </div>
                                                    <div className="all-app-list-icon col-md-2">
                                                        <i className="far float-end me-2 fa-print" onClick={handlePrint}></i>
                                                        <i className="fal float-end me-2 fa-file-pdf"></i>
                                                    </div>

                                                </div>
                                                <div className="all-app-table mt-2" ref={componentRef}>
                                                    <div className='' >
                                                        <MaterialTable
                                                            columns={columns}
                                                            data={appointmentSort}
                                                            isLoading={loading === true ? true : false}

                                                            options={{
                                                                search: false,
                                                                toolbar: false,
                                                                showTitle: false,
                                                                searchFieldAlignment: "left",
                                                                pageSize: 20,
                                                                pageSizeOptions: [5, 10, 20, 50, 100],
                                                                emptyRowsWhenPaging: false,
                                                                headerStyle: {
                                                                    backgroundColor: '#EEFFDE',
                                                                },
                                                            }}

                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab text-center">
                                        <h>Upcoming History...!!</h>

                                    </div>
                                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab text-center">
                                        <h5>Upcoming Lab Reports...!!</h5>
                                    </div>
                                    <div class="tab-pane fade" id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact-tab text-center">
                                        <h5>Upcoming Lab Reports...!!</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 all-app-right-sidebar custom-card">
                                <div className="text-center">
                                    <h6 className='mt-2'>Contacts</h6>
                                    <input type="text" class="form-control form-control-sm mb-3" id="colFormLabelSm" placeholder="Search" onChange={patientLiveSearch} />
                                </div>
                                <div className="all-app-right-contact">
                                    <ul>

                                        {
                                            appointmentSort.filter((val) => {
                                                if (searchTerm == "") {
                                                    return val;
                                                } else if (val.patient_name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                                                ) {
                                                    return val;
                                                }
                                            }).map((value, index) => {
                                                return (
                                                    <li className='mb-2' key={index}>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                {value.patient_images !== "" ?
                                                                    <img className="img-fluid me-1 ms-1" src={`${global.img_url}/images/files/${value.patient_images}`} alt="No Image" /> : <img className="img-fluid me-1 ms-3" src={`https://static.thenounproject.com/png/363640-200.png`} width="20px" alt="No Image" />

                                                                }
                                                                {value.patient_name}
                                                            </div>
                                                            <div>
                                                                <i onClick={handleClick} className="fas fa-ellipsis-v ms-2" patientid={value.patient_id}></i>
                                                                <Popper id={id} open={open} anchorEl={anchorEl} placement={'bottom-end'}>
                                                                    <Box sx={{ p: 1, bgcolor: '#ffff' }}>
                                                                        <div className='all-app-list-contact-popover'>
                                                                            <button onClick={routeChange}><i className="far fa-user me-1"></i> Profile</button>
                                                                            <button className='mb-3'><i className="far fa-phone-alt me-1"></i> Make Call</button>
                                                                        </div>
                                                                    </Box>
                                                                </Popper>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );

                                            })
                                        }


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        {
                            childCheck == false && printPatientInfo && <div className='card-body'>
                                <span className='float-end pb-3' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i class="fal fa-times"></i></span>

                                {/* <h5 className=""> <b>Patient Wrist Band </b></h5> */}
                                <div className="row mt-5 mx-5">
                                    <div className="col-12">
                                        <div class="shadow-lg p-1 bg-body rounded rounded-pill main d-flex col-12" id="pills-profile">
                                            <div class="rounded-pill p-4 sub">
                                                <div class="boolet-big">
                                                </div>
                                            </div>


                                            <div class="col-7 d-flex align-items-center  ">
                                                {
                                                    printPatientInfo !== undefined &&
                                                    <>
                                                        <div class="col-4 ">
                                                            <Barcode className="sss" value={printPatientInfo.patient_hn_number}
                                                                displayValue="true" height="60" width='1.7' fontSize='15'
                                                            />
                                                            {/* <Barcode className="sss" value={printPatientInfo.patient_hn_number}
                                                            displayValue="false" height="60" width='1'
                                                        /> */}

                                                        </div>
                                                        <div class="col-3 " style={{ width: '100%', height: '100%', objectFit: 'cover', marginLeft: '10px' }}>

                                                            {printPatientInfo.patient_images !== "" ? <img className="" src={`${global.img_url}/images/files/${printPatientInfo.patient_images}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <img className="" src={`https://static.thenounproject.com/png/363640-200.png`} style={{ width: '100%', height: '100%' }} />}

                                                        </div>
                                                        <div class="col-4 ">
                                                            <b> {printPatientInfo.patient_preferred_name} </b>
                                                            <small class='d-block'>Hn-<span className=''>{printPatientInfo.patient_hn_number} </span></small>
                                                            <small>
                                                                Sex:{printPatientInfo.patient_birth_sex !== undefined ? printPatientInfo.patient_birth_sex.birth_sex_name : ''}
                                                            </small>
                                                            <small class='d-block'>Blood Group: <b>
                                                                {printPatientInfo.blood_group !== undefined ? printPatientInfo.blood_group.blood_group_name : ''}
                                                            </b></small>
                                                            <small className=''>
                                                                DOB:<b>{printPatientInfo.patient_dob} </b>
                                                            </small>

                                                            <b>{printPatientInfo.usual_provider !== undefined ? printPatientInfo.usual_provider.usual_provider_name : ''}</b>
                                                        </div>
                                                        <div class="col-1 mt-5" style={{ width: '100%', height: '100%', objectFit: 'contain', marginLeft: '-15px' }}>
                                                            <QRCode size="70" marginLeft='-8px' value={printPatientInfo.patient_hn_number !== undefined ? printPatientInfo.patient_hn_number : ''} ></QRCode>

                                                        </div>
                                                    </>
                                                }


                                            </div>

                                            <div class="col-5 d-flex justify-content-around align-items-center">
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">

                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {childCheck && printPatientInfo &&
                            <div className='card-body'>
                                <span className='float-end pb-3' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i class="fal fa-times"></i></span>

                                {/* <h5 className=""> <b>Patient Wrist Band </b></h5> */}
                                <div className="row mt-5 mx-5">
                                    <div className="col-12">
                                        <div class="shadow-lg p-1 rounded-pill main d-flex col-12 " style={{ background: '#95E5FF' }} id="pills-profile">
                                            <div class="rounded-pill p-4 sub" style={{ background: '#95E5FF' }} >
                                                <div class="boolet-big">
                                                </div>
                                            </div>


                                            <div class="col-7 d-flex align-items-center  ">
                                                {
                                                    printPatientInfo !== undefined &&
                                                    <>
                                                        <div class="col-4 ">
                                                            <Barcode className="sss" value={printPatientInfo.patient_hn_number}
                                                                displayValue="true" height="60" width='1.7' fontSize='15'

                                                            />
                                                            {/* <Barcode className="sss" value={printPatientInfo.patient_hn_number}
                                                          displayValue="false" height="60" width='1'
                                                      /> */}

                                                        </div>
                                                        <div class="col-3" style={{ width: '100%', height: '100%', objectFit: 'cover', marginLeft: '10px' }}>

                                                            {printPatientInfo.patient_images !== "" ? <img className="" src={`${global.img_url}/images/files/${printPatientInfo.patient_images}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <img className="" src={`https://static.thenounproject.com/png/363640-200.png`} style={{ width: '100%', height: '100%' }} />}

                                                        </div>
                                                        <div class="col-4 ">
                                                            <b> {printPatientInfo.patient_preferred_name} </b>
                                                            <small class='d-block'>Hn-<span className=''>{printPatientInfo.patient_hn_number} </span></small>
                                                            <small>
                                                                Sex:{printPatientInfo.patient_birth_sex !== undefined ? printPatientInfo.patient_birth_sex.birth_sex_name : ''}
                                                            </small>
                                                            <small class='d-block'>Blood Group: <b>
                                                                {printPatientInfo.blood_group !== undefined ? printPatientInfo.blood_group.blood_group_name : ''}
                                                            </b></small>
                                                            <small className=''>
                                                                DOB:<b>{printPatientInfo.patient_dob} </b>
                                                            </small>

                                                            <b>{printPatientInfo.usual_provider !== undefined ? printPatientInfo.usual_provider.usual_provider_name : ''}</b>
                                                        </div>
                                                        <div class="col-1 mt-5" style={{ width: '100%', height: '100%', objectFit: 'contain', marginLeft: '-15px' }}>
                                                            <QRCode size="70" marginLeft='-8px' value={printPatientInfo.patient_hn_number !== undefined ? printPatientInfo.patient_hn_number : ''} ></QRCode>

                                                        </div>
                                                    </>
                                                }


                                            </div>

                                            <div class="col-5 d-flex justify-content-around align-items-center" >
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">

                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>
                                                <div class="boolet">
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        }
                    </Modal>




                </div>
            </div>
            <div className='hide-wrist mx-5 mt-3 px-5'>
                <div class="shadow-lg p-1 bg-body rounded rounded-pill main d-flex col-12  " ref={componentRef2}>
                    <div class="rounded-pill p-4 sub">
                        <div class="boolet-big">
                        </div>
                    </div>


                    <div class="col-7 d-flex align-items-center  ">
                        {
                            printPatientInfo !== undefined &&
                            <>
                                <div class="col-4 ">
                                    <Barcode className="sss" value={printPatientInfo.patient_hn_number}
                                        displayValue="true" height="60" width='1.7' fontSize='15'
                                    />
                                    {/* <Barcode className="sss" value={printPatientInfo.patient_hn_number}
                                                            displayValue="false" height="60" width='1'
                                                        /> */}

                                </div>
                                <div class="col-3 " style={{ width: '100%', height: '100%', objectFit: 'cover', marginLeft: '10px' }}>

                                    {printPatientInfo.patient_images !== "" ? <img className="" src={`${global.img_url}/images/files/${printPatientInfo.patient_images}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <img className="" src={`https://static.thenounproject.com/png/363640-200.png`} style={{ width: '100%', height: '100%' }} />}

                                </div>
                                <div class="col-4 ">
                                    <b> {printPatientInfo.patient_preferred_name} </b>
                                    <small class='d-block'>Hn-<span className=''>{printPatientInfo.patient_hn_number} </span></small>
                                    <small>
                                        Sex:{printPatientInfo.patient_birth_sex !== undefined ? printPatientInfo.patient_birth_sex.birth_sex_name : ''}
                                    </small>
                                    <small class='d-block'>Blood Group: <b>
                                        {printPatientInfo.blood_group !== undefined ? printPatientInfo.blood_group.blood_group_name : ''}
                                    </b></small>
                                    <small className=''>
                                        DOB:<b>{printPatientInfo.patient_dob} </b>
                                    </small>

                                    <b>{printPatientInfo.usual_provider !== undefined ? printPatientInfo.usual_provider.usual_provider_name : ''}</b>
                                </div>
                                <div class="col-1 mt-5" style={{ width: '100%', height: '100%', objectFit: 'contain', marginLeft: '-15px' }}>
                                    <QRCode size="70" marginLeft='-8px' value={printPatientInfo.patient_hn_number !== undefined ? printPatientInfo.patient_hn_number : ''} ></QRCode>

                                </div>
                            </>
                        }


                    </div>

                    <div class="col-5 d-flex justify-content-around align-items-center">
                        <div class="boolet">
                        </div>
                        <div class="boolet">
                        </div>
                        <div class="boolet">
                        </div>
                        <div class="boolet">
                        </div>
                        <div class="boolet">

                        </div>
                        <div class="boolet">
                        </div>
                        <div class="boolet">
                        </div>
                        <div class="boolet">
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default AppointmentList;