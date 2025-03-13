import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function AddExamination() {

    const [statuslist, setStatusList] = useState([]);

    const [examinationInput, setExamination] = useState({
        examination_code: '',
        examination_name: '',
        examination_status: '',
        description: '',
        error_list: [],
    });

    const [img, setImg] = useState({
        img: "",
        image: ""
    });


    const handleImage = (e) => {

        setImg({
            ...img,
            image: URL.createObjectURL(e.target.files[0]),
            [e.target.name]: e.target.files[0],

        })

    }

    useEffect(() => {
        axios.get('/pstatus-dropdown').then(res => {
            if (res.data.status === 200) {
                setStatusList(res.data.pstatus);
            }
        })
    }, []);

    const handleInput = (e) => {
        e.persist();
        setExamination({ ...examinationInput, [e.target.name]: e.target.value })
    }

    const submitExamination = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('img', img.img);
        formData.append('examination_code', examinationInput.examination_code);
        formData.append('examination_name', examinationInput.examination_name);
        formData.append('examination_status', examinationInput.examination_status);
        formData.append('description', examinationInput.description);

        axios.post(`/save-examination`, formData).then(res => {

            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setExamination({
                    ...examinationInput,

                    examination_code: '',
                    examination_name: '',
                    examination_status: '',
                    description: '',
                    error_list: [],
                });

                // document.getElementById('examinationForms').reset();
                // console.log(res.data.success);
                // document.getElementById('examination_form').reset();

            } else if (res.data.status === 400) {
                setExamination({ ...examinationInput, error_list: res.data.errors });
            }

        });
    }

    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <HistorySetupSidebar></HistorySetupSidebar>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Add Examination
                                    <Link to={'/examination'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitExamination} id="examinationForms" encType='multipart/form-data'>
                                    <div className="card-body">

                                        <div className="form-group">
                                            <label htmlFor="examination_code" className="col-form-label-sm"> Examination Code </label>
                                            <input type="text" onChange={handleInput} value={examinationInput.examination_code} className="form-control" name="examination_code" />
                                            <span className="text-danger">{examinationInput.error_list.examination_code}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="examination_name" className="col-form-label-sm"> Examination Name </label>
                                            <input type="text" onChange={handleInput} value={examinationInput.examination_name} className="form-control" name="examination_name" />
                                            <span className="text-danger">{examinationInput.error_list.examination_name}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputPassword4"
                                                className=" col-form-label-sm"> Status</label>
                                            <select name="examination_status" type="text" onChange={handleInput} value={examinationInput.examination_status} id="inputState"
                                                className="form-control  col-form-label-sm font-size-patient">
                                                <option value="">Select</option>

                                                {
                                                    statuslist.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.status_name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description" className="col-form-label-sm"> Description </label>
                                            <textarea name="description" onChange={handleInput} value={examinationInput.description} className="form-control" id="exampleFormControlTextarea1"
                                                rows="3"></textarea>
                                            <span className="text-danger">{examinationInput.error_list.description}</span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="image" className="col-form-label-sm d-block"> Image  </label>

                                            <input type="file" id="img" name="img" accept="image/*" onChange={handleImage} />
                                            <img src={img.image} alt="img" className="d-inline" style={{ width: "120px", marginTop: '5px' }} />
                                            {/* <span className="text-danger">{examinationInput.error_list.description}</span> */}
                                        </div>
                                        <div className="float-right">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                className="fas fa-save"></i> Save
                                            </button>
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

export default AddExamination;