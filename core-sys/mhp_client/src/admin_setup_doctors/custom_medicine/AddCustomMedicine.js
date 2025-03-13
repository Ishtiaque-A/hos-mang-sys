import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import Modal from 'react-modal';
import CustomMedicineSetupSidebar from '../custom_medicine_sidebar/CustomMedicineSetupSidebar';
import CustomMedicine from './CustomMedicine';
import { toast } from 'react-toastify';

function AddCustomMedicine() {
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
    // const [editable, setEditable] = useState(false);
    const[error,setError]=useState([{
        error_list:[]
    }]);

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

    const [customMedicine, setCustomMedicine] = useState({
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

    const [ingredient, setIngredient] = useState({
        ingredient_id: "",
        ingredient_strength: "",
        ingredient_unit: "",
        error_list: [],
    });


    const handleCustomInput = (e) => {
        setCustomMedicine({
            ...customMedicine, [e.target.name]: e.target.value
        });
    }
    const handleIngredientInput = (e) => {
        setIngredient({
            ...ingredient, [e.target.name]: e.target.value
        });
    }

    const [emptyIngredients, setEmptyIngredients] = useState([]);
    // const [ingredientName, setIngredientName] = useState('');

    // console.log('arrrrrry add check', emptyIngredients);

    // useEffect(() => {
    //     axios.get(`/ingredient/${emptyIngredients.ingredient_id}`).then(res => {
    //         if (res.data.status == 200) {
    //             setIngredientName(res.data.ingredient);
    //             console.log('check editIngredient', ingredientName);
    //         }
    //     })
    // }, [])

    const submitIngredientInput = (e) => {
        e.preventDefault();
        setEmptyIngredients([...emptyIngredients, ingredient]);
        console.log('check ingredient data', ingredient);
        setIngredient({
            ingredient_id: "",
            ingredient_strength: "",
            ingredient_unit: "",
            error_list: [],
        });
        closeModal();

    }


    // const editIngredirent = () => {
    //     setEditable(true);
    // }

    const deleteIngredirent = (e, id) => {
        console.log('delete check id ', id);

        var filtered = emptyIngredients.filter(function (value, index) {
            return index !== id;
        });

        setEmptyIngredients(filtered);
        console.log('id komse kina check', filtered);

    }

    const submitCustomMedicine = (e) => {
        e.preventDefault();
        axios.post(`/save-custom-medicine`, customMedicine).then(res => {

            if (res.data.status == 200) {
                console.log("save-custom-medicine", res.data.customMedicine);
                emptyIngredients.map((item) => {
                    console.log('all map data', item);
                    const formData = new FormData();
                    formData.append('ingredient_id', item.ingredient_id);
                    formData.append('ingredient_strength', item.ingredient_strength);
                    formData.append('ingredient_unit', item.ingredient_unit);
                    formData.append('custom_medicine_id', res.data.custom_medicine.id);
                    axios.post('save-ingredients-children', formData).then(res => {
                        if (res.data.status == 200) {
                            // swal("Success", res.data.message, "success");
                            setEmptyIngredients([]);
                        }
                    })
                })

                setEmptyIngredients([]);
                setCustomMedicine({
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

                swal("Success", 'Custom Medicine Added', "success");

            }
            // else if(res.data.status == 400){
            //     setError(...error,res.data.errors);
            //     setError({ ...error, error_list: res.data.errors });
            // }
            else if (res.data.status == 400) {
                setCustomMedicine({ ...customMedicine, error_list: res.data.errors });
    
            }


        })
    }

    return (

        <div className="ms-2">
            <div className="row">
                <div className="col-md-3">
                    <CustomMedicineSetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Add Custom Medicine
                                <Link to={'/custom-medicine'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="restrictionForm">
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                            <input type="text" value={customMedicine.custom_medicine_name} className="form-control" name="custom_medicine_name" onChange={handleCustomInput} />
                                            <span className="text-danger">{customMedicine.error_list.custom_medicine_name}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Strength </label>
                                            <input type="text" value={customMedicine.strength} className="form-control" name="strength" onChange={handleCustomInput}  />
                                            <span className="text-danger">{customMedicine.error_list.strength}</span>
                                        </div>

                                        <div>
                                            <label htmlFor="inputPassword4"
                                                className="form-label  col-form-label col-form-label-sm">From</label>

                                            <select id="inputState" onChange={handleCustomInput} value={customMedicine.medicine_category_id} name="medicine_category_id"
                                                className="form-select  col-form-label-sm font-size-patient" >
                                                <option selected>Select</option>
                                                {
                                                    allMedicineCategory.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.medicinecategory_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{customMedicine.error_list.medicine_category_id}</span>
                                        </div>

                                        <div className="form-group ">
                                            <label htmlFor="history_name" className="col-form-label-sm d-block"> Ingredients </label>
                                            <div className=''>
                                                <button className='btn btn-primary btn-sm' onClick={openModal}>Add Ingredients
                                                    <i className="fa-solid fa-up-right-from-square ms-2"></i>

                                                </button>
                                                <Modal
                                                    isOpen={modalIsOpen}
                                                    onRequestClose={closeModal}
                                                    style={customStyles}
                                                    contentLabel="Example Modal"
                                                >
                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i class="fal fa-times"></i></span>

                                                    <div className='card-body'>
                                                        <h4>Add Ingredients</h4>

                                                        <div className=''>
                                                            <label htmlFor="inputPassword4"
                                                                className="form-label  col-form-label col-form-label-sm">Ingredients</label>
                                                            <select id="inputState" onChange={handleIngredientInput} value={ingredient.ingredient_id} name="ingredient_id"
                                                                className="form-select  col-form-label-sm font-size-patient" >
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
                                                                <input type="text" value={ingredient.ingredient_strength} className="form-control" name="ingredient_strength" onChange={handleIngredientInput}  />
                                                                <span className="text-danger">{ingredient.error_list.ingredient_strength}</span>

                                                            </div>


                                                            <div className="form-group">
                                                                <label htmlFor="history_name" className="col-form-label-sm"> Unit </label>
                                                                <input type="text" value={ingredient.ingredient_unit} className="form-control" name="ingredient_unit" onChange={handleIngredientInput}  />
                                                                <span className="text-danger">{ingredient.error_list.ingredient_unit}</span>
                                                            </div>
                                                        </div>
                                                        <div className='btn btn-sm btn-primary float-right' onClick={submitIngredientInput}>
                                                            Add
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
                                                    {emptyIngredients.map((val, keys) => {
                                                        console.log(keys);
                                                        return (<tr key={keys}>
                                                            {/* <td>{val.ingredient_id}</td>
                                                                    <td>{editable == true ? <input type="text" value={val.ingredient_id} /> : val.ingredient_id} </td>
                                                                    <td>{editable == true ? <input type="text" value={val.ingredient_strength} /> : val.ingredient_strength} </td>
                                                                    <td>{editable == true ? <input type="text" value={val.ingredient_unit} /> : val.ingredient_unit}</td> */}

                                                            <td>{val.ingredient_id} </td>
                                                            <td>{val.ingredient_strength} </td>
                                                            <td>{val.ingredient_unit}</td>

                                                            <td>
                                                                {/* <button className='btn btn-sm btn-success' onClick={(e) => editIngredirent(e, keys)}> Edit</button> */}
                                                                <button className='btn btn-sm btn-danger mx-1' onClick={(e) => deleteIngredirent(e, keys)}> <i className="fa fa-trash" aria-hidden="true"></i>
                                                                </button></td>
                                                        </tr>);


                                                    })}


                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="">
                                            <label for="exampleFormControlTextarea1" class="form-label">Other Details</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handleCustomInput} name="other_details" value={customMedicine.other_details} ></textarea>
                                            <span className="text-danger">{customMedicine.error_list.other_details}</span>
                                        </div>


                                        <div className=''>
                                            <label htmlFor="inputPassword4"
                                                className="form-label  col-form-label col-form-label-sm">Route</label>

                                            <select id="inputState" onChange={handleCustomInput} value={customMedicine.route_id} name="route_id"
                                                className="form-select  col-form-label-sm font-size-patient" >
                                                <option selected>Select</option>
                                                {
                                                    allRoutes.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.route_name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className="text-danger">{customMedicine.error_list.route_id}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Quantity </label>
                                            <input type="number" value={customMedicine.qty} className="form-control" name="qty" onChange={handleCustomInput}  />
                                            <span className="text-danger">{customMedicine.error_list.qty}</span>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Unit </label>
                                            <input type="text" value={customMedicine.unit} className="form-control" name="unit" onChange={handleCustomInput}  />
                                            <span className="text-danger">{customMedicine.error_list.unit}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Repeats </label>
                                            <input type="text" value={customMedicine.repeats} className="form-control" name="repeats" onChange={handleCustomInput} />
                                            <span className="text-danger">{customMedicine.error_list.repeats}</span>
                                        </div>

                                        <div className=''>
                                            <label htmlFor="inputPassword4"
                                                className="form-label  col-form-label col-form-label-sm">Restriction</label>

                                            <select id="inputState" onChange={handleCustomInput} value={customMedicine.restriction_id} name="restriction_id"
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
                                            <span className="text-danger">{customMedicine.error_list.restriction_id}</span>
                                        </div>



                                        <div className="float-right">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" onClick={submitCustomMedicine}><i
                                                className="fas fa-save"></i> Save
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
    )
}

export default AddCustomMedicine;
