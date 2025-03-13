import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Modal from 'react-modal';
import CustomMedicineSetupSidebar from '../custom_medicine_sidebar/CustomMedicineSetupSidebar';
import CustomMedicine from './CustomMedicine';
import { toast } from 'react-toastify';

function EditCustomMedicine() {
    toast.configure();

    const customStyles = {
        content: {
            top: '32%',
            left: '25%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "37%",
            height: "320px",
            background: "#ffffff"
        },

    };

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal(e) {
        e.preventDefault();
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);

    }


    const [allMedicineCategory, setAllMedicineCategory] = useState([]);
    const [allRestriction, setAllRestriction] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);

    const [editMedicine, setEditMedicine] = useState({});

    const [editIngredient, setEditIngredient] = useState({});
    const [editIngredientName, setEditIngredientName] = useState('');
    const[error,setError]=useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`/medicinecategory`).then(res => {
            if (res.data.status == 200) {
                setAllMedicineCategory(res.data.medicinecategory);
            }
        })

        axios.get(`/restriction`).then(res => {
            if (res.data.status == 200) {
                setAllRestriction(res.data.restriction);
            }
        })

        axios.get(`/route-name`).then(res => {
            if (res.data.status == 200) {
                setAllRoutes(res.data.routesName);
            }
        })
        axios.get(`/ingredient`).then(res => {
            if (res.data.status == 200) {
                setAllIngredients(res.data.ingredient);
            }
        })


    }, [])

    useEffect(() => {
        axios.get(`/ingredient/${editIngredient.ingredient_id}`).then(res => {
            if (res.data.status == 200) {
                setEditIngredientName(res.data.ingredient);
                console.log('check editIngredient', editIngredientName);
            }
        })
    }, [editIngredient.ingredient_id])



    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        axios.get(`/edit-custom-medicine/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setEditMedicine(res.data.edit_custom_medicine);
                setEditIngredient(res.data.edit_ingredient);
            }
            // else if (res.data.status === 404) {
            //     setError(res.data.errors);

            // }

        });

    }, []);


    console.log('seteditingrdeint state check', editIngredient);
    console.log('seteditcustom state check', editMedicine);

    const handleEditMedicine = (e) => {
        setEditMedicine({
            ...editMedicine, [e.target.name]: e.target.value
        });
    }
    const handleIngredientEdit = (e) => {
        setEditIngredient({
            ...editIngredient, [e.target.name]: e.target.value
        });
    }


    const submitIngredientInput = (e) => {
        e.preventDefault();
        closeModal();
    }

    const submitCustomMedicine = (e) => {
        e.preventDefault();
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        navigate('/custom-medicine');

        axios.post(`/update-custom-medicine/${lastpart}`, editIngredient).then(res => {
            // console.log("update-custom-medicine", res);

            setEditMedicine({
                custom_medicine_name: "",
                strength: "",
                medicine_category_id: "",
                other_details: "",
                route_id: "",
                qty: "",
                unit: "",
                repeats: "",
                restriction_id: "",
                error_list: [],
            });
        })

        axios.post(`/update-medicine/${editIngredient.custom_medicine_id}`, editMedicine).then(res => {
            setEditIngredient({
                ingredient_id: "",
                ingredient_strength: "",
                ingredient_unit: "",
                error_list: [],
            })
            swal("Success", 'Custom Medicine Updated', "success");

        })

    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <CustomMedicineSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Edit Custom Medicine
                                        <Link to={'/custom-medicine'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="restrictionForm">
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={editMedicine.custom_medicine_name} className="form-control" name="custom_medicine_name" onChange={handleEditMedicine} />
                                                    {/* <span className="text-danger">{editMedicine.error_list.custom_medicine_name}</span> */}

                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Strength </label>
                                                    <input type="text" value={editMedicine.strength} className="form-control" name="strength" onChange={handleEditMedicine} />
                                                    {/* <span className="text-danger">{cnFour.error_list.name}</span> */}

                                                </div>

                                                <div>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">From</label>

                                                    <select id="inputState" onChange={handleEditMedicine} value={editMedicine.medicine_category_id} name="medicine_category_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            allMedicineCategory.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.medicinecategory_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>

                                                </div>

                                                <div className="form-group ">
                                                    <label htmlFor="history_name" className="col-form-label-sm d-block fw-bold"> Ingredients </label>
                                                    <div className=''>

                                                        <Modal
                                                            isOpen={modalIsOpen}
                                                            onRequestClose={closeModal}
                                                            style={customStyles}
                                                            contentLabel="Example Modal"
                                                        >
                                                            <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i class="fal fa-times"></i></span>

                                                            <div className='card-body'>
                                                                <h4>Edit Ingredient</h4>

                                                                <div className=''>
                                                                    <label htmlFor="inputPassword4"
                                                                        className="form-label  col-form-label col-form-label-sm">Ingredients</label>

                                                                    <select id="inputState" onChange={handleIngredientEdit} value={editIngredient.ingredient_id} name="ingredient_id"
                                                                        className="form-select  col-form-label-sm font-size-patient">
                                                                        <option selected>Select</option>
                                                                        {
                                                                            allIngredients.map((item) => {
                                                                                return (
                                                                                    <option value={item.id} key={item.id}>{item.ingredient_name}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>

                                                                </div>

                                                                <div className='d-flex justify-content-between mt-1'>
                                                                    <div className="form-group">
                                                                        <label htmlFor="history_name" className="col-form-label-sm"> Strength </label>
                                                                        <input type="text" value={editIngredient.ingredient_strength} className="form-control" name="ingredient_strength" onChange={handleIngredientEdit} />
                                                                        {/* <span className="text-danger">{cnFour.error_list.name}</span> */}

                                                                    </div>


                                                                    <div className="form-group">
                                                                        <label htmlFor="history_name" className="col-form-label-sm"> Unit </label>
                                                                        <input type="text" value={editIngredient.ingredient_unit} className="form-control" name="ingredient_unit" onChange={handleIngredientEdit} />

                                                                    </div>
                                                                </div>
                                                                <div className='btn btn-sm btn-primary float-right' onClick={submitIngredientInput}>
                                                                    Update
                                                                </div>
                                                            </div>
                                                        </Modal>
                                                    </div>
                                                </div>


                                                <div className=''>
                                                    <table className="table table-bordered">
                                                        <thead >
                                                            <tr>
                                                                <th scope="col" className='font-weight-bold'>Name</th>
                                                                <th scope="col" className='font-weight-bold'>Stength</th>
                                                                <th scope="col" className='font-weight-bold'>Unit</th>
                                                                <th scope="col" className='font-weight-bold'>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            <tr>
                                                                <td> {editIngredientName !== null && editIngredientName.ingredient_name}</td>
                                                                <td>  {editIngredient.ingredient_strength}</td>
                                                                <td> {editIngredient.ingredient_unit} </td>
                                                                <td><button className='btn btn-sm btn-success' onClick={openModal}> <i className="fas fa-edit"></i> Edit</button>
                                                                </td>
                                                            </tr>




                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="">
                                                    <label for="exampleFormControlTextarea1" class="form-label">Other Details</label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handleEditMedicine} name="other_details" value={editMedicine.other_details}></textarea>
                                                </div>


                                                <div className=''>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Route</label>

                                                    <select id="inputState" onChange={handleEditMedicine} value={editMedicine.route_id} name="route_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            allRoutes.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.route_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>

                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Quantity </label>
                                                    <input type="number" value={editMedicine.qty} className="form-control" name="qty" onChange={handleEditMedicine} />
                                                    {/* <span className="text-danger">{cnFour.error_list.name}</span> */}

                                                </div>


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Unit </label>
                                                    <input type="text" value={editMedicine.unit} className="form-control" name="unit" onChange={handleEditMedicine} />
                                                    {/* <span className="text-danger">{cnFour.error_list.name}</span> */}

                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Repeats </label>
                                                    <input type="text" value={editMedicine.repeats} className="form-control" name="repeats" onChange={handleEditMedicine} />
                                                    {/* <span className="text-danger">{cnFour.error_list.name}</span> */}

                                                </div>

                                                <div className=''>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Restriction</label>

                                                    <select id="inputState" onChange={handleEditMedicine} value={editMedicine.restriction_id} name="restriction_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            allRestriction.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.restriction_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>

                                                </div>



                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" onClick={submitCustomMedicine}><i
                                                        className="fas fa-save"></i> Updated
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </div>
    )
}

export default EditCustomMedicine;
