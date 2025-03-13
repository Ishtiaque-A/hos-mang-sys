import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import LeftMenuBar from '../leftMenubar/LeftMenuBar';

const EditFeaturePermission = () => {
    const [featurePermission, setFeaturePermission] = useState({
        name: "",
        slug:""
    });
let params = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        // const carotid_id = props.match.params.id;
        axios.get(`/edit-feature-permission/${params.id}`).then(res => {

            if (res.data.status === 200) {
                setFeaturePermission(res.data.MhpFeaturePermission);
            }

        });

    }, []);

    const updateFeature = (e) => {
        e.preventDefault();

        axios.put(`/update-feature-permission/${params.id}`, featurePermission).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setFeaturePermission({
                    name: "",
                    slug:""
                });
                navigate(`/feature-permission`);

            } 
        });

    }
    return (
        <div className="container mb-3">
            <div className="row">
            <div className="col-md-3">
                <LeftMenuBar />
             </div>
                <div className="col-md-9 mt-3">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Edit Feature Permission
                                <Link to={'/feature-permission'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="CervixForm" onSubmit={updateFeature}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                            <input type="text" value={featurePermission.name} className="form-control" name="name" onChange={(e) => setFeaturePermission({ ...featurePermission, name: e.target.value })} />

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Slug </label>
                                            <input type="text" value={featurePermission.slug} className="form-control" name="name" onChange={(e) => setFeaturePermission({ ...featurePermission, slug: e.target.value })} />

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

export default EditFeaturePermission;
