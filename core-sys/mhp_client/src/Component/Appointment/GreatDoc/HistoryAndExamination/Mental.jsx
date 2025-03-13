import React, { useEffect, useState } from 'react';
import clinic4 from "../../../../Images/Mentalicon.png";
import { Popover } from '@mui/material';
import axios from 'axios';
import PHQ from './PHQ';
import { toast } from 'react-toastify';
import GpCog from './GpCog';
import Madrs from './Madrs';
import Hdrs from './Hdrs';
import KIO from './KIO';

const Mental = (props) => {
    const [historyShowAll, setHistoryShowAll] = useState(true);
    const [historyValue, setHistoryValue] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [gpCogIsOpen, setGpCogIsOpen] = useState(false);

    const [madrsIsOpen, setMadrsIsOpen] = useState(false);
    const [kioIsOpenVar, setKioIsOpenVar] = useState(false);


    const [hdrsIsOpenVar, setHdrsIsOpen] = useState(false);

    const [history, setHistory] = useState([]);
    const [historySort, setHistorySort] = useState([]);
    const [appearance, setAppearance] = useState([]);
    const [mood, setMood] = useState([]);
    const [speech, setSpeech] = useState([]);
    const [behaviour, setBehaviour] = useState([]);
    const [affect, setAffect] = useState([]);
    const [perceptual, setPerceptual] = useState([]);
    const [attitude, setAttitude] = useState([]);
    const [appropriteness, setAppropriteness] = useState([]);

    const [appearanceArray, setAppearanceArray] = useState([]);
    const [moodArray, setModdArray] = useState([]);
    const [speechArray, setSpeechArray] = useState([]);
    const [behaviourArray, setBehaviourArray] = useState([]);
    const [affectArray, setAffectArray] = useState([]);
    const [perceptualArray, setPerceptualArray] = useState([]);
    const [attitudeArray, setAttitudeArray] = useState([]);
    const [appropritenessArray, setAppropritenessArray] = useState([]);
    //history Search

    const historySearch = (e) => {
        const { value } = e.target;
        if (value?.length > 0) {
            const existing = [...historySort];
            setHistory(existing.filter(item => item?.history_name?.toLowerCase().includes(value?.toLowerCase())))
        } else {
            setHistory(historySort)
        }
    }
    //

    useEffect(() => {

        let controller = new AbortController();
        axios.get(`/commonHistory-all/Mental`, { signal: controller.signal }).then(res => {
            console.log("commonHistory-Mental", res.data.commonHistory)
            setHistory(res.data.commonHistory)
            setHistorySort(res.data.commonHistory)
        });
        axios.get(`/appearance`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setAppearanceArray(res.data.appearance);
            }

        });
        axios.get(`/mood`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setModdArray(res.data.mood);
            }

        });
        axios.get(`/speech`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setSpeechArray(res.data.speech);
            }

        });
        axios.get(`/behaviour`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setBehaviourArray(res.data.behaviour);
            }

        });
        axios.get(`/affect`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setAffectArray(res.data.affect);
            }

        });
        axios.get(`/perceptual`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setPerceptualArray(res.data.perceptual);
            }

        });
        axios.get(`/attitute`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setAttitudeArray(res.data.attitute);
            }

        });
        axios.get(`/appropriteness`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setAppropritenessArray(res.data.appropriteness);
            }

        });

        return () => { controller.abort() }
    }, []);
    //
    const [change, setChange] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    //
    const [change1, setChange1] = useState(false);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;
    //
    const [change2, setChange2] = useState(false);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;
    //
    const [change3, setChange3] = useState(false);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const open3 = Boolean(anchorEl3);
    const id3 = open3 ? 'simple-popover' : undefined;
    //
    const [change4, setChange4] = useState(false);
    const [anchorEl4, setAnchorEl4] = useState(null);
    const open4 = Boolean(anchorEl4);
    const id4 = open4 ? 'simple-popover' : undefined;
    //
    const [change5, setChange5] = useState(false);
    const [anchorEl5, setAnchorEl5] = useState(null);
    const open5 = Boolean(anchorEl5);
    const id5 = open5 ? 'simple-popover' : undefined;
    //
    const [change6, setChange6] = useState(false);
    const [anchorEl6, setAnchorEl6] = useState(null);
    const open6 = Boolean(anchorEl6);
    const id6 = open6 ? 'simple-popover' : undefined;
    //
    const [change7, setChange7] = useState(false);
    const [anchorEl7, setAnchorEl7] = useState(null);
    const open7 = Boolean(anchorEl7);
    const id7 = open7 ? 'simple-popover' : undefined;

    const [change8, setChange8] = useState(false);
    const [anchorEl8, setAnchorEl8] = useState(null);
    const open8 = Boolean(anchorEl8);
    const id8 = open8 ? 'simple-popover' : undefined;

    const [change9, setChange9] = useState(false);
    const [anchorEl9, setAnchorEl9] = useState(null);
    const open9 = Boolean(anchorEl9);
    const id9 = open9 ? 'simple-popover' : undefined;



    //

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    // GPCog Modal
    function openGpCogModal() {
        setGpCogIsOpen(true);
    }
    function closeGpCogModal() {
        setGpCogIsOpen(false);
    }


    // KIO Modal
    function openKioModalFunc() {
        setKioIsOpenVar(true);
    }
    function closeKioModalFunc() {
        setKioIsOpenVar(false);
    }

    // Madrs Modal
    function openMadrsModal() {
        setMadrsIsOpen(true);
    }
    function closeMadrsModal() {
        setMadrsIsOpen(false);
    }

    // hdrs modal
    function openHdrsModalFunc() {
        setHdrsIsOpen(true);
    }
    function closeHdrsModalFunc() {
        setHdrsIsOpen(false);
    }

    const [saveLoding, setsaveLoding] = useState(false)
    const [expectancy, setexpectancy] = useState()
    const [insight, setinsight] = useState()

    const [K10TotalScore, setK10TotalScore] = useState(0)
    const [k10bottomvalue, setk10bottomvalue] = useState()

    const [PSQ9Score1st, setPSQ9Score1st] = useState(0)
    const [PSQ9Score2nd, setPSQ9Score2nd] = useState(0)

    const [hdrsTotalScore, setHdrsTotalScore] = useState(0)

    const [gpcogScore1st, setgpcogScore1st] = useState(0)
    const [gpcogScore2nd, setgpcogScore2nd] = useState(0)

    const [mdrsScore, setmdrsScore] = useState(0)


    const saveMentalData = () => {
        setsaveLoding(true)
        //appropriteness

        const data = {
            patient_id: props.patient_id,
            historyValue,
            appearance,
            behaviour,
            attitude,
            mood,
            affect,
            appropriteness,
            speech,
            expectancy,
            perceptual,
            insight,
            K10TotalScore,
            k10bottomvalue: JSON.stringify(k10bottomvalue),
            PSQ9Score1st,
            PSQ9Score2nd,
            hdrsTotalScore,
            gpcogScore1st,
            gpcogScore2nd,
            mdrsScore
        }


        console.log("data", data)

        axios.post('/save-mental-health', data).then(res => {

            const note = `
<p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Mental health:</strong></span><br>

    ${res.data.mental.historyValue === "" ? `` : `
     <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>History:</strong></span><br>
    ${res.data.mental.historyValue.replaceAll(",", " . ")}
    <br>`}

    ${res.data.mental.appearance === "" &&
                    res.data.mental.behaviour === "" &&
                    res.data.mental.attitude === "" &&
                    res.data.mental.mood === "" &&
                    res.data.mental.affect === "" &&
                    res.data.mental.appropriteness === "" &&
                    res.data.mental.speech === "" &&
                    res.data.mental.perceptual === "" &&
                    res.data.mental.insight === null &&
                    res.data.mental.expectancy === null ? `` :
                    `<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Examination:</strong></span><br>`}

   ${res.data.mental.appearance === "" ? `` : `Appearance: ${res.data.mental.appearance}<br>`}
   ${res.data.mental.behaviour === "" ? `` : `Behavior: ${res.data.mental.behaviour}<br>`}
   ${res.data.mental.attitude === "" ? `` : `Attitude towards examination: ${res.data.mental.attitude}<br>`}
   ${res.data.mental.mood === "" ? `` : `Mood: ${res.data.mental.mood}<br>`}
   ${res.data.mental.affect === "" ? `` : `Affect: ${res.data.mental.affect}<br>`}
   ${res.data.mental.appropriteness === "" ? `` : `Appropriateness: ${res.data.mental.appropriteness}<br>`}
   ${res.data.mental.speech === "" ? `` : `Speech: ${res.data.mental.speech}<br>`}
   ${res.data.mental.perceptual === "" ? `` : `Perceptual Disturbances: ${res.data.mental.perceptual}<br>`}
   ${res.data.mental.insight === null ? `` : `Insight: ${res.data.mental.insight}<br>`}
   ${res.data.mental.expectancy === null ? `` : `Accepted: ${res.data.mental.expectancy}<br>`}

   ${res.data.mental.K10TotalScore === 0 ? `` : `K10 score: ${res.data.mental.K10TotalScore}<br>`}
   ${res.data.mental.k10bottomvalue === null ? `` : `K10 2nd score: ${res.data.mental.k10bottomvalue.replaceAll(/[{"}]/g, " ")}<br>`}
   ${res.data.mental.PSQ9Score1st === 0 ? `` : `PHQ 9 Score 1st: ${res.data.mental.PSQ9Score1st}<br>`}
   ${res.data.mental.PSQ9Score2nd === 0 ? `` : `PHQ 9 Score 2nd: ${res.data.mental.PSQ9Score2nd}<br>`}
   ${res.data.mental.hdrsTotalScore === 0 ? `` : `HRDS Score: ${res.data.mental.hdrsTotalScore}<br>`}
   ${res.data.mental.gpcogScore1st === 0 ? `` : `GPCOG Score 1st: ${res.data.mental.gpcogScore1st}<br>`}
   ${res.data.mental.gpcogScore2nd === 0 ? `` : `GPCOG Score 2nd: ${res.data.mental.gpcogScore2nd}<br>`}
   ${res.data.mental.mdrsScore === 0 ? `` : `MADRS Score : ${res.data.mental.mdrsScore}<br>`}

    </p>`;
            const data = {
                appointment_id: props?.appId,
                patient_id: props?.patient_id,
                note: note
            }
            axios.post('doctors-note', data)
                .then(res => console.log(res))
            props?.setUpdateForHistory(Math.random())
            toast.success(res.data.message)

        }).catch(error => {
            toast.error("Ops! something is wrong")
        });

    }


    return (
        <div className='row'>
            <div className="history-main-header d-flex justify-content-between mb-2">
                <div>
                    <h6>Mental Health</h6>
                </div>
                <div>
                    <img src={clinic4} alt="" className="img-fluid" />
                </div>
            </div>
            <div className="col-lg-2 col-3">
                <div className="he-history p-1">
                    <input
                        type="text"
                        placeholder="History"
                        className="form-control form-control-sm mt-1 mb-2"
                        onChange={historySearch}
                    />
                    <ul
                        className={`g-doc-scroll ${historyShowAll ? "full-height" : "half-height"
                            }`}
                    >
                        {
                            history.length > 0 ?
                                history.map((item, i) => <li key={i}>
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">{item.history_name}</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name={item.id}
                                                    value={item.history_name}
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        const { checked, value } = e.target;
                                                        if (checked) {
                                                            setHistoryValue([...historyValue, value])
                                                        } else {
                                                            const dataNe = historyValue.filter(item => item !== value)
                                                            setHistoryValue(dataNe)
                                                        }
                                                    }}
                                                    id="togBtn"
                                                />
                                                <div className="slider round"></div>

                                            </label>
                                        </div>
                                    </div>
                                </li>)
                                :
                                <i style={{ fontSize: "26px", marginLeft: "40%" }} class="fas fa-spinner fa-spin"></i>
                        }
                    </ul>
                    {!historyShowAll ? (
                        <span
                            onClick={() => setHistoryShowAll(!historyShowAll)}
                            className="history-see-all"
                        >
                            Show All <i className="ms-1 far fa-angle-down"></i>
                        </span>
                    ) : (
                        <span
                            onClick={() => setHistoryShowAll(!historyShowAll)}
                            className="history-see-all"
                        >
                            Show Less <i className="ms-1 far fa-angle-up"></i>
                        </span>
                    )}
                </div>

            </div>
            <div className="col-lg-10 col-9">
                <div className='history-main-header mb-2'>
                    <div className="d-flex">
                        <input type="text"
                            placeholder='Examination Search'
                            className="form-control form-control-sm w-75"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    window.find(e.target.value);
                                }
                            }}
                        />
                        <div className="w-50">
                            <button onClick={() => setsaveLoding(false)} className="vaital-setup-btn-cancel float-end">Reset</button>
                            {
                                saveLoding ?
                                    <button className="vaital-setup-btn float-end me-2"><i class="fas fa-check-circle"></i></button>
                                    :
                                    <button onClick={saveMentalData} className="vaital-setup-btn float-end me-2">Save</button>
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Appearance</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange(!change); setAppearance([]) }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl(e.currentTarget)} className="slider round"></div>
                                        {
                                            change &&
                                            <Popover
                                                id={id}
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={() => setAnchorEl(null)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    {
                                                        appearanceArray.length > 0 &&
                                                        appearanceArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.appearance_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setAppearance([...appearance, value])
                                                                } else {
                                                                    const dataNe = appearance.filter(item => item !== value)
                                                                    setAppearance(dataNe)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.appearance_name}
                                                            </label>
                                                        </div>)
                                                    }
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        Object.keys(appearance).map((item, i) =>
                                            <p key={i}>{appearance[item]}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Mood</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange1(!change1); setMood([]) }}
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
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    {
                                                        moodArray.length > 0 &&
                                                        moodArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.mood_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setMood([...mood, value])
                                                                } else {
                                                                    const dataNe = mood.filter(item => item !== value)
                                                                    setMood(dataNe)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.mood_name}
                                                            </label>
                                                        </div>)
                                                    }
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        Object.keys(mood).map((item, i) =>
                                            <p key={i}>{mood[item]}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Speech</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange2(!change2); setSpeech([]) }}
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
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    {
                                                        speechArray.length > 0 &&
                                                        speechArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.speech_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setSpeech([...speech, value])
                                                                } else {
                                                                    const dataNe = speech.filter(item => item !== value)
                                                                    setSpeech(dataNe)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.speech_name}
                                                            </label>
                                                        </div>)
                                                    }
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        Object.keys(speech).map((item, i) =>
                                            <p key={i}>{speech[item]}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Accepted</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange9(!change9); setexpectancy() }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl9(e.currentTarget)} className="slider round"></div>
                                        {
                                            change9 &&
                                            <Popover
                                                id={id9}
                                                open={open9}
                                                anchorEl={anchorEl9}
                                                onClose={() => setAnchorEl9(null)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="disease" type="radio" name="dia" onChange={(e) => setexpectancy(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Disease
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="treatment" type="radio" name="dia" onChange={(e) => setexpectancy(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Treatment
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        expectancy &&
                                        <p>{expectancy}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Behavior</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange3(!change3); setBehaviour([]) }}
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
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    {
                                                        behaviourArray.length > 0 &&
                                                        behaviourArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.behaviour_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setBehaviour([...behaviour, value])
                                                                } else {
                                                                    const dataNe = behaviour.filter(item => item !== value)
                                                                    setBehaviour(dataNe)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.behaviour_name}
                                                            </label>
                                                        </div>)
                                                    }
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        Object.keys(behaviour).map((item, i) =>
                                            <p key={i}>{behaviour[item]}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Affect</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange4(!change4); setAffect([]) }}
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
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    {
                                                        affectArray.length > 0 &&
                                                        affectArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.affect_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setAffect([...affect, value])
                                                                } else {
                                                                    const dataNe = affect.filter(item => item !== value)
                                                                    setAffect(dataNe)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.affect_name}
                                                            </label>
                                                        </div>)
                                                    }
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        Object.keys(affect).map((item, i) =>
                                            <p key={i}>{affect[item]}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Perceptual Disturbances</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange5(!change5); setPerceptual([]) }}
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
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    {
                                                        perceptualArray.length > 0 &&
                                                        perceptualArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.perceptual_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setPerceptual([...perceptual, value])
                                                                } else {
                                                                    const dataNe = perceptual.filter(item => item !== value)
                                                                    setPerceptual(dataNe)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.perceptual_name}
                                                            </label>
                                                        </div>)
                                                    }
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        Object.keys(perceptual).map((item, i) =>
                                            <p key={i}>{perceptual[item]}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Attitude towards examination</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange6(!change6); setAttitude([]) }}
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
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    {
                                                        attitudeArray.length > 0 &&
                                                        attitudeArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.attitute_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setAttitude([...attitude, value])
                                                                } else {
                                                                    const dataNe = attitude.filter(item => item !== value)
                                                                    setAttitude(dataNe)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.attitute_name}
                                                            </label>
                                                        </div>)
                                                    }
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        Object.keys(attitude).map((item, i) =>
                                            <p key={i}>{attitude[item]}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Appropriateness</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange7(!change7); setAppropriteness([]) }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl7(e.currentTarget)} className="slider round"></div>
                                        {
                                            change7 &&
                                            <Popover
                                                id={id7}
                                                open={open7}
                                                anchorEl={anchorEl7}
                                                onClose={() => setAnchorEl7(null)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    {
                                                        appropritenessArray.length > 0 &&
                                                        appropritenessArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.appropriteness_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setAppropriteness([...appropriteness, value])
                                                                } else {
                                                                    const dataNe = appropriteness.filter(item => item !== value)
                                                                    setAppropriteness(dataNe)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.appropriteness_name}
                                                            </label>
                                                        </div>)
                                                    }
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        Object.keys(appropriteness).map((item, i) =>
                                            <p key={i}>{appropriteness[item]}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Insight</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange8(!change8); setinsight() }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl8(e.currentTarget)} className="slider round"></div>
                                        {
                                            change8 &&
                                            <Popover
                                                id={id8}
                                                open={open8}
                                                anchorEl={anchorEl8}
                                                onClose={() => setAnchorEl8(null)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}

                                                className="mt-2"
                                            >
                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="disease" type="radio" name="dia" onChange={(e) => setinsight(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Disease
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="treatment" type="radio" name="dia" onChange={(e) => setinsight(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Treatment
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <div className="">
                                    {
                                        insight &&
                                        <p>{insight}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h6 className="my-2">Others</h6>
                        <div className="col-4">
                            <div className="mental-others mt-2 row">
                                <div className="col-6 suicide-pop-button">
                                    <button onClick={openKioModalFunc} className="btn w-100"> KIO  {K10TotalScore > 0 && `-> ${K10TotalScore}`}</button>
                                    <KIO k10bottomvalue={k10bottomvalue} setk10bottomvalue={setk10bottomvalue}
                                        setK10TotalScore={setK10TotalScore} closekioModal={closeKioModalFunc} kioIsOpen={kioIsOpenVar} />
                                </div>
                                <div className="col-6 suicide-pop-button">
                                    <button onClick={openModal} className="btn w-100"> PHQ-9 {PSQ9Score1st > 0 && `-> ${PSQ9Score1st}`} {PSQ9Score2nd > 0 && ` - ${PSQ9Score2nd}`}</button>
                                    <PHQ Score={{ setPSQ9Score1st, setPSQ9Score2nd }} closeModal={closeModal} modalIsOpen={modalIsOpen} />
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="mental-others mt-2 row">
                                <div className="col-6 suicide-pop-button">
                                    <button className="btn w-100"> PNDS</button>
                                </div>
                                <div className="col-6 suicide-pop-button">
                                    <button className="btn w-100" onClick={openHdrsModalFunc}> HDRS {hdrsTotalScore > 0 && `-> ${hdrsTotalScore}`}</button>
                                    <Hdrs setHdrsTotalScore={setHdrsTotalScore} closehdrsModal={closeHdrsModalFunc} hdrsIsOpen={hdrsIsOpenVar} />
                                </div>
                            </div>

                        </div>

                        <div className="col-4">
                            <div className="mental-others mt-2 row">
                                <div className="col-6 suicide-pop-button">
                                    <button onClick={openGpCogModal} className="btn w-100"> GPCOG {gpcogScore1st > 0 && `-> ${gpcogScore1st}`} {gpcogScore2nd > 0 && ` - ${gpcogScore2nd}`}</button>
                                    <GpCog gpcogScore={{ setgpcogScore1st, setgpcogScore2nd }} closeGpCogModal={closeGpCogModal} gpCogIsOpen={gpCogIsOpen} />
                                </div>
                                <div className="col-6 suicide-pop-button">
                                    <button onClick={openMadrsModal} className="btn w-100"> MADRS {mdrsScore > 0 && `-> ${mdrsScore}`}</button>
                                    <Madrs setmdrsScore={setmdrsScore} closeMadrsModal={closeMadrsModal} madrsIsOpen={madrsIsOpen} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mental;