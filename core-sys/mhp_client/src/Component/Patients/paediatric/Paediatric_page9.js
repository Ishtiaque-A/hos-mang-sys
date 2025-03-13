import React, { useEffect, useState } from 'react';
import './PedriaticExamPage12.css';
import dental from './dental.png';
import { toast } from 'react-toastify';
import { Popover } from '@mui/material';
import './Paediatric.css';

function PaediatricPage9(props) {


    return (
        <div className='bg-white py-3 px-5 rounded-3'>
            <div className='d-flex align-items-center'>
                <h5 className='pb-1'><b>The 2year health check:   </b> </h5>
                <h6 className='mx-2'> for parents/carers</h6>
            </div>

            <b className=''>Answer these questions before you visit your nurse or doctor for the 2 year health check.
            </b>



            <div className="mt-4">
                <h6 class="pb-2"><b>Social/emotional</b>
                </h6>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-3 p-3">
                    <b>Does the child look at your face to see how to react in a new situation? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault" />
                            <label class="form-check-label mb-2 " for="flexRadioDefault">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault" />
                            <label class="form-check-label mb-2 " for="flexRadioDefault">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child notice when others are hurt or upset, like pausing or looking sad when someone is crying?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" />
                            <label class="form-check-label mb-2" for="flexRadioDefault">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2" />
                            <label class="form-check-label mb-2" for="flexRadioDefault2">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child get excited when with other children?   </b>
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
                    <b>Does the child show defiant behaviour? </b>
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
                    <b>Does the child play mainly beside other children, but is beginning to include other?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault" />
                            <label class="form-check-label mb-2" for="flexRadioDefault">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault" />
                            <label class="form-check-label mb-2" for="flexRadioDefault">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <h5 className='py-3'> <b>Language/communication</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Points to things in a book when you ask, like “Where is the bear?”       </b>
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
                    <b>Does the child knows names of familiar people and body parts? </b>
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
                    <b>Does the child Says at least two words together, like “More milk.”?  </b>
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
                    <b>Does the child follows simple instructions? </b>
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

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child repeats words overheard in conversation? </b>
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
                    <b>Does the child use more gestures than just waving and pointing, like blowing a kiss or nodding yes
                        ?
                    </b>
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
                <h5 className='py-3'> <b>Cognitive (learning,problem-solving)</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Plays with more than one toy at the same time, like putting toy food on a toy plate?    </b>
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
                    <b>Does the child begins to sort shapes and colours?  </b>
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
                    <b>Does the child completes sentences and rhymes in familiar books?              </b>
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
                    <b>Does the child Tries to use switches, knobs, or buttons on a toy?   </b>
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
                    <b>Does the child builds towers of four or more blocks?    </b>
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


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Holds something in one hand while using the other hand; for example, holding a container and taking the lid off?  </b>
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
                    <b>Does the child follow two-step instructions such as “Pick up your shoes?
                    </b>
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
                    <b>Does the child and put them in the cupboard”?
                    </b>
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
                    <b>Does the child names items in a picture book such as a cat, bird or dog?
                    </b>
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


                <h5 className='py-3'> <b>Movement/physical development</b></h5>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child stand on tiptoe?           </b>
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
                    <b>Does the child kick a ball?            </b>
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
                    <b>Does the child begin to run?    </b>
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
                    <b>Does the child Walks (not climbs) up a few stairs with or without help?             </b>
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
                    <b>Does the child can eat with a spoon?    </b>
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
                    <b>Does the child throws ball overhand?           </b>
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

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child makes or copies straight lines and circles. ?    </b>
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
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault27" id="flexRadioDefault1" />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Not Sure
                            </label>
                        </div>
                    </div>

                </div>


                <h5 className='py-3'> <b>Additional questions</b></h5>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child use two-word phrases (for example, “drink milk”) ?    </b>
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
                    <b>Does the child know what to do with common things, like a brush, phone, fork, spoon ?     </b>
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
                    <b>Are you concerned about my child’s hearing?         </b>
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
                    <b>Does the child copy actions and words. ?   </b>
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
                    <b>Does the child follow simple instructions. ?           </b>
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
                    <b>Does the child walk steadily. ?       </b>
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

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child walk steadily. ?      </b>
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
                <h5 className='py-3'> <b>Other Questions </b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Have you completed the health risk factor questions?          </b>
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
                    <b>Have you completed the dental risk factor questions?   </b>
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
                    <b>Are you concerned about my child’s hearing?     </b>
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
                    <b>Does Others concerned about my child’s hearing?    </b>
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
                    <b>Are you concerned about my child’s vision?    </b>
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
                    <b>Does your child have a turned or lazy eye (squint or strabismus)?    </b>
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
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has difficulty seeing small objects?     </b>
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
                    <b>Does your child recognises familiar objects and people from a distance?      </b>
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
                    <b>Does your child Has exposed to smoking in the home/car?  </b>
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
                    <b>Does your child has sweet drinks and snacks throughout the day ? </b>
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
                    <b>Does your child still uses a bottle?   </b>
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
                <div className='footer-content  d-flex align-items-center mt-4'>
                    <i class="fas fa-edit  my-1 mr-2 align-self-start"></i>
                    <p>If you circled any answer in <span className="txt-danger">RED</span>, pleasetell your doctor or child and family health nurse.
                    </p>
                </div>

                <h5 className='py-3'> <b>Feeding</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Since this time yesterday, did your child receive breast milk?  </b>
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
            </div>
            <div className='pedriatric_btn'>
                <button className='pedriatric_btn_middle'>Save</button>
                <button className='pedriatric_btn_right' onClick={() => {
                    props.passData(19)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(17)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
            </div>
        </div>
    )
}
export default PaediatricPage9;