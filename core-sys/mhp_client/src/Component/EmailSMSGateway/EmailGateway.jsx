import React from "react";
import EmailSMSGatewaySidebar from "./EmailSMSGatewaySidebar";

const EmailGateway = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <EmailSMSGatewaySidebar />
        </div>
        <div className="col-md-9 mt-2">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">Email Gateway Setup</h6>
            </div>
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGateway;
