import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import "./MedicationChart.css"
import Swal from "sweetalert2";
import axios from 'axios';
import { Autocomplete } from '@mui/material';

import TextField from '@mui/material/TextField';
import moment from 'moment';
import { toast } from 'react-toastify';

const MedicationChart = (props) => {

    const customStyles1 = {
        content: {
            top: '35%',
            left: '25%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "50%",
            height: "450px",
            background: "#ffffff",
        },
        overlay: { zIndex: 1000 }

    };

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal(e) {
        e.preventDefault();
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);

    }


    const customStyles = {
        content: {
            top: '37%',
            left: '21%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: "80%",
            height: "83%",
            background: "#F3F2EF",
            padding: "10px",
            marginLeft: "38%"
        },
        overlay: { zIndex: 1000 }
    };
    const closeModelMedicationChart = () => {
        props.closeModal();

    }

    const [date, setEnterdDate] = useState("");
    const dateInput = (e) => {
        setEnterdDate(e.target.value);
    }

    // next btn 
    const nextPageForStep2 = (e) => {
        document.getElementById("medication-chart-part-2-tab").click();
    }
    const nextPageForStep3 = (e) => {
        document.getElementById("medication-chart-part-3-tab").click();
    }
    const nextPageForStep4 = (e) => {
        document.getElementById("medication-chart-part-4-tab").click();
    }
    const nextPageForStep5 = (e) => {
        document.getElementById("medication-chart-part-5-tab").click();
    }

    // back btn 
    const backPageForStep1 = (e) => {
        document.getElementById("medication-chart-part-1-tab").click();
    }
    const backPageForStep2 = (e) => {
        document.getElementById("medication-chart-part-2-tab").click();
    }
    const backPageForStep3 = (e) => {
        document.getElementById("medication-chart-part-3-tab").click();
    }
    const backPageForStep4 = (e) => {
        document.getElementById("medication-chart-part-4-tab").click();
    }


    // save all
    const [saveLoading, setSaveLoading] = useState(false);
    const saveMedicationChartData = () => {
        setSaveLoading(true);
    }
    const [serviceId, setServiceId] = useState('');
    const [wardId, setWardId] = useState('');
    const [aid, setAid] = useState('');
    const [gb, setGb] = useState('');
    const [community, setCommunity] = useState('');
    const [preHospital, setPreHospital] = useState('');

    const [aditionalCheckvalue, setAditionalCheckvalue] = useState({
        aditionalChartCheck: [],
    });

    const medicationPart1 = {
        service_id: serviceId,
        ward_id: wardId,
        aid: aid,
        gb: gb,
        community: community,
        preHospital: preHospital,
        additional_checkbox: aditionalCheckvalue.aditionalChartCheck
    }

    const serviceIdChange = (e) => {
        setServiceId(e.target.value)
    }
    const wardIdChange = (e) => {
        setWardId(e.target.value)
    }
    const aidChange = (e) => {
        setAid(e.target.value)
    }
    const gbChange = (e) => {
        setGb(e.target.value)
    }
    const communityChange = (e) => {
        setCommunity(e.target.value)
    }

    const handlePreHopsitalChange1 = (e) => {
        if (e.target.checked) {
            setPreHospital('yes')
        }
        else {
            setPreHospital("")

        }

    }
    const handlePreHopsitalChange2 = (e) => {
        if (e.target.checked) {
            setPreHospital('No')
        }
        else {
            setPreHospital("")

        }

    }
    const handleAdditionalCheckboxChange = (e) => {
        const { aditionalChartCheck } = aditionalCheckvalue;
        if (e.target.checked) {
            setAditionalCheckvalue({
                aditionalChartCheck: [...aditionalChartCheck, e.target.value],

            })
        }

        else {
            setAditionalCheckvalue({
                aditionalChartCheck: aditionalChartCheck.filter((item) => item !== e.target.value),
            });
        }
    };

    const saveMedicationChartPartOneData = (e) => {
        e.preventDefault();

        axios.post(`/save-medication-chart-part-one`, medicationPart1).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Medication Chart One added successfully");
                setCommunity('');
                setWardId('');
                setAid('');
                setGb('');
                setCommunity('');
                var checkboxes = document.getElementsByClassName('check1')
                for (var checkbox of checkboxes) {
                    if (checkbox.checked) {
                        checkbox.checked = false
                    }
                }

                var radios = document.getElementsByClassName('radio1')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }


            }
        })
        var allRows = document.getElementById('hidePart1Nurse').rows;
        for (var i = 0; i < allRows.length; i++) {
            allRows[i].deleteCell(-1);
        }
        var allRows1 = document.getElementById('hidePart1TelePhone').rows;
        for (var i = 0; i < allRows1.length; i++) {
            allRows1[i].deleteCell(-1);
        }

        var allRows2 = document.getElementById('hidePart1MedicineTakens').rows;
        for (var i = 0; i < allRows2.length; i++) {
            allRows2[i].deleteCell(-1);
        }


    }
    // part one Checkbox end

    // part Two Checkbox start
    const [signatureName1, setSignatureName1] = useState('');
    const [datePrescriber1, setDatePrescriber1] = useState('');
    const [duration1, setDuration1] = useState('');
    const [qty1, setQty1] = useState('');

    const [signatureName2, setSignatureName2] = useState('');
    const [datePrescriber2, setDatePrescriber2] = useState('');
    const [duration2, setDuration2] = useState('');
    const [qty2, setQty2] = useState('');

    const [duration3, setDuration3] = useState('');
    const [qty3, setQty3] = useState('');

    const [duration4, setDuration4] = useState('');
    const [qty4, setQty4] = useState('');

    // part-3 
    const [duration5, setDuration5] = useState('');
    const [qty5, setQty5] = useState('');

    // part-4
    const [duration6, setDuration6] = useState('');
    const [qty6, setQty6] = useState('');

    // table 1
    // VTE Risk Assessed1
    const [medicineVTERiskCheckvalue, setMedicineVTERiskCheckvalue] = useState({
        medicineVTERiskChartCheck: [],
    });
    //// Continue on discharge radio input part2
    const [medicineContinueOnDischargePart2, setMedicineContinueOnDischargePart2] = useState('');
    // Dispense radio input part21
    const [medicineDispensePart2, setMedicineDispensePart2] = useState('');

    // table 2
    // VTE Risk Assessed12
    const [medicineVTERiskCheckvalue2, setMedicineVTERiskCheckvalue2] = useState({
        medicineVTERiskChartCheck2: [],
    });
    //// Continue on discharge radio input part2
    const [medicineContinueOnDischargePart22, setMedicineContinueOnDischargePart22] = useState('');
    // Dispense radio input part21
    const [medicineDispensePart22, setMedicineDispensePart22] = useState('');

    // table 3
    //// Continue on discharge radio input part2
    const [medicineContinueOnDischargePart223, setMedicineContinueOnDischargePart223] = useState('');
    // Dispense radio input part21
    const [medicineDispensePart223, setMedicineDispensePart223] = useState('');

    // table 4
    // Tick if slow release 
    const [medicineTickIfSlowCheckvaluePart2, setMedicineTickIfSlowCheckvaluePart2] = useState(true);
    //// Continue on discharge radio input part2
    const [medicineContinueOnDischargePart2234, setMedicineContinueOnDischargePart2234] = useState('');
    // Dispense radio input part21
    const [medicineDispensePart2234, setMedicineDispensePart2234] = useState('');

    // Part 3 table 1
    // Tick if slow release 
    const [medicineTickIfSlowCheckvaluePart3, setMedicineTickIfSlowCheckvaluePart3] = useState(true);
    //// Continue on discharge radio input part3
    const [medicineContinueOnDischargePart3, setMedicineContinueOnDischargePart3] = useState('');
    // Dispense radio input part3
    const [medicineDispensePart3, setMedicineDispensePart3] = useState('');

    // Part 4 table 1
    // Tick if slow release 
    const [medicineTickIfSlowCheckvaluePart4, setMedicineTickIfSlowCheckvaluePart4] = useState(true);
    //// Continue on discharge radio input part4
    const [medicineContinueOnDischargePart4, setMedicineContinueOnDischargePart4] = useState('');
    // Dispense radio input part4
    const [medicineDispensePart4, setMedicineDispensePart4] = useState('');

    const [tickIfSlowRelease, setTickIfSlowRelease] = useState(true);
    // object send to backend database 
    const medicationPart2 = {

        signature_name1: signatureName1,
        date_prescriber1: datePrescriber1,
        duration1: duration1,
        qty1: qty1,

        signature_name2: signatureName2,
        date_prescriber2: datePrescriber2,
        duration2: duration2,
        qty2: qty2,

        duration3: duration3,
        qty3: qty3,

        duration4: duration4,
        qty4: qty4,

        // table 1
        vte_risk_assessed_checkbox1: medicineVTERiskCheckvalue.medicineVTERiskChartCheck,
        continue_on_discharge_radio_part2: medicineContinueOnDischargePart2,
        dispense_radio_part2: medicineDispensePart2,
        // table 2
        vte_risk_assessed_checkbox2: medicineVTERiskCheckvalue2.medicineVTERiskChartCheck2,
        continue_on_discharge_radio2_part2: medicineContinueOnDischargePart22,
        dispense_radio2_part2: medicineDispensePart22,
        // table3
        continue_on_discharge_radio3_part2: medicineContinueOnDischargePart223,
        dispense_radio3_part2: medicineDispensePart223,
        // table4
        tick_if_slow_checkbox3: medicineTickIfSlowCheckvaluePart2,
        continue_on_discharge_radio4_part2: medicineContinueOnDischargePart2234,
        dispense_radio4_part2: medicineDispensePart2234,

    }

    // object send to backend database 
    const medicationPart3 = {

        duration5: duration5,
        qty5: qty5,

        // Part-3 table1
        tick_if_slow_checkbox_part3: medicineTickIfSlowCheckvaluePart3,
        continue_on_discharge_radio_part3: medicineContinueOnDischargePart3,
        dispense_radio_part3: medicineDispensePart3,

    }

    // object send to backend database 
    const medicationPart4 = {

        duration6: duration6,
        qty6: qty6,

        // Part-4 table1
        tick_if_slow_checkbox_part4: tickIfSlowRelease,
        continue_on_discharge_radio_part4: medicineContinueOnDischargePart4,
        dispense_radio_part4: medicineDispensePart4,

    }

    const signatureName1Change = (e) => {
        setSignatureName1(e.target.value)
    }
    const datePrescriber1Change = (e) => {
        setDatePrescriber1(e.target.value)
    }
    const duration1Change = (e) => {
        setDuration1(e.target.value)
    }
    const qty1Change = (e) => {
        setQty1(e.target.value)
    }

    const signatureName2Change = (e) => {
        setSignatureName2(e.target.value)
    }
    const datePrescriber2Change = (e) => {
        setDatePrescriber2(e.target.value)
    }
    const duration2Change = (e) => {
        setDuration2(e.target.value)
    }
    const qty2Change = (e) => {
        setQty2(e.target.value)
    }

    const duration3Change = (e) => {
        setDuration3(e.target.value)
    }
    const qty3Change = (e) => {
        setQty3(e.target.value)
    }

    const duration4Change = (e) => {
        setDuration4(e.target.value)
    }
    const qty4Change = (e) => {
        setQty4(e.target.value)
    }
    // part-3 
    const duration5Change = (e) => {
        setDuration5(e.target.value)
    }
    const qty5Change = (e) => {
        setQty5(e.target.value)
    }
    // part-4 
    const duration6Change = (e) => {
        setDuration6(e.target.value)
    }
    const qty6Change = (e) => {
        setQty6(e.target.value)
    }

    // table 1
    // VTE Risk Assessed1 handle change
    const handleMedicineVTERiskCheckboxChange = (e) => {
        const { medicineVTERiskChartCheck } = medicineVTERiskCheckvalue;
        if (e.target.checked) {
            setMedicineVTERiskCheckvalue({
                medicineVTERiskChartCheck: [...medicineVTERiskChartCheck, e.target.value],
            })
        }
        else {
            setMedicineVTERiskCheckvalue({
                medicineVTERiskChartCheck: medicineVTERiskChartCheck.filter((item) => item !== e.target.value),
            });
        }
    };
    // Continue on discharge radio input handle change
    const handleMedicineContinueOnDischargePart2Change1 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart2('Yes')
        }
        else {
            setMedicineContinueOnDischargePart2("")
        }
    }
    const handleMedicineContinueOnDischargePart2Change2 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart2('No')
        }
        else {
            setMedicineContinueOnDischargePart2("")
        }
    }
    // Dispense radio input handle change
    const handleMedicineDispensePart2Change1 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart2('Yes')
        }
        else {
            setMedicineDispensePart2("")
        }
    }
    const handleMedicineDispensePart2Change2 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart2('No')
        }
        else {
            setMedicineDispensePart2("")
        }
    }

    // table 2
    // VTE Risk Assessed1 handle change
    const handleMedicineVTERiskCheckboxChange2 = (e) => {
        const { medicineVTERiskChartCheck2 } = medicineVTERiskCheckvalue2;
        if (e.target.checked) {
            setMedicineVTERiskCheckvalue2({
                medicineVTERiskChartCheck2: [...medicineVTERiskChartCheck2, e.target.value],
            })
        }
        else {
            setMedicineVTERiskCheckvalue2({
                medicineVTERiskChartCheck2: medicineVTERiskChartCheck2.filter((item) => item !== e.target.value),
            });
        }
    };
    // Continue on discharge radio input handle change
    const handleMedicineContinueOnDischargePart2Change12 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart22('Yes')
        }
        else {
            setMedicineContinueOnDischargePart22("")
        }
    }
    const handleMedicineContinueOnDischargePart2Change22 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart22('No')
        }
        else {
            setMedicineContinueOnDischargePart22("")
        }
    }
    // Dispense radio input handle change
    const handleMedicineDispensePart2Change12 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart22('Yes')
        }
        else {
            setMedicineDispensePart22("")
        }
    }
    const handleMedicineDispensePart2Change22 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart22('No')
        }
        else {
            setMedicineDispensePart22("")
        }
    }

    // table 3
    // Continue on discharge radio input handle change
    const handleMedicineContinueOnDischargePart2Change123 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart223('Yes')
        }
        else {
            setMedicineContinueOnDischargePart223("")
        }
    }
    const handleMedicineContinueOnDischargePart2Change223 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart223('No')
        }
        else {
            setMedicineContinueOnDischargePart223("")
        }
    }
    // Dispense radio input handle change
    const handleMedicineDispensePart2Change123 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart223('Yes')
        }
        else {
            setMedicineDispensePart223("")
        }
    }
    const handleMedicineDispensePart2Change223 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart223('No')
        }
        else {
            setMedicineDispensePart223("")
        }
    }

    // table 4
    // Continue on discharge radio input handle change
    const handleMedicineContinueOnDischargePart2Change1234 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart2234('Yes')
        }
        else {
            setMedicineContinueOnDischargePart2234("")
        }
    }
    const handleMedicineContinueOnDischargePart2Change2234 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart2234('No')
        }
        else {
            setMedicineContinueOnDischargePart2234("")
        }
    }
    // Dispense radio input handle change
    const handleMedicineDispensePart2Change1234 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart2234('Yes')
        }
        else {
            setMedicineDispensePart2234("")
        }
    }
    const handleMedicineDispensePart2Change2234 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart2234('No')
        }
        else {
            setMedicineDispensePart2234("")
        }
    }


    // part-2  page save
    const saveMedicationChartPartTwoData = (e) => {
        e.preventDefault();

        axios.post(`/save-medication-chart-part-two`, medicationPart2).then(res => {


            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Medication Chart two added successfully");
                setSignatureName1('');
                setDatePrescriber1('');
                setDuration1('');
                setQty1('');
                setSignatureName2('');
                setDatePrescriber2('');
                setDuration2('');
                setQty2('');
                setDuration3('');
                setQty3('');
                setDuration4('');
                setQty4('');



                // table 1
                // VTE Risk Assessed1 handle change
                var checkboxes = document.getElementsByClassName('checkPart2')
                for (var checkbox of checkboxes) {
                    if (checkbox.checked) {
                        checkbox.checked = false
                    }
                }
                // Continue on discharge radio input handle change
                var radios = document.getElementsByClassName('radioPart2')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }
                // Dispense  radio input handle change
                var radios = document.getElementsByClassName('radioPart21')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }

                // table 2
                // VTE Risk Assessed1 handle change
                var checkboxes = document.getElementsByClassName('checkPart22')
                for (var checkbox of checkboxes) {
                    if (checkbox.checked) {
                        checkbox.checked = false
                    }
                }
                // Continue on discharge radio input handle change
                var radios = document.getElementsByClassName('radioPart22')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }
                // Dispense  radio input handle change
                var radios = document.getElementsByClassName('radioPart212')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }

                // table 3
                // Continue on discharge radio input handle change
                var radios = document.getElementsByClassName('radioPart223')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }
                // Dispense  radio input handle change
                var radios = document.getElementsByClassName('radioPart2123')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }

                // table 4
                // Tick if slow release
                var checkboxes = document.getElementsByClassName('checkPart224').checked = false

                // Continue on discharge radio input handle change
                var radios = document.getElementsByClassName(' radioPart2234')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }
                // Dispense  radio input handle change
                var radios = document.getElementsByClassName('radioPart21234')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }


            }
        })

        var allRows = document.getElementById('regular1').rows;
        for (var i = 0; i < allRows.length; i++) {
            allRows[i].deleteCell(-1);
        }


        var allRows1 = document.getElementById('regular2').rows;
        for (var i = 0; i < allRows1.length; i++) {
            allRows1[i].deleteCell(-1);
        }

        var allRows2 = document.getElementById('regular3').rows;
        for (var i = 0; i < allRows2.length; i++) {
            allRows2[i].deleteCell(-1);
        }

        var allRows3 = document.getElementById('regular4').rows;
        for (var i = 0; i < allRows3.length; i++) {
            allRows3[i].deleteCell(-1);
        }

        var allRows4 = document.getElementById('recommand').rows;
        for (var i = 0; i < allRows4.length; i++) {
            allRows4[i].deleteCell(-1);
        }
    }


    // part-3  page save
    // Part-3 table 
    // Tick if slow release 

    // Continue on discharge radio input handle change
    const handleMedicineContinueOnDischargePart3Change31 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart3('Yes')
        }
        else {
            setMedicineContinueOnDischargePart3("")
        }
    }
    const handleMedicineContinueOnDischargePart3Change32 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart3('No')
        }
        else {
            setMedicineContinueOnDischargePart3("")
        }
    }
    // Dispense radio input handle change
    const handleMedicineDispensePart3Change31 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart3('Yes')
        }
        else {
            setMedicineDispensePart3("")
        }
    }
    const handleMedicineDispensePart3Change32 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart3('No')
        }
        else {
            setMedicineDispensePart3("")
        }
    }

    const saveMedicationChartPartThreeData = (e) => {
        e.preventDefault();

        axios.post(`/save-medication-chart-part-three`, medicationPart3).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Medication Chart Three added successfully");
                setDuration5('');
                setQty5('');
                var allRows = document.getElementById('part3hide').rows;
                for (var i = 0; i < allRows.length; i++) {
                    allRows[i].deleteCell(-1);
                }

                // table 4
                // Tick if slow release
                var checkboxes = document.getElementsByClassName('checkPart3').checked = false;


                // Continue on discharge radio input handle change
                var radios = document.getElementsByClassName(' radioPart31')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }
                // Dispense  radio input handle change
                var radios = document.getElementsByClassName('radioPart32')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }


            }
        })
    }


    // part-4  page save
    // Part-4 table 
    // Tick if slow release 

    // Continue on discharge radio input handle change
    const handleMedicineContinueOnDischargePart4Change41 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart4('Yes')
        }
        else {
            setMedicineContinueOnDischargePart4("")
        }
    }
    const handleMedicineContinueOnDischargePart4Change42 = (e) => {
        if (e.target.checked) {
            setMedicineContinueOnDischargePart4('No')
        }
        else {
            setMedicineContinueOnDischargePart4("")
        }
    }
    // Dispense radio input handle change
    const handleMedicineDispensePart4Change41 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart4('Yes')
        }
        else {
            setMedicineDispensePart4("")
        }
    }
    const handleMedicineDispensePart4Change42 = (e) => {
        if (e.target.checked) {
            setMedicineDispensePart4('No')
        }
        else {
            setMedicineDispensePart4("")
        }
    }

    const saveMedicationChartPartFourData = (e) => {
        e.preventDefault();


        axios.post(`/save-medication-chart-part-four`, medicationPart4).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Medication Chart Four added successfully");
                setDuration6('');
                setQty6('');

                var allRows = document.getElementById('hidePart4').rows;
                for (var i = 0; i < allRows.length; i++) {
                    allRows[i].deleteCell(-1);
                }
                // part 4 table 1
                // Tick if slow release
                var checkboxes = document.getElementsByClassName('checkPart4')
                for (var checkbox of checkboxes) {
                    if (checkbox.checked) {
                        checkbox.checked = false
                    }
                }

                // Continue on discharge radio input handle change
                var radios = document.getElementsByClassName(' radioPart41')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }
                // Dispense  radio input handle change
                var radios = document.getElementsByClassName('radioPart42')
                for (var radio of radios) {
                    if (radio.checked) {
                        radio.checked = false
                    }
                }


            }
        })
    }


    //part1 top box all functionality
    const [allServices, setallServices] = useState([])
    const [allUnit, setallUnit] = useState([]);
    const [allMedicine, setallMedicine] = useState([]);
    const [allAllergy, setallAllergy] = useState([]);

    const [allRoute, setallRoute] = useState([]);
    const [allDose, setallDose] = useState([]);
    const [allFrequency, setallFrequency] = useState([]);
    const [allReaction, setallReaction] = useState([]);
    const [reactionTypeId, setReactionTypeId] = useState('');

    const [medicineId, setMedicineId] = useState('');
    const [allergyId, setallergyId] = useState('');
    const [otherText, setotherText] = useState('');
    const [patientInfo, setPatientInfo] = useState('');

    const [genderData, setGenderData] = useState('');


    //get all allergies adr data
    const [allAdr, setallAdr] = useState([]);
    //submit allergy adr status
    const [allergiesAdrRender, setallergiesAdrRender] = useState()

    //allergy or medicine types check click
    const [medicineCheck, setMedicineCheck] = useState(true)
    const [allergyCheck, setAllergyCheck] = useState(false)
    const [otherCheck, setOtherCheck] = useState(false)

    useEffect(() => {
        axios.get(`/unit-name`).then(res => {
            if (res.data.status === 200) {
                setallUnit(res.data.unit);
            }
        });
        axios.get(`/services-name`).then(res => {
            if (res.data.status === 200) {
                setallServices(res.data.service);
            }
        });
   
        axios.get(`/route-name`).then(res => {
            if (res.data.status === 200) {
                setallRoute(res.data.routesName);
            }
        });
        axios.get(`/dose-name`).then(res => {
            if (res.data.status === 200) {
                setallDose(res.data.dosesName);
            }
        });
        axios.get(`/frequency-name`).then(res => {
            if (res.data.status === 200) {
                setallFrequency(res.data.frequencyName);
            }
        });
        axios.get(`/reaction`).then(res => {
            if (res.data.status === 200) {
                setallReaction(res.data.reaction);
            }
        });
        axios.get(`/allergy`).then(res => {
            if (res.data.status === 200) {
                setallAllergy(res.data.allergySign);
            }
        });

    }, [])

    const [medicine, setMedicine] = useState({
        initials: ''
    })
    const [allergy, setAllergy] = useState({
        initials: ''
    })


    const handleMedicineChange = (e) => {
        setMedicine({
            ...medicine, [e.target.name]: e.target.value
        });
    }
    const handleAllergyChange = (e) => {
        setAllergy({
            ...allergy, [e.target.name]: e.target.value
        });
    }
    const handleOtherChange = (e) => {
        setotherText(e.target.value);
    }

    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/all-allergies-adr/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setallAdr(res.data.alladr);
                }
            });
        }

    }, [allergiesAdrRender, props.patient_id]);



    const submitMedicine1st = (e) => {
        e.preventDefault();
        const medicineData = {
            patient_id: props.patient_id,
            medicine_id: medicineId,
            reaction_type_id: reactionTypeId,
            initials: medicine.initials,
        }
        setMedicineId('');
        setMedicine({
            initials: ''
        })
        setReactionTypeId('')
        axios.post(`/save-allergies-adr`, medicineData).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Allergies(adr) added successfully");

            }
        })

        closeModal();

    }

    const submitAllergy1st = () => {
        const allergyData = {
            patient_id: props.patient_id,
            allergy_id: allergyId,
            reaction_type_id: reactionTypeId,
            initials: allergy.initials,
        }
        setallergyId('');
        setAllergy({
            initials: ''
        })
        setReactionTypeId('')

        axios.post(`/save-allergies-adr`, allergyData).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Allergies(adr) added successfully");

            }
        })
        closeModal();


    }

    const submitOther1st = () => {
        setotherText('');
        const otherData = {
            patient_id: props.patient_id,
            others: otherText
        }
        axios.post(`/save-allergies-adr`, otherData).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Allergies(adr) added successfully");

            }
        })
        closeModal();
    }


    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/patient-search-by-id/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setPatientInfo(res.data.patient);
                    setGenderData(res.data.patient.patient_birth_sex.birth_sex_name);
                }
            });
        }
      

    }, [props.patient_id])

    const handleAllergy1st = (e) => {
        e.preventDefault();
        setIsOpen(true);
    }




    //part1 last table functionality
    //part1 last modal
    const [modalpart1LastIsOpen, setmodalpart1LastIsOpen] = React.useState(false);
    function openModalPart1Last(e) {
        e.preventDefault();
        setmodalpart1LastIsOpen(true);
    }
    function closeModalPart1Last() {
        setmodalpart1LastIsOpen(false);

    }

    const [modalpart1LastEditIsOpen, setmodalpart1LastEditIsOpen] = useState(false);
    const [part1LastTableEditId, setpart1LastTableEditId] = useState('');
    function openEditModalPart1Last(editId) {
        setpart1LastTableEditId(editId);
        setmodalpart1LastEditIsOpen(true);
    }
    function closeEditModalPart1Last() {
        setmodalpart1LastEditIsOpen(false);

    }
    const deletePart1Last = (e, id) => {

        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-medicine-prior-taken-to/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })


    }
    const [allMedicineTakenPriorData, setallMedicineTakenPriorData] = useState([]);
    const [medicineTakenPriorRender, setmedicineTakenPriorRender] = useState('');
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-medicine-prior-taken-to/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setallMedicineTakenPriorData(res.data.allData);
                }
            });
        }
      
    }, [medicineTakenPriorRender, props.patient_id]);
    const handleAddPart1LastTable = (e) => {
        e.preventDefault();
        setmodalpart1LastIsOpen(true);
    }
    const [medicineTakenPrior, setmedicineTakenPrior] = useState({
        dose_of_frequency: '',
        dose_name: '',
        duration: '',
        route: '',
        medicine_name: ''
    })
    const handleMedicineTakenPriorChange = (e) => {
        setmedicineTakenPrior({
            ...medicineTakenPrior, [e.target.name]: e.target.value
        });
    }

    const submitPart1LastTable = (e) => {
        e.preventDefault();
        const medicineTakenPriorData = {
            patient_id: props.patient_id,
            doctor_id: ',',
            dose_of_frequency: frequencyNames,
            dose_name: doseNames,
            duration: medicineTakenPrior.duration,
            route: routeNames,
            medicine_name: medicineName
        }
        setmedicineTakenPrior({
            dose_of_frequency: '',
            dose_name: '',
            duration: '',
            route: '',
            medicine_name: ''
        })
        axios.post(`/save-medicine-prior-taken-to`, medicineTakenPriorData).then(res => {
            if (res.data.status == 200) {
                setmedicineTakenPriorRender(res.data)
                toast.success("Medicine Taken Prior Data added successfully");

            }
        })
        closeModalPart1Last();
    }

    const [editMedicineTakenPriorData, seteditMedicineTakenPriorData] = useState({
        dose_of_frequency: '',
        dose_name: '',
        duration: '',
        route: '',
        medicine_name: ''
    });
    useEffect(() => {
        if (part1LastTableEditId) {
            axios.get(`/edit-medicine-prior-taken-to/${part1LastTableEditId}`).then(res => {
                if (res.data.status === 200) {
                    seteditMedicineTakenPriorData(res.data.editData);
                }
            }); 
        }
       
    }, [part1LastTableEditId]);

    const handleEditMedicineTakenPriorChange = (e) => {
        seteditMedicineTakenPriorData({
            ...editMedicineTakenPriorData, [e.target.name]: e.target.value
        });
    }


    const updatePart1LastTable = (e) => {
        e.preventDefault();
        const medicineTakenPriorData = {
            patient_id: props.patient_id,
            doctor_id: ',',
            dose_of_frequency: frequencyNames,
            dose_name: doseNames,
            duration: editMedicineTakenPriorData.duration,
            route: routeNames,
            medicine_name: medicineName
        }
        seteditMedicineTakenPriorData({
            dose_of_frequency: '',
            dose_name: '',
            duration: '',
            route: '',
            medicine_name: ''
        })
        axios.post(`/update-medicine-prior-taken-to/${part1LastTableEditId}`, medicineTakenPriorData).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Medicine Taken Prior Data updated successfully");

            }
        })
        closeEditModalPart1Last();
    }

    //part1 nurse initiated medicines functionality 
    const [modalNurseInitiatedMedicineIsOpen, setmodalNurseInitiatedMedicineIsOpen] = React.useState(false);
    function openModalNurseInitiatedMedicine(e) {
        e.preventDefault();
        setmodalNurseInitiatedMedicineIsOpen(true);
    }
    function closeModalNurseInitiatedMedicine(e) {
        setmodalNurseInitiatedMedicineIsOpen(false);

    }

    const handleAddNurseInitiatedMedicine = (e) => {
        e.preventDefault();
        setmodalNurseInitiatedMedicineIsOpen(true);
    }
    const [medicineName, setMedicineName] = useState('')
    const [routeNames, setRouteNames] = useState('')
    const [doseNames, setDoseNames] = useState('')
    const [frequencyNames, setFrequencyNames] = useState('')

    const [nurseInitiatedMedicine, setnurseInitiatedMedicine] = useState({
        medicine_name: '',
        route: '',
        dose: '',
        frequency: '',
        time_of_dose: '',
        dose__time: '',
        prescriber_or_nurse_sign: '',
        given_by: "",
        time_given: '',
        pharmacy: '',
        nurse_initiated_date: ''
    });

    const handleNurseInitatedMedicineChange = (e) => {
        setnurseInitiatedMedicine({
            ...nurseInitiatedMedicine, [e.target.name]: e.target.value
        });
    }
    const [nurseInitRender, setNurseInitRender] = useState('');
    const submitNurseInitiated = (e) => {
        e.preventDefault();
        const nurseInitiated = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine_name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency: frequencyNames,
            time_of_dose: nurseInitiatedMedicine.time_of_dose,
            dose__time: nurseInitiatedMedicine.dose__time,
            prescriber_or_nurse_sign: nurseInitiatedMedicine.prescriber_or_nurse_sign,
            given_by: nurseInitiatedMedicine.given_by,
            time_given: nurseInitiatedMedicine.time_given,
            pharmacy: nurseInitiatedMedicine.pharmacy,
            date: nurseInitiatedMedicine.date
        }

        axios.post(`/save-nurse-initiated-medicine`, nurseInitiated).then(res => {
            if (res.data.status == 200) {
                setNurseInitRender(res.data)
                toast.success("Nurse Initiated Medicine added successfully");

            }
            closeModalNurseInitiatedMedicine();
        })
        setnurseInitiatedMedicine({
            medicine_name: '',
            route: '',
            dose: '',
            frequency: '',
            time_of_dose: '',
            dose__time: '',
            prescriber_or_nurse_sign: '',
            given_by: "",
            time_given: '',
            pharmacy: '',
            date: ''
        })
    }
    const [allNurseInitiatedMedicine, setallNurseInitiatedMedicine] = useState([]);
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-nurse-initiated-medicine/${props.patient_id}`).then(res => {

                if (res.data.status === 200) {
                    setallNurseInitiatedMedicine(res.data.allData);
                }
            });
        }
       
    }, [nurseInitRender, props.patient_id]);

    const [modalNurseInitiatedEditIsOpen, setmodalNurseInitiatedEditIsOpen] = React.useState(false);
    const [nurseInitiatedEditId, setnurseInitiatedEditId] = useState('');
    function openEditModalNurseInitiated(editId) {
        setnurseInitiatedEditId(editId);
        setmodalNurseInitiatedEditIsOpen(true);
    }
    function closeEditModalNurseInitiated() {
        setmodalNurseInitiatedEditIsOpen(false);

    }



    const deleteNurseInitiated = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-nurse-initiated-medicine/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }



    const [editNurseInitiatedData, seteditNurseInitiatedData] = useState({
        medicine_name: '',
        route: '',
        dose: '',
        frequency: '',
        time_of_dose: '',
        dose__time: '',
        prescriber_or_nurse_sign: '',
        given_by: "",
        time_given: '',
        pharmacy: ''
    });

    useEffect(() => {
        if (nurseInitiatedEditId) {
            axios.get(`/edit-nurse-initiated-medicine/${nurseInitiatedEditId}`).then(res => {
                if (res.data.status === 200) {
                    seteditNurseInitiatedData(res.data.editData);
                }
            }); 
        }
      
    }, [nurseInitiatedEditId]);

    const handleEditNurseInitatedMedicineChange = (e) => {
        seteditNurseInitiatedData({
            ...editNurseInitiatedData, [e.target.name]: e.target.value
        });
    }


    const updateNurseInitiated = (e) => {
        e.preventDefault();
        const nurseInitiatedData = {
            patient_id: props.patient_id,
            doctor_id: '',
            medicine_name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency: frequencyNames,
            time_of_dose: doseNames,
            dose__time: editNurseInitiatedData.dose__time,
            prescriber_or_nurse_sign: editNurseInitiatedData.prescriber_or_nurse_sign,
            given_by: editNurseInitiatedData.given_by,
            time_given: editNurseInitiatedData.time_given,
            pharmacy: editNurseInitiatedData.pharmacy
        }
        axios.post(`/update-nurse-initiated-medicine/${nurseInitiatedEditId}`, nurseInitiatedData).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Nurse Initiated  Data updated successfully");

            }
        })
        closeEditModalNurseInitiated();

    }


    // part-1 start Regular Medicine
    // table-4 start
    const [modalTelephoneOrdersMedicineIsOpen, setModalTelephoneOrdersMedicineIsOpen] = useState(false);
    const openModalTelephoneOrdersMedicine = (e) => {
        e.preventDefault();
        setModalTelephoneOrdersMedicineIsOpen(true);
    }
    const closeModalTelephoneOrdersMedicine = (e) => {
        setModalTelephoneOrdersMedicineIsOpen(false);
    }
    const handleAddTelephoneOrdersMedicine = (e) => {
        e.preventDefault();
        setModalTelephoneOrdersMedicineIsOpen(true);
    }



    const [telephoneOrdersMedicine, setTelephoneOrdersMedicine] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency: '',
        check__initials__n__one: '',
        check__initials__n__two: '',
        prescriber__nurse: '',
        date__no: '',
        time__given__by__one: '',
        time__given__by__two: '',
        time__given__by__three: '',
        time__given__by__four: '',
    });

    const inputTelephoneOrdersMedicineChange = (e) => {
        setTelephoneOrdersMedicine({
            ...telephoneOrdersMedicine, [e.target.name]: e.target.value
        });
    }

    const submitTelephoneOrdersMedicine = (e) => {
        e.preventDefault();
        const telephoneOrdersMedicineData = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency: frequencyNames,
            check__initials__n__one: telephoneOrdersMedicine.check__initials__n__one,
            check__initials__n__two: telephoneOrdersMedicine.check__initials__n__two,
            prescriber__nurse: telephoneOrdersMedicine.prescriber__nurse,
            date__no: telephoneOrdersMedicine.date__no,
            time__given__by__one: telephoneOrdersMedicine.time__given__by__one,
            time__given__by__two: telephoneOrdersMedicine.time__given__by__two,
            time__given__by__three: telephoneOrdersMedicine.time__given__by__three,
            time__given__by__four: telephoneOrdersMedicine.time__given__by__four,
        }
        axios.post(`/save-telephone-orders-medicine`, telephoneOrdersMedicineData).then(res => {
            if (res.data.status == 200) {
                setTelephoneOrderRender(res.data)
                toast.success("Regular Medicine As required PRN medicines added successfully");

            }
            closeModalTelephoneOrdersMedicine();
        })
        setTelephoneOrdersMedicine({
            medicine__name: '',
            route: '',
            dose: '',
            frequency: '',
            check__initials__n__one: '',
            check__initials__n__two: '',
            prescriber__nurse: '',
            date__no: '',
            time__given__by__one: '',
            time__given__by__two: '',
            time__given__by__three: '',
            time__given__by__four: '',
        });
    }

    const [telephoneOrderRender, setTelephoneOrderRender] = useState('');
    const [allTelephoneOrdersMedicine, setAllTelephoneOrdersMedicine] = useState([]);
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-telephone-orders-medicine/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setAllTelephoneOrdersMedicine(res.data.allData);
                }
            });
        }
     
    }, [telephoneOrderRender, props.patient_id]);

    // // edit 
    const [modalTelephoneOrdersMedicineEditIsOpen, setModalTelephoneOrdersMedicineEditIsOpen] = useState(false);
    const [telephoneOrdersMedicineEdit, setTelephoneOrdersMedicineEdit] = useState('');

    const openEditModalTelephoneOrdersMedicineID = (editId) => {
        setTelephoneOrdersMedicineEdit(editId);
        setModalTelephoneOrdersMedicineEditIsOpen(true);
    }
    const closeEditModalTelephoneOrdersMedicine = () => {
        setModalTelephoneOrdersMedicineEditIsOpen(false);
    }
    const deleteTelephoneOrdersMedicineID = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-telephone-orders-medicine/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }


    const [editTelephoneOrdersMedicineData, setEditTelephoneOrdersMedicineData] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency: '',
        check__initials__n__one: '',
        check__initials__n__two: '',
        prescriber__nurse: '',
        date__no: '',
        time__given__by__one: '',
        time__given__by__two: '',
        time__given__by__three: '',
        time__given__by__four: '',
    });

    useEffect(() => {
        if (telephoneOrdersMedicineEdit) {
            axios.get(`/edit-telephone-orders-medicine/${telephoneOrdersMedicineEdit}`).then(res => {
                if (res.data.status === 200) {
                    setEditTelephoneOrdersMedicineData(res.data.editData);
                }
            });
        }
       
    }, [telephoneOrdersMedicineEdit]);

    const handleTelephoneOrdersMedicineEdit = (e) => {
        setEditTelephoneOrdersMedicineData({
            ...editTelephoneOrdersMedicineData, [e.target.name]: e.target.value
        });
    }

    const updateEditTelephoneOrdersMedicine = (e) => {
        e.preventDefault();
        const editTelephoneOrdersMedicineDatas = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency: frequencyNames,
            check__initials__n__one: editTelephoneOrdersMedicineData.check__initials__n__one,
            check__initials__n__two: editTelephoneOrdersMedicineData.check__initials__n__two,
            prescriber__nurse: editTelephoneOrdersMedicineData.prescriber__nurse,
            date__no: editTelephoneOrdersMedicineData.date__no,
            time__given__by__one: editTelephoneOrdersMedicineData.time__given__by__one,
            time__given__by__two: editTelephoneOrdersMedicineData.time__given__by__two,
            time__given__by__three: editTelephoneOrdersMedicineData.time__given__by__three,
            time__given__by__four: editTelephoneOrdersMedicineData.time__given__by__four,
        }
        axios.post(`/update-telephone-orders-medicine/${telephoneOrdersMedicineEdit}`, editTelephoneOrdersMedicineDatas).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Edit Regular As required PRN medicines updated successfully");
            }
        })
        closeEditModalTelephoneOrdersMedicine();
    };


    // //table-4 end
    ///// part-1 start Regular Medicine



    // part-2 start Regular Medicine
    // table-1 start
    const [modalRegularMedicineIsOpen, setModalRegularMedicineIsOpen] = useState(false);
    const openModalRegularMedicine = (e) => {
        e.preventDefault();
        setModalRegularMedicineIsOpen(true);
    }
    const closeModalRegularMedicine = (e) => {
        setModalRegularMedicineIsOpen(false);
    }
    const handleAddRegularMedicine = (e) => {
        e.preventDefault();
        setModalRegularMedicineIsOpen(true);
    }
    const [regularMedicineDose, setRegularMedicineDose] = useState('')
    const [regularMedicine, setRegularMedicine] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        contact__no: '',
        drag__level: '',
        time__level__taken: '',
        prescriber: '',
        time__to__be__given: '',
        time_given: '',
    });

    const inputRegularMedicineChange = (e) => {
        setRegularMedicine({
            ...regularMedicine, [e.target.name]: e.target.value
        });
    }

    const submitRegularMedicine = (e) => {
        e.preventDefault();
        const regularMedicineData = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency: frequencyNames,
            indication: regularMedicine.indication,
            pharmacy__name: regularMedicine.pharmacy__name,
            prescriber__signaturer: regularMedicine.prescriber__signaturer,
            contact__no: regularMedicine.contact__no,
            drag__level: regularMedicine.drag__level,
            time__level__taken: regularMedicine.time__level__taken,
            prescriber: regularMedicine.prescriber,
            time__to__be__given: regularMedicine.time__to__be__given,
            time_given: regularMedicine.time_given
        }
        axios.post(`/save-regular-medicine-variable-dose`, regularMedicineData).then(res => {
            if (res.data.status == 200) {
                setRegularMedicineDose(res.data)
                toast.success("Regular Medicine Variable Dose added successfully");

            }
            closeModalRegularMedicine();
        })

    }
    const [allRegularMedicine, setAllRegularMedicine] = useState([]);
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-regular-medicine-variable-dose/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setAllRegularMedicine(res.data.allData);
                }
            }); 
        }
      
    }, [regularMedicineDose, props.patient_id]);

    // edit 
    const [modalRegularMedicineEditIsOpen, setModalRegularMedicineEditIsOpen] = useState(false);
    const [regularMedicineEdit, setRegularMedicineEdit] = useState('');

    const openEditModalRegularMedicineID = (editId) => {
        setRegularMedicineEdit(editId);
        setModalRegularMedicineEditIsOpen(true);
    }
    const closeEditModalRegularMedicine = () => {
        setModalRegularMedicineEditIsOpen(false);
    }


    const deleteRegularMedicineID = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-regular-medicine-variable-dose/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }

    const [editRegularMedicineData, setEditRegularMedicineData] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        contact__no: '',
        drag__level: '',
        time__level__taken: '',
        prescriber: '',
        time__to__be__given: '',
        time_given: '',
    });
    useEffect(() => {
        if (regularMedicineEdit) {
            axios.get(`/edit-regular-medicine-variable-dose/${regularMedicineEdit}`).then(res => {
                if (res.data.status === 200) {
                    setEditRegularMedicineData(res.data.editData);
                }
            }); 
        }
       
    }, [regularMedicineEdit]);

    const handleRegularMedicineEdit = (e) => {
        setEditRegularMedicineData({
            ...editRegularMedicineData, [e.target.name]: e.target.value
        });
    }
    const updateEditRegularMedicine = (e) => {
        e.preventDefault();
        const editRegularMedicineDatas = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency: frequencyNames,
            indication: editRegularMedicineData.indication,
            pharmacy__name: editRegularMedicineData.pharmacy__name,
            prescriber__signaturer: editRegularMedicineData.prescriber__signaturer,
            contact__no: editRegularMedicineData.contact__no,
            drag__level: editRegularMedicineData.drag__level,
            time__level__taken: editRegularMedicineData.time__level__taken,
            prescriber: editRegularMedicineData.prescriber,
            time__to__be__given: editRegularMedicineData.time__to__be__given,
            time_given: editRegularMedicineData.time_given,
        }

        axios.post(`/update-regular-medicine-variable-dose/${regularMedicineEdit}`, editRegularMedicineDatas).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Edit Regular Medicine Data updated successfully");

            }
        })
        closeEditModalRegularMedicine();
    }

    // table-1 end


    // table-2 start
    const [modalRecommendedAdministrationIsOpen, setModalRecommendedAdministrationIsOpen] = useState(false);
    const openModalRecommendedAdministration = (e) => {
        e.preventDefault();
        setModalRecommendedAdministrationIsOpen(true);
    }
    const closeModalRecommendedAdministration = (e) => {
        setModalRecommendedAdministrationIsOpen(false);
    }
    const handleAddRecommendedAdministration = (e) => {
        e.preventDefault();
        setModalRecommendedAdministrationIsOpen(true);
    }


    const [recommendedGuideline, setRecommendedGuideline] = useState('');

    const [timeOne, setTimeOne] = useState();
    const [timeTwo, setTimeTwo] = useState();
    const [timeThree, setTimeThree] = useState();
    const [timeFour, setTimeFour] = useState();


    const submitRecommendedGuideline = (e) => {
        e.preventDefault();
        const recommendedtimeOneData = {
            patient_id: props.patient_id,
            doctor_id: ',',
            time__schedule: recommendedGuideline,
            time__one: timeOne,
            time__two: timeTwo,
            time__three: timeThree,
            time__four: timeFour,
        }

        axios.post(`/save-recommended-gudeline-one`, recommendedtimeOneData).then(res => {
            if (res.data.status == 200) {
                setUpdateTable(res.data);
                setTimeOne('')
                setTimeTwo('')
                setTimeThree('')
                setTimeFour('')
                setRecommendedGuideline('')
                toast.success("Recommended Guideline only added successfully");


            }
            closeModalRecommendedAdministration();
        })

    }
    const [UpdateTable, setUpdateTable] = useState('');
    const [allRecommendedGuideline, setAllRecommendedGuideline] = useState([]);
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-recommended-gudeline-one/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setAllRecommendedGuideline(res.data.allData);
                }
            }); 
        }
      
    }, [UpdateTable, props.patient_id]);


    // // edit 
    const [modalRecommendedGuidelineEditIsOpen, setModalRecommendedGuidelineEditIsOpen] = useState(false);
    const [recommendedGuidelineEditId, setRecommendedGuidelineEditId] = useState('');

    const openEditModalRecommendedGuidelineID = (editId) => {
        setRecommendedGuidelineEditId(editId);
        setModalRecommendedGuidelineEditIsOpen(true);
    }



    const deleteRecommendedGuidelineID = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-recommended-gudeline-one/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }


    const closeEditModalRecommendedGuideline = () => {
        setModalRecommendedGuidelineEditIsOpen(false);
    }
    const [timeSchedule, settimeSchedule] = useState();
    const [editTimeOne, setEditTimeOne] = useState();
    const [editTimeTwo, setEditTimeTwo] = useState();
    const [editTimeThree, setEditTimeThree] = useState();
    const [editTimeFour, setEditTimeFour] = useState();

    const [editRecommendedGuideline, setEditRecommendedGuideline] = useState({
        time__schedule: "",
        time__one: "",
        time__two: "",
        time__four: "",
        time__three: "",
    });

    useEffect(() => {
        if (recommendedGuidelineEditId) {
            axios.get(`/edit-recommended-gudeline-one/${recommendedGuidelineEditId}`).then(res => {
                if (res.data.status === 200) {
                    settimeSchedule(res.data.editData.time__schedule);
                    setEditTimeOne(res.data.editData.time__one);
                    setEditTimeTwo(res.data.editData.time__two);
                    setEditTimeThree(res.data.editData.time__three);
                    setEditTimeFour(res.data.editData.time__four);
                }
            }); 
        }
      
    }, [recommendedGuidelineEditId]);

    const updateEditRecommendedGuideline = (e) => {
        e.preventDefault();

        const recommendEditTimeOneDatas = {
            patient_id: props.patient_id,
            doctor_id: ',',
            time__schedule: timeSchedule,
            time__one: editTimeOne,
            time__two: editTimeTwo,
            time__three: editTimeThree,
            time__four: editTimeFour,
        }

        setEditRecommendedGuideline({
            time__schedule: "",
            time__one: "",
            time__two: "",
            time__four: "",
            time__three: "",
        })
        axios.post(`/update-recommended-gudeline-one/${recommendedGuidelineEditId}`, recommendEditTimeOneDatas).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Edit Recommended Guideline Data updated successfully");
            }
        })
        closeEditModalRecommendedGuideline();
    }



    // table-2
    const [modalRegularMedicineTwoIsOpen, setModalRegularMedicineTwoIsOpen] = useState(false);
    const openModalRegularMedicineTwo = (e) => {
        e.preventDefault();
        setModalRegularMedicineTwoIsOpen(true);
    }
    const closeModalRegularMedicineTwo = (e) => {
        setModalRegularMedicineTwoIsOpen(false);
    }
    const handleAddRegularMedicineTwo = (e) => {
        e.preventDefault();
        setModalRegularMedicineTwoIsOpen(true);
    }

    const [regularMedicineTwo, setRegularMedicineTwo] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        contact__no: '',
        mechanical__prophylaxis: '',
        prescriber__ni__signaturer: '',
        contact__no__two: '',
        am__check: '',
        pm__check: '',
    });

    const inputRegularMedicineChangeTwo = (e) => {
        setRegularMedicineTwo({
            ...regularMedicineTwo, [e.target.name]: e.target.value
        });
    }
    const [regularMedicineTwoRender, setregularMedicineTwoRender] = useState('');
    const submitRegularMedicineTwo = (e) => {
        e.preventDefault();
        const regularMedicineDataTwo = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency: frequencyNames,
            indication: regularMedicineTwo.indication,
            pharmacy__name: regularMedicineTwo.pharmacy__name,
            prescriber__signaturer: regularMedicineTwo.prescriber__signaturer,
            contact__no: regularMedicineTwo.contact__no,
            mechanical__prophylaxis: regularMedicineTwo.mechanical__prophylaxis,
            prescriber__ni__signaturer: regularMedicineTwo.prescriber__ni__signaturer,
            contact__no__two: regularMedicineTwo.contact__no__two,
            am__check: regularMedicineTwo.am__check,
            pm__check: regularMedicineTwo.pm__check,
        }
        axios.post(`/save-regular-medicine-variable-dose-two`, regularMedicineDataTwo).then(res => {
            if (res.data.status == 200) {
                setregularMedicineTwoRender(res.data)
                toast.success("Regular Medicine Variable Dose added successfully");

            }
            closeModalRegularMedicineTwo();
        })
        setRegularMedicineTwo({
            medicine__name: '',
            route: '',
            dose: '',
            frequency: '',
            indication: '',
            pharmacy__name: "",
            prescriber__signaturer: '',
            contact__no: '',
            mechanical__prophylaxis: '',
            prescriber__ni__signaturer: '',
            contact__no__two: '',
            am__check: '',
            pm__check: '',
        });
    }
    const [allRegularMedicineTwo, setAllRegularMedicineTwo] = useState([]);
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-regular-medicine-variable-dose-two/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setAllRegularMedicineTwo(res.data.allData);
                }
            });
        }
      
    }, [regularMedicineTwoRender, props.patient_id]);

    // edit 
    const [modalRegularMedicineEditIsOpenTwo, setModalRegularMedicineEditIsOpenTwo] = useState(false);
    const [regularMedicineEditTwo, setRegularMedicineEditTwo] = useState('');

    const openEditModalRegularMedicineIDTwo = (editId) => {
        setRegularMedicineEditTwo(editId);
        setModalRegularMedicineEditIsOpenTwo(true);
    }
    const closeEditModalRegularMedicineTwo = () => {
        setModalRegularMedicineEditIsOpenTwo(false);
    }

    const deleteRegularMedicineIDTwo = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-get-regular-medicine-variable-dose-two/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }

    const [editRegularMedicineDataTwo, setEditRegularMedicineDataTwo] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        contact__no: '',
        mechanical__prophylaxis: '',
        prescriber__ni__signaturer: '',
        contact__no__two: '',
        am__check: '',
        pm__check: '',
    });

    useEffect(() => {
        if (regularMedicineEditTwo) {
            axios.get(`/edit-regular-medicine-variable-dose-two/${regularMedicineEditTwo}`).then(res => {
                if (res.data.status === 200) {
                    setEditRegularMedicineDataTwo(res.data.editData);
                }
            }); 
        }
      
    }, [regularMedicineEditTwo]);

    const handleRegularMedicineEditTwo = (e) => {
        setEditRegularMedicineDataTwo({
            ...editRegularMedicineDataTwo, [e.target.name]: e.target.value
        });
    }
    const updateEditRegularMedicineTwo = (e) => {
        e.preventDefault();
        const editRegularMedicineDatasTwo = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency: frequencyNames,
            indication: editRegularMedicineDataTwo.indication,
            pharmacy__name: editRegularMedicineDataTwo.pharmacy__name,
            prescriber__signaturer: editRegularMedicineDataTwo.prescriber__signaturer,
            contact__no: editRegularMedicineDataTwo.contact__no,
            mechanical__prophylaxis: editRegularMedicineDataTwo.mechanical__prophylaxis,
            prescriber__ni__signaturer: editRegularMedicineDataTwo.prescriber__ni__signaturer,
            contact__no__two: editRegularMedicineDataTwo.contact__no__two,
            am__check: editRegularMedicineDataTwo.am__check,
            pm__check: editRegularMedicineDataTwo.pm__check,
        }
        setEditRegularMedicineDataTwo({
            medicine__name: '',
            route: '',
            dose: '',
            frequency: '',
            indication: '',
            pharmacy__name: "",
            prescriber__signaturer: '',
            contact__no: '',
            mechanical__prophylaxis: '',
            prescriber__ni__signaturer: '',
            contact__no__two: '',
            am__check: '',
            pm__check: '',
        })
        axios.post(`/update-regular-medicine-variable-dose-two/${regularMedicineEditTwo}`, editRegularMedicineDatasTwo).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Edit Regular Medicine Data updated successfully");
            }
        })
        closeEditModalRegularMedicineTwo();
    }

    // ///// table-2 end


    // table-3 start
    const [modalRegularMedicineThreeIsOpen, setModalRegularMedicineThreeIsOpen] = useState(false);
    const openModalRegularMedicineThree = (e) => {
        e.preventDefault();
        setModalRegularMedicineThreeIsOpen(true);
    }
    const closeModalRegularMedicineThree = (e) => {
        setModalRegularMedicineThreeIsOpen(false);
    }
    const handleAddRegularMedicineThree = (e) => {
        e.preventDefault();
        setModalRegularMedicineThreeIsOpen(true);
    }

    const [regularMedicineThree, setRegularMedicineThree] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        Prescriber__to__enter: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        target__inr__range: '',
        inr__result: '',
        prescriber: '',
        sixteen__initial__1: '',
        initial__1: '',
    });

    const inputRegularMedicineChangeThree = (e) => {
        setRegularMedicineThree({
            ...regularMedicineThree, [e.target.name]: e.target.value
        });
    }
    const [doesThreeRender, setdoesThreeRender] = useState('');
    const submitRegularMedicineThree = (e) => {
        e.preventDefault();
        const regularMedicineDataThree = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            Prescriber__to__enter: regularMedicineThree.Prescriber__to__enter,
            indication: regularMedicineThree.indication,
            pharmacy__name: regularMedicineThree.pharmacy__name,
            prescriber__signaturer: regularMedicineThree.prescriber__signaturer,
            target__inr__range: regularMedicineThree.target__inr__range,
            inr__result: regularMedicineThree.inr__result,
            prescriber: regularMedicineThree.prescriber,
            sixteen__initial__1: regularMedicineThree.sixteen__initial__1,
            initial__1: regularMedicineThree.initial__1,
        }
        axios.post(`/save-regular-medicine-variable-dose-three`, regularMedicineDataThree).then(res => {
            if (res.data.status == 200) {
                setdoesThreeRender(res.data)
                toast.success("Regular Medicine Variable Dose added sucessfully");

            }
            closeModalRegularMedicineThree();
        })
        setRegularMedicineThree({
            medicine__name: '',
            route: '',
            dose: '',
            Prescriber__to__enter: '',
            indication: '',
            pharmacy__name: "",
            prescriber__signaturer: '',
            target__inr__range: '',
            inr__result: '',
            prescriber: '',
            sixteen__initial__1: '',
            initial__1: '',
        });
    }
    const [allRegularMedicineThree, setAllRegularMedicineThree] = useState([]);
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-regular-medicine-variable-dose-three/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setAllRegularMedicineThree(res.data.allData);
                }
            });
        }
      
    }, [doesThreeRender, props.patient_id]);

    // // edit 
    const [modalRegularMedicineEditIsOpenThree, setModalRegularMedicineEditIsOpenThree] = useState(false);
    const [regularMedicineEditThree, setRegularMedicineEditThree] = useState('');

    const openEditModalRegularMedicineIDThree = (editId) => {
        setRegularMedicineEditThree(editId);
        setModalRegularMedicineEditIsOpenThree(true);
    }

    const deleteRegularMedicineIDThree = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-get-regular-medicine-variable-dose-three/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }
    const closeEditModalRegularMedicineThree = () => {
        setModalRegularMedicineEditIsOpenThree(false);
    }
    const [editRegularMedicineDataThree, setEditRegularMedicineDataThree] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        Prescriber__to__enter: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        target__inr__range: '',
        inr__result: '',
        prescriber: '',
        sixteen__initial__1: '',
        initial__1: '',
    });

    useEffect(() => {
        if (regularMedicineEditThree) {
            axios.get(`/edit-regular-medicine-variable-dose-three/${regularMedicineEditThree}`).then(res => {
                if (res.data.status === 200) {
                    setEditRegularMedicineDataThree(res.data.editData);
                }
            });
        }
  
    }, [regularMedicineEditThree]);

    const handleRegularMedicineEditThree = (e) => {
        setEditRegularMedicineDataThree({
            ...editRegularMedicineDataThree, [e.target.name]: e.target.value
        });
    }
    const updateEditRegularMedicineThree = (e) => {
        e.preventDefault();
        const editRegularMedicineDatasThree = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            Prescriber__to__enter: editRegularMedicineDataThree.Prescriber__to__enter,
            indication: editRegularMedicineDataThree.indication,
            pharmacy__name: editRegularMedicineDataThree.pharmacy__name,
            prescriber__signaturer: editRegularMedicineDataThree.prescriber__signaturer,
            target__inr__range: editRegularMedicineDataThree.target__inr__range,
            inr__result: editRegularMedicineDataThree.inr__result,
            prescriber: editRegularMedicineDataThree.prescriber,
            sixteen__initial__1: editRegularMedicineDataThree.sixteen__initial__1,
            initial__1: editRegularMedicineDataThree.initial__1,
        }
        setEditRegularMedicineDataThree({
            medicine__name: '',
            route: '',
            dose: '',
            Prescriber__to__enter: '',
            indication: '',
            pharmacy__name: "",
            prescriber__signaturer: '',
            target__inr__range: '',
            inr__result: '',
            prescriber: '',
            sixteen__initial__1: '',
            initial__1: '',
        })
        axios.post(`/update-regular-medicine-variable-dose-three/${regularMedicineEditThree}`, editRegularMedicineDatasThree).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Edit Regular Medicine Data updated successfully");
            }
        })
        closeEditModalRegularMedicineThree();
    }

    // ///// table-3 end


    // // table-4 start
    const [modalRegularMedicineFourIsOpen, setModalRegularMedicineFourIsOpen] = useState(false);
    const openModalRegularMedicineFour = (e) => {
        e.preventDefault();
        setModalRegularMedicineFourIsOpen(true);
    }
    const closeModalRegularMedicineFour = (e) => {
        setModalRegularMedicineFourIsOpen(false);
    }
    const handleAddRegularMedicineFour = (e) => {
        e.preventDefault();
        setModalRegularMedicineFourIsOpen(true);
    }

    const [regularMedicineFour, setRegularMedicineFour] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency__and__now__enter: '',
        frequency__and__now__enter__time: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        contact__no: '',
    });

    const inputRegularMedicineChangeFour = (e) => {
        setRegularMedicineFour({
            ...regularMedicineFour, [e.target.name]: e.target.value
        });
    }

    const submitRegularMedicineFour = (e) => {
        e.preventDefault();
        const regularMedicineDataFour = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency__and__now__enter: frequencyNames,
            frequency__and__now__enter__time: regularMedicineFour.frequency__and__now__enter__time,
            indication: regularMedicineFour.indication,
            pharmacy__name: regularMedicineFour.pharmacy__name,
            prescriber__signaturer: regularMedicineFour.prescriber__signaturer,
            contact__no: regularMedicineFour.contact__no,
        }
        axios.post(`/save-regular-medicine-variable-dose-four`, regularMedicineDataFour).then(res => {
            if (res.data.status == 200) {
                setMedicineFourRender(res.data)
                toast.success("Regular Medicine Variable Dose added successfully");

            }
            closeModalRegularMedicineFour();
        })
        setRegularMedicineFour({
            medicine__name: '',
            route: '',
            dose: '',
            frequency__and__now__enter: '',
            frequency__and__now__enter__time: '',
            indication: '',
            pharmacy__name: "",
            prescriber__signaturer: '',
            contact__no: '',
        });
    }
    const [allRegularMedicineFour, setAllRegularMedicineFour] = useState([]);
    const [medicineFourRender, setMedicineFourRender] = useState('');

    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-regular-medicine-variable-dose-four/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setAllRegularMedicineFour(res.data.allData);
                }
            });
        }
       
    }, [medicineFourRender, props.patient_id]);

    // // edit 
    const [modalRegularMedicineEditIsOpenFour, setModalRegularMedicineEditIsOpenFour] = useState(false);
    const [regularMedicineEditFour, setRegularMedicineEditFour] = useState('');

    const openEditModalRegularMedicineIDFour = (editId) => {
        setRegularMedicineEditFour(editId);
        setModalRegularMedicineEditIsOpenFour(true);
    }


    const deleteRegularMedicineIDFour = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-get-regular-medicine-variable-dose-four/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }

    const closeEditModalRegularMedicineFour = () => {
        setModalRegularMedicineEditIsOpenFour(false);
    }
    const [editRegularMedicineDataFour, setEditRegularMedicineDataFour] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency__and__now__enter: '',
        frequency__and__now__enter__time: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        contact__no: '',
    });

    useEffect(() => {
        if (regularMedicineEditFour) {
            axios.get(`/edit-regular-medicine-variable-dose-four/${regularMedicineEditFour}`).then(res => {
                if (res.data.status === 200) {
                    setEditRegularMedicineDataFour(res.data.editData);
                }
            });
        }
       
    }, [regularMedicineEditFour]);

    const handleRegularMedicineEditFour = (e) => {
        setEditRegularMedicineDataFour({
            ...editRegularMedicineDataFour, [e.target.name]: e.target.value
        });
    }
    const updateEditRegularMedicineFour = (e) => {
        e.preventDefault();
        const editRegularMedicineDatasFour = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency__and__now__enter: frequencyNames,
            frequency__and__now__enter__time: editRegularMedicineDataFour.frequency__and__now__enter__time,
            indication: editRegularMedicineDataFour.indication,
            pharmacy__name: editRegularMedicineDataFour.pharmacy__name,
            prescriber__signaturer: editRegularMedicineDataFour.prescriber__signaturer,
            contact__no: editRegularMedicineDataFour.contact__no,
        }
        setEditRegularMedicineDataFour({
            medicine__name: '',
            route: '',
            dose: '',
            frequency__and__now__enter: '',
            frequency__and__now__enter__time: '',
            indication: '',
            pharmacy__name: "",
            prescriber__signaturer: '',
            contact__no: '',
        })
        axios.post(`/update-regular-medicine-variable-dose-four/${regularMedicineEditFour}`, editRegularMedicineDatasFour).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Edit Regular Medicine Data updated successfully");
            }
        })
        closeEditModalRegularMedicineFour();
    }

    // // ///// table-4 end

    ////// Part-3 start
    // // table-7 start
    const [modalRegularMedicineSevenIsOpen, setModalRegularMedicineSevenIsOpen] = useState(false);
    const openModalRegularMedicineSeven = (e) => {
        e.preventDefault();
        setModalRegularMedicineSevenIsOpen(true);
    }
    const closeModalRegularMedicineSeven = (e) => {
        setModalRegularMedicineSevenIsOpen(false);
    }
    const handleAddRegularMedicineSeven = (e) => {
        e.preventDefault();
        setModalRegularMedicineSevenIsOpen(true);
    }

    const [regularMedicineSeven, setRegularMedicineSeven] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency__and__now__enter: '',
        frequency__and__now__enter__time: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        contact__no: '',
    });

    const inputRegularMedicineChangeSeven = (e) => {
        setRegularMedicineSeven({
            ...regularMedicineSeven, [e.target.name]: e.target.value
        });
    }
    const [sevenRender, setSevenRender] = useState('');
    const submitRegularMedicineSeven = (e) => {
        e.preventDefault();
        const regularMedicineDataSeven = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency__and__now__enter: frequencyNames,
            frequency__and__now__enter__time: regularMedicineSeven.frequency__and__now__enter__time,
            indication: regularMedicineSeven.indication,
            pharmacy__name: regularMedicineSeven.pharmacy__name,
            prescriber__signaturer: regularMedicineSeven.prescriber__signaturer,
            contact__no: regularMedicineSeven.contact__no,
        }
        axios.post(`/save-regular-medicine-prescriber-must-seven`, regularMedicineDataSeven).then(res => {
            if (res.data.status == 200) {
                setSevenRender(res.data)
                toast.success("Regular Medicine PRESCRIBER MUST ENTER administration times added successfully");

            }
            closeModalRegularMedicineSeven();
        })
        setRegularMedicineSeven({
            medicine__name: '',
            route: '',
            dose: '',
            frequency__and__now__enter: '',
            frequency__and__now__enter__time: '',
            indication: '',
            pharmacy__name: "",
            prescriber__signaturer: '',
            contact__no: '',
        });
    }
    const [allRegularMedicineSeven, setAllRegularMedicineSeven] = useState([]);
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-regular-medicine-prescriber-must-seven/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setAllRegularMedicineSeven(res.data.allData);
                }
            }); 
        }
     
    }, [sevenRender, props.patient_id]);

    // // edit 
    const [modalRegularMedicineEditIsOpenSeven, setModalRegularMedicineEditIsOpenSeven] = useState(false);
    const [regularMedicineEditSeven, setRegularMedicineEditSeven] = useState('');

    const openEditModalRegularMedicineIDSeven = (editId) => {
        setRegularMedicineEditSeven(editId);
        setModalRegularMedicineEditIsOpenSeven(true);
    }

    const deleteRegularMedicineIDSeven = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-get-regular-medicine-variable-dose-saven/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }
    const closeEditModalRegularMedicineSeven = () => {
        setModalRegularMedicineEditIsOpenSeven(false);
    }
    const [editRegularMedicineDataSeven, setEditRegularMedicineDataSeven] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        frequency__and__now__enter: '',
        frequency__and__now__enter__time: '',
        indication: '',
        pharmacy__name: "",
        prescriber__signaturer: '',
        contact__no: '',
    });

    useEffect(() => {
        if (regularMedicineEditSeven) {
            axios.get(`/edit-regular-medicine-prescriber-must-seven/${regularMedicineEditSeven}`).then(res => {
                if (res.data.status === 200) {
                    setEditRegularMedicineDataSeven(res.data.editData);
                }
            });
        }
   
    }, [regularMedicineEditSeven]);

    const handleRegularMedicineEditSeven = (e) => {
        setEditRegularMedicineDataSeven({
            ...editRegularMedicineDataSeven, [e.target.name]: e.target.value
        });
    }
    const updateEditRegularMedicineSeven = (e) => {
        e.preventDefault();
        const editRegularMedicineDatasSeven = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            frequency__and__now__enter: frequencyNames,
            frequency__and__now__enter__time: editRegularMedicineDataSeven.frequency__and__now__enter__time,
            indication: editRegularMedicineDataSeven.indication,
            pharmacy__name: editRegularMedicineDataSeven.pharmacy__name,
            prescriber__signaturer: editRegularMedicineDataSeven.prescriber__signaturer,
            contact__no: editRegularMedicineDataSeven.contact__no,
        }
        setEditRegularMedicineDataSeven({
            medicine__name: '',
            route: '',
            dose: '',
            frequency__and__now__enter: '',
            frequency__and__now__enter__time: '',
            indication: '',
            pharmacy__name: "",
            prescriber__signaturer: '',
            contact__no: '',
        })
        axios.post(`/update-regular-medicine-prescriber-must-seven/${regularMedicineEditSeven}`, editRegularMedicineDatasSeven).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Edit Regular Medicine PRESCRIBER MUST ENTER administration times updated successfully");
            }
        })
        closeEditModalRegularMedicineSeven();
    }

    // ///// table-7 end
    ////// Part-3 end


    ////// Part-4 start
    // // table-8 start
    const [modalRegularMedicineEightIsOpen, setModalRegularMedicineEightIsOpen] = useState(false);
    const openModalRegularMedicineEight = (e) => {
        e.preventDefault();
        setModalRegularMedicineEightIsOpen(true);
    }
    const closeModalRegularMedicineEight = (e) => {
        setModalRegularMedicineEightIsOpen(false);
    }
    const handleAddRegularMedicineEight = (e) => {
        e.preventDefault();
        setModalRegularMedicineEightIsOpen(true);
    }

    const [regularMedicineEight, setRegularMedicineEight] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        hourly__frequency: '',
        hourly__frequency__time: '',
        max__prn__dose: '',
        indication: '',
        pharmacy__name: '',
        prescriber__signaturer: '',
        contact__no: '',
        date__no: '',
        time__when: '',
    });

    const inputRegularMedicineChangeEight = (e) => {
        setRegularMedicineEight({
            ...regularMedicineEight, [e.target.name]: e.target.value
        });
    }
    const submitRegularMedicineEight = (e) => {
        e.preventDefault();
        const regularMedicineDataEight = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            hourly__frequency: frequencyNames,
            hourly__frequency__time: regularMedicineEight.hourly__frequency__time,
            max__prn__dose: regularMedicineEight.max__prn__dose,
            indication: regularMedicineEight.indication,
            pharmacy__name: regularMedicineEight.pharmacy__name,
            prescriber__signaturer: regularMedicineEight.prescriber__signaturer,
            contact__no: regularMedicineEight.contact__no,
            date__no: regularMedicineEight.date__no,
            time__when: regularMedicineEight.time__when,
        }
        axios.post(`/save-regular-medicine-as-required-prn-eight`, regularMedicineDataEight).then(res => {
            if (res.data.status == 200) {
                setRegularEightRender(res.data)
                toast.success("Regular Medicine As required PRN medicines added successfully");

            }
            closeModalRegularMedicineEight();
        })
        setRegularMedicineEight({
            medicine__name: '',
            route: '',
            dose: '',
            hourly__frequency: '',
            hourly__frequency__time: '',
            max__prn__dose: '',
            indication: '',
            pharmacy__name: '',
            prescriber__signaturer: '',
            contact__no: '',
            date__no: '',
            time__when: '',
        });
    }
    const [allRegularMedicineEight, setAllRegularMedicineEight] = useState([]);
    const [regularEightRender, setRegularEightRender] = useState('');
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-regular-medicine-as-required-prn-eight/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setAllRegularMedicineEight(res.data.allData);
                }
            }); 
        }
     
    }, [regularEightRender, props.patient_id]);

    // // edit 
    const [modalRegularMedicineEditIsOpenEight, setModalRegularMedicineEditIsOpenEight] = useState(false);
    const [regularMedicineEditEight, setRegularMedicineEditEight] = useState('');

    const openEditModalRegularMedicineIDEight = (editId) => {
        setRegularMedicineEditEight(editId);
        setModalRegularMedicineEditIsOpenEight(true);
    }

    const deleteRegularMedicineIDEight = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-regular-medicine-as-required-prn-eight/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }
    const closeEditModalRegularMedicineEight = () => {
        setModalRegularMedicineEditIsOpenEight(false);
    }
    const [editRegularMedicineDataEight, setEditRegularMedicineDataEight] = useState({
        medicine__name: '',
        route: '',
        dose: '',
        hourly__frequency: '',
        max__prn__dose: '',
        indication: '',
        pharmacy__name: '',
        prescriber__signaturer: '',
        contact__no: '',
        date__no: '',
        time__when: '',
    });

    useEffect(() => {
        if (regularMedicineEditEight) {
            axios.get(`/edit-regular-medicine-as-required-prn-eight/${regularMedicineEditEight}`).then(res => {
                if (res.data.status === 200) {
                    setEditRegularMedicineDataEight(res.data.editData);
                }
            });
        }
  
    }, [regularMedicineEditEight]);

    const handleRegularMedicineEditEight = (e) => {
        setEditRegularMedicineDataEight({
            ...editRegularMedicineDataEight, [e.target.name]: e.target.value
        });
    }

    const updateEditRegularMedicineEight = (e) => {
        e.preventDefault();
        const editRegularMedicineDatasEight = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            route: routeNames,
            dose: doseNames,
            hourly__frequency: frequencyNames,
            max__prn__dose: editRegularMedicineDataEight.max__prn__dose,
            indication: editRegularMedicineDataEight.indication,
            pharmacy__name: editRegularMedicineDataEight.pharmacy__name,
            prescriber__signaturer: editRegularMedicineDataEight.prescriber__signaturer,
            contact__no: editRegularMedicineDataEight.contact__no,
            date__no: editRegularMedicineDataEight.date__no,
            time__when: editRegularMedicineDataEight.time__when,
        }
        setEditRegularMedicineDataEight({
            medicine__name: '',
            route: '',
            dose: '',
            hourly__frequency: '',
            max__prn__dose: '',
            indication: '',
            pharmacy__name: '',
            prescriber__signaturer: '',
            contact__no: '',
            date__no: '',
            time__when: '',
        })
        axios.post(`/update-regular-medicine-as-required-prn-eight/${regularMedicineEditEight}`, editRegularMedicineDatasEight).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Edit regular as required PRN medicinesa updated successfully");
            }
        })
        closeEditModalRegularMedicineEight();
    }

    ///// table-8 end
    ////// Part-4 end

    ////// Part-5 start
    // // table-9 start
    const [modalRegularMedicineNineIsOpen, setModalRegularMedicineNineIsOpen] = useState(false);
    const openModalRegularMedicineNine = (e) => {
        e.preventDefault();
        setModalRegularMedicineNineIsOpen(true);
    }
    const closeModalRegularMedicineNine = (e) => {
        setModalRegularMedicineNineIsOpen(false);
    }
    const handleAddRegularMedicineNine = (e) => {
        e.preventDefault();
        setModalRegularMedicineNineIsOpen(true);
    }

    const [regularMedicineNine, setRegularMedicineNine] = useState({
        medicine__name: '',
        reaction: '',
    });

    const inputRegularMedicineChangeNine = (e) => {
        setRegularMedicineNine({
            ...regularMedicineNine, [e.target.name]: e.target.value
        });
    }
    const [reactionNames, setReactionNames] = useState('')
    const [part5LastTableRender, setpart5LastTableRender] = useState('')

    const submitRegularMedicineNine = (e) => {
        e.preventDefault();
        const regularMedicineDataNine = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            reaction: reactionNames,

        }
        axios.post(`/save-regular-medicine-allergies-and-adverse-nine`, regularMedicineDataNine).then(res => {
            if (res.data.status == 200) {
                setpart5LastTableRender(res.data)
                toast.success("Regular Medicine Allergies and adverse drug reactions (ADR) added successfully");

            }
            closeModalRegularMedicineNine();
        })
        setRegularMedicineNine({
            medicine__name: '',
            reaction: '',
        });
    }
    const [allRegularMedicineNine, setAllRegularMedicineNine] = useState([]);
    useEffect(() => {
        if (props.patient_id) {
            axios.get(`/get-regular-medicine-allergies-and-adverse-nine/${props.patient_id}`).then(res => {
                if (res.data.status === 200) {
                    setAllRegularMedicineNine(res.data.allData);
                }
            }); 
        }
      
    }, [part5LastTableRender]);

    // // edit 
    const [modalRegularMedicineEditIsOpenNine, setModalRegularMedicineEditIsOpenNine] = useState(false);
    const [regularMedicineEditNine, setRegularMedicineEditNine] = useState('');

    const openEditModalRegularMedicineIDNine = (editId) => {
        setRegularMedicineEditNine(editId);
        setModalRegularMedicineEditIsOpenNine(true);
    }
    const closeEditModalRegularMedicineNine = () => {
        setModalRegularMedicineEditIsOpenNine(false);
    }
    const [editRegularMedicineDataNine, setEditRegularMedicineDataNine] = useState({
        medicine__name: '',
        reaction: '',
    });

    useEffect(() => {
        if (regularMedicineEditNine) {
            axios.get(`/edit-regular-medicine-allergies-and-adverse-nine/${regularMedicineEditNine}`).then(res => {
                if (res.data.status === 200) {
                    setEditRegularMedicineDataNine(res.data.editData);
                }
            });
        }
       
    }, [regularMedicineEditNine]);

    const handleRegularMedicineEditNine = (e) => {
        setEditRegularMedicineDataNine({
            ...editRegularMedicineDataNine, [e.target.name]: e.target.value
        });
    }

    const updateEditRegularMedicineNine = (e) => {
        e.preventDefault();
        const editRegularMedicineDatasNine = {
            patient_id: props.patient_id,
            doctor_id: ',',
            medicine__name: medicineName,
            reaction: reactionNames,
        }
        setEditRegularMedicineDataNine({
            medicine__name: '',
            reaction: '',
        })
        axios.post(`/update-regular-medicine-allergies-and-adverse-nine/${regularMedicineEditNine}`, editRegularMedicineDatasNine).then(res => {
            if (res.data.status == 200) {
                setallergiesAdrRender(res.data)
                toast.success("Edit Regular Allergies and adverse drug reactions (ADR) updated successfully");
            }
        })
        closeEditModalRegularMedicineNine();
    }





    const deleteRegularMedicineIDNine = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-regular-medicine-allergies-and-adverse-nine/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }
    ///// table-8 end
    ////// Part-4 end

    //deleteAllergyAdr1 

    const deleteAllergyAdr1 = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete-allergy-adr/${id}`).then(res => {
                    if (res.data.status === 200) {
                        thisClicked.closest("tr").remove();
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <Modal
            isOpen={props.modalIsOpen}
            style={customStyles}
            onRequestClose={closeModelMedicationChart}
            contentLabel="Example Modal"
        >
            <span className='float-end' style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }} onClick={props.closeModal}><i className="fal fa-times"></i></span>
            <h6 style={{ fontSize: "14px" }}>Medication Chart</h6>
            <hr className='top-hr' />
            <div className="row medication__chart__container ">
                <div className="col-1">
                    <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <button className="nav-link mb-2 active" id="medication-chart-part-1-tab" data-bs-toggle="pill" data-bs-target="#medication-chart-part-1" type="button" role="tab" aria-controls="medication-chart-part-1" aria-selected="true">Part 1</button>
                        <button className="nav-link mb-2" id="medication-chart-part-2-tab" data-bs-toggle="pill" data-bs-target="#medication-chart-part-2" type="button" role="tab" aria-controls="medication-chart-part-2" aria-selected="false">Part 2</button>
                        <button className="nav-link mb-2" id="medication-chart-part-3-tab" data-bs-toggle="pill" data-bs-target="#medication-chart-part-3" type="button" role="tab" aria-controls="medication-chart-part-3" aria-selected="false">Part 3</button>
                        <button className="nav-link mb-2" id="medication-chart-part-4-tab" data-bs-toggle="pill" data-bs-target="#medication-chart-part-4" type="button" role="tab" aria-controls="medication-chart-part-4" aria-selected="false">Part 4</button>
                        <button className="nav-link" id="medication-chart-part-5-tab" data-bs-toggle="pill" data-bs-target="#medication-chart-part-5" type="button" role="tab" aria-controls="medication-chart-part-5" aria-selected="false">Part 5</button>
                    </div>
                </div>
                <div className="col-11">
                    <div className="tab-content" id="medication-chart-tabContent">
                        <div className="tab-pane fade show active" id="medication-chart-part-1" role="tabpanel" aria-labelledby="medication-chart-part-1-tab">
                            <div className="row allergies__bg">
                                <div className="col-6">
                                    <div className="p-0">
                                        <p className="medication__text">
                                            <span className="medication__text__chart">Medication Chart</span>
                                            <span className="medication__text__page"> page 1 of 4</span>
                                        </p>
                                        <div className="allergies">
                                            <p className="allergies__text">Allergies and adverse drug rections (ADR)</p>
                                            <div className="d-flex allergies__checkbox">
                                                <div className="form-check ms-1 ">
                                                    <input className="form-check-input form__allergies__checkbox"
                                                        value="Nil known"
                                                        type="checkbox"
                                                        name="Nil known" />
                                                    <label className="form-check-label" >
                                                        Nil known
                                                    </label>
                                                </div>
                                                <div className="form-check ms-1 ">
                                                    <input className="form-check-input form__allergies__checkbox"
                                                        value="Unknown (tick appropriate box or complete details below)"
                                                        type="checkbox"
                                                        name="Unknown (tick appropriate box or complete details below)" />
                                                    <label className="form-check-label" >
                                                        Unknown (<span className="unknown__span">tick appropriate box or complete details below</span>)
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-success btn-sm float-right" onClick={handleAllergy1st}>Add</button>
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                style={customStyles1}
                                                contentLabel="Example Modal"
                                            >
                                                <div className='card-body'>
                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i className="fal fa-times"></i></span>

                                                    <h6>Add Allergies & adverse</h6>
                                                    <div className='d-flex ms-3'>
                                                        <div className="form-check">
                                                            <input className="form-check-input mt-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={medicineCheck} onChange={() => {
                                                                setMedicineCheck(true); setAllergyCheck(false); setOtherCheck(false)

                                                                setAllergy({
                                                                    ...allergy, initials: ""
                                                                })
                                                                setMedicineId('');
                                                                setReactionTypeId('');
                                                                setallergyId('');
                                                                setotherText('');
                                                            }} />
                                                            <label className="ms-2" for="flexRadioDefault1">
                                                                Medicine
                                                            </label>
                                                        </div>
                                                        <div className="form-check ms-3">
                                                            <input className="form-check-input mt-1" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={allergyCheck} onChange={() => {
                                                                setAllergyCheck(true); setMedicineCheck(false); setOtherCheck(false);

                                                                setMedicine({
                                                                    ...medicine, initials: ""
                                                                })
                                                                setMedicineId('');
                                                                setReactionTypeId('');
                                                                setallergyId('');
                                                                setotherText('');
                                                            }} />
                                                            <label className="ms-2" for="flexRadioDefault2">
                                                                Allergies
                                                            </label>
                                                        </div>
                                                        <div className="form-check ms-3">
                                                            <input className="form-check-input mt-1" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked={otherCheck} onChange={() => {
                                                                setOtherCheck(true); setAllergyCheck(false); setMedicineCheck(false)
                                                                setMedicineId('');
                                                                setReactionTypeId('');
                                                                setallergyId('');
                                                                setotherText('');
                                                                setMedicine({
                                                                    ...medicine, initials: ""
                                                                })
                                                                setAllergy({
                                                                    ...allergy, initials: ""
                                                                })
                                                            }} />
                                                            <label className=" ms-2" for="flexRadioDefault3">
                                                                Other
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {medicineCheck === true &&
                                                        <form className='mt-3'>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Medicine</label>
                                                                <div className='col-8'>
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allMedicine}
                                                                            getOptionLabel={(option) => option.drug_name}
                                                                            onChange={(e, newValue) => {

                                                                                if (newValue !== null) {
                                                                                    setMedicineId(newValue.id)
                                                                                }

                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                        />
                                                                    </div>
                                                                </div>


                                                            </div>


                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Reaction type</label>

                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allReaction}
                                                                            getOptionLabel={(option) => option.reaction_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setReactionTypeId(newValue.id)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Reaction" />}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Initials</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="initials" value={medicine.initials} onChange={handleMedicineChange} />

                                                                </div>
                                                            </div>

                                                            <button type="button" className="btn mr-2 btn-success btn-sm float-right" onClick={submitMedicine1st}>Save</button>

                                                        </form>
                                                    }


                                                    {allergyCheck === true &&
                                                        <form className='mt-3'>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Allergy</label>
                                                                <div className='col-8'>
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allAllergy}
                                                                            getOptionLabel={(option) => option.name}
                                                                            onChange={(e, newValue) => {

                                                                                if (newValue !== null) {
                                                                                    setallergyId(newValue.id)
                                                                                }

                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Allergy Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="mb-3 d-flex">
                                                                <label for="InputReaction" className="form-label d-block col-4" >Reaction type</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allReaction}
                                                                            getOptionLabel={(option) => option.reaction_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setReactionTypeId(newValue.id)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Reaction" />}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Initials</label>
                                                                <div className='col-8'>
                                                                    <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="initials" value={allergy.initials} onChange={handleAllergyChange} />

                                                                </div>
                                                            </div>
                                                            <button type="button" className="btn mr-2 btn-success btn-sm float-right" onClick={submitAllergy1st}>Save</button>

                                                        </form>
                                                    }

                                                    {otherCheck === true &&
                                                        <form className='mt-3'>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Other</label>
                                                                <div className="col-8">
                                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={otherText} name="other_text" onChange={handleOtherChange}>
                                                                    </textarea>

                                                                </div>
                                                            </div>

                                                            <button type="button" className="btn mr-2 btn-success btn-sm float-right" onClick={submitOther1st}>Save</button>

                                                        </form>
                                                    }

                                                </div>

                                            </Modal>
                                            <div className="input-group w-100">
                                                <table className='allergies__table mt-1'>

                                                    <tbody>
                                                        <tr>
                                                            <td className='w-75 fw-bold'>Medicine (or other)</td>
                                                            <td className='w-75 fw-bold'>Reaction/type/date</td>
                                                            <td className='w-75 fw-bold'>initials</td>
                                                            <td className='w-75 fw-bold'>Action</td>
                                                        </tr>
                                                        {allAdr.map((item, i) => {
                                                            return (
                                                                <tr className='' key={i} value={item.id} >
                                                                    <td>{item.drug_name || item.allergy_name || item.others}</td>
                                                                    <td>{item.reaction}</td>
                                                                    <td>{item.initials}</td>
                                                                    <td>
                                                                        <i class="fa fa-trash mx-1" onClick={(e) => deleteAllergyAdr1(e, item.id)}></i>

                                                                    </td>
                                                                </tr>

                                                            )
                                                        })}


                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="d-flex justify-content-between pt-3">
                                                <p className="allergies__text__p">Sign ..............................</p>
                                                <p className="allergies__text__p">Print .............................</p>
                                                <p className="allergies__text__p">Date ..............................</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 border__urn">
                                    <div className="container allergies__right">
                                        <div className="pt-3">
                                            <p className="allergies__text__span">
                                                <span>URN : </span>
                                                <span className='ms-2 allergies-text'>{patientInfo.patient_hn_number}</span>
                                            </p>
                                            <p className="allergies__text__span">
                                                <span>Familly name : </span>
                                                <span className='ms-2 allergies-text'>{patientInfo.patient_preferred_name}</span>
                                            </p>
                                            <p className="allergies__text__span">
                                                <span>Given name : </span>
                                                <span className='ms-2 allergies-text'>{patientInfo.patient_preferred_name}</span>
                                            </p>
                                            <p className="allergies__text__address">
                                                <span>Address : </span>
                                                <span className='ms-2 allergies-text'>{patientInfo.patient_address1}</span>
                                            </p>
                                        </div>

                                        <div className="row ">
                                            <div className="col-7">
                                                <p className="allergies__text__date">
                                                    <span>Date of birth : </span>
                                                    <span className='ms-2 allergies-text'>{moment(patientInfo.patient_dob).format('LL')}</span>
                                                </p>
                                            </div>
                                            <div className="col-5">
                                                <div className="d-flex" id="colFormLabelSmURN">
                                                    <label for="colFormLabelSmURN" className="col-form-label col-form-label-sm">
                                                        <span className="allergies__text__sex"> Sex : </span>
                                                        <span></span>
                                                    </label>
                                                    <div className="form-check form__check ms-2">
                                                        <input className="form-check-input form__birthdate__checkbox"
                                                            value="M"
                                                            type="checkbox"
                                                            checked={genderData === 'Male'}
                                                            name="M" />
                                                        <label className="allergies__text__sex" >
                                                            M
                                                        </label>
                                                    </div>
                                                    <div className="form-check form__check ms-2">
                                                        <input className="form-check-input form__birthdate__checkbox"
                                                            value="F"
                                                            type="checkbox"
                                                            checked={genderData === 'Female'}
                                                            name="F" />
                                                        <label className="allergies__text__sex" >
                                                            F
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="hr__first" />
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="allergies__text__first">First prescriber to print patient name and check label correct:</p>
                                            <p className="allergies__text__first__dot">..............................</p>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-flex justify-content-between pt-3">
                                                <p className="first__text__color">Weight(kg): ........</p>
                                                <p className="first__text__color">Height(cm): ........</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 pt-4">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="medication__text__number">
                                            <span className="medication__text__chart__number">Medication Chart Number:</span>
                                            <span className="medication__text__right"> 231 454 654</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-4">
                                        <div className="row">
                                            <label for="InputFacilityServices" className="col-sm-4 col-form-label col-form-label-sm">Facility/services:</label>
                                            <div className="col-sm-8">
                                                <select className="form-select form-select-sm mb-1" id="InputFacilityServices" value={serviceId} onChange={serviceIdChange}>
                                                    <option defaultValue="Select">Select</option>
                                                    {allServices.map((item, i) => {
                                                        return (
                                                            <>
                                                                <option key={i} value={item.id}>{item.services_name}</option>
                                                            </>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row pt-1">
                                            <label for="InputWardUnit" className="col-sm-4 col-form-label col-form-label-sm">Ward/unit:</label>
                                            <div className="col-sm-8">
                                                <select className="form-select form-select-sm mb-1" id="InputWardUnit" value={wardId} onChange={wardIdChange}>
                                                    <option defaultValue="Select">Select</option>
                                                    {allUnit.map((item, i) => {
                                                        return (
                                                            <>
                                                                <option key={i} value={item.id}>{item.unit_name}</option>
                                                            </>

                                                        )


                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <p className="medication__text__addition">Additional charts</p>
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="form-check ms-1 medication__form__check">
                                                    <input className="form-check-input check1"
                                                        value="IVFluid"
                                                        type="checkbox"
                                                        name="IVFluid"
                                                        onChange={handleAdditionalCheckboxChange}
                                                    />
                                                    <label className="form-check-label" >
                                                        IV Fluid
                                                    </label>
                                                </div>
                                                <div className="form-check ms-1 medication__form__check ">
                                                    <input className="form-check-input  check1"
                                                        type="checkbox"
                                                        value="PalliativeCare"
                                                        name="PalliativeCare"
                                                        onChange={handleAdditionalCheckboxChange}
                                                    />
                                                    <label className="form-check-label" >
                                                        Palliative care
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="form-check ms-1 medication__form__check">
                                                    <input className="form-check-input  check1"
                                                        type="checkbox"
                                                        value="BGLInsulin"
                                                        name="BGLInsulin"
                                                        onChange={handleAdditionalCheckboxChange}
                                                    />
                                                    <label className="form-check-label" >
                                                        BGL/insulin
                                                    </label>
                                                </div>
                                                <div className="form-check ms-1 medication__form__check">
                                                    <input className="form-check-input  check1"
                                                        type="checkbox"
                                                        value="Chemotherapy"
                                                        name="Chemotherapy"
                                                        onChange={handleAdditionalCheckboxChange}
                                                    />
                                                    <label className="form-check-label" >
                                                        Chemotherapy
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="form-check ms-1 medication__form__check">
                                                    <input className="form-check-input  check1"
                                                        type="checkbox"
                                                        value="AcutePain"
                                                        name="AcutePain"
                                                        onChange={handleAdditionalCheckboxChange}
                                                    />
                                                    <label className="form-check-label" >
                                                        Acute pain
                                                    </label>
                                                </div>
                                                <div className="form-check ms-1 medication__form__check">
                                                    <input className="form-check-input  check1"
                                                        type="checkbox"
                                                        value="IVHeparin"
                                                        name="IVHeparin"
                                                        onChange={handleAdditionalCheckboxChange}
                                                    />
                                                    <label className="form-check-label" >
                                                        IV heparin
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="form-check ms-1 medication__form__check">
                                                    <input className="form-check-input  check1"
                                                        type="checkbox"
                                                        value="Other"
                                                        name="Other"
                                                        onChange={handleAdditionalCheckboxChange}
                                                    />
                                                    <label className="form-check-label" >
                                                        Other
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <p className="medichine__text_p">
                                            <span className="medication__text">Once only and nurse initiated medicines and pre-medications</span>
                                        </p>
                                        <hr className="hr__medichine" />
                                        <div className="medichine__table pt-3">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="row">
                                                        <label for="InputPrescribed" className="col-sm-4 col-form-label col-form-label-sm medichine__text_p">Date Prescribed:</label>
                                                        <div className="col-sm-8 pt-2">
                                                            <input
                                                                type="date"
                                                                className="date__input border"
                                                                id="InputPrescribed"
                                                                name="date"
                                                                value={nurseInitiatedMedicine.date} onChange={handleNurseInitatedMedicineChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <ul className="list-unstyled d-flex justify-content-between pt-2">
                                                    <li className="medichine__text_p">Medicine</li>
                                                    <li><button type="button" className="btn float-end add__btn" onClick={handleAddNurseInitiatedMedicine}>Add Medicine</button></li>
                                                </ul>
                                                <Modal
                                                    isOpen={modalNurseInitiatedMedicineIsOpen}
                                                    onRequestClose={closeModalNurseInitiatedMedicine}
                                                    style={customStyles1}
                                                    contentLabel="Example Modal"
                                                >
                                                    <div className='card-body'>
                                                        <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalNurseInitiatedMedicine}><i className="fal fa-times"></i></span>
                                                        <h6>Add nurse initiated medicines </h6>
                                                        <form className='mt-4'>

                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Medicine</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allMedicine}
                                                                            getOptionLabel={(option) => option.drug_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setMedicineName(newValue.drug_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Route</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allRoute}
                                                                            getOptionLabel={(option) => option.route_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setRouteNames(newValue.route_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Dose</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allDose}
                                                                            getOptionLabel={(option) => option.dose_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setDoseNames(newValue.dose_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Frequency</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allFrequency}
                                                                            getOptionLabel={(option) => option.frequency_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setFrequencyNames(newValue.frequency_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Frequency Name" />}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Time of dose</label>
                                                                <div className="col-5">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allDose}
                                                                            getOptionLabel={(option) => option.dose_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setDoseNames(newValue.dose_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Time Of dose" />}
                                                                        />

                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <input type="time" className="form-control form__hourly__frequency__time" id="InputTime" aria-describedby="emailHelp"
                                                                        name="dose__time"
                                                                        value={nurseInitiatedMedicine.dose__time}
                                                                        onChange={handleNurseInitatedMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Prescriber/Nurse Sign</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="prescriber_or_nurse_sign" value={nurseInitiatedMedicine.prescriber_or_nurse_sign} onChange={handleNurseInitatedMedicineChange} />

                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Given by</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="given_by" value={nurseInitiatedMedicine.given_by} onChange={handleNurseInitatedMedicineChange} />

                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Time given</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="time_given" value={nurseInitiatedMedicine.time_given} onChange={handleNurseInitatedMedicineChange} />

                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Pharmacy</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="pharmacy" value={nurseInitiatedMedicine.pharmacy} onChange={handleNurseInitatedMedicineChange} />

                                                                </div>
                                                            </div>
                                                            <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                onClick={submitNurseInitiated}>Save</button>

                                                        </form>

                                                    </div>
                                                </Modal>
                                                <div className="w-100">
                                                    <table className="medication__medicine__table " id="hidePart1Nurse">
                                                        <tbody>
                                                            <tr>
                                                                <td className="medicine__table__head cell__width__p1__1">Item No.</td>
                                                                <td className="medicine__table__head cell__width__p1__2">Medicine</td>
                                                                <td className="medicine__table__head cell__width__p1__3">Route</td>
                                                                <td className="medicine__table__head cell__width__p1__4">Dose</td>
                                                                <td className="medicine__table__head cell__width__p1__5">Frequency</td>
                                                                <td className="medicine__table__head cell__width__p1__6">Time of dose</td>
                                                                <td className="medicine__table__head cell__width__p1__7">Prescriber/Nurse Initiator<br />Signature</td>
                                                                <td className="medicine__table__head cell__width__p1__8">Given by</td>
                                                                <td className="medicine__table__head cell__width__p1__9">Time given</td>
                                                                <td className="medicine__table__head cell__width__p1__10">Pharmacy</td>
                                                                <td className="medicine__table__head cell__width__p1__10" colSpan="2">Action</td>
                                                            </tr>

                                                            {allNurseInitiatedMedicine.map((item, i) => {
                                                                return (
                                                                    <tr key={i} value={item.id}>
                                                                        <td className="cell___data__color cell__width__p1__1">{i + 1}</td>
                                                                        <td className="cell___data__color cell__width__p1__2">{item.medicine_name}</td>
                                                                        <td className="cell___data__color cell__width__p1__3">{item.route}</td>
                                                                        <td className="cell___data__color cell__width__p1__4">{item.dose}</td>
                                                                        <td className="cell___data__color cell__width__p1__5">{item.frequency}</td>
                                                                        <td className="cell___data__color cell__width__p1__6">{item.dose} {item.dose__time}</td>
                                                                        <td className="cell___data__color cell__width__p1__7">{item.prescriber_or_nurse_sign}</td>
                                                                        <td className="cell___data__color cell__width__p1__8">{item.given_by}</td>
                                                                        <td className="cell___data__color cell__width__p1__9">{item.time_given}</td>
                                                                        <td className="cell___data__color cell__width__p1__10">{item.pharmacy}</td>
                                                                        <td className="cell___data__color"><i className="fas fa-edit table__edit__btn"
                                                                            onClick={() => openEditModalNurseInitiated(item.id)}></i>
                                                                            <i className="fas fa-trash text-danger table__edit__btn"
                                                                                onClick={(e) => deleteNurseInitiated(e, item.id)}></i>
                                                                        </td>

                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                    </table>

                                                    <Modal
                                                        isOpen={modalNurseInitiatedEditIsOpen}
                                                        onRequestClose={closeEditModalNurseInitiated}
                                                        style={customStyles1}
                                                        contentLabel="Example Modal"
                                                    >
                                                        <div className='card-body'>
                                                            <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalNurseInitiated}><i className="fal fa-times"></i></span>
                                                            <h6>Edit nurse initiated medichines </h6>
                                                            <form className='mt-4'>

                                                                <div className="mb-3 d-flex">
                                                                    <label for="exampleInputEmail1" className="form-label d-block col-4" >Medicine</label>
                                                                    <div className="col-8">
                                                                        <div className="medication__chart__autocomplete">
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                id="combo-box-demo"
                                                                                defaultValue={{ drug_name: editNurseInitiatedData.medicine_name }}
                                                                                options={allMedicine}
                                                                                getOptionLabel={(option) => option.drug_name}
                                                                                onChange={(e, newValue) => {
                                                                                    if (newValue !== null) {
                                                                                        setMedicineName(newValue.drug_name)
                                                                                    }
                                                                                }}
                                                                                size="small"
                                                                                renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                            />

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="mb-3 d-flex">
                                                                    <label for="exampleInputEmail1" className="form-label d-block col-4" >Route</label>
                                                                    <div className="col-8">
                                                                        <div className="medication__chart__autocomplete">
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                id="combo-box-demo"
                                                                                defaultValue={{ route_name: editNurseInitiatedData.route }}
                                                                                options={allRoute}
                                                                                getOptionLabel={(option) => option.route_name}
                                                                                onChange={(e, newValue) => {
                                                                                    if (newValue !== null) {
                                                                                        setRouteNames(newValue.route_name)
                                                                                    }
                                                                                }}
                                                                                size="small"
                                                                                renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 d-flex">
                                                                    <label for="exampleInputEmail1" className="form-label d-block col-4" >Dose</label>
                                                                    <div className="col-8">
                                                                        <div className="medication__chart__autocomplete">
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                id="combo-box-demo"
                                                                                defaultValue={{ dose_name: editNurseInitiatedData.dose }}
                                                                                options={allDose}
                                                                                getOptionLabel={(option) => option.dose_name}
                                                                                onChange={(e, newValue) => {
                                                                                    if (newValue !== null) {
                                                                                        setDoseNames(newValue.dose_name)
                                                                                    }
                                                                                }}
                                                                                size="small"
                                                                                renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 d-flex">
                                                                    <label for="exampleInputEmail1" className="form-label d-block col-4" >Frequency</label>
                                                                    <div className="col-8">
                                                                        <div className="medication__chart__autocomplete">
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                id="combo-box-demo"
                                                                                defaultValue={{ frequency_name: editNurseInitiatedData.frequency }}
                                                                                options={allFrequency}
                                                                                getOptionLabel={(option) => option.frequency_name}
                                                                                onChange={(e, newValue) => {
                                                                                    if (newValue !== null) {
                                                                                        setFrequencyNames(newValue.frequency_name)
                                                                                    }
                                                                                }}
                                                                                size="small"
                                                                                renderInput={(params) => <TextField {...params} label="Frequency Name" />}
                                                                            />


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 d-flex">
                                                                    <label for="exampleInputEmail1" className="form-label d-block col-4" >Time Of dose</label>
                                                                    <div className="col-5">
                                                                        <div className="medication__chart__autocomplete">
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                id="combo-box-demo"
                                                                                defaultValue={{ dose_name: editNurseInitiatedData.dose }}
                                                                                options={allDose}
                                                                                getOptionLabel={(option) => option.dose_name}
                                                                                onChange={(e, newValue) => {
                                                                                    if (newValue !== null) {
                                                                                        setDoseNames(newValue.dose_name)
                                                                                    }
                                                                                }}
                                                                                size="small"
                                                                                renderInput={(params) => <TextField {...params} label="Time Of dose" />}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <input type="time" className="form-control form__hourly__frequency__time" id="InputTime" aria-describedby="emailHelp"
                                                                            name="dose__time"
                                                                            value={editNurseInitiatedData.dose__time}
                                                                            onChange={handleEditNurseInitatedMedicineChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 d-flex">
                                                                    <label for="exampleInputEmail1" className="form-label d-block col-4" >Prescriber/Nurdse Sign</label>
                                                                    <div className="col-8">
                                                                        <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="prescriber_or_nurse_sign" value={editNurseInitiatedData.prescriber_or_nurse_sign} onChange={handleEditNurseInitatedMedicineChange} />

                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 d-flex">
                                                                    <label for="exampleInputEmail1" className="form-label d-block col-4" >Given By</label>
                                                                    <div className="col-8">
                                                                        <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="given_by" value={editNurseInitiatedData.given_by} onChange={handleEditNurseInitatedMedicineChange} />

                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 d-flex">
                                                                    <label for="exampleInputEmail1" className="form-label d-block col-4" >Time given</label>
                                                                    <div className="col-8">
                                                                        <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="time_given" value={editNurseInitiatedData.time_given} onChange={handleEditNurseInitatedMedicineChange} />

                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 d-flex">
                                                                    <label for="exampleInputEmail1" className="form-label d-block col-4" >Pharmacy</label>
                                                                    <div className="col-8">
                                                                        <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="pharmacy" value={editNurseInitiatedData.pharmacy} onChange={handleEditNurseInitatedMedicineChange} />

                                                                    </div>
                                                                </div>
                                                                <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                    onClick={updateNurseInitiated}>Update</button>

                                                            </form>

                                                        </div>
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <p className="medichine__text_p">
                                            <span className="medication__text">Telephone orders (to be signed within 24 hours of order)</span>
                                        </p>
                                        <hr className="hr__medichine" />
                                        <div className="medichine__table pt-3">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="row">
                                                        <label for="InputPrescribed" className="col-sm-4 col-form-label col-form-label-sm medichine__text_p">Date Prescribed:</label>
                                                        <div className="col-sm-8 pt-2">
                                                            <input
                                                                type="date"
                                                                name="Date Prescribed"
                                                                className="date__input border"
                                                                onChange={dateInput}
                                                                id="InputPrescribed"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-0">
                                                <ul className="list-unstyled d-flex justify-content-between pt-2">
                                                    <li className="medichine__text_p">Medicine</li>
                                                    <li><button type="button" className="btn float-end add__btn" onClick={handleAddTelephoneOrdersMedicine}>Add Medicine</button></li>
                                                </ul>
                                                <Modal
                                                    isOpen={modalTelephoneOrdersMedicineIsOpen}
                                                    onRequestClose={closeModalTelephoneOrdersMedicine}
                                                    style={customStyles1}
                                                    contentLabel="Example Modal"
                                                >
                                                    <div className='card-body card__body__regular__medicine'>
                                                        <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalTelephoneOrdersMedicine}><i className="fal fa-times"></i></span>
                                                        <h6>Add Telephone orders (to be signed within 24 hours of order) 4</h6>
                                                        <form className='mt-4'>

                                                            <div className="mb-3 d-flex">
                                                                <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allMedicine}
                                                                            getOptionLabel={(option) => option.drug_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setMedicineName(newValue.drug_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allRoute}
                                                                            getOptionLabel={(option) => option.route_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setRouteNames(newValue.route_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allDose}
                                                                            getOptionLabel={(option) => option.dose_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    // // // console.log("Dose Name 222", newValue)
                                                                                    setDoseNames(newValue.dose_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputFrequency" className="form-label d-block col-4" >Frequency</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allFrequency}
                                                                            getOptionLabel={(option) => option.frequency_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setFrequencyNames(newValue.frequency_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Frequency Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputCheckInitialsN1" className="form-label d-block col-4" >Check initials N1</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputCheckInitialsN1" aria-describedby="emailHelp"
                                                                        name="check__initials__n__one"
                                                                        value={telephoneOrdersMedicine.check__initials__n__one}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputCheckInitialsN2" className="form-label d-block col-4" >Check initials N2</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputCheckInitialsN2" aria-describedby="emailHelp"
                                                                        name="check__initials__n__two"
                                                                        value={telephoneOrdersMedicine.check__initials__n__two}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputPrescriberNurseInitiator" className="form-label d-block col-4" >Prescriber/Nurse Initiator Signature</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputPrescriberNurseInitiator" aria-describedby="emailHelp"
                                                                        name="prescriber__nurse"
                                                                        value={telephoneOrdersMedicine.prescriber__nurse}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                        name="pharmacy__name"
                                                                        value={telephoneOrdersMedicine.pharmacy__name}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                        name="prescriber__signaturer"
                                                                        value={telephoneOrdersMedicine.prescriber__signaturer}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputDate" className="form-label d-block col-4" >Date</label>
                                                                <div className="col-8">
                                                                    <input type="date" className="form-control " id="InputDate" aria-describedby="emailHelp"
                                                                        name="date__no"
                                                                        value={telephoneOrdersMedicine.date__no}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputTimeGivenByOne" className="form-label d-block col-4" >Record Time/ given by One</label>
                                                                <div className="col-8">
                                                                    <input type="time" className="form-control " id="InputTimeGivenByOne" aria-describedby="emailHelp"
                                                                        name="time__given__by__one"
                                                                        value={telephoneOrdersMedicine.time__given__by__one}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputTimeGivenByTwo" className="form-label d-block col-4" >Record Time/ given by two</label>
                                                                <div className="col-8">
                                                                    <input type="time" className="form-control " id="InputTimeGivenByTwo" aria-describedby="emailHelp"
                                                                        name="time__given__by__two"
                                                                        value={telephoneOrdersMedicine.time__given__by__two}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputTimeGivenByThree" className="form-label d-block col-4" >Record time/given by three</label>
                                                                <div className="col-8">
                                                                    <input type="time" className="form-control " id="InputTimeGivenByThree" aria-describedby="emailHelp"
                                                                        name="time__given__by__three"
                                                                        value={telephoneOrdersMedicine.time__given__by__three}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputTimeGivenByFour" className="form-label d-block col-4" >Record Time/given by four</label>
                                                                <div className="col-8">
                                                                    <input type="time" className="form-control " id="InputTimeGivenByFour" aria-describedby="emailHelp"
                                                                        name="time__given__by__four"
                                                                        value={telephoneOrdersMedicine.time__given__by__four}
                                                                        onChange={inputTelephoneOrdersMedicineChange} />
                                                                </div>
                                                            </div>
                                                            <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                onClick={submitTelephoneOrdersMedicine}>Save</button>
                                                        </form>
                                                    </div>
                                                </Modal>
                                                <div className="input-group w-100 " >
                                                    <table className='medichine__nested__table' id="hidePart1TelePhone">
                                                        <tr>
                                                            <td className='tableHead w-25 fw-bold' rowSpan="2" >Item No.</td>
                                                            <td className='tableHead w-25 fw-bold' rowSpan="2">Medicine</td>
                                                            <td className='tableHead w-25 fw-bold' rowSpan="2">Route</td>
                                                            <td className='tableHead w-25 fw-bold' rowSpan="2">Dose</td>
                                                            <td className='tableHead w-25 fw-bold' rowSpan="2">Frequency</td>
                                                            <td className='tableHead w-25 fw-bold' colSpan="2">Check initials</td>
                                                            <td className='tableHead w-25 fw-bold' rowSpan="2">Prescriber/Nurse Initiator Signature</td>
                                                            <td className='tableHead w-25 fw-bold' rowSpan="2">Date</td>
                                                            <td className='tableHead w-25 fw-bold' colSpan="4">Record of administration</td>
                                                            <td className='tableHead w-25 fw-bold' colSpan="2" rowSpan="2">Action</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='tableHead w-25 fw-bold'>N1</td>
                                                            <td className='tableHead w-25 fw-bold'>N2</td>
                                                            <td className='tableHead w-25 fw-bold'>Time/given by</td>
                                                            <td className='tableHead w-25 fw-bold'>Time/given by</td>
                                                            <td className='tableHead w-25 fw-bold'>Time/given by</td>
                                                            <td className='tableHead w-25 fw-bold'>Time/given by</td>
                                                        </tr>
                                                        {
                                                            allTelephoneOrdersMedicine.length > 0 && allTelephoneOrdersMedicine.map((item, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td className="cell___data__color">{i + 1}</td>
                                                                        <td className="cell___data__color">{item.medicine__name}</td>
                                                                        <td className="cell___data__color">{item.route}</td>
                                                                        <td className="cell___data__color">{item.dose}</td>
                                                                        <td className="cell___data__color">{item.frequency}</td>
                                                                        <td className="cell___data__color">{item.check__initials__n__one}</td>
                                                                        <td className="cell___data__color">{item.check__initials__n__two}</td>
                                                                        <td className="cell___data__color">{item.prescriber__nurse}</td>
                                                                        <td className="cell___data__color">{item.date__no}</td>
                                                                        <td className="cell___data__color">{item.time__given__by__one}</td>
                                                                        <td className="cell___data__color">{item.time__given__by__two}</td>
                                                                        <td className="cell___data__color">{item.time__given__by__three}</td>
                                                                        <td className="cell___data__color">{item.time__given__by__four}</td>
                                                                        <td className="cell___data__color">
                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalTelephoneOrdersMedicineID(item.id)}></i>
                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => deleteTelephoneOrdersMedicineID(e, item.id)}></i>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </table>
                                                </div>
                                                <Modal
                                                    isOpen={modalTelephoneOrdersMedicineEditIsOpen}
                                                    onRequestClose={closeEditModalTelephoneOrdersMedicine}
                                                    style={customStyles1}
                                                    contentLabel="Example Modal"
                                                >
                                                    <div className='card-body card__body__regular__medicine'>
                                                        <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalTelephoneOrdersMedicine}><i className="fal fa-times"></i></span>
                                                        <h6>Edit Telephone orders (to be signed within 24 hours of order) 4</h6>
                                                        <form className='mt-4'>

                                                            <div className="mb-3 d-flex">
                                                                <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            defaultValue={{ drug_name: editTelephoneOrdersMedicineData.medicine__name }}
                                                                            options={allMedicine}
                                                                            getOptionLabel={(option) => option.drug_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setMedicineName(newValue.drug_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            defaultValue={{ route_name: editTelephoneOrdersMedicineData.route }}
                                                                            options={allRoute}
                                                                            getOptionLabel={(option) => option.route_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setRouteNames(newValue.route_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            defaultValue={{ dose_name: editTelephoneOrdersMedicineData.dose }}
                                                                            options={allDose}
                                                                            getOptionLabel={(option) => option.dose_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setDoseNames(newValue.dose_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputFrequency" className="form-label d-block col-4" >Frequency</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            defaultValue={{ frequency_name: editTelephoneOrdersMedicineData.frequency }}
                                                                            options={allFrequency}
                                                                            getOptionLabel={(option) => option.frequency_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setFrequencyNames(newValue.frequency_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Frequency Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputCheckInitialsN1" className="form-label d-block col-4" >Check initials N1</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputCheckInitialsN1" aria-describedby="emailHelp"
                                                                        name="check__initials__n__one"
                                                                        value={editTelephoneOrdersMedicineData.check__initials__n__one}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputCheckInitialsN2" className="form-label d-block col-4" >Check initials N2</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputCheckInitialsN2" aria-describedby="emailHelp"
                                                                        name="check__initials__n__two"
                                                                        value={editTelephoneOrdersMedicineData.check__initials__n__two}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputPrescriberNurseInitiator" className="form-label d-block col-4" >Prescriber/Nurse Initiator Signature</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputPrescriberNurseInitiator" aria-describedby="emailHelp"
                                                                        name="prescriber__nurse"
                                                                        value={editTelephoneOrdersMedicineData.prescriber__nurse}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                        name="pharmacy__name"
                                                                        value={editTelephoneOrdersMedicineData.pharmacy__name}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                        name="prescriber__signaturer"
                                                                        value={editTelephoneOrdersMedicineData.prescriber__signaturer}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputDate" className="form-label d-block col-4" >Date</label>
                                                                <div className="col-8">
                                                                    <input type="date" className="form-control " id="InputDate" aria-describedby="emailHelp"
                                                                        name="date__no"
                                                                        value={editTelephoneOrdersMedicineData.date__no}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputTimeGivenByOne" className="form-label d-block col-4" >Record Time/ given by One</label>
                                                                <div className="col-8">
                                                                    <input type="time" className="form-control " id="InputTimeGivenByOne" aria-describedby="emailHelp"
                                                                        name="time__given__by__one"
                                                                        value={editTelephoneOrdersMedicineData.time__given__by__one}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputTimeGivenByTwo" className="form-label d-block col-4" >Record Time/ given by Two</label>
                                                                <div className="col-8">
                                                                    <input type="time" className="form-control " id="InputTimeGivenByTwo" aria-describedby="emailHelp"
                                                                        name="time__given__by__two"
                                                                        value={editTelephoneOrdersMedicineData.time__given__by__two}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputTimeGivenByThree" className="form-label d-block col-4" >Record Time/ given by Three</label>
                                                                <div className="col-8">
                                                                    <input type="time" className="form-control " id="InputTimeGivenByThree" aria-describedby="emailHelp"
                                                                        name="time__given__by__three"
                                                                        value={editTelephoneOrdersMedicineData.time__given__by__three}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="InputTimeGivenByFour" className="form-label d-block col-4" >Record Time/ given by Four</label>
                                                                <div className="col-8">
                                                                    <input type="time" className="form-control " id="InputTimeGivenByFour" aria-describedby="emailHelp"
                                                                        name="time__given__by__four"
                                                                        value={editTelephoneOrdersMedicineData.time__given__by__four}
                                                                        onChange={handleTelephoneOrdersMedicineEdit} />
                                                                </div>
                                                            </div>
                                                            <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                onClick={updateEditTelephoneOrdersMedicine}>Update</button>
                                                        </form>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <p className="medichine__text_p">
                                            <span className="medication__text">Medicines taken prior to presentation to hospital</span>
                                        </p>
                                        <div className="row">
                                            <div className="col-6">
                                                <span className="medication__text__pre">(prescribed over the counter, complementary) </span>
                                                <span className="medication__text__own">Own medicines brought in ?</span>
                                            </div>
                                            <div className="col-2">
                                                <div className="d-flex justify-content-evenly col__checkbox__form">
                                                    <div className="">
                                                        <input className="form-check-input radio1"
                                                            value="Y"
                                                            type="radio"
                                                            name="presentationToHospital"
                                                            onChange={handlePreHopsitalChange1}
                                                        />
                                                        <label className="form-check-label" >
                                                            Y
                                                        </label>
                                                    </div>
                                                    <div className="">
                                                        <input className="form-check-input radio1"
                                                            type="radio"
                                                            value="N"
                                                            name="presentationToHospital"
                                                            onChange={handlePreHopsitalChange2}
                                                        />
                                                        <label className="form-check-label" >
                                                            N
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="row">
                                                    <label for="InputAdministration" className="col-sm-7 col-form-label col-form-label-sm col__medication__form">Administration aid (specify)</label>
                                                    <div className="col-sm-5">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="InputAdministration"
                                                            name="administration__name"
                                                            value={aid}
                                                            onChange={aidChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="medichine__table pt-3">
                                            <div className="mt-0">
                                                <ul className="list-unstyled d-flex justify-content-end">
                                                    <li><button type="button" className="btn float-end add__btn" onClick={handleAddPart1LastTable}>Add Medicine</button></li>
                                                </ul>
                                                <Modal
                                                    isOpen={modalpart1LastIsOpen}
                                                    onRequestClose={closeModalPart1Last}
                                                    style={customStyles1}
                                                    contentLabel="Example Modal"
                                                >
                                                    <div className='card-body'>
                                                        <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalPart1Last}><i className="fal fa-times"></i></span>
                                                        <h6>Add Medicines taken prior </h6>
                                                        <form className='mt-4'>

                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Medicine</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allMedicine}
                                                                            getOptionLabel={(option) => option.drug_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setMedicineName(newValue.drug_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Route</label>
                                                                <div className="col-8">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allRoute}
                                                                            getOptionLabel={(option) => option.route_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setRouteNames(newValue.route_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Dose of frequency</label>
                                                                <div className="col-4">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allFrequency}
                                                                            getOptionLabel={(option) => option.frequency_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setFrequencyNames(newValue.frequency_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Dose of frequency" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div className="medication__chart__autocomplete">
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            id="combo-box-demo"
                                                                            options={allDose}
                                                                            getOptionLabel={(option) => option.dose_name}
                                                                            onChange={(e, newValue) => {
                                                                                if (newValue !== null) {
                                                                                    setDoseNames(newValue.dose_name)
                                                                                }
                                                                            }}
                                                                            size="small"
                                                                            renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 d-flex">
                                                                <label for="exampleInputEmail1" className="form-label d-block col-4" >Duration</label>
                                                                <div className="col-8">
                                                                    <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"
                                                                        name="duration"
                                                                        value={medicineTakenPrior.duration}
                                                                        onChange={handleMedicineTakenPriorChange} />

                                                                </div>
                                                            </div>

                                                            <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                onClick={submitPart1LastTable}>Save</button>

                                                        </form>

                                                    </div>
                                                </Modal>

                                                <div className="w-100">
                                                    <table className="medication__medicine__table" id="hidePart1MedicineTakens">
                                                        <tbody>
                                                            <tr>
                                                                <td className="medicine__table__head cell__width__p13__1">Item No.</td>
                                                                <td className="medicine__table__head cell__width__p13__2">Medicine</td>
                                                                <td className="medicine__table__head cell__width__p13__3">Route</td>
                                                                <td className="medicine__table__head cell__width__p13__4">Dose of frequency</td>
                                                                <td className="medicine__table__head cell__width__p13__5">Duration</td>
                                                                <td className="medicine__table__head cell__width__p13__5" colSpan="2">Action</td>
                                                            </tr>

                                                            {allMedicineTakenPriorData.map((item, i) => {
                                                                return (
                                                                    <tr key={i} value={item.id}>
                                                                        <td className="cell___data__color cell__width__p13__1"> {i + 1}</td>
                                                                        <td className="cell___data__color cell__width__p13__2">{item.medicine_name} </td>
                                                                        <td className="cell___data__color cell__width__p13__3">{item.route}</td>
                                                                        <td className="cell___data__color cell__width__p13__4">{item.frequency_name} {item.dose_name}</td>
                                                                        <td className="cell___data__color cell__width__p13__5">{item.duration}</td>
                                                                        <td className="cell___data__color">
                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalPart1Last(item.id)}></i>
                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => deletePart1Last(e, item.id)}></i>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}

                                                            <Modal
                                                                isOpen={modalpart1LastEditIsOpen}
                                                                onRequestClose={closeEditModalPart1Last}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalPart1Last}><i className="fal fa-times"></i></span>
                                                                    <h6>Edit Medicines taken prior </h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="exampleInputEmail1" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ drug_name: editMedicineTakenPriorData.medicine_name }}
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />

                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="exampleInputEmail1" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ route_name: editMedicineTakenPriorData.route }}
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="exampleInputEmail1" className="form-label d-block col-4" >Dose of frequency</label>
                                                                            <div className="col-4">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ frequency_name: editMedicineTakenPriorData.dose_name }}
                                                                                        options={allFrequency}
                                                                                        getOptionLabel={(option) => option.frequency_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setFrequencyNames(newValue.frequency_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose of frequency" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-4">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ dose_name: editMedicineTakenPriorData.dose_name }}
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="exampleInputEmail1" className="form-label d-block col-4" >Duration</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"
                                                                                    name="duration"
                                                                                    value={editMedicineTakenPriorData.duration}
                                                                                    onChange={handleEditMedicineTakenPriorChange} />

                                                                            </div>
                                                                        </div>

                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                            onClick={updatePart1LastTable}>Update</button>

                                                                    </form>

                                                                </div>
                                                            </Modal>

                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row pt-4">
                                                    <div className="col-10">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <label for="InputGB" className="col-sm-3 col-form-label col-form-label-sm medichine__text_p">GB</label>
                                                                    <div className="col-sm-7 pt-1">
                                                                        <input
                                                                            type="text"
                                                                            name="gb__name"
                                                                            value={gb}
                                                                            className="form-control"
                                                                            id="InputGB"
                                                                            onChange={gbChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <label for="InputCommunity" className="col-sm-5 col-form-label col-form-label-sm medichine__text_p">Community Pharmacy</label>
                                                                    <div className="col-sm-7 pt-1">
                                                                        <input
                                                                            type="text"
                                                                            name="community__pharmacy__name"
                                                                            value={community}
                                                                            className="form-control"
                                                                            id="InputCommunity"
                                                                            onChange={communityChange}
                                                                        />
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
                            </div>

                            <div className="float-right pt-4">
                                <button className="btn__next mx-2" onClick={nextPageForStep2}>
                                    <b>Next</b> <i className="fas fa-angle-right ms-2"></i>
                                </button>
                                <button className="btn__save mx-2" onClick={saveMedicationChartPartOneData}>
                                    <b>Save</b>
                                </button>
                                <button className="btn__cancel" onClick={props.closeModal}>
                                    <b>Cancel</b>
                                </button>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="medication-chart-part-2" role="tabpanel" aria-labelledby="medication-chart-part-2-tab">
                            <div className="row">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <div className="row g-2">
                                            <div className="col-4">
                                                <div className="re__border">
                                                    <p className="re__text__title">Reason for not administering</p>
                                                    <p className="re__text__sub__title guideline">Code MUST be circled</p>
                                                    <hr className="hr__medichine" />
                                                    <div className="row">

                                                        <div className="col-5">
                                                            <div className="form-check radio__check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="Absent" />
                                                                <label className="form-check-label" for="Absent">
                                                                    Absent
                                                                </label>
                                                            </div>
                                                            <div className="form-check radio__check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="Fasting" />
                                                                <label className="form-check-label" for="Fasting">
                                                                    Fasting
                                                                </label>
                                                            </div>
                                                            <div className="form-check radio__check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="Refused" />
                                                                <label className="form-check-label" for="Refused">
                                                                    Refused-notify prescriber
                                                                </label>
                                                            </div><div className="form-check radio__check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="Vomiting" />
                                                                <label className="form-check-label" for="Vomiting">
                                                                    Vomiting
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-7">
                                                            <div className="form-check radio__check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="OnLeave" />
                                                                <label className="form-check-label" for="OnLeave">
                                                                    On Leave
                                                                </label>
                                                            </div><div className="form-check radio__check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="NotAvailable" />
                                                                <label className="form-check-label" for="NotAvailable">
                                                                    Not available-obtain supply or contact prescriber
                                                                </label>
                                                            </div>
                                                            <div className="form-check radio__check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="WithheldEnter" />
                                                                <label className="form-check-label" for="WithheldEnter">
                                                                    Withheld-enter reason in clinical record
                                                                </label>
                                                            </div><div className="form-check radio__check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="SelfAdministered" />
                                                                <label className="form-check-label" for="SelfAdministered">
                                                                    Self administered
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="re__border">
                                                    <p className="re__text__title">Recommended administration times</p>
                                                    <ul className="list-unstyled d-flex justify-content-between guideline">
                                                        <li className="re__text__sub__title">Guidelines only</li>
                                                        <li><button type="button" className="btn add__btn__guideline" onClick={handleAddRecommendedAdministration}>Add</button></li>
                                                    </ul>
                                                    <hr className="hr__medichine" />
                                                    <Modal
                                                        isOpen={modalRecommendedAdministrationIsOpen}
                                                        onRequestClose={closeModalRecommendedAdministration}
                                                        style={customStyles1}
                                                        contentLabel="Example Modal"
                                                    >
                                                        <div className='card-body card__body__regular__medicine'>
                                                            <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalRecommendedAdministration}><i className="fal fa-times"></i></span>
                                                            <h6>Add Recommended administration times Guidelines only</h6>
                                                            <div className="p-1 px-3">
                                                                <label htmlFor="inputEmail4"
                                                                    className="form-label col-form-label col-form-label-sm">Guidelines Shcedule</label>
                                                                <select id="id"
                                                                    className="form-select  col-form-label-sm font-size-patient"
                                                                    name="id"
                                                                    onChange={e => setRecommendedGuideline(e.target.value)}
                                                                >
                                                                    <option selected>Select</option>
                                                                    <option value="Mornning">Mornning</option>
                                                                    <option value="Night">Night</option>
                                                                    <option value="Twice a day">Twice a day</option>
                                                                    <option value="Three times a day">Three times a day</option>
                                                                    <option value="Regular 6 hourly">Regular 6 hourly</option>
                                                                    <option value="Regular 8 hourly">Regular 8 hourly</option>
                                                                    <option value="Four times a day">Four times a day</option>
                                                                </select>
                                                            </div>
                                                            {
                                                                recommendedGuideline === "Mornning" &&
                                                                <div className="col-md-12 p-1 px-3">
                                                                    <label htmlFor="exampleFormControlTextarea1"
                                                                        className="form-label col-form-label col-form-label-sm">Mornning</label>
                                                                    <input type="text" placeholder="Mornning time"
                                                                        className="form-control form-control-sm"
                                                                        onChange={e => setTimeOne(e.target.value)}
                                                                    />
                                                                </div>
                                                            }
                                                            {
                                                                recommendedGuideline === "Night" &&
                                                                <div className="col-md-12 p-1 px-3">
                                                                    <label htmlFor="exampleFormControlTextarea1"
                                                                        className="form-label col-form-label col-form-label-sm">Night</label>
                                                                    <input type="text" placeholder="Night time"
                                                                        className="form-control form-control-sm"
                                                                        onChange={e => setTimeOne(e.target.value)}
                                                                    />
                                                                </div>
                                                            }
                                                            {
                                                                recommendedGuideline === "Twice a day" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Twice a day One</label>
                                                                        <input type="text" placeholder="Twice a day time"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeOne(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Twice a day two</label>
                                                                        <input type="text" placeholder="Twice a day time"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeTwo(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                recommendedGuideline === "Three times a day" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Three times a day one</label>
                                                                        <input type="text" placeholder="Three times a day"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeOne(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Three times a day two</label>
                                                                        <input type="text" placeholder="Three times a day"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeTwo(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Three times a day three</label>
                                                                        <input type="text" placeholder="Three times a day"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeThree(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                recommendedGuideline === "Regular 6 hourly" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time One</label>
                                                                        <input type="text" placeholder="Time one"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeOne(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time Two</label>
                                                                        <input type="text" placeholder="Time two"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeTwo(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time Three</label>
                                                                        <input type="text" placeholder="Time three"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeThree(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time Four</label>
                                                                        <input type="text" placeholder="Time four"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeFour(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                recommendedGuideline === "Regular 8 hourly" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time One</label>
                                                                        <input type="text" placeholder="Time one"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeOne(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time Two</label>
                                                                        <input type="text" placeholder="Time two"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeTwo(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time Three</label>
                                                                        <input type="text" placeholder="Time three"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeThree(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                recommendedGuideline === "Four times a day" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time one</label>
                                                                        <input type="text" placeholder="Time one"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeOne(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time two</label>
                                                                        <input type="text" placeholder="Time two"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeTwo(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time three</label>
                                                                        <input type="text" placeholder="Time three"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeThree(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time four</label>
                                                                        <input type="text" placeholder="Time four"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setTimeFour(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            <button type="button" className="btn save__btn__guideline" onClick={submitRecommendedGuideline}>Save</button>
                                                        </div>
                                                    </Modal>
                                                    <div className="row g-2">
                                                        <div className="col-12">
                                                            <div className="w-100 pt-1">
                                                                <table className='re__table' id="recommand">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="table__head__ones fw-bold">Time schedule</td>
                                                                            <td className="table__head__two fw-bold">Time</td>
                                                                            <td className="table__head__three fw-bold">Time</td>
                                                                            <td className="table__head__four fw-bold">Time</td>
                                                                            <td className="table__head__five fw-bold">Time</td>
                                                                            <td className="table__head__six fw-bold">Action</td>
                                                                        </tr>
                                                                        {
                                                                            allRecommendedGuideline.length > 0 && allRecommendedGuideline.map((item, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td className="">{item.time__schedule}</td>
                                                                                        <td className="">{item.time__one}</td>
                                                                                        <td className="">{item.time__two}</td>
                                                                                        <td className="">{item.time__three}</td>
                                                                                        <td className="">{item.time__four}</td>
                                                                                        <td className="cell___data__color">
                                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalRecommendedGuidelineID(item.id)}></i>
                                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => deleteRecommendedGuidelineID(e, item.id)}></i>

                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>

                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Modal
                                                        isOpen={modalRecommendedGuidelineEditIsOpen}
                                                        onRequestClose={closeEditModalRecommendedGuideline}
                                                        style={customStyles1}
                                                        contentLabel="Example Modal"
                                                    >
                                                        <div className='card-body card__body__regular__medicine'>
                                                            <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalRecommendedGuideline}><i className="fal fa-times"></i></span>
                                                            <h6>Edit recommended administration times guidelines only</h6>
                                                            <div className="p-1 px-3">
                                                                <label htmlFor="inputEmail4"
                                                                    className="form-label col-form-label col-form-label-sm">Guidelines shcedule</label>
                                                                <select id="id"
                                                                    className="form-select  col-form-label-sm font-size-patient"
                                                                    name="id"
                                                                    onChange={e => settimeSchedule(e.target.value)}
                                                                    value={timeSchedule}
                                                                >
                                                                    <option selected>Select</option>
                                                                    <option value="Mornning">Mornning</option>
                                                                    <option value="Night">Night</option>
                                                                    <option value="Twice a day">Twice a day</option>
                                                                    <option value="Three times a day">Three times a day</option>
                                                                    <option value="Regular 6 hourly">Regular 6 hourly</option>
                                                                    <option value="Regular 8 hourly">Regular 8 hourly</option>
                                                                    <option value="Four times a day">Four times a day</option>
                                                                </select>
                                                            </div>
                                                            {
                                                                timeSchedule === "Mornning" &&
                                                                <div className="col-md-12 p-1 px-3">
                                                                    <label htmlFor="exampleFormControlTextarea1"
                                                                        className="form-label col-form-label col-form-label-sm">Mornning</label>
                                                                    <input type="text" placeholder="Mornning time"
                                                                        className="form-control form-control-sm"
                                                                        onChange={e => setEditTimeOne(e.target.value)}
                                                                        value={editTimeOne}
                                                                    />
                                                                </div>
                                                            }
                                                            {
                                                                timeSchedule === "Night" &&
                                                                <div className="col-md-12 p-1 px-3">
                                                                    <label htmlFor="exampleFormControlTextarea1"
                                                                        className="form-label col-form-label col-form-label-sm">Night</label>
                                                                    <input type="text" placeholder="Night time"
                                                                        className="form-control form-control-sm"
                                                                        onChange={e => setEditTimeOne(e.target.value)}
                                                                        value={editTimeOne}
                                                                    />
                                                                </div>
                                                            }
                                                            {
                                                                timeSchedule === "Twice a day" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Twice a day One</label>
                                                                        <input type="text" placeholder="Twice a day time"
                                                                            className="form-control form-control-sm"
                                                                            name='time__one'
                                                                            onChange={e => setEditTimeOne(e.target.value)}
                                                                            value={editTimeOne}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Twice a day two</label>
                                                                        <input type="text" placeholder="Twice a day time"
                                                                            className="form-control form-control-sm"
                                                                            name='time__two'
                                                                            onChange={e => setEditTimeTwo(e.target.value)}
                                                                            value={editTimeTwo}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                timeSchedule === "Three times a day" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Three times a day one</label>
                                                                        <input type="text" placeholder="Three times a day"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeOne(e.target.value)}
                                                                            value={editTimeOne}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Three times a day two</label>
                                                                        <input type="text" placeholder="Three times a day"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeTwo(e.target.value)}
                                                                            value={editTimeTwo}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Three times a day three</label>
                                                                        <input type="text" placeholder="Three times a day"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeThree(e.target.value)}
                                                                            value={editTimeThree}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                timeSchedule === "Regular 6 hourly" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time one</label>
                                                                        <input type="text" placeholder="Time one"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeOne(e.target.value)}
                                                                            value={editTimeOne}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time Two</label>
                                                                        <input type="text" placeholder="Time two"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeTwo(e.target.value)}
                                                                            value={editTimeTwo}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time three</label>
                                                                        <input type="text" placeholder="Time three"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeThree(e.target.value)}
                                                                            value={editTimeThree}

                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time four</label>
                                                                        <input type="text" placeholder="Time four"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeFour(e.target.value)}
                                                                            value={editTimeFour}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                timeSchedule === "Regular 8 hourly" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time one</label>
                                                                        <input type="text" placeholder="Time one"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeOne(e.target.value)}
                                                                            value={editTimeOne}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time two</label>
                                                                        <input type="text" placeholder="Time two"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeTwo(e.target.value)}
                                                                            value={editTimeTwo}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time three</label>
                                                                        <input type="text" placeholder="Time three"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeThree(e.target.value)}
                                                                            value={editTimeThree}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                timeSchedule === "Four times a day" &&
                                                                <div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time one</label>
                                                                        <input type="text" placeholder="Time one"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeOne(e.target.value)}
                                                                            value={editTimeOne}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time two</label>
                                                                        <input type="text" placeholder="Time two"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeTwo(e.target.value)}
                                                                            value={editTimeTwo}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time three</label>
                                                                        <input type="text" placeholder="Time three"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeThree(e.target.value)}
                                                                            value={editTimeThree}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-12 p-1 px-3">
                                                                        <label htmlFor="exampleFormControlTextarea1"
                                                                            className="form-label col-form-label col-form-label-sm">Time four</label>
                                                                        <input type="text" placeholder="Time four"
                                                                            className="form-control form-control-sm"
                                                                            onChange={e => setEditTimeFour(e.target.value)}
                                                                            value={editTimeFour}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            }


                                                            <button type="button" className="btn update__btn__guideline"
                                                                onClick={updateEditRecommendedGuideline}>Update</button>
                                                        </div>
                                                    </Modal>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="re__border">
                                                    <p className="re__text__title">Warfarin education record</p>
                                                    <p className="re__text__sub__title guideline">Guidelines only</p>
                                                    <hr className="hr__medichine" />
                                                    <div className="row ">
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <label for="InputPatient" className="col-sm-6 col-form-label label__font__size">Patient education by</label>
                                                                <div className="col-sm-6 pt-1">
                                                                    <input
                                                                        type="text"
                                                                        name="Patient"
                                                                        className="form-control form__medication__text"
                                                                        id="InputPatient"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <label for="InputSign" className="col-sm-6 col-form-label label__font__size">Sign</label>
                                                                <div className="col-sm-6 pt-1">
                                                                    <input
                                                                        type="text"
                                                                        name="Sign"
                                                                        className="form-control form__medication__text"
                                                                        id="InputSign"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <label for="InputDate" className="col-sm-6 col-form-label label__font__size">Date</label>
                                                                <div className="col-sm-6 pt-1">
                                                                    <input
                                                                        type="date"
                                                                        name="Date"
                                                                        className="form-control form__medication__text"
                                                                        id="InputDate"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <label for="InputGivenWar" className="col-sm-6 col-form-label label__font__size">Given warfarin book</label>
                                                                <div className="col-sm-6 pt-1">
                                                                    <input
                                                                        type="text"
                                                                        name="GivenWar"
                                                                        className="form-control form__medication__text"
                                                                        id="InputGivenWar"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <label for="InputSign" className="col-sm-6 col-form-label label__font__size">Sign</label>
                                                                <div className="col-sm-6 pt-1">
                                                                    <input
                                                                        type="text"
                                                                        name="Sign"
                                                                        className="form-control form__medication__text"
                                                                        id="InputSign"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <label for="InputDate" className="col-sm-6 col-form-label label__font__size">Date</label>
                                                                <div className="col-sm-6 pt-1">
                                                                    <input
                                                                        type="date"
                                                                        name="Date"
                                                                        className="form-control form__medication__text"
                                                                        id="InputDate"
                                                                    />
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
                            <div className="row pt-4">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <p className="medichine__text_p">
                                            <span className="medication__text">Regular medicine</span>
                                        </p>
                                        <hr className="hr__medichine" />
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="medichine__table__div">
                                                    <div className="medichine__table">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <label for="InputPrescribed" className="col-sm-4 col-form-label col-form-label-sm medichine__text_p">Date prescribed:</label>
                                                                    <div className="col-sm-8 pt-1">
                                                                        <input
                                                                            type="date"
                                                                            name="Date Prescribed"
                                                                            className="date__input border"
                                                                            // onChange={(e) =>  setDate(e.target.value) }
                                                                            // onChange={dateInput}
                                                                            onChange={dateInput}
                                                                            id="InputPrescribed"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-0">
                                                            <p className="variable__text_p">Variable dose medicine</p>
                                                            <ul className="list-unstyled d-flex justify-content-between">
                                                                <li className="medichine__text_p">Medicine</li>
                                                                <li><button type="button" className="btn float-end add__btn" onClick={handleAddRegularMedicine}>Add medicine</button></li>
                                                            </ul>
                                                            <Modal
                                                                isOpen={modalRegularMedicineIsOpen}
                                                                onRequestClose={closeModalRegularMedicine}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalRegularMedicine}><i className="fal fa-times"></i></span>
                                                                    <h6>Add variable dose medicine </h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputFrequency" className="form-label d-block col-4" >Frequency</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allFrequency}
                                                                                        getOptionLabel={(option) => option.frequency_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setFrequencyNames(newValue.frequency_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Frequency Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={regularMedicine.indication}
                                                                                    onChange={inputRegularMedicineChange} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={regularMedicine.pharmacy__name}
                                                                                    onChange={inputRegularMedicineChange} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={regularMedicine.prescriber__signaturer}
                                                                                    onChange={inputRegularMedicineChange} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={regularMedicine.contact__no}
                                                                                    onChange={inputRegularMedicineChange} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDragLevel" className="form-label d-block col-4" >Drag Level</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputDragLevel" aria-describedby="emailHelp"
                                                                                    name="drag__level"
                                                                                    value={regularMedicine.drag__level}
                                                                                    onChange={inputRegularMedicineChange} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTimeLevelTaken" className="form-label d-block col-4" >Time level taken</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputTimeLevelTaken" aria-describedby="emailHelp"
                                                                                    name="time__level__taken"
                                                                                    value={regularMedicine.time__level__taken}
                                                                                    onChange={inputRegularMedicineChange} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriber" className="form-label d-block col-4" >Prescriber</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriber" aria-describedby="emailHelp"
                                                                                    name="prescriber"
                                                                                    value={regularMedicine.prescriber}
                                                                                    onChange={inputRegularMedicineChange} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTimeToBeGiven" className="form-label d-block col-4" >Time to be given</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputTimeToBeGiven" aria-describedby="emailHelp"
                                                                                    name="time__to__be__given"
                                                                                    value={regularMedicine.time__to__be__given}
                                                                                    onChange={inputRegularMedicineChange} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTimeToGiven" className="form-label d-block col-4" >Time Given</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputTimeToGiven" aria-describedby="emailHelp"
                                                                                    name="time_given"
                                                                                    value={regularMedicine.time_given}
                                                                                    onChange={inputRegularMedicineChange} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right" onClick={submitRegularMedicine}>Save</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                            <div className="w-100">
                                                                <table className='medication__medicine__table' id="regular1">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="medicine__table__head cell__width__p22__1">Item No.</td>
                                                                            <td className="medicine__table__head cell__width__p22__2">Medicine</td>
                                                                            <td className="medicine__table__head cell__width__p22__3">Route</td>
                                                                            <td className="medicine__table__head cell__width__p22__4">Dose</td>
                                                                            <td className="medicine__table__head cell__width__p22__5">Frequency</td>
                                                                            <td className="medicine__table__head cell__width__p22__6">Indication</td>
                                                                            <td className="medicine__table__head cell__width__p22__7">Pharmacy</td>
                                                                            <td className="medicine__table__head cell__width__p22__8">Prescriber signature</td>
                                                                            <td className="medicine__table__head cell__width__p22__9">Contact</td>
                                                                            <td className="medicine__table__head cell__width__p22__10">Drag Level</td>
                                                                            <td className="medicine__table__head cell__width__p22__11">Time level taken</td>
                                                                            <td className="medicine__table__head cell__width__p22__12">Prescriber</td>
                                                                            <td className="medicine__table__head cell__width__p22__13">Time to be given</td>
                                                                            <td className="medicine__table__head cell__width__p22__14">Time given</td>
                                                                            <td className="medicine__table__head cell__width__p22__15" colSpan="2">Action</td>
                                                                        </tr>
                                                                        {
                                                                            allRegularMedicine.length > 0 && allRegularMedicine.map((item, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td className="cell___data__color cell__width__p22__1">{i + 1}</td>
                                                                                        <td className="cell___data__color cell__width__p22__2">{item.medicine__name}</td>
                                                                                        <td className="cell___data__color cell__width__p22__3">{item.route}</td>
                                                                                        <td className="cell___data__color cell__width__p22__4">{item.dose}</td>
                                                                                        <td className="cell___data__color cell__width__p22__5">{item.frequency}</td>
                                                                                        <td className="cell___data__color cell__width__p22__6">{item.indication}</td>
                                                                                        <td className="cell___data__color cell__width__p22__7">{item.pharmacy__name}</td>
                                                                                        <td className="cell___data__color cell__width__p22__8">{item.prescriber__signaturer}</td>
                                                                                        <td className="cell___data__color cell__width__p22__9">{item.contact__no}</td>
                                                                                        <td className="cell___data__color cell__width__p22__10">{item.drag__level}</td>
                                                                                        <td className="cell___data__color cell__width__p22__11">{item.time__level__taken}</td>
                                                                                        <td className="cell___data__color cell__width__p22__12">{item.prescriber}</td>
                                                                                        <td className="cell___data__color cell__width__p22__13">{item.time__to__be__given}</td>
                                                                                        <td className="cell___data__color cell__width__p22__14">{item.time_given}</td>
                                                                                        <td className="cell___data__color">
                                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalRegularMedicineID(item.id)}></i>
                                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => deleteRegularMedicineID(e, item.id)}></i>

                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <Modal
                                                                isOpen={modalRegularMedicineEditIsOpen}
                                                                onRequestClose={closeEditModalRegularMedicine}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalRegularMedicine}><i className="fal fa-times"></i></span>
                                                                    <h6>Edit variable dose medicine </h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ drug_name: editRegularMedicineData.medicine__name }}
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ route_name: editRegularMedicineData.route }}
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ dose_name: editRegularMedicineData.dose }}
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputFrequency" className="form-label d-block col-4" >Frequency</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ frequency_name: editRegularMedicineData.frequency }}
                                                                                        options={allFrequency}
                                                                                        getOptionLabel={(option) => option.frequency_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setFrequencyNames(newValue.frequency_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Frequency Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={editRegularMedicineData.indication}
                                                                                    onChange={handleRegularMedicineEdit} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={editRegularMedicineData.pharmacy__name}
                                                                                    onChange={handleRegularMedicineEdit} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={editRegularMedicineData.prescriber__signaturer}
                                                                                    onChange={handleRegularMedicineEdit} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={editRegularMedicineData.contact__no}
                                                                                    onChange={handleRegularMedicineEdit} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDragLevel" className="form-label d-block col-4" >Drag Level</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputDragLevel" aria-describedby="emailHelp"
                                                                                    name="drag__level"
                                                                                    value={editRegularMedicineData.drag__level}
                                                                                    onChange={handleRegularMedicineEdit} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTimeLevelTaken" className="form-label d-block col-4" >Time level taken</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputTimeLevelTaken" aria-describedby="emailHelp"
                                                                                    name="time__level__taken"
                                                                                    value={editRegularMedicineData.time__level__taken}
                                                                                    onChange={handleRegularMedicineEdit} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriber" className="form-label d-block col-4" >Prescriber</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriber" aria-describedby="emailHelp"
                                                                                    name="prescriber"
                                                                                    value={editRegularMedicineData.prescriber}
                                                                                    onChange={handleRegularMedicineEdit} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTimeToBeGiven" className="form-label d-block col-4" >Time to be given</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputTimeToBeGiven" aria-describedby="emailHelp"
                                                                                    name="time__to__be__given"
                                                                                    value={editRegularMedicineData.time__to__be__given}
                                                                                    onChange={handleRegularMedicineEdit} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTimeToGiven" className="form-label d-block col-4" >Time Given</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputTimeToGiven" aria-describedby="emailHelp"
                                                                                    name="time_given"
                                                                                    value={editRegularMedicineData.time_given}
                                                                                    onChange={handleRegularMedicineEdit} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                            onClick={updateEditRegularMedicine}>Update</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                        </div>

                                                        {/* global footer part*/}
                                                        <div className="row pt-3">
                                                            <div className="col-6">
                                                                <div className="d-flex">
                                                                    <p className="vte__risk__p">VTE risk assessed:</p>
                                                                    <div className="d-flex ms__3">
                                                                        <label className="checkbox">
                                                                            <span className="reg__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox checkPart2"
                                                                            value="Yes"
                                                                            type="checkbox"
                                                                            name="Yes"
                                                                            onChange={handleMedicineVTERiskCheckboxChange} />
                                                                    </div>
                                                                    <div className="d-flex ms__3">
                                                                        <label className="checkbox">
                                                                            <span className="reg__checkbox__span">Prophylaxis not required</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox checkPart2"
                                                                            value="Prophylaxis not required"
                                                                            type="checkbox"
                                                                            name="Prophylaxis not required"
                                                                            onChange={handleMedicineVTERiskCheckboxChange} />
                                                                    </div>
                                                                    <div className="d-flex ms__3">
                                                                        <label className="checkbox">
                                                                            <span className="reg__checkbox__span"> Contraindicated</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox checkPart2"
                                                                            value="Contraindicated"
                                                                            type="checkbox"
                                                                            name="Contraindicated"
                                                                            onChange={handleMedicineVTERiskCheckboxChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputDuration" className="col-sm-4 col-form-label label__font__size">Signature</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Duration"
                                                                                    className="form-control form__medication__text"
                                                                                    id="togBtn"
                                                                                    value={signatureName1}
                                                                                    onChange={signatureName1Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputQty" className="col-sm-5 col-form-label label__font__size">Date prescribed</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Qty"
                                                                                    className="form-control form__medication__text"
                                                                                    id="InputQty"
                                                                                    value={datePrescriber1}
                                                                                    onChange={datePrescriber1Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row ">
                                                            <div className="col-3">
                                                                <p className="discharge__p">Continue on discharge?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart2"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge"
                                                                            onChange={handleMedicineContinueOnDischargePart2Change1} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart2"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge"
                                                                            onChange={handleMedicineContinueOnDischargePart2Change2} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <p className="discharge__p">Dispense?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox ">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart21"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="Dispense"
                                                                            onChange={handleMedicineDispensePart2Change1} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox ">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart21"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="Dispense"
                                                                            onChange={handleMedicineDispensePart2Change2} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="row pt-4">
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputDuration" className="col-sm-3 col-form-label label__font__size">Duration</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Duration"
                                                                                    className="form-control form__medication__text"
                                                                                    id="togBtn"
                                                                                    value={duration1}
                                                                                    onChange={duration1Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputQty" className="col-sm-2 col-form-label ">Qty.</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Qty"
                                                                                    className="form-control form__medication__text"
                                                                                    id="InputQty"
                                                                                    value={qty1}
                                                                                    onChange={qty1Change}
                                                                                />
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
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="medichine__table__div">
                                                    <div className="medichine__table">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <label for="InputPrescribed" className="col-sm-4 col-form-label col-form-label-sm medichine__text_p">Date prescribed:</label>
                                                                    <div className="col-sm-8 pt-1">
                                                                        <input
                                                                            type="date"
                                                                            name="Date Prescribed"
                                                                            className="date__input border"
                                                                            onChange={dateInput}
                                                                            id="InputPrescribed"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <ul className="list-unstyled d-flex justify-content-between pt-2">
                                                                <li className="medichine__text_p">Medicine</li>
                                                                <li><button type="button" className="btn float-end add__btn" onClick={handleAddRegularMedicineTwo}>Add medicine</button></li>
                                                            </ul>
                                                            <Modal
                                                                isOpen={modalRegularMedicineTwoIsOpen}
                                                                onRequestClose={closeModalRegularMedicineTwo}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalRegularMedicineTwo}><i className="fal fa-times"></i></span>
                                                                    <h6>Add variable dose medicine table 2</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputFrequency" className="form-label d-block col-4" >Frequency</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allFrequency}
                                                                                        getOptionLabel={(option) => option.frequency_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setFrequencyNames(newValue.frequency_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Frequency Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={regularMedicineTwo.indication}
                                                                                    onChange={inputRegularMedicineChangeTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={regularMedicineTwo.pharmacy__name}
                                                                                    onChange={inputRegularMedicineChangeTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={regularMedicineTwo.prescriber__signaturer}
                                                                                    onChange={inputRegularMedicineChangeTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={regularMedicineTwo.contact__no}
                                                                                    onChange={inputRegularMedicineChangeTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMechanicalProphylaxis" className="form-label d-block col-4" >Mechanical prophylaxis</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputMechanicalProphylaxis" aria-describedby="emailHelp"
                                                                                    name="mechanical__prophylaxis"
                                                                                    value={regularMedicineTwo.mechanical__prophylaxis}
                                                                                    onChange={inputRegularMedicineChangeTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberNISignaturer" className="form-label d-block col-4" >Prescriber /NI signaturer</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberNISignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__ni__signaturer"
                                                                                    value={regularMedicineTwo.prescriber__ni__signaturer}
                                                                                    onChange={inputRegularMedicineChangeTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContactTwo" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContactTwo" aria-describedby="emailHelp"
                                                                                    name="contact__no_two"
                                                                                    value={regularMedicineTwo.contact__no_two}
                                                                                    onChange={inputRegularMedicineChangeTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputAMCheck" className="form-label d-block col-4" >AM Check</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputAMCheck" aria-describedby="emailHelp"
                                                                                    name="am__check"
                                                                                    value={regularMedicineTwo.am__check}
                                                                                    onChange={inputRegularMedicineChangeTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPMCheck" className="form-label d-block col-4" >PM Check</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPMCheck" aria-describedby="emailHelp"
                                                                                    name="pm__check"
                                                                                    value={regularMedicineTwo.pm__check}
                                                                                    onChange={inputRegularMedicineChangeTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right" onClick={submitRegularMedicineTwo}>Save</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                            <div className="w-100">
                                                                <table className='medication__medicine__table' id="regular2">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="medicine__table__head cell__width__p2__1">Item No.</td>
                                                                            <td className="medicine__table__head cell__width__p2__2">Medicine</td>
                                                                            <td className="medicine__table__head cell__width__p2__3">Route</td>
                                                                            <td className="medicine__table__head cell__width__p2__4">Dose</td>
                                                                            <td className="medicine__table__head cell__width__p2__5">Frequency</td>
                                                                            <td className="medicine__table__head cell__width__p2__6">Indication</td>
                                                                            <td className="medicine__table__head cell__width__p2__7">Pharmacy</td>
                                                                            <td className="medicine__table__head cell__width__p2__8">Prescriber signature</td>
                                                                            <td className="medicine__table__head cell__width__p2__9">Contact</td>
                                                                            <td className="medicine__table__head cell__width__p2__10">Mechanical prophylaxis</td>
                                                                            <td className="medicine__table__head cell__width__p2__11">Prescriber /NI Signaturer</td>
                                                                            <td className="medicine__table__head cell__width__p2__12">Contact</td>
                                                                            <td className="medicine__table__head cell__width__p2__13">AM<br />check</td>
                                                                            <td className="medicine__table__head cell__width__p2__14">PM<br />check</td>
                                                                            <td className="medicine__table__head cell__width__p2__15" colSpan="2">Action</td>
                                                                        </tr>
                                                                        {
                                                                            allRegularMedicineTwo.length > 0 && allRegularMedicineTwo.map((item, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td className="cell___data__color cell__width__p2__1">{i + 1}</td>
                                                                                        <td className="cell___data__color cell__width__p2__2">{item.medicine__name}</td>
                                                                                        <td className="cell___data__color cell__width__p2__3">{item.route}</td>
                                                                                        <td className="cell___data__color cell__width__p2__4">{item.dose}</td>
                                                                                        <td className="cell___data__color cell__width__p2__5">{item.frequency}</td>
                                                                                        <td className="cell___data__color cell__width__p2__6">{item.indication}</td>
                                                                                        <td className="cell___data__color cell__width__p2__7">{item.pharmacy__name}</td>
                                                                                        <td className="cell___data__color cell__width__p2__8">{item.prescriber__signaturer}</td>
                                                                                        <td className="cell___data__color cell__width__p2__9">{item.contact__no}</td>
                                                                                        <td className="cell___data__color cell__width__p2__10">{item.mechanical__prophylaxis}</td>
                                                                                        <td className="cell___data__color cell__width__p2__11">{item.prescriber__ni__signaturer}</td>
                                                                                        <td className="cell___data__color cell__width__p2__12">{item.contact__no__two}</td>
                                                                                        <td className="cell___data__color cell__width__p2__13">{item.am__check}</td>
                                                                                        <td className="cell___data__color cell__width__p2__14">{item.pm__check}</td>
                                                                                        <td className="cell___data__color">
                                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalRegularMedicineIDTwo(item.id)}></i>
                                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => { deleteRegularMedicineIDTwo(e, item.id) }}></i>

                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <Modal
                                                                isOpen={modalRegularMedicineEditIsOpenTwo}
                                                                onRequestClose={closeEditModalRegularMedicineTwo}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalRegularMedicineTwo}><i className="fal fa-times"></i></span>
                                                                    <h6>Edit variable dose medicine table 2</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ drug_name: editRegularMedicineDataTwo.medicine__name }}
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ route_name: editRegularMedicineDataTwo.route }}
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ dose_name: editRegularMedicineDataTwo.dose }}
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputFrequency" className="form-label d-block col-4" >Frequency</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ frequency_name: editRegularMedicineDataTwo.frequency }}
                                                                                        options={allFrequency}
                                                                                        getOptionLabel={(option) => option.frequency_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setFrequencyNames(newValue.frequency_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Frequency Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={editRegularMedicineDataTwo.indication}
                                                                                    onChange={handleRegularMedicineEditTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={editRegularMedicineDataTwo.pharmacy__name}
                                                                                    onChange={handleRegularMedicineEditTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={editRegularMedicineDataTwo.prescriber__signaturer}
                                                                                    onChange={handleRegularMedicineEditTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={editRegularMedicineDataTwo.contact__no}
                                                                                    onChange={handleRegularMedicineEditTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMechanicalProphylaxis" className="form-label d-block col-4" >Mechanical prophylaxis</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputMechanicalProphylaxis" aria-describedby="emailHelp"
                                                                                    name="mechanical__prophylaxis"
                                                                                    value={editRegularMedicineDataTwo.mechanical__prophylaxis}
                                                                                    onChange={handleRegularMedicineEditTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberNISignaturer" className="form-label d-block col-4" >Prescriber /NI signaturer</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberNISignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__ni__signaturer"
                                                                                    value={editRegularMedicineDataTwo.prescriber__ni__signaturer}
                                                                                    onChange={handleRegularMedicineEditTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContactTwo" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContactTwo" aria-describedby="emailHelp"
                                                                                    name="contact__no__two"
                                                                                    value={editRegularMedicineDataTwo.contact__no__two}
                                                                                    onChange={handleRegularMedicineEditTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputAMCheck" className="form-label d-block col-4" >AM Check</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputAMCheck" aria-describedby="emailHelp"
                                                                                    name="am__check"
                                                                                    value={editRegularMedicineDataTwo.am__check}
                                                                                    onChange={handleRegularMedicineEditTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPMCheck" className="form-label d-block col-4" >PM Check</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPMCheck" aria-describedby="emailHelp"
                                                                                    name="pm__check"
                                                                                    value={editRegularMedicineDataTwo.pm__check}
                                                                                    onChange={handleRegularMedicineEditTwo} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                            onClick={updateEditRegularMedicineTwo}>Update</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                        </div>

                                                        {/* global footer part*/}
                                                        <div className="row pt-3">
                                                            <div className="col-6">
                                                                <div className="d-flex">
                                                                    <p className="vte__risk__p">VTE risk assessed:</p>
                                                                    <div className="d-flex ms__3">
                                                                        <label className="checkbox">
                                                                            <span className="reg__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox checkPart22"
                                                                            value="Yes"
                                                                            type="checkbox"
                                                                            name="Yes"
                                                                            onChange={handleMedicineVTERiskCheckboxChange2} />
                                                                    </div>
                                                                    <div className="d-flex ms__3">
                                                                        <label className="checkbox">
                                                                            <span className="reg__checkbox__span">Prophylaxis not required</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox checkPart22"
                                                                            value="Prophylaxis not required"
                                                                            type="checkbox"
                                                                            name="Prophylaxis not required"
                                                                            onChange={handleMedicineVTERiskCheckboxChange2} />
                                                                    </div>
                                                                    <div className="d-flex ms__3">
                                                                        <label className="checkbox">
                                                                            <span className="reg__checkbox__span"> Contraindicated</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox checkPart22"
                                                                            value="Contraindicated"
                                                                            type="checkbox"
                                                                            name="Contraindicated"
                                                                            onChange={handleMedicineVTERiskCheckboxChange2} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputDuration" className="col-sm-4 col-form-label label__font__size">Signature</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Duration"
                                                                                    className="form-control form__medication__text"
                                                                                    id="togBtn"
                                                                                    value={signatureName2}
                                                                                    onChange={signatureName2Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputQty" className="col-sm-5 col-form-label label__font__size">Date Prescribed</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Qty"
                                                                                    className="form-control form__medication__text checkPart22"
                                                                                    id="InputQty"
                                                                                    value={datePrescriber2}
                                                                                    onChange={datePrescriber2Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row ">
                                                            <div className="col-3">
                                                                <p className="discharge__p">Continue on discharge?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart22"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge2"
                                                                            onChange={handleMedicineContinueOnDischargePart2Change12} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart22"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge2"
                                                                            onChange={handleMedicineContinueOnDischargePart2Change22} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <p className="discharge__p">Dispense?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart212"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="Dispense2"
                                                                            onChange={handleMedicineDispensePart2Change12} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart212"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="Dispense2"
                                                                            onChange={handleMedicineDispensePart2Change22} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="row pt-4">
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputDuration" className="col-sm-3 col-form-label label__font__size">Duration</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Duration"
                                                                                    className="form-control form__medication__text"
                                                                                    id="togBtn"
                                                                                    value={duration2}
                                                                                    onChange={duration2Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputQty" className="col-sm-2 col-form-label ">Qty.</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Qty"
                                                                                    className="form-control form__medication__text"
                                                                                    id="InputQty"
                                                                                    value={qty2}
                                                                                    onChange={qty2Change}
                                                                                />
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
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="medichine__table__div">
                                                    <div className="medichine__table">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <label for="InputPrescribed" className="col-sm-4 col-form-label col-form-label-sm medichine__text_p">Date Prescribed:</label>
                                                                    <div className="col-sm-8 pt-1">
                                                                        <input
                                                                            type="date"
                                                                            name="Date Prescribed"
                                                                            className="date__input border"
                                                                            onChange={dateInput}
                                                                            id="InputPrescribed"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <ul className="list-unstyled d-flex justify-content-between pt-2">
                                                                <li className="medichine__text_p">Medicine</li>
                                                                <li><button type="button" className="btn float-end add__btn" onClick={handleAddRegularMedicineThree}>Add medicine</button></li>
                                                            </ul>
                                                            <Modal
                                                                isOpen={modalRegularMedicineThreeIsOpen}
                                                                onRequestClose={closeModalRegularMedicineThree}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalRegularMedicineThree}><i className="fal fa-times"></i></span>
                                                                    <h6>Add variable dose medicine table 3</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                   
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberToEnter" className="form-label d-block col-4" >Prescriber to enter individual doses</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberToEnter" aria-describedby="emailHelp"
                                                                                    name="Prescriber__to__enter"
                                                                                    value={regularMedicineThree.Prescriber__to__enter}
                                                                                    onChange={inputRegularMedicineChangeThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={regularMedicineThree.indication}
                                                                                    onChange={inputRegularMedicineChangeThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={regularMedicineThree.pharmacy__name}
                                                                                    onChange={inputRegularMedicineChangeThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={regularMedicineThree.prescriber__signaturer}
                                                                                    onChange={inputRegularMedicineChangeThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTargetINRRange" className="form-label d-block col-4" >Target INR Range</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputTargetINRRange" aria-describedby="emailHelp"
                                                                                    name="target__inr__range"
                                                                                    value={regularMedicineThree.target__inr__range}
                                                                                    onChange={inputRegularMedicineChangeThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputINRResult" className="form-label d-block col-4" >INR Result</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputINRResult" aria-describedby="emailHelp"
                                                                                    name="inr__result"
                                                                                    value={regularMedicineThree.inr__result}
                                                                                    onChange={inputRegularMedicineChangeThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberNI" className="form-label d-block col-4" >Prescriber</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberNI" aria-describedby="emailHelp"
                                                                                    name="prescriber"
                                                                                    value={regularMedicineThree.prescriber}
                                                                                    onChange={inputRegularMedicineChangeThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputSixteenInitialOne" className="form-label d-block col-4" >1600 Initial 1</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputSixteenInitialOne" aria-describedby="emailHelp"
                                                                                    name="sixteen__initial__1"
                                                                                    value={regularMedicineThree.sixteen__initial__1}
                                                                                    onChange={inputRegularMedicineChangeThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputInitialOne" className="form-label d-block col-4" >Initial 1</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputInitialOne" aria-describedby="emailHelp"
                                                                                    name="initial__1"
                                                                                    value={regularMedicineThree.initial__1}
                                                                                    onChange={inputRegularMedicineChangeThree} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right" onClick={submitRegularMedicineThree}>Save</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                            <div className="w-100">
                                                                <table className='medication__medicine__table' id="regular3">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="medicine__table__head cell__width__p23__1">Item No.</td>
                                                                            <td className="medicine__table__head cell__width__p23__2">Medicine</td>
                                                                            <td className="medicine__table__head cell__width__p23__3">Route</td>
                                                                            <td className="medicine__table__head cell__width__p23__4">Dose</td>
                                                                            <td className="medicine__table__head cell__width__p23__5">Prescriber to enter individual doses</td>
                                                                            <td className="medicine__table__head cell__width__p23__6">Indication</td>
                                                                            <td className="medicine__table__head cell__width__p23__7">Pharmacy</td>
                                                                            <td className="medicine__table__head cell__width__p23__8">Prescriber signature</td>
                                                                            <td className="medicine__table__head cell__width__p23__9">Target INR Range</td>
                                                                            <td className="medicine__table__head cell__width__p23__10">INR Result</td>
                                                                            <td className="medicine__table__head cell__width__p23__11">Prescriber</td>
                                                                            <td className="medicine__table__head cell__width__p23__12">1600 <br />Initial 1</td>
                                                                            <td className="medicine__table__head cell__width__p23__13">Initial 1</td>
                                                                            <td className="medicine__table__head cell__width__p23__14" colSpan="2">Action</td>
                                                                        </tr>
                                                                        {
                                                                            allRegularMedicineThree.length > 0 && allRegularMedicineThree.map((item, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td className="cell___data__color cell__width__p23__1">{i + 1}</td>
                                                                                        <td className="cell___data__color cell__width__p23__2">{item.medicine__name}</td>
                                                                                        <td className="cell___data__color cell__width__p23__3">{item.route}</td>
                                                                                        <td className="cell___data__color cell__width__p23__4">{item.dose}</td>
                                                                                        <td className="cell___data__color cell__width__p23__5">{item.Prescriber__to__enter}</td>
                                                                                        <td className="cell___data__color cell__width__p23__6">{item.indication}</td>
                                                                                        <td className="cell___data__color cell__width__p23__7">{item.pharmacy__name}</td>
                                                                                        <td className="cell___data__color cell__width__p23__8">{item.prescriber__signaturer}</td>
                                                                                        <td className="cell___data__color cell__width__p23__9">{item.target__inr__range}</td>
                                                                                        <td className="cell___data__color cell__width__p23__10">{item.inr__result}</td>
                                                                                        <td className="cell___data__color cell__width__p23__11">{item.prescriber}</td>
                                                                                        <td className="cell___data__color cell__width__p23__12">{item.sixteen__initial__1}</td>
                                                                                        <td className="cell___data__color cell__width__p23__13">{item.initial__1}</td>
                                                                                        <td className="cell___data__color">
                                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalRegularMedicineIDThree(item.id)}></i>
                                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => deleteRegularMedicineIDThree(e, item.id)}></i>
                                                                                        </td>

                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <Modal
                                                                isOpen={modalRegularMedicineEditIsOpenThree}
                                                                onRequestClose={closeEditModalRegularMedicineThree}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalRegularMedicineThree}><i className="fal fa-times"></i></span>
                                                                    <h6>Edit variable dose medicine table 3</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ drug_name: editRegularMedicineDataThree.medicine__name }}
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ route_name: editRegularMedicineDataThree.route }}
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ dose_name: editRegularMedicineDataThree.dose }}
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberToEnter" className="form-label d-block col-4" >Prescriber to enter individual doses</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberToEnter" aria-describedby="emailHelp"
                                                                                    name="Prescriber__to__enter"
                                                                                    value={editRegularMedicineDataThree.Prescriber__to__enter}
                                                                                    onChange={handleRegularMedicineEditThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={editRegularMedicineDataThree.indication}
                                                                                    onChange={handleRegularMedicineEditThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={editRegularMedicineDataThree.pharmacy__name}
                                                                                    onChange={handleRegularMedicineEditThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={editRegularMedicineDataThree.prescriber__signaturer}
                                                                                    onChange={handleRegularMedicineEditThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTargetINRRange" className="form-label d-block col-4" >Target INR range</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputTargetINRRange" aria-describedby="emailHelp"
                                                                                    name="target__inr__range"
                                                                                    value={editRegularMedicineDataThree.target__inr__range}
                                                                                    onChange={handleRegularMedicineEditThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputINRResult" className="form-label d-block col-4" >INR result</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputINRResult" aria-describedby="emailHelp"
                                                                                    name="inr__result"
                                                                                    value={editRegularMedicineDataThree.inr__result}
                                                                                    onChange={handleRegularMedicineEditThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberNI" className="form-label d-block col-4" >Prescriber</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberNI" aria-describedby="emailHelp"
                                                                                    name="prescriber"
                                                                                    value={editRegularMedicineDataThree.prescriber}
                                                                                    onChange={handleRegularMedicineEditThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputSixteenInitialOne" className="form-label d-block col-4" >1600 initial 1</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputSixteenInitialOne" aria-describedby="emailHelp"
                                                                                    name="sixteen__initial__1"
                                                                                    value={editRegularMedicineDataThree.sixteen__initial__1}
                                                                                    onChange={handleRegularMedicineEditThree} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputInitialOne" className="form-label d-block col-4" >Initial 1</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputInitialOne" aria-describedby="emailHelp"
                                                                                    name="initial__1"
                                                                                    value={editRegularMedicineDataThree.initial__1}
                                                                                    onChange={handleRegularMedicineEditThree} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                            onClick={updateEditRegularMedicineThree}>Update</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                        </div>

                                                        {/* global footer part*/}
                                                        <div className="row pt-3">
                                                            <div className="col-3">
                                                                <p className="discharge__p">Continue on discharge?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart223"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge3"
                                                                            onChange={handleMedicineContinueOnDischargePart2Change123} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart223"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge3"
                                                                            onChange={handleMedicineContinueOnDischargePart2Change223} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <p className="discharge__p">Dispense ?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart2123"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="Dispense3"
                                                                            onChange={handleMedicineDispensePart2Change123} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart2123"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="Dispense3"
                                                                            onChange={handleMedicineDispensePart2Change223} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="row pt-4">
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputDuration" className="col-sm-3 col-form-label label__font__size">Duration</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Duration"
                                                                                    className="form-control form__medication__text"
                                                                                    id="togBtn"
                                                                                    value={duration3}
                                                                                    onChange={duration3Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputQty" className="col-sm-2 col-form-label label__font__size">Qty.</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Qty"
                                                                                    className="form-control form__medication__text"
                                                                                    id="InputQty"
                                                                                    value={qty3}
                                                                                    onChange={qty3Change}
                                                                                />
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
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <p className="medichine__text_p">
                                            <span className="medication__text">Regular medicine</span>
                                        </p>
                                        <hr className="hr__medichine" />
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="medichine__table__div">
                                                    <div className="medichine__table">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <label for="InputPrescribed" className="col-sm-4 col-form-label col-form-label-sm medichine__text_p">Date prescribed:</label>
                                                                    <div className="col-sm-8 pt-1">
                                                                        <input
                                                                            type="date"
                                                                            name="Date Prescribed"
                                                                            className="date__input border"
                                                                            onChange={dateInput}
                                                                            id="InputPrescribed"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <ul className="list-unstyled d-flex justify-content-between pt-2">
                                                                <li className="medichine__text_p">Medicine</li>
                                                                <li><button type="button" className="btn float-end add__btn" onClick={handleAddRegularMedicineFour}>Add medicine</button></li>
                                                            </ul>
                                                            <Modal
                                                                isOpen={modalRegularMedicineFourIsOpen}
                                                                onRequestClose={closeModalRegularMedicineFour}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalRegularMedicineFour}><i className="fal fa-times"></i></span>
                                                                    <h6>Add variable dose medicine table 4</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    id="combo-box-demo"
                                                                                    options={allMedicine}
                                                                                    getOptionLabel={(option) => option.drug_name}
                                                                                    onChange={(e, newValue) => {
                                                                                        if (newValue !== null) {
                                                                                            setMedicineName(newValue.drug_name)
                                                                                        }
                                                                                    }}
                                                                                    size="small"
                                                                                    renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    id="combo-box-demo"
                                                                                    options={allRoute}
                                                                                    getOptionLabel={(option) => option.route_name}
                                                                                    onChange={(e, newValue) => {
                                                                                        if (newValue !== null) {
                                                                                            setRouteNames(newValue.route_name)
                                                                                        }
                                                                                    }}
                                                                                    size="small"
                                                                                    renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    id="combo-box-demo"
                                                                                    options={allDose}
                                                                                    getOptionLabel={(option) => option.dose_name}
                                                                                    onChange={(e, newValue) => {
                                                                                        if (newValue !== null) {
                                                                                            setDoseNames(newValue.dose_name)
                                                                                        }
                                                                                    }}
                                                                                    size="small"
                                                                                    renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                />
                                                                               
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputFrequencyAndNowEnter" className="form-label d-block col-4" >Frequency and now enter times</label>
                                                                            <div className="col-5">
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    id="combo-box-demo"
                                                                                    options={allFrequency}
                                                                                    getOptionLabel={(option) => option.frequency_name}
                                                                                    onChange={(e, newValue) => {
                                                                                        if (newValue !== null) {
                                                                                            setFrequencyNames(newValue.frequency_name)
                                                                                        }
                                                                                    }}
                                                                                    size="small"
                                                                                    renderInput={(params) => <TextField {...params} label="Frequency and NOW enter times" />}
                                                                                />
                                                                                
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <input type="time" className="form-control form__hourly__frequency__time" id="InputTime" aria-describedby="emailHelp"
                                                                                    name="frequency__and__now__enter__time"
                                                                                    value={regularMedicineFour.frequency__and__now__enter__time}
                                                                                    onChange={inputRegularMedicineChangeFour} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={regularMedicineFour.indication}
                                                                                    onChange={inputRegularMedicineChangeFour} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={regularMedicineFour.pharmacy__name}
                                                                                    onChange={inputRegularMedicineChangeFour} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={regularMedicineFour.prescriber__signaturer}
                                                                                    onChange={inputRegularMedicineChangeFour} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={regularMedicineFour.contact__no}
                                                                                    onChange={inputRegularMedicineChangeFour} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                            onClick={submitRegularMedicineFour}>Save</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                            <div className="w-100">
                                                                <table className='medication__medicine__table' id="regular4">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="medicine__table__head cell__width__p3__1">Item No.</td>
                                                                            <td className="medicine__table__head cell__width__p3__2">Medicine</td>
                                                                            <td className="medicine__table__head cell__width__p3__3">Route</td>
                                                                            <td className="medicine__table__head cell__width__p3__4">Dose</td>
                                                                            <td className="medicine__table__head cell__width__p3__5">Frequency and NOW enter times</td>
                                                                            <td className="medicine__table__head cell__width__p3__6">Indication</td>
                                                                            <td className="medicine__table__head cell__width__p3__7">Pharmacy</td>
                                                                            <td className="medicine__table__head cell__width__p3__8">Prescriber signature</td>
                                                                            <td className="medicine__table__head cell__width__p3__9">Contact</td>
                                                                            <td className="medicine__table__head cell__width__p3__10" colSpan="2">Action</td>
                                                                        </tr>
                                                                        {
                                                                            allRegularMedicineFour.length > 0 && allRegularMedicineFour.map((item, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td className="cell___data__color cell__width__p3__1">{i + 1}</td>
                                                                                        <td className="cell___data__color cell__width__p3__2">{item.medicine__name}</td>
                                                                                        <td className="cell___data__color cell__width__p3__3">{item.route}</td>
                                                                                        <td className="cell___data__color cell__width__p3__4">{item.dose}</td>
                                                                                        <td className="cell___data__color cell__width__p3__5">{item.frequency__and__now__enter} {item.frequency__and__now__enter__time}</td>
                                                                                        <td className="cell___data__color cell__width__p3__6">{item.indication}</td>
                                                                                        <td className="cell___data__color cell__width__p3__7">{item.pharmacy__name}</td>
                                                                                        <td className="cell___data__color cell__width__p3__8">{item.prescriber__signaturer}</td>
                                                                                        <td className="cell___data__color cell__width__p3__9">{item.contact__no}</td>
                                                                                        <td className="cell___data__color">
                                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalRegularMedicineIDFour(item.id)}></i>
                                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => deleteRegularMedicineIDFour(e, item.id)}></i>

                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <Modal
                                                                isOpen={modalRegularMedicineEditIsOpenFour}
                                                                onRequestClose={closeEditModalRegularMedicineFour}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalRegularMedicineFour}><i className="fal fa-times"></i></span>
                                                                    <h6>Edit Variable dose medicine table 4</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    id="combo-box-demo"
                                                                                    defaultValue={{ drug_name: editRegularMedicineDataFour.medicine__name }}
                                                                                    options={allMedicine}
                                                                                    getOptionLabel={(option) => option.drug_name}
                                                                                    onChange={(e, newValue) => {
                                                                                        if (newValue !== null) {
                                                                                            setMedicineName(newValue.drug_name)
                                                                                        }
                                                                                    }}
                                                                                    size="small"
                                                                                    renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    id="combo-box-demo"
                                                                                    defaultValue={{ route_name: editRegularMedicineDataFour.route }}
                                                                                    options={allRoute}
                                                                                    getOptionLabel={(option) => option.route_name}
                                                                                    onChange={(e, newValue) => {
                                                                                        if (newValue !== null) {
                                                                                            setRouteNames(newValue.route_name)
                                                                                        }
                                                                                    }}
                                                                                    size="small"
                                                                                    renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    id="combo-box-demo"
                                                                                    defaultValue={{ dose_name: editRegularMedicineDataFour.dose }}
                                                                                    options={allDose}
                                                                                    getOptionLabel={(option) => option.dose_name}
                                                                                    onChange={(e, newValue) => {
                                                                                        if (newValue !== null) {
                                                                                            setDoseNames(newValue.dose_name)
                                                                                        }
                                                                                    }}
                                                                                    size="small"
                                                                                    renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputFrequencyAndNowEnter" className="form-label d-block col-4" >Frequency and NOW enter times</label>
                                                                            <div className="col-5">
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    id="combo-box-demo"
                                                                                    defaultValue={{ frequency_name: editRegularMedicineDataFour.frequency__and__now__enter }}
                                                                                    options={allFrequency}
                                                                                    getOptionLabel={(option) => option.frequency_name}
                                                                                    onChange={(e, newValue) => {
                                                                                        if (newValue !== null) {
                                                                                            setFrequencyNames(newValue.frequency_name)
                                                                                        }
                                                                                    }}
                                                                                    size="small"
                                                                                    renderInput={(params) => <TextField {...params} label="Frequency and NOW enter times" />}
                                                                                />
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <input type="time" className="form-control form__hourly__frequency__time" id="InputTime" aria-describedby="emailHelp"
                                                                                    name="frequency__and__now__enter__time"
                                                                                    value={regularMedicineFour.frequency__and__now__enter__time}
                                                                                    onChange={inputRegularMedicineChangeFour} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={editRegularMedicineDataFour.indication}
                                                                                    onChange={handleRegularMedicineEditFour} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={editRegularMedicineDataFour.pharmacy__name}
                                                                                    onChange={handleRegularMedicineEditFour} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={editRegularMedicineDataFour.prescriber__signaturer}
                                                                                    onChange={handleRegularMedicineEditFour} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={editRegularMedicineDataFour.contact__no}
                                                                                    onChange={handleRegularMedicineEditFour} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                            onClick={updateEditRegularMedicineFour}>Update</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                        </div>

                                                        {/* global footer part*/}
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="d-flex pt-3">
                                                                    <input className="tick__checkbox checkPart4"
                                                                        value="Tick"
                                                                        type="checkbox"
                                                                        name="Tick"
                                                                        onChange={(e) => setMedicineTickIfSlowCheckvaluePart2(false)} />

                                                                    <label className="checkbox">
                                                                        <span className="tick__checkbox__text">Tick if slow release</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row ">
                                                            <div className="col-3">
                                                                <p className="discharge__p">Continue on discharge?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox  radioPart2234"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge4"
                                                                            onChange={handleMedicineContinueOnDischargePart2Change1234} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart2234"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge4"
                                                                            onChange={handleMedicineContinueOnDischargePart2Change2234} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <p className="discharge__p">Dispense?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart21234"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="Dispense4"
                                                                            onChange={handleMedicineDispensePart2Change1234} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart21234"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="Dispense4"
                                                                            onChange={handleMedicineDispensePart2Change2234} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="row pt-4">
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputDuration" className="col-sm-3 col-form-label label__font__size">Duration</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Duration"
                                                                                    className="form-control form__medication__text"
                                                                                    id="togBtn"
                                                                                    value={duration4}
                                                                                    onChange={duration4Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputQty" className="col-sm-2 col-form-label label__font__size">Qty.</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    name="Qty"
                                                                                    className="form-control form__medication__text"
                                                                                    id="InputQty"
                                                                                    value={qty4}
                                                                                    onChange={qty4Change}
                                                                                />
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
                                    </div>
                                </div>
                            </div>

                            <div className="float-right pt-4">
                                <button className="btn__back mx-2" onClick={backPageForStep1}>
                                    <i className="fas fa-angle-left me-2"></i> <b>Back</b>
                                </button>
                                <button className="btn__next mx-2" onClick={nextPageForStep3}>
                                    <b>Next</b> <i className="fas fa-angle-right ms-2"></i>
                                </button>
                                <button className="btn__save mx-2" onClick={saveMedicationChartPartTwoData}>
                                    <b>Save</b>
                                </button>
                                <button className="btn__cancel" onClick={props.closeModal}>
                                    <b>Cancel</b>
                                </button>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="medication-chart-part-3" role="tabpanel" aria-labelledby="medication-chart-part-3-tab">
                            <div className="row">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <p className="medichine__text_p">
                                            <span className="medication__text">Regular Medicine</span>
                                        </p>
                                        <hr className="hr__medichine" />
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="medichine__table__div">
                                                    <div className="medichine__table">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <label for="InputPrescribed" className="col-sm-4 col-form-label col-form-label-sm medichine__text_p">Date Prescribed:</label>
                                                                    <div className="col-sm-8 pt-1">
                                                                        <input
                                                                            type="date"
                                                                            name="Date Prescribed"
                                                                            className="date__input border"
                                                                            onChange={dateInput}
                                                                            id="InputPrescribed"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <p className="administraion__text_p">PRESCRIBER MUST ENTER administration times</p>
                                                            <ul className="list-unstyled d-flex justify-content-between pt-2">
                                                                <li className="medichine__text_p">Medicine</li>
                                                                <li><button type="button" className="btn float-end add__btn" onClick={handleAddRegularMedicineSeven}>Add medicine</button></li>
                                                            </ul>
                                                            <Modal
                                                                isOpen={modalRegularMedicineSevenIsOpen}
                                                                onRequestClose={closeModalRegularMedicineSeven}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalRegularMedicineSeven}><i className="fal fa-times"></i></span>
                                                                    <h6>Add PRESCRIBER MUST ENTER administration times table 7</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputFrequencyAndNowEnter" className="form-label d-block col-4" >Frequency and now enter times</label>
                                                                            <div className="col-5">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allFrequency}
                                                                                        getOptionLabel={(option) => option.frequency_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setFrequencyNames(newValue.frequency_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Frequency and NOW enter times" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <input type="time" className="form-control form__hourly__frequency__time" id="InputTime" aria-describedby="emailHelp"
                                                                                    name="frequency__and__now__enter__time"
                                                                                    value={regularMedicineSeven.frequency__and__now__enter__time}
                                                                                    onChange={inputRegularMedicineChangeSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={regularMedicineSeven.indication}
                                                                                    onChange={inputRegularMedicineChangeSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={regularMedicineSeven.pharmacy__name}
                                                                                    onChange={inputRegularMedicineChangeSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={regularMedicineSeven.prescriber__signaturer}
                                                                                    onChange={inputRegularMedicineChangeSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={regularMedicineSeven.contact__no}
                                                                                    onChange={inputRegularMedicineChangeSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right" onClick={submitRegularMedicineSeven}>Save</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                            <div className="w-100">
                                                                <table className='medication__medicine__table' id="part3hide">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="medicine__table__head cell__width__p3__1">Item No.</td>
                                                                            <td className="medicine__table__head cell__width__p3__2">Medicine</td>
                                                                            <td className="medicine__table__head cell__width__p3__3">Route</td>
                                                                            <td className="medicine__table__head cell__width__p3__4">Dose</td>
                                                                            <td className="medicine__table__head cell__width__p3__5">Frequency and now enter times</td>
                                                                            <td className="medicine__table__head cell__width__p3__6">Indication</td>
                                                                            <td className="medicine__table__head cell__width__p3__7">Pharmacy</td>
                                                                            <td className="medicine__table__head cell__width__p3__8">Prescriber signature</td>
                                                                            <td className="medicine__table__head cell__width__p3__9">Contact</td>
                                                                            <td className="medicine__table__head cell__width__p3__10" colSpan="2">Action</td>
                                                                        </tr>
                                                                        {
                                                                            allRegularMedicineSeven.length > 0 && allRegularMedicineSeven.map((item, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td className="cell___data__color cell__width__p3__1">{i + 1}</td>
                                                                                        <td className="cell___data__color cell__width__p3__2">{item.medicine__name}</td>
                                                                                        <td className="cell___data__color cell__width__p3__3">{item.route}</td>
                                                                                        <td className="cell___data__color cell__width__p3__4">{item.dose}</td>
                                                                                        <td className="cell___data__color cell__width__p3__5">{item.frequency__and__now__enter} {item.frequency__and__now__enter__time}</td>
                                                                                        <td className="cell___data__color cell__width__p3__6">{item.indication}</td>
                                                                                        <td className="cell___data__color cell__width__p3__7">{item.pharmacy__name}</td>
                                                                                        <td className="cell___data__color cell__width__p3__8">{item.prescriber__signaturer}</td>
                                                                                        <td className="cell___data__color cell__width__p3__9">{item.contact__no}</td>
                                                                                        <td className="cell___data__color">
                                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalRegularMedicineIDSeven(item.id)}></i>
                                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => deleteRegularMedicineIDSeven(e, item.id)}></i>

                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <Modal
                                                                isOpen={modalRegularMedicineEditIsOpenSeven}
                                                                onRequestClose={closeEditModalRegularMedicineSeven}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalRegularMedicineSeven}><i className="fal fa-times"></i></span>
                                                                    <h6>Edit variable dose medicine table 4</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ drug_name: editRegularMedicineDataSeven.medicine__name }}
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ route_name: editRegularMedicineDataSeven.route }}
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ dose_name: editRegularMedicineDataSeven.dose }}
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputFrequencyAndNowEnter" className="form-label d-block col-4" >Frequency and NOW enter times</label>
                                                                            <div className="col-5">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ frequency_name: editRegularMedicineDataSeven.frequency }}
                                                                                        options={allFrequency}
                                                                                        getOptionLabel={(option) => option.frequency_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setFrequencyNames(newValue.frequency_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Frequency and NOW enter times" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <input type="time" className="form-control form__hourly__frequency__time" id="InputTime" aria-describedby="emailHelp"
                                                                                    name="frequency__and__now__enter__time"
                                                                                    value={editRegularMedicineDataSeven.frequency__and__now__enter__time}
                                                                                    onChange={inputRegularMedicineChangeSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={editRegularMedicineDataSeven.indication}
                                                                                    onChange={handleRegularMedicineEditSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={editRegularMedicineDataSeven.pharmacy__name}
                                                                                    onChange={handleRegularMedicineEditSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={editRegularMedicineDataSeven.prescriber__signaturer}
                                                                                    onChange={handleRegularMedicineEditSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={editRegularMedicineDataSeven.contact__no}
                                                                                    onChange={handleRegularMedicineEditSeven} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                            onClick={updateEditRegularMedicineSeven}>Update</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                        </div>

                                                        {/* global footer part*/}
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="d-flex pt-3">
                                                                    <input className="tick__checkbox checkPart3"
                                                                        value="Tick"
                                                                        type="checkbox"
                                                                        name="Tick"
                                                                        onChange={(e) => setMedicineTickIfSlowCheckvaluePart3(false)} />
                                                                    <label className="checkbox">
                                                                        <span className="tick__checkbox__text">Tick if slow release</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row ">
                                                            <div className="col-3">
                                                                <p className="discharge__p">Continue on discharge?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart31"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge5"
                                                                            onChange={handleMedicineContinueOnDischargePart3Change31} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart31"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge5"
                                                                            onChange={handleMedicineContinueOnDischargePart3Change32} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <p className="discharge__p">Dispense?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart32"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="Dispense5"
                                                                            onChange={handleMedicineDispensePart3Change31} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart32"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="Dispense5"
                                                                            onChange={handleMedicineDispensePart3Change32} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="row pt-4">
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputDuration" className="col-sm-3 col-form-label label__font__size">Duration</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    value={duration5}
                                                                                    name="Duration"
                                                                                    className="form-control form__medication__text"
                                                                                    id="InputDuration"
                                                                                    onChange={duration5Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputQty" className="col-sm-2 col-form-label label__font__size">Qty.</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    value={qty5}
                                                                                    name="Qty"
                                                                                    className="form-control form__medication__text"
                                                                                    id="InputQty"
                                                                                    onChange={qty5Change}
                                                                                />
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
                                    </div>
                                </div>
                            </div>

                            <div className="float-right pt-4">
                                <button className="btn__back mx-2" onClick={backPageForStep2}>
                                    <i className="fas fa-angle-left me-2"></i> <b>Back</b>
                                </button>
                                <button className="btn__next mx-2" onClick={nextPageForStep4}>
                                    <b>Next</b> <i className="fas fa-angle-right ms-2"></i>
                                </button>
                                <button className="btn__save mx-2" onClick={saveMedicationChartPartThreeData}>
                                    <b>Save</b>
                                </button>
                                <button className="btn__cancel" onClick={props.closeModal}>
                                    <b>Cancel</b>
                                </button>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="medication-chart-part-4" role="tabpanel" aria-labelledby="medication-chart-part-4-tab">
                            <div className="row">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="medichine__table__div">
                                                    <div className="medichine__table">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <label for="InputPrescribed" className="col-sm-4 col-form-label col-form-label-sm medichine__text_p">Date Prescribed:</label>
                                                                    <div className="col-sm-8 pt-1">
                                                                        <input
                                                                            type="date"
                                                                            name="Date Prescribed"
                                                                            className="date__input border"
                                                                            onChange={dateInput}
                                                                            id="InputPrescribed"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <p className="administraion__text_p">As required PRN medicines</p>
                                                            <ul className="list-unstyled d-flex justify-content-between pt-2">
                                                                <li className="medichine__text_p">Medicine</li>
                                                                <li><button type="button" className="btn float-end add__btn" onClick={handleAddRegularMedicineEight}>Add Medicine</button></li>
                                                            </ul>
                                                            <Modal
                                                                isOpen={modalRegularMedicineEightIsOpen}
                                                                onRequestClose={closeModalRegularMedicineEight}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalRegularMedicineEight}><i className="fal fa-times"></i></span>
                                                                    <h6>Add PRESCRIBER MUST ENTER administration times table 7</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputHourlyFrequency" className="form-label d-block col-4" >Hourly frequency</label>
                                                                            <div className="col-5">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allFrequency}
                                                                                        getOptionLabel={(option) => option.frequency_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setFrequencyNames(newValue.frequency_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Hourly Frequency" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <input type="time" className="form-control form__hourly__frequency__time" id="InputTime" aria-describedby="emailHelp"
                                                                                    name="hourly__frequency__time"
                                                                                    value={regularMedicineEight.hourly__frequency__time}
                                                                                    onChange={inputRegularMedicineChangeEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMaxPRNDose" className="form-label d-block col-4" >Max PRN dose/ 24 hrs</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputMaxPRNDose" aria-describedby="emailHelp"
                                                                                    name="max__prn__dose"
                                                                                    value={regularMedicineEight.max__prn__dose}
                                                                                    onChange={inputRegularMedicineChangeEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={regularMedicineEight.indication}
                                                                                    onChange={inputRegularMedicineChangeEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={regularMedicineEight.pharmacy__name}
                                                                                    onChange={inputRegularMedicineChangeEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={regularMedicineEight.prescriber__signaturer}
                                                                                    onChange={inputRegularMedicineChangeEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={regularMedicineEight.contact__no}
                                                                                    onChange={inputRegularMedicineChangeEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDate" className="form-label d-block col-4" >Date</label>
                                                                            <div className="col-8">
                                                                                <input type="date" className="form-control " id="InputDate" aria-describedby="emailHelp"
                                                                                    name="date__no"
                                                                                    value={regularMedicineEight.date__no}
                                                                                    onChange={inputRegularMedicineChangeEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTime" className="form-label d-block col-4" >Time</label>
                                                                            <div className="col-8">
                                                                                <input type="time" className="form-control " id="InputTime" aria-describedby="emailHelp"
                                                                                    name="time__when"
                                                                                    value={regularMedicineEight.time__when}
                                                                                    onChange={inputRegularMedicineChangeEight} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right" onClick={submitRegularMedicineEight}>Save</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                            <div className="w-100">
                                                                <table className='medication__medicine__table' id="hidePart4">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="medicine__table__head cell__width__p4__1">Item No.</td>
                                                                            <td className="medicine__table__head cell__width__p4__2">Medicine</td>
                                                                            <td className="medicine__table__head cell__width__p4__3">Route</td>
                                                                            <td className="medicine__table__head cell__width__p4__4">Dose</td>
                                                                            <td className="medicine__table__head cell__width__p4__5">Hourly Frequency</td>
                                                                            <td className="medicine__table__head cell__width__p4__6">Max PRN dose/ 24 hrs</td>
                                                                            <td className="medicine__table__head cell__width__p4__7">Indication</td>
                                                                            <td className="medicine__table__head cell__width__p4__8">Pharmacy</td>
                                                                            <td className="medicine__table__head cell__width__p4__9">Prescriber signature</td>
                                                                            <td className="medicine__table__head cell__width__p4__10">Contact</td>
                                                                            <td className="medicine__table__head cell__width__p4__11">Date</td>
                                                                            <td className="medicine__table__head cell__width__p4__12">Time</td>
                                                                            <td className="medicine__table__head cell__width__p4__13" colSpan="2" >Action</td>
                                                                        </tr>
                                                                        {
                                                                            allRegularMedicineEight.length > 0 && allRegularMedicineEight.map((item, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td className="cell___data__color cell__width__p4__1">{i + 1}</td>
                                                                                        <td className="cell___data__color cell__width__p4__2">{item.medicine__name}</td>
                                                                                        <td className="cell___data__color cell__width__p4__3">{item.route}</td>
                                                                                        <td className="cell___data__color cell__width__p4__4">{item.dose}</td>
                                                                                        <td className="cell___data__color cell__width__p4__5">{item.hourly__frequency} {item.hourly__frequency__time}</td>
                                                                                        <td className="cell___data__color cell__width__p4__6">{item.max__prn__dose}</td>
                                                                                        <td className="cell___data__color cell__width__p4__7">{item.indication}</td>
                                                                                        <td className="cell___data__color cell__width__p4__8">{item.pharmacy__name}</td>
                                                                                        <td className="cell___data__color cell__width__p4__9">{item.prescriber__signaturer}</td>
                                                                                        <td className="cell___data__color cell__width__p4__10">{item.contact__no}</td>
                                                                                        <td className="cell___data__color cell__width__p4__11">{item.date__no}</td>
                                                                                        <td className="cell___data__color cell__width__p4__12">{item.time__when}</td>
                                                                                        <td className="cell___data__color">
                                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalRegularMedicineIDEight(item.id)}></i>
                                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => deleteRegularMedicineIDEight(e, item.id)}></i>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <Modal
                                                                isOpen={modalRegularMedicineEditIsOpenEight}
                                                                onRequestClose={closeEditModalRegularMedicineEight}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalRegularMedicineEight}><i className="fal fa-times"></i></span>
                                                                    <h6>Edit variable dose medicine table 4</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ drug_name: editRegularMedicineDataEight.medicine__name }}
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                    
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputRoute" className="form-label d-block col-4" >Route</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ route_name: editRegularMedicineDataEight.route }}
                                                                                        options={allRoute}
                                                                                        getOptionLabel={(option) => option.route_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setRouteNames(newValue.route_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Route Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDose" className="form-label d-block col-4" >Dose</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ dose_name: editRegularMedicineDataEight.dose }}
                                                                                        options={allDose}
                                                                                        getOptionLabel={(option) => option.dose_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setDoseNames(newValue.dose_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Dose Name" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputHourlyFrequency" className="form-label d-block col-4" >Hourly frequency</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ frequency_name: editRegularMedicineDataEight.hourly__frequency }}
                                                                                        options={allFrequency}
                                                                                        getOptionLabel={(option) => option.frequency_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setFrequencyNames(newValue.frequency_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Hourly Frequency" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMaxPRNDose" className="form-label d-block col-4" >Max PRN dose/ 24 hrs</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputMaxPRNDose" aria-describedby="emailHelp"
                                                                                    name="max__prn__dose"
                                                                                    value={editRegularMedicineDataEight.max__prn__dose}
                                                                                    onChange={handleRegularMedicineEditEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputIndication" className="form-label d-block col-4" >Indication</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputIndication" aria-describedby="emailHelp"
                                                                                    name="indication"
                                                                                    value={editRegularMedicineDataEight.indication}
                                                                                    onChange={handleRegularMedicineEditEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPharmacy" className="form-label d-block col-4" >Pharmacy</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPharmacy" aria-describedby="emailHelp"
                                                                                    name="pharmacy__name"
                                                                                    value={editRegularMedicineDataEight.pharmacy__name}
                                                                                    onChange={handleRegularMedicineEditEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputPrescriberSignaturer" className="form-label d-block col-4" >Prescriber signature</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputPrescriberSignaturer" aria-describedby="emailHelp"
                                                                                    name="prescriber__signaturer"
                                                                                    value={editRegularMedicineDataEight.prescriber__signaturer}
                                                                                    onChange={handleRegularMedicineEditEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputContact" className="form-label d-block col-4" >Contact</label>
                                                                            <div className="col-8">
                                                                                <input type="text" className="form-control " id="InputContact" aria-describedby="emailHelp"
                                                                                    name="contact__no"
                                                                                    value={editRegularMedicineDataEight.contact__no}
                                                                                    onChange={handleRegularMedicineEditEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputDate" className="form-label d-block col-4" >Date</label>
                                                                            <div className="col-8">
                                                                                <input type="date" className="form-control " id="InputDate" aria-describedby="emailHelp"
                                                                                    name="date__no"
                                                                                    value={editRegularMedicineDataEight.date__no}
                                                                                    onChange={handleRegularMedicineEditEight} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputTime" className="form-label d-block col-4" >Time</label>
                                                                            <div className="col-8">
                                                                                <input type="time" className="form-control " id="InputTime" aria-describedby="emailHelp"
                                                                                    name="time__when"
                                                                                    value={editRegularMedicineDataEight.time__when}
                                                                                    onChange={handleRegularMedicineEditEight} />
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                            onClick={updateEditRegularMedicineEight}>Update</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                        </div>

                                                        {/* global footer part*/}
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="d-flex pt-3">
                                                                    <input className="tick__checkbox"
                                                                        value="Tick"
                                                                        type="checkbox"
                                                                        name="Tick"
                                                                        onChange={() => setTickIfSlowRelease(!tickIfSlowRelease)}
                                                                    />
                                                                    <label className="checkbox">
                                                                        <span className="tick__checkbox__text">Tick if slow release</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row ">
                                                            <div className="col-3">
                                                                <p className="discharge__p">Continue on discharge?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart41"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge6"
                                                                            onChange={handleMedicineContinueOnDischargePart4Change41} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart41"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="ContinueOnDischarge6"
                                                                            onChange={handleMedicineContinueOnDischargePart4Change42} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <p className="discharge__p">Dispense?</p>
                                                                <div className="d-flex justify-content-start">
                                                                    <div className="d-flex ">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">Yes</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart42"
                                                                            value="Yes"
                                                                            type="radio"
                                                                            name="Dispense6"
                                                                            onChange={handleMedicineDispensePart4Change41} />
                                                                    </div>
                                                                    <div className="d-flex ms-3">
                                                                        <label className="checkbox">
                                                                            <span className="discharge__checkbox__span">No</span>
                                                                        </label>
                                                                        <input className="discharge__checkbox radioPart42"
                                                                            value="No"
                                                                            type="radio"
                                                                            name="Dispense6"
                                                                            onChange={handleMedicineDispensePart4Change42} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="row pt-4">
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputDuration" className="col-sm-3 col-form-label label__font__size">Duration</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    value={duration6}
                                                                                    name="Duration"
                                                                                    className="form-control form__medication__text"
                                                                                    id="InputDuration"
                                                                                    onChange={duration6Change}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <label for="InputQty" className="col-sm-2 col-form-label label__font__size">Qty.</label>
                                                                            <div className="col-sm-7 pt-1">
                                                                                <input
                                                                                    type="text"
                                                                                    value={qty6}
                                                                                    name="Qty"
                                                                                    className="form-control form__medication__text"
                                                                                    id="InputQty"
                                                                                    onChange={qty6Change}
                                                                                />
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
                                    </div>
                                </div>
                            </div>

                            <div className="float-right pt-4">
                                <button className="btn__back mx-2" onClick={backPageForStep3}>
                                    <i className="fas fa-angle-left me-2"></i> <b>Back</b>
                                </button>
                                <button className="btn__next mx-2" onClick={nextPageForStep5}>
                                    <b>Next</b> <i className="fas fa-angle-right ms-2"></i>
                                </button>
                                <button className="btn__save mx-2" onClick={saveMedicationChartPartFourData}>
                                    <b>Save</b>
                                </button>
                                <button className="btn__cancel" onClick={props.closeModal}>
                                    <b>Cancel</b>
                                </button>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="medication-chart-part-5" role="tabpanel" aria-labelledby="medication-chart-part-5-tab">
                            <div className="row">
                                <div className="col-12">
                                    <div className="medichine__table__div">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="medichine__table__div">
                                                    <div className="medichine__table">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <label for="InputPrescribed" className="col-sm-4 col-form-label col-form-label-sm medichine__text_p">Date prescribed:</label>
                                                                    <div className="col-sm-8 pt-1">
                                                                        <input
                                                                            type="date"
                                                                            name="Date Prescribed"
                                                                            className="date__input border"
                                                                            onChange={dateInput}
                                                                            id="InputPrescribed"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <p className="administraion__text_p">Allergies and adverse drug reactions (ADR)</p>
                                                            <ul className="list-unstyled d-flex justify-content-between pt-2">
                                                                <li className="medichine__text_p">Medicine</li>
                                                                <li><button type="button" className="btn float-end add__btn" onClick={handleAddRegularMedicineNine}>Add Medicine</button></li>
                                                            </ul>
                                                            <Modal
                                                                isOpen={modalRegularMedicineNineIsOpen}
                                                                onRequestClose={closeModalRegularMedicineNine}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModalRegularMedicineNine}><i className="fal fa-times"></i></span>
                                                                    <h6>Add Allergies and adverse drug reactions (ADR) table 8</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputReaction" className="form-label d-block col-4" >Reaction</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        options={allReaction}
                                                                                        getOptionLabel={(option) => option.reaction_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setReactionNames(newValue.reaction_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Reaction" />}
                                                                                    />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right" onClick={submitRegularMedicineNine}>Save</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                            <div className="w-100">
                                                                <table className='medication__medicine__table'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className='table__head__p5__1'>Item No.</td>
                                                                            <td className='table__head__p5__2'>Medicine</td>
                                                                            <td className='table__head__p5__3'>Reaction</td>
                                                                            <td className="table__head__p5__3" colSpan="2">Action</td>
                                                                        </tr>
                                                                        {
                                                                            allRegularMedicineNine.length > 0 && allRegularMedicineNine.map((item, i) => {
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td className="table__data">{i + 1}</td>
                                                                                        <td className="table__data">{item.medicine__name}</td>
                                                                                        <td className="table__data">{item.reaction}</td>
                                                                                        <td className="table__data">
                                                                                            <i className="fas fa-edit table__edit__btn" onClick={() => openEditModalRegularMedicineIDNine(item.id)}></i>
                                                                                            <i className="fas fa-trash text-danger table__edit__btn" onClick={(e) => deleteRegularMedicineIDNine(e, item.id)}></i>

                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <Modal
                                                                isOpen={modalRegularMedicineEditIsOpenNine}
                                                                onRequestClose={closeEditModalRegularMedicineNine}
                                                                style={customStyles1}
                                                                contentLabel="Example Modal"
                                                            >
                                                                <div className='card-body card__body__regular__medicine'>
                                                                    <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModalRegularMedicineNine}><i className="fal fa-times"></i></span>
                                                                    <h6>Edit Allergies and adverse drug reactions (ADR) table 8</h6>
                                                                    <form className='mt-4'>

                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputMedicine" className="form-label d-block col-4" >Medicine</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ drug_name: editRegularMedicineDataNine.medicine__name }}
                                                                                        options={allMedicine}
                                                                                        getOptionLabel={(option) => option.drug_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setMedicineName(newValue.drug_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Medicine Name" />}
                                                                                    />
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3 d-flex">
                                                                            <label for="InputReaction" className="form-label d-block col-4" >Reaction</label>
                                                                            <div className="col-8">
                                                                                <div className="medication__chart__autocomplete">
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id="combo-box-demo"
                                                                                        defaultValue={{ reaction_name: editRegularMedicineDataNine.reaction }}
                                                                                        options={allReaction}
                                                                                        getOptionLabel={(option) => option.reaction_name}
                                                                                        onChange={(e, newValue) => {
                                                                                            if (newValue !== null) {
                                                                                                setReactionNames(newValue.reaction_name)
                                                                                            }
                                                                                        }}
                                                                                        size="small"
                                                                                        renderInput={(params) => <TextField {...params} label="Reaction" />}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button type="button" className="btn mr-2 btn-success btn-sm float-right"
                                                                            onClick={updateEditRegularMedicineNine}>Update</button>
                                                                    </form>
                                                                </div>
                                                            </Modal>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="float-right pt-4">
                                <button className="btn__save mx-2" onClick={backPageForStep4}>
                                    <i className="fas fa-angle-left"></i> <b>Back</b>
                                </button>
                                <button className="btn__cancel" onClick={props.closeModal}>
                                    <b>Cancel</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </Modal >
    );
};

export default MedicationChart;