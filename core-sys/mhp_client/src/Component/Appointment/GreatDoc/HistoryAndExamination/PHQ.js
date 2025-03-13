import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import useResizeObserver from '../../../../hooks/useResizeObserver';

const PHQ = (props) => {
    const {width} = useResizeObserver();
    const customStyles = {
        content: {
            top: '37%',
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

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);
    const [tableValue, setTableValue] = useState({});
    const [tableValueBottom, setTableValueBotttom] = useState({});
    const [tableRow, setTableRow] = useState([]);
    const [tableRowBottom, setTableRowBottom] = useState([]);
    const [dropDownArray, setDropdownArray] = useState([])
    const [dropDownArrayBottom, setDropdownArrayBottom] = useState([])
    const [total, setTotal] = useState(0);
    const [totalBottom, setTotalBottom] = useState(0);
    useEffect(() => {
        let a = 0;
        for (const [key, value] of Object.entries(tableValue)) {
            a = a + value;
            setTotal(a)

        }
        let b = 0;
        for (const [key, value] of Object.entries(tableValueBottom)) {
            b = b + value;
            setTotalBottom(b)

        }
    }, [tableValue, tableValueBottom]);

    useEffect(() => {
        axios.get(`/phq-9-questionnaire`).then(res => {
            if (res.data.status === 200) {

                setTableRow(res.data.PHQ9Questionnaire);
                setTableRowBottom(res.data.PHQ9Questionnaire)
            }

        });

        axios.get(`/phq-9-questionnaire-value`).then(res => {
            if (res.data.status === 200) {
                setDropdownArray(res.data.PHQ9QuestionnaireValue);
                setDropdownArrayBottom(res.data.PHQ9QuestionnaireValue)
            }

        });
    }, [])

    const phq9SaveData = () => {
        props.Score.setPSQ9Score1st(total)
        props.Score.setPSQ9Score2nd(totalBottom)

        setTotal(0)
        setTotalBottom(0)
        setTableValue({})
        setTableValueBotttom({})
        props.closeModal()

        toast.success("PHQ9 data save successfully")
    }

    return (
        <div className='phq-popup-container k10-modal'>
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={props.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <span className='float-end' style={{ fontSize: "18px", cursor: "pointer" }} onClick={() => {
                    setTotal(0)
                    setTotalBottom(0)
                    setTableValue({})
                    setTableValueBotttom({})
                    props.closeModal()
                }}><i class="fal fa-times"></i></span>
                <h6 className="card-title">PHQ-9 Depression questionnaire</h6>
                <hr className='popup-hr' />
                <p style={{ fontWeigt: 500 }}>Date: 15 Jan, 2022</p>
                <div className="row">
                    <div className="col-lg-8 col-9">
                        <div className="row mental-question-container">
                            <table className="phq-table">
                                <tbody>
                                    <tr >
                                        <td style={{ fontWeight: 500 }} colSpan={2}>Over Last 2 weeks, how often have you been bothered by any of the following problems?</td>
                                    </tr>
                                    {
                                        tableRow.length > 0 ?
                                            tableRow.map((item, i) => <tr key={i}>
                                                <td style={{ width: width > 900 ? "400px" : "360px" }}>{item.PHQ9Questionnaire_name}</td>
                                                <td>
                                                    <select defaultValue="0" name={item.id} onChange={(e) => { setTableValue({ ...tableValue, [e.target.name]: parseInt(e.target.value) }); }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        <option value="0">0- Not at all</option>
                                                        {
                                                            dropDownArray.map((item, i) => <option key={i} value={item.value}>{item.PHQ9QuestionnaireValue_name}</option>)
                                                        }
                                                    </select>
                                                </td>
                                            </tr>)
                                            :
                                            <i style={{ fontSize: "26px", marginLeft: "40%" }} class="fas fa-spinner fa-spin"></i>
                                    }
                                    <tr >
                                        <td className='phq-total'>Total score</td>
                                        <td>
                                            {total}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-4 col-3 overflow-hidden">
                        <div className="phq-value p-1">
                            <p>Use the following scale to choose the most appropriate answer: </p>
                            <div className="phq-value-container m-2">
                                <ul>
                                    <li>0- Not at all</li>
                                    <li>1- Several days</li>
                                    <li>2- More than half the days</li>
                                    <li>3- Nearly every days</li>
                                </ul>

                            </div>
                            <div className="phq-note position-absolute bottom-0">
                                <p className="">PHQ-9 score <i className="far fa-angle-right"></i>= 10: Likely major depression</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-8 col-9">
                        <div className="row mental-question-container">
                            <table className="phq-table">
                                <tbody>
                                    <tr >
                                        <td style={{ fontWeight: 500 }} colSpan={2}>If you have checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?</td>
                                    </tr>
                                    {
                                        tableRowBottom.length > 0 ?
                                            tableRowBottom.map((item, i) => <tr key={i}>
                                                <td style={{  width: width > 900 ? "400px" : "360px" }}>{item.PHQ9Questionnaire_name}</td>
                                                <td>
                                                    <select defaultValue="0" name={item.id} onChange={(e) => { setTableValueBotttom({ ...tableValueBottom, [e.target.name]: parseInt(e.target.value) }); }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        <option value="0">0- Not at all</option>
                                                        {
                                                            dropDownArrayBottom.map((item, i) => <option key={i} value={item.value}>{item.PHQ9QuestionnaireValue_name}</option>)
                                                        }
                                                    </select>
                                                </td>
                                            </tr>)

                                            :
                                            <i style={{ fontSize: "26px", marginLeft: "40%" }} class="fas fa-spinner fa-spin"></i>

                                    }
                                    <tr >
                                        <td className='phq-total'>Total score</td>
                                        <td>
                                            {totalBottom}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-4 col-3 overflow-hidden">
                        <div className="phq-value p-1">
                            <p>Use the following scale to choose the most appropriate answer: </p>
                            <div className="phq-value-container m-2">
                                <ul>
                                    <li>5 to 9 : Mild</li>
                                    <li>10 to 14 : Moderate</li>
                                    <li>15 to 19 : Moderately Severe</li>
                                    <li>20<i className="far fa-angle-right"></i>= : Severe</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="pedriatric_btn">
                    <button onClick={() => {
                        setTotal(0)
                        setTotalBottom(0)
                        setTableValue({})
                        setTableValueBotttom({})
                        props.closeModal()
                    }}
                        className="pedriatric_btn_left"
                    >
                        Cancel
                    </button>
                    <button onClick={phq9SaveData} className="pedriatric_btn_middle">
                        Save
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default PHQ;