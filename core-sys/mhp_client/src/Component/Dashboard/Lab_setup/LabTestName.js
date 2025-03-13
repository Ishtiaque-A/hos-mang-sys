import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import LabSetupSidebar from './LabSetupSidebar';

const LabTestName = () => {

    const [getLabTestName, setGetLabTestName] = useState([]);

    useEffect(() => {
        axios.get(`/lab-test-name`)
        .then(res => {
            if (res.data.status === 200) {
                console.log(res.data.testName)
                setGetLabTestName(res.data.testName);
            }

        });

    }, []);


    const deleteLabTestName = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

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
                console.log("id",id)

                axios.delete(`/delete-lab-test-name-new/${id}`).then(res => {
                    if (res.data.status == 200) {
                         thisClicked.closest("tr").remove();
                        
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
            title: "Test Type Name", field: "type_name.name",
            
           cellStyle: {
                marginLeft: 50,
                width:600
            },
        },
        {
            title: "Name", field: `test_name`

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },
        {
            title: "Action", field: "", render: (row) => <div><Link to={`/edit-lab-test-name/${row.id}`} className="btn btn-info btn-sm action-btn"><i className="fas fa-edit"></i></Link>&nbsp;
                <button className="btn btn-danger btn-sm action-btn" onClick={(e) => deleteLabTestName(e, row.id)} > <i class="fas fa-trash"></i> </button></div>
        },
    ];


    return (
        <>  
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                <LabSetupSidebar/>
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Lab Test Name
                                <Link to='/add_lab_test_name' className="btn btn-primary btn-sm float-end">Add</Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <MaterialTable
                                columns={columns}
                                data={getLabTestName}
                                options={{
                                    searech: true,
                                    showTitle: false,
                                    searechFieldAlignment: "left",
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
    );
};

export default LabTestName;