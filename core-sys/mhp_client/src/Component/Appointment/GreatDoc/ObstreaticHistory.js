import moment from 'moment';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

export default function ObstreaticHistory(props) {
    const [obstericHistory, setObstericHistory] = useState([]);
    const customStyles = {
        content: {
            top: '36%',
            left: '30%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "55%",
            height: "550px",
            padding: "8px",
            overflow: "hidden"
        },

    };

    const [doctors, setDoctors] = useState([]);
    const [update, setUpdate] = useState();
    const patientId = props.patient_id;
    useEffect(() => {
        axios.get(`/pregnancy-history/${patientId}`)
            .then(res => {
                setObstericHistory(res.data.pregnancy)
            });
        axios.get(`/doctors`).then(res => setDoctors(res.data.doctors))
    }, [update, patientId]);
    const [complication, setComplication] = useState([]);
    const [pregnancyData, setPregnancyData] = useState({
        pregnancy_no: "",
        actual_lmp: "",
        scan_date: "",
        finish_date: "",
        managed_by: "",
        edc_by_scan: "",
        edc_by_lmp: "",
        scan_weeks: "",
        use_scan_date: false,
        geston_weeks: "",
        scan_days: "",
        outcome: "",
    });
    const handleSubmit = () => {
        const data = {
            patient_id: props.patient_id,
            pregnancy_no: pregnancyData.pregnancy_no,
            actual_lmp: pregnancyData.actual_lmp,
            scan_date: pregnancyData.scan_date,
            finish_date: pregnancyData.finish_date,
            managed_by: pregnancyData.managed_by,
            edc_by_scan: pregnancyData.edc_by_scan,
            edc_by_lmp: pregnancyData.edc_by_lmp,
            scan_weeks: pregnancyData.scan_weeks,
            use_scan_date: pregnancyData.use_scan_date,
            geston_weeks: pregnancyData.geston_weeks,
            scan_days: pregnancyData.scan_days,
            outcome: pregnancyData.outcome,
            complication: complication
        }
        axios.post('/add-pregnancy-history', data).then(res => {

            if (res.data.status === 200) {
                Swal.fire(
                    res.data.message,
                    'Success..!',
                    'success'
                )
                setUpdate(Math.random());
                props.setpregnancyUpdate(Math.random());
                closePregnancyModal();
                setPregnancyData({
                    pregnancy_no: "",
                    actual_lmp: "",
                    scan_date: "",
                    finish_date: "",
                    managed_by: "",
                    edc_by_scan: "",
                    edc_by_lmp: "",
                    scan_weeks: "",
                    use_scan_date: false,
                    geston_weeks: "",
                    scan_days: "",
                    outcome: "",
                });
                setComplication([]);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.error_msg.email,
                })
            }



        })
    }
    const handleComplication = (e) => {
        const newValue = e.target.value;
        if (e.target.checked === true) {
            setComplication([...complication, newValue])
        } else {
            setComplication(complication.filter((item) => item !== e.target.value))
        }

    }
    const [pregnancyModalIsOpen, setPregnancyModalIsOpen] = useState(false);
    function closePregnancyModal() {
        setPregnancyModalIsOpen(false)
    }
    const [editId, setEditId] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    function closeModal() {
        setModalIsOpen(false);
    }
    async function editHistory(id, e) {
        await axios.get(`/pregnancy-history-edit/${id}`).then(res => setPregnancyData(res.data.pregnancy));
        setModalIsOpen(true);
        setEditId(id)
    }
    const deleteHistory = (id, e) => {
        const thisClicked = e.currentTarget;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/pregnancy-history-delete/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })

    }
    const updateHistory = (e) => {
        e.preventDefault();
        const data = {
            patient_id: props.patient_id,
            pregnancy_no: pregnancyData.pregnancy_no,
            actual_lmp: pregnancyData.actual_lmp,
            scan_date: pregnancyData.scan_date,
            finish_date: pregnancyData.finish_date,
            managed_by: pregnancyData.managed_by,
            edc_by_scan: pregnancyData.edc_by_scan,
            edc_by_lmp: pregnancyData.edc_by_lmp,
            scan_weeks: pregnancyData.scan_weeks,
            use_scan_date: pregnancyData.use_scan_date,
            geston_weeks: pregnancyData.geston_weeks,
            scan_days: pregnancyData.scan_days,
            outcome: pregnancyData.outcome,
            complication: complication
        }
        axios.post(`/pregnancy-history-update/${editId}`, data).then(res => {

            if (res.data.status === 200) {
                Swal.fire(
                    res.data.message,
                    'Success..!',
                    'success'
                )
                setUpdate(Math.random());
                props.setpregnancyUpdate(Math.random());
                closeModal();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.error_msg.email,
                })
            }
        })
    }

    return (
        <div>
            <div className="rx-one-button-group">
                <button onClick={() => setPregnancyModalIsOpen(true)} className="btn float-end me-2 mb-2">Add pregnancy history</button>
            </div>
            <h6 className="my-2">Obstetric History</h6>
            <div className="past-history-table">
                {
                    obstericHistory.length > 0 ?
                        <table className="past_rx_table">
                            <thead>
                                <tr>
                                    <th scope="col">Pregnancy No</th>
                                    <th scope="col">Actual LMP</th>
                                    <th scope="col">Scan Date</th>
                                    <th scope="col">Finish Date</th>
                                    <th scope="col">EDC by Scan </th>
                                    <th scope="col">Scan weeks</th>
                                    <th scope="col">Scan Days</th>
                                    <th scope="col">Managed by</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    obstericHistory.length > 0 &&
                                    obstericHistory.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{item.pregnancy_no}</td>
                                                <td>{moment(item.actual_lmp).format("DD/MM/YYYY")}</td>
                                                <td>{moment(item.scan_date).format("DD/MM/YYYY")}</td>
                                                <td>{moment(item.finish_date).format("DD/MM/YYYY")}</td>
                                                <td>{moment(item.edc_by_scan).format("DD/MM/YYYY")}</td>
                                                <td>{item.scan_weeks}</td>
                                                <td>{item.scan_days}</td>
                                                <td>{item.managed_by}</td>
                                                <td><i onClick={(e) => editHistory(item.id, e)} className="fal fa-edit me-1"></i><i onClick={(e) => deleteHistory(item.id, e)} className="fal fa-trash-alt me-1"></i></td>
                                            </tr>
                                        )
                                    })

                                }

                            </tbody>
                        </table>
                        :
                        <p
                        style={{
                          fontSize: "13px",
                          marginLeft: "40%",
                          marginTop: "5%",
                          color: "red",
                        }}
                      >
                        Records are not available
                      </p>
                }
            </div>
            <Modal
                isOpen={pregnancyModalIsOpen}
                onRequestClose={closePregnancyModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <span className='float-end'><i className="fal fa-times" onClick={closePregnancyModal} style={{ cursor: 'pointer' }}></i></span>
                <h6 style={{ fontSize: "18px" }}>Pregnancy Outcome</h6>
                <hr />
                <div className="row">
                    <div className="col-6">
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Pregnancy No.</label>
                            <div className="col-sm-8">
                                <input onChange={(e) => setPregnancyData({ ...pregnancyData, pregnancy_no: e.target.value })} type="text" className="form-control form-control-sm" id="colFormLabelSm" required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Actual LMP</label>
                            <div className="col-sm-8">
                                <input onChange={(e) => {

                                    const date = new Date(e.target.value);
                                    date.setDate(date.getDate() + 280)
                                    const days = moment().diff(e.target.value, 'days');
                                    const weeks = Math.floor(days / 7);
                                    const getActepdDay = days - (weeks * 7);

                                    console.log("dates", weeks, getActepdDay)

                                    setPregnancyData({ ...pregnancyData, scan_days: getActepdDay, edc_by_lmp: moment(date).format('LL'), actual_lmp: e.target.value, scan_weeks: weeks, geston_weeks: weeks })


                                }} type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Scan Date</label>
                            <div className="col-sm-8">
                                <input onChange={(e) => setPregnancyData({ ...pregnancyData, scan_date: e.target.value })} type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">EDC by Scan</label>
                            <div className="col-sm-8">
                                <input onChange={(e) => setPregnancyData({ ...pregnancyData, edc_by_scan: e.target.value })} type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Finish Date</label>
                            <div className="col-sm-8">
                                <input onChange={(e) => setPregnancyData({ ...pregnancyData, finish_date: e.target.value })} type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Managed by</label>
                            <div className="col-sm-8">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={doctors}
                                    loadingText='loading...'
                                    size="small"
                                    getOptionLabel={(option) => option.dr_given_name}
                                    onChange={(e, value) => { setPregnancyData({ ...pregnancyData, managed_by: value.dr_given_name }) }}

                                    renderInput={(params) => <TextField sx={{ width: "100%", height: 10 }} {...params} label="Doctor" />}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">EDC by LMP</label>
                            <div className="col-sm-8">
                                <input value={pregnancyData.edc_by_lmp} disabled type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="row mb-3">
                                    <label for="colFormLabelSm" className="col-sm-6 col-form-label col-form-label-sm">Weeks</label>
                                    <div className="col-sm-6">
                                        <input value={pregnancyData.scan_weeks} disabled type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row mb-3">
                                    <label for="colFormLabelSm" className="col-sm-6 col-form-label col-form-label-sm">Days</label>
                                    <div className="col-sm-6">
                                        <input value={pregnancyData.scan_days} disabled type="text" className="form-control form-control-sm" id="colFormLabelSm" />

                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="form-check ms-1">
                                    <input className="form-check-input" onChange={(e) => setPregnancyData({ ...pregnancyData, use_scan_date: (!pregnancyData.use_scan_date) })} type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="" for="flexCheckDefault">
                                        Use scan dates
                                    </label>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Gestion weeks</label>
                                <div className="col-sm-8">
                                    <input value={pregnancyData.geston_weeks} disabled type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h6 className="my-1 ms-1">Outcome</h6>
                        <div className="shadow rounded m-2 p-2 row">
                            <div className="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" value="Live birth" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Live birth
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" value="MIscarriage" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Miscarriage
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" value="Termination" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Termination
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" value="Ectopic pregnancy" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Ectopic pregnancy
                                    </label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" value="IUFD" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        IUFD
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" value="Stillbirth" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Stillbirth
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" value="Hyditifom mole" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                    Hydatidiform mole
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h6 className="my-1 ms-1">Complications</h6>
                        <div className="m-2 p-2 rounded shadow">
                            <div class="form-check">
                                <input class="form-check-input" value="Gestational diabetes" onChange={(e) => handleComplication(e)} name="pregnant-radio" type="checkbox" id="flexRadioDefault1" />
                                <label class="" for="flexRadioDefault1">
                                    Gestational diabetes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" value="Hypertension" onChange={(e) => handleComplication(e)} name="pregnant-radio" type="checkbox" id="flexRadioDefault1" />
                                <label class="" for="flexRadioDefault1">
                                    Hypertension
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" value=" Pre-Eclampsia" onChange={(e) => handleComplication(e)} name="pregnant-radio" type="checkbox" id="flexRadioDefault1" />
                                <label class="" for="flexRadioDefault1">
                                    Pre-Eclampsia
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" value="Renal disease" onChange={(e) => handleComplication(e)} name="pregnant-radio" type="checkbox" id="flexRadioDefault1" />
                                <label class="" for="flexRadioDefault1">
                                    Renal disease
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <div className="rx-one-button-group me-2">
                        <button onClick={handleSubmit} className="btn me-2">Save</button>
                        <button onClick={() => closePregnancyModal()} className="btn me-2">Cancel</button>
                    </div>
                </div>

            </Modal>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <span className='float-end'><i className="fal fa-times" onClick={closeModal} style={{ cursor: 'pointer' }}></i></span>
                <h6 style={{ fontSize: "18px" }}>Edit pregnancy outcome</h6>
                <hr />
                <div className="row">
                    <div className="col-6">
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Pregnancy No.</label>
                            <div className="col-sm-8">
                                <input value={pregnancyData.pregnancy_no} onChange={(e) => setPregnancyData({ ...pregnancyData, pregnancy_no: e.target.value })} type="text" className="form-control form-control-sm" id="colFormLabelSm" required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Actual LMP</label>
                            <div className="col-sm-8">
                                <input value={pregnancyData.actual_lmp} onChange={(e) => {
                                    const date = new Date(e.target.value);
                                    date.setDate(date.getDate() + 280)

                                    const days = moment().diff(e.target.value, 'days');
                                    const weeks = Math.floor(days / 7);
                                    const getActepdDay = days - (weeks * 7);

                                    setPregnancyData({ ...pregnancyData, scan_days: getActepdDay, edc_by_lmp: moment(date).format('LL'), actual_lmp: e.target.value, scan_weeks: weeks, geston_weeks: weeks })
                                }} type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Scan Date</label>
                            <div className="col-sm-8">
                                <input value={pregnancyData.scan_date} onChange={(e) => setPregnancyData({ ...pregnancyData, scan_date: e.target.value })} type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">EDC by Scan</label>
                            <div className="col-sm-8">
                                <input value={pregnancyData.edc_by_scan} onChange={(e) => setPregnancyData({ ...pregnancyData, edc_by_scan: e.target.value })} type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Finish Date</label>
                            <div className="col-sm-8">
                                <input value={pregnancyData.finish_date} onChange={(e) => setPregnancyData({ ...pregnancyData, finish_date: e.target.value })} type="date" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Managed by</label>
                            <div className="col-sm-8">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={doctors}
                                    loadingText='loading...'
                                    size="small"
                                    getOptionLabel={(option) => option.dr_given_name}
                                    onChange={(e, value) => { setPregnancyData({ ...pregnancyData, managed_by: value.dr_given_name }) }}

                                    renderInput={(params) => <TextField sx={{ width: "100%", height: 10 }} {...params} label="Doctor" />}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">EDC by LMP</label>
                            <div className="col-sm-8">
                                <input value={pregnancyData.edc_by_lmp} disabled type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="row mb-3">
                                    <label for="colFormLabelSm" className="col-sm-6 col-form-label col-form-label-sm">Weeks</label>
                                    <div className="col-sm-6">
                                        <input value={pregnancyData.scan_weeks} disabled type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row mb-3">
                                    <label for="colFormLabelSm" className="col-sm-6 col-form-label col-form-label-sm">Days</label>
                                    <div className="col-sm-6">
                                        <input value={pregnancyData.scan_days} disabled type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="form-check ms-1">
                                    <input className="form-check-input" onChange={(e) => setPregnancyData({ ...pregnancyData, use_scan_date: (!pregnancyData.use_scan_date) })} type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="" for="flexCheckDefault">
                                        Use scan dates
                                    </label>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label for="colFormLabelSm" className="col-sm-4 col-form-label col-form-label-sm">Gestion weeks</label>
                                <div className="col-sm-8">
                                    <input value={pregnancyData.geston_weeks} disabled type="text" className="form-control form-control-sm" id="colFormLabelSm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h6 className="my-1 ms-1">Outcome</h6>
                        <div className="shadow rounded m-2 p-2 row">
                            <div className="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" defaultChecked={pregnancyData.outcome === "Live birth" && true} value="Live birth" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Live birth
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" defaultChecked={pregnancyData.outcome === "MIscarriage" && true} value="MIscarriage" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Miscarriage
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" defaultChecked={pregnancyData.outcome === "Termination" && true} value="Termination" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Termination
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" defaultChecked={pregnancyData.outcome === "Ectopic pregnancy" && true} value="Ectopic pregnancy" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Ectopic pregnancy
                                    </label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-check">
                                    <input class="form-check-input" defaultChecked={pregnancyData.outcome === "IUFD" && true} value="IUFD" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        IUFD
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" defaultChecked={pregnancyData.outcome === "Stillbirth" && true} value="Stillbirth" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                        Stillbirth
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" defaultChecked={pregnancyData.outcome === "Hyditifom mole" && true} value="Hyditifom mole" onChange={(e) => setPregnancyData({ ...pregnancyData, outcome: e.target.value })} name="pregnant-radio" type="radio" id="flexRadioDefault1" />
                                    <label class="" for="flexRadioDefault1">
                                    Hydatidiform mole
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h6 className="my-1 ms-1">Complications</h6>
                        <div className="m-2 p-2 rounded shadow">
                            <div class="form-check">
                                <input class="form-check-input" value="Gestational diabetes" onChange={(e) => handleComplication(e)} name="pregnant-radio" type="checkbox" id="flexRadioDefault1" />
                                <label class="" for="flexRadioDefault1">
                                    Gestational diabetes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" value="Hypertension" onChange={(e) => handleComplication(e)} name="pregnant-radio" type="checkbox" id="flexRadioDefault1" />
                                <label class="" for="flexRadioDefault1">
                                    Hypertension
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" value=" Pre-Eclampsia" onChange={(e) => handleComplication(e)} name="pregnant-radio" type="checkbox" id="flexRadioDefault1" />
                                <label class="" for="flexRadioDefault1">
                                    Pre-Eclampsia
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" value="Renal disease" onChange={(e) => handleComplication(e)} name="pregnant-radio" type="checkbox" id="flexRadioDefault1" />
                                <label class="" for="flexRadioDefault1">
                                    Renal disease
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <div className="rx-one-button-group me-2">
                        <button onClick={updateHistory} className="btn me-2">Update</button>
                        <button onClick={() => closeModal()} className="btn me-2">Cancel</button>
                    </div>
                </div>

            </Modal>
        </div>

    )
}
