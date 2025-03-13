import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import AddDashboard from '../AddDashboard/AddDashboard';
import Footer from "../../Component/Footer/Footer";
import Swal from "sweetalert2";
import moment from 'moment';

function TimeSlots() {

    const [timeSlots, setTimeSlots] = useState([]);
    const[loading,setLoading]=useState(true);

    useEffect(() => {
        axios.get(`/time-slots`).then(res => {
            if (res.status === 200) {
                setTimeSlots(res.data.time_slots);
                setLoading(false);
            }

        });

    }, []);

    const deleteCountry = (e, id) => {

        e.preventDefault();
        const thisClicked = e.currentTarget;
        //  thisClicked.innerText = "Deleting";

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-time-slots/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                        //   swal("Success", res.data.message, "success");
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })

    }


    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,

              width: "40 !important"
        },
        {
            title: "Doctor Name", field: ``

            ,render:(row)=><div> {row.doctor_info !==null ? row.doctor_info.dr_given_name :'null doctor'} </div>
            

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },
        {
            title: "Date", field: `startTime`

            ,render:(row)=><div>
            
            {moment(row.startTime).format("dddd, MMMM Do YYYY")}
            </div> 

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },
        {
            title: "Time slot start", field: `startTime`

            ,render:(row)=><div> {moment(row.startTime).format("hh:mm a")} </div>

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },
        {
            title: "Time slot end", field: `endTime`
            ,render:(row)=><div> {moment(row.endTime).format("hh:mm a")} </div>

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },


        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-time-slots/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteCountry(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <>
           
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <AddDashboard />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6>Time Slots
                                    <Link to='/add-time-slots' className="btn btn-primary btn-sm float-end"> Add Time Slots </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                
                                <MaterialTable
                                    columns={columns}
                                    isLoading={loading == true ? true : false}
                                    data={timeSlots}
                                    options={{
                                        search: true,
                                        showTitle: false,
                                        searchFieldAlignment: "left",
                                        pageSize: 5,
                                        emptyRowsWhenPaging:false,
                                        pageSizeOptions: [5, 10, 20, 50, 100]
                                    }}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>

    )
}

export default TimeSlots;