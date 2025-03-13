import axios from "axios";
import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import PathologySetupSidebar from "../PathologySetupSidebar";

const LaboratoryMain = () => {
  const [pathologyLabratory, setpathologyLabratory] = useState([]);
  useEffect(() => {
    axios.get(`/get-labratory-name`).then((res) => {
      if (res.data.status === 200) {
        setpathologyLabratory(res.data.all_labratory);
      }
    });
  }, []);

  const deletepathologyLabratory = (e, id) => {
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
        axios.delete(`/delete-labratory-name/${id}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest("tr").remove();
            //   swal("Success", res.data.message, "success");
          }
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const columns = [
    {
      title: "SL",
      field: "",
      render: (row) => <div>{row.tableData.id + 1}</div>,

      width: "40 !important",
    },

    {
      title: "Name",
      field: `labratory_name`,

      cellStyle: {
        marginLeft: 50,
        width: 600,
      },
    },
    {
      title: "address",
      field: `address`,

      cellStyle: {
        marginLeft: 50,
        width: 600,
      },
    },

    {
      title: "phone",
      field: `phone`,

      cellStyle: {
        marginLeft: 50,
        width: 600,
      },
    },
    {
      title: "phone",
      field: `phone`,

      cellStyle: {
        marginLeft: 50,
        width: 600,
      },
    },
    {
      title: "fax",
      field: `fax`,

      cellStyle: {
        marginLeft: 50,
        width: 600,
      },
    },
    {
      title: "email",
      field: `email`,

      cellStyle: {
        marginLeft: 50,
        width: 600,
      },
    },
    {
      title: "websiteLink",
      field: `websiteLink`,

      cellStyle: {
        marginLeft: 50,
        width: 600,
      },
    },
    {
      title: "logo",
      field: ``,
      render: (row) => (
        <>
          {(row.log !== "" || row.log !== null) && (
            <img
              className="me-2"
              src={`${global.img_url}/labotory/${row?.logo}`}
              width="50px"
              alt="dr_images"
            />
          )}
        </>
      ),

      cellStyle: {
        marginLeft: 50,
        width: 600,
      },
    },
    {
      title: "Action",
      field: "",
      render: (row) => (
        <div>
          <Link
            to={`/edit-laboratory/${row.id}`}
            className="btn btn-info btn-sm action-btn"
          >
            <i className="fas fa-edit"></i>
          </Link>
          &nbsp;
          <button
            onClick={(e) => deletepathologyLabratory(e, row.id)}
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
            <PathologySetupSidebar />
          </div>
          <div className="col-md-9 mt-2">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">
                  Laboratory
                  <Link
                    to="/add-laboratory-name"
                    className="btn btn-primary btn-sm float-end"
                  >
                    Add
                  </Link>
                </h6>
              </div>
              <div className="card-body">
                <MaterialTable
                  columns={columns}
                  data={pathologyLabratory}
                  options={{
                    searech: true,
                    // filtering: filter,
                    showTitle: false,
                    searechFieldAlignment: "left",
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
};

export default LaboratoryMain;
