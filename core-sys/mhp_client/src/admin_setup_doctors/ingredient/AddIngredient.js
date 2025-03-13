import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CustomMedicineSetupSidebar from '../../admin_setup_doctors/custom_medicine_sidebar/CustomMedicineSetupSidebar';

function AddIngredient() {

    const [ingredient, setingredient] = useState({
        ingredient_name: "",
        error_list: [],
    });


    const handleInput = (e) => {
        setingredient({
            ...ingredient, [e.target.name]: e.target.value
        });
    }
    const submitingredient = (e) => {
        e.preventDefault();
        //   console.log(ingredient);

        axios.post(`/save-ingredient`, ingredient).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setingredient({
                    ingredient_name: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                setingredient({ ...ingredient, error_list: res.data.errors });

            }

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
                                    <h6 className="card-title"> Add Ingredient
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
                                                    <span className="text-danger">{ingredient.error_list.ingredient_name}</span>

                                                </div>


                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
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
            </>
        </div>
    )
}

export default AddIngredient
