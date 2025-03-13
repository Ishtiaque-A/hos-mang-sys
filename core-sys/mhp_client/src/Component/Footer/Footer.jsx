import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Modal from "react-modal";
import ReleaseNote from "./ReleaseNote";
import { useState } from "react";
import Security from "./Security";
import Privacy from "./Privacy";
import TermsAndConditions from "./TermsAndConditions";
import Payment from "./Payment";

const Footer = () => {
  const [releaseNoteModelOpen, setReleaseNoteModelOpen] = useState(false);
  const [privacyModelOpen, setPrivacyModelOpen] = useState(false);
  const [securityModelOpen, setSecurityModelOpen] = useState(false);
  const [termsModelOpen, setTermsModelOpen] = useState(false);
  const [paymentModelOpen, setPaymentModelOpen] = useState(false);
  const customStyles = {
    content: {
      top: "37%",
      left: "21%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "490px",
      padding: "10px",
      marginLeft: "38%",
    },
  };
  return (
    <div className="main-footer mt-2">
      <div className="footer-content row">
        <div className="col-lg-6">
          <strong>
            Copyright &copy; 2021-2025
            <Link tabIndex={-1} to={"/main"}>
              {'\u00A0'}SmartHealth{'\u00A0'}
            </Link>
          </strong>
          <p className="d-inline">
            All Rights Reserved. Developed by
            <a tabIndex={-1} target="_blank" href="https://zaimahtech.com/">
              Zaimah Technologies Ltd
            </a>
          </p>
        </div>
        <div className="col-lg-6">
          <div className="d-flex mt-2 mt-lg-0 justify-content-end align-items-center">
            {/* <b>Version </b>
                    <p className="d-inline"> 4.0.0 Last update: 18-04-2023</p> */}
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "end",
                margin: "0px 10px 0px 0px",
              }}
            >
              <li
                onClick={() => setPaymentModelOpen(true)}
                className="footer-list"
              >
                Payment Gateway
              </li>
              <li
                onClick={() => setPrivacyModelOpen(true)}
                className="footer-list"
              >
                Privacy
              </li>
              <li
                onClick={() => setSecurityModelOpen(true)}
                className="footer-list"
              >
                Security
              </li>
              <li
                onClick={() => setTermsModelOpen(true)}
                className="footer-list"
              >
                Terms & Conditions
              </li>
            </ul>
            <button
              tabIndex={-1}
              onClick={() => setReleaseNoteModelOpen(true)}
              className="btn btn-outline-success btn-sm ml-2"
            >
              Release Notes
            </button>
          </div>
        </div>

        {/* Release Note Modal  */}
        <Modal
          isOpen={releaseNoteModelOpen}
          onRequestClose={releaseNoteModelOpen}
          style={customStyles}
        >
          <ReleaseNote setReleaseNoteModelOpen={setReleaseNoteModelOpen} />
        </Modal>
        {/* Security Modal  */}
        <Modal
          isOpen={securityModelOpen}
          onRequestClose={securityModelOpen}
          style={customStyles}
        >
          <Security setSecurityModelOpen={setSecurityModelOpen} />
        </Modal>
        {/* Privacy Modal  */}
        <Modal
          isOpen={privacyModelOpen}
          onRequestClose={privacyModelOpen}
          style={customStyles}
        >
          <Privacy setPrivacyModelOpen={setPrivacyModelOpen} />
        </Modal>
        {/* Terms & Conditions Modal  */}
        <Modal
          isOpen={termsModelOpen}
          onRequestClose={termsModelOpen}
          style={customStyles}
        >
          <TermsAndConditions setTermsModelOpen={setTermsModelOpen} />
        </Modal>
        {/* Terms & Conditions Modal  */}
        <Modal
          isOpen={paymentModelOpen}
          onRequestClose={paymentModelOpen}
          style={customStyles}
        >
          <Payment setPaymentModelOpen={setPaymentModelOpen} />
        </Modal>
      </div>
    </div>
  );
};

export default Footer;
