
// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import swal from "sweetalert";
// import BillingSetupSidebar from '../../admin_setup_billing/billing_setup_sidebar/BillingSetUpSidebar';
// class EditProcedure extends Component {
//     state = {
//         id: '',
//         procedure_name: '',
//         error_list: [],
//     }


//     handleInput = (e, id) => {
//         this.setState({
//             [e.target.name]: e.target.value,
//         });
//     }


//     async componentDidMount() {

//         var url = window.location.href;
//         var urlsplit = url.split("/");
//         var lastpart = urlsplit[urlsplit.length - 1];
//         if (lastpart === '') {
//             lastpart = urlsplit[urlsplit.length - 2];
//         }
//         // const reaction_id = this.props.match.params.id;
//         // console.log(reaction_id);
//         const res = await axios.get(`/edit-procedure-name/${lastpart}`);

//         console.log(res);
//         if (res.data.status === 200) {
//             this.setState({
//                 procedure_name: res.data.procedureName.procedure_name,
//             });
//         } else if (res.data.status === 404) {
//             // swal({
//             //     title: "Warning!",
//             //     text: res.data.message,
//             //     icon: "warning",
//             //     button: "Ok",
//             // });
//             // this.props.history.push('/frequency-name');
//         }
//     }

//     //Update Edit Data
//     updateProcedureName = async (e, id) => {
//         e.preventDefault();

//         var url = window.location.href;
//         var urlsplit = url.split("/");
//         var lastpart = urlsplit[urlsplit.length - 1];
//         if (lastpart === '') {
//             lastpart = urlsplit[urlsplit.length - 2];
//         }
//         const res = await axios.put(`/update-procedure-name/${lastpart}`, this.state);

//         if (res.data.status === 200) {
//             swal("Success", res.data.message, "success");

//             // console.log(res);
//             this.setState({
//                 // procedure_name: '',
//                 error_list: [],
//             });
//             //  this.props.history.push('/frequencyName');
//         } else if (res.data.status === 404) {
//             // swal({
//             //     title: "Warning!",
//             //     text: res.data.message,
//             //     icon: "warning",
//             //     button: "Ok",
//             // });
//             // this.props.history.push('/FrequencyName');
//         } else {
//             this.setState({
//                 error_list: res.data.validate_error,
//             });
//         }
//     }

//     render() {
//         return (
//             <>

//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-3">
//                         <BillingSetupSidebar/>
//                         </div>
//                         <div className="col-md-9 mt-2">
//                             <div className="card">
//                                 <div className="card-header">
//                                     <h6 className="card-title">Porcedure Name
//                                         <Link to={'/procedure-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
//                                     </h6>

//                                 </div>
//                                 <div className="card-body">
//                                     <form onSubmit={this.updateProcedureName}>
//                                         <div className="card-body">
//                                             <div className="col-md-12">
//                                                 <div className="form-group">
//                                                     <label htmlFor="procedure_name" className="col-form-label-sm">Procedure Name</label>
//                                                     <input type="text" onChange={this.handleInput} value={this.state.procedure_name} className="form-control form-control-sm" name="procedure_name" />
//                                                     <span className="text-danger">{this.state.error_list.procedure_name}</span>
//                                                 </div>
//                                                 <div className="float-right">
//                                                     <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
//                                                         className="fas fa-save"></i> Update
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </>

//         );
//     }
// }

// export default EditProcedure;
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import BillingSetupSidebar from '../../admin_setup_billing/billing_setup_sidebar/BillingSetUpSidebar';
import { useState } from 'react';
import { useEffect } from 'react';

export default function EditProcedure() {
    const [procedure_name, setProcedureName] = useState({
        procedure_name: "",
        accounts_id: "",
        accounts_type_id: "",
        accounts_group_id: ''
    });
    const [accounts, setAccounts] = useState([]);
    const [accountsType, setAccountsType] = useState([]);
    const [accountsGroup, setAccountsGroup] = useState([]);

    //all-doctors
    useEffect(() => {
        axios.get(`/all-accounts-type`).then(res => {
            if (res.data.status === 200) {
                setAccountsType(res.data.accounts);
            }

        });
        axios.get(`/all-accounts`).then(res => {
            if (res.data.status === 200) {
                setAccounts(res.data.accounts);
            }

        });
        axios.get(`/all-doctorFee`).then(res => {
            if (res.data.status === 200) {
                setAccountsGroup(res.data.doctorFees);
            }
        })
        axios.get(`/edit-procedure-name/${params.id}`).then(res => {
            if (res.data.status === 200) {
                setProcedureName(res.data.procedureName);
            }
        })

    }, []);
    const handleInput = (e) => {
        setProcedureName({
            ...procedure_name, [e.target.name]: e.target.value
        });
    }
    const params = useParams()
    const saveProcedureName = async (e) => {
        e.preventDefault();
        const res = await axios.put(`/update-procedure-name/${params.id}`, procedure_name);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res.data.message);
            setProcedureName({
                procedure_name: '',
            })
        }

    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <BillingSetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className='card'>
                        <div className="card-header">
                            <h6 className="card-title">Add  Procedure Name

                                <Link to={"/procedure-name"} className="btn btn-primary btn-sm float-end">Back</Link>

                            </h6>

                        </div>
                        <div className="card-body">
                            <form onSubmit={saveProcedureName}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <label className='mb-1'>Account</label>
                                        <select name='accounts_id' value={procedure_name.accounts_id} onChange={handleInput} className="form-select form-select-sm mb-2" aria-label="Default select example">
                                            <option selected>Select</option>
                                            {
                                                accounts.map((item, index) => {
                                                    return (
                                                        <option value={item.id} key={index}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <label className='mb-1'>Accounts Type</label>
                                        <select name='accounts_type_id' value={procedure_name.accounts_type_id} onChange={handleInput} className="form-select form-select-sm mb-2" aria-label="Default select example">
                                            <option selected>Select</option>
                                            {
                                                accountsType.map((item, index) => {
                                                    return (
                                                        <option value={item.id} key={index}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {/* <label htmlFor="inputPassword4"
                                            className="form-label  col-form-label col-form-label-sm">Accounts Group</label>

                                        <select id="inputState" onChange={handleInput} value={procedure_name.accounts_group_id} name="accounts_group_id"
                                            className="form-select  col-form-label-sm font-size-patient">
                                            <option selected>Select</option>
                                            {
                                                accountsGroup.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.fee_name}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                        <div className="form-group">
                                            <label htmlFor="procedure_name" className="col-form-label-sm">Procedure Name</label>
                                            <input type="text" className="form-control form-control-sm" onChange={handleInput} value={procedure_name.procedure_name} name="procedure_name" />
                                        </div>

                                        <div className="float-right">
                                            <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
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
    )
}
