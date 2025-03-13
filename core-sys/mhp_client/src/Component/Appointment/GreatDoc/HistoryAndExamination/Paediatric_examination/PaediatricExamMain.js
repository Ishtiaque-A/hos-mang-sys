import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./PedriaticExam.css";
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
import PaediatricPage13 from "./Paediatric_page13";
import PaediatricPage14 from "./Paediatric_page14";
import PaediatricPage15 from "./Paediatric_page15";
import PaediatricPage16 from "./Paediatric_page16";
import PaediatricPage17 from "./Paediatric_page17";
import PaediatricPage18 from "./Paediatric_page18";
import PaediatricPage19 from "./Paediatric_page19";
import PaediatricPage20 from "./Paediatric_page20";
import PaediatricPage21 from "./Paediatric_page21";
import PaediatricPage22 from "./Paediatric_page22";
import PaediatricPage23 from "./Paediatric_page23";
import PaediatricPage24 from "./Paediatric_page24";
import TextField from "@mui/material/TextField";
import { CleaningServices } from "@mui/icons-material";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const PaediatricExamMain = (props) => {
  const [pageName, setPageName] = useState(1);

  //search input
  const [pageNo, setPageNo] = useState(1);
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
    if (e.target.value === "") {
      setPageNo(e.target.value || 0);
    } else if (e.target.value > 24) {
      setPageNo(24);
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
  const passData = (data) => {
    setPageNo(data);
  };

  return (
    <div className="bg-white mb-5 " style={{ overflowX: "hidden" }}>
      <div className="page-filter d-flex p-2 ">
        <div className="col-12 d-flex align-items-center justify-content-between ">
          <Autocomplete
            disablePortal
            id="free-solo-demo"
            freeSolo
            sx={{
              width: 300,
            }}
            options={pageNameList}
            getOptionLabel={(option) => option.page_name}
            onChange={(e, newValue) => {
              if (newValue !== null) {
                setPageName(newValue.page_no);
              }
            }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Search pages name" />
            )}
          />
          <div className=" d-flex align-items-center">
            <div className="d-flex align-items-center mx-2">
              <label for="lname" className="page_text">
                Page
              </label>
              <input
                type="text"
                name=""
                className="form-control ms-2"
                id="fname"
                style={{
                  border: "1px solid gary",
                  borderRadius: "5px",
                  outline: "none",
                  width: "50px",
                }}
                placeholder={pageNo}
                value={pageNo}
                onChange={handleInputSearch}
              />
              <label
                for="fname"
                className="ms-2 mb-0"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                of 24
              </label>
            </div>
            <div
              className="d-flex align-items-center"
              style={{
                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: "#69B128",
              }}
            >
              {pageNo < 2 ? (
                ""
              ) : (
                <span>
                  <LuChevronLeft
                    size={20}
                    className="text-white"
                    onClick={() => {
                      if (pageNo !== 1) {
                        setPageNo(pageNo - 1);
                      }
                    }}
                  />
                </span>
              )}

              {pageNo > 23 ? (
                ""
              ) : (
                <span>
                  <LuChevronRight
                    size={20}
                    class="text-white"
                    onClick={() => {
                      if (pageNo !== 24) {
                        setPageNo(pageNo + 1);
                      }
                    }}
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {pageName === 1 && (
        <PaediatricPage1
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        ></PaediatricPage1>
      )}
      {pageName === 2 && (
        <PaediatricPage2
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage2>
      )}
      {pageName === 3 && (
        <PaediatricPage3
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage3>
      )}
      {pageName === 4 && (
        <PaediatricPage4
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        ></PaediatricPage4>
      )}
      {pageName === 5 && (
        <PaediatricPage5
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        ></PaediatricPage5>
      )}
      {pageName === 6 && (
        <PaediatricPage6
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        ></PaediatricPage6>
      )}
      {pageName === 7 && (
        <PaediatricPage7
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        ></PaediatricPage7>
      )}
      {pageName === 8 && (
        <PaediatricPage8
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        ></PaediatricPage8>
      )}
      {pageName === 9 && (
        <PaediatricPage9
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        ></PaediatricPage9>
      )}
      {pageName === 10 && (
        <PaediatricPage10
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        ></PaediatricPage10>
      )}
      {pageName === 11 && (
        <PaediatricPage11
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        ></PaediatricPage11>
      )}
      {pageName === 12 && (
        <PaediatricPage12
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage12>
      )}
      {pageName === 13 && (
        <PaediatricPage13
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage13>
      )}
      {pageName === 14 && (
        <PaediatricPage14
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage14>
      )}
      {pageName === 15 && (
        <PaediatricPage15
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage15>
      )}
      {pageName === 16 && (
        <PaediatricPage16
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage16>
      )}
      {pageName === 17 && (
        <PaediatricPage17
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
          patient_id={props.patient_id}
        >
          {" "}
        </PaediatricPage17>
      )}
      {pageName === 18 && (
        <PaediatricPage18
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage18>
      )}
      {pageName === 19 && (
        <PaediatricPage19
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage19>
      )}
      {pageName === 20 && (
        <PaediatricPage20
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage20>
      )}
      {pageName === 21 && (
        <PaediatricPage21
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage21>
      )}
      {pageName === 22 && (
        <PaediatricPage22
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage22>
      )}
      {pageName === 23 && (
        <PaediatricPage23
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage23>
      )}
      {pageName === 24 && (
        <PaediatricPage24
          setstateUpdate={props.setstateUpdate}
          closePaediatricExaminationModal={
            props.closePaediatricExaminationModal
          }
          passData={passData}
          propsData={props}
        >
          {" "}
        </PaediatricPage24>
      )}
    </div>
  );
};

export default PaediatricExamMain;
