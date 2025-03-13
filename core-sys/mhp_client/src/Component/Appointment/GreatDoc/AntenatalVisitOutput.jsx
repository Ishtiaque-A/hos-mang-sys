import moment from 'moment'
import React from 'react'
import { useState } from 'react';
import Modal from "react-modal";
export default function AntenatalVisitOutput({ antenatalVisit }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const customStyles = {
        content: {
            top: '37%',
            left: '25%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "60%",
            height: "450px",
            background: "#ffff",
            zIndex: "200000",
            padding: "10px"
        },

    };
    const [note, setNote] = useState({
        details: "",
        date: ""
    })
    return (
        <div className="past-history-table past-visit-table g-doc-scroll">
            {
                antenatalVisit?.length > 0 ?
                    <table className="past_rx_table">
                        <thead>
                            <tr>
                                <th width={"30%"} scope="col">Date</th>
                                {/* <th scope="col">Reason for visit</th> */}
                                <th scope="col">Doctor</th>
                                <th width={"20%"} scope="col">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                antenatalVisit?.length > 0 &&
                                antenatalVisit?.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                                            {/* <td>{item.reason_for_visit}</td> */}
                                            <td>{item.doctor?.dr_given_name}</td>
                                            <td> <i onClick={() => { setNote({ details: item, date: item.created_at }); setModalIsOpen(true) }} className="fa-solid fa-eye"></i></td>
                                        </tr>
                                    )
                                })

                            }

                        </tbody>
                    </table>
                    :
                    // <i style={{ fontSize: "26px", marginLeft: "40%", marginTop: "2%" }} class="fas fa-spinner fa-spin"></i>
                    <p className="text-center mt-lg-5 mt-lg-2 text-danger">
                        Records are not available
                    </p>
            }

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <span className='float-end' style={{ fontSize: "15px", marginRight: "10px", cursor: "pointer" }} onClick={() => setModalIsOpen(false)}><i class="fal fa-times"></i></span>

                <div className='doctosNote'>
                    <h6>Antenatal Visit : {moment(note.created_at).format("DD/MM/YYYY")}</h6>
                    <div className="d-flex justify-content-around">
                        <div>
                            {
                                note.details?.systolic_value &&
                                <p><strong> Systolic</strong> : {note.details?.systolic_value} mm of Hg</p>
                            }
                            {
                                note.details?.diastolic_ternary &&
                                <p><strong> Diastolic</strong> : {note.details?.diastolic_ternary} mm of Hg</p>
                            }
                            {
                                note.details?.height_ternary &&
                                <p><strong> Height</strong> : {note.details?.height_ternary} cm</p>
                            }
                            {
                                note.details?.weight_ternary &&
                                <p><strong> Weight</strong> : {note.details?.weight_ternary} kg</p>
                            }
                            {
                                note.details?.bMI_ternary &&
                                <p><strong> BMI</strong> : {note.details?.bMI_ternary} kg/m<sup>2</sup></p>
                            }
                            {
                                note.details?.prePregnancyBMI_ternary &&
                                <p><strong> Pre-Pregnancy BMI</strong> : {note.details?.prePregnancyBMI_ternary} kg/m<sup>2</sup></p>
                            }
                            {
                                note.details?.bmi_terget &&
                                <p><strong> BMI Target</strong> : {note.details?.bmi_terget} kg/m<sup>2</sup></p>
                            }
                            {
                                note.details?.gestation_ternary &&
                                <p><strong>Gestation</strong> : {note.details?.gestation_ternary} Weeks</p>
                            }
                            <strong>Urine</strong>
                            {
                                note.details?.protine_ternary &&
                                <p><strong>Protine</strong> : {note.details?.protine_ternary} </p>
                            }
                        </div>
                        <div>
                            {
                                note.details?.glucose_ternary &&
                                <p><strong>Glucose</strong> : {note.details?.glucose_ternary} </p>
                            }
                            {
                                note.details?.ketone_ternary &&
                                <p><strong>Keton</strong> : {note.details?.ketone_ternary} </p>
                            }
                            {
                                note.details?.others_ternary &&
                                <p><strong>Others</strong> : {note.details?.others_ternary} </p>
                            }
                            {
                                note.details?.fundalHeight_ternary &&
                                <p><strong>Fundal Height</strong> : {note.details?.fundalHeight_ternary} </p>
                            }
                            {
                                note.details?.size_ternary &&
                                <p><strong>Size</strong> : {note.details?.size_ternary} </p>
                            }
                            {
                                note.details?.clinical_ternary &&
                                <p><strong>Clinical</strong> : {note.details?.clinical_ternary} </p>
                            }
                            {
                                note.details?.foetalMovement_ternary &&
                                <p><strong>Foetal Movement</strong> : {note.details?.foetalMovement_ternary} </p>
                            }
                            {
                                note.details?.presentation_ternary &&
                                <p><strong>Presentation</strong> : {note.details?.presentation_ternary} </p>
                            }
                            {
                                note.details?.position_ternary &&
                                <p><strong>Position</strong> : {note.details?.position_ternary} </p>
                            }
                            {
                                note.details?.foetalHeartSound_ternary &&
                                <p><strong>Foetal Heart Sound</strong> : {note.details?.foetalHeartSound_ternary} </p>
                            }
                        </div>
                        <div>
                            {
                                note.details?.dTpa_ternary === '1' &&
                                <p><strong>DTpa</strong> : Yes </p>
                            }
                            {
                                note.details?.influenza_ternary === '1' &&
                                <p><strong>Influenza</strong> : Yes </p>
                            }
                            {
                                note.details?.antiD_ternary === '1' &&
                                <p><strong>Anti-D</strong> : Yes </p>
                            }
                            {
                                note.details?.i8Weeks_ternary === '1' &&
                                <p><strong>8 Weeks</strong> : Yes </p>
                            }
                            {
                                note.details?.i36Weeks_ternary === '1' &&
                                <p><strong>36 Weeks</strong> : Yes </p>
                            }
                            {
                                note.details?.text_value &&
                                <p><strong>Note</strong> : {note.details?.text_value} </p>
                            }
                            {
                                note.details?.next_date &&
                                <p><strong>Note</strong> : {note.details?.next_date} </p>
                            }
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}
