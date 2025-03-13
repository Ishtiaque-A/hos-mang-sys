import "./AgentQRcode.css";
import "./AgentQRCodePrint.css";
import QRCode from "react-qr-code";

const AgentQRcode = ({ specialList, agentNumber }) => {
  return (
    <div className="custom-card agent-qr-container agent-qr-print">
      <div className="main-content-area">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          placeat blanditiis fugiat.
        </p>
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-0">
          {specialList.map((list) => (
            <article key={list._id}>
              <img className="specilist-icon" src={list.icon} alt={list.icon} />
              <p>{list.name}</p>
            </article>
          ))}
        </div>
        <h6>Agent Account Number</h6>
        {
          agentNumber &&
          <div className="d-flex justify-content-between align-items-center my-2">
            {agentNumber.split("").map((num, index) => (
              <div className="box" key={index}>
                <span className="box-number"> {num}</span>
              </div>
            ))}
          </div>
        }
      </div>
      {/* QR Code */}
      {
        agentNumber &&
        <div className="generate-qr-code agent-qr-code-print custom-card">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={agentNumber}
            level={"Q"}
            viewBox={`0 0 256 256`}
          />
        </div>
      }
      <div className="qr-print-footer">
        <p className="mb-0 pb-0">Please Scan the QR Code</p>
        <p className="fw-bold p-0 m-0">GREAT PHARMA AGENT</p>
      </div>
    </div>
  );
};

export default AgentQRcode;
