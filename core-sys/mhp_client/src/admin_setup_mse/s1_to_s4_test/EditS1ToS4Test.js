import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';


const EditS1ToS4Test = () => {
    const [s1ToS4Test, setS1ToS4Test] = useState({
        name: "",
        error:""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setS1ToS4Test({ ...s1ToS4Test, [e.target.name]: e.target.value })
    }
    let params = useParams();
    useEffect(() => {
        axios.get(`/edit-s1-to-s4-test/${params.id}`)
            .then(res => setS1ToS4Test(res.data.s1ToS4Test))
    }, []);
    const updateS1ToS4Test = (e) => {
        console.log("s1ToS4Test", s1ToS4Test)
        e.preventDefault();
        axios.post(`/update-s1-to-s4-test/${params.id}`, s1ToS4Test)
            .then(res => {
                if (res.data.status == 200) {
                    swal("Success", res.data.message, "success");
                    setS1ToS4Test({
                        name: ""
                    });
                    navigate("/s1-to-s4-test");
                } else if (res.data.status === 400) {
                    setS1ToS4Test({ ...s1ToS4Test, error: res.data.message.name[0] })
                }
            })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <MusculoSkeletalExaminationSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Edit S1 To S4 Test
                                <Link to={'/s1-to-s4-test'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="S1ToS4TestForm" onSubmit={updateS1ToS4Test}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={s1ToS4Test.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{s1ToS4Test.error}</span>
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

export default EditS1ToS4Test;