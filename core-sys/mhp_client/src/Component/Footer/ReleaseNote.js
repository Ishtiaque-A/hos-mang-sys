import React, { useState } from 'react'

export default function ReleaseNote({ setReleaseNoteModelOpen }) {
    const [newRealseDate, setnewRealseDate] = useState("18-04-2023")
    const [newFeature, setnewFeature] = useState([
        {
            module: "New Cr in Smart Doc", feature: [

                { name: "Paediatric exam Cr Page (1,2 4,5,7,9,13,15,17,19,21,23,24)" },
                { name: "Image Or Take Picture In History and Examination" },
                { name: "Loading Time optimize in great doc" },
                { name: "New Rx Cr (after next btn click alert model will open)" },
                { name: "Time Calculation for patient examination when end visit (Start Time - End Time)" }
            ],

        },
        {
            module: "Smart Doc", feature: [
                { name: "No Data found alert show when search drugs" },
                { name: "Past History update with ICD10 code" },
                { name: "Mims Api Interact With both Past history and Diagnosis" },
                { name: "Mims Api Works For Single and Multiple Drugs Select" },
                { name: "Restricted Drug List Conditionally select when doctor end visit" },
            ],
        },
        {
            module: "History && Exami CR", feature: [
                { name: "Ent CR" },
                { name: "Cardiovascular CR" },
                { name: "General & Genito Urinary && Cranial Nerve" }
            ],

        },
        {

            module: "Lab Module", feature: [
                { name: "Billing" },
                { name: "Sample Collection" },
                { name: "Report Collection" },
                { name: "Report List" },
                { name: "Report Delivery" },
                { name: "Report Delivery List" },
                { name: "Report Receipt List" },
            ],

        },
        {
            module: "History && Exam Output", feature: [
                { name: "Mental Health (Main) Backend Update" },
                { name: "Mental Health (k10 , PHQ_9 ) Backend  + Scoring" },
                { name: "Mental Health (HDRS,GPCOG,MADRS) Backend + Scoring" },
                { name: "Mental Health Output (All)" },
                { name: "Neurological (CNS , PNS ) Backend Update + Output" },
                { name: "Neurological (Lower limb ) Backend + Output" },
                { name: "Women Health Backed Update" },
                { name: "Women Health Output" },
                { name: "Respiratory Calculation" },
                { name: "Eye Output" },
                { name: "Time optimization && bug fixing" }
            ],

        },
        {
            module: "Lab Agent", feature: [
                { name: "Lab agent registration" },
                { name: "Lab agent billing" },
                { name: "Lab agent Rate List" },
                { name: "Lab Agent List Frontend && Backend" },
                { name: "Lab agent Report Delivery" },
                { name: "Lab Agent Edit Page Frontend with Backend" }

            ]
        },
        {
            module: "Data Correction && Entry", feature: [
                { name: "Patients 1200+" },
                { name: "Doctors 500+" },
                { name: "Drug generic name correction" },
                { name: "Reason For visit data entry form excel file" },
                { name: "Procedure data entry form excel file" },
            ]
        }

    ])

    const [upcomming, setupcomming] = useState([
        {
            module: "Doctors Module", feature: [
                { name: "doctor inbox" },
                { name: "great doc Cr" },
            ]
        },
    ])
    const [OldFeature, setOldFeature] = useState([
        {
            module: "Data Merge", feature: [
                { name: "ICD 10 data merge -> total 52,008" },
                { name: "Reason for visit data merge (all in drive)" },
                { name: "Procedure data merge (2000)" },
            ]
        },
        {
            module: "History && Exam Output", feature: [
                { name: "Musculoskeletal Backend Update" },
                { name: "Musculoskeletal Output ( Cervical Spine,T.L.S,Hip,Knee )" },
                { name: "Musculoskeletal Output ( Ankel & Foot , Shoulder,Hand,Klbow )" },
            ]
        },
        {
            module: "MIMS API Update", feature: [
                { name: "Drug to Drug interaction(only selected drug interaction) " },
                { name: "Drugs interaction reference add" },
                { name: "MIMS All API for current RX" },
                { name: "Mims API (Women's Health)" },
                { name: "Pregnancy alert for pregnant woman considering the actual pregnancy duration" },
                { name: "Pregnancy alert for woman of child bearing age (WOCBA)" },
                { name: "Pregnancy Outcome auto calculation " },
                { name: "Nursing / Breastfeeding Model" },
                { name: "Lactation API" },
                { name: "Mems Health issue interact with diagnosis" },

            ]
        },
        {
            module: "Smart Doc", feature: [
                { name: "Flag color change based on Severity Level" },
                { name: "Severity Level, Probable Mechanism,Action to be Taken" },
                { name: "In Prescription Step 2 ->Default value selected(dose: 1, Freq: daily, Route: oral))" },
                { name: "In Current Rx(Mems Products information )" },
                { name: "Mems icon change on the product info" },
                { name: "Diagnosis data show based on active (2 tables)" },
                { name: "Auto generate HN Number" },
                { name: "Custom Medicine add in GD" },
                { name: "Past Rx to Current Rx update remove" },

            ]
        },

        {
            module: "MacroHealth_MIMS Drugs Initial Import", feature: [
                { name: "total 5750 drugs" },
                { name: "total 9849 drugs", FeaDate: "17-10-2023" },
            ]
        },
        {
            module: "Patients Module", feature: [
                { name: "Family & Social History Frontend", FeaDate: "17-10-2023" },
            ]
        },

        {
            module: "History && Exam Output", feature: [
                { name: "General output" },
                { name: "Cardiovascular output" },
                { name: "Respiratory output (without table calculation)" },
                { name: "GastroIntestinal Output" },
                { name: "Cranial Nerves Output + Changes" },

                { name: "Genito Urinary Output", FeaDate: "17-10-2023" },
                { name: "ENT Output", FeaDate: "17-10-2023" },
                { name: "Dermatology (Skin ) Backend", FeaDate: "17-10-2023" },
                { name: "Dermatology (Skin ) Output", FeaDate: "17-10-2023" },

            ]
        },
        {
            module: "Mater Setup", feature: [
                { name: "Doctor Setup" },
                { name: "CNS Part One Setup" },
                { name: "CNS Part Two" },
                { name: "Cardiovascular Setup" },
                { name: "Neurological Examination Setup" },
                { name: "Gastro Intestinal Setup" },
                { name: "All History" },
                { name: "Women's Health Setup" },
                { name: "Musculoskeletal Setup" },
                { name: "Gastro Urinary Setup" },
                { name: "General Setup" },
                { name: "ENT Setup" },
            ]
        }
    ])
    return (
        <>
            <span className='float-end' style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }} onClick={() => setReleaseNoteModelOpen(false)}><i className="fal fa-times"></i></span>
            <h6 style={{ fontSize: "14px", textAlign: "center" }}>Release Note : {newRealseDate}</h6>
            <hr className='top-hr' />
            <div className='row'>
                <div className="col-sm-6">
                    <div className="border m-1 rounded noteHeight g-doc-scroll p-2">
                        <h5>New Feature : </h5>
                        {
                            newFeature.length > 0 &&
                            newFeature.map((val, i) => {
                                return (
                                    <>
                                        <p style={{ marginBottom: "3px" }} className='noteModule' key={i}>{val.module}</p>
                                        <ul>
                                            {val.feature.length > 0 &&
                                                val.feature.map((fea, i) => {
                                                    return (
                                                        <li key={i}>{fea.name}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </>

                                )

                            })
                        }
                        <h5>Old Feature : </h5>
                        {
                            OldFeature.length > 0 &&
                            OldFeature.map((val, i) => {
                                return (
                                    <>
                                        <p style={{ marginBottom: "3px" }} className='noteModule' key={i}>{val.module}</p>
                                        <ul>
                                            {val.feature.length > 0 &&
                                                val.feature.map((fea, i) => {
                                                    if (fea.FeaDate) {
                                                        return (
                                                            <li style={{ color: "green" }} key={i}>{fea.name}</li>
                                                        )
                                                    }
                                                    return (
                                                        <li key={i}>{fea.name}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </>

                                )

                            })
                        }
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="border m-1 rounded noteHeight g-doc-scroll p-2">

                        <h5>Upcoming Feature</h5>
                        {
                            upcomming.length > 0 &&
                            upcomming.map((val, i) => {
                                return (
                                    <>
                                        <p style={{ marginBottom: "3px" }} className='noteModule' key={i}>{val.module}</p>
                                        <ul>
                                            {val.feature.length > 0 &&
                                                val.feature.map((fea, i) => {

                                                    return (
                                                        <li key={i}>{fea.name}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </>

                                )

                            })
                        }
                    </div>

                </div>


            </div>
        </>

    )
}
