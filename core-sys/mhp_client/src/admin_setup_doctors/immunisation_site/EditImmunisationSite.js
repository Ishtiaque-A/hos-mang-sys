import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import swal from 'sweetalert';
import ImmunisationSetupSidebar from '../immunisation_setup_sidebar/ImmunisationSetupSidebar';


const EditImmunisationSite = () => {
    const [immunisationSite, setImmunisationSite] = useState({
        name: "",
    });
    const handleChange = (e) => {
        setImmunisationSite({ ...immunisationSite, [e.target.name]: e.target.value })
    }
    let params = useParams();
    useEffect(() => {
        axios.get(`/edit-immunisation-site/${params.id}`)
            .then(res => setImmunisationSite(res.data.immunisationSite))
    }, []);
    const updateImmunisationSite = (e) => {
        console.log("immunisationSite", immunisationSite)
        e.preventDefault();
        axios.put(`/update-immunisation-site/${params.id}`, immunisationSite)
            .then(res => {
                if (res.data.status == 200) {
                    swal("Success", res.data.message, "success");
                    setImmunisationSite({
                        name: ""
                    });
                }
            })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ImmunisationSetupSidebar />
                </div>
                <div className="col-md-9 mt-3">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Edit Immunisation Site.
                                <Link to={'/immunisation-site'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="ImmunisationSiteForm" onSubmit={updateImmunisationSite}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={immunisationSite.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
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
    );
};

export default EditImmunisationSite;