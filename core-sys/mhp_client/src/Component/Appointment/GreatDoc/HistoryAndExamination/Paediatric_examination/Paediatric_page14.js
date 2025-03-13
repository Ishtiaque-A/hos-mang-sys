import React, { createRef, useState } from 'react';
import './PedriaticExamPage12.css';
import dental from './dental.png';
import { useScreenshot } from 'use-react-screenshot';
import axios from 'axios';
import { toast } from 'react-toastify';


function PaediatricPage14(props) {

    const [image, takeScreenShot] = useScreenshot();
    const refPE1 = createRef(null);
    const [btnLoading, setbtnLoading] = useState(false)


    const handleSave = (e) => {
        e.preventDefault();
        if (image) {
            const pData = {
                patient_id: parseInt(props.propsData.patient_id),
                page_no: 14,
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
            <div ref={refPE1} className='bg-white py-3 px-5 rounded-3'>
                <h5 className='pb-1'><b>The 12 months old Check:  </b></h5>
                <b className=''>for parents/carers Answer these questions before you visit your nurse or doctor
                </b>



                <div className="mt-4">
                    <h6 class="pb-2"><b>Social/emotional</b>
                    </h6>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-3 p-3">
                        <b>Is the child shy or nervous with strangers?  </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" value="yes" />
                                <label class="form-check-label mb-2 " for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault1" value="no" id="flexRadioDefault1" />
                                <label class="form-check-label mb-2 " for="flexRadioDefault1">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child cries when mum or dad leaves?  </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault2">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault2">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault2">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child has favorite things and people ? </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefaul3" id="flexRadioDefault3" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault3">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault3" id="flexRadioDefault3" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault3">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault3" id="flexRadioDefault3" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault3">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child shows fear in some situations? </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault4" id="flexRadioDefault4" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault4">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault4" id="flexRadioDefault4" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault4">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault4" id="flexRadioDefault4" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault4">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child hands you a book when he or she wants to hear a story?  </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault5" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault5">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault5" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault5">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault5" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault5">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child repeats sounds or actions to get attention?</b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault6" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault6" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault6">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault6" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault6">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child puts out arm or leg to help with dressing?</b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault7" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault7">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault7" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault7">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault7" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault7">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child plays games such as “peek-a-boo” and “pat-a-cake”? </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault8" id="flexRadioDefault8" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault8">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault8" id="flexRadioDefault8" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault8">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault8" id="flexRadioDefault8" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault8">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <h5 className='py-3'> <b>Language/communication</b></h5>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child responds to simple spoken requests? </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault9" id="flexRadioDefault9" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault9">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault9" id="flexRadioDefault9" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault9">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault9" id="flexRadioDefault9" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault9">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child uses simple gestures, like shaking head “no” or waving “bye-bye” ? </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault10" id="flexRadioDefault10" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault10">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault10" id="flexRadioDefault10" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault10">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault10" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault10">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child makes sounds with changes in tone (sounds like speech)?  </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault11" id="flexRadioDefault11" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault11">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault11" id="flexRadioDefault11" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault11">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault11" id="flexRadioDefault1" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child says “mama” and “dada” and exclamations like “uh-oh!”? </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault12" id="flexRadioDefault12" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault12">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault12" id="flexRadioDefault12" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault12">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault12" id="flexRadioDefault12" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault12">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child tries to say words you say? </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault13" id="flexRadioDefault13" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault13">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault13" id="flexRadioDefault13" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault13">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault13" id="flexRadioDefault13" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault13">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <h5 className='py-3'> <b>Cognitive (learning, thinking, problem-solving)</b></h5>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child explores things in different ways, like shaking, banging, throwing?     </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault14" id="flexRadioDefault14" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault14">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault14" id="flexRadioDefault14" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault14">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault14" id="flexRadioDefault14" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault14">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child finds hidden things easily? </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault15" id="flexRadioDefault15" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault15">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault15" id="flexRadioDefault15" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault15">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault15" id="flexRadioDefault15" value="not Sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault15">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child looks at the right picture or thing when it’s named? </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault16" id="flexRadioDefault16" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault16">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault16" id="flexRadioDefault16" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault16">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault16" id="flexRadioDefault16" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault16">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child copies gestures?     </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault17" id="flexRadioDefault17" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault17">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault17" id="flexRadioDefault17" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault17">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault17" id="flexRadioDefault17" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault17">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child starts to use things correctly. For example, drinks from a cup?   </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault18" id="flexRadioDefault18" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault18" id="flexRadioDefault18" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault18">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault18" id="flexRadioDefault18" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child brushes hair?      </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault19" id="flexRadioDefault19" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault19">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault19" id="flexRadioDefault19" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault19">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault19" id="flexRadioDefault19" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault19">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child bangs two things together?   </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault20" id="flexRadioDefault20" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault20">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault20" id="flexRadioDefault20" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault20">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault20" id="flexRadioDefault20" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault20">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child puts things in a container, takes things out of a container?     </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault21" id="flexRadioDefault21" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault21">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault21" id="flexRadioDefault21" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault21">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault21" id="flexRadioDefault21" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault21">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child lets things go without help?    </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault21" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault21">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault21" value="no " />
                                <label class="form-check-label mb-2" for="flexRadioDefault21">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault21" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault21">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child pokes with index (pointer) finger?      </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault22" id="flexRadioDefault22" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault22">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault22" id="flexRadioDefault22" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault22">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault22" id="flexRadioDefault22" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault22">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child follows simple directions like “pick up the toy”?        </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault23" id="flexRadioDefault23" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault23">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault23" id="flexRadioDefault23" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault23">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault23" id="flexRadioDefault23" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault23">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>


                    <h5 className='py-3'> <b>Movement/physical development</b></h5>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child gets to a sitting position without help?         </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault24" id="flexRadioDefault24" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault24">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault24" id="flexRadioDefault24" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault24">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault24" id="flexRadioDefault24 " value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault24">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child pulls up to stand, walks holding on to furniture?     </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault25" id="flexRadioDefault25" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault25">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault25" id="flexRadioDefault25" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault25">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault25" id="flexRadioDefault25" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault25">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child may take a few steps without holding on?         </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault26" id="flexRadioDefault26" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault26">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault26" id="flexRadioDefault26" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault26">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault26" id="flexRadioDefault26" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault26">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child may stand alone?         </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault27" id="flexRadioDefault27" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault27">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault27" id="flexRadioDefault27" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault27">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault27" id="flexRadioDefault27" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault27">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child doesn’t crawl?           </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault28" id="flexRadioDefault28" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault28">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault28" id="flexRadioDefault28" value="no " />
                                <label class="form-check-label mb-2" for="flexRadioDefault28">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault28" id="flexRadioDefault28" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault28">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child can’t stand when supported?    </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault29" id="flexRadioDefault29" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault29">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault29" id="flexRadioDefault29" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault29">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault29" id="flexRadioDefault29" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault29">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child search for things that he or she sees you hide?       </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault30" id="flexRadioDefault30" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault30" id="flexRadioDefault30" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault30">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault30" id="flexRadioDefault30" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault30">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child say single words like “mama” or “dada?       </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault31" id="flexRadioDefault31" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault31">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault31" id="flexRadioDefault31" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault31">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault31" id="flexRadioDefault31" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault31">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child learn gestures like waving or shaking head?          </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault32" id="flexRadioDefault32" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault32" id="flexRadioDefault32" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault32">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault32" id="flexRadioDefault32" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault32">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child point to things?</b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault33" id="flexRadioDefault33" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault33">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault33" id="flexRadioDefault33" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault33">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault33" id="flexRadioDefault33" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault33">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child drinks from a cup without a lid , as you hold it?</b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault34" id="flexRadioDefault34" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault34">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault34" id="flexRadioDefault34" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault34">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault34" id="flexRadioDefault34" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault34">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does the child lose skills he/she once had?</b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault35" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault35">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault35" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault35">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault35" id="flexRadioDefault35" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault35">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Does your child picks up between thumb and pointer finger ,like bits of food?</b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault36" id="flexRadioDefault36" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault36">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault36" id="flexRadioDefault36" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault36">
                                    No
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault36" id="flexRadioDefault1" value="not sure" />
                                <label class="form-check-label mb-2" for="flexRadioDefault36">
                                    Not Sure
                                </label>
                            </div>
                        </div>

                    </div>


                    <h5 className='py-3'> <b>Additional questions</b></h5>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>I have completed the health risk factor questions</b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault36" id="flexRadioDefault36" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault36">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault36" id="flexRadioDefault36" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault36">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>I have completed the dental risk factor questions     </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault37" id="flexRadioDefault37" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault37">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault37" id="flexRadioDefault37" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault37">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>





                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>I am concerned about my child’s hearing      </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault38" id="flexRadioDefault38" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault38">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault38" id="flexRadioDefault38" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault38">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Others have said they are concerned about my child’s hearing      </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault39" id="flexRadioDefault39" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault39" id="flexRadioDefault39" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>I am concerned about my child’s vision    </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault40" id="flexRadioDefault40" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault40">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault40" id="flexRadioDefault40" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault40">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>My child has a turned or lazy eye (squint or strabismus)   </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault41" id="flexRadioDefault41" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault41">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault41" id="flexRadioDefault41" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault41">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>My child has difficulty seeing small objects      </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault42" id="flexRadioDefault42" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault42">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault42" id="flexRadioDefault42" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault42">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>My child recognizes familiar objects and people from a distance       </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault43" id="flexRadioDefault43" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault43">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault43" id="flexRadioDefault43" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault13">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>My child is exposed to smoking in the home/car      </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault44" id="flexRadioDefault44" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault44" id="flexRadioDefault44" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault44">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>My child has difficulty seeing small objects      </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault45" id="flexRadioDefault45" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault45" id="flexRadioDefault45" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>My child has teeth       </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault46" id="flexRadioDefault46" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault46">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault46" id="flexRadioDefault46" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault46">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>My child has had problems with their teeth or teething    </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault47" id="flexRadioDefault47" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault47">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault47" id="flexRadioDefault47" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault47">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>My child uses a bottle to help them go to sleep    </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault48" id="flexRadioDefault48" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault48">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault48" id="flexRadioDefault48" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault48">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>My child walks around with a bottle or feeder cup between meals    </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault49" id="flexRadioDefault49" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault49">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault49" id="flexRadioDefault49" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault49">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>I brush my child’s teeth twice a day   </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault50" id="flexRadioDefault50" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault50">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault50" id="flexRadioDefault50" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault50">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>


                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Since this time yesterday, did your child receive breast milk?   </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault51" id="flexRadioDefault51" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault51">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault51" id="flexRadioDefault51" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault51">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b>Since this time yesterday, did your child receive solid food?   </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault52" id="flexRadioDefault52" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault52">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault52" id="flexRadioDefault52" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault52">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <h5 className='py-3'> <b>Feeding</b></h5>
                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b> Since this time yesterday, did your child receive breast milk?   </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault53" id="flexRadioDefault53" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault53">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault53" id="flexRadioDefault1" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault53">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                        <b> Since this time yesterday, did your child receive solid food?   </b>
                        <div className='question-option'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault54" id="flexRadioDefault54" value="yes" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault54" id="flexRadioDefault54" value="no" />
                                <label class="form-check-label mb-2" for="flexRadioDefault1">
                                    No
                                </label>
                            </div>

                        </div>

                    </div>

                    <div className='footer-content  d-flex align-items-center mt-4'>
                        <i class="fas fa-edit  my-1 mr-2 align-self-start"></i>
                        <p>Current recommendations are that babies receive only breast milk until about 6 months
                            of age (may receive vitamins, mineral supplements or medicine) and continue breastfeeding
                            (while receiving appropriate complementary foods) until 12 months of age or beyond.
                            NHMRC Infant Feeding Guidelines: Information for Health Workers (2012).
                        </p>
                    </div>

                </div>

            </div>

            <div className='pedriatric_btn'>
                <button className='pedriatric_btn_left' onClick={props.closePaediatricExaminationModal}>Cancel</button>
                {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>}
                <button className='pedriatric_btn_right mr-2' onClick={() => {
                    props.passData(15)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(13)
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

    )
}
export default PaediatricPage14;