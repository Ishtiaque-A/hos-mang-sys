import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link} from "react-router-dom";
import swal from 'sweetalert';
import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';
function EditVitalSignUnit(props) {

    const [vitalunit,setvitalunit] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-vital-unit/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setvitalunit(res.data.vitalunit);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);



    const handleInput = (e) => {
        e.persist();
        setvitalunit({ ...vitalunit, [e.target.name]: e.target.value });
    }

    const updateCanalInput= (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = vitalunit;
        axios.put(`/update-vital-unit/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setvitalunit({
                    ...vitalunit,

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
                    <h6> Edit Vital Unit
                        <Link to={'/vital-unit'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="EarCanalForm" onSubmit={updateCanalInput}>
                        <div className="card-body">

                    <div className="col-md-12">
                    
            
                        <div className="form-group">
                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                            <input type="text"  value={vitalunit.vitalunit_name} className="form-control" name="vitalunit_name" onChange={handleInput} />
                            <span className="text-danger">{error.vitalunit_name}</span>

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

export default EditVitalSignUnit
