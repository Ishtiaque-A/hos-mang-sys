import { Popover } from '@mui/material';
import React, { createRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useScreenshot } from 'use-react-screenshot';
const Paediatric_page4 = (props) => {

    const [headAndFontAnelles, setHeadAndFontAnelles] = useState("");
    const [eyesIncludingRedReflex, setEyesIncludingRedReflex] = useState("");
    const [ears, setEars] = useState("");
    const [mouthAndPalate, setMouthAndPalate] = useState("");
    const [cardiovascular, setCardiovascular] = useState("");
    const [femoralPulses, setFemoralPulses] = useState("");
    const [respiratory, setRespiratory] = useState("");
    const [abdomenAndUmbilicus, setAbdomenAndUmbilicus] = useState("");
    const [anus, setAnus] = useState("");
    const [genitalia, setGenitalia] = useState("");
    const [testesFullyDescended, setTestesFullyDescended] = useState("");
    const [testesFullyDescended1, setTestesFullyDescended1] = useState("");
    const [musculoSkeletal, setMusculoSkeletal] = useState("");
    const [hips, setHips] = useState("");
    const [skin, setSkin] = useState("");
    const [reflexes, setReflexes] = useState(false);
    const [motherConcerns, setMotherConcerns] = useState(false);
    const [outCome, setOutCome] = useState(false);
    const [writeComments, setWriteComments] = useState('');
    const [date, setDate] = useState('');


    //Screened by (Print Name)
    const [change1, setChange1] = useState(false);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;

    // Ice including red reflex
    const [change2, setChange2] = useState(false);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;

    // Ears
    const [change3, setChange3] = useState(false);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const open3 = Boolean(anchorEl3);
    const id3 = open3 ? 'simple-popover' : undefined;

    // Mouth and palate
    const [change4, setChange4] = useState(false);
    const [anchorEl4, setAnchorEl4] = useState(null);
    const open4 = Boolean(anchorEl4);
    const id4 = open4 ? 'simple-popover' : undefined;

    // cardiovascular
    const [change5, setChange5] = useState(false);
    const [anchorEl5, setAnchorEl5] = useState(null);
    const open5 = Boolean(anchorEl5);
    const id5 = open5 ? 'simple-popover' : undefined;

    // femoral pulses
    const [change6, setChange6] = useState(false);
    const [anchorEl6, setAnchorEl6] = useState(null);
    const open6 = Boolean(anchorEl6);
    const id6 = open6 ? 'simple-popover' : undefined;

    // respiratory
    const [change7, setChange7] = useState(false);
    const [anchorEl7, setAnchorEl7] = useState(null);
    const open7 = Boolean(anchorEl7);
    const id7 = open7 ? 'simple-popover' : undefined;

    // abdomenAndUmbilicus
    const [change8, setChange8] = useState(false);
    const [anchorEl8, setAnchorEl8] = useState(null);
    const open8 = Boolean(anchorEl8);
    const id8 = open8 ? 'simple-popover' : undefined;

    // anus
    const [change9, setChange9] = useState(false);
    const [anchorEl9, setAnchorEl9] = useState(null);
    const open9 = Boolean(anchorEl9);
    const id9 = open9 ? 'simple-popover' : undefined;

    // genetalia
    const [change10, setChange10] = useState(false);
    const [anchorEl10, setAnchorEl10] = useState(null);
    const open10 = Boolean(anchorEl10);
    const id10 = open10 ? 'simple-popover' : undefined;

    // testes fully descended
    const [change11, setChange11] = useState(false);
    const [anchorEl11, setAnchorEl11] = useState(null);
    const open11 = Boolean(anchorEl11);
    const id11 = open11 ? 'simple-popover' : undefined;

    // hips
    const [change12, setChange12] = useState(false);
    const [anchorEl12, setAnchorEl12] = useState(null);
    const open12 = Boolean(anchorEl12);
    const id12 = open11 ? 'simple-popover' : undefined;

    // skin
    const [change13, setChange13] = useState(false);
    const [anchorEl13, setAnchorEl13] = useState(null);
    const open13 = Boolean(anchorEl13);
    const id13 = open13 ? 'simple-popover' : undefined;

    // reflexes
    const [change14, setChange14] = useState(false);
    const [anchorEl14, setAnchorEl14] = useState(null);
    const open14 = Boolean(anchorEl14);
    const id14 = open14 ? 'simple-popover' : undefined;


    // motherConcerns
    const [change15, setChange15] = useState(false);
    const [anchorEl15, setAnchorEl15] = useState(null);
    const open15 = Boolean(anchorEl15);
    const id15 = open15 ? 'simple-popover' : undefined;

    // outCome
    const [change16, setChange16] = useState(false);
    const [anchorEl16, setAnchorEl16] = useState(null);
    const open16 = Boolean(anchorEl16);
    const id16 = open16 ? 'simple-popover' : undefined;

    const [change17, setChange17] = useState(false);
    const [anchorEl17, setAnchorEl17] = useState(null);
    const open17 = Boolean(anchorEl17);
    const id17 = open17 ? 'simple-popover' : undefined;


    const newBorn = {
        headAndFontAnelles: headAndFontAnelles,
        eyesIncludingRedReflex: eyesIncludingRedReflex,
        ears: ears,
        mouthAndPalate: mouthAndPalate,
        cardiovascular: cardiovascular,
        femoralPulses: femoralPulses,
        respiratory: respiratory,
        abdomenAndUmbilicus: abdomenAndUmbilicus,
        anus: anus,
        genitalia: genitalia,
        testesFullyDescended: testesFullyDescended,
        musculoSkeletal: musculoSkeletal,
        hips: hips,
        skin: skin,
        reflexes: reflexes,
        motherConcerns: motherConcerns,
        outCome: outCome,
        writeComments: writeComments,
        date: date,
        patient_id: props.patient_id

    }

    const [image, takeScreenShot] = useScreenshot();
    const refPE1 = createRef(null);
    const [btnLoading, setbtnLoading] = useState(false)


    const handleSave = (e) => {
        e.preventDefault();

        if (image) {
            const pData = {
                patient_id: parseInt(props.propsData.patient_id),
                page_no: 4,
                image: image
            }
            axios.post(`/paediatric`, pData).then(res => {
                toast.success(res.data.message)
                props.setstateUpdate(Math.random())
                setbtnLoading(false)
            }).catch(error => {
                toast.error("Ops! Something is wrong")
            });
        }
        var checkboxes = document.querySelectorAll('input[type=checkbox]')
        for (var checkbox of checkboxes) {
            if (checkbox.checked) {
                checkbox.checked = false
            }
        }
        axios.post(`/save-paediatric-newBorn`, newBorn).then(res => {
            if (res.data.status == 200) {
                toast.success("Data inserted successfully");
                setDate('');
                setWriteComments('');
                setEyesIncludingRedReflex('');
                setEars('');
                setHeadAndFontAnelles('');
            }


        })
    }


    return (

        <>
            <div ref={refPE1} className='container bg-white p-3'>
                <h6>New Born examination</h6>
                <div className='row'>
                    <div className='col-4'>
                        <div className="d-flex justify-content-between newBorn_date_box">
                            <p className="w-75 ps-2">Date</p>
                            <div className="ms-1">
                                <label className="me-1">
                                    <input
                                        type="date"
                                        name="Date"
                                        className="date__input"
                                        id="togBtn"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Head and fontanelles</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Head and fontanelles"
                                            value="Head and fontanelles"
                                            type="checkbox"
                                            onChange={(e) => { setChange1(!change1); setHeadAndFontAnelles("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl1(e.currentTarget)} className="slider round"></div>
                                        {
                                            change1 &&
                                            <Popover
                                                id={id1}
                                                open={open1}
                                                anchorEl={anchorEl1}
                                                onClose={() => setAnchorEl1(null)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="normal" type="radio" name="headandfontanelles" onChange={(e) => { setHeadAndFontAnelles(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="plagiocephaly" type="radio" name="headandfontanelles" onChange={(e) => { setHeadAndFontAnelles(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Plagiocephaly
                                                        </label>
                                                        <input className="form-check-input" value="bulging" type="radio" name="headandfontanelles" onChange={(e) => { setHeadAndFontAnelles(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Bulging
                                                        </label>
                                                        <input className="form-check-input" value="bruised" type="radio" name="headandfontanelles" onChange={(e) => { setHeadAndFontAnelles(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Bruised
                                                        </label>
                                                        <input className="form-check-input" value="others" type="radio" name="headandfontanelles" onChange={(e) => { setHeadAndFontAnelles(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Others
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{headAndFontAnelles}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Eyes including red reflex</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="EyesIncludingRedReflex"
                                            value="EyesIncludingRedReflex"
                                            type="checkbox"
                                            onChange={(e) => { setChange2(!change2); setEyesIncludingRedReflex("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl2(e.currentTarget)} className="slider round"></div>
                                        {
                                            change2 &&
                                            <Popover
                                                id={id2}
                                                open={open2}
                                                anchorEl={anchorEl2}
                                                onClose={() => setAnchorEl2(null)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="normal" type="radio" name="EyesIncludingRedReflex" onChange={(e) => { setEyesIncludingRedReflex(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="abnormal" type="radio" name="EyesIncludingRedReflex" onChange={(e) => { setEyesIncludingRedReflex(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Abnormal
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{eyesIncludingRedReflex}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Ears</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="ears"
                                            value="ears"
                                            type="checkbox"
                                            onChange={(e) => { setChange3(!change3); setEars("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl3(e.currentTarget)} className="slider round"></div>
                                        {
                                            change3 &&
                                            <Popover
                                                id={id3}
                                                open={open3}
                                                anchorEl={anchorEl3}
                                                onClose={() => setAnchorEl3(null)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="normal" type="radio" name="ears" onChange={(e) => { setEars(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="abnormal" type="radio" name="ears" onChange={(e) => { setEars(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Abnormal
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{ears}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row' style={{ marginTop: '-5px' }}>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Mouth and palate</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Mouth and palate"
                                            name="Mouth and palate"
                                            onChange={(e) => { setChange4(!change4); setMouthAndPalate("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl4(e.currentTarget)} className="slider round"></div>
                                        {
                                            change4 &&
                                            <Popover
                                                id={id4}
                                                open={open4}
                                                anchorEl={anchorEl4}
                                                onClose={() => setAnchorEl4(null)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="normal" type="radio" name="MouthAndPalate" onChange={(e) => { setMouthAndPalate(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="abnormal" type="radio" name="MouthAndPalate" onChange={(e) => { setMouthAndPalate(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Abnormal
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{mouthAndPalate}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Cardiovascular</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Cardiovascular"
                                            name="Cardiovascular"
                                            onChange={(e) => { setChange5(!change5); setCardiovascular("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl5(e.currentTarget)} className="slider round"></div>
                                        {
                                            change5 &&
                                            <Popover
                                                id={id5}
                                                open={open5}
                                                anchorEl={anchorEl5}
                                                onClose={() => setAnchorEl5(null)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Heart sound Dual nil Murmur" type="radio" name="cardiovascular" onChange={(e) => { setCardiovascular(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Heart sound Dual nil Murmur
                                                        </label>
                                                        <input className="form-check-input" value="Murmur Present" type="radio" name="cardiovascular" onChange={(e) => { setCardiovascular(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Murmur Present
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{cardiovascular}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Femoral pulses</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Femoral pulses"
                                            name="Femoral pulses"
                                            onChange={(e) => { setChange6(!change6); setFemoralPulses("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl6(e.currentTarget)} className="slider round"></div>
                                        {
                                            change6 &&
                                            <Popover
                                                id={id6}
                                                open={open6}
                                                anchorEl={anchorEl6}
                                                onClose={() => setAnchorEl6(null)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value=" Left Present" type="radio" name="femoralPulses" onChange={(e) => { setFemoralPulses(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Left present
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value=" Right Present" type="radio" name="femoralPulses" onChange={(e) => { setFemoralPulses(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Right present
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value=" Both Present" type="radio" name="femoralPulses" onChange={(e) => { setFemoralPulses(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Both present
                                                        </label>
                                                    </div>


                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{femoralPulses}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Respiratory rate</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Respiratory rate"
                                            name="Respiratory rate"
                                            onChange={(e) => { setChange7(!change7); setRespiratory("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl7(e.currentTarget)}></div>
                                        {
                                            change7 &&
                                            <Popover
                                                id={id7}
                                                open={open7}
                                                anchorEl={anchorEl7}
                                                onClose={() => setAnchorEl7(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="text-box" style={{ width: "90px", padding: "4px", boxShadow: "none" }}>

                                                    <div className="d-flex">
                                                        <input className="form-control" value={respiratory} type="text" name="birth lenth" onChange={(e) => { setRespiratory(e.target.value) }} id="exampleCheck1" />
                                                        <label className="mx-2 mt-1" for="exampleCheck1" >
                                                            /min
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{respiratory}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Abdomen and umbilicus</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Abdomen and umbilicus"
                                            name="Abdomen and umbilicus"
                                            onChange={(e) => { setChange8(!change8); setAbdomenAndUmbilicus("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl8(e.currentTarget)}></div>
                                        {
                                            change8 &&
                                            <Popover
                                                id={id8}
                                                open={open8}
                                                anchorEl={anchorEl8}
                                                onClose={() => setAnchorEl8(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Normal" type="radio" name="Abdomen and umbilicus" onChange={(e) => { setAbdomenAndUmbilicus(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="Abnormal" type="radio" name="Abdomen and umbilicus" onChange={(e) => { setAbdomenAndUmbilicus(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Hernia present
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{abdomenAndUmbilicus}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Anus</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Anus"
                                            name="Anus"
                                            onChange={(e) => { setChange9(!change9); setAnus("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl9(e.currentTarget)}></div>
                                        {
                                            change9 &&
                                            <Popover
                                                id={id9}
                                                open={open9}
                                                anchorEl={anchorEl9}
                                                onClose={() => setAnchorEl9(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Normal" type="radio" name="Abdomen and umbilicus" onChange={(e) => { setAnus(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="Imperforated" type="radio" name="Abdomen and umbilicus" onChange={(e) => { setAnus(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                        Imperforate
                                                        </label>
                                                        <input className="form-check-input" value="Abnormal" type="radio" name="Abdomen and umbilicus" onChange={(e) => { setAnus(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Abnormal
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{anus}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Genitalia</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Genitalia"
                                            name="Genitalia"
                                            onChange={(e) => { setChange10(!change10); setGenitalia("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl10(e.currentTarget)}></div>
                                        {
                                            change10 &&
                                            <Popover
                                                id={id10}
                                                open={open10}
                                                anchorEl={anchorEl10}
                                                onClose={() => setAnchorEl10(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Normal" type="radio" name="genitalia" onChange={(e) => { setGenitalia(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="Abnormal" type="radio" name="genitalia" onChange={(e) => { setGenitalia(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Abnormal
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{genitalia}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Testis fully descended</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Testes fully descended"
                                            name="Testes fully descended"
                                            onChange={(e) => { setChange11(!change11); setTestesFullyDescended("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl11(e.currentTarget)}></div>
                                        {
                                            change11 &&
                                            <Popover
                                                id={id11}
                                                open={open11}
                                                anchorEl={anchorEl11}
                                                onClose={() => setAnchorEl11(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check">
                                                        <div className='d-flex justify-content-between gap-2'>
                                                            <span className='hep_immunisation'>

                                                                <input className="form-check-input" value="Left" type="radio" name="testesFullyDescended" onChange={(e) => { setTestesFullyDescended(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Left
                                                                </label>
                                                                <input className="form-check-input" value="Right" type="radio" name="testesFullyDescended" onChange={(e) => { setTestesFullyDescended(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Right
                                                                </label>
                                                                <input className="form-check-input" value="Both" type="radio" name="testesFullyDescended" onChange={(e) => { setTestesFullyDescended(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Both
                                                                </label>

                                                            </span>

                                                            <span className='hep_immunisation'>
                                                                <input className="form-check-input" value="Normal" type="radio" name="testesFullyDescended" onChange={(e) => { setTestesFullyDescended1(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Normal
                                                                </label>
                                                                <input className="form-check-input" value="Not descended" type="radio" name="testesFullyDescended" onChange={(e) => { setTestesFullyDescended1(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Not descended
                                                                </label>
                                                                <input className="form-check-input" value="Hernia  present" type="radio" name="testesFullyDescended" onChange={(e) => { setTestesFullyDescended1(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Hernia  present
                                                                </label>
                                                                <input className="form-check-input" value="Hydrocele present" type="radio" name="testesFullyDescended" onChange={(e) => { setTestesFullyDescended1(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label">
                                                                    Hydrocele present
                                                                </label>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <span className='ms-2'>{testesFullyDescended}</span>
                                <span className='ms-2'>{testesFullyDescended1}</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Musculoskeletal</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Musculo-skeletal"
                                            name="Musculo-skeletal"
                                            onChange={(e) => { setChange17(!change17); setMusculoSkeletal("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl17(e.currentTarget)}></div>
                                        {
                                            change17 &&
                                            <Popover
                                                id={id17}
                                                open={open17}
                                                anchorEl={anchorEl17}
                                                onClose={() => setAnchorEl17(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Normal" type="radio" onChange={(e) => { setMusculoSkeletal(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="Abnormal" type="radio" onChange={(e) => { setMusculoSkeletal(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Abnormal
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>

                            <div className="history-popup-value">
                                <span className='ms-2'>{musculoSkeletal}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Hips</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Hips"
                                            name="Hips"
                                            onChange={(e) => { setChange12(!change12); setHips("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl12(e.currentTarget)}></div>
                                        {
                                            change12 &&
                                            <Popover
                                                id={id12}
                                                open={open12}
                                                anchorEl={anchorEl12}
                                                onClose={() => setAnchorEl12(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Nil Clicks" type="radio" name="hips" onChange={(e) => { setHips(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Nil clicks
                                                        </label>
                                                        <input className="form-check-input" value="Click Recent" type="radio" name="hips" onChange={(e) => { setHips(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Click recent
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{hips}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Skin</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Skin"
                                            name="Skin"
                                            onChange={(e) => { setChange13(!change13); setSkin("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl13(e.currentTarget)}></div>
                                        {
                                            change13 &&
                                            <Popover
                                                id={id13}
                                                open={open13}
                                                anchorEl={anchorEl13}
                                                onClose={() => setAnchorEl13(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Normal" type="radio" name="skin" onChange={(e) => { setSkin(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="Rash" type="radio" name="skin" onChange={(e) => { setSkin(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Rash
                                                        </label>
                                                        <input className="form-check-input" value="Mark present" type="radio" name="skin" onChange={(e) => { setSkin(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Mark present
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{skin}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Reflexes</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Reflexes"
                                            name="Reflexes"
                                            onChange={(e) => { setChange14(!change14); setReflexes("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl14(e.currentTarget)}></div>
                                        {
                                            change14 &&
                                            <Popover
                                                id={id14}
                                                open={open14}
                                                anchorEl={anchorEl14}
                                                onClose={() => setAnchorEl14(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Normal" type="radio" name="reflexes" onChange={(e) => { setReflexes(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Normal
                                                        </label>
                                                        <input className="form-check-input" value="Abnormal" type="radio" name="reflexes" onChange={(e) => { setReflexes(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Abnormal
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{reflexes}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Does the mother have any concerns about her baby?</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Does the mother have any concerns about her baby?"
                                            name="Does the mother have any concerns about her baby?"
                                            onChange={(e) => { setChange15(!change15); setMotherConcerns("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl15(e.currentTarget)}></div>
                                        {
                                            change15 &&
                                            <Popover
                                                id={id15}
                                                open={open15}
                                                anchorEl={anchorEl15}
                                                onClose={() => setAnchorEl15(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Yes" type="radio" name="mother concerns" onChange={(e) => { setMotherConcerns(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Yes
                                                        </label>
                                                        <input className="form-check-input" value="No" type="radio" name="mother concerns" onChange={(e) => { setMotherConcerns(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{motherConcerns}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="newBorn_boxes pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">{`Meconium  passed < 48 hours`}</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Outcome"
                                            name="Outcome"
                                            onChange={(e) => { setChange16(!change16); setOutCome("") }}
                                            id="togBtn"
                                        />
                                        <div className="slider round" onClick={(e) => setAnchorEl16(e.currentTarget)}></div>
                                        {
                                            change16 &&
                                            <Popover
                                                id={id16}
                                                open={open16}
                                                anchorEl={anchorEl16}
                                                onClose={() => setAnchorEl16(null)}

                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Yes" type="radio" name="outcome" onChange={(e) => { setOutCome(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            Yes
                                                        </label>
                                                        <input className="form-check-input" value="No" type="radio" name="outcome" onChange={(e) => { setOutCome(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label">
                                                            No
                                                        </label>

                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p className='ms-2'>{outCome}</p>
                            </div>
                        </div>
                    </div>
                    <h6 className='mt-4'>Comments</h6>
                    <div className='mt-1 rounded'>
                        <textarea id=""
                            value={writeComments}
                            rows="4"
                            style={{ width: '100%' }}
                            className='note_box_textarea ps-2'
                            onChange={(e) => setWriteComments(e.target.value)}
                            placeholder='Write Comments'>
                        </textarea>
                    </div>


                </div>
            </div>

            <div className='pedriatric_page4_btn'>
                <button className='pedriatric_page4_btn_right'>Cancel</button>
                {btnLoading ? <button className='pedriatric_btn_middle'>Loading....</button> : <button className='pedriatric_page4_btn_left' onClick={handleSave}>Save</button>}
                <button className='pedriatric_page4_btn_next' onClick={() => {
                    props.passData(5)
                }}>Next <i class="fa-solid fa-angle-right"></i></button>
                <button className='pedriatric_page4_btn_previous' onClick={() => {
                    props.passData(3)
                }}><i class="fa-solid fa-angle-left"></i> Previous Page</button>
                {btnLoading ? <button className='pedriatric_btn_middle mr-2'>Loading...</button> :
                    <button className='pedriatric_btn_right mr-2' onClick={() => {
                        setbtnLoading(true)
                        takeScreenShot(refPE1.current).then(res => {
                            toast.success('Screenshot take successfully', {
                                position: "top-center",
                                autoClose: 500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: "light",
                            })
                            setbtnLoading(false)
                        })
                    }}>Take screenshot </button>}

            </div>

        </>

    );
};

export default Paediatric_page4;