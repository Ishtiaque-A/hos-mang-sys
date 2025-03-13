import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link,useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';


function EditCnTen(props) {

    const [cnTen,setcnTen] = useState([]);

    const [error, setError] = useState([]);

    const navigate=useNavigate();
    
    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.get(`/edit-cnTen/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setcnTen(res.data.cnTen);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


 

    const handleInput = (e) => {
        e.persist();
        setcnTen({ ...cnTen, [e.target.name]: e.target.value });
    }

    const updatecnTen= (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = cnTen;
        axios.post(`/update-cnTen/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setcnTen({
                    ...cnTen,

                });
                navigate('/cnTen');
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
            <div className="col-md-9 mt-3">
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Edit CN-X
                        <Link to={'/cnTen'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="EarcnTenForm" onSubmit={updatecnTen}>
                        <div className="card-body">

                    <div className="col-md-12">
                    
            
                        <div className="form-group">
                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                            <input type="text"  value={cnTen.name} className="form-control" name="name" onChange={handleInput} />
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

export default EditCnTen
