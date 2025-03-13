import axios from "axios";
import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CnsTwoSetupSidebar from "../cns_two_setup_mainsidebar/CnsTwoSetupSidebar";

function CnSeven() {
  const [cnSeven, setcnSeven] = useState([]);

  useEffect(() => {
    axios.get(`/cn9`).then((res) => {
      if (res.data.status === 200) {
        setcnSeven(res.data.cnSeven);
      }
    });
  }, []);

  const deletecnSeven = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    //  thisClicked.innerText = "Deleting";

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
        axios.delete(`/delete-cn9/${id}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest("tr").remove();
            //   swal("Success", res.data.message, "success");
          }
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  var view_cnSeven_HTML_TABLE = "";

  const columns = [
    {
      title: "SL",
      field: "",
      render: (row) => <div>{row.tableData.id + 1}</div>,

      width: "40 !important",
    },
    {
      title: "CN-VII Name",
      field: `name`,

      cellStyle: {
        marginLeft: 50,
        width: 600,
      },
    },

    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <Link
            to={`/edit-cn9/${row.id}`}
            class="btn btn-info btn-sm action-btn"
          >
            <i class="fas fa-edit"></i>
          </Link>
          &nbsp;
          <button
            onClick={(e) => deletecnSeven(e, row.id)}
            className="btn btn-danger btn-sm action-btn"
          >
            {" "}
            <i class="fas fa-trash"></i>{" "}
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <CnsTwoSetupSidebar />
          </div>
          <div className="col-md-9 mt-2">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">
                  CN-IX, X
                  <Link
                    to={"/add-cnSeven"}
                    className="btn btn-primary btn-sm float-end"
                  >
                    {" "}
                    Add CN-IX, X{" "}
                  </Link>
                </h6>
              </div>
              <div className="card-body">
                <MaterialTable
                  columns={columns}
                  data={cnSeven}
                  options={{
                    search: true,
                    // filtering: filter,
                    showTitle: false,
                    searchFieldAlignment: "left",
                    pageSize: 5,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CnSeven;
