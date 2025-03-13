import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function EditTenernessOverFacetJoin(props) {

    const [TenernessOverFacetJoin, setTenernessOverFacetJoin] = useState([]);
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
        axios.get(`/edit-tenerness-over-facet-join/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setTenernessOverFacetJoin(res.data.TenernessOverFacetJoin);
                // setPicture(res.data.TenernessOverFacetJoin.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setTenernessOverFacetJoin({ ...TenernessOverFacetJoin, [e.target.name]: e.target.value });
    }

    const updateTenernessOverFacetJoinInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('TenernessOverFacetJoin_name', TenernessOverFacetJoin.TenernessOverFacetJoin_name);


        axios.post(`/update-tenerness-over-facet-join/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setTenernessOverFacetJoin({
                    ...TenernessOverFacetJoin,

                });
                navigate(`/tenerness-over-facet-join/`);

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
                    <MusculoSkeletalExaminationSidebar/>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Tenerness Over FacetJoin
                                    <Link to={'/tenerness-over-facet-join'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="TenernessOverFacetJoinForm" onSubmit={updateTenernessOverFacetJoinInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={TenernessOverFacetJoin.TenernessOverFacetJoin_name} className="form-control" name="TenernessOverFacetJoin_name" onChange={handleInput} />
                                                <span className="text-danger">{error.TenernessOverFacetJoin_name}</span>
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

export default EditTenernessOverFacetJoin;
