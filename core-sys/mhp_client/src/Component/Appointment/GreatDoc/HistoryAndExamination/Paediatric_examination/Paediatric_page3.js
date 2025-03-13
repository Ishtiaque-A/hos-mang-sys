import React, { useState, useEffect, createRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useScreenshot } from 'use-react-screenshot';

const Paediatric_page3 = (props) => {

   const [page3, setPage3] = useState({
      hearing_problem: '',
      eye_problem: '',
      relatives_blind: '',
      other_illness: "",
      intensive_care: "",
      physical_problem: "",
      family_history: "",
      breech_birth: "",
      patient_id: props.patient_id
   })
   const handleInputChange = (e) => {
      setPage3({
         ...page3, [e.target.name]: e.target.value
      })

   }
   const [language, setLanguage] = useState('english');
   const handleLanguage = (e) => {
      setLanguage(e.target.value);

   }

   const [page3Data, setPage3Data] = useState({
      hearing_problem: '',
      eye_problem: '',
      relatives_blind: '',
      other_illness: "",
      intensive_care: "",
      physical_problem: "",
      family_history: "",
      breech_birth: "",
   });

   console.log('page3 data check', page3Data)
   console.log('props check', props.propsData.patient_id)

   useEffect(() => {
      axios.get(`/get-paeditaric-data-by-id/${props.propsData.patient_id}`).then(res => {
         if (res.data.status === 200) {
            setPage3Data(res.data.get_data);
         }

      });

   }, [props.propsData.patient_id]);

   const [image, takeScreenShot] = useScreenshot();
   const refPEforEng = createRef(null);
   const refPE1forBan = createRef(null);
   const [btnLoading, setbtnLoading] = useState(false)



   return (
      <>
         <div className='float-end me-4 '>
            <select class="form-select form-select-sm col-12 mb-3 " aria-label=".form-select-sm example" onChange={handleLanguage}>
               <option selected value="english">Choose</option>
               <option value="bangla">বাংলা </option>
               <option value="english">English</option>
            </select>
         </div>


         {page3Data == null &&
            <h4 className='text-danger mt-5 text-center pb-5'> This patient Pediatric Exam Info of this page did not provide! </h4>
         }

         {page3Data !== null && <>

            {language === 'english' && <div ref={refPEforEng} className='p-3'>
               <p className='fw-bold text-danger  col-10'>Family health history and risk factors (for parents)</p>

               <div className='bg-white rounded ps-3 p-2 family_health_box'>
                  <strong>
                     <span className='me-2'>1.</span>Have any of your baby’s close relatives been deaf or had a hearing problem from childhood?
                  </strong>

                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="hearing_problem" checked={page3Data.hearing_problem === 'yes'} />
                     <label for="" className='ms-3'>Yes</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="hearing_problem" checked={page3Data.hearing_problem === 'no'} />
                     <label for="" className='ms-3'>No</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>2.</span>Did anyone in the family have eye problems in childhood?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="eye_problem" value="yes" checked={page3Data.eye_problem === 'yes'} />
                     <label for="" className='ms-3'>Yes</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="eye_problem" value="no" checked={page3Data.eye_problem === 'no'} />
                     <label for="" className='ms-3'>No</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>3.</span>Are any of your baby’s close relatives blind in one or both eyes?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="relatives_blind" value="yes" checked={page3Data.relatives_blind === 'yes'} />
                     <label for="" className='ms-3'>Yes</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="relatives_blind" value="no" checked={page3Data.relatives_blind === 'no'} />
                     <label for="" className='ms-3'>No</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>4.</span>During pregnancy, did your baby’s mother have rubella, cytomegalovirus, toxoplasmosis, herpes, or any other illness with a fever or rash?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="other_illness" value="yes" checked={page3Data.other_illness === 'yes'} />
                     <label for="" className='ms-3'>Yes</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="other_illness" value="no" checked={page3Data.other_illness === 'no'} />
                     <label for="" className='ms-3'>No</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>5.</span>At birth, did your baby weight less than 1500 grams, need to stay in the intensive care unit for more than two days, or need oxygen for 48 hours or longer?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="intensive_care" value="yes" checked={page3Data.intensive_care === 'yes'} />
                     <label for="" className='ms-3'>Yes</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="intensive_care" value="no" checked={page3Data.intensive_care === 'no'} />
                     <label for="" className='ms-3'>No</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>6.</span>Was your baby born with any physical problems?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="physical_problem" value="yes" checked={page3Data.physical_problem === 'yes'} />
                     <label for="" className='ms-3'>Yes</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="physical_problem" value="no" checked={page3Data.physical_problem === 'no'} />
                     <label for="" className='ms-3'>No</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>7.</span>Is there a family history of developmental dysplasia of the hips?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="family_history" value="yes" checked={page3Data.family_history === 'yes'} />
                     <label for="" className='ms-3'>Yes</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="family_history" value="no" checked={page3Data.family_history === 'no'} />
                     <label for="" className='ms-3'>No</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>8.</span>Did you have a breech birth?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="breech_birth" value="yes" checked={page3Data.breech_birth === 'yes'} />
                     <label for="" className='ms-3'>Yes</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="breech_birth" value="no" checked={page3Data.breech_birth === 'no'} />
                     <label for="" className='ms-3'>No</label>
                  </div>
               </div>
               <div>
                  <div className='pedriatric_page4_btn mt-4'>
                     <button className='pedriatric_page4_btn_right' onClick={props.closePaediatricExaminationModal}>Cancel</button>

                     {btnLoading ? <button className='pedriatric_page4_btn_left' >Loading...</button> :
                        <button className='pedriatric_page4_btn_left' onClick={() => {
                           if (image) {
                              const pData = {
                                 patient_id: parseInt(props.propsData.patient_id),
                                 page_no: 3,
                                 image: image
                              }
                              axios.post(`/paediatric`, pData).then(res => {
                                 toast.success(res.data.message)
                                 props.setstateUpdate(Math.random())
                                 setbtnLoading(false)
                              }).catch(error => {
                                 toast.error("Ops ! Something is wrong")
                              });
                           }
                        }}>Save</button>
                     }

                     <button className='pedriatric_page4_btn_next' onClick={() => {
                        props.passData(4)
                     }}>Next <i class="fa-solid fa-angle-right"></i></button>
                     <button className='pedriatric_page4_btn_previous ml-1' onClick={() => {
                        props.passData(2)
                     }}><i class="fa-solid fa-angle-left"></i>Previous Page</button>

                     {btnLoading ? <button className='pedriatric_btn_middle'>Loading...</button> :
                        <button className='pedriatric_btn_right' onClick={() => {
                           setbtnLoading(true)
                           if (language === 'bangla') {
                              takeScreenShot(refPEforEng.current).then(res => {
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
                           } else {
                              takeScreenShot(refPEforEng.current).then(res => {
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
               </div>
            </div>}


            {language === 'bangla' && <div ref={refPE1forBan} className='p-3'>
               {/* <div className='bg-white rounded ps-3 p-2 family_health_box'> */}
               <div>
                  <p className='fw-bold text-danger ms-2'>পারিবারিক স্বাস্থ্য ইতিহাস এবং ঝুঁকির কারণ (পিতামাতার জন্য)</p>
               </div>
               <div className='bg-white rounded ps-3 p-2 family_health_box'>
                  <strong>
                     <span className='me-2'>১.</span>আপনার শিশুর কোনো নিকটাত্মীয় বধির বা শ্রবণে সমস্যা আছে কিনা
                     ছোটবেলা থেকে?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="hearing_problem" checked={page3Data.hearing_problem === 'yes'} />
                     <label for="" className='ms-3'>হ্যাঁ</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="hearing_problem" checked={page3Data.hearing_problem === 'no'} />
                     <label for="" className='ms-3'>না </label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>২.</span>শৈশবে কি পরিবারের কারো চোখের সমস্যা ছিল?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="eye_problem" checked={page3Data.eye_problem === 'yes'} />
                     <label for="" className='ms-3'>হ্যাঁ</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="eye_problem" checked={page3Data.eye_problem === 'no'} />
                     <label for="" className='ms-3'>না</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>৩.</span>আপনার শিশুর কোনো নিকটাত্মীয় কি এক বা উভয় চোখে অন্ধ?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="relatives_blind" checked={page3Data.relatives_blind === 'yes'} />
                     <label for="" className='ms-3'>হ্যাঁ</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="relatives_blind" checked={page3Data.relatives_blind === 'no'} />
                     <label for="" className='ms-3'>না</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>৪.</span>গর্ভাবস্থায়, আপনার শিশুর মায়ের কি রুবেলা, সাইটোমেগালোভাইরাস ছিল,
                     টক্সোপ্লাজমোসিস, হারপিস, বা জ্বর বা ফুসকুড়ি সহ অন্য কোন অসুখ?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="other_illness" value="yes" checked={page3Data.other_illness === 'yes'} />
                     <label for="" className='ms-3'>হ্যাঁ</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="other_illness" value="no" checked={page3Data.other_illness === 'no'} />
                     <label for="" className='ms-3'>না</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>৫.</span>জন্মের সময়, আপনার শিশুর ওজন কি 1500 গ্রামের কম ছিল?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="intensive_care" value="yes" checked={page3Data.intensive_care === 'yes'} />
                     <label for="" className='ms-3'>হ্যাঁ</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="intensive_care" value="no" checked={page3Data.intensive_care === 'no'} />
                     <label for="" className='ms-3'>না</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>৬.</span>আপনার শিশুর কি কোনো শারীরিক সমস্যা নিয়ে জন্ম হয়েছে?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="physical_problem" value="yes" checked={page3Data.physical_problem === 'yes'} />
                     <label for="" className='ms-3'>হ্যাঁ</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="physical_problem" value="no" checked={page3Data.physical_problem === 'no'} />
                     <label for="" className='ms-3'>না</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>৭.</span>নিতম্বের উন্নয়নমূলক ডিসপ্লাসিয়ার একটি পারিবারিক ইতিহাস আছে কি?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="family_history" value="yes" checked={page3Data.family_history === 'yes'} />
                     <label for="" className='ms-3'>হ্যাঁ</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="family_history" value="no" checked={page3Data.family_history === 'no'} />
                     <label for="" className='ms-3'>না</label>
                  </div>
               </div>
               <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
                  <strong>
                     <span className='me-2'>৮.</span>আপনি একটি ব্রীচ জন্ম হয়েছে?
                  </strong>
                  <div className='mt-3'>
                     <input type="radio" onChange={handleInputChange} id="yes" name="breech_birth" value="yes" checked={page3Data.breech_birth === 'yes'} />
                     <label for="" className='ms-3'>হ্যাঁ</label> <br />
                     <input type="radio" onChange={handleInputChange} id="no" name="breech_birth" value="no" checked={page3Data.breech_birth === 'no'} />
                     <label for="" className='ms-3'>না</label>
                  </div>
               </div>
               <div>
                  <div className='pedriatric_page4_btn mt-4'>
                     <button className='pedriatric_page4_btn_right' onClick={props.closePaediatricExaminationModal}>Cancel</button>
                     <button className='pedriatric_page4_btn_next' onClick={() => {
                        props.passData(4)
                     }}>Next <i class="fa-solid fa-angle-right"></i></button>
                     <button className='pedriatric_page4_btn_previous' onClick={() => {
                        props.passData(2)
                     }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
                  </div>
               </div>
            </div>}

         </>
         }


      </>

   );
};

export default Paediatric_page3;