import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import Symptoms from '../../admin_setup_mre/symptoms/Symptoms';
import AnatomySetUpSidebar from '../anatomy_setup_mainsidebar/AnatomySetupSidebar';

function AddSymptomsAnatomy() {

    const [mainBodyParts, setMainBodyParts] = useState([]);
    const [subBodyParts, setSubBodyParts] = useState([]);
    const [genders, setGenders] = useState([]);
    const [MainBodyPart, setMainBodyPart] = useState({
        main_body_part_id: "",
    });
    const [SubBodyPart, setSubBodyPart] = useState({
        sub_body_part_id: "",
    });
    const [sideSelection, setSideSelection] = useState({
        side_selection_name: "",
    });
    const [gender, setGender] = useState({
        gender_id: "",
    });
    const [symptoms, setSymptoms] = useState('');
    const [errorList, setErrorList] = useState([]);

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
        axios.get(`/sub-body-part/${MainBodyPart.main_body_part_id}`).then(res => {
            if (res.data.status === 200) {
                setSubBodyParts(res.data.SubBodyParts);

            }
        })
    }, [MainBodyPart.main_body_part_id]);


    const handleMainBodyChange = (e) => {
        setMainBodyPart({
            main_body_part_id: e.target.value
        })
    }

    const handleSubBodyChange = (e) => {
        setSubBodyPart({
            sub_body_part_id: e.target.value
        })
    }

    const handleSymptomChange = (e) => {
        setSymptoms(e.target.value);
    }

    const handleGenderChange = (e) => {
        setGender({
            gender_id: e.target.value
        })
    }
    const handleSideSelectionChange = (e) => {

        setSideSelection({
            ...sideSelection, [e.target.name]: e.target.value
        })
    }
    const submitSymptomsAnatomy = (e) => {
        e.preventDefault();
        const data = {
            main_body_part_id: MainBodyPart.main_body_part_id,
            sub_body_part_id: SubBodyPart.sub_body_part_id,
            side_selection_name: sideSelection.side_selection_name || sideSelect,
            gender_id: gender.gender_id || genderSelection,
            symptom_name: symptoms,
        }


        axios.post(`/save-symptoms-anatomy`, data).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setErrorList([]);
                setMainBodyPart({
                    main_body_part_id: "",

                });
                // setSubBodyPart('');
                setSymptoms('');
                setGender({
                    gender_id: ''
                });
                setSideSelection({
                    side_selection_name: "",
                });
                setSideSelect('');
                setGenderSelection('');
                var checkboxes = document.querySelectorAll('input[type=checkbox]')
                for (var checkbox of checkboxes) {
                   if (checkbox.checked) {
                      checkbox.checked = false
                   }
                }

            }
            else if (res.data.status == 400) {
                setErrorList(res.data.errors);
            }

        })
    }

    const [genderSelection, setGenderSelection] = useState('');
    const [sideSelect, setSideSelect] = useState('');

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
                                    <h6 className="card-title"> Add Symptoms
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
                                                            <input class="form-check-input mx-2 " type="checkbox" value="both" id="flexCheckChecked"
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setGenderSelection(e.target.value)
                                                                        setGender({
                                                                            gender_id:''
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
                                                            <select id="inputState" onChange={handleGenderChange} value={gender.gender_id} name="gender_id"
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
                                                            <span className="text-danger">{errorList.gender_id}</span>
                                                        </>
                                                    }


                                                </div>

                                                <div>
                                                    <label htmlFor="inputPassword5"
                                                        className="form-label  col-form-label col-form-label-sm">Main body part name</label>

                                                    <select id="inputState" onChange={handleMainBodyChange} value={MainBodyPart.main_body_part_id} name="main_body_part_id"
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
                                                    <span className="text-danger">{errorList.main_body_part_id}</span>

                                                </div>

                                                <div>
                                                    <label htmlFor="inputPassword5"
                                                        className="form-label  col-form-label col-form-label-sm">Sub body part name</label>

                                                    <select id="inputState" onChange={handleSubBodyChange} value={SubBodyPart.sub_body_part_id} name="sub_body_part_id"
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
                                                            <input class="form-check-input mx-2 " type="checkbox" value="all" id="flexCheckChecked"
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSideSelect(e.target.value)
                                                                        setSideSelection({
                                                                            side_selection_name:""
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
                                                            <select id="inputState" onChange={handleSideSelectionChange} value={sideSelection.side_selection_name} name="side_selection_name"
                                                                className="form-select  col-form-label-sm font-size-patient">
                                                                <option selected>Select</option>

                                                                <option value="up">Up</option>
                                                                <option value="down">Down</option>
                                                                <option value="left">Left</option>
                                                                <option value="right">Right</option>

                                                            </select>
                                                            <span className="text-danger">{errorList.side_selection_name}</span>
                                                        </>
                                                    }



                                                    <div>
                                                        <label htmlFor="SymptomsAnatomy_name" className="col-form-label-sm">Symptoms name </label>
                                                        <input type="text" value={symptoms} className="form-control p-3" name="symptom_name" onChange={handleSymptomChange} />
                                                    </div>
                                                    <span className="text-danger">{errorList.symptom_name}</span>


                                                    <div className="float-right">
                                                        <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-3"><i
                                                            className="fas fa-save"></i> Save
                                                        </button>
                                                    </div>
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

export default AddSymptomsAnatomy
