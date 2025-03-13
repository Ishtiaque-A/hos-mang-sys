import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import '../Component/Patients/AddNewPatient/AddNewPatient.css';
import MaterialTable from 'material-table';
import 'jspdf-autotable';
import swal from 'sweetalert'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import HolidaySetUpSidebar from "./HolidaySetUpSidebar";

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
const HolidaySubGroup = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState();
    const [data, setData] = React.useState([]);
    const [editData, setEditData] = React.useState();


    const deleteData = (id) => {
        axios.get(`/delete-holiday-sub-group/${id}`).then((res) => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setLoading(Math.random());
            }else{
                console.log('something is worng')
            }
        })
        setOpen(false);
    }


    useEffect(() => {
        axios.get(`/holiday-sub-group`).then(res => {
            if (res.data.status === 200) {
               
                setData(res.data.data);
            } else if (res.data.status === 404) {
                console.log('something wrong')
            }
        });
    }, [loading, editData])
    console.log(data)
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
                                <h1 className="card-title">Holiday Sub Group
                                <Link to={'/add-holiday-sub-group'} className="btn btn-primary btn-sm float-end"> Add  </Link>
                                </h1>
                            </div>
                            <div className="card-body">
                                    <MaterialTable
                                        columns={[
                                            { title: "Holiday Group", field: "name", render: rowData => <td>{rowData?.holiday_group?.name}</td> },
                                            { title: "Holiday Sub Group", field: "sub_group_name", render: rowData => <td>{rowData?.sub_group_name}</td> },
                                            {
                                                title: "Action",
                                                field: "action",
                                                render: rowData => <td> <Link to={`/edit-holiday-sub-group/${rowData.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>
                                                    <button className="btn btn-danger btn-sm action-btn" onClick={() => deleteData(rowData.id)}><i class="fas fa-trash"></i></button>
                                                </td>
                                            },
                                        ]}
                                       
                                        data={data}
                                        options={{
                                            search: true,
                                            showTitle: false,
                                            pageSize: 5,
                                            searchFieldAlignment: "left",
                                            emptyRowsWhenPaging:false,
                                            pageSizeOptions: [5, 10, 20, 50, 100]
                                        }}

                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HolidaySubGroup