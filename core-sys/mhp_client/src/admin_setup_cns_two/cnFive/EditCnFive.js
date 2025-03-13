import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link,useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';


function EditCnFive(props) {

    const [cnFive,setcnFive] = useState([]);

    const [error, setError] = useState([]);

    const navigate=useNavigate();
    
    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.get(`/edit-cn7/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setcnFive(res.data.cnFive);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


 

    const handleInput = (e) => {
        e.persist();
        setcnFive({ ...cnFive, [e.target.name]: e.target.value });
    }

    const updatecnFive= (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = cnFive;
        axios.post(`/update-cn7/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setcnFive({
                    ...cnFive,

                });
                navigate('/cn7');
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
                <CnsTwoSetupSidebar/>
            </div>
            <div className="col-md-9 mt-2">
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Edit CN-VII
                        <Link to={'/cn7'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="EarcnFiveForm" onSubmit={updatecnFive}>
                        <div className="card-body">

                    <div className="col-md-12">
                    
            
                        <div className="form-group">
                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                            <input type="text"  value={cnFive.name} className="form-control" name="name" onChange={handleInput} />
                            <span className="text-danger">{error.name}</span>

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

export default EditCnFive
