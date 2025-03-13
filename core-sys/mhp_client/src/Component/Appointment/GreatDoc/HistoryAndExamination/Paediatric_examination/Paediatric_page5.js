import { Popover } from '@mui/material';
import axios from 'axios';
import React, { createRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useScreenshot } from 'use-react-screenshot';

const Paediatric_page5 = (props) => {

    // switch button
    const [screenedBy, setScreenedBy] = useState("");
    const [outcome, setOutcome] = useState("");
    const [outcomeTwo, setOutcomeTwo] = useState("");
    const [referToAudiologist, setReferToAudiologist] = useState("");
    const [repeatScreen, setRepeatScreen] = useState("");
    const [screened2, setScreened2] = useState("");
    const [outcomeAnother, setOutcomeAnother] = useState("");
    const [outcomeAnotherTwo, setOutcomeAnotherTwo] = useState("");
    const [referToAudiologist2, setReferToAudiologist2] = useState("");
    const [hearingRiskFactorIdentity, setHearingRiskFactorIdentity] = useState("");

    // refer to audiologist
    const [change1, setChange1] = useState(false);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;

    // outcome
    const [change2, setChange2] = useState(false);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;

    // repeatScreen
    const [change3, setChange3] = useState(false);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const open3 = Boolean(anchorEl3);
    const id3 = open3 ? 'simple-popover' : undefined;

    // Screen 2
    const [change4, setChange4] = useState(false);
    const [anchorEl4, setAnchorEl4] = useState(null);
    const open4 = Boolean(anchorEl4);
    const id4 = open4 ? 'simple-popover' : undefined;

    // outcome 2
    const [change5, setChange5] = useState(false);
    const [anchorEl5, setAnchorEl5] = useState(null);
    const open5 = Boolean(anchorEl5);
    const id5 = open5 ? 'simple-popover' : undefined;

    // refer to audiologist two
    const [change6, setChange6] = useState(false);
    const [anchorEl6, setAnchorEl6] = useState(null);
    const open6 = Boolean(anchorEl6);
    const id6 = open6 ? 'simple-popover' : undefined;

    // hearing risk factory identity
    const [change7, setChange7] = useState(false);
    const [anchorEl7, setAnchorEl7] = useState(null);
    const open7 = Boolean(anchorEl7);
    const id7 = open7 ? 'simple-popover' : undefined;


    const [change8, setChange8] = useState(false);
    const [anchorEl8, setAnchorEl8] = useState(null);
    const open8 = Boolean(anchorEl8);
    const id8 = open8 ? 'simple-popover' : undefined;


    const [image, takeScreenShot] = useScreenshot();
    const refPE1 = createRef(null);
    const [btnLoading, setbtnLoading] = useState(false)

    const handleSave = (e) => {
        e.preventDefault();

        if (image) {
            const pData = {
                patient_id: parseInt(props.propsData.patient_id),
                page_no: 5,
                image: image
            }
            axios.post(`/paediatric`, pData).then(res => {
                toast.success(res.data.message)
                props.setstateUpdate(Math.random())
                setbtnLoading(false)
            }).catch(error => {
                toast.error("Ops! Something is wrong")
            });
        }

    }

    return (
        <>
            <div ref={refPE1} className='p-3'>
                <div>
                    <p className='fw-bold ms-3'>Infant Screening – Hearing <span className="font-weight-normal"> (Infant hearing screen is <br /> aims to detect babies with significant hearing loss at an early age.)</span> </p>
                </div>
                <div>
                    <p className='fw-bold ms-3'>Questionary about hearing</p>
                    <p className='fw-bold text-danger ms-3'>Questions for parents</p>
                </div>
                <div className='bg-white rounded ps-3 p-2 family_health_box'>
                    <strong>
                        <span className='me-2'>1.</span>My baby had severe breathing problems at birth
                    </strong>
                    <div className='mt-3'>
                        <input type="radio" id="yes" name="fav_language1" value="yes" />
                        <label for="" className='ms-3'>Yes</label> <br />
                        <input type="radio" id="no" name="fav_language1" value="no" />
                        <label for="" className='ms-3'>No</label>
                    </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                    <strong>
                        <span className='me-2'>2.</span>My baby had meningitis
                    </strong>
                    <div className='mt-3'>
                        <input type="radio" id="yes" name="fav_language2" value="yes" />
                        <label for="" className='ms-3'>Yes</label> <br />
                        <input type="radio" id="no" name="fav_language2" value="no" />
                        <label for="" className='ms-3'>No</label>
                    </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                    <strong>
                        <span className='me-2'>3.</span>My baby had jaundice, requiring an exchange transfusion
                    </strong>
                    <div className='mt-3'>
                        <input type="radio" id="yes" name="fav_language3" value="yes" />
                        <label for="" className='ms-3'>Yes</label> <br />
                        <input type="radio" id="no" name="fav_language3" value="no" />
                        <label for="" className='ms-3'>No</label>
                    </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                    <strong>
                        <span className='me-2'>4.</span>My baby was in intensive care for more than 5 days after birth
                    </strong>
                    <div className='mt-3'>
                        <input type="radio" id="yes" name="fav_language4" value="yes" />
                        <label for="" className='ms-3'>Yes</label> <br />
                        <input type="radio" id="no" name="fav_language4" value="no" />
                        <label for="" className='ms-3'>No</label>
                    </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                    <strong>
                        <span className='me-2'>5.</span>I have noticed something unusual about my baby’s head or neck,such as an unusually shaped face,or skin tags
                    </strong>
                    <div className='mt-3'>
                        <input type="radio" id="yes" name="fav_language5" value="yes" />
                        <label for="" className='ms-3'>Yes</label> <br />
                        <input type="radio" id="no" name="fav_language5" value="no" />
                        <label for="" className='ms-3'>No</label>
                    </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                    <strong>
                        <span className='me-2'>6.</span>My baby has Down Syndrome (Trisomy 21) or another condition associated with hearing loss
                    </strong>
                    <div className='mt-3'>
                        <input type="radio" id="yes" name="fav_language6" value="yes" />
                        <label for="" className='ms-3'>Yes</label> <br />
                        <input type="radio" id="no" name="fav_language6" value="no" />
                        <label for="" className='ms-3'>No</label>
                    </div>
                </div>
                <div className='shadow-lg bg-white rounded pb-2'>
                    <div className='row mt-3 p-2'>
                        <div className='col-4 mt-2'>
                            <div className="d-flex justify-content-between newBorn_date_box pt-2">
                                <p className="w-75 ps-2">Date</p>
                                <div className="ms-1">
                                    <label className="me-1">
                                        <input
                                            type="date"
                                            name="Date"
                                            className="date__input"
                                            id="togBtn"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 mt-2'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Screened by (Print Name)</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                name="Screenedby(PrintName)"
                                                value="Screenedby(PrintName)"
                                                type="checkbox"
                                                onChange={(e) => { setScreenedBy(!screenedBy); setChange8(!change8) }}
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
                                                        <div className="">

                                                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Write here' rows="3" onChange={(e) => { setScreenedBy(e.target.value) }} ></textarea>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>

                                <div className="history-popup-value">
                                    <span className='ms-2'>{screenedBy}</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-4 mt-2'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Outcome (Please circle)</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                name="ears"
                                                value="ears"
                                                type="checkbox"
                                                onChange={(e) => { setChange2(!change2); setOutcome("") }}
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
                                                        <div className='d-flex'>
                                                            <div className="form-check ms-1" style={{ border: '1px solid #C9C9C9' }}>
                                                                <input className="form-check-input" value="right" type="radio" name="outcome" onChange={(e) => { setOutcome(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Right
                                                                </label>
                                                                <input className="form-check-input" value="left" type="radio" name="outcome" onChange={(e) => { setOutcome(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Left
                                                                </label>
                                                                <input className="form-check-input" value="both" type="radio" name="outcome" onChange={(e) => { setOutcome(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    both
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1" style={{ border: '1px solid #C9C9C9' }}>
                                                                <input className="form-check-input" value="pass" type="radio" name="outcome2" onChange={(e) => { setOutcomeTwo(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Pass
                                                                </label>
                                                                <input className="form-check-input" value="refer" type="radio" name="outcome2" onChange={(e) => { setOutcomeTwo(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Refer
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <span className='ms-2'>{outcome}</span>
                                    <span className='ms-2'>{outcomeTwo}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row p-2' style={{ marginTop: '-12px' }}>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Refer to Audiologist</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Hips"
                                                name="Hips"
                                                onChange={(e) => { setChange1(!change1); referToAudiologist("") }}
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
                                                        <div className="form-group">
                                                            <label for="exampleFormControlTextarea1">Reason</label>
                                                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Write here' rows="3" onChange={(e) => { setReferToAudiologist(e.target.value) }} ></textarea>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <span className='ms-2'>{referToAudiologist}</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Repeat Screen</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Skin"
                                                name="Skin"
                                                onChange={(e) => { setChange3(!change3); setRepeatScreen("") }}
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
                                                        <div className='d-flex'>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Required" type="radio" name="repeatscreen" onChange={(e) => { setRepeatScreen(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Required
                                                                </label>
                                                                <input className="form-check-input" value="Not Required" type="radio" name="repeatscreen" onChange={(e) => { setRepeatScreen(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Not Required
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{repeatScreen}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-3 p-2'>
                        <div className='col-4'>
                            <div className="d-flex justify-content-between newBorn_date_box pt-2">
                                <p className="w-75 ps-2">Repeat Screen Date</p>
                                <div className="ms-1">
                                    <label className="me-1">
                                        <input
                                            type="date"
                                            name="Date"
                                            className="date__input"
                                            id="togBtn"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Screened by (Print Name)</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Screened by (Print Name)"
                                                name="Screened by (Print Name)"
                                                onChange={(e) => { setChange4(!change4); setScreened2("") }}
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
                                                        <div className="">

                                                            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Write here' rows="3" onChange={(e) => { setScreened2(e.target.value) }} ></textarea>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <p className='ms-2'>{screened2}</p>
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
                                                value="Skin"
                                                name="Skin"
                                                onChange={(e) => { setChange5(!change5); setOutcomeAnotherTwo("") }}
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
                                                        <div className='d-flex'>
                                                            <div className="form-check ms-1" style={{ border: '1px solid #C9C9C9' }}>
                                                                <input className="form-check-input" value="right" type="radio" name="outcomeAnother" onChange={(e) => { setOutcomeAnother(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Right
                                                                </label>
                                                                <input className="form-check-input" value="left" type="radio" name="outcomeAnother" onChange={(e) => { setOutcomeAnother(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Left
                                                                </label>
                                                                <input className="form-check-input" value="both" type="radio" name="outcomeAnother" onChange={(e) => { setOutcomeAnother(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    both
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1" style={{ border: '1px solid #C9C9C9' }}>
                                                                <input className="form-check-input" value="pass" type="radio" name="outcomeAnotherTwo" onChange={(e) => { setOutcomeAnotherTwo(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Pass
                                                                </label>
                                                                <input className="form-check-input" value="refer" type="radio" name="outcomeAnotherTwo" onChange={(e) => { setOutcomeAnotherTwo(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Refer
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <span className='ms-2'>{outcomeAnother}</span>
                                    <span className='ms-2'>{outcomeAnotherTwo}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row p-2'>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Refer to Audiologist</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Hips"
                                                name="Hips"
                                                onChange={(e) => { setChange6(!change6); setReferToAudiologist2("") }}
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
                                                        <div className='d-flex'>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Yes" type="radio" name="referToAudiologist2" onChange={(e) => { setReferToAudiologist2(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Yes
                                                                </label>
                                                                <input className="form-check-input" value="No" type="radio" name="referToAudiologist2" onChange={(e) => { setReferToAudiologist2(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <span className='ms-2'>{referToAudiologist2}</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="newBorn_boxes pt-2">
                                <div className="d-flex justify-content-around">
                                    <p className="w-75">Hearing risk factor identity</p>
                                    <div className="ms-1">
                                        <label className="switch me-1">
                                            <input
                                                type="checkbox"
                                                value="Hips"
                                                name="Hips"
                                                onChange={(e) => { setChange7(!change7); setHearingRiskFactorIdentity("") }}
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
                                                        <div className='d-flex'>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Yes" type="radio" name="hearingRiskFactorIdentity" onChange={(e) => { setHearingRiskFactorIdentity(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Yes
                                                                </label>
                                                                <input className="form-check-input" value="No" type="radio" name="hearingRiskFactorIdentity" onChange={(e) => { setHearingRiskFactorIdentity(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    No
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="history-popup-value">
                                    <span className='ms-2'>{hearingRiskFactorIdentity}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-content d-flex align-items-center mt-4 ms-2'>
                    <i className="fas fa-edit fa-2x mr-2 align-self-start" style={{ fontSize: '18px' }}></i>
                    <p>
                    When yes is ticked please consult your health professional to arrange an age-appropriate hearing test at 10-12 months (corrected).
                    </p>
                </div>

            </div>
            <div className='pedriatric_page4_btn pe-2'>
                <button className='pedriatric_page4_btn_right' onClick={props.closePaediatricExaminationModal}>Cancel</button>
                {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>}
                <button className='pedriatric_page4_btn_next' onClick={() => {
                    props.passData(6)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(4)
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

export default Paediatric_page5;