import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { NewModal } from "../../common/components/NewModal";
import Button from "../../common/components/Button";
import { formatPhoneNumber } from "../../utils/numberHelper";

function CollectorSetup() {
  const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);
  const [modalIsOpenForAdd, setModalIsOpenForAdd] = useState(false);

  useEffect(() => {
    axios.get("collectors").then((res) => {
      setData(res.data || []);
      console.log(res?.data);
    });
  }, [refetch]);
  const handleEdit = (item) => {
    setUpdateData(item);
    setModalIsOpenForEdit(true);
  };

  const handleDelete = (item) => {
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
        axios.delete(`collector/${item.id}`).then((res) => {
          if (res.status === 200) {
            setRefetch(!refetch);
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          }
        });
      }
    });
  };

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: " Contact Number",
      field: "phone",
      render: (row) => {
        return row.phone ? formatPhoneNumber(row.phone) : "";
      },
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Email Address",
      field: "email",
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Address",
      field: "address",
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
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              <i className="far fa-edit"></i>
            </button>
            <button
              onClick={() => handleDelete(row)}
              style={{
                all: "unset",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              <i className="far fa-trash"></i>
            </button>
          </div>
        );
      },
    },
  ];

  const onRefetch = () => setRefetch(!refetch);

  return (
    <div className="shadow-sm p-2 mb-3 bg-body rounded mt-1">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mt-1 mx-2">Collector Setup</h6>
        <Button onClick={() => setModalIsOpenForAdd(true)}>Add</Button>
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
      <AddCollector
        modalIsOpenForAdd={modalIsOpenForAdd}
        setModalIsOpenForAdd={setModalIsOpenForAdd}
        onRefetch={onRefetch}
      />
      <EditCollector
        onRefetch={onRefetch}
        data={updateData}
        modalIsOpenForEdit={modalIsOpenForEdit}
        setModalIsOpenForEdit={setModalIsOpenForEdit}
      />
    </div>
  );
}

export default CollectorSetup;

const emptyValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};
const AddCollector = ({
  modalIsOpenForAdd,
  setModalIsOpenForAdd,
  onRefetch,
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [form, setForm] = useState(emptyValues);

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    try {
      e.preventDefault();
      setForm(emptyValues);
      const res = await axios.post("collector-add", form);
      if (res.status === 201) {
        toast.success("Collector added successfully");
        onRefetch();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setModalIsOpenForAdd(false);
      setBtnLoading(false);
    }
  };

  return (
    <NewModal
      size="sm"
      isOpen={modalIsOpenForAdd}
      onClose={() => setModalIsOpenForAdd(false)}
    >
      <NewModal.Header onClose={() => setModalIsOpenForAdd(false)}>
        <NewModal.Title>Add Collector</NewModal.Title>
      </NewModal.Header>
      <form onSubmit={handleSubmit}>
        <NewModal.Body>
          <div className="form-group mb-1">
            <label htmlFor="name" className="form-label mb-0">
              Full Name
            </label>
            <input
              type="text"
              className="form-control mb-2 form"
              id="name"
              placeholder="Enter Full Name"
              name="name"
              value={form?.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="email" className="form-label mb-0">
              Email
            </label>
            <input
              type="email"
              className="form-control mb-2 form"
              id="email"
              value={form?.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              name="email"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="phone" className="form-label mb-0">
              Contact Number
            </label>
            <input
              type="tel"
              className="form-control mb-2 form"
              id="phone"
              value={form?.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Enter Contact Number"
              name="phone"
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="address" className="form-label mb-0">
              Address
            </label>
            <textarea
              className="form-control mb-2 form"
              id="address"
              value={form?.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Enter Address"
              rows={3}
              name="address"
            ></textarea>
          </div>
        </NewModal.Body>
        <NewModal.Footer>
          <Button disabled={btnLoading} isLoading={btnLoading}>
            Add
          </Button>
        </NewModal.Footer>
      </form>
    </NewModal>
  );
};

const EditCollector = ({
  data,
  modalIsOpenForEdit,
  setModalIsOpenForEdit,
  onRefetch,
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [form, setForm] = useState(emptyValues);
  useEffect(() => {
    setForm(data);
  }, [data]);
  const handleSubmit = async (e) => {
    setBtnLoading(true);
    try {
      e.preventDefault();
      const res = await axios.put(`collector-update`, form);
      if (res.status === 200) {
        toast.success("Collector updated successfully");
        setForm(emptyValues);
        onRefetch();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setModalIsOpenForEdit(false);
      setBtnLoading(false);
    }
  };

  return (
    <NewModal
      size="sm"
      isOpen={modalIsOpenForEdit}
      onClose={() => setModalIsOpenForEdit(false)}
    >
      <NewModal.Header onClose={() => setModalIsOpenForEdit(false)}>
        <NewModal.Title>Update Collector Info</NewModal.Title>
      </NewModal.Header>
      <form onSubmit={handleSubmit}>
        <NewModal.Body>
          <div className="form-group mb-1">
            <label htmlFor="name" className="form-label mb-0">
              Full Name
            </label>
            <input
              type="text"
              className="form-control mb-2 form"
              id="name"
              placeholder="Enter Full Name"
              name="name"
              value={form?.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="email" className="form-label mb-0">
              Email
            </label>
            <input
              type="email"
              className="form-control mb-2 form"
              id="email"
              value={form?.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              name="email"
              placeholder="Enter Email Address"
              required
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="phone" className="form-label mb-0">
              Contact Number
            </label>
            <input
              type="tel"
              className="form-control mb-2 form"
              id="phone"
              value={form?.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Enter Contact Number"
              name="phone"
              required
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="address" className="form-label mb-0">
              Address
            </label>
            <textarea
              className="form-control mb-2 form"
              id="address"
              value={form?.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Enter Address"
              rows={3}
              name="address"
            ></textarea>
          </div>
        </NewModal.Body>
        <NewModal.Footer>
          <Button disabled={btnLoading} isLoading={btnLoading}>
            Update
          </Button>
        </NewModal.Footer>
      </form>
    </NewModal>
  );
};
