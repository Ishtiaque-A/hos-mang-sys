import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import Modal from "react-modal";
import moment from "moment";
import { FaPlusCircle, FaRegStickyNote } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import Barcode from "react-barcode/lib/react-barcode";
import { Grid, Tooltip } from "@material-ui/core";
import PrintIcon from "@mui/icons-material/Print";
import Select from "react-select";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { useReactToPrint } from "react-to-print";
import { BiEdit } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import SimpleSelect from "../../common/components/SimpleSelect";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import { formateHN, numHelper } from "../../utils/numberHelper";
import { formatPhoneNumber } from "react-phone-number-input";
import { NewModal } from "../../common/components/NewModal";
import Button from "../../common/components/Button";

const GreatLabSampleCollection = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceListSort, setInvoiceListSort] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specimen, setSpecimen] = useState([]);
  const [booths, setBooths] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [collectorList, setCollectorList] = useState([]);
  const [stickerCollector, setStickerCollector] = useState(null);

  useEffect(() => {
    axios.get(`/great-lab-all-invoice-without-page`).then((res) => {
      if (res.data.status === 200) {
        setInvoiceList(res?.data?.invoice);
        setInvoiceListSort(res?.data?.invoice);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    axios.get("specimen-for-test-name").then((res) => {
      const modifiedData = res?.data?.map((item) => ({
        label: item?.name,
        value: Number(item?.id),
      }));
      setSpecimen(modifiedData);
    });
    axios.get("great-lab-booth").then((res) => {
      const modifiedData = res?.data?.booths?.map((item) => ({
        label: item.name,
        ...item,
        value: item.id,
      }));
      setBooths(modifiedData);
    });

    axios
      .get("collectors")
      .then((res) => {
        if (res.status === 200) {
          const modifiedData = res.data.map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
          }));
          setCollectorList(modifiedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);
  const [testInfo, setTestInfo] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Invoice No",
      field: `invoiceNo`,
      render: (row) => numHelper(row.invoiceNo, 3),
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "HN",
      field: `name`,
      render: (row) => (
        <div style={{ padding: "0px 5px" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            {row.patient === "null"
              ? ""
              : formateHN(row.patient?.patient_hn_number)}
          </span>
        </div>
      ),
    },
    {
      title: "Name",
      field: `patient_first_name`,
      render: (row) => (
        <div style={{ padding: "0px 5px" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            {row.patient_first_name === "null" ? "" : row?.patient_first_name}
          </span>
        </div>
      ),
    },
    {
      title: "Branch",
      field: `saas_branch_name`,
    },
    {
      title: "Phone No",
      field: `patient_mobile_phone`,
      render: (row) => {
        return (
          <span style={{ whiteSpace: "nowrap" }}>
            {formatPhoneNumber(row?.patient_mobile_phone)}
          </span>
        );
      },
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Bill Date",
      field: "created_at",
      render: (row) => (
        <div style={{ padding: "0px 5px" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            {row.created_at === "null"
              ? ""
              : moment(row?.created_at).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Collection Date",
      field: "collectionDate",
      render: (row) => (
        <div style={{ padding: "0px 5px" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            {row?.sampleCollectionDate === null
              ? ""
              : moment(row?.sampleCollectionDate).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Test Name",
      field: "",
      render: (row) => {
        return (
          <div
            style={{
              backgroundColor: "#F4F4F4",
              borderRadius: "20px",
              padding: "7px 10px",
            }}
          >
            {row.tests === "null"
              ? ""
              : row.tests
                  .filter((test) => test.testCategory === "Pathology")
                  .map((item, i) => (
                    <>
                      <span
                        onClick={() => handleTestSampleCollection(item)}
                        className="me-1 fw-bold"
                        style={{
                          color: `${
                            Number(item.collectionStatus) === 1
                              ? "#69B128"
                              : "red"
                          } `,
                          cursor: "pointer",
                          display: "inline-block",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.testName}
                      </span>
                      {row.tests.length - 1 !== i && (
                        <span
                          style={{
                            borderLeft: "2px solid #DEDEDE",
                            display: "inline-block",
                            whiteSpace: "nowrap",
                          }}
                        ></span>
                      )}
                    </>
                  ))}
          </div>
        );
      },
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Status",
      field: "collection_status",
      render: (row) => {
        const result = row.tests
          ?.filter((test) => test.testCategory === "Pathology")
          .reduce(
            (total, current) => total + Number(current.collectionStatus),
            0
          );
        const testLength = row.tests?.filter(
          (test) => test.testCategory === "Pathology"
        ).length;
        return (
          <div style={{ padding: "0px 5px" }}>
            {result === testLength ? (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-success me-1"
                ></i>
                Collected
              </span>
            ) : result !== testLength && result > 0 ? (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-warning me-1"
                ></i>
                Partial
              </span>
            ) : (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-danger me-1"
                ></i>
                Not Collected
              </span>
            )}
          </div>
        );
      },

      cellStyle: {
        textAlign: "center",
        width: "3%",
      },
    },

    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            padding: "0px 5px",
          }}
        >
          <button
            data-bs-toggle="tooltip"
            title="Collect Sample"
            disabled={Number(row.isApprovedInSampleCollection) === 1}
            onClick={() => handleAddSample(row)}
            className="btn btn-sm action-btn"
          >
            <FaPlusCircle size={18} />
          </button>

          <button
            data-bs-toggle="tooltip"
            title="Edit Sample"
            disabled={Number(row.isApprovedInSampleCollection) === 1}
            onClick={() => handleEditSample(row)}
            className="btn btn-sm action-btn"
          >
            <BiEdit size={18} />
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Create Sticker"
            disabled={Number(row.isApprovedInSampleCollection) === 1}
            onClick={() => {
              handleSticker(row);
              handleTestSampleCollection(row.tests[0]);
            }}
            className="btn btn-sm action-btn"
          >
            <FaRegStickyNote size={18} />
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Approve"
            disabled={
              Number(row.isApprovedInSampleCollection) === 1 ||
              row.tests?.reduce(
                (total, current) => total + Number(current.collectionStatus),
                0
              ) === 0
            }
            onClick={() => sampleApprove(row)}
            className={`btn btn-sm action-btn ${
              Number(row.isApprovedInSampleCollection) === 1 && " text-success"
            }`}
          >
            <BsCheckCircleFill size={18} />
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Print Invoice"
            onClick={() => handleInvoice(row)}
            className={`btn btn-sm action-btn `}
          >
            <AiFillPrinter size={18} />
          </button>
        </div>
      ),
    },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenSample, setModalIsOpenSample] = useState(false);
  const [modalIsOpenSampleEdit, setModalIsOpenSampleEdit] = useState(false);

  const customStylesSample = {
    content: {
      top: "38%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "450px",
      height: "380px",
      padding: "20px",
      zIndex: "3000",
    },
  };
  const [selectedBranch, setSelectedBranch] = useState(null);
  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);
  useEffect(() => {
    const getBranch = async () => {
      const branches = await getAllBranch(
        SaasAuthURL + "/branch/service/find-branch-by-organizationId"
      );
      if (branches.status === 200) {
        const updatedBranches = branches?.data?.data?.map((branch) => ({
          ...branch,
          value: branch.id,
          label: branch.name,
        }));
        setOrgBranch(updatedBranches);
      }
    };
    getBranch();
    return () => {};
  }, [SaasAuthURL]);

  useEffect(() => {
    if (selectedBranch) {
      const filterData = invoiceListSort.filter((item) => {
        return item.saas_branch_id === selectedBranch?.value;
      });
      setInvoiceList(filterData);
    } else {
      setInvoiceList(invoiceListSort);
    }
    return () => {};
  }, [selectedBranch, invoiceListSort]);

  const handleChangeBranch = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const handleSticker = (item) => {
    setTestInfo(item);
    setModalIsOpen(true);
  };
  const handleAddSample = (item) => {
    setTestInfo(item);
    setModalIsOpenSample(true);
  };
  const handleEditSample = (item) => {
    setTestInfo(item);
    setModalIsOpenSampleEdit(true);
  };

  const handleStickerCollector = (e) => {
    setStickerCollector(e.target.value);
  };
  const [testDetails, setTestDetails] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [updateData, setUpdateData] = useState({
    collector: "",
    remark: "",
    collectionStatus: 1,
    collectionDate: new Date(),
    specimen_id: 0,
    specimen_name: "",
    booth_id: 0,
    collector_id: 0,
  });
  const handleTestSampleCollection = (item) => {
    axios.get(`great-lab-test-edit/${item.id}`).then((res) => {
      if (res.status === 200) {
        setTestDetails(res.data.test);
      }
    });
  };
  console.log(testDetails, "ddf");
  const addSample = (type) => {
    if (!updateData?.booth_id) {
      toast.error("Please select Booth !");
      return;
    }
    if (!updateData?.collector) {
      toast.error("Please select collector!");
      return;
    }
    if (!updateData.specimen_id) {
      toast.error("Please select specimen!");
      return;
    }

    if (!checkAll && !updateData?.test_id) {
      toast.error("Please select test!");
      return;
    }
    let allTest;
    if (checkAll) {
      allTest = testInfo?.tests?.map((item) => ({ ...item, ...testDetails }));
    }
    if (!checkAll && updateData?.test_id) {
      allTest = [...updateData.test];
    }

    if (checkAll || updateData?.test_id)
      axios
        .post(`great-lab-test-update`, {
          ...updateData,
          invoiceNo: allTest[0]?.invoiceNo,
          type: type,
          allTest,
        })
        .then((res) => {
          if (res.status === 200) {
            swal("Success", res.data.message, "success");
            axios.get(`/great-lab-all-invoice-without-page`).then((res) => {
              if (res.data.status === 200) {
                setInvoiceList(res?.data?.invoice);
                setLoading(false);
              }
            });

            setModalIsOpenSample(false);
            setModalIsOpenSampleEdit(false);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    if (testInfo.id || checkAll) {
      axios
        .post(`great-lab-update-date-invoice/${testInfo.id}`, {
          sampleCollectionDate: new Date(),
          remarkForSampleCollection: updateData.remark,
        })
        .then((res) => console.log(res));
      setUpdateData({
        collector: "",
        remark: "",
        collectionStatus: 1,
        collectionDate: new Date(),
        specimen_id: 0,
        specimen_name: "",
        booth_id: 0,
        collector_id: 0,
      });
    }
  };
  const sampleApprove = (item) => {
    if (item.id) {
      axios
        .post(`great-lab-sample-approve/${item.id}`, {
          isApprovedInSampleCollection: 1,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            swal("Success", res.data.message, "success");
            axios.get(`/great-lab-all-invoice-without-page`).then((res) => {
              if (res.data.status === 200) {
                setInvoiceList(res?.data?.invoice);
                setLoading(false);
              }
            });
          }
        });
    }
  };
  const addSticker = (e, item) => {
    const { checked } = e.target;
    const newSticker = [...stickers];
    if (checked) {
      newSticker.push(item);
      setStickers(newSticker);
    } else {
      const filteredSticker = newSticker.filter(
        (sticker) => sticker.id !== item.id
      );
      setStickers(filteredSticker);
    }
  };
  const allStickerAdd = (all) => {
    setStickers(all);
    setAllChecked(!allChecked);
  };
  //print lab agent billing info
  const componentRef = useRef();

  const handlePrintSticker = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = () => {
    if (stickers.length === 0) {
      toast.error("Please select test name !");
      return;
    }
    if (!stickerCollector) {
      toast.error("Please select collector!");
      return;
    }
    handlePrintSticker();
  };
  const printSingleSticker = async (item) => {
    setStickers(item);
    if (!stickerCollector) {
      toast.error("Please select collector!");
      return;
    } else {
      setTimeout(() => handlePrintSticker(), 1000);
    }
  };
  const invoiceRef = useRef();
  const handleInvoicePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  const handleInvoice = (item) => {
    setTestInfo(item);
    setTimeout(() => handleInvoicePrint(), 1000);
  };

  const discountTotal = testInfo?.tests?.reduce(
    (total, current) =>
      total + (Number(current.discount) * Number(current.fee)) / 100,
    0
  );
  // print test List
  const [selectedTest, setSelectedTest] = useState([]);
  const testRef = useRef();
  const handlePrintTest = useReactToPrint({
    content: () => testRef.current,
  });
  const printTestList = () => {
    if (selectedTest.length > 0) {
      handlePrintTest();
    } else {
      toast.error("Please select test for print!");
    }
  };
  // search with date range
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const searchByDateRange = () => {
    if (dateRange.startDate && dateRange.endDate) {
      axios
        .post("great-lab-invoice-date-range-search", dateRange)
        .then((res) => {
          if (res.status === 200) {
            setInvoiceList(res.data.invoice);
            setInvoiceListSort(res.data.invoice);
          }
        });
    } else {
      toast.error("Please enter start and end date!");
    }
  };
  const filterByStatus = (e) => {
    const { value } = e.target;
    if (value === "collected") {
      const filtered = invoiceListSort.filter(
        (invoice) =>
          invoice.tests.reduce(
            (total, current) => total + Number(current.collectionStatus),
            0
          ) === invoice.tests.length
      );
      setInvoiceList(filtered);
    } else if (value === "partial") {
      const filtered = invoiceListSort.filter(
        (invoice) =>
          invoice.tests.reduce(
            (total, current) => total + Number(current.collectionStatus),
            0
          ) > 0 &&
          invoice.tests.reduce(
            (total, current) => total + Number(current.collectionStatus),
            0
          ) < invoice.tests.length
      );
      setInvoiceList(filtered);
    } else if (value === "notCollected") {
      const filtered = invoiceListSort.filter(
        (invoice) =>
          invoice.tests.reduce(
            (total, current) => total + Number(current.collectionStatus),
            0
          ) === 0
      );
      setInvoiceList(filtered);
    } else if (value === "all") {
      setInvoiceList(invoiceListSort);
    }
  };

  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((item) => item.field !== "saas_branch_name");
    }
  }, [user?.isSuperAdmin, columns]);
  return (
    <div className="ms-2 lab-agent all-patients mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              Sample Collection
            </h5>
          </div>
          <div className="custom-card p-2 mt-2">
            <div className="row">
              <div className="col-3">
                <h6>Blood Sample Collection List</h6>
              </div>
              <div className="col-9 row">
                <div className="col-4 row">
                  <div className="col-2">
                    <label className="fw-bold"> Date</label>
                  </div>
                  <div className="col-10">
                    <input
                      onChange={(e) =>
                        setDateRange({
                          ...dateRange,
                          startDate: e.target.value,
                        })
                      }
                      type="date"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-4 row">
                  <div className="col-2">
                    <label className="fw-bold"> To</label>
                  </div>
                  <div className="col-10">
                    <input
                      onChange={(e) =>
                        setDateRange({ ...dateRange, endDate: e.target.value })
                      }
                      type="date"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-4 row">
                  <div className="col-3 rx-one-button-group">
                    <button onClick={searchByDateRange} className="btn">
                      Search
                    </button>
                  </div>
                  <div className="col-9 row">
                    <div className="col-3">
                      <label className="fw-bold"> Status</label>
                    </div>
                    <div className="col-9">
                      <select
                        onChange={filterByStatus}
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                      >
                        <option value="all">Select</option>
                        <option value="collected">Collected</option>
                        <option value="partial">Partial</option>
                        <option value="notCollected">Not Collected</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-table mt-2">
            <MaterialTable
              columns={filterColumns}
              data={invoiceList}
              isLoading={loading === true ? true : false}
              options={{
                search: true,
                showTitle: false,
                searchFieldAlignment: "left",
                pageSize: 10,
                emptyRowsWhenPaging: false,
                pageSizeOptions: [10, 20, 50, 100],
              }}
              onSelectionChange={(rows) => setSelectedTest(rows)}
              components={{
                Toolbar: (props) => (
                  <div className="d-flex justify-content-between align-items-center">
                    <MTableToolbar
                      style={{ width: 80, fontSize: 14 }}
                      {...props}
                    />
                    <Grid
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      {user?.isSuperAdmin && (
                        <SimpleSelect
                          options={orgBranch}
                          menuPlacement="bottom"
                          value={selectedBranch}
                          onChange={handleChangeBranch}
                        />
                      )}
                      {selectedTest.length > 0 && (
                        <Tooltip title="Print test list" placement="bottom">
                          <PrintIcon
                            className="float-end export-icon pe-auto me-3 mt-1"
                            onClick={printTestList}
                          />
                        </Tooltip>
                      )}
                    </Grid>
                  </div>
                ),
              }}
            />
            <div className="mt-2">
              <span className="me-2">
                <i
                  style={{ color: "red" }}
                  className="fa-solid fa-square me-1"
                ></i>
                Sample Not Collected Yet
              </span>
              <span className="me-2">
                <i
                  style={{ color: "#FFD600" }}
                  className="fa-solid fa-square me-1"
                ></i>
                Partial Sample Collected
              </span>
              <span className="me-2">
                <i
                  style={{ color: "#69B128" }}
                  className="fa-solid fa-square me-1"
                ></i>
                Sample Collected Done
              </span>
            </div>
          </div>
        </div>
      </div>
      <NewModal
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
          setStickers([]);
          setAllChecked(false);
          setStickerCollector(null);
        }}
      >
        <NewModal.Header
          onClose={() => {
            setModalIsOpen(false);
            setStickers([]);
            setAllChecked(false);
            setStickerCollector(null);
          }}
        >
          <NewModal.Title>Sticker</NewModal.Title>
        </NewModal.Header>
        <NewModal.Body>
          <div className="row">
            {testInfo?.tests?.length === 1 &&
              testInfo?.tests?.map((item, i) => <p key={i}>{item.testName}</p>)}
            {testInfo?.tests?.length > 1 && (
              <div className="col-3">
                <div className="form-check form-check-inline flex-fill">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => allStickerAdd(testInfo?.tests)}
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="me-2" for="flexCheckDefault">
                    All
                  </label>
                </div>
              </div>
            )}
            {testInfo?.tests?.length > 1 &&
              testInfo?.tests?.map((item, i) => (
                <div className="col-3">
                  <div key={i} className="form-check ">
                    <input
                      disabled={allChecked}
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => addSticker(e, item)}
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="me-2" for="flexCheckDefault">
                      {item.testName}
                    </label>
                  </div>
                </div>
              ))}
          </div>
          <hr />
          <div className="card-body">
            <div className="px-3">
              <div className="row mb-2">
                <div className="col-6">
                  <label style={{ fontWeight: "500" }}> HI NO</label>
                </div>
                <div className="col-6">
                  <input
                    readOnly
                    value={testInfo?.patient?.patient_hn_number}
                    type="text"
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label style={{ fontWeight: "500" }}> Name</label>
                </div>
                <div className="col-6">
                  <input
                    readOnly
                    value={testInfo?.patient?.fullName}
                    type="text"
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label style={{ fontWeight: "500" }}>Collector</label>
                </div>
                <div className="col-6">
                  {console.log(testInfo, "testInfo")}
                  <select
                    value={stickerCollector}
                    onChange={handleStickerCollector}
                    className="form-select form-select-sm"
                  >
                    <option value="">Select Collector</option>
                    {collectorList.map((item, i) => (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label style={{ fontWeight: "500" }}> Date of Birth</label>
                </div>
                <div className="col-4">
                  <input
                    readOnly
                    value={testInfo.patient?.patient_dob}
                    type="text"
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-2">
                  <span>
                    Male {moment().diff(testInfo.patient?.patient_dob, "years")}
                    yr
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Barcode
                  displayValue="true"
                  height="30"
                  width="2"
                  value={testInfo?.invoiceNo}
                />
              </div>
              <div className="d-flex mt-2 justify-content-center">
                {testInfo?.tests?.length === 1 ? (
                  <button
                    onClick={() => printSingleSticker(testInfo?.tests)}
                    className="vaital-setup-btn me-2"
                  >
                    Print
                  </button>
                ) : (
                  <button
                    onClick={handlePrint}
                    className="vaital-setup-btn me-2"
                  >
                    Print
                  </button>
                )}

                <button
                  onClick={() => {
                    setModalIsOpen(false);
                    setStickers([]);
                    setAllChecked(!allChecked);
                  }}
                  className="vaital-setup-btn-cancel me-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </NewModal.Body>
      </NewModal>
      {/* //////////////////////////////////// */}
      <NewModal
        isOpen={modalIsOpenSample}
        size="sm"
        onClose={() => setModalIsOpenSample(false)}
      >
        <NewModal.Header onClose={() => setModalIsOpenSample(false)}>
          <NewModal.Title>
            Sample Collection for {testInfo?.patient_first_name}
          </NewModal.Title>
        </NewModal.Header>

        <NewModal.Body>
          <div className="card-body">
            <div className="d-flex gap-2  my-2 " style={{ marginLeft: "40px" }}>
              <input
                type="checkbox"
                name="check-all-test"
                value={checkAll}
                className="form-check-input"
                id="checkAll"
                onChange={(e) => {
                  if (e.target.checked) {
                    setCheckAll(true);
                  } else {
                    setCheckAll(false);
                  }
                }}
              />
              <label
                className="mb-0 "
                style={{ fontWeight: "500" }}
                htmlFor="checkAll"
              >
                Collect All Sample
              </label>
            </div>
            <div className="px-3">
              <div className="row mb-2">
                <div className="col-6">
                  <label style={{ fontWeight: "500" }}> Select Booth</label>
                </div>
                <div className="col-6">
                  {console.log(booths, "booths")}
                  <SimpleSelect
                    options={booths}
                    width="100%"
                    menuPlacement="bottom"
                    value={
                      booths.find(
                        (item) =>
                          Number(item.id) === Number(updateData.booth_id)
                      ) || null
                    }
                    onChange={(data) => {
                      if (data) {
                        setUpdateData({ ...updateData, booth_id: data.value });
                      } else {
                        setUpdateData({ ...updateData, booth_id: 0 });
                      }
                    }}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label style={{ fontWeight: "500" }}> Collector Name</label>
                </div>
                <div className="col-6">
                  <SimpleSelect
                    options={collectorList}
                    onChange={(data) => {
                      if (data) {
                        setUpdateData({
                          ...updateData,
                          collector: data.label,
                          collector_id: data.id,
                        });
                      } else {
                        setUpdateData({
                          ...updateData,
                          collector: "",
                          collector_id: 0,
                        });
                      }
                    }}
                    width="100%"
                    menuPlacement="bottom"
                    value={
                      collectorList?.find(
                        (item) =>
                          Number(item.id) === Number(updateData.collector_id)
                      ) || null
                    }
                  />
                </div>
              </div>
              {!checkAll && (
                <div className="row mb-2">
                  <div className="col-6">
                    <label style={{ fontWeight: "500" }}>Test Name</label>
                  </div>
                  <div className="col-6">
                    <SimpleSelect
                      width="100%"
                      menuPlacement="bottom"
                      options={testInfo?.tests
                        ?.filter((test) => test.testCategory === "Pathology")
                        ?.map((item) => ({
                          ...item,
                          label: item.testName,
                          value: item.id,
                        }))}
                      value={testInfo?.tests
                        ?.filter((test) => test.testCategory === "Pathology")
                        ?.map((item) => ({
                          ...item,
                          label: item.testName,
                          value: item.id,
                        }))
                        ?.find(
                          (item) =>
                            Number(item.id) === Number(updateData.test_id)
                        )}
                      onChange={(data) => {
                        if (data) {
                          setUpdateData({
                            ...updateData,
                            test_id: data.id,
                            test: [{ ...data }],
                          });
                          setTestDetails({ ...updateData });
                        } else {
                          setUpdateData({
                            ...updateData,
                            test_id: 0,
                            test: [],
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="row mb-2">
                <div className="col-6">
                  <label htmlFor="specimen" className="form-label">
                    Specimen
                  </label>
                </div>
                <div className="col-6">
                  <SimpleSelect
                    options={specimen || []}
                    menuPlacement="bottom"
                    value={specimen.find(
                      (item) => item.value === updateData.specimen_id
                    )}
                    width="100%"
                    onChange={(data) => {
                      if (data) {
                        setUpdateData({
                          ...updateData,
                          specimen_id: data.value,
                          specimen_name: data.label,
                        });
                      } else {
                        setUpdateData({
                          ...updateData,
                          specimen_id: 0,
                          specimen_name: "",
                        });
                      }
                    }}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <label style={{ fontWeight: "500" }}>Remarks</label>
                </div>
                <div className="col-6">
                  <textarea
                    onBlur={(e) =>
                      setUpdateData({ ...updateData, remark: e.target.value })
                    }
                    className="form-control form-control-sm"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </NewModal.Body>
        <NewModal.Footer className="d-flex gap-2 justify-content-end">
          <Button onClick={() => setModalIsOpenSample(false)}>Cancel</Button>
          <Button onClick={() => addSample("Add")}>Save</Button>
        </NewModal.Footer>
      </NewModal>
      {/* //////////////////////// */}
      <Modal
        isOpen={modalIsOpenSampleEdit}
        onRequestClose={() => setModalIsOpenSampleEdit(false)}
        style={customStylesSample}
        contentLabel="Example Modal"
      >
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer" }}
          onClick={() => setModalIsOpenSampleEdit(false)}
        >
          <i class="fal fa-times"></i>
        </span>
        <div className="d-flex sticker-modal-lab">
          <h6 className="card-title me-3">
            Sample Collection for
            <span style={{ color: "#69B128" }}>
              {testInfo?.patient_first_name}
            </span>
          </h6>
        </div>
        <hr />

        <div className="card-body">
          <div className="px-3">
            <div className="row mb-2">
              <div className="col-6">
                <label style={{ fontWeight: "500" }}> Collector Name</label>
              </div>
              <div className="col-6">
                <Select
                  options={collectorList}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, collector: e.label })
                  }
                  getOptionLabel={(collector) => `${collector.label}`}
                  getOptionValue={(collector) => `${collector.label}`}
                  defaultInputValue={testDetails.collector}
                  menuPortalTarget={document.body} // Use this to prevent z-index issues
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      maxHeight: "200px", // Set a maximum height for the dropdown menu
                      overflowY: "auto", // Enable vertical scrolling
                      "::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "gray",
                        borderRadius: "10px",
                      },
                    }),
                  }}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <label style={{ fontWeight: "500" }}>Test Name</label>
              </div>
              <div className="col-6">
                <Select
                  options={testInfo?.tests}
                  onChange={(e) => handleTestSampleCollection(e)}
                  getOptionLabel={(test) => `${test.testName}`}
                  getOptionValue={(test) => `${test.testName}`}
                  defaultInputValue={testDetails.testName}
                  menuPortalTarget={document.body} // Use this to prevent z-index issues
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      maxHeight: "200px", // Set a maximum height for the dropdown menu
                      overflowY: "auto", // Enable vertical scrolling
                      "::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "gray",
                        borderRadius: "10px",
                      },
                    }),
                  }}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <label style={{ fontWeight: "500" }}> Remarks</label>
              </div>
              <div className="col-6">
                <textarea
                  defaultValue={testDetails.remark}
                  onBlur={(e) =>
                    setUpdateData({ ...updateData, remark: e.target.value })
                  }
                  className="form-control form-control-sm"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="d-flex mt-2 justify-content-end">
              <button
                onClick={() => addSample("update")}
                className="vaital-setup-btn me-2"
              >
                Update
              </button>
              <button
                onClick={() => setModalIsOpenSampleEdit(false)}
                className="vaital-setup-btn-cancel me-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div ref={componentRef} className="lab-sample-sticker-container m-3">
        {stickers.length > 1 &&
          stickers?.map((sticker, i) => (
            <div key={i} className="lab-sample-sticker mb-2 p-2">
              <div className="invoice-print">
                <div className="d-flex justify-content-between ">
                  <p>{testInfo.patient?.fullName}</p>
                  <p className="me-3">{sticker.testName}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>{testInfo.patient?.patient_hn_number}</p>
                  <p>
                    {moment(testInfo.patient?.patient_dob).format("DD/MM/YYYY")}
                    <span className="ms-2">M</span>
                    <span className="ms-2">
                      {moment().diff(testInfo.patient?.patient_dob, "years")}
                    </span>
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <Barcode
                    displayValue="false"
                    height="20"
                    width="2"
                    value={sticker.id}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <p>
                    Col :
                    {moment(sticker.updated_at).format(
                      "DD/MM/YYYY hh: mm: ss A"
                    )}
                  </p>
                  <p>By : {stickerCollector ? stickerCollector : ""}</p>
                </div>
              </div>
            </div>
          ))}
        {stickers.length === 1 && (
          <div className="lab-sample-sticker mb-2 p-2">
            <div className="invoice-print">
              <div className="d-flex justify-content-between ">
                <p>{testInfo.patient?.fullName}</p>
                <p className="me-3">{testDetails.testName}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>{testInfo.patient?.patient_hn_number}</p>
                <p>
                  {moment(testInfo.patient?.patient_dob).format("DD/MM/YYYY")}
                  <span className="ms-2">M</span>
                  <span className="ms-2">
                    {moment().diff(testInfo.patient?.patient_dob, "years")}
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <Barcode
                  displayValue="true"
                  height="20"
                  width="2"
                  value={testInfo?.invoiceNo}
                />
              </div>
              <div className="d-flex justify-content-between">
                <p>
                  Col :
                  {moment(testDetails.updated_at).format(
                    "DD/MM/YYYY hh: mm: ss A"
                  )}
                </p>
                <p>By : {stickerCollector ? stickerCollector : ""}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="print-invoice">
        <div ref={invoiceRef} className="sales-invoice">
          {testInfo && (
            <div style={{ padding: "60px" }} className="invoice-print">
              <div className="invoice-pharmacy-details d-flex justify-content-center">
                <div className="text-center">
                  <h5>{user?.organization_name}</h5>
                  <p>{user?.organization_address}</p>
                  {/* <p>Tel : 0171238765</p>
                  <p>Vat Reg No :534565 </p> */}
                </div>
              </div>
              <div className="row agent-details mb-3">
                <div className="col-6">
                  {/* <p>Agent Name : Mr X</p>
                  <p>Agent Phone : 01700001234</p> */}
                  <p>Patient Name : {testInfo?.patient?.fullName}</p>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <div>
                    {/* <p>Patient Name : {testInfo?.patient?.fullName}</p> */}
                    <p>Patient Phone : {testInfo?.patient_mobile_phone}</p>
                  </div>
                </div>
              </div>
              <div className="invoice-date d-flex justify-content-between invoice-border-dashed">
                <p>Invoice No : {testInfo?.invoiceNo} </p>
                <p>Date : {new Date().toLocaleDateString("en-GB")} </p>
              </div>
              <div className="invoice-item-table">
                <table>
                  <tr className="invoice-border-dashed">
                    <td>Code</td>
                    <td>Name</td>
                    <td>Rate</td>
                    <td>Qty</td>
                    <td className="text-end">Total</td>
                  </tr>
                  {testInfo?.tests?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.code}</td>
                      <td className="text-start">{item.testName}</td>
                      <td className="text-start">{item.fee}</td>
                      <td></td>
                      <td className="text-end">{Number(item.fee)}</td>
                    </tr>
                  ))}
                  {testInfo?.inventory?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.code}</td>
                      <td className="text-start">{item.name}</td>
                      <td className="text-start">{item.price}</td>
                      <td className="text-start">{item?.quantity}</td>
                      <td className="text-end">
                        {parseFloat(item.price) * parseFloat(item?.quantity)}
                      </td>
                    </tr>
                  ))}
                  <tr className="invoice-border-dashed-top">
                    <td colSpan={4} className="text-end">
                      Sub Total :
                    </td>
                    <td className="text-end">{testInfo?.totalBill} </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-end">
                      VAT / TAX :
                    </td>
                    <td className="text-end">0</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-end">
                      Discount :
                    </td>
                    <td className="text-end">{testInfo?.discount}</td>
                  </tr>

                  <tr className="invoice-border-dashed-top">
                    <td colSpan={4} className="text-end">
                      Bill Total :
                    </td>
                    <td className="text-end">
                      {parseFloat(testInfo?.totalBill) -
                        parseFloat(testInfo?.discount)}{" "}
                    </td>
                  </tr>
                  <tr className="invoice-border-dashed-top">
                    <td colSpan={4} className="text-end">
                      Paid :
                    </td>
                    <td className="text-end">{testInfo?.paidAmount} </td>
                  </tr>
                  {testInfo?.due && (
                    <tr className="invoice-border-dashed-top">
                      <td colSpan={4} className="text-end">
                        Due :
                      </td>
                      <td className="text-end">{testInfo?.due} </td>
                    </tr>
                  )}
                </table>
              </div>
              <div className="d-flex invoice-creator justify-content-between mt-1">
                <p>Provided By: Cashier</p>
                <p>Time : {new Date().toLocaleTimeString()}</p>
              </div>
              <div className="invoice-greeting d-flex justify-content-center align-items-center">
                <Barcode
                  displayValue="false"
                  height="30"
                  width="2"
                  value={testInfo?.invoiceNo}
                />
              </div>
              <div className="d-flex justify-content-center branding-section">
                <p>Thank You</p>
              </div>
              <div className="branding-section">
                <p>Technology Partner Zaimah Technologies Ltd.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedTest.length > 0 && (
        <div ref={testRef}>
          <div className="print-send-test-to-lab">
            <div className="invoice-pharmacy-details d-flex justify-content-center">
              <div className="text-center">
                <h5>Al Shifa Pharmacy</h5>
                <p>Location : Lalbagh</p>
                <p>Tel : 0171238765</p>
                <p>Vat Reg No :534565 </p>
              </div>
            </div>
            <h6 className="my-3 text-center">Test List</h6>
            <div className="d-flex justify-content-between mx-3">
              <p>To : IBN Sina Hospital</p>
              <p>
                Date :
                {moment(new Date().toJSON().slice(0, 10)).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="mx-3">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>HN</td>
                    <td>Name</td>
                    <td>Dob</td>
                    <td>Mobile Number</td>
                    <td>Test</td>
                    <td>Collection Date</td>
                    {/* <td>Collection Time</td> */}
                  </tr>
                  {selectedTest.map((test, i) => (
                    <tr key={i}>
                      <td>{test.patient?.patient_hn_number}</td>
                      <td>{test.patient?.patient_first_name}</td>
                      <td>
                        {moment(test.patient?.patient_dob).format("DD-MM-YYYY")}
                      </td>
                      <td>{test.patient?.patient_mobile_phone}</td>
                      <td>
                        {test.tests
                          ?.filter((ts) => ts.collectionStatus > 0)
                          .map((item, i) => (
                            <span>{item.testName} , </span>
                          ))}
                      </td>
                      <td>
                        {moment(test.sampleCollectionDate).format("DD-MM-YYYY")}
                      </td>
                      {/* <td>Collection Time</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row mt-5 mx-5">
              <div className="col-4 text-center">
                <span className="d-inline-block border-top">Prepared By</span>
              </div>
              <div className="col-4 text-center">
                <span className="d-inline-block border-top">Checked By</span>
              </div>
              <div className="col-4 text-center">
                <span className="d-inline-block border-top">Approved By</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreatLabSampleCollection;
