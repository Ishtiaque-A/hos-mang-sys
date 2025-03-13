import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import ImmunisationSetupSidebar from '../immunisation_setup_sidebar/ImmunisationSetupSidebar';

const AddGivenBy = () => {
    const [givenBy, setGivenBy] = useState({
        name: "",
        error_list:[]
    });
    const handleChange = (e) => {
        setGivenBy({ ...givenBy, [e.target.name]: e.target.value })
    }
    const SubmitGivenBy = (e) => {
        // alert("givenBy")
        e.preventDefault();
        axios.post("/add-given-by",givenBy)
        .then(res=>{
            // console.log("add-given-by",res)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setGivenBy({
                    name:"",
                    error_list:[]
                });
    
            }
            else if(res.data.status==400){
                // setGivenBy({...givenBy,error:res.data.message.name[0]})
                setGivenBy({...givenBy, error_list: res.data.errors})
            }
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ImmunisationSetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Add Given By.
                                <Link to={'/given-by'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="GivenByForm" onSubmit={SubmitGivenBy}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={handleChange} value={givenBy.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{givenBy.error_list.name}</span>
                                        </div>
                                        <div className="float-right">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                className="fas fa-save" ></i> Save
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
    );
};

export default AddGivenBy;