import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProcedureReportSetupSidebar from './ProcedureReportSetupSidebar';
import MaterialTable from 'material-table';
import axios from 'axios';
import Swal from 'sweetalert2';


const ProcedureName = () => {

    const [procedureReports, setProcedureReports] = useState([]);

    useEffect(() => {
        axios.get(`/procedure-name-report`)
        .then(res => {
            if (res.data.status === 200) {
                console.log("procedureName",res.data.procedureName)
                setProcedureReports(res.data.procedureName);
            }

        });

    }, []);

    
    const deleteProcedureName = (e, id) => {

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
                axios.delete(`/delete-procedure-name-report/${id}`).then(res => {
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
            title: "Procedure Name", field: `name`

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },
        {
            title: "Action", field: "", render: (row) => <div><Link to={`/edit-procedure-report-name/${row.id}`} className="btn btn-info btn-sm action-btn"><i className="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteProcedureName(e, row.id)}  className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];

    return (
        <>  
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                <ProcedureReportSetupSidebar/>
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Procedure Name
                                <Link to='/add-procedure-report-name' className="btn btn-primary btn-sm float-end">Add</Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <MaterialTable
                                columns={columns}
                                data={procedureReports}
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

export default ProcedureName;