import { Box, FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './GpCog.css';
import { toast } from 'react-toastify';
import useResizeObserver from '../../../../hooks/useResizeObserver';




const GpCog = (props) => {

    const { width } = useResizeObserver();
    const customStyles = {
        content: {
            top: width > 900 ? '37%' : '34%',
            left: '21%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: width > 900 ? "75%" : "86%",
            height: width > 900 ? "83%" : "75%",
            background: "#fff",
            padding: "10px",
            marginLeft: width > 900 ? "38%" : "32%"
        },

    };

    // const [slotTo, setSlotTo] = React.useState(null);

    const [dropdown, setdropdown] = useState([
        { id: 1, name: "Yes", value: 1 },
        { id: 2, name: "No", value: 0 },
        { id: 3, name: "Not Capable", value: 0 }
    ])

    const [tableObj, settableObj] = useState({})
    const [tableObj2, settableObj2] = useState({})
    const [gpcogScore, setgpcogScore] = useState(0)
    const [gpcogScore2, setgpcogScore2] = useState(0)

    useEffect(() => {
        let a = 0;
        for (const [key, value] of Object.entries(tableObj)) {
            a = a + value;
            setgpcogScore(a)
        }
        let b = 0;
        for (const [key, value] of Object.entries(tableObj2)) {
            b = b + value;
            setgpcogScore2(b)
        }

    }, [tableObj, tableObj2])

    const GpCogSave = () => {
        props.gpcogScore.setgpcogScore1st(gpcogScore)
        props.gpcogScore.setgpcogScore2nd(gpcogScore2)

        settableObj({})
        setgpcogScore(0)
        props.closeGpCogModal()

        toast.success("Gpcog data save successfully")
    }


    return (
        <div>
            <Modal
                isOpen={props.gpCogIsOpen}
                onRequestClose={props.closeGpCogModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <span className='float-end' style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => {
                    settableObj({})
                    setgpcogScore(0)
                    props.closeGpCogModal()
                }}><i class="fal fa-times"></i></span>
                <h6 className="card-title">GP Cog</h6>
                <hr className='popup-hr' />
                <div className='bg-white px-2'>
                    {/* <div className="row">
                        <div className='col-md-8'>

                        </div>
                        <div className='col-md-4'>
                            <h2>GP Cog</h2>
                        </div>
                    </div> */}
                    <div className='step1'>
                        <h5>STEP1: PATIENT EXAMINATION</h5>
                    </div>
                    <p>Unless specified,each question should only be asked once.</p>
                    <b className='color-text'>Name and address for subsequent recall test</b> <br />
                    <i>
                        I am giving to give you a name and address.After i have said it,I want you to repeat it.Remember this name and address because I am going to ask you to tell it to me again in a few minutes:John Brown,42 West street, Kensington.
                    </i><span>(Allow a maximum  of 4 attempts.)</span>

                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="row mental-question-container">
                                <table className="phq-table">
                                    <tbody>
                                        <tr >
                                            <td className='color-text' style={{ fontWeight: 500 }} colSpan={2}>Time Orientation</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "600px", fontStyle: 'italic' }}>What is the Date? <span>(exact only)</span></td>
                                            <td>
                                                <select name="the Date" className="form-select form-select-sm" onChange={(e) => settableObj({ ...tableObj, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">
                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='color-text' style={{ fontWeight: 500 }} colSpan={2}>Clock Drawing (use blank page)</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "200px", fontStyle: 'italic' }}>Please mark in all the numbers to indicate the hours of a clock.<span>(correct spacing required)</span></td>
                                            <td>
                                                <select name="the clock" className="form-select form-select-sm" onChange={(e) => settableObj({ ...tableObj, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "400px", fontStyle: 'italic' }}>Please mark in hands to show 10 minutes past eleven o'clock.<span>(11.10)</span></td>
                                            <td>
                                                <select name="the eleven" className="form-select form-select-sm" onChange={(e) => settableObj({ ...tableObj, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">
                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>

                                        <tr >
                                            <td className='color-text' style={{ fontWeight: 500 }} colSpan={2}>Information</td>
                                        </tr>
                                        <tr>
                                            <td className='font_style' style={{ width: "400px" }}>Can you tell me something that happened in the news recently? <span>(Recently=in the last week,in a general answer is given,e.g "war","lot of rain",ask for details.only specific answer scores.)</span></td>
                                            <td>
                                                <select name="the news" className="form-select form-select-sm" onChange={(e) => settableObj({ ...tableObj, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>

                                        <tr >
                                            <td className='color-text' style={{ fontWeight: 500 }} colSpan={2}>Recall</td>
                                        </tr>
                                        <tr >
                                            <td className='font_style' colSpan={2}>What was the name and address I asked you to remember?</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "400px" }}>John</td>
                                            <td>
                                                <select name="the remember" className="form-select form-select-sm" onChange={(e) => settableObj({ ...tableObj, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "400px" }}>Brown</td>
                                            <td>
                                                <select name="the Brown" className="form-select form-select-sm" onChange={(e) => settableObj({ ...tableObj, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "400px" }}>42</td>
                                            <td>
                                                <select name="the 42" className="form-select form-select-sm" onChange={(e) => settableObj({ ...tableObj, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "400px" }}>West(St)</td>
                                            <td>
                                                <select name="the West" className="form-select form-select-sm" onChange={(e) => settableObj({ ...tableObj, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "400px" }}>Kensington</td>
                                            <td>
                                                <select name="the Kensington" className="form-select form-select-sm" onChange={(e) => settableObj({ ...tableObj, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className='phq-total d-flex justify-content-between'>
                                                <span>Add the number of items answered correctly:</span>
                                                <span className='fw-bold'>Total Score</span>
                                            </td>
                                            <td>
                                                <input id="number" type="number" disabled value={gpcogScore} />
                                                <span className='ms-2 fw-bold'>Out Of 9 </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className='mt-2 significant_container'>
                                    <div className='significant_position'>
                                        <b className='color-text'>9</b>
                                        <b className='ms-5 color-text'>No Significant cognitive impairment
                                        </b> <br />
                                        <span style={{ marginLeft: '55px' }}>
                                            Further testing is not necessary.</span>
                                    </div>
                                    <div className='significant_position'>
                                        <b className='color-text'>5-8</b>
                                        <b style={{ marginLeft: '34px' }} className='color-text ms-1'>More information required
                                        </b> <br />
                                        <span style={{ marginLeft: '55px' }}>Proceed with an informant interview in step 2 on the next page.</span>

                                    </div>
                                    <div className='significant_position'>
                                        <b className='color-text'>0-4</b>
                                        <b style={{ marginLeft: '34px' }} className='color-text'>Cognitive impairment is indicated
                                        </b><br />
                                        <span style={{ marginLeft: '55px' }}> Conduct standard investigations.</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="row mt-1">
                        <div className='step2'>
                            <h5>STEP 2:INFORMANT INTERVIEW</h5>
                        </div>
                        <div>
                            <div className='d-flex'>
                                <p className='ms-3'>Informant Name:</p>
                                <Box
                                    style={{ marginTop: '-20px' }}
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '35ch' },
                                    }}
                                    noValidate
                                    autoComplete="off">
                                    <TextField id="standard-basic" variant="standard" />
                                </Box>
                            </div>
                            <div className='d-flex'>
                                <p className='ms-3'>Relationship to patient,i.e informant is the patient's:</p>
                                <Box
                                    style={{ marginTop: '-20px' }}
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '35ch' },
                                    }}
                                    noValidate
                                    autoComplete="off">
                                    <TextField id="standard-basic" variant="standard" />
                                </Box>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row mental-question-container">
                                <table className="phq-table">
                                    <tbody>
                                        <tr>
                                            <td style={{ fontWeight: 500 }} colSpan={2}>Ask the informant: <br />
                                                <span className='font_style'>Compared to 5-10 years ago,</span></td>
                                        </tr>
                                        <tr>
                                            <td className='font_style' style={{ width: "600px" }}>Does the patient have more trouble remembering things that have happened recently that s/he used to?</td>
                                            <td style={{ width: "200px" }}>
                                                <select name="the remembering" className="form-select form-select-sm" onChange={(e) => settableObj2({ ...tableObj2, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='font_style' style={{ width: "400px" }}>Does s/he have more trouble recalling conversations a few days later?</td>
                                            <td>
                                                <select name="the recalling" className="form-select form-select-sm" onChange={(e) => settableObj2({ ...tableObj2, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='font_style' style={{ width: "400px" }}>When speaking,does she have more difficulty in finding the right word or tend to use the wrong words more often?</td>
                                            <td>
                                                <select name="the speaking" className="form-select form-select-sm" onChange={(e) => settableObj2({ ...tableObj2, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='font_style' style={{ width: "400px" }}>Is s/he less able to manage money and financial affairs (e.g.paying bills and budgeting)?</td>
                                            <td>
                                                <select name="the affairs" className="form-select form-select-sm" onChange={(e) => settableObj2({ ...tableObj2, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='font_style' style={{ width: "400px" }}>Is s/he less able to manage his or her medication independently?</td>
                                            <td>
                                                <select name="the independently" className="form-select form-select-sm" onChange={(e) => settableObj2({ ...tableObj2, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='font_style' style={{ width: "400px" }}>Does s/he need more assistance with transport (either private or public)?(if the patient has difficulties only due to physical problems,e.g.bad leg,tick'no'.</td>
                                            <td>
                                                <select name="the transport" className="form-select form-select-sm" onChange={(e) => settableObj2({ ...tableObj2, [e.target.name]: parseInt(e.target.value) })} aria-label=".form-select-sm example">

                                                    <option value="0">Select</option>
                                                    {dropdown.length > 0 && dropdown.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.value}>{item.name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </td>
                                        </tr>

                                        <tr >
                                            <td className='phq-total d-flex justify-content-between'>
                                                <span>Add the number of items answered
                                                    with "NO","Don't know" or "N/A":</span>
                                                <span className='fw-bold'>Total Score</span>
                                            </td>
                                            <td>
                                                <input id="number" type="number" disabled value={gpcogScore2} />
                                                <span className=' fw-semibold'>Out Of 6 </span>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                                <div className='mt-2 significant_container'>
                                    <div className='significant_position'>
                                        <b className='color-text'>4-6</b>
                                        <b style={{ marginLeft: '35px' }} className='color-text ms-1'>No Significant cognitive impairment
                                        </b> <br />
                                        <span style={{ marginLeft: '55px' }}>
                                            Further testing is not necessary.</span>
                                    </div>

                                    <div className='significant_position'>
                                        <b className='color-text'>0-3</b>
                                        <b style={{ marginLeft: '34px' }} className='color-text ms-1'>Cognitive impairment is indicated
                                        </b><br />
                                        <span style={{ marginLeft: '55px' }}> Conduct standard investigations.</span>
                                    </div>
                                </div>

                                <div style={{ borderBottom: '2px solid black', marginTop: '14px', marginBottom: '5px' }}>

                                </div>

                            </div>

                            <div>
                                <p>When referring to a specialist,mention the individual scores for the two GPCOG test steps:</p>
                                <p>STEP 1: <b>Patient Examination: --/9</b></p>
                                <p>STEP 2: <b>Informant Interview: --/6 or N/A</b></p>
                            </div>
                            <small>
                                &#169; University of New South Wales as represented by the Dementia Collaborative Research centre --Assessment and better Care; Brodaty et al,JAGS 2002;50:530-534.
                            </small>

                        </div>

                    </div>
                    <div className="pedriatric_btn">
                        <button
                            onClick={() => {
                                settableObj({})
                                setgpcogScore(0)
                                props.closeGpCogModal()
                            }}
                            className="pedriatric_btn_left"
                        >
                            Cancel
                        </button>
                        <button onClick={GpCogSave} className="pedriatric_btn_middle">
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default GpCog;