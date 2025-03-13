import React, { useState, useEffect, createRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useScreenshot } from 'use-react-screenshot';

const Paediatric_page10 = (props) => {
   const [language, setLanguage] = useState('english');
   const handleLanguage = (e) => {
      setLanguage(e.target.value);

   }

   const [page5SaveData, setpage5SaveData] = useState('');
   console.log('check data', page5SaveData);

   useEffect(() => {
      axios.get(`/get-paediatric-parentsPage5Data/${props.propsData.patient_id}`).then(res => {
         if (res.data.status === 200) {
            setpage5SaveData(res.data.get_data);
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
            page_no: 10,
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

         {page5SaveData !== null &&
            <h4 className='text-danger mt-5 text-center pb-5'> This patient Paediatric Exam Info of this page did not provide! </h4>
         }

         {page5SaveData === null &&
            <>

               {language === 'english' &&
                  <div ref={refPE1} className='p-3'>
                     <div>
                        <h5>The 4 months old Questionary:</h5>
                        <p className='fw-bold'>For Parents :</p>
                     </div>
                     {/* for parents*/}

                     <div className='shadow-lg bg-white rounded'>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>1.</span>Do you have any concerns regarding  Feeding?
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="regarading_feeding" value="yes" checked={page5SaveData?.regarading_feeding === 'yes'} />
                              <label for="" className='ms-3'>Yes</label> <br />
                              <input type="radio" id="no" name="regarading_feeding" value="no" checked={page5SaveData?.regarading_feeding === 'no'} />
                              <label for="" className='ms-3'>No</label> <br />
                           </div>
                        </div>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>2.</span>Since this time yesterday, did your baby receive breast milk?
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="receive_breast_milk" value="yes" checked={page5SaveData?.receive_breast_milk === 'yes'} />
                              <label for="" className='ms-3'>Yes</label> <br />
                              <input type="radio" id="no" name="receive_breast_milk" value="no" checked={page5SaveData?.receive_breast_milk === 'no'} />
                              <label for="" className='ms-3'>No</label> <br />
                           </div>
                        </div>
                        <div>
                           <strong className='ms-3'>Since this time yesterday, did your baby receive any  of the following?</strong>
                        </div>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>a)</span>Vitamins OR mineral supplements OR medicine (if required)
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="vitamins_or_mineral" value="yes" checked={page5SaveData?.vitamins_or_mineral === 'yes'} />
                              <label for="" className='ms-3'>Yes</label> <br />
                              <input type="radio" id="no" name="vitamins_or_mineral" value="no" checked={page5SaveData?.vitamins_or_mineral === 'no'} />
                              <label for="" className='ms-3'>No</label> <br />
                           </div>
                        </div>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>b)</span>Plain water OR sweetened (Misri Watrer) /flavoured water(Golab Jaal) OR fruit juice OR tea/infusions
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="plain_water" value="yes" checked={page5SaveData?.plain_water === 'yes'} />
                              <label for="" className='ms-3'>Yes</label> <br />
                              <input type="radio" id="no" name="plain_water" value="no" checked={page5SaveData?.plain_water === 'no'} />
                              <label for="" className='ms-3'>No</label> <br />
                           </div>
                        </div>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>c)</span>Infant formula OR other milk (cows milk, soy milk, evaporated milk, condensed milk etc)
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="infant_formula" value="yes" checked={page5SaveData?.infant_formula === 'yes'} />
                              <label for="" className='ms-3'>Yes</label> <br />
                              <input type="radio" id="no" name="infant_formula" value="no" checked={page5SaveData?.infant_formula === 'no'} />
                              <label for="" className='ms-3'>No</label> <br />
                           </div>
                        </div>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>d)</span>Solid OR semi-solid food
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="solid_or_semi" value="yes" checked={page5SaveData?.solid_or_semi === 'yes'} />
                              <label for="" className='ms-3'>Yes</label> <br />
                              <input type="radio" id="no" name="solid_or_semi" value="no" checked={page5SaveData?.solid_or_semi === 'no'} />
                              <label for="" className='ms-3'>No</label>
                           </div>
                        </div>
                     </div>

                     {/* social/emotional */}
                     <div>
                        <h6 className='mt-4'>Social/Emotional</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>1.</span>Does your chid Smiles on his own to get your attention ?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_smiles" value="yes" checked={page5SaveData?.child_smiles === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_smiles" value="no" checked={page5SaveData?.child_smiles === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your chid Chuckles (not yet a full laugh) when you try to make her laugh?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_chukles" value="yes" checked={page5SaveData?.child_chukles === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_chukles" value="no" checked={page5SaveData?.child_chukles === 'no'} />
                           <label for="" className='ms-3'>No</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your child Looks at you, moves, or makes sounds to get or keep your attention?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_loooks_at_you" value="yes" checked={page5SaveData?.child_loooks_at_you === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_loooks_at_you" value="no" checked={page5SaveData?.child_loooks_at_you === 'no'} />
                           <label for="" className='ms-3'>No</label>
                        </div>
                     </div>
                     {/* Language/communication */}
                     <div>
                        <h6 className='mt-4'>Language/communication</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>1.</span>Does your chid Makes sounds like “oooo”, “aahh” (cooing)?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_makes_sounds" value="yes" checked={page5SaveData?.child_makes_sounds === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_makes_sounds" value="no" checked={page5SaveData?.child_makes_sounds === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your child Makes sounds back when you talk to him?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_makes_sounds_back" value="yes" checked={page5SaveData?.child_makes_sounds_back === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_makes_sounds_back" value="no" checked={page5SaveData?.child_makes_sounds_back === 'no'} />
                           <label for="" className='ms-3'>No</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your chid Turns head towards the sound of your voice?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_turns_head" value="yes" checked={page5SaveData?.child_turns_head === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_turns_head" value="no" checked={page5SaveData?.child_turns_head === 'no'} />
                           <label for="" className='ms-3'>No</label>
                        </div>
                     </div>

                     {/* cognitive */}

                     <div>
                        <h6 className='mt-4'>Cognitive (learning, thinking, problem–solving)</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>1.</span>Does your chid If hungry, opens mouth when she sees breast or bottle?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_if_hungry" value="yes" checked={page5SaveData?.child_if_hungry === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_if_hungry" value="no" checked={page5SaveData?.child_if_hungry === 'no'} />
                           <label for="" className='ms-3'>No</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your chid Looks at his hands with interest?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_looks_at_his_hands" value="yes" checked={page5SaveData?.child_looks_at_his_hands === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_looks_at_his_hands" value="no" checked={page5SaveData?.child_looks_at_his_hands === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>3.</span>Does your chid Other important things to share with the doctor?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_other_important" value="yes" checked={page5SaveData?.child_other_important === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="child_other_important" value="no" checked={page5SaveData?.child_other_important === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>4.</span>What are some things you and your baby do together?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="baby_do_together" value="yes" checked={page5SaveData?.baby_do_together === 'yes'} />
                           <label for="" className='ms-3'>Tell this to your doctor</label> <br />
                           <input type="radio" id="no" name="baby_do_together" value="no" checked={page5SaveData?.baby_do_together === 'no'} />
                           <label for="" className='ms-3'>Nurse</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>5.</span>What are some things your baby likes to do?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="baby_likes_to_do" value="yes" checked={page5SaveData?.baby_likes_to_do === 'yes'} />
                           <label for="" className='ms-3'>Tell this to your doctor</label> <br />
                           <input type="radio" id="no" name="baby_likes_to_do" value="no" checked={page5SaveData?.baby_likes_to_do === 'no'} />
                           <label for="" className='ms-3'>Nurse</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>6.</span>Is there anything your baby does or does not do that concerns you?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="anything_your_baby_does" value="yes" checked={page5SaveData?.anything_your_baby_does === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="anything_your_baby_does" value="no" checked={page5SaveData?.anything_your_baby_does === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>7.</span>Has your baby lost any skills he/she once had?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="lost_any_skills" value="yes" checked={page5SaveData?.lost_any_skills === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="lost_any_skills" value="no" checked={page5SaveData?.lost_any_skills === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>2.</span>Does your baby have any special healthcare needs or was he/she born prematurely?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="healthcare_needs" value="yes" checked={page5SaveData?.healthcare_needs === 'yes'} />
                           <label for="" className='ms-3'>Yes</label> <br />
                           <input type="radio" id="no" name="healthcare_needs" value="no" checked={page5SaveData?.healthcare_needs === 'no'} />
                           <label for="" className='ms-3'>No</label> <br />
                        </div>
                     </div>


                  </div>
               }
               {language === 'bangla' &&
                  <div ref={refPE2} className='p-3'>
                     <div>
                        <h5>8 মাস পুরানো প্রশ্নাবলী:</h5>
                        <p className='fw-bold'> মা-বাবার জন্য:</p>
                     </div>
                     {/* for parents*/}

                     <div className='shadow-lg bg-white rounded'>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>১.</span>আপনার কি খাওয়ানোর বিষয়ে কোন উদ্বেগ আছে?
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="regarading_feeding" value="yes" checked={page5SaveData?.regarading_feeding === 'yes'} />
                              <label for="" className='ms-3'>হ্যাঁ</label> <br />
                              <input type="radio" id="no" name="regarading_feeding" value="no" checked={page5SaveData?.regarading_feeding === 'no'} />
                              <label for="" className='ms-3'>না</label> <br />
                           </div>
                        </div>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>২.</span>গতকাল এই সময় থেকে, আপনার শিশু কি বুকের দুধ পেয়েছে?
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="receive_breast_milk" value="yes" checked={page5SaveData?.receive_breast_milk === 'yes'} />
                              <label for="" className='ms-3'>হ্যাঁ</label> <br />
                              <input type="radio" id="no" name="receive_breast_milk" value="no" checked={page5SaveData?.receive_breast_milk === 'no'} />
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
                              <input type="radio" id="yes" name="vitamins_or_mineral" value="yes" checked={page5SaveData?.vitamins_or_mineral === 'yes'} />
                              <label for="" className='ms-3'>হ্যাঁ</label> <br />
                              <input type="radio" id="no" name="vitamins_or_mineral" value="no" checked={page5SaveData?.vitamins_or_mineral === 'no'} />
                              <label for="" className='ms-3'>না</label> <br />
                           </div>
                        </div>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>২)</span>সরল জল বা মিষ্টি (মিসরি জল) /স্বাদ জল (গোলাব জাল) বা ফলের রস বা চা/ইনফিউশন
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="plain_water" value="yes" checked={page5SaveData?.plain_water === 'yes'} />
                              <label for="" className='ms-3'>হ্যাঁ</label> <br />
                              <input type="radio" id="no" name="plain_water" value="no" checked={page5SaveData?.plain_water === 'no'} />
                              <label for="" className='ms-3'>না</label> <br />
                           </div>
                        </div>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'> ৩)</span>শিশুর সূত্র বা অন্যান্য দুধ (গরু দুধ, সয়া দুধ, বাষ্পীভূত দুধ, ঘন দুধ ইত্যাদি)
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="infant_formula" value="yes" checked={page5SaveData?.infant_formula === 'yes'} />
                              <label for="" className='ms-3'>হ্যাঁ</label> <br />
                              <input type="radio" id="no" name="infant_formula" value="no" checked={page5SaveData?.infant_formula === 'no'} />
                              <label for="" className='ms-3'>না</label> <br />
                           </div>
                        </div>
                        <div className='ps-3 p-2 mt-2'>
                           <strong>
                              <span className='me-2'>8)</span>কঠিন বা আধা-কঠিন খাবার
                           </strong>
                           <div className='mt-3'>
                              <input type="radio" id="yes" name="solid_or_semi" value="yes" checked={page5SaveData?.solid_or_semi === 'yes'} />
                              <label for="" className='ms-3'>হ্যাঁ</label> <br />
                              <input type="radio" id="no" name="solid_or_semi" value="no" checked={page5SaveData?.solid_or_semi === 'no'} />
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
                           <span className='me-2'>১.</span>আপনার শিশু কি আপনার দৃষ্টি আকর্ষণ করার জন্য নিজে থেকে হাসে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_smiles" value="yes" checked={page5SaveData?.child_smiles === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_smiles" value="no" checked={page5SaveData?.child_smiles === 'no'} />
                           <label for="" className='ms-3'>না</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>২.</span>আপনি যখন তাকে হাসানোর চেষ্টা করেন তখন কি আপনার সন্তান হাসে (এখনও পুরো হাসেনি)?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_chukles" value="yes" checked={page5SaveData?.child_chukles === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_chukles" value="no" checked={page5SaveData?.child_chukles === 'no'} />
                           <label for="" className='ms-3'>না</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৩.</span>আপনার শিশু কি আপনার দিকে তাকায়, নড়াচড়া করে বা আপনার মনোযোগ আকর্ষণ করার জন্য শব্দ করে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_loooks_at_you" value="yes" checked={page5SaveData?.child_loooks_at_you === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_loooks_at_you" value="no" checked={page5SaveData?.child_loooks_at_you === 'no'} />
                           <label for="" className='ms-3'>না</label>
                        </div>
                     </div>
                     {/* Language/communication */}
                     <div>
                        <h6 className='mt-4'>ভাষা/যোগাযোগ</h6>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
                        <strong>
                           <span className='me-2'>১.</span>আপনার সন্তান কি “ওওওও”, “আআআআ” (কুইং) এর মতো শব্দ করে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_makes_sounds" value="yes" checked={page5SaveData?.child_makes_sounds === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_makes_sounds" value="no" checked={page5SaveData?.child_makes_sounds === 'no'} />
                           <label for="" className='ms-3'>না</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>২.</span>আপনি যখন তার সাথে কথা বলেন তখন কি আপনার শিশু শব্দ করে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_makes_sounds_back" value="yes" checked={page5SaveData?.child_makes_sounds_back === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_makes_sounds_back" value="no" checked={page5SaveData?.child_makes_sounds_back === 'no'} />
                           <label for="" className='ms-3'>না</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৩.</span>আপনার শিশু কি আপনার কণ্ঠস্বরের দিকে মুখ করে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_turns_head" value="yes" checked={page5SaveData?.child_turns_head === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_turns_head" value="no" checked={page5SaveData?.child_turns_head === 'no'} />
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
                           <input type="radio" id="yes" name="child_if_hungry" value="yes" checked={page5SaveData?.child_if_hungry === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_if_hungry" value="no" checked={page5SaveData?.child_if_hungry === 'no'} />
                           <label for="" className='ms-3'>না</label>
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>২.</span>আপনার সন্তান কি তার হাতের দিকে আগ্রহ নিয়ে তাকায়?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_looks_at_his_hands" value="yes" checked={page5SaveData?.child_looks_at_his_hands === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_looks_at_his_hands" value="no" checked={page5SaveData?.child_looks_at_his_hands === 'no'} />
                           <label for="" className='ms-3'>না</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৩.</span>আপনার সন্তান কি ডাক্তারের সাথে অন্যান্য গুরুত্বপূর্ণ বিষয় শেয়ার করবেন?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="child_other_important" value="yes" checked={page5SaveData?.child_other_important === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="child_other_important" value="no" checked={page5SaveData?.child_other_important === 'no'} />
                           <label for="" className='ms-3'>না</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৪.</span>আপনি এবং আপনার শিশু একসাথে কিছু জিনিস কি কি?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="baby_do_together" value="yes" checked={page5SaveData?.baby_do_together === 'yes'} />
                           <label for="" className='ms-3'>এটি আপনার ডাক্তারকে বলুন</label> <br />
                           <input type="radio" id="no" name="baby_do_together" value="no" checked={page5SaveData?.baby_do_together === 'no'} />
                           <label for="" className='ms-3'>নার্স</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৫.</span>আপনার শিশুর কিছু জিনিস কি কি করতে পছন্দ করে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="baby_likes_to_do" value="yes" checked={page5SaveData?.baby_likes_to_do === 'yes'} />
                           <label for="" className='ms-3'>এটি আপনার ডাক্তারকে বলুন</label> <br />
                           <input type="radio" id="no" name="baby_likes_to_do" value="no" checked={page5SaveData?.baby_likes_to_do === 'no'} />
                           <label for="" className='ms-3'>নার্স</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৬.</span>আপনার শিশু এমন কিছু করে বা না করে যা আপনাকে উদ্বিগ্ন করে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="anything_your_baby_does" value="yes" checked={page5SaveData?.anything_your_baby_does === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="anything_your_baby_does" value="no" checked={page5SaveData?.anything_your_baby_does === 'no'} />
                           <label for="" className='ms-3'>না</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৭ .</span>আপনার শিশুর কি কোনো দক্ষতা হারিয়েছে যা তার একবার ছিল?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="lost_any_skills" value="yes" checked={page5SaveData?.lost_any_skills === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="lost_any_skills" value="no" checked={page5SaveData?.lost_any_skills === 'no'} />
                           <label for="" className='ms-3'>না</label> <br />
                        </div>
                     </div>
                     <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                        <strong>
                           <span className='me-2'>৮ .</span>আপনার শিশুর কি কোনো বিশেষ স্বাস্থ্যসেবার প্রয়োজন আছে নাকি সে সময়ের আগেই জন্ম নিয়েছে?
                        </strong>
                        <div className='mt-3'>
                           <input type="radio" id="yes" name="healthcare_needs" value="yes" checked={page5SaveData?.healthcare_needs === 'yes'} />
                           <label for="" className='ms-3'>হ্যাঁ</label> <br />
                           <input type="radio" id="no" name="healthcare_needs" value="no" checked={page5SaveData?.healthcare_needs === 'no'} />
                           <label for="" className='ms-3'>না</label> <br />
                        </div>
                     </div>


                  </div>
               }

               <div>
                  <div className='pedriatric_page4_btn mt-4'>
                     <button className='pedriatric_page4_btn_right' onClick={props.closePaediatricExaminationModal}>Cancel</button>
                     {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>}
                     <button className='pedriatric_page4_btn_next'
                        onClick={() => {
                           props.passData(11)
                        }}>Next <i class="fa-solid fa-angle-right"></i></button>
                     <button className='pedriatric_page4_btn_previous' onClick={() => {
                        props.passData(9)
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
                           }

                        }}>Take screenshot </button>}

                  </div>
               </div>
            </>
         }


      </>



   );
};

export default Paediatric_page10;