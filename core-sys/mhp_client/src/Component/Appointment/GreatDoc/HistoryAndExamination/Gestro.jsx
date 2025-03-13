import { Popover } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import clinic4 from "../../../../Images/clinical4.png";
toast.configure();
const Gestro = (props) => {
    const [historyShowAll, setHistoryShowAll] = useState(false);
    const [othersShowAll, setOthersShowAll] = useState(false);
    const [site, setSite] = useState("");
    const [radiation, setRadiation] = useState("");
    const [pattern, setPattern] = useState("");
    const [duration, setDuration] = useState("");
    const [frequency, setFrequency] = useState("");
    const [score, setScore] = useState("");
    const [vomiting, setVomiting] = useState("");
    const [dysphagia, setDysphagia] = useState("");
    const [diarrhoea, setDiarrhoea] = useState("");
    const [constipation, setConstipation] = useState(false);
    const [habits, setHabits] = useState(false);
    const [stoolType, setStoolType] = useState("");
    const [PRBleed, setPRBleed] = useState("");
    const [skin, setSkin] = useState([]);
    const [parotid, setParotid] = useState(false);
    const [finger, setFinger] = useState([]);
    console.log("finger", finger)
    const [gynaecomastia, setGynaecomastia] = useState(false);
    const [tongue, setTongue] = useState([]);
    const [node, setNode] = useState("");
    const [bruit, setBruit] = useState("");
    const [murphy, setMurphy] = useState("");
    const [noneTender, setNoneTender] = useState(false);
    const [noMasses, setNoMasses] = useState(false);
    const [tenderness, setTenderness] = useState("");
    const [mass, setMass] = useState([]);
    const [umbillical, setUmbillical] = useState(false);
    const [incisional, setIncisional] = useState(false);
    const [inguinal, setInguinal] = useState(false);
    const [femoral, setFemoral] = useState(false);
    const [perRectal, setPerRectal] = useState([]);

    //backend not update
    const [perRectalPostion, setPerRectalPostion] = useState("");

    const [sigmoidoscopy, setSigmoidoscopy] = useState("");
    const [guaiac, setGuaiac] = useState("");

    const [historyArray, sethistoryArray] = useState([]);
    const [historySort, setHistorySort] = useState([]);
    const [abdomenArray, setabdomenArray] = useState([]);
    const [handAndFinger, setHandAndFinger] = useState([])
    const [siteArray, setsiteArray] = useState([])
    const [radiationArray, setradiationArray] = useState([])
    const [patternArray, setpatternArray] = useState([])
    const [durationArray, setdurationArray] = useState([])
    const [frequencyArray, setfrequencyArray] = useState([])
    const [ScoreArray, setScoreArray] = useState([])
    const [vomitingArray1, setvomitingArray1] = useState([])
    const [vomitingArray2, setvomitingArray2] = useState([])

    const [dysphagiaArray, setdysphagiaArray] = useState([])
    const [diarrhoeaArray, setdiarrhoeaArray] = useState([])
    const [StoolTypeArray, setStoolTypeArray] = useState([])

    const [PRBleedArray, setPRBleedArray] = useState([])

    const [abdomen, setabdomen] = useState([])


    useEffect(() => {

        let controller = new AbortController();
        axios.get(`/commonHistory-all/Gastro-Intestinal`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                sethistoryArray(res.data.commonHistory)
                setHistorySort(res.data.commonHistory)
            }
        });

        axios.get(`/pr-bleed`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setPRBleedArray(res.data.PRBleed);
            }

        });
        axios.get(`/stool-type`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setStoolTypeArray(res.data.StoolType);
            }

        });
        axios.get(`/diarrhoea`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setdiarrhoeaArray(res.data.Diarrhoea);
            }

        });

        axios.get(`/dysphagia`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setdysphagiaArray(res.data.Dysphagia);
            }

        });

        axios.get(`/vomiting`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                var i = res.data.Vomiting.length / 2;

                const tem1 = res.data.Vomiting.slice(0, i)
                setvomitingArray1(tem1)

                const tem2 = res.data.Vomiting.slice(i, res.data.Vomiting.length)
                setvomitingArray2(tem2)

            }

        });

        axios.get(`/score`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setScoreArray(res.data.Score);
            }

        });

        axios.get(`/frequency`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setfrequencyArray(res.data.Frequency);
            }

        });



        axios.get(`/duration`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setdurationArray(res.data.Duration);
            }

        });

        axios.get(`/pattern`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setpatternArray(res.data.Pattern);
            }

        });

        axios.get(`/radiation`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setradiationArray(res.data.Radiation);
            }

        });

        axios.get(`/site`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setsiteArray(res.data.Site);
            }
        });



        axios.get(`/hand-and-finger`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setHandAndFinger(res.data.handandfinger)
            }

        });

        axios.get(`/skin`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {

                let i = res.data.skin.length / 2;

                const tem1 = res.data.skin.slice(0, i)
                setskinArray1(tem1)

                const tem2 = res.data.skin.slice(i, res.data.skin.length)
                setskinArray2(tem2)

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

        axios.get(`/sigmoidoscopy`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {


                let i = res.data.sigmoidoscopy.length / 2;

                const tem1 = res.data.sigmoidoscopy.slice(0, i)
                setsigmoidoscopyArray1(tem1)

                const tem2 = res.data.sigmoidoscopy.slice(i, res.data.sigmoidoscopy.length)
                setsigmoidoscopyArray2(tem2)

            }

        });

        axios.get(`/abdomen`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setabdomenArray(res.data.abdomen);
            }

        });

        axios.get(`/tongue-mouth`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setTongueMouth(res.data.tonguemouth);
            }

        });

        axios.get(`/left-supraclavicular-node`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setSupraclavicular(res.data.leftsupraclavicularnode);
            }

        });

        axios.get(`/bruit`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setBruitList(res.data.bruit);
            }

        });

        axios.get(`/non-tender-tenderness`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setTendernessList(res.data.nontendertenderness);
            }

        });

        axios.get(`/no-masses-mass`, { signal: controller.signal }).then(res => {
            if (res.data.status === 200) {
                setMassList(res.data.nomassesmass);
            }

        });

        return () => {
            controller.abort();
        }

    }, []);

    const [skinArray1, setskinArray1] = useState([])
    const [skinArray2, setskinArray2] = useState([])
    const [perrectalArray1, setperrectalArray1] = useState([])
    const [perrectalArray2, setperrectalArray2] = useState([])
    const [sigmoidoscopyArray1, setsigmoidoscopyArray1] = useState([])
    const [sigmoidoscopyArray2, setsigmoidoscopyArray2] = useState([])

    const [tongueMouth, setTongueMouth] = useState([]);
    const [supraclavicular, setSupraclavicular] = useState([]);
    const [bruitList, setBruitList] = useState([]);
    const [tendernessList, setTendernessList] = useState([]);
    const [massList, setMassList] = useState([]);

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

    //history Search

    const historySearch = (e) => {
        const { value } = e.target;
        if (value?.length > 0) {
            const existing = [...historySort];
            sethistoryArray(existing.filter(item => item?.history_name?.toLowerCase().includes(value?.toLowerCase())))
        } else {
            sethistoryArray(historySort)
        }
    }
    //
    const [historyCheckBoxValue, sethistoryCheckBoxValue] = useState([])


    const [saveLoading, setsaveLoading] = useState(false)
    const saveGestro = () => {

        setsaveLoading(true)
        const formData = new FormData();
        formData.append('patient_id', props.patient_id);
        formData.append('Gestro_History', historyCheckBoxValue);
        formData.append('Gestro_Abdomen', abdomen);
        formData.append('skin', skin.toString());
        formData.append('hand_finger', finger.toString());
        formData.append('tongue_mouth', tongue.toString());
        formData.append('gynaecomastia', gynaecomastia === false ? 0 : 1);
        formData.append('Parotid_Glands_Enlarged', parotid);
        formData.append('Left_superclavicular_node', node);
        formData.append('site', site);
        formData.append('radiation', radiation);
        formData.append('pattern', pattern);
        formData.append('duration', duration);
        formData.append('frequency', frequency);
        formData.append('score', score);
        formData.append('vomiting', vomiting);
        formData.append('dysphagia', dysphagia);
        formData.append('diarrhoea', diarrhoea);
        formData.append('constipation', constipation === false ? 0 : 1);
        formData.append('habits', habits === false ? 0 : 1);
        formData.append('stoolType', stoolType);
        formData.append('PRBleed', PRBleed);
        formData.append('bruit', bruit);
        formData.append('murphy', murphy);
        formData.append('noneTender', noneTender === false ? 0 : 1);
        formData.append('noMasses', noMasses === false ? 0 : 1);
        formData.append('tenderness', tenderness);
        formData.append('mass', mass.toString());
        formData.append('umbillical', umbillical === false ? 0 : 1);
        formData.append('incisional', incisional === false ? 0 : 1);
        formData.append('inguinal', inguinal);
        formData.append('femoral', femoral);
        formData.append('perRectal', perRectal.toString());
        formData.append('sigmoidoscopy', sigmoidoscopy);
        formData.append('guaiac', guaiac);


        axios.post('/save-gestro', formData).then(res => {
            console.log("gestro", res.data.gestro)

            const note = `
<p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;"><span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Gastro-intestinal:</strong></span></p>
${res.data.gestro.Gestro_History !== null ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${res.data.gestro.Gestro_History !== null ? 'History :' : ''} </span></strong></p>` : ""}

<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;"><span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 15px;">
${res.data.gestro.Gestro_History === null ? '' : `${res.data.gestro.Gestro_History.replaceAll(',', ' . ')} .`} 
${res.data.gestro.site === null ? '' : `Site : <u>${res.data.gestro.site}</u> . `}
${res.data.gestro.vomiting === null ? '' : `Vomiting : <u>${res.data.gestro.vomiting}</u> . `}
${res.data.gestro.dysphagia === null ? '' : `Dysphagia: <u>${res.data.gestro.dysphagia}</u> . `}
${res.data.gestro.diarrhoea === null ? '' : `Diarrhoea: <u>${res.data.gestro.diarrhoea}</u> . `}
${res.data.gestro.constipation === "0" ? '' : `<u>Constipation</u>. `}
${res.data.gestro.habits === "0" ? '' : `<u>Change in bowel habits</u>. `}
${res.data.gestro.stoolType === null ? '' : `Stool Type: <u>${res.data.gestro.stoolType}</u>. `}
${res.data.gestro.PRBleed === null ? '' : `PR bleed: <u>${res.data.gestro.PRBleed}</u>. `}
</span></span></p>
${(res.data.gestro.duration || res.data.gestro.frequency || res.data.gestro.pattern || res.data.gestro.radiation || res.data.gestro.score) ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);"> Abdominal pain: </span></strong></p>
<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;"><span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 15px;">
${res.data.gestro.duration === null ? '' : `Duration : <u>${res.data.gestro.duration}</u> . `}
${res.data.gestro.frequency === null ? '' : `Frequency : <u>${res.data.gestro.frequency}</u> . `}
${res.data.gestro.pattern === null ? '' : `Pattern : <u>${res.data.gestro.pattern}</u> . `}
${res.data.gestro.radiation === null ? '' : `Radiation : <u>${res.data.gestro.radiation}</u> . `}
${res.data.gestro.score === null ? '' : `Score : <u>${res.data.gestro.score}</u> . `}
</span></span></p>` : ""}

${(res.data.gestro.skin || res.data.gestro.hand_finger || res.data.gestro.tongue_mouth || res.data.gestro.Parotid_Glands_Enlarged !== "false" || res.data.gestro.gynaecomastia !== "0" || res.data.gestro.Left_superclavicular_node || res.data.gestro.Gestro_Abdomen || res.data.gestro.bruit || res.data.gestro.murphy || res.data.gestro.noneTender !== "0" || res.data.gestro.noMasses !== "0" || res.data.gestro.tenderness || res.data.gestro.mass) ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);"> Examination: </span></strong></p>
<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;"><span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 15px;">
${res.data.gestro.skin === null ? '' : `Skin : <u>${res.data.gestro.skin}</u> . `}
${res.data.gestro.hand_finger === null ? '' : `Hand and finger : <u>${res.data.gestro.hand_finger}</u> . `}
${res.data.gestro.tongue_mouth === null ? '' : `Tongue-mouth : <u>${res.data.gestro.tongue_mouth}</u> . `}
${res.data.gestro.Parotid_Glands_Enlarged === "false" ? '' : `<u>Parotid Glands Enlarged</u> . `}
${res.data.gestro.gynaecomastia === "0" ? '' : `<u>Gynecomastia</u> . `}
${res.data.gestro.Left_superclavicular_node === null ? '' : `Left supraclavicular node : <u>${res.data.gestro.Left_superclavicular_node}</u> . `}
${res.data.gestro.Gestro_Abdomen === null ? '' : `${res.data.gestro.Gestro_Abdomen.replaceAll(',', ' : Present . ')} : Present . `} 

${res.data.gestro.bruit === null ? '' : `Bruit : <u>${res.data.gestro.bruit}</u> . `}
${res.data.gestro.murphy === null ? '' : `Murphy’s sign : <u>${res.data.gestro.murphy}</u> . `}
${res.data.gestro.noneTender === "0" ? '' : `None Tender : <u>Present</u> . `}
${res.data.gestro.noMasses === "0" ? '' : `No Masses : <u>Present</u> . `}
${res.data.gestro.tenderness === null ? '' : `Tenderness : <u>${res.data.gestro.tenderness}</u> . `}
${res.data.gestro.mass === null ? '' : `Mass : <u>${res.data.gestro.mass}</u> . `}
</span></span></p>` : ""}
${(res.data.gestro.umbillical !== "0" || res.data.gestro.incisional !== "0" || res.data.gestro.inguinal !== "false" || res.data.gestro.femoral !== "false" || res.data.gestro.perRectal || res.data.gestro.sigmoidoscopy || res.data.gestro.guaiac) ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">Hernias : </span></strong></p>
<p class="MsoNormal" style="margin: 0in 0in 0px; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;"><span style="font-family: Roboto; color: rgb(54, 54, 54);"><span style="font-size: 15px;">
${res.data.gestro.umbillical === "0" ? '' : `Umbilical hernia: <u>Present</u> . `}
${res.data.gestro.incisional === "0" ? '' : `Incisional hernia: <u>Present</u> . `}
${res.data.gestro.inguinal === "false" ? '' : `Inguinal hernia present: <u>${res.data.gestro.inguinal}</u> . `}
${res.data.gestro.femoral === "false" ? '' : `Femoral hernia present: <u>${res.data.gestro.femoral}</u> . `}
${res.data.gestro.perRectal === null ? '' : `On Per Rectal present on <u>${res.data.gestro.perRectal}</u> and Position ${perRectalPostion} O’clock . `}
${res.data.gestro.sigmoidoscopy === null ? '' : `On Sigmoidoscopy Examination: <u>${res.data.gestro.sigmoidoscopy}</u> . `}
${res.data.gestro.guaiac === null ? '' : `Guaiac Test (FOBT): <u>${res.data.gestro.guaiac}</u> . `}


</span></span></p>` : ""}


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
            toast.error("Ops! something is wrong")
        });


    }
    return (
        <div className='row gestro'>
            <div className="history-main-header d-flex justify-content-between mb-2">
                <div>
                    <h6>Gastro-Intestinal</h6>
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
                        onChange={historySearch}
                        className="form-control form-control-sm mt-1 mb-2"
                    />
                    <ul
                        className={`g-doc-scroll ${historyShowAll ? "full-height" : "half-height"
                            }`}
                    >
                        {
                            historyArray.length > 0 ?
                                historyArray.map((item, i) => <li key={i}>
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">{item.history_name}</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name={item.id}
                                                    type="checkbox"
                                                    value={item.history_name} onChange={(e) => {
                                                        const { value, checked } = e.target;

                                                        if (checked) {
                                                            sethistoryCheckBoxValue([...historyCheckBoxValue, value])
                                                        } else {
                                                            const newCn = historyCheckBoxValue.filter((item) => item !== value)
                                                            sethistoryCheckBoxValue(newCn)
                                                        }
                                                    }
                                                    }
                                                    id="togBtn"
                                                />
                                                <div className="slider round"></div>

                                            </label>
                                        </div>
                                    </div>
                                </li>) :
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
                <div className="he-history p-1 mt-2">
                    <h6>Abdominal Pain</h6>
                    <ul
                        className={`g-doc-scroll ${othersShowAll ? "full-height" : "half-height"
                            }`}
                    >
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Site</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange(!change); setSite("") }}
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
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        siteArray.length > 0 &&
                                                        siteArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.Site_name} type="radio" name="cough1" onChange={(e) => { setSite(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.Site_name}
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
                                <p>{site}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Radiation</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange1(!change1); setRadiation("") }}
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
                                                    {
                                                        radiationArray.length > 0 &&
                                                        radiationArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.Radiation_name} type="radio" name="cough1" onChange={(e) => { setRadiation(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.Radiation_name}
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
                                <p>{radiation}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Pattern</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange2(!change2); setPattern("") }}
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

                                                    {
                                                        patternArray.length > 0 &&
                                                        patternArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.Pattern_name} type="radio" name="cough1" onChange={(e) => { setPattern(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.Pattern_name}
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
                                <p>{pattern}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Duration</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange3(!change3); setDuration("") }}
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

                                                    {
                                                        durationArray.length > 0 &&
                                                        durationArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.Duration_name} type="radio" name="cough1" onChange={(e) => { setDuration(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.Duration_name}
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
                                <p>{duration}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Frequency</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange4(!change4); setFrequency("") }}
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
                                                    {
                                                        frequencyArray.length > 0 &&
                                                        frequencyArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.Frequency_name} type="radio" name="cough1" onChange={(e) => { setFrequency(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.Frequency_name}
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
                                <p>{frequency}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Score</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange5(!change5); setScore("") }}
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
                                                    {
                                                        ScoreArray.length > 0 &&
                                                        ScoreArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.Score_name} type="radio" name="cough1" onChange={(e) => { setScore(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.Score_name}
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
                                <p>{score}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Vomiting</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange6(!change6); setVomiting("") }}
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
                                                    <div className="row">
                                                        <div className="col-6">
                                                            {
                                                                vomitingArray1.length > 0 &&
                                                                vomitingArray1.map((v, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={v.Vomiting_name} type="radio" name="cough1" onChange={(e) => { setVomiting(e.target.value) }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {v.Vomiting_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                        <div className="col-6">
                                                            {
                                                                vomitingArray2.length > 0 &&
                                                                vomitingArray2.map((v, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={v.Vomiting_name} type="radio" name="cough1" onChange={(e) => { setVomiting(e.target.value) }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {v.Vomiting_name}
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
                                <p>{vomiting}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Dysphagia</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange7(!change7); setDysphagia("") }}
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
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">

                                                    {
                                                        dysphagiaArray.length > 0 &&
                                                        dysphagiaArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.Dysphagia_name} type="radio" name="cough1" onChange={(e) => { setDysphagia(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.Dysphagia_name}
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
                                <p>{dysphagia}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Diarrhoea</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange8(!change8); setDiarrhoea("") }}
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
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        diarrhoeaArray.length > 0 &&
                                                        diarrhoeaArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.Diarrhoea_name} type="radio" name="cough1" onChange={(e) => { setDiarrhoea(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.Diarrhoea_name}
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
                                <p>{diarrhoea}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Constipation</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setConstipation(!constipation) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Change in bowel habits</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setHabits(!habits) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Stool Type</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange9(!change9); setStoolType("") }}
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
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        StoolTypeArray.length > 0 &&
                                                        StoolTypeArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.StoolType_name} type="radio" name="cough1" onChange={(e) => { setStoolType(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.StoolType_name}
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
                                <p>{stoolType}</p>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex justify-content-between">
                                <p className="w-75">PR bleed</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange10(!change10); setPRBleed("") }}
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
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">

                                                    {
                                                        PRBleedArray.length > 0 &&
                                                        PRBleedArray.map((v, i) => {
                                                            return (
                                                                <div key={i} className="form-check ms-1">
                                                                    <input className="form-check-input" value={v.PRBleed_name} type="radio" name="cough1" onChange={(e) => { setPRBleed(e.target.value) }} id="flexRadioDefault1" />
                                                                    <label className="form-check-label" >
                                                                        {v.PRBleed_name}
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
                                <p>{PRBleed}</p>
                            </div>
                        </li>
                    </ul>
                    {!historyShowAll ? (
                        <span
                            onClick={() => setOthersShowAll(!othersShowAll)}
                            className="history-see-all"
                        >
                            Show All <i className="ms-1 far fa-angle-down"></i>
                        </span>
                    ) : (
                        <span
                            onClick={() => setOthersShowAll(!othersShowAll)}
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
                            <button onClick={() => setsaveLoading(false)} className="vaital-setup-btn-cancel float-end">Reset</button>
                            {
                                saveLoading ?
                                    <button className="vaital-setup-btn float-end me-2"><i className="fas fa-check-circle"></i></button>
                                    :
                                    <button onClick={saveGestro} className="vaital-setup-btn float-end me-2">Save</button>
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="exam-bg-white p-1">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Skin</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange11(!change11); setSkin("") }}
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
                                                            {
                                                                skinArray1.length > 0 &&
                                                                skinArray1.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.skin_name} type="checkbox" name="cough1" onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                if (checked) {
                                                                                    setSkin([...skin, value])
                                                                                } else {
                                                                                    let rvalue = skin.filter((item) => item !== value)
                                                                                    setSkin(rvalue)
                                                                                }

                                                                            }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.skin_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                        <div className="col-6">

                                                            {
                                                                skinArray2.length > 0 &&
                                                                skinArray2.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.skin_name} type="checkbox" name="cough1" onChange={(e) => {
                                                                                const { checked, value } = e.target
                                                                                if (checked) {
                                                                                    setSkin([...skin, value])
                                                                                } else {
                                                                                    let rvalue = skin.filter((item) => item !== value)
                                                                                    setSkin(rvalue)
                                                                                }
                                                                            }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.skin_name}
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
                                <p>{skin && skin.join(' , ')}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Parotid Glands Enlarged</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="set"
                                            value="set"
                                            type="checkbox"
                                            onChange={(e) => setParotid(!parotid)}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>

                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Hand and finger</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange12(!change12); setFinger([]) }}
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
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        handAndFinger.length > 0 &&
                                                        handAndFinger.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.handandfinger_name} type="checkbox" name="cough1" onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setFinger([...finger, value])
                                                                } else {
                                                                    let rvalue = finger.filter((item) => item !== value)
                                                                    setFinger(rvalue)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.handandfinger_name}
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
                                <p>{finger && finger.join(' , ')}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Gynecomastia</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="set"
                                            value="set"
                                            type="checkbox"
                                            onChange={(e) => setGynaecomastia(!gynaecomastia)}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Tongue-mouth</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange13(!change13); setTongue([]) }}
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
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        tongueMouth.length > 0 &&
                                                        tongueMouth.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.tonguemouth_name} type="checkbox" name="cough1" onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setTongue([...tongue, value])
                                                                } else {
                                                                    let rvalue = tongue.filter((item) => item !== value)
                                                                    setTongue(rvalue)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.tonguemouth_name}
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
                                <p>{tongue && tongue.join(' , ')}</p>
                            </div>
                        </div>
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Left supraclavicular node</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange14(!change14); setNode("") }}
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
                                                    {
                                                        supraclavicular.length > 0 &&
                                                        supraclavicular.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.leftsupraclavicularnode_name} type="radio" name="cough1" onChange={(e) => { setNode(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.leftsupraclavicularnode_name}
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
                                <p>{node}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <h6>Abdomen</h6>
                    {
                        abdomenArray.length > 0 ?
                            abdomenArray.map((item, i) => <div key={i} className="col-4">
                                <div className="exam-bg-white p-1 mt-2">
                                    <div className="d-flex justify-content-between">
                                        <p className="w-75">{item.abdomen_name}</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name={item.id}
                                                    value={item.abdomen_name}
                                                    type="checkbox"
                                                    onChange={e => {

                                                        const { value, checked } = e.target;
                                                        if (checked) {
                                                            setabdomen([...abdomen, value])
                                                        } else {
                                                            const newCn = abdomen.filter((item) => item !== value)
                                                            setabdomen(newCn)
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
                            <div className="col-4">
                                <div className="exam-bg-white p-1 mt-2">
                                    <div className="d-flex justify-content-between">
                                        <div className="ms-1">
                                            <i style={{ fontSize: "26px", marginLeft: "40%" }} class="fas fa-spinner fa-spin"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    }
                </div>
                <hr />
                <div className="row">
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Bruit</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange15(!change15); setBruit("") }}
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
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        bruitList.length > 0 &&
                                                        bruitList.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.bruit_name} type="radio" name="cough1" onChange={(e) => { setBruit(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.bruit_name}
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
                                <p>{bruit}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Murphy’s sign</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange16(!change16); setMurphy("") }}
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
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Positive" type="radio" name="cough1" onChange={(e) => { setMurphy(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Positive
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Negative" type="radio" name="cough1" onChange={(e) => { setMurphy(e.target.value) }} id="flexRadioDefault1" />
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
                                <p>{murphy}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">None Tender</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="set"
                                            value="set"
                                            type="checkbox"
                                            onChange={(e) => setNoneTender(!noneTender)}
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
                                <p className="w-75">No Masses</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="set"
                                            value="set"
                                            type="checkbox"
                                            onChange={(e) => setNoMasses(!noMasses)}
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
                                <p className="w-75">Tenderness</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange17(!change17); setTenderness("") }}
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
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        tendernessList.length > 0 &&
                                                        tendernessList.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.nontendertenderness_name} type="radio" name="cough1" onChange={(e) => { setTenderness(e.target.value) }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.nontendertenderness_name}
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
                                <p>{tenderness}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Mass</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange18(!change18); setMass([]) }}
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
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    {
                                                        massList.length > 0 &&
                                                        massList.map((item, i) => <div key={i} className="form-check ms-1">
                                                            <input className="form-check-input" value={item.nomassesmass_name} type="checkbox" name="cough1" onChange={(e) => {
                                                                const { checked, value } = e.target;
                                                                if (checked) {
                                                                    setMass([...mass, value])
                                                                } else {
                                                                    let rvalue = mass.filter((item) => item !== value)
                                                                    setMass(rvalue)
                                                                }
                                                            }} id="flexRadioDefault1" />
                                                            <label className="form-check-label" >
                                                                {item.nomassesmass_name}
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
                                <p>{mass && mass.join(' , ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <h6>Hernias</h6>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Umbilical</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="set"
                                            value="set"
                                            type="checkbox"
                                            onChange={(e) => setUmbillical(!umbillical)}
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
                                <p className="w-75">Incisional</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="set"
                                            value="set"
                                            type="checkbox"
                                            onChange={(e) => setIncisional(!incisional)}
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
                                <p className="w-75">Inguinal</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange19(!change19); setInguinal("") }}
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
                                <p className="w-75">Femoral</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange20(!change20); setFemoral("") }}
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
                                                        <input className="form-check-input" value="Left" type="radio" name="cough1" onChange={(e) => { setFemoral(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Left
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Right" type="radio" name="cough1" onChange={(e) => { setFemoral(e.target.value) }} id="flexRadioDefault1" />
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
                                <p>{femoral}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Per Rectal</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange21(!change21); setPerRectal([]); setPerRectalPostion("") }}
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
                                                    <div className="form-check d-flex">
                                                        <label className="form-check-label" >
                                                            Position
                                                        </label>
                                                        <input onChange={(e) => setPerRectalPostion(e.target.value)} className='per_rectal_position' type="text" />
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
                                                                                    setPerRectal([...perRectal, value])
                                                                                } else {
                                                                                    let rvalue = perRectal.filter((item) => item !== value)
                                                                                    setPerRectal(rvalue)
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
                                                                                    setPerRectal([...perRectal, value])
                                                                                } else {
                                                                                    let rvalue = perRectal.filter((item) => item !== value)
                                                                                    setPerRectal(rvalue)
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
                                <p>{perRectalPostion && `Position ${perRectalPostion} O’clock `}{perRectal && perRectal.join(' , ')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Sigmoidoscopy</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange22(!change22); setSigmoidoscopy("") }}
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
                                                    horizontal: 'right',
                                                }}
                                            >

                                                <div className="left-popup">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            {
                                                                sigmoidoscopyArray1.length > 0 &&
                                                                sigmoidoscopyArray1.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.sigmoidoscopy_name} type="radio" name="cough1" onChange={(e) => { setSigmoidoscopy(e.target.value) }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.sigmoidoscopy_name}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })
                                                            }


                                                        </div>
                                                        <div className="col-6">
                                                            {
                                                                sigmoidoscopyArray2.length > 0 &&
                                                                sigmoidoscopyArray2.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check ms-1">
                                                                            <input className="form-check-input" value={item.sigmoidoscopy_name} type="radio" name="cough1" onChange={(e) => { setSigmoidoscopy(e.target.value) }} id="flexRadioDefault1" />
                                                                            <label className="form-check-label" >
                                                                                {item.sigmoidoscopy_name}
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
                                <p>{sigmoidoscopy}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="exam-bg-white p-1 mt-2">
                            <div className="d-flex justify-content-between">
                                <p className="w-75">Guaiac Test (FOBT)</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            name="Jaundiced"
                                            value="Jaundiced"
                                            type="checkbox"
                                            onChange={(e) => { setChange23(!change23); setGuaiac("") }}
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
                                                        <input className="form-check-input" value="Positive" type="radio" name="cough1" onChange={(e) => { setGuaiac(e.target.value) }} id="flexRadioDefault1" />
                                                        <label className="form-check-label" >
                                                            Positive
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                        <input className="form-check-input" value="Negative" type="radio" name="cough1" onChange={(e) => { setGuaiac(e.target.value) }} id="flexRadioDefault1" />
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
                                <p>{guaiac}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Gestro;