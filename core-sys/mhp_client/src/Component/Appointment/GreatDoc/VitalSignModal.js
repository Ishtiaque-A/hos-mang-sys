import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./GreatDoc.css";
import axios from "axios";
import { NewModal as ReactModal } from "../../../common/components/NewModal";
const VitalSignModal = (props) => {
  const [vitalSetup, setVitalSetup] = useState([]);
  useEffect(() => {
    Modal.setAppElement("body");
    axios.get('vital-sign').then((res) => {
      setVitalSetup(res?.data?.vitalSign)
    })
  }, []);
  return (
    <div className="vital-modal">
      <ReactModal size="lg" isOpen={props.modalIsOpen} onClose={props.closeModal}>
        <ReactModal.Header onClose={props.closeModal}>
          <ReactModal.Title>
            Patients Vital Signs
          </ReactModal.Title>
        </ReactModal.Header>
        <ReactModal.Body>
          <div style={{ minHeight: "400px" }}>
            <div className=" all-vital-sign-container">
              {props?.vitalSign?.length > 0 ? (
                <table className="vital-sign-modal-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      {
                        vitalSetup.map((item, i) => {
                          return (
                            <th key={i}>{item.name}</th>
                          )
                        })
                      }

                    </tr>
                  </thead>
                  <tbody>
                    {
                      props?.vitalSign?.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item.date}</td>
                            {
                              item?.vital_signs?.map((vt, i) => <td key={i}>{vt?.value ? vt?.value : "-"}</td>
                              )
                            }

                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

              ) : (
                <h6 className="text-danger text-center">
                  No vital sign added !
                </h6>
              )}
            </div>
          </div>
        </ReactModal.Body>
      </ReactModal>

    </div>
  );
};

export default VitalSignModal;
