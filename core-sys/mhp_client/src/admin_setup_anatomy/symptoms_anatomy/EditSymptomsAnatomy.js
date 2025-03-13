import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Symptoms from '../../admin_setup_mre/symptoms/Symptoms';
import AnatomySetUpSidebar from '../anatomy_setup_mainsidebar/AnatomySetupSidebar';

function EditSymptomsAnatomy() {

    const navigate = useNavigate();

    const [anatomy, setAnatomy] = useState({
        symptom_name: '',
        side_selection_name: "",
        gender_id: "",
        main_body_part_id: "",
        sub_body_part_id: "",

    });

    const [mainBodyParts, setMainBodyParts] = useState([]);
    const [subBodyParts, setSubBodyParts] = useState([]);
    const [genders, setGenders] = useState([]);
    const [updateId, setUpdateId] = useState('');
    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        setUpdateId(lastpart);

        axios.get(`/edit-symptoms-anatomy/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setAnatomy(res.data.edit_anatomy);
                setGenderSelection(res.data.edit_anatomy.gender_id)
                setSideSelect(res.data.edit_anatomy.side_selection_name);

            }


        });

    }, []);


    useEffect(() => {
        axios.get(`/main-body-part`).then(res => {
            if (res.data.status === 200) {
                setMainBodyParts(res.data.MainBodyPart);

            }
        })
        axios.get(`/birth-sex`).then(res => {
            if (res.data.status === 200) {
                setGenders(res.data.birth_sex);

            }
        })
    }, []);

    useEffect(() => {
        axios.get(`/sub-body-part/${anatomy.main_body_part_id}`).then(res => {
            if (res.data.status === 200) {
                setSubBodyParts(res.data.SubBodyParts);

            }
        })
    }, [anatomy]);

    useEffect(() => {
        axios.get(`/sub-body-part/${anatomy.main_body_part_id}`).then(res => {
            if (res.data.status === 200) {
                setSubBodyParts(res.data.SubBodyParts);

            }
        })
    }, [anatomy.main_body_part_id]);



    const handleEditChange = (e) => {
        setAnatomy({
            ...anatomy, [e.target.name]: e.target.value
        })

    }


    const submitSymptomsAnatomy = (e) => {
        e.preventDefault();
        const data = {
            main_body_part_id: anatomy.main_body_part_id,
            sub_body_part_id: anatomy.sub_body_part_id,
            side_selection_name: anatomy.side_selection_name || sideSelect,
            gender_id: anatomy.gender_id || genderSelection,
            symptom_name: anatomy.symptom_name,
        }

        // console.log('update data check',data)

        axios.post(`/update-symptoms-anatomy/${updateId}`, data).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                navigate('/symptoms-anatomy')

                setMainBodyParts([]);
                setSubBodyParts([]);
                setGenders([]);
                setAnatomy('');

            }


        })
    }


    const [genderSelection, setGenderSelection] = useState('');
    const [sideSelect, setSideSelect] = useState('');
    // console.log('side select check', sideSelect)

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <AnatomySetUpSidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Edit Symptoms
                                        <Link to={'/symptoms-anatomy'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="SymptomsAnatomyForm" onSubmit={submitSymptomsAnatomy}>
                                        <div className="card-body">
                                            <div className="col-md-12">

                                                <div>
                                                    <div className="same-line d-flex align-items-center">
                                                        <label htmlFor="inputPassword5"
                                                            className="form-label  col-form-label col-form-label-sm ">Gender</label>

                                                        <div class="form-check pb-2 ">
                                                            <input class="form-check-input mx-2 " type="checkbox" value="both" checked={genderSelection === 'both'} id="flexCheckChecked"
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setGenderSelection(e.target.value)

                                                                        setAnatomy({
                                                                            gender_id: "",

                                                                        })
                                                                    }
                                                                    else {
                                                                        setGenderSelection('')
                                                                    }

                                                                }
                                                                }
                                                            />
                                                            <label class="form-check-label " for="flexCheckChecked">
                                                                Both
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {genderSelection === 'both' ? '' :
                                                        <>
                                                            <select id="inputState" onChange={handleEditChange} value={anatomy.gender_id} name="gender_id"
                                                                className="form-select  col-form-label-sm font-size-patient">
                                                                <option>Select</option>
                                                                {
                                                                    genders !== undefined && genders.map((item) => {
                                                                        return (
                                                                            <option value={item.id} key={item.id}>{item.birth_sex_name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            {/* <span className="text-danger">{errorList.gender_id}</span> */}
                                                        </>
                                                    }


                                                </div>

                                                <div>
                                                    <label htmlFor="inputPassword5"
                                                        className="form-label  col-form-label col-form-label-sm">Main body part name</label>

                                                    <select id="inputState" onChange={handleEditChange} value={anatomy.main_body_part_id} name="main_body_part_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            mainBodyParts !== undefined && mainBodyParts.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.MainBodyPart_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>



                                                <div>
                                                    <label htmlFor="inputPassword5"
                                                        className="form-label  col-form-label col-form-label-sm">Sub body part name</label>

                                                    <select id="inputState" onChange={handleEditChange} value={anatomy.sub_body_part_id} name="sub_body_part_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option >Select</option>
                                                        {subBodyParts !== undefined && subBodyParts.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.SubBodyPart_name}</option>
                                                            )
                                                        })
                                                        }
                                                    </select>
                                                </div>


                                                <div>
                                                    <div className="same-line d-flex align-items-center">
                                                        <label htmlFor="inputPassword5"
                                                            className="form-label  col-form-label col-form-label-sm ">Side Selection</label>

                                                        <div class="form-check pb-2 ">
                                                            <input class="form-check-input mx-2 " type="checkbox" checked={sideSelect === 'all'} value="all" id="flexCheckChecked"
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSideSelect(e.target.value)
                                                                        setAnatomy({
                                                                            side_selection_name: ""
                                                                        })

                                                                    }
                                                                    else {
                                                                        setSideSelect('')
                                                                    }

                                                                }
                                                                }
                                                            />
                                                            <label class="form-check-label " for="flexCheckChecked">
                                                                All
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {sideSelect === 'all' ? '' :
                                                        <>
                                                            <select id="inputState" onChange={handleEditChange} value={anatomy.side_selection_name} name="side_selection_name"
                                                                className="form-select  col-form-label-sm font-size-patient">
                                                                <option selected>Select</option>

                                                                <option value="up">Up</option>
                                                                <option value="down">Down</option>
                                                                <option value="left">Left</option>
                                                                <option value="right">Right</option>

                                                            </select>
                                                            {/* <span className="text-danger">{errorList.side_selection_name}</span> */}
                                                        </>
                                                    }

                                                </div>



                                                <div>
                                                    <label htmlFor="SymptomsAnatomy_name" className="col-form-label-sm">Symptoms name </label>
                                                    <input type="text" value={anatomy.symptom_name} className="form-control p-3" name="symptom_name" onChange={handleEditChange} />
                                                </div>

                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-3"><i
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
    )
}

export default EditSymptomsAnatomy
