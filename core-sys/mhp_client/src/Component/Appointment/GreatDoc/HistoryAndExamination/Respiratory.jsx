/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import clinic3 from "../../../../Images/clinical3.png";
import clinic from "../../../../Images/crush.jpg";
import { Accordion } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';
toast.configure();
const Respiratory = (props) => {
    const [historyShowAll, setHistoryShowAll] = useState(true);
    const [exmaninationShowAll, setExmaninationShowAll] = useState(false);
    const [cough, setCough] = useState("");
    const [dyspneaClass, setDyspneaClass] = useState('');
    const [dyspneaName, setDyspneaName] = useState('');
    const [symptoms, setSymptoms] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [chestShape, setChestShape] = useState('');
    const [abnormalBreathing, setAbnormalBreathing] = useState('');
    const [percussion, setPercussion] = useState('');
    const [vocal, setVocal] = useState('');
    const [breathSound, setBreathSound] = useState('');
    const [chestExpansion, setChestExpension] = useState("");
    const [criptationLeft, setCriptationLeft] = useState("");
    const [criptationRight, setCriptationRight] = useState("");
    const [criptationBoth, setCriptationBoth] = useState("");
    const [criptationCondition, setCriptationCondition] = useState("");
    const [wheezingLeft, setWheezingLeft] = useState("");
    const [wheezingRight, setWheezingRight] = useState("");
    const [wheezingBoth, setWheezingBoth] = useState("");

    const [wheezingCondition, setWheezingCondition] = useState("");
    const [vocalResonance, setVocalResonance] = useState("");
    const [pembortonAp, setPembortonAp] = useState("");
    const [sleepAponea, setSleepAponea] = useState(false);

    //

    const [questionariaCheckboxValue, setquestionariaCheckboxValue] = useState([])
    const [exmaninationList, setexmaninationList] = useState([])
    const [exmaninationListCheckboxValue, setexmaninationListCheckboxValue] = useState([])


    // all pop up 
    const [change, setChange] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    //
    const [change1, setChange1] = useState(false);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    const open1 = Boolean(anchorEl1);
    const id1 = open1 ? 'simple-popover' : undefined;
    //
    const [change2, setChange2] = useState(false);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;
    //
    const [change3, setChange3] = useState(false);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const handleClick3 = (event) => {
        setAnchorEl3(event.currentTarget);
    };
    const handleClose3 = () => {
        setAnchorEl3(null);
    };
    const open3 = Boolean(anchorEl3);
    const id3 = open3 ? 'simple-popover' : undefined;
    //
    const [change4, setChange4] = useState(false);
    const [anchorEl4, setAnchorEl4] = useState(null);
    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };
    const handleClose4 = () => {
        setAnchorEl4(null);
    };
    const open4 = Boolean(anchorEl4);
    const id4 = open4 ? 'simple-popover' : undefined;
    //
    const [anchorEl5, setAnchorEl5] = useState(null);
    const handleClick5 = (event) => {
        setAnchorEl5(event.currentTarget);
    };
    const handleClose5 = () => {
        setAnchorEl5(null);
    };
    const open5 = Boolean(anchorEl5);
    const id5 = open5 ? 'simple-popover' : undefined;
    //
    const [change6, setChange6] = useState(false);
    const [anchorEl6, setAnchorEl6] = useState(null);
    const handleClick6 = (event) => {
        setAnchorEl6(event.currentTarget);
    };
    const handleClose6 = () => {
        setAnchorEl6(null);
    };
    const open6 = Boolean(anchorEl6);
    const id6 = open6 ? 'simple-popover' : undefined;
    //
    const [anchorEl7, setAnchorEl7] = useState(null);
    const handleClick7 = (event) => {
        setAnchorEl7(event.currentTarget);
    };
    const handleClose7 = () => {
        setAnchorEl7(null);
    };
    const open7 = Boolean(anchorEl7);
    const id7 = open7 ? 'simple-popover' : undefined;
    //
    const [change8, setChange8] = useState(false);
    const [anchorEl8, setAnchorEl8] = useState(null);
    const handleClick8 = (event) => {
        setAnchorEl8(event.currentTarget);
    };
    const handleClose8 = () => {
        setAnchorEl8(null);
    };
    const open8 = Boolean(anchorEl8);
    const id8 = open8 ? 'simple-popover' : undefined;
    //
    const [anchorEl9, setAnchorEl9] = useState(null);
    const handleClick9 = (event) => {
        setAnchorEl9(event.currentTarget);
    };
    const handleClose9 = () => {
        setAnchorEl9(null);
    };
    const open9 = Boolean(anchorEl9);
    const id9 = open9 ? 'simple-popover' : undefined;
    //
    const [change10, setChange10] = useState(false);
    const [anchorEl10, setAnchorEl10] = useState(null);
    const handleClick10 = (event) => {
        setAnchorEl10(event.currentTarget);
    };
    const handleClose10 = () => {
        setAnchorEl10(null);
    };
    const open10 = Boolean(anchorEl10);
    const id10 = open10 ? 'simple-popover' : undefined;
    //
    const [anchorEl11, setAnchorEl11] = useState(null);
    const handleClick11 = (event) => {
        setAnchorEl11(event.currentTarget);
    };
    const handleClose11 = () => {
        setAnchorEl11(null);
    };
    const open11 = Boolean(anchorEl11);
    const id11 = open11 ? 'simple-popover' : undefined;
    //
    const [change12, setChange12] = useState(false);
    const [anchorEl12, setAnchorEl12] = useState(null);
    const handleClick12 = (event) => {
        setAnchorEl12(event.currentTarget);
    };
    const handleClose12 = () => {
        setAnchorEl12(null);
    };
    const open12 = Boolean(anchorEl12);
    const id12 = open12 ? 'simple-popover' : undefined;
    //
    const [anchorEl13, setAnchorEl13] = useState(null);
    const handleClick13 = (event) => {
        setAnchorEl13(event.currentTarget);
    };
    const handleClose13 = () => {
        setAnchorEl13(null);
    };
    const open13 = Boolean(anchorEl13);
    const id13 = open13 ? 'simple-popover' : undefined;
    //
    const [change14, setChange14] = useState(false);
    const [anchorEl14, setAnchorEl14] = useState(null);
    const handleClick14 = (event) => {
        setAnchorEl14(event.currentTarget);
    };
    const handleClose14 = () => {
        setAnchorEl14(null);
    };
    const open14 = Boolean(anchorEl14);
    const id14 = open14 ? 'simple-popover' : undefined;
    //
    const [anchorEl15, setAnchorEl15] = useState(null);
    const handleClick15 = (event) => {
        setAnchorEl15(event.currentTarget);
    };
    const handleClose15 = () => {
        setAnchorEl15(null);
    };
    const open15 = Boolean(anchorEl15);
    const id15 = open15 ? 'simple-popover' : undefined;
    //
    const [change16, setChange16] = useState(false);
    const [anchorEl16, setAnchorEl16] = useState(null);
    const handleClick16 = (event) => {
        setAnchorEl16(event.currentTarget);
    };
    const handleClose16 = () => {
        setAnchorEl16(null);
    };
    const open16 = Boolean(anchorEl16);
    const id16 = open16 ? 'simple-popover' : undefined;
    //
    const [anchorEl17, setAnchorEl17] = useState(null);
    const handleClick17 = (event) => {
        setAnchorEl17(event.currentTarget);
    };
    const handleClose17 = () => {
        setAnchorEl17(null);
    };
    const open17 = Boolean(anchorEl17);
    const id17 = open17 ? 'simple-popover' : undefined;
    //
    const [change18, setChange18] = useState(false);
    const [anchorEl18, setAnchorEl18] = useState(null);
    const handleClick18 = (event) => {
        setAnchorEl18(event.currentTarget);
    };
    const handleClose18 = () => {
        setAnchorEl18(null);
    };
    const open18 = Boolean(anchorEl18);
    const id18 = open18 ? 'simple-popover' : undefined;
    //
    const [anchorEl19, setAnchorEl19] = useState(null);
    const handleClick19 = (event) => {
        setAnchorEl19(event.currentTarget);
    };
    const handleClose19 = () => {
        setAnchorEl19(null);
    };
    const open19 = Boolean(anchorEl19);
    const id19 = open19 ? 'simple-popover' : undefined;
    //
    const [change20, setChange20] = useState(false);
    const [anchorEl20, setAnchorEl20] = useState(null);
    const handleClick20 = (event) => {
        setAnchorEl20(event.currentTarget);
    };
    const handleClose20 = () => {
        setAnchorEl20(null);
    };
    const open20 = Boolean(anchorEl20);
    const id20 = open20 ? 'simple-popover' : undefined;
    //
    const [anchorEl21, setAnchorEl21] = useState(null);
    const handleClick21 = (event) => {
        setAnchorEl21(event.currentTarget);
    };
    const handleClose21 = () => {
        setAnchorEl21(null);
    };
    const open21 = Boolean(anchorEl21);
    const id21 = open21 ? 'simple-popover' : undefined;
    //
    const [change22, setChange22] = useState(false);
    const [anchorEl22, setAnchorEl22] = useState(null);
    const handleClick22 = (event) => {
        setAnchorEl22(event.currentTarget);
    };
    const handleClose22 = () => {
        setAnchorEl22(null);
    };
    const open22 = Boolean(anchorEl22);
    const id22 = open22 ? 'simple-popover' : undefined;
    //
    const [change23, setChange23] = useState(false);
    const [anchorEl23, setAnchorEl23] = useState(null);
    const handleClick23 = (event) => {
        setAnchorEl23(event.currentTarget);
    };
    const handleClose23 = () => {
        setAnchorEl23(null);
    };
    const open23 = Boolean(anchorEl23);
    const id23 = open23 ? 'simple-popover' : undefined;
    // all pop up 

    useEffect(() => {
        let controller = new AbortController();
        axios.get(`/commonHistory-all/Respiratory`, { signal: controller.signal }).then(res => {
            sethistoryList(res.data.commonHistory)
            setHistorySort(res.data.commonHistory)

        });

        axios.get(`/chestshape`, { signal: controller.signal }).then(res => {
            setchestshapeArray(res.data.chestshape)
        });

        axios.get(`/abnormal-breathing`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {

                setabArray(res.data.abnormalbreathing)
            }

        });

        axios.get(`/percussion`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setpercyssion(res.data.percussion)
            }

        });

        axios.get(`/vocal-fremitus`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setvocalArray(res.data.vocalfremitus)
            }

        });

        axios.get(`/breathsound`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setbreathsound(res.data.breathsound)
            }

        });

        axios.get(`/chest-expansion`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setchestexpansion(res.data.chestexpansion)
            }

        });
        axios.get(`/crepitation`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setcreptionArray(res.data.crepitation)
            }

        });

        axios.get(`/vocal-resonance`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setvocalReasonArray(res.data.vocalresonance)
            }

        });

        axios.get(`/pembertons`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setpembertonsArray(res.data.pembertons)
            }
        });

        axios.get(`/questionnaire`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setquestionariaArray(res.data.questionnaire)
            }

        });

        axios.get(`/medical-history`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setmedicalhistoryArray(res.data.medicalhistory);
            }
        });

        axios.get(`/sleep-apnoea-risk`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setsleepRiskArry(res.data.sleepapnoearisk)
            }

        });

        axios.get(`/symptoms`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setsymtomArray(res.data.symptoms)
            }
        });

        axios.get(`/cough`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setcoughArray(res.data.cough)
            }

        });


        axios.get(`/exmanination-list`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setexmaninationList(res.data.exmaninationlist)
            }

        });

        axios.get(`/dyspnea`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setdysnaArray(res.data.dyspnea)
            }

        });

        axios.get(`/dyspnea-class`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setdysnaClassArray(res.data.dyspneaClass)
            }

        });

        return () => {
            controller.abort();
        }

    }, [])

    const [historyList, sethistoryList] = useState([])
    const [historySort, setHistorySort] = useState([]);

    const [chestshapeArray, setchestshapeArray] = useState([])
    const [abArray, setabArray] = useState([])
    const [percyssion, setpercyssion] = useState([])
    const [vocalArray, setvocalArray] = useState([])
    const [breathsoundArray, setbreathsound] = useState([])
    const [chestexpansionArray, setchestexpansion] = useState([])
    const [creptionArray, setcreptionArray] = useState([])
    const [vocalReasonArray, setvocalReasonArray] = useState([])
    const [pembertonsArray, setpembertonsArray] = useState([])
    const [questionariaArray, setquestionariaArray] = useState([])
    const [historyCheckboxValue, sethistoryCheckboxValue] = useState([])
    const [medicalhistoryArray, setmedicalhistoryArray] = useState([])
    const [sleepRiskArry, setsleepRiskArry] = useState([])
    const [symtomArray, setsymtomArray] = useState([])
    const [coughArray, setcoughArray] = useState([])
    const [dysnaArray, setdysnaArray] = useState([])
    const [dysnaClassArray, setdysnaClassArray] = useState([])

    const [Snoring, setSnoring] = useState(0)
    const [Tired, setTired] = useState(0)
    const [Observed, seObserved] = useState(0)
    const [Pressure, setPressure] = useState(0)
    const [Body_mass_Index, setBody_mass_Index] = useState(0)
    const [AgeScore, setAgeScore] = useState(0)
    const [Neck, setNeck] = useState(0)
    const [Gender, setGender] = useState(0)

    const [inputRespiratory, setinputRespiratory] = useState({
        Date: moment().format("MMM Do YY"),
        Age: props.patientValue.patient_dob !== null ? moment().diff(props.patientValue.patient_dob, 'years') : '',
        Height: "",
        Sex: props?.patientValue?.patient_birth_sex?.birth_sex_name,

        PFR_1st: "",
        FEV1_1st: "",
        FVC_1st: "",
        Predicted_1st_1: "",
        Predicted_1st_2: "",
        Predicted_1st_3: "",
        Percentage_Predicted_1st_1: "",
        Percentage_Predicted_1st_2: "",
        Percentage_Predicted_1st_3: "",
        Percentage_FEV1orFVC_1st: "",

        PFR_2st: "",
        FEV1_2st: "",
        FVC_2st: "",
        Predicted_2st_1: "",
        Predicted_2st_2: "",
        Predicted_2st_3: "",
        Percentage_Predicted_2st_1: "",
        Percentage_Predicted_2st_2: "",
        Percentage_Predicted_2st_3: "",
        Percentage_FEV1orFVC_2st: "",

        Res_Rate: "",
        Peak_Flow: "",
        Insipiration: "",
        Expiration: "",
        Stop_Bang_Questionaria: ""

    })

    useEffect(() => {
        let subscription = true;
        if (subscription) {
            const race = 0.93
            const h = parseInt(inputRespiratory.Height)
            const age = parseInt(inputRespiratory.Age)

            const FEV1 = race * 1.08 * [(0.0395 * h) - (0.025 * age) - 2.6]
            const FVC = race * 1.15 * [(0.0443 * h) - (0.026 * age) - 2.89]

            if (age <= 17 && age >= 8) {
                var PEFR = [(h - 100) * 5] + 100
            }

            if (age >= 18 && age <= 80) {
                // eslint-disable-next-line no-cond-assign
                if (props?.patientValue?.patient_birth_sex?.birth_sex_name === "Female") {
                    const hMeeter = h / 100
                    PEFR = ([(hMeeter * 3.72) + 2.24] - [age * 0.03]) * 60
                } else {
                    const hMeeter = h / 100
                    PEFR = ([(hMeeter * 5.48) + 1.58] - [age * 0.041]) * 60
                }
            }

            setinputRespiratory({
                ...inputRespiratory, PFR_1st: Math.round(PEFR),
                FEV1_1st: FEV1.toFixed(2),
                FVC_1st: FVC.toFixed(2),
                Percentage_Predicted_1st_1: ((inputRespiratory.Predicted_1st_1 / inputRespiratory.PFR_1st) * 100).toFixed(2),
                Percentage_Predicted_1st_2: ((inputRespiratory.Predicted_1st_2 / inputRespiratory.FEV1_1st) * 100).toFixed(2),
                Percentage_Predicted_1st_3: ((inputRespiratory.Predicted_1st_3 / inputRespiratory.FVC_1st) * 100).toFixed(2),
                Percentage_FEV1orFVC_1st: ((inputRespiratory.Predicted_1st_2 / inputRespiratory.Predicted_1st_3)).toFixed(2),
            })
        }

        return () => { subscription = false }
    }, [inputRespiratory.Height, inputRespiratory.Predicted_1st_1, inputRespiratory.Predicted_1st_2, inputRespiratory.Predicted_1st_3])

    useEffect(() => {
        let subscription = true;
        if (subscription) {

            setinputRespiratory({
                ...inputRespiratory,
                Percentage_Predicted_2st_1: ((inputRespiratory.Predicted_2st_1 / inputRespiratory.PFR_2st) * 100).toFixed(2),
                Percentage_Predicted_2st_2: ((inputRespiratory.Predicted_2st_2 / inputRespiratory.FEV1_2st) * 100).toFixed(2),
                Percentage_Predicted_2st_3: ((inputRespiratory.Predicted_2st_3 / inputRespiratory.FVC_2st) * 100).toFixed(2),
                Percentage_FEV1orFVC_2st: (inputRespiratory.Predicted_2st_2 / inputRespiratory.Predicted_2st_3).toFixed(2),
            })
        }

        return () => { subscription = false }
    }, [
        inputRespiratory.PFR_2st,
        inputRespiratory.FEV1_2st,
        inputRespiratory.FVC_2st,
        inputRespiratory.Predicted_2st_1, inputRespiratory.Predicted_2st_2, inputRespiratory.Predicted_2st_3])

    const [saveLoading, setsaveLoading] = useState(false)
    //history Search

    const historySearch = (e) => {
        const { value } = e.target;
        if (value?.length > 0) {
            const existing = [...historySort];
            sethistoryList(existing.filter(item => item?.history_name?.toLowerCase().includes(value?.toLowerCase())))
        } else {
            sethistoryList(historySort)
        }
    }
    //
    const saveRespitory = () => {

        setsaveLoading(true)

        const formData = new FormData();

        formData.append('patient_id', props.patient_id);
        formData.append('Respiratory_History', historyCheckboxValue);
        formData.append('Respiratory_Examination_List', exmaninationListCheckboxValue);
        formData.append('Respiratory_Questionnaire', questionariaCheckboxValue);
        formData.append('cough', cough);
        formData.append('dyspneaClass', dyspneaClass);
        formData.append('dyspneaName', dyspneaName);
        formData.append('symptoms', symptoms.toString());
        formData.append('medicalHistory', medicalHistory.toString());
        formData.append('chestShape', chestShape);
        formData.append('abnormalBreathing', abnormalBreathing);
        formData.append('percussion', percussion);
        formData.append('vocal', vocal);
        formData.append('breathSound', breathSound);
        formData.append('chestExpansion', chestExpansion);
        formData.append('criptationLeft', criptationLeft);
        formData.append('criptationRight', criptationRight);
        formData.append('criptationBoth', criptationBoth);
        formData.append('criptationCondition', criptationCondition);
        formData.append('wheezingLeft', wheezingLeft);
        formData.append('wheezingRight', wheezingRight);
        formData.append('wheezingBoth', wheezingBoth);
        formData.append('wheezingCondition', wheezingCondition);
        formData.append('vocalResonance', vocalResonance);

        formData.append('Pembortons_sign', pembortonAp);
        formData.append('Sleep_Apnoea_Risk', sleepAponea);

        formData.append('Date', inputRespiratory.Date);
        formData.append('Age', inputRespiratory.Age);
        formData.append('Height', inputRespiratory.Height);
        formData.append('Sex', props?.patientValue?.patient_birth_sex?.birth_sex_name ? props?.patientValue?.patient_birth_sex?.birth_sex_name : '');

        formData.append('PFR_1st', inputRespiratory.PFR_1st);
        formData.append('FEV1_1st', inputRespiratory.FEV1_1st);
        formData.append('FVC_1st', inputRespiratory.FVC_1st);
        formData.append('Predicted_1st_1', inputRespiratory.Predicted_1st_1);
        formData.append('Predicted_1st_2', inputRespiratory.Predicted_1st_2);
        formData.append('Predicted_1st_3', inputRespiratory.Predicted_1st_3);
        formData.append('Percentage_Predicted_1st_1', inputRespiratory.Percentage_Predicted_1st_1);
        formData.append('Percentage_Predicted_1st_2', inputRespiratory.Percentage_Predicted_1st_2);
        formData.append('Percentage_Predicted_1st_3', inputRespiratory.Percentage_Predicted_1st_3);
        formData.append('Percentage_FEV1orFVC_1st', inputRespiratory.Percentage_FEV1orFVC_1st);

        formData.append('PFR_2st', inputRespiratory.PFR_2st);
        formData.append('FEV1_2st', inputRespiratory.FEV1_2st);
        formData.append('FVC_2st', inputRespiratory.FVC_2st);
        formData.append('Predicted_2st_1', inputRespiratory.Predicted_2st_1);
        formData.append('Predicted_2st_2', inputRespiratory.Predicted_2st_2);
        formData.append('Predicted_2st_3', inputRespiratory.Predicted_2st_3);
        formData.append('Percentage_Predicted_2st_1', inputRespiratory.Percentage_Predicted_2st_1);
        formData.append('Percentage_Predicted_2st_2', inputRespiratory.Percentage_Predicted_2st_2);
        formData.append('Percentage_Predicted_2st_3', inputRespiratory.Percentage_Predicted_2st_3);
        formData.append('Percentage_FEV1orFVC_1st', inputRespiratory.Percentage_FEV1orFVC_1st);
        formData.append('Percentage_FEV1orFVC_2st', inputRespiratory.Percentage_FEV1orFVC_2st);

        formData.append('Res_Rate', inputRespiratory.Res_Rate);
        formData.append('Peak_Flow', inputRespiratory.Peak_Flow);
        formData.append('Insipiration', inputRespiratory.Insipiration);
        formData.append('Expiration', inputRespiratory.Expiration);
        formData.append('Stop_Bang_Questionaria', inputRespiratory.Stop_Bang_Questionaria);

        formData.append('SnoringScore', Snoring);
        formData.append('TiredScore', Tired);
        formData.append('ObservedScore', Observed);
        formData.append('PressureScore', Pressure);
        formData.append('BodyMassIndexScore', Body_mass_Index);
        formData.append('AgeScore', AgeScore);
        formData.append('NeckScore', Neck);
        formData.append('GenderScore', Gender);

        formData.append('total_score', Snoring + Tired + Observed + Pressure + Body_mass_Index + AgeScore + Neck + Gender);



        axios.post('/save-respiratory', formData).then(res => {
            const note = `

<p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Respiratory:</strong></span><br>

    ${res.data.respiratory.cough === null &&
                    res.data.respiratory.dyspneaName === null &&
                    res.data.respiratory.dyspneaClass === null &&
                    res.data.respiratory.Respiratory_History === null ? `` : `
 <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>History:</strong></span><br>

    ${res.data.respiratory.cough === null ? `` : `Cough : ${res.data.respiratory.cough} . `}
    ${res.data.respiratory.dyspneaName === null ? `` : `Dyspena : ${res.data.respiratory.dyspneaName}`}
    ${res.data.respiratory.dyspneaClass === null ? `` : `  ${res.data.respiratory.dyspneaClass} . `}
    ${res.data.respiratory.Respiratory_History === null ? `` : `${res.data.respiratory.Respiratory_History.replaceAll(',', ' . ')}`}
    
` }
   

    ${res.data.respiratory.Respiratory_Examination_List === null &&
                    res.data.respiratory.abnormalBreathing === null &&
                    res.data.respiratory.chestShape === null &&
                    res.data.respiratory.percussion === null &&
                    res.data.respiratory.vocal === null &&
                    res.data.respiratory.breathSound === null &&
                    res.data.respiratory.chestExpansion === null &&
                    res.data.respiratory.criptationCondition === null &&
                    res.data.respiratory.wheezingCondition === null &&
                    res.data.respiratory.vocalResonance === null &&
                    res.data.respiratory.Pembortons_sign === null &&
                    res.data.respiratory.Res_Rate === null &&
                    res.data.respiratory.Peak_Flow === null &&
                    res.data.respiratory.Insipiration === null &&
                    res.data.respiratory.Expiration === null ? `` :
                    `
<br><span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Examination:</strong></span><br>

    ${res.data.respiratory.Respiratory_Examination_List === null ? `` : `${res.data.respiratory.Respiratory_Examination_List.replaceAll(",", " . ")}<br>`}
    ${res.data.respiratory.abnormalBreathing === null ? `` : `Abnormal Breathing  ${res.data.respiratory.abnormalBreathing}<br>`}
    ${res.data.respiratory.chestShape === null ? `` : `Chest Shape: ${res.data.respiratory.chestShape}<br>`}
    ${res.data.respiratory.percussion === null ? `` : `Percussion: ${res.data.respiratory.percussion}<br>`}
    ${res.data.respiratory.vocal === null ? `` : `Vocal Fremitus: ${res.data.respiratory.vocal}<br>`}
    ${res.data.respiratory.breathSound === null ? `` : `Breath Sound: ${res.data.respiratory.breathSound}<br>`}
    ${res.data.respiratory.chestExpansion === null ? `` : `Chest Expansion: ${res.data.respiratory.chestExpansion}<br>`}
    ${res.data.respiratory.criptationCondition === null ? `` : `Cripatation (A/P): ${res.data.respiratory.criptationCondition} | ${res.data.respiratory.criptationLeft === null ? `` : `${res.data.respiratory.criptationLeft} | `} ${res.data.respiratory.criptationRight === null ? `` : `${res.data.respiratory.criptationRight} | `} ${res.data.respiratory.criptationBoth === null ? `` : `${res.data.respiratory.criptationBoth} `}<br>`}
    ${res.data.respiratory.wheezingCondition === null ? `` : `Wheezing: ${res.data.respiratory.wheezingCondition} | ${res.data.respiratory.wheezingLeft === null ? `` : `${res.data.respiratory.wheezingLeft} | `} ${res.data.respiratory.wheezingRight === null ? `` : `${res.data.respiratory.wheezingRight} | `} ${res.data.respiratory.wheezingBoth === null ? `` : `${res.data.respiratory.wheezingBoth} `}<br>`}
    ${res.data.respiratory.vocalResonance === null ? `` : `Vocal Resonance: ${res.data.respiratory.vocalResonance}<br>`}
    ${res.data.respiratory.Pembortons_sign === null ? `` : `Pemborton’s sign (A/P): ${res.data.respiratory.Pembortons_sign}<br>`}
   
    ${res.data.respiratory.Res_Rate === null ? `` : `Respiratory Rate: ${res.data.respiratory.Res_Rate}/Min  <br>`}
    ${res.data.respiratory.Peak_Flow === null ? `` : `Peak Flow: ${res.data.respiratory.Peak_Flow} L/MIN<br>`}
    ${res.data.respiratory.Insipiration === null ? `` : `Chest Measurement (cm): Inspiration: ${res.data.respiratory.Insipiration} cm<br>`}
    ${res.data.respiratory.Expiration === null ? `` : `Expiration: ${res.data.respiratory.Expiration} cm<br>`}


`}
    

    ${res.data.respiratory.Height === null
                    ? `` :
                    `
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Spirometry result:</strong></span><br>

    ${res.data.respiratory.Date === null ? `` : `<strong>Date</strong>: ${res.data.respiratory.Date} . `}
    ${res.data.respiratory.Age === null ? `` : `<strong>Age</strong> : ${res.data.respiratory.Age} years . `}
    ${res.data.respiratory.Height === null ? `` : `<strong>Height</strong>: ${res.data.respiratory.Height} cm . `}
    ${res.data.respiratory.Sex === null ? `` : `<strong>Sex</strong>: ${res.data.respiratory.Sex} <br>`}


    <table class="MsoNormalTable" border="1" cellspacing="0" cellpadding="0" width="483" style="margin-left: 12px;">
    <tbody>
        <tr>
            <td width="122" valign="top" style="width: 27.7433%; padding: 7px; background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">
                <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><strong>Predicted&nbsp;Value</strong></p>
                <div style="color:rgba(0,0,0,0.01);width:0;height:0">&nbsp;<br></div>
            </td>
            <td width="51" valign="top" style="width: 12.6294%; padding: 7px;">
                <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><strong>FEV</strong></p>
            </td>
            <td width="50" valign="top" style="width: 50px; padding: 7px;">
                <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.FEV1_1st === null ? `` : res.data.respiratory.FEV1_1st}</p>
            </td>
            <td width="49" valign="top" style="width: 49px; padding: 7px;">
                <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><strong>FVC</strong></p>
            </td>
            <td width="55" valign="top" style="width: 55px; padding: 7px;">
                <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.FVC_1st === null ? `` : res.data.respiratory.FVC_1st}</p>
            </td>
            <td width="58" valign="top" style="width: 58px; padding: 7px;">
                <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><strong>PEFR</strong></p>
            </td>
            <td width="98" valign="top" style="width: 98px; padding: 7px;">
                <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.PFR_1st === null ? `` : res.data.respiratory.PFR_1st}</p>
            </td>
        </tr>
      </tbody>
    </table>

    <table class="MsoNormalTable" border="1" cellspacing="0" cellpadding="0" width="537" style="margin-left: 94px; width: 532px; height: 26px;">
        <tbody>
            <tr>
                <td width="269" valign="top" style="width: 268px; padding: 7px;">
                    <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">Pre</p>
                </td>
                <td width="268" valign="top" style="width: 267px; padding: 7px;">
                    <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">Post</p>
                </td>
            </tr>
        </tbody>
        </table>



        <table class="MsoNormalTable" border="1" cellspacing="0" cellpadding="0" width="624" style="width: 628px; height: 121px;">
            <tbody>
                <tr>
                    <td width="90" valign="top" style="width: 90px; padding: 7px; background-color: rgb(243, 243, 243);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="background-color: rgb(243, 243, 243);"><span style="font-family: Roboto; color: rgb(67, 67, 67); background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">&nbsp;</span><br></span></p>
                        <span style="background-color: rgb(243, 243, 243);"><br></span>
                    </td>
                    <td width="58" valign="top" style="width: 58px; padding: 7px; background-color: rgb(243, 243, 243);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">FEV1</span></p>
                    </td>
                    <td width="52" valign="top" style="width: 52px; padding: 7px; background-color: rgb(243, 243, 243);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">FVC</span></p>
                    </td>
                    <td width="84" valign="top" style="width: 84px; padding: 7px; background-color: rgb(243, 243, 243);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">FEV1/FVC</span></p>
                    </td>
                    <td width="72" valign="top" style="width: 0.75in; padding: 7px; background-color: rgb(243, 243, 243);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">PEFR</span></p>
                    </td>
                    <td width="53" valign="top" style="width: 53px; padding: 7px; background-color: rgb(243, 243, 243);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">FEV1</span></p>
                    </td>
                    <td width="55" valign="top" style="width: 55px; padding: 7px; background-color: rgb(243, 243, 243);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">FVC</span></p>
                    </td>
                    <td width="81" valign="top" style="width: 81px; padding: 7px; background-color: rgb(243, 243, 243);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">FEV1/FVC</span></p>
                    </td>
                    <td width="79" valign="top" style="width: 79px; padding: 7px; background-color: rgb(243, 243, 243);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">PEFR</span></p>
                    </td>
                </tr>
                <tr>
                    <td width="90" valign="top" style="width: 90px; padding: 7px; background-color: rgb(243, 243, 243); color: rgb(67, 67, 67);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">Value</span></p>
                    </td>
                    <td width="58" valign="top" style="width: 58px; padding: 7px; background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Predicted_1st_2 === null ? `` : res.data.respiratory.Predicted_1st_2}</p>
                    </td>
                    <td width="52" valign="top" style="width: 52px; padding: 7px; background-color: rgb(255, 255, 255);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Predicted_1st_3 === null ? `` : res.data.respiratory.Predicted_1st_3}</p>
                    </td>
                    <td width="84" valign="top" style="width: 84px; padding: 7px; background-color: rgb(255, 255, 255);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Percentage_FEV1orFVC_1st === "NaN" ? `` : res.data.respiratory.Percentage_FEV1orFVC_1st}</p>
                    </td>
                    <td width="72" valign="top" style="width: 0.75in; padding: 7px; background-color: rgb(255, 255, 255);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Predicted_1st_1 === null ? `` : res.data.respiratory.Predicted_1st_1}</p>
                    </td>
                    </td>
                    <td width="58" valign="top" style="width: 58px; padding: 7px; background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Predicted_2st_2 === null ? `` : res.data.respiratory.Predicted_2st_2}</p>
                    </td>
                    <td width="52" valign="top" style="width: 52px; padding: 7px; background-color: rgb(255, 255, 255);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Predicted_2st_3 === null ? `` : res.data.respiratory.Predicted_2st_3}</p>
                    </td>
                    <td width="84" valign="top" style="width: 84px; padding: 7px; background-color: rgb(255, 255, 255);">
                        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Percentage_FEV1orFVC_2st === "NaN" ? `` : res.data.respiratory.Percentage_FEV1orFVC_2st}</p>
                    </td >
    <td width="72" valign="top" style="width: 0.75in; padding: 7px; background-color: rgb(255, 255, 255);">
        <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Predicted_2st_1 === null ? `` : res.data.respiratory.Predicted_2st_1}</p>
    </td>
                    
                </tr >
    <tr>
        <td width="90" valign="top" style="width: 90px; padding: 7px; background-color: rgb(243, 243, 243);">
            <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><span style="font-family: Roboto; color: rgb(0, 0, 0); background: rgb(243, 243, 243);">%Predicted</span></p>
        </td>
        <td width="58" valign="top" style="width: 58px; padding: 7px; background-color: rgb(255, 255, 255);">
            <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Percentage_Predicted_1st_2 === "0.00" ? `` : `${res.data.respiratory.Percentage_Predicted_1st_2}%`}</p>
        </td>
        <td width="52" valign="top" style="width: 52px; padding: 7px;">
            <p class="MsoNormal" style="margin: 0in 0in 0px; line-height: normal; font-size: 15px;">${res.data.respiratory.Percentage_Predicted_1st_3 === "0.00" ? `` : `${res.data.respiratory.Percentage_Predicted_1st_3}%`}</p>
        </td>
        <td width="84" valign="top" style="width: 84px; padding: 7px; background-color: rgb(255, 255, 255);">
            <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;"><br></p>
        </td>
        <td width="72" valign="top" style="width: 0.75in; padding: 7px; background-color: rgb(255, 255, 255);">
            <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Percentage_Predicted_1st_1 === "0.00" ? `` : `${res.data.respiratory.Percentage_Predicted_1st_1}%`}</p>
        </td>
        <td width="53" valign="top" style="width: 53px; padding: 7px; background-color: rgb(255, 255, 255);">
            <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Percentage_Predicted_2st_2 === "NaN" ? `` : `${res.data.respiratory.Percentage_Predicted_2st_2}%`}</p>
        </td>
        <td width="55" valign="top" style="width: 55px; padding: 7px; background-color: rgb(255, 255, 255);">
            <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Percentage_Predicted_2st_3 === "NaN" ? `` : `${res.data.respiratory.Percentage_Predicted_2st_3}%`}</p>
        </td>
        <td width="81" valign="top" style="width: 81px; padding: 7px; background-color: rgb(255, 255, 255);">

            <br>
        </td>
        <td width="79" valign="top" style="width: 79px; padding: 7px; background-color: rgb(255, 255, 255);">
            <p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: normal; font-size: 15px;">${res.data.respiratory.Percentage_Predicted_2st_1 === "NaN" ? `` : `${res.data.respiratory.Percentage_Predicted_2st_1}%`}</p>
        </td>
    </tr>
            </tbody >
        </table >

`}

 ${res.data.respiratory.medicalHistory === null ? `` : `<strong>Sleep apnea risk factor</strong>: ${res.data.respiratory.medicalHistory}. `}
      ${res.data.respiratory.symptoms === null ? `` : `<strong>Sleep apnea symptoms</strong>: ${res.data.respiratory.symptoms} <br>`}

      ${res.data.respiratory.SnoringScore === "0" &&
                    res.data.respiratory.TiredScore === "0" &&
                    res.data.respiratory.ObservedScore === "0" &&
                    res.data.respiratory.PressureScore === "0" &&
                    res.data.respiratory.BodyMassIndexScore === "0" &&
                    res.data.respiratory.AgeScore === "0" &&
                    res.data.respiratory.NeckScore === "0" &&
                    res.data.respiratory.GenderScore === "0" &&
                    res.data.respiratory.total_score === "0" ? `` : `
                
                <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>STOP BANG:</strong></span><br>

      ${res.data.respiratory.SnoringScore === "0" ? `` : `<strong> Snoring?</strong> Do you Snore Loudly (loud enough to be heard through closed doors or your bed-partner elbows you for snoring at night)?  Yes   Score: 1 <br>`}
      ${res.data.respiratory.TiredScore === "0" ? `` : ` <strong> Tired?</strong> Do you often feel Tired, Fatigued, or Sleepy during the daytime (such as falling asleep during driving or talking to someone)? Yes  Score: 1 <br>`}
      ${res.data.respiratory.ObservedScore === "0" ? `` : `<strong> Observed?</strong> Has anyone Observed you Stop Breathing or Choking/Gasping during your sleep? Yes  Score :1 <br>`}
      ${res.data.respiratory.PressureScore === "0" ? `` : `<strong> Pressure?</strong> Do you have or are being treated for High Blood Pressure?   Yes Score: 1  <br>`}
      ${res.data.respiratory.BodyMassIndexScore === "0" ? `` : `<strong> Body Mass Index</strong> more than 35 kg/m2 ? Yes  Score : 1 <br>`}
      ${res.data.respiratory.AgeScore === "0" ? `` : ` <strong> Age</strong> older than 50 year old?    Yes  Score : 1  <br>`}
      ${res.data.respiratory.NeckScore === "0" ? `` : `<strong> Neck</strong> size large? (Measured around Adam's apple) For male= 43 cm or larger? For females=41 cm or larger? Yes Score : 1 <br>`}
      ${res.data.respiratory.GenderScore === "0" ? `` : `<strong> Gender</strong> = Male? Yes Score : 1  <br>`}
      
      ${res.data.respiratory.total_score === "0" ? `` : `<strong>STOP BANG Score : ${res.data.respiratory.total_score}</strong><br>`}

      <strong>Low risk of OSA: Yes 0-2  Intermediate risk of OSA: Yes to 3-4   High risk of OSA: Yes to 5-8 </strong> <br>
     ` }
    
    </p>
 
            `;
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
            toast.error("Ops! Something is wrong")
        });
    }

    return (
        <div className="row">
            <div className="col-12 ">
                <div className='history-main-header d-flex justify-content-between mb-2'>
                    <div>
                        <h6>Respiratory</h6>
                    </div>
                    <div>
                        <img src={clinic3} alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-3">
                <div className='he-history p-1'>
                    <input type="text"
                        placeholder="History"
                        onChange={historySearch}
                        className="form-control form-control-sm mt-1 mb-2" />
                    <ul className={`g-doc-scroll ${historyShowAll ? "full-height" : "half-height"}`}>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p>Cough</p>
                                <label className="switch me-1">
                                    <input onChange={() => {
                                        setChange(!change)
                                        setCough("")
                                    }} type="checkbox" id="togBtn" />
                                    <div onClick={handleClick} className="slider round"></div>
                                    {
                                        change &&

                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="history-select-popup">
                                                {
                                                    coughArray.length > 0 &&
                                                    coughArray.map((item, i) => {
                                                        return (
                                                            <div key={i} className="form-check">
                                                                <input className="form-check-input" value={item.cough_name} type="radio" name="cough" onChange={(e) => setCough(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    {item.cough_name}
                                                                </label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Popover>
                                    }
                                </label>

                            </div>
                            <div className='history-popup-value'>
                                <span className='mx-auto'> {cough}</span>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex justify-content-between'>
                                <p>Dyspnea</p>
                                <label className="switch me-1">
                                    <input onChange={() => {
                                        setChange1(!change1)
                                        setDyspneaName("")
                                        setDyspneaClass("")
                                    }
                                    } type="checkbox" id="togBtn" />
                                    <div onClick={handleClick1} className="slider round"></div>
                                    {
                                        change1 &&
                                        <Popover
                                            id={id1}
                                            open={open1}
                                            anchorEl={anchorEl1}
                                            onClose={handleClose1}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="history-select-popup-dyspnea">
                                                <div className="row">
                                                    <div className="col-6">
                                                        {
                                                            dysnaArray.length > 0 &&
                                                            dysnaArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" name='acu' type="radio" value={item.dyspnea_name} onChange={(e) => setDyspneaName(e.target.value)} id="flexCheckDefault" />
                                                                        <label className="form-check-label" for="flexCheckDefault">
                                                                            {item.dyspnea_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </div>
                                                    <div className="col-6">
                                                        {
                                                            dysnaClassArray.length > 0 &&
                                                            dysnaClassArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.dyspneaClass_name} type="radio" name="cough" onChange={(e) => setDyspneaClass(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.dyspneaClass_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </div>
                                                </div>
                                            </div>
                                        </Popover>
                                    }
                                </label>
                            </div>
                            <div className='history-popup-value'>
                                <span className='mx-auto'> {dyspneaName} {dyspneaClass}</span>
                            </div>
                        </li>
                        {
                            historyList.length > 0 ?
                                historyList.map((item, i) => {
                                    return (
                                        <li>
                                            <div key={i} className='d-flex justify-content-between'>
                                                <p>{item.history_name}</p>
                                                <div className="ms-1">
                                                    <label className="switch me-1">
                                                        <input name={item.id}
                                                            value={item.history_name} onChange={(e) => {
                                                                const { value, checked } = e.target;

                                                                if (checked) {
                                                                    sethistoryCheckboxValue([...historyCheckboxValue, value])
                                                                } else {
                                                                    const newCn = historyCheckboxValue.filter((item) => item !== value)
                                                                    sethistoryCheckboxValue(newCn)
                                                                }
                                                            }
                                                            }
                                                            type="checkbox" id="togBtn" />
                                                        <div className="slider round"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }) :
                                <i style={{ fontSize: "26px", marginLeft: "40%" }} className="fas fa-spinner fa-spin"></i>
                        }
                    </ul>
                    {
                        !historyShowAll ?
                            <span onClick={() => setHistoryShowAll(!historyShowAll)} className="history-see-all">Show All <i className="ms-1 far fa-angle-down"></i></span>
                            :
                            <span onClick={() => setHistoryShowAll(!historyShowAll)} className="history-see-all">Show Less <i className="ms-1 far fa-angle-up"></i></span>
                    }
                </div>
                <div className='d-block d-lg-none he-examination p-1'>
                    <input type="text" placeholder="Search" className="form-control form-control-sm mt-1 mb-2" />
                    <ul className={`g-doc-scroll ${exmaninationShowAll ? "full-height" : "half-height"}`}>
                        {
                            exmaninationList.length > 0 ?
                                exmaninationList.map((item, i) => <li>
                                    <div key={i} className='d-flex justify-content-between'>
                                        <p>{item.exmaninationlist_name}</p>
                                        <label className="switch me-1">
                                            <input name={item.id}
                                                value={item.exmaninationlist_name} onChange={(e) => {
                                                    const { value, checked } = e.target;

                                                    if (checked) {
                                                        setexmaninationListCheckboxValue([...exmaninationListCheckboxValue, value])
                                                    } else {
                                                        const newCn = exmaninationListCheckboxValue.filter((item) => item !== value)
                                                        setexmaninationListCheckboxValue(newCn)
                                                    }
                                                }
                                                }
                                                type="checkbox" id="togBtn" />
                                            <div className="slider round"></div>
                                        </label>
                                    </div>
                                </li>) :
                                <i style={{ fontSize: "26px", marginLeft: "40%" }} className="fas fa-spinner fa-spin"></i>
                        }
                    </ul>
                    {
                        !exmaninationShowAll ?
                            <span onClick={() => setExmaninationShowAll(!exmaninationShowAll)} className="history-see-all">Show All <i className="ms-1 far fa-angle-down"></i></span>
                            :
                            <span onClick={() => setExmaninationShowAll(!exmaninationShowAll)} className="history-see-all">Show Less <i className="ms-1 far fa-angle-up"></i></span>
                    }
                </div>
            </div>
            <div className="col-lg-10 col-9 respiratory-exmanination">
                <div className='history-main-header mb-2'>
                    <div className="d-flex">
                        <input type="text"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    window.find(e.target.value);
                                }
                            }}
                            placeholder='Examination'
                            className="form-control form-control-sm w-75" />
                        <div className="w-50">
                            <button onClick={() => setsaveLoading(false)} className="vaital-setup-btn-cancel float-end">Reset</button>
                            {
                                saveLoading ?
                                    <button className="vaital-setup-btn float-end me-2"><i className="fas fa-check-circle"></i></button>
                                    :
                                    <button onClick={saveRespitory} className="vaital-setup-btn float-end me-2">Save</button>

                            }
                        </div>
                    </div>
                </div>
                <div className="row g-1">
                    <div className="col-lg-3">
                        <div className='d-none d-lg-block he-examination p-1'>
                            {/* <input type="text" placeholder="Search" className="form-control form-control-sm mt-1 mb-2" /> */}
                            <ul className={`g-doc-scroll ${exmaninationShowAll ? "full-height" : "half-height"}`}>
                                {
                                    exmaninationList.length > 0 ?
                                        exmaninationList.map((item, i) => <li>
                                            <div key={i} className='d-flex justify-content-between'>
                                                <p>{item.exmaninationlist_name}</p>
                                                <label className="switch me-1">
                                                    <input name={item.id}
                                                        value={item.exmaninationlist_name} onChange={(e) => {
                                                            const { value, checked } = e.target;

                                                            if (checked) {
                                                                setexmaninationListCheckboxValue([...exmaninationListCheckboxValue, value])
                                                            } else {
                                                                const newCn = exmaninationListCheckboxValue.filter((item) => item !== value)
                                                                setexmaninationListCheckboxValue(newCn)
                                                            }
                                                        }
                                                        }
                                                        type="checkbox" id="togBtn" />
                                                    <div className="slider round"></div>
                                                </label>
                                            </div>
                                        </li>) :
                                        <i style={{ fontSize: "26px", marginLeft: "40%" }} className="fas fa-spinner fa-spin"></i>
                                }
                            </ul>
                            {
                                !exmaninationShowAll ?
                                    <span onClick={() => setExmaninationShowAll(!exmaninationShowAll)} className="history-see-all">Show All <i className="ms-1 far fa-angle-down"></i></span>
                                    :
                                    <span onClick={() => setExmaninationShowAll(!exmaninationShowAll)} className="history-see-all">Show Less <i className="ms-1 far fa-angle-up"></i></span>
                            }
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-4">
                                <div className="he-examination p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Abnormal Breathing</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange6(!change6)
                                                setAbnormalBreathing("")
                                            }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick6} className="slider round"></div>
                                            {
                                                change6 &&
                                                <Popover
                                                    id={id6}
                                                    open={open6}
                                                    anchorEl={anchorEl6}
                                                    onClose={handleClose6}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup">
                                                        {
                                                            abArray.length > 0 &&
                                                            abArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.abnormalbreathing_name} type="radio" name="cough" onChange={(e) => setAbnormalBreathing(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.abnormalbreathing_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </div>

                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span onClick={handleClick7} className='mx-auto d-block'> {abnormalBreathing}</span>
                                        <Popover
                                            id={id7}
                                            open={open7}
                                            anchorEl={anchorEl7}
                                            onClose={handleClose7}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="popover-carosel-container">
                                                <div id="carouselExampleControls" className="carousel" data-bs-ride="carousel" data-bs-interval="false">
                                                    <div className="carousel-inner">
                                                        {
                                                            abArray.length > 0 &&
                                                            abArray.map((item, i) => {

                                                                if (i === 0) {
                                                                    return (
                                                                        <div key={i} className="carousel-item active" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )

                                                                } else {
                                                                    return (
                                                                        <div key={i} className="carousel-item" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )
                                                                }

                                                            })
                                                        }


                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-12 col-4'>
                                <div className="he-examination  p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Chest Shape</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange4(!change4)
                                                setChestShape("")
                                            }
                                            } type="checkbox" id="togBtn" />
                                            <div onClick={handleClick4} className="slider round"></div>
                                            {
                                                change4 &&
                                                <Popover
                                                    id={id4}
                                                    open={open4}
                                                    anchorEl={anchorEl4}
                                                    onClose={handleClose4}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup">
                                                        {
                                                            chestshapeArray.length > 0 &&

                                                            chestshapeArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.chestshape_name} type="radio" name="cough" onChange={(e) => setChestShape(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.chestshape_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>

                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span onClick={handleClick5} className='mx-auto d-block'> {chestShape}</span>
                                        <Popover
                                            id={id5}
                                            open={open5}
                                            anchorEl={anchorEl5}
                                            onClose={handleClose5}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}

                                        >
                                            <div className="popover-carosel-container">
                                                <div id="carouselExampleControls" className="carousel" data-bs-ride="carousel" data-bs-interval="false">
                                                    <div className="carousel-inner">

                                                        {
                                                            chestshapeArray.length > 0 &&

                                                            chestshapeArray.map((item, i) => {
                                                                if (i === 0) {
                                                                    return (
                                                                        <div className="carousel-item active" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/chestshape/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div className="carousel-item" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/chestshape/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )
                                                                }

                                                            })
                                                        }
                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-12 col-4">
                                <div className="he-examination p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Percussion</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange8(!change8)
                                                setPercussion("")
                                            }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick8} className="slider round"></div>
                                            {
                                                change8 &&
                                                <Popover
                                                    id={id8}
                                                    open={open8}
                                                    anchorEl={anchorEl8}
                                                    onClose={handleClose8}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup">

                                                        {
                                                            percyssion.length > 0 &&
                                                            percyssion.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.percussion_name} type="radio" name="cough" onChange={(e) => setPercussion(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.percussion_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }



                                                    </div>

                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span onClick={handleClick9} className='mx-auto d-block'> {percussion}</span>
                                        <Popover
                                            id={id9}
                                            open={open9}
                                            anchorEl={anchorEl9}
                                            onClose={handleClose9}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="popover-carosel-container">
                                                <div id="carouselExampleControls" className="carousel" data-bs-ride="carousel" data-bs-interval="false">
                                                    <div className="carousel-inner">
                                                        {
                                                            percyssion.length > 0 &&
                                                            percyssion.map((item, i) => {

                                                                if (i === 0) {
                                                                    return (
                                                                        <div key={i} className="carousel-item active" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/percussion/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )

                                                                } else {
                                                                    return (
                                                                        <div key={i} className="carousel-item" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/percussion/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )
                                                                }

                                                            })
                                                        }


                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-4">
                                <div className="he-examination mt-1 p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Vocal fremitus</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange10(!change10)
                                                setVocal("")
                                            }
                                            } type="checkbox" id="togBtn" />
                                            <div onClick={handleClick10} className="slider round"></div>
                                            {
                                                change10 &&
                                                <Popover
                                                    id={id10}
                                                    open={open10}
                                                    anchorEl={anchorEl10}
                                                    onClose={handleClose10}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup">
                                                        {
                                                            vocalArray.length > 0 &&
                                                            vocalArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.vocalfremitus_name} type="radio" name="cough" onChange={(e) => setVocal(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.vocalfremitus_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })

                                                        }



                                                    </div>

                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span onClick={handleClick11} className='mx-auto d-block'> {vocal}</span>
                                        <Popover
                                            id={id11}
                                            open={open11}
                                            anchorEl={anchorEl11}
                                            onClose={handleClose11}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="popover-carosel-container">
                                                <div id="carouselExampleControls" className="carousel" data-bs-ride="carousel" data-bs-interval="false">
                                                    <div className="carousel-inner">
                                                        {
                                                            vocalArray.length > 0 &&
                                                            vocalArray.map((item, i) => {

                                                                if (i === 0) {
                                                                    return (
                                                                        <div key={i} className="carousel-item active" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/vocalfremitus/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )

                                                                } else {
                                                                    return (
                                                                        <div key={i} className="carousel-item" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/vocalfremitus/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )
                                                                }

                                                            })
                                                        }


                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-4">
                                <div className="he-examination mt-1 p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Breath sound</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange12(!change12)
                                                setBreathSound("")
                                            }
                                            } type="checkbox" id="togBtn" />
                                            <div onClick={handleClick12} className="slider round"></div>
                                            {
                                                change12 &&
                                                <Popover
                                                    id={id12}
                                                    open={open12}
                                                    anchorEl={anchorEl12}
                                                    onClose={handleClose12}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup">
                                                        {
                                                            breathsoundArray.length > 0 &&
                                                            breathsoundArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.breathsound_name} type="radio" name="cough" onChange={(e) => setBreathSound(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.breathsound_name}
                                                                        </label>
                                                                    </div>
                                                                )

                                                            })
                                                        }


                                                    </div>

                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span onClick={handleClick13} className='mx-auto d-block'> {breathSound}</span>
                                        <Popover
                                            id={id13}
                                            open={open13}
                                            anchorEl={anchorEl13}
                                            onClose={handleClose13}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="popover-carosel-container">
                                                <div id="carouselExampleControls" className="carousel" data-bs-ride="carousel" data-bs-interval="false">
                                                    <div className="carousel-inner">
                                                        {
                                                            breathsoundArray.length > 0 &&
                                                            breathsoundArray.map((item, i) => {

                                                                if (i === 0) {
                                                                    return (
                                                                        <div key={i} className="carousel-item active" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/breathsound/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )

                                                                } else {
                                                                    return (
                                                                        <div key={i} className="carousel-item" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/breathsound/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )
                                                                }

                                                            })
                                                        }


                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-4">
                                <div className="he-examination mt-1 p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Chest expansion</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange14(!change14)
                                                setChestExpension("")
                                            }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick14} className="slider round"></div>
                                            {
                                                change14 &&
                                                <Popover
                                                    id={id14}
                                                    open={open14}
                                                    anchorEl={anchorEl14}
                                                    onClose={handleClose14}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup">
                                                        {
                                                            chestexpansionArray.length > 0 &&
                                                            chestexpansionArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.chestexpansion_name} type="radio" name="cough" onChange={(e) => setChestExpension(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.chestexpansion_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </div>

                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span onClick={handleClick15} className='mx-auto d-block'> {chestExpansion}</span>
                                        <Popover
                                            id={id15}
                                            open={open15}
                                            anchorEl={anchorEl15}
                                            onClose={handleClose15}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="popover-carosel-container">
                                                <div id="carouselExampleControls" className="carousel" data-bs-ride="carousel" data-bs-interval="false">
                                                    <div className="carousel-inner">
                                                        {
                                                            chestexpansionArray.length > 0 &&
                                                            chestexpansionArray.map((item, i) => {

                                                                if (i === 0) {
                                                                    return (
                                                                        <div key={i} className="carousel-item active" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/chestexpansion/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )

                                                                } else {
                                                                    return (
                                                                        <div key={i} className="carousel-item" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/chestexpansion/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )
                                                                }

                                                            })
                                                        }


                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-4">
                                <div className="he-examination mt-1 p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Cripatation (A/P)</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange16(!change16)
                                                setCriptationLeft("")
                                                setCriptationRight("")
                                                setCriptationBoth("")
                                                setCriptationCondition("")
                                            }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick16} className="slider round"></div>
                                            {
                                                change16 &&
                                                <Popover
                                                    id={id16}
                                                    open={open16}
                                                    anchorEl={anchorEl16}
                                                    onClose={handleClose16}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup-dyspnea">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Left Upper " type="radio" name="left" onChange={(e) => setCriptationLeft(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Left upper
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Left Middle" type="radio" name="left" onChange={(e) => setCriptationLeft(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Left middle
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Left Lower" type="radio" name="left" onChange={(e) => setCriptationLeft(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Left lower
                                                                    </label>
                                                                </div>
                                                                <hr />
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Right Upper" type="radio" name="right" onChange={(e) => setCriptationRight(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Right upper
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Right Middle" type="radio" name="right" onChange={(e) => setCriptationRight(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Right middle
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Right Lower" type="radio" name="right" onChange={(e) => setCriptationRight(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Right lower
                                                                    </label>
                                                                </div>
                                                                <hr />
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Both Upper" type="radio" name="both" onChange={(e) => setCriptationBoth(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Both upper
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Both Middle" type="radio" name="both" onChange={(e) => setCriptationBoth(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Both middle
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Both Lower" type="radio" name="both" onChange={(e) => setCriptationBoth(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Both lower
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Fine" type="radio" name="condi" onChange={(e) => setCriptationCondition(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Fine
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Medium" type="radio" name="condi" onChange={(e) => setCriptationCondition(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Medium
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Corase" type="radio" name="condi" onChange={(e) => setCriptationCondition(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Corase
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span onClick={handleClick17} className='mx-auto d-block'>  {criptationLeft === "" ? criptationLeft : `${criptationLeft} |`} {criptationRight === "" ? criptationRight : `${criptationRight} |`} {criptationBoth === "" ? criptationBoth : `${criptationBoth} |`} {criptationCondition}</span>
                                        <Popover
                                            id={id17}
                                            open={open17}
                                            anchorEl={anchorEl17}
                                            onClose={handleClose17}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="popover-carosel-container">
                                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item active" data-bs-interval="1000">
                                                            <img src={clinic} className="d-block w-100" alt="..." />
                                                        </div>
                                                        <div className="carousel-item" data-bs-interval="1000">
                                                            <img src={clinic} className="d-block w-100" alt="..." />
                                                        </div>
                                                        <div className="carousel-item" data-bs-interval="1000">
                                                            <img src={clinic} className="d-block w-100" alt="..." />
                                                        </div>
                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-4">
                                <div className="he-examination mt-1 p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Wheezing</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange18(!change18)
                                                setWheezingLeft("")
                                                setWheezingRight("")
                                                setWheezingBoth("")
                                                setWheezingCondition("")
                                            }
                                            } type="checkbox" id="togBtn" />
                                            <div onClick={handleClick18} className="slider round"></div>
                                            {
                                                change18 &&
                                                <Popover
                                                    id={id18}
                                                    open={open18}
                                                    anchorEl={anchorEl18}
                                                    onClose={handleClose18}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup-dyspnea">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Left Upper " type="radio" name="left" onChange={(e) => setWheezingLeft(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Left upper
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Left Middle" type="radio" name="left" onChange={(e) => setWheezingLeft(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Left middle
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Left Lower" type="radio" name="left" onChange={(e) => setWheezingLeft(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Left lower
                                                                    </label>
                                                                </div>
                                                                <hr />
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Right Upper" type="radio" name="right" onChange={(e) => setWheezingRight(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Right upper
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Right Middle" type="radio" name="right" onChange={(e) => setWheezingRight(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Right middle
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Right Lower" type="radio" name="right" onChange={(e) => setWheezingRight(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Right lower
                                                                    </label>
                                                                </div>
                                                                <hr />
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Both Upper" type="radio" name="both" onChange={(e) => setWheezingBoth(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Both upper
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Both Middle" type="radio" name="both" onChange={(e) => setWheezingBoth(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Both middle
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Both Lower" type="radio" name="both" onChange={(e) => setWheezingBoth(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Both lower
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Fine " type="radio" name="condi" onChange={(e) => setWheezingCondition(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Fine
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Medium" type="radio" name="condi" onChange={(e) => setWheezingCondition(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Medium
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" value="Corase" type="radio" name="condi" onChange={(e) => setWheezingCondition(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Corase
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span onClick={handleClick19} className='mx-auto d-block'> {wheezingLeft === "" ? wheezingLeft : `${wheezingLeft} |`} {wheezingRight === "" ? wheezingRight : `${wheezingRight} |`}  {wheezingBoth === "" ? wheezingBoth : `${wheezingBoth} |`}  {wheezingCondition}</span>
                                        <Popover
                                            id={id19}
                                            open={open19}
                                            anchorEl={anchorEl19}
                                            onClose={handleClose19}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="popover-carosel-container">
                                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item active" data-bs-interval="1000">
                                                            <img src={clinic} className="d-block w-100" alt="..." />
                                                        </div>
                                                        <div className="carousel-item" data-bs-interval="1000">
                                                            <img src={clinic} className="d-block w-100" alt="..." />
                                                        </div>
                                                        <div className="carousel-item" data-bs-interval="1000">
                                                            <img src={clinic} className="d-block w-100" alt="..." />
                                                        </div>
                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-4">
                                <div className="he-examination mt-1 p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Vocal Resonance</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange20(!change20)
                                                setVocalResonance("")
                                            }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick20} className="slider round"></div>
                                            {
                                                change20 &&
                                                <Popover
                                                    id={id20}
                                                    open={open20}
                                                    anchorEl={anchorEl20}
                                                    onClose={handleClose20}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup">
                                                        {
                                                            vocalReasonArray.length > 0 &&
                                                            vocalReasonArray.map((item, i) => {

                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.vocalresonance_name} type="radio" name="cough" onChange={(e) => setVocalResonance(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.vocalresonance_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }



                                                    </div>

                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span onClick={handleClick21} className='mx-auto d-block'> {vocalResonance}</span>
                                        <Popover
                                            id={id21}
                                            open={open21}
                                            anchorEl={anchorEl21}
                                            onClose={handleClose21}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="popover-carosel-container">
                                                <div id="carouselExampleControls" className="carousel" data-bs-ride="carousel" data-bs-interval="false">
                                                    <div className="carousel-inner">
                                                        {
                                                            vocalReasonArray.length > 0 &&
                                                            vocalReasonArray.map((item, i) => {

                                                                if (i === 0) {
                                                                    return (
                                                                        <div key={i} className="carousel-item active" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/vocalresonance/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )

                                                                } else {
                                                                    return (
                                                                        <div key={i} className="carousel-item" data-bs-interval="1000">
                                                                            <img src={`${global.img_url}/images/files/vocalresonance/${item.image}`} className="d-block w-100 h-100" alt="..." />
                                                                        </div>
                                                                    )
                                                                }

                                                            })
                                                        }


                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-4">
                                <div className="he-examination mt-1 p-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Pemberton’s sign (A/P)</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange22(!change22)
                                                setPembortonAp("")
                                            }
                                            } type="checkbox" id="togBtn" />
                                            <div onClick={handleClick22} className="slider round"></div>
                                            {
                                                change22 &&
                                                <Popover
                                                    id={id22}
                                                    open={open22}
                                                    anchorEl={anchorEl22}
                                                    onClose={handleClose22}
                                                    anchorOrigin={{
                                                        vertical: 'center',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup">
                                                        {
                                                            pembertonsArray.length > 0 &&
                                                            pembertonsArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.pembertons_name} type="radio" name="cough" onChange={(e) => setPembortonAp(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.pembertons_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </div>

                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-carousel-value'>
                                        <span className='mx-auto d-block'> {pembortonAp}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-9 ">
                        <div className="spiratory-result">
                            <h6>Spirometry Result/Respiratory Function</h6>
                            <div className="row">
                                <div className="col-3">
                                    <div className="row">
                                        <label className="col-sm-3">Date</label>
                                        <div className="col-sm-9">
                                            <input className='w-100' type="text" disabled value={inputRespiratory.Date} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="row">
                                        <label className="col-sm-3">Age</label>
                                        <div className="col-sm-9">
                                            <input className='col-sm-8 w-100' value={inputRespiratory.Age} disabled type="text" />
                                            <label className="col-sm-1 w-100" style={{ marginLeft: "-10px" }} >yr</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="row">
                                        <label className="col-sm-3">Height</label>
                                        <div className="col-sm-9">
                                            <input className='col-sm-7 ms-1 w-100' onChange={e => setinputRespiratory({ ...inputRespiratory, Height: e.target.value })} type="number" />
                                            <label className="col-sm-2 w-100" style={{ marginLeft: "-10px" }}>cm</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="row">
                                        <label className="col-sm-3">Sex</label>
                                        <div className="col-sm-9">
                                            <input value={props?.patientValue?.patient_birth_sex?.birth_sex_name ? props?.patientValue?.patient_birth_sex?.birth_sex_name : ''} disabled className='w-100' type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cns-container">
                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-home-tab-res" data-bs-toggle="pill" data-bs-target="#pills-home-res" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Pre</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab-res" data-bs-toggle="pill" data-bs-target="#pills-profile-res" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Post</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home-res" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <div className="pb-1 result-left">
                                            <div className="row ">
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-lg-4 col-6">Predicted</label>
                                                        <div className="col-lg-8 col-6">
                                                            <input disabled value={inputRespiratory.PFR_1st} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3">FEV1</label>
                                                        <div className="col-sm-9">
                                                            <input disabled value={inputRespiratory.FEV1_1st} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3">FVC</label>
                                                        <div className="col-sm-9">
                                                            <input disabled value={inputRespiratory.FVC_1st} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-lg-4 col-6">PER</label>
                                                        <div className="col-lg-8 col-6">
                                                            <input onChange={e => setinputRespiratory({ ...inputRespiratory, Predicted_1st_1: e.target.value })} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3"></label>
                                                        <div className="col-sm-9">
                                                            <input onChange={e => setinputRespiratory({ ...inputRespiratory, Predicted_1st_2: e.target.value })} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3"></label>
                                                        <div className="col-sm-9">
                                                            <input onChange={e => setinputRespiratory({ ...inputRespiratory, Predicted_1st_3: e.target.value })} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label style={{ fontSize: "11px" }} className="col-lg-4 col-6">(%)Predicted</label>
                                                        <div className="col-lg-8 col-6">
                                                            <input disabled value={inputRespiratory.Percentage_Predicted_1st_1} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3"></label>
                                                        <div className="col-sm-9">
                                                            <input disabled value={inputRespiratory.Percentage_Predicted_1st_2} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3"></label>
                                                        <div className="col-sm-9">
                                                            <input disabled value={inputRespiratory.Percentage_Predicted_1st_3} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label style={{ fontSize: "10px" }} className="col-lg-4 col-6">(%)FEV1/FVC</label>
                                                        <div className="col-lg-8 col-6">
                                                            <input disabled value={inputRespiratory.Percentage_FEV1orFVC_1st} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile-res" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <div className="pb-1 result-left">
                                            <div className="row ">
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-4">PFR</label>
                                                        <div className="col-sm-8">
                                                            <input onChange={e => setinputRespiratory({ ...inputRespiratory, PFR_2st: e.target.value })} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3">FEV1</label>
                                                        <div className="col-sm-9">
                                                            <input onChange={e => setinputRespiratory({ ...inputRespiratory, FEV1_2st: e.target.value })} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3">FVC</label>
                                                        <div className="col-sm-9">
                                                            <input onChange={e => setinputRespiratory({ ...inputRespiratory, FVC_2st: e.target.value })} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-4">Predicted</label>
                                                        <div className="col-sm-8">
                                                            <input onChange={e => setinputRespiratory({ ...inputRespiratory, Predicted_2st_1: e.target.value })} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3"></label>
                                                        <div className="col-sm-9">
                                                            <input onChange={e => setinputRespiratory({ ...inputRespiratory, Predicted_2st_2: e.target.value })} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3"></label>
                                                        <div className="col-sm-9">
                                                            <input onChange={e => setinputRespiratory({ ...inputRespiratory, Predicted_2st_3: e.target.value })} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label style={{ fontSize: "11px" }} className="col-sm-4">(%)Predicted</label>
                                                        <div className="col-sm-8">
                                                            <input disabled value={inputRespiratory.Percentage_Predicted_2st_1} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3"></label>
                                                        <div className="col-sm-9">
                                                            <input disabled value={inputRespiratory.Percentage_Predicted_2st_2} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label className="col-sm-3"></label>
                                                        <div className="col-sm-9">
                                                            <input disabled value={inputRespiratory.Percentage_Predicted_2st_3} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <label style={{ fontSize: "10px" }} className="col-sm-4">(%)FEV1/FVC</label>
                                                        <div className="col-sm-8">
                                                            <input disabled value={inputRespiratory.Percentage_FEV1orFVC_2st} className='w-100' type="number" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row border rounded mt-2">
                            <div className="col-6">
                                <div className="he-right-sidebar p-1 mb-2">
                                    <div className="">
                                        <h6>Respiratory & Peak Flow</h6>
                                        <div className="row">
                                            <label className="col-sm-3">Res.Rate</label>
                                            <div className="col-sm-7">
                                                <input onChange={e => setinputRespiratory({ ...inputRespiratory, Res_Rate: e.target.value })} type="number" className='w-100' />
                                            </div>
                                            <div className="col-2">
                                                <span>/Min</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-sm-3">Peak Flow</label>
                                            <div className="col-sm-7">
                                                <input onChange={e => setinputRespiratory({ ...inputRespiratory, Peak_Flow: e.target.value })} type="number" className='w-100' />
                                            </div>
                                            <div className="col-2">
                                                <span>/min</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-history-light mt-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Sleep Apnea Risk Factor</p>
                                        <label className="switch me-1">
                                            <input onChange={() => {
                                                setChange3(!change3)
                                                setMedicalHistory([])
                                            }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick3} className="slider round"></div>
                                            {
                                                change3 &&
                                                <Popover
                                                    id={id3}
                                                    open={open3}
                                                    anchorEl={anchorEl3}
                                                    onClose={handleClose3}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <div className="history-select-popup">
                                                        {
                                                            medicalhistoryArray.length > 0 &&

                                                            medicalhistoryArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.medicalhistory_name} type="checkbox" name="cough" onChange={(e) => {
                                                                            const { checked, value } = e.target

                                                                            if (checked) {
                                                                                setMedicalHistory([...medicalHistory, value])
                                                                            } else {
                                                                                const rvalue = medicalHistory.filter((item) => item !== value)
                                                                                setMedicalHistory(rvalue)
                                                                            }
                                                                        }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.medicalhistory_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-popup-value'>
                                        <span className=' mx-auto'>{medicalHistory.join(' , ')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="he-right-sidebar p-1 mb-2">
                                    <div className="">
                                        <h6>Chest Measurement (cm)</h6>
                                        <div className="row">
                                            <label className="col-sm-3">Inspiration</label>
                                            <div className="col-sm-7">
                                                <input onChange={e => setinputRespiratory({ ...inputRespiratory, Insipiration: e.target.value })} type="number" className='w-100' />
                                            </div>
                                            <div className="col-2">
                                                <span>cm</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-sm-3">Expiration</label>
                                            <div className="col-sm-7">
                                                <input onChange={e => setinputRespiratory({ ...inputRespiratory, Expiration: e.target.value })} type="number" className='w-100' />
                                            </div>
                                            <div className="col-2">
                                                <span>cm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-history-light mt-2">
                                    <div className='d-flex justify-content-between'>
                                        <p>Sleep Apnea Symptoms</p>
                                        <label className="switch me-1">
                                            <input onChange={() => setChange2(!change2)} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick2} className="slider round"></div>
                                            {
                                                change2 &&
                                                <Popover
                                                    id={id2}
                                                    open={open2}
                                                    anchorEl={anchorEl2}
                                                    onClose={handleClose2}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                >
                                                    <div className="history-select-popup">
                                                        {
                                                            symtomArray.length > 0 &&
                                                            symtomArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.symptoms_name} type="checkbox" name="checkbox" onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            if (checked) {
                                                                                setSymptoms([...symptoms, value])
                                                                            } else {
                                                                                const rdata = symptoms.filter((item) => item !== value)
                                                                                setSymptoms(rdata)
                                                                            }

                                                                        }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.symptoms_name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-popup-value'>
                                        <span className=' mx-auto'>{symptoms && symptoms.join(' , ')}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="question-container mt-2">
                            <div className='d-flex justify-content-between'>
                                <h6>Questionnaire</h6>
                                <Tooltip title="Low risk of OSA: Yes 0-2 | Intermediate risk of OSA: Yes to 3-4 | High risk of OSA: Yes to 5-8" arrow >
                                    {
                                        Snoring + Tired + Observed + Pressure + Body_mass_Index + AgeScore + Neck + Gender < 5 ?
                                            <h6 className='mr-2'>STOP BANG Score : {Snoring + Tired + Observed + Pressure + Body_mass_Index + AgeScore + Neck + Gender}</h6>
                                            :
                                            <h6 className='mr-2' style={{ color: "red" }}>STOP BANG Score : {Snoring + Tired + Observed + Pressure + Body_mass_Index + AgeScore + Neck + Gender}</h6>


                                    }
                                </Tooltip>
                            </div>

                            <hr />
                            <Accordion>

                                {
                                    questionariaArray.length > 0 ?
                                        questionariaArray.map((item, i) => {
                                            return (
                                                <Accordion.Item eventKey={item.id} key={i}>
                                                    <Accordion.Header>{item.questionnaire_name} ?</Accordion.Header>
                                                    <Accordion.Body>
                                                        {item.questionnaire_description} ?
                                                        <div className='mt-3'>
                                                            <label className="switch me-1">
                                                                <input
                                                                    value={item.questionnaire_description} name={item.questionnaire_name} onChange={(e) => {
                                                                        var { name, value, checked } = e.target;
                                                                        if (checked) {
                                                                            if (name === 'Snoring') {
                                                                                setSnoring(1)
                                                                            } else if (name === 'Tired') {
                                                                                setTired(1)
                                                                            }
                                                                            else if (name === 'Observed') {
                                                                                seObserved(1)
                                                                            }
                                                                            else if (name === 'Pressure') {
                                                                                setPressure(1)
                                                                            }
                                                                        } else {
                                                                            if (name === 'Snoring') {
                                                                                setSnoring(0)
                                                                            } else if (name === 'Tired') {
                                                                                setTired(0)
                                                                            }
                                                                            else if (name === 'Observed') {
                                                                                seObserved(0)
                                                                            }
                                                                            else if (name === 'Pressure') {
                                                                                setPressure(0)
                                                                            }
                                                                        }
                                                                    }
                                                                    }
                                                                    type="checkbox" id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            )
                                        }) :
                                        <i style={{ fontSize: "26px", marginLeft: "40%" }} className="fas fa-spinner fa-spin"></i>
                                }

                                {
                                    questionariaArray.length > 0 &&
                                    <Accordion.Item eventKey="">
                                        <Accordion.Header>Others ?</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex">
                                                <p>
                                                    Body mass Index more than 35 kg/m2 ?
                                                </p>
                                                <div className='ms-2 mt-1'>
                                                    <label className="switch me-1">
                                                        <input name="Body_mass_Index"
                                                            onClick={e => {
                                                                var { name, checked } = e.target;
                                                                if (checked) {
                                                                    setBody_mass_Index(1)
                                                                } else {
                                                                    setBody_mass_Index(0)

                                                                }

                                                            }}
                                                            type="checkbox" id="togBtn" />
                                                        <div className="slider round"></div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <p>
                                                    Age older than 50 years old?
                                                </p>
                                                <div className='ms-2 mt-1'>
                                                    <label className="switch me-1">
                                                        <input name="AgeScore"
                                                            onClick={e => {
                                                                var { checked } = e.target;
                                                                if (checked) {
                                                                    setAgeScore(1)
                                                                } else {
                                                                    setAgeScore(0)
                                                                }

                                                            }}
                                                            type="checkbox" id="togBtn" />
                                                        <div className="slider round"></div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <p>
                                                    Neck size large ? (Measured around Adams apple) For male = 43 cm or larger ? For female= 41 cm or larger?
                                                </p>
                                                <div className='ms-2 mt-1'>
                                                    <label className="switch me-1">
                                                        <input name="Neck"
                                                            onClick={e => {
                                                                var { checked } = e.target;

                                                                if (checked) {
                                                                    setNeck(1)
                                                                } else {
                                                                    setNeck(0)
                                                                }

                                                            }}
                                                            type="checkbox" id="togBtn" />
                                                        <div className="slider round"></div>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <p>
                                                    Gender = Male ?
                                                </p>
                                                <div className='ms-2 mt-1'>
                                                    <label className="switch me-1">
                                                        <input name="Gender"
                                                            onClick={e => {
                                                                var { checked } = e.target;

                                                                if (checked) {
                                                                    setGender(1)
                                                                } else {
                                                                    setGender(0)
                                                                }
                                                            }}
                                                            type="checkbox" id="togBtn" />
                                                        <div className="slider round"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                }
                            </Accordion>
                            <hr />
                            <p style={{ padding: "0 10px", fontSize: "smaller" }}>
                                www.stopbang.ca Modified from: Chung F et al. Anesthesiology 2008; 108:812-21; Chung F et al. Br J Anaesth 2012, 108:768–75; Chung F et al. J Clin Sleep Med 2014;10:951-8.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Respiratory;