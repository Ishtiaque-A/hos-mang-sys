import axios from 'axios';
import MaterialTable from 'material-table';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import LabAgentSetupLayout from '../LabAgentSetupLayout';

const RateListCategory = () => {
    const [rateListCategory,setRateListCategory] = useState([])
    useEffect(() => {
        axios.get(`/lab-agent-rate-list-category`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.category);
                setRateListCategory(res.data.category);
            }

        });

    }, []);
    const deleteRateListCategory = (e,id) => {
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
                axios.delete(`/delete-rate-list-category/${id}`).then(res => {
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
            title: "Category Name", field: `name`
        },
        {
            title: "Image", field: `icon`, render: (row) => <div><img src={`${global.img_url}/labAgent/images/${row.icon}`} style={{height:"35px"}} alt="" /></div>

            ,
        },
        {
            title: "Action", field: "", render: (row) => <div><Link to={`/edit-rate-list-category/${row.id}`} className="btn btn-info btn-sm action-btn"><i className="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteRateListCategory(e, row.id)} className="btn btn-danger btn-sm action-btn"> <i className="fas fa-trash"></i> </button></div>
        },
    ];
    return (
        <LabAgentSetupLayout>
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Rate List Category
                        <Link to='/add-rate-list-category' className="btn btn-primary btn-sm float-end"> Add  </Link>
                    </h6>
                </div>
                <div className="card-body">

                    <MaterialTable
                        columns={columns}
                        data={rateListCategory}
                        options={{
                            searech: true,
                            // filtering: filter,
                            showTitle: false,
                            searechFieldAlignment: "left",
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

export default RateListCategory;