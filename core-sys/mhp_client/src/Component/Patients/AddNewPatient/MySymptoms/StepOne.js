import React from 'react';
import symptom1 from '../../../../Images/symptom1.svg';
const StepOne = (props) => {
    return (
        <div className='symptom-one-container clearfix'>
            <div className='clearfix'>
                <img className='float-end' src={symptom1} alt="" />
            </div>
            <div style={{width:"350px"}}>
                <h3>Hello</h3>
                <p>You’re about to use a short (3 min), safe and anonymous health checkup. Your answers will be carefully analyzed and you’ll learn about possible causes of your symptoms.</p>
            </div>
            <button className='step-btn-next btn btn-primary float-end' onClick={() => props.setStep(1)}>Next</button>
        </div>
    );
};

export default StepOne;