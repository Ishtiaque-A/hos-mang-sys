import moment from "moment";
import React from "react";
import { getAge } from "../../../../utils/getAge";
import QRCode from "react-qr-code";
import { nullParser } from "../../../../utils/null-parser";

const DefaultPrescription = ({ prescriptionTemplate, prescriptionData }) => {
  console.log(prescriptionData, "prescriptionData");
  console.log(prescriptionTemplate, "prescriptionTemplate");

  const pageSize = 8;
  const numMedicines = prescriptionData?.rx?.length;
  const numPages = Math.ceil(numMedicines / pageSize);
  const pages = Array.from({ length: numPages }, (index, page) => {
    const start = page * pageSize;
    const end = Math.min(start + pageSize, numMedicines);
    const pageMedicines = prescriptionData?.rx?.slice(start, end);
    // console.log(page, "index");
    return (
      <div
        style={{
          // padding: "10px",
          backgroundColor: "white",
          padding: "25px",
        }}
      >
        {/* header  */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid gray",
            marginBottom: "20px",
            paddingTop: page > 0 ? "25px" : "0px",
          }}
        >
          {/* doctor Info  */}
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "semibold",
                paddingBottom: "3px",
                margin: "0",
              }}
            >
              {prescriptionData?.doctorInfo?.docName}
            </h2>
            <p
              style={{
                fontSize: "13px",
                margin: "0px",
                padding: "0 0 1px 0",
                lineHeight: "1",
              }}
            >
              {prescriptionData?.doctorInfo?.academic}
            </p>
            <p
              style={{
                fontSize: "13px",
                margin: "0px",
                lineHeight: "1",
                padding: "0 0 1px 0",
              }}
            >
              {nullParser(prescriptionData?.doctorInfo?.specialist)
                ? prescriptionData?.doctorInfo?.specialist
                : ""}
            </p>
            <p
              style={{
                fontSize: "13px",
                margin: "0px",
                lineHeight: "1",
                padding: "0 0 1px 0",
              }}
            >
              {nullParser(prescriptionData?.doctorInfo?.experience?.company)
                ? prescriptionData?.doctorInfo?.experience?.company
                : ""}
            </p>

            <p
              style={{
                fontSize: "13px",
                margin: "0px",
                padding: "0 0 1px 0",
                lineHeight: "1",
              }}
            >
              BMDC Reg No: {prescriptionData?.doctorInfo?.dr_bmdc_reg_no}
            </p>
          </div>

          {/* chamber info  */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "start",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "semibold",
                paddingBottom: "3px",
                margin: "0",
                marginTop: "-7px",
              }}
            >
              {
                prescriptionData?.doctorInfo?.usual_provider
                  ?.usual_provider_name
              }
              {/* Chamber: {prescriptionData?.organization?.organization_name} */}
            </h2>
            <p
              style={{
                fontSize: "13px",
                margin: "0px",
                padding: "0 0 1px 0",
                lineHeight: "1",
              }}
            >
              {prescriptionData?.doctorInfo?.usual_provider?.address}
            </p>
            <p
              style={{
                fontSize: "13px",
                margin: "0px",
                padding: "0 0 1px 0",
                lineHeight: "1",
              }}
            >
              Serial Number:{" "}
              {prescriptionData?.doctorInfo?.usual_provider?.phone}
            </p>
            <p
              style={{
                fontSize: "13px",
                margin: "0px",
                padding: "0 0 1px 40px",
                textAlign: "center",
                lineHeight: "1",
              }}
            >
              {prescriptionData?.doctorInfo?.usual_provider?.mobile}
            </p>
          </div>
        </div>
        <div
          style={{
            minHeight: "80vh",
          }}
        >
          <div className="d-flex justify-content-between mb-2">
            <div>
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    <span
                      style={{
                        fontSize: "13px",
                        lineHeight: "1",
                      }}
                    >
                      Patient ID
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", lineHeight: "1" }}>
                      :&nbsp;{prescriptionData?.patientInfo?.patient_HN}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span
                      style={{
                        fontSize: "13px",
                        lineHeight: "1",
                      }}
                    >
                      Patient Name
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", lineHeight: "1" }}>
                      :&nbsp;{prescriptionData?.patientInfo?.name}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span
                      style={{
                        fontSize: "13px",
                        lineHeight: "1",
                      }}
                    >
                      Patient Age
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", lineHeight: "1" }}>
                      :&nbsp;{getAge(prescriptionData?.patientInfo?.dob)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span
                      style={{
                        fontSize: "13px",
                        lineHeight: "1",
                      }}
                    >
                      Patient Gender
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", lineHeight: "1" }}>
                      :&nbsp;
                      {prescriptionData?.patientInfo?.sex?.birth_sex_name}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span
                      style={{
                        fontSize: "13px",
                        lineHeight: "1",
                      }}
                    >
                      Date
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "13px", lineHeight: "1" }}>
                      :&nbsp;{moment().format("DD/MM/YYYY")}
                    </span>
                  </td>
                </tr>
              </table>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "15px 0px",
                }}
              >
                <div
                  style={{
                    height: "16px",
                    width: "16px",
                    border: "1px solid gray",
                    borderRadius: "2px",
                    marginRight: "5px",
                  }}
                ></div>
                <span>Brand substitution not permitted</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
              }}
            >
              <div>
                <QRCode
                  size={256}
                  style={{ height: "90px", maxWidth: "100%", width: "100%" }}
                  value={`
                  ${Math.floor(Math.random() * 9000) + 1000}
                  `}
                  // Patient ID: ${prescriptionData?.patientInfo?.patient_HN}
                  // Patient Name: ${prescriptionData?.patientInfo?.name}
                  // Prescribed By: ${prescriptionData?.doctorInfo?.docName}
                  // Chamber: ${prescriptionData?.organization?.organization_name}
                  // Date: ${moment().format("DD/MM/YYYY")}
                  level={"Q"}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  margin: "0px",
                  padding: "0 0 1px 0",
                  lineHeight: "1",
                }}
              >
                QR Code
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  margin: "0px",
                  padding: "0 0 1px 0",
                  lineHeight: "1",
                }}
              >
                MHP Hospital
              </p>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {pageMedicines?.map((item) => {
              const isComplexInstraction = nullParser(
                item?.Complex_instruction
              );
              return (
                <div
                  style={{
                    borderBottom: "1px solid gray",
                    padding: "7px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      margin: "0px",
                      padding: "0 0 1px 0",
                      lineHeight: "1",
                    }}
                  >
                    {nullParser(item?.brand_name) ? item?.brand_name : ""}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      margin: "0px",
                      padding: "0 0 1px 0",
                      lineHeight: "1",
                    }}
                  >
                    {nullParser(item?.drug_name) ? item?.drug_name : ""}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {isComplexInstraction ? (
                        <p
                          style={{
                            padding: "0px",
                            fontSize: "11px",
                            margin: "0px",
                            display: "inline-block",
                            marginRight: "10px",
                            lineHeight: "1",
                          }}
                        >
                          {isComplexInstraction}
                        </p>
                      ) : (
                        <>
                          {nullParser(item?.dose) && item?.dose !== "1" ? (
                            <span
                              style={{
                                padding: "0px",
                                fontSize: "11px",
                                margin: "0px",
                                display: "inline-block",
                                marginRight: "10px",
                                lineHeight: "1",
                              }}
                            >
                              {nullParser(item?.dose) ? item?.dose : ""}
                            </span>
                          ) : null}
                          <p
                            style={{
                              fontSize: "11px",
                              margin: "0px",
                              padding: "0 0 1px 0",
                              lineHeight: "1",
                            }}
                          >
                            {nullParser(item?.frequency) ? item?.frequency : ""}
                          </p>

                          <p
                            style={{
                              fontSize: "11px",
                              margin: "0px",
                              padding: "0 0 1px 0",
                              lineHeight: "1",
                            }}
                          >
                            {nullParser(item?.food) ? item?.food : ""}{" "}
                          </p>
                        </>
                      )}
                      <p
                        style={{
                          fontSize: "11px",
                          margin: "0px",
                          padding: "0 0 1px 0",
                          lineHeight: "1",
                        }}
                      >
                        {nullParser(item?.prn) ? `(${item?.prn})` : ""}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          margin: "0px",
                          padding: "0 0 1px 0",
                          lineHeight: "1",
                        }}
                      >
                        {nullParser(item?.route) ? item?.route : ""}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        margin: "0px",
                        padding: "0 0 1px 0",
                        lineHeight: "1",
                      }}
                    >
                      {nullParser(item?.quantity)
                        ? `${item?.quantity} X ${
                            nullParser(item?.repeats) ? item?.repeats : 0
                          } Repeat${parseInt(item.repeats) > 1 ? "s" : ""}`
                        : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderTop: "1px solid gray",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              textAlign: "center",
              margin: "0px",
              padding: "0 0 1px 0",
            }}
          >
            {prescriptionData?.doctorInfo?.docName}
          </p>
          <p
            style={{
              fontSize: "13px",
              textAlign: "center",
              margin: "0px",
              padding: "0 0 1px 0",
              lineHeight: "1",
            }}
          >
            {prescriptionData?.doctorInfo?.academic}
          </p>
          <p
            style={{
              fontSize: "13px",
              textAlign: "center",
              fontWeight: "500",
              margin: "0px",
              padding: "0 0 1px 0",
              lineHeight: "1",
            }}
          >
            Issued under : The Drugs (Control) Ordinance, 1982
          </p>
          <p
            style={{
              fontSize: "13px",
              fontWeight: "500",
              textAlign: "center",
              margin: "0px",
              padding: "0 0 1px 0",
              lineHeight: "1",
            }}
          >
            (Ordinance NO. VIII OF 1982 ) Section 14A
          </p>
        </div>
      </div>
    );
  });

  return pages;
};

export default DefaultPrescription;
