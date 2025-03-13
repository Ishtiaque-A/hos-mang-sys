import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import ImmunisationSetupSidebar from '../immunisation_setup_sidebar/ImmunisationSetupSidebar';
import './style.css';

const EditVaccineAgainst = () => {
    const [allVaccineName, setAllVaccineName] = useState([]);
    const [data, setdata] = useState({
        vaccine_id: "",
        against_tags: "",
        Dosages: "",
        Name_of_Manufacturer: "",
        Validity: ""
    })


    let params = useParams();
    useEffect(() => {
        axios.get(`/vaccine-name`).then(res => {
            if (res.data.status === 200) {
                setAllVaccineName(res.data.vaccine_name);
            }
        });
        axios.get(`/edit-vaccine-against/${params.id}`)
            .then(res => {
                setdata(res.data.vaccine_against)
            })
    }, []);


    const navigate = useNavigate();
    const SubmitAgainstVaccine = (e) => {
        e.preventDefault();
        axios.put(`/update-vaccine-against/${params.id}`, data)
            .then(res => {
                swal("Success", res.data.message, "success");
                navigate('/vaccine-against')
            })
    }

    const onchangeValue = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
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
                            <h6 className="card-title"> Edit Vaccine Against
                                <Link to={'/vaccine-against'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="vaccineAgainstForm" onSubmit={SubmitAgainstVaccine}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div class="form-group">
                                                <label for="exampleFormControlSelect1">Vaccine Name</label>
                                                <select class="form-control" id="exampleFormControlSelect1" name='vaccine_id' value={data.vaccine_id} onChange={onchangeValue}>
                                                    {
                                                        allVaccineName.map((item, i) => {
                                                            return (
                                                                <option value={item.id} key={i}>{item.vaccine_name}</option>
                                                            )
                                                        })

                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Vaccine Against</label>
                                                <input type="text" name='against_tags' value={data.against_tags} onChange={onchangeValue} className="form-control" id="exampleInputEmail1" />

                                            </div>
                                        </div>
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Name of Manufacturer</label>
                                                <input type="text" name='Name_of_Manufacturer' value={data.Name_of_Manufacturer} onChange={onchangeValue} className="form-control" id="exampleInputEmail1" />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Validity</label>
                                                <input type="date" name='Validity' value={data.Validity} onChange={onchangeValue} className="form-control" id="exampleInputEmail1" />
                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                    className="fas fa-save"  ></i> Update
                                                </button>
                                            </div>
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

export default EditVaccineAgainst;