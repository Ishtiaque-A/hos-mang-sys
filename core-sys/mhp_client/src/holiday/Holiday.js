import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import "../Component/Patients/AddNewPatient/AddNewPatient.css";
import MaterialTable from "material-table";
import "jspdf-autotable";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



const Holiday = () => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState();
    const [holidayGroup, setHolidayGroup] = React.useState();
    const [holidayInfo, setHolidayInfo] = React.useState();
    const [holidayGroupName, setHolidayGroupName] = React.useState();
    const [holidayInfoName, setHolidayInfoName] = React.useState();
    const [loading, setLoading] = React.useState();
    const [data, setData] = React.useState([]);
    const [editData, setEditData] = React.useState();
    const [initialDate, setInitialDate] = React.useState();
    const [editDataId, setEditDataId] = React.useState();
    const [updateButton, setUpdateButton] = React.useState();
    const [holidayGroupData, setHolidayGroupData] = useState([]);
    const [holidaySubGroupData, setHolidaySubGroupData] = useState([]);
    const [errorGroup, setErrorGroup] = useState();
    const [errorSubGroup, setErrorSubGroup] = useState();
    const [dateError, setDateError] = useState();
    const [addAnotherTime, setAddAnotherTime] = useState(0);
    const [endDate, setEndDate] = useState(null);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        pt: 3,
        px: 4,
        pb: 3,
    };
    const buttonDesign = {
        backgroundColor: "#69B128",
        color: "#fff",
    };
    const buttonDesignCancel = {
        backgroundColor: "red",
        color: "#fff",
    };

    const handleOpen = () => {
        setDate("");
        setHolidayInfo("");
        setHolidayGroup("");
        setOpen(true);


    };
    const handleClose = () => {
        setOpen(false);
    };

    const submitData = (e) => {
        if (!holidayGroup) {
            setErrorGroup('The group field is required')
            return false;
        }
        if (!holidayInfo) {
            setErrorSubGroup('The Sub Group field is required')
            return false;
        }
        if (!date) {
            setDateError('The start field is required')
            return false;
        }
        if (!endDate) {
            setEndDate(null)
        }
        axios
            .post(`/save-holiday`, {
                date: date,
                group_info: holidayInfo,
                group_by: holidayGroup,
                endDate: endDate,
            })
            .then((res) => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setDate("");
                    setHolidayInfo("");
                    setHolidayGroup("");
                    setLoading(Math.random());
                }
            });
        setOpen(false);
    };

    const updateData = (id) => {
        setOpen(true);
        const editHolidayData = data.find((item) => item.id === id);
        setEditDataId(editHolidayData.id);
        setDate(editHolidayData.date);
        setEndDate(editHolidayData.endDate);
        setHolidayInfo(editHolidayData.holiday_sub_group.id);
        setHolidayGroup(editHolidayData.group_by.id);
        setHolidayInfoName(editHolidayData.holiday_sub_group?.sub_group_name);
        setHolidayGroupName(editHolidayData.group_by?.name);
        setUpdateButton(1);
    };

    const submitUpdate = () => {
        if (!holidayGroup) {
            setErrorGroup('The group field is required')
            return false;
        }
        if (!holidayInfo) {
            setErrorSubGroup('The Sub Group field is required')
            return false;
        }
        if (!date) {
            setDateError('The start field is required')
            return false;
        }
        console.log(editDataId, holidayGroup, holidayInfo, date, endDate)
        if (!endDate) {
            setEndDate(null)
        }
        axios.post(`/edit-holiday/${editDataId}`, {
            date: date,
            group_info: holidayInfo,
            group_by: holidayGroup,
            endDate: endDate,
        })
            .then((res) => {
                console.log(res)
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setDate("");
                    setHolidayInfo("");
                    setHolidayGroup("");
                    setLoading(Math.random());
                }
            })
            .then((res) => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setDate("");
                    setHolidayInfo("");
                    setHolidayGroup("");
                    setLoading(Math.random());
                }
            });
        setOpen(false);
    };

    const deleteData = (id) => {
        axios.get(`/delete-holiday/${id}`).then((res) => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setLoading(Math.random());
            }
        });
        setOpen(false);
    };

    useEffect(() => {
        axios.get(`/holiday`).then((res) => {
            if (res.data.status === 200) {
                setData(res.data.data);
            } else if (res.data.status === 404) {
                console.log("some thing wrong");
            }
        });
        axios.get(`/holiday-group-data-for-sub-group`).then((res) => {
            if (res.data.status === 200) {
                setHolidayGroupData(res.data.data);
            } else if (res.data.status === 404) {
                console.log("something wrong");
            }
        });
        axios.get(`/holiday-sub-group-data-for-holiday-list`).then((res) => {
            if (res.data.status === 200) {
                setHolidaySubGroupData(res.data.data);
            } else if (res.data.status === 404) {
                console.log("something wrong");
            }
        });
    }, [loading, editData]);

    const changeHolidayGroup = (event, value) => {
        // const value = value;
        setHolidayGroup(value.id);
        axios.get(`/get-sub-group-name/${value.id}`).then((res) => {
            if (res.data.status === 200) {
                setHolidaySubGroupData([]);
                setHolidaySubGroupData(res?.data?.data);
            } else if (!res.data.data) {
                setErrorSubGroup("No Sub Group found");
                setHolidaySubGroupData([]);
            }
        });
    };

    const addAnotherTimeSlot = (e) => {
        const value = e.target.value;
        if (value == 1) {
            setAddAnotherTime(1);
        } else {
            setAddAnotherTime(0);
        }
    };

    const OffAnotherTimeSlot = (e) => {
        const value = e.target.value;
        if (value == 0) {
            setAddAnotherTime(0);
        }
    };


    return (
        <div className="ms-2 all-patients mt-2">
            <div className="custom-card patients-head ">
                <h5 className="fw-normal py-2 px-2  text-start mb-2 text-login">
                    Holiday List
                    <Link
                        to=""
                        className="btn btn-primary me-1 btn-sm float-end"
                        onClick={handleOpen}
                    >
                        {" "}
                        Add Holiday{" "}
                    </Link>
                </h5>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Holiday
                    </Typography>



                    <div>
                        <h6 className="col-form-label-sm" style={{ fontWeight: 400 }}>
                            Holiday Group
                        </h6>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={holidayGroupData}
                            loadingText="loading..."

                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => {
                                changeHolidayGroup(event, value);
                            }}

                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={holidayGroupName ? holidayGroupName : 'Search Holiday Group'}
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: "search",
                                    }}
                                />
                            )}
                            sx={{ width: "100%" }}
                        />

                        {errorGroup && <p className="text-danger">{errorGroup}</p>}
                    </div>

                    <div>
                        <h6 className="col-form-label-sm" style={{ fontWeight: 400 }}>
                            Holiday Sub Group
                        </h6>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={holidaySubGroupData}
                            loadingText="loading..."

                            getOptionLabel={(option) => option.sub_group_name}
                            onChange={(event, value) => {
                                setHolidayInfo(value.id);
                            }}

                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={holidayInfoName ? holidayInfoName : 'Search Holiday Info'}
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: "search",
                                    }}
                                />
                            )}
                            sx={{ width: "100%" }}
                        />
                        {errorSubGroup && <p className="text-danger">{errorSubGroup}</p>}
                    </div>

                    <div className="d-flex align-items-center mt-1">
                        <label htmlFor="" className="">
                            Add Data Range
                        </label>
                        {addAnotherTime == 0 ? (
                            <input
                                type="checkbox"
                                className="ms-2"
                                value="1"
                                onChange={(e) => addAnotherTimeSlot(e)}
                            />
                        ) : (
                            <input
                                type="checkbox"
                                className="ms-2"
                                value="0"
                                onChange={(e) => OffAnotherTimeSlot(e)}
                            />
                        )}
                    </div>


                    <div className="form-group">
                        <label htmlFor="">Start Date</label>
                        <input
                            type="date"
                            name="holiday"
                            className="form-control pb-2"
                            value={date}
                            required
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    {setDateError && <p className="text-danger">{dateError}</p>}


                    {addAnotherTime == 1 && (
                        <div className="form-group">
                            <label htmlFor="">End Date</label>
                            <input
                                type="date"
                                name="holiday"
                                className="form-control pb-2"
                                value={endDate}
                                required
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    )}

                    {updateButton === 1 ? (
                        <div className="form-group">
                            <button
                                className="btn btn-sm py-1 px-3"
                                style={buttonDesign}
                                onClick={submitUpdate}
                            >
                                Submit
                            </button>
                            <button
                                className="btn btn-sm py-1 px-3 ms-2"
                                style={buttonDesignCancel}
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>

                    ) : (
                        <div className="form-group">
                            <button
                                className="btn btn-sm py-1 px-3"
                                style={buttonDesign}
                                onClick={submitData}
                            >
                                Submit
                            </button>
                            <button
                                className="btn btn-sm py-1 px-3 ms-2"
                                style={buttonDesignCancel}
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </Box>
            </Modal>


            <div className="custom-card patient-table mt-2 text-center">
                <MaterialTable
                    columns={[
                        {
                            title: "Month",
                            field: "day",
                            render: (rowData) => <td>{moment(rowData?.date).format('MMMM DD')}</td>,
                        },
                        {
                            title: "Start Date",
                            field: "date",
                            render: (rowData) => <td>{moment(rowData?.date).format('DD/MM/YYYY')}</td>,
                        },
                        {
                            title: "End Day",
                            field: "endDate",
                            render: (rowData) => <td> {rowData?.endDate ? (<>{`${moment(rowData.endDate).format('DD/MM/YYYY')}`}</>) : `No Data Found`} </td>,
                        },

                        {
                            title: "Holiday Group",
                            field: "group_by.name",
                            render: (rowData) => <td>{rowData?.group_by?.name}</td>,
                        },
                        {
                            title: "Sub Group",
                            field: "holiday_sub_group.sub_group_name",
                            render: (rowData) => <td>{rowData?.holiday_sub_group?.sub_group_name}</td>,
                        },
                        {
                            title: "Day",
                            field: "day",
                            render: (rowData) => <td>{moment(rowData?.date).format('dddd')}</td>,
                        },

                        // {
                        //     title: "Total holiday",
                        //     field: "day",
                        //     render: (rowData) => <td>{rowData?.date.diff(rowData.endDate, 'days')}</td>,
                        // },

                        {
                            title: "Action",
                            field: "action",
                            render: (rowData) => (
                                <td>
                                    <button
                                        className="btn action-btn btn-sm"
                                        onClick={() => updateData(rowData?.id)}
                                    >
                                        <i class="far fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn action-btn btn-sm"
                                        onClick={() => deleteData(rowData?.id)}
                                    >
                                        <i class="far fa-trash"></i>
                                    </button>
                                </td>
                            ),
                        },
                    ]}
                    data={data}
                    title="Holiday List"
                />
            </div>
        </div>
    );
};

export default Holiday;
