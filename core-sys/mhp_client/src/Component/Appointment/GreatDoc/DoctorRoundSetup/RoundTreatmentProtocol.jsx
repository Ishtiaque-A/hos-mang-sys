import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import Button from "../../../../common/components/Button";
import { NewModal } from "../../../../common/components/NewModal";
import ReminderSetupSidebar from "../../../../admin_setup_pap/reminder_setup_main_sidebar/ReminderSetupSidebar";
import { IoMdSearch } from "react-icons/io";
import SimpleSelect from "../../../../common/components/SimpleSelect";
import { min } from "date-fns";
import { FaSpinner, FaTrash } from "react-icons/fa6";
import "./RoundSetup.css";
import { FaPlusCircle } from "react-icons/fa";
import { tr } from "date-fns/locale";

function RoundTreatmentProtocol() {
  const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);
  const [modalIsOpenForAdd, setModalIsOpenForAdd] = useState(false);

  useEffect(() => {
    axios.get("round-protocol-name").then((res) => {
      setData(res.data || []);
    });
  }, [refetch]);
  const handleEdit = (item) => {
    setUpdateData(item);
    setModalIsOpenForEdit(true);
  };

  const columns = [
    {
      title: "Name",
      field: "name",
    },

    {
      title: "Action",
      field: "action",
      cellStyle: {
        textAlign: "center !important",
        width: "7%",
      },
      render: (row) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => handleEdit(row)}
              style={{
                all: "unset",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              <i className="far fa-edit"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const onRefetch = () => setRefetch(!refetch);

  return (
    <div className="mt-2 ms-2">
      <div className="row">
        <div className="col-3">
          <ReminderSetupSidebar />
        </div>
        <div className="col-9">
          <div className="shadow-sm p-2 mb-3 bg-body rounded mt-1">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mt-1 mx-2"> Round Treatment Protocol Setup</h6>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <MaterialTable
                  columns={columns}
                  data={data}
                  options={{
                    search: true,
                    showTitle: false,
                    searchFieldAlignment: "left",
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [10, 20, 50, 100],
                  }}
                />
              </div>
            </div>
            <EditRoundTreatmentProtocol
              onRefetch={onRefetch}
              data={updateData}
              modalIsOpenForEdit={modalIsOpenForEdit}
              setModalIsOpenForEdit={setModalIsOpenForEdit}
              modalIsOpenForAdd={modalIsOpenForAdd}
              setModalIsOpenForAdd={setModalIsOpenForAdd}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoundTreatmentProtocol;

const emptyValues = {
  name: "",
};
const AddRoundTreatmentProtocol = ({
  modalIsOpenForAdd,
  closeAddModal,
  onRefetch,
  handleAddDrug,
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [form, setForm] = useState(emptyValues);

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    try {
      e.preventDefault();
      setForm(emptyValues);
      const res = await axios.post("round-protocol-name", form);
      if (res.status === 200) {
        toast.success("Protocol Name added successfully");
        onRefetch();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      // setModalIsOpenForAdd(false);
      setBtnLoading(false);
    }
  };
  const searchDrugsTypeOptions = [
    { value: "1", label: "Brand Name" },
    { value: "2", label: "Generic Name" },
  ];
  const [searchSelectedDrugs, setsearchSelectedDrugs] = useState(
    searchDrugsTypeOptions[0]
  );
  const [noDataFound, setnoDataFound] = useState("");
  const [searchDrugs, setsearchDrugs] = useState();
  const [loding, setloding] = useState(false);
  const [drgsInfo, setdrgsInfo] = useState([]);
  const handleSearchDrugs = (e) => {
    setnoDataFound("");
    setloding(true);

    if (searchDrugs) {
      axios
        .get(`search-drug-update`, {
          params: {
            typeSelection: "drugs",
            name: searchDrugs,
            drugType: searchSelectedDrugs?.value,
          },
        })
        .then((res) => {
          setdrgsInfo(res.data);
          setloding(false);
          setnoDataFound("");
        })
        .catch((err) => {
          if (err.response.status === 404) setnoDataFound("Data Not Found");
        });
    }
  };
  const closeModal = () => {
    setdrgsInfo([]);
    closeAddModal();
  };
  return (
    <NewModal size="lg" isOpen={modalIsOpenForAdd} onClose={closeModal}>
      <NewModal.Header onClose={closeModal}>
        <NewModal.Title>Add Drug</NewModal.Title>
      </NewModal.Header>
      <NewModal.Body styles={{ minHeight: "200px" }}>
        <div className="rx-search-container rx-bg-white row p-2">
          <div className="col-lg-12 col-md-12 d-flex align-items-center gap-2">
            <SimpleSelect
              options={searchDrugsTypeOptions}
              width="140px"
              menuPlacement="bottom"
              isClearable={false}
              value={searchSelectedDrugs}
              onChange={(data) => {
                setsearchSelectedDrugs(data);
              }}
            />
            <input
              placeholder="Search Drugs Name"
              onChange={(e) => {
                if (e.target.value.length > 2) {
                  setsearchDrugs(e.target.value);
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchDrugs();
                }
              }}
              type="text"
              className="form-control form-control-sm"
            />
            <button onClick={handleSearchDrugs} className="gd-btn">
              <IoMdSearch size={20} />
            </button>
          </div>
          <div
            style={{ height: "250px", overflowY: "auto" }}
            className="g-doc-scroll"
          >
            <table className="w-100">
              <tbody>
                <tr
                  className="rx-table-first-row"
                  style={{
                    position: "sticky",
                    top: "0",
                    background: "white",
                  }}
                >
                  <td>Trade Name</td>
                  <td>Generic Name</td>
                  <td style={{ textAlign: "center" }}>Action</td>
                </tr>
                {drgsInfo?.length > 0 && noDataFound === "" ? (
                  !loding ? (
                    drgsInfo.map((value, i) => (
                      <tr
                        key={value?.id}
                        className="search-rx-table-active"
                        // className={`${
                        //   medicine?.id === value.id ? "rx-table-active" : ""
                        // }`}
                      >
                        <td width={"50%"}>{value?.macrohealth_sg}</td>
                        <td>{value?.generic_Name}</td>
                        <td width={"10%"}>
                          <button
                            style={{ padding: "2px 10px" }}
                            className="gd-btn my-1"
                            onClick={() =>
                              handleAddDrug(value, searchSelectedDrugs?.value)
                            }
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} rowSpan={4}>
                        <div
                          style={{ minHeight: "120px" }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <FaSpinner size={26} className="fa-spin" />
                        </div>
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          fontSize: "16px",
                          color: "red",
                          height: "150px",
                        }}
                      >
                        {noDataFound}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </NewModal.Body>
      <NewModal.Footer>
        <Button
          onClick={closeAddModal}
          disabled={btnLoading}
          isLoading={btnLoading}
        >
          Close
        </Button>
      </NewModal.Footer>
    </NewModal>
  );
};

const EditRoundTreatmentProtocol = ({
  data,
  modalIsOpenForEdit,
  setModalIsOpenForEdit,
  setModalIsOpenForAdd,
  modalIsOpenForAdd,
  onRefetch,
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [form, setForm] = useState(emptyValues);
  const [details, setDetails] = useState([]);
  const [route, setRoute] = useState([]);
  const [cycleData, setCycleData] = useState({
    frequency: "",
    cycle: "",
  });
  useEffect(() => {
    setForm(data);
    axios.get(`round-protocol-name/${data?.id}`).then((res) => {
      setDetails(res?.data);
    });
    axios.get("route-name").then((res) => {
      setRoute(res.data.routesName);
    });
    setCycleData({
      frequency: data?.frequency,
      cycle: data?.cycle,
    });
  }, [data]);

  const [currentCycle, setCurrentCycle] = useState({});
  const [drugType, setDrugType] = useState("");
  const openAddModal = (cycle, type) => {
    setCurrentCycle(cycle);
    setDrugType(type);
    setModalIsOpenForAdd(true);
  };
  const closeAddModal = () => {
    setCurrentCycle({});
    setModalIsOpenForAdd(false);
    setDrugType("");
  };
  const handleAddDrug = (drug, selected) => {
    const existingCycles = [...details];
    const cycle = existingCycles.find((c) => c.id === currentCycle.id);
    if (cycle) {
      const drugName =
        selected === "1" ? drug?.macrohealth_sg : drug?.generic_Name;
      const newDrug = {
        newid: drug?.id,
        drug_name: drugName,
        dose: "",
        route_id: "",
        instruction: "",
        trigger_dose_change: "",
        day: "",
        day_to: "",
        type: drugType,
      };
      cycle.drugs.push(newDrug);
      setDetails(existingCycles);
    }
  };
  const handleRemoveDrug = (drug, id) => {
    const existingCycles = [...details];
    const cycle = existingCycles.find((c) => Number(c.id) === Number(id));
    if (cycle) {
      if (drug?.newid) {
        cycle.drugs = cycle.drugs.filter(
          (d) => Number(d?.newid) !== Number(drug?.newid)
        );
        setDetails(existingCycles);
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You want to remove this drug",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`round-protocol-details-delete/${drug?.id}`)
              .then((res) => {
                if (res.status === 200) {
                  cycle.drugs = cycle.drugs.filter(
                    (d) => Number(d?.id) !== Number(drug?.id)
                  );
                  setDetails(existingCycles);
                  toast.success("Drug removed successfully");
                }
              });
          }
        });
      }
    }
  };
  const handleChange = (e, drug, id) => {
    const existingCycles = [...details];
    const { value, name } = e.target;
    const cycle = existingCycles.find((c) => Number(c.id) === Number(id));
    if (cycle) {
      if (drug?.newid) {
        cycle.drugs = cycle.drugs.map((d) => {
          if (Number(d?.newid) === Number(drug?.newid)) {
            d[name] = value;
          }
          return d;
        });
        setDetails(existingCycles);
      } else {
        cycle.drugs = cycle.drugs.map((d) => {
          if (Number(d?.id) === Number(drug?.id)) {
            d[name] = value;
          }
          return d;
        });
        setDetails(existingCycles);
      }
    }
  };

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    try {
      e.preventDefault();
      await axios
        .post(`round-protocol-name-details/`, {
          details: details,
          id: data?.id,
          frequency: cycleData?.frequency,
          cycle: cycleData?.cycle,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Protocol Name updated successfully");
            setForm(emptyValues);
            onRefetch();
          }
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setModalIsOpenForEdit(false);
      setBtnLoading(false);
    }
  };
  const closeModal = () => {
    setModalIsOpenForEdit(false);
    setDetails([]);
    setCurrentCycle({});
    setCycleData({});
  };
  return (
    <NewModal size="full" isOpen={modalIsOpenForEdit} onClose={closeModal}>
      <NewModal.Header onClose={closeModal}>
        <NewModal.Title>{data?.name}</NewModal.Title>
      </NewModal.Header>
      <NewModal.Body
        styles={{ minHeight: "400px" }}
        className="modal-body-full"
      >
        <div>
          {details?.length > 0 ? (
            <>
              {details?.map((item) => (
                <div key={item?.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6>{item?.name}</h6>
                  </div>
                  <table className="past_rx_table">
                    <tbody>
                      <tr>
                        <td className="text-start fw-bold">Drug</td>
                        <td className="fw-bold">Dose</td>
                        <td className="fw-bold">Route</td>
                        <td className="fw-bold">Instruction</td>
                        <td className="fw-bold">Trigger dose change</td>
                        <td className="fw-bold">Day</td>
                        <td className="fw-bold" width={"5%"}>
                          Action
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={6} className="text-start">
                          <h6>Pre Medications</h6>
                        </td>
                        <td>
                          <FaPlusCircle
                            style={{
                              fontSize: "18px",
                              cursor: "pointer",
                              color: "#69b128",
                              // color: "white",
                            }}
                            onClick={() => openAddModal(item, "pre")}
                          />
                        </td>
                      </tr>
                      {item?.drugs
                        ?.filter((drug) => drug?.type === "pre")
                        ?.map((it) => (
                          <tr key={it?.id}>
                            <td className="text-start">{it?.drug_name}</td>
                            <td>
                              {/* <div style={{ width: "100px" }}> */}
                              <input
                                defaultValue={it?.dose}
                                type="text"
                                className="form-control form-control-sm"
                                name="dose"
                                onBlur={(e) => handleChange(e, it, item?.id)}
                              />
                              {/* </div> */}
                            </td>
                            <td>
                              <select
                                onChange={(e) => handleChange(e, it, item?.id)}
                                name="route_id"
                                className="form-select form-select-sm mb-1"
                                aria-label=".form-select-sm example"
                                value={it?.route_id}
                              >
                                <option value="">Select</option>
                                {route.length > 0 &&
                                  route.map((rt, i) => {
                                    return (
                                      <option key={i} value={rt?.id}>
                                        {rt?.route_name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </td>
                            <td>
                              <textarea
                                name="instruction"
                                id=""
                                defaultValue={it?.instruction}
                                className="form-control form-control-sm"
                                onBlur={(e) => handleChange(e, it, item?.id)}
                              ></textarea>
                            </td>
                            <td>
                              <textarea
                                name="trigger_dose_change"
                                id=""
                                defaultValue={it?.trigger_dose_change}
                                className="form-control form-control-sm"
                                onBlur={(e) => handleChange(e, it, item?.id)}
                              ></textarea>
                            </td>
                            <td>
                              <div className="d-flex">
                                <input
                                  defaultValue={it?.day}
                                  type="number"
                                  className="form-control form-control-sm"
                                  name="day"
                                  placeholder="From"
                                  onBlur={(e) => handleChange(e, it, item?.id)}
                                />
                                <input
                                  defaultValue={it?.day_to}
                                  type="number"
                                  className="form-control form-control-sm ms-1"
                                  name="day_to"
                                  placeholder="To"
                                  onBlur={(e) => handleChange(e, it, item?.id)}
                                />
                              </div>
                            </td>
                            <td>
                              <FaTrash
                                className="PrescribedRxDelete"
                                onClick={() => handleRemoveDrug(it, item?.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <td colSpan={6} className="text-start">
                          <h6> Medications</h6>
                        </td>
                        <td>
                          <FaPlusCircle
                            style={{
                              fontSize: "18px",
                              cursor: "pointer",
                              color: "#69b128",
                              // color: "white",
                            }}
                            onClick={() => openAddModal(item, "medi")}
                          />
                        </td>
                      </tr>
                      {item?.drugs
                        ?.filter((drug) => drug?.type === "medi")
                        ?.map((it) => (
                          <tr key={it?.id}>
                            <td className="text-start">{it?.drug_name}</td>
                            <td>
                              {/* <div style={{ width: "100px" }}> */}
                              <input
                                defaultValue={it?.dose}
                                type="text"
                                className="form-control form-control-sm"
                                name="dose"
                                onBlur={(e) => handleChange(e, it, item?.id)}
                              />
                              {/* </div> */}
                            </td>
                            <td>
                              <select
                                onChange={(e) => handleChange(e, it, item?.id)}
                                name="route_id"
                                className="form-select form-select-sm mb-1"
                                aria-label=".form-select-sm example"
                                value={it?.route_id}
                              >
                                <option value="">Select</option>
                                {route.length > 0 &&
                                  route.map((rt, i) => {
                                    return (
                                      <option key={i} value={rt?.id}>
                                        {rt?.route_name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </td>
                            <td>
                              <textarea
                                name="instruction"
                                id=""
                                defaultValue={it?.instruction}
                                className="form-control form-control-sm"
                                onBlur={(e) => handleChange(e, it, item?.id)}
                              ></textarea>
                            </td>
                            <td>
                              <textarea
                                name="trigger_dose_change"
                                id=""
                                defaultValue={it?.trigger_dose_change}
                                className="form-control form-control-sm"
                                onBlur={(e) => handleChange(e, it, item?.id)}
                              ></textarea>
                            </td>
                            <td>
                              <div className="d-flex">
                                <input
                                  defaultValue={it?.day}
                                  type="number"
                                  className="form-control form-control-sm"
                                  name="day"
                                  placeholder="From"
                                  onBlur={(e) => handleChange(e, it, item?.id)}
                                />
                                <input
                                  defaultValue={it?.day_to}
                                  type="number"
                                  className="form-control form-control-sm ms-1"
                                  name="day_to"
                                  placeholder="To"
                                  onBlur={(e) => handleChange(e, it, item?.id)}
                                />
                              </div>
                            </td>
                            <td>
                              <FaTrash
                                className="PrescribedRxDelete"
                                onClick={() => handleRemoveDrug(it, item?.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <td colSpan={6} className="text-start">
                          <h6>Post Medications</h6>
                        </td>
                        <td>
                          <FaPlusCircle
                            style={{
                              fontSize: "18px",
                              cursor: "pointer",
                              color: "#69b128",
                              // color: "white",
                            }}
                            onClick={() => openAddModal(item, "post")}
                          />
                        </td>
                      </tr>
                      {item?.drugs
                        ?.filter((drug) => drug?.type === "post")
                        ?.map((it) => (
                          <tr key={it?.id}>
                            <td className="text-start">{it?.drug_name}</td>
                            <td>
                              {/* <div style={{ width: "100px" }}> */}
                              <input
                                defaultValue={it?.dose}
                                type="text"
                                className="form-control form-control-sm"
                                name="dose"
                                onBlur={(e) => handleChange(e, it, item?.id)}
                              />
                              {/* </div> */}
                            </td>
                            <td>
                              <select
                                onChange={(e) => handleChange(e, it, item?.id)}
                                name="route_id"
                                className="form-select form-select-sm mb-1"
                                aria-label=".form-select-sm example"
                                value={it?.route_id}
                              >
                                <option value="">Select</option>
                                {route.length > 0 &&
                                  route.map((rt, i) => {
                                    return (
                                      <option key={i} value={rt?.id}>
                                        {rt?.route_name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </td>
                            <td>
                              <textarea
                                name="instruction"
                                id=""
                                defaultValue={it?.instruction}
                                className="form-control form-control-sm"
                                onBlur={(e) => handleChange(e, it, item?.id)}
                              ></textarea>
                            </td>
                            <td>
                              <textarea
                                name="trigger_dose_change"
                                id=""
                                defaultValue={it?.trigger_dose_change}
                                className="form-control form-control-sm"
                                onBlur={(e) => handleChange(e, it, item?.id)}
                              ></textarea>
                            </td>
                            <td>
                              <div className="d-flex">
                                <input
                                  defaultValue={it?.day}
                                  type="number"
                                  className="form-control form-control-sm"
                                  name="day"
                                  placeholder="From"
                                  onBlur={(e) => handleChange(e, it, item?.id)}
                                />
                                <input
                                  defaultValue={it?.day_to}
                                  type="number"
                                  className="form-control form-control-sm ms-1"
                                  name="day_to"
                                  placeholder="To"
                                  onBlur={(e) => handleChange(e, it, item?.id)}
                                />
                              </div>
                            </td>
                            <td>
                              <FaTrash
                                className="PrescribedRxDelete"
                                onClick={() => handleRemoveDrug(it, item?.id)}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
              <div className="row mt-2">
                <div className="col-6">
                  <div className="row">
                    <div className="col-2">
                      <label htmlFor="">Frequency</label>
                    </div>
                    <div className="col-10">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="frequency"
                        defaultValue={cycleData?.frequency}
                        onBlur={(e) =>
                          setCycleData({
                            ...cycleData,
                            frequency: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-2 ">
                      <label htmlFor="">Cycle</label>
                    </div>
                    <div className="col-10 ">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="cycle"
                        defaultValue={cycleData?.cycle}
                        onBlur={(e) =>
                          setCycleData({ ...cycleData, cycle: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{ height: "200px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <FaSpinner size={26} className="fa-spin" />
            </div>
          )}

          <AddRoundTreatmentProtocol
            modalIsOpenForAdd={modalIsOpenForAdd}
            closeAddModal={closeAddModal}
            onRefetch={onRefetch}
            handleAddDrug={handleAddDrug}
          />
        </div>
      </NewModal.Body>
      <NewModal.Footer>
        <Button
          onClick={handleSubmit}
          disabled={btnLoading}
          isLoading={btnLoading}
        >
          Update
        </Button>
      </NewModal.Footer>
    </NewModal>
  );
};
