import React, { useEffect, useRef, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import fallbackImage from "../../Images/loginuser.png";
import { nullParser } from "../../utils/null-parser";
import moment from "moment";
import { formateHN } from "../../utils/numberHelper";
import { CiMenuKebab } from "react-icons/ci";
import { Popover, ArrowContainer } from "react-tiny-popover";
import { Dropdown } from "react-bootstrap";
import { TbProgressCheck } from "react-icons/tb";
import "./labRequest.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const LabRequest = () => {
  const [loading, setLoading] = useState(false);
  const [pathologyRequest, setPathologyRequest] = useState([]);
  const [radiologyRequest, setRadiologyRequest] = useState([]);
  const [pathologySelected, setPathologySelected] = useState([]);
  const [radiologySelected, setRadiologySelected] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data: pathologyRequest } = await axios.get(
          "lab-request-from-app-web",
          {
            params: {
              test_type: "pathology",
            },
          }
        );
        const { data: radiologyRequest } = await axios.get(
          "lab-request-from-app-web",
          {
            params: {
              test_type: "radiology",
            },
          }
        );
        console.log(pathologyRequest, radiologyRequest);
        setPathologyRequest(pathologyRequest?.data);
        setRadiologyRequest(radiologyRequest?.data);
        setPathologySelected([]);
        setRadiologySelected([]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);

  const availableStatus = ["Pending", "Processing", "Complete"];
  const BadgeStatus = ({ status }) => {
    const statusColor = {
      Pending: "#FFC107",
      Processing: "#007BFF",
      Complete: "#28A745",
    };
    const UpdatedStatus = !status ? 0 : status;
    return (
      <span
        style={{
          padding: "3px 12px",
          borderRadius: "10px",
          fontSize: "12px",
          fontWeight: "500",
          color: "#fff",
          background: statusColor[availableStatus[UpdatedStatus]],
        }}
      >
        {availableStatus[UpdatedStatus]}
      </span>
    );
  };

  const handleSingleComplete = async (row) => {
    try {
      const res = await axios.put(
        "lab-request-from-app-web-update/" + row?.id,
        {
          status: 2,
        }
      );
      if (res.status === 200) {
        onRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSingleProgress = async (row) => {
    try {
      const res = await axios.put(
        "lab-request-from-app-web-update/" + row?.id,
        {
          status: 1,
        }
      );
      if (res.status === 200) {
        onRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultipleAction = async (testType, statusName) => {
    let ids = [];
    if (testType === "pathology") {
      ids = pathologySelected?.map((row) => ({
        id: row.id,
        status: statusName === "progress" ? 1 : 2,
      }));
    } else if (testType === "radiology") {
      ids = radiologySelected?.map((row) => ({
        id: row.id,
        status: statusName === "progress" ? 1 : 2,
      }));
    }
    console.log(ids);
    try {
      const res = await axios.put("lab-request-from-app-web-update-multiple", {
        ids,
      });
      if (res.status === 200) {
        onRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const pathologyColumns = [
    {
      title: "Patient Info",
      field: "patient_id",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => {
        const patientImage = row?.patient?.patient_images
          ? row?.patient?.patient_images
          : null;
        return (
          <div className="d-flex gap-1 align-items-center">
            <img
              src={
                patientImage
                  ? `${global.img_url}/images/files/${patientImage}`
                  : fallbackImage
              }
              alt="patient"
              height={30}
              width={30}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#565656",
                  letterSpacing: "-0.3px",
                  lineHeight: "0.5",
                }}
              >
                {row?.patient?.fullName}
              </p>
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#565656",
                  letterSpacing: "-0.3px",
                }}
              >
                {formateHN(row?.patient?.patient_hn_number)}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Amount",
      field: "amount",
      render: (row) => {
        return parseFloat(row.amount || 0).toFixed(2);
      },
    },
    {
      title: "Test Names",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => {
        let parseTestNames = JSON.parse(row?.test_name || "[]");

        if (typeof parseTestNames === "string") {
          parseTestNames = JSON.parse(parseTestNames);
        }

        return (
          <div>
            {parseTestNames?.map((test, index) => (
              <p
                key={index}
                style={{
                  padding: "3px 12px",
                  whiteSpace: "nowrap",
                  marginBottom: "5px",
                  marginLeft: "5px",
                  color: "#69B128",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: "#F4F4F4",
                  borderRadius: "10px",
                }}
              >
                {test?.testName}
              </p>
            ))}
          </div>
        );
      },
    },

    {
      title: "Date",
      field: "created_at",
      render: (row) => {
        return moment(row.created_at).format("DD/MM/YYYY");
      },
    },
    {
      title: "Status",
      field: "status",
      render: (row) => {
        return <BadgeStatus status={row.status || 0} />;
      },
    },
    {
      title: "Action",
      cellStyle: {
        width: "12%",
      },
      render: (row) => {
        return (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <div>
              <span
                title="Progress"
                className={`lab__btn__action ${
                  parseInt(row.status) === 1 ? " lb__progress active " : ""
                }`}
                onClick={() => handleSingleProgress(row)}
              >
                <TbProgressCheck size={30} />
              </span>
            </div>
            <div>
              <span
                title="Complete"
                onClick={() => handleSingleComplete(row)}
                className={`lab__btn__action ${
                  parseInt(row.status) === 2 ? " complete active " : ""
                }`}
              >
                <IoMdCheckmarkCircleOutline size={30} />
              </span>
            </div>
          </div>
        );
      },
    },
  ];
  const RadiologyColumns = [
    {
      title: "Patient Info",
      field: "patient_id",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => {
        const patientImage = row?.patient?.patient_images
          ? row?.patient?.patient_images
          : null;
        return (
          <div className="d-flex gap-1 align-items-center">
            <img
              src={
                patientImage
                  ? `${global.img_url}/images/files/${patientImage}`
                  : fallbackImage
              }
              alt="patient"
              height={30}
              width={30}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#565656",
                  letterSpacing: "-0.3px",
                  lineHeight: "0.5",
                  whiteSpace: "nowrap",
                }}
              >
                {row?.patient?.fullName}
              </p>
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#565656",
                  letterSpacing: "-0.3px",
                  whiteSpace: "nowrap",
                }}
              >
                {formateHN(row?.patient?.patient_hn_number)}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Amount",
      field: "amount",
      render: (row) => {
        return parseFloat(row.amount || 0).toFixed(2);
      },
    },
    {
      title: "Test Names",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => {
        let parseTestNames = JSON.parse(row?.test_name || "[]");

        if (typeof parseTestNames === "string") {
          parseTestNames = JSON.parse(parseTestNames);
        }

        return (
          <div>
            {parseTestNames?.map((test, index) => (
              <p
                key={index}
                style={{
                  padding: "3px 12px",
                  whiteSpace: "nowrap",
                  marginBottom: "5px",
                  marginLeft: "5px",
                  color: "#69B128",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: "#F4F4F4",
                  borderRadius: "10px",
                }}
              >
                {test?.testName}
              </p>
            ))}
          </div>
        );
      },
    },

    {
      title: "Date",
      field: "created_at",
      render: (row) => {
        return moment(row.created_at).format("DD/MM/YYYY");
      },
    },
    {
      title: "Status",
      field: "status",
      render: (row) => {
        return <BadgeStatus status={row.status || 0} />;
      },
    },
    {
      title: "Action",
      render: (row) => {
        return (
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <div>
              <span
                title="Progress"
                className={`lab__btn__action ${
                  parseInt(row.status) === 1 ? " lb__progress active " : ""
                }`}
                onClick={() => handleSingleProgress(row)}
              >
                <TbProgressCheck size={30} />
              </span>
            </div>
            <div>
              <span
                title="Complete"
                onClick={() => handleSingleComplete(row)}
                className={`lab__btn__action ${
                  parseInt(row.status) === 2 ? " complete active " : ""
                }`}
              >
                <IoMdCheckmarkCircleOutline size={30} />
              </span>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="custom-card my-3 mx-2 p-2 ">
        <div className="card-header">
          <div
            className="card-header cns-container"
            style={{ background: "white" }}
          >
            <div
              id="v-pills-tab"
              role="tablist"
              className="nav nav-pills d-flex align-items-center"
              aria-orientation="horizontal"
            >
              <button
                class="nav-link text-start  active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Pathology Request
              </button>
              <button
                class="nav-link text-start"
                id="v-pills-details-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-details"
                type="button"
                role="tab"
                aria-controls="v-pills-details"
                aria-selected="true"
              >
                Radiology Request
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-card mx-2 p-2">
        <div id="v-pills-tabContent" class="tab-content">
          <div
            class="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <MaterialTable
                isLoading={loading === true ? true : false}
                options={{
                  search: false,
                  showTitle: false,
                  pageSize: 10,
                  overflowX: "auto",
                  emptyRowsWhenPaging: false,
                  showSearch: false,
                  pageSizeOptions: [5, 10, 20, 50, 100],
                  selection: true,
                  boxShadow: 0,
                }}
                components={{
                  Toolbar: (props) => (
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "semibold",
                          margin: "10px",
                        }}
                      >
                        {" "}
                        Pathology
                      </h3>
                      {pathologySelected.length > 0 ? (
                        <div className="d-flex gap-2 justify-content-space-between align-items-center">
                          <div>
                            <span
                              title="Progress"
                              onClick={() =>
                                handleMultipleAction("pathology", "progress")
                              }
                              className="lab__btn__action lb__progress active"
                            >
                              <TbProgressCheck size={30} /> Progress
                            </span>
                          </div>
                          <div>
                            <span
                              title="Complete"
                              onClick={() =>
                                handleMultipleAction("pathology", "complete")
                              }
                              className="lab__btn__action complete active"
                            >
                              <IoMdCheckmarkCircleOutline size={30} /> Complete
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ),
                }}
                onSelectionChange={(rows) => setPathologySelected(rows)}
                data={pathologyRequest}
                columns={pathologyColumns}
              />
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-details"
            role="tabpanel"
            aria-labelledby="v-pills-details-tab"
          >
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <MaterialTable
                isLoading={loading === true ? true : false}
                options={{
                  search: false,
                  showTitle: false,
                  pageSize: 10,
                  overflowX: "auto",
                  emptyRowsWhenPaging: false,
                  showSearch: false,
                  pageSizeOptions: [5, 10, 20, 50, 100],
                  selection: true,
                  boxShadow: 0,
                }}
                components={{
                  Toolbar: (props) => (
                    <div className="d-flex justify-content-between align-items-center">
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "semibold",
                          margin: "10px",
                        }}
                      >
                        {" "}
                        Radiology
                      </h3>
                      {radiologySelected.length > 0 ? (
                        <div className="d-flex gap-2 justify-content-space-between align-items-center mb-2">
                          <div>
                            <span
                              title="Progress"
                              onClick={() =>
                                handleMultipleAction("radiology", "progress")
                              }
                              className="lab__btn__action lb__progress active"
                            >
                              <TbProgressCheck size={30} /> Progress
                            </span>
                          </div>
                          <div>
                            <span
                              title="Complete"
                              onClick={() =>
                                handleMultipleAction("radiology", "complete")
                              }
                              className="lab__btn__action complete active"
                            >
                              <IoMdCheckmarkCircleOutline size={30} /> Complete
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ),
                }}
                onSelectionChange={(rows) => setRadiologySelected(rows)}
                data={radiologyRequest}
                columns={RadiologyColumns}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabRequest;

const PopoverComponent = ({ row }) => {
  const [isOpened, setIsOpened] = useState(false);
  const clinicalExamRef = useRef();

  return (
    <Popover
      isOpen={isOpened}
      positions={["bottom", "right", "left", "top"]}
      padding={10}
      key={row.id}
      onClickOutside={() => setIsOpened(false)}
      ref={clinicalExamRef}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={"lightgray"}
          // arrowSize={10}
          // arrowStyle={{ opacity: 0.7 }}
          style={{
            zIndex: 9999,
          }}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <div
            style={{
              borderRadius: "5px",
              border: "1px solid lightgray",
              height: "100px",
              zIndex: 9999,
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
            }}
            onClick={() => setIsOpened(false)}
          >
            <ul className="d-flex flex-column gap-2 clinical-list">
              <li style={{ cursor: "pointer" }}>Pending</li>
            </ul>
          </div>
        </ArrowContainer>
      )}
    >
      <CiMenuKebab
        size={24}
        color="#000"
        style={{
          cursor: "pointer",
        }}
        onClick={() => setIsOpened(!isOpened)}
      />
    </Popover>
  );
};
