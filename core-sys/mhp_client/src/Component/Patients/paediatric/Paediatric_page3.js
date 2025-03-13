import { Popover } from '@mui/material';
import React, { useState } from 'react';

const Paediatric_page3 = (props) => {

    const [healthProfessional, setHealthProfessional] = useState("");

    // Health Proffessional to check
    const [change1, setChange1] = useState(false);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;


    return (
        <div className='p-3'>
           <div>
                <p className='fw-bold ms-3'>The 1 to 4 week visit</p>
                <h6 className='ms-3'>Questions for parents/carers</h6>
                </div>
                <div className='shadow-lg bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                   <strong>
                   <span className='me-2'>1.</span>Have you completed <span className='text-danger'>
                   the family health history risk factor questions
                   </span> ?
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
                   <span className='me-2'>2.</span>Are you or anybody else concerned about your baby’s hearing ?
                   </strong>
                   <div className='mt-3'>
                   <input type="radio" id="yes" name="fav_language2" value="yes"/>
                   <label for="" className='ms-3'>Yes</label> <br/>
                   <input type="radio" id="no" name="fav_language2" value="no" />
                   <label for="" className='ms-3'>No</label>
                   </div>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                   <strong>
                   <span className='me-2'>3.</span>Are you concern about your baby’s vision ?
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
                   <span className='me-2'>4.</span>Does your baby exposed to smoking in the home or outside?   
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
                   <span className='me-2'>5.</span>Do you place you baby on your back for sleeping ?
                   </strong>
                   <div className='mt-3'>
                   <input type="radio" id="yes" name="fav_language5" value="yes"/>
                   <label for="" className='ms-3'>Yes</label> <br/>
                   <input type="radio" id="no" name="fav_language5" value="no"/>
                   <label for="" className='ms-3'>No</label>
                   </div>
                </div>
                <div className='row mt-3'>
                <div className='col-4'>
                    <div className="newBorn_boxes pt-2">
                        <div className="d-flex justify-content-around">
                            <p className="w-75">Health professional to Check</p>
                            <div className="ms-1">
                            <label className="switch me-1">
                                    <input
                                        name="SetHealtchProfessional"
                                        value="SetHealtchProfessional"
                                        type="checkbox"
                                        onChange={(e) => { setChange1(!change1); setHealthProfessional("") }}
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
                                        <div className="form-check ms-1">
                                                <input className="form-check-input" value="normal" type="radio" name="headandfontanelles" onChange={(e) => { setHealthProfessional(e.target.value) }} id="flexRadioDefault1" />
                                                <label className="form-check-label">
                                                    Normal
                                                </label>
                                                <input className="form-check-input" value="review" type="radio" name="headandfontanelles" onChange={(e) => { setHealthProfessional(e.target.value) }} id="flexRadioDefault1" />
                                                <label className="form-check-label">
                                                Review
                                                </label>
                                                <input className="form-check-input" value="refer" type="radio" name="headandfontanelles" onChange={(e) => { setHealthProfessional(e.target.value) }} id="flexRadioDefault1" />
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
                            <p className="ms-2">{healthProfessional}</p>
                        </div>
                    </div>
                </div>
                <div>
                <h6 className='mt-3'>Feeding</h6>
                </div>
                <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                   <strong>
                   <span className='me-2'>1.</span>Are you still breast feeding your baby ?
                   </strong>
                   <div className='mt-3'>
                   <input type="radio" id="yes" name="fav_language6" value="yes"/>
                   <label for="" className='ms-3'>Yes</label> <br/>
                   <input type="radio" id="no" name="fav_language6" value="no"/>
                   <label for="" className='ms-3'>No</label>
                   </div>
                </div>
                <div className='mt-3 shadow-lg bg-white rounded'>
                <strong>
                   <span className='me-2 ps-3'>2.</span>Did you start giving your baby any  of the followings ?
                </strong>
                 <div className='row'>
                    <div className='col-4 ps-3'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Vitamins
                    </label>
                    </div>
                    </div>

                    <div className='col-4'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Flavoured water
                    </label>
                    </div>
                    </div>

                    <div className='col-4'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Cow’s milk
                    </label>
                    </div>
                    </div>

                    <div className='col-4 ps-3'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Mineral supplements
                    </label>
                    </div>
                    </div>

                    <div className='col-4'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Fruit juice
                    </label>
                    </div>
                    </div>
                    
                    <div className='col-4'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Soy milk
                    </label>
                    </div>
                    </div>

                    <div className='col-4 ps-3'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Medicine
                    </label>
                    </div>
                    </div>

                    <div className='col-4'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Tea/infusions
                    </label>
                    </div>
                    </div>

                    <div className='col-4'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Evaporated milk
                    </label>
                    </div>
                    </div>

                    <div className='col-4 ps-3'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Plain water
                    </label>
                    </div>
                    </div>

                    <div className='col-4'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Infant formula
                    </label>
                    </div>
                    </div>

                    <div className='col-4'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Condensed milk
                    </label>
                    </div>
                    </div>

                    <div className='col-4 ps-3'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Sweetened
                    </label>
                    </div>
                    </div>

                    <div className='col-4'>
                    <div class="form-check">
                     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                     <label class="form-check-label" for="flexCheckDefault" >
                     Solid or semi-solid food
                    </label>
                    </div>
                    </div>
                 </div>
                </div>
                <div className='footer-content d-flex align-items-center mt-4 ms-2'>
                    <i className="fas fa-edit fa-2x mr-2 align-self-start" style={{fontSize:'18px'}}></i>
                    <p>
                    Current recommendations are that babies receive only breast milk until about 6 months of age (may receive vitamins, mineral supplements or medicine) and continue breastfeeding (While receiving appropriate complementary foods) until 12 months of age or beyond.<span className='text-danger'>NHMRC Infant Feeding</span> Guidelines: Information for Health Workers (2012).
                    </p>
                </div>
                <div className='pedriatric_page4_btn pe-2'>
                  <button className='pedriatric_page4_btn_left'>Save</button>
                  <button className='pedriatric_page4_btn_next' onClick={() => {
                    props.passData(7)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>  
                 <button className='pedriatric_page4_btn_previous'onClick={() => {
                    props.passData(5)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
                </div>
            </div>
        </div>
    );
};

export default Paediatric_page3;