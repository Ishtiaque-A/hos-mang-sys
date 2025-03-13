import React, { useState, useEffect, createRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useScreenshot } from 'use-react-screenshot';


const Paediatric_page8 = (props) => {
   const [parentsPage4Data, setparentsPage4Data] = useState({
      child_clams_down: "",
      child_looks_at_your_face: "",
      child_seems_happy: "",
      child_smiles_when: "",
      child_makes_sounds: "",
      child_reacts_to_loud: "",
      child_watches_you: "",
      child_looks_at: "",
      child_holds_head_up: "",
      child_moves_both: "",
      child_opens_hands: "",
      my_postnatal_check: "",
      concerned_about: "",
      completed_family_health_history: "",
      concerned_about_my_baby: "",
      turn_towards_light: "",
      makes_eyes_contact: "",
      pupils_are_white: "",
      enjoy_being_together: "",
      baby_receieves_breast_milk: "",
      vitamin_or_mineral: "",
      plain_water: "",
      infant_formula: "",
      semi_sold_food: "",

      patient_id: props.propsData.patient_id
   });

   const [language, setLanguage] = useState('english');
   const handleLanguage = (e) => {
      setLanguage(e.target.value);

   }

   const [page4SaveData, setpage4SaveData] = useState('');
   console.log('check data', page4SaveData);

   useEffect(() => {
      axios.get(`/get-paediatric-parentsPage4Data/${props.propsData.patient_id}`).then(res => {
         if (res.data.status === 200) {
            setpage4SaveData(res.data.get_data);
         }

      });

   }, [props.propsData.patient_id]);

   const [image, takeScreenShot] = useScreenshot();
   const refPE1 = createRef(null);
   const refPE2 = createRef(null);
   const [btnLoading, setbtnLoading] = useState(false)


   const handleSave = (e) => {
      e.preventDefault();

      if (image) {
         const pData = {
            patient_id: parseInt(props.propsData.patient_id),
            page_no: 8,
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
         <div className='float-end me-4 '>
            <select class="form-select form-select-sm col-12 mb-3 " aria-label=".form-select-sm example" onChange={handleLanguage}>
               <option selected value="english">Choose</option>
               <option value="bangla">বাংলা </option>
               <option value="english">English</option>
            </select>
         </div>


         {page4SaveData === null &&
            <h4 className='text-danger mt-5 text-center pb-5'> This patient Pediatric Exam Info of this page did not provide! </h4>
         }

         {page4SaveData !== null &&
            <>

               {language === 'english' &&
                  <div ref={refPE1} className='p-3'>
                     <div>
                        <h5>The 6 to 8 week visit</h5>
                        <p className='fw-bold text-danger'>For Parents Child development progress – Learn the Signs. Act Early.</p>
                        <h6 className='mt-4'>Social/emotional</h6>
                     </div>
                     {/* social emotion */}

                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>1.</span>Does your child Calms down when spoken to or picked up?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_clams_down" value="yes" checked={page4SaveData?.child_clams_down === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_clams_down" value="no" checked={page4SaveData?.child_clams_down === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                           <input type="radio" id="no" name="child_clams_down" value="not yet" checked={page4SaveData?.child_clams_down === 'not yet'} />
                           <label for="" className='ms-3'>Not yet</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your child Looks at your face?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_looks_at_your_face" value="yes" checked={page4SaveData?.child_looks_at_your_face === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_looks_at_your_face" value="no" checked={page4SaveData?.child_looks_at_your_face === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                           <input type="radio" id="no" name="child_looks_at_your_face" value="not yet" checked={page4SaveData?.child_looks_at_your_face === 'not yet'} />
                           <label for="" className='ms-3'>Not yet</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>3.</span>Does your child Seems happy to see you when you walk up to her?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_seems_happy" value="yes" checked={page4SaveData?.child_seems_happy === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_seems_happy" value="no" checked={page4SaveData?.child_seems_happy === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                           <input type="radio" id="no" name="child_seems_happy" value="not yet" checked={page4SaveData?.child_seems_happy === 'not yet'} />
                           <label for="" className='ms-3'>Not yet</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>4.</span>Does your child Smiles when you talk to or smile at her?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_smiles_when" value="yes" checked={page4SaveData?.child_smiles_when === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_smiles_when" value="no" checked={page4SaveData?.child_smiles_when === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                           <input type="radio" id="no" name="child_smiles_when" value="not yet" checked={page4SaveData?.child_smiles_when === 'not yet'} />
                           <label for="" className='ms-3'>Not yet</label>
                        </div>
                     </div>

                     {/* Language/communication */}
                     <div>
                        <h6 className='mt-4'>Language/communication</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>1.</span>Does your child Makes sounds other than crying?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_makes_sounds" value="yes" checked={page4SaveData?.child_makes_sounds === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_makes_sounds" value="no" checked={page4SaveData?.child_makes_sounds === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your child Reacts to loud sounds?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_reacts_to_loud" value="yes" checked={page4SaveData?.child_reacts_to_loud === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_reacts_to_loud" value="no" checked={page4SaveData?.child_reacts_to_loud === 'no'} />
                           <label for="" className='ms-3'>No</label>
                        </div>
                     </div>

                     {/* cognitive */}

                     <div>
                        <h6 className='mt-4'>Cognitive (learning, thinking, problem–solving)</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>1.</span>Does your child Watches you as you move?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_watches_you" value="yes" checked={page4SaveData?.child_watches_you === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_watches_you" value="no" checked={page4SaveData?.child_watches_you === 'no'} />
                           <label for="" className='ms-3'>No</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your child Looks at a toy for several seconds?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_looks_at" value="yes" checked={page4SaveData?.child_looks_at === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_looks_at" value="no" checked={page4SaveData?.child_looks_at === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>

                     {/* movement/physical */}

                     <div>
                        <h6 className='mt-4'>Movement/physical development</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>1.</span>Does your child Holds head up when on tummy?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_holds_head_up" value="yes" checked={page4SaveData?.child_holds_head_up === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_holds_head_up" value="no" checked={page4SaveData?.child_holds_head_up === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your child Moves both arms and both legs?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_moves_both" value="yes" checked={page4SaveData?.child_moves_both === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_moves_both" value="no" checked={page4SaveData?.child_moves_both === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>3.</span>Does your child Opens hands briefly?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_opens_hands" value="yes" checked={page4SaveData?.child_opens_hands === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_opens_hands" value="no" checked={page4SaveData?.child_opens_hands === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>

                     {/* others */}
                     <div>
                        <h6 className='mt-4'>Others</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>1.</span>Have you had my postnatal check?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="my_postnatal_check" value="yes" checked={page4SaveData?.my_postnatal_check === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="my_postnatal_check" value="no" checked={page4SaveData?.my_postnatal_check === 'no'} />
                           <label for="" className='ms-3 text-danger'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Are concerned about my baby?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="concerned_about" value="yes" checked={page4SaveData?.concerned_about === 'yes'} />
                           <label for="" className='ms-3 text-danger'>Yes</label> <br />
                           <input type="radio" id="no" name="concerned_about" value="no" checked={page4SaveData?.concerned_about === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>3.</span>Have you completed <span className='text-danger'>
                              Family health history and risk factors (for parents)</span>
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="completed_family_health_history" value="yes" checked={page4SaveData?.completed_family_health_history === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="completed_family_health_history" value="no" checked={page4SaveData?.completed_family_health_history === 'no'} />
                           <label for="" className='ms-3 text-danger'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>4.</span>Are you concerned about my baby’s hearing
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="concerned_about_my_baby" value="yes" checked={page4SaveData?.concerned_about_my_baby === 'yes'} />
                           <label for="" className='ms-3 text-danger'>Yes</label> <br />
                           <input type="radio" id="no" name="concerned_about_my_baby" value="no" checked={page4SaveData?.concerned_about_my_baby === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>5.</span>Does you baby turn towards light?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="turn_towards_light" value="yes" checked={page4SaveData?.turn_towards_light === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="turn_towards_light" value="no" checked={page4SaveData?.turn_towards_light === 'no'} />
                           <label for="" className='ms-3 text-danger'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>6.</span>Does your baby  looks at your face and makes eye contact with you?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="makes_eyes_contact" value="yes" checked={page4SaveData?.makes_eyes_contact === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="makes_eyes_contact" value="no" checked={page4SaveData?.makes_eyes_contact === 'no'} />
                           <label for="" className='ms-3 text-danger'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>7.</span>Have you noticed that one or both of your baby’s pupils are white?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="pupils_are_white" value="yes" checked={page4SaveData?.pupils_are_white === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="pupils_are_white" value="no" checked={page4SaveData?.pupils_are_white === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>8.</span>Do baby and your enjoy being together?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="enjoy_being_together" value="yes" checked={page4SaveData?.enjoy_being_together === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="enjoy_being_together" value="no" checked={page4SaveData?.enjoy_being_together === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='footer-content d-flex align-items-center mt-4 ms-2'>
                        <i className="fas fa-edit fa-2x mr-2 align-self-start" style={{ fontSize: '18px' }}></i>
                        <p>
                        If you circled any answer in <span className='text-danger'>RED</span>, please tell your doctor or child and family health nurse.
                        </p>
                     </div>

                     {/* feeding */}

                     <div>
                        <h6 className='mt-4'>Feeding</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-3 family_health_box'>
                        <strong>
                           <span className='me-2'>1.</span>Since this time yesterday, did your baby receive breast milk?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="baby_receieves_breast_milk" value="yes" checked={page4SaveData?.baby_receieves_breast_milk === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="baby_receieves_breast_milk" value="no" checked={page4SaveData?.baby_receieves_breast_milk === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>

                     <div className='bg-white rounded ps-3 p-2 mt-3 family_health_box'>
                        <div>
                           <h6>Since this time yesterday, did your baby receive any  of the following?</h6>
                        </div>
                        <strong>
                           <span className='me-2'>a)</span> Vitamins OR mineral supplements OR medicine (if required) Since this time yesterday, did your baby receive breast milk ?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="vitamin_or_mineral" value="yes" checked={page4SaveData?.vitamin_or_mineral === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="vitamin_or_mineral" value="no" checked={page4SaveData?.vitamin_or_mineral === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                        <strong>
                           <span className='me-2'>b)</span>Plain water OR sweetened (Misri Water)/flavored water (Golab Jall) OR fruit juice OR tea/infusions
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes1" name="plain_water" value="yes" checked={page4SaveData?.plain_water === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no1" name="plain_water" value="no" checked={page4SaveData?.plain_water === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                        <strong>
                           <span className='me-2'>c)</span>Infant formula OR other milk (e.g. cow milk, soy milk, evaporated milk, condensed milk, etc.)
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes2" name="infant_formula" value="yes" checked={page4SaveData?.infant_formula === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no2" name="infant_formula" value="no" checked={page4SaveData?.infant_formula === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                        <strong>
                           <span className='me-2'>d)</span>Solid OR semi-solid food
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="semi_sold_food" value="yes" checked={page4SaveData?.semi_sold_food === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="semi_sold_food" value="yes" checked={page4SaveData?.semi_sold_food === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                  </div>
               }

               {language === 'bangla' &&

                  <div ref={refPE2} className='p-3'>
                     <div>
                        <h5>6 থেকে ৮ সপ্তাহের ভিজিট</h5>
                        <p className='fw-bold text-danger'>পিতামাতার জন্য শিশু বিকাশের অগ্রগতি - লক্ষণগুলি জানুন। তাড়াতাড়ি কাজ..</p>
                        <h6 className='mt-4'>সামাজিক/আবেগিক</h6>
                     </div>
                     {/* social emotion */}

                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>১.</span>আপনার সন্তানের সাথে কথা বলা বা তোলার সময় কি শান্ত হয়?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_clams_down" value="yes" checked={page4SaveData?.child_clams_down === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_clams_down" value="no" checked={page4SaveData?.child_clams_down === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                           <input type="radio" id="no" name="child_clams_down" value="not yet" checked={page4SaveData?.child_clams_down === 'not yet'} />
                           <label for="" className='ms-3'>এখনো না</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>২.</span>আপনার সন্তান কি আপনার মুখের দিকে তাকায়?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_looks_at_your_face" value="yes" checked={page4SaveData?.child_looks_at_your_face === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_looks_at_your_face" value="no" checked={page4SaveData?.child_looks_at_your_face === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                           <input type="radio" id="no" name="child_looks_at_your_face" value="not yet" checked={page4SaveData?.child_looks_at_your_face === 'not yet'} />
                           <label for="" className='ms-3'>এখনো না </label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৩.</span>আপনি যখন তার কাছে যান তখন কি আপনার সন্তান আপনাকে দেখে খুশি হয়?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_seems_happy" value="yes" checked={page4SaveData?.child_seems_happy === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_seems_happy" value="no" checked={page4SaveData?.child_seems_happy === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                           <input type="radio" id="no" name="child_seems_happy" value="not yet" checked={page4SaveData?.child_seems_happy === 'not yet'} />
                           <label for="" className='ms-3'>এখনো না</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৪.</span>আপনার সন্তান কি হাসে যখন আপনি তার সাথে কথা বলেন বা হাসেন?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_smiles_when" value="yes" checked={page4SaveData?.child_smiles_when === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_smiles_when" value="no" checked={page4SaveData?.child_smiles_when === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                           <input type="radio" id="no" name="child_smiles_when" value="not yet" checked={page4SaveData?.child_smiles_when === 'not yet'} />
                           <label for="" className='ms-3'>এখনো না</label>
                        </div>
                     </div>

                     {/* Language/communication */}
                     <div>
                        <h6 className='mt-4'>ভাষা/যোগাযোগ</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>১.</span>আপনার সন্তান কি কান্না ছাড়া অন্য শব্দ করে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_makes_sounds" value="yes" checked={page4SaveData?.child_makes_sounds === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_makes_sounds" value="no" checked={page4SaveData?.child_makes_sounds === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>২.</span>আপনার শিশু কি উচ্চ শব্দে প্রতিক্রিয়া দেখায়?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_reacts_to_loud" value="yes" checked={page4SaveData?.child_reacts_to_loud === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_reacts_to_loud" value="no" checked={page4SaveData?.child_reacts_to_loud === 'no'} />
                           <label for="" className='ms-3'>না </label>
                        </div>
                     </div>

                     {/* cognitive */}

                     <div>
                        <h6 className='mt-4'>জ্ঞানীয় (শিক্ষা, চিন্তাভাবনা, সমস্যা সমাধান)</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>১.</span>আপনি চলাফেরা করার সময় আপনার সন্তান কি আপনাকে দেখে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_watches_you" value="yes" checked={page4SaveData?.child_watches_you === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_watches_you" value="no" checked={page4SaveData?.child_watches_you === 'no'} />
                           <label for="" className='ms-3'>না </label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>২.</span>আপনার সন্তান কি কয়েক সেকেন্ডের জন্য খেলনার দিকে তাকায়?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_looks_at" value="yes" checked={page4SaveData?.child_looks_at === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_looks_at" value="no" checked={page4SaveData?.child_looks_at === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>

                     {/* movement/physical */}

                     <div>
                        <h6 className='mt-4'>আন্দোলন/শারীরিক বিকাশ</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>১.</span>পেটে থাকা অবস্থায় আপনার শিশু কি মাথা উঁচু করে থাকে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_holds_head_up" value="yes" checked={page4SaveData?.child_holds_head_up === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_holds_head_up" value="no" checked={page4SaveData?.child_holds_head_up === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>২.</span>আপনার সন্তান কি উভয় হাত এবং উভয় পা নড়াচড়া করে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_moves_both" value="yes" checked={page4SaveData?.child_moves_both === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_moves_both" value="no" checked={page4SaveData?.child_moves_both === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৩.</span>আপনার শিশু কি অল্প সময়ের জন্য হাত খোলে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_opens_hands" value="yes" checked={page4SaveData?.child_opens_hands === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_opens_hands" value="no" checked={page4SaveData?.child_opens_hands === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>

                     {/* others */}
                     <div>
                        <h6 className='mt-4'>অন্যান্য</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>১.</span>আপনি কি আমার প্রসবোত্তর চেক করেছেন?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="my_postnatal_check" value="yes" checked={page4SaveData?.my_postnatal_check === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="my_postnatal_check" value="no" checked={page4SaveData?.my_postnatal_check === 'no'} />
                           <label for="" className='ms-3 text-danger'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>২.</span>আমার বাচ্চা নিয়ে চিন্তিত?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="concerned_about" value="yes" checked={page4SaveData?.concerned_about === 'yes'} />
                           <label for="" className='ms-3 text-danger'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="concerned_about" value="no" checked={page4SaveData?.concerned_about === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>

                           <span className='me-2'>৩.</span> (পিতামাতার জন্য)<span className='text-danger'>
                              আপনি কি পারিবারিক স্বাস্থ্য ইতিহাস এবং ঝুঁকির কারণগুলি সম্পূর্ণ করেছেন</span>
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="completed_family_health_history" value="yes" checked={page4SaveData?.completed_family_health_history === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="completed_family_health_history" value="no" checked={page4SaveData?.completed_family_health_history === 'no'} />
                           <label for="" className='ms-3 text-danger'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৪.</span>আপনি কি আমার শিশুর শ্রবণশক্তি নিয়ে চিন্তিত?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="concerned_about_my_baby" value="yes" checked={page4SaveData?.concerned_about_my_baby === 'yes'} />
                           <label for="" className='ms-3 text-danger'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="concerned_about_my_baby" value="no" checked={page4SaveData?.concerned_about_my_baby === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৫.</span> আপনি কি শিশুর আলোর দিকে ঝুঁকেছেন?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="turn_towards_light" value="yes" checked={page4SaveData?.turn_towards_light === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="turn_towards_light" value="no" checked={page4SaveData?.turn_towards_light === 'no'} />
                           <label for="" className='ms-3 text-danger'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৬.</span>আপনার শিশু কি আপনার মুখের দিকে তাকায় এবং আপনার সাথে চোখের যোগাযোগ করে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="makes_eyes_contact" value="yes" checked={page4SaveData?.makes_eyes_contact === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="makes_eyes_contact" value="no" checked={page4SaveData?.makes_eyes_contact === 'no'} />
                           <label for="" className='ms-3 text-danger'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৭.</span>আপনি কি লক্ষ্য করেছেন যে আপনার শিশুর এক বা উভয় ছাত্রই সাদা?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="pupils_are_white" value="yes" checked={page4SaveData?.pupils_are_white === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="pupils_are_white" value="no" checked={page4SaveData?.pupils_are_white === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৮.</span>বাচ্চা এবং আপনি কি একসাথে থাকতে উপভোগ করেন?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="enjoy_being_together" value="yes" checked={page4SaveData?.enjoy_being_together === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="enjoy_being_together" value="no" checked={page4SaveData?.enjoy_being_together === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>
                     <div className='footer-content d-flex align-items-center mt-4 ms-2'>
                        <i className="fas fa-edit fa-2x mr-2 align-self-start" style={{ fontSize: '18px' }}></i>
                        <p>
                           যদি আপনি কোন উত্তর বৃত্তাকার <span className='text-danger'>লাল</span> ,অনুগ্রহ করে আপনার ডাক্তার বা শিশু এবং পারিবারিক স্বাস্থ্য নার্সকে বলুন।
                        </p>
                     </div>

                     {/* feeding */}

                     <div>
                        <h6 className='mt-4'>খাওয়ানো</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-3 family_health_box'>
                        <strong>
                           <span className='me-2'>১.</span>গতকাল এই সময় থেকে, আপনার শিশু কি বুকের দুধ পেয়েছে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="baby_receieves_breast_milk" value="yes" checked={page4SaveData?.baby_receieves_breast_milk === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="baby_receieves_breast_milk" value="no" checked={page4SaveData?.baby_receieves_breast_milk === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>

                     <div className='bg-white rounded ps-3 p-2 mt-3 family_health_box'>
                        <div>
                           <h6>গতকাল এই সময় থেকে, আপনার শিশু কি নিম্নলিখিত কোনটি পেয়েছে?</h6>
                        </div>
                        <strong>
                           <span className='me-2'>১.</span> ভিটামিন বা খনিজ সম্পূরক বা ওষুধ (যদি প্রয়োজন হয়) গতকাল থেকে, আপনার শিশু কি বুকের দুধ পেয়েছে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="vitamin_or_mineral" value="yes" checked={page4SaveData?.vitamin_or_mineral === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="vitamin_or_mineral" value="no" checked={page4SaveData?.vitamin_or_mineral === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                        <strong>
                           <span className='me-2'>২.</span>
                           সরল জল বা মিষ্টি (মিসরি জল)/স্বাদ জল (গোলাব জল) বা ফলের রস বা চা/ইনফিউশন
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes1" name="plain_water" value="yes" checked={page4SaveData?.plain_water === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no1" name="plain_water" value="no" checked={page4SaveData?.plain_water === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                        <strong>
                           <span className='me-2'>৩.</span>শিশুর সূত্র বা অন্যান্য দুধ (যেমন গরুর দুধ, সয়া দুধ, বাষ্পীভূত দুধ, কনডেন্সড মিল্ক ইত্যাদি)
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes2" name="infant_formula" value="yes" checked={page4SaveData?.infant_formula === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no2" name="infant_formula" value="no" checked={page4SaveData?.infant_formula === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                        <strong>
                           <span className='me-2'>৪.</span>কঠিন বা আধা-কঠিন খাবার
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="semi_sold_food" value="yes" checked={page4SaveData?.semi_sold_food === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="semi_sold_food" value="yes" checked={page4SaveData?.semi_sold_food === 'no'} />
                           <label for="" className='ms-3'>না </label> <br />
                        </div>
                     </div>
                  </div>
               }

               <div className='pedriatric_page4_btn mt-4'>
                  <button className='pedriatric_page4_btn_right' onClick={props.closePaediatricExaminationModal}>Cancel</button>
                  {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>}
                  <button className='pedriatric_page4_btn_next'
                     onClick={() => {
                        props.passData(9)
                     }}>Next <i class="fa-solid fa-angle-right"></i></button>
                  <button className='pedriatric_page4_btn_previous' onClick={() => {
                     props.passData(7)
                  }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
                  {btnLoading ? <button className='pedriatric_btn_middle mr-2'>Loading...</button> :
                     <button className='pedriatric_btn_right mr-2' onClick={() => {
                        setbtnLoading(true)
                        if (language === 'bangla') {
                           takeScreenShot(refPE2.current).then(res => {
                              toast.success('ScreenShot take Sucessfully', {
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
                        } else {
                           takeScreenShot(refPE1.current).then(res => {
                              toast.success('ScreenShot take successfully', {
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
                        }

                     }}>Take screenshot </button>}

               </div>
            </>


         }


      </>

   );
};

export default Paediatric_page8;