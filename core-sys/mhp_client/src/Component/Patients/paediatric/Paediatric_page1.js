import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';



const Paediatric_page1 = (props) => {

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
   const handleSave = () => {

      var checkboxes = document.querySelectorAll('input[type=radio]')
      for (var checkbox of checkboxes) {
         if (checkbox.checked) {
            checkbox.checked = false
         }
      }
      if (page3Data === null) {
         axios.post(`/save-paediatric-page3`, page3).then(res => {
            if (res.data.status == 200) {
               toast.success("Data inserted sucessfully");
               setPage3({
                  hearing_problem: '',
                  eye_problem: '',
                  relatives_blind: '',
                  other_illness: "",
                  intensive_care: "",
                  physical_problem: "",
                  family_history: "",
                  breech_birth: "",
               })

            }


         })
      }
      else {
         toast.error("You have already added once ! ");
      }

   }

   const [page3Data, setPage3Data] = useState('');

   console.log('one more data ', page3Data);

   useEffect(() => {
      axios.get(`/get-paeditaric-data-by-id/${props.patient_id}`).then(res => {
         if (res.data.status === 200) {
            setPage3Data(res.data.get_data);
         }

      });

   }, []);
   return (
      <div className='p-3'>
         <div>
            <p className='fw-bold text-danger ms-2'>পারিবারিক স্বাস্থ্য ইতিহাস এবং ঝুঁকির কারণ (পিতামাতার জন্য)</p>
         </div>
         <div className='bg-white rounded ps-3 p-2 family_health_box'>
            <strong>
               <span className='me-2'>১.</span>আপনার শিশুর কোনো নিকটাত্মীয় বধির বা শ্রবণে সমস্যা আছে কিনা
               ছোটবেলা থেকে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="hearing_problem" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="hearing_problem" value="no" />
               <label for="" className='ms-3'>না </label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>২.</span>শৈশবে কি পরিবারের কারো চোখের সমস্যা ছিল?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="eye_problem" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="eye_problem" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৩.</span>আপনার শিশুর কোনো নিকটাত্মীয় কি এক বা উভয় চোখে অন্ধ?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="relatives_blind" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="relatives_blind" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৪.</span>গর্ভাবস্থায়, আপনার শিশুর মায়ের কি রুবেলা, সাইটোমেগালোভাইরাস ছিল,
               টক্সোপ্লাজমোসিস, হারপিস, বা জ্বর বা ফুসকুড়ি সহ অন্য কোন অসুখ?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="other_illness" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="other_illness" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৫.</span>জন্মের সময়, আপনার শিশুর ওজন কি 1500 গ্রামের কম ছিল?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="intensive_care" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="intensive_care" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৬.</span>আপনার শিশুর কি কোনো শারীরিক সমস্যা নিয়ে জন্ম হয়েছে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="physical_problem" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="physical_problem" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৭.</span>নিতম্বের উন্নয়নমূলক ডিসপ্লাসিয়ার একটি পারিবারিক ইতিহাস আছে কি?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="family_history" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="family_history" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div className='bg-white rounded ps-3 p-2 mt-2 family_health_box'>
            <strong>
               <span className='me-2'>৮.</span>আপনি একটি ব্রীচ জন্ম হয়েছে?
            </strong>
            <div className='mt-3'>
               <input type="radio" onChange={handleInputChange} id="yes" name="breech_birth" value="yes" />
               <label for="" className='ms-3'>হ্যাঁ</label> <br />
               <input type="radio" onChange={handleInputChange} id="no" name="breech_birth" value="no" />
               <label for="" className='ms-3'>না</label>
            </div>
         </div>
         <div>
            <div className='pedriatric_page4_btn mt-4'>
               <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>
               <button className='pedriatric_page4_btn_next' onClick={() => {
                  props.passData(4)
                  console.log('props check', props);
               }}>Next <i class="fa-solid fa-angle-right"></i></button>
               <button className='pedriatric_page4_btn_previous'><i class="fa-solid fa-angle-left"></i> Previous Page</button>
            </div>
         </div>
      </div>
   );
};

export default Paediatric_page1;