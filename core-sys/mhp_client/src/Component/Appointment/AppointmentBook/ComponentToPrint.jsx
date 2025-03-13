import moment from 'moment';
import React, { Component } from 'react'
import image from '../../../Images/MHP.png';
import Barcode from 'react-barcode';
export default class ComponentToPrint extends Component {
    user = JSON.parse(localStorage.getItem("userData"));
    render() {
        console.log("Props Value For Patient Print", this.props.patientVale)
        return (
            <>
                {
                    this.props.patientVale.patient != null ?
                        <>
                            <div id='AppointmentSlip' className='AppointmentSlip'>

                                <div className="sleep">
                                    <div className="top d-flex">
                                        <img className="d-inline ms-2" src={this.user?.organization_logo} alt="" />
                                        <div className="ms-5 ps-5">
                                            <h5>{this.user?.organization_name}</h5>
                                            <h6>{this.user?.organization_address}</h6>
                                            <h6>{this.user?.organization_mobile} </h6>
                                        </div>
                                    </div>
                                    <div className="text-center my-2">
                                        <h3 className="heading p-1">Appointment Slip</h3>
                                    </div>
                                    <div className="row my-1">
                                        <div className="col-4">
                                            <p><strong>Name</strong></p>
                                            <p>{this.props.patientVale.patient.patient_first_name} {this.props.patientVale.patient.patient_middle_name} {this.props.patientVale.patient.patient_last_name}</p>
                                            <p><strong>Birth Date :</strong> {this.props.patientVale.patient.patient_dob}</p>
                                        </div>
                                        <div className="col-4">
                                            <p><strong>HN</strong></p>
                                            <p>{this.props.patientVale.patient.patient_hn_number}</p>
                                            <p><strong>Age :</strong> {moment().diff(this.props.patientVale.patient.patient_dob, 'years')} Years</p>
                                        </div>
                                        <div className="col-4">
                                            <p><strong>Print Date: :</strong> {moment(new Date()).format("MMM Do YY")}</p>
                                            <p><strong>Print Time: :</strong> {moment(new Date()).format('LT')}</p>
                                            <p><strong>TEL :</strong> {this.props.patientVale.patient.patient_mobile_phone}</p>
                                        </div>
                                    </div>
                                    <div className="row time my-2">
                                        <div className="col-6 row">
                                            <div className="col-6">
                                                <strong className="">Date</strong>
                                                <p className="mt-2"> {this.props.appointDay}</p>
                                            </div>
                                            <div className="col-6">
                                                <strong className="mt-2"> Time</strong>
                                                <p className="mt-2" >{this.props.appointTime}</p>
                                            </div>
                                        </div>
                                        <div className="col-6 row">
                                            <div className="col-6">
                                                <strong className="">Doctor</strong>
                                                <p className="mt-2">{this.props.doctorData[0].dr_given_name}</p>
                                            </div>
                                            <div className="col-6">
                                                <strong className=""> Service/Remark</strong>
                                                <p className="mt-2"> Follow up appointment</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className=" my-2 sleep-footer">
                                        <div className="my-2 mt-4">
                                            <p><strong>Please Contact your doctor at </strong>marrow transplant Department ar 9th floor (Zone South
                                                Lift)</p>
                                            <small>Please arrive at the hospital 15 minutes before appointment time. If the doctor required you to
                                                have
                                                a blood test orspecial tests, please arrive 1-2 hour prior to your appointment</small>
                                        </div>
                                    </div>
                                    <div className="my-3 row">
                                        <div className="col-6">
                                            <p>Call Center 020-222-222</p>
                                            <p>In case of emergency or unable to keep an appointment,<br /> <br /> <br /> please contact Call Center Tel. 202-222-222</p>
                                        </div>
                                        <div className="col-5 d-flex justify-content-end">
                                            <Barcode displayValue="false" height="80" width='4' value={this.props.patientVale.patient.patient_hn_number} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : <>
                            <h1 className='errSlip'>
                                Appointment are not selected OR this patient are not registered....Please Check !

                            </h1>


                        </>
                }
            </>

        )

    }
}
