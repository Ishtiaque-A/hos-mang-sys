import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import http from "../../http";
import { FiMinus, FiPlus } from "react-icons/fi";
import moment from "moment/moment";
import SimpleSelect from "../common/SimpleSelect";

export default function UploadPrescription() {
  const [fileList, setFileList] = useState([{ report: "", id: 1, title: "" }]);
  const [orgList, setOrgList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchLoading, setBranchLoading] = useState(false);
  useEffect(() => {
    http.get(`/exlab/organization-list`).then((res) => {
      setOrgList(res.data?.data?.organizations);
    });
  }, []);
  const handleRemoveInput = (i) => {
    const param = fileList.filter((item) => item.id !== i);
    setFileList(param);
  };
  const handleInput = () => {
    const param = [...fileList];
    const id = param.length > 0 ? param[param.length - 1].id + 1 : 1;
    param.push({ report: "", id: id, title: "" });
    setFileList(param);
  };
  //
  const handleFileInput = (e, index) => {
    const { name, files } = e.target;
    const list = [...fileList];
    list[index][name] = files[0];
    setFileList(list);
  };
  const handleFileTitleInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...fileList];
    list[index][name] = value;
    setFileList(list);
  };
  const [data, setData] = useState({
    patient_hn: "",
    doctor_id: "",
    remarks: "",
    lab_name: "Test Lab",
    center_id: "1",
    org: "",
    dbName: "",
    doctorName: 1,
    patientName: 1,
    saas_branch_id: "",
    saas_branch_name: "",
    report_type: "pathology",
    doctor: {},
    patient: {},
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (data.dbName) {
      (async function () {
        setBranchLoading(true);
        try {
          const findOrganization = orgList?.find(
            (item) => item.db_name?.toLowerCase() === data.dbName?.toLowerCase()
          );
          const res = await http.get(
            "exlab/branch-public-list/" + findOrganization.id
          );
          setBranchList(res?.data);
          setBranchLoading(false);
        } catch (error) {
          console.log(error);
          setBranchLoading(false);
        }
      })();
    }
  }, [data, orgList]);

  const [loading, setLoading] = useState(false);
  const handleDocCheck = (e) => {
    http
      .get(`/exlab/doctor-info/${e?.target?.value}`, {
        headers: {
          databaseName: data.dbName,
        },
      })
      .then((res) => {
        setData({
          ...data,
          doctorName: res?.data?.fullName,
          doctor: res?.data,
        });
      })
      .catch((err) => {
        setData({
          ...data,
          doctorName: "Not Found",
        });
        console.log(err);
      });
  };
  const handlePatientCheck = (e) => {
    http
      .get(`/exlab/patient-info/${e.target.value}`, {
        headers: {
          databaseName: data.dbName,
        },
      })
      .then((res) => {
        setData({
          ...data,
          patientName: res?.data?.fullName,
          patient: res?.data,
        });
      })
      .catch((err) => {
        setData({
          ...data,
          patientName: "Not Found",
        });
        console.log(err);
      });
  };
  const allFiles = fileList.filter((item) => item.report !== "");
  const allTitle = fileList
    .filter((item) => item.report !== "")
    .map((item) => item.title);
  const handleSubmit = () => {
    setLoading(true);
    if (data.dbName) {
      if (allFiles?.length > 0) {
        const formData = new FormData();
        formData.append("patient_hn", data.patient_hn);
        formData.append("doctor_id", data.doctor_id);
        formData.append("remarks", data.remarks);
        formData.append("lab_name", data.lab_name);
        formData.append("center_id", data.center_id);
        formData.append("report_type", data.report_type);
        formData.append("titles", JSON.stringify(allTitle));
        if (data.saas_branch_id) {
          formData.append("saas_branch_id", data.saas_branch_id);
          formData.append(
            "saas_branch_name",
            branchList?.find(
              (item) => Number(item.id) === Number(data?.saas_branch_id)
            )?.name
          );
        }
        Array.from(allFiles).forEach((item) => {
          formData.append("images[]", item.report);
        });
        http
          .post("/exlab/file-upload", formData, {
            headers: {
              databaseName: data.dbName,
            },
          })
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Report has been send successfully!",
              icon: "success",
            });
            setLoading(false);
            setFileList([{ report: "", title: "", id: 1 }]);
            setData({
              patient_hn: "",
              doctor_id: "",
              remarks: "",
              lab_name: "Test Lab",
              center_id: "1",
              org: "",
              dbName: "",
              doctorName: 1,
              patientName: 1,
              report_type: "pathology",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err?.response?.data?.message,
              icon: "error",
            });
            setLoading(false);
          });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Please upload at least one report!",
          icon: "error",
        });
        setLoading(false);
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please select an organization!",
        icon: "error",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <div className=" w-6/12 mx-auto mt-12 mb-2 bg-white rounded-md py-7  px-4  shadow-md">
          <div className="flex justify-center items-center flex-col gap-2">
            <img
              src="./logo.png"
              alt="logo"
              className="h-20 text-center my-2"
            />
            <h6 className="text-base font-medium  leading-7 text-center ">
              Report Send To Another Lab
            </h6>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="firstName"
                className="block ps-1 outline-none text-sm font-medium leading-6 "
              >
                Organization
              </label>
              <SimpleSelect
                options={orgList?.map((item) => ({
                  ...item,
                  value: item.db_name,
                  label: item.name,
                }))}
                placeholder="Search Organization"
                width="100%"
                value={selectedOrg}
                onChange={(dataOrg) => {
                  if (dataOrg) {
                    setSelectedOrg(dataOrg);
                    setData({ ...data, dbName: dataOrg.db_name });
                  } else {
                    setSelectedOrg(null);
                    setData({ ...data, dbName: "" });
                  }
                }}
              />
            </div>
            {branchList?.length > 0 && (
              <div className="sm:col-span-6">
                <label
                  htmlFor="branchList"
                  className="block ps-1 outline-none text-sm font-medium leading-6 "
                >
                  Branch
                </label>
                <SimpleSelect
                  options={branchList?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  width="100%"
                  placeholder="Search Branch"
                  value={selectedBranch}
                  isLoading={branchLoading}
                  isDisabled={branchLoading}
                  onChange={(dataBc) => {
                    if (dataBc) {
                      setSelectedBranch(dataBc);
                      setData({ ...data, saas_branch_id: dataBc.value });
                    } else {
                      setSelectedBranch(null);
                      setData({ ...data, saas_branch_id: "" });
                    }
                  }}
                />
              </div>
            )}
            <div className="sm:col-span-6">
              <label
                htmlFor="first-name"
                className="block ps-1 outline-none text-sm font-medium leading-6 "
              >
                Doctor Id
              </label>
              <input
                type="text"
                name="doctor_id"
                value={data.doctor_id}
                onChange={handleChange}
                onBlur={handleDocCheck}
                id="first-name"
                autoComplete="given-name"
                className="block ps-1 outline-none w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-[#69b128] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#69b128] sm:text-sm sm:leading-6"
              />
              <span className="ms-2">
                {data.doctorName !== 1 ? "Dr " + data.doctorName : ""}
              </span>
              {data?.doctor?.specialist && (
                <span className="ms-3">
                  Specialist: {data?.doctor?.specialist?.specialists_name}
                </span>
              )}

              {data?.doctor?.academic?.length > 0 &&
                data?.doctor?.academic?.map((item, index) => (
                  <span key={index} className="ms-1">
                    , {item?.degree_id}
                  </span>
                ))}
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="first-name"
                className="block ps-1 outline-none text-sm font-medium leading-6 "
              >
                Patient Hn Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="patient_hn"
                  value={data.patient_hn}
                  onBlur={handlePatientCheck}
                  onChange={handleChange}
                  id="first-name"
                  autoComplete="given-name"
                  className="block ps-1 outline-none w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-[#69b128] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#69b128] sm:text-sm sm:leading-6"
                />
                <span className="ms-2">
                  {data.patientName !== 1 ? data.patientName : ""}
                </span>
                {data?.patient?.patient_birth_sex && (
                  <>
                    <span className="ms-3">
                      Gender :{" "}
                      {data?.patient?.patient_birth_sex?.birth_sex_name}
                    </span>
                  </>
                )}
                {data?.patient?.patient_dob && (
                  <>
                    <span className="ms-3">
                      Age : {moment().diff(data?.patient?.patient_dob, "years")}
                    </span>
                  </>
                )}
                {data?.patient?.blood_group && (
                  <>
                    <span className="ms-3">
                      Blood Group :{" "}
                      {data?.patient?.blood_group?.blood_group_name}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="sm:col-span-6">
              <div className="flex">
                <label
                  htmlFor="first-name"
                  className="block ps-1 outline-none text-sm font-medium leading-6 "
                >
                  Report Type
                </label>
                <div className="flex items-center ms-11">
                  <input
                    name="report_type"
                    onChange={handleChange}
                    value="pathology"
                    type="radio"
                    checked={data.report_type === "pathology"}
                    id="pathology"
                  />
                  <label
                    htmlFor="pathology"
                    className=" ps-1 outline-none text-sm font-medium leading-6  me-3"
                  >
                    Pathology
                  </label>

                  <input
                    name="report_type"
                    onChange={handleChange}
                    value="radiology"
                    checked={data.report_type === "radiology"}
                    type="radio"
                    id="radiology"
                  />
                  <label
                    htmlFor="radiology"
                    className=" ps-1 outline-none text-sm font-medium leading-6  me-3"
                  >
                    Radiology
                  </label>
                </div>
              </div>
            </div>

            {fileList.map((item, i) => (
              <div key={item.id} className="sm:col-span-6">
                <div className="grid grid-cols-12 gap-x-4 gap-y-4">
                  <div className="col-span-6">
                    <label
                      htmlFor="first-name"
                      className="block ps-1 outline-none text-sm font-medium leading-6 "
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={item.title}
                      onChange={(e) => handleFileTitleInput(e, i)}
                      id="first-name"
                      autoComplete="given-name"
                      className="block mt-2 ps-1 outline-none w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-[#69b128] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#69b128] sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="first-name"
                      className="block ps-1 outline-none text-sm font-medium leading-6 "
                    >
                      Report File
                    </label>
                    <div className="mt-2 grid grid-cols-12">
                      <div className="col-span-10">
                        <label className="block ">
                          <span className="sr-only">Choose profile photo</span>
                          <input
                            type="file"
                            name="report"
                            onChange={(e) => handleFileInput(e, i)}
                            accept=".pdf, image/*"
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-violet-50 file:text-[#69b128] hover:file:bg-violet-100 ps-1 outline-none rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-[#69b128] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#69b128] sm:text-sm sm:leading-6"
                          />
                        </label>
                      </div>
                      <div className="col-span-2 flex items-center">
                        {fileList.length - 1 === i && (
                          <FiPlus
                            style={{ fontSize: "20px" }}
                            onClick={handleInput}
                            className="ms-1 cursor-pointer text-slate-700"
                          />
                        )}
                        {fileList.length !== 1 && (
                          <FiMinus
                            style={{ fontSize: "20px" }}
                            onClick={() => handleRemoveInput(item.id)}
                            className="ms-1 cursor-pointer text-slate-700"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="sm:col-span-6">
              <label
                htmlFor="first-name"
                className="block ps-1 outline-none text-sm font-medium leading-6 "
              >
                Remarks
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  name="remarks"
                  value={data.remarks}
                  onChange={handleChange}
                  rows="4"
                  id="first-name"
                  autoComplete="given-name"
                  className="block ps-1 outline-none w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-[#69b128] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#69b128] sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="add-more-btn me-2 bg-[#69b128] text-white py-1 px-2 my-2 rounded"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
