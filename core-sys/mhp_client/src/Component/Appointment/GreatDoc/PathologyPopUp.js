import React from "react";
// import Modal from "react-modal";
import Pathology from "./Pathology";
import { Modal as ReactModal } from "../../../common/components/Modal.jsx";
const PathologyPopUp = (props) => {
  return (
    <>
      <ReactModal isOpen={props?.modalIsOpen} onClose={props?.closeModal}>
        <ReactModal.Header onClose={props?.closeModal}>
          <ReactModal.Title>Pathology Request</ReactModal.Title>
        </ReactModal.Header>
        <ReactModal.Body>
          <Pathology
            closeModal={props.closeModal}
            patient_id={props.patient_id}
            patient={props.patient}
            isOpen={props.modalIsOpen}
          />
        </ReactModal.Body>
      </ReactModal>
      {/* <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }}
          onClick={props.closeModal}
        >
          <RxCross2 />
        </span>
        <h6 style={{ fontSize: "14px" }}>Pathology Request</h6>
      </Modal> */}
    </>
  );
};

export default PathologyPopUp;
