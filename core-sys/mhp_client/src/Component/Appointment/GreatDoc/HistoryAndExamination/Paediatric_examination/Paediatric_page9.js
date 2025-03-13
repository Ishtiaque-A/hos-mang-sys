import { Popover } from '@mui/material';
import axios from 'axios';
import React, { createRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useScreenshot } from 'use-react-screenshot';

const Paediatric_page9 = (props) => {

    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");
    const [cornealLightReflection, setCornealLightReflection] = useState("");
    const [fixation, setFixation] = useState("");
    const [responseToLooking, setResponseToLooking] = useState("");
    const [eyeMovements, setEyeMovements] = useState("");
    const [cardiovascular, setCardiovascular] = useState("");
    const [hipTest, setHipTest] = useState("");
    const [testesFully, setTestesFully] = useState("");
    const [parentQuestions, setParentQuestions] = useState("");
    const [ageAppropriate, setAgeAppropriate] = useState("");
    const [hearing, setHearing] = useState("");
    const [vision, setVision] = useState("");
    const [hips, setHips] = useState("");
    const [oralHealthConcern, setOralHealthConcern] = useState("");
    const [outcome, setOutcome] = useState("");


    // weight
    const [change1, setChange1] = useState(false);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;

    // length
    const [change2, setChange2] = useState(false);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;

    // headCircumference
    const [change3, setChange3] = useState(false);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const open3 = Boolean(anchorEl3);
    const id3 = open3 ? 'simple-popover' : undefined;

    // cornealLightReflection
    const [change4, setChange4] = useState(false);
    const [anchorEl4, setAnchorEl4] = useState(null);
    const open4 = Boolean(anchorEl4);
    const id4 = open4 ? 'simple-popover' : undefined;

    // fixation
    const [change5, setChange5] = useState(false);
    const [anchorEl5, setAnchorEl5] = useState(null);
    const open5 = Boolean(anchorEl5);
    const id5 = open5 ? 'simple-popover' : undefined;

    // responseToLooking
    const [change6, setChange6] = useState(false);
    const [anchorEl6, setAnchorEl6] = useState(null);
    const open6 = Boolean(anchorEl6);
    const id6 = open6 ? 'simple-popover' : undefined;

    // eyeMovements
    const [change7, setChange7] = useState(false);
    const [anchorEl7, setAnchorEl7] = useState(null);
    const open7 = Boolean(anchorEl7);
    const id7 = open7 ? 'simple-popover' : undefined;

    // cardiovascular
    const [change8, setChange8] = useState(false);
    const [anchorEl8, setAnchorEl8] = useState(null);
    const open8 = Boolean(anchorEl8);
    const id8 = open8 ? 'simple-popover' : undefined;

    // hipTest
    const [change9, setChange9] = useState(false);
    const [anchorEl9, setAnchorEl9] = useState(null);
    const open9 = Boolean(anchorEl9);
    const id9 = open9 ? 'simple-popover' : undefined;

    // testesFully
    const [change10, setChange10] = useState(false);
    const [anchorEl10, setAnchorEl10] = useState(null);
    const open10 = Boolean(anchorEl10);
    const id10 = open10 ? 'simple-popover' : undefined;

    // ageAppropriate
    const [change11, setChange11] = useState(false);
    const [anchorEl11, setAnchorEl11] = useState(null);
    const open11 = Boolean(anchorEl11);
    const id11 = open11 ? 'simple-popover' : undefined;

    // hearing
    const [change12, setChange12] = useState(false);
    const [anchorEl12, setAnchorEl12] = useState(null);
    const open12 = Boolean(anchorEl12);
    const id12 = open12 ? 'simple-popover' : undefined;

    // vision
    const [change13, setChange13] = useState(false);
    const [anchorEl13, setAnchorEl13] = useState(null);
    const open13 = Boolean(anchorEl13);
    const id13 = open13 ? 'simple-popover' : undefined;

    // hips
    const [change14, setChange14] = useState(false);
    const [anchorEl14, setAnchorEl14] = useState(null);
    const open14 = Boolean(anchorEl14);
    const id14 = open14 ? 'simple-popover' : undefined;

    // oralHealthConcern
    const [change15, setChange15] = useState(false);
    const [anchorEl15, setAnchorEl15] = useState(null);
    const open15 = Boolean(anchorEl15);
    const id15 = open15 ? 'simple-popover' : undefined;

    // weight
    const [change16, setChange16] = useState(false);
    const [anchorEl16, setAnchorEl16] = useState(null);
    const open16 = Boolean(anchorEl16);
    const id16 = open16 ? 'simple-popover' : undefined;

    // outcome
    const [change17, setChange17] = useState(false);
    const [anchorEl17, setAnchorEl17] = useState(null);
    const open17 = Boolean(anchorEl17);
    const id17 = open17 ? 'simple-popover' : undefined;

    const [image, takeScreenShot] = useScreenshot();
    const refPE1 = createRef(null);
    const [btnLoading, setbtnLoading] = useState(false)


    const handleSave = (e) => {
        e.preventDefault();

        if (image) {
            const pData = {
                patient_id: parseInt(props.propsData.patient_id),
                page_no: 9,
                image: image
            }
            axios.post(`/paediatric`, pData).then(res => {
                toast.success(res.data.message)
                props.setstateUpdate(Math.random())
                setbtnLoading(false)
            }).catch(error => {
                toast.error("Ops! something is wrong")
                setbtnLoading(false)
            });
        }

    }

    return (
        <>
            <div ref={refPE1} className='container bg-white p-3'>
                <h6>Child health check 6 to 8 weeks for Nurse/Doctor</h6>
                <div className='row mt-4'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Weight</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Weight"
                                            value="Weight"
                                            type="checkbox"
                                            onChange={(e) => { setChange1(!change1); setWeight("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl1(e.currentTarget)}></div>
                                        {
                                            change1 &&
                                            <Popover
                                                id={id1}
                                                open={open1}
                                                anchorEl={anchorEl1}
                                                onClose={() => setAnchorEl1(null)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="text-box" style={{ width: "90px", padding: "4px", boxShadow: "none" }}>

                                                    <div className="d-flex">
                                                        <input className="form-control" value={weight} type="text" name="birth lenth" onChange={(e) => { setWeight(e.target.value) }} id="exampleCheck1" />
                                                        <label className="mx-2 mt-1" for="exampleCheck1" >
                                                            kg
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <span className='ms-2'>{weight && `${weight} kg`}</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Length</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Length"
                                            name="Length"
                                            id="togBtn" onChange={(e) => { setChange2(!change2); setLength("") }}
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl2(e.currentTarget)}></div>
                                        {
                                            change2 &&
                                            <Popover
                                                id={id2}
                                                open={open2}
                                                anchorEl={anchorEl2}
                                                onClose={() => setAnchorEl2(null)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="text-box" style={{ width: "90px", padding: "4px", boxShadow: "none" }}>

                                                    <div className="d-flex">
                                                        <input className="form-control" value={length} type="text" name="birth length" onChange={(e) => { setLength(e.target.value) }} id="exampleCheck1" />
                                                        <label className="mx-2 mt-1" for="exampleCheck1" >
                                                            cm
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <span className='ms-2'>{length && `${length} cm`}</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Head circumference</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Head circumference"
                                            name="Head circumference"
                                            id="togBtn"
                                            onChange={(e) => { setChange3(!change3); setHeadCircumference("") }}
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl3(e.currentTarget)}></div>
                                        {
                                            change3 &&
                                            <Popover
                                                id={id3}
                                                open={open3}
                                                anchorEl={anchorEl3}
                                                onClose={() => setAnchorEl3(null)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="text-box" style={{ width: "90px", padding: "4px", boxShadow: "none" }}>

                                                    <div className="d-flex">
                                                        <input className="form-control" value={headCircumference} type="text" name="birth lenth" onChange={(e) => { setHeadCircumference(e.target.value) }} id="exampleCheck1" />
                                                        <label className="mx-2 mt-1" for="exampleCheck1" >
                                                            cm
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{headCircumference && `${headCircumference} cm`}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='shadow-lg p-3 rounded bg-white'>
                    <h6>Child health check 6 to 8 weeks for Nurse/Doctor</h6>
                    <div className='row mt-2' style={{ marginTop: '-5px' }}>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Corneal light reflection</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Corneal light reflection"
                                                name="Corneal light reflection"
                                                id="togBtn"
                                                onChange={(e) => { setChange4(!change4); setCornealLightReflection("") }}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Normal" type="radio" name="cornealLightReflection" onChange={(e) => { setCornealLightReflection(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Normal
                                                            </label>
                                                            <input className="form-check-input" value="Abnormal" type="radio" name="cornealLightReflection" onChange={(e) => { setCornealLightReflection(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Abnormal
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{cornealLightReflection}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Fixation</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Fixation"
                                                name="Fixation"
                                                id="togBtn"
                                                onChange={(e) => { setChange5(!change5); setFixation("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl5(e.currentTarget)} className="slider round"></div>
                                            {
                                                change5 &&
                                                <Popover
                                                    id={id5}
                                                    open={open5}
                                                    anchorEl={anchorEl5}
                                                    onClose={() => setAnchorEl5(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Normal" type="radio" name="fixation" onChange={(e) => { setFixation(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Normal
                                                            </label>
                                                            <input className="form-check-input" value="Abnormal" type="radio" name="fixation" onChange={(e) => { setFixation(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Abnormal
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{fixation}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Response to looking with one eye</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Response to looking with one eye"
                                                name="Response to looking with one eye"
                                                id="togBtn"
                                                onChange={(e) => { setChange6(!change6); setResponseToLooking("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl6(e.currentTarget)} className="slider round"></div>
                                            {
                                                change6 &&
                                                <Popover
                                                    id={id6}
                                                    open={open6}
                                                    anchorEl={anchorEl6}
                                                    onClose={() => setAnchorEl6(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Normal" type="radio" name="responseToLooking" onChange={(e) => { setResponseToLooking(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Normal
                                                            </label>
                                                            <input className="form-check-input" value="Abnormal" type="radio" name="responseToLooking" onChange={(e) => { setResponseToLooking(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Abnormal
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{responseToLooking}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Eye movements</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Eye movements"
                                                name="Eye movements"
                                                id="togBtn"
                                                onChange={(e) => { setChange7(!change7); setEyeMovements("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl7(e.currentTarget)} className="slider round"></div>
                                            {
                                                change7 &&
                                                <Popover
                                                    id={id7}
                                                    open={open7}
                                                    anchorEl={anchorEl7}
                                                    onClose={() => setAnchorEl7(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Normal" type="radio" name="eyeMovements" onChange={(e) => { setEyeMovements(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Normal
                                                            </label>
                                                            <input className="form-check-input" value="Abnormal" type="radio" name="eyeMovements" onChange={(e) => { setEyeMovements(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Abnormal
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{eyeMovements}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='shadow-lg p-3 rounded mt-3 bg-white'>
                    <div className='row mt-2'>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Cardiovascular (doctor only)</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Cardiovascular (doctor only)"
                                                name="Cardiovascular (doctor only)"
                                                id="togBtn"
                                                onChange={(e) => { setChange8(!change8); setCardiovascular("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl8(e.currentTarget)} className="slider round"></div>
                                            {
                                                change8 &&
                                                <Popover
                                                    id={id8}
                                                    open={open8}
                                                    anchorEl={anchorEl8}
                                                    onClose={() => setAnchorEl8(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Normal" type="radio" name="cardiovascular" onChange={(e) => { setCardiovascular(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Normal
                                                            </label>
                                                            <input className="form-check-input" value="Murmur Present" type="radio" name="cardiovascular" onChange={(e) => { setCardiovascular(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Murmur Present
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{cardiovascular}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Hip test for dislocation</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Hip test for dislocation"
                                                name="Hip test for dislocation"
                                                id="togBtn"
                                                onChange={(e) => { setChange9(!change9); setHipTest("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl9(e.currentTarget)} className="slider round"></div>
                                            {
                                                change9 &&
                                                <Popover
                                                    id={id9}
                                                    open={open9}
                                                    anchorEl={anchorEl9}
                                                    onClose={() => setAnchorEl9(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Normal" type="radio" name="hipTest" onChange={(e) => { setHipTest(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Normal
                                                            </label>
                                                            <input className="form-check-input" value="Click Present" type="radio" name="hipTest" onChange={(e) => { setHipTest(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Click Present
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{hipTest}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Testes fully descended R / L</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Testes fully descended R / L"
                                                name="Testes fully descended R / L"
                                                id="togBtn"
                                                onChange={(e) => { setChange10(!change10); setTestesFully("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl10(e.currentTarget)} className="slider round"></div>
                                            {
                                                change10 &&
                                                <Popover
                                                    id={id10}
                                                    open={open10}
                                                    anchorEl={anchorEl10}
                                                    onClose={() => setAnchorEl10(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Normal" type="radio" name="testesFully" onChange={(e) => { setTestesFully(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Normal
                                                            </label>
                                                            <input className="form-check-input" value="Not Descended" type="radio" name="testesFully" onChange={(e) => { setTestesFully(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Not descended
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{testesFully}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Parent questions completed?</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Parent questions completed ?"
                                                name="Parent questions completed ?"
                                                id="togBtn"
                                                onChange={(e) => { setChange11(!change11); setParentQuestions("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl11(e.currentTarget)} className="slider round"></div>
                                            {
                                                change11 &&
                                                <Popover
                                                    id={id11}
                                                    open={open11}
                                                    anchorEl={anchorEl11}
                                                    onClose={() => setAnchorEl11(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Yes" type="radio" name="testesFully" onChange={(e) => { setParentQuestions(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Yes
                                                            </label>
                                                            <input className="form-check-input" value="No" type="radio" name="testesFully" onChange={(e) => { setParentQuestions(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{parentQuestions}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Age appropriate immunization completed as per schedule?</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Age appropriate immunization completed as per schedule?"
                                                name="Age appropriate immunisation completed as per schedule?"
                                                id="togBtn"
                                                onChange={(e) => { setChange12(!change12); setAgeAppropriate("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl12(e.currentTarget)} className="slider round"></div>
                                            {
                                                change12 &&
                                                <Popover
                                                    id={id12}
                                                    open={open12}
                                                    anchorEl={anchorEl12}
                                                    onClose={() => setAnchorEl12(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Yes" type="radio" name="ageAppropriate" onChange={(e) => { setAgeAppropriate(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Yes
                                                            </label>
                                                            <input className="form-check-input" value="No" type="radio" name="ageAppropriate" onChange={(e) => { setAgeAppropriate(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{ageAppropriate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h6>Are there any risk factors?</h6>
                    <div className='row mt-3'>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Hearing</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Hearing"
                                                name="Hearing"
                                                id="togBtn"
                                                onChange={(e) => { setChange13(!change13); setHearing("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl13(e.currentTarget)} className="slider round"></div>
                                            {
                                                change13 &&
                                                <Popover
                                                    id={id13}
                                                    open={open13}
                                                    anchorEl={anchorEl13}
                                                    onClose={() => setAnchorEl13(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Yes" type="radio" name="hearing" onChange={(e) => { setHearing(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Yes
                                                            </label>
                                                            <input className="form-check-input" value="No" type="radio" name="hearing" onChange={(e) => { setHearing(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{hearing}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Vision</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Vision"
                                                name="Vision"
                                                id="togBtn"
                                                onChange={(e) => { setChange14(!change14); setVision("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl14(e.currentTarget)} className="slider round"></div>
                                            {
                                                change14 &&
                                                <Popover
                                                    id={id14}
                                                    open={open14}
                                                    anchorEl={anchorEl14}
                                                    onClose={() => setAnchorEl14(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Yes" type="radio" name="vision" onChange={(e) => { setVision(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Yes
                                                            </label>
                                                            <input className="form-check-input" value="No" type="radio" name="vision" onChange={(e) => { setVision(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{vision}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Hips</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Hips"
                                                name="Hips"
                                                id="togBtn"
                                                onChange={(e) => { setChange15(!change15); setHips("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl15(e.currentTarget)} className="slider round"></div>
                                            {
                                                change15 &&
                                                <Popover
                                                    id={id15}
                                                    open={open15}
                                                    anchorEl={anchorEl15}
                                                    onClose={() => setAnchorEl15(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Yes" type="radio" name="hips" onChange={(e) => { setHips(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Yes
                                                            </label>
                                                            <input className="form-check-input" value="No" type="radio" name="hips" onChange={(e) => { setHips(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{hips}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Oral health concern</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Oral health concern "
                                                name="Oral health concern"
                                                id="togBtn"
                                                onChange={(e) => { setChange16(!change16); setOralHealthConcern("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl16(e.currentTarget)} className="slider round"></div>
                                            {
                                                change16 &&
                                                <Popover
                                                    id={id16}
                                                    open={open16}
                                                    anchorEl={anchorEl16}
                                                    onClose={() => setAnchorEl16(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Yes" type="radio" name="oralHealthConcern" onChange={(e) => { setOralHealthConcern(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Yes
                                                            </label>
                                                            <input className="form-check-input" value="No" type="radio" name="oralHealthConcern" onChange={(e) => { setOralHealthConcern(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                No
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{oralHealthConcern}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Outcome</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Outcome"
                                                name="Outcome"
                                                id="togBtn"
                                                onChange={(e) => { setChange17(!change17); setOutcome("") }}
                                            />
                                            <div onClick={(e) => setAnchorEl17(e.currentTarget)} className="slider round"></div>
                                            {
                                                change17 &&
                                                <Popover
                                                    id={id17}
                                                    open={open17}
                                                    anchorEl={anchorEl17}
                                                    onClose={() => setAnchorEl17(null)}
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
                                                        <div className="form-check ms-1">
                                                            <input className="form-check-input" value="Normal" type="radio" name="outcome" onChange={(e) => { setOutcome(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Normal
                                                            </label>
                                                            <input className="form-check-input" value="Review" type="radio" name="outcome" onChange={(e) => { setOutcome(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Review
                                                            </label>

                                                            <input className="form-check-input" value="Refer" type="radio" name="outcome" onChange={(e) => { setOutcome(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label">
                                                                Refer
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{outcome}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h6 className='mt-4'>Comments</h6>
                <div className='mt-1 rounded'>
                    <textarea id=""
                        value=""
                        rows="4"
                        style={{ width: '100%' }}
                        className='ps-2'
                        placeholder='Write Comments'>
                    </textarea>
                </div>


            </div>

            <div className='pedriatric_page4_btn'>
                <button className='pedriatric_page4_btn_right' onClick={props.closePaediatricExaminationModal}>Cancel</button>
                {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>}
                <button className='pedriatric_page4_btn_next' onClick={() => {
                    props.passData(10)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(8)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
                {btnLoading ? <button className='pedriatric_btn_middle mr-2'>Loading...</button> :
                    <button className='pedriatric_btn_right mr-2' onClick={() => {
                        setbtnLoading(true)
                        takeScreenShot(refPE1.current).then(res => {
                            toast.success('Screenshot take successfully', {
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

export default Paediatric_page9;