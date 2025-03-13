import React, { useState, useEffect } from 'react';
import './PedriaticExamPage12.css';
import dental from './dental.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Paediatric.css';

function PaediatricPage8(props) {

    const [eighteenMonthVisit, setEighteenMonthVisit] = useState({
        moves_away: '',
        points_to_show_something: '',
        puts_hands_out: '',
        looks_at_a_few: '',
        dress_him_by_pushing: '',
        child_likes_to_hand: '',
        temper_tantrums: '',
        afraid_of_strangers: '',
        shows_affection: '',
        plays_simple_pretend: '',
        cling_to_caregivers: '',
        several_single_words: '',
        shakes_head: '',
        one_step_directions: '',
        child_copies_you: '',
        plays_with_toys: '',
        what_ordinary_things: '',
        points_to_get_the_attention: '',
        child_shows_interest_in_a_doll: '',
        points_to_one_body_part: '',
        verbal_commands_without: '',
        child_walks_alone: '',
        child_climbs_on: '',
        child_pulls_toys: '',
        help_undress: '',
        child_drins_from_a_cup: '',
        child_scribbles: '',
        child_lost_skills: '',
        family_health_history: '',
        dental_risk_factor: '',
        childs_hearing: '',
        concerned_about_my_childs_hearing: '',
        my_childs_vision: '',
        turned_or_lazy_eye: '',
        difficulty_seeing_small_objects: '',
        child_recognises_familiar_objects: '',
        exposed_to_smoking: '',
        child_has_sweet_drinks: '',
        uses_a_bottle: '',
        breast_milk: '',
        points_to_show: '',
        eats_with_a_spoon: '',
        patient_id:props.patient_id

    });


    const handleInputChange = (e) => {

        setEighteenMonthVisit({
            ...eighteenMonthVisit, [e.target.name]: e.target.value
        })
    }
    const handleSave = () => {
        axios.post(`/save-paediatric-eighteen-month-visit`, eighteenMonthVisit).then(res => {
            if (res.data.status == 200) {
                toast.success("Data inserted sucessfully");
               
            }


        })
    }


    return (
        <div className='bg-white py-3 px-5 rounded-3'>
            <div className='d-flex align-items-center'>
                <h5 className='pb-1'><b>The 18 month visit  </b> </h5>
                <h6 className='mx-2'> for parents/carers</h6>
            </div>

            <b className=''>Answer these questions before you visit your nurse or doctor
            </b>



            <div className="mt-4">
                <h6 class="pb-2"><b>Social/emotional</b>
                </h6>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-3 p-3">
                    <b>Does the child Moves away from you, but looks to make sure you are close by?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="moves_away" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2 " for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="moves_away" id="flexRadioDefault1" value="no" onChange={handleInputChange}  />
                            <label class="form-check-label mb-2 " for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Points to show you something interesting?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="points_to_show_something" id="flexRadioDefault2" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault2">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="points_to_show_something" id="flexRadioDefault2" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault2">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Puts hands out for you to wash them? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="puts_hands_out" id="flexRadioDefault3" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault3">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="puts_hands_out" id="flexRadioDefault3" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault3">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Looks at a few pages in a book with you? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="looks_at_a_few" id="flexRadioDefault4" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault4">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="looks_at_a_few" id="flexRadioDefault4" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault4">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Helps you dress him by pushing arm through sleeve or lifting up foot?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="dress_him_by_pushing" id="flexRadioDefault5" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault5">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="dress_him_by_pushing" id="flexRadioDefault5" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault5">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child likes to hand things to others as play ?</b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_likes_to_hand" id="flexRadioDefault6" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault6">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_likes_to_hand" id="flexRadioDefault6" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault6">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child may have temper tantrums?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="temper_tantrums" id="flexRadioDefault7" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault7">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="temper_tantrums" id="flexRadioDefault7" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault7">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child may be afraid of strangers ?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="afraid_of_strangers" id="flexRadioDefault8" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault8">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="afraid_of_strangers" id="flexRadioDefault8" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault8">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child shows affection to familiar people? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="shows_affection" id="flexRadioDefault9" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault9">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="shows_affection" id="flexRadioDefault9" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault9">
                                No
                            </label>
                        </div>

                    </div>

                </div>



                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child plays simple pretend, such as feeding a doll? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="plays_simple_pretend" id="flexRadioDefault10" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault10">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="plays_simple_pretend" id="flexRadioDefault10" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault10">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child may cling to caregivers in new situations? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="cling_to_caregivers" id="flexRadioDefault11" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault11">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="cling_to_caregivers" id="flexRadioDefault11" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault11">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <h5 className='py-3'> <b>Language/communication</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child says several single words (besides mama ,dada)?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="several_single_words" id="flexRadioDefault12" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault12">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="several_single_words" id="flexRadioDefault12" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault12">
                                No
                            </label>
                        </div>

                    </div>

                </div>
 
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child says and shakes head “no” ? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="shakes_head" id="flexRadioDefault13" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault13">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="shakes_head" id="flexRadioDefault13" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault13">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Follows one-step directions without any gestures, like giving you the toy when you say, “Give it to me.”? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="one_step_directions" id="flexRadioDefault14" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault14">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="one_step_directions" id="flexRadioDefault14" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault14">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <h5 className='py-3'> <b>Cognitive (learning,problem-solving)</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child copies you doing chores, like sweeping with a broom?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_copies_you" id="flexRadioDefault15" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault15">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_copies_you" id="flexRadioDefault15" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault15">
                                No
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_copies_you" id="flexRadioDefault15" value="not sure" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault15">
                                Not Sure
                            </label>
                        </div>
                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Plays with toys in a simple way, like pushing a toy car?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="plays_with_toys" id="flexRadioDefault16" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault16">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="plays_with_toys" id="flexRadioDefault16" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault16">
                                No
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="plays_with_toys" id="flexRadioDefault16" value="not sure" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault16">
                                Not Sure
                            </label>
                        </div>
                    </div>

                </div>



                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child knows what ordinary things are for; for example, telephone, brush, spoon?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="what_ordinary_things" id="flexRadioDefault17" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault17">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="what_ordinary_things" id="flexRadioDefault17" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault17">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child points to get the attention of others?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="points_to_get_the_attention" id="flexRadioDefault18" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault18">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="points_to_get_the_attention" id="flexRadioDefault18" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault18">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child shows interest in a doll or stuffed animal by pretending to feed?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_shows_interest_in_a_doll" id="flexRadioDefault19" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault19">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_shows_interest_in_a_doll" id="flexRadioDefault19" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault19">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child points to one body part?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="points_to_one_body_part" id="flexRadioDefault20" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault20">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="points_to_one_body_part" id="flexRadioDefault20" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault20">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child can follow one-step verbal commands without any gestures
                        for example, sits when you say “sit down” ?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="verbal_commands_without" id="flexRadioDefault21" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault21">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="verbal_commands_without" id="flexRadioDefault21" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault21">
                                No
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="verbal_commands_without" id="flexRadioDefault21" value="not sure" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault21">
                                Not Sure
                            </label>
                        </div>
                    </div>

                </div>




                <h5 className='py-3'> <b>Movement/physical development</b></h5>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child walks alone without holding onto anyone or anything ?           </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_walks_alone" id="flexRadioDefault22" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault22">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_walks_alone" id="flexRadioDefault22" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault22">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Climbs on and off a couch or chair without help?            </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_climbs_on" id="flexRadioDefault23" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault23">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_climbs_on" id="flexRadioDefault23" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault23">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child pulls toys while walking?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_pulls_toys" id="flexRadioDefault24" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault24">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_pulls_toys" id="flexRadioDefault24" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault24">
                                No
                            </label>
                        </div>

                    </div>

                </div>





                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child can help undress herself/himself?        </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="help_undress" id="flexRadioDefault25" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault25">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="help_undress" id="flexRadioDefault25" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault25">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child drinks from a cup?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_drins_from_a_cup" id="flexRadioDefault26" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault26">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_drins_from_a_cup" id="flexRadioDefault26" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault26">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child eats with a spoon?</b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="eats_with_a_spoon" id="flexRadioDefault27" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault27">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="eats_with_a_spoon" id="flexRadioDefault27" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault27">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child Scribbles ?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_scribbles" id="flexRadioDefault28" onChange={handleInputChange} value="yes" />
                            <label class="form-check-label mb-2" for="flexRadioDefault28">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_scribbles" id="flexRadioDefault28" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault28">
                                No
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_scribbles" id="flexRadioDefault28" value="not sure" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault28">
                                Not Sure
                            </label>
                        </div>
                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child points to show things to others?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="points_to_show" id="flexRadioDefault29" onChange={handleInputChange} value="yes" />
                            <label class="form-check-label mb-2" for="flexRadioDefault29">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="points_to_show" id="flexRadioDefault29" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault29">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does the child lost Skills he or she had Learned?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_lost_skills" id="flexRadioDefault30" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault30">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_lost_skills" id="flexRadioDefault30" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault30">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <h5 className='py-3'> <b>Additional questions</b></h5>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1">
                    <b>Have completed the <span className='text-danger'>Family health history and risk factors (for parents)   </span>     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="family_health_history" id="flexRadioDefault31" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault31">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="family_health_history" id="flexRadioDefault31" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault31">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Have you completed the dental risk factor questions?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="dental_risk_factor" id="flexRadioDefault32" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault32">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="dental_risk_factor" id="flexRadioDefault32" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault32">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s hearing?         </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="childs_hearing" id="flexRadioDefault33" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault33">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault33" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault33">
                                No
                            </label>
                        </div>

                    </div>

                </div>
 
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does any others have said they are concerned about my child’s hearing?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="concerned_about_my_childs_hearing" id="flexRadioDefault34" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault34">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="concerned_about_my_childs_hearing" id="flexRadioDefault34" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault34">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s vision ?           </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="my_childs_vision" id="flexRadioDefault35" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault35">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="my_childs_vision" id="flexRadioDefault35" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault35">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child have a turned or lazy eye (squint or strabismus)?          </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="turned_or_lazy_eye" id="flexRadioDefault36" value="yes"onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault36">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="turned_or_lazy_eye" id="flexRadioDefault36" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault36">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child have difficulty seeing small objects?         </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="difficulty_seeing_small_objects" id="flexRadioDefault37" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault37">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="difficulty_seeing_small_objects" id="flexRadioDefault37" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault37">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child recognises familiar objects and people from a distance         </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_recognises_familiar_objects" id="flexRadioDefault38" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault38">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_recognises_familiar_objects" id="flexRadioDefault38" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault38">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child is exposed to smoking in the home/car?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exposed_to_smoking" id="flexRadioDefault39" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault39">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exposed_to_smoking" id="flexRadioDefault39" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault39">
                                No
                            </label>
                        </div>

                    </div>

                </div>





                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has sweet drinks and snacks throughout the day?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_has_sweet_drinks" id="flexRadioDefault40" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault40">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_has_sweet_drinks" id="flexRadioDefault40" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault40">
                                No
                            </label>
                        </div>

                    </div>

                </div>





                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your  child still uses a bottle?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="uses_a_bottle" id="flexRadioDefault41" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault41">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="uses_a_bottle" id="flexRadioDefault41" value="no" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault41">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div className='footer-content  d-flex align-items-center mt-4'>
                    <i class="fas fa-edit  my-1 mr-2 align-self-start"></i>
                    <p>If you circled any answer in RED, pleasetell your doctor or child and family health nurse.
                    </p>
                </div>

                <h5 className='py-3'> <b>Feeding</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Since this time yesterday, did your child receive breast milk?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="breast_milk" id="flexRadioDefault42" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault42">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="breast_milk" id="flexRadioDefault42" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault42">
                                No
                            </label>
                        </div>

                    </div>

                </div>



            </div>



            <div className='pedriatric_btn'>
                <button className='pedriatric_btn_middle' onClick={handleSave}>Save</button>
                <button className='pedriatric_btn_right' onClick={() => {
                    props.passData(17)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous'  onClick={() => {
                    props.passData(15)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
            </div>
        </div>
    )
}
export default PaediatricPage8;