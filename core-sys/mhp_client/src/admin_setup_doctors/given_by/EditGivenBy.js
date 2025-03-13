import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import ImmunisationSetupSidebar from '../immunisation_setup_sidebar/ImmunisationSetupSidebar';


const EditGivenBy = () => {
    const [givenBy, setGivenBy] = useState({
        name: "",
    });
    const [error, setError] = useState([]);
    let navigate = useNavigate();

    const handleChange = (e) => {
        setGivenBy({ ...givenBy, [e.target.name]: e.target.value })
    }
    let params = useParams();
    useEffect(() => {
        axios.get(`/edit-given-by/${params.id}`)
            .then(res => console.log(res ))
            
    }, []);
    console.log("update-given-by", givenBy)
    const updateGivenBy = (e) => {
        // console.log("givenBy", givenBy)
        e.preventDefault();
        axios.put(`/update-given-by/${params.id}`, givenBy)
            .then(res => {
                
                if (res.data.status === 200) {
                    console.log("givenBy res.data", res.data.givenBy)
                    swal("Success", res.data.message, "success");
                    setGivenBy({
                      ...givenBy,
                    });
                    navigate(`/given-by`);

                } 
                else {
                    setError(res.data.errors)
                }
            })
            
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ImmunisationSetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Edit Given By.
                                <Link to={'/given-by'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="GivenByForm" onSubmit={updateGivenBy}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={givenBy.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{error.name}</span>
                                        </div>
                                        <div className="float-right">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                className="fas fa-save"  ></i> Update
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

export default EditGivenBy;