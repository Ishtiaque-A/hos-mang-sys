import { Popover } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import clinic6 from "../../../../Images/clinical6.png";
toast.configure();

const Genito = (props) => {
    const [historyShowAll, setHistoryShowAll] = useState(true);
    const [history, setHistory] = useState([]);
    const [historySort, setHistorySort] = useState([]);
    const [renalMass, setRenalMass] = useState("");
    const [tenderness, setTenderness] = useState("");
    const [renalBruit, setRenalBruit] = useState("");
    const [aboveMargin, setAboveMargin] = useState("");
    const [noUpperBorder, setNoUpperBorder] = useState("");
    const [translucent, setTranslucent] = useState("");
    const [separation, setSeparation] = useState("");

    const [rectalExaminationPostion, setRectalExaminationPostion] = useState("");
    const [rectalExamination, setRectalExamination] = useState("");


    const [hydrocele, setHydrocele] = useState("");
    const [testicularSwelling, setTesticularSwelling] = useState("");
    const [testicularMass, setTesticularMass] = useState("");
    const [testicularTenderness, setTesticularTenderness] = useState("");
    const [retractedTestis, setRetractedTestis] = useState("");
    const [scrotalTenderness, setScrotalTenderness] = useState("");
    const [undescendedTestis, setUndescendedTestis] = useState("");
    const [penialWart, setPenialWart] = useState("");
    const [pearly, setPearly] = useState("");
    const [inguinal, setInguinal] = useState("");
    const [phimosis, setPhimosis] = useState("");
    const [paraphimosis, setParaphimosis] = useState("");
    const [scrotal, setScrotal] = useState("");
    const [leucocytes, setLeucocytes] = useState("");
    const [nitrites, setNitrites] = useState("");
    const [bilirubin, setBilirubin] = useState("");
    const [ketones, setKetones] = useState("");
    const [urobiliongen, setUrobiliongen] = useState("");
    const [glucose, setGlucose] = useState("");
    const [specificGravity, setSpecificGravity] = useState("");
    const [ph, setPh] = useState("");
    const [color, setColor] = useState("");
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

    const [perrectalArray1, setperrectalArray1] = useState([])
    const [perrectalArray2, setperrectalArray2] = useState([])

    useEffect(() => {
        let controller = new AbortController();
        axios.get(`/commonHistory-all/genito`, { signal: controller.signal }).then(res => {
            setHistory(res.data.commonHistory)
            setHistorySort(res.data.commonHistory)
        });

        axios.get(`/urine-analysis`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {

                var i = res.data.urineanalysis.length / 2;

                const tem1 = res.data.urineanalysis.slice(0, i)
                seturineanalysisArray1(tem1)

                const tem2 = res.data.urineanalysis.slice(i, res.data.urineanalysis.length)
                seturineanalysisArray2(tem2)

            }

        });


        axios.get(`/per-rectal`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {

                let i = res.data.perrectal.length / 2;

                const tem1 = res.data.perrectal.slice(0, i)
                setperrectalArray1(tem1)

                const tem2 = res.data.perrectal.slice(i, res.data.perrectal.length)
                setperrectalArray2(tem2)
            }
        });

        return () => { controller.abort() }
    }, [])

    const [urineanalysisArray1, seturineanalysisArray1] = useState([]);
    const [urineanalysisArray2, seturineanalysisArray2] = useState([]);
    const [HistoryValue, setHistoryValue] = useState([])
    const [urineAnalysisAllNormal, seturineAnalysisAllNormal] = useState(false)
    const [saveLoding, setsaveLoding] = useState(false)

    const saveGenito = () => {
        setsaveLoding(true)
        const data = {
            patient_id: props.patient_id,
            Genito_History: HistoryValue,
            renalMass: renalMass,
            tenderness: tenderness,
            renalBruit: renalBruit,
            aboveMargin: aboveMargin,
            noUpperBorder: noUpperBorder,
            translucent: translucent,
            separation: separation,
            rectalExaminationPostion: rectalExaminationPostion,
            rectalExamination: rectalExamination.toString(),
            hydrocele: hydrocele,
            testicularSwelling: testicularSwelling,
            testicularMass: testicularMass,
            testicularTenderness: testicularTenderness,
            retractedTestis: retractedTestis,
            undescendedTestis: undescendedTestis,

            scrotalTenderness: scrotalTenderness,

            penialWart: penialWart,
            pearly: pearly,
            inguinal: inguinal,
            phimosis: phimosis,
            paraphimosis: paraphimosis,
            scrotal: scrotal,

            urineAnalysisAllNormal: urineAnalysisAllNormal ? 1 : 0,

            leucocytes: leucocytes,
            nitrites: nitrites,
            bilirubin: bilirubin,
            ketones: ketones,
            urobiliongen: urobiliongen,
            glucose: glucose,
            specificGravity: specificGravity,
            ph: ph,

            color: color

        }

        axios.post('/save-genito', data).then(res => {
            const note = `
<p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Genito Urinary:</strong></span></p>

${res.data.genito.Genito_History === "" ? "" : `
<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;">
    <strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${res.data.genito.Genito_History === "" ? "" : "History: "}</span></strong></p>
<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 15px;">
    ${res.data.genito.Genito_History.replaceAll(',', ' . ')}
</span></span></p>`}

${(res.data.genito.renalMass || res.data.genito.tenderness || res.data.genito.renalBruit) ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;">
    <strong><span style="font-family: Roboto; color: rgb(54, 54, 54);"> Examination: </span></strong></p>

     ${res.data.genito.renalMass === null ? "" : `Renal Mass Present : ${res.data.genito.renalMass} .`}
                ${res.data.genito.tenderness === null ? "" : `Loin TendernessRenal Bruit Present : ${res.data.genito.tenderness} .`}
                ${res.data.genito.renalBruit === null ? "" : `Renal Bruit Present :${res.data.genito.renalBruit} `}
    
    
    ` : ""}



${(res.data.genito.hydrocele || res.data.genito.scrotal) ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;">
    <strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">Scrotal examination: </span></strong></p>
${res.data.genito.hydrocele === null && res.data.genito.scrotal === null ? "" :
                        `<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
   ${res.data.genito.hydrocele === null ? "" : `
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
    Hydrocele Present on </span>
    <u>${res.data.genito.hydrocele}</u><span style="font-size: 15px;"> side &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
    </span>
   `}
    
    ${res.data.genito.hydrocele === null ? "" : ` 
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
        Scrotal tenderness Present on </span>
        <u>${res.data.genito.hydrocele}</u><span style="font-size: 15px;"> side</span>`}
        
</p>`}` : ""}



${res.data.genito.aboveMargin === null && res.data.genito.noUpperBorder === null ? "" :
                    `<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
   ${res.data.genito.aboveMargin === null ? "" : `
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
    Able to get above margin Present on </span>
    <u>${res.data.genito.aboveMargin}</u><span style="font-size: 15px;"> side &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
    </span>
   `}
    
    ${res.data.genito.noUpperBorder === null ? "" : ` 
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
        No upper border Present on </span>
        <u>${res.data.genito.noUpperBorder}</u><span style="font-size: 15px;"> side</span>`}
    
</p>`}
${res.data.genito.translucent === null && res.data.genito.separation === null ? "" :
                    `<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
   ${res.data.genito.translucent === null ? "" : `
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
    Translucent on light Present on </span>
    <u>${res.data.genito.translucent}</u><span style="font-size: 15px;"> side &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
    </span>
   `}
    
    ${res.data.genito.separation === null ? "" : ` 
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
        Separation from testis Present on </span>
        <u>${res.data.genito.separation}</u><span style="font-size: 15px;"> side</span>`}
    
</p>`}

${res.data.genito.scrotal === null && res.data.genito.testicularSwelling === null ? "" :
                    `<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
   ${res.data.genito.scrotal === null ? "" : `
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
    Scrotal skin cyst present on </span>
    <u>${res.data.genito.scrotal}</u><span style="font-size: 15px;"> side &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
    </span>
   `}
    ${res.data.genito.testicularSwelling === null ? "" : ` 
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
        
        Testicular swelling present on </span>
        <u>${res.data.genito.testicularSwelling}</u><span style="font-size: 15px;"> side</span>`}
</p>`}
${res.data.genito.testicularMass === null && res.data.genito.testicularTenderness === null ? "" :
                    `<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
   ${res.data.genito.testicularMass === null ? "" : `
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
    Testicular Mass Present on </span>
    <u>${res.data.genito.testicularMass}</u><span style="font-size: 15px;"> side &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
    </span>
   `}
    ${res.data.genito.testicularTenderness === null ? "" : ` 
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
        Testicular Tenderness Present on </span>
        <u>${res.data.genito.testicularTenderness}</u><span style="font-size: 15px;"> side</span>`}
    
</p>`}
${res.data.genito.retractedTestis === null && res.data.genito.undescendedTestis === null ? "" :
                    `<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
   ${res.data.genito.retractedTestis === null ? "" : `
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
    Retracted testis Present on </span>
    <u>${res.data.genito.retractedTestis}</u><span style="font-size: 15px;"> side &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
    </span>
   `}
    ${res.data.genito.undescendedTestis === null ? "" : ` 
    <span style="font-size: 15px; font-family: Roboto; color: rgb(54, 54, 54);"> 
        Undescended testis present on </span>
        <u>${res.data.genito.undescendedTestis}</u><span style="font-size: 15px;"> side</span>`}
    
</p>`}

${(res.data.genito.penialWart || res.data.genito.pearly || res.data.genito.inguinal || res.data.genito.phimosis || res.data.genito.paraphimosis || res.data.genito.rectalExamination) ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;">
    <strong><span style="font-family: Roboto; color: rgb(54, 54, 54);"> Penial examination: </span></strong></p>

<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
    <span style="font-family: Roboto; color: rgb(54, 54, 54);">
    ${res.data.genito.penialWart === null ? "" : `<span style="font-size: 15px;">Penial wart Present on <u>${res.data.genito.penialWart}</u></span> side . </span>`}
    ${res.data.genito.pearly === null ? "" : `<span style="font-size: 15px;">Pearly papules around glan penis Present on <u>${res.data.genito.pearly}</u></span> side . </span>`}
    ${res.data.genito.inguinal === null ? "" : `<span style="font-size: 15px;">Inguinal Lymph node palpable Present on <u>${res.data.genito.inguinal}</u></span> side . </span>`}
    ${res.data.genito.phimosis === null ? "" : `<span style="font-size: 15px;">Phimosis Present on <u>${res.data.genito.phimosis}</u></span> side . </span>`}
    ${res.data.genito.paraphimosis === null ? "" : `<span style="font-size: 15px;">Paraphimosis Present on <u>${res.data.genito.paraphimosis}</u></span> side . </span>`}
    ${res.data.genito.rectalExamination === null ? "" : `Per rectal examination Present on <u>${res.data.genito.rectalExamination}</u> and Position ${res.data.genito.rectalExaminationPostion} O'Clocks.`}
</p>` : ""}



${res.data.genito.urineAnalysisAllNormal === 1 ? `
<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;">
    <strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">Urine Analysis : </span></strong> All Normal</p>

                `
                    :
                    `
${(res.data.genito.nitrites || res.data.genito.bilirubin || res.data.genito.ketones || res.data.genito.urobiliongen || res.data.genito.glucose || res.data.genito.specificGravity || res.data.genito.ph || res.data.genito.leucocytes) ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;">
    <strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">Urine Analysis :</span></strong></p>` : ""}

${(res.data.genito.leucocytes || res.data.genito.nitrites || res.data.genito.bilirubin || res.data.genito.urobiliongen || res.data.genito.glucose || res.data.genito.specificGravity || res.data.genito.ph || res.data.genito.color) ? `<p class= "MsoNormal" style = "margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;" >
            <span style="font-family: Roboto; color: rgb(54, 54, 54);">
                ${res.data.genito.leucocytes === null ? "" : `<span style="font-size: 15px;">Leucocytes <u> ${res.data.genito.leucocytes} </u></span> . </span>`}
                ${res.data.genito.nitrites === null ? "" : `<span style="font-size: 15px;">Nitrites <u> ${res.data.genito.nitrites} </u></span> . </span>`}
                ${res.data.genito.bilirubin === null ? "" : `<span style="font-size: 15px;">Bilirubin <u> ${res.data.genito.bilirubin} </u></span> . </span>`}
                ${res.data.genito.ketones === null ? "" : `<span style="font-size: 15px;">Ketones <u> ${res.data.genito.ketones} </u></span> . </span>`}
                ${res.data.genito.urobiliongen === null ? "" : `<span style="font-size: 15px;">Urobilinogen <u> ${res.data.genito.urobiliongen} </u></span> . </span>`}
                ${res.data.genito.glucose === null ? "" : `<span style="font-size: 15px;">Glucose <u> ${res.data.genito.glucose} </u></span> . </span>`}
                ${res.data.genito.specificGravity === null ? "" : `<span style="font-size: 15px;">Specific Gravity <u> ${res.data.genito.specificGravity} </u></span> . </span>`}
                ${res.data.genito.ph === null ? "" : `<span style="font-size: 15px;">Ph <u> ${res.data.genito.ph} </u></span> . </span>`}
                ${res.data.genito.color === null ? "" : `<span style="font-size: 15px;">Color <u> ${res.data.genito.color} </u></span> . </span>`}
            </p>` : ""}

                `
                }



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
        <div className='row'>
            <div className="history-main-header d-flex justify-content-between mb-2">
                <div>
                    <h6>Genito Urinary</h6>
                </div>
                <div>
                    <img src={clinic6} alt="" className="img-fluid" />
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
                                                        const { value, checked } = e.target;

                                                        if (checked) {
                                                            setHistoryValue([...HistoryValue, value])
                                                        } else {
                                                            const newValue = HistoryValue.filter((item) => item !== value)
                                                            setHistoryValue(newValue)
                                                        }
                                                    }
                                                    }
                                                    id="togBtn"
                                                />
                                                <div className="slider round"></div>

                                            </label>
                                        </div>
                                    </div>
                                </li>

                                ) :
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
                                    <button className="vaital-setup-btn float-end me-2"><i className="fas fa-check-circle"></i></button>
                                    :
                                    <button onClick={saveGenito} className="vaital-setup-btn float-end me-2">Save</button>
                            }

                        </div>
                    </div>
                </div>
                <div className="row">
                    <h6 className="my-1">Renal Examination</h6>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Renal Mass</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange(!change); setRenalMass("") }}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setRenalMass(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setRenalMass(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setRenalMass(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{renalMass}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Loin Tenderness</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange1(!change1); setTenderness("") }}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setTenderness(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setTenderness(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setTenderness(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{tenderness}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Renal Bruit</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange2(!change2); setRenalBruit("") }}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setRenalBruit(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setRenalBruit(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setRenalBruit(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{renalBruit}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <h6 className="my-1">Scrotal Examination</h6>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Hydrocele</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange8(!change8); setHydrocele("") }}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setHydrocele(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setHydrocele(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setHydrocele(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{hydrocele}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Scrotal tenderness</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange13(!change13); setScrotalTenderness("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl13(e.currentTarget)} className="slider round"></div>
                                        {
                                            change13 &&
                                            <Popover
                                                id={id13}
                                                open={open13}
                                                anchorEl={anchorEl13}
                                                onClose={() => setAnchorEl13(null)}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setScrotalTenderness(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setScrotalTenderness(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setScrotalTenderness(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{scrotalTenderness}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Able to get above margin</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange3(!change3); setAboveMargin("") }}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setAboveMargin(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setAboveMargin(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setAboveMargin(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{aboveMargin}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">No upper border</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange4(!change4); setNoUpperBorder("") }}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setNoUpperBorder(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setNoUpperBorder(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setNoUpperBorder(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{noUpperBorder}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Translucent on light</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange5(!change5); setTranslucent("") }}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setTranslucent(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setTranslucent(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setTranslucent(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{translucent}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Separation from testis</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange6(!change6); setSeparation("") }}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setSeparation(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setSeparation(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setSeparation(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{separation}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Scrotal skin cyst</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange19(!change19); setScrotal("") }}
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
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setScrotal(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setScrotal(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setScrotal(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{scrotal}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Testicular Swelling</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange9(!change9); setTesticularSwelling("") }}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setTesticularSwelling(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setTesticularSwelling(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setTesticularSwelling(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{testicularSwelling}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Testicular Mass</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange10(!change10); setTesticularMass("") }}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setTesticularMass(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setTesticularMass(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setTesticularMass(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{testicularMass}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Testicular Tenderness</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange11(!change11); setTesticularTenderness("") }}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setTesticularTenderness(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setTesticularTenderness(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setTesticularTenderness(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{testicularTenderness}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Retracted testis</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange12(!change12); setRetractedTestis("") }}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setRetractedTestis(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setRetractedTestis(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setRetractedTestis(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{retractedTestis}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Undescended Testis</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange28(!change28); setUndescendedTestis("") }}
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
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setUndescendedTestis(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setUndescendedTestis(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Right
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Both" type="radio" name="cough1" onChange={(e) => { setUndescendedTestis(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{undescendedTestis}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <h6 className="my-1">Penial Examination</h6>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Penial wart</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange14(!change14); setPenialWart("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl14(e.currentTarget)} className="slider round"></div>
                                        {
                                            change14 &&
                                            <Popover
                                                id={id14}
                                                open={open14}
                                                anchorEl={anchorEl14}
                                                onClose={() => setAnchorEl14(null)}
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
                                                        <input className="form-check-input" value="Present" type="radio" name="cough1" onChange={(e) => { setPenialWart(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Present
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Absent" type="radio" name="cough1" onChange={(e) => { setPenialWart(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{penialWart}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Pearly papules around glans penis</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange15(!change15); setPearly("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl15(e.currentTarget)} className="slider round"></div>
                                        {
                                            change15 &&
                                            <Popover
                                                id={id15}
                                                open={open15}
                                                anchorEl={anchorEl15}
                                                onClose={() => setAnchorEl15(null)}
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
                                                        <input className="form-check-input" value="Present" type="radio" name="cough1" onChange={(e) => { setPearly(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Present
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Absent" type="radio" name="cough1" onChange={(e) => { setPearly(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{pearly}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Inguinal Lymph node palpable</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange16(!change16); setInguinal("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl16(e.currentTarget)} className="slider round"></div>
                                        {
                                            change16 &&
                                            <Popover
                                                id={id16}
                                                open={open16}
                                                anchorEl={anchorEl16}
                                                onClose={() => setAnchorEl16(null)}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setInguinal(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setInguinal(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{inguinal}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Phimosis</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange17(!change17); setPhimosis("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl17(e.currentTarget)} className="slider round"></div>
                                        {
                                            change17 &&
                                            <Popover
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
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Present" type="radio" name="cough1" onChange={(e) => { setPhimosis(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Present
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Absent" type="radio" name="cough1" onChange={(e) => { setPhimosis(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{phimosis}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Paraphimosis</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange18(!change18); setParaphimosis("") }}
                                            id="togBtn"
                                        />
                                        <div onClick={(e) => setAnchorEl18(e.currentTarget)} className="slider round"></div>
                                        {
                                            change18 &&
                                            <Popover
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
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Present" type="radio" name="cough1" onChange={(e) => { setParaphimosis(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Present
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Absent" type="radio" name="cough1" onChange={(e) => { setParaphimosis(e.target.value) }} id="flexRadioDefault1" />
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
                            <div className="history-popup-value">
                                <p>{paraphimosis}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"></div>
                    <div className="col-4"></div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Per rectal examination</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange7(!change7); setRectalExamination("") }}
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
                                                    <div className="form-check d-flex">

                                                        <label className="form-check-label" >
                                                            Position
                                                        </label>
                                                        <input onChange={(e) => setRectalExaminationPostion(e.target.value)} className='per_rectal_position' type="text" />
                                                        <label className="form-check-label">O'Clocks</label>

                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">

                                                            {
                                                                perrectalArray1.length > 0 &&
                                                                perrectalArray1.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.perrectal_name} type="checkbox" name="cough1" onChange={(e) => {

                                                                                const { checked, value } = e.target;

                                                                                if (checked) {
                                                                                    setRectalExamination([...rectalExamination, value])
                                                                                } else {
                                                                                    const newCn = rectalExamination.filter((item) => item !== value)
                                                                                    setRectalExamination(newCn)
                                                                                }

                                                                            }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.perrectal_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                        <div className="col-6">
                                                            {
                                                                perrectalArray2.length > 0 &&
                                                                perrectalArray2.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.perrectal_name} type="checkbox" name="cough1" onChange={(e) => {
                                                                                const { checked, value } = e.target;

                                                                                if (checked) {
                                                                                    setRectalExamination([...rectalExamination, value])
                                                                                } else {
                                                                                    const newCn = rectalExamination.filter((item) => item !== value)
                                                                                    setRectalExamination(newCn)
                                                                                }
                                                                            }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.perrectal_name}
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
                            </div>
                            <div className="history-popup-value">
                                <p>{rectalExaminationPostion === "" ? "" : ` Position : ${rectalExaminationPostion}`}</p>
                                <p>{rectalExamination}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="">
                        <h6 className='d-inline-block me-4'>Urine Analysis</h6>
                        <label className="form-check-label me-4" for="flexCheckDefault">
                            All Normal
                        </label>
                        <input className="form-check-input" onChange={() => seturineAnalysisAllNormal(!urineAnalysisAllNormal)} type="checkbox" id="flexCheckDefault" />
                    </div>
                    {
                        !urineAnalysisAllNormal &&
                        <>
                            <div className="col-4">
                                <div className="exam-bg-white p-1">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">Leucocyte</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name="Jaundiced"
                                                    value="Jaundiced"
                                                    type="checkbox"
                                                    onChange={(e) => { setChange20(!change20); setLeucocytes("") }}
                                                    id="togBtn"
                                                />
                                                <div onClick={(e) => setAnchorEl20(e.currentTarget)} className="slider round"></div>
                                                {
                                                    change20 &&
                                                    <Popover
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
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Positive" type="radio" name="cough1" onChange={(e) => { setLeucocytes(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Positive
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Negative" type="radio" name="cough1" onChange={(e) => { setLeucocytes(e.target.value) }} id="flexRadioDefault1" />
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
                                    <div className="history-popup-value">
                                        <p>{leucocytes}</p>
                                    </div>
                                </div>
                                <div className="exam-bg-white p-1 mt-2">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">Nitrites</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name="Jaundiced"
                                                    value="Jaundiced"
                                                    type="checkbox"
                                                    onChange={(e) => { setChange21(!change21); setNitrites("") }}
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
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Positive" type="radio" name="cough1" onChange={(e) => { setNitrites(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Positive
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Negative" type="radio" name="cough1" onChange={(e) => { setNitrites(e.target.value) }} id="flexRadioDefault1" />
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
                                    <div className="history-popup-value">
                                        <p>{nitrites}</p>
                                    </div>
                                </div>
                                <div className="exam-bg-white p-1 mt-2">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">Bilirubin</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name="Jaundiced"
                                                    value="Jaundiced"
                                                    type="checkbox"
                                                    onChange={(e) => { setChange22(!change22); setBilirubin("") }}
                                                    id="togBtn"
                                                />
                                                <div onClick={(e) => setAnchorEl22(e.currentTarget)} className="slider round"></div>
                                                {
                                                    change22 &&
                                                    <Popover
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
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Positive" type="radio" name="cough1" onChange={(e) => { setBilirubin(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Positive
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Negative" type="radio" name="cough1" onChange={(e) => { setBilirubin(e.target.value) }} id="flexRadioDefault1" />
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
                                    <div className="history-popup-value">
                                        <p>{bilirubin}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="exam-bg-white p-1">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">Ketones</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name="Jaundiced"
                                                    value="Jaundiced"
                                                    type="checkbox"
                                                    onChange={(e) => { setChange23(!change23); setKetones("") }}
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
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Positive" type="radio" name="cough1" onChange={(e) => { setKetones(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Positive
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Negative" type="radio" name="cough1" onChange={(e) => { setKetones(e.target.value) }} id="flexRadioDefault1" />
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
                                    <div className="history-popup-value">
                                        <p>{ketones}</p>
                                    </div>
                                </div>
                                <div className="exam-bg-white p-1 mt-2">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">Urobilinogen</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name="Jaundiced"
                                                    value="Jaundiced"
                                                    type="checkbox"
                                                    onChange={(e) => { setChange24(!change24); setUrobiliongen("") }}
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
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Positive" type="radio" name="cough1" onChange={(e) => { setUrobiliongen(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Positive
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Negative" type="radio" name="cough1" onChange={(e) => { setUrobiliongen(e.target.value) }} id="flexRadioDefault1" />
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
                                    <div className="history-popup-value">
                                        <p>{urobiliongen}</p>
                                    </div>
                                </div>
                                <div className="exam-bg-white p-1 mt-2">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">Glucose</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name="Jaundiced"
                                                    value="Jaundiced"
                                                    type="checkbox"
                                                    onChange={(e) => { setChange25(!change25); setGlucose("") }}
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
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Positive" type="radio" name="cough1" onChange={(e) => { setGlucose(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    Positive
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="Negative" type="radio" name="cough1" onChange={(e) => { setGlucose(e.target.value) }} id="flexRadioDefault1" />
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
                                    <div className="history-popup-value">
                                        <p>{glucose}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="exam-bg-white p-1">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">Specific Gravity</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name="Jaundiced"
                                                    value="Jaundiced"
                                                    type="checkbox"
                                                    onChange={(e) => { setChange26(!change26); setSpecificGravity("") }}
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
                                                            horizontal: 'right',
                                                        }}
                                                    >

                                                        <div className="left-popup">
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="1.005" type="radio" name="cough1" onChange={(e) => { setSpecificGravity(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    1.005
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="1.010" type="radio" name="cough1" onChange={(e) => { setSpecificGravity(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    1.010
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="1.015" type="radio" name="cough1" onChange={(e) => { setSpecificGravity(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    1.015
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="1.020" type="radio" name="cough1" onChange={(e) => { setSpecificGravity(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    1.020
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="1.025" type="radio" name="cough1" onChange={(e) => { setSpecificGravity(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    1.025
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Popover>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="history-popup-value">
                                        <p>{specificGravity}</p>
                                    </div>
                                </div>
                                <div className="exam-bg-white p-1 mt-2">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">Ph</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name="Jaundiced"
                                                    value="Jaundiced"
                                                    type="checkbox"
                                                    onChange={(e) => { setChange27(!change27); setPh("") }}
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
                                                            horizontal: 'right',
                                                        }}
                                                    >

                                                        <div className="left-popup">
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="5.5" type="radio" name="cough1" onChange={(e) => { setPh(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    5.5
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="6" type="radio" name="cough1" onChange={(e) => { setPh(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    6
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="6.5" type="radio" name="cough1" onChange={(e) => { setPh(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    6.5
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="7" type="radio" name="cough1" onChange={(e) => { setPh(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    7
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="7.5" type="radio" name="cough1" onChange={(e) => { setPh(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    7.5
                                                                </label>
                                                            </div>
                                                            <div className="form-check ms-1">
                                                                <input className="form-check-input" value="8" type="radio" name="cough1" onChange={(e) => { setPh(e.target.value) }} id="flexRadioDefault1" />
                                                                <label className="form-check-label" >
                                                                    8
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Popover>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="history-popup-value">
                                        <p>{ph}</p>
                                    </div>
                                </div>
                                <div className="exam-bg-white p-1 mt-2">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">Color</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name="Jaundiced"
                                                    value="Jaundiced"
                                                    type="checkbox"
                                                    onChange={(e) => { setChange29(!change29); setColor("") }}
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
                                                            horizontal: 'right',
                                                        }}
                                                    >

                                                        <div className="left-popup">
                                                            {
                                                                urineanalysisArray2.length > 0 &&
                                                                urineanalysisArray2.map((item, i) => <div className="form-check ms-1">
                                                                    <input className="form-check-input" value={item.urineanalysis_name} type="radio" name="cough1" onChange={(e) => { setColor(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {item.urineanalysis_name}
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
                                        <p>{color}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>
        </div >
    );
};

export default Genito;