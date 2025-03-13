import { Popover } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import clinic8 from "../../../../Images/womens-health.png";
import { Accordion } from 'react-bootstrap';
import { toast } from 'react-toastify';
const WomenHealth = (props) => {
    const [historyShowAll, setHistoryShowAll] = useState(false);
    const [gynecologiesValue, setGynecologiesValue] = useState([]);
    const [obstetricsValue, setObstetricsValue] = useState([]);
    const [vulva, setVulva] = useState([]);
    const [pelvicMass, setPelvicMass] = useState("");
    const [fornicealTenderness, setFornicealTenderness] = useState(false);
    const [bulkyUterus, setBulkyUterus] = useState(false);
    const [bartholinGlandes, setBartholinGlandes] = useState("");
    const [bartholinGlandesSide, setBartholinGlandesSide] = useState("");
    const [cervix, setCervix] = useState([]);
    const [fornicealMass, setFornicealMass] = useState(false);
    const [antevertedUterus, setAntevertedUterus] = useState(false);
    const [cst, setCst] = useState([]);
    const [uterineTenderness, setUterineTenderness] = useState(false);
    const [retrovertedUterus, setRetrovertedUterus] = useState(false);
    const [breast, setBreast] = useState("");
    const [peau, setPeau] = useState("");
    const [redness, setRedness] = useState("");
    const [nippleInversion, setNippleInversion] = useState("");
    const [visibleVeins, setVisibleVeins] = useState("");
    const [teethering, setTeethering] = useState("");
    const [hot, setHot] = useState("");
    const [axillaryNodes, setAxillaryNodes] = useState("");
    const [skinDimpling, setSkinDimpling] = useState("");
    const [asymetricElevation, setAsymetricElevation] = useState("");
    const [supraclavicularNode, setSupraclavicularNode] = useState("");
    const [swelling, setSwelling] = useState("");
    const [lumpCmForNipple, setLumpCmForNipple] = useState("");
    const [lumpOClock, setLumpOClock] = useState("");
    const [lumpX, setLumpX] = useState("");
    const [lumpY, setLumpY] = useState("");
    const [LUO, setLUO] = useState(false);
    const [MUI, setMUI] = useState(false);
    const [RUO, setRUO] = useState(false);
    const [RLI, setRLI] = useState(false);
    const [LLI, setLLI] = useState(false);
    const [RLO, setRLO] = useState(false);
    const [LUI, setLUI] = useState(false);
    const [LLO, setLLO] = useState(false);
    const [LMP, setLMP] = useState("");
    const [lastCervicalScreen, setLastCervicalScreen] = useState("");
    const [LSCS, setLSCS] = useState(false);
    const [pregnant, setPregnant] = useState(false);
    const [periodType, setPeriodType] = useState("");
    const [periodDays, setPeriodDays] = useState("");
    const [periodCycle, setPeriodCycle] = useState("");
    const [periodYears, setPeriodYears] = useState("");
    const [volume, setVolume] = useState("");
    const [PVBleeding, setPVBleeding] = useState("");
    const [PVDischarge, setPVDischarge] = useState("");
    const [vulval, setVulval] = useState("");
    const [miscarriage, setMiscarriage] = useState("");
    const [breastLumpSide, setBreastLumpSide] = useState("");
    const [breastLump, setBreastLump] = useState([]);
    const [breastPain, setBreastPain] = useState("");
    const [breastAbscess, setBreastAbscess] = useState("");
    const [breastNippleDischarge, setBreastNippleDischarge] = useState([]);


    const [gynecologiesArray, setGynecologiesArray] = useState([
        { name: "Post Coital Bleeding", id: 1 },
        { name: "Sexually Active", id: 6 },
        { name: "Dyspareunia", id: 9 },
        { name: "HPV Vaccination", id: 10 },
        { name: "STI", id: 11 },
        { name: "Voiding Difficulties", id: 12 },
        { name: "Urinary Frequency", id: 13 },
        { name: "Urinary Incontinence", id: 14 },
        { name: "Vaginal Prolapse", id: 15 },
        { name: "Dysmenorrhea", id: 16 },
        { name: "Amenorrhea", id: 17 },
        { name: "Perimenopausal Symptoms", id: 18 },
        { name: "Premenstrual Syndrome", id: 19 },
        { name: "Infertility", id: 20 },
        { name: "Vaginismus", id: 21 },
    ]);
    const [ObstetricsArray, setObstetricsArray] = useState([
        { name: "Rupture of Membrane", id: 1 },
        { name: "Change in Fetal Movement", id: 2 },
        { name: "Face Oedema", id: 3 },
        { name: "Headache", id: 4 },
        { name: "Abdominal Pain", id: 5 },
        { name: "Carpal Tunnel Syndrome", id: 6 },
        { name: "Palpitations", id: 7 },
        { name: "Ankle Oedema", id: 8 },
        { name: "Breathlessness", id: 9 },
        { name: "Tiredness", id: 10 },
        { name: "Pruritus", id: 11 },
        { name: "Pubic Symphysis Pain", id: 12 },
        { name: "Back Pain", id: 13 },
        { name: "Constipation", id: 14 },
        { name: "Infertility", id: 15 },
        { name: "Reflux Heartburn", id: 16 },
        { name: "Hyperemesis Gravidarum", id: 17 },
        { name: "Nausea", id: 18 },
        { name: "Breast Changes", id: 19 },
    ]);






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
    //
    const [change8, setChange8] = useState(false);
    const [anchorEl8, setAnchorEl8] = useState(null);
    const open8 = Boolean(anchorEl8);
    const id8 = open8 ? 'simple-popover' : undefined;
    //
    const [change9, setChange9] = useState(false);
    const [anchorEl9, setAnchorEl9] = useState(null);
    const open9 = Boolean(anchorEl9);
    const id9 = open9 ? 'simple-popover' : undefined;
    //
    const [change10, setChange10] = useState(false);
    const [anchorEl10, setAnchorEl10] = useState(null);
    const open10 = Boolean(anchorEl10);
    const id10 = open10 ? 'simple-popover' : undefined;
    //
    const [change11, setChange11] = useState(false);
    const [anchorEl11, setAnchorEl11] = useState(null);
    const open11 = Boolean(anchorEl11);
    const id11 = open11 ? 'simple-popover' : undefined;
    //
    const [change12, setChange12] = useState(false);
    const [anchorEl12, setAnchorEl12] = useState(null);
    const open12 = Boolean(anchorEl12);
    const id12 = open12 ? 'simple-popover' : undefined;
    //
    const [change13, setChange13] = useState(false);
    const [anchorEl13, setAnchorEl13] = useState(null);
    const open13 = Boolean(anchorEl13);
    const id13 = open13 ? 'simple-popover' : undefined;
    //
    const [change14, setChange14] = useState(false);
    const [anchorEl14, setAnchorEl14] = useState(null);
    const open14 = Boolean(anchorEl14);
    const id14 = open14 ? 'simple-popover' : undefined;
    //
    const [change15, setChange15] = useState(false);
    const [anchorEl15, setAnchorEl15] = useState(null);
    const open15 = Boolean(anchorEl15);
    const id15 = open15 ? 'simple-popover' : undefined;
    //
    const [change16, setChange16] = useState(false);
    const [anchorEl16, setAnchorEl16] = useState(null);
    const open16 = Boolean(anchorEl16);
    const id16 = open16 ? 'simple-popover' : undefined;
    //
    const [change17, setChange17] = useState(false);
    const [anchorEl17, setAnchorEl17] = useState(null);
    const open17 = Boolean(anchorEl17);
    const id17 = open17 ? 'simple-popover' : undefined;
    //
    const [change18, setChange18] = useState(false);
    const [anchorEl18, setAnchorEl18] = useState(null);
    const open18 = Boolean(anchorEl18);
    const id18 = open18 ? 'simple-popover' : undefined;
    //
    const [change19, setChange19] = useState(false);
    const [anchorEl19, setAnchorEl19] = useState(null);
    const open19 = Boolean(anchorEl19);
    const id19 = open19 ? 'simple-popover' : undefined;
    //
    const [change20, setChange20] = useState(false);
    const [anchorEl20, setAnchorEl20] = useState(null);
    const open20 = Boolean(anchorEl20);
    const id20 = open20 ? 'simple-popover' : undefined;
    //
    const [change21, setChange21] = useState(false);
    const [anchorEl21, setAnchorEl21] = useState(null);
    const open21 = Boolean(anchorEl21);
    const id21 = open21 ? 'simple-popover' : undefined;
    //
    const [change22, setChange22] = useState(false);
    const [anchorEl22, setAnchorEl22] = useState(null);
    const open22 = Boolean(anchorEl22);
    const id22 = open22 ? 'simple-popover' : undefined;
    //
    const [change23, setChange23] = useState(false);
    const [anchorEl23, setAnchorEl23] = useState(null);
    const open23 = Boolean(anchorEl23);
    const id23 = open23 ? 'simple-popover' : undefined;
    //
    const [change24, setChange24] = useState(false);
    const [anchorEl24, setAnchorEl24] = useState(null);
    const open24 = Boolean(anchorEl24);
    const id24 = open24 ? 'simple-popover' : undefined;
    //
    const [change25, setChange25] = useState(false);
    const [anchorEl25, setAnchorEl25] = useState(null);
    const open25 = Boolean(anchorEl25);
    const id25 = open25 ? 'simple-popover' : undefined;
    //
    const [change26, setChange26] = useState(false);
    const [anchorEl26, setAnchorEl26] = useState(null);
    const open26 = Boolean(anchorEl26);
    const id26 = open26 ? 'simple-popover' : undefined;
    //
    const [change27, setChange27] = useState(false);
    const [anchorEl27, setAnchorEl27] = useState(null);
    const open27 = Boolean(anchorEl27);
    const id27 = open27 ? 'simple-popover' : undefined;
    //
    const [change28, setChange28] = useState(false);
    const [anchorEl28, setAnchorEl28] = useState(null);
    const open28 = Boolean(anchorEl28);
    const id28 = open28 ? 'simple-popover' : undefined;
    //
    const [change29, setChange29] = useState(false);
    const [anchorEl29, setAnchorEl29] = useState(null);
    const open29 = Boolean(anchorEl29);
    const id29 = open29 ? 'simple-popover' : undefined;
    //



    const [volumeWomenArray, setVolumeWomenArray] = useState([]);
    const [pVBleedingArray, setPVBleedingArray] = useState([]);
    const [pVDischargeArray, setPVDischargeArray] = useState([]);
    const [vulvalArray, setVulvalArray] = useState([]);
    const [miscarriageArray, setMiscarriageArray] = useState([]);
    const [breastLumpArray, setBreastLumpArray] = useState([]);
    const [breastPainArray, setBreastPainArray] = useState([]);
    const [hOBreastAbscess, setHOBreastAbscessArray] = useState([]);
    const [breastNippleArray, setBreastNippleArray] = useState([])
    const [vulvaArray, setVulvaArray] = useState([])
    const [pelvicMassArray, setPelvicMassArray] = useState([])
    const [bartholinGlandesArray, setBartholinGlandesArray] = useState([])
    const [cervixArray, setCervixArray] = useState([]);
    const [cstArray, setCstArray] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        axios.get(`/volume-women`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("VolumeWomenArray", res.data.volumeWomen);
                setVolumeWomenArray(res.data.volumeWomen);
            }
        });
        axios.get(`/pv-bleeding`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("PVBleedingArray", res.data.pVBleeding);
                setPVBleedingArray(res.data.pVBleeding);
            }
        });
        axios.get(`/pv-discharge`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("PVDischargeArray", res.data.pVDischarge);
                setPVDischargeArray(res.data.pVDischarge);
            }
        });
        axios.get(`/vulval`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("VulvalArray", res.data.vulval);
                setVulvalArray(res.data.vulval);
            }
        });
        axios.get(`/miscarriage`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("MiscarriageArray", res.data.miscarriage);
                setMiscarriageArray(res.data.miscarriage);
            }
        });
        axios.get(`/breast-lump`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("BreastLumpArray", res.data.breastLump);
                setBreastLumpArray(res.data.breastLump);
            }
        });
        axios.get(`/breast-pain`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("BreastPainArray", res.data.breastPain);
                setBreastPainArray(res.data.breastPain);

                console.log("HOBreastAbscessArray", res.data.breastPain);
                setHOBreastAbscessArray(res.data.breastPain);
            }
        });
        axios.get(`/breast-nipple-discharge`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("BreastNippleArray", res.data.breastNippleDischarge);
                setBreastNippleArray(res.data.breastNippleDischarge);
            }
        });
        axios.get(`/vulva`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("VulvaArray", res.data.vulva);
                setVulvaArray(res.data.vulva);
            }
        });
        axios.get(`/pelvic-mass`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("PelvicMassArray", res.data.pelvicMass);
                setPelvicMassArray(res.data.pelvicMass);
            }
        });
        axios.get(`/bartholin-glandes`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("BartholinGlandesArray", res.data.bartholinGlandes);
                setBartholinGlandesArray(res.data.bartholinGlandes);
            }
        });
        axios.get(`/cervix`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("CervixArray", res.data.cervix);
                setCervixArray(res.data.cervix);
            }
        });
        axios.get(`/cst`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                console.log("CSTArray", res.data.cST);
                setCstArray(res.data.cST);
            }
        });

        return () => { controller.abort() }

    }, []);


    const [saveLoading, setsaveLoading] = useState(false)

    const saveWomenHealthData = () => {

        setsaveLoading(true)


        const data = {
            patient_id: props.patient_id,
            LMP_date: LMP,
            LSCS_ternary: LSCS,
            pregnant_ternary: pregnant,
            lastCervicalScreen_date: lastCervicalScreen,
            periodType_input: periodType,
            periodDays_input: periodDays,
            periodCycle_input: periodCycle,
            periodYears_input: periodYears,
            volume_value: volume,
            PVBleeding_vale: PVBleeding,
            PVDischarge_value: PVDischarge,
            vulval_value: vulval,
            miscarriage_value: miscarriage,
            breastLump_side_value: breastLumpSide,
            breast_pain_ternary_value: breastPain,
            breast_abscess_ternary_value: breastAbscess,
            pelvic_mass: pelvicMass,
            forniceal_tenderness_ternary: fornicealTenderness,
            bulky_uterus_ternary: bulkyUterus,
            breast_ternery: breast,
            peau_ternary: peau,
            redness_ternary: redness,
            nipple_inversion_ternary: nippleInversion,
            visibleVeins_ternary: visibleVeins,
            teethering_ternary: teethering,
            hot_ternary: hot,
            axillary_nodes_ternary: axillaryNodes,
            skin_dimpling_ternary: skinDimpling,
            asymetric_elevation_ternary: asymetricElevation,
            supraclavicular_node_ternary: supraclavicularNode,
            swelling_ternary: swelling,
            lump_cm_for_nipple_ternary: lumpCmForNipple,
            lump_o_clock: lumpOClock,
            bartholin_glandes_value: bartholinGlandes,
            forniceal_mass_value: fornicealMass,
            anteverted_uterus_ternary: antevertedUterus,
            uterine_tenderness_ternary: uterineTenderness,
            retroverted_uterus_ternary: retrovertedUterus,
            LMP_input: LMP,
            LLO_ternary: LLO,
            LUI_ternary: LUI,
            RLO_ternary: RLO,
            LLI_ternary: LLI,
            RLI_ternary: RLI,
            RUO_ternary: RUO,
            MUI_ternary: MUI,
            LUO_ternary: LUO,

            vulva: vulva.toString(),
            breastNippleDischarge: breastNippleDischarge.toString(),
            cst: cst.toString(),
            obstetricsValue: obstetricsValue.toString(),
            breastLump: breastLump.toString(),
            cervix: cervix.toString(),
            gynecologiesValue: gynecologiesValue.toString(),


            lumpX,
            lumpY,
            bartholinGlandesSide,
        }



        axios.post('/save-womens-health-data', data).then(res => {
            const changes = {
                Active: "Active is present",
                HPV: "H/o HPV",
                Vaccination: "Vaccination Given",
                STI: "Previous history of STI",
                Difficulties: "Difficulties present",
                Frequency: "Frequency present ",
                Incontinence: "Incontinence present",
                Vaginal: "H/ O Vaginal",
                Dysmenorrhea: "Dysmenorrhea present",
                Amenorrhea: "Amenorrhea present",
                Infertility: "H / o Infertility",
                Vaginismus: "H / o Vaginismus",

            }
            let str = res.data.women.gynecologiesValue !== null && res.data.women.gynecologiesValue.replace(/Active|HPV|Vaccination|STI|Difficulties|Frequency|Incontinence|Vaginal|Dysmenorrhea|Amenorrhea|Infertility|Vaginismus/gi, function (matched) {
                return changes[matched];
            });

            const note = `
<p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Women’s Health:</strong></span><br>
   
    ${res.data.women.LMP_date === null &&
                    res.data.women.pregnant_ternary === false &&
                    res.data.women.LSCS_ternary === false &&
                    res.data.women.lastCervicalScreen_date === null &&

                    res.data.women.periodType_input === null &&
                    res.data.women.volume_value === null &&
                    res.data.women.PVBleeding_vale === null &&
                    res.data.women.PVDischarge_value === null &&
                    res.data.women.vulval_value === null &&
                    res.data.women.miscarriage_value === null &&
                    !str &&

                    res.data.women.obstetricsValue === null &&

                    res.data.women.breastLump_side_value === null &&
                    res.data.women.breast_pain_ternary_value === null &&
                    res.data.women.breast_abscess_ternary_value === null &&
                    res.data.women.breastNippleDischarge === null
                    ? `` : `
  <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>History:</strong></span><br>

    ${res.data.women.LMP_date === null ? `` : `LMP : ${res.data.women.LMP_date} . `}
    ${res.data.women.pregnant_ternary === false ? `` : `Pregnant : Yes . `}
    ${res.data.women.LSCS_ternary === false ? `` : `History of  Previous LSCS . `}
    ${res.data.women.lastCervicalScreen_date === null ? `` : `Last Cervical Screen: ${res.data.women.lastCervicalScreen_date} .`}
 
    ${res.data.women.periodType_input === null &&
                        res.data.women.volume_value === null &&
                        res.data.women.PVBleeding_vale === null &&
                        res.data.women.PVDischarge_value === null &&
                        res.data.women.vulval_value === null &&
                        res.data.women.miscarriage_value === null &&
                        !str ? `` : `
                        <br><span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Gynaecological :</strong></span><br>

     ${res.data.women.periodType_input === null ? `` : `Period: ${res.data.women.periodType_input} ${res.data.women.periodDays_input} days Cycle ${res.data.women.periodCycle_input}days . Menarche at ${res.data.women.periodYears_input}  years of  age. <br>`}
    ${res.data.women.volume_value === null ? `` : `Volume: ${res.data.women.volume_value} . `}
    ${res.data.women.PVBleeding_vale === null ? `` : `PV Bleeding: ${res.data.women.PVBleeding_vale} . `}
    ${res.data.women.PVDischarge_value === null ? `` : `PV Discharge: ${res.data.women.PVDischarge_value} . `}
    ${res.data.women.vulval_value === null ? `` : `Vulval: ${res.data.women.vulval_value} . `}
    ${res.data.women.miscarriage_value === null ? `` : `Miscarriage: ${res.data.women.miscarriage_value} . `}
    ${str ? `${str.replaceAll(",", " . ")}<br>` : ``}   
    ` }
 
   

     
    ${res.data.women.obstetricsValue === null ? `` : `<span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Obstetrics: </strong></span><br>
        ${res.data.women.obstetricsValue.replaceAll(",", " . ")} <br>`}

    ${res.data.women.breastLump_side_value === null &&
                        res.data.women.breast_pain_ternary_value === null &&
                        res.data.women.breast_abscess_ternary_value === null &&
                        res.data.women.breastNippleDischarge === null ? `` :
                        `
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Breast: </strong></span><br>

        ${res.data.women.breastLump_side_value === null ? `` : `Breast Lump: ${res.data.women.breastLump_side_value} | ${res.data.women.breastLump.replaceAll(",", " . ")} <br>`}
    ${res.data.women.breast_pain_ternary_value === null ? `` : `Breast Pain: ${res.data.women.breast_pain_ternary_value}  <br>`}
    ${res.data.women.breast_abscess_ternary_value === null ? `` : `H/O Breast Abscess: ${res.data.women.breast_abscess_ternary_value} <br>`}
    ${res.data.women.breastNippleDischarge === null ? `` : `Breast Nipple Discharge: ${res.data.women.breastNippleDischarge.replaceAll(",", " . ")} <br>`}
    `}
   

    `}


    ${res.data.women.vulva === null &&
                    res.data.women.bartholin_glandes_value === null &&
                    res.data.women.cst === null &&
                    res.data.women.pelvic_mass === null &&
                    res.data.women.cervix === null &&
                    res.data.women.uterine_tenderness_ternary === false &&
                    res.data.women.forniceal_tenderness_ternary === false &&
                    res.data.women.forniceal_tenderness_ternary === false &&
                    res.data.women.retroverted_uterus_ternary === false &&
                    res.data.women.bulky_uterus_ternary === false &&
                    res.data.women.anteverted_uterus_ternary === false &&

                    res.data.women.breast_ternery === null &&
                    res.data.women.peau_ternary === null &&
                    res.data.women.redness_ternary === null &&
                    res.data.women.nipple_inversion_ternary === null &&
                    res.data.women.visibleVeins_ternary === null &&
                    res.data.women.teethering_ternary === null &&
                    res.data.women.hot_ternary === null &&
                    res.data.women.axillary_nodes_ternary === null &&
                    res.data.women.skin_dimpling_ternary === null &&
                    res.data.women.asymetric_elevation_ternary === null &&
                    res.data.women.swelling_ternary === null &&
                    res.data.women.supraclavicular_node_ternary === null &&

                    res.data.women.lump_cm_for_nipple_ternary === null &&
                    res.data.women.lump_o_clock === null &&
                    res.data.women.lumpX === null &&
                    res.data.women.lumpY === null &&
                    res.data.women.MUI_ternary === false &&
                    res.data.women.LUO_ternary === false &&
                    res.data.women.RUO_ternary === false &&
                    res.data.women.RLI_ternary === false &&
                    res.data.women.LLI_ternary === false &&
                    res.data.women.RLO_ternary === false &&
                    res.data.women.LLO_ternary === false &&
                    res.data.women.LUI_ternary === false

                    ? `` : `
   <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Examination:</strong></span><br>
`}
   
    ${res.data.women.vulva === null ? `` : `Vulva : ${res.data.women.vulva.replaceAll(",", " . ")} <br>`}
    ${res.data.women.bartholin_glandes_value === null ? `` : `Bartholin Glands : ${res.data.women.bartholin_glandes_value} <br>`}
    ${res.data.women.cst === null ? `` : `Cervical Screen : ${res.data.women.cst.replaceAll(",", " . ")} <br>`}
    ${res.data.women.pelvic_mass === null ? `` : `Pelvic Mass : ${res.data.women.pelvic_mass} <br>`}
    ${res.data.women.cervix === null ? `` : `Cervix : ${res.data.women.cervix.replaceAll(",", " . ")} <br>`}
    ${res.data.women.uterine_tenderness_ternary === false ? `` : `Uterine Tenderness  <br>`}
    ${res.data.women.forniceal_tenderness_ternary === false ? `` : `Forniceal Tenderness  <br>`}
    ${res.data.women.forniceal_tenderness_ternary === false ? `` : `Forniceal Mass  <br>`}  
    ${res.data.women.retroverted_uterus_ternary === false ? `` : `Retroverted Uterus  <br>`}
    ${res.data.women.bulky_uterus_ternary === false ? `` : `Bulky Uterus  <br>`}
    ${res.data.women.anteverted_uterus_ternary === false ? `` : `Anteverted Uterus  <br>`}
   
    ${res.data.women.breast_ternery === null &&
                    res.data.women.peau_ternary === null &&
                    res.data.women.redness_ternary === null &&
                    res.data.women.nipple_inversion_ternary === null &&
                    res.data.women.visibleVeins_ternary === null &&
                    res.data.women.teethering_ternary === null &&
                    res.data.women.hot_ternary === null &&
                    res.data.women.axillary_nodes_ternary === null &&
                    res.data.women.skin_dimpling_ternary === null &&
                    res.data.women.asymetric_elevation_ternary === null &&
                    res.data.women.swelling_ternary === null &&
                    res.data.women.supraclavicular_node_ternary === null ? `` : `
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Breast:</strong></span><br>
    `}
   
    ${res.data.women.breast_ternery === null ? `` : ` Breast: ${res.data.women.breast_ternery} <br>`}
    ${res.data.women.peau_ternary === null ? `` : `Peau d’orange: ${res.data.women.peau_ternary} <br>`}
    ${res.data.women.redness_ternary === null ? `` : `Redness: ${res.data.women.redness_ternary} <br>`}
    ${res.data.women.nipple_inversion_ternary === null ? `` : `Nipple Inversion: ${res.data.women.nipple_inversion_ternary} <br>`}
    ${res.data.women.visibleVeins_ternary === null ? `` : `Visible Veins: ${res.data.women.visibleVeins_ternary} <br>`}
    ${res.data.women.teethering_ternary === null ? `` : `Tethering: ${res.data.women.teethering_ternary} <br>`}
    ${res.data.women.hot_ternary === null ? `` : `Hot : ${res.data.women.hot_ternary} <br>`}
    ${res.data.women.axillary_nodes_ternary === null ? `` : `Axillary Nodes : ${res.data.women.axillary_nodes_ternary} <br>`}
    ${res.data.women.skin_dimpling_ternary === null ? `` : `Skin Dimpling : ${res.data.women.skin_dimpling_ternary} <br>`}
    ${res.data.women.asymetric_elevation_ternary === null ? `` : `Asymmetric Elevation : ${res.data.women.asymetric_elevation_ternary} <br>`}
    ${res.data.women.swelling_ternary === null ? `` : `Swelling : ${res.data.women.swelling_ternary} <br>`}
    ${res.data.women.supraclavicular_node_ternary === null ? `` : `Supraclavicular node : ${res.data.women.supraclavicular_node_ternary} <br>`}

${res.data.women.lump_cm_for_nipple_ternary === null &&
                    res.data.women.lump_o_clock === null &&
                    res.data.women.lumpX === null &&
                    res.data.women.lumpY === null &&
                    res.data.women.MUI_ternary === false &&
                    res.data.women.LUO_ternary === false &&
                    res.data.women.RUO_ternary === false &&
                    res.data.women.RLI_ternary === false &&
                    res.data.women.LLI_ternary === false &&
                    res.data.women.RLO_ternary === false &&
                    res.data.women.LLO_ternary === false &&
                    res.data.women.LUI_ternary === false ? `` : `
  <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>LUMP:</strong></span><br>
`}
  
    ${res.data.women.lump_cm_for_nipple_ternary === null ? `` : ` LUMP: ${res.data.women.lump_cm_for_nipple_ternary} cm from nipple`}
    ${res.data.women.lump_o_clock === null ? `` : `${res.data.women.lump_o_clock} O'Clock Position`}
    ${res.data.women.lumpX === null ? `` : `${res.data.women.lumpX} mm `}
    ${res.data.women.lumpY === null ? `` : `X ${res.data.women.lumpY} mm Right Upper Outer Quadrant <br>`}


    ${res.data.women.MUI_ternary === false ? `` : `MUI`}
    ${res.data.women.LUO_ternary === false ? `` : `LUO`}
    ${res.data.women.RUO_ternary === false ? `` : `RUO`}
    ${res.data.women.RLI_ternary === false ? `` : `RLI`}
    ${res.data.women.LLI_ternary === false ? `` : `LLI`}
    ${res.data.women.RLO_ternary === false ? `` : `RLO`}
    ${res.data.women.LLO_ternary === false ? `` : `LLO`}
    ${res.data.women.LUI_ternary === false ? `` : `LUI`}
    
</p > `;
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
        <div className='row'>
            <div className="history-main-header d-flex justify-content-between mb-2">
                <div>
                    <h6>Women’s Health</h6>
                </div>
                <div>
                    <img src={clinic8} alt="" className="img-fluid" />
                </div>
            </div>
            <div className="col-3 women_health_container">
                <div className="he-history p-1">
                    {/* <input
                        type="text"
                        placeholder="History"
                        className="form-control form-control-sm mt-1 mb-2"
                    /> */}
                    <ul
                        className={`g-doc-scroll ${historyShowAll ? "full-height" : "half-height"
                            } `}
                    >
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">LMP</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange18(!change18); setLMP("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl18(e.currentTarget)} className="slider round"></div>
                                        {
                                            change18 &&
                                            <Popover
                                                className='mt-2'
                                                id={id18}
                                                open={open18}
                                                anchorEl={anchorEl18}
                                                onClose={() => setAnchorEl18(null)}
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
                                                    <input type="date" onChange={(e) => setLMP(e.target.value)} className="form-control form-control-sm" />
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p>{LMP}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">LSCS</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setLSCS(!LSCS) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Pregnant</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setPregnant(!pregnant) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Last cervical screen</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange20(!change20); setLastCervicalScreen("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl20(e.currentTarget)} className="slider round"></div>
                                        {
                                            change20 &&
                                            <Popover
                                                className='mt-2'
                                                id={id20}
                                                open={open20}
                                                anchorEl={anchorEl20}
                                                onClose={() => setAnchorEl20(null)}
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
                                                    <input type="date" onChange={(e) => setLastCervicalScreen(e.target.value)} className="form-control form-control-sm" />
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p>{lastCervicalScreen}</p>
                            </div>
                        </li>
                        <Accordion className='mt-1'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Gynecologies</Accordion.Header>
                                <Accordion.Body>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Period</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange19(!change19); setPeriodType(""); setPeriodYears(""); setPeriodCycle(""); setPeriodDays("") }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl19(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change19 &&
                                                        <Popover
                                                            id={id19}
                                                            open={open19}
                                                            anchorEl={anchorEl19}
                                                            onClose={() => setAnchorEl19(null)}
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
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <div className="form-check ms-1">
                                                                            <input className="form-check-input" value="Regular" type="radio" name="side" onChange={(e) => setPeriodType(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                Regular
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check ms-1">
                                                                            <input className="form-check-input" value="Irregular" type="radio" name="side" onChange={(e) => setPeriodType(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                Irregular
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <div className="row">
                                                                            <label className="col-sm-3 col-form-label"></label>
                                                                            <div className="col-sm-6">
                                                                                <input onChange={(e) => setPeriodDays(e.target.value)} type="text" className="form-control" id="inputEmail3" />
                                                                            </div>
                                                                            <label className="col-sm-3 col-form-label">Days</label>
                                                                        </div>
                                                                        <div className="row">
                                                                            <label className="col-sm-3 col-form-label">Cycle</label>
                                                                            <div className="col-sm-6">
                                                                                <input onChange={(e) => setPeriodCycle(e.target.value)} type="text" className="form-control" id="inputEmail3" />
                                                                            </div>
                                                                            <label className="col-sm-3 col-form-label">Days</label>
                                                                        </div>
                                                                        <div className="row">
                                                                            <label className="col-sm-3 col-form-label">Menarche</label>
                                                                            <div className="col-sm-6">
                                                                                <input onChange={(e) => setPeriodYears(e.target.value)} type="text" className="form-control" id="inputEmail3" />
                                                                            </div>
                                                                            <label className="col-sm-3 col-form-label">Years of age</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                </label>
                                            </div>
                                        </div>
                                        <div className="history-popup-value">
                                            <div className="d-flex">
                                                <p className='me-2'>{periodType}</p>
                                                <p>{periodDays} {`${periodDays && " Days"} `}</p>
                                            </div>
                                            <div className="d-flex">
                                                <p className='me-2'>{periodCycle} {`${periodCycle && " Days"} `}</p>
                                                <p>{periodYears} {`${periodYears && " Years"} `}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Volume</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange21(!change21); setVolume("") }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl21(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change21 &&
                                                        <Popover
                                                            id={id21}
                                                            open={open21}
                                                            anchorEl={anchorEl21}
                                                            onClose={() => setAnchorEl21(null)}
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
                                                                    volumeWomenArray.length > 0 && volumeWomenArray.map((item, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check ms-1">
                                                                                <input className="form-check-input"
                                                                                    value={item.name}
                                                                                    type="radio"
                                                                                    name="side"
                                                                                    onChange={(e) => setVolume(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {item.name}
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
                                        <div className="history-popup-value">
                                            <p>{volume}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">PV Bleeding</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange22(!change22); setPVBleeding("") }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl22(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change22 &&
                                                        <Popover
                                                            className='mt-2'
                                                            id={id22}
                                                            open={open22}
                                                            anchorEl={anchorEl22}
                                                            onClose={() => setAnchorEl22(null)}
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
                                                                    pVBleedingArray.length > 0 && pVBleedingArray.map((item, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check ms-1">
                                                                                <input className="form-check-input"
                                                                                    value={item.name}
                                                                                    type="radio"
                                                                                    name="side"
                                                                                    onChange={(e) => setPVBleeding(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {item.name}
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
                                        <div className="history-popup-value">
                                            <p>{PVBleeding}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">PV discharge</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange23(!change23); setPVDischarge("") }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl23(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change23 &&
                                                        <Popover
                                                            id={id23}
                                                            open={open23}
                                                            anchorEl={anchorEl23}
                                                            onClose={() => setAnchorEl23(null)}
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
                                                                    pVDischargeArray.length > 0 && pVDischargeArray.map((item, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check ms-1">
                                                                                <input className="form-check-input"
                                                                                    value={item.name}
                                                                                    type="radio"
                                                                                    name="side"
                                                                                    onChange={(e) => setPVDischarge(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {item.name}
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
                                        <div className="history-popup-value">
                                            <p>{PVDischarge}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Vulval</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange24(!change24); setVulval("") }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl24(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change24 &&
                                                        <Popover
                                                            id={id24}
                                                            open={open24}
                                                            anchorEl={anchorEl24}
                                                            onClose={() => setAnchorEl24(null)}
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
                                                                    vulvalArray.length > 0 && vulvalArray.map((item, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check ms-1">
                                                                                <input className="form-check-input"
                                                                                    value={item.name}
                                                                                    type="radio"
                                                                                    name="side"
                                                                                    onChange={(e) => setVulval(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {item.name}
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
                                        <div className="history-popup-value">
                                            <p>{vulval}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Miscarriage</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange25(!change25); setMiscarriage("") }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl25(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change25 &&
                                                        <Popover
                                                            id={id25}
                                                            open={open25}
                                                            anchorEl={anchorEl25}
                                                            onClose={() => setAnchorEl25(null)}
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
                                                                    miscarriageArray.length > 0 && miscarriageArray.map((item, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check ms-1">
                                                                                <input className="form-check-input"
                                                                                    value={item.name}
                                                                                    type="radio"
                                                                                    name="side"
                                                                                    onChange={(e) => setMiscarriage(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {item.name}
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
                                        <div className="history-popup-value">
                                            <p>{miscarriage}</p>
                                        </div>
                                    </li>
                                    {
                                        gynecologiesArray.length > 0 &&
                                        gynecologiesArray.map((item, i) => <li key={i}>
                                            <div className="d-flex justify-content-between">
                                                <p className="w-75">{item.name}</p>
                                                <div className="ms-1">
                                                    <label className="switch me-1">
                                                        <input
                                                            name={item.id}
                                                            value={item.name}
                                                            type="checkbox"
                                                            onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setGynecologiesValue([...gynecologiesValue, value])
                                                                } else {
                                                                    const dataNe = gynecologiesValue.filter(item => item !== value)
                                                                    setGynecologiesValue(dataNe)
                                                                }
                                                            }}
                                                            id="togBtn"
                                                        />
                                                        <div className="slider round"></div>

                                                    </label>
                                                </div>
                                            </div>
                                        </li>)
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Obstetrics</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        ObstetricsArray.length > 0 &&
                                        ObstetricsArray.map((item, i) => <li key={i}>
                                            <div className="d-flex justify-content-between">
                                                <p className="w-75">{item.name}</p>
                                                <div className="ms-1">
                                                    <label className="switch me-1">
                                                        <input
                                                            name={item.id}
                                                            value={item.name}
                                                            type="checkbox"
                                                            onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setObstetricsValue([...obstetricsValue, value])
                                                                } else {
                                                                    const dataNe = obstetricsValue.filter(item => item !== value)
                                                                    setObstetricsValue(dataNe)
                                                                }
                                                            }}
                                                            id="togBtn"
                                                        />
                                                        <div className="slider round"></div>

                                                    </label>
                                                </div>
                                            </div>
                                        </li>)
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item>
                                <Accordion.Header>Breast</Accordion.Header>
                                <Accordion.Body>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Breast lump</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange26(!change26); setBreastLump([]); setBreastLumpSide("") }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl26(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change26 &&
                                                        <Popover
                                                            id={id26}
                                                            open={open26}
                                                            anchorEl={anchorEl26}
                                                            onClose={() => setAnchorEl26(null)}
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
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <div className="form-check ms-1">
                                                                            <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setBreastLumpSide(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                Left
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check ms-1">
                                                                            <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setBreastLumpSide(e.target.value)} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                Right
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        {
                                                                            breastLumpArray.length > 0 && breastLumpArray.map((item, i) =>
                                                                                <div key={i} className="form-check ms-1">
                                                                                    <input className="form-check-input"
                                                                                        value={item.name}
                                                                                        type="checkbox"
                                                                                        name={item.id}
                                                                                        onChange={(e) => {
                                                                                            const { checked, value } = e.target;
                                                                                            if (checked) {
                                                                                                setBreastLump([...breastLump, value])
                                                                                            } else {
                                                                                                const dataNe = breastLump.filter(item => item !== value)
                                                                                                setBreastLump(dataNe)
                                                                                            }
                                                                                        }
                                                                                        } id="flexRadioDefault1" />
                                                                                    <label className="form-check-label" >
                                                                                        {item.name}
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
                                        </div>
                                        <div className="history-popup-value">
                                            <p>{breastLumpSide}</p>
                                            {
                                                Object.keys(breastLump).map((item, i) => <p key={i}>{breastLump[item]}</p>)
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Breast pain</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange27(!change27); setBreastPain("") }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl27(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change27 &&
                                                        <Popover
                                                            id={id27}
                                                            open={open27}
                                                            anchorEl={anchorEl27}
                                                            onClose={() => setAnchorEl27(null)}
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
                                                                    breastPainArray.length > 0 && breastPainArray.map((item, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check ms-1">
                                                                                <input className="form-check-input"
                                                                                    value={item.name}
                                                                                    type="radio"
                                                                                    name="side"
                                                                                    onChange={(e) => setBreastPain(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {item.name}
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
                                        <div className="history-popup-value">
                                            <p>{breastPain}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">H/O Breast Abscess</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange28(!change28); setBreastAbscess("") }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl28(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change28 &&
                                                        <Popover
                                                            id={id28}
                                                            open={open28}
                                                            anchorEl={anchorEl28}
                                                            onClose={() => setAnchorEl28(null)}
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
                                                                    hOBreastAbscess.length > 0 && hOBreastAbscess.map((item, i) => {
                                                                        return (
                                                                            <div key={i} className="form-check ms-1">
                                                                                <input className="form-check-input"
                                                                                    value={item.name}
                                                                                    type="radio"
                                                                                    name="side"
                                                                                    onChange={(e) => setBreastAbscess(e.target.value)} id="flexRadioDefault1" />
                                                                                <label className="form-check-label" >
                                                                                    {item.name}
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
                                        <div className="history-popup-value">
                                            <p>{breastAbscess}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex justify-content-between">
                                            <p className="w-75">Breast nipple discharge</p>
                                            <div className="ms-1">
                                                <label className="switch me-1">
                                                    <input
                                                        name="Jaundiced"
                                                        value="Jaundiced"
                                                        type="checkbox"
                                                        onChange={(e) => { setChange29(!change29); setBreastNippleDischarge([]); }}
                                                        id="togBtn"
                                                    />
                                                    <div onClick={(e) => setAnchorEl29(e.currentTarget)} className="slider round"></div>
                                                    {
                                                        change29 &&
                                                        <Popover
                                                            id={id29}
                                                            open={open29}
                                                            anchorEl={anchorEl29}
                                                            onClose={() => setAnchorEl29(null)}
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
                                                                    breastNippleArray.length > 0 && breastNippleArray.map((item, i) =>
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input"
                                                                                value={item.name}
                                                                                type="checkbox"
                                                                                name={item.id}
                                                                                onChange={(e) => {
                                                                                    const { checked, value } = e.target;
                                                                                    if (checked) {
                                                                                        setBreastNippleDischarge([...breastNippleDischarge, value])
                                                                                    } else {
                                                                                        const dataNe = breastNippleDischarge.filter(item => item !== value)
                                                                                        setBreastNippleDischarge(dataNe)
                                                                                    }
                                                                                }} id="flexRadioDefault1" />
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
                                            {
                                                Object.keys(breastNippleDischarge).map((item, i) => <p key={i}>{breastNippleDischarge[item]}</p>)
                                            }
                                        </div>
                                    </li>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>


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
            <div className="col-9">
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
                                    <button onClick={saveWomenHealthData} className="vaital-setup-btn float-end me-2">Save</button>
                            }

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Vulva</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange(!change); setVulva([]) }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl(e.currentTarget)} className="slider round"></div>
                                        {
                                            change &&
                                            <Popover
                                                className='mt-2'
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

                                                <div style={{ width: "400px" }} className="left-popup">
                                                    <div className="row">
                                                        {
                                                            vulvaArray.length > 0 && vulvaArray.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="col-6">
                                                                        <div className="form-check ms-1">
                                                                            <input className="form-check-input"
                                                                                value={item.name}
                                                                                type="checkbox"
                                                                                name={item.id}
                                                                                onChange={(e) => {
                                                                                    const { checked, value } = e.target;
                                                                                    if (checked) {
                                                                                        setVulva([...vulva, value])
                                                                                    } else {
                                                                                        const dataNe = vulva.filter(item => item !== value)
                                                                                        setVulva(dataNe)
                                                                                    }
                                                                                }
                                                                                } id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                {
                                    Object.keys(vulva).map((item, i) => <p key={i}>{vulva[item]}</p>)
                                }
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Pelvic Mass</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange1(!change1); setPelvicMass("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl1(e.currentTarget)} className="slider round"></div>
                                        {
                                            change1 &&
                                            <Popover
                                                className='mt-2'
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
                                                        pelvicMassArray.length > 0 && pelvicMassArray.map((item, i) =>
                                                            <div key={i} className="form-check ms-1">
                                                                <input className="form-check-input"
                                                                    value={item.name}
                                                                    type="radio"
                                                                    name={item.id}
                                                                    onChange={(e) => setPelvicMass(e.target.value)} id="flexRadioDefault1" />
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
                                <p>{pelvicMass}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Forniceal Tenderness</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setFornicealTenderness(!fornicealTenderness) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Bulky Uterus</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setBulkyUterus(!bulkyUterus) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Bartholin Glands</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange2(!change2); setBartholinGlandes(""); setBartholinGlandesSide("") }}
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
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setBartholinGlandesSide(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Left
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setBartholinGlandesSide(e.target.value)} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Right
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            {
                                                                bartholinGlandesArray.length > 0 && bartholinGlandesArray.map((item, i) =>
                                                                    <div key={i} className="form-check pe-1">
                                                                        <input className="form-check-input"
                                                                            value={item.name}
                                                                            type="radio"
                                                                            name={item.id}
                                                                            onChange={(e) => setBartholinGlandes(e.target.value)} id="flexRadioDefault1" />
                                                                        <label className="form-check-label" >
                                                                            {item.name}
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
                            </div>
                            <div className="history-popup-value d-flex">
                                <p className='me-1'>{bartholinGlandesSide}</p> <p>{`${bartholinGlandes && "|"} `}</p>
                                <p>{bartholinGlandes}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Cervix</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange3(!change3); setCervix([]) }}
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
                                                        cervixArray.length > 0 && cervixArray.map((item, i) =>
                                                            <div key={i} className="form-check ms-1">
                                                                <input className="form-check-input"
                                                                    value={item.name}
                                                                    type="checkbox"
                                                                    name={item.id}
                                                                    onChange={(e) => {
                                                                        const { checked, value } = e.target;
                                                                        if (checked) {
                                                                            setCervix([...cervix, value])
                                                                        } else {
                                                                            const dataNe = cervix.filter(item => item !== value)
                                                                            setCervix(dataNe)
                                                                        }
                                                                    }

                                                                    } id="flexRadioDefault1" />
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
                                {
                                    Object.keys(cervix).map((item, i) => <p key={i}>{cervix[item]}</p>)
                                }
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Forniceal Mass</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setFornicealMass(!fornicealMass) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Anteverted Uterus</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setAntevertedUterus(!antevertedUterus) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Cervical screen</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange4(!change4); setCst([]) }}
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
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        cstArray.length > 0 && cstArray.map((item, i) =>
                                                            <div key={i} className="form-check ms-1">
                                                                <input className="form-check-input"
                                                                    value={item.name}
                                                                    type="checkbox"
                                                                    name={item.id}
                                                                    onChange={(e) => {
                                                                        const { checked, value } = e.target;
                                                                        if (checked) {
                                                                            setCst([...cst, value])
                                                                        } else {
                                                                            const dataNe = cst.filter(item => item !== value)
                                                                            setCst(dataNe)
                                                                        }
                                                                    }
                                                                    } id="flexRadioDefault1" />
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
                                {
                                    Object.keys(cst).map((item, i) => <p key={i}>{cst[item]}</p>)
                                }
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Uterine tenderness</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setUterineTenderness(!uterineTenderness) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Retroverted Uterus</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setRetrovertedUterus(!retrovertedUterus) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <h6 className="my-1">Breast</h6>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Breast</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange5(!change5); setBreast("") }}
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
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setBreast(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setBreast(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{breast}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Peau d’orange</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange6(!change6); setPeau("") }}
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
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setPeau(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setPeau(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="side" onChange={(e) => setPeau(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{peau}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Redness</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange7(!change7); setRedness("") }}
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
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setRedness(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setRedness(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="side" onChange={(e) => setRedness(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{redness}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Nipple inversion</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange8(!change8); setNippleInversion("") }}
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
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setNippleInversion(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setNippleInversion(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="side" onChange={(e) => setNippleInversion(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{nippleInversion}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Visible Veins</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange9(!change9); setVisibleVeins("") }}
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
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setVisibleVeins(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setVisibleVeins(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="side" onChange={(e) => setVisibleVeins(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{visibleVeins}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Tethering</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange10(!change10); setTeethering("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl10(e.currentTarget)} className="slider round"></div>
                                        {
                                            change10 &&
                                            <Popover
                                                id={id10}
                                                open={open10}
                                                anchorEl={anchorEl10}
                                                onClose={() => setAnchorEl10(null)}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setTeethering(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setTeethering(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="side" onChange={(e) => setTeethering(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{teethering}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Hot</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange11(!change11); setHot("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl11(e.currentTarget)} className="slider round"></div>
                                        {
                                            change11 &&
                                            <Popover
                                                id={id11}
                                                open={open11}
                                                anchorEl={anchorEl11}
                                                onClose={() => setAnchorEl11(null)}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setHot(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setHot(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="side" onChange={(e) => setHot(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{hot}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Axillary Nodes</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange12(!change12); setAxillaryNodes("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl12(e.currentTarget)} className="slider round"></div>
                                        {
                                            change12 &&
                                            <Popover
                                                id={id12}
                                                open={open12}
                                                anchorEl={anchorEl12}
                                                onClose={() => setAnchorEl12(null)}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left Palbale" type="radio" name="side" onChange={(e) => setAxillaryNodes(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left Palbale
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right Palbale" type="radio" name="side" onChange={(e) => setAxillaryNodes(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right Palbale
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both Palbale" type="radio" name="side" onChange={(e) => setAxillaryNodes(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both Palbale
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Not Palbale" type="radio" name="side" onChange={(e) => setAxillaryNodes(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Not Palbale
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{axillaryNodes}</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Skin Dimpling</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange13(!change13); setSkinDimpling("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl13(e.currentTarget)} className="slider round"></div>
                                        {
                                            change13 &&
                                            <Popover
                                                className='mt-2'
                                                id={id13}
                                                open={open13}
                                                anchorEl={anchorEl13}
                                                onClose={() => setAnchorEl13(null)}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setSkinDimpling(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setSkinDimpling(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="side" onChange={(e) => setSkinDimpling(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{skinDimpling}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Asymmetric  Elevation</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange14(!change14); setAsymetricElevation("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl14(e.currentTarget)} className="slider round"></div>
                                        {
                                            change14 &&
                                            <Popover
                                                className='mt-2'
                                                id={id14}
                                                open={open14}
                                                anchorEl={anchorEl14}
                                                onClose={() => setAnchorEl14(null)}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setAsymetricElevation(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setAsymetricElevation(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="side" onChange={(e) => setAsymetricElevation(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{asymetricElevation}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Swelling</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange15(!change15); setSwelling("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl15(e.currentTarget)} className="slider round"></div>
                                        {
                                            change15 &&
                                            <Popover
                                                className='mt-2'
                                                id={id15}
                                                open={open15}
                                                anchorEl={anchorEl15}
                                                onClose={() => setAnchorEl15(null)}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="side" onChange={(e) => setSwelling(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="side" onChange={(e) => setSwelling(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="side" onChange={(e) => setSwelling(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{swelling}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Supraclavicular Node</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange16(!change16); setSupraclavicularNode("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl16(e.currentTarget)} className="slider round"></div>
                                        {
                                            change16 &&
                                            <Popover
                                                className='mt-2'
                                                id={id16}
                                                open={open16}
                                                anchorEl={anchorEl16}
                                                onClose={() => setAnchorEl16(null)}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left Palbale" type="radio" name="side" onChange={(e) => setSupraclavicularNode(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left Palbale
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right Palbale" type="radio" name="side" onChange={(e) => setSupraclavicularNode(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right Palbale
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both Palbale" type="radio" name="side" onChange={(e) => setSupraclavicularNode(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Both Palbale
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Not Palbale" type="radio" name="side" onChange={(e) => setSupraclavicularNode(e.target.value)} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Not Palbale
                                                        </label>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value d-flex">
                                <p>{supraclavicularNode}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row mt-2">
                    <h6 className="my-1">LUMP</h6>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">LUMP</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange17(!change17); setLumpCmForNipple(""); setLumpOClock(""); setLumpX(""); setLumpY("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl17(e.currentTarget)} className="slider round"></div>
                                        {
                                            change17 &&
                                            <Popover
                                                className='mt-2'
                                                id={id17}
                                                open={open17}
                                                anchorEl={anchorEl17}
                                                onClose={() => setAnchorEl17(null)}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div style={{ width: "250px" }} className="left-popup">
                                                    <div className="row">
                                                        <div className="col-sm-5">
                                                            <input onChange={(e) => setLumpCmForNipple(e.target.value)} type="text" className="form-control" id="inputEmail3" />
                                                        </div>
                                                        <label className="col-sm-7 col-form-label">cm from nipple</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-5">
                                                            <input onChange={(e) => setLumpOClock(e.target.value)} type="text" className="form-control" id="inputEmail3" />
                                                        </div>
                                                        <label className="col-sm-7 col-form-label">‘ O Clock Position</label>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-sm-7">
                                                                    <input onChange={(e) => setLumpX(e.target.value)} type="text" className="form-control" id="inputEmail3" />
                                                                </div>
                                                                <label className="col-sm-5 col-form-label">mm X</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="col-sm-7">
                                                                    <input onChange={(e) => setLumpY(e.target.value)} type="text" className="form-control" id="inputEmail3" />
                                                                </div>
                                                                <label className="col-sm-5 col-form-label">mm</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="history-popup-value">
                                <p>{lumpCmForNipple} {`${lumpCmForNipple && " cm from nipple"} `}</p>
                                <p>{lumpOClock} {`${lumpOClock && " ‘ O Clock Position"} `}</p>
                                <p>{lumpX} {`${lumpX && " mm X"} `} {lumpY} {`${lumpY && " mm"} `}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">MUI</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setMUI(!MUI) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">LUO</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setLUO(!LUO) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">RUO</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setRUO(!RUO) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">RLI</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setRLI(!RLI) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">LLI</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setLLI(!LLI) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">RLO</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setRLO(!RLO) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">LLO</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setLLO(!LLO) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">LUI</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setLUI(!LUI) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WomenHealth;