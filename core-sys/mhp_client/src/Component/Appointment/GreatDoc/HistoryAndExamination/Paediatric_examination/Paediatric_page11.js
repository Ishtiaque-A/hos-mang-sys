import axios from 'axios';
import React, { createRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useScreenshot } from 'use-react-screenshot';

const Paediatric_page11 = (props) => {

   const [image, takeScreenShot] = useScreenshot();
   const refPE1 = createRef(null);
   const [btnLoading, setbtnLoading] = useState(false)


   const handleSave = (e) => {
      e.preventDefault();

      if (image) {
         const pData = {
            patient_id: parseInt(props.propsData.patient_id),
            page_no: 11,
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
         <div ref={refPE1} className='p-3'>
            <div>
               <h5>The 6 months old Visit:</h5>
               <p className='fw-bold text-danger'>For Parents Child development progress</p>
               <h6 className='mt-4'>Social/emotional</h6>
            </div>
            {/* social emotion */}

            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>1.</span>Does the child knows familiar faces and begins to know if someone is a stranger ?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language1" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language1" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
                  <input type="radio" id="no" name="fav_language1" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>2.</span>Does the child laugh and often seems happy ?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language2" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language2" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
                  <input type="radio" id="no" name="fav_language2" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>3.</span>Does the child likes to look at self in a mirror?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language3" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language3" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
                  <input type="radio" id="no" name="fav_language3" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>

            {/* Language/communication */}
            <div>
               <h6 className='mt-4'>Language/communication</h6>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
               <strong>
                  <span className='me-2'>1.</span>Does the child responds to sounds by making sound?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language4" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language4" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
                  <input type="radio" id="no" name="fav_language4" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>2.</span>Does the child take turns with a parent while making sounds?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language5" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language5" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
                  <input type="radio" id="no" name="fav_language5" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>3.</span>Does the child respond to their own name?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language6" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language6" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language6" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>4.</span>Does the child make sounds to show joy and displeasure?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language7" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language7" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language7" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>5.</span>Does your child make Squealing Noises?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language8" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language8" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language8" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>6.</span>Does your child stick their tongue out and blow?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language9" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language9" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language9" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>

            {/* cognitive */}

            <div>
               <h6 className='mt-4'>Cognitive (learning, thinking, problem–solving)</h6>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
               <strong>
                  <span className='me-2'>1.</span>Does the child look around at things nearby?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language10" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language10" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
                  <input type="radio" id="no" name="fav_language10" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>2.</span>Does the child bring things to mouth to explore them?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language11" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language11" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
                  <input type="radio" id="no" name="fav_language11" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>3.</span>Does the child show curiosity about things and try to get things that are?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language12" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language12" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language13" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>4.</span>Does the child out of reach to grab a toy?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language14" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language14" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language14" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>5.</span>Does the child close lips to show he/she does not want more food?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language15" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language15" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language15" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>6.</span>Does the child pass things from one hand to the other?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language16" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language16" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language16" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>

            {/* movement/physical */}

            <div>
               <h6 className='mt-4'>Movement/physical development</h6>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>1.</span>Does the child rolls over in both directions (front to back, back to front)?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language17" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language17" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language17" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>2.</span>Does the child begins to sit without support?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language17" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language17" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language17" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>3.</span>Does the child when standing, supports weight on legs and might bounce?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language18" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language18" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language18" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>4.</span>Does the child rock back and forth, sometimes crawling backward before moving forward?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language19" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language16" value="no" />
                  <label for="" className='ms-3'>No</label><br />
                  <input type="radio" id="no" name="fav_language19" value="unsure" />
                  <label for="" className='ms-3'>Unsure</label>
               </div>
            </div>

            {/* Additional questionsb for parents/carers */}
            <div>
               <h6 className='mt-4'>Additional questions for parents/carers</h6>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 mt-4 family_health_box'>
               <strong>
                  <span className='me-2'>1.</span>Are you concerns about your Baby ?
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language20" value="yes" />
                  <label for="" className='ms-3 text-danger'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language20" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>2.</span>I have completed the <span className='text-danger'>Family health history and risk factors (for parents)</span>
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language21" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language21" value="no" />
                  <label for="" className='ms-3 text-danger'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>3.</span>I have completed the dental risk factor questionary in dental section
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language22" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language22" value="no" />
                  <label for="" className='ms-3 text-danger'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>4.</span>I am concerned about my baby’s hearing
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language23" value="yes" />
                  <label for="" className='ms-3 text-danger'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language23" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>5.</span>Others have said they are concerned about my baby’s hearing
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language24" value="yes" />
                  <label for="" className='ms-3 text-danger'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language24" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>6.</span>My baby turns toward light
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language25" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language25" value="no" />
                  <label for="" className='ms-3 text-danger'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>7.</span>I have noticed one or both of my baby’s pupils are white
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language26" value="yes" />
                  <label for="" className='ms-3 text-danger'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language26" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>8.</span>My baby and I enjoy being together
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language27" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language27" value="no" />
                  <label for="" className='ms-3  text-danger'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>9.</span>I read, talk to and play with my baby
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language28" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language28" value="no" />
                  <label for="" className='ms-3  text-danger'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>10.</span>My baby is exposed to smoking in the home or car
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language29" value="yes" />
                  <label for="" className='ms-3 text-danger'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language29" value="no" />
                  <label for="" className='ms-3'>No</label> <br />
               </div>
            </div>
            <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
               <strong>
                  <span className='me-2'>11.</span>I place my baby on their back for sleeping
               </strong>
               <div className='mt-3'>
                  <input type="radio" id="yes" name="fav_language30" value="yes" />
                  <label for="" className='ms-3'>Yes</label> <br />
                  <input type="radio" id="no" name="fav_language30" value="no" />
                  <label for="" className='ms-3  text-danger'>No</label> <br />
               </div>
            </div>
            <div className='footer-content d-flex align-items-center mt-4 ms-2'>
               <i className="fas fa-edit fa-2x mr-2 align-self-start" style={{ fontSize: '18px' }}></i>
               <p>
                  If you circled any answer in <span className='text-danger'>RED</span> , please tell your doctor or child and family health nurse.
               </p>
            </div>

         </div>


         <div className='pedriatric_page4_btn mt-4'>
            <button className='pedriatric_page4_btn_right' onClick={props.closePaediatricExaminationModal}>Cancel</button>
            {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>}
            <button className='pedriatric_page4_btn_next'
               onClick={() => {
                  props.passData(12)
               }}>Next <i class="fa-solid fa-angle-right"></i></button>
            <button className='pedriatric_page4_btn_previous' onClick={() => {
               props.passData(10)
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

   );
};

export default Paediatric_page11;