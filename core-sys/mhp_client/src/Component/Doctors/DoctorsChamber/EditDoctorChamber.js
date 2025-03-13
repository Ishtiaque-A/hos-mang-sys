
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import '../DoctorsChamber/DoctorChamber.css';
import Modal from 'react-modal';
import axios from "axios";
import TextField from '@mui/material/TextField';
// import AdapterDayjs from '@mui/lab/AdapterDayjs';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
// import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


function EditDoctorChamber(props) {

    let { id } = useParams();

    const navigate = useNavigate();
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





    const [chamberId, setChamberId] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [day, setDay] = React.useState('');
    const [slotFrom, setSlotFrom] = React.useState(null);
    const [slotTo, setSlotTo] = React.useState(null);
    const [year, setYears] = React.useState();

    const handleChange = (event) => {
        setChamberId(event.target.value);

    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };
    const handleDayChange = (event) => {
        setDay(event.target.value);
    };
    const [doctorId, setDoctorId] = React.useState('');
    const handleDoctorChange = (event) => {
        setDoctorId(event.target.value);

    }

    //all usual provider chamber
    const [allChamber, setAllChamber] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);

    useEffect(() => {
        axios.get(`/usual-provider`).then(res => {
            if (res.data.status == 200) {
                setAllChamber(res.data.usual_provider);
            }
        })
        axios.get(`/doctors`).then(res => {
            if (res.data.status == 200) {
                setAllDoctors(res.data.doctors);
            }
        })

    }, [])

    const [checkBoxValue, setCheckBoxValue] = useState('');
    const handleCheckBox = (e) => {
        if (e.target.checked) {
            setCheckBoxValue(1);
        }
        else {
            setCheckBoxValue(0);

        }
    }

    useEffect(() => {


        axios.get(`/edit-doctors-chamber/${id}`).then(res => {

            if (res.data.status === 200) {
                console.log('editTimeSlots', res.data.editTimeSlots);
                setChamberId(res.data.editTimeSlots.chamber_id);
                setDoctorId(res.data.editTimeSlots.doctor_id);
                setDay(res.data.editTimeSlots.day);
                setMonth(res.data.editTimeSlots.month);
                setScheduleType(res.data.editTimeSlots.type);
                setCheckBoxValue(res.data.editTimeSlots.all_month)
                setSlotFrom(dayjs(res.data.editTimeSlots.slot_from))
                setSlotTo(dayjs(res.data.editTimeSlots.slot_to))

                setYears(res.data.editTimeSlots.year)
            }

        });

    }, [id]);

    const [scheduleType, setScheduleType] = useState('');
    const handleOptionChange = (e) => {
        setScheduleType(e.target.value);

    }

    const submitDoctorTimes = (e) => {
        e.preventDefault();


        const alldDocTimesData = {};
        alldDocTimesData.doctor_id = doctorId;
        alldDocTimesData.chamber_id = chamberId;
        alldDocTimesData.month = month;
        alldDocTimesData.day = day;
        alldDocTimesData.year = year;
        alldDocTimesData.all_month = checkBoxValue;
        alldDocTimesData.slot_from = slotFrom;
        alldDocTimesData.slot_to = slotTo;
        alldDocTimesData.type = scheduleType;

        axios.post(`/update-doctors-chamber/${id}`, alldDocTimesData).then(res => {
            if (res.data.status == 200) {
                navigate('/doctors-chamber')
            }
            toast.success("Doctor times Updated sucessfully");

        })

    }

    return (
        <div className="container whole-wrapper">
            <div className="row">
                <div className="col-12">
                    <div className="p-2">
                        <h3 className="py-2"> <b>Edit Doctor's Chamber</b></h3>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="d-flex justify-content-end mb-2">
                    <Link to='/doctors-chamber' className="btn btn-primary btn-sm "> Back </Link>

                </div>


                <div className="card py-4">

                    <form id="EarForm" onSubmit="">

                        <div className="col-12 d-flex">

                            <div className="col-4">
                                <div className="form-group">
                                    <label htmlFor="history_name" className="col-form-label-sm"> Dr Names </label>
                                    <Box >
                                        <FormControl fullWidth size="small" style={{ minWidth: 190 }}>
                                            <InputLabel id="demo-simple-select-label">Dr Name</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={doctorId}
                                                label="Dr Name"
                                                onChange={handleDoctorChange}
                                            >
                                                {allDoctors.map((item, i) => {
                                                    return (<MenuItem value={item.id} key={i}>{item.dr_given_name}</MenuItem>
                                                    )

                                                })}

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="history_name" className="col-form-label-sm"> Day </label>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth size="small" className="">
                                            <InputLabel id="demo-simple-select-label">Day</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={day}
                                                label="Age"
                                                onChange={handleDayChange}
                                            >
                                                <MenuItem value="saturday">Saturday</MenuItem>
                                                <MenuItem value="sunday">Sunday</MenuItem>
                                                <MenuItem value="monday">Monday</MenuItem>
                                                <MenuItem value="tuesday">TuesDay</MenuItem>
                                                <MenuItem value="wednesday">WednesDay</MenuItem>
                                                <MenuItem value="thrusday">Thruday</MenuItem>
                                                <MenuItem value="friday">Friday</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="history_name" className="col-form-label-sm"> Schedule Type</label>

                                    <select class="form-select mt-4" aria-label="Default select example" name="type" value={scheduleType} onChange={handleOptionChange}>
                                        <option selected>Select schedule</option>
                                        <option value="morning">Morning</option>
                                        <option value="day">Day</option>
                                        <option value="evening">Evening</option>
                                        <option value="night">Night</option>
                                    </select>

                                </div>

                            </div>



                            <div className="col-4">

                                <div className="form-group">
                                    <label htmlFor="history_name" className="col-form-label-sm"> Hospital Name </label>
                                    <Box >
                                        <FormControl fullWidth size="small" style={{ minWidth: 190 }}>
                                            <InputLabel id="demo-simple-select-label">Chamber Name</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={chamberId}
                                                label="Chamber Name"
                                                onChange={handleChange}
                                            >
                                                {allChamber.map((item, i) => {
                                                    return (<MenuItem value={item.id} key={i}>{item.usual_provider_name}</MenuItem>
                                                    )

                                                })}

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>

                                <div className="form-group">
                                    <h6 className="mt-1  mx-3">Year</h6>
                                    <Box>
                                        <FormControl fullWidth size="small" style={{ minWidth: 190 }}>
                                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={year}
                                                label="Year"
                                                onChange={(e) => setYears(e.target.value)}
                                            >
                                                <MenuItem value="2023">2023</MenuItem>
                                                <MenuItem value="2024">2024</MenuItem>
                                                <MenuItem value="2025">2025</MenuItem>
                                                <MenuItem value="2026">2026</MenuItem>
                                                <MenuItem value="2027">2027</MenuItem>
                                                <MenuItem value="2028">2028</MenuItem>
                                                <MenuItem value="2029">2029</MenuItem>
                                                <MenuItem value="2030">2030</MenuItem>
                                                <MenuItem value="2031">2031</MenuItem>
                                                <MenuItem value="2032">2032</MenuItem>
                                                <MenuItem value="2033">2033</MenuItem>
                                                <MenuItem value="2034">2034</MenuItem>
                                                <MenuItem value="2035">2035</MenuItem>


                                            </Select>
                                        </FormControl>

                                    </Box>


                                    {/* <FormControl fullWidth size="small" className="mt-2">

                                        <LocalizationProvider dateAdapter={AdapterDayjs} >

                                            <DatePicker
                                                views={['year']}
                                                label="Year only"
                                                value={year}
                                                onChange={(newValue) => {
                                                    setYears(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} helperText={null} size="small" />}
                                            />

                                        </LocalizationProvider>
                                    </FormControl> */}
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="history_name" className="col-form-label-sm mt-3"> Slot Time Start</label>



                                    <FormControl fullWidth size="small" className="mt-3">

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                                            <TimePicker
                                                label="Slot(From))"
                                                value={slotFrom}
                                                onChange={(newValue) => {
                                                    setSlotFrom(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                            />

                                        </LocalizationProvider>
                                    </FormControl>




                                </div>

                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label htmlFor="history_name" className="col-form-label-sm"> Month </label>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-simple-select-label">Month</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={month}
                                                label="Age"
                                                onChange={handleMonthChange}
                                            >
                                                <MenuItem value="january">January</MenuItem>
                                                <MenuItem value="february">February</MenuItem>
                                                <MenuItem value="march">March</MenuItem>
                                                <MenuItem value="april">April</MenuItem>
                                                <MenuItem value="may">May</MenuItem>
                                                <MenuItem value="june">June</MenuItem>
                                                <MenuItem value="july">July</MenuItem>
                                                <MenuItem value="august">August</MenuItem>
                                                <MenuItem value="september">September</MenuItem>
                                                <MenuItem value="october">October</MenuItem>
                                                <MenuItem value="november">November</MenuItem>
                                                <MenuItem value="december">December </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>

                                <div class="form-group mt-5">
                                    <input class="form-check-input check mx-2 mt-3 " type="checkbox" id="checkNull" value={checkBoxValue} checked={checkBoxValue == 1 ? true : false} onChange={handleCheckBox} />
                                    <label class="form-check-label mx-4 mt-2 " for="flexCheckChecked" >
                                        <h6 className=" mx-2">All Month </h6>
                                    </label>
                                </div>

                                <div className="form-group mt-4" style={{ marginTop: "10px" }}>
                                    <label htmlFor="history_name" className="col-form-label-sm mt-1"> Slot Time End</label>


                                    <FormControl fullWidth size="small" className="mt-4">

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                                            <TimePicker
                                                label="Slot(To)"
                                                value={slotTo}
                                                onChange={(newValue) => {
                                                    setSlotTo(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                            />

                                        </LocalizationProvider>
                                    </FormControl>





                                </div>



                            </div>
                        </div>



                        <div className="float-right">
                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" onClick={submitDoctorTimes}><i
                                className="fas fa-save"></i> Update
                            </button>
                        </div>
                    </form>

                </div>
            </div >






        </div >
    )
}
export default EditDoctorChamber;