import React, { useState, useEffect } from "react";
import './LabModule.css'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from 'axios';
import MaterialTable from 'material-table';
const LabDoctorsPanel = () => {
    const [doctor_fee, setdoctor_fee] = useState([]);

    useEffect(() => {
        axios.get(`/doctorFee`).then(res => {
            if (res.data.status === 200) {
                setdoctor_fee(res.data.doctorFee);
            }

        });

    }, []);


    const deletedoctor_fee = (e, id) => {

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
                axios.delete(`/delete-doctorFee/${id}`).then(res => {
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
            title: "Test Group", field: `doctor_name`

            ,
            render: (row) => <div>{row.dr_given_name}</div>,

            cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Test Category", field: ``

            ,
            render: (row) => <div>{row.docFee_name}</div>,

            cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Tests", field: `item_code`

            ,

            cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },
        {
            title: "Ratelist entries", field: `fee_name`

            , cellStyle: {
                marginLeft: 50,
                width: 600
            },
        },

        {
            title: "Action", field: "patient", render: (row) => <div><Link to={`/edit-doctor-fee/${row.id}`} class="btn btn-info btn-sm action-btn"><i class="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deletedoctor_fee(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <>
            <div class="shadow-sm p-2 mb-3 mt-2 bg-body rounded">
                <h5 className="mx-2" >Test Panels</h5>
            </div>


            <div class="">
                <div className="row">
                    {/* <div className="col-md-3">
                        <BillingSetupSidebar />
                    </div> */}

                    <div>
                        <button type="submit" className="btns float-end ">
                            Add New
                        </button>
                    </div>

                    <div className="col-md-12 mt-3">



                        <MaterialTable
                            columns={columns}
                            data={doctor_fee}
                            options={{
                                search: true,
                                // filtering: filter,
                                showTitle: false,
                                searchFieldAlignment: "left",
                                pageSize: 5,
                                emptyRowsWhenPaging: false,
                                pageSizeOptions: [5, 10, 20, 50, 100]
                            }}

                        />

                    </div>
                </div>
            </div>


            <button type="submit" className="btns mt-3 ">
                Update
            </button>


        </>
    );
};

export default LabDoctorsPanel;