import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import { useReactToPrint } from "react-to-print";
export default function LabPointsReportDetails() {
  const [data, setData] = useState([]);
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState({});
  const { id } = useParams();
  const [grandTotal, setGrandTotal] = useState(0);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`plan-report-details/${id}`)
      .then((res) => {
        setData(res?.data?.invoice || []);
        setGrandTotal(res?.data?.grand_total || 0);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    axios.get(`doctors/${id}`).then((res) => {
      setDoctor(res?.data?.doctors[0] || {});
    });
  }, [id]);
  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleFilter = () => {
    axios.post(`filter-plan-report-details/${id}`, filter).then((res) => {
      setData(res?.data?.invoice || []);
      setGrandTotal(res?.data?.grand_total || 0);
    });
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <div className="shadow-sm p-2 mb-3 bg-body lab-points-plan rounded mt-1">
        <div className="row">
          <div className="col-5">
            <h6 className="mt-1 mx-2">Point Report Details</h6>
          </div>
          <div className="col-7">
            <div className="row">
              <div className="col-5 row">
                <div className="col-3">
                  <label htmlFor="">From</label>
                </div>
                <div className="col-9">
                  <ReactDatePicker
                    placeholderText="From Date"
                    selected={
                      filter.startDate ? new Date(filter.startDate) : new Date()
                    }
                    dateFormat={"dd/MM/yyyy"}
                    name="requisition_no"
                    onChange={(d) =>
                      setFilter({
                        ...filter,
                        startDate: d
                          ? moment(d).format("YYYY-MM-DD")
                          : new Date(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-5 row">
                <div className="col-3">
                  <label htmlFor="" className="ms-3">
                    To
                  </label>
                </div>
                <div className="col-9">
                  <ReactDatePicker
                    placeholderText="To Date"
                    selected={
                      filter.endDate ? new Date(filter.endDate) : new Date()
                    }
                    dateFormat={"dd/MM/yyyy"}
                    name="requisition_no"
                    onChange={(d) =>
                      setFilter({
                        ...filter,
                        endDate: d
                          ? moment(d).format("YYYY-MM-DD")
                          : new Date(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-2 rx-one-button-group">
                <button onClick={handleFilter} className="btn">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div ref={componentRef} className="plan-report">
          <div className="d-flex justify-content-between">
            <h6 className="">Doctor Points Statement</h6>
            <p className="">
              For the period of :{" "}
              {moment(data[0]?.created_at).format("DD-MM-YYYY")} to{" "}
              {moment(data[data?.length - 1]?.created_at).format("DD-MM-YYYY")}
            </p>
          </div>
          <h6 className="text-center">
            {doctor?.title?.title_name} {doctor?.fullName}
          </h6>
          <p className="text-center">
            {doctor?.academic?.map((item) => (
              <span key={item.id}>{item?.degree_id},</span>
            ))}
          </p>
          <div className="rx-one-button-group point-report-print-btn">
            <button onClick={handlePrint} className="btn float-end mb-2">
              Print
            </button>
          </div>
          <table>
            <tr className="report-header-bg">
              <td>Invoice</td>
              <td>Date</td>
              <td>Test Name</td>
              <td className="text-end">Test Fee</td>
              <td className="text-end">Total Bill</td>
              <td className="text-end">Discount</td>
              <td className="text-end">Point %</td>
              <td className="text-end">Point</td>
              <td className="text-end">Total Point</td>
            </tr>
            {data?.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <td className="fw-bold">{item?.invoiceNo}</td>
                    <td className="fw-bold">
                      {moment(item?.created_at).format("DD-MM-YYYY")}
                    </td>
                    <td></td>
                    <td></td>
                    <td className="fw-bold text-right">{item?.totalBill}</td>
                    <td className="fw-bold text-right">
                      {item?.total_discount}
                    </td>
                    <td className="fw-bold text-right"></td>
                    <td></td>
                    <td className="fw-bold text-right">{item?.point_amount}</td>
                  </tr>
                  {item?.details?.map((test, index) => {
                    return (
                      <tr key={index}>
                        <td></td>
                        <td></td>
                        <td>{test?.testName}</td>
                        <td className="text-right">{test?.fee}</td>
                        <td></td>
                        <td className="text-right">{test?.discount}</td>
                        <td className="text-right">{test?.point_percent}</td>
                        <td className="text-right">{test?.point}</td>
                        <td></td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
            <tr>
              <td colSpan={8} className="text-right fw-bold">
                Grand Total
              </td>
              <td className="text-right fw-bold">{grandTotal}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
