import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddDashboard from "../AddDashboard/AddDashboard";
import { HexColorPicker } from 'react-colorful';
import colorIcon from "../../Images/color pallate.png"
import './status.css';
import axios from "axios";
import Swal from "sweetalert2";
import swal from 'sweetalert';

function AddStatus() {
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [color, setColor] = useState("#ffff");
    const [status_name, setstatus_name] = useState();
    console.log("status color", color);

    const handleSubmit = () => {
        axios.post('save-status', { status_name, color }).then(res => {
            
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setstatus_name('')
                setColor('')

            }
            else if (res.data.status == 400) {
                console.log(res);

            }
        })
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <AddDashboard></AddDashboard>
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6>Status
                                <Link to={"/status"} className="btn mb-1 btn-sm btn-primary float-end">Back</Link>
                            </h6>

                        </div>
                        <div className="card-body">

                            <div className="card-body">

                                <div className="form-group">
                                    <label htmlFor="status_name" className="col-form-label-sm">Status Name</label>
                                    <input type="text" className="form-control" onChange={e => setstatus_name(e.target.value)} name="status_name" />
                                    {/* <span className="text-danger">{error}</span> */}
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-1 vital-setup-lebel col-form-label col-form-label-sm ">Color</label>
                                    <div className="col-sm-9 d-flex">
                                        <div className="radio-container red mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#FF0000" onChange={e => setColor(e.target.value)} id="radio-1" name="group" />
                                        </div>
                                        <div className="radio-container green mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#008000" onChange={e => setColor(e.target.value)} id="radio-1" name="group" />
                                        </div>
                                        <div className="radio-container yellow mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#FFC100" onChange={e => setColor(e.target.value)} id="radio-1" name="group" />
                                        </div>
                                        <div className="radio-container info mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#248AFD" onChange={e => setColor(e.target.value)} id="radio-1" name="group" />
                                        </div>
                                        <div className="radio-container primary mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#3F3E91" onChange={e => setColor(e.target.value)} id="radio-1" name="group" />
                                        </div>
                                        <div className="radio-container ex-1 mt-2 me-2 ms-2">
                                            <input type="radio" className="radio-custom" value="#24E71A" onChange={e => setColor(e.target.value)} id="radio-1" name="group" />
                                        </div>

                                        <div onClick={() => setShowColorPicker(!showColorPicker)} className="color-pallate">
                                            Custom
                                            <img className='ms-1' style={{ width: "30px" }} src={colorIcon} alt="" />
                                        </div>

                                    </div>
                                    {
                                        showColorPicker &&
                                        <div>
                                            <div style={{ width: "130px" }} className="float-end mt-1">
                                                <HexColorPicker color={color} onChange={setColor} />
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>



                            <div className="float-right">
                                {
                                    status_name !== '' ?
                                        <button onClick={handleSubmit} className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
                                            className="fas fa-save"></i> Add
                                        </button>
                                        :
                                        <button className="btn btn-primary btn-sm text-uppercase float-end mt-2 disabled"><i
                                            className="fas fa-save"></i> Add
                                        </button>
                                }

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default AddStatus;





