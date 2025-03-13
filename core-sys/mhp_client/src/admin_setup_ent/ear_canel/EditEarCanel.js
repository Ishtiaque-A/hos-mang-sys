import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link} from "react-router-dom";
import swal from 'sweetalert';
import EntSetupSidebar from '../ent_setup_mainsidebar/EntSetupSidebar';

function EditEarCanel(props) {

    const[statuslist,setStatusList]=useState([]);
    const [canalInput,setcanalInput] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-canal/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                // console.log(res.data.EarCanal)
                setcanalInput(res.data.EarCanal);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    useEffect(() => {
        
        axios.get(`/ear-canal-status`).then(res => {

            if (res.data.status === 200) {
                
                setStatusList(res.data.status_list);
            }
        })
        

    }, []);


    const handleInput = (e) => {
        e.persist();
        setcanalInput({ ...canalInput, [e.target.name]: e.target.value });
    }

    const updateCanalInput= (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = canalInput;
        axios.post(`/update-canal/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setcanalInput({
                    ...canalInput,

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
                <EntSetupSidebar></EntSetupSidebar>
            </div>
            <div className="col-md-9 mt-3">
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Edit Ear Canal
                        <Link to={'/ear-canal'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="EarCanalForm" onSubmit={updateCanalInput}>
                        <div className="card-body">

                    <div className="col-md-12">
                    
            
                        <div className="form-group">
                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                            <input type="text"  value={canalInput.canal_name} className="form-control" name="canal_name" onChange={handleInput} />
                            <span className="text-danger">{error.canal_name}</span>

                        </div>
                

                        <div>
                        <label htmlFor="inputPassword4"
                                className="form-label  col-form-label col-form-label-sm">Status</label>

                        <select id="inputState" onChange={handleInput} value={canalInput.canal_status} name="canal_status"
                            className="form-select  col-form-label-sm font-size-patient">
                            <option selected>Select</option>
                            {
                                statuslist.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.history_exam_status_name}</option>
                                    )
                                })
                            }
                            </select>
                    </div>



                <div className='form-group mt-3'>
                    <label htmlFor="history_name" className="col-form-label-sm mt-1"><b className='me-3'>Selection </b> </label>

                    <div class="form-check form-check-inline ">
                        <input className="form-check-input mt-1" type="radio"onChange={handleInput} value="single" checked={canalInput.selection_criteria=='single'?true:''} name="selection_criteria"  id="inlineRadio1"/>
                        <label className="form-check-label" for="inlineRadio1"> <span style={{marginLeft:"-28px"}}>Single </span></label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" value="multiple" checked={canalInput.selection_criteria=='multiple'?true:''}  id="inlineRadio2"/>
                        <label className="form-check-label" for="inlineRadio2"> <span style={{marginLeft:"-28px"}}>Multiple </span></label>
                </div>
                <span className="text-danger"></span>
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

export default EditEarCanel
