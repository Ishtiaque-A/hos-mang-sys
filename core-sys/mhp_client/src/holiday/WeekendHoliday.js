import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import "../Component/Patients/AddNewPatient/AddNewPatient.css";
import "jspdf-autotable";
import swal from "sweetalert";
import HolidaySetUpSidebar from "./HolidaySetUpSidebar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import dayjs from 'dayjs';
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
const WeekendHoliday = () => {
    const [open, setOpen] = React.useState(false);
    const [holidayGroup, setHolidayGroup] = React.useState();
    const [loading, setLoading] = React.useState();
    const [editData, setEditData] = React.useState();
    const [error, setError] = React.useState();
    const [weekend, setWeekend] = React.useState([]);
    const [startDateValue, setStartDateValue] = React.useState();
    const [errorEfficative, setErrorEfficative] = React.useState()

    const deleteData = (id) => {
        axios.get(`/delete-holiday-group/${id}`).then((res) => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setLoading(Math.random());
            } else {
                console.log("something is worng");
            }
        });
        setOpen(false);
    };

    const changeWeekend = (e) => {
        const data = e.target.value;
        const weekendArray = [...weekend];
        if (e.target.checked) {
            if (startDateValue) {
                weekendArray.push({ effictive_date: startDateValue, name: data })
                setWeekend(weekendArray);
            } else {
                setError("Please select first efficative date");
            }

        } else {
            const unsetData = weekendArray.filter((item) => item.name !== data);
            setWeekend(unsetData)
        }
    };
    console.log('weekend', weekend)

    const submit = () => {

        try {
            if (weekend.length == 0) {
                if (weekend?.effictive_date) {
                    setError('Effictive date and day name field is required')
                    return false
                }
                if (weekend?.name) {
                    setError('Effictive date and day name field is required')
                    return false
                }
                setError('Effictive date and day name field is required')
                return false
            }
            axios.post(`/save-holiday-weekend`, {
                search: weekend,
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.status === 422) {
                        setError(res.data.message["search"]);
                    } else if (res.data.status === 200) {
                        setError(" ");
                        swal("Success", res.data.message, "success");
                        setHolidayGroup("");
                    }
                });
        } catch (error) {
            console.log(error)
        }

    }



    useEffect(() => {
        axios.get(`/holiday-weekend-data`).then((res) => {
            if (res.data.status === 200) {
                setWeekend(res.data.data);

            } else if (res.data.status === 404) {
                console.log("something wrong");
            }
        });
    }, [loading, editData]);

    return (
        <div className="ms-2 all-patients mt-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <HolidaySetUpSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h1 className="card-title">
                                    Holiday Weekend
                                    {/* <Link to={'/add-weekend-holiday'} className="btn btn-primary btn-sm float-end"> Add  </Link> */}
                                </h1>
                            </div>
                            <div className="card-body">

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={["DatePicker", "DatePicker", "DatePicker"]}
                                    >
                                        <DatePicker
                                            label="Effective date"
                                            format="DD/MM/YYYY"
                                            // defaultValue={weekend.effictive_date} 
                                            onChange={(startValue) => setStartDateValue(startValue)}
                                            // onChange={(startValue) => changeStartValue(startValue)}
                                            slotProps={{ textField: { size: "small" } }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <div className="pt-2">
                                    <p>Effective Date will start from  {moment(weekend[0]?.effictive_date).format('DD/MM/YYYY')}</p>
                                </div>

                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="Friday"
                                        value="Friday"
                                        checked={weekend.some((item) => item.name === 'Friday')}
                                        onChange={(e) => changeWeekend(e)}
                                    />
                                    <label class="form-check-label" for="Friday">
                                        Friday
                                    </label>
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="Saturday"
                                        id="Saturday"
                                        checked={weekend.some((item) => item.name === 'Saturday')}
                                        onChange={(e) => changeWeekend(e)}
                                    />
                                    <label class="form-check-label" for="Saturday">
                                        Saturday
                                    </label>
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="Sunday"
                                        id="Sunday"
                                        checked={weekend.some((item) => item.name === 'Sunday')}
                                        onChange={(e) => changeWeekend(e)}
                                    />
                                    <label class="form-check-label" for="Sunday">
                                        Sunday
                                    </label>
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="Monday"
                                        id="Monday"
                                        checked={weekend.some((item) => item.name === 'Monday')}
                                        onChange={(e) => changeWeekend(e)}
                                    />
                                    <label class="form-check-label" for="Monday">
                                        Monday
                                    </label>
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="Tuesday"
                                        id="Tuesday"
                                        checked={weekend.some((item) => item.name === 'Tuesday')}
                                        onChange={(e) => changeWeekend(e)}
                                    />
                                    <label class="form-check-label" for="Tuesday">
                                        Tuesday
                                    </label>
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="Wednesday"
                                        id="Wednesday"
                                        checked={weekend.some((item) => item.name === 'Wednesday')}
                                        onChange={(e) => changeWeekend(e)}
                                    />
                                    <label class="form-check-label" for="Wednesday">
                                        Wednesday
                                    </label>
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="Thursday"
                                        id="Thursday"
                                        checked={weekend.some((item) => item.name === 'Thursday')}
                                        onChange={(e) => changeWeekend(e)}
                                    />
                                    <label class="form-check-label" for="Thursday">
                                        Thursday
                                    </label>
                                    <div className="form-group mt-2">
                                        {error && <p className="text-danger">{error}</p>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <button className="btn btn-primary btn-sm" onClick={submit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekendHoliday;
