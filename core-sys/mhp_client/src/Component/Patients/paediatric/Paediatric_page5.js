import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Paediatric_page5 = (props) => {
   const [parentsPage5Data, setparentsPage5Data] = useState({
      regarading_feeding: "",
      receive_breast_milk: "",
      vitamins_or_mineral: "",

      plain_water: "",
      infant_formula: "",
      solid_or_semi: "",
      child_smiles: "",
      child_chukles: "",
      child_loooks_at_you: "",
      child_makes_sounds: "",
      child_makes_sounds_back: "",
      child_turns_head: "",
      child_if_hungry: "",
      child_looks_at_his_hands: "",
      child_other_important: "",
      baby_do_together: "",
      baby_likes_to_do: "",
      anything_your_baby_does: "",
      lost_any_skills: "",
      healthcare_needs: "",
      patient_id: props.passCancel.patient_id
   })
   const handleInputChange = (e) => {
      setparentsPage5Data({
         ...parentsPage5Data, [e.target.name]: e.target.value
      })

   }
   const handleSave = () => {
      var checkboxes = document.querySelectorAll('input[type=radio]')
      for (var checkbox of checkboxes) {
         if (checkbox.checked) {
            checkbox.checked = false
         }
      }

      axios.post(`/save-paediatric-parentsPage5Data`, parentsPage5Data).then(res => {
         if (res.data.status == 200) {
            toast.success("Data inserted sucessfully");
            setparentsPage5Data({
               regarading_feeding: "",
               receive_breast_milk: "",
               vitamins_or_mineral: "",

               plain_water: "",
               infant_formula: "",
               solid_or_semi: "",
               child_smiles: "",
               child_chukles: "",
               child_loooks_at_you: "",
               child_makes_sounds: "",
               child_makes_sounds_back: "",
               child_turns_head: "",
               child_if_hungry: "",
               child_looks_at_his_hands: "",
               child_other_important: "",
               baby_do_together: "",
               baby_likes_to_do: "",
               anything_your_baby_does: "",
               lost_any_skills: "",
               healthcare_needs: "",
            })

         }


      })
   }


   return (
      <div className='p-3'>
         <div>
            <h5>8 মাস পুরানো প্রশ্নাবলী:</h5>
            <p className='fw-bold'>For Parents :</p>
         </div>
         {/* for parents*/}

         <div className='shadow-lg bg-white rounded'>
            <div className='ps-3 p-2 mt-2'>
               <strong>
                  <span className='me-2'>1.</span>আপনার কি খাওয়ানোর বিষয়ে কোন উদ্বেগ আছে?
               </strong>
               <div className='mt-3'>
                  <input type="radio" onChange={handleInputChange} id="yes" name="regarading_feeding" value="yes" />
                  <label for="" className='ms-3'>হ্যাঁ</label> <br />
                  <input type="radio" onChange={handleInputChange} id="no" name="regarading_feeding" value="no" />
                  <label for="" className='ms-3'>না</label> <br />
               </div>
            </div>
            <div className='ps-3 p-2 mt-2'>
               <strong>
                  <span className='me-2'>2.</span>গতকাল এই সময় থেকে, আপনার শিশু কি বুকের দুধ পেয়েছে?
               </strong>
               <div className='mt-3'>
                  <input type="radio" onChange={handleInputChange} id="yes" name="receive_breast_milk" value="yes" />
                  <label for="" className='ms-3'>হ্যাঁ</label> <br />
                  <input type="radio" onChange={handleInputChange} id="no" name="receive_breast_milk" value="no" />
                  <label for="" className='ms-3'>না</label> <br />
               </div>
            </div>
            <div>
               <strong className='ms-3'>গতকাল এই সময় থেকে, আপনার শিশু কি নিম্নলিখিত কোনটি পেয়েছে?</strong>
            </div>
            <div className='ps-3 p-2 mt-2'>
               <strong>
                  <span className='me-2'>১)</span>ভিটামিন বা খনিজ সম্পূরক বা ওষুধ (যদি প্রয়োজন হয়)
               </strong>
               <div className='mt-3'>
                  <input type="radio" onChange={handleInputChange} id="yes" name="vitamins_or_mineral" value="yes" />
                  <label for="" className='ms-3'>হ্যাঁ</label> <br />
                  <input type="radio" onChange={handleInputChange} id="no" name="vitamins_or_mineral" value="no" />
                  <label for="" className='ms-3'>না</label> <br />
               </div>
            </div>
            <div className='ps-3 p-2 mt-2'>
               <strong>
                  <span className='me-2'>২)</span>সরল জল বা মিষ্টি (মিসরি জল) /স্বাদ জল (গোলাব জাল) বা ফলের রস বা চা/ইনফিউশন
               </strong>
               <div className='mt-3'>
                  <input type="radio" onChange={handleInputChange} id="yes" name="plain_water" value="yes" />
                  <label for="" className='ms-3'>হ্যাঁ</label> <br />
                  <input type="radio" onChange={handleInputChange} id="no" name="plain_water" value="no" />
                  <label for="" className='ms-3'>না</label> <br />
               </div>
            </div>
            <div className='ps-3 p-2 mt-2'>
               <strong>
                  <span className='me-2'> ৩)</span>শিশুর সূত্র বা অন্যান্য দুধ (গরু দুধ, সয়া দুধ, বাষ্পীভূত দুধ, ঘন দুধ ইত্যাদি)
               </strong>
               <div className='mt-3'>
                  <input type="radio" onChange={handleInputChange} id="yes" name="infant_formula" value="yes" />
                  <label for="" className='ms-3'>হ্যাঁ</label> <br />
                  <input type="radio" onChange={handleInputChange} id="no" name="infant_formula" value="no" />
                  <label for="" className='ms-3'>না</label> <br />
               </div>
            </div>
            <div className='ps-3 p-2 mt-2'>
               <strong>
                  <span className='me-2'>8)</span>কঠিন বা আধা-কঠিন খাবার
               </strong>
               <div className='mt-3'>
                  <input type="radio" onChange={handleInputChange} id="yes" name="solid_or_semi" value="yes" />
                  <label for="" className='ms-3'>হ্যাঁ</label> <br />
                  <input type="radio" onChange={handleInputChange} id="no" name="solid_or_semi" value="no" />
                  <label for="" className='ms-3'>না</label>
               </div>
            </div>
         </div>

         {/* social/emotional */}
         <div>
            <h6 className='mt-4'>সামাজিক/আবেগিক</h6>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
            <strong>
               <span className='me-2'>1.</span>আপনার শিশু কি আপনার দৃষ্টি আকর্ষণ করার জন্য নিজে থেকে হাসে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="child_smiles" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="child_smiles" value="no" />
               <label for="" className='ms-3'>না</label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>2.</span>আপনি যখন তাকে হাসানোর চেষ্টা করেন তখন কি আপনার সন্তান হাসে (এখনও পুরো হাসেনি)?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="child_chukles" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="child_chukles" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>2.</span>আপনার শিশু কি আপনার দিকে তাকায়, নড়াচড়া করে বা আপনার মনোযোগ আকর্ষণ করার জন্য শব্দ করে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="child_loooks_at_you" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="child_loooks_at_you" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         {/* Language/communication */}
         <div>
            <h6 className='mt-4'>ভাষা/যোগাযোগ</h6>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
            <strong>
               <span className='me-2'>1.</span>আপনার সন্তান কি “ওওওও”, “আআআআ” (কুইং) এর মতো শব্দ করে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="child_makes_sounds" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="child_makes_sounds" value="no" />
               <label for="" className='ms-3'>না</label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>2.</span>আপনি যখন তার সাথে কথা বলেন তখন কি আপনার শিশু শব্দ করে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="child_makes_sounds_back" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="child_makes_sounds_back" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>2.</span>আপনার শিশু কি আপনার কণ্ঠস্বরের দিকে মুখ করে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="child_turns_head" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="child_turns_head" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>

         {/* cognitive */}

         <div>
            <h6 className='mt-4'>জ্ঞানীয় (শিক্ষা, চিন্তাভাবনা, সমস্যা সমাধান)</h6>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
            <strong>
               <span className='me-2'>১.</span>আপনার শিশু কি ক্ষুধার্ত হলে, স্তন বা বোতল দেখলে মুখ খোলে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="child_if_hungry" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="child_if_hungry" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>২.</span>আপনার সন্তান কি তার হাতের দিকে আগ্রহ নিয়ে তাকায়?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="child_looks_at_his_hands" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="child_looks_at_his_hands" value="no" />
               <label for="" className='ms-3'>না</label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৩.</span>আপনার সন্তান কি ডাক্তারের সাথে অন্যান্য গুরুত্বপূর্ণ বিষয় শেয়ার করবেন?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="child_other_important" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="child_other_important" value="no" />
               <label for="" className='ms-3'>না</label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৪.</span>আপনি এবং আপনার শিশু একসাথে কিছু জিনিস কি কি?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="baby_do_together" value="yes" />
               <label for="" className='ms-3'>এটি আপনার ডাক্তারকে বলুন</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="baby_do_together" value="no" />
               <label for="" className='ms-3'>নার্স</label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৫.</span>আপনার শিশুর কিছু জিনিস কি কি করতে পছন্দ করে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="baby_likes_to_do" value="yes" />
               <label for="" className='ms-3'>এটি আপনার ডাক্তারকে বলুন</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="baby_likes_to_do" value="no" />
               <label for="" className='ms-3'>নার্স</label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৬.</span>আপনার শিশু এমন কিছু করে বা না করে যা আপনাকে উদ্বিগ্ন করে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="anything_your_baby_does" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="anything_your_baby_does" value="no" />
               <label for="" className='ms-3'>না</label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৭ .</span>আপনার শিশুর কি কোনো দক্ষতা হারিয়েছে যা তার একবার ছিল?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="lost_any_skills" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="lost_any_skills" value="no" />
               <label for="" className='ms-3'>না</label> <br />
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৮ .</span>আপনার শিশুর কি কোনো বিশেষ স্বাস্থ্যসেবার প্রয়োজন আছে নাকি সে সময়ের আগেই জন্ম নিয়েছে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="healthcare_needs" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="healthcare_needs" value="no" />
               <label for="" className='ms-3'>না</label> <br />
            </div>
         </div>
         <div>
            <div className='pedriatric_page4_btn mt-4'>
               <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>
               <button className='pedriatric_page4_btn_next' onClick={() => {
                  props.passData(11)
               }}
               >Next <i class="fa-solid fa-angle-right"></i></button>
               <button className='pedriatric_page4_btn_previous' onClick={() => {
                  props.passData(9)
               }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
            </div>
         </div>
      </div>
   );
};

export default Paediatric_page5;