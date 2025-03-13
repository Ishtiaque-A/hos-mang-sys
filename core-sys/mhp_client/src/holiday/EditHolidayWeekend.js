
// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import swal from 'sweetalert';
// import HolidaySetUpSidebar from './HolidaySetUpSidebar'
// import axios from 'axios';
// import InputLabel from '@mui/material/InputLabel';
// import { Checkbox, Icon, MenuItem, Select } from '@material-ui/core';


// function EditHolidayWeekend() {
//     const [holidayGroup, setHolidayGroup] = useState();
//     const [holidaySubGroup, setHolidaySubGroup] = useState();
//     const [error, setError] = useState();
//     const [search, setSearch] = useState([]);
//     const [data, setData] = useState();
    

//     const submitData = () => {
//         console.log('search',search)
//         if (search.length  == 0) {
//             console.log('hello')
//             setError('The search field is required')
//             return false;
//         }

//         axios.post(`/update-holiday-weekend`, {
//             search: search,
//         }).then((res) => {
//             console.log(res)
//             if (res.data.status === 422) {
//                 setError(res.data.message['search'])

//             } else if (res.data.status === 200) {
//                 setError(' ')
//                 swal("Success", res.data.message, "success");
//                 setHolidayGroup('')
//             }
//         })
//     }

//     useEffect(() => {
//         var url = window.location.href;
//         var urlsplit = url.split("/");
//         var lastpart = urlsplit[urlsplit.length - 1];
//         if (lastpart === '') {
//             lastpart = urlsplit[urlsplit.length - 2];
//         }
//         axios.get(`/edit-holiday-weekend/${lastpart}`).then(res => {
//             console.log('data' ,res?.data?.data)
//             if (res.data.status === 200) {
//                 setData(res?.data?.data);
//             } else if (res.data.status === 404) {
//                 setError(res?.data?.errors);
//             }

//         });
//     }, [])
//     console.log('get',data?.name)
//     return (
//         <div>
//             <>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-3">
//                             <HolidaySetUpSidebar />
//                         </div>
//                         <div className="col-md-9 mt-2">
//                             <div className="card">
//                                 <div className="card-header">
//                                     <h6 className="card-title">  Add Holiday Weekend
//                                         <Link to={'/holiday-sub-group'} className="btn btn-primary btn-sm float-end"> Back </Link>
//                                     </h6>
//                                 </div>
//                                 <div className="card-body">
//                                     <div id="DigitalForm">
//                                         <div className="card-body">

//                                             <div className="col-md-12">

//                                                 <div>
//                                                     <div className='search-select'>
//                                                     <InputLabel id="demo-multiple-name-label">{data?.name}</InputLabel>
//                                                         <Select
//                                                             labelId="demo-simple-select-label"
//                                                             id="demo-simple-select"
//                                                             value={search}
//                                                             label="Select Day" 
//                                                             multiple
//                                                             onChange={(e) => setSearch(e.target.value)}
//                                                             style={{ width: '100%', fontSize: 13 }}
//                                                         >
                                                            
//                                                             <MenuItem value={"Select"}><em>Select</em></MenuItem>
//                                                             <MenuItem value={"Saturday"}>Saturday</MenuItem>
//                                                             <MenuItem value={"Sunday"}> Sunday</MenuItem>
//                                                             <MenuItem value={"Monday"}> Monday</MenuItem>
//                                                             <MenuItem value={"Tuesday"}> Tuesday</MenuItem>
//                                                             <MenuItem value={"Wednesday"}> Wednesday</MenuItem>
//                                                             <MenuItem value={"Thursday"}> Thursday</MenuItem>
//                                                             <MenuItem value={"Friday"}> Friday</MenuItem>
//                                                         </Select>
//                                                     </div>
//                                                     {error && <p className="text-danger">{error}</p>}
//                                                 </div>
//                                                 <div className="form-group">
//                                                     <button className="btn btn-sm btn-primary text-uppercase float-end mt-2" onClick={submitData}>Submit</button>
//                                                 </div>


//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </>
//         </div>
//     )
// }

// export default EditHolidayWeekend
