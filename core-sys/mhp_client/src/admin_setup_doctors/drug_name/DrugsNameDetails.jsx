import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DoctorsSetupSidebar from "../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import MimsProductDetails from "../../Component/Appointment/GreatDoc/MimsProductDetails";
import "./drugName.css";

import { cloudUrl } from "../../index";

export default function DrugsNameDetails() {
  const [drugsDetails, setdrugsDetails] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get("/drug-name").then((res) => {
      console.log("drugs", res.data.drugs);
      setdrugsDetails(res.data.drugs);
      setloading(false);
    });
  }, []);

  console.log(drugsDetails, "drug-name");

  const deleteDrugName = (e, id) => {
    e.preventDefault();
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
        axios.delete(`/delete-drug-name/${id}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest("tr").remove();
          }
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  //   const columns = [
  //         {
  //             title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,
  //             cellStyle: {
  //                 maxWidth: 40
  //             },
  //         },
  //         {
  //             title: "Primary Key", field: `src_primary_key`,
  //             cellStyle: {
  //                 maxWidth: 40
  //             },
  //         },
  //         {
  //             title: "Drug Name", field: `drug_name`

  //             , cellStyle: {
  //                 width: 600,
  //                 marginLeft: 50
  //             },
  //         },
  //         {
  //             title: "Description", field: `drug_description`

  //             , cellStyle: {
  //                 width: 600,
  //                 marginLeft: 50
  //             },
  //         },

  //         {
  //             title: "Strength", field: `strength`,
  //             cellStyle: {
  //                 maxWidth: 40
  //             },
  //         },
  //         {
  //             title: "Macro Health Sg", field: `macrohealth_sg`,
  //             cellStyle: {
  //                 maxWidth: 40
  //             },
  //         },

  //         {
  //             title: "Mims Sg", field: `mims_sg`

  //             , cellStyle: {
  //                 width: 600,
  //                 marginLeft: 50
  //             },
  //         },
  //         {
  //             title: "Mims type", field: `mims_type`

  //             , cellStyle: {
  //                 width: 600,
  //                 marginLeft: 50
  //             },
  //         },
  //         {
  //             title: "Guid", field: `guid`

  //             , cellStyle: {
  //                 width: 600,
  //                 marginLeft: 50
  //             },
  //         },
  //         {
  //             title: "Generic", render:(row)=>{
  //                 <div> {row.generic_name}</div>
  //             },
  //             cellStyle: {
  //                 maxWidth: 40
  //             },
  //         },
  //         {
  //             title: "Restriction", field: `restriction`

  //             , cellStyle: {
  //                 width: 600,
  //                 marginLeft: 50
  //             },
  //         },

  //         {
  //             title: "Action", field: "patient", render: (row) => <div>
  //                 <Link to={`/edit-drug-name/${row.id}`} ><i class="fas fa-edit"></i></Link>&nbsp;
  //                 <i  onClick={(e) => deleteDrugName(e, row.id)} class="fas fa-trash"></i>
  //                  <i onClick={()=>setmodelShow(true)} class="fa-solid fa-circle-info"></i>
  //                 </div>
  //         },
  //     ];

  const [mimsData, setMimsData] = useState("");
  const [modalIsOpenMimsProduct, setmodalIsOpenMimsProduct] = useState(false);
  const closeModalMimsProduct = () => {
    setmodalIsOpenMimsProduct(false);
    setMimsData("");
  };

  const [medicine, setmedicine] = useState();

  const columnsShort = [
    {
      title: "SL",
      field: "",
      render: (row) => <div>{row.tableData.id + 1}</div>,
      cellStyle: {
        width: "5%",
      },
    },
    {
      title: "Drug Name",
      field: `drug_name`,
      cellStyle: {
        width: "25%",
      },
    },
    {
      title: "Description",
      field: `drug_description`,
      cellStyle: {
        width: "5%",
      },
      options: {
        sorting: false,
      },
    },

    // {
    //     title: "Macro Sg", field: `macrohealth_sg`,
    //     cellStyle: {
    //         width: "15%"
    //     },

    // },
    {
      title: "Geniric",
      render: (row) => (
        <div>{row.generic_name !== null && row.generic_name.name}</div>
      ),
    },

    // {
    //     title: "Mims Sg", field: `mims_sg`
    // },
    {
      title: "Brand/Trade",
      field: `macrohealth_sg`,
    },
    {
      title: "manufacturer",
      field: `manufacturer`,
    },
    {
      title: "Action",
      render: (row) => (
        <div>
          <Link to={`/edit-drug-name/${row.id}`}>
            <i class="fas fa-edit drugsNameIcon"></i>
          </Link>
          &nbsp;
          <i
            onClick={(e) => deleteDrugName(e, row.id)}
            class="fas fa-trash drugsNameIcon"
          ></i>
          <i
            onClick={() => {
              setmodalIsOpenMimsProduct(true);
              setmedicine({
                macrohealth_sg: row.macrohealth_sg,
              });
              cloudUrl.get(`generic/${row.guid}`).then((res) => {
                console.log("Guid", res.data.Result.Content.GGPI);
                setMimsData(res.data.Result.Content.GGPI);
              });
            }}
            class="fa-solid fa-circle-info drugsNameIcon"
          ></i>
        </div>
      ),
      cellStyle: {
        width: "5%",
      },
    },
  ];

  return (
    <>
      <MimsProductDetails
        medicine={medicine}
        mimsData={mimsData}
        modalIsOpenMimsProduct={modalIsOpenMimsProduct}
        closeModalMimsProduct={closeModalMimsProduct}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <DoctorsSetupSidebar></DoctorsSetupSidebar>
          </div>
          <div className="col-md-9 mt-2">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">
                  Drug Details
                  <Link
                    to="/add-drug-name"
                    className="btn btn-primary btn-sm float-end"
                  >
                    {" "}
                    Add Drug Name
                  </Link>
                </h6>
              </div>
              <div className="card-body">
                <MaterialTable
                  columns={columnsShort}
                  data={drugsDetails}
                  options={{
                    search: true,
                    // filtering: filter,
                    //  sorting: false
                    showTitle: false,
                    searchFieldAlignment: "left",
                    pageSize: 8,
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
