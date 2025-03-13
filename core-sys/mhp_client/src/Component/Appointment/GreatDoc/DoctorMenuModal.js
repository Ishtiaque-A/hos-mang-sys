import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import docMenu1 from "../../../Images/g-doc-menu1.png";
import docMenu2 from "../../../Images/g-doc-menu2.png";
import docMenu4 from "../../../Images/g-doc-menu4.png";
import docMenu5 from "../../../Images/g-doc-menu5.png";
import modalIcon1 from "../../../Images/doc-menu-mdal1.png";
import modalIcon2 from "../../../Images/doc-menu-mdal2.png";
import modalIcon3 from "../../../Images/doc-menu-mdal3.png";
import modalIcon4 from "../../../Images/doc-menu-mdal4.png";
import modalIcon5 from "../../../Images/doc-menu-mdal5.png";
import modalIcon6 from "../../../Images/doc-menu-mdal6.png";
import modalIcon7 from "../../../Images/doc-menu-mdal7.png";
import modalIcon8 from "../../../Images/bed.png";
import modalIcon11 from "../../../Images/doc-menu-mdal8.png";
import modalIcon9 from "../../../Images/doc-menu-mdal9.png";
import modalIcon10 from "../../../Images/pediatric examination.png";
import medical_certificate from "../../../Images/medical_certificate.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Reminders from "./Reminders";
import ContactModal from "./ContactModal";
import axios from "axios";
// import DiabeticManagement from "./DiabeticManagement";
import ReferrelLetter from "./ReferrelLetter";
import ProcedureReport from "./ProcedureReport";
import MedicalCertificate from "./MedicalCertificate";
import Select from "react-select";
import PaediatricAllData from "./HistoryAndExamination/Paediatric_examination/PaediatricAllData";
import PhysicalActivityAllData from "./HistoryAndExamination/PhysicalActivityAllData";
import AntenatalVisitsAllData from "./AntenatalVisitsAllData";
import PatientEducation from "./PatientEducation";
import DiabeticManagementAllData from "./DiabeticManagementAllData";
import { LiaTimesCircle } from "react-icons/lia";
import useResizeObserver from "../../../hooks/useResizeObserver";
import Swal from "sweetalert2";
import { NewModal } from "../../../common/components/NewModal";
import DischargeSummary from "./DischargeSummary";
import DoctorRound from "./DoctorRound";

const DoctorMenuModal = (props) => {
  const { width } = useResizeObserver();
  const customStylesDoc = {
    content: {
      top: "36%",
      left: "27%",
      right: "auto",
      // bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
      height: "180px",
      padding: "5px",
      overflow: "hidden",
    },
  };
  const [characters, updateCharacters] = useState([
    {
      id: 1,
      detail: "Contacts",
      image: modalIcon1,
    },
    {
      id: 2,
      detail: "Patient Education",
      image: modalIcon2,
    },
    {
      id: 4,
      detail: "Physical Activity Prescription",
      image: modalIcon4,
    },
    {
      id: 5,
      detail: "Diabetic Management",
      image: modalIcon5,
    },
    {
      id: 6,
      detail: "Antenatal Visits",
      image: modalIcon6,
    },
    // {
    //   id: 8,
    //   detail: "Reminders",
    //   image: modalIcon8,
    // },
    {
      id: 10,
      detail: "Paediatric examination",
      image: modalIcon10,
    },
    {
      id: 11,
      detail: "Referral Letter",
      image: docMenu5,
    },
    {
      id: 12,
      detail: "Operation Report",
      image: docMenu1,
    },
    {
      id: 13,
      detail: "Discharge Summary",
      image: modalIcon8,
    },
    {
      id: 14,
      detail: "Morning Round",
      image: modalIcon11,
    },
  ]);

  const [upcomming, setupcomming] = useState([
    {
      id: 3,
      detail: "Health Summary",
      image: modalIcon3,
    },

    {
      id: 7,
      detail: "Operation List",
      image: modalIcon7,
    },

    {
      id: 9,
      detail: "Converters",
      image: modalIcon9,
    },
  ]);
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  // Reminder Modal

  const Styles = {
    content: {
      top: "36%",
      left: "30%",
      height: "80vh",
      width: "65%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      overflow: "hidden",
    },
  };
  // const StylesPEM = {
  //     content: {
  //         top: '45%',
  //         left: '33%',
  //         height: '70vh',
  //         width: '60%',
  //         transform: 'translate(-50%, -50%)',
  //         overflowX: "hidden"
  //     },
  // };
  const StylesPdfPreview = {
    content: {
      top: "35%",
      left: "21%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "79%",
      height: "85%",
      marginLeft: "38%",
    },
  };
  const Styles1 = {
    content: {
      top: "36%",
      left: "30%",
      height: "500px",
      width: "80%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
    },
  };
  const StylesProcedure = {
    content: {
      top: width > 900 ? "36%" : "35%",
      left: width > 900 ? "30%" : "20%",
      height: "500px",
      padding: "5px",
      width: width > 900 ? "70%" : "100%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(243, 242, 239)",
    },
  };

  const [modalRemindarIsOpen, setModalRemindarIsOpen] = useState(false);
  const [contactModalIsOpen, setContactModalIsOpen] = useState(false);

  const [refferalLeterModel, setrefferalLeterModel] = useState(false);
  const [doctorSelect, setDoctorSelect] = useState(false);

  // procedure report
  const [procedureReportModel, setProcedureReportModel] = useState(false);

  function closeRemindarModal() {
    setModalRemindarIsOpen(false);
  }

  // antinatal visits

  const [antenatalModalIsOpen, setAntenatalModalIsOpen] = React.useState(false);
  function closeAntenataModal() {
    setAntenatalModalIsOpen(false);
  }

  // Physical Activity Advice
  const [modalPhysicalActivityIsOpen, setModalPhysicalActivityIsOpen] =
    useState(false);

  // Pedriatic examination

  const [modalPaediatricExaminationIsOpen, setPaediatricExaminationIsOpen] =
    useState(false);

  const [pbanModelShow, setpbanModelShow] = useState(false);

  function closeContactModal() {
    setContactModalIsOpen(false);
  }

  const [doctor, setDoctor] = useState("");
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    axios.get("/all-contact").then((res) => {
      setContactList(res.data.data);
    });
  }, []);

  const [modalDiabeticManagementIsOpen, setDiabeticManagementIsOpen] =
    useState(false);

  function closeDiabeticManagementModal() {
    setDiabeticManagementIsOpen(false);
  }
  const [MSModelShow, setMSModelShow] = useState(false);
  const [dischargeModalOpen, setDischargeModalOpen] = useState(false);
  const [roundModal, setRoundModal] = useState(false);

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={{
        content: {
          top: width > 900 ? "36%" : "24%",
          left: width > 900 ? "30%" : "22%",
          height: width > 900 ? "350px" : "400px",
          width: width > 900 ? "900px" : "90%",
          padding: "15px",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          position: "relative",
        },
      }}
      contentLabel="Example Modal"
      className="MenuModal"
      overlayClassName="Overlay"
    >
      <div
        style={{
          backgroundColor: "transparent",
        }}
        className="col-12 doctor-menu-container doctor-modal"
      >
        <span
          //   className="float-end"
          style={{
            fontSize: "15px",
            cursor: "pointer",
            position: "absolute",
            top: "-14px",
            right: "-10px",
          }}
          onClick={props.closeModal}
        >
          <LiaTimesCircle size={20} />
        </span>
        <nav>
          <ul
            style={{
              padding: "7px",
              background: "#f8f9fa",
              borderRadius: "10px",
            }}
          >
            {/* <li className='me-4'> <img src={docMenu1} alt="" className='me-3' /> Appointment </li> */}
            <li className="me-4">
              <img src={docMenu2} alt="" className="me-3" />
              Medication Chart
            </li>
            {/* <li className='me-4'><img src={docMenu3} alt="" className='me-3' />Result</li> */}
            <li className="me-4">
              <img src={docMenu4} alt="" className="me-3" />
              MIMS
            </li>
            <li onClick={() => setDoctorSelect(true)} className="me-4">
              <img src={docMenu5} alt="" className="me-3" />
              Referral Letter
            </li>
            <li onClick={() => setMSModelShow(true)} className="me-4">
              <img src={medical_certificate} alt="" className="me-3" />
              Medical Certificate
            </li>

            <Modal
              isOpen={MSModelShow}
              onRequestClose={MSModelShow}
              style={StylesPdfPreview}
            >
              <MedicalCertificate setMSModelShow={setMSModelShow} />
            </Modal>
            <Modal
              isOpen={refferalLeterModel}
              onRequestClose={() => setrefferalLeterModel(false)}
              style={StylesPdfPreview}
            >
              <ReferrelLetter
                doctor={doctor}
                setrefferalLeterModel={setrefferalLeterModel}
                patient={props.patient}
              />
            </Modal>
            <Modal
              isOpen={doctorSelect}
              onRequestClose={() => {
                setDoctorSelect(false);
                setDoctor("");
              }}
              style={customStylesDoc}
            >
              <div className="p-2">
                <Select
                  options={contactList}
                  onChange={(e) => setDoctor(e)}
                  getOptionLabel={(unPaidInvoices) =>
                    `${unPaidInvoices?.contact_name}`
                  }
                  getOptionValue={(unPaidInvoices) =>
                    `${unPaidInvoices?.contact_name}`
                  }
                />

                <div className="rx-one-button-group d-flex justify-content-center mt-3">
                  <button
                    onClick={() => {
                      if (doctor) {
                        setrefferalLeterModel(true);
                        setDoctorSelect(false);
                      } else {
                        Swal.fire(
                          "Warning!",
                          "Please select doctor from the list",
                          "warning"
                        );
                      }
                    }}
                    className="btn me-2"
                  >
                    Create referral letter
                  </button>
                  <button
                    onClick={() => {
                      setDoctorSelect(false);
                      setDoctor("");
                    }}
                    className="btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
            {/* // operation report */}
            <NewModal
              isOpen={procedureReportModel}
              size="lg"
              onClose={() => setProcedureReportModel(false)}
            >
              <NewModal.Header onClose={() => setProcedureReportModel(false)}>
                <h5>Operation Report</h5>
              </NewModal.Header>

              <NewModal.Body>
                <ProcedureReport
                  patient={props.patient}
                  setProcedureReportModel={setProcedureReportModel}
                />
              </NewModal.Body>
            </NewModal>
            {/* // operation report */}
            {/* // operation report */}
            <NewModal
              isOpen={dischargeModalOpen}
              size="lg"
              onClose={() => setDischargeModalOpen(false)}
            >
              <NewModal.Header onClose={() => setDischargeModalOpen(false)}>
                <h5>Discharge Summary</h5>
              </NewModal.Header>

              <NewModal.Body>
                <DischargeSummary
                  patient={props?.patient}
                  reason={props?.reason}
                  setDischargeModalOpen={setDischargeModalOpen}
                />
              </NewModal.Body>
            </NewModal>
            {/* // operation report */}
            {/* // Round Modal */}
            <NewModal
              isOpen={roundModal}
              size="full"
              onClose={() => setRoundModal(false)}
            >
              <NewModal.Header onClose={() => setRoundModal(false)}>
                <h5>Doctor Round</h5>
              </NewModal.Header>

              <NewModal.Body className="modal-body-full">
                <DoctorRound
                  patient={props?.patient}
                  reason={props?.reason}
                  setRoundModal={setRoundModal}
                  appId={props?.appId}
                  doctorId={props?.docData?.id}
                />
              </NewModal.Body>
            </NewModal>
            {/* // Round Modal */}

            {/* Antenatal Visits */}
            <Modal
              isOpen={antenatalModalIsOpen}
              onRequestClose={closeAntenataModal}
              style={Styles}
            >
              <span
                className="float-end"
                style={{ fontSize: "15px", cursor: "pointer" }}
                onClick={closeAntenataModal}
              >
                <LiaTimesCircle size={20} />
                {/* <i className="fal fa-times"></i> */}
              </span>
              <h6 style={{ fontSize: "14px" }}>Antenatal Visit</h6>
              <hr />
              {/* <AntenatalVisits patient_id={props.patient_id} closeAntenataModal={closeAntenataModal}></AntenatalVisits> */}
              <AntenatalVisitsAllData patient_id={props.patient_id} />
            </Modal>

            {/*Physical Activity Advice */}
            <Modal
              isOpen={modalPhysicalActivityIsOpen}
              onRequestClose={() => setModalPhysicalActivityIsOpen(false)}
              style={Styles1}
              contentLabel="Physical Activity Advice"
            >
              <span
                className="float-end"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setModalPhysicalActivityIsOpen(false)}
              >
                <LiaTimesCircle size={20} />
                {/* <i
                  onClick={() => setModalPhysicalActivityIsOpen(false)}
                  className="fal fa-times"
                ></i> */}
              </span>
              <h6 style={{ fontSize: "14px" }}>Physical Activity Advice</h6>
              <hr />
              <PhysicalActivityAllData patient_id={props.patient_id} />
            </Modal>
            <Modal
              isOpen={modalPaediatricExaminationIsOpen}
              style={Styles}
              contentLabel="Example Modal"
              shouldCloseOnOverlayClick={true}
            >
              <span
                className="float-end"
                onClick={() => setPaediatricExaminationIsOpen(false)}
                style={{
                  cursor: "pointer",
                }}
              >
                <LiaTimesCircle size={20} />
                {/* <i
                  className="fal fa-times"
                  onClick={() => setPaediatricExaminationIsOpen(false)}
                  style={{ cursor: "pointer" }}
                ></i> */}
              </span>
              <h6 style={{ fontSize: "14px" }}>Paediatric examination</h6>
              <hr />
              <PaediatricAllData patient_id={props.patient_id} />
            </Modal>
            <Modal
              isOpen={pbanModelShow}
              onRequestClose={pbanModelShow}
              style={{
                content: {
                  padding: "10px",
                  borderRadius: "7px",
                  overflow: "hidden",
                },
              }}
              className={"PatientEducationModal"}
              overlayClassName={"Overlay"}
              contentLabel="Example Modal"
            >
              <span
                className="float-end"
                style={{ cursor: "pointer" }}
                onClick={() => setpbanModelShow(false)}
              >
                <LiaTimesCircle size={20} />
                {/* <i
                  className="fal fa-times"
                  onClick={() => setpbanModelShow(false)}
                  style={{ cursor: "pointer" }}
                ></i> */}
              </span>
              <h6
                style={{
                  fontSize: "14px",
                  marginBottom: "0px",
                  paddingBottom: "0px",
                }}
              >
                Patient education material
              </h6>
              <hr />
              <PatientEducation />
            </Modal>

            <Modal
              isOpen={contactModalIsOpen}
              onRequestClose={closeContactModal}
              // style={Styles}
              contentLabel="Example Modal"
              className={"Modal"}
              overlayClassName={"Overlay"}
            >
              <span
                className="float-end"
                onClick={closeContactModal}
                style={{ cursor: "pointer" }}
              >
                <LiaTimesCircle size={20} />
              </span>
              <h6 style={{ fontSize: "14px" }}>Patient referral contact</h6>

              <ContactModal closeContactModal={closeContactModal} />
            </Modal>
            <Modal
              isOpen={modalDiabeticManagementIsOpen}
              onRequestClose={closeDiabeticManagementModal}
              style={Styles}
              contentLabel="Example Modal"
            >
              <span
                className="float-end"
                onClick={closeDiabeticManagementModal}
                style={{
                  cursor: "pointer",
                }}
              >
                <LiaTimesCircle size={20} />
                {/* <i
                  className="fal fa-times"
                  onClick={closeDiabeticManagementModal}
                  style={{ cursor: "pointer" }}
                ></i> */}
              </span>
              <h6 style={{ fontSize: "14px" }}>Diabetic Cycle of Care</h6>
              <hr />

              <DiabeticManagementAllData patient_id={props.patient_id} />
              {/* <DiabeticManagement closeDiabeticManagementModal={closeDiabeticManagementModal} patient_id={props.patient_id}></DiabeticManagement> */}
            </Modal>
          </ul>
        </nav>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" direction="horizontal">
          {(provided) => (
            <div
              className="doctor-modal-menu-content"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="row">
                {characters.map(({ id, detail, image }, index) => {
                  return (
                    <Draggable
                      key={id}
                      draggableId={id?.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          onClick={() => {
                            if (id === 8) {
                              setModalRemindarIsOpen(true);
                            }
                            if (id === 6) {
                              setAntenatalModalIsOpen(true);
                            }

                            if (id === 4) {
                              setModalPhysicalActivityIsOpen(true);
                            }
                            if (id === 10) {
                              setPaediatricExaminationIsOpen(true);
                            }
                            if (id === 2) {
                              setpbanModelShow(true);
                            }
                            if (id === 1) {
                              setContactModalIsOpen(true);
                            }

                            if (id === 5) {
                              setDiabeticManagementIsOpen(true);
                            }
                            if (id === 11) {
                              setDoctorSelect(true);
                            }
                            if (id === 12) {
                              setProcedureReportModel(true);
                            }
                            if (id === 13) {
                              setDischargeModalOpen(true);
                            }
                            if (id === 14) {
                              setRoundModal(true);
                            }
                          }}
                          className="col-2 mb-2 text-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img src={image} alt={`${detail}_image`} />
                          <p>{detail}</p>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <h6 style={{ marginBottom: "24px" }}>Upcoming</h6>
      <div className="doctor-modal-menu-content" style={{ color: "gray" }}>
        <div className="row">
          {upcomming.map(({ id, detail, image }, index) => {
            return (
              <div key={index} className="col-2 mb-2 text-center">
                <img src={image} alt={`${detail}_image`} />
                <p>{detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default DoctorMenuModal;
