import React, { createRef, useState } from 'react';
import './PedriaticExamPage12.css';
import dental from './dental.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useScreenshot } from 'use-react-screenshot';
function PaediatricPage23(props) {

    const [language, setLanguage] = useState('english');
    const handleLanguage = (e) => {
        setLanguage(e.target.value);

    }
    const [image, takeScreenShot] = useScreenshot();
    const refPE1 = createRef(null);
    const refPE2 = createRef(null);
    const [btnLoading, setbtnLoading] = useState(false)


    const handleSave = (e) => {
        e.preventDefault();

        if (image) {
            const pData = {
                patient_id: parseInt(props.propsData.patient_id),
                page_no: 23,
                image: image
            }
            axios.post(`/paediatric`, pData).then(res => {
                toast.success(res.data.message)
                props.setstateUpdate(Math.random())
                setbtnLoading(false)
            }).catch(error => {
                toast.error("Opps ! Someting is wrong")
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



            {language === 'bangla' &&
                <div ref={refPE2} className='bg-white py-3 px-5 rounded-3'>
                    <div className='d-flex align-items-center'>
                        <h5 className='pb-1'><b className='text-danger'>স্কুল শুরু হওয়ার আগে (অভিভাবক/পরিচর্যাকারী)</b> </h5>
                    </div>

                    <h6 className='mt-2 ' style={{ lineHeight: '1.6' }}>
                        যে শিশুরা প্রি-স্কুলে যায় এবং একটি গুণগত মানের প্রি-স্কুলে  প্রথম দিক থেকেই  অংশগ্রহণ করে ,স্কুলের আগে বছরের শিক্ষা কার্যক্রমের  বেশি সাথে জড়িত থাকার ফলে  প্রয়োজনীয় সামাজিক, জ্ঞানীয় এবং মানসিক দক্ষতা  শেখার সময় পায়।
                    </h6>



                    <div className="mt-5">
                        <h6 class=""><b>আপনার বাচ্চাকে বড় হওয়ার আগে কিন্ডারগার্টেনের জন্য প্রস্তুত করতে আপনি অনেক কিছু করতে পারেন 'প্রথম দিন'
                        </b>
                        </h6>
                    </div>

                    <div className='advice mt-5'>
                        <ul className='fw-bold'>
                            <li> আপনার সন্তানকে প্রচুর ভালবাসা এবং সমর্থন দিন। স্কুল শুরু করার বিষয়ে উদ্দীপিত করুন এবং উত্সাহী হন</li>
                            <li> আপনার সন্তানকে কিন্ডারগার্টেন বা প্রি-স্কুল ওরিয়েন্টেশন ডে তে নিয়ে যান যাতে তারা  স্কুলের সাথে পরিচিত হয়।</li>
                            <li> স্কুলের প্রাথমিক নিয়মগুলি ব্যাখ্যা করুন, যেমন আপনার হাত তোলা, টয়লেটে যাওয়ার আগে জিজ্ঞাসা করা, প্রয়োজনে চুপচাপ শোনা এবং শিক্ষক যা বলেন তা করা।</li>
                            <li>  আপনার শিশুকে দেখান কোথায় টয়লেট আছে</li>
                            <li> প্রথম দিনের আগে ইউনিফর্ম এবং জুতা পরার চেষ্টা করুন, সবকিছু ঠিক আছে কিনা তা নিশ্চিত করতে।</li>
                            <li>  অন্যান্য শিশুরা যখন সেখানে থাকে তখন স্কুলে যান যাতে আপনার শিশু খেলার মাঠের কোলাহল এবং 'বড়' ছাত্রদের সাথে  অভ্যস্ত হতে পারে।</li>
                            <li>  আপনার সন্তানকে দেখান যেখানে স্কুল-পরবর্তী যত্ন সুবিধা পাওয়া যায়  প্রয়োজন হলে যাতে নিতে পারে ।</li>

                        </ul>
                    </div>



                </div>
            }

            {language === 'english' &&
                <div ref={refPE1} className='bg-white py-3 px-5 rounded-3'>
                    <div className='d-flex align-items-center'>
                        <h5 className='pb-1'><b className='text-danger'>Before school starts (parents/Carer) </b> </h5>
                    </div>

                    <h6 className='mt-2 ' style={{ lineHeight: '1.6' }}>
                    Children who attend pre-school and participate in a quality early
                        childhood education programs in the year before school are more likely
                        to have the social, cognitive, and emotional skills needed to engage with
                        learning when starting kindergarten.
                    </h6>



                    <div className="mt-5">
                        <h6 class=""><b>You can do a lot to help prepare your child for kindergarten before their big
                            ‘first day’.
                        </b>
                        </h6>
                    </div>

                    <div className='advice mt-5'>
                        <ul className='fw-bold'>
                        <li> Give your child lots of love and support. Be excited and enthusiastic about starting school</li>
                            <li>  Take your child to kindergarten or preschool orientation day/s so they are familiar with the grounds.</li>
                            <li>  Explain the basic school rules, such as putting up your hand, asking
                                before going to the toilet, listening quietly when
                                necessary, and doing
                                what the teacher asks.</li>
                            <li>  Show your child where the toilets are.</li>
                            <li>  Try on the uniform and shoes before the first day, just to make sure
                                everything fits..</li>
                            <li>  Visit the school when other children are there so your child can get
                                used to the noise of the playground and the size of the
                                ‘big’ students.</li>
                            <li>  Show your child where the after-school care facilities are if needed..</li>

                        </ul>
                    </div>
                </div>
            }

            <div className='pedriatric_btn'> <button className='pedriatric_page4_btn_right' onClick={props.closePaediatricExaminationModal}>Cancel</button>
                {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>}
                <button className='pedriatric_btn_right' onClick={() => {
                    props.passData(24)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(22)
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
                        }

                    }}>Take screenshot </button>}

            </div>


        </>

    )
}
export default PaediatricPage23;