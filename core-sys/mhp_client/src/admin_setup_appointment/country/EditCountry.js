import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import swal from "sweetalert";
import Footer from '../../Component/Footer/Footer';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import AddDashboard from '../AddDashboard/AddDashboard';

function EditCountry(props) {

    const [countryInput, setCountry] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const country_id = props.match.params.id;
        axios.get(`/edit-country/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setCountry(res.data.country);
            } else if (res.data.status === 404) {

                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setCountry({ ...countryInput, [e.target.name]: e.target.value });
    }

    const updateCountry = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = countryInput;
        axios.put(`/update-country/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setCountry({
                    ...countryInput,
                    // country_name: '',

                });
                setError('')
            } else {
                setError(res.data.errors)
            }
        });

    }


    return (
        <>
           
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <AddDashboard></AddDashboard>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6>Edit Country
                                    <Link to={'/country'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateCountry}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="country_name" className="col-form-label-sm">Country Name</label>
                                                <input type="text" onChange={handleInput} value={countryInput.country_name} className="form-control" name="country_name" />
                                                <span className="text-danger">{error.country_name}</span>
                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
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

    )

}

export default EditCountry;