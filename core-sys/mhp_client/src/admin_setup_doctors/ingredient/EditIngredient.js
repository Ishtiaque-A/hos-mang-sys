import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import CustomMedicineSetupSidebar from '../../admin_setup_doctors/custom_medicine_sidebar/CustomMedicineSetupSidebar';

function EditIngredient() {

    const [ingredient, setingredient] = useState('');
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        axios.get(`/edit-ingredient/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setingredient(res.data.ingredient);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);




    const handleInput = (e) => {
        setingredient({
            ...ingredient, [e.target.name]: e.target.value
        });
    }
    const submitingredient = (e) => {
        e.preventDefault();
        //   console.log(ingredient);


        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.put(`/update-ingredient/${lastpart}`, ingredient).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setingredient({
                    ingredient_name: "",

                });
                setError('');
                navigate('/all-ingredient');
            }
            else {
                setError(res.data.errors)
            }

        })
    }

    return (
        <div>
            <>
                <div className="ms-2">
                    <div className="row">
                        <div className="col-md-3">
                            <CustomMedicineSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Edit Ingredient Name
                                        <Link to={'/all-ingredient'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="ingredientForm" onSubmit={submitingredient}>
                                        <div className="card-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={ingredient.ingredient_name} className="form-control" name="ingredient_name" onChange={handleInput} />
                                                    <span className="text-danger">{error.ingredient_name}</span>

                                                </div>


                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                        className="fas fa-save"></i> Update
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

export default EditIngredient
