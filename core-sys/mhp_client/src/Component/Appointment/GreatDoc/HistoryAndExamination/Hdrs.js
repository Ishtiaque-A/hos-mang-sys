import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import useResizeObserver from '../../../../hooks/useResizeObserver';

const Hdrs = (props) => {
    const { width } = useResizeObserver();
    const customStyles = {
        content: {
            top: '37%',
            left: '21%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: width > 900 ? "75%" : "86%",
            height: width > 900 ? "83%" : "75%",
            background: "#fff",
            padding: "10px",
            marginLeft: width > 900 ? "38%" : "32%"
        },

    };

    const [hamiltonDepressionPage1, setHamiltonDepressionPage1] = useState({});


    const handleInputChange = (e) => {

        setHamiltonDepressionPage1({
            ...hamiltonDepressionPage1, [e.target.name]: parseInt(e.target.value)
        })
    }

    const [HdrsTotalScore, setHdrsTotalScore] = useState(0)

    useEffect(() => {
        let a = 0;
        for (const [key, value] of Object.entries(hamiltonDepressionPage1)) {
            a = a + value;
            setHdrsTotalScore(a)
        }
    }, [hamiltonDepressionPage1])


    const hdrsSave = () => {
        props.setHdrsTotalScore(HdrsTotalScore)

        setHamiltonDepressionPage1({})
        setHdrsTotalScore(0)
        props.closehdrsModal()

        toast.success("Hdrs data save successfully")
    }
    return (
        <div>
            <Modal
                isOpen={props.hdrsIsOpen}
                onRequestClose={props.closehdrsModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <span className='float-end' style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => {
                    setHamiltonDepressionPage1({})
                    setHdrsTotalScore(0)
                    props.closehdrsModal()
                }}><i class="fal fa-times"></i></span>
                <h6 className="card-title" style={{ fontSize: "14px" }}>Hamilton Depression Rating Scale (HDRS)</h6>
                <hr className='popup-hr' />
                <div className='cns-container' style={{ marginLeft: "-20px" }}>
                    <ul class="nav nav-pills mb-2" id="pills-tab" role="tablist">

                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Page-1</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Page-2</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-page-3" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Page-3</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-page-4" type="button" role="tab" aria-controls="pills-page-4" aria-selected="false">Page-4</button>
                        </li>

                        <li >
                            <button class="nav-link" >Total Score: {HdrsTotalScore}</button>
                        </li>

                    </ul>
                </div>

                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>1. DEPRESSED MODE</b> <br />
                                <div>
                                    <input type="radio" id="" name="depressed_mood" value="0" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>0- Absent</label> <br></br>
                                    <input type="radio" id="" name="depressed_mood" value="1" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>1- These feeling states indicated only on questioning</label> <br></br>
                                    <input type="radio" id="" name="depressed_mood" value="2" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>2- These feeling states spontaneously reported verbally</label> <br></br>
                                    <input type="radio" id="" name="depressed_mood" value="3" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>3- Communicates feeling states non-verbally, i.e. through facial expression, posture, voice and tendency to weep</label> <br></br>
                                    <input type="radio" id="" name="depressed_mood" value="4" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>4- Patient reports virtually only these feeling states in his/her spontaneous verbal and non-verbal communication</label>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>2.  FEELINGS OF GUILT</b> <br />
                                <div>
                                    <input type="radio" id="" name="feelings_guilt" value="0" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>0- Absent</label> <br></br>
                                    <input type="radio" id="" name="feelings_guilt" value="1" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>1- Self reproach, feels he/she has let people down</label> <br></br>
                                    <input type="radio" id="" name="feelings_guilt" value="2" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>2- Ideas of guilt or rumination over past errors or sinful deeds</label> <br></br>
                                    <input type="radio" id="" name="feelings_guilt" value="3" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>3-  Present illness is a punishment. Delusions of guilt</label> <br></br>
                                    <input type="radio" id="" name="feelings_guilt" value="4" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>4- Hears accusatory or denunciatory voices and/or experiences threatening visual hallucinations</label>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>3. SUICIDE</b> <br />
                                <div>
                                    <input type="radio" id="" name="suicide" value="0" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>0- Absent.</label> <br></br>
                                    <input type="radio" id="" name="suicide" value="1" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>1-  Feels life is not worth living</label> <br></br>
                                    <input type="radio" id="" name="suicide" value="2" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>2- Wishes he/she were dead or any thoughts of possible death to self.</label> <br></br>
                                    <input type="radio" id="" name="suicide" value="3" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>3- Ideas or gestures of suicide</label> <br></br>
                                    <input type="radio" id="" name="suicide" value="4" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>4- Attempts at suicide (any serious attempt rate 4)</label>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>4. INSOMNIA: EARLY IN THE NIGHT</b> <br />
                                <div>
                                    <input type="radio" id="" name="insomnia" value="0" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>0- No difficulty falling asleep.</label> <br></br>
                                    <input type="radio" id="" name="insomnia" value="1" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>1- Complains of occasional difficulty falling asleep, i.e.more than 1⁄2 hour.</label> <br></br>
                                    <input type="radio" id="" name="insomnia" value="2" onClick={handleInputChange} />
                                    <label for="html" className='ms-2'>2- Complains of nightly difficulty falling asleep</label>
                                </div>
                            </div>
                        </div>
                        <div className='pedriatric_btn'>
                            <button className='pedriatric_btn_left' onClick={() => {
                                setHamiltonDepressionPage1({})
                                setHdrsTotalScore(0)
                                props.closehdrsModal()
                            }}>Cancel</button>
                            <button className='pedriatric_btn_middle' onClick={hdrsSave}>Save</button>
                        </div>
                    </div>

                    {/* Tab2 */}

                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>5. INSOMNIA: MIDDLE OF THE NIGHT</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" value="0" name="nodifficulty" />
                                    <label for="html" className='ms-2'>0- No difficulty</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" value="1" name="duringthenight" />
                                    <label for="html" className='ms-2'>1-  Patient complains of being restless and disturbed during the night</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" value="2" name="appearssad" />
                                    <label for="html" className='ms-2'>2-Appears sad and unhappy most of the time</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" value="3" name="bedrates" />
                                    <label for="html" className='ms-2'>3- Waking during the night – any getting out of bed rates2 (except for purposes of voiding)</label> <br></br>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>6. INSOMNIA: EARLY HOURS OF THE MORNING</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="early_hours_morning" value="0" />
                                    <label for="html" className='ms-2'>0- No difficulty.</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language6" value="1" />
                                    <label for="html" className='ms-2'>1- Waking in early hours of the morning but goes back to sleep.</label> <br></br>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>7. WORK AND ACTIVITIES</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language7" value="0" />
                                    <label for="html" className='ms-2'>0- No difficulty</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language7" value="1" />
                                    <label for="html" className='ms-2'>1- Thoughts and feelings of incapacity, fatigue or weakness related to activities, work or hobbies</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language7" value="2" />
                                    <label for="html" className='ms-2'>2- Loss of interest in activity, hobbies or work – either directly reported by the patient or indirect in listlessness, indecision and vacillation (feels he/she has to push self to work or activities)</label> <br></br> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language7" value="3" />
                                    <label for="html" className='ms-2'>3- | Decrease in actual time spent in activities or decrease in productivity. Rate 3 if the patient does not spend at least three hours a day in activities (job or hobbies) excluding routine chores</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language7" value="4" />
                                    <label for="html" className='ms-2'>4- Stopped working because of present illness. Rate 4 if patient engages in no activities except routine chores,or if patient fails to perform routine chores unassisted</label>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>8. RETARDATION (slowness of thought and speech, impaired ability to concentrate, decreased motor activity)</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language8" value="0" />
                                    <label for="html" className='ms-2'>0- Normal speech and thought</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language8" value="1" />
                                    <label for="html" className='ms-2'>1-  Slight retardation during the interview</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language8" value="2" />
                                    <label for="html" className='ms-2'>2- Obvious retardation during the interview</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language8" value="3" />
                                    <label for="html" className='ms-2'>3- Interview difficult</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language8" value="4" />
                                    <label for="html" className='ms-2'>4- Complete stupor.</label> <br></br>
                                </div>
                            </div>
                        </div>
                        <div className='pedriatric_btn'>
                            <button className='pedriatric_btn_left' onClick={() => {
                                setHamiltonDepressionPage1({})
                                setHdrsTotalScore(0)
                                props.closehdrsModal()
                            }}>Cancel</button>
                            <button onClick={hdrsSave} className='pedriatric_btn_middle'>Save</button>
                        </div>
                    </div>

                    {/* Tab3 */}

                    <div class="tab-pane fade" id="pills-page-3" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>9.AGITATION</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language9" value="0" />
                                    <label for="html" className='ms-2'>0-  None</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language9" value="1" />
                                    <label for="html" className='ms-2'>1-  Fidgetiness</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language9" value="2" />
                                    <label for="html" className='ms-2'>2- Playing with hands, hair, etc</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language9" value="3" />
                                    <label for="html" className='ms-2'>3- Moving about, can’t sit still</label> <br></br>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>10.ANXIETY PSYCHIC</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language10" value="0" />
                                    <label for="html" className='ms-2'>0-  No difficulty</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language10" value="1" />
                                    <label for="html" className='ms-2'>1- Subjective tension and irritability.</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language10" value="2" />
                                    <label for="html" className='ms-2'>2- Worrying about minor matters.</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language10" value="3" />
                                    <label for="html" className='ms-2'>3-  Apprehensive attitude apparent in face or speech</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language10" value="4" />
                                    <label for="html" className='ms-2'>4-  Fears expressed without questioning</label> <br></br>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>11. ANXIETY SOMATIC (physiological concomitants of anxiety) </b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language11" value="0" />
                                    <label for="html" className='ms-2'>0-  Absent</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language11" value="1" />
                                    <label for="html" className='ms-2'>1- Thoughts and feelings of incapacity, fatigue or weakness related to activities, work or hobbies</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language11" value="2" />
                                    <label for="html" className='ms-2'>2- Mild</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language11" value="3" />
                                    <label for="html" className='ms-2'>3- Moderate</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language11" value="4" />
                                    <label for="html" className='ms-2'>4- Severe</label><br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language11" value="5" />
                                    <label for="html" className='ms-2'>5- Incapacitating</label>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>12.SOMATIC SYMPTOMS GASTRO-INTESTINAL</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language12" value="0" />
                                    <label for="html" className='ms-2'>0-  None</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language12" value="1" />
                                    <label for="html" className='ms-2'>1-  Loss of appetite but eating without staff encouragement. Heavy feelings in abdomen</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language12" value="2" />
                                    <label for="html" className='ms-2'>2-  Difficulty eating without staff urging. Requests or requires laxatives or medication for bowels or medication for gastro-intestinal symptoms</label> <br></br>
                                </div>
                            </div>
                        </div>
                        <div className='pedriatric_btn'>
                            <button className='pedriatric_btn_left' onClick={() => {
                                setHamiltonDepressionPage1({})
                                setHdrsTotalScore(0)
                                props.closehdrsModal()
                            }}>Cancel</button>
                            <button onClick={hdrsSave} className='pedriatric_btn_middle'>Save</button>
                        </div>
                    </div>
                    {/* Tab4 */}

                    <div class="tab-pane fade" id="pills-page-4" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>13. GENERAL SOMATIC SYMPTOMS</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language13" value="0" />
                                    <label for="html" className='ms-2'>0-  None</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language13" value="1" />
                                    <label for="html" className='ms-2'>1- Heaviness in limbs, back or head. Backaches,headaches, muscle aches. Loss of energy and fatigability</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language13" value="2" />
                                    <label for="html" className='ms-2'>2-  Any clear-cut symptom rates 2</label>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>14 .GENITAL SYMPTOMS (symptoms such as loss of libido, menstrual disturbances)</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language14" value="0" />
                                    <label for="html" className='ms-2'>0-  Absent</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language14" value="1" />
                                    <label for="html" className='ms-2'>1- Mild</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language14" value="2" />
                                    <label for="html" className='ms-2'>2- Severe</label>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>15. HYPOCHONDRIASIS </b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language15" value="0" />
                                    <label for="html" className='ms-2'>0- Not present</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language15" value="1" />
                                    <label for="html" className='ms-2'>1- Thoughts and feelings of incapacity, fatigue or weakness related to activities, work or hobbies</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language15" value="2" />
                                    <label for="html" className='ms-2'>2-  Self-absorption (bodily)</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language15" value="3" />
                                    <label for="html" className='ms-2'>3- Preoccupation with health</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language15" value="4" />
                                    <label for="html" className='ms-2'>4- Frequent complaints, requests for help, etc</label><br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language15" value="5" />
                                    <label for="html" className='ms-2'>5- Hypochondriacal delusions</label>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>16. LOSS OF WEIGHT</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language16" value="0" />
                                    <label for="html" className='ms-2'>0- | No weight loss</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language16" value="1" />
                                    <label for="html" className='ms-2'>1- Probable weight loss associated with present illness</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language16" value="2" />
                                    <label for="html" className='ms-2'>2- Definite (according to patient) weight loss</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language16" value="3" />
                                    <label for="html" className='ms-2'>3- Not assessed</label> <br></br>
                                </div>
                            </div>
                        </div>
                        <div className='apparent_sadness mt-2'>
                            <div className='apparent_two'>
                                <b>17. INSIGHT</b> <br />
                                <div>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language17" value="0" />
                                    <label for="html" className='ms-2'>0- Acknowledges being depressed and ill</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language17" value="1" />
                                    <label for="html" className='ms-2'>1- Acknowledges illness but attributes cause to bad food,climate, overwork, virus, need for rest, etc</label> <br></br>
                                    <input type="radio" onClick={handleInputChange} id="" name="fav_language17" value="2" />
                                    <label for="html" className='ms-2'>2- Denies being ill at all</label>
                                </div>
                            </div>
                        </div>
                        <div className='pedriatric_btn'>
                            <button className='pedriatric_btn_left' onClick={() => {
                                setHamiltonDepressionPage1({})
                                setHdrsTotalScore(0)
                                props.closehdrsModal()
                            }}>Cancel</button>
                            <button onClick={hdrsSave} className='pedriatric_btn_middle'>Save</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Hdrs;