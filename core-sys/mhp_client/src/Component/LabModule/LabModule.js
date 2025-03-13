import React, { useEffect, useState } from "react";
import axios from "axios";
import 'jspdf-autotable';
// import ReactExport from "react-export-excel";
import moment from 'moment';
import Swal from "sweetalert2";
import { setValue } from "@syncfusion/ej2-base";
import './labModule.css';
import { Autocomplete } from '@mui/material';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';



function AllPatients() {

    //comment

    const customStyles = {
        content: {
            top: '30%',
            left: '25%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "47%",
            height: "460px",
            background: "#ffffff",
        },
        overlay: { zIndex: 1000 }

    };


    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal(e) {
        e.preventDefault();
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);

    }


    const [patientIdRender, setpatientIdRender] = useState('');

    const [date, setDate] = React.useState(null);
    const [allDepartment, setAllDepartment] = React.useState(null);
    const [provider, setProvider] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [doctorId, setDoctorId] = React.useState('');
    const [doctorName, setDoctorName] = useState('');
    const [allTestType, setAllTestType] = useState([]);
    const [departmentId, setDepartmentId] = React.useState(null);

    // console.log('department id ', departmentId)
    const [usualProviderId, setUsualProviderId] = React.useState(null);
    // console.log('usual id ', usualProviderId)

    const [referenceId, setReferenceId] = React.useState(null);
    const [testTypeId, setTestTypeId] = useState(null);
    // console.log('test type id check',testTypeId)
    const [testNameId, setTestNameId] = useState(null);
    const [report, setReport] = useState('');
    const [testType, setTestType] = useState('');
    // const [testName, setTestName] = useState('');
    const [testName, setTestName] = useState([]);

    // console.log('all dependednt test names',testName)
    const [singlepatient, setSinglePatient] = useState([]);

    const [singlepatientLab, setSinglePatientLab] = useState([]);
    const [submitStatus, setSubmitStatus] = useState('');


    useEffect(() => {
        axios.get(`/usual-provider`).then(res => {
            if (res.data.status == 200) {
                setProvider(res.data.usual_provider);
            }
        })
        axios.get(`/department`).then(res => {
            if (res.data.status == 200) {
                setAllDepartment(res.data.department);
            }
        })
        axios.get(`/lab-test-type`).then(res => {
            if (res.data.status == 200) {
                setAllTestType(res.data.testType);
            }
        })
       
        axios.get(`/doctors`).then(res => {
            console.log(res.data);
            if (res.data.status == 200) {
                setAllDoctors(res.data.doctors);
                setDoctorName(res.data.doctors.dr_given_name);
            }
        })

    }, [])

    useEffect(() => {
        axios.get(`/all-test-name-by-test-type-id/${testTypeId}`).then(res => {
            if (res.data.status == 200) {
                setTestName(res.data.test_names);
            }
        });

    }, [testTypeId])

    const handleTestNameChange = (e) => {
        setTestNameId(e.target.value);
    }
    const handleTestTypeChange = (e) => {
        setTestTypeId(e.target.value);
    }


    const formData = new FormData();

    formData.append('department_id', departmentId);
    formData.append('usual_provider_id', usualProviderId);
    formData.append('reference_id', referenceId);
    formData.append('date', date);
    formData.append('test_type_id', testTypeId);
    formData.append('test_type', testType);
    formData.append('test_name_id', testName);
    formData.append('test_name_id', testNameId);
    formData.append('report', report);
    formData.append('patient_id', patientIdRender);


    const submitLabModule = (e) => {
        e.preventDefault();
        // console.log('state data check', formData)
        // console.log('department_id',formData.get("department_id"))
        // console.log('usual_provider_id',formData.get("usual_provider_id"))
        // console.log('reference_id',formData.get("reference_id"))
        // console.log('test_type_id',formData.get("test_type_id"))
        // console.log('test_name_id',formData.get("test_name_id"))


        if (date == null || testTypeId == null || report == null) {
            toast.error("Please fill up all field");
        }
        else {
            axios.post(`/save-lab-modules`, formData).then(res => {
                if (res.data.status == 200) {
                    toast.success("Lab Modules added sucessfully");
                    setSubmitStatus(res.data);
                    closeModal();
                    setTestTypeId('');
                    setTestNameId('');
                    setReport('');
                    setDate(null);

                }
            })
          
        }

    }

    const deleteLab = (e, labId) => {
        console.log('delete id check', labId)
        e.preventDefault();
        const thisClicked = e.currentTarget;
        //  thisClicked.innerText = "Deleting";

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/delete-lab-module/${labId}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                        //   swal("Success", res.data.message, "success");
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })


    }

    /////lab search 
    const [allpatients, setAllpatients] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [optionSearchValue, setOptionSearchValue] = useState('');

    console.log('patient id render check', patientIdRender)

    useEffect(() => {
        axios.get(`/lab-modules/${patientIdRender}`).then(res => {
            if (res.data.status === 200) {
                console.log('patient lab data', res.data.patient_labs)
                setSinglePatientLab(res.data.patient_labs);
            }
        });
        axios.get(`/patients-profile/${patientIdRender}`).then(res => {
            if (res.data.status === 200) {
                console.log('patient data', res.data.patients_details)

                setSinglePatient(res.data.patients_details);
            }
        });
    }, [patientIdRender,submitStatus])




    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('state check', searchValue);
        axios.post(`/patient-search-by-phone-or-hin/${searchValue}`).then(res => {
            console.log('patient_id get', res.data);
            if (res.data.status === 200) {
                setAllpatients([res.data.patient]);
                if (res.data.patient == null) {
                    setpatientIdRender('');
                }
                else {
                    setpatientIdRender(res.data.patient.id)
                }
            }
        });
        setSearchValue('');
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }
    const handleOptionChange = (e) => {
        setOptionSearchValue(e.target.value);
        setSearchValue('');
    }


    return (
        <div className='ms-2 mt-2'>
            <div className="custom-card flex-grow-1">
                <h5 className="fw-normal  text-start py-2 px-1 mb-2 text-login">LAB Module</h5>
            </div>
            <div className='custom-card mt-2'>
                <div className="card-body">
                    <div class="d-flex flex-wrap align-items-center">

                        <div class="dropdown">
                            <select class="form-select form-select-sm py-2" aria-label="Default select example" onChange={handleOptionChange} value={optionSearchValue}>
                                <option value="" selected>Choose An Option</option>
                                <option value="hin">HIN No</option>
                                <option value="phone">Phone</option>
                            </select>
                        </div>
                        {
                            optionSearchValue === 'hin' ? <form class="col-4">
                                <input type="search" style={{ height: '39px' }} onChange={handleChange} value={searchValue} class="form-control form-control-dark " placeholder="Search By HN-No..." aria-label="Search" />
                            </form> : optionSearchValue === 'phone' ? <form class="col-4">
                                <input type="search" style={{ height: '39px' }} onChange={handleChange} value={searchValue} class="form-control form-control-dark " placeholder="Search By Phone No..." aria-label="Search" />
                            </form> : optionSearchValue === '' ? <form class="col-4">
                                <input type="search" style={{ height: '39px' }} onChange={handleChange} value={searchValue} class="form-control form-control-dark " placeholder="Search By HN-No..." aria-label="Search" />
                            </form> : null
                        }


                        <div class="text-end">
                            <button type="button" style={{ textAlign: 'center', marginLeft: '-7px', padding: '5px' }} className="btn btn-success px-2" onClick={handleSubmit}>Search</button>
                        </div>
                    </div>

                </div>


                {patientIdRender &&
                    <div className="card-body  bg-white">
                        <div className="px-4 shadow-sm d-flex justify-content-between bg-body rounded bg-light mb-2">
                            <div className='left d-flex'>
                                <div className='image'>

                                    {singlepatient.patient_images !== "" ? <img className="me-2" src={`${global.img_url}/images/files/${singlepatient.patient_images}`} width="20px" alt="No Image" /> : <img className="me-2" src={`https://static.thenounproject.com/png/363640-200.png`} width="50px" alt="No Image" />}

                                </div>
                                <div className='info ml-2'>
                                    <h5> {singlepatient.patient_preferred_name || singlepatient.patient_first_name}</h5>
                                    <p>{singlepatient.patient_hn_number}</p>
                                </div>
                            </div>
                            <div className='right d-flex'>
                                <div className='image'>
                                    <img src="https://www.surgicalreview.org/wp-content/uploads/2020/08/src_surgical_review_corporation_logo_transparent_black.png"
                                        style={{ width: "70px" }} />
                                </div>
                                <div className='info ml-2'>
                                    {/* <h5>{ singlepatient.usual_provider_name}</h5> */}
                                    <h5>Chittagonj Hospital </h5>
                                    <p>Dhaka,Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        <div className='autocomplete-wrapper py-2 px-2 bg-white mt-3'>
                            <div className='row'>
                                <div className="col-6 d-flex ">
                                    <div className='col-4 mt-1'>
                                        <b className=''>Department:</b>

                                    </div>
                                    <div className="col-7">
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={allDepartment}
                                            getOptionLabel={(option) => option.departments_name}
                                            name="department_id"
                                            onChange={(e, newValue) => {                            
                                                    setDepartmentId(newValue.id)                                              

                                            }}
                                            size="small"
                                            renderInput={(params) => <TextField {...params} label="Department" />}
                                        />
                                        <span className="text-danger">  </span>
                                    </div>
                                </div>
                                <div className="col-6">

                                </div>
                                <div className="col-6 d-flex mt-4 mb-2">
                                    <div className='col-4 mt-1'>
                                        <b className=''>Usual Provider:</b>

                                    </div>
                                    <div className="col-7">
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="usual_provider_id"
                                            options={provider}
                                            getOptionLabel={(option) => option.usual_provider_name}
                                            onChange={(e, newValue) => {

                                                setUsualProviderId(newValue.id)


                                            }}

                                            size="small"
                                            renderInput={(params) => <TextField {...params} label="Usual Provider" />}
                                        />
                                        <span className="text-danger">  </span>
                                    </div>
                                </div>
                                <div className="col-6 d-flex mt-4 mb-2">
                                    <div className='col-4 mt-1'>
                                        <b className=''>Reference By:</b>

                                    </div>
                                    <div className="col-7">
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="reference_id"
                                            options={allDoctors}
                                            getOptionLabel={(option) => option.dr_given_name}
                                            onChange={(e, newValue) => {

                                                setReferenceId(newValue.id)


                                            }}

                                            size="small"
                                            renderInput={(params) => <TextField {...params} label="Reference By" />}
                                        />
                                        <span className="text-danger">  </span>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className='button-list my-2 px-3 d-flex justify-content-between'>

                            <div className='left-buttons'>

                            </div>
                            <div className='left-button'>
                                <button className='report-btn ' onClick={openModal}> <b>Add Report</b></button>

                            </div>

                        </div>
                        <div className='px-3'>
                            <table class="table table-bordered ">
                                <thead>
                                    <tr >
                                        <th scope="col" className='fw-bold'>#</th>
                                        <th scope="col" className='fw-bold'>Date</th>
                                        <th scope="col" className='fw-bold'>Test Type</th>
                                        <th scope="col" className='fw-bold'>Test Name</th>
                                        <th scope="col" className='fw-bold'>Report</th>
                                        <th scope="col" className='fw-bold'>File Type</th>
                                        <th scope="col" className='fw-bold'></th>
                                        <th scope="col" className='fw-bold'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {singlepatientLab.length > 0 && singlepatientLab.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{moment(item.date).format('LL')}</td>
                                                <td>{item.name}</td>
                                                <td>{item.test_name}</td>
                                                <td>{item.report}

                                                </td>
                                                <td>
                                                    {

                                                        item.report.substring(item.report.lastIndexOf(".") + 1) == 'pdf' ? <a href={`${global.img_url}/lab_modules/${item.report}`} className="custo"><i class="custo fas fa-file-pdf"></i>  </a> : item.report.substring(item.report.lastIndexOf(".") + 1) == 'png' || 'jpeg' ? <a href={`${global.img_url}/lab_modules/${item.report}`} className="custo"><i class="custo fa-solid fa-image"></i>  </a> : item.report.substring(item.report.lastIndexOf(".") + 1) == 'xslx' || 'docx' ? <i class="custo fa fa-file-excel-o" aria-hidden="true"></i>
                                                            : null
                                                    }

                                                    {/* {
                                             item.report.substring(item.report.lastIndexOf(".") + 1) == 'pdf' ? <i class="custo fas fa-file-pdf" onClick={pdfHandle}></i> : item.report.substring(item.report.lastIndexOf(".") + 1) == 'png' || 'jpeg' ? <i class="custo fa-solid fa-image" onClick={ imageHandle}></i> : item.report.substring(item.report.lastIndexOf(".") + 1) == 'xslx' || 'docx' ? <i class="custo fa fa-file-excel-o" aria-hidden="true"></i>
                                                 : null
                                         } */}

                                                </td>
                                                <td><a href={`${global.img_url}/lab_modules/${item.report}`} download target="_blank" className='download'> <i class="fa fa-1x fa-download" aria-hidden="true" ></i></a>
                                                </td>

                                                <td> <button className='btn btn-sm btn-danger mx-1' onClick={(e) => deleteLab(e, item.id)}> <i className="fa fa-trash" aria-hidden="true"></i>
                                                </button></td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>

                        </div>

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >

                            <div className='card-body'>
                                <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i class="fal fa-times"></i></span>

                                <h5 className=""> <b>Add Report</b></h5>


                                <div className="row">

                                    <div className="col-12 d-flex">
                                        <div className="col-5 mt-4">
                                            <h6 className="mt-4 ml-1">Date</h6>
                                            <h6 className="mt-5">Test Type</h6>
                                            <h6 className="mt-5">Test Name</h6>
                                            <h6 className="mt-5">Report</h6>

                                        </div>
                                        <div className="col-7 mt-4">

                                            <Box
                                            >
                                                <FormControl fullWidth size="small" className="mt-4 datedropdown"
                                                >
                                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                                        <DatePicker
                                                            label="Date"
                                                            value={date}
                                                            onChange={(newValue) => {
                                                                setDate(newValue);
                                                            }}
                                                            renderInput={(params) => <TextField {...params} />}
                                                            size="small"
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Box>
                                            <select class="form-select mt-4" aria-label="Default select example" name="test_type_id" value={testTypeId} onChange={handleTestTypeChange}>
                                                <option selected>Select Test Type</option>
                                                {allTestType.map((item, i) => {
                                                    return (
                                                        <option key={i} value={item.id}>{item.name}</option>
                                                    )
                                                })}

                                            </select>

                                            <select class="form-select mt-4" aria-label="Default select example" name="test_name_id" value={testNameId} onChange={handleTestNameChange}>
                                                <option selected>Select Test Name</option>
                                                {testName.map((item, i) => {
                                                    return (
                                                        <option key={i} value={item.id}>{item.test_name}</option>
                                                    )
                                                })}

                                            </select>



                                            <div className='mt-4'>

                                                <input className="form-control" type="file" id="formFile" name="report" onChange={(e) => { setReport(e.target.files[0]) }} />
                                            </div>



                                            <div className="float-right">
                                                <button className="buttonStyleCancel mt-5 " onClick={closeModal}>
                                                    <b>Cancel</b>
                                                </button>
                                                <button className="buttonStyle mt-5 mx-2" onClick={submitLabModule}>
                                                    <b>Save</b>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </Modal>


                    </div>

                }

                {allpatients[0] === null && <h3 className="text-center text-danger mt-3 col-6">No Patient Data Found !</h3>}

            </div>
        </div>
    );
};


export default AllPatients;