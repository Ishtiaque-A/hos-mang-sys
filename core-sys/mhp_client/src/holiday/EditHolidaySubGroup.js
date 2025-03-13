
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import HolidaySetUpSidebar from './HolidaySetUpSidebar'
import axios from 'axios';
import { Autocomplete } from "@mui/material";
import TextField from '@mui/material/TextField';

function EditHolidaySubGroup() {
    const [holidayGroup, setHolidayGroup] = useState();
    const [holidayGroupData, setHolidayGroupData] = useState([]);
    const [holidaySubGroup, setHolidaySubGroup] = useState();
    const [errorGroup, setErrorGroup] = useState();
    const [errorSubGroup, setErrorSubGroup] = useState();
    const [data, setData] = useState();
    const navigate = useNavigate();

    const submitData = () => {
        
        if(!holidayGroup)
        {
            setErrorGroup('The group by field is required')
            return false;
        }
        if(!holidaySubGroup)
        {
            setErrorSubGroup('The sub group field is required')
            return false;
        }

        // get id
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.post(`/update-holiday-sub-group/${lastpart}`, {
            group_by: holidayGroup,
            sub_group_name: holidaySubGroup,
        }).then((res) => {
            console.log(res)
            if(res.data.status === 422)
            {
                setErrorGroup(res.data.message['group_by'])
                setErrorSubGroup(res.data.message['sub_group_name'])
               
            }else if(res.data.status === 200) {
                setErrorGroup(' ')
                setErrorSubGroup(' ')
                swal("Success", res.data.message, "success");
                setHolidayGroup('')
                navigate('/holiday-sub-group')
            }
        })
    }

    useEffect(() => {
        // get holiday category data
        axios.get(`/holiday-group-data-for-sub-group`).then((res) => {
            console.log('holiday data',res)
            if (res.data.status === 200) {
                setHolidayGroupData(res.data.data);
            } else if (res.data.status === 404) {
                console.log('something wrong')
            }
        });

        // get id
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        axios.get(`/edit-holiday-sub-group/${lastpart}`).then(res => {
            console.log('edit data',res?.data?.data)
            if (res.data.status === 200) {
                setData(res?.data?.data);
                setHolidayGroup(res?.data?.data?.holiday_group?.id)
                setHolidaySubGroup(res?.data?.data['sub_group_name'])
            } else if (res.data.status === 404) {
                console.log('something wrong')
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
                                    <h6 className="card-title"> Add Holiday Sub Group
                                        <Link to={'/holiday-sub-group'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div id="DigitalForm">
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                {/* <div className="form-group">
                                                    <label htmlFor="holiday" className="col-form-label-sm" >Group Name</label>
                                                    <select className='form-control'  value={holidayGroup} onChange={(e)=>setHolidayGroup(e.target.value)} defaultValue={holidayGroup}>
                                                    <option selected disabled>Select Holiday Group</option>
                                                        {holidayGroupData && holidayGroupData.map((item)=>{
                                                            return(
                                                                <>       
                                                                    <option value={item.id}>{item.name}</option>
                                                                </>
                                                            )
                                                        })}
                                                       
                                                    </select>
                                                    {errorGroup && <p className="text-danger">{errorGroup}</p>}
                                                </div> */}

                                                <div>
                                                    <h6  className="col-form-label-sm" style={{ fontWeight: 400 }}>Holiday Group</h6>
                                                    <Autocomplete
                                                        freeSolo
                                                        id="free-solo-2-demo"
                                                        disableClearable

                                                        options={holidayGroupData}
                                                        loadingText="loading..."
                                                        getOptionLabel={(option) =>
                                                            option.name
                                                        }
                                                        onChange={(event,value) => {
                                                            setHolidayGroup(value.id)
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Search Holiday Group"
                                                                size="small"
                                                                defaultValue={holidayGroup}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    type: 'search',
                                                                }}
                                                            />
                                                        )}
                                                        sx={{ width: '100%' }}
                                                    />
                                                     {errorGroup && <p className="text-danger">{errorGroup}</p>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="holiday" className="col-form-label-sm">Sub Group Name</label>
                                                    <input type="text" name="holiday" className="form-control pb-2" value={holidaySubGroup} onChange={(e) => setHolidaySubGroup(e.target.value)} placeholder="Holiday Group By" required />
                                                    {errorSubGroup && <p className="text-danger">{errorSubGroup}</p>}
                                                </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-sm btn-primary text-uppercase float-end mt-2" onClick={submitData}>Submit</button>
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

export default EditHolidaySubGroup
