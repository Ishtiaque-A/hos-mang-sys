import { Popover } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import clinic3 from "../../../../Images/clinical5.png";
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { Tooltip, tooltipClasses } from '@mui/material';

toast.configure();

const Cns = (props) => {
    useEffect(() => {


        axios.get(`/cnOne`).then(res => {
            setcnoneArray(res.data.cnOne)
        });

        axios.get(`/cnTwo`).then(res => {
            if (res.data.status === 200) {
                setcn2Array(res.data.cnTwo)
            }
        });

        axios.get(`/cnThree`).then(res => {
            if (res.data.status === 200) {
                setcn3Array(res.data.cnThree);
            }

        });

        axios.get(`/cnFive`).then(res => {
            if (res.data.status === 200) {
                setcn4Array(res.data.cnFour);
            }

        });

        axios.get(`/cn7`).then(res => {
            if (res.data.status === 200) {
                setcn5Array(res.data.cnFive);
            }

        });

        axios.get(`/cn8`).then(res => {
            if (res.data.status === 200) {
                setcn6Array(res.data.cnSix);
            }

        });

        axios.get(`/cn9`).then(res => {
            if (res.data.status === 200) {
                setcn7Array(res.data.cnSeven);
            }

        });

        axios.get(`/cn11`).then(res => {
            if (res.data.status === 200) {
                setcn8Array(res.data.cnEight);
            }

        });

        axios.get(`/cn12`).then(res => {
            if (res.data.status === 200) {
                setcn9Array(res.data.cnNine);
            }

        });


        axios.get(`/olfactory`).then(res => {
            if (res.data.status === 200) {
                setolfactoryArray(res.data.olfactory)
            }
        });


        axios.get(`/visualacuity`).then(res => {
            if (res.data.status === 200) {
                let l = res.data.visualacuity.length / 2;

                const arr1 = res.data.visualacuity.slice(0, l)
                setvisualacuityArray1(arr1)
                const arr2 = res.data.visualacuity.slice(l, res.data.visualacuity.length)
                setvisualacuityArray2(arr2)
            }

        });

        axios.get(`/visualfield`).then(res => {
            if (res.data.status === 200) {
                setvisualFieldArray(res.data.visualfield);
            }

        });

        axios.get(`/papillaryoedema`).then(res => {
            if (res.data.status === 200) {
                setpapillaryoedemaArray(res.data.papillaryoedema)
            }

        });

        axios.get(`/pupil`).then(res => {
            if (res.data.status === 200) {
                setpupilArray(res.data.pupil)
            }

        });
        axios.get(`/lightreflex`).then(res => {
            if (res.data.status === 200) {
                setlightreflexArray(res.data.lightreflex)
            }

        });

        axios.get(`/eyemovements`).then(res => {
            if (res.data.status === 200) {
                seteyemovementsArray(res.data.eyemovements);
            }

        });

        axios.get(`/fundoscopy`).then(res => {
            if (res.data.status === 200) {
                setfundoscopyArray(res.data.fundoscopy);
            }

        });
        axios.get(`/jawjerk`).then(res => {
            if (res.data.status === 200) {
                setjawjerkArray(res.data.jawjerk);
            }

        });

        axios.get(`/lookingup`).then(res => {
            if (res.data.status === 200) {
                setlookingupArray(res.data.lookingup);
            }

        });

        axios.get(`/shrugshoulder`).then(res => {
            if (res.data.status === 200) {
                setshrugshoulderArray(res.data.shrugshoulder);
            }

        });

        axios.get(`/neckmovement`).then(res => {
            if (res.data.status === 200) {
                setneckmovementArray(res.data.neckmovement);
            }

        });

        axios.get(`/whispertest`).then(res => {
            if (res.data.status === 200) {
                setwhispertestArray(res.data.whispertest);
            }

        });

        axios.get(`/hallpike`).then(res => {
            if (res.data.status === 200) {
                sethallpikeArray(res.data.hallpike);
            }

        });

        axios.get(`/uvula`).then(res => {
            if (res.data.status === 200) {
                setuvulaArray(res.data.uvula);
            }

        });

        axios.get(`/cnstongue`).then(res => {
            if (res.data.status === 200) {
                settongueArray(res.data.tongue);
            }

        });
    }, []);

    const [visualFieldArray, setvisualFieldArray] = useState([])
    const [fundoscopyArray, setfundoscopyArray] = useState([])
    const [tongueArray, settongueArray] = useState([])
    const [uvulaArray, setuvulaArray] = useState([])
    const [hallpikeArray, sethallpikeArray] = useState([])
    const [whispertestArray, setwhispertestArray] = useState([])
    const [neckmovementArray, setneckmovementArray] = useState([])
    const [shrugshoulderArray, setshrugshoulderArray] = useState([])
    const [lookingupArray, setlookingupArray] = useState([])
    const [jawjerkArray, setjawjerkArray] = useState([])
    const [eyemovementsArray, seteyemovementsArray] = useState([])
    const [lightreflexArray, setlightreflexArray] = useState([])
    const [pupilArray, setpupilArray] = useState([])
    const [papillaryoedemaArray, setpapillaryoedemaArray] = useState([])
    const [olfactoryArray, setolfactoryArray] = useState([])
    const [visualacuityArray1, setvisualacuityArray1] = useState([])
    const [visualacuityArray2, setvisualacuityArray2] = useState([])

    const [cnoneArray, setcnoneArray] = useState([])
    const [cn2Array, setcn2Array] = useState([])
    const [cn3Array, setcn3Array] = useState([])
    const [cn4Array, setcn4Array] = useState([])
    const [cn5Array, setcn5Array] = useState([])
    const [cn6Array, setcn6Array] = useState([])
    const [cn7Array, setcn7Array] = useState([])
    const [cn8Array, setcn8Array] = useState([])
    const [cn9Array, setcn9Array] = useState([])





    const [historyShowAll1, setHistoryShowAll1] = useState(true);


    const [cn1, setCn1] = useState([]);
    const [cn2, setCn2] = useState([]);
    const [cn3, setCn3] = useState([]);
    const [cn4, setCn4] = useState([]);
    const [cn5, setCn5] = useState([]);
    const [cn6, setCn6] = useState([]);
    const [cn7, setCn7] = useState([]);
    const [cn8, setCn8] = useState([]);
    const [cn9, setCn9] = useState([]);
    const [neck, setNeck] = useState("");


    //Popover
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



    //CnsPart1

    const [olfactory, setOlfactory] = useState("");
    const [visualAcuity, setVisualAcuity] = useState("");
    const [visualAcuityDetail, setVisualAcuityDetail] = useState("");
    const [visualField, setVisualField] = useState([]);
    const [fundoscopy, setFundosCopy] = useState("");
    const [fundoscopyDetail, setFundosCopyDetail] = useState([]);
    const [papillary, setPapillary] = useState("");
    const [pupil, setPupil] = useState("");
    const [light, setLight] = useState("");
    const [eyeMovement, setEyeMovement] = useState("");
    const [sensoryValue, setsensoryValue] = useState(false);
    const [motor, setmotor] = useState("");
    const [face, setFace] = useState("");
    const [jaw, setJaw] = useState("");
    const [corner, setCorner] = useState("");
    const [lookingUp, setLookingUp] = useState("");
    const [shuttingEye, setShuttingEye] = useState("");
    const [shoulder, setShoulder] = useState("");
    const [neckMovement, setNeckMovement] = useState("");
    const [whisper, setWhisper] = useState("");
    const [wever, setWever] = useState("");
    const [rinner, setRinner] = useState("");
    const [hallPike, setHallPike] = useState("");
    const [uvula, setUvula] = useState("");
    const [posterior, setPosterior] = useState("");
    const [tongue, setTongue] = useState("");
    const [diviation, setDiviation] = useState("");
    //New doctorchange
    const [rashHerpesZoster, setRashHerpesZoster] = useState("");
    const [firstNerve, setFirstNerve] = useState("");
    const [secondNerve, setSecondNerve] = useState("");
    const [thirdNerve, setThirdNerve] = useState("");
    const [fifthNerve, setFifthNerve] = useState("");
    const [seventhNerve, setSeventhNerve] = useState("");
    const [eleventhNerve, setEleventhNerve] = useState("");
    const [eightNerve, setEightNerve] = useState("");
    const [ninthNerve, setNinthNerve] = useState("");
    const [twelfthNerve, setTwelfthNerve] = useState("");
    const [gagReflex, setGagReflex] = useState("");



    //set value


    //Popover
    // 
    const [change9, setChange9] = useState(false)
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
    const [change11, setChange11] = useState(false)
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
    const [change13, setChange13] = useState(false);
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
    const [change15, setChange15] = useState(false);
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
    const [change17, setChange17] = useState(false);
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
    const [change19, setChange19] = useState(false);
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
    const [change21, setChange21] = useState(false);
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
    //
    const [change24, setChange24] = useState(false);
    const [anchorEl24, setAnchorEl24] = useState(null);
    const handleClick24 = (event) => {
        setAnchorEl24(event.currentTarget);
    };
    const handleClose24 = () => {
        setAnchorEl24(null);
    };
    const open24 = Boolean(anchorEl24);
    const id24 = open24 ? 'simple-popover' : undefined;
    //
    const [change25, setChange25] = useState(false);
    const [anchorEl25, setAnchorEl25] = useState(null);
    const handleClick25 = (event) => {
        setAnchorEl25(event.currentTarget);
    };
    const handleClose25 = () => {
        setAnchorEl25(null);
    };
    const open25 = Boolean(anchorEl25);
    const id25 = open25 ? 'simple-popover' : undefined;
    //
    const [change26, setChange26] = useState(false);
    const [anchorEl26, setAnchorEl26] = useState(null);
    const handleClick26 = (event) => {
        setAnchorEl26(event.currentTarget);
    };
    const handleClose26 = () => {
        setAnchorEl26(null);
    };
    const open26 = Boolean(anchorEl26);
    const id26 = open26 ? 'simple-popover' : undefined;
    //
    const [change27, setChange27] = useState(false);
    const [anchorEl27, setAnchorEl27] = useState(null);
    const handleClick27 = (event) => {
        setAnchorEl27(event.currentTarget);
    };
    const handleClose27 = () => {
        setAnchorEl27(null);
    };
    const open27 = Boolean(anchorEl27);
    const id27 = open27 ? 'simple-popover' : undefined;
    //
    const [change28, setChange28] = useState(false);
    const [anchorEl28, setAnchorEl28] = useState(null);
    const handleClick28 = (event) => {
        setAnchorEl28(event.currentTarget);
    };
    const handleClose28 = () => {
        setAnchorEl28(null);
    };
    const open28 = Boolean(anchorEl28);
    const id28 = open28 ? 'simple-popover' : undefined;
    //
    const [change29, setChange29] = useState(false);
    const [anchorEl29, setAnchorEl29] = useState(null);
    const handleClick29 = (event) => {
        setAnchorEl29(event.currentTarget);
    };
    const handleClose29 = () => {
        setAnchorEl29(null);
    };
    const open29 = Boolean(anchorEl29);
    const id29 = open29 ? 'simple-popover' : undefined;

    //
    const [change30, setChange30] = useState(false);
    const [anchorEl30, setAnchorEl30] = useState(null);
    const handleClick30 = (event) => {
        setAnchorEl30(event.currentTarget);
    };
    const handleClose30 = () => {
        setAnchorEl30(null);
    };
    const open30 = Boolean(anchorEl30);
    const id30 = open30 ? 'simple-popover' : undefined;
    //
    const [change31, setChange31] = useState(false);
    const [anchorEl31, setAnchorEl31] = useState(null);
    const handleClick31 = (event) => {
        setAnchorEl31(event.currentTarget);
    };
    const handleClose31 = () => {
        setAnchorEl31(null);
    };
    const open31 = Boolean(anchorEl31);
    const id31 = open31 ? 'simple-popover' : undefined;
    //
    const [change32, setChange32] = useState(false);
    const [anchorEl32, setAnchorEl32] = useState(null);
    const handleClick32 = (event) => {
        setAnchorEl32(event.currentTarget);
    };
    const handleClose32 = () => {
        setAnchorEl32(null);
    };
    const open32 = Boolean(anchorEl32);
    const id32 = open32 ? 'simple-popover' : undefined;
    //
    const [change33, setChange33] = useState(false);
    const [anchorEl33, setAnchorEl33] = useState(null);
    const handleClick33 = (event) => {
        setAnchorEl33(event.currentTarget);
    };
    const handleClose33 = () => {
        setAnchorEl33(null);
    };
    const open33 = Boolean(anchorEl33);
    const id33 = open33 ? 'simple-popover' : undefined;
    //
    const [change66, setChange66] = useState(false);
    const [anchorEl66, setAnchorEl66] = useState(null);
    const handleClick66 = (event) => {
        setAnchorEl66(event.currentTarget);
    };
    const handleClose66 = () => {
        setAnchorEl66(null);
    };
    const open66 = Boolean(anchorEl66);
    const id66 = open66 ? 'simple-popover' : undefined;
    //
    const [change67, setChange67] = useState(false);
    const [anchorEl67, setAnchorEl67] = useState(null);
    const handleClick67 = (event) => {
        setAnchorEl67(event.currentTarget);
    };
    const handleClose67 = () => {
        setAnchorEl67(null);
    };
    const open67 = Boolean(anchorEl67);
    const id67 = open67 ? 'simple-popover' : undefined;

    const [saveLoding, setsaveLoding] = useState(false)

    const saveCns = () => {
        //rashHerpesZoster
        setsaveLoding(true)
        const formData = new FormData();
        formData.append('patient_id', props.patient_id);
        formData.append('CN_1', cn1);
        formData.append('CN_2', cn2);
        formData.append('CN_3', cn3);
        formData.append('CN_4', cn4);
        formData.append('CN_5', cn5);
        formData.append('CN_6', cn6);
        formData.append('CN_7', cn7);
        formData.append('CN_8', cn8);
        formData.append('CN_9', cn9);
        formData.append('olfactory', olfactory);
        formData.append('visualAcuity', visualAcuity);
        formData.append('visualAcuityDetail', visualAcuityDetail);
        formData.append('visualField', visualField);

        formData.append('fundoscopy', fundoscopy);
        formData.append('fundoscopyDetail', fundoscopyDetail);


        formData.append('papillary', papillary);
        formData.append('pupil', pupil);
        formData.append('light', light);
        formData.append('eyeMovement', eyeMovement);
        formData.append('sensory', sensoryValue);
        formData.append('motor', motor);
        formData.append('force_to_shut_open_mouth', face);
        formData.append('jaw', jaw);
        formData.append('drooping_corner_of_mouth', corner);
        formData.append('lookingUp', lookingUp);
        formData.append('on_shutting_eye', shuttingEye);
        formData.append('shrug_the_shoulder_trapezius', shoulder);
        formData.append('neckMovement', neckMovement);
        formData.append('whisper_test', whisper);
        formData.append('wever_test', wever);
        formData.append('rinner_test', rinner);
        formData.append('hallpike_manoeuvre', hallPike);
        formData.append('uvula', uvula);
        formData.append('posterior_third_of_tongue_sensation_(XI)', posterior);
        formData.append('tongue', tongue);
        formData.append('diviation', diviation);

        formData.append('rashHerpesZoster', rashHerpesZoster);
        formData.append('firstNerve', firstNerve);
        formData.append('secondNerve', secondNerve);
        formData.append('thirdNerve', thirdNerve);
        formData.append('fifthNerve', fifthNerve);
        formData.append('seventhNerve', seventhNerve);
        formData.append('eleventhNerve', eleventhNerve);
        formData.append('eightNerve', eightNerve);
        formData.append('ninthNerve', ninthNerve);
        formData.append('twelfthNerve', twelfthNerve);
        formData.append('gagReflex', gagReflex);
        axios.post('/save-cns-part1', formData).then(res => {
            console.log("csn", res.data)

            const note = `
<p className="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Cranial Nerves:</strong></span></p>
<p className="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;">
    <strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${(res.data.cns_part1.CN_1 || res.data.cns_part1.CN_2 || res.data.cns_part1.CN_3 || res.data.cns_part1.CN_4 || res.data.cns_part1.CN_5 || res.data.cns_part1.CN_6 || res.data.cns_part1.CN_7 || res.data.cns_part1.CN_8 || res.data.cns_part1.CN_9) ? "History : " : ""} </span></strong></p>

${res.data.cns_part1.CN_1 === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>CN-I: </strong> <u>${res.data.cns_part1.CN_1.replaceAll(',', ' . ')}</u>
</span></span></p>
`}
${res.data.cns_part1.CN_2 === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>CN-II: </strong> <u>${res.data.cns_part1.CN_2.replaceAll(',', ' . ')}</u>
</span></span></p>
`}
${res.data.cns_part1.CN_3 === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>CN-III,IV,VI: </strong> <u>${res.data.cns_part1.CN_3.replaceAll(',', ' . ')}</u>
</span></span></p>
`}
${res.data.cns_part1.CN_4 === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>CN-V: </strong> <u>${res.data.cns_part1.CN_4.replaceAll(',', ' . ')}</u>
</span></span></p>
`}
${res.data.cns_part1.CN_5 === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>CN-VII: </strong> <u>${res.data.cns_part1.CN_5.replaceAll(',', ' . ')}</u>
</span></span></p>
`}
${res.data.cns_part1.CN_6 === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>CN-VIII: </strong> <u>${res.data.cns_part1.CN_6.replaceAll(',', ' . ')}</u>
</span></span></p>
`}
${res.data.cns_part1.CN_7 === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>CN-IX,X: </strong> <u>${res.data.cns_part1.CN_7.replaceAll(',', ' . ')}</u>
</span></span></p>
`}
${res.data.cns_part1.CN_8 === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>CN-XI: </strong> <u>${res.data.cns_part1.CN_8.replaceAll(',', ' . ')}</u>
</span></span></p>
`}
${res.data.cns_part1.CN_9 === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>CN-XII: </strong> <u>${res.data.cns_part1.CN_9.replaceAll(',', ' . ')}</u>
</span></span></p>
`}

<p className="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;">
    <strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">Examination :</span></strong></p>
${res.data.cns_part1.firstNerve === null ? '' :
                    `
<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>The First Nerve  -Olfactory : </strong> ${res.data.cns_part1.firstNerve}
</span></span></p>
${res.data.cns_part1.olfactory === null ? '' :
                        `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
  &nbsp;&nbsp;  Able to smell:  <u>${res.data.cns_part1.olfactory}</u>
</span></span></p>`}
`}

${res.data.cns_part1.secondNerve === null ? '' :
                    `
<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>The Second Nerve-Optic: </strong> ${res.data.cns_part1.secondNerve}
</span></span></p>`}
${res.data.cns_part1.visualAcuity === null && res.data.cns_part1.visualAcuityDetail === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
  &nbsp;&nbsp;  Visual Acuity ${res.data.cns_part1.visualAcuity === null ? '' : `Left : ${res.data.cns_part1.visualAcuity}`}   
  ${res.data.cns_part1.visualAcuityDetail === null ? '' : `Right : ${res.data.cns_part1.visualAcuityDetail}`}
</span></span></p>`}
${res.data.cns_part1.visualField === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Visual Field: ${res.data.cns_part1.visualField.replaceAll(',', ' . ')}
</span></span></p>`}

${res.data.cns_part1.fundoscopy === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Fundoscopy : ${res.data.cns_part1.fundoscopy === null ? '' : `${res.data.cns_part1.fundoscopy}`}   
  ${res.data.cns_part1.fundoscopyDetail === null ? '' : ` : ${res.data.cns_part1.fundoscopyDetail.replaceAll(',', ' . ')}`}
</span></span></p>`}

${res.data.cns_part1.papillary === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Papillary oedema: ${res.data.cns_part1.papillary}   
</span></span></p>`}


${res.data.cns_part1.thirdNerve === null ? '' :
                    `
<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>The Third- Oculomotor, Fourth- Trochlear & Sixth- Abducens: </strong> ${res.data.cns_part1.thirdNerve}
</span></span></p>`}

${res.data.cns_part1.pupil === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Pupil: ${res.data.cns_part1.pupil}   
</span></span></p>`}
${res.data.cns_part1.light === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Light reflex: ${res.data.cns_part1.light}   
</span></span></p>`}
${res.data.cns_part1.eyeMovement === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Eye Movement: ${res.data.cns_part1.eyeMovement}   
</span></span></p>`}


${res.data.cns_part1.fifthNerve === null ? '' :
                    `
<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>The fifth - trigeminal nerve: </strong> ${res.data.cns_part1.fifthNerve}
</span></span></p>`}

${res.data.cns_part1.sensory === "false" ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px; ">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
&nbsp;&nbsp; Sensory&nbsp; :&nbsp; &nbsp; &nbsp; ${activeColor}
 <svg version="1.1" id="Layer_1"  x="0px" y="0px" viewBox="0 0 1200 300">
    
        <g>
            <path class="${activeColor === "Mandibular area" ? "sActive" : "st0"}" d="M55.27,266.2c0.41-1.94,1.33-4.85,3.71-7.15c3.8-3.68,8.63-3.46,17.32-4.58c4.04-0.52,9.63-1.44,16.32-3.16
        		c8.08-1.55,14.71-3.41,19.56-4.95c8.38-2.66,15.17-4.83,22.93-9.62c6.46-3.99,10.52-7.92,14.47-11.74
        		c3.71-3.59,9.61-11.64,21.32-27.56c1.21-1.64,3.24-4.42,5.46-8.38c2.52-4.48,4.03-8.24,4.93-10.6c3.85-10.11,5.01-17.81,7.25-25.18
        		c1.68-5.53,4.43-13.57,8.92-23.12c-0.17-13.09,0.47-20.05,1.13-24.02c0.17-1.03,0.56-3.18,0.76-6.19c0.27-4.21-0.09-6.09-0.05-10.1
        		c0.05-4.21,0.5-6.97,0.71-8.77c1.06-9.3-0.98-24.49-4.91-50.4c0,0-0.6-4.55,0.03-8.37c0.37-2.26,0.7-2.38,0.52-2.88
        		c0,0-1.51-4.29-51.66,5.63c0,0-21.54,8.71-35.76,40.34l6.42,21.54c0,0,11.92,60.51,5.96,75.63c-1.73,4.39-4.17,8.15-4.17,8.15
        		c-2.01,3.31-3.85,5.63-5.51,7.72c-1.64,2.05-4.72,5.92-7.79,8.77c-1.59,1.47-6.15,5.45-17.28,9.43
        		c-8.01,2.86-14.84,4.09-24.38,5.36c-8.66,1.15-20.17,2.42-33.92,3.21c0,0-8.25,7.33,3.21,15.58c0,0,8.25,7.33,0.92,12.38
        		c0,0-10.08,17.88-0.46,29.34c0,0,7.33,7.54,18.33,5.83C51.46,267.6,53.36,266.9,55.27,266.2z" />
            <path class="st1" d="M137,236.42c3.25-0.21,11.95-1.19,20.28-7.66c7.93-6.16,11.08-13.83,12.17-16.94" />
            <path class="st2" d="M206.65,143.25" />
            <g>
                <g>
                    <g>
                        <path class="${activeColor === "Cervical area" ? "sActive" : "st3"}" d="M284.38,290.75c-7.32-10.34-14.64-20.69-21.96-31.03c-3.16-5.42-6.63-12.62-9.11-21.47
        					c-4.27-15.2-3.73-28.39-2.68-36.77c7.57-22.34,15.14-44.68,22.71-67.02h-2.01c0.41-0.23,0.82-0.51,1.24-0.84
        					c3.26-2.53,4.62-6.39,7.34-14.1c5-14.18,4.84-26.37,4.67-33.88c-0.06-2.65-0.33-9.47-1.83-18.33
        					c-2.26-13.35-5.19-29.48-17.19-42.4c-0.79-0.85-3.98-4.22-8.88-7.78c-7.58-5.49-14.22-7.74-21.38-10.1
        					c-10.47-3.45-14.52-3-17.08-2.39c-2.43,0.58-4.31,1.49-5.54,2.18c-0.89,0.92-2.23,2.28-3.87,3.91
        					c-2.63,2.61-3.94,3.91-4.62,4.37c-3.79,2.62-5.89,1.55-7.75,3.92c-0.86,1.1-1.07,2.46-1.49,5.17c-0.56,3.63-0.41,6.71,0.09,8.91
        					c1.15,5.1,1.06,10.43,2.17,15.54c4.9,22.58,2.41,35.87,2.41,35.87c0.14,11.67-0.44,28.36-3.63,48.88
        					c-0.77,0.6-0.84,0.94-0.79,1.13c0,0,0,0-0.01,0c-1.67,4.32-4.07,10.77-6.64,18.73c-4.66,14.51-4.32,16.84-6.8,23.93
        					c-4.72,13.52-11.92,22.17-23.91,36.58c-9.85,11.83-14.77,17.75-19.78,21.11c-20.92,14.07-57.51,18.38-73.88,21.9
        					c-9.05,1.94-8.9,9.43-8.9,9.43l18.6,4.01c0,0,9.34,0.6,20.14,0.66c10.8,0.05,15.43,8.52,15.43,8.52l6.74,20.6H294.2
        					L284.38,290.75z M211.13,134.5c1.4-0.04,0.7,0,6.23,0C215.29,134.5,213.21,134.5,211.13,134.5z" />
                    </g>
                </g>
                <path class="st2" d="M199.87,123.74c12.65-3.51,18.06-1.07,19.92,0.03c10.85,6.39,5.26,28.59-7.87,42.34
        			c-3.01,3.15-6.03,5.45-8.24,6.98c-1.54,0.71-13.61,6.23-16.68,3.56c-1.29-1.13-0.75-3.79,1-9.02c4.94-14.74,0.61-4.92,7.36-28.16
        			c0.09-0.32,0.18-0.63,0.27-0.95C197.46,132.26,198.88,127.27,199.87,123.74z" />
                <path class="st4" d="M208.99,137.49c0.6-0.29,1.82-0.8,3.39-0.84c0.75-0.02,2.15-0.05,2.96,0.61c1.06,0.86,0.61,2.44,0.29,3.52
        			c-0.82,2.74-2.66,4.48-6.3,7.86c-2.2,2.04-3.9,3.31-5.46,3.08c-0.2-0.03-0.36-0.08-0.46-0.12c-0.06-0.05-0.16-0.12-0.25-0.22
        			c-0.88-1.02,0.51-2.69,1.66-4.74c1.98-3.54,0.64-4.91,3.23-8.09C208.42,138.07,208.77,137.71,208.99,137.49z" />
                <path class="st5" d="M206.61,130.06c0.24-0.11,0.54-0.23,0.9-0.32c4.26-1.01,11.01,3.89,11.45,9.04c0.05,0.6,0.1,1.25-0.04,2.02
        			c-0.42,2.35-1.99,3.99-2.69,4.74c-6.78,7.19-8.16,11.69-16.69,16.74c-0.73,0.43-1.33,0.76-1.65,0.94
        			c-0.55,0.18-0.89,0.14-1.1,0.06c-2.49-0.89,4.38-9.39,4.81-21.15c0,0,0.15-8.79,3.86-11.38
        			C205.91,130.43,206.33,130.21,206.61,130.06z" />
            </g>
            <g>
                <path class="${activeColor === "Ophthalmic area" ? "sActive" : "st6"}" d="M209.62,10.01c-2.37,1.98-4.74,3.96-7.11,5.94c-2.29,1.15-4.58,2.29-6.87,3.44
        			c-2.76-0.28-5.52-0.57-8.28-0.86c-2.87,0.19-7.14,0.53-12.32,1.18c-4.93,0.62-7.9,1.17-12.94,1.97
        			c-4.09,0.65-9.91,1.52-17.06,2.41c-4.58,3.12-9.16,6.24-13.75,9.36c-4.24,5.02-8.48,10.03-12.72,15.05l-9.97,18.22l-9.62,22
        			c1.72,13.41-5.5,30.94-5.5,30.94c-1.52,2.7-3.05,5.4-4.57,8.1c-0.83,1.19-2.01,2.64-3.6,4.07c-1.74,1.57-3.44,2.65-4.8,3.37
        			c-1.24,0.64-2.66,1.28-4.23,1.86c-2.22,0.82-4.28,1.36-6.08,1.71c-3.25,0.86-5.93,1.26-7.8,1.46c-1.77,0.19-2.6,0.18-4.35,0.41
        			c-2.99,0.39-5.37,1.02-6.93,1.5c-3.22,0.89-7.05,2.26-11.13,4.42c-2.27,1.2-4.26,2.47-6,3.7L20.6,160.92
        			c-2.96,2.11-5.92,4.21-8.88,6.31c-1.41,0.23-2.81-0.41-3.55-1.62c-0.69-1.11-0.69-2.53,0-3.66c4.13-6.5,8.25-12.99,12.38-19.48
        			c2.25-3.08,4.51-6.32,6.76-9.7c1.23-1.85,2.41-3.68,3.55-5.49c0.62-1.07,2.12-4,1.83-7.97c-0.27-3.76-2-6.34-2.75-7.33
        			c-0.57-0.88-1.33-2.3-1.73-4.19c-0.53-2.49-0.16-4.55,0.13-5.66c2.25-3.75,4.5-7.77,6.7-12.04c4.08-7.92,7.37-15.51,10.03-22.57
        			c1.42-4.12,2.95-8.32,4.58-12.6c1.28-3.36,2.58-6.65,3.89-9.85c1.97-2.96,4.32-6.14,7.1-9.4c3.85-4.52,7.71-8.23,11.23-11.23
        			c7.4-4.51,13.98-8.34,19.48-11.46c5.12-2.9,8.77-4.89,14-6.57c4.26-1.37,7.95-2.03,10.52-2.37c4.35-0.69,8.71-1.37,13.06-2.06
        			c19.31-2.1,33.97-2.14,43.31-1.83c15.72,0.51,14.04,1.94,24.75,1.6c7.59-0.23,14.06-1.12,15.36,1.6
        			C213.23,5.18,211.41,7.9,209.62,10.01z" />
                
                <path class="st2" d="M60.42,121.58c2,3.56,5.72,5.49,9.32,4.88c4.3-0.73,6.34-4.7,6.56-5.16c-0.2-0.5-2.14-5.14-6.7-6.13
        			c-3.01-0.66-7.19,0.26-8.67,3.34C60.41,119.62,60.36,120.76,60.42,121.58z" />
            </g>
            <g>
                <path class="${activeColor === "Maxillary area" ? "sActive" : "st8"}" d="M27.77,206.07c0,0,75.63,1.24,87.94-35.91c1.91-2.56,4.44-6.63,6-12.11c2.46-8.7,1.08-16.1,0.16-19.65
        			c-0.97-12.21-2.57-25.47-5.08-39.58c-1.97-11.09-4.28-21.47-6.77-31.09c-0.53-0.46-1.18-0.89-1.64-0.69
        			c-0.54,0.24-0.56,1.26-0.58,1.51c-0.18,3.4-6.22,10.75-8.24,18.84c-1.03,4.12,0.08,4.02-0.56,10.3
        			c-0.76,7.51-2.93,13.43-4.67,17.3c-0.92,4.26-3.59,13.45-11.6,18.9c-4.85,3.3-10.62,4.52-15.33,5.51c-4.27,0.9-7.9,1.2-10.42,1.31
        			c-3.95,0.81-8.6,2.09-13.63,4.18c-7.55,3.14-13.39,7.04-17.55,10.32c-3.09,2.98-6.19,5.96-9.28,8.94
        			c-0.49,0.08-3.88,0.67-4.81,3.09c-0.91,2.35,1.09,4.93,2.06,6.19c3.85,4.97,8.36,3.95,10.28,8.14c0.71,1.56,0.64,2.99,0.49,5.85
        			c-0.25,4.76-2.07,9.51-2.07,9.51l0.73,5.64L27.77,206.07z" />
                    
            </g>
        </g>
    </svg>
    
</span></span></p>`}
${res.data.cns_part1.motor === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Motor: ${res.data.cns_part1.motor}   
</span></span></p>`}
${res.data.cns_part1.force_to_shut_open_mouth === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Force to shut open mouth: ${res.data.cns_part1.force_to_shut_open_mouth}   
</span></span></p>`}
${res.data.cns_part1.jaw === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Jaw Jerk: ${res.data.cns_part1.jaw}   
</span></span></p>`}


${res.data.cns_part1.seventhNerve === null ? '' :
                    `
<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>The seventh - facial nerve: </strong> ${res.data.cns_part1.seventhNerve}
</span></span></p>`}

${res.data.cns_part1.drooping_corner_of_mouth === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Drooping corner of mouth: ${res.data.cns_part1.drooping_corner_of_mouth}   
</span></span></p>`}
${res.data.cns_part1.lookingUp === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Lookling up: ${res.data.cns_part1.lookingUp}   
</span></span></p>`}
${res.data.cns_part1.on_shutting_eye === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  On shutting eye(on lesion side eye move upward and incomplete closure- LMNL): ${res.data.cns_part1.on_shutting_eye}   
</span></span></p>`}
${res.data.cns_part1.rashHerpesZoster === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Rash - herpes zoster: ${res.data.cns_part1.rashHerpesZoster}   
</span></span></p>`}

${res.data.cns_part1.eightNerve === null ? '' :
                    `
<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>The eight - acoustic nerve: </strong> ${res.data.cns_part1.eightNerve}
</span></span></p>`}

${res.data.cns_part1.whisper_test === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Whisper Test: ${res.data.cns_part1.whisper_test}   
</span></span></p>`}
${res.data.cns_part1.wever_test === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Weber’s test: ${res.data.cns_part1.wever_test}   
</span></span></p>`}
${res.data.cns_part1.rinner_test === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Rinne’s test: ${res.data.cns_part1.rinner_test}   
</span></span></p>`}
${res.data.cns_part1.hallpike_manoeuvre === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Hallpike manoeuvre: ${res.data.cns_part1.hallpike_manoeuvre}   
</span></span></p>`}

${res.data.cns_part1.ninthNerve === null ? '' :
                    `
<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>The ninth - glossophary & tenth - vagus nerve: </strong> ${res.data.cns_part1.ninthNerve}
</span></span></p>`}

 ${res.data.cns_part1.uvula === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Uvula: ${res.data.cns_part1.uvula}   
</span></span></p>`}

 ${res.data.cns_part1.gagReflex === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Gag reflex (Sensory - XI, Motor - X): ${res.data.cns_part1.gagReflex}   
</span></span></p>`}

 ${res.data.cns_part1.posterior_third_of_tongue_sensation === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Posterior third of tongue sensation (XI): ${res.data.cns_part1.posterior_third_of_tongue_sensation}   
</span></span></p>`}


${res.data.cns_part1.eleventhNerve === null ? '' :
                    `
<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>The eleventh - accessory nerve: </strong> ${res.data.cns_part1.eleventhNerve}
</span></span></p>`}

 ${res.data.cns_part1.shrug_the_shoulder_trapezius === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Shrug the shoulder - trapezius: ${res.data.cns_part1.shrug_the_shoulder_trapezius}   
</span></span></p>`}
 ${res.data.cns_part1.neckMovement === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Neck movement-on resistance: ${res.data.cns_part1.neckMovement}   
</span></span></p>`}

${res.data.cns_part1.twelfthNerve === null ? '' :
                    `
<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">
   <strong>The twelfth - hypoglossal nerve: </strong> ${res.data.cns_part1.twelfthNerve}
</span></span></p>`}

 ${res.data.cns_part1.tongue === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Tongue: ${res.data.cns_part1.tongue}   
</span></span></p>`}

 ${res.data.cns_part1.diviation === null ? '' :
                    `<p className="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 13px;">

  &nbsp;&nbsp;  Fasciculation/Deviation: ${res.data.cns_part1.diviation}   
</span></span></p>`}



`;
            const data = {
                appointment_id: props?.appId,
                patient_id: props?.patient_id,
                note: note
            }
            axios.post('doctors-note', data)
                .then(res => console.log(res))
            props?.setUpdateForHistory(Math.random())
            toast.success("Cranial Nerves data inserted sucessfully")

        }).catch(error => {
            toast.error("Opps ! Someting is wrong")
        });



    }


    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip} `]: {
            backgroundColor: 'white',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 350,
            fontSize: theme.typography.pxToRem(15),
            border: '1px solid rgb(204, 204, 204)',
            textAlign: "justify",
            boxShadow: "4px 8px 5px -3px rgba(143,143,143,0.64)",
            borderRadius: "5px"
        },
    }));

    const [activeColor, setactiveColor] = useState("")

    return (
        <div className='cns-container'>
            <div className='history-main-header d-flex justify-content-between mb-2'>
                <div>
                    <h6>Cranial Nerves</h6>
                </div>
                <div>
                    <img src={clinic3} alt="" className="img-fluid" />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className='he-history p-1'>
                        {/* <input type="text" placeholder="History" className="form-control form-control-sm mt-1 mb-2" /> */}
                        <ul className={`g-doc-scroll ${historyShowAll1 ? "full-height" : "half-height"} `}>
                            <li className='list-bg-white mb-1' style={{ cursor: "pointer" }}>
                                <div onClick={handleClick} className='d-flex justify-content-between'>
                                    <p className='w-75'>CN-I</p>
                                    <div className='ms-1'>
                                        <i className="float-end me-1 mt-1 fas fa-angle-right"></i>
                                    </div>
                                </div>

                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
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
                                            cnoneArray.length > 0 &&
                                            cnoneArray.map((item, i) => {
                                                return (
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p className='w-75'>{item.name}</p>
                                                        <div className='ms-1'>
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.name} onChange={(e) => {
                                                                    const { value, checked } = e.target;

                                                                    if (checked) {
                                                                        setCn1([...cn1, value])
                                                                    } else {
                                                                        const newCn = cn1.filter((item) => item !== value)
                                                                        setCn1(newCn)
                                                                    }
                                                                }
                                                                } id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }


                                    </div>
                                </Popover>
                            </li>
                            <li className='list-bg-white mb-1' style={{ cursor: "pointer" }}>
                                <div onClick={handleClick1} className='d-flex justify-content-between'>
                                    <p className='w-75'>CN-II</p>
                                    <div className='ms-1'>
                                        <i className="float-end me-1 mt-1 fas fa-angle-right"></i>
                                    </div>
                                </div>
                                <Popover
                                    id={id1}
                                    open={open1}
                                    anchorEl={anchorEl1}
                                    onClose={handleClose1}
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
                                            cn2Array.length > 0 &&
                                            cn2Array.map((item, i) => {
                                                return (
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p className='w-75'>{item.name}</p>
                                                        <div className='ms-1'>
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.name} onChange={(e) => {
                                                                    const { value, checked } = e.target;

                                                                    if (checked) {
                                                                        setCn2([...cn2, value])
                                                                    } else {
                                                                        const newCn = cn2.filter((item) => item !== value)
                                                                        setCn2(newCn)
                                                                    }
                                                                }
                                                                } id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Popover>
                            </li>
                            <li className='list-bg-white mb-1' style={{ cursor: "pointer" }}>
                                <div onClick={handleClick2} className='d-flex justify-content-between'>
                                    <p className='w-75'>CN-III, IV, VI</p>
                                    <div className='ms-1'>
                                        <i className="float-end me-1 mt-1 fas fa-angle-right"></i>
                                    </div>
                                </div>
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
                                        horizontal: 'left',
                                    }}
                                >
                                    <div className="history-select-popup">
                                        {
                                            cn3Array.length > 0 &&
                                            cn3Array.map((item, i) => {
                                                return (
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p className='w-75'>{item.name}</p>
                                                        <div className='ms-1'>
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.name} onChange={(e) => {
                                                                    const { value, checked } = e.target;

                                                                    if (checked) {
                                                                        setCn3([...cn3, value])
                                                                    } else {
                                                                        const newCn = cn3.filter((item) => item !== value)
                                                                        setCn3(newCn)
                                                                    }
                                                                }
                                                                } id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Popover>
                            </li>
                            <li className='list-bg-white mb-1' style={{ cursor: "pointer" }}>
                                <div onClick={handleClick3} className='d-flex justify-content-between'>
                                    <p className='w-75'>CN-V</p>
                                    <div className='ms-1'>
                                        <i className="float-end me-1 mt-1 fas fa-angle-right"></i>
                                    </div>
                                </div>

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
                                            cn4Array.length > 0 &&
                                            cn4Array.map((item, i) => {
                                                return (
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p className='w-75'>{item.name}</p>
                                                        <div className='ms-1'>
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.name} onChange={(e) => {
                                                                    const { value, checked } = e.target;

                                                                    if (checked) {
                                                                        setCn4([...cn4, value])
                                                                    } else {
                                                                        const newCn = cn4.filter((item) => item !== value)
                                                                        setCn4(newCn)
                                                                    }
                                                                }
                                                                } id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </Popover>
                            </li>
                            <li className='list-bg-white mb-1' style={{ cursor: "pointer" }}>
                                <div onClick={handleClick4} className='d-flex justify-content-between'>
                                    <p className='w-75'>CN-VII</p>
                                    <div className='ms-1'>
                                        <i className="float-end me-1 mt-1 fas fa-angle-right"></i>
                                    </div>
                                </div>

                                <Popover
                                    id={id4}
                                    open={open4}
                                    anchorEl={anchorEl4}
                                    onClose={handleClose4}
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
                                            cn5Array.length > 0 &&
                                            cn5Array.map((item, i) => {
                                                return (
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p className='w-75'>{item.name}</p>
                                                        <div className='ms-1'>
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.name} onChange={(e) => {
                                                                    const { value, checked } = e.target;

                                                                    if (checked) {
                                                                        setCn5([...cn5, value])
                                                                    } else {
                                                                        const newCn = cn5.filter((item) => item !== value)
                                                                        setCn5(newCn)
                                                                    }
                                                                }
                                                                } id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </Popover>
                            </li>
                            <li className='list-bg-white mb-1' style={{ cursor: "pointer" }}>
                                <div onClick={handleClick5} className='d-flex justify-content-between'>
                                    <p className='w-75'>CN-VIII</p>
                                    <div className='ms-1'>
                                        <i className="float-end me-1 mt-1 fas fa-angle-right"></i>
                                    </div>
                                </div>

                                <Popover
                                    id={id5}
                                    open={open5}
                                    anchorEl={anchorEl5}
                                    onClose={handleClose5}
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
                                            cn6Array.length > 0 &&
                                            cn6Array.map((item, i) => {
                                                return (
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p className='w-75'>{item.name}</p>
                                                        <div className='ms-1'>
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.name} onChange={(e) => {
                                                                    const { value, checked } = e.target;

                                                                    if (checked) {
                                                                        setCn6([...cn6, value])
                                                                    } else {
                                                                        const newCn = cn6.filter((item) => item !== value)
                                                                        setCn6(newCn)
                                                                    }
                                                                }
                                                                } id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Popover>
                            </li>
                            <li className='list-bg-white mb-1' style={{ cursor: "pointer" }}>
                                <div onClick={handleClick6} className='d-flex justify-content-between'>
                                    <p className='w-75'>CN-IX, X</p>
                                    <div className='ms-1'>
                                        <i className="float-end me-1 mt-1 fas fa-angle-right"></i>
                                    </div>
                                </div>

                                <Popover
                                    id={id6}
                                    open={open6}
                                    anchorEl={anchorEl6}
                                    onClose={handleClose6}
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
                                            cn7Array.length > 0 &&
                                            cn7Array.map((item, i) => {
                                                return (
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p className='w-75'>{item.name}</p>
                                                        <div className='ms-1'>
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.name} onChange={(e) => {
                                                                    const { value, checked } = e.target;

                                                                    if (checked) {
                                                                        setCn7([...cn7, value])
                                                                    } else {
                                                                        const newCn = cn7.filter((item) => item !== value)
                                                                        setCn7(newCn)
                                                                    }
                                                                }
                                                                } id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Popover>
                            </li>
                            <li className='list-bg-white mb-1' style={{ cursor: "pointer" }}>
                                <div onClick={handleClick7} className='d-flex justify-content-between'>
                                    <p className='w-75'>CN-XI</p>
                                    <div className='ms-1'>
                                        <i className="float-end me-1 mt-1 fas fa-angle-right"></i>
                                    </div>
                                </div>
                                <div className='history-popup-value'>
                                    <p>{neck}</p>
                                </div>
                                <Popover
                                    id={id7}
                                    open={open7}
                                    anchorEl={anchorEl7}
                                    onClose={handleClose7}
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
                                            cn8Array.length > 0 &&
                                            cn8Array.map((item, i) => {
                                                return (
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p className='w-75'>{item.name}</p>
                                                        <div className='ms-1'>
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.name} onChange={(e) => {
                                                                    const { value, checked } = e.target;

                                                                    if (checked) {
                                                                        setCn8([...cn8, value])
                                                                    } else {
                                                                        const newCn = cn8.filter((item) => item !== value)
                                                                        setCn8(newCn)
                                                                    }
                                                                }
                                                                } id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </Popover>
                            </li>
                            <li className='list-bg-white mb-1' style={{ cursor: "pointer" }}>
                                <div onClick={handleClick8} className='d-flex justify-content-between'>
                                    <p className='w-75'>CN-XII</p>
                                    <div className='ms-1'>
                                        <i className="float-end me-1 mt-1 fas fa-angle-right"></i>
                                    </div>
                                </div>

                                <Popover
                                    id={id8}
                                    open={open8}
                                    anchorEl={anchorEl8}
                                    onClose={handleClose8}
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
                                            cn9Array.length > 0 &&
                                            cn9Array.map((item, i) => {
                                                return (
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p className='w-75'>{item.name}</p>
                                                        <div className='ms-1'>
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.name} onChange={(e) => {
                                                                    const { value, checked } = e.target;

                                                                    if (checked) {
                                                                        setCn9([...cn9, value])
                                                                    } else {
                                                                        const newCn = cn9.filter((item) => item !== value)
                                                                        setCn9(newCn)
                                                                    }
                                                                }
                                                                } id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </Popover>
                            </li>
                        </ul>
                        {
                            !historyShowAll1 ?
                                <span onClick={() => setHistoryShowAll1(!historyShowAll1)} className="history-see-all">Show All <i className="ms-1 far fa-angle-down"></i></span>
                                :
                                <span onClick={() => setHistoryShowAll1(!historyShowAll1)} className="history-see-all">Show Less <i className="ms-1 far fa-angle-up"></i></span>
                        }
                    </div>
                </div>
                <div className="col-10">
                    <div className='history-main-header mb-2'>
                        <div className="d-flex">
                            <input
                                type="text"
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
                                        <button className="vaital-setup-btn float-end me-2"><i className="fas fa-check-circle"></i></button>
                                        :
                                        <button onClick={saveCns} className="vaital-setup-btn float-end me-2">Save</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="exam-bg-white p-1">
                                <h6 className='me-2'>The first nerve</h6>
                                <div className='d-flex'>
                                    <input className='custom-radio' value="Left" onClick={(e) => setFirstNerve(e.target.value)} type="radio" name="nerve" />
                                    <label> Left</label>
                                    <input className='custom-radio' value="Right" onClick={(e) => setFirstNerve(e.target.value)} type="radio" name="nerve" />
                                    <label> Right</label>
                                    <input className='custom-radio' value="Both" onClick={(e) => setFirstNerve(e.target.value)} type="radio" name="nerve" />
                                    <label> Both</label>
                                </div>
                                <div className="list-bg-white">
                                    <div className='d-flex justify-content-between'>
                                        <p>Olfactory</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange9(!change9); setOlfactory("") }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick9} className="slider round"></div>
                                            {
                                                change9 &&
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
                                                    <div className="history-select-popup">
                                                        {
                                                            olfactoryArray.length > 0 &&
                                                            olfactoryArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.olfactory_name} type="radio" name="cough"
                                                                            onChange={(e) => {
                                                                                setOlfactory(e.target.value)
                                                                            }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.olfactory_name}
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
                                        <p>{olfactory}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="exam-bg-white p-1">
                                <h6>The second nerve-optic</h6>
                                <div className='d-flex'>
                                    <input className='custom-radio' value="Left" onClick={(e) => setSecondNerve(e.target.value)} type="radio" name="nerve2" />
                                    <label> Left</label>
                                    <input className='custom-radio' value="Right" onClick={(e) => setSecondNerve(e.target.value)} type="radio" name="nerve2" />
                                    <label> Right</label>
                                    <input className='custom-radio' value="Both" onClick={(e) => setSecondNerve(e.target.value)} type="radio" name="nerve2" />
                                    <label> Both</label>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Visual acuity</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange10(!change10); setVisualAcuityDetail(""); setVisualAcuity("") }} type="checkbox" id="togBtn" />
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

                                                    <div className="left-popup">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h6>Left</h6>
                                                                {
                                                                    visualacuityArray1.length > 0 &&
                                                                    visualacuityArray1.map((v, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check">
                                                                                <input className="form-check-input" value={v.visualacuity_name} type="radio" name="cough" onChange={(e) => setVisualAcuity(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {v.visualacuity_name}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                {
                                                                    visualacuityArray2.length > 0 &&
                                                                    visualacuityArray2.map((v, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check">
                                                                                <input className="form-check-input" value={v.visualacuity_name} type="radio" name="cough" onChange={(e) => setVisualAcuity(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {v.visualacuity_name}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <div className="col-6">
                                                                <h6>Right</h6>
                                                                {
                                                                    visualacuityArray1.length > 0 &&
                                                                    visualacuityArray1.map((v, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check">
                                                                                <input className="form-check-input" value={v.visualacuity_name} type="radio" name="cough2" onChange={(e) => setVisualAcuityDetail(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {v.visualacuity_name}
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                {
                                                                    visualacuityArray2.length > 0 &&
                                                                    visualacuityArray2.map((v, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check">
                                                                                <input className="form-check-input" value={v.visualacuity_name} type="radio" name="cough2" onChange={(e) => setVisualAcuityDetail(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {v.visualacuity_name}
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
                                        <p> {visualAcuity && <span>Left : </span>} {visualAcuity}</p>
                                        <p> {visualAcuityDetail && <span>Right : </span>} {visualAcuityDetail}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Visual Field</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange11(!change11); setVisualField([]) }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick11} className="slider round"></div>
                                            {
                                                change11 &&
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

                                                    <div className="left-popup p-1">
                                                        {
                                                            visualFieldArray.length > 0 &&
                                                            visualFieldArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check ms-1 mt-1 me-1">
                                                                        <input
                                                                            name={item.id}
                                                                            value={item.visualfield_name}
                                                                            type="checkbox"
                                                                            onChange={(e) => {
                                                                                const { value, checked } = e.target;

                                                                                if (checked) {
                                                                                    setVisualField([...visualField, value])
                                                                                } else {
                                                                                    const newCn = visualField.filter((item) => item !== value)
                                                                                    setVisualField(newCn)
                                                                                }

                                                                            }}
                                                                            id="togBtn"
                                                                        />
                                                                        <label className="ms-2" >
                                                                            {item.visualfield_name}
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
                                    <div className="history-popup-value">

                                        {
                                            visualField &&
                                            Object.keys(visualField).map((item, i) => <p key={i}>{visualField[item]}</p>)
                                        }

                                    </div>

                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Fundoscopy</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange12(!change12); setFundosCopyDetail([]); setFundosCopy("") }} type="checkbox" id="togBtn" />
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

                                                    <div className="cns-eye-popup">
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Left" type="radio" name="cough2" onChange={(e) => { setFundosCopy(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Left
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Right" type="radio" name="cough2" onChange={(e) => setFundosCopy(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Right
                                                                    </label>
                                                                </div>

                                                            </div>

                                                            <div className="col-6">

                                                                {
                                                                    fundoscopyArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                                        <input className="form-check-input" value={item.fundoscopy_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                            const { value, checked } = e.target;

                                                                            if (checked) {
                                                                                setFundosCopyDetail([...fundoscopyDetail, value])
                                                                            } else {
                                                                                const newCn = fundoscopyDetail.filter((item) => item !== value)
                                                                                setFundosCopyDetail(newCn)
                                                                            }



                                                                        }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.fundoscopy_name}
                                                                        </label>
                                                                    </div>)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }

                                        </label>
                                    </div>
                                    <div className='history-popup-value'>
                                        <div className="row">
                                            <div className="col-2">
                                                <p>{fundoscopy}</p>
                                            </div>
                                            <div className="col-10">
                                                {
                                                    fundoscopyDetail &&
                                                    Object.keys(fundoscopyDetail).map((key, i) =>
                                                        <p key={i} className='me-2'>{fundoscopyDetail[key]}</p>

                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-bg-white">
                                    <div className='d-flex justify-content-between'>
                                        <p>Papillary oedema</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange13(!change13); setPapillary("") }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick13} className="slider round"></div>
                                            {
                                                change13 &&
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
                                                    <div className="history-select-popup">
                                                        {
                                                            papillaryoedemaArray.length > 0 &&
                                                            papillaryoedemaArray.map((v, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={v.papillaryoedema_name} type="radio" name="cough3" onChange={(e) => setPapillary(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {v.papillaryoedema_name}

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
                                        <p>{papillary}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="exam-bg-white mt-1 p-1">
                                <h6>The third - oculomotor, fourth - trochlear & sixth- abducens</h6>
                                <div className='d-flex'>
                                    <input className='custom-radio' value="Left" onClick={(e) => setThirdNerve(e.target.value)} type="radio" name="nerve3" />
                                    <label> Left</label>
                                    <input className='custom-radio' value="Right" onClick={(e) => setThirdNerve(e.target.value)} type="radio" name="nerve3" />
                                    <label> Right</label>
                                    <input className='custom-radio' value="Both" onClick={(e) => setThirdNerve(e.target.value)} type="radio" name="nerve3" />
                                    <label> Both</label>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Pupil</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange14(!change14); setPupil("") }} type="checkbox" id="togBtn" />
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
                                                            pupilArray.length > 0 &&
                                                            pupilArray.map((v, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={v.pupil_name} type="radio" name="cough3" onChange={(e) => setPupil(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {v.pupil_name}
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
                                        <p>{pupil}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Light reflex</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange15(!change15); setLight("") }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick15} className="slider round"></div>
                                            {
                                                change15 &&
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
                                                    <div className="history-select-popup">

                                                        {
                                                            lightreflexArray.length > 0 &&
                                                            lightreflexArray.map((v, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={v.lightreflex_name} type="radio" name="cough3" onChange={(e) => setLight(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {v.lightreflex_name}
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
                                        <p>{light}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white">
                                    <div className='d-flex justify-content-between'>
                                        <p>Eye movement</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange16(!change16); setEyeMovement("") }} type="checkbox" id="togBtn" />
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
                                                    <div className="history-select-popup">

                                                        {
                                                            eyemovementsArray.length > 0 &&
                                                            eyemovementsArray.map((v, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={v.eyemovements_name} type="radio" name="cough3" onChange={(e) => setEyeMovement(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {v.eyemovements_name}
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
                                        <p>{eyeMovement}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="exam-bg-white p-1">
                                <h6>The fifth - trigeminal nerve</h6>
                                <div className='d-flex'>
                                    <input className='custom-radio' value="Left" onClick={(e) => setFifthNerve(e.target.value)} type="radio" name="nerve77" />
                                    <label>Left</label>
                                    <input className='custom-radio' value="Right" onClick={(e) => setFifthNerve(e.target.value)} type="radio" name="nerve77" />
                                    <label>Right</label>
                                    <input className='custom-radio' value="Both" onClick={(e) => setFifthNerve(e.target.value)} type="radio" name="nerve77" />
                                    <label>Both</label>
                                </div>
                                <div className="list-bg-white mt-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Sensory</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange17(!change17); setsensoryValue(!sensoryValue); setactiveColor() }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick17} className="slider round"></div>
                                            {
                                                change17 &&
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
                                                    <div className="history-select-popup" style={{ width: "300px", height: "220px" }}>
                                                        <svg version="1.1" id="Layer_1" x="0px"
                                                            y="0px" viewBox="0 0 300 300">
                                                            <HtmlTooltip title="Mandibular area" placement="right" arrow >
                                                                <g onClick={() => setactiveColor("Mandibular area")}>

                                                                    <path className={`${activeColor === "Mandibular area" ? "sActive" : "st0"} `} d="M55.27,266.2c0.41-1.94,1.33-4.85,3.71-7.15c3.8-3.68,8.63-3.46,17.32-4.58c4.04-0.52,9.63-1.44,16.32-3.16
    		c8.08-1.55,14.71-3.41,19.56-4.95c8.38-2.66,15.17-4.83,22.93-9.62c6.46-3.99,10.52-7.92,14.47-11.74
    		c3.71-3.59,9.61-11.64,21.32-27.56c1.21-1.64,3.24-4.42,5.46-8.38c2.52-4.48,4.03-8.24,4.93-10.6c3.85-10.11,5.01-17.81,7.25-25.18
    		c1.68-5.53,4.43-13.57,8.92-23.12c-0.17-13.09,0.47-20.05,1.13-24.02c0.17-1.03,0.56-3.18,0.76-6.19c0.27-4.21-0.09-6.09-0.05-10.1
    		c0.05-4.21,0.5-6.97,0.71-8.77c1.06-9.3-0.98-24.49-4.91-50.4c0,0-0.6-4.55,0.03-8.37c0.37-2.26,0.7-2.38,0.52-2.88
    		c0,0-1.51-4.29-51.66,5.63c0,0-21.54,8.71-35.76,40.34l6.42,21.54c0,0,11.92,60.51,5.96,75.63c-1.73,4.39-4.17,8.15-4.17,8.15
    		c-2.01,3.31-3.85,5.63-5.51,7.72c-1.64,2.05-4.72,5.92-7.79,8.77c-1.59,1.47-6.15,5.45-17.28,9.43
    		c-8.01,2.86-14.84,4.09-24.38,5.36c-8.66,1.15-20.17,2.42-33.92,3.21c0,0-8.25,7.33,3.21,15.58c0,0,8.25,7.33,0.92,12.38
    		c0,0-10.08,17.88-0.46,29.34c0,0,7.33,7.54,18.33,5.83C51.46,267.6,53.36,266.9,55.27,266.2z" />

                                                                    <path className="st1" d="M137,236.42c3.25-0.21,11.95-1.19,20.28-7.66c7.93-6.16,11.08-13.83,12.17-16.94" />
                                                                    <path className="st2" d="M206.65,143.25" />
                                                                </g>
                                                            </HtmlTooltip>
                                                            <HtmlTooltip title="Cervical area" placement="right" arrow >
                                                                <g onClick={() => setactiveColor("Cervical area")}>
                                                                    <g>
                                                                        <g>
                                                                            <path className={`${activeColor === "Cervical area" ? "sActive" : "st3"} `} d="M284.38,290.75c-7.32-10.34-14.64-20.69-21.96-31.03c-3.16-5.42-6.63-12.62-9.11-21.47
    					c-4.27-15.2-3.73-28.39-2.68-36.77c7.57-22.34,15.14-44.68,22.71-67.02h-2.01c0.41-0.23,0.82-0.51,1.24-0.84
    					c3.26-2.53,4.62-6.39,7.34-14.1c5-14.18,4.84-26.37,4.67-33.88c-0.06-2.65-0.33-9.47-1.83-18.33
    					c-2.26-13.35-5.19-29.48-17.19-42.4c-0.79-0.85-3.98-4.22-8.88-7.78c-7.58-5.49-14.22-7.74-21.38-10.1
    					c-10.47-3.45-14.52-3-17.08-2.39c-2.43,0.58-4.31,1.49-5.54,2.18c-0.89,0.92-2.23,2.28-3.87,3.91
    					c-2.63,2.61-3.94,3.91-4.62,4.37c-3.79,2.62-5.89,1.55-7.75,3.92c-0.86,1.1-1.07,2.46-1.49,5.17c-0.56,3.63-0.41,6.71,0.09,8.91
    					c1.15,5.1,1.06,10.43,2.17,15.54c4.9,22.58,2.41,35.87,2.41,35.87c0.14,11.67-0.44,28.36-3.63,48.88
    					c-0.77,0.6-0.84,0.94-0.79,1.13c0,0,0,0-0.01,0c-1.67,4.32-4.07,10.77-6.64,18.73c-4.66,14.51-4.32,16.84-6.8,23.93
    					c-4.72,13.52-11.92,22.17-23.91,36.58c-9.85,11.83-14.77,17.75-19.78,21.11c-20.92,14.07-57.51,18.38-73.88,21.9
    					c-9.05,1.94-8.9,9.43-8.9,9.43l18.6,4.01c0,0,9.34,0.6,20.14,0.66c10.8,0.05,15.43,8.52,15.43,8.52l6.74,20.6H294.2
    					L284.38,290.75z M211.13,134.5c1.4-0.04,0.7,0,6.23,0C215.29,134.5,213.21,134.5,211.13,134.5z" />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </HtmlTooltip>
                                                            <HtmlTooltip title="Ophthalmic area" placement="top" arrow >
                                                                <g onClick={() => setactiveColor("Ophthalmic area")}>
                                                                    <path className={`${activeColor === "Ophthalmic area" ? "sActive" : "st6"} `} d="M209.62,10.01c-2.37,1.98-4.74,3.96-7.11,5.94c-2.29,1.15-4.58,2.29-6.87,3.44
    			c-2.76-0.28-5.52-0.57-8.28-0.86c-2.87,0.19-7.14,0.53-12.32,1.18c-4.93,0.62-7.9,1.17-12.94,1.97
    			c-4.09,0.65-9.91,1.52-17.06,2.41c-4.58,3.12-9.16,6.24-13.75,9.36c-4.24,5.02-8.48,10.03-12.72,15.05l-9.97,18.22l-9.62,22
    			c1.72,13.41-5.5,30.94-5.5,30.94c-1.52,2.7-3.05,5.4-4.57,8.1c-0.83,1.19-2.01,2.64-3.6,4.07c-1.74,1.57-3.44,2.65-4.8,3.37
    			c-1.24,0.64-2.66,1.28-4.23,1.86c-2.22,0.82-4.28,1.36-6.08,1.71c-3.25,0.86-5.93,1.26-7.8,1.46c-1.77,0.19-2.6,0.18-4.35,0.41
    			c-2.99,0.39-5.37,1.02-6.93,1.5c-3.22,0.89-7.05,2.26-11.13,4.42c-2.27,1.2-4.26,2.47-6,3.7L20.6,160.92
    			c-2.96,2.11-5.92,4.21-8.88,6.31c-1.41,0.23-2.81-0.41-3.55-1.62c-0.69-1.11-0.69-2.53,0-3.66c4.13-6.5,8.25-12.99,12.38-19.48
    			c2.25-3.08,4.51-6.32,6.76-9.7c1.23-1.85,2.41-3.68,3.55-5.49c0.62-1.07,2.12-4,1.83-7.97c-0.27-3.76-2-6.34-2.75-7.33
    			c-0.57-0.88-1.33-2.3-1.73-4.19c-0.53-2.49-0.16-4.55,0.13-5.66c2.25-3.75,4.5-7.77,6.7-12.04c4.08-7.92,7.37-15.51,10.03-22.57
    			c1.42-4.12,2.95-8.32,4.58-12.6c1.28-3.36,2.58-6.65,3.89-9.85c1.97-2.96,4.32-6.14,7.1-9.4c3.85-4.52,7.71-8.23,11.23-11.23
    			c7.4-4.51,13.98-8.34,19.48-11.46c5.12-2.9,8.77-4.89,14-6.57c4.26-1.37,7.95-2.03,10.52-2.37c4.35-0.69,8.71-1.37,13.06-2.06
    			c19.31-2.1,33.97-2.14,43.31-1.83c15.72,0.51,14.04,1.94,24.75,1.6c7.59-0.23,14.06-1.12,15.36,1.6
    			C213.23,5.18,211.41,7.9,209.62,10.01z" />


                                                                </g>
                                                            </HtmlTooltip>
                                                            <HtmlTooltip title="Maxillary area" placement="left" arrow >
                                                                <g onClick={() => setactiveColor("Maxillary area")}>
                                                                    <path className={`${activeColor === "Maxillary area" ? "sActive" : "st8"} `} d="M27.77,206.07c0,0,75.63,1.24,87.94-35.91c1.91-2.56,4.44-6.63,6-12.11c2.46-8.7,1.08-16.1,0.16-19.65
    			c-0.97-12.21-2.57-25.47-5.08-39.58c-1.97-11.09-4.28-21.47-6.77-31.09c-0.53-0.46-1.18-0.89-1.64-0.69
    			c-0.54,0.24-0.56,1.26-0.58,1.51c-0.18,3.4-6.22,10.75-8.24,18.84c-1.03,4.12,0.08,4.02-0.56,10.3
    			c-0.76,7.51-2.93,13.43-4.67,17.3c-0.92,4.26-3.59,13.45-11.6,18.9c-4.85,3.3-10.62,4.52-15.33,5.51c-4.27,0.9-7.9,1.2-10.42,1.31
    			c-3.95,0.81-8.6,2.09-13.63,4.18c-7.55,3.14-13.39,7.04-17.55,10.32c-3.09,2.98-6.19,5.96-9.28,8.94
    			c-0.49,0.08-3.88,0.67-4.81,3.09c-0.91,2.35,1.09,4.93,2.06,6.19c3.85,4.97,8.36,3.95,10.28,8.14c0.71,1.56,0.64,2.99,0.49,5.85
    			c-0.25,4.76-2.07,9.51-2.07,9.51l0.73,5.64L27.77,206.07z" />
                                                                </g>
                                                            </HtmlTooltip>

                                                        </svg>

                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                </div>
                                <div className="list-bg-white mt-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Motor</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange18(!change18); setmotor("") }} type="checkbox" id="togBtn" />
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
                                                    <div className="history-select-popup">

                                                        <div className="form-check">
                                                            <input className="form-check-input" value="Clench the teeth- masseter weakness" type="radio" name="cough6" onChange={(e) => setmotor(e.target.value)} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                Clench the teeth- masseter weakness
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{motor}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mt-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Force to shut open mouth</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange19(!change19); setFace("") }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick19} className="slider round"></div>
                                            {
                                                change19 &&
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
                                                    <div className="history-select-popup">
                                                        <div className="form-check">
                                                            <input className="form-check-input" value="Normal" type="radio" name="cough6" onChange={(e) => setFace(e.target.value)} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                Normal
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" value="Deviates- Right" type="radio" name="cough6" onChange={(e) => setFace(e.target.value)} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                Deviates - right
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" value="Deviates- Left" type="radio" name="cough6" onChange={(e) => setFace(e.target.value)} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                Deviates - left
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{face}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mt-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Jaw Jerk</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange20(!change20); setJaw("") }} type="checkbox" id="togBtn" />
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
                                                            jawjerkArray.length > 0 &&
                                                            jawjerkArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.jawjerk_name} type="radio" name="cough6" onChange={(e) => setJaw(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.jawjerk_name}
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
                                        <p>{jaw}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="exam-bg-white p-1">
                                <h6>The seventh - facial nerve</h6>
                                <div className='d-flex'>
                                    <input className='custom-radio' value="Left" onClick={(e) => setSeventhNerve(e.target.value)} type="radio" name="nerve5" />
                                    <label> Left</label>
                                    <input className='custom-radio' value="Right" onClick={(e) => setSeventhNerve(e.target.value)} type="radio" name="nerve5" />
                                    <label> Right</label>
                                    <input className='custom-radio' value="Both" onClick={(e) => setSeventhNerve(e.target.value)} type="radio" name="nerve5" />
                                    <label> Both</label>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Drooping corner of mouth</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange21(!change21); setCorner("") }} type="checkbox" id="togBtn" />
                                            <div onClick={handleClick21} className="slider round"></div>
                                            {
                                                change21 &&
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
                                                    <div className="history-select-popup">
                                                        <div className="form-check">
                                                            <input className="form-check-input" value="Left" type="radio" name="cough7" onChange={(e) => setCorner(e.target.value)} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                Left
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" value="Right" type="radio" name="cough7" onChange={(e) => setCorner(e.target.value)} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                Right
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }
                                        </label>
                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{corner}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Looking up</p>
                                        <label className="switch me-1">
                                            <input onChange={() => { setChange22(!change22); setLookingUp("") }} type="checkbox" id="togBtn" />
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
                                                            lookingupArray.length > 0 &&
                                                            lookingupArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input className="form-check-input" value={item.lookingup_name} type="radio" name="cough6" onChange={(e) => setLookingUp(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.lookingup_name}
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
                                        <p>{lookingUp}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>On shutting eye(on lesion side eye move upward and incomplete closure- LMNL)</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange23(!change23); setShuttingEye("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick23} className="slider round"></div>
                                                {
                                                    change23 &&
                                                    <Popover
                                                        id={id23}
                                                        open={open23}
                                                        anchorEl={anchorEl23}
                                                        onClose={handleClose23}
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
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Present" type="radio" name="cough7" onChange={(e) => setShuttingEye(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Present
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Absent" type="radio" name="cough7" onChange={(e) => setShuttingEye(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Absent
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Popover>
                                                }
                                            </label>
                                        </div>

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{shuttingEye}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Rash - herpes zoster</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange66(!change66); setRashHerpesZoster("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick66} className="slider round"></div>
                                                {
                                                    change66 &&
                                                    <Popover
                                                        id={id66}
                                                        open={open66}
                                                        anchorEl={anchorEl66}
                                                        onClose={handleClose66}
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
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Present" type="radio" name="cough7" onChange={(e) => setRashHerpesZoster(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Present
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Absent" type="radio" name="cough7" onChange={(e) => setRashHerpesZoster(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Absent
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Popover>
                                                }
                                            </label>
                                        </div>

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{rashHerpesZoster}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="exam-bg-white p-1">
                                <h6>The eleventh - accessory nerve</h6>
                                <div className='d-flex'>
                                    <input className='custom-radio' value="Left" onClick={(e) => setEleventhNerve(e.target.value)} type="radio" name="nerve6" />
                                    <label> Left</label>
                                    <input className='custom-radio' value="Right" onClick={(e) => setEleventhNerve(e.target.value)} type="radio" name="nerve6" />
                                    <label> Right</label>
                                    <input className='custom-radio' value="Both" onClick={(e) => setEleventhNerve(e.target.value)} type="radio" name="nerve6" />
                                    <label> Both</label>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Shrug the shoulder - trapezius</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange24(!change24); setShoulder("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick24} className="slider round"></div>
                                                {
                                                    change24 &&
                                                    <Popover
                                                        id={id24}
                                                        open={open24}
                                                        anchorEl={anchorEl24}
                                                        onClose={handleClose24}
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
                                                                shrugshoulderArray.length > 0 &&
                                                                shrugshoulderArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check">
                                                                            <input className="form-check-input" value={item.shrugshoulder_name} type="radio" name="cough6" onChange={(e) => setShoulder(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.shrugshoulder_name}
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

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{shoulder}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Neck movement-on resistance</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange25(!change25); setNeckMovement("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick25} className="slider round"></div>
                                                {
                                                    change25 &&
                                                    <Popover
                                                        id={id25}
                                                        open={open25}
                                                        anchorEl={anchorEl25}
                                                        onClose={handleClose25}
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
                                                                neckmovementArray.length > 0 &&
                                                                neckmovementArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check">
                                                                            <input className="form-check-input" value={item.neckmovement_name} type="radio" name="cough6" onChange={(e) => setNeckMovement(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.neckmovement_name}
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

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{neckMovement}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-4">
                            <div className="exam-bg-white p-1">
                                <h6>The eight - acoustic nerve</h6>
                                <div className='d-flex'>
                                    <input className='custom-radio' value="Left" onClick={(e) => setEightNerve(e.target.value)} type="radio" name="nerve72" />
                                    <label> Left</label>
                                    <input className='custom-radio' value="Right" onClick={(e) => setEightNerve(e.target.value)} type="radio" name="nerve72" />
                                    <label> Right</label>
                                    <input className='custom-radio' value="Both" onClick={(e) => setEightNerve(e.target.value)} type="radio" name="nerve72" />
                                    <label> Both</label>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Whisper test</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange26(!change26); setWhisper("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick26} className="slider round"></div>
                                                {
                                                    change26 &&
                                                    <Popover
                                                        id={id26}
                                                        open={open26}
                                                        anchorEl={anchorEl26}
                                                        onClose={handleClose26}
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
                                                                whispertestArray.length > 0 &&
                                                                whispertestArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check">
                                                                            <input className="form-check-input" value={item.whispertest_name} type="radio" name="cough6" onChange={(e) => setWhisper(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.whispertest_name}
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

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{whisper}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Weber’s test</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange27(!change27); setWever("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick27} className="slider round"></div>
                                                {
                                                    change27 &&
                                                    <Popover
                                                        id={id27}
                                                        open={open27}
                                                        anchorEl={anchorEl27}
                                                        onClose={handleClose27}
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
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Center" type="radio" name="cough8" onChange={(e) => setWever(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Center
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Lateralize to left" type="radio" name="cough8" onChange={(e) => setWever(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Lateralize to left
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Lateralize to right" type="radio" name="cough8" onChange={(e) => setWever(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Lateralize to right
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Popover>
                                                }
                                            </label>
                                        </div>

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{wever}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Rinne’s test</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange28(!change28); setRinner("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick28} className="slider round"></div>
                                                {
                                                    change28 &&
                                                    <Popover
                                                        id={id28}
                                                        open={open28}
                                                        anchorEl={anchorEl28}
                                                        onClose={handleClose28}
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
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Positive" type="radio" name="cough8" onChange={(e) => setRinner(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Positive
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Negative" type="radio" name="cough8" onChange={(e) => setRinner(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Negative
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Popover>
                                                }
                                            </label>
                                        </div>

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{rinner}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Hallpike manoeuvre</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange29(!change29); setHallPike("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick29} className="slider round"></div>
                                                {
                                                    change29 &&
                                                    <Popover
                                                        id={id29}
                                                        open={open29}
                                                        anchorEl={anchorEl29}
                                                        onClose={handleClose29}
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
                                                                hallpikeArray.length > 0 &&
                                                                hallpikeArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check">
                                                                            <input className="form-check-input" value={item.hallpike_name} type="radio" name="cough6" onChange={(e) => setHallPike(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.hallpike_name}
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

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{hallPike}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="exam-bg-white p-1">
                                <h6>The ninth - glossophary & tenth - vagus nerve</h6>
                                <div className='d-flex'>
                                    <input className='custom-radio' value="Left" onClick={(e) => setNinthNerve(e.target.value)} type="radio" name="nerve7" />
                                    <label> Left</label>
                                    <input className='custom-radio' value="Right" onClick={(e) => setNinthNerve(e.target.value)} type="radio" name="nerve7" />
                                    <label> Right</label>
                                    <input className='custom-radio' value="Both" onClick={(e) => setNinthNerve(e.target.value)} type="radio" name="nerve7" />
                                    <label> Both</label>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Uvula</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange30(!change30); setUvula("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick30} className="slider round"></div>
                                                {
                                                    change30 &&
                                                    <Popover
                                                        id={id30}
                                                        open={open30}
                                                        anchorEl={anchorEl30}
                                                        onClose={handleClose30}
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
                                                                uvulaArray.length > 0 &&
                                                                uvulaArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check">
                                                                            <input className="form-check-input" value={item.uvula_name} type="radio" name="cough6" onChange={(e) => setUvula(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.uvula_name}
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

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{uvula}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Gag reflex (Sensory -XI, Motor - X)</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange67(!change67); setGagReflex("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick67} className="slider round"></div>
                                                {
                                                    change67 &&
                                                    <Popover
                                                        id={id67}
                                                        open={open67}
                                                        anchorEl={anchorEl67}
                                                        onClose={handleClose67}
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

                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Present" type="radio" name="cough6" onChange={(e) => setGagReflex(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Present
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Absent" type="radio" name="cough6" onChange={(e) => setGagReflex(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Absent
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Popover>
                                                }
                                            </label>
                                        </div>

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{gagReflex}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Posterior third of tongue sensation (XI)</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange31(!change31); setPosterior("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick31} className="slider round"></div>
                                                {
                                                    change31 &&
                                                    <Popover
                                                        id={id31}
                                                        open={open31}
                                                        anchorEl={anchorEl31}
                                                        onClose={handleClose31}
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

                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Present" type="radio" name="cough8" onChange={(e) => setPosterior(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Present
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Absent" type="radio" name="cough8" onChange={(e) => setPosterior(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Absent
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Popover>
                                                }
                                            </label>
                                        </div>

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{posterior}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="exam-bg-white p-1">
                                <h6>The twelfth - hypoglossal nerve</h6>
                                <div className='d-flex'>
                                    <input className='custom-radio' value="Left" onClick={(e) => setTwelfthNerve(e.target.value)} type="radio" name="nerve9" />
                                    <label> Left</label>
                                    <input className='custom-radio' value="Right" onClick={(e) => setTwelfthNerve(e.target.value)} type="radio" name="nerve9" />
                                    <label> Right</label>
                                    <input className='custom-radio' value="Both" onClick={(e) => setTwelfthNerve(e.target.value)} type="radio" name="nerve9" />
                                    <label> Both</label>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Tongue</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange32(!change32); setTongue("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick32} className="slider round"></div>
                                                {
                                                    change32 &&
                                                    <Popover
                                                        id={id32}
                                                        open={open32}
                                                        anchorEl={anchorEl32}
                                                        onClose={handleClose32}
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
                                                                tongueArray.length > 0 &&
                                                                tongueArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check">
                                                                            <input className="form-check-input" value={item.tongue_name} type="radio" name="cough6" onChange={(e) => setTongue(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.tongue_name}
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

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{tongue}</p>
                                    </div>
                                </div>
                                <div className="list-bg-white mb-1">
                                    <div className='d-flex justify-content-between'>
                                        <p>Fasciculation/Deviation</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input onChange={() => { setChange33(!change33); setDiviation("") }} type="checkbox" id="togBtn" />
                                                <div onClick={handleClick33} className="slider round"></div>
                                                {
                                                    change33 &&
                                                    <Popover
                                                        id={id33}
                                                        open={open33}
                                                        anchorEl={anchorEl33}
                                                        onClose={handleClose33}
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
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Tremor" type="radio" name="cough8" onChange={(e) => setDiviation(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Tremor
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Small immobile tongue" type="radio" name="cough8" onChange={(e) => setDiviation(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Small immobile tongue
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Deviated- Left" type="radio" name="cough8" onChange={(e) => setDiviation(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Deviated - left
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" value="Deviated- Right" type="radio" name="cough8" onChange={(e) => setDiviation(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Deviated - right
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Popover>
                                                }
                                            </label>
                                        </div>

                                    </div>
                                    <div className='history-popup-value'>
                                        <p>{diviation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cns;