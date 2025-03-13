import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import '../Component/Patients/AddNewPatient/AddNewPatient.css';
import MaterialTable from 'material-table';
import 'jspdf-autotable';
import swal from 'sweetalert'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 3,
    px: 4,
    pb: 3,
}
const buttonDesign = {
    backgroundColor: '#69B128',
    color: '#fff',
}
const WorkDutiesOnHoliday = () => {
    const [open, setOpen] = useState(false);
    const [allDoctors, setAllDoctors] = useState([]);
    const [doctor, setDoctor] = useState();
    const [loading, setLoading] = useState();
    const [editData, setEditData] = useState();
    const [updateButton, setUpdateButton] = useState();
    const [data, setData] = useState([]);
    const [date, setDate] = useState();
    const [editDataId, setEditDataId] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const submitData = (e) => {

        axios.post(`/save-working-on-holiday`, {
            doctorId: doctor,
            date: date,
        }).then((res) => {
            console.log(res)
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setDate('')
                setLoading(Math.random());
                setOpen(false);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }

        })

    }

    const updateData = (id) => {
        setOpen(true);
        const editHolidayData = data.find((item) => item.id === id);
        setEditDataId(editHolidayData.id)
        setDate(editHolidayData.date)
        setDoctor(editHolidayData.doctors.id)
        setUpdateButton(1);
    }

    const submitUpdate = () => {
        axios.post(`/edit-working-on-holiday/${editDataId}`, {
            doctorId: doctor,
            date: date,
        }).then((res) => {
            console.log(res)
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setDate('')
                setLoading(Math.random());
                setOpen(false);
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        })
    }

    const deleteData = (id) => {
        axios.get(`/delete-working-on-holiday/${id}`).then((res) => {
            console.log(res)
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setLoading(Math.random());
            }
        })
        setOpen(false);
    }


    useEffect(() => {
        let isMounted = true;
        axios.get(`/working-day-on-holiday`).then((res) => {
            console.log(res)
            if (res.data.status === 200) {
                setData(res.data.data);
            } else if (res.data.status === 404) {
            }
        })
        axios.get(`/doctors`).then(res => {
            if (res.data.status == 200) {
                setAllDoctors(res.data.doctors);
            }
        })
        return () => { isMounted = false };
    }, [loading])
    console.log(data);
    return (
        <div className="ms-2 all-patients mt-2">
            <div className="custom-card patients-head ">
                <h5 className="fw-normal py-2 px-2  text-start mb-2 text-login">Add Doctor
                    <Link to='' className="btn btn-primary me-1 btn-sm float-end" onClick={handleOpen}>Add Doctor </Link>
                </h5>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        Add Doctor
                    </Typography>

                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Select Doctor</label>
                        <select class="form-control" id="exampleFormControlSelect1" name='doctor' value={doctor} onChange={(e) => setDoctor(e.target.value)}>
                            {allDoctors.map((item) => {
                                return (
                                    <option value={item.id}>{item.dr_given_name}</option>
                                )
                            })}

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Date</label>
                        <input type="date" name="holiday" className="form-control pb-2" value={date} required onChange={(e) => setDate(e.target.value)} />
                    </div>

                    {updateButton === 1 ? (
                        <div className="form-group">
                            <button className="btn py-1 px-3" style={buttonDesign} onClick={submitUpdate}>Update</button>
                        </div>
                    ) : (
                        <div className="form-group">
                            <button className="btn py-1 px-3" style={buttonDesign} onClick={submitData}>Submit</button>
                        </div>
                    )}


                </Box>
            </Modal>

            <div className="custom-card patient-table mt-2 text-center">
                <MaterialTable
                    columns={[
                        { title: "Doctor Name", field: "doctor_name", render: rowData => <td>{rowData?.doctors?.dr_given_name}</td> },
                        { title: "Holiday_Group", field: "group_by", render: rowData => <td>{rowData?.group_by}</td> },
                        { title: "Holiday_info", field: "group_info", render: rowData => <td>{rowData?.group_info}</td> },
                        { title: "Date", field: "date", render: rowData => <td>{rowData?.date}</td> },
                        {
                            title: "Status",
                            field: "status",
                            render: rowData => <td> {rowData?.status == 0 ? <span class="badge bg-primary">On Duty</span> : <span class="badge bg-danger">Off Duty</span>} </td>
                        },
                        {
                            title: "Action",
                            field: "day",
                            render: rowData => <td><button className="btn action-btn btn-sm" onClick={() => updateData(rowData.id)}><i class="far fa-edit"></i></button>
                                <button className="btn action-btn btn-sm" onClick={() => deleteData(rowData.id)}><i class="far fa-trash"></i></button>
                            </td>
                        },
                    ]}
                    data={data}
                    title="Holiday List"

                />


            </div>
        </div>
    )
}

export default WorkDutiesOnHoliday