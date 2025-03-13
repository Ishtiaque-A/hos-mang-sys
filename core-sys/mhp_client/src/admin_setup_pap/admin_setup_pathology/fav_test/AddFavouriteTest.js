import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import PathologySetupSidebar from '../PathologySetupSidebar';


function AddFavouriteTest() {

    const [favouriteTest, setfavouriteTest] = useState({
        favourite_test_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setfavouriteTest({
            ...favouriteTest, [e.target.name]: e.target.value
        });
    }



    const submitfavouriteTest = (e) => {
        e.preventDefault();
        // console.log("submitfavouriteTest", favouriteTest);
        console.log(e)
        axios.post(`/save-pathalogy-favourite-test`, favouriteTest).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setfavouriteTest({
                    favourite_test_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setfavouriteTest({ ...favouriteTest, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        < PathologySetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Favourite Test
                                        <Link to={'/favourite-test'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="favouriteTestForm" onSubmit={submitfavouriteTest}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                                
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={favouriteTest.favourite_test_name} className="form-control" name="favourite_test_name" onChange={handleInput} />
                                                    <span className="text-danger">{favouriteTest.error_list.favourite_test_name}</span>
                                                </div>

                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                        className="fas fa-save"  ></i> Save
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

export default AddFavouriteTest;

