import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import axios from "axios";
import AddBooth from "./AddBooth";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";

function GreatLabCollectionBooth() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const { SaasAuthURL } = useCredentialURL();
  const user = useUserData();
  const [branch, setBranch] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios.get(`/great-lab-booth`).then((res) => {
      setData(res.data?.booths);
      setLoading(false);
    });
    axios
      .get(`${SaasAuthURL}/branch/organization/${user?.organization_id}`)
      .then((res) => {
        if (res.status === 200) {
          setBranch(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [refetch]);
  const deleteRowData = (e, id) => {
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
        axios.delete(`/great-lab-booth/${id}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest("tr").remove();
          }
        });
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Deleted!",
          text: "Your data has been deleted.",
          timer: 2500,
        });
      }
    });
  };
  const emptyBooth = {
    name: "",
    booth_no: "",
    status: "",
  };

  const [supplierInfo, setSupplierInfo] = useState({
    name: "",
    branch_id: "",
    branch_name: "",
    booth_no: "",
    status: "",
  });
  const columns = [
    {
      title: "SL",
      field: `supplier_code`,
      render: (row) => <div>{row?.tableData?.id + 1}</div>,
    },
    {
      title: "Branch",
      field: `supplier_code`,
      render: (row) => (
        <div>
          {
            branch.find((item) => Number(item?.id) === Number(row?.branch_id))
              ?.name
          }
        </div>
      ),
    },

    {
      title: "Name",
      field: `name`,
    },
    {
      title: "Booth No",
      field: `booth_no`,
    },
    {
      title: "Status",
      field: `status`,
      render: (row) => (
        <div>
          <span
            className={`badge ${
              row?.status === "Active" ? "bg-success" : "bg-warning"
            }`}
          >
            {row?.status === "Active" ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <button onClick={() => openModal(row)} class="btn btn-sm action-btn">
            <i className="far fa-edit"></i>
          </button>
          &nbsp;
          <Link to={`/great-lab-inventory/booth-details/${row.id}`}>
            <button
              onClick={() => openModal(row)}
              class="btn btn-sm action-btn"
            >
              <FaRegArrowAltCircleRight />
            </button>
          </Link>
          {/* <button
                        onClick={(e) => deleteRowData(e, row.id)}
                        className='btn btn-sm action-btn'
                    >

                        <i className='far fa-trash'></i>
                    </button> */}
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setSupplierInfo(emptyBooth);
  };
  const openModal = (pd) => {
    setIsOpen(true);
    setSupplierInfo(pd);
  };
  console.log(supplierInfo, "dde");
  return (
    <div className="page-content">
      <div className="d-flex justify-content-between rx-one-button-group custom-card p-2 mb-2">
        <h6> Booth List </h6>
        <button
          type="button"
          onClick={() => openModal(emptyBooth)}
          className="btn float-end"
        >
          Add Booth
        </button>
      </div>
      <div>
        <MaterialTable
          columns={columns}
          data={data}
          isLoading={loading}
          options={{
            search: true,
            showTitle: false,
            searchFieldAlignment: "left",
            pageSize: 5,
            emptyRowsWhenPaging: false,
            pageSizeOptions: [5, 10, 20, 50, 100],
          }}
        />
      </div>
      <AddBooth
        branch={branch}
        refetch={refetch}
        setRefetch={setRefetch}
        supplierInfo={supplierInfo}
        setSupplierInfo={setSupplierInfo}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  );
}

export default GreatLabCollectionBooth;
