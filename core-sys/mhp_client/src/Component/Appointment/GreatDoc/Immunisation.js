import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-modal";
import "./Immunisation.css";
import { toast } from "react-toastify";
import moment from "moment";
import Swal from "sweetalert2";
const Immunisation = (props) => {
  const customStyles = {
    content: {
      top: "35%",
      left: "30%",
      height: "550px",
      width: "75%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#ffff",
      padding: "5px",
    },
  };

  // // get immunisation data

  const [billingData, setBillingData] = useState([]);
  const [givenData, setGivenData] = useState([]);
  const [siteData, setSiteData] = useState([]);
  const [batchNoData, setBatchNoData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [vaccineAgainstTags, setvaccineAgainstTags] = useState([]);

  useEffect(() => {
    axios.get(`/billing-provider`).then((res) => {
      setBillingData(res.data.billingProvider);
    });
    axios.get(`/given-by`).then((res) => {
      setGivenData(res.data.givenBy);
    });

    axios.get(`/immunisation-site`).then((res) => {
      if (res.data.status === 200) {
        setSiteData(res.data.immunisationSite);
      }
    });

    axios.get(`/batch-no`).then((res) => {
      setBatchNoData(res.data.batchNo);
    });

    axios.get(`/immunisation-route`).then((res) => {
      if (res.data.status === 200) {
        setRouteData(res.data.immunisationRoute);
      }
    });
  }, []);

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  console.log("date", date);
  const [date2, setDate2] = useState(null);
  const [dateBatch, setDateBatch] = useState(null);
  const [providerId, setProviderId] = useState("");
  const [givenById, setGivenById] = useState("");
  const [seq, setSeq] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [siteId, setSiteId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [serialId, setserialId] = useState("");
  const [comment, setcomment] = useState("");
  const [sendRemainder, setsendRemainder] = useState(false);
  const [saveBatchDetails, setsaveBatchDetails] = useState(false);
  const [includeInteractive, setincludeInteractive] = useState(false);

  const handleProviderChange = (e) => {
    setProviderId(e.target.value);
  };
  const handleGivenByChange = (e) => {
    setGivenById(e.target.value);
  };
  const handleIncludeInteractiveChange = (e) => {
    if (e.target.checked) {
      setincludeInteractive(true);
    } else {
      setincludeInteractive(false);
    }
  };

  const handleSeqChange = (e) => {
    setSeq(e.target.value);
  };
  const handleBatchChange = (e) => {
    setBatchNo(e.target.value);
  };
  const handleSiteChange = (e) => {
    setSiteId(e.target.value);
  };
  const handleRouteChange = (e) => {
    setRouteId(e.target.value);
  };
  const handleSerialNoChange = (e) => {
    setserialId(e.target.value);
  };
  const handleCommentChange = (e) => {
    setcomment(e.target.value);
  };
  const handleRemainderChange = (e) => {
    if (e.target.checked) {
      setsendRemainder(true);
    } else {
      setsendRemainder(false);
    }
  };

  const [updateData, setUpdateData] = useState("");
  const handleSave = () => {
    const immunisationData = {
      billing_provider_id: providerId,
      include_inactive_providers: includeInteractive,
      given_by_id: givenById,
      seq: seq,
      date: date,
      batch_no: batchNo,
      site_id: siteId,
      route_id: routeId,
      batch_expiry_date: date2,
      save_batch_details: saveBatchDetails,
      serial_no: serialId,
      comment: comment,
      send_remainder: sendRemainder,
      remainder_date: dateBatch,
      patient_id: props.patient_id,
      vaccine_against_id: vaccineId,
    };
    if (!vaccineId || vaccineId === "") {
      toast.error("Please Select Vaccine");
      return;
    }
    axios.post(`/add-immunisation-greatdoc`, immunisationData).then((res) => {
      if (res.data.status === 200) {
        toast.success("Immunisation Added Successfully");
        setBatchNo("");
        setProviderId("");
        setincludeInteractive("");
        setGivenById("");
        setSeq("");
        setDate2(null);
        setSiteId("");
        setRouteId("");
        setsaveBatchDetails("");
        setsendRemainder("");
        setDateBatch(null);
        setserialId("");
        setVaccineId("");
        setUpdateData(Math.random());
      }

      var checkboxes = document.getElementsByName("Jaundiced");
      for (var checkbox of checkboxes) {
        if (checkbox.checked) {
          checkbox.checked = false;
        }
      }
    });
  };
  const [vaccineId, setVaccineId] = useState("");

  const [active, setActive] = useState("");
  const handleClick = (e, index, item) => {
    console.log("item", item);
    setActive(index);
    setVaccineId(item.id);
    setDate2(item.Validity);
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [immunisationHistory, setImmunisationHistory] = useState([]);
  useEffect(() => {
    if (props.patient_id) {
      axios.get(`/get-immunisation/${props.patient_id}`).then((res) => {
        setImmunisationHistory(res.data.immunisation);
      });
    }
    axios.get(`/vaccine-against`).then((res) => {
      if (res.data.status === 200) {
        setvaccineAgainstTags(res.data.vaccine_tags);
      }
    });
  }, [props.patient_id, updateData]);
  const deleteImmunisationHistory = (id, e) => {
    const thisClicked = e.currentTarget;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/delete-immunisation/${id}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest("tr").remove();
          }
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };
  return (
    <div className="rx-one-button-group">
      {
        props?.patient_id &&
        <button
          onClick={() => setIsOpen(true)}
          className="btn float-end me-2 mb-2"
        >
          Add Immunization
        </button>
      }

      <div className="past-history-table">
        {immunisationHistory.length > 0 ? (
          <>
            <table className="past_rx_table">
              <thead>
                <tr>
                  <th scope="col" width="10%">
                    Date
                  </th>
                  <th scope="col" width="15%">
                    Vaccine Name
                  </th>
                  <th scope="col" width="30%">
                    Vaccine Against
                  </th>
                  <th scope="col">Provider</th>
                  <th scope="col">Batch No</th>
                  <th scope="col">Route</th>
                  <th scope="col">Given By</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {immunisationHistory.length > 0 &&
                  immunisationHistory.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                        <td>{item.mhp_vaccine_names?.vaccine_name}</td>
                        <td>{item.mhp_vaccine_against?.against_tags}</td>
                        <td>{item.mhp_billing_provider?.name}</td>
                        <td>{item.mhp_batch_no?.name}</td>
                        <td>{item.mhp_immunisation_route?.name}</td>
                        <td>{item.mhp_given_by?.name}</td>
                        <td>
                          <i
                            onClick={(e) => deleteImmunisationHistory(item.id, e)}
                            className="fal fa-trash-alt me-1"
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        ) : (
          // <i style={{ fontSize: "26px", marginLeft: "40%", marginTop: "2%" }} class="fas fa-spinner fa-spin"></i>
          <p className="text-center mt-lg-5 mt-lg-2 text-danger">
            Records are not available
          </p>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer" }}
          onClick={() => setIsOpen(false)}
        >
          <i class="fal fa-times"></i>
        </span>
        <h6 className="card-title">Add Immunization</h6>
        <div className="">
          <div className="immunisation-container">
            <div className="row immunisation-searchbox">
              <div className="col-3">{/* <p>Available Vaccines</p> */}</div>
              <div className="form col-6" style={{ padding: "0 15px" }}>
                <input
                  type="text"
                  onChange={(e) => {
                    const objet = vaccineAgainstTags.filter((item) =>
                      item.vaccine_name
                        .toLowerCase()
                        .match(e.target.value.toLowerCase())
                    );

                    if (e.target.value.length > 0) {
                      setvaccineAgainstTags(objet);
                    } else {
                      setUpdateData([...vaccineAgainstTags]);
                    }
                  }}
                  className="form-control form-input immunisation-search"
                  placeholder="Search Available Vaccines"
                />
              </div>
            </div>

            <div className="table_scroll g-doc-scroll">
              <Table className="immunisation-table mt-1 g-doc-scroll">
                <tbody>
                  <tr>
                    {/* <td className='w-50 tableHead fw-bold'>No</td> */}
                    <td className="w-50 tableHead fw-bold">Vaccine</td>
                    <td className="w-50 tableHead fw-bold">Against</td>
                  </tr>
                  {vaccineAgainstTags.map((item, i) => {
                    return (
                      <tr
                        key={i}
                        id="myDIV"
                        className={`${active === i && "active-row"}`}
                        onClick={(e) => {
                          handleClick(e, i, item);
                        }}
                      >
                        {/* <td><div class="form-check">
                                      <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                      <label class="form-check-label" for="flexCheckIndeterminate">
                                      </label>
                                  </div> </td> */}
                        <td>{item.vaccine_name}</td>
                        <td>{item.against_tags}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <div className="row mt-4">
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Billing Provider </label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm"
                      name="billingProvider"
                      value={providerId}
                      onChange={handleProviderChange}
                    >
                      <option>Select</option>
                      {billingData.length > 0 &&
                        billingData.map((item, i) => {
                          return (
                            <option key={i} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Seq</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={seq}
                      onChange={handleSeqChange}
                      aria-describedby="emailHelp"
                      name="seqText"
                      placeholder="Seq"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={includeInteractive}
                    onChange={handleIncludeInteractiveChange}
                    name="Jaundiced"
                  />
                  <label class="" for="flexCheckDefault">
                    Include inactive providers
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Given By </label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm"
                      name="givenBox"
                      value={givenById}
                      onChange={handleGivenByChange}
                    >
                      <option>Select</option>
                      {givenData.length > 0 &&
                        givenData.map((item, i) => {
                          return (
                            <option key={i} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Site</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm"
                      name="site"
                      onChange={handleSiteChange}
                      value={siteId}
                    >
                      <option>Select</option>
                      {siteData.length > 0 &&
                        siteData.map((item, i) => {
                          return (
                            <option key={i} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Batch No.</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm"
                      name="batch"
                      onChange={handleBatchChange}
                      value={batchNo}
                    >
                      <option>Select</option>
                      {batchNoData.length > 0 &&
                        batchNoData.map((item, i) => {
                          return (
                            <option key={i} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Date</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Route </label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select form-select-sm"
                      name="route"
                      value={routeId}
                      onChange={handleRouteChange}
                    >
                      <option>Select</option>
                      {routeData.length > 0 &&
                        routeData.map((item, i) => {
                          return (
                            <option key={i} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Batch Expiry</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="date"
                      onChange={(e) => setDate2(e.target.value)}
                      value={date2}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Serial No.</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="number"
                      value={serialId}
                      onChange={handleSerialNoChange}
                      className="form-control from-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-4">
                    <label>Remainder Date</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="date"
                      onChange={(e) => setDateBatch(e.target.value)}
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={sendRemainder}
                    onChange={handleRemainderChange}
                  />
                  <label class="" for="flexCheckDefault">
                    Include inactive providers
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="row">
                <div className="col-4">
                  <div className="row">
                    <div className="col-4">
                      <label> Comment</label>
                    </div>
                    <div className="col-8">
                      <textarea
                        rows="2"
                        name="message"
                        className="form-control"
                        placeholder="Your Message"
                        value={comment}
                        onChange={handleCommentChange}
                      >
                        {comment}
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="immunisation-btn">
              <button
                className="immunisation-cancel-btn"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button className="immunisation-save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Immunisation;
