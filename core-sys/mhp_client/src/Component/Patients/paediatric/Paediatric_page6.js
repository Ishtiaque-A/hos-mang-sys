import React, { useState } from 'react';
import './PedriaticExamPage12.css';
import './Paediatric.css';
import dental from './dental.png';
import axios from 'axios';
import { toast } from 'react-toastify';
function PaediatricPage6(props) {

    const [dailyToothBrush, setdailyToothBrush] = useState("no");
    const [family_history, setfamily_history] = useState("no");
    const [regular_dentist, setregular_dentist] = useState("no");

    const handleChange1 = (e) => {
        setdailyToothBrush(e.target.value);

    }
    const handleChange2 = (e) => {
        setfamily_history(e.target.value);

    }

    const handleChange3 = (e) => {
        setregular_dentist(e.target.value);

    }


    const dentalSection={
        daily_tooth_brush:dailyToothBrush,
        family_history:family_history,
        regular_dentist:regular_dentist,
        
        
     }


     const handleSave=(e)=>{
        e.preventDefault(); 
        console.log('state check',dentalSection)
        axios.post(`/save-paediatric-dental-section`, dentalSection).then(res => {
            if (res.data.status == 200) {
                const list = document.querySelectorAll('input[type=radio]');
                for (let checkbox of list) {
                   checkbox.checked = false;
                 }
                toast.success("Data inserted sucessfully");

            }
        
        })  
     }
    

    return (
        <div className=' py-3 px-5 rounded-3'>
            <h6 className='pb-3'><b>Dental Section:</b></h6>

            <div className='dental-info-section bg-white'>
                <div className="row">
                    <div className="col-7">
                        <h4 className='py-2 dental-section'>When do babies teeth come through?</h4>
                        <div className='table-contents mx-3'>
                            <div className='item-heading d-flex justify-content-between py-1 px-2'>
                                <h6>Usual eruption order</h6>
                                <h6>Name of tooth</h6>
                                <h6>Approximate age at eruption</h6>

                            </div>
                            <div className='item d-flex justify-content-between  px-2'>
                                <h6>1,2,3,4</h6>
                                <h6>Incisors</h6>
                                <h6>6-12 months</h6>

                            </div>
                            <div className='item d-flex justify-content-between  px-2'>
                                <h6>5,6</h6>
                                <h6>Baby first molars</h6>
                                <h6>12-20+ months</h6>

                            </div>
                            <div className='item d-flex justify-content-between  px-2'>
                                <h6>7,8</h6>
                                <h6>Canines</h6>
                                <h6>18-24 months</h6>

                            </div>
                            <div className='item d-flex justify-content-between  px-2'>
                                <h6>1,2,3,4</h6>
                                <h6>Incisors</h6>
                                <h6>6-12 months</h6>

                            </div>

                        </div>
                    </div>
                    <div className="col-4  d-flex  align-items-center mx-4 my-4">
                        <img src={dental} className="dental-logo" />
                    </div>
                </div>
            </div>

            <div className='dental-paragraph my-3'>
                <div className='teething-section'>
                    <h5>Teething</h5>
                    <ul>
                        <li>If your child is uncomfortable when teething, offer a teething ring or cold wash cloth.</li>
                        <li>If there are other symptoms, consult a doctor or a child and family health nurse.</li>
                    </ul>
                </div>

                <div className='food-section mt-3'>
                    <h5>Food and drink
                    </h5>
                    <ul>
                        <li> Offer healthy food for meals and snacks from around 6 months of age. • Leave baby foods unsweetened..</li>
                        <li>Leave baby foods unsweetened.</li>
                        <li>Tap water (boiled then cooled until 12 months of age) is the best drink in-between meals and at bedtime.</li>

                        <li>Keep treats, sweet snacks and sweet fizzy drinks for special occasions only.</li>
                    </ul>
                </div>
                <div className='food-section mt-3'>
                    <h5>Toothbrushing tips
                    </h5>
                    <ul>
                        <li>  Keep your own teeth and gums clean and healthy. Germs from your mouth can pass over to your baby’s mouth on dummies, bottles and spoons.</li>
                        <li> As soon as your child’s first teeth appear, clean them using a child-sized soft toothbrush, without toothpaste.</li>
                        <li> From 18 months of age clean your child’s teeth twice a day with a small pea-sized amount of low-fluoride toothpaste. Use a
                            child-sized soft    toothbrush; children should spit out, not swallow, and not rinse.</li>

                        <li>Toothpaste may be introduced earlier, based on the advice of either a health  professional with training in oral health or  an
                            oral health professional</li>
                        <li>An adult should apply toothpaste for  children under 6 years of age and store  toothpaste out of the reach of children.
                        </li>
                        <li>From around 3 years of age children can do some of the tooth-brushing themselves, but they still need an adult’s help to
                            brush their teeth until   they are around 7 to 8 years of age</li>
                        <li> Watch for early signs of tooth decay – white or brown spots that don’t  brush off. Seek professional advice as soon   as
                            possible.</li>
                        <li> Make sure your child has an oral health risk assessment conducted   by a health professional with training in oral health or
                            an oral health professional by their first birthday.</li>
                    </ul>
                </div>

            </div>

            <div className="mt-5">
                <h5 class="pb-2">Dental Risk Factor Questionary:
                </h5>

                <div class="shadow-lg px-4 mb-3 bg-body rounded mt-3 p-2">
                    <b>Do you use a toothbrush and fluoridated toothpaste twice a day?  </b>
                    <div className='question-option ' >
                        <div class="form-check">
                            <input class="form-check-input all" type="radio" name="flexRadioDefault1" value="yes" id="flexRadioDefault1" onChange={handleChange1} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input all" type="radio" name="flexRadioDefault1" value="no" id="flexRadioDefault1" onChange={handleChange1} checked={dailyToothBrush === 'no'} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>
                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-2">
                    <b>Is there a family history of dental disease parent/child and/or sibling?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input all"  type="radio" name="flexRadioDefault2" value="yes" id="flexRadioDefault2" onChange={handleChange2} />
                            <label class="form-check-label mb-2" for="flexRadioDefault2">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input all" type="radio" name="flexRadioDefault2" value="no" id="flexRadioDefault2" onChange={handleChange2} checked={family_history === 'no'} />
                            <label class="form-check-label mb-2" for="flexRadioDefault2">
                                No
                            </label>
                        </div>
                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-2">
                    <b>Do you see a dentist regularly?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input all" type="radio" name="flexRadioDefault3" value="yes" id="flexRadioDefault3" onChange={handleChange3} />
                            <label class="form-check-label mb-2" for="flexRadioDefault3">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input all" type="radio" name="flexRadioDefault3" value="no" id="flexRadioDefault3" onChange={handleChange3} checked={regular_dentist === 'no'} />
                            <label class="form-check-label mb-2" for="flexRadioDefault3">
                                No
                            </label>
                        </div>
                    </div>

                </div>
            </div>

            <div className='footer-content d-flex align-items-center mt-4 ms-2 p-2'>
                    <i className="fas fa-edit fa-2x mr-2 align-self-start" style={{fontSize:'18px'}}></i>
                    <p>
                    If you circled any answer in the first column, please tell your doctor or Health care Nurse.
                    </p>
                </div>

            <div className='pedriatric_btn'>
                <button className='pedriatric_btn_middle' onClick={handleSave}>Save</button>
                <button className='pedriatric_btn_right' onClick={() => {
                    props.passData(13)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(11)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
            </div>
        </div>
    )
}
export default PaediatricPage6;