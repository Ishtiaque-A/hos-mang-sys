import "./AgentQRcode.css";
import bpCheck from "../../Images/bp-check.png";
import bloodCollection from "../../Images/blood-collection.png";
import diabeticCheck from "../../Images/diabetes-check.png";
import QRCode from "react-qr-code";
import {
  AiOutlineShareAlt,
  AiOutlineMail,
  AiOutlinePrinter,
} from "react-icons/ai";
import { MdOutlineTextsms } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import AgentQRCodePrint from "./AgentQRCodePrint";
const AgentQRcode = ({ agentInfo, imgUrl }) => {
  const agentQRCodeRef = useRef();
  const handleQRCodePrint = useReactToPrint({
    content: () => agentQRCodeRef.current,
  });
  const specialList = [
    {
      _id: "892jdf",
      name: "Blood Collection",
      icon: bloodCollection,
    },
    {
      _id: "mj43jdf",
      name: "Diabetic Measurement",
      icon: diabeticCheck,
    },
    {
      _id: "88jkd2jdf",
      name: "BP Check",
      icon: bpCheck,
    },
    {
      _id: "dsf892jdf",
      name: "Blood Collection",
      icon: bloodCollection,
    },
    {
      _id: "mj424df",
      name: "Diabetic Measurement",
      icon: diabeticCheck,
    },
    {
      _id: "88j32jdf",
      name: "BP Check",
      icon: bpCheck,
    },
  ];
  const agentNumber = "01234567890";
  return (
    <>
      <div className="custom-card agent-qr-container">
        {/* button container */}
        <div className="d-flex justify-content-end align-items-center p-2">
          <button
            className="bg-white border-0 px-1 rounded"
            data-toggle="tooltip"
            data-placement="top"
            title="Share"
          >
            <AiOutlineShareAlt />
          </button>
          <button
            className="bg-white border-0 px-1 rounded"
            data-toggle="tooltip"
            data-placement="top"
            title="SMS"
          >
            <MdOutlineTextsms />
          </button>
          <button
            className="bg-white border-0 px-1 rounded"
            data-toggle="tooltip"
            data-placement="top"
            title="Email"
          >
            <AiOutlineMail />
          </button>
          <button
            onClick={handleQRCodePrint}
            className="bg-white border-0 px-1 rounded"
            data-toggle="tooltip"
            data-placement="top"
            title="Print"
          >
            <AiOutlinePrinter />
          </button>
        </div>
        {/* service list */}
        <div className="main-content-area">
          <div className="d-flex justify-content-between align-items-center mb-0">
            {specialList.map((list) => (
              <article key={list._id}>
                <img
                  className="specilist-icon"
                  src={list.icon}
                  alt={list.icon}
                />
                <p className="service-name">{list.name}</p>
              </article>
            ))}
          </div>
          <hr className="m-0 p-0" />
          {/* agent info */}
          <div className="d-flex justify-content-between pt-1">
            <div className="w-50 d-flex justify-content-start">
              <div>
                {
                  imgUrl ?
                    <img className="agent-img" src={imgUrl} alt="" />
                    :
                    <img className="agent-img" src={`${global.img_url}/labAgent/images/${agentInfo?.image}`} alt="" />
                }
                <p className="mb-0">
                  <small>{agentInfo?.name}</small>
                </p>
              </div>
            </div>
            <div className="w-50">
              {/* details content */}
            </div>
          </div>
          <h6>Agent Account Number</h6>
          {
            agentInfo?.mobilePhone &&
            <div className="d-flex justify-content-between align-items-center my-2">
              {agentInfo?.mobilePhone.split("").map((num, index) => (
                <div className="box" key={index}>
                  <span className="box-number"> {num}</span>
                </div>
              ))}
            </div>
          }
        </div>
        {/* QR Code */}
        {
          agentInfo?.mobilePhone &&
          <div className="generate-qr-code custom-card">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={agentInfo?.mobilePhone}
              level={"Q"}
              viewBox={`0 0 256 256`}
            />
          </div>
        }
        <div className="qr-footer-content">
          <p className="mb-0 pb-0">Please Scan the QR Code</p>
          <p className="fw-bold p-0 m-0">GREAT PHARMA AGENT</p>
        </div>
      </div>
      {/* print out agent qr code */}
      <div ref={agentQRCodeRef}>
        <AgentQRCodePrint specialList={specialList} agentNumber={agentInfo?.mobilePhone} />
      </div>
    </>
  );
};

export default AgentQRcode;
