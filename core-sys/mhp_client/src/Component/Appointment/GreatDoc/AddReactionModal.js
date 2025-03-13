import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { Autocomplete, TextField } from '@mui/material';
const AddReactionModal = (props) => {
    const [medicineCheck, setMedicineCheck] = useState(true);
    const [allergyCheck, setAllergyCheck] = useState(false);
    const [otherCheck, setOtherCheck] = useState(false);
    const customStyles = {
        content: {
            top: '35%',
            left: '25%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "35%",
            height: "300px",
            padding: "20px"
        },

    };
    const [allergy, setAllergy] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [medicine, setMedicine] = useState([]);
    const [medicineData, setMedicineData] = useState({
        drug_name: "",
        reaction: "",
        severty: ""
    })
    useEffect(() => {
        axios
      .get(`/drug-name-for-gd`)
      .then((res) => {
        setMedicine(res.data.drugs);
        console.log("drugs", res.data.drugs);
      });
        axios.get(`/allergy`).then(res => {
            if (res.data.status === 200) {
                setAllergy(res.data.allergySign);
            }
        });
        axios.get('/reaction').then(res => setReactions(res.data.reaction))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            patient_id: props.patient_id,
            drug_name: medicineData.drug_name,
            reaction: medicineData.reaction,
            severty: medicineData.severty

        }
        axios.post('/add-reaction-save', data).then(res => {

            if (res.data.status === 200) {
                Swal.fire(
                    res.data.message,
                    'Success..!',
                    'success'
                )
                e.target.reset();
                props.setReactionTableUpdate(Math.random());
                props.closeModal();

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
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <span className='float-end' style={{ fontSize: "15px", cursor: "pointer" }} onClick={props.closeModal}><i class="fal fa-times"></i></span>
            <h6 className="card-title">Allergy/Drug Reaction</h6>
            <div className='d-flex justify-content-around'>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={medicineCheck} onChange={() => { setMedicineCheck(true); setAllergyCheck(false); setOtherCheck(false) }} />
                    <label class="form-check-label" for="flexRadioDefault1">
                        Medicine
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={allergyCheck} onChange={() => { setAllergyCheck(true); setMedicineCheck(false); setOtherCheck(false) }} />
                    <label class="form-check-label" for="flexRadioDefault2">
                        Allergies
                    </label>
                </div>
            </div>

            {medicineCheck === true &&
                <form onSubmit={handleSubmit} className='mt-3'>
                    <div class="mb-3 row">
                        <label for="exampleInputEmail1" class="form-label d-block col-5" >Medicine Name</label>
                        <div className="col-7">
                            <Autocomplete
                                size="small"
                                options={medicine}
                                loadingText='loading...'
                                getOptionLabel={(option) => option.drug_name}
                                onChange={(e, value) => { setMedicineData({ ...medicineData, drug_name: value.drug_name }) }}
                                renderInput={(params) => <TextField sx={{ width: "100%", height: 10 }} {...params} label="Medicine Name" />}
                            />
                        </div>
                    </div>
                    <div class="mb-3 row mt-3">
                        <label for="exampleInputEmail1" class="form-label d-block col-5" >Reaction Type</label>
                        <div className="col-7">
                            <select required onChange={(e) => setMedicineData({ ...medicineData, reaction: e.target.value })} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                <option defaultValue="Select">Select</option>
                                {
                                    reactions.length > 0 &&
                                    reactions.map((item, key) => <option value={item.reaction_name}>{item.reaction_name}</option>)
                                }

                            </select>

                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="exampleInputEmail1" class="form-label d-block col-5" >Severty</label>
                        <div className="col-7">
                            <input type="text" required onChange={(e) => setMedicineData({ ...medicineData, severty: e.target.value })} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="rx-one-button-group">
                        <button class="btn float-end mt-2" type="submit">Save</button>
                    </div>
                </form>
            }


            {allergyCheck === true &&
                <form onSubmit={handleSubmit} className='mt-3'>
                    <div class="mb-3 row">
                        <label for="exampleInputEmail1" class="form-label d-block col-5" >Allergy Name</label>
                        <div className="col-7">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                size="small"
                                options={allergy}
                                loadingText='loading...'
                                getOptionLabel={(option) => option.name}
                                onChange={(e, value) => { setMedicineData({ ...medicineData, drug_name: value.name }); }}
                                renderInput={(params) => <TextField sx={{ width: "100%", height: 10 }} {...params} label="Allergy Name" />}
                            />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="exampleInputEmail1" class="form-label d-block col-5" >Reaction Type</label>
                        <div className="col-7">
                            <select required onChange={(e) => setMedicineData({ ...medicineData, reaction: e.target.value })} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                <option defaultValue="Select">Select</option>
                                {
                                    reactions.length > 0 &&
                                    reactions.map((item, key) => <option value={item.reaction_name}>{item.reaction_name}</option>)
                                }

                            </select>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="exampleInputEmail1" class="form-label d-block col-5" >Severty</label>
                        <div className="col-7">
                            <input type="text" onChange={(e) => setMedicineData({ ...medicineData, severty: e.target.value })} required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="rx-one-button-group">
                        <button className="btn float-end mt-2" type="submit">Save</button>
                    </div>
                </form>
            }


        </Modal >
    );
};

export default AddReactionModal;