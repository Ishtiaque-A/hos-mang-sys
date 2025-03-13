import React, { useState, useEffect } from 'react';
import './DoctorsInbox.css';
import { Accordion } from 'react-bootstrap';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { alpha, styled } from '@mui/material/styles';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import axios from "axios";
import moment from 'moment';
import { toast } from 'react-toastify';
import { Margin, usePDF } from 'react-to-pdf';

const DoctorsInboxPatientDetail = (props) => {
    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState('');
    const [letterImage, setLetterImage] = useState('')

    axios.get('/lab-center-letter-head')
        .then(res => {
            if (res.status === 200) {
                setImage(res.data?.letter_head?.lab_incharge_sign)
                setLetterImage(res.data?.letter_head?.letter_head_logo)
                setImageUrl('')
            }
        })

    const StyledTreeItem = styled((props) => (
        <TreeItem {...props} />
    ))(({ theme }) => ({
        [`& .${treeItemClasses.iconContainer}`]: {
            '& .close': {
                opacity: 0.3,
            },
        },
        [`& .${treeItemClasses.group}`]: {
            marginLeft: 15,
            paddingLeft: 18,
            borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
        },
    }));

    const [theResultIs, setTheResultIs] = useState([]);
    // const [storeResultIn, setStoreResultIn] = useState([]);
    const [actionTobeTaken, setActionTobeTaken] = useState([]);

    useEffect(() => {
        axios.get(`/theResultIs`).then(res => {
            if (res.data.status == 200) {
                setTheResultIs(res.data.theResultIs);

            }
        });
        // axios.get(`/storeResultIn`).then(res => {
        //     if (res.data.status == 200) {
        //         setStoreResultIn(res.data.storeResultIn);

        //     }
        // });
        axios.get(`/actionTobeTaken`).then(res => {
            if (res.data.status == 200) {
                setActionTobeTaken(res.data.actionTobe);

            }
        });
    }, [])

    // const { name } = props.patientPropsValue;

    const [result, setResult] = useState("");
    const [action, setAction] = useState("");

    const singlePatientReport = props.singlePatientReport;
    //handleClick
    const [dynamicSrc, setDynamicSrc] = useState();
    const handleClick = (e, report, item) => {
        setDynamicSrc(item)
    }
    console.log(dynamicSrc, "ddde")
    useEffect(() => {
        setTimeout(() => {
            setDynamicSrc(singlePatientReport[0])
        }, 50)
    }, [props.singlePatientReport])

    const handleSave = (e) => {
        const submitData = {
            id: dynamicSrc.id,
            result: result,
            action_taken: action,
        }
        if (result === '' || action === '') {
            toast.error('Please Select Result and Action')
        }
        else {
            axios.post(`/save-doctor-inbox`, submitData).then(res => {
                if (res.data.status === 200) {
                    toast.success(res.data.message);

                }
            })
        }

    }
    const [searchTerm, setSearchTerm] = useState("");

    const handleReportSearch = (e) => {
        setSearchTerm(e.target.value);

    }
    // pdf down load
    const { toPDF, targetRef } = usePDF({
        filename: 'Report.pdf',
        page: { margin: Margin.LARGE, format: 'letter' },
    });
    return (
        <div >
            <div className="doctors-inbox-middle-content doc-inbox-main-content ms-1 custom-card">
                <div className="row">
                    <div className="col-2 doc-inbox-left-content p-1">
                        {/* <input type="text" placeholder='Search' onChange={handleReportSearch} className='ms-1 form-control form-control-sm mb-2 mt-1' /> */}
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ViewInArRoundedIcon />}
                            defaultExpandIcon={<ViewInArRoundedIcon />}
                            defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                            // sx={{ height: "800px", flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                            // sx={{ height: "800px",overflow:'hidden', overflowY: 'auto' }}
                            className="g-doc-scroll ms-1"
                        >
                            {
                                singlePatientReport?.length > 0 ?
                                    singlePatientReport !== undefined && singlePatientReport.filter((val) => {
                                        if (searchTerm == "") {
                                            return val;
                                        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        ) {
                                            return val;
                                        }
                                    }).map((item, i) => {
                                        return (
                                            item.report_file === "internal" ?
                                                <StyledTreeItem nodeId={`${i + 1}`} label={item.reports?.test_name} >
                                                    <StyledTreeItem nodeId={`${item.item}`} label={item.reports?.test_name} onClick={(e) => handleClick(e, item.report, item)} />
                                                    {moment(item.date).format('LL')}

                                                </StyledTreeItem>
                                                :
                                                <StyledTreeItem nodeId={`${i + 1}`} label={item.lab_name} >
                                                    <StyledTreeItem nodeId={`${item.item}`} label={item.report_support_file} onClick={(e) => handleClick(e, item.report, item)} />
                                                    {moment(item.created_at).format('LL')}

                                                </StyledTreeItem>
                                        )
                                    })
                                    :
                                    <p className='text-center text-danger mt-lg-5'>Records are not available</p>
                            }

                        </TreeView>
                    </div>
                    <div className="col-8 doc-inbox-viewer ">
                        {
                            dynamicSrc ?
                                <>
                                    <div className="actual-receipt bg-white great-lab-print-report-view mb-1">
                                        {
                                            dynamicSrc?.report_file === "internal" &&
                                            <>

                                                <div ref={targetRef} className=" mt-2 mb-3 w-100">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="great-lab-print-head mt-3">
                                                            <h6>Macro Healthplus Clinic</h6>
                                                            <p>3 Dhakeshwari Rd, Dhaka 1211, Bangladesh</p>
                                                        </div>
                                                        <div>
                                                            <img style={{ height: "80px" }} src={`${global.img_url}/images/letterHead/${letterImage}`} alt="" />
                                                            {/* <img style={{ height: "80px" }} src='https://picsum.photos/200' alt="" /> */}
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <h6 className='text-uppercase'>laboratory report</h6>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className='lab-report-details'>
                                                            <p> <span style={{ width: "110px" }} className='d-inline-block'>Name </span>: <span className='ms-1'>{dynamicSrc?.patient?.patient_first_name}</span> </p>
                                                            <p> <span style={{ width: "110px" }} className='d-inline-block'>Date </span>: <span className='ms-1'>{moment(dynamicSrc?.created_at).format('LL')}</span> </p>
                                                            <p> <span style={{ width: "110px" }} className='d-inline-block'>Reference By </span>: <span className='ms-1'>{dynamicSrc?.doctor?.dr_given_name}</span> </p>
                                                            {/* <p> <span style={{ width: "110px" }} className='d-inline-block'>Reference</span>: <span className='ms-1'>{dynamicSrc?.referrer}</span> </p> */}
                                                        </div>
                                                        <div className='lab-report-details'>
                                                            <p> <span style={{ width: "70px" }} className='d-inline-block'>Age </span>: <span className='ms-1'>{moment().diff(dynamicSrc?.patient.patient_dob, "years")}</span> </p>
                                                            <p> <span style={{ width: "70px" }} className='d-inline-block'>Sex </span>:<span className='ms-1'>{dynamicSrc?.reports?.gender}</span> </p>
                                                            <p> <span style={{ width: "70px" }} className='d-inline-block'>HN </span>: <span className='ms-1'>{dynamicSrc?.patient.patient_hn_number}</span> </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 text-center">
                                                        <h6 className="text-uppercase">{dynamicSrc?.reports?.test_name}</h6>
                                                    </div>
                                                    {

                                                        <>
                                                            <div className="lab-report-table">
                                                                {
                                                                    dynamicSrc?.reports?.details?.length > 0 &&
                                                                    <table className="table table-borderless">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Test Name</td>
                                                                                <td>Flag</td>
                                                                                <td>Result</td>
                                                                                <td>Normal Range</td>
                                                                                <td>Units</td>
                                                                            </tr>
                                                                            {
                                                                                dynamicSrc?.reports?.details?.map((item, i) => {
                                                                                    return (
                                                                                        <tr key={i}>
                                                                                            <td>{item.parameter_name}</td>
                                                                                            <td className={`${(item.flag === "Low" || item.flag === "High") && "text-danger fw-bolder"}`}>{item.flag}</td>
                                                                                            <td> {item.result}</td>
                                                                                            <td>{item.lower_value + '-' + item.upper_value}</td>
                                                                                            <td> {item.unit}</td>

                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                }

                                                                {
                                                                    dynamicSrc?.reports?.test_group?.toLowerCase() === "pathology" &&
                                                                    <>
                                                                        <h6>Impression : </h6>
                                                                        <p className='mt-3 ms-5'>
                                                                            {dynamicSrc?.reports?.remark}
                                                                        </p>
                                                                    </>
                                                                }
                                                                {
                                                                    dynamicSrc?.reports?.test_group?.toLowerCase() === "radiology" &&
                                                                    <>

                                                                        {
                                                                            <div dangerouslySetInnerHTML={{ __html: dynamicSrc?.reports?.radiologyReportDetails }} className="mt-2">

                                                                            </div>
                                                                        }
                                                                        {
                                                                            dynamicSrc?.reports?.radiogyReportImage &&
                                                                            <img src={`${global.img_url}/images/lab/${dynamicSrc?.reports?.radiogyReportImage}`} alt="report" className="img-fluid mt-2 mb-2" />
                                                                        }
                                                                    </>
                                                                }

                                                            </div>
                                                        </>
                                                    }

                                                    <div className="d-flex justify-content-end">
                                                        <div className='me-3'>
                                                            <div className="technician-sign-preview mb-2">
                                                                {
                                                                    imageUrl &&
                                                                    <img src={URL.createObjectURL(imageUrl)} alt="" className='img-fluid' />
                                                                }
                                                                {
                                                                    image &&
                                                                    <img src={`${global.img_url}/images/letterHead/${image}`} alt="" className='img-fluid' />
                                                                }

                                                            </div>
                                                            <p>Dr.Leonard Giblin</p>
                                                            <p>GNU Public Key : E44311F4</p>
                                                        </div>
                                                    </div>

                                                </div>

                                            </>
                                        }
                                        {
                                            dynamicSrc?.report_file === "external" &&
                                            <div style={{ minHeight: "570px" }}>
                                                <div className="text-center">
                                                    <h6 className='text-uppercase'>laboratory report</h6>
                                                </div>
                                                {
                                                    dynamicSrc?.files?.length > 0 &&
                                                    dynamicSrc?.files?.map((item, i) => {
                                                        return (
                                                            item.file_name.endsWith('pdf') ?
                                                                <>
                                                                    <h6 className='my-2'> {item.title}</h6>
                                                                    <iframe width="100%" height="350px" src={`${global.img_url}/images/external_lab/${item?.file_name}`} frameborder="0"
                                                                        style={{ objectFit: 'cover' }}></iframe>

                                                                </>
                                                                :
                                                                <>
                                                                    <h6 className='my-2'> {item.title}</h6>
                                                                    <TransformWrapper >
                                                                        {({ zoomIn, zoomOut, doubleClick, resetTransform, ...rest }) => (
                                                                            <React.Fragment>
                                                                                <div className="tools">
                                                                                    <button className='zoom-button' onClick={() => zoomIn()}><i className="fas fa-search-plus"></i></button>
                                                                                    <button className='zoom-button' onClick={() => zoomOut()}><i className="fas fa-search-minus"></i></button>
                                                                                    <button className='zoom-button' onClick={() => resetTransform()}><i className="fas fa-sync-alt"></i></button>
                                                                                </div>
                                                                                <TransformComponent>
                                                                                    <img src={`${global.img_url}/images/external_lab/${item?.file_name}`} alt="report" className="img-fluid mt-2 mb-2" />
                                                                                </TransformComponent>
                                                                            </React.Fragment>
                                                                        )}
                                                                    </TransformWrapper>

                                                                </>
                                                        )
                                                    })
                                                }
                                                <div className="mt-2">
                                                    <h6>Remarks</h6>
                                                    <p>{dynamicSrc?.remarks}</p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {
                                        dynamicSrc?.report_file === 'internal' &&
                                        <button onClick={() => toPDF()} className="btn btn-sm btn-success mt-2 float-end">Download</button>
                                    }
                                </>
                                :
                                <div className='className="actual-receipt bg-white great-lab-print-report-view mb-1"'>
                                    <p className='text-center text-danger mt-lg-5'> Records are not available</p>
                                </div>
                        }


                    </div>
                    <div className="col-2 doc-inbox-right-content">
                        {
                            dynamicSrc?.status === 'seen' ?
                                <>
                                    <h6 className="my-2">Result</h6>
                                    <p>{dynamicSrc?.result}</p>
                                    <h6 className="my-2">Action</h6>
                                    <p>{dynamicSrc?.action_taken}</p>
                                    {/* <Accordion className='mb-2' defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>This result is <br /> </Accordion.Header>
                                           
                                            <Accordion.Body>
                                                <div className="form-check">

                                                    <input className="form-check-input" type="radio" name="the_result_is" id="flexRadioDefault1" />
                                                    <label className="form-check-label" for="flexRadioDefault1">
                                                        {dynamicSrc.result}
                                                    </label>


                                                </div>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className='mb-2' defaultActiveKey="1">
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Action to be taken <br /> </Accordion.Header>

                                            <Accordion.Body>
                                                <div className="form-check">

                                                    <input className="form-check-input" checked type="radio" name="action_to_be_taken" id="flexRadioDefault1" />
                                                    <label className="form-check-label" for="flexRadioDefault1">
                                                        {dynamicSrc.action_taken}
                                                    </label>

                                                </div>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion> */}

                                </>
                                :
                                <>
                                    <Accordion className='mb-2' defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>This result is <br /> </Accordion.Header>
                                            {/* {
                                            result && <div className="accordion-value"><span>{result}</span></div>
                                        } */}
                                            <Accordion.Body>
                                                <div className="form-check">
                                                    {
                                                        theResultIs.map((item, i) => {
                                                            return (
                                                                <>
                                                                    <input className="form-check-input" type="radio" value={item.the_result_is_name} onChange={(e) => setResult(e.target.value)} name="the_result_is" id="flexRadioDefault1" />
                                                                    <label className="form-check-label" for="flexRadioDefault1">
                                                                        {item.the_result_is_name}
                                                                    </label>
                                                                </>

                                                            )
                                                        })
                                                    }

                                                </div>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion className='mb-2' defaultActiveKey="1">
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Action to be taken <br /> </Accordion.Header>

                                            <Accordion.Body>
                                                <div className="form-check">

                                                    {
                                                        actionTobeTaken.map((item, i) => {
                                                            return (
                                                                <>
                                                                    <input className="form-check-input" type="radio" value={item.action_to_be_taken} onChange={(e) => setAction(e.target.value)} name="action_to_be_taken" id="flexRadioDefault1" />
                                                                    <label className="form-check-label" for="flexRadioDefault1">
                                                                        {item.action_to_be_taken}
                                                                    </label>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    {/* <Accordion className='mb-2' defaultActiveKey="2" >
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Store result in <br /> </Accordion.Header>
                                <Accordion.Body>
                                    <div class="form-check">

                                        {
                                            storeResultIn.map((item, i) => {
                                                return (
                                                    <>
                                                        <input className="form-check-input" type="radio" value={item.id} onChange={(e) => setStoreResult(e.target.value)} name="store_result_in" id="flexRadioDefault1" />
                                                        <label className="form-check-label" for="flexRadioDefault1">
                                                            {item.store_result_in}
                                                        </label>
                                                    </>
                                                )
                                            })
                                        }

                                    </div>

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion> */}
                                    <button className='btn btn-sm btn-success mt-1' onClick={handleSave}>Save</button>
                                </>
                        }


                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorsInboxPatientDetail;