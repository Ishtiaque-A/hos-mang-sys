import React, { useState, useEffect } from 'react';
import './PedriaticExamPage12.css';
import dental from './dental.png';
import { toast } from 'react-toastify';
import axios from 'axios';
function PaediatricPage11(props) {
    const [fourYearsOld, setfourYearsOld] = useState({
        child_enjoys_doing: '',
        child_ask_to_go_play: '',
        child_pretends_to_be_something: '',
        child_comforts_others: '',
        child_avoids_danger: '',
        child_likes_to_be_a_helper: '',
        child_change_behaviour: '',


        child_say_sentences:"",
        child_say_some_words:"",
        child_talks_about_at_least_one:"",
        child_answers_simple_questions:"",
        

        child_names_some_colours:"",
        child_understands_the_idea:"",
        child_starts_to_understand:"",
        child_remember_what_comes_next:"",
        child_understand_the_idea:"",
        child_draws_a_person:"",
        child_use_scissor:"",
        child_starts_to_copy:"",
        child_plays_board:"",


        one_foot_up_to:"",
        catch_a_large_ball:"",
        cuts_with_supervision:"",
        child_walks_up_and_down_stairs:"",
        child_cannot_jump:"",
        child_holds_crayon:"",
        child_show_no_interest:"",
        child_ignore_other_children:"",
        child_resists_dressing:"",
        child_follow_three_parts:"",
        child_doesnot_understand:"",
        child_use_me:"",
        child_speak_unclearly:"",
        child_loses_skills:"",

        health_risk_factor_question:"",
        dental_risk_factor_question:"",
        my_childs_hearing:"",
        your_childs_hearing:"",
        my_childs_vision:"",
        child_has_a_turned:"no",
        difficulty_seeing_small_objects:"",
        recognises_familiar_objects:"",
        exposed_to_smoking:"",
        concerned_about_my_childs_teeth:"",
        child_has_pain:"",
        child_has_swwet_drinks:"",
        patient_id:props.patient_id

    });

    const handleInputChange = (e) => {

        setfourYearsOld({
            ...fourYearsOld, [e.target.name]: e.target.value
        })
    }
    const handleSave = () => {
        axios.post(`/save-paediatric-four_years_old_parent`, fourYearsOld).then(res => {
            if (res.data.status == 200) {
                toast.success("Data inserted sucessfully");

            }


        })
    }
    return (
        <div className='bg-white py-3 px-5 rounded-3'>
            <div className='d-flex align-items-center'>
                <h5 className='pb-1'><b>4 years old (for parents0)  </b> </h5>
            </div>




            <div className="mt-4">
                <h6 class="pb-2"><b>Social/emotional</b>
                </h6>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-3 p-3">
                    <b>Does your child enjoys doing new things? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_enjoys_doing" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2 " for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_enjoys_doing" id="flexRadioDefault1" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2 " for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Ask to go play with children if none are around, like “Can I play with Alex?”   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_ask_to_go_play" id="flexRadioDefault2" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_ask_to_go_play" id="flexRadioDefault2" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Pretends to be something else during play (teacher, superhero, dog)?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_pretends_to_be_something" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_pretends_to_be_something" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Comforts others who are hurt or sad, like hugging a crying friend?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_comforts_others" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_comforts_others" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1"> No</label>
                        </div>
                    </div>
                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Avoids danger, like not jumping from tall heights at the playground?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_avoids_danger" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_avoids_danger" id="flexRadioDefault1" value="no" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Likes to be a “helper”? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_likes_to_be_a_helper" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_likes_to_be_a_helper" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does you child Change behaviour based on where she is (place of worship, library, playground)?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_change_behaviour" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_change_behaviour" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>



                <h5 className='py-3'> <b>Language/communication</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child say sentences with four or more words ?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_say_sentences" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_say_sentences" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child say some words from a song, story, or nursery rhyme?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_say_some_words" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_say_some_words" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Talks about at least one thing that happened during his day, like “I played soccer.”?</b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_talks_about_at_least_one" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_talks_about_at_least_one" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child Answers simple questions like “What is a coat for?” or “What is a crayon for?”? </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_answers_simple_questions" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_answers_simple_questions" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <h5 className='py-3'> <b>Cognitive (learning,problem-solving)</b></h5>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child names some colours and some numbers?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_names_some_colours" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_names_some_colours" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child understands the idea of counting  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_understands_the_idea" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_understands_the_idea" id="flexRadioDefault1" onChange={handleInputChange} checked={fourYearsOld.child_understands_the_idea == 'no'}  value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>



                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child starts to understand time             </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_starts_to_understand" id="flexRadioDefault1"  value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_starts_to_understand" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child remember what comes next in a well known story?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_remember_what_comes_next" id="flexRadioDefault1"  value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_remember_what_comes_next" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child understands the idea of “same” and “different” ?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_understand_the_idea" id="flexRadioDefault1"  value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_understand_the_idea" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child draws a person with two to four body parts?  </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_draws_a_person" id="flexRadioDefault1"  value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_draws_a_person" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child use scissor?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_use_scissor" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_use_scissor" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child starts to copy some capital letters?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_starts_to_copy" id="flexRadioDefault1"  value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_starts_to_copy" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child plays board or card games?
                    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_plays_board" id="flexRadioDefault1"  value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_plays_board" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <h5 className='py-3'> <b>Movement/physical development</b></h5>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child hops and stands on one foot up to two seconds ?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="one_foot_up_to" id="flexRadioDefault1"  value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="one_foot_up_to" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
            

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child catch a large ball most of the time?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="catch_a_large_ball" id="flexRadioDefault1"  value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="catch_a_large_ball" id="flexRadioDefault1"onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>






                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child walks up and down stairs, one foot on each step?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_walks_up_and_down_stairs" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_walks_up_and_down_stairs" id="flexRadioDefault1"onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child can’t jump in place?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_cannot_jump" id="flexRadioDefault1"value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_cannot_jump" id="flexRadioDefault1"onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child holds crayon or pencil between fingers and thumb (not a fist)?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_holds_crayon" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_holds_crayon" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child show no interest in interactive games or make-believe?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_show_no_interest" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_show_no_interest" id="flexRadioDefault1"onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child ignore other children or doesn’t respond to people outside the family?</b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_ignore_other_children" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_ignore_other_children" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child resists dressing, sleeping or using the toilet?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_resists_dressing" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_resists_dressing" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child follow three-part commands?</b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_follow_three_parts" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_follow_three_parts" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child doesn’t understand “same” and “different” ?       </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_doesnot_understand" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_doesnot_understand" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

 
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child use “me” and “you” correctly?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_use_me" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_use_me" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>


                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child speak unclearly?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_speak_unclearly" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_speak_unclearly" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child loses skills he/she once had. ?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_loses_skills" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_loses_skills" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <h5 className='py-3'> <b>Additional questions</b></h5>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Have you completed <span class="txt-danger">the health risk factor questions ?</span></b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="health_risk_factor_question" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="health_risk_factor_question" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Have you completed the dental risk factor questions  ?     </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="dental_risk_factor_question" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="dental_risk_factor_question" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s hearing ?        </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="my_childs_hearing" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="my_childs_hearing" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does others concerned about your child’s hearing?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="your_childs_hearing" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="your_childs_hearing">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="your_childs_hearing" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s vision ?        </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="my_childs_vision" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="my_childs_vision" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has a turned or lazy eye (squint or strabismus)?       </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_has_a_turned" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_has_a_turned" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has difficulty seeing small objects ?      </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="difficulty_seeing_small_objects" id="flexRadioDefault1" value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="difficulty_seeing_small_objects" id="flexRadioDefault1"onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>

 
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child recognises familiar objects and people from a distance?        </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="recognises_familiar_objects" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="recognises_familiar_objects" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
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
                            <input class="form-check-input" type="radio" name="exposed_to_smoking" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exposed_to_smoking" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>





                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Are you concerned about my child’s teeth ?       </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="concerned_about_my_childs_teeth" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="concerned_about_my_childs_teeth" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>





        

                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has pain in their mouth ?   </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_has_pain" id="flexRadioDefault1" value="yes" onChange={handleInputChange}/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_has_pain" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                No
                            </label>
                        </div>

                    </div>

                </div>
           
                <div class="shadow-lg  px-4 mb-3 bg-body rounded mt-1 p-3">
                    <b>Does your child has sweet drinks and snacks throughout the day?    </b>
                    <div className='question-option'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_has_swwet_drinks" id="flexRadioDefault1"value="yes" onChange={handleInputChange} />
                            <label class="form-check-label mb-2" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="child_has_swwet_drinks" id="flexRadioDefault1" onChange={handleInputChange} value="no"/>
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
                <button className='pedriatric_btn_middle' onClick={handleSave}>Save</button>
                <button className='pedriatric_btn_right' onClick={() => {
                    props.passData(23)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous'  onClick={() => {
                    props.passData(21)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
            </div>
        </div>
    )
}
export default PaediatricPage11;