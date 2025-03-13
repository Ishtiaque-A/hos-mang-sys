import { Popover } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import clinic8 from "../../../../Images/neurology.png";
import uperLimbImg from "../../../../Images/uperLimb.jpg";
import lowerLimbImg from "../../../../Images/lowerLimb_2.png";


const Neurological = (props) => {
    const [historyShowAll, setHistoryShowAll] = useState(false);
    const [historyValue, setHistoryValue] = useState([]);
    const [intermittent, setIntermittent] = useState();
    const [continuous, setContinuous] = useState();
    const [speechValue, setSpeechValue] = useState([]);
    const [parietal, setParietal] = useState([]);
    const [occipital, setOccipital] = useState([]);
    const [frontal, setFrontal] = useState([]);
    const [temporal, setTemporal] = useState([]);

    const [history, setHistory] = useState([]);
    const [historySort, setHistorySort] = useState([]);
    const [intermittentArray, setIntermittentArray] = useState([
        { name: "No hearing loss (BPPV)", id: 1 },
        { name: "With hearing loss and tinnitus (Meniere’s disease)", id: 2 },
    ]);
    const [continuousArray, setContinuousArray] = useState([]);
    const [speechArray, setSpeechArray] = useState([]);
    const [parietalAray, setParietalArray] = useState([]);
    const [occipitalAray, setOccipitalArray] = useState([]);
    const [frontallAray, setFrontallArray] = useState([]);
    const [temporalAray, setTemporalAray] = useState([]);
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
        axios.get(`/commonHistory-all/neurological`, { signal: controller.signal }).then(res => {
            setHistory(res.data.commonHistory)
            setHistorySort(res.data.commonHistory)
        });
        axios.get(`/parietal-lobe`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setParietalArray(res.data.ParietalLobe);
            }
        });
        axios.get(`/occipital-lobe`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setOccipitalArray(res.data.OccipitalLobe);
            }

        });
        axios.get(`/frontal-lobe`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setFrontallArray(res.data.FrontalLobe);
            }

        });
        axios.get(`/temporal-lobe`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setTemporalAray(res.data.TemporalLobe);
            }

        });
        axios.get(`/continuous`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setContinuousArray(res.data.Continuous);
            }

        });

        axios.get(`/speech-nurologies`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setSpeechArray(res.data.SpeechNurologies);
            }

        });
        // cns part 2
        axios.get(`/upper-limb`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setUpperLimb(res.data.UpperLimb);
            }

        });

        axios.get(`/power`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setpowerArray(res.data.Power);
            }

        });

        axios.get(`/jerk-c1-c8`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setjerkArray(res.data.JerkC1C8);
            }

        });

        axios.get(`/finger-nose-test`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setFingerNoseTestArray(res.data.FingerNoseTest);
            }

        });

        axios.get(`/left-value`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setleftArray(res.data.LeftValue);
            }

        });

        axios.get(`/right-value`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setrightArray(res.data.RightValue);
            }

        });

        axios.get(`/picture-upper-limb-dermatomes`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setpictureUpperLimbArray(res.data.PULimbDermatomes);
            }

        });
        axios.get(`/the-radial-nerve`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setTheRadialNerveArray(res.data.TheRadialNerve);
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

    const [change8, setChange8] = useState(false);
    const [anchorEl8, setAnchorEl8] = useState(null);
    const open8 = Boolean(anchorEl8);
    const id8 = open8 ? 'simple-popover' : undefined;

    const [changePOW8, setChangePOW8] = useState(false);
    const [anchorElPOW8, setAnchorElPOW8] = useState(null);
    const openPOW8 = Boolean(anchorElPOW8);
    const idPOW8 = openPOW8 ? 'simple-popover' : undefined;

    const [saveLoading, setsaveLoading] = useState(false)

    const saveNurologicalData = () => {

        setsaveLoading(true)
        const nuroData = {
            patient_id: props.patient_id,
            // cns
            intermittent: intermittent,
            continuous: continuous,
            historyValue: historyValue.toString(),
            speechValue: speechValue.toString(),
            parietal: parietal.toString(),
            occipital: occipital.toString(),
            frontal: frontal.toString(),
            temporal: temporal.toString(),

            //upper Limp
            upperLimbValue: upperLimbValue.toString(),
            power: power.toString(),
            pictureUperLimbValue: pictureUperLimbValue.toString(),
            bicepsRight,
            tricepsRight,
            jeskRight,
            fingerRight,
            biceps_jesk: biceps,
            triceps_jesk: triceps,
            brachioradialis_jesk: jesk,
            finger: finger,
            finger_nose_test: fingerTest,
            dysdiadochokinesis: dysdiadochokinesis,
            temparature: temparature,
            vibration: vibration,
            proprioception: proprioception,
            Pin_Prick_Testing: pin,
            Light_Touch_Testing: light1,
            Picture_upper_limb_dermatomes: peripheral,
            Picture_upper_limb_dermatomes_details: peripheralUpper,
            The_Radial_Nerve: redial,
            The_Ulnar_Nerve: ulnar,
            The_Median_Nerve: median,

            shoulder_left1: shoulder1,
            shoulder_left2: shoulder2,
            elbow_left1: elbow1,
            elbow_left2: elbow2,
            wrist_left1: wrist1,
            wrist_left2: wrist2,

            fingerSide: fingerSide.toString(),
            fingerNth: fingerNth.toString(),
            fingerSide1: fingerSide1.toString(),
            fingerNth1: fingerNth1.toString(),
            fingerSide2: fingerSide2.toString(),
            fingerNth2: fingerNth2.toString(),


            fingerFlexion_left: fingerFlexion,
            fingerExtension_left: fingerExtension,
            fingerAbduction_left: fingerAbduction,
            fingerAdduction_left: fingerAdduction,


            shoulder_right1: shoulder_right1,
            shoulder_right2: shoulder_right2,
            elbow_right1: elbow_right1,
            elbow_right2: elbow_right2,
            wrist_right1: wrist_right1,
            wrist_right2: wrist_right2,

            fingerFlexion_right: fingerFlexion1,
            fingerExtension_right: fingerExtension1,
            fingerAbduction_right: fingerAbduction1,
            fingerAdduction_right: fingerAdduction1,



            shoulder_reflexes1: shoulder_reflexes1,
            shoulder_reflexes2: shoulder_reflexes2,
            elbow_reflexes1: elbow_reflexes1,
            elbow_reflexes2: elbow_reflexes2,
            wrist_reflexes1: wrist_reflexes1,
            wrist_reflexes2: wrist_reflexes2,

            fingerFlexion_reflexes: fingerFlexion2,
            fingerExtension_reflexes: fingerExtension2,
            fingerAbduction_reflexes: fingerAbduction2,
            fingerAdduction_reflexes: fingerAdduction2,

            lesion,


            //Lower Limb

            //new 
            lowerLimbValue: lowerLimbValue.toString(),
            pictureLowerLimbValue: pictureLowerLimbValue.toString(),
            lowerLimbpower: lowerLimbpower.toString(),

            lowerlimbTemp,

            hip1,
            hip2,
            knee1,
            knee2,
            ankle1,
            ankle2,
            fingerFlexionLower,
            fingerExtensionLower,
            fingerAbductionLower,
            fingerAdductionLower,
            fingerNthLower,
            fingerSideLower,
            hipRight1,
            hipRight2,
            kneeRight1,
            kneeRight2,
            ankleRight1,
            ankleRight2,
            fingerFlexionLowerRight,
            fingerExtensionLowerRight,
            fingerAbductionLowerRight,
            fingerAdductionLowerRight,
            fingerNthLowerRight,
            fingerSideLowerRight,
            hipReflexes1,
            hipReflexes2,
            kneeReflexes1,
            kneeReflexes2,
            ankleReflexes1,
            ankleReflexes2,
            fingerFlexionLowerReflexes,
            fingerExtensionLowerReflexes,
            fingerAbductionLowerReflexes,
            fingerAdductionLowerReflexes,
            fingerNthLowerReflexes,
            fingerSideLowerReflexes,

            vibrationLowerLimb,
            proprioceptionLowerLimb,
            pinLowerLimb,
            lightLowerLimb,
            peripheralLowerLimb,
            peripheralLowerLimbValuve,
            redialLowerLimb,
            ulnarLowerLimb,
            medianLowerLimb,
            lesionLowerLimb,

            //2nd table
            lowerKneeJerk,
            lowerKneeJerkRight,
            lowerAnkleJerk,
            lowerAnkleJerkRight,
            lowerPlanterReflex,
            lowerPlanterReflexRight,

            lowerHeelShin,
            lowerToeFinger,
            lowerFootTapping,
            lowerFemoralNerve,
            lowerSciaticNerve,
            lowerCommonNerve,
            lowerRombergTest,
            lowerHeelToeWaking,

        }
        axios.post('/save-nurological-examination', nuroData).then(res => {
            const note = `
<p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Neurological:</strong></span><br>
${res.data.nurological.historyValue === null ? `` : `
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>History:</strong></span><br>
    ${res.data.nurological.historyValue.replaceAll(",", " . ")} <br>
`}


${res.data.nurological.intermittent === null && res.data.nurological.continuous === null ? `` : `
            Vertigo: <br>
`}

${res.data.nurological.intermittent === null ? `` : `
            Intermittent: ${res.data.nurological.intermittent}<br>
`}
${res.data.nurological.continuous === null ? `` : `
            Continuous: ${res.data.nurological.continuous}<br>
`}

${res.data.nurological.speechValue === null &&
                    res.data.nurological.parietal === null &&
                    res.data.nurological.occipital === null &&
                    res.data.nurological.frontal === null &&
                    res.data.nurological.temporal === null ? `` : `
             <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Central Nervous System:</strong></span><br>
                `}

                ${res.data.nurological.speechValue === null ? `` : `
                            Speech : ${res.data.nurological.speechValue.replaceAll(",", " . ")}<br>
                `}

${res.data.nurological.parietal === null &&
                    res.data.nurological.occipital === null &&
                    res.data.nurological.frontal === null &&
                    res.data.nurological.temporal === null ? `` : `
<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong> Higher centre Dysfunction:</strong></span><br>

`}

  ${res.data.nurological.parietal === null ? `` : `
                            Parietal Lobe: ${res.data.nurological.parietal.replaceAll(",", " . ")}<br>
                `}
  ${res.data.nurological.occipital === null ? `` : `
                            Occipital Lobe: ${res.data.nurological.occipital.replaceAll(",", " . ")}<br>
                `}
  ${res.data.nurological.frontal === null ? `` : `
                            Frontal Lobe: ${res.data.nurological.frontal.replaceAll(",", " . ")}<br>
                `}
  ${res.data.nurological.temporal === null ? `` : `
                            Temporal Lobe: ${res.data.nurological.temporal.replaceAll(",", " . ")}<br>
                `}


${res.data.upperLimp.upperLimbValue === null &&
                    res.data.upperLimp.power === null &&

                    res.data.upperLimp.shoulder_left1 === null &&
                    res.data.upperLimp.shoulder_left2 === null &&
                    res.data.upperLimp.shoulder_right1 === null &&
                    res.data.upperLimp.shoulder_right2 === null &&
                    res.data.upperLimp.shoulder_reflexes1 === null &&
                    res.data.upperLimp.shoulder_reflexes2 === null &&

                    res.data.upperLimp.elbow_left1 === null &&
                    res.data.upperLimp.elbow_left2 === null &&
                    res.data.upperLimp.elbow_right1 === null &&
                    res.data.upperLimp.elbow_right2 === null &&
                    res.data.upperLimp.elbow_reflexes1 === null &&
                    res.data.upperLimp.elbow_reflexes2 === null &&

                    res.data.upperLimp.wrist_left1 === null &&
                    res.data.upperLimp.wrist_left2 === null &&
                    res.data.upperLimp.wrist_right1 === null &&
                    res.data.upperLimp.wrist_right2 === null &&
                    res.data.upperLimp.wrist_reflexes1 === null &&
                    res.data.upperLimp.wrist_reflexes2 === null &&


                    res.data.upperLimp.fingerFlexion_left === null &&
                    res.data.upperLimp.fingerExtension_left === null &&
                    res.data.upperLimp.fingerAbduction_left === null &&
                    res.data.upperLimp.fingerAdduction_left === null &&


                    res.data.upperLimp.fingerFlexion_right === null &&
                    res.data.upperLimp.fingerExtension_right === null &&
                    res.data.upperLimp.fingerAbduction_right === null &&
                    res.data.upperLimp.fingerAdduction_right === null &&


                    res.data.upperLimp.fingerFlexion_reflexes === null &&
                    res.data.upperLimp.fingerExtension_reflexes === null &&
                    res.data.upperLimp.fingerAbduction_reflexes === null &&
                    res.data.upperLimp.fingerAdduction_reflexes === null &&

                    res.data.upperLimp.bicepsRight === null &&
                    res.data.upperLimp.biceps_jesk === null &&
                    res.data.upperLimp.tricepsRight === null &&
                    res.data.upperLimp.triceps_jesk === null &&
                    res.data.upperLimp.jeskRight === null &&
                    res.data.upperLimp.brachioradialis_jesk === null &&
                    res.data.upperLimp.fingerRight === null &&
                    res.data.upperLimp.finger === null &&

                    res.data.upperLimp.finger_nose_test === null &&
                    res.data.upperLimp.dysdiadochokinesis === null &&
                    res.data.upperLimp.temparature === null &&
                    res.data.upperLimp.vibration === null &&
                    res.data.upperLimp.proprioception === null &&
                    res.data.upperLimp.Pin_Prick_Testing === null &&
                    res.data.upperLimp.Light_Touch_Testing === null &&
                    res.data.upperLimp.Picture_upper_limb_dermatomes === null &&
                    res.data.upperLimp.The_Radial_Nerve === null &&
                    res.data.upperLimp.The_Ulnar_Nerve === null &&
                    res.data.upperLimp.The_Median_Nerve === null &&
                    res.data.upperLimp.lesion === null

                    ? `` : `
<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong> Upper Limb:</strong></span><br>

`}


${res.data.upperLimp.upperLimbValue === null ? `` : `
                         ${res.data.upperLimp.upperLimbValue.replaceAll(",", " . ")}<br>
`}

${res.data.upperLimp.power === null &&
                    res.data.upperLimp.shoulder_left1 === null &&
                    res.data.upperLimp.shoulder_left2 === null &&
                    res.data.upperLimp.shoulder_right1 === null &&
                    res.data.upperLimp.shoulder_right2 === null &&
                    res.data.upperLimp.shoulder_reflexes1 === null &&
                    res.data.upperLimp.shoulder_reflexes2 === null &&

                    res.data.upperLimp.elbow_left1 === null &&
                    res.data.upperLimp.elbow_left2 === null &&
                    res.data.upperLimp.elbow_right1 === null &&
                    res.data.upperLimp.elbow_right2 === null &&
                    res.data.upperLimp.elbow_reflexes1 === null &&
                    res.data.upperLimp.elbow_reflexes2 === null &&

                    res.data.upperLimp.wrist_left1 === null &&
                    res.data.upperLimp.wrist_left2 === null &&
                    res.data.upperLimp.wrist_right1 === null &&
                    res.data.upperLimp.wrist_right2 === null &&
                    res.data.upperLimp.wrist_reflexes1 === null &&
                    res.data.upperLimp.wrist_reflexes2 === null &&


                    res.data.upperLimp.fingerFlexion_left === null &&
                    res.data.upperLimp.fingerExtension_left === null &&
                    res.data.upperLimp.fingerAbduction_left === null &&
                    res.data.upperLimp.fingerAdduction_left === null &&


                    res.data.upperLimp.fingerFlexion_right === null &&
                    res.data.upperLimp.fingerExtension_right === null &&
                    res.data.upperLimp.fingerAbduction_right === null &&
                    res.data.upperLimp.fingerAdduction_right === null &&


                    res.data.upperLimp.fingerFlexion_reflexes === null &&
                    res.data.upperLimp.fingerExtension_reflexes === null &&
                    res.data.upperLimp.fingerAbduction_reflexes === null &&
                    res.data.upperLimp.fingerAdduction_reflexes === null ? `` : `
<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong> Power:</strong></span><br>
`}

${res.data.upperLimp.power === null ? `` : `
                        Power : ${res.data.upperLimp.power.replaceAll(",", " . ")}<br>
`}

${res.data.upperLimp.shoulder_left1 === null &&
                    res.data.upperLimp.shoulder_left2 === null &&
                    res.data.upperLimp.shoulder_right1 === null &&
                    res.data.upperLimp.shoulder_right2 === null &&
                    res.data.upperLimp.shoulder_reflexes1 === null &&
                    res.data.upperLimp.shoulder_reflexes2 === null &&

                    res.data.upperLimp.elbow_left1 === null &&
                    res.data.upperLimp.elbow_left2 === null &&
                    res.data.upperLimp.elbow_right1 === null &&
                    res.data.upperLimp.elbow_right2 === null &&
                    res.data.upperLimp.elbow_reflexes1 === null &&
                    res.data.upperLimp.elbow_reflexes2 === null &&

                    res.data.upperLimp.wrist_left1 === null &&
                    res.data.upperLimp.wrist_left2 === null &&
                    res.data.upperLimp.wrist_right1 === null &&
                    res.data.upperLimp.wrist_right2 === null &&
                    res.data.upperLimp.wrist_reflexes1 === null &&
                    res.data.upperLimp.wrist_reflexes2 === null &&


                    res.data.upperLimp.fingerFlexion_left === null &&
                    res.data.upperLimp.fingerExtension_left === null &&
                    res.data.upperLimp.fingerAbduction_left === null &&
                    res.data.upperLimp.fingerAdduction_left === null &&


                    res.data.upperLimp.fingerFlexion_right === null &&
                    res.data.upperLimp.fingerExtension_right === null &&
                    res.data.upperLimp.fingerAbduction_right === null &&
                    res.data.upperLimp.fingerAdduction_right === null &&


                    res.data.upperLimp.fingerFlexion_reflexes === null &&
                    res.data.upperLimp.fingerExtension_reflexes === null &&
                    res.data.upperLimp.fingerAbduction_reflexes === null &&
                    res.data.upperLimp.fingerAdduction_reflexes === null
                    ? `` : `


<table style="border-collapse: collapse; width: 99.3661%; margin-left: 6.18067%;">
    <tbody>
        <tr>
            <td style="width: 41.3629%;">Right</td>
            <td style="width: 41.3629%;">Left</td>
            <td style="width: 16.9572%;">Reflexes</td>
        </tr>
    </tbody>
</table>

<table style="border-collapse:collapse;width: 100%;">
    <thead>
        <tr>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">Flexion </td>
            <td style="width: 5%;">Extension </td>
            <td style="width: 5%;">Abduction </td>
            <td style="width: 5%;  border-right: 1px solid;">Adduction </td>

            <td style="width: 5%;">Flexion </td>
            <td style="width: 5%;">Extension </td>
            <td style="width: 5%;">Abduction </td>
            <td style="width: 5%;  border-right: 1px solid;">Adduction </td>

            <td style="width: 5%;">Flexion </td>
            <td style="width: 5%;">Extension </td>
            <td style="width: 5%;">Abduction </td>
            <td style="width: 5%;">Adduction </td>
        </tr>
    </thead>
    <tbody>
        ${res.data.upperLimp.shoulder_left1 === null &&
                        res.data.upperLimp.shoulder_left2 === null &&
                        res.data.upperLimp.shoulder_right1 === null &&
                        res.data.upperLimp.shoulder_right2 === null &&
                        res.data.upperLimp.shoulder_reflexes1 === null &&
                        res.data.upperLimp.shoulder_reflexes2 === null ? `` : `
        <tr>
            <td style="width: 5%;">Shoulder</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.upperLimp.shoulder_left1 === null ? `<br>` : res.data.upperLimp.shoulder_left1}</td>
            <td style="width: 5%;">${res.data.upperLimp.shoulder_left2 === null ? `<br>` : res.data.upperLimp.shoulder_left2}</td>
           
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.upperLimp.shoulder_right1 === null ? `<br>` : res.data.upperLimp.shoulder_right1}</td>
            <td style="width: 5%;">${res.data.upperLimp.shoulder_right2 === null ? `<br>` : res.data.upperLimp.shoulder_right2}</td>
           
            
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.upperLimp.shoulder_reflexes1 === null ? `<br>` : res.data.upperLimp.shoulder_reflexes1}</td>
            <td style="width: 5%;">${res.data.upperLimp.shoulder_reflexes2 === null ? `<br>` : res.data.upperLimp.shoulder_reflexes2}</td>
        </tr>
`}
      
${res.data.upperLimp.elbow_left1 === null &&
                        res.data.upperLimp.elbow_left2 === null &&
                        res.data.upperLimp.elbow_right1 === null &&
                        res.data.upperLimp.elbow_right2 === null &&
                        res.data.upperLimp.elbow_reflexes1 === null &&
                        res.data.upperLimp.elbow_reflexes2 === null ? `` : `
        <tr>
            <td style="width: 5%;">Elbow</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.upperLimp.elbow_left1 === null ? `<br>` : res.data.upperLimp.elbow_left1}</td>
            <td style="width: 5%;">${res.data.upperLimp.elbow_left2 === null ? `<br>` : res.data.upperLimp.elbow_left2}</td>
           
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.upperLimp.elbow_right1 === null ? `<br>` : res.data.upperLimp.elbow_right1}</td>
            <td style="width: 5%;">${res.data.upperLimp.elbow_right2 === null ? `<br>` : res.data.upperLimp.elbow_right2}</td>
           
            
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.upperLimp.elbow_reflexes1 === null ? `<br>` : res.data.upperLimp.elbow_reflexes1}</td>
            <td style="width: 5%;">${res.data.upperLimp.elbow_reflexes2 === null ? `<br>` : res.data.upperLimp.elbow_reflexes2}</td>
        </tr>
`}

${res.data.upperLimp.wrist_left1 === null &&
                        res.data.upperLimp.wrist_left2 === null &&
                        res.data.upperLimp.wrist_right1 === null &&
                        res.data.upperLimp.wrist_right2 === null &&
                        res.data.upperLimp.wrist_reflexes1 === null &&
                        res.data.upperLimp.wrist_reflexes2 === null ? `` : `
        <tr>
            <td style="width: 5%;">Wrist</td>
         
            <td style="width: 5%;">${res.data.upperLimp.wrist_left1 === null ? `<br>` : res.data.upperLimp.wrist_left1}</td>
            <td style="width: 5%;">${res.data.upperLimp.wrist_left2 === null ? `<br>` : res.data.upperLimp.wrist_left2}</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>

            <td style="width: 5%;">${res.data.upperLimp.wrist_right1 === null ? `<br>` : res.data.upperLimp.wrist_right1}</td>
            <td style="width: 5%;">${res.data.upperLimp.wrist_right2 === null ? `<br>` : res.data.upperLimp.wrist_right2}</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>

            <td style="width: 5%;">${res.data.upperLimp.wrist_reflexes1 === null ? `<br>` : res.data.upperLimp.wrist_reflexes1}</td>
            <td style="width: 5%;">${res.data.upperLimp.wrist_reflexes2 === null ? `<br>` : res.data.upperLimp.wrist_reflexes2}</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
        </tr>
`}

${res.data.upperLimp.fingerFlexion_left === null &&
                        res.data.upperLimp.fingerExtension_left === null &&
                        res.data.upperLimp.fingerAbduction_left === null &&
                        res.data.upperLimp.fingerAdduction_left === null &&


                        res.data.upperLimp.fingerFlexion_right === null &&
                        res.data.upperLimp.fingerExtension_right === null &&
                        res.data.upperLimp.fingerAbduction_right === null &&
                        res.data.upperLimp.fingerAdduction_right === null &&


                        res.data.upperLimp.fingerFlexion_reflexes === null &&
                        res.data.upperLimp.fingerExtension_reflexes === null &&
                        res.data.upperLimp.fingerAbduction_reflexes === null &&
                        res.data.upperLimp.fingerAdduction_reflexes === null

                        ? `` : `
        <tr>
            <td style="width: 5%;">Fingers</td>
         
            <td style="width: 5%;">${res.data.upperLimp.fingerFlexion_left === null ? `<br>` : res.data.upperLimp.fingerFlexion_left}</td>
            <td style="width: 5%;">${res.data.upperLimp.fingerExtension_left === null ? `<br>` : res.data.upperLimp.fingerExtension_left}</td>
            <td style="width: 5%;">${res.data.upperLimp.fingerAbduction_left === null ? `<br>` : res.data.upperLimp.fingerAbduction_left}</td>
            <td style="width: 5%;">${res.data.upperLimp.fingerAdduction_left === null ? `<br>` : res.data.upperLimp.fingerAdduction_left}</td>
         

            <td style="width: 5%;">${res.data.upperLimp.fingerFlexion_right === null ? `<br>` : res.data.upperLimp.fingerFlexion_right}</td>
            <td style="width: 5%;">${res.data.upperLimp.fingerExtension_right === null ? `<br>` : res.data.upperLimp.fingerExtension_right}</td>
            <td style="width: 5%;">${res.data.upperLimp.fingerAbduction_right === null ? `<br>` : res.data.upperLimp.fingerAbduction_right}</td>
            <td style="width: 5%;">${res.data.upperLimp.fingerAdduction_right === null ? `<br>` : res.data.upperLimp.fingerAdduction_right}</td>
         

            <td style="width: 5%;">${res.data.upperLimp.fingerFlexion_reflexes === null ? `<br>` : res.data.upperLimp.fingerFlexion_reflexes}</td>
            <td style="width: 5%;">${res.data.upperLimp.fingerExtension_reflexes === null ? `<br>` : res.data.upperLimp.fingerExtension_reflexes}</td>
            <td style="width: 5%;">${res.data.upperLimp.fingerAbduction_reflexes === null ? `<br>` : res.data.upperLimp.fingerAbduction_reflexes}</td>
            <td style="width: 5%;">${res.data.upperLimp.fingerAdduction_reflexes === null ? `<br>` : res.data.upperLimp.fingerAdduction_reflexes}</td>
           
        </tr>
`}
        
    </tbody>
</table>
`}


${res.data.upperLimp.bicepsRight === null &&
                    res.data.upperLimp.biceps_jesk === null &&
                    res.data.upperLimp.tricepsRight === null &&
                    res.data.upperLimp.triceps_jesk === null &&
                    res.data.upperLimp.jeskRight === null &&
                    res.data.upperLimp.brachioradialis_jesk === null &&
                    res.data.upperLimp.fingerRight === null &&
                    res.data.upperLimp.finger === null ? `` :
                    `
<table style="border-collapse: collapse; width: 66.561%;">
    <thead>
        <tr>
            <td style="width: 43.5714%;"><br></td>
            <td style="width: 29.2857%;">Right</td>
            <td style="width: 26.9048%;">Left</td>
        </tr>
    </thead>
    <tbody>
    ${res.data.upperLimp.bicepsRight === null &&
                        res.data.upperLimp.biceps_jesk === null ? `` :
                        `<tr>
                        <td style="width: 43.5714%;">Biceps Jerk (C5,C6)</td>
                        <td style="width: 29.2857%;">${res.data.upperLimp.bicepsRight === null ? `<br>` : res.data.upperLimp.bicepsRight}</td>
                        <td style="width: 26.9048%;">${res.data.upperLimp.biceps_jesk === null ? `<br>` : res.data.upperLimp.biceps_jesk}</td>
                    </tr>`
                    }
        ${res.data.upperLimp.tricepsRight === null &&
                        res.data.upperLimp.triceps_jesk === null ? `` : `
                  <tr>
                    <td style="width: 43.5714%;">Triceps Jesk (C7-C8)</td>
                    <td style="width: 29.2857%;">${res.data.upperLimp.tricepsRight === null ? `<br>` : res.data.upperLimp.tricepsRight}</td>
                    <td style="width: 26.9048%;">${res.data.upperLimp.triceps_jesk === null ? `<br>` : res.data.upperLimp.triceps_jesk}</td>
                </tr> `}
      ${res.data.upperLimp.jeskRight === null &&
                        res.data.upperLimp.brachioradialis_jesk === null ? `` : `
        <tr>
            <td style="width: 43.5714%;">Brachioradialis Jesk (C5,C6)</td>
            <td style="width: 29.2857%;">${res.data.upperLimp.jeskRight === null ? `<br>` : res.data.upperLimp.jeskRight}</td>
            <td style="width: 26.9048%;">${res.data.upperLimp.brachioradialis_jesk === null ? `<br>` : res.data.upperLimp.brachioradialis_jesk}</td>
        </tr>
`}
       ${res.data.upperLimp.fingerRight === null &&
                        res.data.upperLimp.finger === null ? `` : `   
        <tr>
            <td style="width: 43.5714%;">Finger Jerks (C8)</td>
            <td style="width: 29.2857%;">${res.data.upperLimp.fingerRight === null ? `<br>` : res.data.upperLimp.fingerRight}</td>
            <td style="width: 26.9048%;">${res.data.upperLimp.finger === null ? `<br>` : res.data.upperLimp.finger}</td>
        </tr>
` }
       
    </tbody>
</table>
`}
${res.data.upperLimp.finger_nose_test === null &&
                    res.data.upperLimp.dysdiadochokinesis === null &&
                    res.data.upperLimp.temparature === null &&
                    res.data.upperLimp.vibration === null &&
                    res.data.upperLimp.proprioception === null &&
                    res.data.upperLimp.Pin_Prick_Testing === null &&
                    res.data.upperLimp.Light_Touch_Testing === null &&
                    res.data.upperLimp.Picture_upper_limb_dermatomes === null &&
                    res.data.upperLimp.The_Radial_Nerve === null &&
                    res.data.upperLimp.The_Ulnar_Nerve === null &&
                    res.data.upperLimp.The_Median_Nerve === null &&
                    res.data.upperLimp.lesion === null ? `` : `
<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong> Other Examinations:</strong></span><br>
`}

${res.data.upperLimp.finger_nose_test === null ? `` : `Finger nose test: ${res.data.upperLimp.finger_nose_test}<br>`}
${res.data.upperLimp.dysdiadochokinesis === null ? `` : `Dysdiadochokinesia: ${res.data.upperLimp.dysdiadochokinesis}<br>`}
${res.data.upperLimp.temparature === null ? `` : `Temperature Testing: ${res.data.upperLimp.temparature}<br>`}
${res.data.upperLimp.vibration === null ? `` : `Vibration Testing: ${res.data.upperLimp.vibration}<br>`}
${res.data.upperLimp.proprioception === null ? `` : `Proprioception Testing: ${res.data.upperLimp.proprioception}<br>`}
${res.data.upperLimp.Pin_Prick_Testing === null ? `` : `Pin Prick Testing: ${res.data.upperLimp.Pin_Prick_Testing}<br>`}
${res.data.upperLimp.Light_Touch_Testing === null ? `` : `Light Touch Testing: ${res.data.upperLimp.Light_Touch_Testing}<br>`}
${res.data.upperLimp.Picture_upper_limb_dermatomes === null ? `` : `Picture upper limb dermatomes: ${res.data.upperLimp.Picture_upper_limb_dermatomes} ${res.data.upperLimp.Picture_upper_limb_dermatomes_details} ${res.data.upperLimp.pictureUperLimbValue}<br>`}
${res.data.upperLimp.The_Radial_Nerve === null ? `` : `The Radial Nerve (C5-C8): ${res.data.upperLimp.The_Radial_Nerve}<br>`}
${res.data.upperLimp.The_Ulnar_Nerve === null ? `` : `The Ulnar Nerve (C8-T1): ${res.data.upperLimp.The_Ulnar_Nerve}<br>`}
${res.data.upperLimp.The_Median_Nerve === null ? `` : `The Median Nerve (C6-T1): ${res.data.upperLimp.The_Median_Nerve}<br>`}
${res.data.upperLimp.lesion === null ? `` : `Lesion at cubital fossa: Ochsner’s clasping test: ${res.data.upperLimp.lesion}<br>`}

${res.data.lowerLimp.lowerLimbValue === null &&
                    res.data.lowerLimp.lowerLimbpower === null &&
                    res.data.lowerLimp.hip1 === null &&
                    res.data.lowerLimp.hip2 === null &&
                    res.data.lowerLimp.hipRight1 === null &&
                    res.data.lowerLimp.hipRight2 === null &&
                    res.data.lowerLimp.hipReflexes1 === null &&
                    res.data.lowerLimp.hipReflexes2 === null &&

                    res.data.lowerLimp.knee1 === null &&
                    res.data.lowerLimp.knee2 === null &&
                    res.data.lowerLimp.kneeRight1 === null &&
                    res.data.lowerLimp.kneeRight2 === null &&
                    res.data.lowerLimp.kneeReflexes1 === null &&
                    res.data.lowerLimp.kneeReflexes2 === null &&

                    res.data.lowerLimp.ankle1 === null &&
                    res.data.lowerLimp.ankle2 === null &&
                    res.data.lowerLimp.ankleRight1 === null &&
                    res.data.lowerLimp.ankleRight2 === null &&
                    res.data.lowerLimp.ankleReflexes1 === null &&
                    res.data.lowerLimp.ankleReflexes2 === null &&


                    res.data.lowerLimp.fingerFlexionLower === null &&
                    res.data.lowerLimp.fingerExtensionLower === null &&
                    res.data.lowerLimp.fingerAbductionLower === null &&
                    res.data.lowerLimp.fingerAdductionLower === null &&


                    res.data.lowerLimp.fingerFlexionLowerRight === null &&
                    res.data.lowerLimp.fingerExtensionLowerRight === null &&
                    res.data.lowerLimp.fingerAbductionLowerRight === null &&
                    res.data.lowerLimp.fingerAdductionLowerRight === null &&


                    res.data.lowerLimp.fingerFlexionLowerReflexes === null &&
                    res.data.lowerLimp.fingerExtensionLowerReflexes === null &&
                    res.data.lowerLimp.fingerAbductionLowerReflexes === null &&
                    res.data.lowerLimp.fingerAdductionLowerReflexes === null &&

                    res.data.lowerlimb2nd.lowerKneeJerkRight === null &&
                    res.data.lowerlimb2nd.lowerKneeJerk === null &&
                    res.data.lowerlimb2nd.lowerAnkleJerkRight === null &&
                    res.data.lowerlimb2nd.lowerAnkleJerk === null &&
                    res.data.lowerlimb2nd.lowerPlanterReflexRight === null &&
                    res.data.lowerlimb2nd.lowerPlanterReflex === null &&

                    res.data.lowerlimb2nd.lowerFemoralNerve === null &&
                    res.data.lowerlimb2nd.lowerSciaticNerve === null &&
                    res.data.lowerlimb2nd.lowerCommonNerve === null &&

                    res.data.lowerlimb2nd.lowerRombergTest === null &&
                    res.data.lowerlimb2nd.lowerHeelToeWaking === null &&
                    res.data.lowerlimb2nd.lowerHeelShin === null &&
                    res.data.lowerlimb2nd.lowerToeFinger === null &&
                    res.data.lowerlimb2nd.lowerFootTapping === null &&
                    res.data.lowerLimp.lowerlimbTemp === null &&
                    res.data.lowerLimp.vibrationLowerLimb === null &&
                    res.data.lowerLimp.proprioceptionLowerLimb === null &&
                    res.data.lowerLimp.pinLowerLimb === null &&
                    res.data.lowerLimp.lightLowerLimb === null &&
                    res.data.lowerLimp.peripheralLowerLimb === null &&
                    res.data.lowerLimp.redialLowerLimb === null &&
                    res.data.lowerLimp.ulnarLowerLimb === null &&
                    res.data.lowerLimp.medianLowerLimb === null &&
                    res.data.lowerLimp.lesionLowerLimb === null ? `` : `
                <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong> Lower Limb:</strong></span><br>
                `}

${res.data.lowerLimp.lowerLimbValue === null ? `` : ` ${res.data.lowerLimp.lowerLimbValue.replaceAll(",", " . ")}<br>`}


${res.data.lowerLimp.lowerLimbpower === null &&
                    res.data.lowerLimp.hip1 === null &&
                    res.data.lowerLimp.hip2 === null &&
                    res.data.lowerLimp.hipRight1 === null &&
                    res.data.lowerLimp.hipRight2 === null &&
                    res.data.lowerLimp.hipReflexes1 === null &&
                    res.data.lowerLimp.hipReflexes2 === null &&

                    res.data.lowerLimp.knee1 === null &&
                    res.data.lowerLimp.knee2 === null &&
                    res.data.lowerLimp.kneeRight1 === null &&
                    res.data.lowerLimp.kneeRight2 === null &&
                    res.data.lowerLimp.kneeReflexes1 === null &&
                    res.data.lowerLimp.kneeReflexes2 === null &&

                    res.data.lowerLimp.ankle1 === null &&
                    res.data.lowerLimp.ankle2 === null &&
                    res.data.lowerLimp.ankleRight1 === null &&
                    res.data.lowerLimp.ankleRight2 === null &&
                    res.data.lowerLimp.ankleReflexes1 === null &&
                    res.data.lowerLimp.ankleReflexes2 === null &&


                    res.data.lowerLimp.fingerFlexionLower === null &&
                    res.data.lowerLimp.fingerExtensionLower === null &&
                    res.data.lowerLimp.fingerAbductionLower === null &&
                    res.data.lowerLimp.fingerAdductionLower === null &&


                    res.data.lowerLimp.fingerFlexionLowerRight === null &&
                    res.data.lowerLimp.fingerExtensionLowerRight === null &&
                    res.data.lowerLimp.fingerAbductionLowerRight === null &&
                    res.data.lowerLimp.fingerAdductionLowerRight === null &&


                    res.data.lowerLimp.fingerFlexionLowerReflexes === null &&
                    res.data.lowerLimp.fingerExtensionLowerReflexes === null &&
                    res.data.lowerLimp.fingerAbductionLowerReflexes === null &&
                    res.data.lowerLimp.fingerAdductionLowerReflexes === null
                    ? `` : `<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong> Power:</strong></span><br>
`}

${res.data.lowerLimp.lowerLimbpower === null ? `` : `Power: ${res.data.lowerLimp.lowerLimbpower.replaceAll(",", " . ")}<br>`}


${res.data.lowerLimp.hip1 === null &&
                    res.data.lowerLimp.hip2 === null &&
                    res.data.lowerLimp.hipRight1 === null &&
                    res.data.lowerLimp.hipRight2 === null &&
                    res.data.lowerLimp.hipReflexes1 === null &&
                    res.data.lowerLimp.hipReflexes2 === null &&

                    res.data.lowerLimp.knee1 === null &&
                    res.data.lowerLimp.knee2 === null &&
                    res.data.lowerLimp.kneeRight1 === null &&
                    res.data.lowerLimp.kneeRight2 === null &&
                    res.data.lowerLimp.kneeReflexes1 === null &&
                    res.data.lowerLimp.kneeReflexes2 === null &&

                    res.data.lowerLimp.ankle1 === null &&
                    res.data.lowerLimp.ankle2 === null &&
                    res.data.lowerLimp.ankleRight1 === null &&
                    res.data.lowerLimp.ankleRight2 === null &&
                    res.data.lowerLimp.ankleReflexes1 === null &&
                    res.data.lowerLimp.ankleReflexes2 === null &&


                    res.data.lowerLimp.fingerFlexionLower === null &&
                    res.data.lowerLimp.fingerExtensionLower === null &&
                    res.data.lowerLimp.fingerAbductionLower === null &&
                    res.data.lowerLimp.fingerAdductionLower === null &&


                    res.data.lowerLimp.fingerFlexionLowerRight === null &&
                    res.data.lowerLimp.fingerExtensionLowerRight === null &&
                    res.data.lowerLimp.fingerAbductionLowerRight === null &&
                    res.data.lowerLimp.fingerAdductionLowerRight === null &&


                    res.data.lowerLimp.fingerFlexionLowerReflexes === null &&
                    res.data.lowerLimp.fingerExtensionLowerReflexes === null &&
                    res.data.lowerLimp.fingerAbductionLowerReflexes === null &&
                    res.data.lowerLimp.fingerAdductionLowerReflexes === null
                    ? `` : `


<table style="border-collapse: collapse; width: 99.3661%; margin-left: 6.18067%;">
    <tbody>
        <tr>
            <td style="width: 41.3629%;">Right</td>
            <td style="width: 41.3629%;">Left</td>
            <td style="width: 16.9572%;">Reflexes</td>
        </tr>
    </tbody>
</table>

<table style="border-collapse:collapse;width: 100%;">
    <thead>
        <tr>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">Flexion </td>
            <td style="width: 5%;">Extension </td>
            <td style="width: 5%;">Abduction </td>
            <td style="width: 5%;  border-right: 1px solid;">Adduction </td>

            <td style="width: 5%;">Flexion </td>
            <td style="width: 5%;">Extension </td>
            <td style="width: 5%;">Abduction </td>
            <td style="width: 5%;  border-right: 1px solid;">Adduction </td>

            <td style="width: 5%;">Flexion </td>
            <td style="width: 5%;">Extension </td>
            <td style="width: 5%;">Abduction </td>
            <td style="width: 5%;">Adduction </td>
        </tr>
    </thead>
    <tbody>
        ${res.data.lowerLimp.hip1 === null &&
                        res.data.lowerLimp.hip2 === null &&
                        res.data.lowerLimp.hipRight1 === null &&
                        res.data.lowerLimp.hipRight2 === null &&
                        res.data.lowerLimp.hipReflexes1 === null &&
                        res.data.lowerLimp.hipReflexes2 === null ? `` : `
        <tr>
            <td style="width: 5%;">Hip</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.lowerLimp.hip1 === null ? `<br>` : res.data.lowerLimp.hip1}</td>
            <td style="width: 5%;">${res.data.lowerLimp.hip2 === null ? `<br>` : res.data.lowerLimp.hip2}</td>
           
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.lowerLimp.hipRight1 === null ? `<br>` : res.data.lowerLimp.hipRight1}</td>
            <td style="width: 5%;">${res.data.lowerLimp.hipRight2 === null ? `<br>` : res.data.lowerLimp.hipRight2}</td>
           
            
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.lowerLimp.hipReflexes1 === null ? `<br>` : res.data.lowerLimp.hipReflexes1}</td>
            <td style="width: 5%;">${res.data.lowerLimp.hipReflexes2 === null ? `<br>` : res.data.lowerLimp.hipReflexes2}</td>
        </tr>
`}
      
${res.data.lowerLimp.knee1 === null &&
                        res.data.lowerLimp.knee2 === null &&
                        res.data.lowerLimp.kneeRight1 === null &&
                        res.data.lowerLimp.kneeRight2 === null &&
                        res.data.lowerLimp.kneeReflexes1 === null &&
                        res.data.lowerLimp.kneeReflexes2 === null ? `` : `
        <tr>
            <td style="width: 5%;">Knee</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.lowerLimp.knee1 === null ? `<br>` : res.data.lowerLimp.knee1}</td>
            <td style="width: 5%;">${res.data.lowerLimp.knee2 === null ? `<br>` : res.data.lowerLimp.knee2}</td>
           
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.lowerLimp.kneeRight1 === null ? `<br>` : res.data.lowerLimp.kneeRight1}</td>
            <td style="width: 5%;">${res.data.lowerLimp.kneeRight2 === null ? `<br>` : res.data.lowerLimp.kneeRight2}</td>
           
            
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;">${res.data.lowerLimp.kneeReflexes1 === null ? `<br>` : res.data.lowerLimp.kneeReflexes1}</td>
            <td style="width: 5%;">${res.data.lowerLimp.kneeReflexes2 === null ? `<br>` : res.data.lowerLimp.kneeReflexes2}</td>
        </tr>
`}

${res.data.lowerLimp.ankle1 === null &&
                        res.data.lowerLimp.ankle2 === null &&
                        res.data.lowerLimp.ankleRight1 === null &&
                        res.data.lowerLimp.ankleRight2 === null &&
                        res.data.lowerLimp.ankleReflexes1 === null &&
                        res.data.lowerLimp.ankleReflexes2 === null ? `` : `
        <tr>
            <td style="width: 5%;">Ankle</td>
         
            <td style="width: 5%;">${res.data.lowerLimp.ankle1 === null ? `<br>` : res.data.lowerLimp.ankle1}</td>
            <td style="width: 5%;">${res.data.lowerLimp.ankle2 === null ? `<br>` : res.data.lowerLimp.ankle2}</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>

            <td style="width: 5%;">${res.data.lowerLimp.ankleRight1 === null ? `<br>` : res.data.lowerLimp.ankleRight1}</td>
            <td style="width: 5%;">${res.data.lowerLimp.ankleRight2 === null ? `<br>` : res.data.lowerLimp.ankleRight2}</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>

            <td style="width: 5%;">${res.data.lowerLimp.ankleReflexes1 === null ? `<br>` : res.data.lowerLimp.ankleReflexes1}</td>
            <td style="width: 5%;">${res.data.lowerLimp.ankleReflexes2 === null ? `<br>` : res.data.lowerLimp.ankleReflexes2}</td>
            <td style="width: 5%;"><br></td>
            <td style="width: 5%;"><br></td>
        </tr>
`}

${res.data.lowerLimp.fingerFlexionLower === null &&
                        res.data.lowerLimp.fingerExtensionLower === null &&
                        res.data.lowerLimp.fingerAbductionLower === null &&
                        res.data.lowerLimp.fingerAdductionLower === null &&


                        res.data.lowerLimp.fingerFlexionLowerRight === null &&
                        res.data.lowerLimp.fingerExtensionLowerRight === null &&
                        res.data.lowerLimp.fingerAbductionLowerRight === null &&
                        res.data.lowerLimp.fingerAdductionLowerRight === null &&


                        res.data.lowerLimp.fingerFlexionLowerReflexes === null &&
                        res.data.lowerLimp.fingerExtensionLowerReflexes === null &&
                        res.data.lowerLimp.fingerAbductionLowerReflexes === null &&
                        res.data.lowerLimp.fingerAdductionLowerReflexes === null

                        ? `` : `
        <tr>
            <td style="width: 5%;">Talar Joint</td>
         
            <td style="width: 5%;">${res.data.lowerLimp.fingerFlexionLower === null ? `<br>` : res.data.lowerLimp.fingerFlexionLower}</td>
            <td style="width: 5%;">${res.data.lowerLimp.fingerExtensionLower === null ? `<br>` : res.data.lowerLimp.fingerExtensionLower}</td>
            <td style="width: 5%;">${res.data.lowerLimp.fingerAbductionLower === null ? `<br>` : res.data.lowerLimp.fingerAbductionLower}</td>
            <td style="width: 5%;">${res.data.lowerLimp.fingerAdductionLower === null ? `<br>` : res.data.lowerLimp.fingerAdductionLower}</td>
         

            <td style="width: 5%;">${res.data.lowerLimp.fingerFlexionLowerRight === null ? `<br>` : res.data.lowerLimp.fingerFlexionLowerRight}</td>
            <td style="width: 5%;">${res.data.lowerLimp.fingerExtensionLowerRight === null ? `<br>` : res.data.lowerLimp.fingerExtensionLowerRight}</td>
            <td style="width: 5%;">${res.data.lowerLimp.fingerAbductionLowerRight === null ? `<br>` : res.data.lowerLimp.fingerAbductionLowerRight}</td>
            <td style="width: 5%;">${res.data.lowerLimp.fingerAdductionLowerRight === null ? `<br>` : res.data.lowerLimp.fingerAdductionLowerRight}</td>
         

            <td style="width: 5%;">${res.data.lowerLimp.fingerFlexionLowerReflexes === null ? `<br>` : res.data.lowerLimp.fingerFlexionLowerReflexes}</td>
            <td style="width: 5%;">${res.data.lowerLimp.fingerExtensionLowerReflexes === null ? `<br>` : res.data.lowerLimp.fingerExtensionLowerReflexes}</td>
            <td style="width: 5%;">${res.data.lowerLimp.fingerAbductionLowerReflexes === null ? `<br>` : res.data.lowerLimp.fingerAbductionLowerReflexes}</td>
            <td style="width: 5%;">${res.data.lowerLimp.fingerAdductionLowerReflexes === null ? `<br>` : res.data.lowerLimp.fingerAdductionLowerReflexes}</td>
           
        </tr>
`}
        
    </tbody>
</table>
`}

${res.data.lowerlimb2nd.lowerKneeJerkRight === null &&
                    res.data.lowerlimb2nd.lowerKneeJerk === null &&
                    res.data.lowerlimb2nd.lowerAnkleJerkRight === null &&
                    res.data.lowerlimb2nd.lowerAnkleJerk === null &&
                    res.data.lowerlimb2nd.lowerPlanterReflexRight === null &&
                    res.data.lowerlimb2nd.lowerPlanterReflex === null ? `` : `
<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong> Reflexes:</strong></span><br>
`}

${res.data.lowerlimb2nd.lowerKneeJerkRight === null &&
                    res.data.lowerlimb2nd.lowerKneeJerk === null &&

                    res.data.lowerlimb2nd.lowerAnkleJerkRight === null &&
                    res.data.lowerlimb2nd.lowerAnkleJerk === null &&

                    res.data.lowerlimb2nd.lowerPlanterReflexRight === null &&
                    res.data.lowerlimb2nd.lowerPlanterReflex === null ? `` :
                    `
<table style="border-collapse: collapse; width: 66.561%;">
    <thead>
        <tr>
            <td style="width: 43.5714%;"><br></td>
            <td style="width: 29.2857%;">Right</td>
            <td style="width: 26.9048%;">Left</td>
        </tr>
    </thead>
    <tbody>
    ${res.data.lowerlimb2nd.lowerKneeJerkRight === null &&
                        res.data.lowerlimb2nd.lowerKneeJerk === null ? `` :
                        `<tr>
                        <td style="width: 43.5714%;">Biceps Jerk (C5,C6)</td>
                        <td style="width: 29.2857%;">${res.data.lowerlimb2nd.lowerKneeJerkRight === null ? `<br>` : res.data.lowerlimb2nd.lowerKneeJerkRight}</td>
                        <td style="width: 26.9048%;">${res.data.lowerlimb2nd.lowerKneeJerk === null ? `<br>` : res.data.lowerlimb2nd.lowerKneeJerk}</td>
                    </tr>`
                    }
        ${res.data.lowerlimb2nd.lowerAnkleJerkRight === null &&
                        res.data.lowerlimb2nd.lowerAnkleJerk === null ? `` : `
                  <tr>
                    <td style="width: 43.5714%;">Triceps Jesk (C7-C8)</td>
                    <td style="width: 29.2857%;">${res.data.lowerlimb2nd.lowerAnkleJerkRight === null ? `<br>` : res.data.lowerlimb2nd.lowerAnkleJerkRight}</td>
                    <td style="width: 26.9048%;">${res.data.lowerlimb2nd.lowerAnkleJerk === null ? `<br>` : res.data.lowerlimb2nd.lowerAnkleJerk}</td>
                </tr> `}
      ${res.data.lowerlimb2nd.lowerPlanterReflexRight === null &&
                        res.data.lowerlimb2nd.lowerPlanterReflex === null ? `` : `
        <tr>
            <td style="width: 43.5714%;">Brachioradialis Jesk (C5,C6)</td>
            <td style="width: 29.2857%;">${res.data.lowerlimb2nd.lowerPlanterReflexRight === null ? `<br>` : res.data.lowerlimb2nd.lowerPlanterReflexRight}</td>
            <td style="width: 26.9048%;">${res.data.lowerlimb2nd.lowerPlanterReflex === null ? `<br>` : res.data.lowerlimb2nd.lowerPlanterReflex}</td>
        </tr>
`}

       
    </tbody>
</table>
`}

${res.data.lowerlimb2nd.lowerFemoralNerve === null &&
                    res.data.lowerlimb2nd.lowerSciaticNerve === null &&
                    res.data.lowerlimb2nd.lowerCommonNerve === null ? `` : `
<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong> Nerve tests:</strong></span><br>
`}

${res.data.lowerlimb2nd.lowerFemoralNerve === null ? `` : `Femoral Nerve(L1,L2,L3): ${res.data.lowerlimb2nd.lowerFemoralNerve}<br>`}
${res.data.lowerlimb2nd.lowerSciaticNerve === null ? `` : `Sciatic nerve(L4,L5,S1,S2): ${res.data.lowerlimb2nd.lowerSciaticNerve}<br>`}
${res.data.lowerlimb2nd.lowerCommonNerve === null ? `` : `Common perineal nerve(L4,L5,S1): ${res.data.lowerlimb2nd.lowerCommonNerve}<br>`}

${res.data.lowerlimb2nd.lowerRombergTest === null &&
                    res.data.lowerlimb2nd.lowerHeelToeWaking === null &&
                    res.data.lowerlimb2nd.lowerHeelShin === null &&
                    res.data.lowerlimb2nd.lowerToeFinger === null &&
                    res.data.lowerlimb2nd.lowerFootTapping === null &&
                    res.data.lowerLimp.lowerlimbTemp === null &&
                    res.data.lowerLimp.vibrationLowerLimb === null &&
                    res.data.lowerLimp.proprioceptionLowerLimb === null &&
                    res.data.lowerLimp.pinLowerLimb === null &&
                    res.data.lowerLimp.lightLowerLimb === null &&
                    res.data.lowerLimp.peripheralLowerLimb === null &&
                    res.data.lowerLimp.redialLowerLimb === null &&
                    res.data.lowerLimp.ulnarLowerLimb === null &&
                    res.data.lowerLimp.medianLowerLimb === null &&
                    res.data.lowerLimp.lesionLowerLimb === null ? `` : `<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Tests:</strong></span><br>`

                }



${res.data.lowerlimb2nd.lowerRombergTest === null ? `` : `Romberg test: ${res.data.lowerlimb2nd.lowerRombergTest}<br>`}
${res.data.lowerlimb2nd.lowerHeelToeWaking === null ? `` : `Heel toe walking: ${res.data.lowerlimb2nd.lowerHeelToeWaking}<br>`}
${res.data.lowerlimb2nd.lowerHeelShin === null ? `` : `Heel Shin Test: ${res.data.lowerlimb2nd.lowerHeelShin}<br>`}
${res.data.lowerlimb2nd.lowerToeFinger === null ? `` : `Toe Finger Test: ${res.data.lowerlimb2nd.lowerToeFinger}<br>`}
${res.data.lowerlimb2nd.lowerFootTapping === null ? `` : `Foot Tapping Test: ${res.data.lowerlimb2nd.lowerFootTapping}<br>`}


${res.data.lowerLimp.lowerlimbTemp === null ? `` : `Temperature Testing: ${res.data.lowerLimp.lowerlimbTemp}<br>`}


${res.data.lowerLimp.vibrationLowerLimb === null ? `` : `Vibration Testing: ${res.data.lowerLimp.vibrationLowerLimb}<br>`}
${res.data.lowerLimp.proprioceptionLowerLimb === null ? `` : `Proprioception Testing: ${res.data.lowerLimp.proprioceptionLowerLimb}<br>`}
${res.data.lowerLimp.pinLowerLimb === null ? `` : `Pin Prick Testing: ${res.data.lowerLimp.pinLowerLimb}<br>`}
${res.data.lowerLimp.lightLowerLimb === null ? `` : `Light Touch Testing: ${res.data.lowerLimp.lightLowerLimb}<br>`}
${res.data.lowerLimp.peripheralLowerLimb === null ? `` : `Picture lower limb dermatomes: ${res.data.lowerLimp.peripheralLowerLimb} | ${res.data.lowerLimp.peripheralLowerLimbValuve} | ${res.data.lowerLimp.pictureLowerLimbValue.replaceAll(",", " . ")}<br>`}
${res.data.lowerLimp.redialLowerLimb === null ? `` : `The Radial Nerve (C5-C8): ${res.data.lowerLimp.redialLowerLimb}<br>`}
${res.data.lowerLimp.ulnarLowerLimb === null ? `` : `The Ulnar Nerve (C8-T1): ${res.data.lowerLimp.ulnarLowerLimb}<br>`}
${res.data.lowerLimp.medianLowerLimb === null ? `` : `The Median Nerve (C6-T1): ${res.data.lowerLimp.medianLowerLimb}<br>`}
${res.data.lowerLimp.lesionLowerLimb === null ? `` : `Lesion at cubital fossa: Ochsner’s clasping test: ${res.data.lowerLimp.lesionLowerLimb}<br>`}


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
            toast.error("Ops! Something is wrong")
        });

    }

    //Cns part 2
    const [rightArray, setrightArray] = useState([])
    const [leftArray, setleftArray] = useState([])
    const [jerkArray, setjerkArray] = useState([])
    const [powerArray, setpowerArray] = useState([])
    const [TheRadialNerveArray, setTheRadialNerveArray] = useState([])
    const [pictureUpperLimbArray, setpictureUpperLimbArray] = useState([])
    const [FingerNoseTestArray, setFingerNoseTestArray] = useState([])
    const [historyShowAll1, setHistoryShowAll1] = useState(false);
    const [upperLimbValue, setUpperLimbValue] = useState([]);
    const [lowerLimbValue, setLowerLimbValue] = useState([]);
    const [power, setPower] = useState([]);
    const [lowerLimbpower, setlowerLimbPower] = useState([]); //new change

    const [biceps, setBiceps] = useState("");
    const [bicepsRight, setBicepsRight] = useState(""); // Newdoctor change
    const [triceps, setTriceps] = useState("");
    const [tricepsRight, setTricepsRight] = useState(""); // Newdoctor change
    const [jesk, setJesk] = useState("");
    const [jeskRight, setJeskRight] = useState(""); // Newdoctor change
    const [finger, setFinger] = useState("");
    const [fingerRight, setFingerRight] = useState(""); // Newdoctor change
    const [fingerTest, setFingerTest] = useState("");
    const [dysdiadochokinesis, setDysdiadochokinesis] = useState("");
    const [temparature, setTemparature] = useState("");
    const [vibration, setVibration] = useState("");
    const [proprioception, setProprioception] = useState("");
    const [pin, setPin] = useState("");
    const [light1, setLight1] = useState("");
    const [peripheral, setPeripheral] = useState("");
    const [peripheralUpper, setPeripheralUpper] = useState("");
    const [pictureUperLimbValue, setpictureUperLimbValue] = useState([])
    const [redial, setRedial] = useState("");
    const [ulnar, setUlnar] = useState("");
    const [median, setMedian] = useState("");
    const [lesion, setLesion] = useState("");

    const [shoulder1, setShoulder1] = useState("");
    const [shoulder2, setShoulder2] = useState("");
    const [elbow1, setElbow1] = useState("");
    const [elbow2, setElbow2] = useState("");
    const [wrist1, setWrist1] = useState("");
    const [wrist2, setWrist2] = useState("");
    const [fingerFlexion, setFingerFlexion] = useState("");
    const [fingerExtension, setFingerExtension] = useState("");
    const [fingerAbduction, setFingerAbduction] = useState("");
    const [fingerAdduction, setFingerAdduction] = useState("");
    const [fingerNth, setFingerNth] = useState("");
    const [fingerSide, setFingerSide] = useState("");

    console.log(fingerSide)
    const [fingerNth1, setFingerNth1] = useState("");
    const [fingerSide1, setFingerSide1] = useState("");
    const [shoulder_right1, setShoulder_right1] = useState("");
    const [shoulder_right2, setShoulder_right2] = useState("");
    const [elbow_right1, setElbow_right1] = useState("");
    const [elbow_right2, setElbow_right2] = useState("");
    const [wrist_right1, setWrist_right1] = useState("");
    const [wrist_right2, setWrist_right2] = useState("");
    const [fingerFlexion1, setFingerFlexion1] = useState("");
    const [fingerExtension1, setFingerExtension1] = useState("");
    const [fingerAbduction1, setFingerAbduction1] = useState("");
    const [fingerAdduction1, setFingerAdduction1] = useState("");

    const [fingerNth2, setFingerNth2] = useState("");
    const [fingerSide2, setFingerSide2] = useState("");
    const [shoulder_reflexes1, setShoulder_reflexes1] = useState("");
    const [shoulder_reflexes2, setShoulder_reflexes2] = useState("");
    const [elbow_reflexes1, setElbow_reflexes1] = useState("");
    const [elbow_reflexes2, setElbow_reflexes2] = useState("");
    const [wrist_reflexes1, setWrist_reflexes1] = useState("");
    const [wrist_reflexes2, setWrist_reflexes2] = useState("");
    const [fingerFlexion2, setFingerFlexion2] = useState("");
    const [fingerExtension2, setFingerExtension2] = useState("");
    const [fingerAbduction2, setFingerAbduction2] = useState("");
    const [fingerAdduction2, setFingerAdduction2] = useState("");

    /* lowerLimb */
    const [lowerlimbTemp, setlowerlimbTemp] = useState()
    const [hip1, setHip1] = useState("");
    const [hip2, setHip2] = useState("");
    const [knee1, setKnee1] = useState("");
    const [knee2, setKnee2] = useState("");
    const [ankle1, setAnkle1] = useState("");
    const [ankle2, setAnkle2] = useState("");
    const [fingerFlexionLower, setFingerFlexionLower] = useState("");
    const [fingerExtensionLower, setFingerExtensionLower] = useState("");
    const [fingerAbductionLower, setFingerAbductionLower] = useState("");
    const [fingerAdductionLower, setFingerAdductionLower] = useState("");
    const [fingerNthLower, setFingerNthLower] = useState("");
    const [fingerSideLower, setFingerSideLower] = useState("");

    const [hipRight1, setHipRight1] = useState("");
    const [hipRight2, setHipRight2] = useState("");
    const [kneeRight1, setKneeRight1] = useState("");
    const [kneeRight2, setKneeRight2] = useState("");
    const [ankleRight1, setAnkleRight1] = useState("");
    const [ankleRight2, setAnkleRight2] = useState("");
    const [fingerFlexionLowerRight, setFingerFlexionLowerRight] = useState("");
    const [fingerExtensionLowerRight, setFingerExtensionLowerRight] = useState("");
    const [fingerAbductionLowerRight, setFingerAbductionLowerRight] = useState("");
    const [fingerAdductionLowerRight, setFingerAdductionLowerRight] = useState("");
    const [fingerNthLowerRight, setFingerNthLowerRight] = useState("");
    const [fingerSideLowerRight, setFingerSideLowerRight] = useState("");

    const [hipReflexes1, setHipReflexes1] = useState("");
    const [hipReflexes2, setHipReflexes2] = useState("");
    const [kneeReflexes1, setKneeReflexes1] = useState("");
    const [kneeReflexes2, setKneeReflexes2] = useState("");
    const [ankleReflexes1, setAnkleReflexes1] = useState("");
    const [ankleReflexes2, setAnkleReflexes2] = useState("");
    const [fingerFlexionLowerReflexes, setFingerFlexionLowerReflexes] = useState("");
    const [fingerExtensionLowerReflexes, setFingerExtensionLowerReflexes] = useState("");
    const [fingerAbductionLowerReflexes, setFingerAbductionLowerReflexes] = useState("");
    const [fingerAdductionLowerReflexes, setFingerAdductionLowerReflexes] = useState("");
    const [fingerNthLowerReflexes, setFingerNthLowerReflexes] = useState("");
    const [fingerSideLowerReflexes, setFingerSideLowerReflexes] = useState("");

    const [vibrationLowerLimb, setVibrationLowerLimb] = useState("");
    const [proprioceptionLowerLimb, setProprioceptionLowerLimb] = useState("");
    const [pinLowerLimb, setPinLowerLimb] = useState("");
    const [lightLowerLimb, setLightLowerLimb] = useState("");
    const [peripheralLowerLimb, setPeripheralLowerLimb] = useState("");
    const [peripheralLowerLimbValuve, setPeripheralLowerLimbValuve] = useState("");
    const [redialLowerLimb, setRedialLowerLimb] = useState("");
    const [ulnarLowerLimb, setUlnarLowerLimb] = useState("");
    const [medianLowerLimb, setMedianLowerLimb] = useState("");
    const [lesionLowerLimb, setLesionLowerLimb] = useState("");
    /* lowerLimb */

    const setLimbValue = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setUpperLimbValue([...upperLimbValue, value])
        } else {
            const dataNe = upperLimbValue.filter(item => item !== value)
            setUpperLimbValue(dataNe)
        }
    }
    const setLimbValueLower = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setLowerLimbValue([...lowerLimbValue, value])
        } else {
            const dataNe = lowerLimbValue.filter(item => item !== value)
            setLowerLimbValue(dataNe)
        }

    }

    const handlePictureUpperValue = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setpictureUperLimbValue([...pictureUperLimbValue, value])
        } else {
            const dataNe = pictureUperLimbValue.filter(item => item !== value)
            setpictureUperLimbValue(dataNe)
        }
    }

    const [pictureLowerLimbValue, setpictureLowerLimbValue] = useState([])
    const handlePictureLowerValue = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setpictureLowerLimbValue([...pictureLowerLimbValue, value])
        } else {
            const dataNe = pictureLowerLimbValue.filter(item => item !== value)
            setpictureLowerLimbValue(dataNe)
        }
    }

    const [upperLimb, setUpperLimb] = useState([]);
    //new state
    const [lowerKneeJerk, setLowerKneeJerk] = useState('');
    const [lowerKneeJerkRight, setLowerKneeJerkRight] = useState('');
    const [lowerAnkleJerk, setLowerAnkleJerk] = useState('');
    const [lowerAnkleJerkRight, setLowerAnkleJerkRight] = useState('');
    const [lowerPlanterReflex, setlowerPlanterReflex] = useState();
    const [lowerPlanterReflexRight, setlowerPlanterReflexRight] = useState();
    const [lowerHeelShin, setLowerHeelShin] = useState('');
    const [lowerToeFinger, setLowerToeFinger] = useState('');
    const [lowerFootTapping, setLowerFootTapping] = useState('');
    const [lowerFemoralNerve, setLowerFemoralNerve] = useState('');
    const [lowerSciaticNerve, setLowerSciaticNerve] = useState('');
    const [lowerCommonNerve, setLowerCommonNerve] = useState('');
    const [lowerRombergTest, setLowerRombergTest] = useState('');
    const [lowerHeelToeWaking, setLowerHeelToeWaking] = useState('');





    //proper
    //
    const [change34, setChange34] = useState(false);
    const [anchorEl34, setAnchorEl34] = useState();

    const handleClick34 = (event) => {
        setAnchorEl34(event.currentTarget);

    };
    const handleClose34 = () => {
        setAnchorEl34(null);
    };
    const open34 = Boolean(anchorEl34);
    const id34 = open34 ? 'simple-popover' : undefined;
    //
    const [change35, setChange35] = useState(false);
    const [anchorEl35, setAnchorEl35] = useState(null);

    const handleClick35 = (event) => {
        setAnchorEl35(event.currentTarget);

    };
    const handleClose35 = () => {
        setAnchorEl35(null);
    };
    const open35 = Boolean(anchorEl35);
    const id35 = open35 ? 'simple-popover' : undefined;
    //
    const [change36, setChange36] = useState(false);
    const [anchorEl36, setAnchorEl36] = useState(null);

    const handleClick36 = (event) => {
        setAnchorEl36(event.currentTarget);

    };
    const handleClose36 = () => {
        setAnchorEl36(null);
    };
    const open36 = Boolean(anchorEl36);
    const id36 = open36 ? 'simple-popover' : undefined;
    //
    const [change37, setChange37] = useState(false);
    const [anchorEl37, setAnchorEl37] = useState(null);

    const handleClick37 = (event) => {
        setAnchorEl37(event.currentTarget);

    };
    const handleClose37 = () => {
        setAnchorEl37(null);
    };
    const open37 = Boolean(anchorEl37);
    const id37 = open37 ? 'simple-popover' : undefined;
    //
    const [change38, setChange38] = useState(false);
    const [anchorEl38, setAnchorEl38] = useState(null);
    const handleClick38 = (event) => {
        setAnchorEl38(event.currentTarget);

    };
    const handleClose38 = () => {
        setAnchorEl38(null);
    };
    const open38 = Boolean(anchorEl38);
    const id38 = open38 ? 'simple-popover' : undefined;
    //
    const [change39, setChange39] = useState(false);
    const [anchorEl39, setAnchorEl39] = useState(null);

    const handleClick39 = (event) => {
        setAnchorEl39(event.currentTarget);
    };
    const handleClose39 = () => {
        setAnchorEl39(null);
    };
    const open39 = Boolean(anchorEl39);
    const id39 = open39 ? 'simple-popover' : undefined;
    //
    const [change40, setChange40] = useState(false);
    const [anchorEl40, setAnchorEl40] = useState(null);

    const handleClick40 = (event) => {
        setAnchorEl40(event.currentTarget);
    };
    const handleClose40 = () => {
        setAnchorEl40(null);
    };
    const open40 = Boolean(anchorEl40);
    const id40 = open40 ? 'simple-popover' : undefined;
    //
    const [change41, setChange41] = useState(false);
    const [anchorEl41, setAnchorEl41] = useState(null);

    const handleClick41 = (event) => {
        setAnchorEl41(event.currentTarget);
    };
    const handleClose41 = () => {
        setAnchorEl41(null);
    };
    const open41 = Boolean(anchorEl41);
    const id41 = open41 ? 'simple-popover' : undefined;
    // 
    const [change42, setChange42] = useState(false)
    const [anchorEl42, setAnchorEl42] = useState(null);

    const handleClick42 = (event) => {
        setAnchorEl42(event.currentTarget);
    };
    const handleClose42 = () => {
        setAnchorEl42(null);
    };
    const open42 = Boolean(anchorEl42);
    const id42 = open42 ? 'simple-popover' : undefined;
    //
    const [change43, setChange43] = useState(false);
    const [anchorEl43, setAnchorEl43] = useState(null);
    const handleClick43 = (event) => {
        setAnchorEl43(event.currentTarget);
    };
    const handleClose43 = () => {
        setAnchorEl43(null);
    };
    const open43 = Boolean(anchorEl43);
    const id43 = open43 ? 'simple-popover' : undefined;
    //
    const [change44, setChange44] = useState(false)
    const [anchorEl44, setAnchorEl44] = useState(null);
    const handleClick44 = (event) => {
        setAnchorEl44(event.currentTarget);
    };
    const handleClose44 = () => {
        setAnchorEl44(null);
    };
    const open44 = Boolean(anchorEl44);
    const id44 = open44 ? 'simple-popover' : undefined;
    //
    const [change45, setChange45] = useState(false);
    const [anchorEl45, setAnchorEl45] = useState(null);
    const handleClick45 = (event) => {
        setAnchorEl45(event.currentTarget);
    };
    const handleClose45 = () => {
        setAnchorEl45(null);
    };
    const open45 = Boolean(anchorEl45);
    const id45 = open45 ? 'simple-popover' : undefined;
    //
    const [change46, setChange46] = useState(false);
    const [anchorEl46, setAnchorEl46] = useState(null);
    const handleClick46 = (event) => {
        setAnchorEl46(event.currentTarget);
    };
    const handleClose46 = () => {
        setAnchorEl46(null);
    };
    const open46 = Boolean(anchorEl46);
    const id46 = open46 ? 'simple-popover' : undefined;
    //
    const [change47, setChange47] = useState(false);
    const [anchorEl47, setAnchorEl47] = useState(null);
    const handleClick47 = (event) => {
        setAnchorEl47(event.currentTarget);
    };
    const handleClose47 = () => {
        setAnchorEl47(null);
    };
    const open47 = Boolean(anchorEl47);
    const id47 = open47 ? 'simple-popover' : undefined;
    //
    const [change48, setChange48] = useState(false);
    const [anchorEl48, setAnchorEl48] = useState(null);
    const handleClick48 = (event) => {
        setAnchorEl48(event.currentTarget);
    };
    const handleClose48 = () => {
        setAnchorEl48(null);
    };
    const open48 = Boolean(anchorEl48);
    const id48 = open48 ? 'simple-popover' : undefined;
    //
    const [change49, setChange49] = useState(false);
    const [anchorEl49, setAnchorEl49] = useState(null);
    const handleClick49 = (event) => {
        setAnchorEl49(event.currentTarget);
    };
    const handleClose49 = () => {
        setAnchorEl49(null);
    };
    const open49 = Boolean(anchorEl49);
    const id49 = open49 ? 'simple-popover' : undefined;
    //
    const [change50, setChange50] = useState(false);
    const [anchorEl50, setAnchorEl50] = useState(null);
    const handleClick50 = (event) => {
        setAnchorEl50(event.currentTarget);
    };
    const handleClose50 = () => {
        setAnchorEl50(null);
    };
    const open50 = Boolean(anchorEl50);
    const id50 = open50 ? 'simple-popover' : undefined;
    //
    const [change51, setChange51] = useState(false);
    const [anchorEl51, setAnchorEl51] = useState(null);
    const handleClick51 = (event) => {
        setAnchorEl51(event.currentTarget);
    };
    const handleClose51 = () => {
        setAnchorEl51(null);
    };
    const open51 = Boolean(anchorEl51);
    const id51 = open51 ? 'simple-popover' : undefined;
    //
    const [change52, setChange52] = useState(false);
    const [anchorEl52, setAnchorEl52] = useState(null);
    const handleClick52 = (event) => {
        setAnchorEl52(event.currentTarget);
    };
    const handleClose52 = () => {
        setAnchorEl52(null);
    };
    const open52 = Boolean(anchorEl52);
    const id52 = open52 ? 'simple-popover' : undefined;
    //
    const [change53, setChange53] = useState(false);
    const [anchorEl53, setAnchorEl53] = useState(null);
    const handleClick53 = (event) => {
        setAnchorEl53(event.currentTarget);
    };
    const handleClose53 = () => {
        setAnchorEl53(null);
    };
    const open53 = Boolean(anchorEl53);
    const id53 = open53 ? 'simple-popover' : undefined;
    //
    const [change54, setChange54] = useState(false);
    const [anchorEl54, setAnchorEl54] = useState(null);
    const handleClick54 = (event) => {
        setAnchorEl54(event.currentTarget);
    };
    const handleClose54 = () => {
        setAnchorEl54(null);
    };
    const open54 = Boolean(anchorEl54);
    const id54 = open54 ? 'simple-popover' : undefined;
    //
    const [change55, setChange55] = useState(false);
    const [anchorEl55, setAnchorEl55] = useState(null);
    const handleClick55 = (event) => {
        setAnchorEl55(event.currentTarget);
    };
    const handleClose55 = () => {
        setAnchorEl55(null);
    };
    const open55 = Boolean(anchorEl55);
    const id55 = open55 ? 'simple-popover' : undefined;
    //
    const [change56, setChange56] = useState(false);
    const [anchorEl56, setAnchorEl56] = useState(null);
    const handleClick56 = (event) => {
        setAnchorEl56(event.currentTarget);
    };
    const handleClose56 = () => {
        setAnchorEl56(null);
    };
    const open56 = Boolean(anchorEl56);
    const id56 = open56 ? 'simple-popover' : undefined;
    //
    const [change57, setChange57] = useState(false);
    const [anchorEl57, setAnchorEl57] = useState(null);
    const handleClick57 = (event) => {
        setAnchorEl57(event.currentTarget);
    };
    const handleClose57 = () => {
        setAnchorEl57(null);
    };
    const open57 = Boolean(anchorEl57);
    const id57 = open57 ? 'simple-popover' : undefined;
    //
    const [change58, setChange58] = useState(false);
    const [anchorEl58, setAnchorEl58] = useState(null);
    const handleClick58 = (event) => {
        setAnchorEl58(event.currentTarget);
    };
    const handleClose58 = () => {
        setAnchorEl58(null);
    };
    const open58 = Boolean(anchorEl58);
    const id58 = open58 ? 'simple-popover' : undefined;
    //
    const [anchorEl59, setAnchorEl59] = useState(null);
    const handleClick59 = (event) => {
        setAnchorEl59(event.currentTarget);
    };
    const handleClose59 = () => {
        setAnchorEl59(null);
    };
    const open59 = Boolean(anchorEl59);
    const id59 = open59 ? 'simple-popover' : undefined;
    //
    const [anchorEl60, setAnchorEl60] = useState(null);
    const handleClick60 = (event) => {
        setAnchorEl60(event.currentTarget);
    };
    const handleClose60 = () => {
        setAnchorEl60(null);
    };
    const open60 = Boolean(anchorEl60);
    const id60 = open60 ? 'simple-popover' : undefined;
    //
    const [anchorEl61, setAnchorEl61] = useState(null);
    const handleClick61 = (event) => {
        setAnchorEl61(event.currentTarget);
    };
    const handleClose61 = () => {
        setAnchorEl61(null);
    };
    const open61 = Boolean(anchorEl61);
    const id61 = open61 ? 'simple-popover' : undefined;
    //
    const [anchorEl62, setAnchorEl62] = useState(null);
    const handleClick62 = (event) => {
        setAnchorEl62(event.currentTarget);
    };
    const handleClose62 = () => {
        setAnchorEl62(null);
    };
    const open62 = Boolean(anchorEl62);
    const id62 = open62 ? 'simple-popover' : undefined;
    //
    const [change63, setChange63] = useState(false);
    const [anchorEl63, setAnchorEl63] = useState(null);
    const handleClick63 = (event) => {
        setAnchorEl63(event.currentTarget);
    };
    const handleClose63 = () => {
        setAnchorEl63(null);
    };
    const open63 = Boolean(anchorEl63);
    const id63 = open63 ? 'simple-popover' : undefined;
    //
    const [change64, setChange64] = useState(false);
    const [anchorEl64, setAnchorEl64] = useState(null);
    const handleClick64 = (event) => {
        setAnchorEl64(event.currentTarget);
    };
    const handleClose64 = () => {
        setAnchorEl64(null);
    };
    const open64 = Boolean(anchorEl64);
    const id64 = open64 ? 'simple-popover' : undefined;
    //
    const [change65, setChange65] = useState(false);
    const [anchorEl65, setAnchorEl65] = useState(null);
    const handleClick65 = (event) => {
        setAnchorEl65(event.currentTarget);
    };
    const handleClose65 = () => {
        setAnchorEl65(null);
    };
    const open65 = Boolean(anchorEl65);
    const id65 = open65 ? 'simple-popover' : undefined;
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
    //
    const [change68, setChange68] = useState(false);
    const [anchorEl68, setAnchorEl68] = useState(null);
    const handleClick68 = (event) => {
        setAnchorEl68(event.currentTarget);
    };
    const handleClose68 = () => {
        setAnchorEl68(null);
    };
    const open68 = Boolean(anchorEl68);
    const id68 = open68 ? 'simple-popover' : undefined;
    //
    const [change69, setChange69] = useState(false);
    const [anchorEl69, setAnchorEl69] = useState(null);
    const handleClick69 = (event) => {
        setAnchorEl69(event.currentTarget);
    };
    const handleClose69 = () => {
        setAnchorEl69(null);
    };
    const open69 = Boolean(anchorEl69);
    const id69 = open69 ? 'simple-popover' : undefined;
    //
    const [change70, setChange70] = useState(false);
    const [anchorEl70, setAnchorEl70] = useState(null);
    const handleClick70 = (event) => {
        setAnchorEl70(event.currentTarget);
    };
    const handleClose70 = () => {
        setAnchorEl70(null);
    };
    const open70 = Boolean(anchorEl70);
    const id70 = open70 ? 'simple-popover' : undefined;
    //
    const [change71, setChange71] = useState(false);
    const [anchorEl71, setAnchorEl71] = useState(null);
    const handleClick71 = (event) => {
        setAnchorEl71(event.currentTarget);
    };
    const handleClose71 = () => {
        setAnchorEl71(null);
    };
    const open71 = Boolean(anchorEl71);
    const id71 = open71 ? 'simple-popover' : undefined;
    //
    const [change72, setChange72] = useState(false);
    const [anchorEl72, setAnchorEl72] = useState(null);
    const handleClick72 = (event) => {
        setAnchorEl72(event.currentTarget);
    };
    const handleClose72 = () => {
        setAnchorEl72(null);
    };
    const open72 = Boolean(anchorEl72);
    const id72 = open72 ? 'simple-popover' : undefined;
    //
    const [change73, setChange73] = useState(false);
    const [anchorEl73, setAnchorEl73] = useState(null);
    const handleClick73 = (event) => {
        setAnchorEl73(event.currentTarget);
    };
    const handleClose73 = () => {
        setAnchorEl73(null);
    };
    const open73 = Boolean(anchorEl73);
    const id73 = open73 ? 'simple-popover' : undefined;
    //
    const [change74, setChange74] = useState(false);
    const [anchorEl74, setAnchorEl74] = useState(null);
    const handleClick74 = (event) => {
        setAnchorEl74(event.currentTarget);
    };
    const handleClose74 = () => {
        setAnchorEl74(null);
    };
    const open74 = Boolean(anchorEl74);
    const id74 = open74 ? 'simple-popover' : undefined;
    //
    const [change75, setChange75] = useState(false);
    const [anchorEl75, setAnchorEl75] = useState(null);
    const handleClick75 = (event) => {
        setAnchorEl75(event.currentTarget);
    };
    const handleClose75 = () => {
        setAnchorEl75(null);
    };
    const open75 = Boolean(anchorEl75);
    const id75 = open75 ? 'simple-popover' : undefined;
    //
    const [change76, setChange76] = useState(false);
    const [anchorEl76, setAnchorEl76] = useState(null);
    const handleClick76 = (event) => {
        setAnchorEl76(event.currentTarget);
    };
    const handleClose76 = () => {
        setAnchorEl76(null);
    };
    const open76 = Boolean(anchorEl76);
    const id76 = open76 ? 'simple-popover' : undefined;
    //
    const [change77, setChange77] = useState(false);
    const [anchorEl77, setAnchorEl77] = useState(null);
    const handleClick77 = (event) => {
        setAnchorEl77(event.currentTarget);
    };
    const handleClose77 = () => {
        setAnchorEl77(null);
    };
    const open77 = Boolean(anchorEl77);
    const id77 = open77 ? 'simple-popover' : undefined;
    //
    const [change78, setChange78] = useState(false);
    const [anchorEl78, setAnchorEl78] = useState(null);
    const handleClick78 = (event) => {
        setAnchorEl78(event.currentTarget);
    };
    const handleClose78 = () => {
        setAnchorEl78(null);
    };
    const open78 = Boolean(anchorEl78);
    const id78 = open78 ? 'simple-popover' : undefined;
    //
    const [anchorEl79, setAnchorEl79] = useState(null);
    const handleClick79 = (event) => {
        setAnchorEl79(event.currentTarget);
    };
    const handleClose79 = () => {
        setAnchorEl79(null);
    };
    const open79 = Boolean(anchorEl79);
    const id79 = open79 ? 'simple-popover' : undefined;
    //
    const [change80, setChange80] = useState(false);
    const [anchorEl80, setAnchorEl80] = useState(null);
    const handleClick80 = (event) => {
        setAnchorEl80(event.currentTarget);
    };
    const handleClose80 = () => {
        setAnchorEl80(null);
    };
    const open80 = Boolean(anchorEl80);
    const id80 = open80 ? 'simple-popover' : undefined;
    //
    const [change81, setChange81] = useState(false);
    const [anchorEl81, setAnchorEl81] = useState(null);
    const handleClick81 = (event) => {
        setAnchorEl81(event.currentTarget);
    };
    const handleClose81 = () => {
        setAnchorEl81(null);
    };
    const open81 = Boolean(anchorEl81);
    const id81 = open81 ? 'simple-popover' : undefined;
    //
    const [change82, setChange82] = useState(false);
    const [anchorEl82, setAnchorEl82] = useState(null);
    const handleClick82 = (event) => {
        setAnchorEl82(event.currentTarget);
    };
    const handleClose82 = () => {
        setAnchorEl82(null);
    };
    const open82 = Boolean(anchorEl82);
    const id82 = open82 ? 'simple-popover' : undefined;
    //
    const [change83, setChange83] = useState(false);
    const [anchorEl83, setAnchorEl83] = useState(null);
    const handleClick83 = (event) => {
        setAnchorEl83(event.currentTarget);
    };
    const handleClose83 = () => {
        setAnchorEl83(null);
    };
    const open83 = Boolean(anchorEl83);
    const id83 = open83 ? 'simple-popover' : undefined;
    //
    const [change84, setChange84] = useState(false);
    const [anchorEl84, setAnchorEl84] = useState(null);
    const handleClick84 = (event) => {
        setAnchorEl84(event.currentTarget);
    };
    const handleClose84 = () => {
        setAnchorEl84(null);
    };
    const open84 = Boolean(anchorEl84);
    const id84 = open84 ? 'simple-popover' : undefined;
    //
    const [change85, setChange85] = useState(false);
    const [anchorEl85, setAnchorEl85] = useState(null);
    const handleClick85 = (event) => {
        setAnchorEl85(event.currentTarget);
    };
    const handleClose85 = () => {
        setAnchorEl85(null);
    };
    const open85 = Boolean(anchorEl85);
    const id85 = open85 ? 'simple-popover' : undefined;
    //
    const [change86, setChange86] = useState(false);
    const [anchorEl86, setAnchorEl86] = useState(null);
    const handleClick86 = (event) => {
        setAnchorEl86(event.currentTarget);
    };
    const handleClose86 = () => {
        setAnchorEl86(null);
    };
    const open86 = Boolean(anchorEl86);
    const id86 = open86 ? 'simple-popover' : undefined;
    //
    const [change87, setChange87] = useState(false);
    const [anchorEl87, setAnchorEl87] = useState(null);
    const handleClick87 = (event) => {
        setAnchorEl87(event.currentTarget);
    };
    const handleClose87 = () => {
        setAnchorEl87(null);
    };
    const open87 = Boolean(anchorEl87);
    const id87 = open87 ? 'simple-popover' : undefined;
    //
    const [change88, setChange88] = useState(false);
    const [anchorEl88, setAnchorEl88] = useState(null);
    const handleClick88 = (event) => {
        setAnchorEl88(event.currentTarget);
    };
    const handleClose88 = () => {
        setAnchorEl88(null);
    };
    const open88 = Boolean(anchorEl88);
    const id88 = open88 ? 'simple-popover' : undefined;
    //
    const [change89, setChange89] = useState(false);
    const [anchorEl89, setAnchorEl89] = useState(null);
    const handleClick89 = (event) => {
        setAnchorEl89(event.currentTarget);
    };
    const handleClose89 = () => {
        setAnchorEl89(null);
    };
    const open89 = Boolean(anchorEl89);
    const id89 = open89 ? 'simple-popover' : undefined;
    //
    const [change90, setChange90] = useState(false);
    const [anchorEl90, setAnchorEl90] = useState(null);
    const handleClick90 = (event) => {
        setAnchorEl90(event.currentTarget);
    };
    const handleClose90 = () => {
        setAnchorEl90(null);
    };
    const open90 = Boolean(anchorEl90);
    const id90 = open90 ? 'simple-popover' : undefined;
    //
    const [change91, setChange91] = useState(false);
    const [anchorEl91, setAnchorEl91] = useState(null);
    const handleClick91 = (event) => {
        setAnchorEl91(event.currentTarget);
    };
    const handleClose91 = () => {
        setAnchorEl91(null);
    };
    const open91 = Boolean(anchorEl91);
    const id91 = open91 ? 'simple-popover' : undefined;
    //
    //
    const [change92, setChange92] = useState(false);
    const [anchorEl92, setAnchorEl92] = useState(null);
    const handleClick92 = (event) => {
        setAnchorEl92(event.currentTarget);
    };
    const handleClose92 = () => {
        setAnchorEl92(null);
    };
    const open92 = Boolean(anchorEl92);
    const id92 = open92 ? 'simple-popover' : undefined;
    //
    //
    const [change93, setChange93] = useState(false);
    const [anchorEl93, setAnchorEl93] = useState(null);
    const handleClick93 = (event) => {
        setAnchorEl93(event.currentTarget);
    };
    const handleClose93 = () => {
        setAnchorEl93(null);
    };
    const open93 = Boolean(anchorEl93);
    const id93 = open93 ? 'simple-popover' : undefined;
    //
    //
    const [change94, setChange94] = useState(false);
    const [anchorEl94, setAnchorEl94] = useState(null);
    const handleClick94 = (event) => {
        setAnchorEl94(event.currentTarget);
    };
    const handleClose94 = () => {
        setAnchorEl94(null);
    };
    const open94 = Boolean(anchorEl94);
    const id94 = open94 ? 'simple-popover' : undefined;
    //
    //
    const [change95, setChange95] = useState(false);
    const [anchorEl95, setAnchorEl95] = useState(null);
    const handleClick95 = (event) => {
        setAnchorEl95(event.currentTarget);
    };
    const handleClose95 = () => {
        setAnchorEl95(null);
    };
    const open95 = Boolean(anchorEl95);
    const id95 = open95 ? 'simple-popover' : undefined;
    //
    //
    const [change96, setChange96] = useState(false);
    const [anchorEl96, setAnchorEl96] = useState(null);
    const handleClick96 = (event) => {
        setAnchorEl96(event.currentTarget);
    };
    const handleClose96 = () => {
        setAnchorEl96(null);
    };
    const open96 = Boolean(anchorEl96);
    const id96 = open96 ? 'simple-popover' : undefined;
    //
    //
    const [change97, setChange97] = useState(false);
    const [anchorEl97, setAnchorEl97] = useState(null);
    const handleClick97 = (event) => {
        setAnchorEl97(event.currentTarget);
    };
    const handleClose97 = () => {
        setAnchorEl97(null);
    };
    const open97 = Boolean(anchorEl97);
    const id97 = open97 ? 'simple-popover' : undefined;
    //
    //
    const [change98, setChange98] = useState(false);
    const [anchorEl98, setAnchorEl98] = useState(null);
    const handleClick98 = (event) => {
        setAnchorEl98(event.currentTarget);
    };
    const handleClose98 = () => {
        setAnchorEl98(null);
    };
    const open98 = Boolean(anchorEl98);
    const id98 = open98 ? 'simple-popover' : undefined;
    //
    //
    const [change99, setChange99] = useState(false);
    const [anchorEl99, setAnchorEl99] = useState(null);
    const handleClick99 = (event) => {
        setAnchorEl99(event.currentTarget);
    };
    const handleClose99 = () => {
        setAnchorEl99(null);
    };
    const open99 = Boolean(anchorEl99);
    const id99 = open99 ? 'simple-popover' : undefined;
    //
    //
    const [change100, setChange100] = useState(false);
    const [anchorEl100, setAnchorEl100] = useState(null);
    const handleClick100 = (event) => {
        setAnchorEl100(event.currentTarget);
    };
    const handleClose100 = () => {
        setAnchorEl100(null);
    };
    const open100 = Boolean(anchorEl100);
    const id100 = open100 ? 'simple-popover' : undefined;
    //
    //
    const [change101, setChange101] = useState(false);
    const [anchorEl101, setAnchorEl101] = useState(null);
    const handleClick101 = (event) => {
        setAnchorEl101(event.currentTarget);
    };
    const handleClose101 = () => {
        setAnchorEl101(null);
    };
    const open101 = Boolean(anchorEl101);
    const id101 = open101 ? 'simple-popover' : undefined;
    //

    //

    return (
        <div className='row'>
            <div className="history-main-header d-flex justify-content-between mb-2">
                <div>
                    <h6>Neurological</h6>
                </div>
                <div>
                    <img src={clinic8} alt="" className="img-fluid" />
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

                                                    }
                                                    }
                                                    id="togBtn"
                                                />
                                                <div className="slider round"></div>

                                            </label>
                                        </div>
                                    </div>
                                </li>)
                                :
                                <i style={{ fontSize: "26px", marginLeft: "40%" }} className="fas fa-spinner fa-spin"></i>
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

                <h6 className="mt-2">Vertigo</h6>
                <div className="exam-bg-white p-1 mt-2">
                    <div className="d-flex justify-content-between">
                        <p className="w-75">Intermittent</p>
                        <div className="ms-1">
                            <label className="switch me-1">
                                <input
                                    name="Jaundiced"
                                    value="Jaundiced"
                                    type="checkbox"
                                    onChange={(e) => { setChange(!change); setIntermittent("") }}
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
                                    >

                                        <div className="left-popup">
                                            {
                                                intermittentArray.length > 0 &&
                                                intermittentArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                    <input className="form-check-input" value={item.name} type="radio" name="cough1" onChange={(e) => { setIntermittent(e.target.value) }} id="flexRadioDefault1" />
                                                    <label className="form-check-label" >
                                                        {item.name}
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
                        <p>{intermittent}</p>
                    </div>
                </div>
                <div className="exam-bg-white p-1 mt-2">
                    <div className="d-flex justify-content-between">
                        <p className="w-75">Continuous</p>
                        <div className="ms-1">
                            <label className="switch me-1">
                                <input
                                    name="Jaundiced"
                                    value="Jaundiced"
                                    type="checkbox"
                                    onChange={(e) => { setChange1(!change1); setContinuous("") }}
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
                                    >

                                        <div className="left-popup">
                                            {
                                                continuousArray.length > 0 &&
                                                continuousArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                    <input className="form-check-input" value={item.Continuous_name} type="radio" name="cough1" onChange={(e) => { setContinuous(e.target.value) }} id="flexRadioDefault1" />
                                                    <label className="form-check-label" >
                                                        {item.Continuous_name}
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
                        <p>{continuous}</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-10 col-9">
                <div className="history-main-header mb-2">
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Examination Search"
                            className="form-control form-control-sm w-75"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    window.find(e.target.value);
                                }
                            }}
                        />
                        <div className="w-50">
                            <button onClick={() => setsaveLoading(false)} className="vaital-setup-btn-cancel float-end">Reset</button>
                            {
                                saveLoading ?
                                    <button className="vaital-setup-btn float-end me-2"><i className="fas fa-check-circle"></i></button>
                                    :
                                    <button onClick={saveNurologicalData} className="vaital-setup-btn float-end me-2">Save</button>
                            }
                        </div>
                    </div>
                </div>
                <div className="cns-container">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab-neu" data-bs-toggle="pill" data-bs-target="#pills-home-neu" type="button" role="tab" aria-controls="pills-home" aria-selected="true">CNS</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab-neu" data-bs-toggle="pill" data-bs-target="#pills-profile-neu" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">UPPER LIMB</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab-neu1" data-bs-toggle="pill" data-bs-target="#pills-profile-neu1" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">LOWER LIMB</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home-neu" role="tabpanel" aria-labelledby="pills-home-tab">
                            <div className="row">
                                <h6 className="mt-2">Speech</h6>
                                {
                                    speechArray.length > 0 ?
                                        speechArray.map((item, i) => <div key={i} className="col-4 mt-2">
                                            <div className="exam-bg-white p-1">
                                                <div className="d-flex justify-content-between">
                                                    <p className="w-75">{item.SpeechNurologies_name}</p>
                                                    <div className="ms-1">
                                                        <label className="switch me-1">
                                                            <input
                                                                value={item.SpeechNurologies_name}
                                                                type="checkbox"
                                                                onChange={(e) => {
                                                                    const { checked, value } = e.target;
                                                                    if (checked) {
                                                                        setSpeechValue([...speechValue, value])
                                                                    } else {
                                                                        const dataNe = speechValue.filter(item => item !== value)
                                                                        setSpeechValue(dataNe)
                                                                    }
                                                                }}
                                                                id="togBtn"
                                                            />
                                                            <div className="slider round"></div>

                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)

                                        :

                                        <div className="exam-bg-white p-1">
                                            <div className="d-flex justify-content-between">
                                                <p className="w-75">
                                                    <i style={{ fontSize: "26px", marginLeft: "40%" }} className="fas fa-spinner fa-spin"></i>
                                                </p>
                                            </div>
                                        </div>

                                }
                            </div>
                            <div className="row">
                                <h6 className="mt-2">Higher centre dysfunction</h6>
                                <div className="col-4">
                                    <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Parietal Lobe</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange2(!change2); setParietal([]) }}
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
                                                        >

                                                            <div className="left-popup">
                                                                {
                                                                    parietalAray.length > 0 &&
                                                                    parietalAray.map((item, i) => <div key={i} className="form-check ms-1">
                                                                        <input className="form-check-input" value={item.ParietalLobe_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            if (checked) {
                                                                                setParietal([...parietal, value])
                                                                            } else {
                                                                                const dataNe = parietal.filter(item => item !== value)
                                                                                setParietal(dataNe)
                                                                            }
                                                                        }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.ParietalLobe_name}
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
                                            {
                                                Object.keys(parietal).map((item, i) => <p key={i}>{parietal[item]}</p>)
                                            }
                                        </div>
                                    </div>
                                    <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Occipital Lobe</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange3(!change3); setOccipital([]) }}
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
                                                        >

                                                            <div className="left-popup">
                                                                {
                                                                    occipitalAray.length > 0 &&
                                                                    occipitalAray.map((item, i) => <div key={i} className="form-check ms-1">
                                                                        <input className="form-check-input" value={item.OccipitalLobe_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            if (checked) {
                                                                                setOccipital([...occipital, value])
                                                                            } else {
                                                                                const dataNe = occipital.filter(item => item !== value)
                                                                                setOccipital(dataNe)
                                                                            }
                                                                        }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.OccipitalLobe_name}
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
                                            {
                                                Object.keys(occipital).map((item, i) => <p key={i}>{occipital[item]}</p>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Frontal Lobe</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange4(!change4); setFrontal([]) }}
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
                                                        >

                                                            <div className="left-popup">
                                                                {
                                                                    frontallAray.length > 0 &&
                                                                    frontallAray.map((item, i) => <div key={i} className="form-check ms-1">
                                                                        <input className="form-check-input" value={item.FrontalLobe_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            if (checked) {
                                                                                setFrontal([...frontal, value])
                                                                            } else {
                                                                                const dataNe = frontal.filter(item => item !== value)
                                                                                setFrontal(dataNe)
                                                                            }
                                                                        }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.FrontalLobe_name}
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
                                            {
                                                Object.keys(frontal).map((item, i) => <p key={i}>{frontal[item]}</p>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Temporal Lobe</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange5(!change5); setTemporal([]) }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl5(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change5 &&
                                                        <Popover
                                                            className='mt-2'
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
                                                                horizontal: 'right',
                                                            }}
                                                        >

                                                            <div className="left-popup">
                                                                {
                                                                    temporalAray.length > 0 &&
                                                                    temporalAray.map((item, i) => <div key={i} className="form-check ms-1">
                                                                        <input className="form-check-input" value={item.TemporalLobe_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            if (checked) {
                                                                                setTemporal([...temporal, value])
                                                                            } else {
                                                                                const dataNe = temporal.filter(item => item !== value)
                                                                                setTemporal(dataNe)
                                                                            }
                                                                        }} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.TemporalLobe_name}
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
                                            {
                                                Object.keys(temporal).map((item, i) => <p key={i}>{temporal[item]}</p>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile-neu" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className="row">
                                <div className="col-4">
                                    <div className='he-history p-1'>
                                        <h6>UPPER LIMB</h6>
                                        <ul className={`g-doc-scroll ${historyShowAll1 ? "full-height" : "half-height"}`}>
                                            {
                                                upperLimb.map((item, i) => <li>
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p>{item.UpperLimb_name}</p>
                                                        <div className="ms-1">
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.UpperLimb_name} onChange={(e) => setLimbValue(e)} id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </li>)
                                            }
                                        </ul>
                                        {
                                            !historyShowAll1 ?
                                                <span onClick={() => setHistoryShowAll1(!historyShowAll1)} className="history-see-all">Show All <i className="ms-1 far fa-angle-down"></i></span>
                                                :
                                                <span onClick={() => setHistoryShowAll1(!historyShowAll1)} className="history-see-all">Show Less <i className="ms-1 far fa-angle-up"></i></span>
                                        }
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="exam-bg-white">
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Power</p>

                                                <div className="ms-1">
                                                    <label className="switch me-1">
                                                        <input
                                                            name="Jaundiced"
                                                            value="Jaundiced"
                                                            type="checkbox"
                                                            onChange={(e) => { setChange8(!change8); setPower([]) }}
                                                            id="togBtn"
                                                        />
                                                        <div onClick={(e) => setAnchorEl8(e.currentTarget)} className="slider round"></div>
                                                        {
                                                            change8 &&
                                                            <Popover
                                                                className='mt-2'
                                                                id={id8}
                                                                open={open8}
                                                                anchorEl={anchorEl8}
                                                                onClose={() => setAnchorEl8(null)}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'left',
                                                                }}
                                                            >

                                                                <div className="left-popup">
                                                                    {
                                                                        powerArray.length > 0 &&
                                                                        powerArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.Power_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                if (checked) {
                                                                                    setPower([...power, value])
                                                                                } else {
                                                                                    const dataNe = power.filter(item => item !== value)
                                                                                    setPower(dataNe)
                                                                                }
                                                                            }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.Power_name}
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
                                                {Object.keys(power).map(key =>
                                                    <p className='me-2'>{power[key]}</p>

                                                )
                                                }
                                            </div>
                                        </div>
                                        <div className="exam-bg-white mb-1">
                                            <span className='cns-power-name' onClick={handleClick53}>Power Left <i className="ms-1 float-end me-2 far fa-angle-right"></i></span>
                                            <span className='cns-power-name' onClick={handleClick51}>Power Right <i className="ms-1 float-end me-2  far fa-angle-right"></i></span>
                                            <span className='cns-power-name' onClick={handleClick61}>Reflexes <i className="ms-1 float-end me-2  far fa-angle-right"></i></span>
                                            <Popover
                                                id={id53}
                                                open={open53}
                                                anchorEl={anchorEl53}
                                                onClose={handleClose53}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="p-2">
                                                    <p className='cns-power-name' onClick={handleClick52}>Shoulder <i className="ms-1 float-end me-2 far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{shoulder1} {shoulder2 && "| "} {shoulder2}</span>
                                                    <p className='cns-power-name' onClick={handleClick54}>Elbow <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{elbow1} {elbow2 && "| "} {elbow2}</span>
                                                    <p className='cns-power-name' onClick={handleClick55}>Wrist <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{wrist1} {wrist2 && "| "} {wrist2}</span>
                                                    <p className='cns-power-name' onClick={handleClick56}>Fingers <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{fingerSide && `${fingerSide.join(' . ')} | `}{fingerNth && `${fingerNth.join(' , ')} | `}{fingerFlexion} {fingerExtension && "| "} {fingerExtension} {fingerAbduction && " | "} {fingerAbduction} {fingerAdduction && " | "}  {fingerAdduction}</span>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id52}
                                                open={open52}
                                                anchorEl={anchorEl52}
                                                onClose={handleClose52}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Sholder</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setShoulder1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />

                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setShoulder2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id54}
                                                open={open54}
                                                anchorEl={anchorEl54}
                                                onClose={handleClose54}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Elbow</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setElbow1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setElbow2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id55}
                                                open={open55}
                                                anchorEl={anchorEl55}
                                                onClose={handleClose55}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Wrist</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Flexion</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setWrist1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Extension</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setWrist2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id56}
                                                open={open56}
                                                anchorEl={anchorEl56}
                                                onClose={handleClose56}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Fingers</span>
                                                    <hr />
                                                    <div>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerSide([...fingerSide, value])
                                                            } else {
                                                                const rv = fingerSide.filter((item) => item !== value)
                                                                setFingerSide(rv)
                                                            }
                                                        }} value="Left" name="finger" className='me-1' />
                                                        <label className='me-1'> Left</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerSide([...fingerSide, value])
                                                            } else {
                                                                const rv = fingerSide.filter((item) => item !== value)
                                                                setFingerSide(rv)
                                                            }
                                                        }} value="Right" name="finger" className='me-1' />
                                                        <label className='me-1'> Right</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth([...fingerNth, value])
                                                            } else {
                                                                const rv = fingerNth.filter((item) => item !== value)
                                                                setFingerNth(rv)
                                                            }
                                                        }} value="1st" name="finger-nth" className='me-1' />
                                                        <label className='me-1'> 1st</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth([...fingerNth, value])
                                                            } else {
                                                                const rv = fingerNth.filter((item) => item !== value)
                                                                setFingerNth(rv)
                                                            }
                                                        }} value="2nd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>2nd</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth([...fingerNth, value])
                                                            } else {
                                                                const rv = fingerNth.filter((item) => item !== value)
                                                                setFingerNth(rv)
                                                            }
                                                        }} value="3rd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>3rd</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth([...fingerNth, value])
                                                            } else {
                                                                const rv = fingerNth.filter((item) => item !== value)
                                                                setFingerNth(rv)
                                                            }
                                                        }} value="4th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>4th</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth([...fingerNth, value])
                                                            } else {
                                                                const rv = fingerNth.filter((item) => item !== value)
                                                                setFingerNth(rv)
                                                            }
                                                        }} value="5th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>5th</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Flexion</p>

                                                                    <hr />

                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setFingerFlexion(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Extension</p>
                                                                    <  hr style={{ width: "100%" }} />

                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setFingerExtension(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Abduction</p>
                                                                    <hr />
                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement3" onChange={(e) => setFingerAbduction(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Adduction</p>
                                                                    <  hr style={{ width: "100%" }} />
                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement4" onChange={(e) => setFingerAdduction(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id51}
                                                open={open51}
                                                anchorEl={anchorEl51}
                                                onClose={handleClose51}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="p-2">
                                                    <p className='cns-power-name' onClick={handleClick57}>Shoulder <i className="ms-1 float-end me-2 far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{shoulder_right1} {shoulder_right2 && "| "} {shoulder_right2}</span>
                                                    <p className='cns-power-name' onClick={handleClick58}>Elbow <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{elbow_right1} {elbow_right2 && "| "} {elbow_right2}</span>
                                                    <p className='cns-power-name' onClick={handleClick59}>Wrist <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{wrist_right1} {wrist_right2 && "| "} {wrist_right2}</span>
                                                    <p className='cns-power-name' onClick={handleClick60}>Fingers <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{fingerSide1 && `${fingerSide1.join(' , ')} | `} {fingerNth1 && `${fingerNth1.join(' , ')} | `}{fingerFlexion1} {fingerExtension1 && "| "} {fingerExtension1} {fingerAbduction1 && " | "} {fingerAbduction1} {fingerAdduction1 && " | "}  {fingerAdduction1}</span>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id57}
                                                open={open57}
                                                anchorEl={anchorEl57}
                                                onClose={handleClose57}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Sholder</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />

                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setShoulder_right1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />

                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setShoulder_right2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id58}
                                                open={open58}
                                                anchorEl={anchorEl58}
                                                onClose={handleClose58}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Elbow</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setElbow_right1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setElbow_right2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id59}
                                                open={open59}
                                                anchorEl={anchorEl59}
                                                onClose={handleClose59}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Wrist</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Flexion</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setWrist_right1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Extension</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setWrist_right2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id60}
                                                open={open60}
                                                anchorEl={anchorEl60}
                                                onClose={handleClose60}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Fingers</span>
                                                    <hr />
                                                    <div>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerSide1([...fingerSide1, value])
                                                            } else {
                                                                const rv = fingerSide1.filter((item) => item !== value)
                                                                setFingerSide1(rv)
                                                            }
                                                        }} value="Left" name="finger" className='me-1' />
                                                        <label className='me-1'> Left</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerSide1([...fingerSide1, value])
                                                            } else {
                                                                const rv = fingerSide1.filter((item) => item !== value)
                                                                setFingerSide1(rv)
                                                            }
                                                        }} value="Right" name="finger" className='me-1' />
                                                        <label className='me-1'> Right</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth1([...fingerNth1, value])
                                                            } else {
                                                                const rv = fingerNth1.filter((item) => item !== value)
                                                                setFingerNth1(rv)
                                                            }
                                                        }} value="1st" name="finger-nth" className='me-1' />
                                                        <label className='me-1'> 1st</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth1([...fingerNth1, value])
                                                            } else {
                                                                const rv = fingerNth1.filter((item) => item !== value)
                                                                setFingerNth1(rv)
                                                            }
                                                        }} value="2nd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>2nd</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth1([...fingerNth1, value])
                                                            } else {
                                                                const rv = fingerNth1.filter((item) => item !== value)
                                                                setFingerNth1(rv)
                                                            }
                                                        }} value="3rd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>3rd</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth1([...fingerNth1, value])
                                                            } else {
                                                                const rv = fingerNth1.filter((item) => item !== value)
                                                                setFingerNth1(rv)
                                                            }
                                                        }} value="4th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>4th</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth1([...fingerNth1, value])
                                                            } else {
                                                                const rv = fingerNth1.filter((item) => item !== value)
                                                                setFingerNth1(rv)
                                                            }
                                                        }} value="5th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>5th</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Flexion</p>
                                                                    <hr />
                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setFingerFlexion1(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }


                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Extension</p>
                                                                    <  hr style={{ width: "100%" }} />

                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setFingerExtension1(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Abduction</p>
                                                                    <hr />
                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement3" onChange={(e) => setFingerAbduction1(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Adduction</p>
                                                                    <  hr style={{ width: "100%" }} />
                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement4" onChange={(e) => setFingerAdduction1(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id61}
                                                open={open61}
                                                anchorEl={anchorEl61}
                                                onClose={handleClose61}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="p-2">
                                                    <p className='cns-power-name' onClick={handleClick62}>Shoulder <i className="ms-1 float-end me-2 far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{shoulder_reflexes1} {shoulder_reflexes2 && "| "} {shoulder_reflexes2}</span>
                                                    <p className='cns-power-name' onClick={handleClick63}>Elbow <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{elbow_reflexes1} {elbow_reflexes2 && "| "} {elbow_reflexes2}</span>
                                                    <p className='cns-power-name' onClick={handleClick64}>Wrist <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{wrist_reflexes1} {wrist_reflexes2 && "| "} {wrist_reflexes2}</span>
                                                    <p className='cns-power-name' onClick={handleClick65}>Fingers <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{fingerSide2 && `${fingerSide2.join(' , ')} | `}{fingerNth2 && `${fingerNth2.join(' , ')} | `} {fingerFlexion2} {fingerExtension2 && "| "} {fingerExtension2} {fingerAbduction2 && " | "} {fingerAbduction2} {fingerAdduction2 && " | "}  {fingerAdduction2}</span>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id62}
                                                open={open62}
                                                anchorEl={anchorEl62}
                                                onClose={handleClose62}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Sholder</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setShoulder_reflexes1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />

                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setShoulder_reflexes2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id63}
                                                open={open63}
                                                anchorEl={anchorEl63}
                                                onClose={handleClose63}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Elbow</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setElbow_reflexes1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setElbow_reflexes2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id64}
                                                open={open64}
                                                anchorEl={anchorEl64}
                                                onClose={handleClose64}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Wrist</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Flexion</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setWrist_reflexes1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Extension</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setWrist_reflexes2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id65}
                                                open={open65}
                                                anchorEl={anchorEl65}
                                                onClose={handleClose65}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Fingers</span>
                                                    <hr />
                                                    <div>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerSide2([...fingerSide2, value])
                                                            } else {
                                                                const rv = fingerSide2.filter((item) => item !== value)
                                                                setFingerSide2(rv)
                                                            }
                                                        }} value="Left" name="finger" className='me-1' />
                                                        <label className='me-1'> Left</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerSide2([...fingerSide2, value])
                                                            } else {
                                                                const rv = fingerSide2.filter((item) => item !== value)
                                                                setFingerSide2(rv)
                                                            }
                                                        }} value="Right" name="finger" className='me-1' />
                                                        <label className='me-1'> Right</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth2([...fingerNth2, value])
                                                            } else {
                                                                const rv = fingerNth2.filter((item) => item !== value)
                                                                setFingerNth2(rv)
                                                            }
                                                        }} value="1st" name="finger-nth" className='me-1' />
                                                        <label className='me-1'> 1st</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth2([...fingerNth2, value])
                                                            } else {
                                                                const rv = fingerNth2.filter((item) => item !== value)
                                                                setFingerNth2(rv)
                                                            }
                                                        }} value="2nd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>2nd</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth2([...fingerNth2, value])
                                                            } else {
                                                                const rv = fingerNth2.filter((item) => item !== value)
                                                                setFingerNth2(rv)
                                                            }
                                                        }} value="3rd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>3rd</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth2([...fingerNth2, value])
                                                            } else {
                                                                const rv = fingerNth2.filter((item) => item !== value)
                                                                setFingerNth2(rv)
                                                            }
                                                        }} value="4th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>4th</label>
                                                        <input type="checkbox" onChange={(e) => {
                                                            let { checked, value } = e.target
                                                            if (checked) {
                                                                setFingerNth2([...fingerNth2, value])
                                                            } else {
                                                                const rv = fingerNth2.filter((item) => item !== value)
                                                                setFingerNth2(rv)
                                                            }
                                                        }} value="5th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>5th</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Flexion</p>
                                                                    <hr />
                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setFingerFlexion2(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Extension</p>
                                                                    <  hr style={{ width: "100%" }} />

                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setFingerExtension2(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Abduction</p>
                                                                    <hr />
                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement3" onChange={(e) => setFingerAbduction2(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Adduction</p>
                                                                    <  hr style={{ width: "100%" }} />
                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement4" onChange={(e) => setFingerAdduction2(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Biceps Jerk (C5,C6)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange35(!change35); setBiceps(""); setBicepsRight(""); }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick35} className="slider round"></div>
                                                    {
                                                        change35 &&
                                                        <Popover
                                                            id={id35}
                                                            open={open35}
                                                            anchorEl={anchorEl35}
                                                            onClose={handleClose35}
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
                                                                    <div className="col-6 p-1">
                                                                        <span style={{ fontWeight: 500 }}>Left</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setBiceps(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
                                                                                        </label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Right</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setBicepsRight(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
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
                                                <div className="">
                                                    <p>{biceps && "Left : "}{biceps}</p>
                                                    <p>{bicepsRight && "Right : "}{bicepsRight}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Triceps Jesk (C7-C8)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange36(!change36); setTriceps(""); setTricepsRight("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick36} className="slider round"></div>
                                                    {
                                                        change36 &&
                                                        <Popover
                                                            id={id36}
                                                            open={open36}
                                                            anchorEl={anchorEl36}
                                                            onClose={handleClose36}
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
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Left</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setTriceps(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
                                                                                        </label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Right</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setTricepsRight(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
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
                                                <p>{triceps && "Left : "}{triceps}</p>
                                                <p>{tricepsRight && "Right : "}{tricepsRight}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Brachioradialis Jesk (C5,C6)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange37(!change37); setJesk(""); setJeskRight("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick37} className="slider round"></div>
                                                    {
                                                        change37 &&
                                                        <Popover
                                                            id={id37}
                                                            open={open37}
                                                            anchorEl={anchorEl37}
                                                            onClose={handleClose37}
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
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Left</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setJesk(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
                                                                                        </label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Right</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setJeskRight(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
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
                                                <p>{jesk && "Left : "}{jesk}</p>
                                                <p>{jeskRight && "Right : "}{jeskRight}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Finger Jerks (C8)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange38(!change38); setFinger(""); setFingerRight("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick38} className="slider round"></div>
                                                    {
                                                        change38 &&
                                                        <Popover
                                                            id={id38}
                                                            open={open38}
                                                            anchorEl={anchorEl38}
                                                            onClose={handleClose38}
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
                                                                    <div className="col-6 p-1">
                                                                        <span style={{ fontWeight: 500 }}>Left</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setFinger(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
                                                                                        </label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="col-6 p-1">
                                                                        <span style={{ fontWeight: 500 }}>Right</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setFingerRight(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
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
                                                <p>{finger && "Left : "}{finger}</p>
                                                <p>{fingerRight && "Right : "}{fingerRight}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Finger nose test</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange39(!change39); setFingerTest("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick39} className="slider round"></div>
                                                    {
                                                        change39 &&
                                                        <Popover
                                                            id={id39}
                                                            open={open39}
                                                            anchorEl={anchorEl39}
                                                            onClose={handleClose39}
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
                                                                {
                                                                    FingerNoseTestArray.length > 0 &&
                                                                    FingerNoseTestArray.map((item, i) => {
                                                                        return (
                                                                            <div className="form-check ms-1">
                                                                                <input className="form-check-input" value={item.FingerNoseTest_name} type="radio" name="movement" onChange={(e) => setFingerTest(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {item.FingerNoseTest_name}
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
                                                <p>{fingerTest}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="exam-bg-white">
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Dysdiadochokinesis</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange40(!change40); setDysdiadochokinesis("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick40} className="slider round"></div>
                                                    {
                                                        change40 &&
                                                        <Popover
                                                            id={id40}
                                                            open={open40}
                                                            anchorEl={anchorEl40}
                                                            onClose={handleClose40}
                                                            anchorOrigin={{
                                                                vertical: 'center',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setDysdiadochokinesis(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Slow and Clumsy" type="radio" name="movement" onChange={(e) => setDysdiadochokinesis(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Slow and Clumsy
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{dysdiadochokinesis}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Temperature Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange41(!change41); setTemparature("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick41} className="slider round"></div>
                                                    {
                                                        change41 &&
                                                        <Popover
                                                            id={id41}
                                                            open={open41}
                                                            anchorEl={anchorEl41}
                                                            onClose={handleClose41}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setTemparature(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Decreased" type="radio" name="movement" onChange={(e) => setTemparature(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Decreased
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{temparature}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Vibration Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange42(!change42); setVibration("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick42} className="slider round"></div>
                                                    {
                                                        change42 &&
                                                        <Popover
                                                            id={id42}
                                                            open={open42}
                                                            anchorEl={anchorEl42}
                                                            onClose={handleClose42}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setVibration(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Decreased" type="radio" name="movement" onChange={(e) => setVibration(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Decreased
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{vibration}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Proprioception Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange43(!change43); setProprioception("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick43} className="slider round"></div>
                                                    {
                                                        change43 &&
                                                        <Popover
                                                            id={id43}
                                                            open={open43}
                                                            anchorEl={anchorEl43}
                                                            onClose={handleClose43}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setProprioception(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Abnormal" type="radio" name="movement" onChange={(e) => setProprioception(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Abnormal
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{proprioception}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Pin Prick Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange44(!change44); setPin("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick44} className="slider round"></div>
                                                    {
                                                        change44 &&
                                                        <Popover
                                                            id={id44}
                                                            open={open44}
                                                            anchorEl={anchorEl44}
                                                            onClose={handleClose44}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setPin(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Decreased" type="radio" name="movement" onChange={(e) => setPin(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Decreased
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{pin}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Light Touch Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange45(!change45); setLight1("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick45} className="slider round"></div>
                                                    {
                                                        change45 &&
                                                        <Popover
                                                            id={id45}
                                                            open={open45}
                                                            anchorEl={anchorEl45}
                                                            onClose={handleClose45}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setLight1(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Decreased" type="radio" name="movement" onChange={(e) => setLight1(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Decreased
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{light1}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Picture upper limb dermatomes</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange46(!change46); setPeripheralUpper(""); setPeripheral(""); setpictureUperLimbValue([]) }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick46} className="slider round"></div>
                                                    {
                                                        change46 &&
                                                        <Popover
                                                            id={id46}
                                                            open={open46}
                                                            anchorEl={anchorEl46}
                                                            onClose={handleClose46}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div style={{ width: "290px" }} >

                                                                <img src={uperLimbImg} className="w-100" alt="..." />

                                                                <div className="row">
                                                                    <div className="col-3">
                                                                        <div className="form-check ms-1">
                                                                            <input className="form-check-input" value="Left" type="radio" name="movement1" onChange={(e) => setPeripheral(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label ms-1" >
                                                                                Left
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check ms-1">
                                                                            <input className="form-check-input" value="Right" type="radio" name="movement1" onChange={(e) => setPeripheral(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label ms-1" >
                                                                                Right
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        {
                                                                            pictureUpperLimbArray.length > 0 &&
                                                                            pictureUpperLimbArray.map((item, i) => {
                                                                                return (
                                                                                    <div key={i} className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.PULimbDermatomes_name} type="radio" name="movement" onChange={(e) => setPeripheralUpper(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label ms-1" >
                                                                                            {item.PULimbDermatomes_name}
                                                                                        </label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }

                                                                    </div>

                                                                    <div className="col-4">
                                                                        <div className="row">
                                                                            <div className="col-6">
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c1" type="checkbox" name="c" onChange={(e) => handlePictureUpperValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c1
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c2" type="checkbox" name="c" onChange={(e) => handlePictureUpperValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c2
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c3" type="checkbox" name="c" onChange={(e) => handlePictureUpperValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c3
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c4" type="checkbox" name="c" onChange={(e) => handlePictureUpperValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c4
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c5" type="checkbox" name="c" onChange={(e) => handlePictureUpperValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c5
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c6" type="checkbox" name="c" onChange={(e) => handlePictureUpperValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c6
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c7" type="checkbox" name="c" onChange={(e) => handlePictureUpperValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c7
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c8" type="checkbox" name="c" onChange={(e) => handlePictureUpperValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c8
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                    </div>



                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{peripheral} {peripheralUpper && "|"} {peripheralUpper} {peripheralUpper && "| "}
                                                    {Object.keys(pictureUperLimbValue).map(key =>
                                                        `${pictureUperLimbValue[key]} `

                                                    )
                                                    }
                                                </p>

                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>The Radial Nerve (C5-C8)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange47(!change47); setRedial("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick47} className="slider round"></div>
                                                    {
                                                        change47 &&
                                                        <Popover
                                                            id={id47}
                                                            open={open47}
                                                            anchorEl={anchorEl47}
                                                            onClose={handleClose47}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="cns-eye-popup">
                                                                {
                                                                    TheRadialNerveArray.length > 0 &&
                                                                    TheRadialNerveArray.map((v, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check ms-1">
                                                                                <input className="form-check-input" value={v.TheRadialNerve_name} type="radio" name="movement" onChange={(e) => setRedial(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {v.TheRadialNerve_name}
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
                                                <p>{redial}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>The Ulnar Nerve (C8-T1)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange48(!change48); setUlnar("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick48} className="slider round"></div>
                                                    {
                                                        change48 &&
                                                        <Popover
                                                            id={id48}
                                                            open={open48}
                                                            anchorEl={anchorEl48}
                                                            onClose={handleClose48}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="cns-eye-popup">
                                                                <p className='mt-2 ml-2'>Normal/wasting small muscle hand patial clawing little and ring finger froment's singn</p>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Positive" type="radio" name="movement" onChange={(e) => setUlnar(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Positive
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Negative" type="radio" name="movement" onChange={(e) => setUlnar(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Negative
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{ulnar}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>The Median Nerve (C6-T1)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange49(!change49); setMedian("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick49} className="slider round"></div>
                                                    {
                                                        change49 &&
                                                        <Popover
                                                            id={id49}
                                                            open={open49}
                                                            anchorEl={anchorEl49}
                                                            onClose={handleClose49}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="cns-eye-popup">
                                                                <p>Carpel tunnel syndrome</p>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Positive" type="radio" name="movement" onChange={(e) => setMedian(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Positive
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Negative" type="radio" name="movement" onChange={(e) => setMedian(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Negative
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{median}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Lesion at cubital fossa: Ochsner’s clasping test</p>
                                                <div className="ms-1">
                                                    <label className="switch me-1">
                                                        <input onChange={() => { setChange50(!change50); setLesion("") }} type="checkbox" id="togBtn" />
                                                        <div onClick={handleClick50} className="slider round"></div>
                                                        {
                                                            change50 &&
                                                            <Popover
                                                                id={id50}
                                                                open={open50}
                                                                anchorEl={anchorEl50}
                                                                onClose={handleClose50}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'right',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'right',
                                                                }}
                                                            >
                                                                <div className="cns-eye-popup">
                                                                    <div className="form-check ms-1">
                                                                        <input className="form-check-input" value="Positive" type="radio" name="movement" onChange={(e) => setLesion(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            Positive
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check ms-1">
                                                                        <input className="form-check-input" value="Negative" type="radio" name="movement" onChange={(e) => setLesion(e.target.value)} id="flexRadioDefault1" />
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
                                                <p>{lesion}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile-neu1" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className="row">
                                <div className="col-4">
                                    <div className='he-history p-1'>
                                        <h6>LOWER LIMB</h6>
                                        <ul className={`g-doc-scroll ${historyShowAll1 ? "full-height" : "half-height"}`}>
                                            {
                                                upperLimb.map((item, i) => <li>
                                                    <div key={i} className='d-flex justify-content-between'>
                                                        <p>{item.UpperLimb_name}</p>
                                                        <div className="ms-1">
                                                            <label className="switch me-1">
                                                                <input type="checkbox" name={item.id} value={item.UpperLimb_name} onChange={(e) => setLimbValueLower(e)} id="togBtn" />
                                                                <div className="slider round"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </li>)
                                            }
                                        </ul>
                                        {
                                            !historyShowAll1 ?
                                                <span onClick={() => setHistoryShowAll1(!historyShowAll1)} className="history-see-all">Show All <i className="ms-1 far fa-angle-down"></i></span>
                                                :
                                                <span onClick={() => setHistoryShowAll1(!historyShowAll1)} className="history-see-all">Show Less <i className="ms-1 far fa-angle-up"></i></span>
                                        }
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="exam-bg-white">
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Power</p>
                                                <div className="ms-1">
                                                    <label className="switch me-1">
                                                        <input
                                                            name="Jaundiced"
                                                            value="Jaundiced"
                                                            type="checkbox"
                                                            onChange={(e) => { setChangePOW8(!changePOW8); setlowerLimbPower([]) }}
                                                            id="togBtn"
                                                        />
                                                        <div onClick={(e) => setAnchorElPOW8(e.currentTarget)} className="slider round"></div>
                                                        {
                                                            changePOW8 &&
                                                            <Popover
                                                                className='mt-2'
                                                                id={idPOW8}
                                                                open={openPOW8}
                                                                anchorEl={anchorElPOW8}
                                                                onClose={() => setAnchorElPOW8(null)}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'left',
                                                                }}
                                                            >

                                                                <div className="left-popup">
                                                                    {
                                                                        powerArray.length > 0 &&
                                                                        powerArray.map((item, i) => <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.Power_name} type="checkbox" name={item.id} onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                if (checked) {
                                                                                    setlowerLimbPower([...lowerLimbpower, value])
                                                                                } else {
                                                                                    const dataNe = lowerLimbpower.filter(item => item !== value)
                                                                                    setlowerLimbPower(dataNe)
                                                                                }
                                                                            }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.Power_name}
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
                                                {
                                                    lowerLimbpower !== "" &&
                                                    Object.keys(lowerLimbpower).map(key =>
                                                        <p className='me-2'>{lowerLimbpower[key]}</p>

                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="exam-bg-white mb-1">
                                            <span className='cns-power-name' onClick={handleClick66}>Power Left <i className="ms-1 float-end me-2 far fa-angle-right"></i></span>
                                            <span className='cns-power-name' onClick={handleClick71}>Power Right <i className="ms-1 float-end me-2  far fa-angle-right"></i></span>
                                            <span className='cns-power-name' onClick={handleClick76}>Reflexes <i className="ms-1 float-end me-2  far fa-angle-right"></i></span>
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

                                                <div className="p-2">
                                                    <p className='cns-power-name' onClick={handleClick67}>Hip <i className="ms-1 float-end me-2 far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{hip1} {hip2 && "| "} {hip2}</span>
                                                    <p className='cns-power-name' onClick={handleClick68}>Knee <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{knee1} {knee2 && "| "} {knee2}</span>
                                                    <p className='cns-power-name' onClick={handleClick69}>Ankle <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{ankle1} {ankle2 && "| "} {ankle2}</span>
                                                    <p className='cns-power-name' onClick={handleClick70}>Talar Joint <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{fingerFlexionLower} {fingerExtensionLower && "| "} {fingerExtensionLower} {fingerAbductionLower && " | "} {fingerAbductionLower} {fingerAdductionLower && " | "}  {fingerAdductionLower}</span>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id67}
                                                open={open67}
                                                anchorEl={anchorEl67}
                                                onClose={handleClose67}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Hip</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setHip1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />

                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setHip2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id68}
                                                open={open68}
                                                anchorEl={anchorEl68}
                                                onClose={handleClose68}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Knee</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setKnee1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setKnee2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id69}
                                                open={open69}
                                                anchorEl={anchorEl69}
                                                onClose={handleClose69}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Ankle</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Flexion</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setAnkle1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Extension</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setAnkle2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id70}
                                                open={open70}
                                                anchorEl={anchorEl70}
                                                onClose={handleClose70}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Talar Joint</span>
                                                    <hr />
                                                    <div>
                                                        <input type="radio" onChange={(e) => setFingerSideLower(e.target.value)} value="Left" name="finger" className='me-1' />
                                                        <label className='me-1'> Left</label>
                                                        <input type="radio" onChange={(e) => setFingerSideLower(e.target.value)} value="Right" name="finger" className='me-1' />
                                                        <label className='me-1'> Right</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLower(e.target.value)} value="1st" name="finger-nth" className='me-1' />
                                                        <label className='me-1'> 1st</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLower(e.target.value)} value="2nd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>2nd</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLower(e.target.value)} value="3rd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>3rd</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLower(e.target.value)} value="4th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>4th</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLower(e.target.value)} value="5th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>5th</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Flexion</p>

                                                                    <hr />

                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setFingerFlexionLower(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Extension</p>
                                                                    <  hr style={{ width: "100%" }} />

                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setFingerExtensionLower(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Abduction</p>
                                                                    <hr />
                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement3" onChange={(e) => setFingerAbductionLower(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Adduction</p>
                                                                    <  hr style={{ width: "100%" }} />
                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement4" onChange={(e) => setFingerAdductionLower(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id71}
                                                open={open71}
                                                anchorEl={anchorEl71}
                                                onClose={handleClose71}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="p-2">
                                                    <p className='cns-power-name' onClick={handleClick72}>Hip <i className="ms-1 float-end me-2 far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{hipRight1} {hipRight2 && "| "} {hipRight2}</span>
                                                    <p className='cns-power-name' onClick={handleClick73}>Knee <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{kneeRight1} {knee2 && "| "} {kneeRight2}</span>
                                                    <p className='cns-power-name' onClick={handleClick74}>Ankle <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{ankleRight1} {ankleRight2 && "| "} {ankleRight2}</span>
                                                    <p className='cns-power-name' onClick={handleClick75}>Talar Joint <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{fingerFlexionLowerRight} {fingerExtensionLowerRight && "| "} {fingerExtensionLowerRight} {fingerAbductionLowerRight && " | "} {fingerAbductionLowerRight} {fingerAdductionLowerRight && " | "}  {fingerAdductionLowerRight}</span>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id72}
                                                open={open72}
                                                anchorEl={anchorEl72}
                                                onClose={handleClose72}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Hip</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setHipRight1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />

                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setHipRight2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id73}
                                                open={open73}
                                                anchorEl={anchorEl73}
                                                onClose={handleClose73}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Knee</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setKneeRight1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setKneeRight2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id74}
                                                open={open74}
                                                anchorEl={anchorEl74}
                                                onClose={handleClose74}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Ankle</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Flexion</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setAnkleRight1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Extension</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setAnkleRight2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id75}
                                                open={open75}
                                                anchorEl={anchorEl75}
                                                onClose={handleClose75}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Talar Joint</span>
                                                    <hr />
                                                    <div>
                                                        <input type="radio" onChange={(e) => setFingerSideLowerRight(e.target.value)} value="Left" name="finger" className='me-1' />
                                                        <label className='me-1'> Left</label>
                                                        <input type="radio" onChange={(e) => setFingerSideLowerRight(e.target.value)} value="Right" name="finger" className='me-1' />
                                                        <label className='me-1'> Right</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerRight(e.target.value)} value="1st" name="finger-nth" className='me-1' />
                                                        <label className='me-1'> 1st</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerRight(e.target.value)} value="2nd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>2nd</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerRight(e.target.value)} value="3rd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>3rd</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerRight(e.target.value)} value="4th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>4th</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerRight(e.target.value)} value="5th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>5th</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Flexion</p>

                                                                    <hr />

                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setFingerFlexionLowerRight(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Extension</p>
                                                                    <  hr style={{ width: "100%" }} />

                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setFingerExtensionLowerRight(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Abduction</p>
                                                                    <hr />
                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement3" onChange={(e) => setFingerAbductionLowerRight(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Adduction</p>
                                                                    <  hr style={{ width: "100%" }} />
                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement4" onChange={(e) => setFingerAdductionLowerRight(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id76}
                                                open={open76}
                                                anchorEl={anchorEl76}
                                                onClose={handleClose76}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="p-2">
                                                    <p className='cns-power-name' onClick={handleClick77}>Hip <i className="ms-1 float-end me-2 far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{hipReflexes1} {hipReflexes2 && "| "} {hipReflexes2}</span>
                                                    <p className='cns-power-name' onClick={handleClick78}>Knee <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{kneeReflexes1} {kneeReflexes2 && "| "} {kneeReflexes2}</span>
                                                    <p className='cns-power-name' onClick={handleClick79}>Ankle <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{ankleReflexes1} {ankleReflexes2 && "| "} {ankleReflexes2}</span>
                                                    <p className='cns-power-name' onClick={handleClick80}>Talar Joint <i className="ms-1 float-end me-2  far fa-angle-right"></i></p>
                                                    <span className="cns-sholder-value">{fingerFlexionLowerReflexes} {fingerExtensionLowerReflexes && "| "} {fingerExtensionLowerReflexes} {fingerAbductionLowerReflexes && " | "} {fingerAbductionLowerReflexes} {fingerAdductionLowerReflexes && " | "}  {fingerAdductionLowerReflexes}</span>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id77}
                                                open={open77}
                                                anchorEl={anchorEl77}
                                                onClose={handleClose77}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Hip</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setHipReflexes1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />

                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setHipReflexes2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id78}
                                                open={open78}
                                                anchorEl={anchorEl78}
                                                onClose={handleClose78}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Knee</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Abduction</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setKneeReflexes1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Adduction</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setKneeReflexes2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id79}
                                                open={open79}
                                                anchorEl={anchorEl79}
                                                onClose={handleClose79}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Ankle</span>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-6 border">
                                                            <p>Flexion</p>
                                                            <hr />
                                                            {
                                                                leftArray.length > 0 &&
                                                                leftArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setAnkleReflexes1(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.LeftValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                        <div className="col-6 border">
                                                            <p>Extension</p>
                                                            <  hr style={{ width: "100%" }} />
                                                            {
                                                                rightArray.length > 0 &&
                                                                rightArray.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setAnkleReflexes2(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.RightValue_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                            <Popover
                                                id={id80}
                                                open={open80}
                                                anchorEl={anchorEl80}
                                                onClose={handleClose80}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="cns-sholder p-2">
                                                    <span className='cns-power-name'>Talar Joint</span>
                                                    <hr />
                                                    <div>
                                                        <input type="radio" onChange={(e) => setFingerSideLowerReflexes(e.target.value)} value="Left" name="finger" className='me-1' />
                                                        <label className='me-1'> Left</label>
                                                        <input type="radio" onChange={(e) => setFingerSideLowerReflexes(e.target.value)} value="Right" name="finger" className='me-1' />
                                                        <label className='me-1'> Right</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerReflexes(e.target.value)} value="1st" name="finger-nth" className='me-1' />
                                                        <label className='me-1'> 1st</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerReflexes(e.target.value)} value="2nd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>2nd</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerReflexes(e.target.value)} value="3rd" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>3rd</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerReflexes(e.target.value)} value="4th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>4th</label>
                                                        <input type="radio" onChange={(e) => setFingerNthLowerReflexes(e.target.value)} value="5th" name="finger-nth" className='me-1' />
                                                        <label className='me-1'>5th</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Flexion</p>

                                                                    <hr />

                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement1" onChange={(e) => setFingerFlexionLowerReflexes(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Extension</p>
                                                                    <  hr style={{ width: "100%" }} />

                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement2" onChange={(e) => setFingerExtensionLowerReflexes(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-6 border">
                                                                    <p>Abduction</p>
                                                                    <hr />
                                                                    {
                                                                        leftArray.length > 0 &&
                                                                        leftArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.LeftValue_name} type="radio" name="movement3" onChange={(e) => setFingerAbductionLowerReflexes(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.LeftValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                                <div className="col-6 border">
                                                                    <p>Adduction</p>
                                                                    <  hr style={{ width: "100%" }} />
                                                                    {
                                                                        rightArray.length > 0 &&
                                                                        rightArray.map((item, i) => {
                                                                            return (
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input" value={item.RightValue_name} type="radio" name="movement4" onChange={(e) => setFingerAdductionLowerReflexes(e.target.value)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.RightValue_name}
                                                                                    </label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Knee Jerk (L2,L4)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange82(!change82); setLowerKneeJerk(""); setLowerKneeJerkRight(""); }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick82} className="slider round"></div>
                                                    {
                                                        change82 &&
                                                        <Popover
                                                            id={id82}
                                                            open={open82}
                                                            anchorEl={anchorEl82}
                                                            onClose={handleClose82}
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
                                                                <div className="row ms-3">
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Left</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ps-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement1" onChange={(e) => setLowerKneeJerk(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
                                                                                        </label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Right</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ps-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setLowerKneeJerkRight(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
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
                                                <div className="">
                                                    <p>{lowerKneeJerk && "Left : "}{lowerKneeJerk}</p>
                                                    <p>{lowerKneeJerkRight && "Right : "}{lowerKneeJerkRight}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Ankle Jesk (S1,S2)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange81(!change81); setLowerAnkleJerk(""); setLowerAnkleJerkRight("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick81} className="slider round"></div>
                                                    {
                                                        change81 &&
                                                        <Popover
                                                            id={id81}
                                                            open={open81}
                                                            anchorEl={anchorEl81}
                                                            onClose={handleClose81}
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
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Left</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement1" onChange={(e) => setLowerAnkleJerk(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
                                                                                        </label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Right</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setLowerAnkleJerkRight(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
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
                                                <p>{lowerAnkleJerk && "Left : "}{lowerAnkleJerk}</p>
                                                <p>{lowerAnkleJerkRight && "Right : "}{lowerAnkleJerkRight}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Plantar  Reflex (L5,S1,S2)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange83(!change83); setlowerPlanterReflex(""); setlowerPlanterReflexRight("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick83} className="slider round"></div>
                                                    {
                                                        change83 &&
                                                        <Popover
                                                            id={id83}
                                                            open={open83}
                                                            anchorEl={anchorEl83}
                                                            onClose={handleClose83}
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
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Left</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement1" onChange={(e) => setlowerPlanterReflex(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
                                                                                        </label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <span style={{ fontWeight: 500 }}>Right</span>
                                                                        {
                                                                            jerkArray.length > 0 &&
                                                                            jerkArray.map((item, i) => {
                                                                                return (
                                                                                    <div className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.JerkC1C8_name} type="radio" name="movement" onChange={(e) => setlowerPlanterReflexRight(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label" >
                                                                                            {item.JerkC1C8_name}
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
                                                <p>{jesk && "Left : "}{lowerPlanterReflex}</p>
                                                <p>{lowerPlanterReflexRight && "Right : "}{lowerPlanterReflexRight}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Femoral Nerve(L1,L2,L3)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange87(!change87); setLowerFemoralNerve("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick87} className="slider round"></div>
                                                    {
                                                        change87 &&
                                                        <Popover
                                                            id={id87}
                                                            open={open87}
                                                            anchorEl={anchorEl87}
                                                            onClose={handleClose87}
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
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Knee Extension weakness" type="radio" name="movement" onChange={(e) => setLowerFemoralNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Knee Extension weakness
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Hip flexion weakness" type="radio" name="movement" onChange={(e) => setLowerFemoralNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Hip flexion weakness
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Knee jerk asbsent" type="radio" name="movement" onChange={(e) => setLowerFemoralNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Knee jerk asbsent
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Sensation loss inner thigh, leg" type="radio" name="movement" onChange={(e) => setLowerFemoralNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Sensation loss inner thigh, leg
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="All normal" type="radio" name="movement" onChange={(e) => setLowerFemoralNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        All normal
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lowerFemoralNerve}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Sciatic nerve(L4,L5,S1,S2)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange88(!change88); setLowerSciaticNerve("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick88} className="slider round"></div>
                                                    {
                                                        change88 &&
                                                        <Popover
                                                            id={id88}
                                                            open={open88}
                                                            anchorEl={anchorEl88}
                                                            onClose={handleClose88}
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
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Foot drop" type="radio" name="movement" onChange={(e) => setLowerSciaticNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Foot drop
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Knee flexion weakness" type="radio" name="movement" onChange={(e) => setLowerSciaticNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Knee flexion weakness
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Ankle jerk asbsent" type="radio" name="movement" onChange={(e) => setLowerSciaticNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Ankle jerk asbsent
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Planter jerk asbsent" type="radio" name="movement" onChange={(e) => setLowerSciaticNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Planter jerk asbsent
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="All normal" type="radio" name="movement" onChange={(e) => setLowerSciaticNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        All normal
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lowerSciaticNerve}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Common peroneal nerve(L4,L5,S1)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange89(!change89); setLowerCommonNerve("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick89} className="slider round"></div>
                                                    {
                                                        change89 &&
                                                        <Popover
                                                            id={id89}
                                                            open={open89}
                                                            anchorEl={anchorEl89}
                                                            onClose={handleClose89}
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
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Foot drop" type="radio" name="movement" onChange={(e) => setLowerCommonNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Foot drop
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Dorsiflexion weaker" type="radio" name="movement" onChange={(e) => setLowerCommonNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Dorsiflexion weaker
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Eversion weaker" type="radio" name="movement" onChange={(e) => setLowerCommonNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Eversion weaker
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Sansation loss lateral dorsum of the foot" type="radio" name="movement" onChange={(e) => setLowerCommonNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Sansation loss lateral dorsum of the foot
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="All reflexes normal" type="radio" name="movement" onChange={(e) => setLowerCommonNerve(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        All reflexes normal
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lowerCommonNerve}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Romberg test</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange90(!change90); setLowerRombergTest("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick90} className="slider round"></div>
                                                    {
                                                        change90 &&
                                                        <Popover
                                                            id={id90}
                                                            open={open90}
                                                            anchorEl={anchorEl90}
                                                            onClose={handleClose90}
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
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setLowerRombergTest(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Abnormal" type="radio" name="movement" onChange={(e) => setLowerRombergTest(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Abnormal
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lowerRombergTest}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Heel toe walking</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange91(!change91); setLowerHeelToeWaking("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick91} className="slider round"></div>
                                                    {
                                                        change91 &&
                                                        <Popover
                                                            id={id91}
                                                            open={open91}
                                                            anchorEl={anchorEl91}
                                                            onClose={handleClose91}
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
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setLowerHeelToeWaking(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Abnormal" type="radio" name="movement" onChange={(e) => setLowerHeelToeWaking(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Abnormal
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lowerHeelToeWaking}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="exam-bg-white">
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Heel Shin Test</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange84(!change84); setLowerHeelShin("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick84} className="slider round"></div>
                                                    {
                                                        change84 &&
                                                        <Popover
                                                            id={id84}
                                                            open={open84}
                                                            anchorEl={anchorEl84}
                                                            onClose={handleClose84}
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
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setLowerHeelShin(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Overshoot" type="radio" name="movement" onChange={(e) => setLowerHeelShin(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Overshoot
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lowerHeelShin}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Toe Finger Test</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange85(!change85); setLowerToeFinger("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick85} className="slider round"></div>
                                                    {
                                                        change85 &&
                                                        <Popover
                                                            id={id85}
                                                            open={open85}
                                                            anchorEl={anchorEl85}
                                                            onClose={handleClose85}
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
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setLowerToeFinger(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Overshoot" type="radio" name="movement" onChange={(e) => setLowerToeFinger(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Overshoot
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lowerToeFinger}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Foot Tapping Test</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange86(!change86); setLowerFootTapping("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick86} className="slider round"></div>
                                                    {
                                                        change86 &&
                                                        <Popover
                                                            id={id86}
                                                            open={open86}
                                                            anchorEl={anchorEl86}
                                                            onClose={handleClose86}
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
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal Rythm" type="radio" name="movement" onChange={(e) => setLowerFootTapping(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal Rythm
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Lost Rythm" type="radio" name="movement" onChange={(e) => setLowerFootTapping(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Lost Rythm
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lowerFootTapping}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Temperature Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange92(!change92); setlowerlimbTemp("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick92} className="slider round"></div>
                                                    {
                                                        change92 &&
                                                        <Popover
                                                            id={id92}
                                                            open={open92}
                                                            anchorEl={anchorEl92}
                                                            onClose={handleClose92}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setlowerlimbTemp(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Decreased" type="radio" name="movement" onChange={(e) => setlowerlimbTemp(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Decreased
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lowerlimbTemp}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Vibration Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange93(!change93); setVibrationLowerLimb("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick93} className="slider round"></div>
                                                    {
                                                        change93 &&
                                                        <Popover
                                                            id={id93}
                                                            open={open93}
                                                            anchorEl={anchorEl93}
                                                            onClose={handleClose93}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setVibrationLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Decreased" type="radio" name="movement" onChange={(e) => setVibrationLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Decreased
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{vibrationLowerLimb}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Proprioception Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange94(!change94); setProprioceptionLowerLimb("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick94} className="slider round"></div>
                                                    {
                                                        change94 &&
                                                        <Popover
                                                            id={id94}
                                                            open={open94}
                                                            anchorEl={anchorEl94}
                                                            onClose={handleClose94}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setProprioceptionLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Abnormal" type="radio" name="movement" onChange={(e) => setProprioceptionLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Abnormal
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{proprioceptionLowerLimb}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Pin Prick Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange95(!change95); setPinLowerLimb("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick95} className="slider round"></div>
                                                    {
                                                        change95 &&
                                                        <Popover
                                                            id={id95}
                                                            open={open95}
                                                            anchorEl={anchorEl95}
                                                            onClose={handleClose95}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setPinLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Decreased" type="radio" name="movement" onChange={(e) => setPinLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Decreased
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{pinLowerLimb}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Light Touch Testing</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange96(!change96); setLightLowerLimb("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick96} className="slider round"></div>
                                                    {
                                                        change96 &&
                                                        <Popover
                                                            id={id96}
                                                            open={open96}
                                                            anchorEl={anchorEl96}
                                                            onClose={handleClose96}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="left-popup">
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Normal" type="radio" name="movement" onChange={(e) => setLightLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Normal
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Decreased" type="radio" name="movement" onChange={(e) => setLightLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Decreased
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{lightLowerLimb}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Picture lower limb dermatomes</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange97(!change97); setPeripheralLowerLimbValuve(""); setPeripheralLowerLimb(""); setpictureLowerLimbValue([]) }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick97} className="slider round"></div>
                                                    {
                                                        change97 &&
                                                        <Popover
                                                            id={id97}
                                                            open={open97}
                                                            anchorEl={anchorEl97}
                                                            onClose={handleClose97}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div>
                                                                <img src={lowerLimbImg} className="d-block img-fluid mx-auto" alt="..." />
                                                                <div className="row">
                                                                    <div className="col-3">
                                                                        <div className="form-check ms-1">
                                                                            <input className="form-check-input" value="Left" type="radio" name="movement1" onChange={(e) => setPeripheralLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label ms-1" >
                                                                                Left
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check ms-1">
                                                                            <input className="form-check-input" value="Right" type="radio" name="movement1" onChange={(e) => setPeripheralLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label ms-1" >
                                                                                Right
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        {
                                                                            pictureUpperLimbArray.length > 0 &&
                                                                            pictureUpperLimbArray.map((item, i) => {
                                                                                return (
                                                                                    <div key={i} className="form-check ms-1">
                                                                                        <input className="form-check-input" value={item.PULimbDermatomes_name} type="radio" name="movement" onChange={(e) => setPeripheralLowerLimbValuve(e.target.value)} id="flexRadioDefault1" />
                                                                                        <label className="form-check-label ms-1" >
                                                                                            {item.PULimbDermatomes_name}
                                                                                        </label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }

                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div className="row">
                                                                            <div className="col-6">
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c1" type="checkbox" name="c" onChange={(e) => handlePictureLowerValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c1
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c2" type="checkbox" name="c" onChange={(e) => handlePictureLowerValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c2
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c3" type="checkbox" name="c" onChange={(e) => handlePictureLowerValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c3
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c4" type="checkbox" name="c" onChange={(e) => handlePictureLowerValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c4
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c5" type="checkbox" name="c" onChange={(e) => handlePictureLowerValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c5
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c6" type="checkbox" name="c" onChange={(e) => handlePictureLowerValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c6
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c7" type="checkbox" name="c" onChange={(e) => handlePictureLowerValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c7
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check ms-1">
                                                                                    <input className="form-check-input" value="c8" type="checkbox" name="c" onChange={(e) => handlePictureLowerValue(e)} id="flexRadioDefault1" />
                                                                                    <label className="form-check-label ms-1" >
                                                                                        c8
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{peripheralLowerLimb} {peripheralLowerLimb && "|"} {peripheralLowerLimbValuve} {peripheralLowerLimbValuve && "| "}
                                                    {Object.keys(pictureLowerLimbValue).map(key =>
                                                        `${pictureLowerLimbValue[key]} `

                                                    )
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>The Radial Nerve (C5-C8)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange98(!change98); setRedialLowerLimb("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick98} className="slider round"></div>
                                                    {
                                                        change98 &&
                                                        <Popover
                                                            id={id98}
                                                            open={open98}
                                                            anchorEl={anchorEl98}
                                                            onClose={handleClose98}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="cns-eye-popup">
                                                                {
                                                                    TheRadialNerveArray.length > 0 &&
                                                                    TheRadialNerveArray.map((v, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check ms-1">
                                                                                <input className="form-check-input" value={v.TheRadialNerve_name} type="radio" name="movement" onChange={(e) => setRedialLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {v.TheRadialNerve_name}
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
                                                <p>{redialLowerLimb}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>The Ulnar Nerve (C8-T1)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange99(!change99); setUlnarLowerLimb("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick99} className="slider round"></div>
                                                    {
                                                        change99 &&
                                                        <Popover
                                                            id={id99}
                                                            open={open99}
                                                            anchorEl={anchorEl99}
                                                            onClose={handleClose99}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="cns-eye-popup">
                                                                <p className='mt-2 ml-2'>Normal/wasting small muscle hand patial clawing little and ring finger froment's singn </p>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Positive" type="radio" name="movement" onChange={(e) => setUlnarLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Positive
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Negative" type="radio" name="movement" onChange={(e) => setUlnarLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Negative
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{ulnarLowerLimb}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>The Median Nerve (C6-T1)</p>
                                                <label className="switch me-1">
                                                    <input onChange={() => { setChange100(!change100); setMedianLowerLimb("") }} type="checkbox" id="togBtn" />
                                                    <div onClick={handleClick100} className="slider round"></div>
                                                    {
                                                        change100 &&
                                                        <Popover
                                                            id={id100}
                                                            open={open100}
                                                            anchorEl={anchorEl100}
                                                            onClose={handleClose100}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <div className="cns-eye-popup">
                                                                <p>Carpel tunnel syndrome</p>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Positive" type="radio" name="movement" onChange={(e) => setMedianLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Positive
                                                                    </label>
                                                                </div>
                                                                <div className="form-check ms-1">
                                                                    <input className="form-check-input" value="Negative" type="radio" name="movement" onChange={(e) => setMedianLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        Negative
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                            <div className='history-popup-value'>
                                                <p>{medianLowerLimb}</p>
                                            </div>
                                        </div>
                                        <div className="list-bg-white mb-1">
                                            <div className='d-flex justify-content-between'>
                                                <p>Lesion at cubital fossa: Ochsner’s clasping test</p>
                                                <div className="ms-1">
                                                    <label className="switch me-1">
                                                        <input onChange={() => { setChange101(!change101); setLesionLowerLimb("") }} type="checkbox" id="togBtn" />
                                                        <div onClick={handleClick101} className="slider round"></div>
                                                        {
                                                            change101 &&
                                                            <Popover
                                                                id={id101}
                                                                open={open101}
                                                                anchorEl={anchorEl101}
                                                                onClose={handleClose101}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'right',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'right',
                                                                }}
                                                            >
                                                                <div className="cns-eye-popup">
                                                                    <div className="form-check ms-1">
                                                                        <input className="form-check-input" value="Positive" type="radio" name="movement" onChange={(e) => setLesionLowerLimb(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            Positive
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check ms-1">
                                                                        <input className="form-check-input" value="Negative" type="radio" name="movement" onChange={(e) => setLesionLowerLimb(e.target.value)} id="flexRadioDefault1" />
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
                                                <p>{lesionLowerLimb}</p>
                                            </div>
                                        </div>
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

export default Neurological;