import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';

const EditItemNumbers = () => {
    const [itemNumbersEdit, setItemNumbersEdit] = useState({
        name: "",
        department: "",
        description: "",
    });

    const [error, setError] = useState([]);
    let navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.get(`/edit-item-numbers-name/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setItemNumbersEdit(res.data.itemNumbersName);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });
        axios.get(`/department`).then((res) => {
            if (res.data.status === 200) {
                setDepartments(res.data.department);
            }
        });

    }, []);


    const handleInput = (e) => {
        setItemNumbersEdit({ ...itemNumbersEdit, [e.target.name]: e.target.value });
    }

    const updateItemNumbers = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.post(`/update-item-numbers/${lastpart}`, itemNumbersEdit).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setItemNumbersEdit({
                    ...itemNumbersEdit,

                });
                setError('');
                navigate(`/item-numbers`);

            } else {
                setError(res.data.errors)
            }
        });

    }

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
                                <h6 className="card-title">Edit Item Numbers
                                    <Link to={'/item-numbers'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="pathologyLabratoryForm" onSubmit={updateItemNumbers}>
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="" className="col-form-label-sm"> Department </label>
                                                <select
                                                    name="department"
                                                    id=""
                                                    className="form-select form-select-sm"
                                                    value={itemNumbersEdit?.department}
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
                                                <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm">Name</label>
                                                <input type="text" value={itemNumbersEdit.name} className="form-control" name="name" onChange={handleInput} />
                                                <span className="text-danger">{error.name}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="" className="col-form-label-sm"> Description </label>
                                                <textarea name="description" value={itemNumbersEdit.description} rows={4} onChange={handleInput} className="form-control" id=""></textarea>

                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Update
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
    );
};

export default EditItemNumbers;