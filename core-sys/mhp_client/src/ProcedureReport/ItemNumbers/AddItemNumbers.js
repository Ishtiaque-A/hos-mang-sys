import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';

const AddItemNumbers = () => {

    const [addItemNumbers, setAddItemNumbers] = useState({
        name: "",
        error_list: [],
        department: "",
        description: "",
    });
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        axios.get(`/department`).then((res) => {
            if (res.data.status === 200) {
                setDepartments(res.data.department);
            }
        });
    }, []);
    const handleInput = (e) => {
        setAddItemNumbers({
            ...addItemNumbers, [e.target.name]: e.target.value
        });
    }
    const saveIndicationName = (e) => {
        e.preventDefault();

        axios.post('/save-itemNumbers', addItemNumbers)
            .then(res => {
                if (res.data.status == 200) {
                    swal("Success", res.data.message, "success");
                    setAddItemNumbers({
                        name: "",
                        error_list: []
                    });

                }
                else if (res.data.status == 400) {
                    setAddItemNumbers({ ...addItemNumbers, error_list: res.data.errors });

                }
            }
            )
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ProcedureReportSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Item Numbers
                                        <Link to={'/item-numbers'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RadiologyTestTypeForm" onSubmit={saveIndicationName}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className="col-form-label-sm"> Department </label>
                                                    <select
                                                        name="department"
                                                        id=""
                                                        className="form-select form-select-sm"
                                                        value={addItemNumbers?.department}
                                                        onChange={handleInput}
                                                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                                                    >
                                                        <option value="">Select</option>
                                                        {departments?.map((item, i) => {
                                                            return (
                                                                <option value={item.id} key={i}>
                                                                    {item?.departments_name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="" className="col-form-label-sm"> Name </label>
                                                    <input type="text" className="form-control" value={addItemNumbers.name} name="name" onChange={handleInput} />
                                                    <span className="text-danger">{addItemNumbers.error_list.name}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="" className="col-form-label-sm"> Description </label>
                                                    <textarea name="description" value={addItemNumbers.description} rows={4} onChange={handleInput} className="form-control" id=""></textarea>
                                                </div>
                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary  text-uppercase float-end mt-2" ><i
                                                        className="fas fa-save"></i> Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default AddItemNumbers;