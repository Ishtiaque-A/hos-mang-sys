import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';


const Paediatric_page4 = (props) => {


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

      patient_id: props.passCancel.patient_id
   })
   const handleInputChange = (e) => {
      setparentsPage4Data({
         ...parentsPage4Data, [e.target.name]: e.target.value
      })

   }
   const handleSave = () => {
      var checkboxes = document.querySelectorAll('input[type=radio]')
      for (var checkbox of checkboxes) {
         if (checkbox.checked) {
            checkbox.checked = false
         }
      }

      axios.post(`/save-paediatric-parentsPage4Data`, parentsPage4Data).then(res => {
         if (res.data.status == 200) {
            toast.success("Data inserted sucessfully");
            setparentsPage4Data({
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
            })

         }


      })
   }



   return (
      <div className='p-3'>
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
               <input type="radio" id="yes" name="child_clams_down" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_clams_down" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
               <input type="radio" id="no" name="child_clams_down" onChange={handleInputChange} value="not yet" />
               <label for="" className='ms-3'>এখনো না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>২.</span>আপনার সন্তান কি আপনার মুখের দিকে তাকায়?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="child_looks_at_your_face" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_looks_at_your_face" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
               <input type="radio" id="no" name="child_looks_at_your_face" onChange={handleInputChange} value="not yet" />
               <label for="" className='ms-3'>এখনো না </label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৩.</span>আপনি যখন তার কাছে যান তখন কি আপনার সন্তান আপনাকে দেখে খুশি হয়?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="child_seems_happy" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_seems_happy" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
               <input type="radio" id="no" name="child_seems_happy" onChange={handleInputChange} value="not yet" />
               <label for="" className='ms-3'>এখনো না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৪.</span>আপনার সন্তান কি হাসে যখন আপনি তার সাথে কথা বলেন বা হাসেন?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="child_smiles_when" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_smiles_when" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
               <input type="radio" id="no" name="child_smiles_when" onChange={handleInputChange} value="not yet" />
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
               <input type="radio" id="yes" name="child_makes_sounds" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_makes_sounds" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>২.</span>আপনার শিশু কি উচ্চ শব্দে প্রতিক্রিয়া দেখায়?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="child_reacts_to_loud" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_reacts_to_loud" onChange={handleInputChange} value="no" />
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
               <input type="radio" id="yes" name="child_watches_you" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_watches_you" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>২.</span>আপনার সন্তান কি কয়েক সেকেন্ডের জন্য খেলনার দিকে তাকায়?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="child_looks_at" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_looks_at" onChange={handleInputChange} value="no" />
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
               <input type="radio" id="yes" name="child_holds_head_up" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_holds_head_up" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>২.</span>আপনার সন্তান কি উভয় হাত এবং উভয় পা নড়াচড়া করে?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="child_moves_both" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_moves_both" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৩.</span>আপনার শিশু কি অল্প সময়ের জন্য হাত খোলে?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="child_opens_hands" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="child_opens_hands" onChange={handleInputChange} value="no" />
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
               <input type="radio" id="yes" name="my_postnatal_check" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="my_postnatal_check" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3 text-danger'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>২.</span>আমার বাচ্চা নিয়ে চিন্তিত?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="concerned_about" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3 text-danger'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="concerned_about" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>

               <span className='me-2'>৩.</span> (পিতামাতার জন্য)<span className='text-danger'>
                  আপনি কি পারিবারিক স্বাস্থ্য ইতিহাস এবং ঝুঁকির কারণগুলি সম্পূর্ণ করেছেন</span>
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="completed_family_health_history" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="completed_family_health_history" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3 text-danger'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৪.</span>আপনি কি আমার শিশুর শ্রবণশক্তি নিয়ে চিন্তিত?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="concerned_about_my_baby" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3 text-danger'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="concerned_about_my_baby" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৫.</span> আপনি কি শিশুর আলোর দিকে ঝুঁকেছেন?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="turn_towards_light" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="turn_towards_light" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3 text-danger'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৬.</span>আপনার শিশু কি আপনার মুখের দিকে তাকায় এবং আপনার সাথে চোখের যোগাযোগ করে?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="makes_eyes_contact" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="makes_eyes_contact" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3 text-danger'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৭.</span>আপনি কি লক্ষ্য করেছেন যে আপনার শিশুর এক বা উভয় ছাত্রই সাদা?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="pupils_are_white" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="pupils_are_white" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৮.</span>বাচ্চা এবং আপনি কি একসাথে থাকতে উপভোগ করেন?
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="enjoy_being_together" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="enjoy_being_together" onChange={handleInputChange} value="no" />
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
               <input type="radio" id="yes" name="baby_receieves_breast_milk" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="baby_receieves_breast_milk" onChange={handleInputChange} value="no" />
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
               <input type="radio" id="yes" name="vitamin_or_mineral" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="vitamin_or_mineral" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
            <strong>
               <span className='me-2'>২.</span>
               সরল জল বা মিষ্টি (মিসরি জল)/স্বাদ জল (গোলাব জল) বা ফলের রস বা চা/ইনফিউশন
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes1" name="plain_water" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no1" name="plain_water" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
            <strong>
               <span className='me-2'>৩.</span>শিশুর সূত্র বা অন্যান্য দুধ (যেমন গরুর দুধ, সয়া দুধ, বাষ্পীভূত দুধ, কনডেন্সড মিল্ক ইত্যাদি)
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes2" name="infant_formula" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no2" name="infant_formula" onChange={handleInputChange} value="no" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
            <strong>
               <span className='me-2'>৪.</span>কঠিন বা আধা-কঠিন খাবার
            </strong>
            <div className='mt-3'>
               <input type="radio" id="yes" name="semi_sold_food" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" id="no" name="semi_sold_food" onChange={handleInputChange} value="yes" />
               <label for="" className='ms-3'>না </label> <br />
            </div>
         </div>

         <div>
            <div className='pedriatric_page4_btn mt-4'>

               <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>
               <button className='pedriatric_page4_btn_next'
                  onClick={() => {
                     props.passData(9)
                  }}>Next <i class="fa-solid fa-angle-right"></i></button>
               <button className='pedriatric_page4_btn_previous' onClick={() => {
                  props.passData(7)
               }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
            </div>
         </div>
      </div>
   );
};

export default Paediatric_page4;