import React, { useState } from 'react';
import './MySymptoms.css';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import MultiStep from 'react-multistep'
const MySymptoms = (props) => {
    const [activeStep, setActiveState] = useState(0);
    const steps = [
        { name: 'StepOne', component: <StepOne setStep={setActiveState} /> },
        { name: 'StepTwo', component: <StepTwo setStep={setActiveState} /> },
        { name: 'StepThree', component: <StepThree gender={props.gender} setStep={setActiveState} /> },

    ];
    // const g = props.gender;
    // console.log(g.birth_sex_name);
    return (
        <div>
            <div className="custom-card p-2">
                <h6 className="card-title">My symptoms</h6>
            </div>
            <div className="custom-card mt-2 p-2">
                <div className="card-body ">
                    <MultiStep activeStep={activeStep} showNavigation={false} steps={steps} />
                </div>
            </div>
        </div>
    );
};

export default MySymptoms;