import React from "react";
import { nullParser } from "../../../../utils/null-parser";
import { getAge } from "../../../../utils/getAge";
import Barcode from "react-barcode";
import moment from "moment";

const LocalPrescription = ({ prescriptionTemplate, prescriptionData }) => {
  const pageSize = 12;
  if (
    prescriptionData?.rx?.length <= 10 &&
    prescriptionData?.advices.length <= 5
  ) {
    return (
      <PrescriptionPage
        prescriptionData={prescriptionData}
        prescriptionTemplate={prescriptionTemplate}
        page={1}
        isShowAdvices={true}
      />
    );
  } else {
    const numMedicines = prescriptionData?.rx?.length;
    const numPages = Math.ceil(numMedicines / pageSize);
    const pages = Array.from({ length: numPages }, (index, page) => {
      const start = page * pageSize;
      const end = Math.min(start + pageSize, numMedicines);
      const pageMedicines = prescriptionData?.rx?.slice(start, end);
      const rxStartIndex = start + 1;
      const modifiedPrescriptionData = {
        ...prescriptionData,
        rx: pageMedicines,
      };
      return (
        <PrescriptionPage
          prescriptionData={modifiedPrescriptionData}
          isShowAdvices={page === numPages - 1}
          page={rxStartIndex}
          prescriptionTemplate={prescriptionTemplate}
        />
      );
    });

    return pages;
  }
};

export default LocalPrescription;

const PrescriptionPage = ({
  prescriptionData,
  prescriptionTemplate,
  isShowAdvices,
  page,
}) => {
  console.log("prescriptionData", prescriptionData);
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "white",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {Number(prescriptionTemplate?.use_header) === 1 && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: prescriptionTemplate?.header_content,
            }}
          ></div>
        </>
      )}
      {Number(prescriptionTemplate?.use_header) === 0 && (
        <>
          {/* header  */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
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
                }}
              >
                {nullParser(prescriptionData?.doctorInfo?.academic)
                  ? prescriptionData?.doctorInfo?.academic
                  : ""}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  margin: "0px",
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
                }}
              >
                BMDC Reg No: {prescriptionData?.doctorInfo?.dr_bmdc_reg_no}
              </p>
            </div>

            {/* chamber info  */}
            <div
              style={{
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "semibold",
                  paddingBottom: "3px",
                  margin: "0",
                }}
              >
                {
                  prescriptionData?.doctorInfo?.usual_provider
                    ?.usual_provider_name
                }
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  margin: "0px",
                  padding: "0 0 1px 0",
                }}
              >
                {prescriptionData?.doctorInfo?.usual_provider?.address}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  margin: "0px",
                  padding: "0 0 1px 0",
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
                }}
              >
                {prescriptionData?.doctorInfo?.usual_provider?.mobile}
              </p>
            </div>
          </div>
        </>
      )}
      {Number(prescriptionTemplate?.use_header) === 2 && (
        <div
          style={{
            height: "180px",
            width: "100%",
          }}
        ></div>
      )}

      {/* patient info  */}
      <div
        style={{
          padding: "3px 0",
          margin: "3px 0",
          borderBottom: "0.5px dashed gray",
          borderTop: "0.5px dashed gray",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "3px 0",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              // padding: "0 0 0 6px",
              margin: "1px 0",
              lineHeight: "1.1",
              width: "33%",
            }}
          >
            <span
              style={{
                fontWeight: "500",
                display: "inline-block",
                width: "40px",
              }}
            >
              Name{" "}
            </span>
            : {prescriptionData?.patientInfo?.name}
          </p>
          <p
            style={{
              fontSize: "13px",
              // padding: "0 0 0 6px",
              margin: "1px 0",
              lineHeight: "1.1",
              width: "33%",
            }}
          >
            <span
              style={{
                fontWeight: "500",
                display: "inline-block",
                width: "50px",
              }}
            >
              ID{" "}
            </span>
            : {prescriptionData?.patientInfo?.patient_HN}
          </p>
          <p
            style={{
              fontSize: "13px",
              padding: "0",
              margin: "1px 0",
              lineHeight: "1.1",
              width: "33%",
            }}
          >
            <span
              style={{
                fontWeight: "500",
                display: "inline-block",
                width: "50px",
              }}
            >
              Gender{" "}
            </span>
            : {prescriptionData?.patientInfo?.sex?.birth_sex_name}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "3px 0",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              padding: "0px",
              margin: "1px 0",
              lineHeight: "1.1",
              width: "33%",
            }}
          >
            <span
              style={{
                fontWeight: "500",
                display: "inline-block",
                width: "40px",
              }}
            >
              Age
            </span>
            : {getAge(prescriptionData?.patientInfo?.dob)}
          </p>
          <p
            style={{
              fontSize: "13px",
              padding: "0 6px 0 0",
              margin: "1px 0",
              lineHeight: "14px",
              width: "33%",
            }}
          >
            <span
              style={{
                fontWeight: "500",
                display: "inline-block",
                width: "50px",
              }}
            >
              {" "}
              Weight
            </span>
            :
            {prescriptionData?.patientInfo?.weight
              ? `${prescriptionData?.patientInfo?.weight} kg`
              : " N/A"}
          </p>
          <p
            style={{
              fontSize: "13px",
              padding: "0 6px 0 0",
              margin: "1px 0",
              lineHeight: "14px",
              width: "33%",
            }}
          >
            <span
              style={{
                fontWeight: "500",
                display: "inline-block",
                width: "50px",
              }}
            >
              {" "}
              Date
            </span>
            : {moment().format("DD/MM/YYYY hh:mm A")}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div style={{ width: "30%" }}>
          <div
            style={{
              margin: "0 auto",
            }}
          >
            <br />
            <Barcode
              height={30}
              fontOptions={{
                fontSize: 10,
                textAlign: "center",
                fontFamily: "monospace",
              }}
              displayValue={true}
              lineColor="#2e2e2e"
              value={prescriptionData?.prescriptionCode || `0000`}
            />
          </div>
          <br />
          {Number(prescriptionTemplate?.clinical_exam) === 1 ? (
            <>
              <table
                style={{
                  border: "1px dashed gray",
                }}
              >
                <tr
                  style={{
                    border: "1px dashed gray",
                  }}
                >
                  {prescriptionData?.ophth?.eye?.columns?.map((vsc) => (
                    <td
                      style={{
                        border: "1px dashed gray",
                        padding: "5px",
                      }}
                    >
                      {vsc}
                    </td>
                  ))}
                </tr>
                {prescriptionData?.ophth?.eye?.data?.map((vsd) => (
                  <tr
                    style={{
                      border: "1px dashed gray",
                    }}
                  >
                    {prescriptionData?.ophth?.eye?.columns?.map((vsc) => (
                      <td
                        style={{
                          border: "1px dashed gray",
                          padding: "5px",
                        }}
                      >
                        {vsd[vsc] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </table>
              <br />
              <table
                style={{
                  border: "1px dashed gray",
                }}
              >
                <tr
                  style={{
                    border: "1px dashed gray",
                  }}
                >
                  {prescriptionData?.ophth?.dilation?.columns?.map((vsc) => (
                    <td
                      style={{
                        border: "1px dashed gray",
                        padding: "5px",
                      }}
                    >
                      {vsc}
                    </td>
                  ))}
                </tr>
                {prescriptionData?.ophth?.dilation?.data?.map((vsd) => (
                  <tr
                    style={{
                      border: "1px dashed gray",
                    }}
                  >
                    {prescriptionData?.ophth?.dilation?.columns?.map(
                      (vsc, indexCol) => (
                        <td
                          style={{
                            border: "1px dashed gray",
                            padding: "5px",
                          }}
                          // rowSpan={
                          //   Number(indexCol) >=
                          //   Number(
                          //     prescriptionData?.ophth?.dilation?.columns
                          //       ?.length || 0
                          //   ) -
                          //     2
                          //     ? 2
                          //     : 1
                          // }
                        >
                          {vsd[vsc] ?? ""}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </table>
              <br />

              {prescriptionData?.ophth?.general?.map((gr) => (
                <p className="p-0 m-0">
                  <span
                    style={{
                      display: "inline-block",
                      width: "40px",
                      margin: "0",
                      padding: "0",
                    }}
                  >
                    {gr?.title}
                  </span>
                  : {gr?.value}
                </p>
              ))}
            </>
          ) : (
            <>
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: "semibold",
                  paddingBottom: "3px",
                  margin: "0",
                }}
              >
                Chief Complaints:
              </h2>
              <ul>
                {prescriptionData?.chielfComplaints?.map((item) => {
                  return (
                    <li
                      style={{
                        fontSize: "13px",
                        margin: "0px",
                        padding: "0 0 1px 0",
                        lineHeight: "1",
                      }}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: "semibold",
                  paddingBottom: "3px",
                  margin: "0",
                }}
              >
                Investigation:
              </h2>

              <ul>
                {prescriptionData?.investigations?.map((item) => {
                  return (
                    <li
                      style={{
                        fontSize: "13px",
                        margin: "0px",
                        padding: "0 0 1px 0",
                        lineHeight: "1",
                      }}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
        <div style={{ width: "70%", marginTop: "3px" }}>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 80.2 100"
            height="26"
            width="25"
            style={{ enableBackground: "new 0 0 80.2 100" }}
          >
            <style type="text/css">
              {`.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#2E2E2E;}`}
            </style>
            <path
              className="st0"
              d="M69,88.9L48.6,65.1L63,46.5c1.3-1.7,1-4.1-0.7-5.5c-1.7-1.3-4.1-1-5.5,0.7L43.4,59.1L28.7,42h1.1
      c10.3,0,18.7-8.4,18.7-18.7S40.2,4.7,29.9,4.7H14.2c-2.1,0-3.9,1.7-3.9,3.9v59.2c0,2.1,1.7,3.9,3.9,3.9s3.9-1.7,3.9-3.9V42h0.4
      l20,23.4L20.3,89.1c-1.3,1.7-1,4.1,0.7,5.5c1.7,1.3,4.1,1,5.5-0.7l17.3-22.4L63.1,94c1.4,1.6,3.9,1.8,5.5,0.4
      C70.2,93,70.4,90.6,69,88.9z M18.1,34.3V12.4h11.8c6,0,10.9,4.9,10.9,10.9c0,6-4.9,10.9-10.9,10.9H18.1z"
            />
          </svg>

          <div style={{ marginLeft: "30px" }}>
            <ol style={{ padding: 0, margin: 0 }} start={page}>
              {prescriptionData?.rx?.map((item) => {
                const isComplexInstraction = nullParser(
                  item?.Complex_instruction
                );
                console.log("isComplexInstraction", isComplexInstraction);
                return (
                  <li>
                    <p
                      style={{
                        fontSize: "13px",
                        margin: "0px",
                        padding: "0 0 1px 0",
                        fontWeight: "500",
                        lineHeight: "1.1",
                      }}
                    >
                      {item?.brand_name}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        margin: "0px",
                        padding: "0 0 1px 0",
                        lineHeight: "1",
                      }}
                    >
                      {item?.drug_name}
                    </p>
                    <p
                      className="mb-0"
                      style={{
                        marginRight: "10px",
                        lineHeight: "1",
                      }}
                    >
                      {isComplexInstraction ? (
                        <>
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
                            {isComplexInstraction}
                          </span>
                        </>
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
                            {nullParser(item?.frequency) ? item?.frequency : ""}
                          </span>
                          <span
                            style={{
                              padding: "0px",
                              fontSize: "11px",
                              margin: "0px",
                              lineHeight: "1",
                            }}
                          >
                            {nullParser(item?.food) ? item?.food : ""}{" "}
                          </span>
                        </>
                      )}
                      <span
                        style={{
                          padding: "0px",
                          fontSize: "11px",
                          margin: "0px",
                          lineHeight: "1",
                        }}
                      >
                        {nullParser(item?.prn) ? `(${item?.prn})` : ""}
                      </span>
                      <span
                        style={{
                          padding: "0px",
                          fontSize: "11px",
                          margin: "0px 0 0 10px",
                          display: "inline-block",
                          marginRight: "10px",
                          lineHeight: "1",
                        }}
                      >
                        {nullParser(item?.route) ? item?.route : ""}
                      </span>

                      <span
                        style={{
                          padding: "0px",
                          fontSize: "11px",
                          margin: "0px",
                          lineHeight: "1",
                        }}
                        className="float-end"
                      >
                        {nullParser(item?.quantity)
                          ? `${item?.quantity} X ${
                              nullParser(item?.repeats) ? item?.repeats : 0
                            } Repeat${parseInt(item.repeats) > 1 ? "s" : ""}`
                          : ""}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ol>
            {isShowAdvices && (
              <>
                <h2
                  style={{
                    fontSize: "17px",
                    fontWeight: "semibold",
                    paddingBottom: "3px",
                    margin: "0",
                    lineHeight: "1.2",
                    marginTop: "10px",
                  }}
                >
                  Advices:
                </h2>
                <ul>
                  {prescriptionData?.advices?.map((item) => {
                    return (
                      <li>
                        <p
                          style={{
                            fontSize: "13px",
                            margin: "0px",
                            padding: "0 0 1px 0",
                            lineHeight: "1.1",
                          }}
                        >
                          {item?.advise_name}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "20px",
          right: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "200px",
            marginBottom: "15px",
          }}
        >
          {Number(prescriptionTemplate?.use_doctor_signature) === 1 && (
            <img
              style={{ width: "200px", height: "80px", objectFit: "contain" }}
              src={`${global.img_url}/${prescriptionTemplate?.doctor_signature}`}
              alt="doctor"
            />
          )}
          {/* <hr /> */}
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
        </div>
        <div
          style={{
            borderTop: "0.5px dashed gray",
          }}
        >
          {Number(prescriptionTemplate?.use_footer) === 1 && (
            <>
              <div
                style={{
                  marginTop: "15px",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: prescriptionTemplate?.footer_content,
                  }}
                ></div>
              </div>
            </>
          )}
          {Number(prescriptionTemplate?.use_footer) === 0 && (
            <>
              <p className="text-center mt-3">
                .......... দিন পর GreatDoc অ্যাপ এ ফলোআপ / চেম্বারে
                ব্যাবস্থাপ্ত্র সহ সরাসরি আসবেন{" "}
              </p>
            </>
          )}
          {Number(prescriptionTemplate?.use_footer) === 2 && (
            <div
              style={{
                height: "100px",
                width: "100%",
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};
