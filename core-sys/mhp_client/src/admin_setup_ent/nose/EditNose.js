import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect} from 'react';
import { Link} from "react-router-dom";
import swal from 'sweetalert';
import EntSetupSidebar from '../ent_setup_mainsidebar/EntSetupSidebar';
import Footer from "../../Component/Footer/Footer";


function Editnose(props) {

    const[statuslist,setStatusList]=useState([]);
    const [nose,setnose] = useState([]);

    const [error, setError] = useState([]);

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.get(`/edit-nose/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setnose(res.data.nose);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    useEffect(() => {
        
        axios.get(`/nose-status`).then(res => {

            if (res.data.status === 200) {
                setStatusList(res.data.status_list);
            }
        })
        

    }, []);


    const handleInput = (e) => {
        e.persist();
        setnose({ ...nose, [e.target.name]: e.target.value });
    }

    const updatenose= (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = nose;
        axios.post(`/update-nose/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setnose({
                    ...nose,

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
                    <h6 className="card-title"> Edit Nose
                        <Link to={'/nose'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="EarnoseForm" onSubmit={updatenose}>
                        <div className="card-body">

                    <div className="col-md-12">
                    
            
                        <div className="form-group">
                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                            <input type="text"  value={nose.nose_name} className="form-control" name="nose_name" onChange={handleInput} />
                            <span className="text-danger">{error.nose_name}</span>

                        </div>
                

                        <div>
                        <label htmlFor="inputPassword4"
                                className="form-label  col-form-label col-form-label-sm">Status</label>

                        <select id="inputState" onChange={handleInput} value={nose.status_id} name="status_id"
                            className="form-select  col-form-label-sm font-size-patient">
                            <option value="">Select</option>
                            {
                                statuslist.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.history_exam_status_name}</option>
                                    )
                                })
                            }
                            </select>
                    </div>

                    <span className="text-danger">{error.status_id}</span>


                <div className='form-group mt-3'>
                    <label htmlFor="history_name" className="col-form-label-sm mt-1"><b className='me-3'>Selection </b> </label>

                    <div class="form-check form-check-inline ">
                        <input className="form-check-input mt-1" type="radio"onChange={handleInput} value="single" checked={nose.selection_criteria=='single'?true:''} name="selection_criteria"  id="inlineRadio1"/>
                        <label className="form-check-label" for="inlineRadio1"> <span style={{marginLeft:"-28px"}}>Single </span></label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" value="multiple" checked={nose.selection_criteria=='multiple'?true:''}  id="inlineRadio2"/>
                        <label className="form-check-label" for="inlineRadio2"> <span style={{marginLeft:"-28px"}}>Multiple </span></label>
                </div>
            </div>
            <span className="text-danger">{error.selection_criteria}</span>

                    
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

export default Editnose
