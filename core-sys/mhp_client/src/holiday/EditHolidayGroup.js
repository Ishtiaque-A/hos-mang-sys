
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import HolidaySetUpSidebar from './HolidaySetUpSidebar'
import axios from 'axios';

function EditHolidayGroup() {
    const [holidayGroup, setHolidayGroup] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const submitUpdate = () => {
        if(!holidayGroup)
        {
            setError('The group by field is required')
            return false;
        }
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        axios.post(`/update-holiday-group/${lastpart}`, {
            group_by: holidayGroup,
        }).then((res) => {
            console.log('update data',res)
            if(res.data.status === 422)
            {
                setError(res.data.message['group_by'])
            }else if(res.data.status === 200) {
                setError(' ')
                swal("Success", res.data.message, "success");
                setHolidayGroup('')
                navigate('/holiday-group')
            }  
        })
    }

    useEffect(() => {
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        axios.get(`/edit-holiday-group/${lastpart}`).then(res => {
            console.log(res?.data?.data)
            if (res.data.status === 200) {
                setData(res?.data?.data);
                setHolidayGroup(res?.data?.data['name'])
            } else if (res.data.status === 404) {
                setError(res?.data?.errors);
            }

        });
    }, [])

    

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <HolidaySetUpSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Edit Holiday Group
                                        <Link to={'/holiday-group'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div id="DigitalForm">
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="holiday" className="col-form-label-sm">Name</label>
                                                    <input type="text" name="holiday" className="form-control pb-2" value={holidayGroup} onChange={(e) => setHolidayGroup(e.target.value)} placeholder="Holiday Group By" required />
                                                    {error && <p className="text-danger">{error}</p>}
                                                </div>

                                                <div className="form-group">
                                                    <button className="btn btn-sm btn-primary text-uppercase float-end mt-2" onClick={submitUpdate}>Submit</button>
                                                </div>

                                                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        </div>
    )
}

export default EditHolidayGroup
