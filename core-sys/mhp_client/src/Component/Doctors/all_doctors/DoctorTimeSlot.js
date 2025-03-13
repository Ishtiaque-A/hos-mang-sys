import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Sidebar1 from '../../Sidebar1/Sidebar1';
import './AddDoctors.css'
import crush from '../../../Images/crush.jpg'
import axios from "axios";
import moment from 'moment';
import { useReactToPrint } from "react-to-print";
// import { Document, Page } from 'react-pdf';

const DoctorTimeSlot = () => {

    const [doctorTimes, setDoctorTimes] = useState([]);
    const [doctorTimesSort, setDoctorTimesSort] = useState(doctorTimes);
    const [doctorInfo, setDoctorinfo] = useState('');
    const [allHospital, setAllHospital] = useState([]);


    useEffect(() => {

        const storageData = JSON.parse(localStorage.getItem('userData'))
        const doctorId = storageData.user_id;

        axios.get(`/doctor-chamber-times/${doctorId}`).then(res => {
            if (res.data.status == 200) {
                setDoctorTimes(res.data.docTimeSlots);
                setDoctorTimesSort(res.data.docTimeSlots);
            }
        })
        axios.get(`/doctor-id/${doctorId}`).then(res => {
            setDoctorinfo(res.data.doctor);

        })

        axios.get(`/usual-provider`).then(res => {
            setAllHospital(res.data.usual_provider);

        })
    }, [])


    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);

    }

    //date filter functionality 

    const [dateFilterValue, setDateFilterValue] = useState('');
    const handleDateSearch = (e) => {
        setDateFilterValue(e.target.value);
        let filteredDate = doctorTimes.filter((val) => {
            if (e.target.value === "") {
                return val;

            }
            if (e.target.value) {
                return val.year.toLowerCase().includes(e.target.value.toLowerCase());

            }
        })
        setDoctorTimesSort(filteredDate);

    }


    //print code 
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });




    const [filterHospitalValue, setFilterHospitalValue] = useState('');

    const handleHospitalSearch = (e) => {
        setFilterHospitalValue(e.target.value);
        let filteredHospitalList = doctorTimes.filter((val) => {
            if (e.target.value === "all") {
                return val;

            }
            if (e.target.value) {
                return val.usual_provider_name.toLowerCase().includes(e.target.value.toLowerCase());

            }
        })
        // console.log('all filtered hoisp',filteredHospitalList);
        setDoctorTimesSort(filteredHospitalList);

    }


    return (
        <>

            <div className="container">
                <h4 className=" time-slot-heading pt-3 pb-3 ">Doctor's Time Slot
                    <Link to={'/doctors'} className="btn btn-primary btn-sm float-end"> Back </Link>
                </h4>
                <div className="row">
                    <div className="card">
                        <div className="doctor-container">
                            {doctorInfo !== null && doctorInfo.dr_images !== "" ?
                                <img className='img fluid d-inline' src={`${global.img_url}/doctors/images/${doctorInfo.dr_images}`} width="17px" height="18px" alt="No Image" /> : <img className="me-2" src={`https://static.thenounproject.com/png/363640-200.png`} width="20px" alt="No Image" />

                            }
                            <h6 className="doctor-name d-inline ms-3">{doctorInfo.dr_given_name}</h6>
                        </div>

                        <div className="filter-container mt-3">
                            <input class="search-box me-2" type="text" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                            <input class="search-box me-2" type="date" value={dateFilterValue} onChange={handleDateSearch} />

                            <select class="filter-select" value={filterHospitalValue} onChange={handleHospitalSearch}>
                                <option value="all">All Hospital</option>
                                {allHospital.map((item, i) => {
                                    return (<option key={i} value={item.usual_provider_name}>{item.usual_provider_name}</option>
                                    )

                                })}

                            </select>
                            <button className='view-icon icon-btn float-end' onClick={handlePrint}>
                                <i className="fas fa-print"></i>
                            </button>
                            {/* <button className='view-icon icon-btn me-3 float-end' download>
                                <i className="far fa-file-pdf"></i>
                            </button> */}
                        </div>
                        {/* <h6>21 Dec, 2021 - 28 Dec, 2021</h6> */}
                        <div className='time-table my-1' ref={componentRef}>

                            <table class="table table-bordered mt-2"  >
                                <thead>
                                    <tr>
                                        <th scope="col"> <b>Day </b></th>
                                        <th scope="col"> <b>Hospital Name</b></th>
                                        <th scope="col"><b>Day Type</b></th>
                                        <th scope="col"> <b>Time Scehdule</b></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {doctorTimesSort.filter((val) => {
                                        if (searchTerm == "") {
                                            return val;
                                        } else if (val.day.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                                            || val.usual_provider_name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                                            || val.type.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return val;
                                        }
                                    }).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <th scope="row"> <b>{item.day} </b> </th>
                                                <td> {item.usual_provider_name}</td>
                                                <td>{item.type}</td>
                                                <td>
                                                    {moment(new Date(item.year)).format("YYYY-MM-DD")}
                                                    <b>({moment(item.slot_from).format('LT')} - {moment(item.slot_to).format('LT')})</b></td>
                                            </tr>
                                        )
                                    })
                                    }







                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorTimeSlot;