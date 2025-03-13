import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiFileOff } from "react-icons/ci";
import Swal from "sweetalert2";
import moment from "moment";
export default function LabPointsReport() {
  const columns = [
    {
      title: "ID",
      field: "id",
      render: (row) => <div>{row?.doctor?.dr_identity_no}</div>,
      cellStyle: {
        width: "10%",
        textAlign: "center",
      },
    },
    {
      title: "Name",
      field: "title",
      render: (row) => <div>{row?.doctor?.fullName}</div>,
    },
    {
      title: "Date",
      field: "",
      render: (row) => {
        return (
          <div>
            {moment(row?.created_at).format("DD-MM-YYYY")} to
            {moment().format("DD-MM-YYYY")}
          </div>
        );
      },
      cellStyle: {
        textAlign: "center !important",
      },
    },
    {
      title: "Total Point",
      field: "",
      render: (row) => <div className="text-right">{row?.total_point || 0}</div>,
      cellStyle: {
        textAlign: "right !important",
      },
    },
    {
      title: "Redeem Point",
      field: "title",
      render: (row) => <div className="text-right">{row?.redeem_sum_redeem_amount}</div>,
    },
    {
      title: "Available Point",
      field: "",
      render: (row) => (
        <div className="text-right">
          {parseFloat(row?.total_point || 0) -
            parseFloat(row?.redeem_sum_redeem_amount || 0)}
        </div>
      ),
      cellStyle: {
        textAlign: "right",
      },
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
            <Link
              className="text-decoration-none text-black"
              to={`/lab-module-new/lab-points-report-details/${row.share_user_id}`}
            >
              <button
                style={{
                  all: "unset",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                <i className="far fa-edit"></i>
              </button>
            </Link>
            <button
              onClick={() => handleDisable(row.id)}
              style={{
                all: "unset",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              <CiFileOff />
            </button>
          </div>
        );
      },
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("plan-report-all")
      .then((res) => {
        setData(res.data.invoice || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleDisable = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Disable it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`doctors-point-plan-disable/${id}`)
          .then((res) => {
            if (res.data.status === 200) {
              setData(data.filter((item) => item.id !== id));
            }
            Swal.fire("Success!", res.data.message, "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <div className="shadow-sm p-2 mb-3 bg-body lab-points-plan rounded mt-1">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 className="mt-1 mx-2">Points Plan</h6>
          <Link
            className="text-decoration-none"
            to="/lab-module-new/add-points-plan"
          >
            <button
              style={{
                backgroundColor: "#69B128",
                color: "white",
                fontWeight: "medium",
                border: "none",
                borderRadius: "7px",
                padding: "5px 15px",
              }}
            //   onClick={() => setModalIsOpenForAdd(true)}
            >
              Add
            </button>
          </Link>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <MaterialTable
              columns={columns}
              data={data}
              isLoading={loading}
              options={{
                search: false,
                showTitle: false,
                searchFieldAlignment: "left",
                pageSize: 10,
                emptyRowsWhenPaging: false,
                pageSizeOptions: [10, 20, 50, 100],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
