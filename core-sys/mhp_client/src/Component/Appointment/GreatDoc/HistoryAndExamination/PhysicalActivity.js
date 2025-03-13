import React, { useEffect, useState } from 'react';
import { Popover } from '@mui/material';
import './PhysicalActivity.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useScreenshot } from 'use-react-screenshot';
import { createRef } from 'react';

const PhysicalActivity = (props) => {

    const [change, setChange] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [change1, setChange1] = useState(false);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;


    const [change2, setChange2] = useState(false);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;

    const [change3, setChange3] = useState(false);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const open3 = Boolean(anchorEl3);
    const id3 = open3 ? 'simple-popover' : undefined;

    const [change4, setChange4] = useState(false);
    const [anchorEl4, setAnchorEl4] = useState(null);
    const open4 = Boolean(anchorEl4);
    const id4 = open4 ? 'simple-popover' : undefined;


    const [balanceTraining, setBalanceTraining] = useState(false);
    const [flexibilityExercise, setFlexibilityExercise] = useState(false);
    const [moderateIntensityExercise, setModerateIntensityExercise] = useState(false);
    const [vigorousExercise, setVigorousExercise] = useState(false);

    const [currentExcerciseLevel, setCurrentExcerciseLevel] = useState("");
    const [aerobicExercise, setAerobicExercise] = useState([]);
    const [strengthBuilding, setStrengthBuilding] = useState([]);
    const [endurance, setEndurance] = useState([]);
    const [frequency, setFrequency] = useState("");


    const [date, setEnterdDate] = useState("");
    const dateInput = (e) => {
        console.log("date", e.target.value);
        setEnterdDate(e.target.value);
    }



    const [saveLoading, setSaveLoading] = useState(false);
    const docData = JSON.parse(localStorage.getItem("userData"));


    const [image, takeScreenShot] = useScreenshot();
    const refPE1 = createRef(null);
    const [btnLoading, setbtnLoading] = useState(false)



    const savePhysicalActivityAdviceData = () => {
        if (image) {
            setSaveLoading(true);

            const formData = {
                patient_id: props.patient_id,
                doctor_id: docData.user_id,
                image: image,
                current__excercise__level__value: currentExcerciseLevel,
                balance__training__ternary: balanceTraining,
                flexibility__exercise__ternary: flexibilityExercise,
                moderate__intensity__exercise__ternary: moderateIntensityExercise,
                vigorous__xercise__ternary: vigorousExercise,
                frequency__value: frequency,
                previews__date: date,
                aerobic_exercise: aerobicExercise.toString(), //arr
                strength_building: strengthBuilding.toString(), //arr
                endurance: endurance.toString(), //arr
            }
            axios.post('/save-physical-activity-advice', formData).then(res => {
                toast.success(res.data.message)
                props.setstateUpdate(Math.random())
                setbtnLoading(false)
            }).catch(error => {
                toast.error("Ops ! Something is wrong")
                setbtnLoading(false)
            });
        } else {
            toast.error("Please take screenshot")
        }
    };



    const [currentExcerciseLevelArray, setCurrentExcerciseLevelArray] = useState([]);
    const [aerobicExerciseArray, setAerobicExerciseArray] = useState([]);
    const [strengthBuildingArray, setStrengthBuildingArray] = useState([]);
    const [enduranceArray, setEnduranceArray] = useState([]);
    const [frequencyPhysicalArray, setFrequencyPhysicalArray] = useState([]);

    useEffect(() => {
        axios.get(`/current-excercise-level`).then(res => {
            if (res.data.status === 200) {
                console.log("Current Excercise Level Array", res.data.currentExcerciseLevel);
                setCurrentExcerciseLevelArray(res.data.currentExcerciseLevel);
            }
        });
        axios.get(`/aerobic-exercise`).then(res => {
            if (res.data.status === 200) {
                setAerobicExerciseArray(res.data.aerobicExercise);
            }
        });
        axios.get(`/strength-building`).then(res => {
            if (res.data.status === 200) {
                setStrengthBuildingArray(res.data.strengthBuilding);
            }
        });
        axios.get(`/endurance`).then(res => {
            if (res.data.status === 200) {
                setEnduranceArray(res.data.endurance);
            }
        });
        axios.get(`/frequency-physical`).then(res => {
            if (res.data.status === 200) {
                setFrequencyPhysicalArray(res.data.frequencyPhysical);
            }
        });

    }, []);
    return (
        <>
            <div ref={refPE1}>
                <div className="row mb-3">
                    <div className="col-4">
                        <div className="current__excercise__level p-1">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Current Excercise Level</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange(!change); setCurrentExcerciseLevel("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl(e.currentTarget)} className="slider round"></div>
                                        {
                                            change &&
                                            <Popover
                                                id={id}
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={() => setAnchorEl(null)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        currentExcerciseLevelArray.length > 0 && currentExcerciseLevelArray.map((item, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input"
                                                                        value={item.name}
                                                                        type="radio"
                                                                        name="left"
                                                                        onChange={(e) => { setCurrentExcerciseLevel(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {item.name}
                                                                    </label>
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p>{currentExcerciseLevel}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="physical__current__bg">
                    <div className="row ">
                        <div className="col-12">
                            <p className="p-1 current__text">Exercise advised <hr className="current__hr" /></p>
                        </div>
                    </div>
                    <div className="row mx-3 gy-3 mb-3">

                        <div className="col-4">
                            <div className="current__bg__white p-1">
                                <div className="d-flex justify-content-between">
                                    <p className="w-75">Aerobic Exercise</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => { setChange1(!change1); setAerobicExercise([]) }}
                                                id="togBtn"
                                            />
                                            <div onClick={(e) => setAnchorEl1(e.currentTarget)} className="slider round"></div>
                                            {
                                                change1 &&
                                                <Popover
                                                    id={id1}
                                                    open={open1}
                                                    anchorEl={anchorEl1}
                                                    onClose={() => setAnchorEl1(null)}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >

                                                    <div className="left-popup">
                                                        {
                                                            aerobicExerciseArray.length > 0 && aerobicExerciseArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check ms-1">
                                                                        <input className="form-check-input"
                                                                            value={item.name}
                                                                            type="checkbox"
                                                                            name={item.id}
                                                                            onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                const arr = [...aerobicExercise];
                                                                                if (checked) {
                                                                                    arr.push(value)
                                                                                    setAerobicExercise(arr)
                                                                                } else {
                                                                                    const filtered = arr.filter(item => item !== value)
                                                                                    setAerobicExercise(filtered)
                                                                                }
                                                                            }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    {
                                        aerobicExercise.length > 0 &&
                                        <p >{aerobicExercise.toString()}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="current__bg__white p-1">
                                <div className="d-flex justify-content-between">
                                    <p className="w-75">Strength building</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => { setChange2(!change2); setStrengthBuilding([]) }}
                                                id="togBtn"
                                            />
                                            <div onClick={(e) => setAnchorEl2(e.currentTarget)} className="slider round"></div>
                                            {
                                                change2 &&
                                                <Popover
                                                    id={id2}
                                                    open={open2}
                                                    anchorEl={anchorEl2}
                                                    onClose={() => setAnchorEl2(null)}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >

                                                    <div className="left-popup">
                                                        {
                                                            strengthBuildingArray.length > 0 && strengthBuildingArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check ms-1">
                                                                        <input className="form-check-input"
                                                                            value={item.name}
                                                                            type="checkbox"
                                                                            name={item.id}
                                                                            onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                const arr = [...strengthBuilding];
                                                                                if (checked) {
                                                                                    arr.push(value)
                                                                                    setStrengthBuilding(arr)
                                                                                } else {
                                                                                    const filtered = arr.filter(item => item !== value)
                                                                                    setStrengthBuilding(filtered)
                                                                                }
                                                                            }}
                                                                        />
                                                                        <label className="form-check-label" >
                                                                            {item.name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    {
                                        strengthBuilding.length > 0 &&
                                        <p >{strengthBuilding.toString()}</p>

                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="current__bg__white p-1">
                                <div className="d-flex justify-content-between">
                                    <p className="w-75">Balance training</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="BalanceTraining"
                                                name="BalanceTraining"
                                                onChange={(e) => { setBalanceTraining(!balanceTraining) }}
                                                id="togBtn"
                                            />
                                            <div className="slider round"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="current__bg__white p-1">
                                <div className="d-flex justify-content-between">
                                    <p className="w-75">Endurance </p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => { setChange3(!change3); setEndurance([]) }}
                                                id="togBtn"
                                            />
                                            <div onClick={(e) => setAnchorEl3(e.currentTarget)} className="slider round"></div>
                                            {
                                                change3 &&
                                                <Popover
                                                    id={id3}
                                                    open={open3}
                                                    anchorEl={anchorEl3}
                                                    onClose={() => setAnchorEl3(null)}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >

                                                    <div className="left-popup">
                                                        {
                                                            enduranceArray.length > 0 && enduranceArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check ms-1">
                                                                        <input className="form-check-input"
                                                                            value={item.name}
                                                                            type="checkbox"
                                                                            name={item.id}
                                                                            onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                const arr = [...endurance];
                                                                                if (checked) {
                                                                                    arr.push(value)
                                                                                    setEndurance(arr)
                                                                                } else {
                                                                                    const filtered = arr.filter(item => item !== value)
                                                                                    setEndurance(filtered)
                                                                                }
                                                                            }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    {
                                        endurance.length > 0 &&
                                        <p >{endurance.toString()}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="current__bg__white p-1">
                                <div className="d-flex justify-content-between">
                                    <p className="w-75">Flexibility exercise</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Flexibility Exercise"
                                                name="Flexibility Exercise"
                                                onChange={(e) => { setFlexibilityExercise(!flexibilityExercise) }}
                                                id="togBtn"
                                            />
                                            <div className="slider round"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="current__bg__white p-1">
                                <div className="d-flex justify-content-between">
                                    <p className="w-75">Moderate intensity exercise</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Moderate Intensity Exercise"
                                                name="Moderate Intensity Exercise"
                                                onChange={(e) => { setModerateIntensityExercise(!moderateIntensityExercise) }}
                                                id="togBtn"
                                            />
                                            <div className="slider round"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="current__bg__white p-1">
                                <div className="d-flex justify-content-between">
                                    <p className="w-75">Vigorous exercise</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="vigorous Exercise"
                                                name="vigorous Exercise"
                                                onChange={(e) => { setVigorousExercise(!vigorousExercise) }}
                                                id="togBtn"
                                            />
                                            <div className="slider round"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row mb-3 pt-3">
                    <div className="col-4">
                        <div className="current__excercise__level p-1">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Frequency</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange4(!change4); setFrequency("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl4(e.currentTarget)} className="slider round"></div>
                                        {
                                            change4 &&
                                            <Popover
                                                id={id4}
                                                open={open4}
                                                anchorEl={anchorEl4}
                                                onClose={() => setAnchorEl4(null)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <div className="left-popup">
                                                    {
                                                        frequencyPhysicalArray.length > 0 && frequencyPhysicalArray.map((item, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input"
                                                                        value={item.name}
                                                                        type="radio"
                                                                        name="left"
                                                                        onChange={(e) => { setFrequency(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {item.name}
                                                                    </label>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p>{frequency}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="current__bg__white p-1">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Review</p>
                                <div className="ms-1">
                                    <label className="me-1">
                                        <input
                                            type="date"
                                            name="Previews"
                                            className="date__input"
                                            onChange={dateInput}
                                            id="togBtn"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='pedriatric_btn'>
                <button className='pedriatric_btn_left' onClick={() => props.setmodelOpen(false)}>Cancel</button>
                {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_btn_middle' onClick={savePhysicalActivityAdviceData}>Save</button>}

                {btnLoading ? <button className='pedriatric_btn_middle mr-2'>Loading...</button> :
                    <button className='pedriatric_btn_right mr-2' onClick={() => {
                        setbtnLoading(true)
                        takeScreenShot(refPE1.current).then(res => {
                            toast.success('ScreenShot take Sucessfully', {
                                position: "top-center",
                                autoClose: 500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: "light",
                            })
                            setbtnLoading(false)
                        })
                    }}>Take screenshot </button>}

            </div>
        </>
    );
};

export default PhysicalActivity;

