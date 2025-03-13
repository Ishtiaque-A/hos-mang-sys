import React, { useState, useEffect } from 'react';
import axios from "axios";
import './CareSuggestion.css';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import moment from 'moment';
import Swal from 'sweetalert2';
const CareSuggestion = (props) => {
    const [allSuggestionName, setAllSuggestionName] = useState([]);
    const [allCareDetails, setAllCareDetails] = useState([]);

    const [suggestionValue, setSuggestionvalue] = useState({
        allValues: []
    })

    const [detailsValue, setDetailsValue] = useState({
        allValues: []
    })
    useEffect(() => {
        axios.get(`/care-suggestion`).then(res => {
            if (res.data.status === 200) {
                setAllSuggestionName(res.data.care_suggestion);
            }
        })
        axios.get(`/care-details`).then(res => {
            if (res.data.status === 200) {
                setAllCareDetails(res.data.care_details);
            }
        })

    }, [])


    const handleCheckBoxSuggestion = (e) => {
        const { value, checked } = e.target;
        const { allValues } = suggestionValue;

        if (checked) {
            setSuggestionvalue({
                allValues: [...allValues, value],
            });
        }

        else {
            setSuggestionvalue({
                allValues: allValues.filter((e) => e !== value),
            });
        }
    }

    const handleCheckBoxDetails = (e) => {
        const { value, checked } = e.target;
        const { allValues } = detailsValue;

        if (checked) {
            setDetailsValue({
                allValues: [...allValues, value],
            });
        }

        else {
            setDetailsValue({
                allValues: allValues.filter((e) => e !== value),
            });
        }
    }

    const data = {
        care_suggestion_id: suggestionValue.allValues,
        care_details_id: detailsValue.allValues,
        patient_id: props.patient_id,

    }

    const submitCareSuggestion = () => {
        if (data.care_suggestion_id.length === 0 || data.care_details_id === 0 || !data.patient_id) {
            toast.error("Please Provide all valid input");
        }
        else {
            axios.post(`/save-greatdoc-care-suggestion`, data).then(res => {
                if (res.data.status === 200) {
                    toast.success("Care Suggestions added successfully");
                    setUpdate(Math.random())
                    // setcareSuggestion({
                    //     care_suggestion_name: "",
                    //     error_list: [],

                    // });

                }
                let class1 = document.getElementsByClassName('id1');
                for (let i = 0; i <= class1.length; i++) {
                    return class1[i].checked = false;
                }

            })
        }



    }
    const [modalCareSuggestionIsOpen, setCareSuggestionIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '30%',
            left: '30%',
            height: '400px',
            width: '80%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(243, 242, 239)'
        },
    };
    const [careSuggestion, setCareSuggestion] = useState([])
    const [update, setUpdate] = useState('')
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/greatdoc-care-suggestion/${props.patient_id}`)
                .then(res => {
                    setCareSuggestion(res.data.data)
                });
        }
    }, [update, props.patient_id]);
    const deleteSuggestion = (id, e) => {
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
                axios.delete(`/delete-greatdoc-care-suggestion/${id}`).then(res => {
                    if (res.data.status === 200) {
                        setUpdate(Math.random())
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
    return (
        <>
            <div className='mt-2'>
                <div className="rx-one-button-group">
                    <button onClick={() => setCareSuggestionIsOpen(true)} className="btn float-end me-2 mb-2">Add care suggestion</button>

                </div>

                <div className="past-history-table">
                    {
                        careSuggestion.length > 0 ?
                            <table className="past_rx_table">
                                <thead>
                                    <tr>
                                        <th width={"15%"} scope="col">Date</th>
                                        <th width={"50%"} scope="col">Suggestions</th>
                                        <th scope="col">Details</th>
                                        <th width={"7%"} scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        careSuggestion.length > 0 &&
                                        careSuggestion.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                                                    <td>{item.care_suggestion_id}</td>
                                                    <td>{item.care_details_id}</td>
                                                    <td><i onClick={(e) => deleteSuggestion(item.id, e)} className="fal fa-trash-alt me-1"></i></td>
                                                </tr>
                                            )
                                        })

                                    }

                                </tbody>
                            </table>
                            :
                            <i style={{ fontSize: "26px", marginLeft: "40%", marginTop: "2%" }} class="fas fa-spinner fa-spin"></i>
                    }
                </div>
            </div>
            <Modal
                isOpen={modalCareSuggestionIsOpen}
                onRequestClose={() => setCareSuggestionIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <span className='float-end'><i className="fal fa-times" onClick={() => setCareSuggestionIsOpen(false)} style={{ cursor: 'pointer' }}></i></span>
                <h6 style={{ fontSize: "14px" }}>Care Suggestions</h6>
                <hr />
                <div className='care_suggestion_container'>
                    <div className="row">
                        <div className="col-6">
                            <h6>Tick for inclusion as preventive care</h6>
                            <div className='preventive_care_box g-doc-scroll'>
                                {allSuggestionName.map((item, i) => {
                                    return (
                                        <div className='' key={i}>
                                            <input type="checkbox" id="id1" name="" onChange={handleCheckBoxSuggestion} className='ms-3 mt-2 id1' value={item.care_suggestion_name} />
                                            <label for="" className='ms-2'>{item.care_suggestion_name}</label> <br />
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        <div className="col-6">
                            <h6>Add On Detail</h6>
                            <div className='detail_box g-doc-scroll'>
                                {allCareDetails.map((item, i) => {
                                    return (
                                        <div className='' key={i}>
                                            <input type="checkbox" id="id2" name="" className='ms-3 mt-2 id2' value={item.care_details_name} onChange={handleCheckBoxDetails} />
                                            <label for="" className='ms-2'>{item.care_details_name}</label> <br />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
                <div className='care_suggestion_btn'>
                    <button className='care_suggestion_btn_right' onClick={() => setCareSuggestionIsOpen(false)}>Cancel</button>
                    <button className='care_suggestion_btn_left' onClick={submitCareSuggestion}>Save</button>
                </div>
            </Modal>

        </>
    );
};

export default CareSuggestion;