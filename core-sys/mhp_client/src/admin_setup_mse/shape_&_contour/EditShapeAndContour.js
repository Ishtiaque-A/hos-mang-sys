import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function EditShapeAndContour(props) {

    const [ShapeAndContour, setShapeAndContour] = useState([]);
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
        axios.get(`/edit-shape-and-contour/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setShapeAndContour(res.data.ShapeAndContour);
                // setPicture(res.data.ShapeAndContour.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setShapeAndContour({ ...ShapeAndContour, [e.target.name]: e.target.value });
    }

    const updateShapeAndContourInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('ShapeAndContour_name', ShapeAndContour.ShapeAndContour_name);


        axios.post(`/update-shape-and-contour/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setShapeAndContour({
                    ...ShapeAndContour,

                });
                navigate(`/shape-and-contour/`);

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
                                <h6 className="card-title"> Shape & Contour
                                    <Link to={'/shape-and-contour'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="ShapeAndContourForm" onSubmit={updateShapeAndContourInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={ShapeAndContour.ShapeAndContour_name} className="form-control" name="ShapeAndContour_name" onChange={handleInput} />
                                                <span className="text-danger">{error.ShapeAndContour_name}</span>
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

export default EditShapeAndContour;
