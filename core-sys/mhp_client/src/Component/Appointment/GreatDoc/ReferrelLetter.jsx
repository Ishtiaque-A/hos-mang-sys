import JoditEditor from "jodit-react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import CreateTemplate from "./CreateTemplate";
import Modal from "react-modal";
import "./ReferalLetter.css";
import axios from "axios";
import { toast } from "react-toastify";
import { LiaTimesCircle } from "react-icons/lia";
import { FaCheck } from "react-icons/fa";
import { TbDeviceFloppy } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";

export default function ReferrelLetter(props) {
  const { patient_first_name, patient_last_name, id } = props.patient;
  console.log(props.doctor, "doctor refferer");

  const [note, setNote] = useState("");
  const editor = useRef(null);
  const [customTem, setcustomTem] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [updateTemDrop, setupdateTemDrop] = useState();
  const [pastHistory, setPastHistory] = useState([]);
  const [reactionTableData, setReactionTableData] = useState([]);
  useEffect(() => {
    axios.get("get-custom-template").then((res) => {
      setcustomTem(res.data.tem);
    });
    axios.get(`last-prescription/${id}`).then((res) => {
      if (res.status === 200) {
        setPrescription(res.data.data.prescription);
      }
    });
    if (id) {
      axios.get(`/past-history/${id}`).then((res) => {
        setPastHistory(res.data.past_history);
      });
    }
    if (id) {
      axios
        .get(`/added-reaction/${id}`)
        .then((res) => setReactionTableData(res.data.reaction));
    }
  }, [updateTemDrop, id]);

  const [updateState, setupdateState] = useState();
  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));
    setNote(
      `<p style="text-align: right; line-height: 1;"><img src="${
        global.img_url
      }/logo/logo.png" alt="" width="91" style="float: left;" height="63"></p>
      <p style="text-align: right; line-height: 1;"><span style="color: rgb(106, 168, 79);"><strong style="font-family: Tahoma, Geneva, sans-serif;">&nbsp; Macrohealthplus Medical Centre</strong></span></p>
      <p style="text-align: right; line-height: 1;"><span style="color: rgb(106, 168, 79);">+01 234 567 889 | info@macrohealthplus.com</span></p>
      <hr>
      <p><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong>${moment(
        Date.now()
      ).format("Do MMM YYYY")}</strong></span></p>
      <p><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong></strong></span><br><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong>To:</strong> ${
        props.doctor?.contact_name
      }</span>
      <br><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">${
        props.doctor?.address
      }</span>  
</p>
      <p><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong></strong></span><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong>Re:</strong> ${
        patient_first_name == null ? "" : patient_first_name
      } ${
        patient_last_name == null ? "" : patient_last_name
      } Letter of Medical Necessity</span></p>
      
    
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong>Dear ${
        props.doctor?.contact_name
      }</strong></span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">I am referring <strong>${
        patient_first_name == null ? "" : patient_first_name
      } ${
        patient_last_name == null ? "" : patient_last_name
      }</strong> for evaluation and consideration for a weight&nbsp;</span><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">management surgical procedure. (S)He currently weighs [# of lbs] pounds and is&nbsp;</span><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">[# of in.] inches tall. Her/His BMI is [BMI #].&nbsp;</span><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">I have been [patient’s name]’s primary care physician for the past [#of yrs] years.</span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">I have supervised several of her/his weight control diets and programs. None of these have resulted in any sustained weight loss. As a result of this persistent morbid obesity, her/his co-morbid conditions are becoming more difficult to manage. These co-morbid</span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">conditions are as follows:</span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">Duration: Medication:</span></p>
      ${prescription.map(
        (item) =>
          `<p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">${item?.rx?.drug_name}</span</p>`
      )}
   <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">Past History :</p>
      <table className="past_rx_table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Condition</th>
                                    <th scope="col">Severty</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Summary</th>
                                    <th scope="col">Confidential</th>
                                    <th scope="col">My Health Record</th>
                                    <th scope="col">Details</th>
                                    <th scope="col">Recorded By</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${pastHistory.map((item, i) => {
                                  return `<tr key=${i}>
                                                <td>${moment(item.date).format(
                                                  "DD/MM/YYYY"
                                                )}</td>
                                                <td>${
                                                  item.condition
                                                    ? item.condition
                                                    : ""
                                                }</td>
                                                <td>${
                                                  item.saverty
                                                    ? item.saverty
                                                    : ""
                                                }</td>
                                                <td>${
                                                  item.description
                                                    ? item.description
                                                    : ""
                                                }</td>
                                                <td>${
                                                  item.summary
                                                    ? item.summary
                                                    : ""
                                                }</td>
                                                <td>${
                                                  item.confidential
                                                    ? item.confidential
                                                    : ""
                                                }</td>
                                                <td>${
                                                  item.myHealthRecord
                                                    ? item.myHealthRecord
                                                    : ""
                                                }</td>
                                                <td>${
                                                  item.details
                                                    ? item.details
                                                    : ""
                                                }</td>
                                                <td>${
                                                  item.doctor &&
                                                  item.doctor.dr_given_name
                                                }</td>
                                                
                                            </tr>`;
                                })}

                            </tbody>
                        </table>

                        <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">Allergy :</p>
      <table className="past_rx_table">
                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Reaction</th>
                                    <th scope="col">Severty</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${reactionTableData.map((item, i) => {
                                  return `<tr key=${i}>
                                                <td>${item.drug_name}</td>
                                                <td>${item.reaction}</td>
                                                <td>${item.severty}</td>
                                                
                                            </tr>`;
                                })}

                            </tbody>
                        </table>
      
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">1. Hypertension 3 years Norvasc/Tenormin</span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">2. Diabetes Mellitus 5 years Glucophage</span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">3. Obesity Related Depression 3 years Prozac</span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">Losing weight will certainly make these conditions easier to manage. Since non-surgical programs have failed to provide any long-term benefits for the patient, I feel surgery is her/his only option.</span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">I hope you will find <strong>${
        patient_first_name == null ? "" : patient_first_name
      } ${
        patient_last_name == null ? "" : patient_last_name
      }</strong> a suitable candidate for the surgical weight&nbsp;</span><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">reduction program. It will provide a tool to assist her/him in losing weight, as well as maintain that weight loss. I anticipate that this will provide her/him with a significantly&nbsp;</span><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">improved quality of life.</span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><br></span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">Sincerely,</span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong>${
        storageData?.name
      }</strong></span></p>
      <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">[Signature]</span></p>`
    );
  }, [updateState, prescription, pastHistory, reactionTableData]);

  const config = {
    // removeButtons: ["source","iframe","xpath","wrap-nodes","video","table-keyboard-navigation","color","copy-format","drag-and-drop",'drag-and-drop-element',"enter","error-messages","file","focus","font","format-block","fullsize","hotkeys","hr","about","key-arrow-outside","limit","line-height","link","media","mobile","ordered-list","paste","paste-from-word","paste-storage","placeholder","powered-by-jodit","preview","print","backspace","add-new-line","clipboard"],
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    removeButtons: [
      "fullsize",
      "about",
      "clean-html",
      "clipboard",
      "powered-by-jodit",
      "redo-undo",
    ],
  };

  const [createTemModel, setcreateTemModel] = useState(false);
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

  const [afterSave, setafterSave] = useState("");

  const saveData = () => {
    const storageData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      patient_id: id,
      data: note,
      user_id: storageData.user_id,
      user_type: storageData.user_type,
    };
    axios.post("/save-patient-referal-letter", data).then((res) => {
      toast.success(res.data.message);
      setafterSave(res.data.message);
    });
  };

  return (
    <div>
      <span className="float-end">
        <LiaTimesCircle
          size={20}
          onClick={() => {
            props.setrefferalLeterModel(false);
            setafterSave("");
          }}
          // className="fal fa-times"
          style={{ cursor: "pointer" }}
        />
      </span>
      <div className="d-flex">
        <h6 style={{ fontSize: "14px" }}>Referral Letter</h6>

        <select
          name="template"
          className="temDropDown"
          onChange={(e) => {
            if (e.target.value == "default") {
              setupdateState(Math.random());
            } else {
              setNote(e.target.value);
            }
          }}
        >
          <option value="default" defaultValue>
            Select Template
          </option>
          <option value="default">Standard RL</option>
          {customTem.length > 0 &&
            customTem.map((item, i) => {
              return (
                <option key={i} value={item.data}>
                  {item.name}
                </option>
              );
            })}
        </select>
        {afterSave.length > 1 ? (
          <FaCheck class="createLeater" color="green" />
        ) : (
          <TbDeviceFloppy onClick={saveData} class="createLeater" />
        )}
        <GoPlusCircle
          onClick={() => setcreateTemModel(true)}
          class="createLeater"
        />
      </div>
      {/* <hr /> */}
      <Modal
        isOpen={createTemModel}
        onRequestClose={createTemModel}
        style={StylesPdfPreview}
      >
        <CreateTemplate
          setcreateTemModel={setcreateTemModel}
          setupdateTemDrop={setupdateTemDrop}
        />
      </Modal>
      <JoditEditor
        ref={editor}
        value={note}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setNote(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          //console.log("Data for Text editor", newContent)
        }}
      />
    </div>
  );
}
