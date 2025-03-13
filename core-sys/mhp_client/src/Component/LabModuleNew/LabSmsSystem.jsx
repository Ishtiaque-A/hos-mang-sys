import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

const LabSmsSystem = () => {
    const [welcomeSmsInput, setWelcomeSmsInput] = useState({
        sms_value: "",
        sms_status: "false"
    });
    const [billSmsInput, setbillSmsInput] = useState({
        sms_value: "",
        sms_status: "false"
    });
    const [reportSmsInput, setreportSmsInput] = useState({
        sms_value: "",
        sms_status: "false"
    });
    useEffect(() => {
        axios.get(`/lab-welcome-sms`).then(res => {
            if (res.data.status === 200 && res.data.sms) {
                setWelcomeSmsInput(res.data.sms);
            }

        });
        axios.get(`/lab-bill-sms`).then(res => {
            if (res.data.status === 200 && res.data.sms) {
                setbillSmsInput(res.data.sms);
            }

        });
        axios.get(`/lab-report-sms`).then(res => {
            if (res.data.status === 200 && res.data.sms) {
                setreportSmsInput(res.data.sms);
            }

        });
    }, [])
    const updateSms = () => {
        if (welcomeSmsInput.id) {
            axios.post(`/update-lab-welcome-sms/${welcomeSmsInput.id}`, welcomeSmsInput).then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                }
            })
        } else {
            axios.post(`/add-lab-welcome-sms`, welcomeSmsInput).then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                }
            })
        }
        if (billSmsInput.id) {
            axios.post(`/update-lab-bill-sms/${billSmsInput.id}`, billSmsInput).then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                }
            })
        } else {
            axios.post(`/add-lab-bill-sms`, billSmsInput).then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                }
            })
        }
        if (reportSmsInput.id) {
            axios.post(`/update-lab-report-sms/${reportSmsInput.id}`, reportSmsInput).then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                }
            })
        } else {
            axios.post(`/add-lab-report-sms`, reportSmsInput).then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                }
            })
        }
    }
    return (
        <>
            <div className="shadow-sm p-2 mb-3 mt-2 bg-body rounded">
                <h5 className="mx-2" >SMS Settings</h5>
            </div>

            <div className="row px-2 align-items-start">
                <div className="col-md-7">
                   <div className='d-flex align-items-start rounded  px-4 py-2' style={{ background: "#E1ECD7" }}>
                   <i className="fa-solid fa-circle-info " style={{ marginTop: "13px" }}></i>
                    <p className="mx-3 my-2" >SMS is charged at 20p per credit. Buy credits from accounts page</p>
                   </div>
                </div>
                <div className="accordion accordion-flush col-md-5 rounded" id="accordionFlushExample">
                    <div className="accordion-item pt-1 rounded" style={{ background: "#E1ECD7"}}>
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed rounded" type="button" style={{ background: "#E1ECD7" }} data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <i className="fa-solid fa-circle-question mt-1"></i>
                                <b className=" mx-2"> How it works ?</b>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the accordion-flush class. This is the first item's accordion body.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow-sm pt-5 pb-5 mt-3 bg-body rounded">
                <div className="wrrap">
                    <div className="row">
                        <div className="col-md-4 px-5">
                            <div className="">
                                <div className="top d-flex mx-3 ">
                                    <input className="form-check-input p-1" type="checkbox" checked={welcomeSmsInput.sms_status === "true"} onChange={() => welcomeSmsInput.sms_status === "true" ? setWelcomeSmsInput({ ...welcomeSmsInput, sms_status: "false" }) : setWelcomeSmsInput({ ...welcomeSmsInput, sms_status: "true" })} value="" id="flexCheckDefault" />
                                    <p className="">Send Welcome Sms</p>
                                </div>
                                <div className="bottoms mt-2">
                                    <div className="mobile">
                                        <div className="tops1 d-flex justify-content-center ">
                                            <div className="foot1 mt-4">
                                            </div>
                                            <div className="foot2 mx-2 mt-4">
                                            </div>
                                        </div>
                                        <div className="tops1-center px-3 ">
                                            <div className="hu bg-white mt-3">
                                                <h5 className="pt-1 px-2">MHP LAB </h5>
                                                <div className="">
                                                    <hr />
                                                </div>
                                                <textarea value={welcomeSmsInput.sms_value} onChange={(e) => setWelcomeSmsInput({ ...welcomeSmsInput, sms_value: e.target.value })} className="form-control mt-3 border-0 outline-0" id="exampleFormControlTextarea1" rows="12" >

                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="tops1-footer d-flex justify-content-center mt-2">
                                            <div className="fott">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-5">
                            <div className="">
                                <div className="top d-flex mx-3 ">
                                    <input className="form-check-input p-1" type="checkbox" checked={billSmsInput.sms_status === "true"} onChange={() => billSmsInput.sms_status === "true" ? setbillSmsInput({ ...billSmsInput, sms_status: "false" }) : setbillSmsInput({ ...billSmsInput, sms_status: "true" })} value="" id="flexCheckDefault" />

                                    <p className="">Send Bill Sms</p>

                                </div>
                                <div className="bottoms mt-2">
                                    <div className="mobile">
                                        <div className="tops1 d-flex justify-content-center ">
                                            <div className="foot1 mt-4">
                                            </div>
                                            <div className="foot2 mx-2 mt-4">

                                            </div>

                                        </div>
                                        <div className="tops1-center px-3 ">

                                            <div className="hu bg-white mt-3">
                                                <h5 className="pt-1 px-2">MHP LAB </h5>
                                                <div className="">
                                                    <hr />

                                                </div>
                                                <textarea value={billSmsInput.sms_value} onChange={(e) => setbillSmsInput({ ...billSmsInput, sms_value: e.target.value })} className="form-control mt-3 border-0 outline-0" id="exampleFormControlTextarea1" rows="12" >
                                                </textarea>

                                            </div>
                                        </div>

                                        <div className="tops1-footer d-flex justify-content-center mt-2">

                                            <div className="fott">

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4 px-5">
                            <div className="">
                                <div className="top d-flex mx-3 ">
                                    <input className="form-check-input p-1" type="checkbox" checked={reportSmsInput.sms_status === "true"} onChange={() => reportSmsInput.sms_status === "true" ? setreportSmsInput({ ...reportSmsInput, sms_status: "false" }) : setreportSmsInput({ ...reportSmsInput, sms_status: "true" })} value="" id="CheckDefault" />

                                    <p className="">Send Report Ready Sms</p>

                                </div>
                                <div className="bottoms mt-2">
                                    <div className="mobile">
                                        <div className="tops1 d-flex justify-content-center ">
                                            <div className="foot1 mt-4">
                                            </div>
                                            <div className="foot2 mx-2 mt-4">

                                            </div>

                                        </div>
                                        <div className="tops1-center px-3 ">
                                            <div className="hu bg-white mt-3">
                                                <h5 className="pt-1 px-2">MHP LAB </h5>
                                                <div className="">
                                                    <hr />

                                                </div>
                                                <textarea value={reportSmsInput.sms_value} onChange={(e) => setreportSmsInput({ ...reportSmsInput, sms_value: e.target.value })} className="form-control mt-3 border-0 outline-0" id="exampleFormControlTextarea1" rows="12" ></textarea>

                                            </div>

                                        </div>

                                        <div className="tops1-footer d-flex justify-content-center mt-2">

                                            <div className="fott ">

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <button onClick={updateSms} type="submit" className="btns mt-3 ">
                Update
            </button>


        </>
    );
};

export default LabSmsSystem;