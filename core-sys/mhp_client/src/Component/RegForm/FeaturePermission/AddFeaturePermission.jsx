import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import LeftMenuBar from '../leftMenubar/LeftMenuBar'

export default function AddFeaturePermission() {
    const [feature, setfeature] = useState({
        name: "",
        slug: '',
    })
    const submitFature = (e) => {
        e.preventDefault();
        axios.post(`/save-feature-permission`, feature).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setfeature({
                    name: "",
                    slug: '',
                });

            }

        })
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
                            <h6 className="card-title"> Add Feature
                                <Link to={'/feature-permission'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="CervixForm" onSubmit={submitFature}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                            <input type="text" value={feature.name} className="form-control" name="name" onChange={(e) => setfeature({ ...feature, name: e.target.value })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Slug </label>
                                            <input type="text" value={feature.slug} className="form-control" name="name" onChange={(e) => setfeature({ ...feature, slug: e.target.value })} />
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
    )
}