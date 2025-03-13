import React, { useState } from 'react';
import './PedriaticExamPage12.css';
import dental from './dental.png';
function PaediatricPage12(props) {


    return (
        <div className='p-12 bg-white py-3 px-5 rounded-3'>
            <div className='d-flex align-items-center'>
                <h5 className='pb-1'><b className='text-danger'>স্কুল শুরু হওয়ার আগে (অভিভাবক/পরিচর্যাকারী)</b> </h5>
            </div>

            <h6 className='mt-2 ' style={{ lineHeight: '1.6' }}>
                যে শিশুরা প্রি-স্কুলে যায় এবং একটি গুণগত মানের প্রথম দিকে অংশগ্রহণ করে
                স্কুলের আগে বছরের শৈশব শিক্ষা কার্যক্রমের সম্ভাবনা বেশি
                সাথে জড়িত থাকার জন্য প্রয়োজনীয় সামাজিক, জ্ঞানীয় এবং মানসিক দক্ষতা থাকা
                কিন্ডারগার্টেন শুরু করার সময় শেখা।
            </h6>



            <div className="mt-5">
                <h6 class=""><b>আপনার বাচ্চাকে বড় হওয়ার আগে কিন্ডারগার্টেনের জন্য প্রস্তুত করতে আপনি অনেক কিছু করতে পারেন
                    'প্রথম দিন'
                </b>
                </h6>
            </div>

            <div className='advice mt-5'>
                <ul className='fw-bold'>
                    <li> আপনার সন্তানকে প্রচুর ভালবাসা এবং সমর্থন দিন। স্কুল শুরু করার বিষয়ে উত্তেজিত এবং উত্সাহী হন</li>
                    <li> আপনার সন্তানকে কিন্ডারগার্টেন বা প্রি-স্কুল ওরিয়েন্টেশন ডে/সে নিয়ে যান যাতে তারা কারণগুলির সাথে পরিচিত হয়।</li>
                    <li> আপনার সন্তানকে কিন্ডারগার্টেন বা প্রি-স্কুল ওরিয়েন্টেশন ডে/সে নিয়ে যান যাতে তারা কারণগুলির সাথে পরিচিত হয়</li>
                    <li>  আপনার শিশুকে দেখান কোথায় টয়লেট আছে</li>
                    <li> প্রথম দিনের আগে ইউনিফর্ম এবং জুতা চেষ্টা করুন, শুধু নিশ্চিত করতে
                        সবকিছু মিলে যায়।</li>
                    <li>  অন্য বাচ্চারা যখন সেখানে থাকে তখন স্কুলে যান যাতে আপনার বাচ্চা পেতে পারে
                        খেলার মাঠের গোলমাল এবং এর আকারে অভ্যস্ত
                        'বড়' ছাত্র।</li>
                    <li>  আপনার সন্তানকে দেখান কোথায় স্কুল-পরবর্তী যত্ন সুবিধা, যদি প্রয়োজন হয়</li>

                </ul>
            </div>


            <div className='pedriatric_btn'>
                <button className='pedriatric_btn_middle'>Save</button>
                <button className='pedriatric_btn_right' onClick={() => {
                    props.passData(24)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(22)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
            </div>
        </div>
    )
}
export default PaediatricPage12;