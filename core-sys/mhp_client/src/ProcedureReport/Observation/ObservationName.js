import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';


const ObservationName = () => {
    const [observationName, setObservationName] = useState([]);

    useEffect(() => {
        axios.get(`/observation-name`)
        .then(res => {
            if (res.data.status === 200) {
                setObservationName(res.data.observationName);
            }
        });

    }, []);

    
    const deleteObservationName= (e, id) => {

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
                axios.delete(`/delete-observation-name/${id}`).then(res => {
                    if (res.data.status === 200) {
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
            title: "Observation Name", field: `name`

            , cellStyle: {
                marginLeft: 50,
                width:600
            },
        },
        {
            title: "Action", field: "", render: (row) => <div><Link to={`/edit-observation-name/${row.id}`} className="btn btn-info btn-sm action-btn"><i className="fas fa-edit"></i></Link>&nbsp;
                <button onClick={(e) => deleteObservationName(e, row.id)}  className="btn btn-danger btn-sm action-btn"> <i class="fas fa-trash"></i> </button></div>
        },
    ];


    return (
        <>  
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                <ProcedureReportSetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Observation Name
                                <Link to='/add-observation-name' className="btn btn-primary btn-sm float-end">Add</Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <MaterialTable
                                columns={columns}
                                data={observationName}
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

export default ObservationName;