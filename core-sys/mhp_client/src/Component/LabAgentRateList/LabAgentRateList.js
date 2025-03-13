import React from 'react';
import "./LabAgentRateList.css"
import { Col, Row, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { LinkOff } from '@material-ui/icons';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import jsPDF from 'jspdf';
const LabAgentRateList = () => {
    const [rateListCategory, setRateListCategory] = useState([])
    const [rateList, setRateList] = useState([])
    const [activeCategory, setActiveCategory] = useState(0)
    const fetchRateList = (id, index) => {
        axios.get(`/rate-list-by/${id}`).then(res => {
            if (res.data.status === 200) {
                setRateList(res.data.rateList);
            }

        });
        setActiveCategory(index)
    }
    useEffect(() => {
        axios.get(`/lab-agent-rate-list-category`).then(res => {
            if (res.data.status === 200) {
                setRateListCategory(res.data.category);
                fetchRateList(res.data.category[0].id, 0)
            }
        });
    }, []);
    // print table
    const componentRef = useRef();
    const handleRateListPrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // export
    
    return (
        <section className="m-2">
            <div className="patients-head custom-card">
                <h6 className="ml-3 text-start mb-1 text-login py-2">
                    Rate List
                </h6>
            </div>
            <Row className='row row-cols-6 mt-2'>
                {
                    rateListCategory.map((link, index) => <Col onClick={() => fetchRateList(link.id, index)} key={index} className="mb-2">
                        <div className={`custom-link ${index === activeCategory && "active-agent-category"}`}>
                            <div className='d-flex justify-content-between align-items-center p-2'>
                                <p className='link-name mb-0'>{link.name}</p>
                                <img className='link-icon' src={`${global.img_url}/labAgent/images/${link.icon}`} alt={link.name} />
                            </div>
                        </div>
                    </Col>)
                }

            </Row>
            <Table className="bg-white my-2 rounded">
                <tbody>
                    <tr className="table-head ">
                        <td className="fw-bold">Item Code</td>
                        <td className="fw-bold">Category</td>
                        <td className="fw-bold">Test Name</td>
                        <td className="fw-bold">Gender</td>
                        <td className="fw-bold">Fee</td>
                        <td className="fw-bold">Revenue</td>
                        <td className="fw-bold">Pre Booking</td>
                        <td className="fw-bold">Details</td>
                    </tr>
                    {rateList.map((test) => {
                        return (
                            <tr key={test._id}>
                                <td>{test.code}</td>
                                <td>{test.rate_list_category?.name}</td>
                                <td>{test.name}</td>
                                <td>{test.patient_birth_sex?.birth_sex_name}</td>
                                <td>{test.fee}</td>
                                <td>{test.revenue} <span>%</span> </td>
                                <td>{test.preBooking}</td>
                                <td>{test.details}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <div className="d-flex justify-content-end align-items-center gap-4 mt-2">
                <button className="custom-bg-color text-white border-0 px-2 py-1 rounded">
                    Share
                </button>
                <button className="custom-bg-color text-white border-0 px-2 py-1 rounded">
                    Export
                </button>
                <button
                    className="custom-bg-color text-white border-0 px-2 py-1 rounded"
                    onClick={handleRateListPrint}
                >
                    Print
                </button>
            </div>
            <div ref={componentRef} className="print-rate-list-table">
                <Table className="bg-white my-2 rounded ">
                    <tbody>
                        <tr className="">
                            <td className="fw-bold">Item Code</td>
                            <td className="fw-bold">Category</td>
                            <td className="fw-bold">Test Name</td>
                            <td className="fw-bold">Gender</td>
                            <td className="fw-bold">Fee</td>
                            <td className="fw-bold">Revenue</td>
                            <td className="fw-bold">Pre Booking</td>
                            <td className="fw-bold">Details</td>
                        </tr>
                        {rateList.map((test) => {
                            return (
                                <tr key={test._id}>
                                    <td>{test.code}</td>
                                    <td>{test.rate_list_category?.name}</td>
                                    <td>{test.name}</td>
                                    <td>{test.patient_birth_sex?.birth_sex_name}</td>
                                    <td>{test.fee}</td>
                                    <td>{test.revenue} <span>%</span> </td>
                                    <td>{test.preBooking}</td>
                                    <td>{test.details}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

        </section>
    );
};

export default LabAgentRateList;
