import { Checkbox, Icon, MenuItem, Select } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Footer from '../../Component/Footer/Footer';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import './Doctor_time.css';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import AddDashboard from '../AddDashboard/AddDashboard';



const DoctorTime = () => {
    const [search, setSearch] = useState("Select");

    const data = [
        { date: "Saturday", time: "7.00 AM - 8.00 AM", time2: "9.00 AM - 10.00 AM" },
        { date: "Sunday", time: "7.00 AM - 8.00 AM", time2: "9.00 AM - 10.00 AM" },
        { date: "Monday", time: "7.00 AM - 8.00 AM", time2: "9.00 AM - 10.00 AM" },
        { date: "Tuesday", time: "7.00 AM - 8.00 AM", time2: "9.00 AM - 10.00 AM" },
        { date: "Wednesday", time: "7.00 AM - 8.00 AM", time2: "9.00 AM - 10.00 AM" },
        { date: "Thursday", time: "7.00 AM - 8.00 AM", time2: "9.00 AM - 10.00 AM" },
        { date: "Friday", time: "7.00 AM - 8.00 AM", time2: "9.00 AM - 10.00 AM" },
    ]
    const [sortedData, setSortededData] = useState(data);
    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

            cellStyle: {
                width: "20px !important",
            },

        },
        {
            title: "Day", field: `date`
            , cellStyle: {

            },
        },
        {
            title: "Hospital 1", field: `time`
            , cellStyle: {
            },
        },
        {
            title: "Hospital 2", field: `time2`
            , cellStyle: {
            },
        },

    ];
    const hospitals = [
        { name: "Square" },
        { name: "Apollo" },
        { name: "Lab Aid" },
    ]
    const doctors = [
        { name: "Doctor A" },
        { name: "Doctor B" },
        { name: "Doctor C" },
    ]
    const departments = [
        { name: "Orthopedics-Paediatric" },
        { name: "Microbiology" },
        { name: "Radiology" },
        { name: "General Surgery" },
        { name: "Gastroenterology - Medical" },
    ]
    const Specialists = [
        { name: "Anesthesiology" },
        { name: "Anesthesiologists" },
        { name: "Cardiologists" },
        { name: "Medicine Specialists" },
        { name: "Dermatologists" },
    ]
    
    return (
        <div>
            <Sidebar1></Sidebar1>
            <div className='container-fluid mt-5'>
                <div className='row'>
                    <div className="col-md-3">
                        <AddDashboard></AddDashboard>
                    </div>
                    <div className='col-md-7 mt-5'>
                        <div className="patients-head">
                            <h6 className="ms-3">Doctors Time Slot
                                <Link to={'/add-doctortime'} className="btn btn-primary btn-sm me-3 float-end"> Add Specialists </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <h6>Dr John</h6>
                            <MaterialTable
                                columns={columns}
                                data={sortedData}
                                options={{
                                    search: true,
                                    // filtering: filter,
                                    showTitle: false,
                                    searchFieldAlignment: "left",
                                    pageSize: 10,
                                    emptyRowsWhenPaging: false,
                                    pageSizeOptions: [10, 20, 50, 100]
                                }}
                                actions={[
                                    // {
                                    //     icon: () =>
                                    //         <div className="selected"><Select
                                    //             labelId="demo-simple-select-label"
                                    //             id="demo-simple-select"
                                    //             value={sex}
                                    //             // label="Age"

                                    //             onChange={(e) => setSex(e.target.value)}
                                    //             style={{ width: 80, fontSize: 14 }}
                                    //         >
                                    //             <MenuItem style={{ width: 80, fontSize: 14 }} value={"sex"}><em>Sex</em></MenuItem>
                                    //             <MenuItem style={{ width: 80, fontSize: 14 }} value={"male"}><i class="fas fa-male sex-icon"></i> Male</MenuItem>
                                    //             <MenuItem style={{ width: 80, fontSize: 14 }} value={"female"}><i class="fas fa-female sex-icon"></i> Female</MenuItem>
                                    //             <MenuItem style={{ width: 80, fontSize: 14 }} value={"others"}><i class="fas fa-transgender-alt sex-icon"></i> Others</MenuItem>
                                    //         </Select>
                                    //         </div>,
                                    //     isFreeAction: true
                                    // },
                                ]}

                            />
                        </div>
                    </div>
                    <div className='col-2 mt-5'>
                        <div className='mt-5 search'>
                            <p>Search By: </p>
                            <div className='search-select'>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={search}
                                    // label="Age"

                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{ width: 142 , fontSize:13}}
                                >
                                    <MenuItem value={"Select"}><em>Select</em></MenuItem>
                                    <MenuItem value={"Hospital"}> Hospital</MenuItem>
                                    <MenuItem value={"Doctor"}> Doctor</MenuItem>
                                    <MenuItem value={"Department"}> Department</MenuItem>
                                    <MenuItem value={"Specialist"}> Specialist</MenuItem>
                                </Select>
                            </div>
                            {
                                search === "Hospital" &&
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={hospitals}
                                    disableCloseOnSelect
                                    onChange={(event, newValue) => {
                                        console.log(newValue);
                                      }}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option, { selected }) => (
                                        <li style={{fontSize:13}} {...props}>
                                            <Checkbox
                                                style={{ color:"#0d6efd", padding:1}}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    // style={{ width: 230 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Hospital" />
                                    )}
                                />


                            }

                            {
                                search === "Doctor" &&
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={doctors}
                                    disableCloseOnSelect
                                    onChange={(event, newValue) => {
                                        console.log(newValue);
                                      }}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option, { selected }) => (
                                        <li style={{fontSize:13}} {...props}>
                                            <Checkbox
                                                style={{ color:"#0d6efd", padding:1}}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    // style={{ width: 230 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Doctor" />
                                    )}
                                />

                            }
                            {
                                search === "Department" &&
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={departments}
                                    disableCloseOnSelect
                                    onChange={(event, newValue) => {
                                        console.log(newValue);
                                      }}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option, { selected }) => (
                                        <li style={{fontSize:13}} {...props}>
                                            <Checkbox
                                                style={{ color:"#0d6efd", padding:1}}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    // style={{ width: 230 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Department" />
                                    )}
                                />
                            }
                            {
                                search === "Specialist" &&
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={Specialists}
                                    disableCloseOnSelect
                                    onChange={(event, newValue) => {
                                        console.log(newValue);
                                      }}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option, { selected }) => (
                                        <li style={{fontSize:13}} {...props}>
                                            <Checkbox
                                                style={{ color:"#0d6efd", padding:1}}
                                                checked={selected}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    // style={{ width: 230 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Specialist" />
                                    )}
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DoctorTime;