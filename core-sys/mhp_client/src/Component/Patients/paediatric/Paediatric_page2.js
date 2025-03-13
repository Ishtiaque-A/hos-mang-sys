import { Popover } from '@mui/material';
import React,{useState} from 'react';

const Paediatric_page2 = (props) => {

    // switch button

    const [screenedBy, setScreenedBy] = useState("");
    const [outcome, setOutcome] = useState("");
    const [outcomeTwo, setOutcomeTwo] = useState("");
    const [referToAudiologist, setReferToAudiologist] = useState("");
    const [repeatScreen, setRepeatScreen] = useState(false);
    const [screened2, setScreened2] = useState(false);
    const [outcome2, setOutcome2] = useState(false);
    const [referToAudiologist2, setReferToAudiologist2] = useState(false);
    const [hearingRiskFactorIdentity, setHearingRiskFactorIdentity] = useState(false);

    // Head and fontanelles
    const [change1, setChange1] = useState(false);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;

    // Ice including red reflex
     const [change2, setChange2] = useState(false);
     const [anchorEl2, setAnchorEl2] = useState(null);
     const open2 = Boolean(anchorEl2);
     const id2 = open2 ? 'simple-popover' : undefined;


    return (
        <div className='p-3'>
               <div>
                    <p className='fw-bold ms-3'>Infant Screening – Hearing <span className="font-weight-normal"> (Infant hearing screen is <br/> aims to detect babies with significant hearing loss at an early age.)</span> </p>
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
                   <input type="radio" id="yes" name="fav_language1" value="yes"/>
                   <label for="" className='ms-3'>Yes</label> <br/>
                   <input type="radio" id="no" name="fav_language1" value="no"/>
                   <label for="" className='ms-3'>No</label>
                   </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                   <strong>
                   <span className='me-2'>2.</span>My baby had meningitis
                   </strong>
                   <div className='mt-3'>
                   <input type="radio" id="yes" name="fav_language2" value="yes"/>
                   <label for="" className='ms-3'>Yes</label> <br/>
                   <input type="radio" id="no" name="fav_language2" value="no"/>
                   <label for="" className='ms-3'>No</label>
                   </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                   <strong>
                   <span className='me-2'>3.</span>My baby had jaundice, requiring an exchange transfusion
                   </strong>
                   <div className='mt-3'>
                   <input type="radio" id="yes" name="fav_language3" value="yes"/>
                   <label for="" className='ms-3'>Yes</label> <br/>
                   <input type="radio" id="no" name="fav_language3" value="no"/>
                   <label for="" className='ms-3'>No</label>
                   </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                   <strong>
                   <span className='me-2'>4.</span>My baby was in intensive care for more than 5 days after birth 
                   </strong>
                   <div className='mt-3'>
                   <input type="radio" id="yes" name="fav_language4" value="yes"/>
                   <label for="" className='ms-3'>Yes</label> <br/>
                   <input type="radio" id="no" name="fav_language4" value="no"/>
                   <label for="" className='ms-3'>No</label>
                   </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                   <strong>
                   <span className='me-2'>5.</span>I have noticed something unusual about my baby’s head or neck,such as an unusually shaped face,or skin tags
                   </strong>
                   <div className='mt-3'>
                   <input type="radio" id="yes" name="fav_language5" value="yes"/>
                   <label for="" className='ms-3'>Yes</label> <br/>
                   <input type="radio" id="no" name="fav_language5" value="no"/>
                   <label for="" className='ms-3'>No</label>
                   </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                   <strong>
                   <span className='me-2'>6.</span>My baby has Down Syndrome (Trisomy 21) or another condition associated with hearing loss
                   </strong>
                   <div className='mt-3'>
                   <input type="radio" id="yes" name="fav_language6" value="yes"/>
                   <label for="" className='ms-3'>Yes</label> <br/>
                   <input type="radio" id="no" name="fav_language6" value="no"/>
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
                                        onChange={(e) => { setChange1(!change1); setScreenedBy("") }}
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
                                       <label for="exampleFormControlTextarea1">Screened by (Print Name)</label>
                                       <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Write here' rows="3" onChange={(e) => { setScreenedBy(e.target.value) }} ></textarea>
                                        </div> 
                                        </div>
                                    </Popover>
                                    }
                                </label>
                            </div>
                        </div>
                        <div className="history-popup-value">
                                <p className='ms-2'>{screenedBy}</p>
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
                                            <div className="form-check ms-1" style={{border:'1px solid #C9C9C9'}}>
                                                <input className="form-check-input" value="right" type="radio" name="outcome" onChange={(e) => { setOutcome(e.target.value) }} id="flexRadioDefault1" />
                                                <label className="form-check-label">
                                                    Right
                                                </label>
                                                <input className="form-check-input" value="left" type="radio" name="outcome" onChange={(e) => { setOutcome(e.target.value) }} id="flexRadioDefault1" />
                                                <label className="form-check-label">
                                                Left
                                                </label>
                                            </div>
                                            <div className="form-check ms-1" style={{border:'1px solid #C9C9C9'}}>
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
            <div className='row p-2' style={{marginTop:'-12px'}}>
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
                                        onChange={(e) => { setReferToAudiologist(!referToAudiologist) }}
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
                            <p className="w-75">Repeat Screen</p>
                            <div className="ms-1">
                                <label className="switch me-1">
                                    <input
                                        type="checkbox"
                                        value="Skin"
                                        name="Skin"
                                        onChange={(e) => { setRepeatScreen(!repeatScreen) }}
                                        id="togBtn"
                                    />
                                    <div className="slider round"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3 p-2'>
                <div className='col-4'>
                    <div className="newBorn_boxes pt-2">
                        <div className="d-flex justify-content-around">
                            <p className="w-75">Screened by (Print Name)</p>
                            <div className="ms-1">
                                <label className="switch me-1">
                                    <input
                                        type="checkbox"
                                        value="Hips"
                                        name="Hips"
                                        onChange={(e) => { setScreened2(!screened2) }}
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
                            <p className="w-75">Outcome</p>
                            <div className="ms-1">
                                <label className="switch me-1">
                                    <input
                                        type="checkbox"
                                        value="Skin"
                                        name="Skin"
                                        onChange={(e) => { setOutcome2(!outcome2) }}
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
                            <p className="w-75">Refer to Audiologist</p>
                            <div className="ms-1">
                                <label className="switch me-1">
                                    <input
                                        type="checkbox"
                                        value="Reflexes"
                                        name="Reflexes"
                                        onChange={(e) => { setReferToAudiologist2(!referToAudiologist2) }}
                                        id="togBtn"
                                    />
                                    <div className="slider round"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row p-2'>
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
                                        onChange={(e) => { setHearingRiskFactorIdentity(!hearingRiskFactorIdentity)}}
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
            <div className='footer-content d-flex align-items-center mt-4 ms-2'>
                    <i className="fas fa-edit fa-2x mr-2 align-self-start" style={{fontSize:'18px'}}></i>
                    <p>
                    When yes is ticked please consult your health professional to arrange an age appropriate hearing test at 10-12 months(coorrected).
                    </p>
                </div>
                <div className='pedriatric_page4_btn pe-2'>
                  <button className='pedriatric_page4_btn_left'>Save</button>
                  <button className='pedriatric_page4_btn_next' onClick={() => {
                    props.passData(6)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>  
                 <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(4)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
                </div>
        </div> 
    );
};

export default Paediatric_page2;