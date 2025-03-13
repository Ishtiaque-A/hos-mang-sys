import { Popover } from '@mui/material';
import axios from 'axios';
import React, { createRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useScreenshot } from 'use-react-screenshot';

const Paediatric_page7 = (props) => {

    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");
    const [fontanelles, setFontanelles] = useState("");
    const [observationCorneal, setObservationCorneal] = useState("");
    const [cardiovascular, setCardiovascular] = useState("");
    const [umbilicus, setUmbilicus] = useState("");
    const [femoralPulses, setFemoralPulses] = useState("");
    const [hipDislocation, setHipDislocation] = useState("");
    const [testesDescended, setTestesDescended] = useState("");
    const [genitalia, setGenitalia] = useState("");
    const [analRegion, setAnalRegion] = useState("");
    const [skin, setSkin] = useState("");
    const [reflexes, setReflexes] = useState("");
    const [appropriateImmunisation, setAppropriateImmunisation] = useState("");
    const [riskFactors, setRiskFactors] = useState(false);
    const [hearing, setHearing] = useState("");
    const [vision, setVision] = useState("");
    const [hips, setHips] = useState(false);
    const [oralHealth, setOralHealth] = useState("");
    const [outCome, setOutCome] = useState("");
    const [healthInformation, setHealthInformation] = useState("");
    const [writeComments, setWriteComments] = useState("");

    //weight
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

    // fontanelles
    const [change4, setChange4] = useState(false);
    const [anchorEl4, setAnchorEl4] = useState(null);
    const open4 = Boolean(anchorEl4);
    const id4 = open4 ? 'simple-popover' : undefined;

    // observationCorneal
    const [change5, setChange5] = useState(false);
    const [anchorEl5, setAnchorEl5] = useState(null);
    const open5 = Boolean(anchorEl5);
    const id5 = open5 ? 'simple-popover' : undefined;

    // cardiovascular
    const [change6, setChange6] = useState(false);
    const [anchorEl6, setAnchorEl6] = useState(null);
    const open6 = Boolean(anchorEl6);
    const id6 = open6 ? 'simple-popover' : undefined;

    // umbilicus
    const [change7, setChange7] = useState(false);
    const [anchorEl7, setAnchorEl7] = useState(null);
    const open7 = Boolean(anchorEl7);
    const id7 = open7 ? 'simple-popover' : undefined;

    // femoralPulses
    const [change8, setChange8] = useState(false);
    const [anchorEl8, setAnchorEl8] = useState(null);
    const open8 = Boolean(anchorEl8);
    const id8 = open8 ? 'simple-popover' : undefined;

    // hipDislocation
    const [change9, setChange9] = useState(false);
    const [anchorEl9, setAnchorEl9] = useState(null);
    const open9 = Boolean(anchorEl9);
    const id9 = open9 ? 'simple-popover' : undefined;

    // testesDescended
    const [change10, setChange10] = useState(false);
    const [anchorEl10, setAnchorEl10] = useState(null);
    const open10 = Boolean(anchorEl10);
    const id10 = open10 ? 'simple-popover' : undefined;

    // genitalia
    const [change11, setChange11] = useState(false);
    const [anchorEl11, setAnchorEl11] = useState(null);
    const open11 = Boolean(anchorEl11);
    const id11 = open11 ? 'simple-popover' : undefined;

    // analRegion
    const [change12, setChange12] = useState(false);
    const [anchorEl12, setAnchorEl12] = useState(null);
    const open12 = Boolean(anchorEl12);
    const id12 = open12 ? 'simple-popover' : undefined;

    // skin
    const [change13, setChange13] = useState(false);
    const [anchorEl13, setAnchorEl13] = useState(null);
    const open13 = Boolean(anchorEl13);
    const id13 = open13 ? 'simple-popover' : undefined;

    // reflexes
    const [change14, setChange14] = useState(false);
    const [anchorEl14, setAnchorEl14] = useState(null);
    const open14 = Boolean(anchorEl14);
    const id14 = open14 ? 'simple-popover' : undefined;

    // appropriateImmunisation
    const [change15, setChange15] = useState(false);
    const [anchorEl15, setAnchorEl15] = useState(null);
    const open15 = Boolean(anchorEl15);
    const id15 = open15 ? 'simple-popover' : undefined;

    // hearing
    const [change16, setChange16] = useState(false);
    const [anchorEl16, setAnchorEl16] = useState(null);
    const open16 = Boolean(anchorEl16);
    const id16 = open16 ? 'simple-popover' : undefined;

    // vision
    const [change17, setChange17] = useState(false);
    const [anchorEl17, setAnchorEl17] = useState(null);
    const open17 = Boolean(anchorEl17);
    const id17 = open17 ? 'simple-popover' : undefined;

    // oralHealth
    const [change18, setChange18] = useState(false);
    const [anchorEl18, setAnchorEl18] = useState(null);
    const open18 = Boolean(anchorEl18);
    const id18 = open18 ? 'simple-popover' : undefined;

    // outcome
    const [change19, setChange19] = useState(false);
    const [anchorEl19, setAnchorEl19] = useState(null);
    const open19 = Boolean(anchorEl19);
    const id19 = open19 ? 'simple-popover' : undefined;

    // healthInformation
    const [change20, setChange20] = useState(false);
    const [anchorEl20, setAnchorEl20] = useState(null);
    const open20 = Boolean(anchorEl20);
    const id20 = open20 ? 'simple-popover' : undefined;


    const [change21, setChange21] = useState(false);
    const [anchorEl21, setAnchorEl21] = useState(null);
    const open21 = Boolean(anchorEl21);
    const id21 = open21 ? 'simple-popover' : undefined;

    const [image, takeScreenShot] = useScreenshot();
    const refPE1 = createRef(null);
    const [btnLoading, setbtnLoading] = useState(false)


    const handleSave = (e) => {
        e.preventDefault();

        if (image) {
            const pData = {
                patient_id: parseInt(props.propsData.patient_id),
                page_no: 7,
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
                <h6>Child health check 1 to 4 weeks  By Doctor or Nurse</h6>
                <div className='row mt-2'>
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
                                                    <div className="form-group d-flex">
                                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" cols="6" onChange={(e) => { setWeight(e.target.value) }}>
                                                        </textarea>
                                                        <label className='mt-2 ms-1'>Kg</label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{weight && `${weight} kg`}</p>
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
                                            name="Length"
                                            value="Length"
                                            type="checkbox"
                                            onChange={(e) => { setChange2(!change2); setLength("") }}
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
                                                    <div className="form-group d-flex">
                                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" cols="6" onChange={(e) => { setLength(e.target.value) }}>
                                                        </textarea>
                                                        <label className='mt-2 ms-1'>cm</label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{length && `${length} cm`}</p>
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
                                            name="Head circumference"
                                            value="Head circumference"
                                            type="checkbox"
                                            onChange={(e) => { setChange3(!change3); setHeadCircumference("") }}
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
                                                    <div className="form-group d-flex">
                                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" cols="6"
                                                            onChange={(e) => { setHeadCircumference(e.target.value) }}>
                                                        </textarea>
                                                        <label className='mt-2 ms-1'>cm</label>
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
                <div className='row' style={{ marginTop: '-5px' }}>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Fontanelles</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Fontanelles"
                                            value="Fontanelles"
                                            type="checkbox"
                                            onChange={(e) => { setChange4(!change4); setFontanelles("") }}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="normal" type="radio" name="headandfontanelles" onChange={(e) => { setFontanelles(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="headandfontanelles" onChange={(e) => { setFontanelles(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="headandfontanelles" onChange={(e) => { setFontanelles(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{fontanelles}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Eyes (Observation / corneal light reflections / white pupil)</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Eyes (Observation / corneal light reflections / white pupil)"
                                            name="Eyes (Observation / corneal light reflections / white pupil)"
                                            onChange={(e) => { setChange5(!change5); setObservationCorneal("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="observationCorneal" onChange={(e) => { setObservationCorneal(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="observationCorneal" onChange={(e) => { setObservationCorneal(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="observationCorneal" onChange={(e) => { setObservationCorneal(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{observationCorneal}</p>
                            </div>
                        </div>
                    </div>
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
                                            onChange={(e) => { setChange6(!change6); setCardiovascular("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="cardiovascular" onChange={(e) => { setCardiovascular(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="cardiovascular" onChange={(e) => { setCardiovascular(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="cardiovascular" onChange={(e) => { setCardiovascular(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{cardiovascular}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Umbilicus</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Umbilicus"
                                            name="Umbilicus tory rate"
                                            onChange={(e) => { setChange7(!change7); setUmbilicus("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="umbilicus" onChange={(e) => { setUmbilicus(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="umbilicus" onChange={(e) => { setUmbilicus(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="umbilicus" onChange={(e) => { setUmbilicus(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{umbilicus}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Femoral pulses</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Femoral pulses"
                                            name="Femoral pulses"
                                            onChange={(e) => { setChange8(!change8); setFemoralPulses("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="femoralPulses" onChange={(e) => { setFemoralPulses(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="femoralPulses" onChange={(e) => { setFemoralPulses(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="femoralPulses" onChange={(e) => { setFemoralPulses(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{femoralPulses}</p>
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
                                            onChange={(e) => { setChange9(!change9); setHipDislocation("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="hipDislocation" onChange={(e) => { setHipDislocation(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="hipDislocation" onChange={(e) => { setHipDislocation(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="hipDislocation" onChange={(e) => { setHipDislocation(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{hipDislocation}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Testes fully descended </p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Testes fully descended"
                                            name="Testes fully descended"
                                            onChange={(e) => { setChange10(!change10); setTestesDescended("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="testesDescended" onChange={(e) => { setTestesDescended(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="testesDescended" onChange={(e) => { setTestesDescended(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="testesDescended" onChange={(e) => { setTestesDescended(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{testesDescended}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Genitalia</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Genitalia"
                                            name="Genitalia"
                                            onChange={(e) => { setChange11(!change11); setGenitalia("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="genitalia" onChange={(e) => { setGenitalia(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="genitalia" onChange={(e) => { setGenitalia(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="genitalia" onChange={(e) => { setGenitalia(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{genitalia}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Anal region</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Anal region"
                                            name="Anal region"
                                            onChange={(e) => { setChange12(!change12); setAnalRegion("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="analregion" onChange={(e) => { setAnalRegion(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="analregion" onChange={(e) => { setAnalRegion(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="analregion" onChange={(e) => { setAnalRegion(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{analRegion}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Skin</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Skin"
                                            name="Skin"
                                            onChange={(e) => { setChange13(!change13); setSkin("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="skin" onChange={(e) => { setSkin(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="skin" onChange={(e) => { setSkin(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="skin" onChange={(e) => { setSkin(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{skin}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Reflexes</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Reflexes"
                                            name="Reflexes"
                                            onChange={(e) => { setChange14(!change14); setReflexes("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="normal" type="radio" name="reflexes" onChange={(e) => { setReflexes(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="review" type="radio" name="reflexes" onChange={(e) => { setReflexes(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Review
                                                        </label>
                                                        <input className="form-check-input" value="refer" type="radio" name="reflexes" onChange={(e) => { setReflexes(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{reflexes}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Age-appropriate immunization completed as per schedule?</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Age-appropriate immunisation completed as per schedule ?"
                                            name="Age-appropriate immunisation completed as per schedule ?"
                                            onChange={(e) => { setChange15(!change15); setAppropriateImmunisation("") }}
                                            id="togBtn"
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
                                                        <input className="form-check-input" value="Yes" type="radio" name="appropriateImmunisation" onChange={(e) => { setAppropriateImmunisation(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Yes
                                                        </label>
                                                        <input className="form-check-input" value="No" type="radio" name="appropriateImmunisation" onChange={(e) => { setAppropriateImmunisation(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{appropriateImmunisation}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Are there any risk factors?</p>
                                <div className="ms-1">0
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Are there any risk factors ?"
                                            name="Are there any risk factors ?"
                                            onChange={(e) => { setRiskFactors(!riskFactors) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                            onChange={(e) => { setChange17(!change17); setHearing("") }}
                                            id="togBtn"
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
                                            onChange={(e) => { setChange18(!change18); setVision("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl18(e.currentTarget)} className="slider round"></div>
                                        {
                                            change18 &&
                                            <Popover
                                                id={id18}
                                                open={open18}
                                                anchorEl={anchorEl18}
                                                onClose={() => setAnchorEl18(null)}
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
                                                        <input className="form-check-input" value="No" type="radio" name="hearing" onChange={(e) => { setVision(e.target.value) }} id="flexRadioDefault1" />
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
                </div>
                <div className='row mt-2'>
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
                                            onChange={(e) => { setHips(!hips) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Oral health</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Oral Health"
                                            name="Oral health"
                                            onChange={(e) => { setChange19(!change19); setOralHealth("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl19(e.currentTarget)} className="slider round"></div>
                                        {
                                            change19 &&
                                            <Popover
                                                id={id19}
                                                open={open19}
                                                anchorEl={anchorEl19}
                                                onClose={() => setAnchorEl19(null)}
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
                                                        <input className="form-check-input" value="Yes" type="radio" name="oralHealth" onChange={(e) => { setOralHealth(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Yes
                                                        </label>
                                                        <input className="form-check-input" value="No" type="radio" name="oralHealth" onChange={(e) => { setOralHealth(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{oralHealth}</p>
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
                                            onChange={(e) => { setChange20(!change20); setOutCome("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl20(e.currentTarget)} className="slider round"></div>
                                        {
                                            change20 &&
                                            <Popover
                                                id={id20}
                                                open={open20}
                                                anchorEl={anchorEl20}
                                                onClose={() => setAnchorEl20(null)}
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
                                                        <input className="form-check-input" value="Yes" type="radio" name="outcome" onChange={(e) => { setOutCome(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Yes
                                                        </label>
                                                        <input className="form-check-input" value="No" type="radio" name="outCome" onChange={(e) => { setOutCome(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{outCome}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Appropriate health information discussed ?</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Appropriate health information discussed?"
                                            name="Appropriate health information discussed?"
                                            onChange={(e) => { setChange21(!change21); setHealthInformation("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl21(e.currentTarget)} className="slider round"></div>
                                        {
                                            change21 &&
                                            <Popover
                                                id={id21}
                                                open={open21}
                                                anchorEl={anchorEl21}
                                                onClose={() => setAnchorEl21(null)}
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
                                                        <input className="form-check-input" value="Yes" type="radio" name="healthInformation" onChange={(e) => { setHealthInformation(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Yes
                                                        </label>
                                                        <input className="form-check-input" value="No" type="radio" name="healthInformation" onChange={(e) => { setHealthInformation(e.target.value) }} id="flexRadioDefault1" />
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
                                <p className='ms-2'>{healthInformation}</p>
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
                        onChange={(e) => { setWriteComments(!writeComments) }}
                        placeholder='Write Comments'>
                    </textarea>
                </div>


            </div>

            <div className='pedriatric_page4_btn'>
                <button className='pedriatric_page4_btn_right' onClick={props.closePaediatricExaminationModal}>Cancel</button>
                {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>}
                <button className='pedriatric_page4_btn_next' onClick={() => {
                    props.passData(8)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(6)
                }}><i class="fa-solid fa-angle-left"></i>Previous Page</button>

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

export default Paediatric_page7;