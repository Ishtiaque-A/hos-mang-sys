import React, { useState } from 'react';
import './PedriaticExamPage12.css';
import dental from './dental.png';
function PaediatricPage10(props) {


    return (
        <div className='bg-white py-3 px-5 rounded-3'>
            <div className='d-flex align-items-center'>
                <h5 className='pb-1'><b>3 years old (for parents or carrer) </b> </h5>
            </div>


            <div className="mt-4">
                <h6 class="pb-2"><b>Social/emotional</b>
                </h6>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-3 p-3">
                    <b>Does your child copies adults and friends? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2 " for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2 " for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Notice other children and joins them to play without prompting?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child may get upset with major changes in routine?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault3" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault3" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child show concern for a crying friend?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault4" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault4" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child understands the idea of “mine” and “his” or “hers”?        </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child show a wide range of emotions?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Calms down within 10 minutes after you leave her, like at a childcare drop off?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child may get upset with major changes in routine?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault8" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault8" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child dresses and undresses by self?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault9" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault9" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <h5 className='py-3'> <b>Language/communication</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child follow instructions with two or three steps?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault10" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault10" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Says what action is happening in a picture or book when asked, like “running,” “eating,” or “playing” ? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault11" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault11" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Asks “who,” “what,” “where,” or “why” questions, like “Where is mommy/daddy?”?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault12" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault12" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child say first name, when asked?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault13" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault13" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child names a friend? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault14" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault14" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Says what action is happening in a picture or book when asked, like “running,” “eating,” or “playing” ?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault15" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault15" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Talks well enough for others to understand, most of the time?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault16" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault16" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <h5 className='py-3'> <b>Cognitive (learning,problem-solving)</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child can work toys with buttons, levers and moving parts?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault17" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault17" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child begins to sort shapes and colours?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault18" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault18" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>



                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Avoids touching hot objects, like a stove, when you             </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault19" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault19" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child understand what “two” means?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault20" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault20" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child builds towers of four or more blocks?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault21" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault21" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Draws a circle, when you show him how to?</b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault22" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault22" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child follow two-step instructions such as “Pick up your shoes?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault23" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault23" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child turns book pages one at a time?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault24" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault24" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child builds towers of more than six blocks?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault25" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault25" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child screws and unscrews jar lids or turns door handle?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault26" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault26" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <h5 className='py-3'> <b>Movement/physical development</b></h5>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child climbs well?         </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault27" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault27" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child runs easily?        </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault28" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault28" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child pedals a tricycle (three-wheel bike) ?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault29" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault29" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>





                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child walks up and down stairs, one foot on each step?          </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault30" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault30" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child falls down a lot or has trouble with stairs?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault31" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault31" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child drools or has very unclear speech?       </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault32" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault32" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Puts on some clothes by himself, like loose pants or a jacket?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault33" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault33" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault33" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Not Sure
                            </label>
                        </div>
                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child simple puzzles, turning handles) ?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault34" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault34" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child doesn’t speak in sentences?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault35" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault35" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child understand simple instructions?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault36" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault36" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child play pretend or omake-believe?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault37" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault37" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child want to play with other children or with toys? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault38" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault38" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>



                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child make eye contact?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault39" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault39" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child lost skills he/she once had. ?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault40" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault40" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <h5 className='py-3'> <b>Additional questions</b></h5>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Have you completed <span className="txt-danger">the health risk factor questions ? </span>   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault41" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault41" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div> 
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child know what to do with common things, like a brush, phone, fork, spoon ?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault42" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault42" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Have you completed the dental risk factor questions  ?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault43" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault43" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s hearing ?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault44" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault44" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does others concerned about your child’s hearing?          </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault45" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault45" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child walk steadily. ?       </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault46" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault46" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s vision ?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault47" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault47" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has a turned or lazy eye (squint or strabismus)?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault48" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault48" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>



                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has difficulty seeing small objects ?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault49" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault49" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s vision ?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault50" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault50" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child recognises familiar objects and people from a distance?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault51" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault51" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has exposed to smoking in the home/car ?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault52" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault52" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s teeth ?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault53" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault53" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s teeth ?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault54" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault54" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s teeth ?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault55" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault55" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has sweet drinks and snacks throughout the day?       </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault56" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault56" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Have you completed the dental risk factor questions?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault57" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault57" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>





                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s hearing?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault58" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault58" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>



                <div className='footer-content  d-flex align-items-center mt-4'>
                    <i class="fas fa-edit  my-1 mr-2 align-self-start"></i>
                    <p>If you circled any answer in <span className="text-danger">RED</span>, pleasetell your doctor or child and family health nurse.
                    </p>
                </div>


            </div>



            <div className='pedriatric_btn'>
                <button className='pedriatric_btn_middle'>Save</button>
                <button className='pedriatric_btn_right' onClick={() => {
                    props.passData(21)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous'  onClick={() => {
                    props.passData(19)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
            </div>
        </div>
    )
}
export default PaediatricPage10;