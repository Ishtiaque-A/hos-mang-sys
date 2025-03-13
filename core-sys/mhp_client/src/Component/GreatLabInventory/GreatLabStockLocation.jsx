import React, { useState } from "react";
import { useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import AddStockLocation from "./AddStockLocation";
import useCredentialURL from "../../hooks/useCredentialURL";
import useUserData from "../../hooks/useUserData";

function GreatLabStockLocation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [branch, setBranch] = useState([]);
  const { SaasAuthURL } = useCredentialURL();
  const user = useUserData();
  useEffect(() => {
    setLoading(true);
    axios.get(`/great-lab-stock-location`).then((res) => {
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

  const emptyData = {
    name: "",
    status: "",
  };
  const [supplierInfo, setSupplierInfo] = useState({
    name: "",
    status: "",
    branch_id: "",
    branch_name: "",
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
    setSupplierInfo(emptyData);
  };
  const openModal = (pd) => {
    setIsOpen(true);
    setSupplierInfo(pd);
  };
  console.log(supplierInfo, "dde");
  return (
    <div className="page-content">
      <div className="d-flex justify-content-between rx-one-button-group custom-card p-2 mb-2">
        <h6> Stock Location List </h6>
        <button
          type="button"
          onClick={() => openModal(emptyData)}
          className="btn float-end"
        >
          Add Stock Location
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
      <AddStockLocation
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

export default GreatLabStockLocation;
