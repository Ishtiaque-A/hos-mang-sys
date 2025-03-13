import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const StepThree = (props) => {
    console.log('props data check', props)
    const { id } = useParams();
    console.log('id check', id)
    const [showBackMan, setShowBackMan] = useState(false);
    const [showBackWoman, setShowBackWoman] = useState(false);

    const gender = props.gender.birth_sex_name;

    const [symptoms, setSymptoms] = useState([]);

    console.log('symptom array check', symptoms)

    // const symptomListHead = [
    //     { name: "Headache", category: "head" },
    //     { name: "Sinus pain or pressure", category: "head" },
    //     { name: "Swollen face", category: "head" },
    //     { name: "Impaired memory", category: "head" },
    //     { name: "Dizzy", category: "head" },
    //     { name: "Hair loss", category: "head" },
    //     { name: "Feeling sick or queasy", category: "head" },
    //     { name: "Recent head injury", category: "head" },
    //     { name: "Facial muscle weakness", category: "head" },
    //     { name: "Fever", category: "head" },
    //     { name: "Face tingling or numbness", category: "head" },
    //     { name: "Face pain", category: "head" },
    // ]
    const symptomListThrot = [
        { name: "Sore throat", category: "throt" },
        { name: "Sinus pain or pressure", category: "throt" },
        { name: "Swollen face", category: "throt" },
        { name: "Impaired memory", category: "throt" },
        { name: "Dizzy", category: "throt" },
        { name: "Hair loss", category: "throt" },
        { name: "Feeling sick or queasy", category: "throt" },
        { name: "Recent head injury", category: "throt" },
        { name: "Facial muscle weakness", category: "throt" },
        { name: "Fever", category: "throt" },
        { name: "Face tingling or numbness", category: "throt" },
        { name: "Face pain", category: "throt" },
    ]
    // const [headSymptom, setHeadSymptom] = useState(symptomListHead);
    const [throtSymptom, setThrotSymptom] = useState(symptomListThrot);

    const addSymptom = (symp, index) => {
        console.log('add symptom clicked', symp.symptom_name)
        console.log('symptom array check', symptoms)

        const newSymptom = [...symptoms];
        // const newHeadSymptoms = [...headSymptom];
        // const newThrotSymptoms = [...throtSymptom];
        newSymptom.push(symp.symptom_name);
        setSymptoms(newSymptom)

        // console.log('push data check',symptoms)
        // setSymptoms(newSymptom);
        // if (symp.category === "head") {
        //     newHeadSymptoms.splice(index, 1);
        //     setHeadSymptom(newHeadSymptoms);
        // } else if (symp.category === "throt") {
        //     newThrotSymptoms.splice(index, 1);
        //     setThrotSymptom(newThrotSymptoms)
        // }
    }
    // const removeSymptom = (index, symptom) => {
    //     const newSymptoms = [...symptoms];
    //     const newHeadSymptoms = [...headSymptom];
    //     const newThrotSymptoms = [...throtSymptom];
    //     newSymptoms.splice(index, 1);
    //     setSymptoms(newSymptoms);
    //     if (symptom.category === "head") {
    //         newHeadSymptoms.push(symptom);
    //         setHeadSymptom(newHeadSymptoms)
    //         console.log(symptoms)
    //     }
    //     else if (symptom.category === "throt") {
    //         newThrotSymptoms.push(symptom);
    //         setThrotSymptom(newThrotSymptoms)
    //     }
    // }
    const removeSymptom = (index, symptom) => {
        console.log('symptom clicked removed name', symptom)
        const filtered = symptoms.filter((item) => {
            return item !== symptom;
        })
        console.log('filtered array', filtered)
        setSymptoms(filtered)
    }
    //head and head all sub body parts
    const [allSubBodyParts, setallSubBodyParts] = useState([]);
    const [headSubBodyPartId, setHeadSubBodyPartId] = useState('');
    const [headSubBodySymptoms, setHeadSubBodySymptoms] = useState([]);
    // console.log('get individual sub body part id',headSubBodyPartId)
    console.log('sub body parts symptoms', headSubBodySymptoms)
    useEffect(() => {
        axios.get(`/sub-body-parts/head`).then(res => {
            if (res.data.status === 200) {
                setallSubBodyParts(res.data.allSubBodyParts);
            }

        });

    }, []);

    useEffect(() => {
        axios.get(`/get-all-sub-body-part-symptoms-by-subId/${headSubBodyPartId}`).then(res => {
            if (res.data.status === 200) {
                setHeadSubBodySymptoms(res.data.getSubBodyAllSymptoms);
            }

        });

    }, [headSubBodyPartId]);


    //neck or throat
    const [neckSymptoms, setNeckSymptoms] = useState([]);
    console.log('neck throat data', neckSymptoms)
    useEffect(() => {
        axios.get(`/get-symptoms-by-main-body-part-name/Neck`).then(res => {
            if (res.data.status === 200) {
                setNeckSymptoms(res.data.allSymptomsByMainBodyName);
            }

        });

    }, []);

    //chest and shoulder

    const [chestSymptoms, setChestSymptoms] = useState([]);
    console.log('chest symptoms', chestSymptoms)

    const [shoulderSymptoms, setShoulderSymptoms] = useState([]);
    const [armSymptoms, setArmSymptoms] = useState([]);
    const [foreArmSymptoms, setForeArmSymptoms] = useState([]);
    const [wristSymptoms, setWristSymptoms] = useState([]);
    const [hipSymptoms, setHipSymptoms] = useState([]);
    const [footSymptoms, setFootSymptoms] = useState([]);
    const [kneeSymptoms, setKneeSymptoms] = useState([]);
    const [legSymptoms, setLegSymptoms] = useState([]);
    const [thighSymptoms, setThighSymptoms] = useState([]);
    const [waistSymptoms, setWaistSymptoms] = useState([]);
    const [abdomenSymptoms, setAbdomenSymptoms] = useState([]);
    const [lowerAbdomenSymptoms, setLowerAbdomenSymptoms] = useState([]);
    const [femalelowerAbdomenSymptoms, setfemalelowerAbdomenSymptoms] = useState([]);

    const [backSymptoms, setBackSymptoms] = useState([]);

    console.log('foot Symptoms ', footSymptoms)

    useEffect(() => {
        axios.get(`/get-symptoms-by-main-body-part-name/chest`).then(res => {
            if (res.data.status === 200) {
                setChestSymptoms(res.data.allSymptomsByMainBodyName);
            }

        });
        axios.get(`/get-symptoms-by-main-body-part-name/shoulder`).then(res => {
            if (res.data.status === 200) {
                setShoulderSymptoms(res.data.allSymptomsByMainBodyName);
            }
        });

        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/arm`).then(res => {
            if (res.data.status === 200) {
                setArmSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/forearm`).then(res => {
            if (res.data.status === 200) {
                setForeArmSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/wrist`).then(res => {
            if (res.data.status === 200) {
                setWristSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/hip`).then(res => {
            if (res.data.status === 200) {
                setHipSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/foot`).then(res => {
            if (res.data.status === 200) {
                setFootSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/knee`).then(res => {
            if (res.data.status === 200) {
                setKneeSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/leg`).then(res => {
            if (res.data.status === 200) {
                setLegSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/thigh`).then(res => {
            if (res.data.status === 200) {
                setThighSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/waist`).then(res => {
            if (res.data.status === 200) {
                setWaistSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/abdomen`).then(res => {
            if (res.data.status === 200) {
                setAbdomenSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/lower`).then(res => {
            if (res.data.status === 200) {
                setLowerAbdomenSymptoms(res.data.LowerAbdomenForAll);
            }
        })
        axios.get(`/patient-symptoms-by-sub-or-main-body-partname/back`).then(res => {
            if (res.data.status === 200) {
                setBackSymptoms(res.data.getAllSymptoms);
            }
        })
        axios.get(`/female-symptoms-by-sub-or-main-body-partname/lower`).then(res => {
            if (res.data.status === 200) {
                setfemalelowerAbdomenSymptoms(res.data.getAllSymptoms);
            }
        })


    }, []);





    const popover = (

        <Popover id="popover-basic">
            {/* <Popover.Header as="h6">Head</Popover.Header> */}
            <ul class="nav nav-tabs d-flex justify-content-between fw-bold " style={{ background: '#FAF9F6' }}>
                {allSubBodyParts.map((item, i) => {
                    return (
                        <li class="nav-item flex-fill" key={i} id={item.id} onClick={() => setHeadSubBodyPartId(item.id)}>
                            <a class="nav-link active" aria-current="page" href="#">{item.SubBodyPart_name}</a>
                        </li>
                    )
                })}
            </ul>
            {/* <hr/> */}

            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            headSubBodySymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>

    );

    const popover1 = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Neck or throat</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            throtSymptom.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    );

    const popoverNeck = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Neck or throat</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            neckSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    );

    const popoverChest = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Chest</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            chestSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    );
    const popoverShoulder = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Shoulder</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            shoulderSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const saveSymptoms = (symptoms) => {
        console.log(symptoms)
        const data = {
            symptoms: symptoms,
            patient_id: id
        }
        axios.post(`/save-patient-symptom-anatomy`, data).then(res => {
            if (res.data.status == 200) {
                setSymptoms([]);
                toast.success(res.data.message)
            }
        });
    }

    const popoverBack = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Shoulder</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            shoulderSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverArm = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Arm</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            armSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverForeArm = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">ForeArm</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            foreArmSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )

    const popoverElbow = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Elbow</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            foreArmSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverWrist = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Wrist</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            wristSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverHip = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Hip</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            hipSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverFoot = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Foot</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            footSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverKnee = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Knee</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            kneeSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverLeg = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Leg</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            legSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverThigh = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Thigh</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            thighSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverWaist = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Waist</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            waistSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverAbdomen = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Abdomen (Upper)</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            abdomenSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )

    const popoverLowerAbdomen = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Abdomen/Pelvis (Lower)</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            lowerAbdomenSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverLowerAbdomenLast = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Abdomen/Pelvis (Lower) Female</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            femalelowerAbdomenSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    const popoverBack1 = (
        <Popover id="popover-basic">
            <Popover.Header as="h6">Back</Popover.Header>
            <Popover.Body>
                <div className="symptom-popup">
                    <ul>
                        {
                            backSymptoms.map((symp, index) => <li onClick={() => addSymptom(symp, index)}>{symp.symptom_name}</li>)
                        }

                    </ul>
                </div>
            </Popover.Body>
        </Popover>
    )
    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <h4>Add Symptoms</h4>
                    <p>Please click on the body. Add as many symptoms as you can for the most accurate results.</p>
                    {/* <input type="text" className="form-control form-control-s" placeholder='search' /> */}
                    <div className="symptoms mt-3 p-3 bg-light mb-3">
                        {
                            symptoms.map((symptom, index) => <div className='me-1 symptom d-inline-flex mb-2'>{symptom}<i onClick={() => removeSymptom(index, symptom)} className="far fa-times-circle ms-1"></i></div>)
                        }
                    </div>
                </div>
                <div className="col-6 text-center">
                    {
                        gender.toLowerCase() === "male" ?
                            <>
                                {
                                    showBackMan ?
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 18 250 260">
                                            {/* head part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popover}>
                                                <path className="anatomy-bg" d="m 115.42488,44.187071 c -1.05686,-0.07291 -2.81102,-0.162909 -4.15638,-0.213237 -0.90355,-0.0338 -3.61571,-0.03373 -4.55539,2.01e-4 -0.94608,0.03408 -2.08901,0.08528 -2.81471,0.126098 l -0.57582,0.03239 -0.0968,-0.09437 c -0.43417,-0.423244 -1.03558,-1.799035 -1.66279,-3.803844 -0.26243,-0.838834 -0.66903,-2.233214 -0.82238,-2.820236 l -0.024,-0.09202 -0.0941,0.03297 c -0.12757,0.04471 -0.3755,0.02821 -0.49408,-0.03288 -0.1251,-0.06445 -0.259724,-0.218884 -0.35292,-0.404849 -0.100996,-0.201524 -0.14512,-0.321101 -0.255387,-0.692063 -0.119132,-0.400806 -0.157843,-0.494649 -0.477757,-1.15834 -0.417141,-0.865373 -0.504976,-1.163863 -0.50475,-1.715233 0,-0.280195 0.0089,-0.377367 0.04632,-0.515539 0.09897,-0.364919 0.294019,-0.626501 0.562188,-0.753947 0.190635,-0.0906 0.347912,-0.118819 0.595279,-0.106822 l 0.210685,0.01022 -0.0075,-0.402899 c -0.01435,-0.765526 0.05453,-2.13095 0.153492,-3.042575 0.28062,-2.585001 0.90289,-4.778993 1.75837,-6.199599 1.01678,-1.688447 2.53464,-2.799172 4.52421,-3.310681 0.97566,-0.250836 1.87348,-0.328033 3.5357,-0.304012 1.66806,0.0241 2.33926,0.08816 3.20318,0.305678 2.39742,0.603637 4.1452,2.275278 5.08832,4.866659 0.50539,1.38863 0.86437,3.305181 1.00716,5.377055 0.047,0.682053 0.0848,2.026921 0.0673,2.397619 l -0.0148,0.314832 0.24003,-0.01089 c 0.40863,-0.01854 0.65487,0.06736 0.88347,0.308192 0.39256,0.413565 0.46152,1.221638 0.17488,2.049149 -0.0801,0.231284 -0.15811,0.411295 -0.45269,1.044657 -0.0883,0.189901 -0.20023,0.470576 -0.24867,0.623721 -0.0484,0.153146 -0.12268,0.387812 -0.16499,0.52148 -0.10097,0.319058 -0.20778,0.527811 -0.34424,0.672806 -0.14782,0.15706 -0.24765,0.194358 -0.48714,0.182002 -0.10155,-0.0052 -0.19779,-0.01382 -0.21387,-0.01907 -0.0215,-0.007 -0.078,0.184655 -0.21381,0.725562 -0.69626,2.773124 -1.38933,4.615605 -2.12833,5.658042 -0.1349,0.190299 -0.40557,0.480902 -0.44327,0.475919 -0.0125,-0.0016 -0.21229,-0.01608 -0.44394,-0.03207 z" />
                                            </OverlayTrigger>
                                            {/* throt part samne*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverNeck}>
                                                <path className="anatomy-bg" d="m 115.14593,51.91769 c -1.45528,-0.09965 -2.8731,-0.177988 -4.29861,-0.237498 -0.88802,-0.03707 -4.01401,-0.03715 -4.96548,-2e-4 -1.0186,0.03964 -2.58244,0.112586 -2.72456,0.127097 l -0.1199,0.01224 0.0141,-0.752418 c 0.0148,-0.793534 0.0464,-1.467417 0.13794,-2.946579 0.0743,-1.199904 0.25357,-3.704721 0.26608,-3.717291 0.0208,-0.02096 1.9519,-0.114021 3.33523,-0.160733 0.40843,-0.01379 1.40097,-0.02515 2.20565,-0.02524 1.99732,-2e-4 3.06231,0.03835 6.31769,0.22879 0.21946,0.01284 0.43044,0.02815 0.46886,0.03403 l 0.0698,0.01069 0.0139,0.272283 c 0.008,0.149756 0.063,1.715753 0.12302,3.479993 0.06,1.76424 0.11457,3.325492 0.12117,3.469449 l 0.012,0.26174 -0.11619,-0.0027 c -0.0639,-0.0015 -0.45119,-0.02566 -0.86065,-0.0537 z" />
                                            </OverlayTrigger>
                                            {/* nape of neck part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverShoulder}>
                                                <path className="anatomy-bg" d="m 95.797132,55.865572 c 1.041075,-0.525733 2.132486,-1.132689 3.108835,-1.728885 0.601963,-0.367578 0.81961,-0.484038 2.209893,-1.182499 0.73762,-0.370571 1.41594,-0.716119 1.50738,-0.767888 l 0.16626,-0.09413 0.98644,-0.04814 c 4.32394,-0.210998 6.35039,-0.185666 11.37604,0.142209 l 1.19014,0.07765 0.35049,0.200983 c 0.35046,0.200967 0.75277,0.405029 2.6448,1.341522 0.55474,0.274578 1.33281,0.67987 1.72905,0.900651 0.85007,0.473647 1.72341,0.946956 2.25471,1.221941 0.20986,0.108619 0.37944,0.199426 0.37685,0.201796 -0.003,0.0024 -0.23915,-0.0092 -0.52566,-0.0258 -1.09246,-0.06314 -2.92722,-0.150754 -4.16746,-0.199001 -1.88039,-0.07315 -3.88888,-0.124516 -6.17594,-0.157941 l -0.99987,-0.01461 -0.0238,-0.103818 c -0.16033,-0.697997 -0.80726,-1.245772 -1.70052,-1.439891 -0.22389,-0.04866 -0.67215,-0.06582 -0.90419,-0.03462 -0.77545,0.104264 -1.43567,0.492274 -1.75092,1.029011 -0.0818,0.139297 -0.19339,0.447086 -0.19339,0.533471 0,0.03691 -0.0158,0.04342 -0.1053,0.04354 -0.20621,2.68e-4 -2.11356,0.04424 -2.89838,0.06679 -2.6672,0.07666 -5.756757,0.215235 -8.456838,0.37932 -0.396239,0.02408 -0.729766,0.04379 -0.741171,0.0438 -0.01141,9e-6 0.322761,-0.173452 0.742601,-0.385468 z" />

                                            </OverlayTrigger>
                                            {/* back part pit */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverBack1}>
                                                <path className="anatomy-bg" d="m 95.197071,95.955086 c -6.65e-4,-1.996124 -0.399032,-4.409223 -1.529965,-9.264211 -0.159817,-0.686089 -0.345072,-1.488016 -0.411674,-1.782056 -0.130131,-0.574548 -0.198973,-0.837252 -0.354967,-1.354609 -0.09736,-0.322916 -0.100378,-0.342316 -0.141975,-0.913308 -0.127744,-1.753401 -0.275631,-4.144835 -0.353598,-5.717942 -0.107634,-2.171632 -0.134194,-3.086778 -0.148725,-5.123426 -0.0264,-3.701589 0.08494,-6.1083 0.603372,-13.042456 0.06779,-0.906623 0.127618,-1.669826 0.132958,-1.696009 0.0071,-0.03461 0.03245,-0.05182 0.09304,-0.06307 0.121506,-0.02255 0.621215,-0.192788 0.938769,-0.31982 l 0.275098,-0.110049 0.399012,-0.02486 c 3.487418,-0.217276 6.626884,-0.363093 9.642794,-0.44787 0.90628,-0.02548 2.74821,-0.06663 2.99507,-0.06692 l 0.15766,-2e-4 0.0149,-0.165752 c 0.0484,-0.536727 0.32991,-0.905948 0.91594,-1.201351 0.66529,-0.335362 1.50138,-0.345085 2.17322,-0.02528 0.40234,0.191522 0.65032,0.38891 0.79776,0.635006 0.0733,0.12239 0.15617,0.39672 0.17321,0.573601 l 0.0156,0.161499 0.21327,2.68e-4 c 0.4657,5.34e-4 3.10397,0.04475 3.97063,0.06653 2.53073,0.0636 5.19432,0.174495 7.72532,0.32162 l 0.88669,0.05154 0.1995,0.09441 c 0.27564,0.130441 0.82116,0.356464 1.08062,0.447734 0.17605,0.06193 0.2161,0.08427 0.21613,0.120566 0,0.0245 0.0647,0.891587 0.14372,1.926853 0.39854,5.221332 0.54268,7.685234 0.6125,10.469605 0.0281,1.120613 0.0145,4.22635 -0.0232,5.279354 -0.0912,2.551419 -0.19575,4.446761 -0.45575,8.264308 -0.0556,0.816068 -0.0914,1.211499 -0.12426,1.369959 -0.0254,0.122515 -0.20047,0.889358 -0.38912,1.704096 -0.97222,4.198837 -1.35391,6.221939 -1.53817,8.152927 -0.0134,0.140898 -0.0299,0.661068 -0.0366,1.155938 l -0.0122,0.899769 -0.2134,-0.01382 c -3.71502,-0.240625 -6.13766,-0.353095 -9.45718,-0.439028 -0.47548,-0.01231 -1.87203,-0.02848 -3.10342,-0.03591 -3.62198,-0.02189 -6.73765,0.04741 -10.70682,0.238139 -1.452823,0.06981 -4.428494,0.243438 -5.192708,0.302988 l -0.182881,0.01425 v -0.443011 z" />
                                            </OverlayTrigger>
                                            {/*upper arm  part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverArm}>
                                                <path className="anatomy-bg" d="m 128.40385,93.264968 c 0,-0.0057 -0.46907,-1.983441 -1.04237,-4.394903 l -1.04236,-4.38449 0.078,-1.10265 c 0.3918,-5.539352 0.5213,-8.459684 0.52108,-11.750459 0,-3.460771 -0.13476,-6.137711 -0.64183,-12.771572 -0.0718,-0.938887 -0.12781,-1.709755 -0.12454,-1.713041 0.0122,-0.01227 0.83966,0.22333 1.31873,0.375476 0.49407,0.156917 1.27791,0.427991 1.97517,0.68307 0.79907,0.292332 1.9469,0.722209 2.07264,0.776228 0.0731,0.03143 0.24957,0.105908 0.39205,0.165511 1.70899,0.714945 3.25891,2.087815 4.28441,3.794998 0.2384,0.396874 0.79257,1.453186 0.99429,1.895222 0.63524,1.392058 0.93419,2.712051 1.03674,4.577668 0.0172,0.313319 0.0218,0.814003 0.0132,1.447926 -0.013,0.957762 -0.0261,1.212641 -0.13544,2.628537 -0.08,1.036077 -0.1264,1.804076 -0.19175,3.174295 -0.0128,0.269542 -0.0289,1.161686 -0.0357,1.982545 -0.0136,1.646323 0,2.096899 0.10385,3.508432 0.11836,1.604202 0.2724,4.132919 0.43219,7.09483 0.0861,1.596698 0.18238,3.45066 0.17942,3.456207 -0.001,0.0019 -0.33104,-0.0051 -0.73337,-0.01559 -2.66321,-0.06939 -4.76137,0.0272 -7.55906,0.347969 -0.6686,0.07666 -1.7356,0.20637 -1.82327,0.221653 -0.0396,0.0069 -0.072,0.0079 -0.072,0.0021 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverArm}>
                                                <path className="anatomy-bg" d="m 88.968169,93.226649 c -2.205505,-0.283268 -3.701807,-0.425991 -5.397747,-0.514871 -0.322781,-0.01691 -1.148822,-0.02804 -2.100353,-0.0283 l -1.568343,-6.69e-4 v -0.120877 c 7e-6,-0.634137 0.437411,-8.119132 0.598246,-10.237349 0.06769,-0.89151 0.08744,-1.32592 0.102692,-2.258709 0.02705,-1.654095 -0.06576,-3.990817 -0.257569,-6.48453 -0.09405,-1.222766 -0.110626,-1.599932 -0.110639,-2.517156 0,-2.578504 0.32975,-4.157398 1.312064,-6.281764 0.133137,-0.287918 0.323273,-0.713942 0.422527,-0.946722 0.605474,-1.420019 1.20906,-2.391536 1.944552,-3.129882 0.731887,-0.734727 1.544861,-1.164607 2.715914,-1.436111 0.724852,-0.168052 0.773964,-0.183534 1.307875,-0.412273 1.426681,-0.611218 3.016617,-1.223638 3.923617,-1.511325 0.4875,-0.154628 0.834022,-0.253487 0.846072,-0.241378 0.0055,0.0056 -0.04541,0.740444 -0.113246,1.633042 -0.337498,4.441075 -0.45905,6.414478 -0.571279,9.274632 -0.03833,0.97676 -0.0384,5.195472 0,6.237209 0.09782,2.661263 0.273849,5.804176 0.480324,8.576171 l 0.0307,0.412097 -0.904533,3.775748 c -0.497495,2.076657 -1.042825,4.354585 -1.211839,5.062058 l -0.307313,1.286318 -0.0665,-0.003 c -0.03658,-0.0017 -0.520378,-0.06133 -1.075117,-0.132572 z" />
                                            </OverlayTrigger>
                                            {/*elbo  part konu er dan pash*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverElbow}>
                                                <path className="anatomy-bg" d="m 83.570422,102.64961 c -0.575449,-0.0237 -1.135508,-0.0582 -1.80664,-0.11125 -0.867778,-0.0687 -2.77953,-0.26599 -2.801123,-0.28914 -0.01177,-0.0126 0.05493,-0.32913 0.276076,-1.31006 0.264618,-1.173723 0.357515,-1.651819 0.439891,-2.263924 0.07528,-0.559304 0.08991,-0.908683 0.09005,-2.149612 0,-1.096843 0.01921,-1.765497 0.08899,-3.116971 0.01229,-0.238005 0.02571,-0.436128 0.02983,-0.440265 0.0041,-0.0041 0.475357,-0.01375 1.047187,-0.02135 2.150701,-0.0286 3.976414,0.07457 6.592615,0.372542 0.892424,0.101644 2.485146,0.305193 2.499291,0.319401 0.0069,0.0069 -0.06981,0.356029 -0.170431,0.775777 -0.680694,2.839378 -0.700771,2.98343 -0.811032,5.819782 -0.08334,2.14387 -0.09299,2.33252 -0.120122,2.34937 -0.01465,0.009 -0.237871,0.0235 -0.496039,0.0319 -0.258174,0.008 -0.758688,0.0247 -1.112259,0.0361 -0.751904,0.0242 -3.137032,0.0227 -3.746276,-0.002 z" />
                                            </OverlayTrigger>
                                            {/* {elbow parts} */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverElbow}>
                                                <path className="anatomy-bg" d="m 130.22157,102.64867 c -0.35966,-0.0113 -0.66462,-0.0243 -0.67768,-0.0289 -0.0249,-0.009 -0.0494,-0.45804 -0.10979,-2.01765 -0.13707,-3.538346 -0.15653,-3.69946 -0.74112,-6.136971 -0.12047,-0.502321 -0.21236,-0.919357 -0.20421,-0.926748 0.008,-0.0074 0.31908,-0.0501 0.69094,-0.09491 2.20125,-0.265277 3.49506,-0.384029 5.05415,-0.463895 0.61002,-0.03125 3.40041,-0.03752 3.99398,-0.009 l 0.36963,0.01777 0.0131,0.159202 c 0.0437,0.530308 0.0812,1.828722 0.0809,2.79888 -6.6e-4,2.070322 0.0462,2.469896 0.55214,4.711322 0.18756,0.83099 0.31037,1.41682 0.31037,1.48058 0,0.0321 -0.13426,0.0517 -1.04741,0.15258 -1.65723,0.1831 -2.56347,0.2634 -3.84049,0.3403 -0.52402,0.0316 -3.60977,0.0436 -4.44455,0.0174 z" />
                                            </OverlayTrigger>
                                            {/*lower back  part backpart komor */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWaist}>
                                                <path className="anatomy-bg" d="m 109.17369,115.85841 c -0.34188,-0.0499 -0.74459,-0.20123 -0.99343,-0.37327 -0.1709,-0.11817 -0.34292,-0.29036 -0.44657,-0.44703 -0.1042,-0.1575 -0.23956,-0.47991 -0.27892,-0.66433 l -0.0229,-0.10715 -0.34831,0.006 c -4.78099,0.0852 -9.380415,0.29104 -14.524324,0.6499 -0.310896,0.0217 -0.569676,0.0359 -0.575062,0.0316 -0.0087,-0.007 0.0906,-0.55991 0.545037,-3.03619 0.250047,-1.36249 0.433433,-1.9919 1.031818,-3.54129 0.749411,-1.94043 0.918479,-2.49666 1.13739,-3.74195 0.419608,-2.38699 0.440955,-2.6524 0.477345,-5.9361 0.01234,-1.114171 0.0247,-2.027787 0.02746,-2.030253 0.01729,-0.01547 3.258152,-0.210913 4.7599,-0.287043 8.297586,-0.420657 14.858396,-0.370136 23.488226,0.180875 l 0.60046,0.03834 0.0149,1.660965 c 0.0289,3.212536 0.064,3.682156 0.43776,5.848806 0.25149,1.45799 0.39077,1.94816 1.00648,3.54184 0.76664,1.9844 0.95505,2.59852 1.17552,3.83144 0.0438,0.24502 0.19875,1.09338 0.3443,1.88521 0.14555,0.79184 0.26463,1.45358 0.26463,1.47055 0,0.0258 -0.14599,0.0211 -0.89223,-0.0288 -4.83795,-0.32364 -9.27515,-0.50601 -13.28476,-0.54598 l -1.4862,-0.0148 -0.0243,0.0983 c -0.11528,0.46656 -0.18848,0.62635 -0.3937,0.8595 -0.19951,0.22667 -0.53061,0.43323 -0.88734,0.55357 -0.31846,0.10742 -0.80322,0.14825 -1.15328,0.0971 z" />
                                            </OverlayTrigger>
                                            {/*fore arm  part back forearm */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverForeArm}>
                                                <path className="anatomy-bg" d="m 82.587615,132.39968 c -0.650761,-0.0753 -1.191476,-0.12445 -1.876779,-0.17042 -0.447871,-0.03 -2.473076,-0.0367 -2.995469,-0.01 l -0.335396,0.0172 -0.01682,-1.1543 c -0.01882,-1.292 -0.0019,-3.3007 0.03303,-3.92763 0.03382,-0.60643 0.07971,-1.27857 0.189345,-2.77333 0.387035,-5.27673 0.480064,-7.88585 0.389987,-10.9374 -0.09582,-3.24604 0.177747,-6.84883 0.765372,-10.07977 0.170737,-0.93878 0.143611,-0.83617 0.219363,-0.82988 0.03623,0.003 0.390068,0.0402 0.786306,0.0827 1.28549,0.1377 2.311217,0.22393 3.347265,0.28138 1.090673,0.0605 3.325159,0.0595 5.037985,-0.002 0.43612,-0.0157 0.796461,-0.0246 0.800763,-0.0197 0.0043,0.005 -6.65e-4,0.17422 -0.01056,0.37637 -0.129626,2.59157 -0.417772,4.43069 -1.029557,6.57134 -0.08929,0.31242 -0.228382,0.79859 -0.309102,1.08038 -0.252328,0.88092 -0.379613,1.42423 -0.566224,2.41692 -0.155302,0.82615 -0.459575,2.03406 -1.144699,4.54425 -1.149188,4.21049 -1.547754,5.75514 -1.914014,7.41783 -0.416974,1.89292 -0.590564,3.08134 -0.689818,4.72246 -0.0296,0.48946 -0.03646,1.98043 -0.01049,2.27769 0.01374,0.15718 0.01129,0.19431 -0.01266,0.19178 -0.01634,-0.002 -0.31236,-0.0359 -0.657832,-0.0759 z" />
                                            </OverlayTrigger>
                                            {/* {forearm backpart piche} */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverForeArm}>
                                                <path className="anatomy-bg" d="m 135.17392,132.44209 c 0.0561,-0.52485 0.0728,-1.76448 0.0347,-2.56966 -0.13468,-2.84353 -0.54584,-4.80461 -2.52668,-12.05118 -0.90885,-3.32482 -1.08786,-4.0351 -1.29445,-5.13601 -0.17228,-0.91811 -0.27895,-1.34405 -0.71092,-2.83871 -0.60161,-2.08159 -0.86711,-3.47595 -1.04133,-5.4687 -0.0443,-0.50643 -0.10392,-1.46337 -0.092,-1.47539 0.005,-0.005 0.35237,0.001 0.77134,0.0148 0.9675,0.031 3.15346,0.0317 3.882,10e-4 1.36153,-0.057 2.69205,-0.17112 4.77,-0.40904 0.35357,-0.0405 0.64564,-0.0716 0.64905,-0.0691 0.0118,0.009 0.13958,0.71602 0.23725,1.31376 0.3179,1.94571 0.5051,3.7501 0.61357,5.91421 0.0327,0.65183 0.0373,2.89523 0.01,4.81157 -0.0343,2.40351 0.0617,4.73079 0.37594,9.11078 0.15383,2.14434 0.20485,2.92578 0.23012,3.52428 0.0257,0.60793 0.0314,3.59525 0.009,4.50613 l -0.0145,0.57917 -1.11049,0.001 c -1.29014,0.002 -1.93675,0.0373 -3.23856,0.17869 -0.5033,0.0547 -1.31577,0.15268 -1.48212,0.17878 l -0.0856,0.0134 z" />
                                            </OverlayTrigger>
                                            {/*bottom back part pacha*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverHip}>
                                                <path className="anatomy-bg" d="m 96.161463,138.98116 c -1.493429,-0.0622 -3.3032,-0.25773 -5.719171,-0.61801 l -0.70935,-0.10578 -0.01382,-0.48912 c -0.03562,-1.26125 -0.0077,-4.17336 0.04765,-4.96592 0.01285,-0.18413 0.108006,-1.15674 0.21145,-2.16138 0.194432,-1.88824 0.747968,-7.18386 0.785841,-7.51807 0.0118,-0.10414 0.02155,-0.27728 0.02165,-0.38477 6.65e-4,-0.525 0.197199,-1.98826 0.566431,-4.21351 0.181683,-1.09495 0.561702,-3.2699 0.573387,-3.28163 0.01313,-0.0132 2.146365,-0.1559 3.903427,-0.2611 3.642201,-0.2181 7.472032,-0.37303 10.552592,-0.4269 l 0.86547,-0.0151 0.0252,0.10989 c 0.16182,0.70446 0.80524,1.25111 1.70192,1.44597 0.22389,0.0487 0.67216,0.0658 0.90419,0.0346 0.77546,-0.10426 1.43566,-0.49227 1.75092,-1.02901 0.0818,-0.1393 0.1934,-0.44709 0.1934,-0.53347 0,-0.042 0.0201,-0.0434 0.60406,-0.0433 2.07299,6.6e-4 6.25336,0.12624 9.27148,0.27885 1.99311,0.10077 5.63117,0.32567 5.65326,0.34946 0.0174,0.0187 0.50487,2.85969 0.6853,3.99375 0.27392,1.72168 0.38511,2.62991 0.43363,3.54185 0.0191,0.35813 0.18601,2.10096 0.7756,8.0962 0.0982,0.99795 0.18912,1.96527 0.20218,2.14962 0.0135,0.19086 0.0286,1.41009 0.035,2.83183 l 0.0113,2.49667 -0.17404,0.0254 c -0.0957,0.014 -0.55162,0.0807 -1.01311,0.14831 -2.5149,0.3685 -4.23429,0.53079 -5.94414,0.56105 -3.53031,0.0625 -6.29992,-0.61368 -8.65287,-2.11248 -0.7258,-0.46233 -1.38951,-0.99576 -2.07039,-1.66401 -0.2602,-0.25538 -0.34932,-0.35655 -0.34932,-0.39658 0,-0.14439 0.1473,-0.97086 0.28045,-1.57355 0.0429,-0.19399 0.0731,-0.35754 0.0672,-0.36344 -0.006,-0.006 -0.0524,6.7e-4 -0.10337,0.0143 -0.21095,0.0571 -0.59909,0.0925 -1.14797,0.10477 -0.52919,0.0118 -0.58606,0.01 -0.6241,-0.0251 -0.0356,-0.0324 -0.0488,-0.0337 -0.0883,-0.009 -0.0381,0.0239 -0.0547,0.024 -0.0925,0 -0.036,-0.0226 -0.0531,-0.0231 -0.0782,-0.002 -0.0515,0.043 -0.90445,-0.0191 -1.7139,-0.12463 -0.13925,-0.0182 -0.2565,-0.0297 -0.26056,-0.0256 -0.004,0.004 0.0216,0.12681 0.057,0.27276 0.11564,0.47672 0.20689,0.95178 0.29034,1.5115 l 0.0463,0.31055 -0.21703,0.2204 c -1.6109,1.63586 -3.64632,2.78923 -5.94137,3.36667 -1.60995,0.40507 -3.498238,0.56643 -5.603172,0.47881 z" />
                                            </OverlayTrigger>
                                            {/*hand part hater kobji piche*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWrist}>
                                                <path className="anatomy-bg" d="m 129.81226,154.72386 c -0.0289,-0.0291 -0.0803,-0.10677 -0.11413,-0.17264 -0.0872,-0.16977 -0.10118,-0.49065 -0.0324,-0.74268 0.0261,-0.0956 0.0446,-0.17551 0.0412,-0.1776 -0.003,-0.002 -0.0499,-0.0229 -0.10316,-0.0462 -0.20561,-0.0899 -0.36988,-0.31731 -0.42636,-0.5901 -0.0543,-0.26214 0.0146,-0.62259 0.15754,-0.8243 l 0.0476,-0.0672 -0.0905,-0.13627 c -0.21916,-0.32979 -0.21943,-0.75103 -7.4e-4,-1.19022 0.10595,-0.21281 0.31896,-0.49015 0.37235,-0.4848 0.0204,0.002 0.13122,0.0405 0.24634,0.0856 0.14205,0.0556 0.26028,0.0857 0.36803,0.0939 0.43842,0.0333 0.94816,-0.22883 1.47563,-0.75889 0.15687,-0.15763 0.3886,-0.34089 0.90765,-0.71782 1.1204,-0.8136 1.40569,-1.04658 1.78488,-1.45756 0.39349,-0.42648 0.44673,-0.52582 0.62866,-1.1729 0.30067,-1.06948 0.40921,-1.69278 0.41059,-2.35781 10e-4,-0.61734 -0.0448,-0.78225 -0.28699,-1.02751 -0.25494,-0.25815 -0.75988,-0.45089 -1.38571,-0.52892 -0.34446,-0.043 -0.81917,-0.0692 -0.89679,-0.0497 -0.12308,0.031 -0.10833,0.20428 0.019,0.22345 0.0378,0.006 0.21828,0.0155 0.40116,0.0218 0.18288,0.006 0.45221,0.0321 0.59852,0.0574 0.2512,0.0433 0.56518,0.12055 0.62619,0.15399 0.0176,0.01 -0.0241,0.0494 -0.11475,0.10927 -0.25623,0.16928 -0.46848,0.46063 -0.72158,0.99046 -0.25066,0.52474 -0.34344,0.7945 -0.57823,1.68111 -0.5355,2.02213 -0.85781,2.93844 -1.23551,3.51245 -0.1161,0.17644 -0.48186,0.5559 -0.68623,0.71193 -0.2846,0.21728 -0.63957,0.37036 -0.8588,0.37036 -0.11523,0 -0.51265,-0.15047 -0.6565,-0.24856 -0.06,-0.0409 -0.14888,-0.13239 -0.19741,-0.20322 -0.0854,-0.1246 -0.0882,-0.13475 -0.0881,-0.31187 6.7e-4,-0.53326 0.1516,-1.04834 0.57014,-1.9419 0.43917,-0.93762 0.51824,-1.1094 0.61675,-1.33988 0.15376,-0.35974 0.29642,-0.81239 0.33218,-1.05396 0.0174,-0.11736 0.0466,-0.38514 0.065,-0.59506 0.10612,-1.21176 0.57486,-4.01464 0.87669,-5.24235 0.0601,-0.24469 0.12186,-0.43394 0.18521,-0.56803 0.22394,-0.47396 0.80018,-1.32451 1.76374,-2.60333 0.54928,-0.72898 0.69763,-0.95305 0.88726,-1.34008 0.12282,-0.25066 0.16378,-0.36213 0.20872,-0.56804 0.0731,-0.33473 0.11381,-0.5787 0.16899,-1.01211 0.0249,-0.19523 0.0475,-0.35729 0.0503,-0.36012 0.008,-0.008 1.25815,-0.16006 1.712,-0.20769 1.35777,-0.14249 2.55904,-0.19806 3.63443,-0.16812 l 0.58845,0.0164 v 0.8299 c 0,0.45645 0.0124,1.08416 0.0274,1.39489 0.0337,0.69516 0.0388,0.55065 -0.0813,2.34703 -0.2071,3.09949 -0.30047,4.77192 -0.30096,5.39074 0,0.23278 -0.0103,0.54352 -0.0224,0.69054 -0.0465,0.56252 -0.19888,1.5082 -0.30925,1.91925 -0.0579,0.21577 -0.0964,0.2696 -0.95582,1.33647 -0.99462,1.23474 -1.07486,1.34675 -1.55345,2.16843 -0.2443,0.41945 -0.66857,1.20239 -1.03811,1.91572 -0.3555,0.68622 -0.51002,0.95543 -0.6162,1.07353 -0.26755,0.29759 -1.96372,1.6442 -2.73117,2.16828 -0.41785,0.28536 -0.75209,0.42305 -1.67363,0.68941 -0.85076,0.24591 -1.43673,0.368 -1.76621,0.368 -0.17842,0 -0.20272,-0.005 -0.25023,-0.0529 z" />
                                            </OverlayTrigger>
                                            {/*hand part hater kobji piche bam side*/}

                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWrist}>
                                                <path className="anatomy-bg" d="m 88.19231,155.1437 c -0.01829,-0.004 -0.108066,-0.0185 -0.199506,-0.0332 -0.552425,-0.0885 -1.753338,-0.42246 -2.327423,-0.64727 -0.301268,-0.11798 -0.508907,-0.23536 -0.871163,-0.49245 -0.741318,-0.52612 -2.059626,-1.5703 -2.437537,-1.93068 -0.160244,-0.15282 -0.283651,-0.34622 -0.570661,-0.89435 -0.563305,-1.07578 -0.684631,-1.30393 -0.882521,-1.65954 -0.309088,-0.55544 -0.734714,-1.26615 -0.880333,-1.47 -0.152303,-0.21318 -0.670453,-0.8681 -1.207404,-1.52609 -0.717071,-0.87871 -0.698118,-0.84757 -0.79928,-1.31375 -0.153899,-0.70923 -0.241868,-1.43845 -0.264745,-2.19468 -0.01791,-0.59198 -0.04702,-0.98522 -0.199479,-2.69537 -0.08135,-0.91257 -0.143292,-1.71648 -0.191353,-2.48375 -0.04688,-0.74835 -0.0527,-2.02085 -0.01145,-2.50226 0.02026,-0.23645 0.03122,-0.75509 0.03325,-1.57385 l 0.0031,-1.22119 0.365761,-0.0171 c 0.56679,-0.0265 2.445737,-0.0206 2.915002,0.009 0.7672,0.0488 2.038319,0.16921 2.529603,0.23965 l 0.0912,0.0131 0.01471,0.18171 c 0.03014,0.37216 0.08553,0.81685 0.148891,1.19524 0.154152,0.92063 0.268774,1.15031 1.184221,2.37304 1.096152,1.46408 1.673888,2.33218 1.830441,2.75039 0.250559,0.66933 0.869048,4.17837 1.007079,5.71373 0.07924,0.8814 0.170877,1.16124 0.853467,2.60626 0.445962,0.9441 0.615163,1.38383 0.685708,1.78207 0.03519,0.19867 0.05339,0.56399 0.03534,0.70922 -0.01464,0.11778 -0.02272,0.13205 -0.10387,0.18352 -0.04839,0.0307 -0.169826,0.0915 -0.269852,0.13504 -0.100032,0.0436 -0.233621,0.1033 -0.296878,0.13273 -0.190881,0.0888 -0.439186,0.0664 -0.725816,-0.0654 -0.217661,-0.10014 -0.45903,-0.28496 -0.746338,-0.5715 -0.368967,-0.368 -0.503773,-0.59393 -0.784185,-1.31438 -0.233076,-0.59882 -0.438122,-1.27276 -0.809908,-2.66195 -0.215393,-0.80485 -0.345983,-1.17511 -0.581374,-1.64841 -0.252255,-0.50719 -0.536451,-0.8721 -0.767286,-0.9852 l -0.09646,-0.0473 0.184669,-0.0586 c 0.273277,-0.0867 0.643155,-0.14362 1.116602,-0.17169 0.231647,-0.0137 0.433646,-0.0347 0.448889,-0.0465 0.03527,-0.0274 0.03596,-0.13256 0.0011,-0.16758 -0.03342,-0.0336 -0.41192,-0.0356 -0.730285,-0.004 -0.539929,0.0538 -0.90724,0.14414 -1.238174,0.30457 -0.167206,0.0811 -0.243171,0.13482 -0.36874,0.26092 -0.14391,0.14453 -0.163801,0.17583 -0.220979,0.34769 -0.06134,0.18439 -0.06282,0.20025 -0.06216,0.6678 6.65e-4,0.38209 0.01033,0.53821 0.04839,0.77209 0.07185,0.44154 0.191552,0.9794 0.306561,1.37752 0.05663,0.19603 0.105931,0.38148 0.109569,0.4121 0.02577,0.21693 0.229046,0.5524 0.553409,0.91331 0.394763,0.43924 0.729314,0.71241 1.986667,1.62215 0.324729,0.23495 0.606405,0.45171 0.625957,0.48169 0.06051,0.0928 0.458485,0.43632 0.660331,0.56997 0.244907,0.16217 0.483304,0.26165 0.704689,0.29408 0.215346,0.0315 0.362948,0.008 0.635287,-0.10206 l 0.192097,-0.0775 0.05792,0.0688 c 0.216324,0.25691 0.374978,0.54571 0.437344,0.7961 0.02607,0.10466 0.03299,0.20342 0.02498,0.35641 -0.01202,0.22967 -0.0533,0.35456 -0.172114,0.52081 l -0.06679,0.0935 0.07882,0.15508 c 0.135891,0.2674 0.170944,0.4831 0.121273,0.7463 -0.05086,0.26951 -0.21514,0.50365 -0.421536,0.60079 -0.125422,0.059 -0.121599,0.0406 -0.05756,0.27732 0.0853,0.31525 0.02486,0.67295 -0.142215,0.84179 l -0.08266,0.0835 -0.185487,-0.003 c -0.102021,-10e-4 -0.20045,-0.006 -0.218738,-0.009 z" />
                                            </OverlayTrigger>

                                            {/*thigh part picher side*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverThigh}>
                                                <path className="anatomy-bg" d="m 99.597401,187.06102 c -1.381306,-0.0443 -3.102637,-0.25352 -4.555386,-0.55373 -0.50485,-0.10433 -0.991478,-0.21914 -1.010697,-0.23844 -0.0063,-0.006 0.0094,-0.12045 0.03503,-0.2535 0.09377,-0.48714 0.142966,-1.97024 0.143259,-4.31836 6.65e-4,-2.62988 -0.06391,-3.69052 -0.29628,-4.89212 -0.489594,-2.53177 -2.214443,-13.41142 -3.03674,-19.15457 -0.415052,-2.8988 -0.596962,-4.34163 -0.676864,-5.36845 -0.150328,-1.932 -0.309234,-5.84508 -0.411142,-10.12433 -0.03822,-1.60498 -0.07001,-3.51256 -0.05872,-3.5239 0.0059,-0.006 0.537748,0.0651 1.181807,0.15803 2.73391,0.39425 4.222929,0.53404 5.992408,0.56255 0.876975,0.0141 1.55485,-0.007 2.305404,-0.0719 3.49647,-0.30244 6.27217,-1.50557 8.5735,-3.71618 0.10079,-0.0968 0.18692,-0.17199 0.19141,-0.16706 0.0101,0.011 0.0704,0.67906 0.10746,1.18956 0.038,0.52358 0.0374,3.18244 -9.3e-4,3.8203 -0.10911,1.81702 -0.25936,3.25605 -0.54775,5.24594 -0.46768,3.22694 -0.84914,7.72655 -1.10191,12.9979 -0.0371,0.77249 -0.0371,3.20528 -10e-6,4.03192 0.0156,0.34917 0.0533,1.21625 0.0836,1.92685 0.18514,4.33642 0.54527,11.42065 0.69132,13.59935 0.0681,1.01649 0.0801,1.93818 0.0319,2.46147 -0.0824,0.89499 -0.22247,1.97366 -0.41663,3.20771 -0.10953,0.69616 -0.38096,2.28628 -0.39216,2.2974 -0.002,0.002 -0.15398,0.0511 -0.33687,0.10824 -1.90362,0.5949 -4.06734,0.85321 -6.495024,0.77537 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverThigh}>
                                                <path className="anatomy-bg" d="m 118.12929,187.06102 c -0.7101,-0.0228 -1.78628,-0.11449 -2.58249,-0.22011 -0.80981,-0.10743 -2.06042,-0.33382 -2.60419,-0.47142 l -0.1547,-0.0392 -0.12748,-0.72396 c -0.39373,-2.23611 -0.65152,-4.1195 -0.72859,-5.32314 -0.0288,-0.45032 -0.02,-0.88734 0.033,-1.63803 0.14107,-1.9964 0.61105,-11.42245 0.7769,-15.5819 0.087,-2.18284 0.0886,-2.37448 0.0328,-3.96508 -0.0958,-2.72899 -0.38315,-6.83895 -0.69777,-9.97954 -0.1373,-1.3706 -0.23084,-2.15022 -0.40891,-3.4082 -0.35442,-2.50389 -0.50301,-4.03316 -0.57899,-5.95876 -0.0287,-0.72684 -0.0148,-2.58063 0.0234,-3.12974 0.0305,-0.43776 0.0877,-1.09939 0.10466,-1.20854 l 0.013,-0.0836 0.22477,0.21726 c 2.29467,2.21794 5.07776,3.42775 8.59435,3.73598 0.72023,0.0631 1.4295,0.085 2.30319,0.071 1.36206,-0.0218 2.51421,-0.10879 4.18962,-0.31635 0.51883,-0.0643 2.57267,-0.35282 2.86004,-0.40182 l 0.078,-0.0133 -0.006,0.38634 c -0.0895,5.96243 -0.32032,11.97161 -0.53925,14.04138 -0.1049,0.99174 -0.35004,2.83577 -0.67665,5.09001 -0.84075,5.80262 -2.37187,15.45138 -2.93569,18.50002 -0.14942,0.80793 -0.18369,1.05156 -0.23197,1.64919 -0.0685,0.84746 -0.0817,1.25546 -0.0936,2.88675 -0.0154,2.10358 0.0372,4.23321 0.11607,4.69736 0.0177,0.10414 0.0322,0.20132 0.0322,0.21596 0,0.0616 -1.25982,0.42791 -2.00607,0.58321 -1.51291,0.31486 -3.20558,0.44601 -5.00982,0.38816 z" />
                                            </OverlayTrigger>
                                            {/*bottom leg part leg picher side*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLeg}>
                                                <path className="anatomy-bg" d="m 99.032134,237.58234 c -0.572675,-0.0201 -1.459459,-0.11321 -2.086746,-0.21913 -0.178438,-0.0301 -0.330561,-0.0548 -0.338049,-0.0548 -0.0075,0 -0.01375,-0.22804 -0.01391,-0.50677 -0.0015,-2.59584 -0.352168,-5.51907 -1.077498,-8.9827 -0.271215,-1.29511 -0.67189,-3.28723 -0.992383,-4.93408 -1.479742,-7.6036 -2.378756,-13.06437 -2.539598,-15.42596 -0.09171,-1.34649 -0.09207,-4.5975 -7.31e-4,-6.64931 0.177447,-3.98697 0.673199,-7.99633 1.474974,-11.92867 0.149869,-0.73504 0.492547,-2.31899 0.504238,-2.33074 0.0046,-0.005 0.178678,0.0315 0.386895,0.0802 2.638693,0.61752 5.542482,0.84627 8.041174,0.63349 1.31814,-0.11226 2.73338,-0.38323 3.80888,-0.72927 l 0.17344,-0.0558 -0.0148,0.0928 c -0.0361,0.22625 -0.37917,1.94821 -0.48671,2.44292 -0.0652,0.30016 -0.13431,0.66604 -0.15348,0.81306 -0.15431,1.18325 -0.26888,3.38442 -0.4122,7.91903 -0.0863,2.72972 -0.14101,4.21661 -0.18987,5.15684 -0.24339,4.68464 -1.37314,18.54573 -1.94903,23.91303 -0.0524,0.48818 -0.0846,1.16511 -0.14775,3.10747 -0.042,1.29079 -0.0368,3.53405 0.01,4.24353 0.0667,1.01488 0.19753,2.64436 0.22568,2.81158 0.01,0.0591 0.005,0.0622 -0.21634,0.13105 -1.1838,0.3686 -2.50797,0.52466 -4.00604,0.47218 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLeg}>
                                                <path className="anatomy-bg" d="m 118.49505,237.58234 c -0.3182,-0.0112 -1.03423,-0.0717 -1.40763,-0.11907 -0.33395,-0.0423 -1.14467,-0.17377 -1.15949,-0.18798 -0.004,-0.004 0.0184,-0.27077 0.0491,-0.59372 0.0609,-0.63953 0.12243,-1.40507 0.18412,-2.29128 0.0329,-0.47218 0.0395,-0.86122 0.039,-2.30554 0,-0.97543 -0.0128,-2.06481 -0.0285,-2.48375 -0.0694,-1.85561 -0.0961,-2.34806 -0.15967,-2.95153 -0.61804,-5.86361 -1.72861,-19.57392 -1.94966,-24.06896 -0.0303,-0.61711 -0.0768,-1.89242 -0.15591,-4.27695 -0.1283,-3.86903 -0.18794,-5.31557 -0.27782,-6.73842 -0.0782,-1.2374 -0.14766,-1.84272 -0.27875,-2.42805 -0.1133,-0.50591 -0.50808,-2.49062 -0.49751,-2.50123 0.004,-0.004 0.19089,0.0321 0.41458,0.081 2.52899,0.55317 5.27712,0.74953 7.65541,0.547 1.39104,-0.11847 2.77945,-0.3914 3.95319,-0.77713 0.17476,-0.0574 0.32266,-0.0995 0.32869,-0.0934 0.0253,0.0255 0.53505,2.44668 0.72531,3.44542 0.95831,5.03039 1.40638,9.99494 1.35806,15.04728 -0.0228,2.38035 -0.0657,3.02196 -0.33679,5.03432 -0.4818,3.57644 -1.93245,11.55221 -3.21288,17.66468 -0.74367,3.55004 -1.07269,6.0974 -1.11635,8.64299 l -0.0145,0.84648 -0.12192,0.0404 c -0.23831,0.0789 -0.88042,0.23572 -1.19586,0.2921 -0.83332,0.14898 -1.80561,0.21 -2.79426,0.17536 z" />
                                            </OverlayTrigger>
                                            {/*foot part picher side*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverFoot}>
                                                <path className="anatomy-bg" d="m 99.976828,263.72688 c -1.14547,-0.13185 -2.37577,-0.74112 -3.785925,-1.87486 -0.57177,-0.45971 -1.371769,-1.18407 -2.002328,-1.813 -0.285214,-0.28449 -0.395966,-0.46227 -0.524721,-0.8423 -0.148751,-0.439 -0.181231,-0.68889 -0.182754,-1.40575 -7.98e-4,-0.36753 0.01018,-0.72436 0.02668,-0.86875 0.08186,-0.71648 0.184117,-1.302 0.414301,-2.37237 0.07773,-0.36143 0.14806,-0.70726 0.156306,-0.76851 0.05193,-0.38589 0.24776,-1.10597 1.163073,-4.27695 1.132509,-3.92341 1.44429,-5.08057 1.446498,-5.36846 0.0017,-0.21311 -0.05546,-0.33685 -0.313483,-0.67941 -0.495374,-0.65769 -0.72428,-1.12606 -0.776644,-1.58915 -0.06761,-0.59797 0.209348,-1.36914 0.74153,-2.06469 0.09068,-0.11854 0.09515,-0.13192 0.11876,-0.35642 0.04142,-0.39365 0.08886,-1.0611 0.105053,-1.47802 l 0.01541,-0.39669 0.06853,0.0143 c 0.355194,0.0739 1.235061,0.18652 1.86409,0.23862 0.435442,0.0361 1.749836,0.0363 2.161316,0 0.9017,-0.0788 1.73776,-0.23348 2.40904,-0.44583 l 0.20339,-0.0643 0.0125,0.10271 c 0.007,0.0565 0.033,0.27313 0.0581,0.4814 0.0446,0.37002 0.1006,0.74136 0.12336,0.81792 0.006,0.0211 0.11305,0.11751 0.23732,0.21432 0.25087,0.19549 0.48809,0.43344 0.64086,0.64283 0.21751,0.29816 0.41506,0.77177 0.48599,1.16509 0.0481,0.26671 0.0365,0.97539 -0.0212,1.292 -0.0687,0.3775 -0.18361,0.77483 -0.34931,1.20817 -0.16572,0.43337 -0.2334,0.7066 -0.29114,1.17533 -0.0563,0.45734 -0.0558,2.17879 8e-4,2.86244 0.11421,1.37798 0.37491,3.40973 0.75744,5.90307 0.26734,1.74247 0.31885,2.31349 0.33697,3.73502 0.0298,2.33597 -0.17229,3.45544 -0.81889,4.53708 -0.64664,1.08171 -1.64905,1.79064 -3.00946,2.12834 -0.17678,0.0439 -0.4112,0.0953 -0.52093,0.11432 -0.24811,0.0429 -0.71898,0.0589 -0.950611,0.0322 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverFoot}>
                                                <path className="anatomy-bg" d="m 118.51722,263.73581 c -0.33175,-0.0425 -0.90377,-0.18411 -1.2998,-0.32177 -0.32525,-0.11307 -0.86202,-0.37472 -1.12753,-0.54965 -1.07551,-0.70853 -1.78645,-1.86711 -2.02653,-3.30249 -0.1356,-0.81078 -0.18609,-2.02394 -0.13441,-3.22999 0.0464,-1.08307 0.11098,-1.69211 0.33181,-3.12946 0.75954,-4.94377 0.95221,-7.26396 0.74179,-8.93287 -0.048,-0.38073 -0.10926,-0.62512 -0.24287,-0.96899 -0.19473,-0.50114 -0.30884,-0.89751 -0.39118,-1.35882 -0.0473,-0.26477 -0.0401,-1.05447 0.0117,-1.29199 0.15644,-0.71751 0.53138,-1.29022 1.14801,-1.75355 l 0.19194,-0.14421 0.0349,-0.18906 c 0.0192,-0.10398 0.0568,-0.37116 0.0835,-0.59372 0.0267,-0.22255 0.0514,-0.40842 0.0549,-0.41301 0.003,-0.005 0.1239,0.0128 0.26767,0.0386 2.2739,0.4082 4.48235,0.34411 6.2711,-0.18192 l 0.1797,-0.0529 0.0151,0.41414 c 0.0164,0.45097 0.063,1.12963 0.11051,1.60974 0.0292,0.29499 0.0326,0.30759 0.10742,0.40096 0.20886,0.26065 0.46657,0.70737 0.59115,1.02471 0.13534,0.34474 0.16683,0.51032 0.16662,0.87604 0,0.30564 -0.005,0.35004 -0.0619,0.52083 -0.13691,0.41412 -0.29056,0.69209 -0.63988,1.15758 -0.13472,0.17952 -0.27587,0.39157 -0.31365,0.4712 -0.10094,0.21273 -0.0941,0.38187 0.0367,0.91331 0.18478,0.75069 0.55767,2.08378 1.22297,4.37226 0.7624,2.62246 1.17432,4.10451 1.24579,4.48235 0.0209,0.11026 0.0819,0.416 0.13568,0.67941 0.27165,1.3308 0.31483,1.55434 0.36803,1.90458 0.10082,0.66381 0.13244,1.03778 0.1337,1.58157 0.001,0.54821 -0.0214,0.78999 -0.10943,1.16514 -0.083,0.35363 -0.21698,0.65234 -0.40383,0.89999 -0.0794,0.10525 -0.83436,0.8334 -1.31513,1.26844 -1.67932,1.51963 -3.11189,2.35988 -4.42008,2.5925 -0.19488,0.0347 -0.80981,0.0608 -0.96428,0.0411 z" />
                                            </OverlayTrigger>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 18 250 260">
                                            {/* head part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popover}>
                                                <path className='anatomy-bg' d="m 107.00141,50.663111 c -1.17613,-0.447416 -2.41874,-1.021268 -2.76135,-1.275228 -0.88463,-0.655723 -1.59258,-1.994085 -2.44096,-4.614511 -0.40544,-1.252338 -0.81989,-2.386893 -0.92099,-2.521234 -0.1011,-0.134341 -0.48503,-0.966963 -0.85317,-1.850269 -0.691208,-1.658458 -0.70046,-2.836162 -0.0223,-2.836162 0.23492,0 0.3828,-0.421971 0.48384,-1.380676 0.55465,-5.262807 1.732,-7.794007 4.33471,-9.319298 1.88751,-1.106151 6.98201,-1.234892 9.37076,-0.236805 2.85468,1.192761 4.49068,4.221417 5.01946,9.292315 0.13514,1.295919 0.25399,1.619991 0.63021,1.718372 0.34654,0.09062 0.46365,0.333189 0.46365,0.960297 0,0.86097 -0.86022,2.985561 -1.50523,3.717643 -0.19901,0.225874 -0.64624,1.329128 -0.99386,2.451677 -1.24695,4.026742 -1.73088,4.599643 -5.05383,5.982991 -2.2432,0.933849 -3.09663,0.920625 -5.75096,-0.08911 z" />
                                            </OverlayTrigger>

                                            {/*Throt part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverNeck}>
                                                <path className='anatomy-bg' d="m 107.39934,59.893248 c -2.03671,-0.210766 -5.76899,-0.903344 -6.16756,-1.144482 -0.12336,-0.07463 0.36288,-0.416069 1.08053,-0.758745 l 1.30482,-0.62305 0.15066,-2.517017 c 0.0829,-1.384362 0.16391,-3.072494 0.18009,-3.751407 l 0.0294,-1.234384 2.45724,0.964608 c 3.3484,1.314436 3.76687,1.344876 6.07188,0.441696 1.0538,-0.412914 2.18613,-0.90198 2.51629,-1.086815 l 0.60029,-0.336066 0.24012,3.763909 0.24012,3.763907 1.42813,0.758349 1.42813,0.758348 -0.96975,0.261126 c -2.8375,0.764061 -7.32677,1.077755 -10.59041,0.740023 z" />
                                            </OverlayTrigger>

                                            {/* Chest part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverChest}>
                                                <path className='anatomy-bg' d="m 115.50294,84.836595 c -1.80696,-0.29587 -3.51804,-1.178331 -4.77989,-2.465161 l -1.05806,-1.079017 -1.06767,0.939801 c -0.58722,0.516892 -1.67786,1.169036 -2.42364,1.44921 -3.01282,1.131854 -7.326136,1.512015 -9.76008,0.860219 -1.737445,-0.465278 -3.957733,-1.660869 -4.891571,-2.634041 l -0.809576,-0.84367 0.415953,-5.361094 c 0.228775,-2.948602 0.593083,-7.069948 0.809573,-9.158546 l 0.393623,-3.797451 1.493507,-0.599156 c 0.82143,-0.329537 2.53184,-1.169855 3.800914,-1.867374 l 2.307405,-1.268217 2.276222,0.550284 c 5.07332,1.226492 10.42486,1.340903 15.13517,0.323576 l 2.44216,-0.527457 1.44464,0.877572 c 1.85035,1.124024 4.23254,2.203326 5.65199,2.560745 0.61248,0.154228 1.1777,0.384121 1.25604,0.510874 0.35122,0.568286 0.79974,7.516728 0.80457,12.464347 0.005,5.134882 -0.0218,5.464719 -0.49249,6.063138 -1.15971,1.474338 -4.20959,2.566926 -8.43712,3.022517 -2.60727,0.280981 -2.66851,0.280695 -4.51167,-0.02111 z" />
                                            </OverlayTrigger>
                                            {/* upper arm part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverArm}>
                                                <path className='anatomy-bg' d="m 83.878835,106.69509 c -0.687084,-0.11464 -1.819769,-0.40563 -2.51708,-0.64665 l -1.267837,-0.43822 0.06336,-1.90654 c 0.03485,-1.0486 0.242396,-4.932018 0.461215,-8.629828 0.416258,-7.034296 0.47884,-10.730427 0.296783,-17.528579 -0.0954,-3.562386 -0.05153,-4.250106 0.344612,-5.402644 0.638323,-1.857119 2.151693,-4.820544 2.940506,-5.757996 0.712933,-0.847274 3.095501,-2.069396 5.882072,-3.017171 l 1.691989,-0.575482 -0.148004,1.13359 c -0.338196,2.590313 -1.111763,11.680454 -1.240764,14.580173 l -0.138867,3.121528 1.208466,3.39567 c 0.664654,1.867617 1.168075,3.436055 1.118712,3.485421 -0.278049,0.278049 -3.496767,15.033498 -3.618987,16.590398 l -0.146087,1.86091 -1.840424,-0.0281 c -1.012233,-0.0154 -2.402583,-0.12187 -3.089665,-0.23651 z" />

                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverArm}>
                                                <path className='anatomy-bg' d="m 130.53924,106.21434 c -0.0693,-0.44849 -0.17141,-1.52767 -0.22687,-2.39819 -0.0555,-0.87051 -0.84036,-4.634339 -1.74421,-8.364058 l -1.64337,-6.781305 1.28206,-3.780216 1.28206,-3.780215 -0.15253,-7.545362 c -0.0839,-4.149949 -0.2164,-8.123461 -0.29448,-8.830029 -0.16548,-1.497409 -0.35959,-1.490195 2.93945,-0.109239 2.5877,1.083194 3.65039,2.036814 4.85936,4.360599 1.68161,3.232272 1.79664,4.03239 1.61023,11.200241 -0.11847,4.555156 -0.0615,7.865875 0.21058,12.2454 0.20512,3.301289 0.37765,7.137167 0.3834,8.524174 0.006,1.387 0.1,2.98466 0.20934,3.55035 0.16265,0.84109 0.12758,1.06668 -0.19242,1.23794 -0.9521,0.50955 -3.46971,1.00033 -5.83277,1.13703 l -2.56381,0.14831 z" />

                                            </OverlayTrigger>
                                            {/* upper abdomen part   chest er niche*/}

                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverAbdomen}>
                                                <path className='anatomy-bg' d="m 100.37554,101.16964 c -1.782874,-0.10882 -3.584927,-0.25869 -4.004563,-0.33305 -0.819817,-0.14528 -0.864693,-0.24611 -1.175532,-2.64121 -0.469084,-3.614429 -2.515128,-11.301751 -4.07824,-15.32261 -0.123377,-0.317368 0.224623,-0.180763 1.284338,0.504165 2.136703,1.381017 4.519745,2.08685 7.013526,2.077329 3.617441,-0.01381 7.688581,-1.178137 9.618241,-2.750779 l 0.61383,-0.500263 0.91287,0.860953 c 1.14557,1.080411 2.36597,1.707565 4.28296,2.200989 3.3288,0.856819 10.77274,-0.347592 13.0061,-2.104354 0.34112,-0.268326 0.62022,-0.427553 0.62022,-0.353837 0,0.07372 -0.49253,1.567286 -1.09451,3.319044 -1.21653,3.540057 -2.59896,9.195211 -3.04068,12.438529 l -0.28886,2.121024 -1.08959,0.14117 c -4.38354,0.56793 -16.00224,0.74437 -22.58011,0.3429 z" />
                                            </OverlayTrigger>
                                            {/* middle abdomen part komor side*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLowerAbdomen}>
                                                <path className='anatomy-bg' d="m 103.13689,119.76746 c -3.342884,-0.27081 -8.709192,-1.03742 -10.039419,-1.4342 -0.551896,-0.16461 -0.450067,-0.7074 0.827366,-4.4102 1.080421,-3.13174 1.636523,-6.56996 1.643664,-10.16231 l 0.0047,-2.3585 2.821381,0.19744 c 3.676968,0.2573 18.491518,0.25441 22.571048,-0.004 l 3.18156,-0.20185 v 3.6024 c 0,4.07192 0.33044,6.19609 1.40738,9.0473 0.79184,2.09635 1.32093,3.95496 1.1691,4.10679 -0.22199,0.22199 -7.25348,1.27944 -10.09323,1.5179 -2.77846,0.23332 -11.08616,0.29467 -13.49353,0.0997 z" />
                                            </OverlayTrigger>
                                            {/* fore arm part dan hater nicher side */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverForeArm}>
                                                <path className='anatomy-bg' d="m 79.787658,139.25189 c -0.824197,-0.17905 -1.60758,-0.39295 -1.740853,-0.47531 -0.312008,-0.19283 -0.30631,-4.20508 0.01126,-7.92524 0.135282,-1.58477 0.341932,-6.50118 0.459222,-10.92535 0.172407,-6.50323 0.3109,-8.57136 0.723066,-10.79764 0.280397,-1.51454 0.547836,-2.79173 0.594303,-2.83819 0.04647,-0.0465 0.810956,0.13989 1.698863,0.41414 0.887907,0.27424 2.912112,0.62562 4.498237,0.78083 l 2.88386,0.2822 -0.15156,2.13518 c -0.154785,2.18051 -1.261134,7.05887 -3.634594,16.02642 -1.665024,6.2909 -2.042387,8.38098 -2.042387,11.31205 v 2.37465 l -0.900441,-0.0191 c -0.495243,-0.0105 -1.574782,-0.16559 -2.398978,-0.34465 z" />

                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverForeArm}>
                                                <path className='anatomy-bg' d="m 136.31343,138.33176 c 0.19633,-2.10245 -0.27178,-5.72257 -1.21567,-9.40136 -0.4405,-1.71684 -1.25243,-4.9044 -1.80429,-7.08346 -0.55186,-2.17907 -1.20954,-4.71831 -1.46152,-5.64277 -0.63934,-2.34567 -1.2016,-5.71218 -1.2016,-7.19452 v -1.24875 l 2.85675,-0.27955 c 1.57121,-0.15375 3.54128,-0.4926 4.37794,-0.753 0.83666,-0.26039 1.60005,-0.39459 1.69643,-0.29821 0.0964,0.0964 0.40467,1.52457 0.68508,3.17376 0.40226,2.36581 0.55163,4.64515 0.70788,10.80233 0.10892,4.2921 0.33078,9.6473 0.49302,11.90045 0.16224,2.25315 0.21944,4.70128 0.12711,5.44028 -0.18877,1.51082 -0.18763,1.51007 -2.67019,1.75206 -0.78687,0.0767 -1.72342,0.18476 -2.08122,0.24013 l -0.65054,0.10068 z" />

                                            </OverlayTrigger>

                                            {/* hand part samne kobji dan*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWrist}>
                                                <path className='anatomy-bg' d="m 86.68884,160.61919 c -1.79558,-0.55414 -3.799224,-2.37147 -5.040204,-4.57152 -0.595537,-1.05578 -1.551935,-2.53354 -2.125329,-3.28391 l -1.042535,-1.3643 -0.332892,-3.91094 c -0.183089,-2.15101 -0.335254,-4.86899 -0.33814,-6.03996 -0.0052,-2.09331 0.0038,-2.12652 0.535015,-1.97902 0.297146,0.0825 1.512741,0.32116 2.701323,0.53032 1.188581,0.20916 2.161057,0.39737 2.161057,0.41825 0,0.19902 1.186488,2.15082 2.099874,3.45434 1.105124,1.57716 1.157093,1.73083 1.72748,5.10778 0.351347,2.08014 0.835112,4.04026 1.201745,4.86923 0.337514,0.76314 0.613663,1.7086 0.613663,2.10103 0,0.59398 -0.09699,0.7135 -0.578949,0.7135 -0.59318,0 -1.683236,-1.06253 -1.907785,-1.85961 -1.254059,-4.45156 -1.886762,-5.73352 -2.679584,-5.42929 -0.682926,0.26207 -0.653333,1.28185 0.128429,4.42591 0.748538,3.01043 0.822074,3.17483 1.887884,4.22043 0.609953,0.5984 1.568231,1.40738 2.129506,1.79775 0.561275,0.39037 1.020499,0.81263 1.020499,0.93835 0,0.31498 -0.873345,0.25907 -2.161057,-0.13834 z" />

                                            </OverlayTrigger>
                                            {/* hand part samne kobji bam*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWrist}>
                                                <path className='anatomy-bg' d="m 130.63035,160.64879 c 0,-0.18555 0.45922,-0.60933 1.0205,-0.94174 0.56127,-0.33241 1.52183,-1.12606 2.13458,-1.76367 1.07112,-1.11458 1.14372,-1.2834 1.88263,-4.37778 0.60518,-2.53437 0.71398,-3.33824 0.51185,-3.78185 -0.14117,-0.30985 -0.41495,-0.56336 -0.60839,-0.56336 -0.56979,0 -1.06605,0.92974 -1.85076,3.46739 -1.01577,3.2849 -1.63387,4.12381 -2.81147,3.81586 -0.68568,-0.17931 -0.65749,-0.50365 0.22198,-2.55409 0.45283,-1.05573 0.86828,-2.6149 1.06817,-4.00881 0.5863,-4.08829 0.77709,-4.66687 2.16625,-6.56906 0.71285,-0.97612 1.39885,-2.04503 1.52444,-2.37537 0.20608,-0.54203 0.40211,-0.61689 2.01011,-0.76757 0.97996,-0.0918 2.17157,-0.25488 2.64801,-0.36234 l 0.86626,-0.19537 0.15974,1.06518 c 0.0879,0.58585 0.037,2.65342 -0.11304,4.5946 -0.47553,6.15282 -0.42138,5.90298 -1.59009,7.33769 -0.57749,0.70892 -1.45123,2.033 -1.94165,2.94239 -1.44016,2.67047 -3.26877,4.29916 -5.60185,4.98941 -1.59063,0.47059 -1.69727,0.47364 -1.69727,0.0485 z" />

                                            </OverlayTrigger>
                                            {/* under abdomen part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLowerAbdomen}>
                                                <path className='anatomy-bg' d="m 104.34481,132.50057 c -1.22846,-1.69951 -3.8708,-4.35388 -5.741012,-5.76716 -1.619331,-1.2237 -5.005557,-2.96344 -5.779259,-2.96921 -1.054001,-0.008 -1.125964,-0.24687 -0.726752,-2.4137 0.205176,-1.11364 0.412138,-2.14103 0.459919,-2.28309 0.05939,-0.17658 0.741658,-0.12572 2.156733,0.16077 8.374861,1.69553 20.337801,1.69218 29.552791,-0.008 1.32065,-0.2437 2.46996,-0.37361 2.55402,-0.2887 0.15703,0.15863 0.68757,3.01262 0.68757,3.69875 0,0.25598 -0.41918,0.50548 -1.26062,0.75031 -3.41076,0.99245 -7.26386,4.24436 -11.15212,9.41207 l -0.52693,0.70031 -0.0133,-0.86228 c -0.0347,-2.24471 -1.34648,-4.71096 -2.93732,-5.52255 -2.83568,-1.44665 -5.80902,1.05287 -6.18377,5.19836 l -0.13679,1.51302 z" />
                                            </OverlayTrigger>
                                            {/* male indicator */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLowerAbdomen}>
                                                <path className='anatomy-bg' d="m 108.2749,138.1149 c -0.49751,-0.32944 -1.08918,-1.08713 -1.51624,-1.94167 -2.31921,-4.64078 1.28085,-10.67854 4.92692,-8.26308 0.47411,0.31409 1.09251,1.08653 1.47622,1.84394 0.56082,1.10702 0.66032,1.60035 0.66032,3.27395 0,1.69145 -0.0952,2.1527 -0.67199,3.25685 -1.17765,2.25429 -3.12858,2.9866 -4.87523,1.83001 z" />

                                            </OverlayTrigger>
                                            {/* thigh part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverThigh}>
                                                <path className='anatomy-bg' d="m 106.85871,187.27874 c -1.6155,-2.14325 -4.36285,-3.22299 -8.764287,-3.44446 l -3.121528,-0.15706 -1.126034,-6.72329 C 91.87,165.15054 91.031521,158.92089 90.776596,154.14276 c -0.459676,-8.61584 -0.209143,-22.08309 0.51705,-27.7936 0.249251,-1.96003 0.304526,-2.10103 0.823648,-2.10103 1.735102,0 5.501499,2.19732 8.457466,4.9341 3.31966,3.07348 6.29431,7.84696 7.39951,11.87413 0.56917,2.07392 0.52833,5.66351 -0.12431,10.92534 -1.22983,9.91543 -1.26766,14.48102 -0.25472,30.73505 0.1509,2.42152 0.18017,4.54995 0.0666,4.84025 -0.1961,0.50104 -0.2226,0.49186 -0.80309,-0.27826 z" />

                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverThigh}>
                                                <path className='anatomy-bg' d="m 112.47733,187.30264 c -0.081,-0.21117 0.0475,-3.65252 0.28563,-7.64745 0.74141,-12.43812 0.58346,-19.69959 -0.64001,-29.42352 -0.25404,-2.01905 -0.46189,-4.4634 -0.46189,-5.4319 0,-3.73249 2.02985,-9.14996 4.81155,-12.84155 1.84652,-2.45052 5.11969,-5.53474 7.14673,-6.73418 1.58377,-0.93714 3.73544,-1.69023 4.01901,-1.40666 0.14277,0.14277 0.27533,0.97239 1.33493,8.35462 1.01291,7.05701 0.82849,22.18583 -0.3688,30.25481 -1.25683,8.47016 -2.78211,17.85223 -3.27892,20.16881 l -0.24447,1.1399 -3.16828,0.12434 c -4.26433,0.16736 -6.67588,1.04041 -8.62939,3.12407 -0.54558,0.58194 -0.68407,0.63669 -0.80609,0.3187 z" />

                                            </OverlayTrigger>
                                            {/* knee part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverKnee}>
                                                <path className='anatomy-bg' d="m 99.054893,197.1281 c -1.39461,-0.30753 -3.782334,-1.13397 -4.36903,-1.51221 -0.216269,-0.13943 -0.222952,-0.42033 -0.0271,-1.13945 0.142961,-0.52492 0.326151,-3.00741 0.40709,-5.51664 l 0.147161,-4.56223 2.761352,0.0325 c 4.132634,0.0487 6.118944,0.81103 8.438924,3.23873 l 1.11535,1.16714 -0.42861,2.46308 c -0.84312,4.84504 -1.05715,5.82717 -1.30779,6.00114 -0.41924,0.29098 -5.18997,0.16911 -6.737345,-0.17211 z" />

                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverKnee}>
                                                <path className='anatomy-bg' d="m 114.19615,197.215 c -0.13518,-0.3893 -1.21641,-6.12431 -1.42721,-7.57015 -0.13498,-0.92586 -0.071,-1.07828 0.91141,-2.17094 1.23664,-1.37544 3.10986,-2.36673 5.38266,-2.84843 1.69331,-0.35889 5.27432,-0.46221 5.69102,-0.16421 0.14851,0.10621 0.26422,1.75305 0.29076,4.13835 0.0273,2.45581 0.17348,4.49062 0.38445,5.35263 l 0.34037,1.39069 -0.87125,0.44317 c -2.05215,1.04385 -4.16623,1.51084 -7.41002,1.63682 -2.56759,0.0997 -3.1992,0.0598 -3.29219,-0.20793 z" />

                                            </OverlayTrigger>
                                            {/* bottom leg part samner side*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLeg}>
                                                <path className='anatomy-bg' d="m 97.729939,243.64657 c -0.0049,-2.94271 -0.313858,-5.16973 -1.533408,-11.05339 -1.229387,-5.93113 -2.216592,-11.28949 -2.807279,-15.23742 -0.449015,-3.00103 -0.495103,-4.07594 -0.373294,-8.70632 0.07643,-2.90542 0.297083,-6.36312 0.49034,-7.68376 0.752333,-5.1412 0.646744,-4.73668 1.201992,-4.60492 0.277597,0.0659 1.279915,0.39329 2.227371,0.7276 2.259124,0.79715 5.277839,1.19939 7.471799,0.99562 1.74369,-0.16195 1.75033,-0.16033 1.63335,0.39907 -0.0646,0.30893 -0.18069,2.99288 -0.25798,5.96433 -0.0773,2.97146 -0.24437,6.64525 -0.37127,8.164 -0.63498,7.59929 -1.22503,14.55677 -1.43565,16.92828 -0.31575,3.55528 -0.3221,13.37153 -0.01,14.98009 0.13816,0.71137 0.2512,1.3867 0.2512,1.50074 0,0.11403 -1.45871,0.20734 -3.24159,0.20734 h -3.241583 z" />

                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLeg}>
                                                <path className='anatomy-bg' d="m 116.16695,244.72709 c 0.32742,-2.78547 0.16685,-14.24598 -0.26494,-18.90925 -0.22622,-2.4432 -0.56898,-6.17102 -0.76169,-8.28405 -0.3389,-3.71614 -0.67329,-9.48144 -0.94034,-16.21255 l -0.12878,-3.24621 2.69684,-0.0156 c 2.86325,-0.0166 5.79231,-0.57809 7.85693,-1.50613 0.79722,-0.35836 1.1191,-0.40972 1.2355,-0.19716 0.53189,0.97128 1.39751,9.69665 1.40349,14.14697 0.006,4.59315 -0.68039,9.25301 -3.12312,21.19764 -1.37414,6.71939 -1.67245,8.82736 -1.67352,11.82579 l -9.7e-4,2.70132 h -3.2379 -3.23791 z" />

                                            </OverlayTrigger>
                                            {/* Foot part samner side */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverFoot}>
                                                <path className='anatomy-bg' d="m 99.174951,270.49178 c -0.462226,-0.24584 -1.593254,-1.0807 -2.513396,-1.85525 -1.303301,-1.09712 -1.720298,-1.60838 -1.887103,-2.3137 -0.305492,-1.29176 0.280371,-4.41535 1.870667,-9.97371 0.731083,-2.55526 1.329245,-4.74907 1.329245,-4.87513 0,-0.12604 -0.270132,-0.62671 -0.600294,-1.11259 -0.719784,-1.05925 -0.742585,-1.47264 -0.145751,-2.64239 l 0.454542,-0.89089 h 3.541419 3.54142 l 0.49519,0.66314 c 0.46156,0.61808 0.47413,0.7567 0.18494,2.04099 -0.76314,3.38919 -0.77576,3.53465 -0.5048,5.82004 0.14876,1.25462 0.43426,3.38941 0.63446,4.74396 0.21733,1.4705 0.3315,3.55813 0.28335,5.18118 -0.0745,2.51024 -0.13242,2.79648 -0.75686,3.73904 -1.19264,1.80023 -4.00141,2.49936 -5.927029,1.47531 z" />

                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverFoot}>
                                                <path className='anatomy-bg' d="m 116.95079,270.57968 c -1.1094,-0.4812 -1.63897,-0.98782 -2.23794,-2.14101 -0.67656,-1.30257 -0.66584,-4.82038 0.0291,-9.5428 0.60967,-4.14306 0.66166,-6.84517 0.16333,-8.48789 -0.44064,-1.45252 -0.44401,-2.20185 -0.0134,-2.97959 0.33174,-0.59917 0.33917,-0.6003 3.96098,-0.6003 h 3.62862 l 0.5135,1.06058 0.5135,1.06055 -0.67949,1.25613 -0.6795,1.25615 0.65899,2.36559 c 1.90249,6.82947 2.29149,8.37683 2.52138,10.02968 0.34036,2.44713 0.0709,3.13642 -1.88246,4.81472 -2.59075,2.22593 -4.48277,2.78166 -6.49658,1.90819 z" />

                                            </OverlayTrigger>
                                        </svg>
                                }
                                <button className='rotate-btn text-primary me-5' onClick={() => setShowBackMan(!showBackMan)}><i className="far fa-sync-alt me-2"></i> Rotate Model</button>
                            </> :
                            <>
                                {
                                    showBackWoman ?
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 7 250 270">
                                            {/* head part back */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popover}>
                                                <path className='anatomy-bg' d="m 106.14595,35.099293 c -2.07861,-0.146915 -3.43039,-0.333935 -3.56907,-0.493788 -0.0805,-0.09274 -0.48397,-0.775694 -0.89667,-1.517666 -0.77829,-1.399246 -1.3485,-2.805704 -1.686447,-4.159819 -0.17623,-0.706077 -0.22486,-0.792299 -0.47184,-0.836489 -0.15143,-0.0271 -0.40034,-0.152904 -0.5531,-0.279568 -0.48604,-0.403011 -1.32166,-2.634472 -1.45806,-3.893675 -0.06,-0.553887 -0.0449,-0.610926 0.22728,-0.85437 0.25167,-0.225166 0.34962,-0.252554 0.71585,-0.200161 l 0.42427,0.0607 -0.0819,-0.555368 c -0.045,-0.305453 -0.0812,-1.639418 -0.0804,-2.964367 0.003,-3.193841 0.25203,-4.379161 1.316297,-6.24084 1.10635,-1.935316 3.64648,-3.641963 6.37616,-4.283972 0.90193,-0.212132 1.27112,-0.24383 2.9687,-0.254883 2.28918,-0.0149 2.85565,0.08638 4.54027,0.811767 3.42095,1.47304 5.41601,4.313388 5.74933,8.185267 0.0571,0.662476 0.0804,1.594759 0.0517,2.071741 -0.0285,0.476981 -0.0787,1.403503 -0.1114,2.058936 l -0.0594,1.191697 0.28956,-0.06503 c 0.44485,-0.09989 0.87427,0.107111 1.0153,0.489425 0.14537,0.394096 0.005,1.505366 -0.34394,2.743671 -0.40369,1.428268 -0.67678,1.824111 -1.36791,1.98283 -0.35955,0.08256 -0.36203,0.08719 -0.82823,1.541328 -0.67464,2.104279 -1.6191,4.116 -2.33705,4.977979 -0.25225,0.302839 -2.08741,0.455647 -5.89819,0.491123 -1.86596,0.01737 -3.635,0.01446 -3.93118,-0.0065 z" />
                                            </OverlayTrigger>
                                            {/* neck part piche */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverNeck}>
                                                <path className='anatomy-bg' d="m 97.368093,46.716418 c 3.866387,-1.073942 4.204127,-1.194 4.902897,-1.74291 0.95666,-0.751487 1.05953,-1.350424 1.0023,-5.834976 l -0.0449,-3.515361 0.65099,0.0608 c 3.58673,0.335013 7.95519,0.334329 11.00981,-0.0017 l 0.55775,-0.06136 -0.0606,3.406933 c -0.042,2.357398 -0.0222,3.629566 0.0641,4.129633 0.30265,1.753785 1.08426,2.287907 4.72418,3.228308 0.78501,0.202811 1.41195,0.382487 1.39318,0.399278 -0.0188,0.01679 -2.11505,-0.02082 -4.65841,-0.08357 l -4.62427,-0.114095 -0.22263,-0.390012 c -0.28736,-0.503437 -0.92541,-0.934175 -1.71145,-1.155375 -1.50308,-0.422978 -3.38088,0.156699 -3.89683,1.202943 -0.10344,0.209814 -0.23937,0.382018 -0.30203,0.382672 -0.34078,0.0036 -6.793817,0.191227 -8.030137,0.233523 l -1.454,0.04974 z" />
                                            </OverlayTrigger>
                                            {/*back part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverBack1}>
                                                <path className='anatomy-bg' d="m 94.624836,84.086344 c -0.0241,-0.0663 -0.21999,-0.87927 -0.43524,-1.80674 -0.21526,-0.92747 -0.70757,-2.96548 -1.09405,-4.52892 -0.38646,-1.56344 -0.69707,-3.03775 -0.69024,-3.27624 0.007,-0.23849 -0.0853,-1.71279 -0.20467,-3.27624 -0.45283,-5.92955 -0.55414,-10.09377 -0.32817,-13.49039 0.18619,-2.7986 0.78917,-9.683967 0.8538,-9.749277 0.075,-0.07591 5.744337,-0.339694 8.949974,-0.416433 1.21437,-0.02906 2.88732,-0.07754 3.71768,-0.107725 l 1.50976,-0.05487 -0.0335,-0.35245 c -0.076,-0.800629 0.73794,-1.349936 2.12642,-1.435081 1.6103,-0.09875 2.56986,0.375068 2.67124,1.319024 l 0.0523,0.486304 1.09026,4.82e-4 c 2.95204,0.0012 12.5191,0.326454 13.04984,0.44361 0.21003,0.04636 0.23551,0.232421 0.57007,4.162526 0.51289,6.02497 0.55178,6.7203 0.55345,9.8956 10e-4,2.94399 -0.0898,5.02249 -0.3832,8.72057 -0.0904,1.13946 -0.18775,2.5915 -0.21631,3.22677 -0.0428,0.95146 -0.17327,1.64781 -0.74036,3.95077 -0.37864,1.53761 -0.87015,3.59789 -1.09223,4.57836 -0.22209,0.98046 -0.41436,1.79624 -0.42727,1.81286 -0.0129,0.0166 -0.81607,-0.0587 -1.78479,-0.1673 -7.68984,-0.8623 -17.52394,-0.86382 -25.761667,-0.004 -0.99736,0.10408 -1.83492,0.18927 -1.86128,0.18927 -0.0263,0 -0.0676,-0.0542 -0.0918,-0.12041 z" />
                                            </OverlayTrigger>
                                            {/*upper arm part piche*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverArm}>
                                                <path className='anatomy-bg' d="m 87.620879,89.353414 c -0.65161,-0.0686 -2.41417,-0.15575 -3.916817,-0.19375 l -2.73206,-0.0691 0.0689,-0.82781 c 0.0379,-0.45531 0.11523,-2.97425 0.17214,-5.59764 0.23876,-11.02118 1.0317,-22.95753 1.78546,-26.87694 0.24556,-1.27686 0.55423,-2.19235 1.05842,-3.13919 0.850747,-1.59768 1.965367,-2.65739 3.456357,-3.286067 0.728,-0.306963 3.771087,-1.194675 4.095347,-1.194675 0.19902,0 0.21383,-0.363429 -0.15961,3.914762 -0.5178,5.93206 -0.57567,7.19199 -0.51259,11.1623 0.0543,3.42184 0.17834,5.65487 0.56066,10.09662 0.14603,1.69677 0.14282,1.8943 -0.0529,3.25519 -0.11469,0.79685 -0.30815,2.26048 -0.42995,3.25251 -0.18779,1.52935 -0.67312,3.94176 -1.841017,9.15115 -0.0638,0.28478 -0.16891,0.49964 -0.2404,0.49161 -0.0698,-0.007 -0.66013,-0.0703 -1.31174,-0.13895 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverArm}>
                                                <path className='anatomy-bg' d="m 129.63022,89.295214 c -0.4968,-1.96546 -1.7097,-7.90282 -1.83718,-8.99334 -0.0928,-0.79368 -0.2871,-2.26693 -0.4318,-3.27389 -0.25826,-1.79713 -0.26021,-1.86366 -0.10584,-3.6135 0.3912,-4.43425 0.50941,-6.57195 0.56217,-10.16598 0.0611,-4.15948 0.0132,-5.20633 -0.51449,-11.26161 -0.17953,-2.06005 -0.30015,-3.769043 -0.26805,-3.797772 0.075,-0.06708 2.22434,0.492276 3.34429,0.870311 2.94278,0.993321 4.66595,3.233371 5.32437,6.921461 0.7348,4.11592 1.48271,15.32097 1.72717,25.87633 0.0576,2.48473 0.13573,5.12886 0.17374,5.87584 l 0.0691,1.35816 -2.5163,0.0603 c -2.25708,0.0541 -3.65272,0.14018 -5.01684,0.30956 -0.41057,0.0509 -0.45956,0.0351 -0.51034,-0.16585 z" />
                                            </OverlayTrigger>
                                            {/*elbo part piche */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverElbow}>
                                                <path className='anatomy-bg' d="m 83.097322,98.163894 c -1.41616,-0.10114 -3.83154,-0.34537 -3.88457,-0.39282 -0.0207,-0.0185 0.24776,-0.96547 0.59673,-2.10423 0.71369,-2.32891 0.83781,-2.88685 1.01326,-4.55491 l 0.12319,-1.17166 2.26041,0.006 c 2.233897,0.006 5.286867,0.18852 5.546457,0.33206 0.10467,0.0578 0.0711,0.41929 -0.15289,1.65076 -0.41807,2.29814 -0.46564,2.84224 -0.40966,4.68431 l 0.0505,1.66221 -1.97938,-0.0135 c -1.08865,-0.007 -2.512497,-0.0515 -3.164107,-0.0981 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverElbow}>
                                                <path className='anatomy-bg' d="m 130.55154,96.289534 c 0.0167,-1.77221 -0.0159,-2.20905 -0.2723,-3.65118 -0.16019,-0.90096 -0.33086,-1.79882 -0.37926,-1.99524 l -0.088,-0.35713 0.44523,-0.0552 c 1.32678,-0.16446 2.74685,-0.25202 4.97639,-0.30684 l 2.48478,-0.0611 0.13457,1.24321 c 0.17912,1.65484 0.33842,2.36684 1.04525,4.67168 0.32809,1.06982 0.55693,1.97701 0.50854,2.01595 -0.17652,0.14204 -3.81522,0.4051 -6.31204,0.45633 l -2.56211,0.0525 z" />
                                            </OverlayTrigger>
                                            {/*forearm part piche */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverForeArm}>
                                                <path className='anatomy-bg' d="m 81.751022,130.26443 c -0.44428,-0.0376 -1.32531,-0.0739 -1.95785,-0.0808 l -1.150052,-0.0126 -0.0575,-0.50589 c -0.0316,-0.27824 -0.0852,-1.06959 -0.11921,-1.75857 -0.066,-1.33846 -0.33923,-4.60388 -0.72547,-8.67239 -0.21001,-2.21228 -0.23738,-3.13663 -0.23391,-7.90152 0.004,-5.98183 0.0871,-7.32117 0.58645,-9.49146 0.31545,-1.37098 0.802052,-3.162656 0.877222,-3.229916 0.021,-0.0188 0.90955,0.0522 1.97463,0.15747 1.06727,0.10555 3.13757,0.21728 4.612157,0.24885 l 2.6756,0.0573 -0.0695,1.214516 c -0.25854,4.51696 -0.6067,7.37607 -1.18434,9.72567 -0.8168,3.32235 -2.62921,13.2622 -3.468777,19.02372 l -0.19306,1.32495 -0.37931,-0.0156 c -0.20863,-0.009 -0.74283,-0.0463 -1.1871,-0.0838 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverForeArm}>
                                                <path className='anatomy-bg' d="m 135.24031,129.05227 c -0.8915,-6.01888 -2.71675,-16.02897 -3.45943,-18.97228 -0.42613,-1.68878 -0.62817,-2.9278 -0.85634,-5.25161 -0.14999,-1.5276 -0.38344,-4.876846 -0.3836,-5.503346 l -6e-5,-0.25174 2.66567,-0.053 c 1.46612,-0.0292 3.39267,-0.12386 4.28123,-0.21046 0.88855,-0.0865 1.76095,-0.16626 1.93867,-0.17705 0.32049,-0.0194 0.32509,-0.0125 0.56738,0.84764 1.05295,3.738326 1.14867,4.730336 1.14829,11.900446 -3.2e-4,5.62913 -0.007,5.79917 -0.34446,9.34693 -0.44506,4.67279 -0.66904,7.54692 -0.67021,8.60012 l -9.3e-4,0.84315 -1.31937,9.7e-4 c -0.72566,0 -1.78366,0.028 -2.35112,0.0616 l -1.03175,0.0611 -0.18397,-1.24205 z" />
                                            </OverlayTrigger>
                                            {/*hand part kobji picher*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWrist}>
                                                <path className='anatomy-bg' d="m 83.488832,151.17683 c -0.37702,-0.15958 -1.09456,-0.52871 -1.5945,-0.82026 l -0.909,-0.53012 -0.53887,-1.03459 c -0.67029,-1.28692 -1.05565,-1.98175 -1.891292,-3.41005 -0.36129,-0.61753 -0.76208,-1.40556 -0.89063,-1.7512 l -0.23375,-0.62841 0.37964,-3.74133 c 0.45753,-4.50895 0.70948,-7.31787 0.70948,-7.90985 v -0.43839 l 1.857892,0.0735 c 1.02184,0.0404 2.11744,0.10138 2.43467,0.13536 0.5647,0.0605 0.58068,0.0709 0.76231,0.49546 0.10206,0.23848 0.53141,0.90155 0.954167,1.47348 0.42275,0.57193 0.82009,1.20067 0.88296,1.39722 0.22195,0.69373 0.31912,2.37804 0.23464,4.06721 -0.0907,1.81444 -0.007,3.25347 0.23062,3.95616 0.21081,0.62387 0.0894,0.86184 -0.43962,0.86184 -0.78713,0 -1.325857,-0.75302 -2.068157,-2.8908 -0.24844,-0.71547 -0.55704,-1.60089 -0.68579,-1.96758 -0.12881,-0.3667 -0.28625,-0.68229 -0.34998,-0.7013 -0.25357,-0.0756 -0.49443,1.37894 -0.7936,4.79267 -0.15782,1.80077 -0.15668,1.80373 0.94209,2.45793 l 0.92078,0.54823 0.729597,-0.10777 c 0.91359,-0.13498 1.87654,-0.1386 2.14917,-0.009 0.28709,0.13745 0.26087,0.42745 -0.059,0.65256 -0.14703,0.10347 -0.80133,0.35591 -1.454,0.56096 -0.652657,0.20501 -1.186657,0.40671 -1.186657,0.44817 0,0.16847 0.36985,0.17647 1.401127,0.0303 1.77744,-0.25187 2.3685,-0.18489 2.3685,0.26837 0,0.41736 -0.50237,0.65734 -2.35195,1.1235 -1.108807,0.27945 -1.114967,0.27988 -1.507847,0.1026 -0.21697,-0.0979 -0.49706,-0.20634 -0.62241,-0.24096 -0.19815,-0.0547 -0.22108,-0.031 -0.17569,0.18147 0.0399,0.18666 0.28463,0.36739 1.0357,0.76478 0.957407,0.50659 1.690427,1.08145 1.828597,1.43404 0.0447,0.11402 -0.0225,0.25516 -0.1951,0.40953 -0.37302,0.33374 -0.99945,0.31543 -1.874077,-0.0547 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWrist}>
                                                <path className='anatomy-bg' d="m 133.34118,151.27443 c -0.11847,-0.10604 -0.21523,-0.24693 -0.21501,-0.31317 9.7e-4,-0.30178 0.48147,-0.76491 1.25623,-1.21092 1.49208,-0.85896 1.65137,-0.97211 1.65137,-1.17308 0,-0.24111 -0.0478,-0.23816 -0.64138,0.0395 l -0.47982,0.2245 -1.17461,-0.28156 c -1.44748,-0.34697 -2.10285,-0.61511 -2.26062,-0.9249 -0.10421,-0.20463 -0.0863,-0.26256 0.12945,-0.41888 0.30631,-0.22191 0.67201,-0.22629 2.1145,-0.0253 1.08427,0.15108 1.45085,0.13944 1.45085,-0.0461 0,-0.0489 -0.53477,-0.25254 -1.18837,-0.4527 -1.52238,-0.46622 -2.0926,-0.91736 -1.51131,-1.19569 0.28197,-0.13501 1.42467,-0.11868 2.21501,0.0315 l 0.64623,0.12287 0.92928,-0.5553 c 0.80511,-0.48108 0.93877,-0.60049 1.00024,-0.89362 0.13127,-0.62605 -0.40311,-5.59569 -0.659,-6.12859 l -0.16195,-0.33727 -0.2036,0.41746 c -0.11198,0.22961 -0.28047,0.68491 -0.37442,1.01178 -0.34118,1.18696 -1.02155,2.91866 -1.34245,3.41685 -0.48377,0.751 -1.27095,1.10984 -1.61679,0.73702 -0.11472,-0.12365 -0.10555,-0.31121 0.0517,-1.058 0.15099,-0.71722 0.18313,-1.27716 0.15318,-2.66823 -0.0579,-2.68947 -8.6e-4,-4.19977 0.18295,-4.84315 0.11361,-0.39769 0.41447,-0.9177 0.96703,-1.6714 0.44116,-0.60175 0.85898,-1.26393 0.92849,-1.4715 0.0695,-0.20758 0.18556,-0.42135 0.25788,-0.47505 0.0734,-0.0545 1.13684,-0.12461 2.4059,-0.15868 l 2.27442,-0.061 v 0.29423 c 0,0.71646 0.7345,8.29769 1.01724,10.4996 0.12925,1.0065 0.12933,1.24884 5.4e-4,1.68629 -0.0827,0.28098 -0.90268,1.85965 -1.82214,3.50816 l -1.67175,2.99729 -0.61984,0.36916 c -0.34091,0.20304 -1.02875,0.55622 -1.52853,0.78484 -1.05966,0.48475 -1.78465,0.55954 -2.16086,0.22296 z" />
                                            </OverlayTrigger>
                                            {/*back part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWaist}>
                                                <path className='anatomy-bg' d="m 89.139989,108.90649 c 0.310917,-1.15437 0.988007,-3.22524 1.302017,-3.98224 0.42006,-1.01263 1.71325,-3.63564 3.99064,-8.094236 0.825647,-1.61644 1.605787,-3.18994 1.733647,-3.49667 0.39221,-0.94089 0.31152,-1.59411 -0.67509,-5.4648 -0.805797,-3.16137 -0.77513,-2.85657 -0.29424,-2.92536 0.65716,-0.094 4.58341,-0.43579 6.210027,-0.54055 7.07245,-0.45554 16.18303,-0.25056 21.74227,0.48919 l 0.81137,0.10801 -0.0603,0.30215 c -0.0331,0.16617 -0.31999,1.32115 -0.63744,2.56661 -1.0193,3.99901 -1.08753,4.62037 -0.62238,5.6688 0.15684,0.35353 1.22828,2.50734 2.38097,4.78625 1.1527,2.278906 2.37678,4.730536 2.72018,5.448056 0.80549,1.68305 2.06504,5.21413 1.90952,5.35327 -0.0349,0.0312 -1.12126,-0.0123 -2.41413,-0.0962 -3.67089,-0.23886 -7.34525,-0.42537 -10.80543,-0.54849 -3.97167,-0.14133 -13.97825,-0.0605 -18.094227,0.1462 -4.040337,0.20288 -8.013167,0.42974 -8.701227,0.49686 l -0.569577,0.0556 z" />
                                            </OverlayTrigger>
                                            {/*lower back part pacha*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverHip}>
                                                <path className='anatomy-bg' d="m 92.952216,130.64069 c -1.02979,-0.0744 -4.735997,-0.4911 -5.567487,-0.62597 -0.26306,-0.0427 -0.35725,-0.11574 -0.40084,-0.31106 -0.0314,-0.14042 -0.11166,-1.62935 -0.17836,-3.30872 -0.1576,-3.9646 -0.0123,-5.85318 0.81825,-10.62971 0.26616,-1.53084 1.17347,-5.70986 1.25563,-5.78336 0.0494,-0.0442 5.496177,-0.37733 8.596384,-0.52576 8.525037,-0.40818 16.173957,-0.39413 24.448777,0.0449 4.7836,0.2538 7.91497,0.45997 7.99911,0.52668 0.19789,0.15688 1.22758,4.47705 1.57422,6.6048 0.33976,2.08549 0.473,3.82501 0.40224,5.25161 -0.26177,5.27768 -0.42312,7.9592 -0.48235,8.01598 -0.0709,0.068 -3.01708,0.45444 -5.13121,0.67307 -0.65161,0.0674 -2.29948,0.11991 -3.66193,0.1166 -2.71245,-0.006 -4.09181,-0.16339 -5.81601,-0.66169 -1.98036,-0.57233 -4.04973,-1.71786 -5.5191,-3.05513 l -0.67244,-0.61198 -0.0708,-0.74959 c -0.06,-0.6351 -0.0971,-0.73996 -0.24305,-0.68663 -0.57967,0.21186 -1.10822,0.24043 -1.81471,0.0981 l -0.35004,-0.0706 v 0.50444 0.50444 l -1.15782,1.03327 c -3.39209,3.02723 -7.569257,4.11294 -14.028434,3.64623 z" />
                                            </OverlayTrigger>
                                            {/*thigh part picher side picher side*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverThigh}>
                                                <path className='anatomy-bg' d="m 96.055463,183.54903 c -1.00552,-0.08 -3.346077,-0.3729 -3.405587,-0.42613 -0.0199,-0.0178 -0.0487,-1.73844 -0.0641,-3.82365 -0.0225,-3.0447 -0.0635,-3.96716 -0.20846,-4.68429 -0.25218,-1.24728 -0.5663,-3.67276 -1.68763,-13.03104 -1.25031,-10.43458 -1.621867,-13.2775 -1.989777,-15.22487 -0.2272,-1.20263 -0.65724,-4.58917 -0.96664,-7.61244 -0.29289,-2.86189 -0.72041,-7.91965 -0.67301,-7.96205 0.0161,-0.0144 0.6576,0.0561 1.42575,0.15644 3.405707,0.44505 4.490507,0.52391 7.158794,0.52042 2.24104,-0.002 2.8319,-0.0352 3.92025,-0.21433 3.251997,-0.53515 5.666477,-1.63323 8.070997,-3.67059 l 0.52078,-0.44127 -0.0608,0.7227 c -0.0335,0.39749 -0.0875,1.22137 -0.12017,1.83085 -0.0327,0.60948 -0.22752,3.73153 -0.43297,6.93791 -0.20543,3.20639 -0.47118,7.54258 -0.59055,9.636 -0.23925,4.1961 -0.32437,5.09612 -1.02064,10.79232 -0.26235,2.14642 -0.55165,4.553 -0.6429,5.34797 -0.65427,5.70093 -0.8508,10.6099 -0.55551,13.87584 0.18731,2.0717 0.14356,3.2041 -0.21674,5.61054 -0.13636,0.91048 -0.21591,1.18847 -0.35052,1.22411 -0.42521,0.11255 -2.10019,0.34777 -3.12049,0.43812 -1.252177,0.11083 -3.579597,0.10973 -4.990087,-0.002 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverThigh}>
                                                <path className='anatomy-bg' d="m 118.63699,183.54703 c -1.09998,-0.088 -2.84343,-0.3135 -3.68644,-0.47675 -0.65367,-0.12658 -0.59148,0.007 -0.82669,-1.77979 -0.29385,-2.23274 -0.31366,-3.15356 -0.114,-5.2998 0.3762,-4.04401 0.10522,-8.15763 -1.28845,-19.56107 -0.56642,-4.6345 -0.76269,-6.70716 -0.92163,-9.73236 -0.0641,-1.21895 -0.30708,-5.22994 -0.54009,-8.91329 -0.233,-3.68337 -0.45024,-7.17401 -0.48274,-7.75699 -0.0325,-0.58297 -0.087,-1.38199 -0.12113,-1.77559 l -0.062,-0.71564 0.79181,0.61292 c 2.13139,1.64986 4.53584,2.64633 7.57717,3.14019 0.84101,0.13657 1.64352,0.17554 3.66194,0.17784 2.62172,0.002 3.43619,-0.0542 6.83123,-0.47989 1.03227,-0.12943 1.89695,-0.21733 1.92151,-0.19536 0.0539,0.0482 -0.33003,5.68207 -0.62424,9.16061 -0.26237,3.10198 -0.49936,5.24159 -0.69911,6.31158 -0.36685,1.96518 -0.72483,4.71699 -2.04326,15.70667 -1.0627,8.85803 -1.30698,10.75603 -1.59362,12.38227 -0.21548,1.22248 -0.23781,1.70297 -0.23804,5.12182 l -2.1e-4,3.77281 -0.75393,0.10641 c -2.09008,0.29493 -4.61923,0.367 -6.78796,0.19345 z" />
                                            </OverlayTrigger>
                                            {/*lower leg part leg picher side*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLeg}>
                                                <path className='anatomy-bg' d="m 96.814793,240.53581 -0.49944,-0.0428 -0.0748,-0.74194 c -0.0897,-0.88927 -0.69101,-4.81837 -2.480617,-16.20774 -1.53814,-9.78904 -2.25845,-14.44142 -2.4169,-15.61032 -0.45803,-3.37912 -0.73144,-9.823 -0.55694,-13.12673 0.14591,-2.76251 0.30933,-3.95809 0.75458,-5.52095 0.41615,-1.46062 0.61639,-2.50455 0.78637,-4.09989 l 0.13485,-1.26516 0.54137,0.0673 c 0.29776,0.0369 1.02605,0.12833 1.61841,0.20304 2.624827,0.33101 6.335814,0.27025 8.739424,-0.1431 l 0.98473,-0.16935 0.0722,1.01833 c 0.0396,0.56008 0.23698,2.64441 0.43846,4.63184 0.61283,6.04516 0.6451,6.94552 0.38334,10.69596 -0.30635,4.38918 -0.537,7.97942 -1.3557,21.10283 -0.38517,6.17426 -0.77083,12.26662 -0.85703,13.53858 -0.14341,2.11669 -0.14111,2.44845 0.0273,3.91565 l 0.18401,1.60302 -0.59256,0.0609 c -0.76042,0.0782 -5.175437,0.14674 -5.830957,0.0906 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLeg}>
                                                <path className='anatomy-bg' d="m 116.83682,240.50511 c -0.57687,-0.0353 -1.07874,-0.0911 -1.11528,-0.12377 -0.0365,-0.0327 -0.0176,-0.83178 0.0421,-1.77576 0.0597,-0.94399 0.0882,-1.8681 0.0634,-2.05359 -0.025,-0.18549 -0.26327,-3.80622 -0.52973,-8.04606 -0.61365,-9.76506 -1.73351,-27.26449 -1.90184,-29.71906 -0.14951,-2.18046 -0.0569,-4.01822 0.44926,-8.92129 0.1751,-1.69594 0.36829,-3.75195 0.42931,-4.56891 0.0611,-0.81699 0.12374,-1.49681 0.13926,-1.51074 0.0155,-0.0139 0.3441,0.0339 0.73009,0.10629 1.89245,0.3549 3.39531,0.47131 6.08112,0.47103 2.01871,0 2.97365,-0.0412 3.81554,-0.16387 0.61761,-0.09 1.15571,-0.16359 1.19577,-0.16359 0.0401,0 0.10442,0.40213 0.14305,0.89363 0.0961,1.22282 0.44252,3.06491 0.83081,4.41743 0.44544,1.55162 0.61678,2.82303 0.74927,5.55996 0.18582,3.83854 -0.12336,9.99023 -0.70555,14.03803 -0.25277,1.75741 -0.99785,6.54242 -3.22596,20.7174 -1.12523,7.15862 -1.56433,10.1167 -1.56433,10.53845 0,0.27151 -0.007,0.27428 -0.82403,0.33609 -0.97777,0.0739 -3.33399,0.0584 -4.80224,-0.0317 z" />
                                            </OverlayTrigger>
                                            {/*Foot part picher side */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverFoot}>
                                                <path className='anatomy-bg' d="m 103.50721,268.54153 c -0.23111,-0.0482 -0.52281,-0.22469 -0.75392,-0.45621 l -0.37697,-0.37762 -0.33481,0.32153 c -0.50459,0.48456 -0.97183,0.45258 -1.64736,-0.11279 l -0.518957,-0.4343 -0.38847,0.14522 c -0.48489,0.18126 -0.83799,0.18365 -1.30565,0.009 -0.45065,-0.16846 -0.61268,-0.42811 -0.69512,-1.11392 l -0.0639,-0.53239 -0.68237,-0.0486 c -0.59736,-0.0425 -0.72054,-0.0868 -0.98865,-0.35523 -0.19217,-0.19243 -0.33301,-0.46625 -0.37806,-0.73503 l -0.0717,-0.42837 -0.52462,-0.045 c -0.288557,-0.0248 -0.606817,-0.1058 -0.707267,-0.18001 -0.78331,-0.5786 -0.79335,-2.46282 -0.0354,-6.63828 0.12017,-0.66196 0.26677,-1.6376 0.32577,-2.16809 0.15558,-1.39887 0.659227,-3.91926 1.460447,-7.30877 0.63268,-2.67642 0.68621,-2.9877 0.53881,-3.13343 -0.29369,-0.29035 -0.60154,-1.01686 -0.60396,-1.42532 -0.001,-0.261 0.10975,-0.59048 0.32074,-0.94928 0.1878,-0.31941 0.32309,-0.69678 0.32307,-0.90111 l -4e-5,-0.35158 h 2.39645 c 1.318057,0 2.893247,-0.0328 3.500427,-0.0728 l 1.10396,-0.0728 v 0.37936 c 0,0.30905 0.0582,0.41642 0.31387,0.57931 0.17263,0.10997 0.42123,0.39839 0.55246,0.64091 0.29725,0.54938 0.23975,1.19216 -0.17178,1.91984 l -0.28017,0.49545 0.4889,3.79873 c 1.39266,10.82092 1.70824,13.75812 1.72299,16.03646 0.0178,2.75094 -0.20958,3.30811 -1.43491,3.51601 -0.316,0.0536 -0.60428,0.093 -0.64062,0.0876 -0.0363,-0.005 -0.23571,-0.0453 -0.44303,-0.0885 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverFoot}>
                                                <path className='anatomy-bg' d="m 113.90512,268.56953 c -0.41693,-0.0948 -0.68671,-0.33278 -0.93584,-0.82566 -0.24287,-0.48047 -0.25305,-0.59129 -0.24537,-2.66938 0.008,-2.2705 0.0619,-2.82808 1.025,-10.69596 0.23681,-1.93442 0.59682,-4.78262 0.80002,-6.32933 l 0.36946,-2.8122 -0.25915,-0.51221 c -0.5635,-1.11381 -0.46569,-1.74708 0.37421,-2.42268 0.45526,-0.3662 0.53659,-0.48431 0.53659,-0.7791 v -0.34748 l 0.6193,0.0731 c 0.34061,0.0403 1.86732,0.0731 3.39267,0.0731 h 2.77337 v 0.46161 c 0,0.32748 0.0704,0.54693 0.24234,0.75521 0.20198,0.24471 0.24215,0.41655 0.24126,1.03197 -8.6e-4,0.62782 -0.0464,0.8118 -0.30386,1.22875 l -0.30279,0.49036 0.48595,2.015 c 0.77169,3.19976 1.35312,5.96225 1.52927,7.26592 0.0896,0.66284 0.30529,2.07242 0.47938,3.13238 0.50667,3.08493 0.5573,3.5429 0.51881,4.69276 -0.0413,1.23414 -0.16032,1.53931 -0.73628,1.88805 -0.26971,0.16331 -0.47303,0.21455 -0.71464,0.18008 -0.32426,-0.0463 -0.34049,-0.0324 -0.40867,0.34906 -0.15223,0.85171 -0.67277,1.23513 -1.62252,1.19512 l -0.4302,-0.0182 -0.0646,0.53237 c -0.0739,0.60912 -0.21425,0.88804 -0.55378,1.10081 -0.27957,0.17521 -1.08626,0.19604 -1.58366,0.0409 -0.32939,-0.10273 -0.36514,-0.0902 -0.6636,0.2338 -0.33779,0.36664 -0.93062,0.60095 -1.27384,0.50348 -0.11578,-0.0329 -0.35324,-0.20523 -0.52772,-0.38304 l -0.31724,-0.32325 -0.2359,0.28546 c -0.47351,0.57301 -1.30386,0.79454 -2.20795,0.58908 z" />
                                            </OverlayTrigger>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 7 250 270">
                                            {/* head part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popover}>
                                                <path className='anatomy-bg' d="m 108.41016,35.505222 c -0.29606,-0.0187 -1.13641,-0.0951 -1.86743,-0.16958 -1.03825,-0.1058 -1.36117,-0.17359 -1.47558,-0.30979 -0.32599,-0.38813 -1.44904,-2.4479 -1.8023,-3.3056 -0.20733,-0.50341 -0.51515,-1.40571 -0.68404,-2.00513 l -0.30705,-1.08984 -0.45125,-0.17884 c -0.34688,-0.13746 -0.51199,-0.28651 -0.71387,-0.64437 -0.62188,-1.10242 -1.26988,-3.44342 -1.110481,-4.0118 0.09415,-0.33578 0.590731,-0.5658 1.045671,-0.48437 0.33687,0.0603 0.34438,0.0543 0.27606,-0.21783 -0.14996,-0.59735 -0.20429,-4.42477 -0.0776,-5.46476 0.46189,-3.79089 2.1544,-6.07928 5.66064,-7.6536 2.1086,-0.94676 5.36746,-1.24473 7.71878,-0.70575 4.27354,0.97959 7.10983,4.2711 7.51974,8.72663 0.0983,1.06867 0.0902,1.61804 -0.0641,4.36003 l -0.0556,0.98754 h 0.47117 c 0.70789,0 0.88638,0.22668 0.86213,1.09491 -0.021,0.75322 -0.2478,1.84244 -0.59006,2.8341 -0.25379,0.73536 -0.76397,1.27367 -1.20712,1.27367 -0.24576,0 -0.29587,0.0623 -0.4456,0.55399 -0.75394,2.47579 -2.14944,5.56818 -2.71773,6.0224 -0.3178,0.25402 -3.42629,0.45949 -6.6486,0.43949 -1.53869,-0.01 -3.03984,-0.0327 -3.33589,-0.0516 z" />
                                            </OverlayTrigger>
                                            {/* neck part front*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverNeck}>
                                                <path className='anatomy-bg' d="m 108.78695,47.456332 c -2.83654,-0.11153 -7.41136,-0.47727 -7.56667,-0.60492 -0.0465,-0.0382 0.29261,-0.167 0.75359,-0.28617 1.22219,-0.31591 2.50825,-0.88285 2.97188,-1.31008 0.73892,-0.6809 0.773,-0.9158 0.773,-5.32954 v -3.88604 l 0.53827,0.0592 c 3.00068,0.33014 8.93784,0.33023 11.26005,1.9e-4 l 0.38677,-0.0551 -0.009,3.83566 c -0.009,3.42959 0.0106,3.89473 0.18272,4.39363 0.37048,1.07273 1.10715,1.5506 3.43457,2.22791 l 1.42002,0.41326 -1.01646,0.10965 c -3.87711,0.41824 -9.10505,0.59037 -13.12777,0.43219 z" />
                                            </OverlayTrigger>
                                            {/* chest part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverChest}>
                                                <path className='anatomy-bg' d="m 100.04677,66.982072 c -1.156378,-0.16455 -1.973522,-0.39601 -3.048166,-0.86336 -1.388483,-0.60383 -1.88252,-0.99058 -2.362752,-1.84966 l -0.382483,-0.68421 4.35e-4,-1.93805 c 2.11e-4,-1.06594 0.04772,-2.63176 0.105553,-3.4796 0.231018,-3.38819 0.793647,-9.73586 0.869826,-9.81357 0.07006,-0.0715 3.98867,-1.10855 4.22506,-1.11814 0.04796,-0.002 0.05936,0.0367 0.02539,0.0858 -0.08945,0.12945 0.122315,0.16858 2.094507,0.38725 7.1758,0.79561 15.18909,0.76265 21.97685,-0.0903 l 1.46837,-0.18454 1.69649,0.42401 c 0.93307,0.23321 1.73132,0.4588 1.77388,0.50129 0.0741,0.074 0.63961,6.39091 0.86082,9.61553 0.0582,0.84784 0.10593,2.53056 0.10613,3.73937 3.3e-4,2.15744 -0.005,2.2074 -0.27474,2.71828 -0.36127,0.68345 -1.05393,1.21675 -2.25479,1.73609 -1.47489,0.63784 -2.4059,0.82871 -4.31861,0.88542 -1.26474,0.0376 -1.82523,0.0123 -2.51622,-0.11296 -1.24193,-0.22521 -2.47556,-0.64759 -3.40415,-1.16555 -0.98263,-0.54811 -2.41311,-1.74117 -2.93671,-2.44929 l -0.3949,-0.53408 h -1.76158 -1.76156 l -0.5061,0.81895 c -0.27834,0.45042 -0.73691,1.04718 -1.01901,1.32613 -0.79578,0.78685 -2.31118,1.49544 -3.98619,1.86389 -0.99326,0.21849 -3.32042,0.31719 -4.27521,0.18132 z" />
                                            </OverlayTrigger>
                                            {/* upper arm part samne*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverArm}>
                                                <path className='anatomy-bg' d="m 87.794009,93.221992 c -1.656492,-0.10124 -4.479263,-0.35299 -4.540726,-0.40493 -0.0402,-0.034 -0.0059,-0.66866 0.07534,-1.41053 0.141075,-1.28229 0.225706,-3.39177 0.485122,-12.0914 0.297935,-9.99144 1.025323,-19.84257 1.720129,-23.2958 0.582305,-2.89414 1.96417,-4.96549 4.030908,-6.0422 0.783327,-0.40808 4.505358,-1.49602 4.656235,-1.36099 0.03138,0.0281 -0.06888,1.47322 -0.222872,3.21138 -0.449306,5.07168 -0.508136,5.91548 -0.593167,8.50747 -0.110489,3.36823 0.06148,7.34622 0.580731,13.43212 0.152711,1.79002 0.150772,1.85512 -0.109315,3.66113 -0.145611,1.0113 -0.337734,2.46738 -0.426937,3.23573 -0.08921,0.76836 -0.330718,2.15575 -0.5367,3.08307 -0.814228,3.66572 -1.46519,6.71064 -1.674263,7.83153 -0.120728,0.64725 -0.246546,1.29603 -0.279599,1.44176 l -0.06006,0.26495 -1.310234,-0.0169 c -0.72063,-0.01 -1.528229,-0.0301 -1.794686,-0.0465 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverArm}>
                                                <path className='anatomy-bg' d="m 132.79426,93.250392 c 0,-0.17863 -0.92067,-4.59009 -1.56158,-7.48246 -0.44428,-2.00498 -0.87623,-4.25798 -0.96976,-5.05815 -0.0927,-0.79357 -0.28747,-2.27121 -0.43269,-3.28366 -0.25902,-1.80585 -0.26104,-1.87355 -0.1063,-3.56479 0.0868,-0.94819 0.23248,-2.80788 0.32384,-4.13264 0.47903,-6.94602 0.4252,-9.5768 -0.37941,-18.54208 -0.1163,-1.29578 -0.21144,-2.41564 -0.21144,-2.48856 0,-0.17231 0.28083,-0.11708 2.20695,0.43408 2.05838,0.58903 2.83185,0.9654 3.83,1.86367 1.19316,1.07376 2.07401,2.68293 2.52036,4.60426 0.85481,3.67953 1.52726,13.82472 1.99656,30.12205 0.10022,3.48026 0.15603,4.43097 0.38216,6.50975 l 0.0688,0.63265 -1.33075,0.11828 c -2.74662,0.24413 -6.33676,0.39575 -6.33676,0.2676 z" />
                                            </OverlayTrigger>
                                            {/* upper abdomen part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverAbdomen}>
                                                <path className='anatomy-bg' d="m 106.95679,84.128672 c -3.3321,-0.14184 -9.942706,-0.67289 -10.097192,-0.81115 -0.01857,-0.0167 -0.371411,-1.43338 -0.784114,-3.14837 -0.412716,-1.71499 -0.850274,-3.4867 -0.972365,-3.93711 -0.12208,-0.45043 -0.217971,-1.05217 -0.213081,-1.33722 0.0047,-0.28507 -0.08522,-1.73747 -0.200281,-3.2276 -0.115074,-1.49011 -0.238,-3.33794 -0.273215,-4.10632 -0.03526,-0.76835 -0.09086,-1.59212 -0.123702,-1.83056 l -0.05971,-0.43356 0.507901,0.46011 c 0.679073,0.61516 2.532765,1.43618 3.980019,1.76279 3.33009,0.75152 7.30138,0.1134 9.66869,-1.55356 0.56983,-0.40126 1.22463,-1.17563 1.81858,-2.15068 l 0.18339,-0.30106 h 1.17663 1.17662 l 0.61276,0.65034 c 1.22295,1.29791 2.80773,2.37963 4.28505,2.92482 3.69327,1.36297 8.15882,0.95595 11.14862,-1.01618 l 0.68023,-0.44869 -0.0569,0.41412 c -0.0313,0.22778 -0.0856,0.99944 -0.12078,1.71481 -0.0352,0.71536 -0.15768,2.51463 -0.27228,3.99835 -0.11459,1.48372 -0.20522,2.91447 -0.20139,3.17941 0.004,0.26496 -0.18615,1.24046 -0.42216,2.16779 -0.23601,0.92733 -0.65431,2.63987 -0.92956,3.80566 -0.27525,1.16579 -0.52289,2.18924 -0.5503,2.27436 -0.0387,0.12006 -0.357,0.19051 -1.42013,0.31433 -1.79382,0.20895 -4.10184,0.41459 -6.10714,0.54415 -2.16216,0.13971 -9.95109,0.19672 -12.43428,0.0909 z" />

                                            </OverlayTrigger>
                                            {/* middle abdomen part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLowerAbdomen}>
                                                <path className='anatomy-bg' d="m 108.08718,110.71842 c -4.81641,-0.10848 -9.295736,-0.37433 -13.887634,-0.82422 -1.421065,-0.13923 -2.599464,-0.26563 -2.618682,-0.28089 -0.05795,-0.0461 0.729175,-2.62629 1.123377,-3.68225 0.455031,-1.21889 1.260679,-2.88906 3.558558,-7.377098 2.289388,-4.47147 2.619788,-5.20562 2.619788,-5.82104 0,-0.66855 -0.234039,-1.81686 -0.908486,-4.45757 -0.573161,-2.2441 -0.968069,-4.03725 -0.902092,-4.09602 0.01881,-0.0169 0.567154,0.0278 1.218469,0.099 4.588362,0.50201 8.078152,0.66885 13.995292,0.66913 5.88222,2.9e-4 9.06807,-0.16292 13.179,-0.67512 0.61683,-0.0769 1.14332,-0.12022 1.16997,-0.0964 0.0748,0.0669 -0.37159,2.10172 -0.95203,4.3402 -0.68164,2.62878 -0.88657,3.7219 -0.83083,4.4319 0.053,0.67526 0.12424,0.82957 3.0686,6.64786 2.46243,4.865978 2.80013,5.578558 3.2981,6.959238 0.45984,1.27496 0.92974,2.76299 0.92974,2.9442 0,0.21256 -5.43447,0.76232 -10.18116,1.02997 -1.87644,0.10581 -8.9444,0.29625 -10.11201,0.27248 -0.35527,-0.007 -2.05086,-0.0448 -3.76797,-0.0834 z" />
                                            </OverlayTrigger>
                                            {/* forearm part samne*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverForeArm}>
                                                <path className='anatomy-bg' d="m 82.98625,130.98297 -1.847204,-0.0309 -0.06171,-0.88896 c -0.03385,-0.48893 -0.112606,-1.66937 -0.174786,-2.6232 -0.06218,-0.95381 -0.259299,-3.36005 -0.437952,-5.34718 -0.178641,-1.98715 -0.369494,-4.39339 -0.424116,-5.3472 -0.215185,-3.75792 -0.06089,-11.16883 0.274638,-13.19384 0.197024,-1.18899 0.751837,-3.3391 1.515287,-5.872368 0.321091,-1.06545 0.716339,-2.40786 0.878325,-2.98313 l 0.294514,-1.04594 0.861246,0.0604 c 0.473696,0.0332 1.321483,0.1023 1.883983,0.15363 0.562512,0.0514 1.934385,0.1224 3.04863,0.15801 l 2.02588,0.0648 -0.07523,0.24948 c -0.04138,0.13722 -0.06676,1.4228 -0.05642,2.85685 0.03691,5.115588 -0.449835,10.251758 -1.27771,13.482408 -0.397517,1.5512 -0.998136,4.57119 -1.772435,8.91199 -0.571939,3.20635 -1.74352,10.38747 -1.807628,11.07976 -0.03644,0.39295 0.202808,0.36645 -2.84735,0.31546 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverForeArm}>
                                                <path className='anatomy-bg' d="m 137.91241,130.91017 c -0.0225,-0.10696 -0.14334,-0.90984 -0.26851,-1.78418 -0.49522,-3.45916 -2.10047,-12.6645 -2.75537,-15.80072 -0.14939,-0.71536 -0.43713,-1.97269 -0.63943,-2.79403 -0.80971,-3.2874 -1.26832,-8.26237 -1.22935,-13.335898 0.0111,-1.43513 -0.0143,-2.72162 -0.0562,-2.85883 l -0.0763,-0.24948 2.02589,-0.0649 c 1.11424,-0.0357 2.48612,-0.10637 3.04862,-0.15724 0.5625,-0.0509 1.38858,-0.12092 1.83572,-0.15567 l 0.81299,-0.0631 0.46694,1.57786 c 2.60295,8.795818 2.52971,8.316428 2.53011,16.559668 3.2e-4,5.63508 -0.006,5.79405 -0.34453,9.34555 -0.46658,4.88892 -0.66997,7.55336 -0.67108,8.79156 l -9.4e-4,1.03571 -1.42644,0.007 c -0.78455,0.004 -1.82801,0.0376 -2.31881,0.0741 -0.83979,0.0625 -0.89478,0.0549 -0.9333,-0.12809 z" />
                                            </OverlayTrigger>
                                            {/* hand part kobji smane*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWrist}>
                                                <path className='anatomy-bg' d="m 85.565309,151.37946 c -1.975185,-0.9066 -1.821169,-0.73595 -3.661532,-4.05703 -0.891654,-1.60909 -1.703155,-3.15291 -1.803313,-3.43069 -0.174857,-0.48495 -0.171025,-0.60963 0.09627,-3.13123 0.283266,-2.67261 0.637903,-6.39605 0.770891,-8.09381 l 0.07358,-0.93938 1.411698,9.7e-4 c 0.776427,0 1.885029,0.0285 2.463549,0.0628 l 1.051853,0.0623 0.199352,0.39482 c 0.109667,0.21714 0.519326,0.82002 0.91039,1.33973 0.391064,0.51971 0.765778,1.12668 0.832695,1.34884 0.223495,0.74203 0.291694,2.02155 0.237201,4.45045 -0.05254,2.3409 0.02233,3.19083 0.344905,3.91864 0.04502,0.10145 -0.01493,0.23838 -0.161539,0.36964 -0.287932,0.25769 -0.669334,0.19722 -1.112634,-0.17637 -0.55359,-0.46654 -0.898953,-1.2175 -1.891094,-4.11191 -0.407708,-1.18945 -0.480667,-1.30412 -0.649775,-1.02132 -0.258535,0.43232 -0.82315,5.65313 -0.675211,6.24336 0.06194,0.24692 0.259863,0.42228 0.993128,0.87969 l 0.915833,0.5713 0.699013,-0.13101 c 0.897402,-0.16818 1.94688,-0.17212 2.197328,-0.008 0.503152,0.32924 -0.08404,0.76965 -1.638307,1.22885 -0.574325,0.16967 -1.063231,0.3232 -1.086481,0.3412 -0.02327,0.018 0.01175,0.0903 0.07664,0.16089 0.0985,0.10628 0.308078,0.0993 1.226473,-0.0405 1.48321,-0.22587 2.049131,-0.22665 2.275141,-0.003 0.514331,0.50862 -0.09826,0.8816 -2.322922,1.41441 l -0.949085,0.22732 -0.59259,-0.23453 c -0.325922,-0.1295 -0.608706,-0.23504 -0.628418,-0.23504 -0.01975,0 -0.01293,0.10714 0.01505,0.23809 0.03797,0.17751 0.314909,0.38379 1.08855,0.8107 1.575446,0.86936 2.081313,1.43752 1.63531,1.83666 -0.403606,0.36119 -1.122237,0.27327 -2.34187,-0.28654 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverWrist}>
                                                <path className='anatomy-bg' d="m 135.80863,151.67092 c -0.11842,-0.10602 -0.21531,-0.25869 -0.21531,-0.33936 0,-0.25939 0.84942,-0.98138 1.64706,-1.39998 0.93483,-0.49058 1.25965,-0.74172 1.25965,-0.97392 0,-0.16155 -0.0444,-0.15714 -0.58951,0.0586 l -0.58952,0.23332 -0.97709,-0.23401 c -1.49746,-0.35864 -2.17078,-0.62648 -2.36171,-0.9394 -0.15638,-0.25633 -0.15163,-0.28079 0.0889,-0.45765 0.312,-0.22938 0.68094,-0.23048 2.19757,-0.006 0.96951,0.14313 1.17961,0.14991 1.2803,0.0413 0.0662,-0.0714 0.10144,-0.14373 0.0782,-0.16064 -0.0232,-0.017 -0.51501,-0.17482 -1.09283,-0.35089 -1.65799,-0.50522 -2.08144,-0.81631 -1.59303,-1.17025 0.30266,-0.21932 1.15323,-0.23369 2.15915,-0.0365 l 0.69977,0.13719 0.90787,-0.5505 c 0.67488,-0.40922 0.93124,-0.62422 0.99888,-0.83772 0.0953,-0.30065 -0.0188,-1.9736 -0.29868,-4.3819 -0.17439,-1.50041 -0.3173,-2.05505 -0.51437,-1.99626 -0.0682,0.0203 -0.28536,0.51034 -0.48262,1.08888 -1.04573,3.06711 -1.37671,3.7797 -1.95934,4.21844 -0.37713,0.28401 -0.86772,0.33166 -1.07816,0.10475 -0.11313,-0.12199 -0.10332,-0.30984 0.054,-1.03572 0.19511,-0.90009 0.25583,-3.53861 0.10688,-4.64422 -0.0853,-0.63322 0.12104,-2.70341 0.31971,-3.20734 0.086,-0.21814 0.44421,-0.77803 0.796,-1.24415 0.35179,-0.46614 0.7402,-1.02637 0.86312,-1.24496 0.15928,-0.28323 0.30992,-0.41381 0.52423,-0.45439 0.1654,-0.0313 1.25268,-0.0868 2.41618,-0.12335 l 2.11545,-0.0664 0.067,0.71349 c 0.0369,0.39242 0.16378,1.77571 0.28204,3.07396 0.26271,2.88405 0.73989,7.31303 0.81106,7.52783 0.12396,0.37414 -0.26489,1.26169 -1.68277,3.84099 -0.83019,1.51021 -1.59876,2.8976 -1.70793,3.08306 -0.22732,0.3862 -1.1559,0.98053 -2.41652,1.54664 -0.99915,0.4487 -1.74774,0.51513 -2.11374,0.18759 z" />
                                            </OverlayTrigger>
                                            {/* lower abdomen part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLowerAbdomenLast}>
                                                <path className='anatomy-bg'  d="m 113.05123,126.27672 c -0.0361,-0.0843 -0.0657,-0.34214 -0.0657,-0.57305 v -0.41983 l -0.49265,0.15023 c -0.48055,0.14655 -1.27091,0.13903 -1.68739,-0.0161 -0.16548,-0.0617 -0.1884,-0.008 -0.1884,0.43634 v 0.5065 l -0.34055,-0.42394 c -1.00387,-1.24959 -2.33745,-2.35309 -4.09688,-3.39002 -4.10197,-2.41756 -10.277087,-4.42371 -15.114273,-4.91026 l -1.196336,-0.12034 0.407767,-2.16779 c 0.224259,-1.19226 0.556728,-2.79245 0.73879,-3.55593 0.182073,-0.76348 0.331047,-1.39436 0.331047,-1.40196 0,-0.007 0.714564,0.0642 1.587928,0.15946 11.909977,1.29958 26.197767,1.32747 37.329747,0.0729 0.94738,-0.10677 1.82321,-0.21341 1.9463,-0.23697 0.20695,-0.0397 0.25361,0.0712 0.6199,1.47229 0.4934,1.88728 0.65439,2.59258 0.93318,4.08831 0.12141,0.65137 0.24233,1.27401 0.26872,1.38362 0.0452,0.18768 -0.0255,0.20609 -1.21412,0.3163 -5.83007,0.54059 -13.24584,3.19618 -17.14185,6.13856 -0.89479,0.67575 -1.43206,1.20441 -2.12911,2.09495 -0.31947,0.40814 -0.44737,0.5104 -0.49613,0.39669 z" />
                                            </OverlayTrigger>
                                            {/* thigh part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverThigh}>
                                                <path className='anatomy-bg' d="m 105.28812,176.08903 c -2.08545,-0.21897 -5.916933,-0.35003 -8.1495,-0.27875 l -2.120766,0.0677 -0.05619,-0.22888 c -0.240738,-0.98122 -0.543375,-3.29959 -1.784354,-13.66912 -1.08353,-9.05397 -1.631407,-13.27741 -1.937229,-14.93361 -0.417288,-2.2599 -0.972782,-6.99473 -1.395971,-11.89871 -0.635999,-7.37004 -0.745442,-12.08795 -0.348443,-15.02075 0.128427,-0.94877 0.256267,-1.74542 0.284101,-1.77032 0.02786,-0.0249 0.597645,0.006 1.266262,0.0686 3.382779,0.31676 7.772069,1.52721 11.4944,3.16987 3.66425,1.61702 6.45083,3.65844 7.43942,5.45003 0.60541,1.09716 0.6119,1.21471 0.31962,5.79031 -0.12524,1.96063 -0.346,5.40741 -0.49057,7.65949 -0.14457,2.25208 -0.33741,5.41704 -0.42852,7.03324 -0.18707,3.31808 -0.29258,4.4008 -0.97189,9.9718 -1.08916,8.93235 -1.28649,11.28934 -1.28856,15.39122 l -10e-4,3.34801 -0.32297,-0.0129 c -0.17763,-0.007 -0.85586,-0.0688 -1.50717,-0.13722 z" />

                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverThigh}>
                                                <path className='anatomy-bg' d="m 116.58852,172.99559 c -0.005,-4.09316 -0.21762,-6.57082 -1.39078,-16.17011 -0.55038,-4.50351 -0.75917,-6.7118 -0.92006,-9.73093 -0.0622,-1.16578 -0.30571,-5.1545 -0.5413,-8.86381 -0.55689,-8.76866 -0.60315,-9.6433 -0.5181,-9.79583 0.0391,-0.0702 0.16961,-0.40337 0.28982,-0.74017 0.12023,-0.33681 0.37883,-0.85534 0.57468,-1.15229 0.46493,-0.70492 2.27955,-2.32993 3.37049,-3.01833 4.02951,-2.54266 10.87174,-4.76536 15.83703,-5.14462 l 0.87283,-0.0667 0.0661,0.56524 c 0.23583,2.01814 0.21464,2.91289 -0.25638,10.82607 -0.51771,8.69763 -1.048,14.79125 -1.50499,17.29407 -0.29707,1.62699 -0.81798,5.64153 -1.88148,14.50005 -1.31718,10.9716 -1.7556,14.27365 -1.91398,14.41538 -0.0263,0.0235 -1.03525,-0.006 -2.24224,-0.066 -2.72719,-0.13501 -6.6286,-0.0283 -9.29981,0.25436 l -0.53829,0.0569 -0.004,-3.16343 z" />

                                            </OverlayTrigger>
                                            {/* knee part */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverKnee}>
                                                <path className='anatomy-bg' d="m 95.814386,189.75869 c -0.35526,-0.0158 -0.89113,-0.0531 -1.190805,-0.0828 l -0.54488,-0.0541 0.238035,-1.0121 c 0.546338,-2.32295 0.796844,-5.18275 0.797444,-9.10376 l 4.35e-4,-2.85105 1.964729,-0.061 c 2.225679,-0.0691 5.829996,0.0503 8.214976,0.27206 0.88475,0.0822 1.68654,0.17097 1.78176,0.19707 0.37744,0.10346 0.34191,2.44675 -0.0787,5.19767 -0.19625,1.28319 -0.15955,2.97555 0.12108,5.58289 0.0852,0.79201 0.14432,1.44954 0.13129,1.46116 -0.0641,0.057 -3.24592,0.33538 -4.81441,0.42111 -1.61504,0.0883 -4.996839,0.10506 -6.620854,0.0328 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverKnee}>
                                                <path className='anatomy-bg' d="m 119.82189,189.72349 c -1.60621,-0.0998 -3.29106,-0.25942 -3.35657,-0.31803 -0.0246,-0.022 0.0287,-0.81481 0.11844,-1.76178 0.30832,-3.25384 0.31688,-3.89689 0.0749,-5.62375 -0.29133,-2.07884 -0.38264,-3.45523 -0.28871,-4.35221 l 0.0762,-0.72732 1.20613,-0.10942 c 2.44294,-0.22166 5.91734,-0.30871 8.33242,-0.2088 1.28804,0.0533 2.40244,0.0973 2.47645,0.0978 0.10461,9.5e-4 0.13467,0.6391 0.13501,2.8672 6.5e-4,3.88741 0.25098,6.80854 0.76878,8.96904 0.11864,0.49506 0.1897,0.92338 0.15791,0.95183 -0.23665,0.21179 -7.25159,0.36758 -9.70091,0.21543 z" />
                                            </OverlayTrigger>
                                            {/* lower leg part samne*/}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLeg}>
                                                <path className='anatomy-bg' d="m 99.136913,240.92166 c -0.336982,-0.045 -0.33797,-0.0469 -0.412515,-0.7865 -0.09004,-0.89305 -0.686636,-4.78919 -2.533112,-16.54211 -2.419888,-15.40261 -2.406712,-15.31274 -2.63411,-17.96849 -0.391498,-4.57213 -0.448859,-9.36952 -0.149784,-12.52497 0.109197,-1.15257 0.337723,-2.56398 0.428149,-2.64489 0.02351,-0.021 0.672214,0 1.441465,0.0472 3.030774,0.18536 7.191624,0.0861 10.533184,-0.25143 0.82003,-0.0828 1.50428,-0.13682 1.52056,-0.12001 0.0564,0.0583 0.37877,3.50738 0.49815,5.32959 0.0659,1.00682 0.091,2.22078 0.0557,2.6977 -0.16992,2.29515 -0.89245,13.52356 -1.57159,24.42367 -0.41436,6.65027 -0.80026,12.74174 -0.85754,13.53659 -0.085,1.17976 -0.0703,1.74016 0.08,3.0512 l 0.18424,1.606 -0.37733,0.0526 c -0.50902,0.0709 -5.780636,0.15067 -6.205587,0.0938 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverLeg}>
                                                <path className='anatomy-bg' d="m 119.15417,240.89306 c -0.48556,-0.0333 -0.91443,-0.0889 -0.95304,-0.12342 -0.0387,-0.0346 -0.0215,-0.79183 0.038,-1.68281 0.067,-1.00258 0.0719,-2.09728 0.0131,-2.87244 -0.0523,-0.68887 -0.46044,-7.04047 -0.90686,-14.11468 -0.44643,-7.07419 -0.95853,-15.07331 -1.13798,-17.77581 -0.45443,-6.84329 -0.46695,-7.19621 -0.32653,-9.20102 0.11911,-1.70067 0.42299,-4.83236 0.47326,-4.87733 0.0131,-0.0117 0.7502,0.0472 1.63805,0.13092 2.03533,0.19191 9.01728,0.22144 10.70161,0.0452 0.61645,-0.0645 1.13555,-0.104 1.15357,-0.088 0.0755,0.0675 0.36535,1.84152 0.48342,2.9585 0.16186,1.53117 0.16159,7.45727 -4.3e-4,9.92363 -0.28708,4.36947 -0.1681,3.51358 -2.97333,21.38877 -1.86412,11.87833 -2.29275,14.67853 -2.37627,15.5238 l -0.0726,0.7347 -0.55155,0.0593 c -0.67376,0.0725 -3.99155,0.0537 -5.20236,-0.0295 z" />
                                            </OverlayTrigger>
                                            {/* Foot part samne */}
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverFoot}>
                                                <path className='anatomy-bg' d="m 105.91161,268.91865 c -0.18998,-0.0521 -0.50202,-0.26161 -0.69344,-0.46566 l -0.34802,-0.37099 -0.34201,0.32453 c -0.54339,0.51563 -1.27211,0.40905 -1.87231,-0.27383 -0.2176,-0.24756 -0.23939,-0.25188 -0.59655,-0.11833 -1.09785,0.41051 -2.100133,-0.11584 -2.100133,-1.1029 0,-0.52719 -0.07828,-0.58904 -0.744961,-0.58904 -0.529882,0 -0.65309,-0.0364 -0.89672,-0.26496 -0.317612,-0.29796 -0.511439,-0.69286 -0.511439,-1.042 0,-0.2132 -0.04337,-0.23458 -0.476189,-0.23458 -0.623633,0 -1.059786,-0.3191 -1.244892,-0.91077 -0.225106,-0.71954 -0.08228,-2.96544 0.352663,-5.5444 0.210001,-1.24528 0.433438,-2.67841 0.496523,-3.18476 0.156554,-1.25656 0.655428,-3.66281 1.427083,-6.88339 0.489835,-2.04434 0.617663,-2.73269 0.52779,-2.8422 -0.322643,-0.39317 -0.650116,-1.14676 -0.648941,-1.49337 0.0012,-0.39382 0.30983,-1.12802 0.523664,-1.24628 0.06535,-0.0362 0.118835,-0.26913 0.1188,-0.51771 l -7.1e-5,-0.45195 h 2.503063 c 1.37669,0 2.95119,-0.032 3.49889,-0.0712 l 0.99582,-0.0712 v 0.35025 c 0,0.28143 0.0938,0.43997 0.47727,0.80689 0.72128,0.69009 0.78146,1.34356 0.21857,2.37319 l -0.28079,0.51362 0.33017,2.52931 c 1.13425,8.68927 1.81977,14.71983 1.90565,16.76422 0.0969,2.30673 -0.13795,3.40724 -0.82071,3.84592 -0.32351,0.20786 -1.31972,0.30289 -1.79878,0.17161 z" />
                                            </OverlayTrigger>
                                            <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={popoverFoot}>
                                                <path className='anatomy-bg' d="m 116.11495,268.85135 c -1.42545,-0.65002 -1.33136,-3.05169 0.74944,-19.12952 l 0.5337,-4.12379 -0.20945,-0.36744 c -0.61235,-1.07422 -0.51656,-1.81216 0.32799,-2.52672 0.44176,-0.37376 0.52874,-0.50412 0.52874,-0.79244 0,-0.33906 0.006,-0.3439 0.34988,-0.27698 0.19244,0.0375 1.7184,0.0689 3.39103,0.0698 l 3.04114,0.002 1e-4,0.46685 c 1.1e-4,0.32971 0.0713,0.55613 0.24237,0.77077 0.19981,0.25069 0.24204,0.43046 0.24116,1.0265 -8.6e-4,0.61053 -0.048,0.79863 -0.30373,1.2129 l -0.30265,0.4903 0.48574,2.01469 c 0.77077,3.19694 1.35242,5.96083 1.52883,7.26486 0.0897,0.66275 0.3046,2.07212 0.47763,3.13192 0.51604,3.16064 0.56152,3.57616 0.52014,4.7518 -0.0316,0.89903 -0.0816,1.18795 -0.24862,1.43686 -0.24752,0.36899 -0.82133,0.63831 -1.2422,0.58304 -0.27717,-0.0364 -0.30622,-0.01 -0.36834,0.3379 -0.15476,0.86614 -0.6533,1.25487 -1.545,1.20466 l -0.50637,-0.0285 -0.0684,0.56348 c -0.0832,0.6851 -0.34429,1.02802 -0.92203,1.21081 -0.38357,0.12136 -0.49426,0.11791 -1.00395,-0.0312 l -0.57285,-0.16768 -0.26073,0.29814 c -0.29061,0.33233 -0.76283,0.58335 -1.09737,0.58335 -0.12119,0 -0.41797,-0.15978 -0.6595,-0.35507 -0.46185,-0.37342 -0.45674,-0.37407 -0.75796,0.0983 -0.27753,0.43523 -1.6502,0.59929 -2.34877,0.28073 z" />
                                            </OverlayTrigger>
                                        </svg>

                                }
                                <button className='rotate-btn text-primary me-5' onClick={() => setShowBackWoman(!showBackWoman)}><i className="far fa-sync-alt me-2"></i> Rotate Model</button>
                            </>

                    }



                </div>
            </div>
            <button className="btn btn-outline-primary" onClick={() => props.setStep(1)}><i className="far fa-chevron-left"></i> Back</button>
            <button className="btn btn-primary float-end" onClick={() => saveSymptoms(symptoms)}> Save</button>

        </div>
    );
};

export default StepThree;