import React, { useEffect } from "react";
import Modal from "react-modal";
import Family from "../../Patients/Family";
import "./GreatDoc.css";
import useResizeObserver from "../../../hooks/useResizeObserver";
const FamilyAndSocialHistoryModal = (props) => {
  const { width } = useResizeObserver();
  const customStyles = {
    content: {
      top: width > 900 ? "36%" : "17%",
      left: width > 900 ? "29%" : "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: width > 900 ? "80%" : "88%",
      height: "400px",
      padding: "10px",
      zIndex: "3000",
    },
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <Modal
      isOpen={props.familyHistoryModalIsOpen}
      onRequestClose={props.closeFamilyHistoryModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <span
        className="float-end"
        style={{ fontSize: "15px", cursor: "pointer" }}
        onClick={props.closeFamilyHistoryModal}
      >
        <i class="fal fa-times"></i>
      </span>{" "}
      <br />
      <Family patient_id={props.patient_id} />
    </Modal>
  );
};

export default FamilyAndSocialHistoryModal;
