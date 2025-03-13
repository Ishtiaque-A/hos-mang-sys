import React, { useEffect, useRef, useState } from "react";
import PrescriptionSetupSidebar from "./PrescriptionSetupSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import defaultPrescriptionImage from "../../Images/default-prescription.jpg";
import localPrescriptionImage from "../../Images/local-prescription.jpg";
import { useLocation } from "react-router-dom";
import Button from "../../common/components/Button";
import { NewModal as Modal } from "../../common/components/NewModal";
import JoditEditor from "jodit-react";
const emptyMessage = {
  forHeader: null,
  forFooter: null,
  forDoctorSignature: null,
};

const PrescriptionSetup = ({ onClose, isOpen }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [prescriptionType, setPrescriptionType] = useState("");
  const [prescriptionImage, setPrescriptionImage] = useState(
    defaultPrescriptionImage
  );
  const [errorMessage, setErrorMessage] = useState({ ...emptyMessage });
  const [headerImage, setHeaderImage] = useState();
  const [footerImage, setFooterImage] = useState();
  const [DoctorSignatureImg, setDoctorSignatureImg] = useState();
  const doctor = JSON.parse(localStorage.getItem("userData"));
  const [prescriptionSetupData, setPrescriptionSetupData] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [headerNote, setHeaderNote] = useState("");
  const [footerNote, setFooterNote] = useState("");
  const editorForFooter = useRef(null);
  const editorForHeader = useRef(null);
  const [clinical_exam, setClinicalExam] = useState(false);
  const [previewImages, setPreviewImages] = useState({
    header_img: null,
    footer_img: null,
    doctor_signature: null,
  });

  const config = {
    readonly: false,
    removeButtons: ["source", "strikethrough", "eraser", "copyformat"],
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  //const onRefetch = () => setIsSubmit((prev) => !prev);
  useEffect(() => {
    if (prescriptionType === "local") {
      setPrescriptionImage(localPrescriptionImage);
    } else {
      setPrescriptionImage(defaultPrescriptionImage);
    }
  }, [prescriptionType]);
  useEffect(() => {
    axios
      .get(`greatdoc-prescription-type-setup-get/${doctor?.user_id}`)
      .then((res) => {
        if (res.status === 200) {
          setHeaderNote(res?.data?.data?.header_content);
          setFooterNote(res?.data?.data?.footer_content);
          setPrescriptionType(res?.data?.data?.prescription_type);
          setPrescriptionSetupData(res?.data?.data);
          setClinicalExam(
            Number(res?.data?.data?.clinical_exam) ? true : false
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [doctor?.id, doctor?.user_id, isSubmit]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const prescriptionType = e.target.prescriptionType.value;
    const useHeader = prescriptionSetupData?.use_header || 0;
    const useFooter = prescriptionSetupData?.use_footer || 0;
    const useDoctorSignature = prescriptionSetupData?.use_doctor_signature || 0;
    const doctor_id = doctor?.user_id;
    const doctor_email = doctor?.email;
    const header = headerNote;
    const footer = footerNote;
    const doctor_signature = DoctorSignatureImg;

    const fromData = new FormData();
    fromData.append("prescription_type", prescriptionType);
    fromData.append("doctor_id", doctor_id);
    fromData.append("doctor_email", doctor_email);

    fromData.append("use_header", useHeader);
    fromData.append("use_footer", useFooter);
    fromData.append("header_content", header);
    fromData.append("footer_content", footer);
    fromData.append("doctor_signature", doctor_signature);
    fromData.append("use_doctor_signature", useDoctorSignature);
    fromData.append("clinical_exam", clinical_exam ? 1 : 0);
    try {
      const res = await axios.post(
        "greatdoc-prescription-type-setup-update",
        fromData
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        setHeaderNote(res?.data?.data?.header_content);
        setFooterNote(res?.data?.data?.footer_content);
        setPrescriptionSetupData(res?.data?.data);
        setPrescriptionType(res?.data?.data?.prescription_type);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setBtnLoading(false);
      onClose();
    }
  };

  const validateAndAppendImage = (
    formData,
    image,
    key,
    errorMessageKey,
    width = 700,
    height = 250
  ) => {
    return new Promise((resolve) => {
      const imageReader = new FileReader();

      imageReader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
          if (img.width > width || img.height > height) {
            setErrorMessage((prev) => ({
              ...prev,
              [errorMessageKey]: `Max dimensions for ${key} image are ${width}x${height} pixels.`,
            }));
            resolve(false);
          } else {
            formData.append(key, image);
            setErrorMessage((prev) => ({ ...prev, [errorMessageKey]: "" }));
            resolve(true);
          }
        };
      };

      imageReader.readAsDataURL(image);
    });
  };

  // const handleHeaderImage = async (e) => {
  //   const newHeaderImage = e.target.files[0];

  //   // Clear previous validation error
  //   setErrorMessage((prev) => ({ ...prev, forHeader: "" }));

  //   if (newHeaderImage) {
  //     const validationResult = await validateAndAppendImage(
  //       new FormData(),
  //       newHeaderImage,
  //       "header img",
  //       "forHeader"
  //     );

  //     if (!validationResult) {
  //       // If validation fails, clear the selected image
  //       setHeaderImage(null);
  //       setPreviewImages((prev) => {
  //         return { ...prev, header_img: null };
  //       });
  //     } else {
  //       // If validation passes, update the header image
  //       setHeaderImage(newHeaderImage);
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setPreviewImages((prev) => {
  //           return { ...prev, header_img: reader.result };
  //         });
  //       };
  //       reader.readAsDataURL(newHeaderImage);
  //     }
  //   } else {
  //     setPreviewImages((prev) => {
  //       return { ...prev, header_img: null };
  //     });
  //     // If no image is selected, clear the header image
  //     setHeaderImage(null);
  //   }
  // };
  // const handleFooterImage = async (e) => {
  //   const newFooterImage = e.target.files[0];

  //   // Clear previous validation error
  //   setErrorMessage((prev) => ({ ...prev, forFooter: "" }));

  //   if (newFooterImage) {
  //     const validationResult = await validateAndAppendImage(
  //       new FormData(),
  //       newFooterImage,
  //       "footer img",
  //       "forFooter"
  //     );

  //     if (!validationResult) {
  //       // If validation fails, clear the selected image
  //       setFooterImage(null);
  //       setPreviewImages((prev) => {
  //         return { ...prev, footer_img: null };
  //       });
  //     } else {
  //       setFooterImage(newFooterImage);
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setPreviewImages((prev) => {
  //           return { ...prev, footer_img: reader.result };
  //         });
  //       };
  //       reader.readAsDataURL(newFooterImage);
  //     }
  //   } else {
  //     // If no image is selected, clear the footer image
  //     setFooterImage(null);
  //     setPreviewImages((prev) => {
  //       return { ...prev, footer_img: null };
  //     });
  //   }
  // };
  const handleDoctorImage = async (e) => {
    const newDoctorSignature = e.target.files[0];

    // Clear previous validation error
    setErrorMessage((prev) => ({ ...prev, forDoctorSignature: "" }));

    if (newDoctorSignature) {
      const validationResult = await validateAndAppendImage(
        new FormData(),
        newDoctorSignature,
        "doctor signature",
        "forDoctorSignature",
        300,
        80
      );

      if (!validationResult) {
        // If validation fails, clear the selected image
        setDoctorSignatureImg(null);
        setPreviewImages((prev) => {
          return { ...prev, doctor_signature: null };
        });
      } else {
        setDoctorSignatureImg(newDoctorSignature);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImages((prev) => {
            return { ...prev, doctor_signature: reader.result };
          });
        };
        reader.readAsDataURL(newDoctorSignature);
      }
    } else {
      // If no image is selected, clear the footer image
      setDoctorSignatureImg(null);
      setPreviewImages((prev) => {
        return { ...prev, doctor_signature: null };
      });
    }
  };
  const location = useLocation();

  return (
    <>
      {location.pathname === "/prescription-setup" ? (
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <PrescriptionSetupSidebar />
            </div>
            <div className="col-md-9 mt-2">
              <div className="card">
                <div className="card-header">
                  <h6 className="card-title">Prescription setup</h6>
                </div>
                <div className="card-body">
                  <div id="DigitalForm">
                    <div className="card-body">
                      <div className="row">
                        <form
                          onSubmit={handleSubmit}
                          className="col-md-12 d-flex flex-column"
                        >
                          <div className="form-group ps-4 d-flex align-items-center mb-1">
                            <input
                              className="form-check-input mb-1"
                              type="radio"
                              required
                              defaultChecked
                              checked={
                                prescriptionType?.trim() === "default"
                                  ? true
                                  : false
                              }
                              id="default"
                              onChange={(e) => {
                                setPrescriptionType(e.target.value);
                                setErrorMessage({ ...emptyMessage });
                                setHeaderImage(null);
                                setFooterImage(null);
                              }}
                              name="prescriptionType"
                              value={"default"}
                            />
                            <label
                              className="form-check-label p-0 m-0"
                              style={{
                                cursor: "pointer",
                              }}
                              htmlFor="default"
                            >
                              International Standard Prescription
                            </label>
                          </div>
                          <div className="form-group ps-4 d-flex align-items-center mb-1">
                            <input
                              className="form-check-input mb-1"
                              type="radio"
                              id="local"
                              name="prescriptionType"
                              checked={
                                prescriptionType?.trim() === "local"
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                setPrescriptionType(e.target.value);
                                setErrorMessage({ ...emptyMessage });
                                setHeaderImage(null);
                                setFooterImage(null);
                              }}
                              required
                              value={"local"}
                            />
                            <label
                              className="form-check-label p-0 m-0"
                              style={{
                                cursor: "pointer",
                              }}
                              htmlFor="local"
                            >
                              Local Prescription
                            </label>
                          </div>
                          <div className="from-group ps-4 mt-2">
                            <label className="form-label fw-bold">
                              Options
                            </label>
                            <div className="d-flex gap-2">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="clinical_exam"
                                  id="clinicalExam"
                                  checked={clinical_exam ? true : false}
                                  onChange={(e) => {
                                    setClinicalExam(e.target.checked);
                                  }}
                                />
                                <label htmlFor="clinicalExam">
                                  Ophthalmology
                                </label>
                              </div>
                            </div>
                          </div>

                          {prescriptionType?.trim() === "local" && (
                            <>
                              <div className="form-group">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <label
                                    className="form-label"
                                    htmlFor="headerImage"
                                  >
                                    Header
                                  </label>
                                  <div className="d-flex gap-1 align-items-center">
                                    <select
                                      style={{
                                        padding: "0.05rem 1rem",
                                        width: "120px",
                                      }}
                                      className="form-select"
                                      onChange={(e) => {
                                        setPrescriptionSetupData((prev) => {
                                          return {
                                            ...prev,
                                            use_header: Number(e.target.value),
                                          };
                                        });
                                      }}
                                    >
                                      <option
                                        selected={
                                          Number(
                                            prescriptionSetupData?.use_header
                                          ) === 0 || false
                                        }
                                        value={0}
                                      >
                                        Default
                                      </option>
                                      <option
                                        selected={
                                          Number(
                                            prescriptionSetupData?.use_header
                                          ) === 1 || false
                                        }
                                        value={1}
                                      >
                                        Use Header
                                      </option>
                                      <option
                                        selected={
                                          Number(
                                            prescriptionSetupData?.use_header
                                          ) === 2 || false
                                        }
                                        value={2}
                                      >
                                        Doctor Pad
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <JoditEditor
                                  style={{ height: "600px" }}
                                  ref={editorForHeader}
                                  value={headerNote ? headerNote : ""}
                                  config={config}
                                  tabIndex={1} // tabIndex of textarea
                                  onBlur={(newContent) =>
                                    setHeaderNote(newContent)
                                  } // preferred to use only this option to update the content for performance reasons
                                  onChange={(newContent) => {
                                    // console.log("Data for Text editor", newContent)
                                  }}
                                />
                              </div>
                              <div className="form-group mt-2">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <label
                                    className="form-label"
                                    htmlFor="headerImage"
                                  >
                                    Footer
                                  </label>
                                  <div className="d-flex gap-1 align-items-center">
                                    <select
                                      style={{
                                        padding: "0.05rem 1rem",
                                        width: "120px",
                                      }}
                                      className="form-select"
                                      onChange={(e) => {
                                        setPrescriptionSetupData((prev) => {
                                          return {
                                            ...prev,
                                            use_footer: Number(e.target.value),
                                          };
                                        });
                                      }}
                                    >
                                      <option
                                        selected={
                                          Number(
                                            prescriptionSetupData?.use_footer
                                          ) === 0 || false
                                        }
                                        value={0}
                                      >
                                        Default
                                      </option>
                                      <option
                                        selected={
                                          Number(
                                            prescriptionSetupData?.use_footer
                                          ) === 1 || false
                                        }
                                        value={1}
                                      >
                                        Use Footer
                                      </option>
                                      <option
                                        selected={
                                          Number(
                                            prescriptionSetupData?.use_footer
                                          ) === 2 || false
                                        }
                                        value={2}
                                      >
                                        Doctor Pad
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <JoditEditor
                                  style={{ height: "600px" }}
                                  ref={editorForFooter}
                                  value={footerNote ? footerNote : ""}
                                  config={config}
                                  tabIndex={1} // tabIndex of textarea
                                  onBlur={(newContent) =>
                                    setFooterNote(newContent)
                                  } // preferred to use only this option to update the content for performance reasons
                                  onChange={(newContent) => {}}
                                />
                              </div>
                              {/* Doctor Signature  */}
                              <div className="form-group mt-3">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <label
                                    className="form-label"
                                    htmlFor="doctorSignature"
                                  >
                                    Doctor Signature
                                  </label>
                                  <div className="d-flex gap-1 align-items-center">
                                    <select
                                      style={{
                                        padding: "0.05rem 1rem",
                                        width: "170px",
                                      }}
                                      className="form-select"
                                      onChange={(e) => {
                                        setPrescriptionSetupData((prev) => {
                                          return {
                                            ...prev,
                                            use_doctor_signature: Number(
                                              e.target.value
                                            ),
                                          };
                                        });
                                      }}
                                    >
                                      <option
                                        selected={
                                          Number(
                                            prescriptionSetupData?.use_doctor_signature
                                          ) === 0 || false
                                        }
                                        value={0}
                                      >
                                        Without Signature
                                      </option>
                                      <option
                                        selected={
                                          Number(
                                            prescriptionSetupData?.use_doctor_signature
                                          ) === 1 || false
                                        }
                                        value={1}
                                      >
                                        With Signature
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="doctor_signature"
                                  id="doctorSignature"
                                  accept="image/*"
                                  onChange={handleDoctorImage}
                                />
                                <small className="text-danger">
                                  {errorMessage?.forDoctorSignature}
                                </small>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  {previewImages.doctor_signature && (
                                    <div
                                      style={{
                                        position: "relative",
                                        overflow: "hidden",
                                      }}
                                      className="d-flex justify-content-center p-2 border rounded"
                                    >
                                      <img
                                        src={previewImages.doctor_signature}
                                        alt="img"
                                        style={{
                                          height: "80px",
                                          width: "300px",
                                        }}
                                      />
                                    </div>
                                  )}
                                  {!previewImages?.doctor_signature &&
                                    prescriptionSetupData?.doctor_signature && (
                                      <div
                                        style={{
                                          position: "relative",
                                          overflow: "hidden",
                                        }}
                                        className="d-flex  justify-content-center p-2 border rounded"
                                      >
                                        <img
                                          style={{
                                            height: "80px",
                                            width: "300px",
                                          }}
                                          src={`${global.img_url}/${prescriptionSetupData?.doctor_signature}`}
                                          alt="img"
                                        />
                                      </div>
                                    )}
                                </div>
                              </div>
                            </>
                          )}
                          <div className="d-flex  w-100 justify-content-end flex-grow-1 align-items-end">
                            <Button
                              type="submit"
                              isLoading={btnLoading}
                              disabled={
                                btnLoading ||
                                errorMessage?.forHeader?.length > 0 ||
                                errorMessage?.forFooter?.length > 0
                                  ? true
                                  : false
                              }
                            >
                              Save
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
            <Modal.Header onClose={onClose}>
              <Modal.Title>Prescription Setup</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="row px-2">
                  <div className="col-md-12 d-flex flex-column">
                    <div className="form-group ps-4 d-flex align-items-center mb-1">
                      <input
                        className="form-check-input mb-1"
                        type="radio"
                        required
                        defaultChecked
                        checked={
                          prescriptionType?.trim() === "default" ? true : false
                        }
                        id="default"
                        onChange={(e) => {
                          setPrescriptionType(e.target.value);
                          setErrorMessage({ ...emptyMessage });
                          setHeaderImage(null);
                          setFooterImage(null);
                        }}
                        name="prescriptionType"
                        value={"default"}
                      />
                      <label
                        className="form-check-label p-0 m-0"
                        style={{
                          cursor: "pointer",
                        }}
                        htmlFor="default"
                      >
                        International Standard Prescription
                      </label>
                    </div>
                    <div className="form-group ps-4 d-flex align-items-center mb-1">
                      <input
                        className="form-check-input mb-1"
                        type="radio"
                        id="local"
                        name="prescriptionType"
                        checked={
                          prescriptionType?.trim() === "local" ? true : false
                        }
                        onChange={(e) => {
                          setPrescriptionType(e.target.value);
                          setErrorMessage({ ...emptyMessage });
                          setHeaderImage(null);
                          setFooterImage(null);
                        }}
                        required
                        value={"local"}
                      />
                      <label
                        className="form-check-label p-0 m-0"
                        style={{
                          cursor: "pointer",
                        }}
                        htmlFor="local"
                      >
                        Local Prescription
                      </label>
                    </div>

                    {prescriptionType?.trim() === "local" && (
                      <>
                        <div className="from-group ps-4 mt-2">
                          <label className="form-label fw-bold">Options</label>
                          <div className="d-flex gap-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="clinical_exam"
                                id="clinicalExam"
                                checked={clinical_exam ? true : false}
                                onChange={(e) => {
                                  setClinicalExam(e.target.checked);
                                }}
                              />
                              <label htmlFor="clinicalExam">
                                Ophthalmology
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <label className="form-label" htmlFor="headerImage">
                              Header
                            </label>
                            <div className="d-flex gap-1 align-items-center">
                              <select
                                style={{
                                  padding: "0.05rem 1rem",
                                  width: "120px",
                                }}
                                className="form-select"
                                onChange={(e) => {
                                  setPrescriptionSetupData((prev) => {
                                    return {
                                      ...prev,
                                      use_header: Number(e.target.value),
                                    };
                                  });
                                }}
                              >
                                <option
                                  selected={
                                    Number(
                                      prescriptionSetupData?.use_header
                                    ) === 0 || false
                                  }
                                  value={0}
                                >
                                  Default
                                </option>
                                <option
                                  selected={
                                    Number(
                                      prescriptionSetupData?.use_header
                                    ) === 1 || false
                                  }
                                  value={1}
                                >
                                  Use Header
                                </option>
                                <option
                                  selected={
                                    Number(
                                      prescriptionSetupData?.use_header
                                    ) === 2 || false
                                  }
                                  value={2}
                                >
                                  Doctor Pad
                                </option>
                              </select>
                            </div>
                          </div>
                          <JoditEditor
                            style={{ height: "600px" }}
                            ref={editorForHeader}
                            value={headerNote ? headerNote : ""}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setHeaderNote(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {
                              // console.log("Data for Text editor", newContent)
                            }}
                          />
                        </div>
                        <div className="form-group mt-2">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <label className="form-label" htmlFor="headerImage">
                              Footer
                            </label>
                            <div className="d-flex gap-1 align-items-center">
                              <select
                                style={{
                                  padding: "0.05rem 1rem",
                                  width: "120px",
                                }}
                                className="form-select"
                                onChange={(e) => {
                                  setPrescriptionSetupData((prev) => {
                                    return {
                                      ...prev,
                                      use_footer: Number(e.target.value),
                                    };
                                  });
                                }}
                              >
                                <option
                                  selected={
                                    Number(
                                      prescriptionSetupData?.use_footer
                                    ) === 0 || false
                                  }
                                  value={0}
                                >
                                  Default
                                </option>
                                <option
                                  selected={
                                    Number(
                                      prescriptionSetupData?.use_footer
                                    ) === 1 || false
                                  }
                                  value={1}
                                >
                                  Use Footer
                                </option>
                                <option
                                  selected={
                                    Number(
                                      prescriptionSetupData?.use_footer
                                    ) === 2 || false
                                  }
                                  value={2}
                                >
                                  Doctor Pad
                                </option>
                              </select>
                            </div>
                          </div>
                          <JoditEditor
                            style={{ height: "600px" }}
                            ref={editorForFooter}
                            value={footerNote ? footerNote : ""}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setFooterNote(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                          />
                        </div>
                        {/* Doctor signature */}
                        <div className="form-group mt-3">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <label
                              className="form-label"
                              htmlFor="doctorSignature"
                            >
                              Doctor Signature
                            </label>
                            <div className="d-flex gap-1 align-items-center">
                              <select
                                style={{
                                  padding: "0.05rem 1rem",
                                  width: "170px",
                                }}
                                className="form-select"
                                onChange={(e) => {
                                  setPrescriptionSetupData((prev) => {
                                    return {
                                      ...prev,
                                      use_doctor_signature: Number(
                                        e.target.value
                                      ),
                                    };
                                  });
                                }}
                              >
                                <option
                                  selected={
                                    Number(
                                      prescriptionSetupData?.use_doctor_signature
                                    ) === 0 || false
                                  }
                                  value={0}
                                >
                                  Without Signature
                                </option>
                                <option
                                  selected={
                                    Number(
                                      prescriptionSetupData?.use_doctor_signature
                                    ) === 1 || false
                                  }
                                  value={1}
                                >
                                  With Signature
                                </option>
                              </select>
                            </div>
                          </div>
                          <input
                            type="file"
                            className="form-control"
                            name="doctor_signature"
                            id="doctorSignature"
                            accept="image/*"
                            onChange={handleDoctorImage}
                          />
                          <small className="text-danger">
                            {errorMessage?.forDoctorSignature}
                          </small>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            {previewImages.doctor_signature && (
                              <div
                                style={{
                                  position: "relative",
                                  overflow: "hidden",
                                }}
                                className="d-flex justify-content-center p-2 border rounded"
                              >
                                <img
                                  src={previewImages.doctor_signature}
                                  alt="img"
                                  style={{
                                    height: "80px",
                                    width: "300px",
                                  }}
                                />
                              </div>
                            )}
                            {!previewImages?.doctor_signature &&
                              prescriptionSetupData?.doctor_signature && (
                                <div
                                  style={{
                                    position: "relative",
                                    overflow: "hidden",
                                  }}
                                  className="d-flex  justify-content-center p-2 border rounded"
                                >
                                  <img
                                    style={{
                                      height: "80px",
                                      width: "300px",
                                    }}
                                    src={`${global.img_url}/${prescriptionSetupData?.doctor_signature}`}
                                    alt="img"
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button type="button" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button
                  isLoading={btnLoading}
                  disabled={
                    btnLoading ||
                    errorMessage?.forHeader?.length > 0 ||
                    errorMessage?.forFooter?.length > 0
                      ? true
                      : false
                  }
                  type="submit"
                >
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};

export default PrescriptionSetup;
