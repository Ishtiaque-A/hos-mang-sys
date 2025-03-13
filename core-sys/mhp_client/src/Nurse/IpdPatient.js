
import React from 'react';
import "./IpdPatient.css";
import { useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Admission from '../Images/admission.png';
import Billing from '../Images/billing.png'
import RoomBooking from '../Images/room booking.png';
import AvailableRooms from '../Images/available rooms.png';
import Visit from '../Images/visit.png';
import HealthCare from '../Images/health care.png';
import Appointment from '../Images/appointment-icon.png';
import add_new_patient_icon from '../Images/add_new_patient_icon.png';
import ConsentTextEditor from './ConsentTextEditor';
import ConsentSinature from './ConsentSinature';
import { TextField, IconButton } from '@material-ui/core';
import { AirlineSeatLegroomExtraOutlined, SearchOutlined } from '@material-ui/icons';
import room104 from '../Images/room104.jpg';
import roomIcon from '../Images/roomIcon.png';
import allroom_tab from '../Images/allroom_tab.png';
import list_thumnail_tab from '../Images/list_thumnail_tab.png';
import RoomDetails from './RoomDetails';

const IpdPatient = () => {


    const [showBackMan, setShowBackMan] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showAllNotes, setShowAllNotes] = useState(false);
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <div className="ehr-anatomy-popup">
                    <div className="ehr-anatomy-header d-flex align-items-center">
                        <i style={{ backgroundColor: "#8CBB98", color: "#fff", fontSize: "30px" }} className="fad fa-file-alt me-2"></i><p>ID-HIN-2205</p>
                    </div>
                    <div className="ehr-anatomy-popup-detail">
                        <p>Complaint: <span style={{ fontWeight: 500 }}>Disturb sleep, arm weakness</span> </p>
                        <p>Letest update: 21.01.20</p>
                    </div>
                    <button onClick={() => { setShowNotes(true); setShowAllNotes(false) }} className="btn w-100">Show Notes</button>

                </div>
            </Popover.Body>
        </Popover>
    );

    const [checkRender, setCheckRender] = useState('');
    console.log('checkinnng', checkRender);
    const [healthInsuranceCheckbox, setHealthInsuranceCheckbox] = useState(false);
    const handleChangeHealthInsurance = (e) => {
        // alert("checked health")
        setHealthInsuranceCheckbox(!healthInsuranceCheckbox);
        if (e.target.checked) {
            setCheckRender('healthChecked');
            var x = document.getElementById("paid").checked = false;
        }
        else {
            setCheckRender('');

        }
    };

    const [paidPersonallyCheckbox, setPaidPersonallyCheckbox] = useState(false);
    const handleChangePaidPersonally = (e) => {
        // alert("checked paid")
        setPaidPersonallyCheckbox(!paidPersonallyCheckbox);
        if (e.target.checked) {
            setCheckRender('paidChecked');
            var x = document.getElementById("health").checked = false;
        }
        else {
            setCheckRender('');
        }
    };


    const [payAccount, setPayAccount] = useState([
        { id: 1, account_name: "Cheque" },
        { id: 2, account_name: "Cash" },
        { id: 3, account_name: "Credit Card" },
        { id: 4, account_name: "Dabit Card" },
        { id: 5, account_name: "Mobile Wallet" },
        { id: 6, account_name: "Internet Bankintg" },
        { id: 7, account_name: "Electronic Bank Transfers" },
    ]);

    const [allRoom, setAllRoom] = useState([
        { id: 1, room_img: room104, room_no: "103", flat_no: "1st floor", flat_square: "220 SqFt" },
        { id: 2, room_img: room104, room_no: "104", flat_no: "2nd floor", flat_square: "220 SqFt" },
        { id: 3, room_img: room104, room_no: "105", flat_no: "3rd floor", flat_square: "220 SqFt" },
        { id: 4, room_img: room104, room_no: "106", flat_no: "4th floor", flat_square: "220 SqFt" },
        { id: 5, room_img: room104, room_no: "107", flat_no: "5th floor", flat_square: "220 SqFt" },
        { id: 6, room_img: room104, room_no: "108", flat_no: "1st floor", flat_square: "220 SqFt" },
        { id: 7, room_img: room104, room_no: "109", flat_no: "1st floor", flat_square: "220 SqFt" },
        { id: 8, room_img: room104, room_no: "100", flat_no: "1st floor", flat_square: "220 SqFt" },
        { id: 9, room_img: room104, room_no: "111", flat_no: "1st floor", flat_square: "220 SqFt" },
        { id: 10, room_img: room104, room_no: "112", flat_no: "1st floor", flat_square: "220 SqFt" },
        { id: 11, room_img: room104, room_no: "112", flat_no: "1st floor", flat_square: "220 SqFt" },
        { id: 12, room_img: room104, room_no: "112", flat_no: "1st floor", flat_square: "220 SqFt" },
    ])

    return (
        <div className='ms-2 mt-2'>
            <div className="custom-card flex-grow-1">
                <div className="p-2 d-flex justify-content-between mb-2">
                    <h5 className="fw-normal  text-login">IPD-In Patient</h5>
                    <div className="w-25">
                        <select className="form-select" id="autoSizingSelect">
                            <option selected>Select</option>
                            <option value="1">1</option>
                            <option value="1">2</option>
                            <option value="1">3</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='custom-card'>
                <div className="row m-2 p-2">
                    <div className="col-2 new-rx-container user-role-sidebar" >
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button className="nav-link active mb-2" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><img src={Admission} alt="" className='me-2' /> Admission</button>
                            <button className="nav-link mb-2" id="v-pills-billing-tab" data-bs-toggle="pill" data-bs-target="#v-pills-billing" type="button" role="tab" aria-controls="v-pills-billing" aria-selected="false"><img src={Billing} alt="" className='me-2' /> Billing</button>
                            <button className="nav-link mb-2" id="v-pills-room-booking-tab" data-bs-toggle="pill" data-bs-target="#v-pills-room-booking" type="button" role="tab" aria-controls="v-pills-room-booking" aria-selected="false"><img src={RoomBooking} alt="" className='me-2' />Room Booking</button>
                            <button className="nav-link mb-2" id="v-pills-available-rooms-tab" data-bs-toggle="pill" data-bs-target="#v-pills-available-rooms" type="button" role="tab" aria-controls="v-pills-available-rooms" aria-selected="false"><img src={AvailableRooms} alt="" className='me-2' />Available Rooms</button>
                            <button className="nav-link mb-2" id="v-pills-visit-tab" data-bs-toggle="pill" data-bs-target="#v-pills-visit" type="button" role="tab" aria-controls="v-pills-visit" aria-selected="false"><img src={Visit} alt="" className='me-2' />Visit</button>
                            <button className="nav-link mb-2" id="v-pills-healthcare-tab" data-bs-toggle="pill" data-bs-target="#v-pills-healthcare" type="button" role="tab" aria-controls="v-pills-healthcare" aria-selected="false"><img src={HealthCare} alt="" className='me-2' />Health Care</button>
                            <button className="nav-link mb-2" id="v-pills-appointment-tab" data-bs-toggle="pill" data-bs-target="#v-pills-appointment" type="button" role="tab" aria-controls="v-pills-appointment" aria-selected="false"><img src={Appointment} alt="" className='me-2' />Appointment</button>
                        </div>
                    </div>
                    <div className="col-10 user-role-container">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <div className="user-role-content-head mb-2 p-2">
                                    <div className="row g-3 d-flex justify-content-between">
                                        <div className="col-4">
                                            <div className="row mb-3">
                                                <label htmlFor="inputEmail3" className="col-sm-4 col-form-label col-form-label-sm">Search by</label>
                                                <div className="col-sm-8">
                                                    <input type="email" className="form-control form-control-sm" id="inputEmail3" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">

                                        </div>
                                        <div className="col-4">
                                            <button type="button" className="btn idm-add-btn float-end"><img src={add_new_patient_icon} style={{ width: "20px", height: "20px" }} /><span className="m-2">Add New Patient</span></button>
                                        </div>
                                    </div>
                                    <div className="ipd-container">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">All</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-vital-reading-tab" data-bs-toggle="pill" data-bs-target="#pills-vital-reading" type="button" role="tab" aria-controls="pills-vital-reading" aria-selected="false">Vital Reading</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-admission-details-tab" data-bs-toggle="pill" data-bs-target="#pills-admission-details" type="button" role="tab" aria-controls="pills-admission-details" aria-selected="false">Admission Details</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-case-history-tab" data-bs-toggle="pill" data-bs-target="#pills-case-history" type="button" role="tab" aria-controls="pills-case-history" aria-selected="false">Case History</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-payment-details-tab" data-bs-toggle="pill" data-bs-target="#pills-payment-details" type="button" role="tab" aria-controls="pills-payment-details" aria-selected="false">Payment Details</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-consent-tab" data-bs-toggle="pill" data-bs-target="#pills-consent" type="button" role="tab" aria-controls="pills-consent" aria-selected="false">Consent</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">...</div>
                                            <div className="tab-pane fade" id="pills-vital-reading" role="tabpanel" aria-labelledby="pills-vital-reading-tab">
                                                <div className="border rounded">
                                                    <h1>vital reading</h1>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-admission-details" role="tabpanel" aria-labelledby="pills-admission-details-tab">
                                                <div className="border rounded">
                                                    <div className="row p-2 mb-2">
                                                        <div className="col-6">
                                                            <div className="row mb-3">
                                                                <label htmlFor="inputAdmissionDate" className="col-sm-4 col-form-label col-form-label-sm text-end pr-3">Admission Date</label>
                                                                <div className="col-sm-8">
                                                                    <input type="date" className="form-control form-control-sm" id="inputAdmissionDate" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row mb-3">
                                                                <label htmlFor="inputTime" className="col-sm-4 col-form-label col-form-label-sm text-end pr-3">Time</label>
                                                                <div className="col-sm-8">
                                                                    <input type="time" className="form-control form-control-sm" id="inputTime" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row mb-3">
                                                                <label htmlFor="inputAge" className="col-sm-4  col-form-label col-form-label-sm text-end pr-3">Age</label>
                                                                <div className="col-md-8">
                                                                    <select id="inputAge" className="form-select form-select-sm">
                                                                        <option selected>Select</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row mb-3">
                                                                <label htmlFor="inputSex" className="col-sm-4 col-form-label col-form-label-sm text-end pr-3">Sex</label>
                                                                <div className="col-md-8">
                                                                    <select id="inputSex" className="form-select form-select-sm">
                                                                        <option selected>Select</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row mb-3">
                                                                <label htmlFor="inputDoctor" className="col-sm-4  col-form-label col-form-label-sm text-end pr-3">Consultant Doctor</label>
                                                                <div className="col-md-8">
                                                                    <select id="inputDoctor" className="form-select form-select-sm">
                                                                        <option selected>Select</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row mb-3">
                                                                <label htmlFor="inputReference" className="col-sm-4 col-form-label col-form-label-sm text-end pr-3">Reference by</label>
                                                                <div className="col-sm-8">
                                                                    <input type="email" className="form-control form-control-sm" id="inputReference" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row mb-3">
                                                                <label htmlFor="inputCategory" className="col-sm-4 col-form-label col-form-label-sm text-end pr-3">Bed Category</label>
                                                                <div className="col-md-8">
                                                                    <select id="inputCategory" className="form-select form-select-sm">
                                                                        <option selected>Select</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row mb-3">
                                                                <label htmlFor="inputNumber" className="col-sm-4 col-form-label col-form-label-sm text-end pr-3">Bed Number</label>
                                                                <div className="col-md-8">
                                                                    <select id="inputNumber" className="form-select form-select-sm">
                                                                        <option selected>Select</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row mb-2">
                                                                <label htmlFor="floatingRemarks2" className="col-sm-2 col-form-label col-form-label-sm text-end pr-3">Remarks</label>
                                                                <div className="col-sm-10">
                                                                    <textarea className="form-control" placeholder="Write here ..." id="floatingRemarks2" rows="3"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-2">
                                                            <div className="float-end ">
                                                                <button className="ipd-btn me-3">Save</button>
                                                                <button className="ipd-btn-cancel">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-case-history" role="tabpanel" aria-labelledby="pills-case-history-tab">
                                                <div className="row g-3">
                                                    <div className="col-6">
                                                        <div className="border rounded p-2">
                                                            <h6>Symptoms</h6>
                                                            <div className="border rounded p-2">
                                                                <h6>Previous known history</h6>
                                                                <hr className="pre-history" />
                                                                <div className="row g-2">
                                                                    <div className="col-6">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                                                            <label className="form-check-label" for="flexCheckDefault1">
                                                                                Alphaviruses
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2" />
                                                                            <label className="form-check-label" for="flexCheckChecked2">
                                                                                Headaches
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3" />
                                                                            <label className="form-check-label" for="flexCheckDefault3">
                                                                                Mumps
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault4" />
                                                                            <label className="form-check-label" for="flexCheckDefault4">
                                                                                Alphaviruses
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked5" />
                                                                            <label className="form-check-label" for="flexCheckChecked5">
                                                                                Headaches
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault6" />
                                                                            <label className="form-check-label" for="flexCheckDefault6">
                                                                                Mumps
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="pt-2">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <label htmlFor="floatingNotes2" className="col-form-label col-form-label-sm">Notes</label>
                                                                        <textarea className="form-control" placeholder="Write here ..." id="floatingNotes2" rows="3"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="border rounded p-2">
                                                            <h6>Symptoms Details</h6>
                                                            <div className="pt-0">
                                                                <div className="">

                                                                    <TransformWrapper>
                                                                        {({ zoomIn, zoomOut, doubleClick, resetTransform, ...rest }) => (
                                                                            <React.Fragment>
                                                                                <div className="tools">
                                                                                    <button className='zoom-button' onClick={() => zoomIn()}><i className="fas fa-search-plus"></i></button>
                                                                                    <button className='zoom-button' onClick={() => zoomOut()}><i className="fas fa-search-minus"></i></button>
                                                                                    <button className='zoom-button' onClick={() => resetTransform()}><i className="fas fa-sync-alt"></i></button>
                                                                                </div>
                                                                                <div className="ehr-anatomy">
                                                                                    <TransformComponent>

                                                                                        {
                                                                                            showBackMan ?
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="43 18 150 260">
                                                                                                    {/* head part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 115.42488,44.187071 c -1.05686,-0.07291 -2.81102,-0.162909 -4.15638,-0.213237 -0.90355,-0.0338 -3.61571,-0.03373 -4.55539,2.01e-4 -0.94608,0.03408 -2.08901,0.08528 -2.81471,0.126098 l -0.57582,0.03239 -0.0968,-0.09437 c -0.43417,-0.423244 -1.03558,-1.799035 -1.66279,-3.803844 -0.26243,-0.838834 -0.66903,-2.233214 -0.82238,-2.820236 l -0.024,-0.09202 -0.0941,0.03297 c -0.12757,0.04471 -0.3755,0.02821 -0.49408,-0.03288 -0.1251,-0.06445 -0.259724,-0.218884 -0.35292,-0.404849 -0.100996,-0.201524 -0.14512,-0.321101 -0.255387,-0.692063 -0.119132,-0.400806 -0.157843,-0.494649 -0.477757,-1.15834 -0.417141,-0.865373 -0.504976,-1.163863 -0.50475,-1.715233 0,-0.280195 0.0089,-0.377367 0.04632,-0.515539 0.09897,-0.364919 0.294019,-0.626501 0.562188,-0.753947 0.190635,-0.0906 0.347912,-0.118819 0.595279,-0.106822 l 0.210685,0.01022 -0.0075,-0.402899 c -0.01435,-0.765526 0.05453,-2.13095 0.153492,-3.042575 0.28062,-2.585001 0.90289,-4.778993 1.75837,-6.199599 1.01678,-1.688447 2.53464,-2.799172 4.52421,-3.310681 0.97566,-0.250836 1.87348,-0.328033 3.5357,-0.304012 1.66806,0.0241 2.33926,0.08816 3.20318,0.305678 2.39742,0.603637 4.1452,2.275278 5.08832,4.866659 0.50539,1.38863 0.86437,3.305181 1.00716,5.377055 0.047,0.682053 0.0848,2.026921 0.0673,2.397619 l -0.0148,0.314832 0.24003,-0.01089 c 0.40863,-0.01854 0.65487,0.06736 0.88347,0.308192 0.39256,0.413565 0.46152,1.221638 0.17488,2.049149 -0.0801,0.231284 -0.15811,0.411295 -0.45269,1.044657 -0.0883,0.189901 -0.20023,0.470576 -0.24867,0.623721 -0.0484,0.153146 -0.12268,0.387812 -0.16499,0.52148 -0.10097,0.319058 -0.20778,0.527811 -0.34424,0.672806 -0.14782,0.15706 -0.24765,0.194358 -0.48714,0.182002 -0.10155,-0.0052 -0.19779,-0.01382 -0.21387,-0.01907 -0.0215,-0.007 -0.078,0.184655 -0.21381,0.725562 -0.69626,2.773124 -1.38933,4.615605 -2.12833,5.658042 -0.1349,0.190299 -0.40557,0.480902 -0.44327,0.475919 -0.0125,-0.0016 -0.21229,-0.01608 -0.44394,-0.03207 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/* throt part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 115.14593,51.91769 c -1.45528,-0.09965 -2.8731,-0.177988 -4.29861,-0.237498 -0.88802,-0.03707 -4.01401,-0.03715 -4.96548,-2e-4 -1.0186,0.03964 -2.58244,0.112586 -2.72456,0.127097 l -0.1199,0.01224 0.0141,-0.752418 c 0.0148,-0.793534 0.0464,-1.467417 0.13794,-2.946579 0.0743,-1.199904 0.25357,-3.704721 0.26608,-3.717291 0.0208,-0.02096 1.9519,-0.114021 3.33523,-0.160733 0.40843,-0.01379 1.40097,-0.02515 2.20565,-0.02524 1.99732,-2e-4 3.06231,0.03835 6.31769,0.22879 0.21946,0.01284 0.43044,0.02815 0.46886,0.03403 l 0.0698,0.01069 0.0139,0.272283 c 0.008,0.149756 0.063,1.715753 0.12302,3.479993 0.06,1.76424 0.11457,3.325492 0.12117,3.469449 l 0.012,0.26174 -0.11619,-0.0027 c -0.0639,-0.0015 -0.45119,-0.02566 -0.86065,-0.0537 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/* nape of neck part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 95.797132,55.865572 c 1.041075,-0.525733 2.132486,-1.132689 3.108835,-1.728885 0.601963,-0.367578 0.81961,-0.484038 2.209893,-1.182499 0.73762,-0.370571 1.41594,-0.716119 1.50738,-0.767888 l 0.16626,-0.09413 0.98644,-0.04814 c 4.32394,-0.210998 6.35039,-0.185666 11.37604,0.142209 l 1.19014,0.07765 0.35049,0.200983 c 0.35046,0.200967 0.75277,0.405029 2.6448,1.341522 0.55474,0.274578 1.33281,0.67987 1.72905,0.900651 0.85007,0.473647 1.72341,0.946956 2.25471,1.221941 0.20986,0.108619 0.37944,0.199426 0.37685,0.201796 -0.003,0.0024 -0.23915,-0.0092 -0.52566,-0.0258 -1.09246,-0.06314 -2.92722,-0.150754 -4.16746,-0.199001 -1.88039,-0.07315 -3.88888,-0.124516 -6.17594,-0.157941 l -0.99987,-0.01461 -0.0238,-0.103818 c -0.16033,-0.697997 -0.80726,-1.245772 -1.70052,-1.439891 -0.22389,-0.04866 -0.67215,-0.06582 -0.90419,-0.03462 -0.77545,0.104264 -1.43567,0.492274 -1.75092,1.029011 -0.0818,0.139297 -0.19339,0.447086 -0.19339,0.533471 0,0.03691 -0.0158,0.04342 -0.1053,0.04354 -0.20621,2.68e-4 -2.11356,0.04424 -2.89838,0.06679 -2.6672,0.07666 -5.756757,0.215235 -8.456838,0.37932 -0.396239,0.02408 -0.729766,0.04379 -0.741171,0.0438 -0.01141,9e-6 0.322761,-0.173452 0.742601,-0.385468 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    {/* back part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 95.197071,95.955086 c -6.65e-4,-1.996124 -0.399032,-4.409223 -1.529965,-9.264211 -0.159817,-0.686089 -0.345072,-1.488016 -0.411674,-1.782056 -0.130131,-0.574548 -0.198973,-0.837252 -0.354967,-1.354609 -0.09736,-0.322916 -0.100378,-0.342316 -0.141975,-0.913308 -0.127744,-1.753401 -0.275631,-4.144835 -0.353598,-5.717942 -0.107634,-2.171632 -0.134194,-3.086778 -0.148725,-5.123426 -0.0264,-3.701589 0.08494,-6.1083 0.603372,-13.042456 0.06779,-0.906623 0.127618,-1.669826 0.132958,-1.696009 0.0071,-0.03461 0.03245,-0.05182 0.09304,-0.06307 0.121506,-0.02255 0.621215,-0.192788 0.938769,-0.31982 l 0.275098,-0.110049 0.399012,-0.02486 c 3.487418,-0.217276 6.626884,-0.363093 9.642794,-0.44787 0.90628,-0.02548 2.74821,-0.06663 2.99507,-0.06692 l 0.15766,-2e-4 0.0149,-0.165752 c 0.0484,-0.536727 0.32991,-0.905948 0.91594,-1.201351 0.66529,-0.335362 1.50138,-0.345085 2.17322,-0.02528 0.40234,0.191522 0.65032,0.38891 0.79776,0.635006 0.0733,0.12239 0.15617,0.39672 0.17321,0.573601 l 0.0156,0.161499 0.21327,2.68e-4 c 0.4657,5.34e-4 3.10397,0.04475 3.97063,0.06653 2.53073,0.0636 5.19432,0.174495 7.72532,0.32162 l 0.88669,0.05154 0.1995,0.09441 c 0.27564,0.130441 0.82116,0.356464 1.08062,0.447734 0.17605,0.06193 0.2161,0.08427 0.21613,0.120566 0,0.0245 0.0647,0.891587 0.14372,1.926853 0.39854,5.221332 0.54268,7.685234 0.6125,10.469605 0.0281,1.120613 0.0145,4.22635 -0.0232,5.279354 -0.0912,2.551419 -0.19575,4.446761 -0.45575,8.264308 -0.0556,0.816068 -0.0914,1.211499 -0.12426,1.369959 -0.0254,0.122515 -0.20047,0.889358 -0.38912,1.704096 -0.97222,4.198837 -1.35391,6.221939 -1.53817,8.152927 -0.0134,0.140898 -0.0299,0.661068 -0.0366,1.155938 l -0.0122,0.899769 -0.2134,-0.01382 c -3.71502,-0.240625 -6.13766,-0.353095 -9.45718,-0.439028 -0.47548,-0.01231 -1.87203,-0.02848 -3.10342,-0.03591 -3.62198,-0.02189 -6.73765,0.04741 -10.70682,0.238139 -1.452823,0.06981 -4.428494,0.243438 -5.192708,0.302988 l -0.182881,0.01425 v -0.443011 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/*upper arm  part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 128.40385,93.264968 c 0,-0.0057 -0.46907,-1.983441 -1.04237,-4.394903 l -1.04236,-4.38449 0.078,-1.10265 c 0.3918,-5.539352 0.5213,-8.459684 0.52108,-11.750459 0,-3.460771 -0.13476,-6.137711 -0.64183,-12.771572 -0.0718,-0.938887 -0.12781,-1.709755 -0.12454,-1.713041 0.0122,-0.01227 0.83966,0.22333 1.31873,0.375476 0.49407,0.156917 1.27791,0.427991 1.97517,0.68307 0.79907,0.292332 1.9469,0.722209 2.07264,0.776228 0.0731,0.03143 0.24957,0.105908 0.39205,0.165511 1.70899,0.714945 3.25891,2.087815 4.28441,3.794998 0.2384,0.396874 0.79257,1.453186 0.99429,1.895222 0.63524,1.392058 0.93419,2.712051 1.03674,4.577668 0.0172,0.313319 0.0218,0.814003 0.0132,1.447926 -0.013,0.957762 -0.0261,1.212641 -0.13544,2.628537 -0.08,1.036077 -0.1264,1.804076 -0.19175,3.174295 -0.0128,0.269542 -0.0289,1.161686 -0.0357,1.982545 -0.0136,1.646323 0,2.096899 0.10385,3.508432 0.11836,1.604202 0.2724,4.132919 0.43219,7.09483 0.0861,1.596698 0.18238,3.45066 0.17942,3.456207 -0.001,0.0019 -0.33104,-0.0051 -0.73337,-0.01559 -2.66321,-0.06939 -4.76137,0.0272 -7.55906,0.347969 -0.6686,0.07666 -1.7356,0.20637 -1.82327,0.221653 -0.0396,0.0069 -0.072,0.0079 -0.072,0.0021 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 88.968169,93.226649 c -2.205505,-0.283268 -3.701807,-0.425991 -5.397747,-0.514871 -0.322781,-0.01691 -1.148822,-0.02804 -2.100353,-0.0283 l -1.568343,-6.69e-4 v -0.120877 c 7e-6,-0.634137 0.437411,-8.119132 0.598246,-10.237349 0.06769,-0.89151 0.08744,-1.32592 0.102692,-2.258709 0.02705,-1.654095 -0.06576,-3.990817 -0.257569,-6.48453 -0.09405,-1.222766 -0.110626,-1.599932 -0.110639,-2.517156 0,-2.578504 0.32975,-4.157398 1.312064,-6.281764 0.133137,-0.287918 0.323273,-0.713942 0.422527,-0.946722 0.605474,-1.420019 1.20906,-2.391536 1.944552,-3.129882 0.731887,-0.734727 1.544861,-1.164607 2.715914,-1.436111 0.724852,-0.168052 0.773964,-0.183534 1.307875,-0.412273 1.426681,-0.611218 3.016617,-1.223638 3.923617,-1.511325 0.4875,-0.154628 0.834022,-0.253487 0.846072,-0.241378 0.0055,0.0056 -0.04541,0.740444 -0.113246,1.633042 -0.337498,4.441075 -0.45905,6.414478 -0.571279,9.274632 -0.03833,0.97676 -0.0384,5.195472 0,6.237209 0.09782,2.661263 0.273849,5.804176 0.480324,8.576171 l 0.0307,0.412097 -0.904533,3.775748 c -0.497495,2.076657 -1.042825,4.354585 -1.211839,5.062058 l -0.307313,1.286318 -0.0665,-0.003 c -0.03658,-0.0017 -0.520378,-0.06133 -1.075117,-0.132572 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/*elbo  part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 83.570422,102.64961 c -0.575449,-0.0237 -1.135508,-0.0582 -1.80664,-0.11125 -0.867778,-0.0687 -2.77953,-0.26599 -2.801123,-0.28914 -0.01177,-0.0126 0.05493,-0.32913 0.276076,-1.31006 0.264618,-1.173723 0.357515,-1.651819 0.439891,-2.263924 0.07528,-0.559304 0.08991,-0.908683 0.09005,-2.149612 0,-1.096843 0.01921,-1.765497 0.08899,-3.116971 0.01229,-0.238005 0.02571,-0.436128 0.02983,-0.440265 0.0041,-0.0041 0.475357,-0.01375 1.047187,-0.02135 2.150701,-0.0286 3.976414,0.07457 6.592615,0.372542 0.892424,0.101644 2.485146,0.305193 2.499291,0.319401 0.0069,0.0069 -0.06981,0.356029 -0.170431,0.775777 -0.680694,2.839378 -0.700771,2.98343 -0.811032,5.819782 -0.08334,2.14387 -0.09299,2.33252 -0.120122,2.34937 -0.01465,0.009 -0.237871,0.0235 -0.496039,0.0319 -0.258174,0.008 -0.758688,0.0247 -1.112259,0.0361 -0.751904,0.0242 -3.137032,0.0227 -3.746276,-0.002 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 130.22157,102.64867 c -0.35966,-0.0113 -0.66462,-0.0243 -0.67768,-0.0289 -0.0249,-0.009 -0.0494,-0.45804 -0.10979,-2.01765 -0.13707,-3.538346 -0.15653,-3.69946 -0.74112,-6.136971 -0.12047,-0.502321 -0.21236,-0.919357 -0.20421,-0.926748 0.008,-0.0074 0.31908,-0.0501 0.69094,-0.09491 2.20125,-0.265277 3.49506,-0.384029 5.05415,-0.463895 0.61002,-0.03125 3.40041,-0.03752 3.99398,-0.009 l 0.36963,0.01777 0.0131,0.159202 c 0.0437,0.530308 0.0812,1.828722 0.0809,2.79888 -6.6e-4,2.070322 0.0462,2.469896 0.55214,4.711322 0.18756,0.83099 0.31037,1.41682 0.31037,1.48058 0,0.0321 -0.13426,0.0517 -1.04741,0.15258 -1.65723,0.1831 -2.56347,0.2634 -3.84049,0.3403 -0.52402,0.0316 -3.60977,0.0436 -4.44455,0.0174 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/*lower back  part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 109.17369,115.85841 c -0.34188,-0.0499 -0.74459,-0.20123 -0.99343,-0.37327 -0.1709,-0.11817 -0.34292,-0.29036 -0.44657,-0.44703 -0.1042,-0.1575 -0.23956,-0.47991 -0.27892,-0.66433 l -0.0229,-0.10715 -0.34831,0.006 c -4.78099,0.0852 -9.380415,0.29104 -14.524324,0.6499 -0.310896,0.0217 -0.569676,0.0359 -0.575062,0.0316 -0.0087,-0.007 0.0906,-0.55991 0.545037,-3.03619 0.250047,-1.36249 0.433433,-1.9919 1.031818,-3.54129 0.749411,-1.94043 0.918479,-2.49666 1.13739,-3.74195 0.419608,-2.38699 0.440955,-2.6524 0.477345,-5.9361 0.01234,-1.114171 0.0247,-2.027787 0.02746,-2.030253 0.01729,-0.01547 3.258152,-0.210913 4.7599,-0.287043 8.297586,-0.420657 14.858396,-0.370136 23.488226,0.180875 l 0.60046,0.03834 0.0149,1.660965 c 0.0289,3.212536 0.064,3.682156 0.43776,5.848806 0.25149,1.45799 0.39077,1.94816 1.00648,3.54184 0.76664,1.9844 0.95505,2.59852 1.17552,3.83144 0.0438,0.24502 0.19875,1.09338 0.3443,1.88521 0.14555,0.79184 0.26463,1.45358 0.26463,1.47055 0,0.0258 -0.14599,0.0211 -0.89223,-0.0288 -4.83795,-0.32364 -9.27515,-0.50601 -13.28476,-0.54598 l -1.4862,-0.0148 -0.0243,0.0983 c -0.11528,0.46656 -0.18848,0.62635 -0.3937,0.8595 -0.19951,0.22667 -0.53061,0.43323 -0.88734,0.55357 -0.31846,0.10742 -0.80322,0.14825 -1.15328,0.0971 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/*fore arm  part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 82.587615,132.39968 c -0.650761,-0.0753 -1.191476,-0.12445 -1.876779,-0.17042 -0.447871,-0.03 -2.473076,-0.0367 -2.995469,-0.01 l -0.335396,0.0172 -0.01682,-1.1543 c -0.01882,-1.292 -0.0019,-3.3007 0.03303,-3.92763 0.03382,-0.60643 0.07971,-1.27857 0.189345,-2.77333 0.387035,-5.27673 0.480064,-7.88585 0.389987,-10.9374 -0.09582,-3.24604 0.177747,-6.84883 0.765372,-10.07977 0.170737,-0.93878 0.143611,-0.83617 0.219363,-0.82988 0.03623,0.003 0.390068,0.0402 0.786306,0.0827 1.28549,0.1377 2.311217,0.22393 3.347265,0.28138 1.090673,0.0605 3.325159,0.0595 5.037985,-0.002 0.43612,-0.0157 0.796461,-0.0246 0.800763,-0.0197 0.0043,0.005 -6.65e-4,0.17422 -0.01056,0.37637 -0.129626,2.59157 -0.417772,4.43069 -1.029557,6.57134 -0.08929,0.31242 -0.228382,0.79859 -0.309102,1.08038 -0.252328,0.88092 -0.379613,1.42423 -0.566224,2.41692 -0.155302,0.82615 -0.459575,2.03406 -1.144699,4.54425 -1.149188,4.21049 -1.547754,5.75514 -1.914014,7.41783 -0.416974,1.89292 -0.590564,3.08134 -0.689818,4.72246 -0.0296,0.48946 -0.03646,1.98043 -0.01049,2.27769 0.01374,0.15718 0.01129,0.19431 -0.01266,0.19178 -0.01634,-0.002 -0.31236,-0.0359 -0.657832,-0.0759 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 135.17392,132.44209 c 0.0561,-0.52485 0.0728,-1.76448 0.0347,-2.56966 -0.13468,-2.84353 -0.54584,-4.80461 -2.52668,-12.05118 -0.90885,-3.32482 -1.08786,-4.0351 -1.29445,-5.13601 -0.17228,-0.91811 -0.27895,-1.34405 -0.71092,-2.83871 -0.60161,-2.08159 -0.86711,-3.47595 -1.04133,-5.4687 -0.0443,-0.50643 -0.10392,-1.46337 -0.092,-1.47539 0.005,-0.005 0.35237,0.001 0.77134,0.0148 0.9675,0.031 3.15346,0.0317 3.882,10e-4 1.36153,-0.057 2.69205,-0.17112 4.77,-0.40904 0.35357,-0.0405 0.64564,-0.0716 0.64905,-0.0691 0.0118,0.009 0.13958,0.71602 0.23725,1.31376 0.3179,1.94571 0.5051,3.7501 0.61357,5.91421 0.0327,0.65183 0.0373,2.89523 0.01,4.81157 -0.0343,2.40351 0.0617,4.73079 0.37594,9.11078 0.15383,2.14434 0.20485,2.92578 0.23012,3.52428 0.0257,0.60793 0.0314,3.59525 0.009,4.50613 l -0.0145,0.57917 -1.11049,0.001 c -1.29014,0.002 -1.93675,0.0373 -3.23856,0.17869 -0.5033,0.0547 -1.31577,0.15268 -1.48212,0.17878 l -0.0856,0.0134 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/*bottom back part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 96.161463,138.98116 c -1.493429,-0.0622 -3.3032,-0.25773 -5.719171,-0.61801 l -0.70935,-0.10578 -0.01382,-0.48912 c -0.03562,-1.26125 -0.0077,-4.17336 0.04765,-4.96592 0.01285,-0.18413 0.108006,-1.15674 0.21145,-2.16138 0.194432,-1.88824 0.747968,-7.18386 0.785841,-7.51807 0.0118,-0.10414 0.02155,-0.27728 0.02165,-0.38477 6.65e-4,-0.525 0.197199,-1.98826 0.566431,-4.21351 0.181683,-1.09495 0.561702,-3.2699 0.573387,-3.28163 0.01313,-0.0132 2.146365,-0.1559 3.903427,-0.2611 3.642201,-0.2181 7.472032,-0.37303 10.552592,-0.4269 l 0.86547,-0.0151 0.0252,0.10989 c 0.16182,0.70446 0.80524,1.25111 1.70192,1.44597 0.22389,0.0487 0.67216,0.0658 0.90419,0.0346 0.77546,-0.10426 1.43566,-0.49227 1.75092,-1.02901 0.0818,-0.1393 0.1934,-0.44709 0.1934,-0.53347 0,-0.042 0.0201,-0.0434 0.60406,-0.0433 2.07299,6.6e-4 6.25336,0.12624 9.27148,0.27885 1.99311,0.10077 5.63117,0.32567 5.65326,0.34946 0.0174,0.0187 0.50487,2.85969 0.6853,3.99375 0.27392,1.72168 0.38511,2.62991 0.43363,3.54185 0.0191,0.35813 0.18601,2.10096 0.7756,8.0962 0.0982,0.99795 0.18912,1.96527 0.20218,2.14962 0.0135,0.19086 0.0286,1.41009 0.035,2.83183 l 0.0113,2.49667 -0.17404,0.0254 c -0.0957,0.014 -0.55162,0.0807 -1.01311,0.14831 -2.5149,0.3685 -4.23429,0.53079 -5.94414,0.56105 -3.53031,0.0625 -6.29992,-0.61368 -8.65287,-2.11248 -0.7258,-0.46233 -1.38951,-0.99576 -2.07039,-1.66401 -0.2602,-0.25538 -0.34932,-0.35655 -0.34932,-0.39658 0,-0.14439 0.1473,-0.97086 0.28045,-1.57355 0.0429,-0.19399 0.0731,-0.35754 0.0672,-0.36344 -0.006,-0.006 -0.0524,6.7e-4 -0.10337,0.0143 -0.21095,0.0571 -0.59909,0.0925 -1.14797,0.10477 -0.52919,0.0118 -0.58606,0.01 -0.6241,-0.0251 -0.0356,-0.0324 -0.0488,-0.0337 -0.0883,-0.009 -0.0381,0.0239 -0.0547,0.024 -0.0925,0 -0.036,-0.0226 -0.0531,-0.0231 -0.0782,-0.002 -0.0515,0.043 -0.90445,-0.0191 -1.7139,-0.12463 -0.13925,-0.0182 -0.2565,-0.0297 -0.26056,-0.0256 -0.004,0.004 0.0216,0.12681 0.057,0.27276 0.11564,0.47672 0.20689,0.95178 0.29034,1.5115 l 0.0463,0.31055 -0.21703,0.2204 c -1.6109,1.63586 -3.64632,2.78923 -5.94137,3.36667 -1.60995,0.40507 -3.498238,0.56643 -5.603172,0.47881 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/*hand part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 129.81226,154.72386 c -0.0289,-0.0291 -0.0803,-0.10677 -0.11413,-0.17264 -0.0872,-0.16977 -0.10118,-0.49065 -0.0324,-0.74268 0.0261,-0.0956 0.0446,-0.17551 0.0412,-0.1776 -0.003,-0.002 -0.0499,-0.0229 -0.10316,-0.0462 -0.20561,-0.0899 -0.36988,-0.31731 -0.42636,-0.5901 -0.0543,-0.26214 0.0146,-0.62259 0.15754,-0.8243 l 0.0476,-0.0672 -0.0905,-0.13627 c -0.21916,-0.32979 -0.21943,-0.75103 -7.4e-4,-1.19022 0.10595,-0.21281 0.31896,-0.49015 0.37235,-0.4848 0.0204,0.002 0.13122,0.0405 0.24634,0.0856 0.14205,0.0556 0.26028,0.0857 0.36803,0.0939 0.43842,0.0333 0.94816,-0.22883 1.47563,-0.75889 0.15687,-0.15763 0.3886,-0.34089 0.90765,-0.71782 1.1204,-0.8136 1.40569,-1.04658 1.78488,-1.45756 0.39349,-0.42648 0.44673,-0.52582 0.62866,-1.1729 0.30067,-1.06948 0.40921,-1.69278 0.41059,-2.35781 10e-4,-0.61734 -0.0448,-0.78225 -0.28699,-1.02751 -0.25494,-0.25815 -0.75988,-0.45089 -1.38571,-0.52892 -0.34446,-0.043 -0.81917,-0.0692 -0.89679,-0.0497 -0.12308,0.031 -0.10833,0.20428 0.019,0.22345 0.0378,0.006 0.21828,0.0155 0.40116,0.0218 0.18288,0.006 0.45221,0.0321 0.59852,0.0574 0.2512,0.0433 0.56518,0.12055 0.62619,0.15399 0.0176,0.01 -0.0241,0.0494 -0.11475,0.10927 -0.25623,0.16928 -0.46848,0.46063 -0.72158,0.99046 -0.25066,0.52474 -0.34344,0.7945 -0.57823,1.68111 -0.5355,2.02213 -0.85781,2.93844 -1.23551,3.51245 -0.1161,0.17644 -0.48186,0.5559 -0.68623,0.71193 -0.2846,0.21728 -0.63957,0.37036 -0.8588,0.37036 -0.11523,0 -0.51265,-0.15047 -0.6565,-0.24856 -0.06,-0.0409 -0.14888,-0.13239 -0.19741,-0.20322 -0.0854,-0.1246 -0.0882,-0.13475 -0.0881,-0.31187 6.7e-4,-0.53326 0.1516,-1.04834 0.57014,-1.9419 0.43917,-0.93762 0.51824,-1.1094 0.61675,-1.33988 0.15376,-0.35974 0.29642,-0.81239 0.33218,-1.05396 0.0174,-0.11736 0.0466,-0.38514 0.065,-0.59506 0.10612,-1.21176 0.57486,-4.01464 0.87669,-5.24235 0.0601,-0.24469 0.12186,-0.43394 0.18521,-0.56803 0.22394,-0.47396 0.80018,-1.32451 1.76374,-2.60333 0.54928,-0.72898 0.69763,-0.95305 0.88726,-1.34008 0.12282,-0.25066 0.16378,-0.36213 0.20872,-0.56804 0.0731,-0.33473 0.11381,-0.5787 0.16899,-1.01211 0.0249,-0.19523 0.0475,-0.35729 0.0503,-0.36012 0.008,-0.008 1.25815,-0.16006 1.712,-0.20769 1.35777,-0.14249 2.55904,-0.19806 3.63443,-0.16812 l 0.58845,0.0164 v 0.8299 c 0,0.45645 0.0124,1.08416 0.0274,1.39489 0.0337,0.69516 0.0388,0.55065 -0.0813,2.34703 -0.2071,3.09949 -0.30047,4.77192 -0.30096,5.39074 0,0.23278 -0.0103,0.54352 -0.0224,0.69054 -0.0465,0.56252 -0.19888,1.5082 -0.30925,1.91925 -0.0579,0.21577 -0.0964,0.2696 -0.95582,1.33647 -0.99462,1.23474 -1.07486,1.34675 -1.55345,2.16843 -0.2443,0.41945 -0.66857,1.20239 -1.03811,1.91572 -0.3555,0.68622 -0.51002,0.95543 -0.6162,1.07353 -0.26755,0.29759 -1.96372,1.6442 -2.73117,2.16828 -0.41785,0.28536 -0.75209,0.42305 -1.67363,0.68941 -0.85076,0.24591 -1.43673,0.368 -1.76621,0.368 -0.17842,0 -0.20272,-0.005 -0.25023,-0.0529 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 88.19231,155.1437 c -0.01829,-0.004 -0.108066,-0.0185 -0.199506,-0.0332 -0.552425,-0.0885 -1.753338,-0.42246 -2.327423,-0.64727 -0.301268,-0.11798 -0.508907,-0.23536 -0.871163,-0.49245 -0.741318,-0.52612 -2.059626,-1.5703 -2.437537,-1.93068 -0.160244,-0.15282 -0.283651,-0.34622 -0.570661,-0.89435 -0.563305,-1.07578 -0.684631,-1.30393 -0.882521,-1.65954 -0.309088,-0.55544 -0.734714,-1.26615 -0.880333,-1.47 -0.152303,-0.21318 -0.670453,-0.8681 -1.207404,-1.52609 -0.717071,-0.87871 -0.698118,-0.84757 -0.79928,-1.31375 -0.153899,-0.70923 -0.241868,-1.43845 -0.264745,-2.19468 -0.01791,-0.59198 -0.04702,-0.98522 -0.199479,-2.69537 -0.08135,-0.91257 -0.143292,-1.71648 -0.191353,-2.48375 -0.04688,-0.74835 -0.0527,-2.02085 -0.01145,-2.50226 0.02026,-0.23645 0.03122,-0.75509 0.03325,-1.57385 l 0.0031,-1.22119 0.365761,-0.0171 c 0.56679,-0.0265 2.445737,-0.0206 2.915002,0.009 0.7672,0.0488 2.038319,0.16921 2.529603,0.23965 l 0.0912,0.0131 0.01471,0.18171 c 0.03014,0.37216 0.08553,0.81685 0.148891,1.19524 0.154152,0.92063 0.268774,1.15031 1.184221,2.37304 1.096152,1.46408 1.673888,2.33218 1.830441,2.75039 0.250559,0.66933 0.869048,4.17837 1.007079,5.71373 0.07924,0.8814 0.170877,1.16124 0.853467,2.60626 0.445962,0.9441 0.615163,1.38383 0.685708,1.78207 0.03519,0.19867 0.05339,0.56399 0.03534,0.70922 -0.01464,0.11778 -0.02272,0.13205 -0.10387,0.18352 -0.04839,0.0307 -0.169826,0.0915 -0.269852,0.13504 -0.100032,0.0436 -0.233621,0.1033 -0.296878,0.13273 -0.190881,0.0888 -0.439186,0.0664 -0.725816,-0.0654 -0.217661,-0.10014 -0.45903,-0.28496 -0.746338,-0.5715 -0.368967,-0.368 -0.503773,-0.59393 -0.784185,-1.31438 -0.233076,-0.59882 -0.438122,-1.27276 -0.809908,-2.66195 -0.215393,-0.80485 -0.345983,-1.17511 -0.581374,-1.64841 -0.252255,-0.50719 -0.536451,-0.8721 -0.767286,-0.9852 l -0.09646,-0.0473 0.184669,-0.0586 c 0.273277,-0.0867 0.643155,-0.14362 1.116602,-0.17169 0.231647,-0.0137 0.433646,-0.0347 0.448889,-0.0465 0.03527,-0.0274 0.03596,-0.13256 0.0011,-0.16758 -0.03342,-0.0336 -0.41192,-0.0356 -0.730285,-0.004 -0.539929,0.0538 -0.90724,0.14414 -1.238174,0.30457 -0.167206,0.0811 -0.243171,0.13482 -0.36874,0.26092 -0.14391,0.14453 -0.163801,0.17583 -0.220979,0.34769 -0.06134,0.18439 -0.06282,0.20025 -0.06216,0.6678 6.65e-4,0.38209 0.01033,0.53821 0.04839,0.77209 0.07185,0.44154 0.191552,0.9794 0.306561,1.37752 0.05663,0.19603 0.105931,0.38148 0.109569,0.4121 0.02577,0.21693 0.229046,0.5524 0.553409,0.91331 0.394763,0.43924 0.729314,0.71241 1.986667,1.62215 0.324729,0.23495 0.606405,0.45171 0.625957,0.48169 0.06051,0.0928 0.458485,0.43632 0.660331,0.56997 0.244907,0.16217 0.483304,0.26165 0.704689,0.29408 0.215346,0.0315 0.362948,0.008 0.635287,-0.10206 l 0.192097,-0.0775 0.05792,0.0688 c 0.216324,0.25691 0.374978,0.54571 0.437344,0.7961 0.02607,0.10466 0.03299,0.20342 0.02498,0.35641 -0.01202,0.22967 -0.0533,0.35456 -0.172114,0.52081 l -0.06679,0.0935 0.07882,0.15508 c 0.135891,0.2674 0.170944,0.4831 0.121273,0.7463 -0.05086,0.26951 -0.21514,0.50365 -0.421536,0.60079 -0.125422,0.059 -0.121599,0.0406 -0.05756,0.27732 0.0853,0.31525 0.02486,0.67295 -0.142215,0.84179 l -0.08266,0.0835 -0.185487,-0.003 c -0.102021,-10e-4 -0.20045,-0.006 -0.218738,-0.009 z" />
                                                                                                    </OverlayTrigger>

                                                                                                    {/*thigh part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 99.597401,187.06102 c -1.381306,-0.0443 -3.102637,-0.25352 -4.555386,-0.55373 -0.50485,-0.10433 -0.991478,-0.21914 -1.010697,-0.23844 -0.0063,-0.006 0.0094,-0.12045 0.03503,-0.2535 0.09377,-0.48714 0.142966,-1.97024 0.143259,-4.31836 6.65e-4,-2.62988 -0.06391,-3.69052 -0.29628,-4.89212 -0.489594,-2.53177 -2.214443,-13.41142 -3.03674,-19.15457 -0.415052,-2.8988 -0.596962,-4.34163 -0.676864,-5.36845 -0.150328,-1.932 -0.309234,-5.84508 -0.411142,-10.12433 -0.03822,-1.60498 -0.07001,-3.51256 -0.05872,-3.5239 0.0059,-0.006 0.537748,0.0651 1.181807,0.15803 2.73391,0.39425 4.222929,0.53404 5.992408,0.56255 0.876975,0.0141 1.55485,-0.007 2.305404,-0.0719 3.49647,-0.30244 6.27217,-1.50557 8.5735,-3.71618 0.10079,-0.0968 0.18692,-0.17199 0.19141,-0.16706 0.0101,0.011 0.0704,0.67906 0.10746,1.18956 0.038,0.52358 0.0374,3.18244 -9.3e-4,3.8203 -0.10911,1.81702 -0.25936,3.25605 -0.54775,5.24594 -0.46768,3.22694 -0.84914,7.72655 -1.10191,12.9979 -0.0371,0.77249 -0.0371,3.20528 -10e-6,4.03192 0.0156,0.34917 0.0533,1.21625 0.0836,1.92685 0.18514,4.33642 0.54527,11.42065 0.69132,13.59935 0.0681,1.01649 0.0801,1.93818 0.0319,2.46147 -0.0824,0.89499 -0.22247,1.97366 -0.41663,3.20771 -0.10953,0.69616 -0.38096,2.28628 -0.39216,2.2974 -0.002,0.002 -0.15398,0.0511 -0.33687,0.10824 -1.90362,0.5949 -4.06734,0.85321 -6.495024,0.77537 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 118.12929,187.06102 c -0.7101,-0.0228 -1.78628,-0.11449 -2.58249,-0.22011 -0.80981,-0.10743 -2.06042,-0.33382 -2.60419,-0.47142 l -0.1547,-0.0392 -0.12748,-0.72396 c -0.39373,-2.23611 -0.65152,-4.1195 -0.72859,-5.32314 -0.0288,-0.45032 -0.02,-0.88734 0.033,-1.63803 0.14107,-1.9964 0.61105,-11.42245 0.7769,-15.5819 0.087,-2.18284 0.0886,-2.37448 0.0328,-3.96508 -0.0958,-2.72899 -0.38315,-6.83895 -0.69777,-9.97954 -0.1373,-1.3706 -0.23084,-2.15022 -0.40891,-3.4082 -0.35442,-2.50389 -0.50301,-4.03316 -0.57899,-5.95876 -0.0287,-0.72684 -0.0148,-2.58063 0.0234,-3.12974 0.0305,-0.43776 0.0877,-1.09939 0.10466,-1.20854 l 0.013,-0.0836 0.22477,0.21726 c 2.29467,2.21794 5.07776,3.42775 8.59435,3.73598 0.72023,0.0631 1.4295,0.085 2.30319,0.071 1.36206,-0.0218 2.51421,-0.10879 4.18962,-0.31635 0.51883,-0.0643 2.57267,-0.35282 2.86004,-0.40182 l 0.078,-0.0133 -0.006,0.38634 c -0.0895,5.96243 -0.32032,11.97161 -0.53925,14.04138 -0.1049,0.99174 -0.35004,2.83577 -0.67665,5.09001 -0.84075,5.80262 -2.37187,15.45138 -2.93569,18.50002 -0.14942,0.80793 -0.18369,1.05156 -0.23197,1.64919 -0.0685,0.84746 -0.0817,1.25546 -0.0936,2.88675 -0.0154,2.10358 0.0372,4.23321 0.11607,4.69736 0.0177,0.10414 0.0322,0.20132 0.0322,0.21596 0,0.0616 -1.25982,0.42791 -2.00607,0.58321 -1.51291,0.31486 -3.20558,0.44601 -5.00982,0.38816 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/*bottom leg part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 99.032134,237.58234 c -0.572675,-0.0201 -1.459459,-0.11321 -2.086746,-0.21913 -0.178438,-0.0301 -0.330561,-0.0548 -0.338049,-0.0548 -0.0075,0 -0.01375,-0.22804 -0.01391,-0.50677 -0.0015,-2.59584 -0.352168,-5.51907 -1.077498,-8.9827 -0.271215,-1.29511 -0.67189,-3.28723 -0.992383,-4.93408 -1.479742,-7.6036 -2.378756,-13.06437 -2.539598,-15.42596 -0.09171,-1.34649 -0.09207,-4.5975 -7.31e-4,-6.64931 0.177447,-3.98697 0.673199,-7.99633 1.474974,-11.92867 0.149869,-0.73504 0.492547,-2.31899 0.504238,-2.33074 0.0046,-0.005 0.178678,0.0315 0.386895,0.0802 2.638693,0.61752 5.542482,0.84627 8.041174,0.63349 1.31814,-0.11226 2.73338,-0.38323 3.80888,-0.72927 l 0.17344,-0.0558 -0.0148,0.0928 c -0.0361,0.22625 -0.37917,1.94821 -0.48671,2.44292 -0.0652,0.30016 -0.13431,0.66604 -0.15348,0.81306 -0.15431,1.18325 -0.26888,3.38442 -0.4122,7.91903 -0.0863,2.72972 -0.14101,4.21661 -0.18987,5.15684 -0.24339,4.68464 -1.37314,18.54573 -1.94903,23.91303 -0.0524,0.48818 -0.0846,1.16511 -0.14775,3.10747 -0.042,1.29079 -0.0368,3.53405 0.01,4.24353 0.0667,1.01488 0.19753,2.64436 0.22568,2.81158 0.01,0.0591 0.005,0.0622 -0.21634,0.13105 -1.1838,0.3686 -2.50797,0.52466 -4.00604,0.47218 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 118.49505,237.58234 c -0.3182,-0.0112 -1.03423,-0.0717 -1.40763,-0.11907 -0.33395,-0.0423 -1.14467,-0.17377 -1.15949,-0.18798 -0.004,-0.004 0.0184,-0.27077 0.0491,-0.59372 0.0609,-0.63953 0.12243,-1.40507 0.18412,-2.29128 0.0329,-0.47218 0.0395,-0.86122 0.039,-2.30554 0,-0.97543 -0.0128,-2.06481 -0.0285,-2.48375 -0.0694,-1.85561 -0.0961,-2.34806 -0.15967,-2.95153 -0.61804,-5.86361 -1.72861,-19.57392 -1.94966,-24.06896 -0.0303,-0.61711 -0.0768,-1.89242 -0.15591,-4.27695 -0.1283,-3.86903 -0.18794,-5.31557 -0.27782,-6.73842 -0.0782,-1.2374 -0.14766,-1.84272 -0.27875,-2.42805 -0.1133,-0.50591 -0.50808,-2.49062 -0.49751,-2.50123 0.004,-0.004 0.19089,0.0321 0.41458,0.081 2.52899,0.55317 5.27712,0.74953 7.65541,0.547 1.39104,-0.11847 2.77945,-0.3914 3.95319,-0.77713 0.17476,-0.0574 0.32266,-0.0995 0.32869,-0.0934 0.0253,0.0255 0.53505,2.44668 0.72531,3.44542 0.95831,5.03039 1.40638,9.99494 1.35806,15.04728 -0.0228,2.38035 -0.0657,3.02196 -0.33679,5.03432 -0.4818,3.57644 -1.93245,11.55221 -3.21288,17.66468 -0.74367,3.55004 -1.07269,6.0974 -1.11635,8.64299 l -0.0145,0.84648 -0.12192,0.0404 c -0.23831,0.0789 -0.88042,0.23572 -1.19586,0.2921 -0.83332,0.14898 -1.80561,0.21 -2.79426,0.17536 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/*foot part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 99.976828,263.72688 c -1.14547,-0.13185 -2.37577,-0.74112 -3.785925,-1.87486 -0.57177,-0.45971 -1.371769,-1.18407 -2.002328,-1.813 -0.285214,-0.28449 -0.395966,-0.46227 -0.524721,-0.8423 -0.148751,-0.439 -0.181231,-0.68889 -0.182754,-1.40575 -7.98e-4,-0.36753 0.01018,-0.72436 0.02668,-0.86875 0.08186,-0.71648 0.184117,-1.302 0.414301,-2.37237 0.07773,-0.36143 0.14806,-0.70726 0.156306,-0.76851 0.05193,-0.38589 0.24776,-1.10597 1.163073,-4.27695 1.132509,-3.92341 1.44429,-5.08057 1.446498,-5.36846 0.0017,-0.21311 -0.05546,-0.33685 -0.313483,-0.67941 -0.495374,-0.65769 -0.72428,-1.12606 -0.776644,-1.58915 -0.06761,-0.59797 0.209348,-1.36914 0.74153,-2.06469 0.09068,-0.11854 0.09515,-0.13192 0.11876,-0.35642 0.04142,-0.39365 0.08886,-1.0611 0.105053,-1.47802 l 0.01541,-0.39669 0.06853,0.0143 c 0.355194,0.0739 1.235061,0.18652 1.86409,0.23862 0.435442,0.0361 1.749836,0.0363 2.161316,0 0.9017,-0.0788 1.73776,-0.23348 2.40904,-0.44583 l 0.20339,-0.0643 0.0125,0.10271 c 0.007,0.0565 0.033,0.27313 0.0581,0.4814 0.0446,0.37002 0.1006,0.74136 0.12336,0.81792 0.006,0.0211 0.11305,0.11751 0.23732,0.21432 0.25087,0.19549 0.48809,0.43344 0.64086,0.64283 0.21751,0.29816 0.41506,0.77177 0.48599,1.16509 0.0481,0.26671 0.0365,0.97539 -0.0212,1.292 -0.0687,0.3775 -0.18361,0.77483 -0.34931,1.20817 -0.16572,0.43337 -0.2334,0.7066 -0.29114,1.17533 -0.0563,0.45734 -0.0558,2.17879 8e-4,2.86244 0.11421,1.37798 0.37491,3.40973 0.75744,5.90307 0.26734,1.74247 0.31885,2.31349 0.33697,3.73502 0.0298,2.33597 -0.17229,3.45544 -0.81889,4.53708 -0.64664,1.08171 -1.64905,1.79064 -3.00946,2.12834 -0.17678,0.0439 -0.4112,0.0953 -0.52093,0.11432 -0.24811,0.0429 -0.71898,0.0589 -0.950611,0.0322 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className="anatomy-bg" d="m 118.51722,263.73581 c -0.33175,-0.0425 -0.90377,-0.18411 -1.2998,-0.32177 -0.32525,-0.11307 -0.86202,-0.37472 -1.12753,-0.54965 -1.07551,-0.70853 -1.78645,-1.86711 -2.02653,-3.30249 -0.1356,-0.81078 -0.18609,-2.02394 -0.13441,-3.22999 0.0464,-1.08307 0.11098,-1.69211 0.33181,-3.12946 0.75954,-4.94377 0.95221,-7.26396 0.74179,-8.93287 -0.048,-0.38073 -0.10926,-0.62512 -0.24287,-0.96899 -0.19473,-0.50114 -0.30884,-0.89751 -0.39118,-1.35882 -0.0473,-0.26477 -0.0401,-1.05447 0.0117,-1.29199 0.15644,-0.71751 0.53138,-1.29022 1.14801,-1.75355 l 0.19194,-0.14421 0.0349,-0.18906 c 0.0192,-0.10398 0.0568,-0.37116 0.0835,-0.59372 0.0267,-0.22255 0.0514,-0.40842 0.0549,-0.41301 0.003,-0.005 0.1239,0.0128 0.26767,0.0386 2.2739,0.4082 4.48235,0.34411 6.2711,-0.18192 l 0.1797,-0.0529 0.0151,0.41414 c 0.0164,0.45097 0.063,1.12963 0.11051,1.60974 0.0292,0.29499 0.0326,0.30759 0.10742,0.40096 0.20886,0.26065 0.46657,0.70737 0.59115,1.02471 0.13534,0.34474 0.16683,0.51032 0.16662,0.87604 0,0.30564 -0.005,0.35004 -0.0619,0.52083 -0.13691,0.41412 -0.29056,0.69209 -0.63988,1.15758 -0.13472,0.17952 -0.27587,0.39157 -0.31365,0.4712 -0.10094,0.21273 -0.0941,0.38187 0.0367,0.91331 0.18478,0.75069 0.55767,2.08378 1.22297,4.37226 0.7624,2.62246 1.17432,4.10451 1.24579,4.48235 0.0209,0.11026 0.0819,0.416 0.13568,0.67941 0.27165,1.3308 0.31483,1.55434 0.36803,1.90458 0.10082,0.66381 0.13244,1.03778 0.1337,1.58157 0.001,0.54821 -0.0214,0.78999 -0.10943,1.16514 -0.083,0.35363 -0.21698,0.65234 -0.40383,0.89999 -0.0794,0.10525 -0.83436,0.8334 -1.31513,1.26844 -1.67932,1.51963 -3.11189,2.35988 -4.42008,2.5925 -0.19488,0.0347 -0.80981,0.0608 -0.96428,0.0411 z" />
                                                                                                    </OverlayTrigger>
                                                                                                </svg>
                                                                                                :
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="43 18 150 260">
                                                                                                    {/* head part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 107.00141,50.663111 c -1.17613,-0.447416 -2.41874,-1.021268 -2.76135,-1.275228 -0.88463,-0.655723 -1.59258,-1.994085 -2.44096,-4.614511 -0.40544,-1.252338 -0.81989,-2.386893 -0.92099,-2.521234 -0.1011,-0.134341 -0.48503,-0.966963 -0.85317,-1.850269 -0.691208,-1.658458 -0.70046,-2.836162 -0.0223,-2.836162 0.23492,0 0.3828,-0.421971 0.48384,-1.380676 0.55465,-5.262807 1.732,-7.794007 4.33471,-9.319298 1.88751,-1.106151 6.98201,-1.234892 9.37076,-0.236805 2.85468,1.192761 4.49068,4.221417 5.01946,9.292315 0.13514,1.295919 0.25399,1.619991 0.63021,1.718372 0.34654,0.09062 0.46365,0.333189 0.46365,0.960297 0,0.86097 -0.86022,2.985561 -1.50523,3.717643 -0.19901,0.225874 -0.64624,1.329128 -0.99386,2.451677 -1.24695,4.026742 -1.73088,4.599643 -5.05383,5.982991 -2.2432,0.933849 -3.09663,0.920625 -5.75096,-0.08911 z" />
                                                                                                    </OverlayTrigger>

                                                                                                    {/*Throt part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 107.39934,59.893248 c -2.03671,-0.210766 -5.76899,-0.903344 -6.16756,-1.144482 -0.12336,-0.07463 0.36288,-0.416069 1.08053,-0.758745 l 1.30482,-0.62305 0.15066,-2.517017 c 0.0829,-1.384362 0.16391,-3.072494 0.18009,-3.751407 l 0.0294,-1.234384 2.45724,0.964608 c 3.3484,1.314436 3.76687,1.344876 6.07188,0.441696 1.0538,-0.412914 2.18613,-0.90198 2.51629,-1.086815 l 0.60029,-0.336066 0.24012,3.763909 0.24012,3.763907 1.42813,0.758349 1.42813,0.758348 -0.96975,0.261126 c -2.8375,0.764061 -7.32677,1.077755 -10.59041,0.740023 z" />
                                                                                                    </OverlayTrigger>

                                                                                                    {/* Chest part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 115.50294,84.836595 c -1.80696,-0.29587 -3.51804,-1.178331 -4.77989,-2.465161 l -1.05806,-1.079017 -1.06767,0.939801 c -0.58722,0.516892 -1.67786,1.169036 -2.42364,1.44921 -3.01282,1.131854 -7.326136,1.512015 -9.76008,0.860219 -1.737445,-0.465278 -3.957733,-1.660869 -4.891571,-2.634041 l -0.809576,-0.84367 0.415953,-5.361094 c 0.228775,-2.948602 0.593083,-7.069948 0.809573,-9.158546 l 0.393623,-3.797451 1.493507,-0.599156 c 0.82143,-0.329537 2.53184,-1.169855 3.800914,-1.867374 l 2.307405,-1.268217 2.276222,0.550284 c 5.07332,1.226492 10.42486,1.340903 15.13517,0.323576 l 2.44216,-0.527457 1.44464,0.877572 c 1.85035,1.124024 4.23254,2.203326 5.65199,2.560745 0.61248,0.154228 1.1777,0.384121 1.25604,0.510874 0.35122,0.568286 0.79974,7.516728 0.80457,12.464347 0.005,5.134882 -0.0218,5.464719 -0.49249,6.063138 -1.15971,1.474338 -4.20959,2.566926 -8.43712,3.022517 -2.60727,0.280981 -2.66851,0.280695 -4.51167,-0.02111 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/* upper arm part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 83.878835,106.69509 c -0.687084,-0.11464 -1.819769,-0.40563 -2.51708,-0.64665 l -1.267837,-0.43822 0.06336,-1.90654 c 0.03485,-1.0486 0.242396,-4.932018 0.461215,-8.629828 0.416258,-7.034296 0.47884,-10.730427 0.296783,-17.528579 -0.0954,-3.562386 -0.05153,-4.250106 0.344612,-5.402644 0.638323,-1.857119 2.151693,-4.820544 2.940506,-5.757996 0.712933,-0.847274 3.095501,-2.069396 5.882072,-3.017171 l 1.691989,-0.575482 -0.148004,1.13359 c -0.338196,2.590313 -1.111763,11.680454 -1.240764,14.580173 l -0.138867,3.121528 1.208466,3.39567 c 0.664654,1.867617 1.168075,3.436055 1.118712,3.485421 -0.278049,0.278049 -3.496767,15.033498 -3.618987,16.590398 l -0.146087,1.86091 -1.840424,-0.0281 c -1.012233,-0.0154 -2.402583,-0.12187 -3.089665,-0.23651 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 130.53924,106.21434 c -0.0693,-0.44849 -0.17141,-1.52767 -0.22687,-2.39819 -0.0555,-0.87051 -0.84036,-4.634339 -1.74421,-8.364058 l -1.64337,-6.781305 1.28206,-3.780216 1.28206,-3.780215 -0.15253,-7.545362 c -0.0839,-4.149949 -0.2164,-8.123461 -0.29448,-8.830029 -0.16548,-1.497409 -0.35959,-1.490195 2.93945,-0.109239 2.5877,1.083194 3.65039,2.036814 4.85936,4.360599 1.68161,3.232272 1.79664,4.03239 1.61023,11.200241 -0.11847,4.555156 -0.0615,7.865875 0.21058,12.2454 0.20512,3.301289 0.37765,7.137167 0.3834,8.524174 0.006,1.387 0.1,2.98466 0.20934,3.55035 0.16265,0.84109 0.12758,1.06668 -0.19242,1.23794 -0.9521,0.50955 -3.46971,1.00033 -5.83277,1.13703 l -2.56381,0.14831 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    {/* upper abdomen part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 100.37554,101.16964 c -1.782874,-0.10882 -3.584927,-0.25869 -4.004563,-0.33305 -0.819817,-0.14528 -0.864693,-0.24611 -1.175532,-2.64121 -0.469084,-3.614429 -2.515128,-11.301751 -4.07824,-15.32261 -0.123377,-0.317368 0.224623,-0.180763 1.284338,0.504165 2.136703,1.381017 4.519745,2.08685 7.013526,2.077329 3.617441,-0.01381 7.688581,-1.178137 9.618241,-2.750779 l 0.61383,-0.500263 0.91287,0.860953 c 1.14557,1.080411 2.36597,1.707565 4.28296,2.200989 3.3288,0.856819 10.77274,-0.347592 13.0061,-2.104354 0.34112,-0.268326 0.62022,-0.427553 0.62022,-0.353837 0,0.07372 -0.49253,1.567286 -1.09451,3.319044 -1.21653,3.540057 -2.59896,9.195211 -3.04068,12.438529 l -0.28886,2.121024 -1.08959,0.14117 c -4.38354,0.56793 -16.00224,0.74437 -22.58011,0.3429 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/* middle abdomen part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 103.13689,119.76746 c -3.342884,-0.27081 -8.709192,-1.03742 -10.039419,-1.4342 -0.551896,-0.16461 -0.450067,-0.7074 0.827366,-4.4102 1.080421,-3.13174 1.636523,-6.56996 1.643664,-10.16231 l 0.0047,-2.3585 2.821381,0.19744 c 3.676968,0.2573 18.491518,0.25441 22.571048,-0.004 l 3.18156,-0.20185 v 3.6024 c 0,4.07192 0.33044,6.19609 1.40738,9.0473 0.79184,2.09635 1.32093,3.95496 1.1691,4.10679 -0.22199,0.22199 -7.25348,1.27944 -10.09323,1.5179 -2.77846,0.23332 -11.08616,0.29467 -13.49353,0.0997 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/* fore arm part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 79.787658,139.25189 c -0.824197,-0.17905 -1.60758,-0.39295 -1.740853,-0.47531 -0.312008,-0.19283 -0.30631,-4.20508 0.01126,-7.92524 0.135282,-1.58477 0.341932,-6.50118 0.459222,-10.92535 0.172407,-6.50323 0.3109,-8.57136 0.723066,-10.79764 0.280397,-1.51454 0.547836,-2.79173 0.594303,-2.83819 0.04647,-0.0465 0.810956,0.13989 1.698863,0.41414 0.887907,0.27424 2.912112,0.62562 4.498237,0.78083 l 2.88386,0.2822 -0.15156,2.13518 c -0.154785,2.18051 -1.261134,7.05887 -3.634594,16.02642 -1.665024,6.2909 -2.042387,8.38098 -2.042387,11.31205 v 2.37465 l -0.900441,-0.0191 c -0.495243,-0.0105 -1.574782,-0.16559 -2.398978,-0.34465 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 136.31343,138.33176 c 0.19633,-2.10245 -0.27178,-5.72257 -1.21567,-9.40136 -0.4405,-1.71684 -1.25243,-4.9044 -1.80429,-7.08346 -0.55186,-2.17907 -1.20954,-4.71831 -1.46152,-5.64277 -0.63934,-2.34567 -1.2016,-5.71218 -1.2016,-7.19452 v -1.24875 l 2.85675,-0.27955 c 1.57121,-0.15375 3.54128,-0.4926 4.37794,-0.753 0.83666,-0.26039 1.60005,-0.39459 1.69643,-0.29821 0.0964,0.0964 0.40467,1.52457 0.68508,3.17376 0.40226,2.36581 0.55163,4.64515 0.70788,10.80233 0.10892,4.2921 0.33078,9.6473 0.49302,11.90045 0.16224,2.25315 0.21944,4.70128 0.12711,5.44028 -0.18877,1.51082 -0.18763,1.51007 -2.67019,1.75206 -0.78687,0.0767 -1.72342,0.18476 -2.08122,0.24013 l -0.65054,0.10068 z" />

                                                                                                    </OverlayTrigger>

                                                                                                    {/* hand part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 86.68884,160.61919 c -1.79558,-0.55414 -3.799224,-2.37147 -5.040204,-4.57152 -0.595537,-1.05578 -1.551935,-2.53354 -2.125329,-3.28391 l -1.042535,-1.3643 -0.332892,-3.91094 c -0.183089,-2.15101 -0.335254,-4.86899 -0.33814,-6.03996 -0.0052,-2.09331 0.0038,-2.12652 0.535015,-1.97902 0.297146,0.0825 1.512741,0.32116 2.701323,0.53032 1.188581,0.20916 2.161057,0.39737 2.161057,0.41825 0,0.19902 1.186488,2.15082 2.099874,3.45434 1.105124,1.57716 1.157093,1.73083 1.72748,5.10778 0.351347,2.08014 0.835112,4.04026 1.201745,4.86923 0.337514,0.76314 0.613663,1.7086 0.613663,2.10103 0,0.59398 -0.09699,0.7135 -0.578949,0.7135 -0.59318,0 -1.683236,-1.06253 -1.907785,-1.85961 -1.254059,-4.45156 -1.886762,-5.73352 -2.679584,-5.42929 -0.682926,0.26207 -0.653333,1.28185 0.128429,4.42591 0.748538,3.01043 0.822074,3.17483 1.887884,4.22043 0.609953,0.5984 1.568231,1.40738 2.129506,1.79775 0.561275,0.39037 1.020499,0.81263 1.020499,0.93835 0,0.31498 -0.873345,0.25907 -2.161057,-0.13834 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 130.63035,160.64879 c 0,-0.18555 0.45922,-0.60933 1.0205,-0.94174 0.56127,-0.33241 1.52183,-1.12606 2.13458,-1.76367 1.07112,-1.11458 1.14372,-1.2834 1.88263,-4.37778 0.60518,-2.53437 0.71398,-3.33824 0.51185,-3.78185 -0.14117,-0.30985 -0.41495,-0.56336 -0.60839,-0.56336 -0.56979,0 -1.06605,0.92974 -1.85076,3.46739 -1.01577,3.2849 -1.63387,4.12381 -2.81147,3.81586 -0.68568,-0.17931 -0.65749,-0.50365 0.22198,-2.55409 0.45283,-1.05573 0.86828,-2.6149 1.06817,-4.00881 0.5863,-4.08829 0.77709,-4.66687 2.16625,-6.56906 0.71285,-0.97612 1.39885,-2.04503 1.52444,-2.37537 0.20608,-0.54203 0.40211,-0.61689 2.01011,-0.76757 0.97996,-0.0918 2.17157,-0.25488 2.64801,-0.36234 l 0.86626,-0.19537 0.15974,1.06518 c 0.0879,0.58585 0.037,2.65342 -0.11304,4.5946 -0.47553,6.15282 -0.42138,5.90298 -1.59009,7.33769 -0.57749,0.70892 -1.45123,2.033 -1.94165,2.94239 -1.44016,2.67047 -3.26877,4.29916 -5.60185,4.98941 -1.59063,0.47059 -1.69727,0.47364 -1.69727,0.0485 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    {/* under abdomen part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 104.34481,132.50057 c -1.22846,-1.69951 -3.8708,-4.35388 -5.741012,-5.76716 -1.619331,-1.2237 -5.005557,-2.96344 -5.779259,-2.96921 -1.054001,-0.008 -1.125964,-0.24687 -0.726752,-2.4137 0.205176,-1.11364 0.412138,-2.14103 0.459919,-2.28309 0.05939,-0.17658 0.741658,-0.12572 2.156733,0.16077 8.374861,1.69553 20.337801,1.69218 29.552791,-0.008 1.32065,-0.2437 2.46996,-0.37361 2.55402,-0.2887 0.15703,0.15863 0.68757,3.01262 0.68757,3.69875 0,0.25598 -0.41918,0.50548 -1.26062,0.75031 -3.41076,0.99245 -7.26386,4.24436 -11.15212,9.41207 l -0.52693,0.70031 -0.0133,-0.86228 c -0.0347,-2.24471 -1.34648,-4.71096 -2.93732,-5.52255 -2.83568,-1.44665 -5.80902,1.05287 -6.18377,5.19836 l -0.13679,1.51302 z" />
                                                                                                    </OverlayTrigger>
                                                                                                    {/* male indicator */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 108.2749,138.1149 c -0.49751,-0.32944 -1.08918,-1.08713 -1.51624,-1.94167 -2.31921,-4.64078 1.28085,-10.67854 4.92692,-8.26308 0.47411,0.31409 1.09251,1.08653 1.47622,1.84394 0.56082,1.10702 0.66032,1.60035 0.66032,3.27395 0,1.69145 -0.0952,2.1527 -0.67199,3.25685 -1.17765,2.25429 -3.12858,2.9866 -4.87523,1.83001 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    {/* thigh part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 106.85871,187.27874 c -1.6155,-2.14325 -4.36285,-3.22299 -8.764287,-3.44446 l -3.121528,-0.15706 -1.126034,-6.72329 C 91.87,165.15054 91.031521,158.92089 90.776596,154.14276 c -0.459676,-8.61584 -0.209143,-22.08309 0.51705,-27.7936 0.249251,-1.96003 0.304526,-2.10103 0.823648,-2.10103 1.735102,0 5.501499,2.19732 8.457466,4.9341 3.31966,3.07348 6.29431,7.84696 7.39951,11.87413 0.56917,2.07392 0.52833,5.66351 -0.12431,10.92534 -1.22983,9.91543 -1.26766,14.48102 -0.25472,30.73505 0.1509,2.42152 0.18017,4.54995 0.0666,4.84025 -0.1961,0.50104 -0.2226,0.49186 -0.80309,-0.27826 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 112.47733,187.30264 c -0.081,-0.21117 0.0475,-3.65252 0.28563,-7.64745 0.74141,-12.43812 0.58346,-19.69959 -0.64001,-29.42352 -0.25404,-2.01905 -0.46189,-4.4634 -0.46189,-5.4319 0,-3.73249 2.02985,-9.14996 4.81155,-12.84155 1.84652,-2.45052 5.11969,-5.53474 7.14673,-6.73418 1.58377,-0.93714 3.73544,-1.69023 4.01901,-1.40666 0.14277,0.14277 0.27533,0.97239 1.33493,8.35462 1.01291,7.05701 0.82849,22.18583 -0.3688,30.25481 -1.25683,8.47016 -2.78211,17.85223 -3.27892,20.16881 l -0.24447,1.1399 -3.16828,0.12434 c -4.26433,0.16736 -6.67588,1.04041 -8.62939,3.12407 -0.54558,0.58194 -0.68407,0.63669 -0.80609,0.3187 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    {/* knee part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 99.054893,197.1281 c -1.39461,-0.30753 -3.782334,-1.13397 -4.36903,-1.51221 -0.216269,-0.13943 -0.222952,-0.42033 -0.0271,-1.13945 0.142961,-0.52492 0.326151,-3.00741 0.40709,-5.51664 l 0.147161,-4.56223 2.761352,0.0325 c 4.132634,0.0487 6.118944,0.81103 8.438924,3.23873 l 1.11535,1.16714 -0.42861,2.46308 c -0.84312,4.84504 -1.05715,5.82717 -1.30779,6.00114 -0.41924,0.29098 -5.18997,0.16911 -6.737345,-0.17211 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 114.19615,197.215 c -0.13518,-0.3893 -1.21641,-6.12431 -1.42721,-7.57015 -0.13498,-0.92586 -0.071,-1.07828 0.91141,-2.17094 1.23664,-1.37544 3.10986,-2.36673 5.38266,-2.84843 1.69331,-0.35889 5.27432,-0.46221 5.69102,-0.16421 0.14851,0.10621 0.26422,1.75305 0.29076,4.13835 0.0273,2.45581 0.17348,4.49062 0.38445,5.35263 l 0.34037,1.39069 -0.87125,0.44317 c -2.05215,1.04385 -4.16623,1.51084 -7.41002,1.63682 -2.56759,0.0997 -3.1992,0.0598 -3.29219,-0.20793 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    {/* bottom leg part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 97.729939,243.64657 c -0.0049,-2.94271 -0.313858,-5.16973 -1.533408,-11.05339 -1.229387,-5.93113 -2.216592,-11.28949 -2.807279,-15.23742 -0.449015,-3.00103 -0.495103,-4.07594 -0.373294,-8.70632 0.07643,-2.90542 0.297083,-6.36312 0.49034,-7.68376 0.752333,-5.1412 0.646744,-4.73668 1.201992,-4.60492 0.277597,0.0659 1.279915,0.39329 2.227371,0.7276 2.259124,0.79715 5.277839,1.19939 7.471799,0.99562 1.74369,-0.16195 1.75033,-0.16033 1.63335,0.39907 -0.0646,0.30893 -0.18069,2.99288 -0.25798,5.96433 -0.0773,2.97146 -0.24437,6.64525 -0.37127,8.164 -0.63498,7.59929 -1.22503,14.55677 -1.43565,16.92828 -0.31575,3.55528 -0.3221,13.37153 -0.01,14.98009 0.13816,0.71137 0.2512,1.3867 0.2512,1.50074 0,0.11403 -1.45871,0.20734 -3.24159,0.20734 h -3.241583 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 116.16695,244.72709 c 0.32742,-2.78547 0.16685,-14.24598 -0.26494,-18.90925 -0.22622,-2.4432 -0.56898,-6.17102 -0.76169,-8.28405 -0.3389,-3.71614 -0.67329,-9.48144 -0.94034,-16.21255 l -0.12878,-3.24621 2.69684,-0.0156 c 2.86325,-0.0166 5.79231,-0.57809 7.85693,-1.50613 0.79722,-0.35836 1.1191,-0.40972 1.2355,-0.19716 0.53189,0.97128 1.39751,9.69665 1.40349,14.14697 0.006,4.59315 -0.68039,9.25301 -3.12312,21.19764 -1.37414,6.71939 -1.67245,8.82736 -1.67352,11.82579 l -9.7e-4,2.70132 h -3.2379 -3.23791 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    {/* Foot part */}
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 99.174951,270.49178 c -0.462226,-0.24584 -1.593254,-1.0807 -2.513396,-1.85525 -1.303301,-1.09712 -1.720298,-1.60838 -1.887103,-2.3137 -0.305492,-1.29176 0.280371,-4.41535 1.870667,-9.97371 0.731083,-2.55526 1.329245,-4.74907 1.329245,-4.87513 0,-0.12604 -0.270132,-0.62671 -0.600294,-1.11259 -0.719784,-1.05925 -0.742585,-1.47264 -0.145751,-2.64239 l 0.454542,-0.89089 h 3.541419 3.54142 l 0.49519,0.66314 c 0.46156,0.61808 0.47413,0.7567 0.18494,2.04099 -0.76314,3.38919 -0.77576,3.53465 -0.5048,5.82004 0.14876,1.25462 0.43426,3.38941 0.63446,4.74396 0.21733,1.4705 0.3315,3.55813 0.28335,5.18118 -0.0745,2.51024 -0.13242,2.79648 -0.75686,3.73904 -1.19264,1.80023 -4.00141,2.49936 -5.927029,1.47531 z" />

                                                                                                    </OverlayTrigger>
                                                                                                    <OverlayTrigger trigger="click" placement="right" rootClose={true} overlay={popover}>
                                                                                                        <path className='anatomy-bg' d="m 116.95079,270.57968 c -1.1094,-0.4812 -1.63897,-0.98782 -2.23794,-2.14101 -0.67656,-1.30257 -0.66584,-4.82038 0.0291,-9.5428 0.60967,-4.14306 0.66166,-6.84517 0.16333,-8.48789 -0.44064,-1.45252 -0.44401,-2.20185 -0.0134,-2.97959 0.33174,-0.59917 0.33917,-0.6003 3.96098,-0.6003 h 3.62862 l 0.5135,1.06058 0.5135,1.06055 -0.67949,1.25613 -0.6795,1.25615 0.65899,2.36559 c 1.90249,6.82947 2.29149,8.37683 2.52138,10.02968 0.34036,2.44713 0.0709,3.13642 -1.88246,4.81472 -2.59075,2.22593 -4.48277,2.78166 -6.49658,1.90819 z" />

                                                                                                    </OverlayTrigger>
                                                                                                </svg>
                                                                                        }

                                                                                        <button className='rotate-btn text-primary me-5' onClick={() => setShowBackMan(!showBackMan)}><i className="far fa-sync-alt me-2"></i> Rotate Model</button>

                                                                                    </TransformComponent>
                                                                                </div>
                                                                            </React.Fragment>
                                                                        )}
                                                                    </TransformWrapper>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-5 pt-2">
                                                    <div className="float-end ">
                                                        <button className="ipd-btn me-3">Save</button>
                                                        <button className="ipd-btn-cancel">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-payment-details" role="tabpanel" aria-labelledby="pills-payment-details-tab">
                                                <div className="border rounded p-2">
                                                    <h6>How will you procedure be paid for ? Tick and complete as many as applies:</h6>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="border rounded p-2 payment">
                                                                <div className="form-check">
                                                                    <input className="form-check-input"
                                                                        id="health"
                                                                        type="checkbox"

                                                                        checked={healthInsuranceCheckbox}
                                                                        onChange={handleChangeHealthInsurance}
                                                                    // checked={healthItm === "Apple"} onChange={() => handleChange1("Apple")}
                                                                    />
                                                                    <label className="form-check-label" for="health">
                                                                        Health Insurance
                                                                        <p>(Personal expenses such as telephone calls are excluded)</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="border rounded p-2 payment">
                                                                <div className="form-check">
                                                                    <input className="form-check-input"
                                                                        id="paid"
                                                                        type="checkbox"

                                                                        checked={paidPersonallyCheckbox}
                                                                        onChange={handleChangePaidPersonally}
                                                                    // checked={paidItm === "Apple"} onChange={() => handleChange1("Apple")}
                                                                    />
                                                                    <label className="form-check-label" for="paid">
                                                                        Paid Personally
                                                                        <p>(If you are Paying for the procedure yourself, you maybe asked to pay on estimated deposit before admission. The balance of your account must be setted on dischange)</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-2">
                                                        <div className="col-12">
                                                            {
                                                                // healthInsuranceCheckbox && (
                                                                checkRender === 'healthChecked' && (
                                                                    <div className="border rounded p-2">
                                                                        <h6>Health Insurance</h6>
                                                                        <hr className="health-check-hr" />
                                                                        <div className="row">
                                                                            <div className="col-6">
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="inputNameInsurance" className="col-sm-4 col-form-label col-form-label-sm">Name of Insurance</label>
                                                                                    <div className="col-sm-8">
                                                                                        <select id="inputNameInsurance" className="form-select form-select-sm">
                                                                                            <option selected>Select</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="inputInsurancePlanName" className="col-sm-4 col-form-label col-form-label-sm">Insurance Plan Name</label>
                                                                                    <div className="col-sm-8">
                                                                                        <select id="inputInsurancePlanName" className="form-select form-select-sm">
                                                                                            <option selected>Select</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="inputMembershipNo" className="col-sm-4  col-form-label col-form-label-sm">Membership No.</label>
                                                                                    <div className="col-md-8">
                                                                                        <select id="inputMembershipNo" className="form-select form-select-sm">
                                                                                            <option selected>Select</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="inputApproveNo" className="col-sm-4  col-form-label col-form-label-sm">Approve No.</label>
                                                                                    <div className="col-md-8">
                                                                                        <select id="inputApproveNo" className="form-select form-select-sm">
                                                                                            <option selected>Select</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row pt-3">
                                                                            <div className="col-6">
                                                                                <h6>Have you obtained “Prior Approved” for Payment: </h6>
                                                                            </div>
                                                                            <div className="col-2">
                                                                                <div className="d-flex justify-content-evenly col__checkbox__form">
                                                                                    <div className="form-check">
                                                                                        <input className="form-check-input radio1"
                                                                                            value="Y"
                                                                                            type="radio"
                                                                                            name="Payment"
                                                                                        // onChange={handlePreHopsitalChange1}
                                                                                        />
                                                                                        <label className="form-check-label" >
                                                                                            Yes
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className="form-check">
                                                                                        <input className="form-check-input radio2"
                                                                                            type="radio"
                                                                                            value="N"
                                                                                            name="Payment"
                                                                                        // onChange={handlePreHopsitalChange2}
                                                                                        />
                                                                                        <label className="form-check-label" >
                                                                                            No
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <div className="row pt-2">
                                                        <div className="col-12">
                                                            {
                                                                checkRender === 'paidChecked' && (
                                                                    <div className="border rounded p-2">
                                                                        <h6>Paid Personally</h6>
                                                                        <hr className="health-check-hr" />
                                                                        <h6>I will pay my account by:</h6>
                                                                        <div className="row">
                                                                            {
                                                                                payAccount.length > 0 && payAccount.map((item, id) => {
                                                                                    return (
                                                                                        <div key={id} className="col-3">
                                                                                            <div className="form-check">
                                                                                                <input className="form-check-input"
                                                                                                    id="flexCheckDefault5"
                                                                                                    type="checkbox"
                                                                                                />
                                                                                                <label className="form-check-label text-nowrap" for="flexCheckDefault5">
                                                                                                    {item.account_name}
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }

                                                                        </div>


                                                                        <h6 className="pt-2">For Internet Banking:</h6>
                                                                        <div className="row pt-2">
                                                                            <div className="col-6">
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="inputPayee" className="col-sm-4 col-form-label col-form-label-sm">Payee</label>
                                                                                    <div className="col-sm-8">
                                                                                        <select id="inputPayee" className="form-select form-select-sm">
                                                                                            <option selected>Select</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="inputBankACNo" className="col-sm-4 col-form-label col-form-label-sm">Bank A/C No.</label>
                                                                                    <div className="col-sm-8">
                                                                                        <select id="inputBankACNo" className="form-select form-select-sm">
                                                                                            <option selected>Select</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <div className="row mb-3">
                                                                                    <label htmlFor="inputParticular" className="col-sm-4  col-form-label col-form-label-sm">Particular</label>
                                                                                    <div className="col-md-8">
                                                                                        <select id="inputParticular" className="form-select form-select-sm">
                                                                                            <option selected>Select</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row pt-2">
                                                                            <div className="col-6">
                                                                                <h6>Have you obtained “Prior Approved” for Payment: </h6>
                                                                            </div>
                                                                            <div className="col-2">
                                                                                <div className="d-flex justify-content-evenly col__checkbox__form">
                                                                                    <div className="form-check">
                                                                                        <input className="form-check-input radio1"
                                                                                            value="Y"
                                                                                            type="radio"
                                                                                            name="Payment"
                                                                                        // onChange={handlePreHopsitalChange1}
                                                                                        />
                                                                                        <label className="form-check-label" >
                                                                                            Yes
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className="form-check">
                                                                                        <input className="form-check-input radio2"
                                                                                            type="radio"
                                                                                            value="N"
                                                                                            name="Payment"
                                                                                        // onChange={handlePreHopsitalChange2}
                                                                                        />
                                                                                        <label className="form-check-label" >
                                                                                            No
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <div className="mb-5 pt-3">
                                                        <div className="float-end ">
                                                            <button className="ipd-btn me-3">Save</button>
                                                            <button className="ipd-btn-cancel">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-consent" role="tabpanel" aria-labelledby="pills-consent-tab">
                                                <div className="mb-2">
                                                    <ConsentTextEditor />
                                                </div>
                                                <div className="pt-0">
                                                    <div className="p-1">
                                                        <div className="row pt-2">
                                                            <div className="col-6">
                                                                <div className="row mb-3">
                                                                    <label htmlFor="inputPatientName" className="col-sm-5 col-form-label col-form-label-sm text-end pr-3">Patient Name</label>
                                                                    <div className="col-sm-7">
                                                                        <input type="text" className="form-control form-control-sm" id="inputPatientName" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row mb-3">
                                                                    <label htmlFor="inputDate" className="col-sm-5 col-form-label col-form-label-sm text-end pr-3">Date</label>
                                                                    <div className="col-sm-7">
                                                                        <input type="date" className="form-control form-control-sm" id="inputDate" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-5  col-form-label col-form-label-sm text-end pr-3">Signature</label>
                                                                    <div className="col-md-7">
                                                                        <div className="border rounded p-1">
                                                                            <h6 className="text-center">Sign Here...</h6>
                                                                            <ConsentSinature />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-5  col-form-label col-form-label-sm text-end pr-3">If not the patient, state relationship to patient </label>
                                                                    <div className="col-md-7">
                                                                        <div className="border rounded p-1">
                                                                            <h6 className="text-center">Sign Here...</h6>
                                                                            <ConsentSinature />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-5 pt-3">
                                                        <div className="float-end ">
                                                            <button className="ipd-btn me-3">Save</button>
                                                            <button className="ipd-btn-cancel">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-billing" role="tabpanel" aria-labelledby="v-pills-billing-tab">
                                Billing
                            </div>
                            <div className="tab-pane fade" id="v-pills-room-booking" role="tabpanel" aria-labelledby="v-pills-room-booking-tab">
                                <div className="border rounded p-2">
                                    <h6 className="pt-2">For Internet Banking:</h6>
                                    <div className="row pt-2">
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputSearch" className="col-sm-3 col-form-label col-form-label-sm">Search</label>
                                                <div className="col-sm-9">
                                                    <div className="rb-search" id="inputSearch">
                                                        <TextField
                                                            fullWidth
                                                            id="standard-bare"
                                                            variant="outlined"
                                                            placeholder="Search"
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <IconButton>
                                                                        <SearchOutlined />
                                                                    </IconButton>
                                                                ),
                                                            }}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputBuilding" className="col-sm-3 col-form-label col-form-label-sm">Building</label>
                                                <div className="col-sm-9">
                                                    <select id="inputBuilding" className="form-select form-select-sm">
                                                        <option selected>Select</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputRoomCategory" className="col-sm-3  col-form-label col-form-label-sm">Room Category</label>
                                                <div className="col-md-9">
                                                    <select id="inputRoomCategory" className="form-select form-select-sm">
                                                        <option selected>Select</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row mb-3">
                                                <label htmlFor="inputRoomType" className="col-sm-3  col-form-label col-form-label-sm">Room Type</label>
                                                <div className="col-md-9">
                                                    <select id="inputRoomType" className="form-select form-select-sm">
                                                        <option selected>Select</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ipd-container">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="pills-room-tab" data-bs-toggle="pill" data-bs-target="#pills-room" type="button" role="tab" aria-controls="pills-room" aria-selected="true">Room</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-booking-tab" data-bs-toggle="pill" data-bs-target="#pills-booking" type="button" role="tab" aria-controls="pills-booking" aria-selected="false">Booking</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-patient-tab" data-bs-toggle="pill" data-bs-target="#pills-patient" type="button" role="tab" aria-controls="pills-patient" aria-selected="false">Patient</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-concierge-tab" data-bs-toggle="pill" data-bs-target="#pills-concierge" type="button" role="tab" aria-controls="pills-concierge" aria-selected="false">Concierge</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-floor-manager-tab" data-bs-toggle="pill" data-bs-target="#pills-floor-manager" type="button" role="tab" aria-controls="pills-floor-manager" aria-selected="false">Floor Manager</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-room" role="tabpanel" aria-labelledby="pills-room-tab">
                                                <div className="border rounded">
                                                    <div className="ipd-container">
                                                        <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link active" id="pills-room-all-tab" data-bs-toggle="pill" data-bs-target="#pills-room-all" type="button" role="tab" aria-controls="pills-room-all" aria-selected="true">All</button>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link" id="pills-room-booked-tab" data-bs-toggle="pill" data-bs-target="#pills-room-booked" type="button" role="tab" aria-controls="pills-room-booked" aria-selected="false">Booked</button>
                                                            </li>
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link" id="pills-room-available-tab" data-bs-toggle="pill" data-bs-target="#pills-room-available" type="button" role="tab" aria-controls="pills-room-available" aria-selected="false">Available</button>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content" id="pills-tabContent">
                                                            <div className="tab-pane fade show active" id="pills-room-all" role="tabpanel" aria-labelledby="pills-room-all-tab">
                                                                <div className="p-2">
                                                                    <p className="allroom-tab text-end mb-3">
                                                                        <span className="p-0"><img src={allroom_tab} className="image-fluid" alt="image" /></span>
                                                                        <span className="pl-3"> <img src={list_thumnail_tab} className="image-fluid" alt="image" /></span>
                                                                    </p>
                                                                    <div className="row g-3">
                                                                        {
                                                                            allRoom.length > 0 && allRoom.map((item, id) => {
                                                                                return (
                                                                                    <div key={id} className="col-3">
                                                                                        <div className="allroom">
                                                                                            <div className="card">
                                                                                                <img src={item.room_img} className="card-img-top" alt="image" />
                                                                                                <div className="card-body">
                                                                                                    <h6 className="card-text">
                                                                                                        <span className="fs-6"><img src={roomIcon} /></span>
                                                                                                        <span className="pl-3">Room: {item.room_no}</span>
                                                                                                    </h6>
                                                                                                    <ul className="list-unstyled d-flex justify-content-between mx-3" style={{ listStyleType: "circle" }}>
                                                                                                        <li>{item.flat_no}</li>
                                                                                                        <li>{item.flat_square}</li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="pt-4 d-flex justify-content-center mb-1">
                                                                        <nav className="allroom-pagination" aria-label="Page navigation example">
                                                                            <ul className="pagination">
                                                                                <li className="page-item px-1">
                                                                                    <a className="page-link" href="#" aria-label="Previous">
                                                                                        <span aria-hidden="true">&lt;</span>
                                                                                    </a>
                                                                                </li>
                                                                                <li className="page-item px-1"><a className="page-link link-no" href="#">1</a></li>
                                                                                <li className="page-item px-1"><a className="page-link link-no" href="#">2</a></li>
                                                                                <li className="page-item px-1"><a className="page-link link-no" href="#">...</a></li>
                                                                                <li className="page-item px-1"><a className="page-link link-no" href="#">3</a></li>
                                                                                <li className="page-item px-1">
                                                                                    <a className="page-link" href="#" aria-label="Next">
                                                                                        <span aria-hidden="true">&gt;</span>
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </nav>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade" id="pills-room-booked" role="tabpanel" aria-labelledby="pills-room-booked-tab">
                                                                <RoomDetails/>
                                                            </div>
                                                            <div className="tab-pane fade" id="pills-room-available" role="tabpanel" aria-labelledby="pills-room-available-tab">
                                                                Available
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-booking" role="tabpanel" aria-labelledby="pills-booking-tab">
                                                <div className="border rounded">
                                                    <h1>Booking</h1>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-patient" role="tabpanel" aria-labelledby="pills-patient-tab">
                                                <div className="border rounded">
                                                    <h1>Patient </h1>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-concierge" role="tabpanel" aria-labelledby="pills-concierge-tab">
                                                <div className="border rounded">
                                                    <h1>concierge </h1>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-floor-manager" role="tabpanel" aria-labelledby="pills-floor-manager-tab">
                                                <div className="border rounded">
                                                    <h1>floor-manager</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-available-rooms" role="tabpanel" aria-labelledby="v-pills-available-rooms-tab">Available Rooms</div>
                            <div className="tab-pane fade" id="v-pills-visit" role="tabpanel" aria-labelledby="v-pills-visit-tab">Visit</div>
                            <div className="tab-pane fade" id="v-pills-healthcare" role="tabpanel" aria-labelledby="v-pills-healthcare-tab">health care</div>
                            <div className="tab-pane fade" id="v-pills-appointment" role="tabpanel" aria-labelledby="v-pills-appointment-tab">appointment</div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default IpdPatient;

