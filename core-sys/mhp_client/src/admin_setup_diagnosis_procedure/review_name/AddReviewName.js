import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';



function AddReviewName() {

    const [reviewName, setreviewName] = useState({
        review_name:"",
        error_list: [],
    });

    const handleInput = (e) => {
        setreviewName({
            ...reviewName, [e.target.name]: e.target.value
        });
    }


    const submitReviewName = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
       
        axios.post(`/save-review-name`, reviewName).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setreviewName({
                review_name: "",
               
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setreviewName({ ...reviewName, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <DiagnosisProcedureSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Review Name
                                        <Link to={'/review-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DiagnosisProcedureForm" onSubmit={submitReviewName}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                          
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_code" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={reviewName.review_name} className="form-control" name="review_name" onChange={handleInput} />
                                                    <span className="text-danger">{reviewName.error_list.review_name}</span>
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

export default AddReviewName;


