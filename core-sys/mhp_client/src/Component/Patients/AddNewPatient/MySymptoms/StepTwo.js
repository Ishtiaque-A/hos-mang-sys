import React, { useState } from 'react';
import symptom1 from '../../../../Images/symptom2.svg';
const StepTwo = (props) => {
    const [checked1,setChecked1] = useState(false);
    const [checked2,setChecked2] = useState(false);
    return (
        <div>
            <div className="row step-two-container">
                <div className="col-8 mb-3">
                    <h3>Terms of Service</h3>
                    <p>Before using the checkup, please read Terms of Service. Remember that:</p>
                    <ul>
                        <li> <strong>Checkup is not a diagnosis</strong>. Checkup is for informational purposes and is not a qualified medical opinion.</li>
                        <li> <strong>Do not use in emergencies</strong>. In case of health emergency, call your local emergency number immediately.</li>
                        <li> <strong>Your data is safe</strong>. Information that you provide is anonymous and not shared with anyone.</li>
                    </ul>
                    <div className="form-check">
                        <input onChange={()=>setChecked2(!checked2)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" for="flexCheckDefault">
                            I read and accept Terms of Service and Privacy Policy.
                        </label>
                    </div>
                    <div class="form-check">
                        <input onChange={()=>setChecked1(!checked1)} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label className="form-check-label" for="flexCheckChecked">
                            I agree to the processing of my health information for the purpose of performing the interview.
                        </label>
                    </div>
                </div>
                <div className="col-4">
                    <img src={symptom1} alt="" className="img-fluid" />
                </div>
            </div>
            <button className="btn btn-outline-primary" onClick={() => props.setStep(0)}><i className="far fa-chevron-left"></i> Back</button>
            <button className={`step-btn-next btn btn-primary float-end ${checked1 && checked2 ? "" : "disabled"}`} onClick={() => props.setStep(2)}>Next</button>
        </div>
    );
};

export default StepTwo;