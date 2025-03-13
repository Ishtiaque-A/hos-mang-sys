import axios from 'axios';
import MaterialTable from 'material-table';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import LabAgentSetupLayout from '../LabAgentSetupLayout';

const AllRateList = () => {
    const [rateListCategory, setRateListCategory] = useState([])
    useEffect(() => {
        axios.get(`/lab-agent-rate-list-all`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.rateList);
                setRateListCategory(res.data.rateList);
            }

        });

    }, []);
    const deleteRateList = (e, id) => {
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
                axios.delete(`/delete-rate-list-all/${id}`).then(res => {
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
            title: "Item Code", field: `code`
        },
        {
            title: "Category", field: `rate_list_category.name`,
        },
        {
            title: "Test Name", field: `name`,
        },
        {
            title: "Gender", field: `patient_birth_sex.birth_sex_name`,
        },
        {
            title: "Fee", field: `fee`,
        },
        {
            title: "Revenue", field: `revenue`,
        },
        {
            title: "Pre Booking	", field: `preBooking`,
        },
        {
            title: "Details", field: `details`,
        },
        {
            title: "Action", field: "", render: (row) => <div><Link to={`/edit-rate-list-all/${row.id}`} className="btn btn-info btn-sm action-btn"><i className="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteRateList(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i className="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <LabAgentSetupLayout>
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Rate List 
                        <Link to='/add-rate-list-all' className="btn btn-primary btn-sm float-end"> Add  </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <MaterialTable
                        columns={columns}
                        data={rateListCategory}
                        options={{
                            search: true,
                            showTitle: false,
                            searchFieldAlignment: "left",
                            pageSize: 5,
                            emptyRowsWhenPaging: false,
                            pageSizeOptions: [5, 10, 20, 50, 100]
                        }}
                    />
                </div>
            </div>
        </LabAgentSetupLayout>
    );
};
export default AllRateList;