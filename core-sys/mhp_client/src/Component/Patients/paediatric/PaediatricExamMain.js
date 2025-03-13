import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Paediatric.css";
import { Autocomplete } from "@mui/material";

import PaediatricPage1 from "./Paediatric_page1";
import PaediatricPage2 from "./Paediatric_page2";
import PaediatricPage3 from "./Paediatric_page3";
import PaediatricPage4 from "./Paediatric_page4";
import PaediatricPage5 from "./Paediatric_page5";
import PaediatricPage6 from "./Paediatric_page6";
import PaediatricPage7 from "./Paediatric_page7";
import PaediatricPage8 from "./Paediatric_page8";
import PaediatricPage9 from "./Paediatric_page9";
import PaediatricPage10 from "./Paediatric_page10";
import PaediatricPage11 from "./Paediatric_page11";
import PaediatricPage12 from "./Paediatric_page12";
import TextField from "@mui/material/TextField";
import ReactSelect from "react-select";

const PaediatricExamMain = (props) => {
  const [pageName, setPageName] = useState(1);

  //search input
  const [pageNo, setPageNo] = useState(parseInt(1));

  console.log("type of page No", typeof pageNo, pageNo);

  //all page names with page no
  const pageNameList = [
    { page_no: 1, page_name: "Maternal information" },
    { page_no: 1, page_name: "Neonatal information" },
    { page_no: 2, page_name: "Milestone" },
    {
      page_no: 3,
      page_name: "Family health history and risk factors (for parents)",
    },
    { page_no: 4, page_name: "New Born examination" },
    { page_no: 5, page_name: "Infant Screening – Hearing" },
    { page_no: 6, page_name: "Questions for parents/carers" },
    {
      page_no: 7,
      page_name: "Child health check 1 to 4 weeks  By Doctor or Nurse",
    },
    { page_no: 8, page_name: "The 6 to 8 week visit" },
    {
      page_no: 9,
      page_name: "Child health check 6 to 8 weeks for Nurse/Doctor",
    },
    { page_no: 10, page_name: "The 4 months old Questionary" },
    { page_no: 11, page_name: "The 6 months old Visit:" },
    { page_no: 12, page_name: "Dental" },
    { page_no: 13, page_name: "Child health check (6 months)" },
    { page_no: 14, page_name: "The 12 months old Check" },
    { page_no: 15, page_name: "The 12 months health checkl" },
    { page_no: 16, page_name: "The 18 month visit for (parents/carers)" },
    { page_no: 17, page_name: "The 18 months health check" },
    { page_no: 18, page_name: "The 2year health check for parents/carers" },
    { page_no: 19, page_name: "The 2 years Child health check:" },
    { page_no: 20, page_name: "3 years old (for parents or carrer)" },
    { page_no: 21, page_name: "The 3 years Child health check:" },
    { page_no: 22, page_name: "4 years old (for parents0)" },
    { page_no: 23, page_name: "Before school starts (parents/Carer)" },
    { page_no: 24, page_name: "The 4 year health check: (for Doctor/Nurse)" },
  ];

  const handleInputSearch = (e) => {
    if (e.target.value == "") {
      let emptyValue = e.target.value;
      setPageNo(parseInt(emptyValue || 0));
    } else {
      let valCheck = e.target.value;
      let numberForm = parseInt(valCheck);
      setPageNo(numberForm);
    }
  };

  useEffect(() => {
    setPageNo(pageName);
  }, [pageName]);

  useEffect(() => {
    setPageName(pageNo);
  }, [pageNo]);
  const [toogle, setToogle] = useState(false);
  const handleToogle = () => {
    setToogle(!toogle);
  };

  //footer next and prev logic
  const [_, setNextPage] = useState("");
  const passData = (data) => {
    setNextPage(data);
    setPageNo(data);
  };

  //cancel logic

  // const [modalPaediatricExaminationIsOpen, setPaediatricExaminationIsOpen] = useState(false);

  // function closePaediatricExaminationModal() {
  //     setPaediatricExaminationIsOpen(false);
  // }

  return (
    <div className="bg-white  " style={{ overflowX: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div className="col-3 d-flex align-items-center gap-2">
          <div
            onClick={handleToogle}
            className="d-flex align-items-start  gap-3
             rounded py-2 px-3 border"
            style={{ cursor: "pointer" }}
          >
            <i class="fal fa-sliders-h mt-1"></i>
            <span>Filter</span>
          </div>
          {toogle && (
            <div>
              <ReactSelect
                options={pageNameList}
                onChange={(e) => {
                  if (e !== null) {
                    setPageName(e.page_no);
                  }
                }}
                getOptionLabel={(option) => option.page_name}
                placeholder="Select Page"
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    width: "200px",
                  }),
                }}
                getOptionValue={(option) => option.page_no}
              />

              {/* <Autocomplete
                style={{ marginTop: "10px" }}
                disablePortal
                id="combo-box-demo"
                options={pageNameList}
                getOptionLabel={(option) => option.page_name}
                onChange={(e, newValue) => {
                  if (newValue !== null) {
                    setPageName(newValue.page_no);
                  }
                }}
                size="small"
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Pages" />
                )}
              /> */}
            </div>
          )}
        </div>
        <div
          style={{
            flexGrow: 1,
            flexShrink: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            className="page_box"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <label for="lname" className="page_text">
                Page
              </label>
              <input
                type="text"
                id=""
                name=""
                className="page_box_input ps-2"
                placeholder={pageNo}
                value={pageNo}
                onChange={handleInputSearch}
              />
              <label for="" className="ms-2">
                {" "}
                of 12
              </label>
            </div>
            <div className="chevron_icon">
              <span>
                <i
                  class={`fa-solid fa-chevron-left ms-2 pe-2  ${
                    pageNo === 1 ? `text-secondary` : `text-white`
                  }`}
                  onClick={() => {
                    if (pageNo !== 1) {
                      setPageNo(pageNo - 1);
                    }
                  }}
                ></i>
              </span>
              <span>
                <i
                  class={`fa-solid fa-chevron-right ms-2 pe-2  ${
                    pageNo === 12 ? `text-secondary` : `text-white`
                  }`}
                  onClick={() => {
                    if (pageNo !== 12) {
                      setPageNo(pageNo + 1);
                    }
                  }}
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      {pageName == 1 && (
        <PaediatricPage1
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
          patient_id={props.patient_id}
        >
          {" "}
        </PaediatricPage1>
      )}
      {pageName == 2 && (
        <PaediatricPage2
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        ></PaediatricPage2>
      )}

      {pageName == 3 && (
        <PaediatricPage3
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        ></PaediatricPage3>
      )}
      {pageName == 4 && (
        <PaediatricPage4
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        ></PaediatricPage4>
      )}
      {pageName == 5 && (
        <PaediatricPage5
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        ></PaediatricPage5>
      )}
      {pageName == 6 && (
        <PaediatricPage6
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        >
          {" "}
        </PaediatricPage6>
      )}
      {pageName == 7 && (
        <PaediatricPage7
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        >
          {" "}
        </PaediatricPage7>
      )}
      {pageName == 8 && (
        <PaediatricPage8
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        >
          {" "}
        </PaediatricPage8>
      )}
      {pageName == 9 && (
        <PaediatricPage9
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        >
          {" "}
        </PaediatricPage9>
      )}
      {pageName == 10 && (
        <PaediatricPage10
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        >
          {" "}
        </PaediatricPage10>
      )}
      {pageName == 11 && (
        <PaediatricPage11
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        >
          {" "}
        </PaediatricPage11>
      )}
      {pageName == 12 && (
        <PaediatricPage12
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          passCancel={props}
        >
          {" "}
        </PaediatricPage12>
      )}
    </div>
  );
};

export default PaediatricExamMain;
