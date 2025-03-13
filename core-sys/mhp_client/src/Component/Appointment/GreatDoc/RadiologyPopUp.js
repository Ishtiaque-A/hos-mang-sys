import React from "react";
import Radiology from "../Radiology/Radiology";
import { NewModal as ReactModal } from "../../../common/components/NewModal";
const RadiologyPopUp = (props) => {
  return (
    <>
      <ReactModal
        size="md"
        isOpen={props?.modalIsOpen}
        onClose={props?.closeModal}
      >
        <ReactModal.Header onClose={props?.closeModal}>
          <ReactModal.Title>Radiology Request</ReactModal.Title>
        </ReactModal.Header>
        <ReactModal.Body>
          <Radiology
            patient={props?.patient}
            isOpen={props?.modalIsOpen}
            closeModal={props?.closeModal}
            patient_id={props?.patient_id}
          />
        </ReactModal.Body>
      </ReactModal>
    </>
  );
};

export default RadiologyPopUp;
