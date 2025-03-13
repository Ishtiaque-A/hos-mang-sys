import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import GastroIntestinalSidebar from '../gastro_int_setup_mainsidebar/GastroIntestinalSidebar';

function EditNoMassesMass(props) {

    const [nomassesmass, setnomassesmass] = useState([]);
    const [error, setError] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-no-masses-mass/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setnomassesmass(res.data.nomassesmass);
                // setPicture(res.data.nomassesmass.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setnomassesmass({ ...nomassesmass, [e.target.name]: e.target.value });
    }

    const updateNoMassesMassInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('nomassesmass_name', nomassesmass.nomassesmass_name);


        axios.post(`/update-no-masses-mass/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setnomassesmass({
                    ...nomassesmass,

                });
                navigate("/no-masses-mass");

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
                        <GastroIntestinalSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit NoMassesMass
                                    <Link to={'/no-masses-mass'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="NoMassesMassForm" onSubmit={updateNoMassesMassInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={nomassesmass.nomassesmass_name} className="form-control" name="nomassesmass_name" onChange={handleInput} />
                                                <span className="text-danger">{error.nomassesmass_name}</span>
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

    )
}

export default EditNoMassesMass;
