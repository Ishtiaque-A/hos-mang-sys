import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import Button from "../../../../common/components/Button";
import { NewModal } from "../../../../common/components/NewModal";
import { formatPhoneNumber } from "../../../../utils/numberHelper";
import ReminderSetupSidebar from "../../../../admin_setup_pap/reminder_setup_main_sidebar/ReminderSetupSidebar";

function AnaemicSetup() {
  const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);
  const [modalIsOpenForAdd, setModalIsOpenForAdd] = useState(false);

  useEffect(() => {
    axios.get("anaemic").then((res) => {
      setData(res.data || []);
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
        axios.delete(`anaemic/${item.id}`).then((res) => {
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
    <div className="mt-2 ms-2">
      <div className="row">
        <div className="col-3">
          <ReminderSetupSidebar />
        </div>
        <div className="col-9">
          <div className="shadow-sm p-2 mb-3 bg-body rounded mt-1">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mt-1 mx-2">Anaemic Setup</h6>
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
            <AddAnaemic
              modalIsOpenForAdd={modalIsOpenForAdd}
              setModalIsOpenForAdd={setModalIsOpenForAdd}
              onRefetch={onRefetch}
            />
            <EditAnaemic
              onRefetch={onRefetch}
              data={updateData}
              modalIsOpenForEdit={modalIsOpenForEdit}
              setModalIsOpenForEdit={setModalIsOpenForEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnaemicSetup;

const emptyValues = {
  name: "",
};
const AddAnaemic = ({ modalIsOpenForAdd, setModalIsOpenForAdd, onRefetch }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [form, setForm] = useState(emptyValues);

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    try {
      e.preventDefault();
      setForm(emptyValues);
      const res = await axios.post("anaemic", form);
      if (res.status === 200) {
        toast.success("Anaemic added successfully");
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
        <NewModal.Title>Add Anaemic</NewModal.Title>
      </NewModal.Header>
      <form onSubmit={handleSubmit}>
        <NewModal.Body>
          <div className="form-group mb-1">
            <label htmlFor="name" className="form-label mb-0">
              Name
            </label>
            <input
              type="text"
              className="form-control mb-2 form"
              id="name"
              placeholder="Enter Name"
              name="name"
              value={form?.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
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

const EditAnaemic = ({
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
      const res = await axios.put(`anaemic/${data.id}`, form);
      if (res.status === 200) {
        toast.success("Anaemic updated successfully");
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
        <NewModal.Title>Update Anaemic Info</NewModal.Title>
      </NewModal.Header>
      <form onSubmit={handleSubmit}>
        <NewModal.Body>
          <div className="form-group mb-1">
            <label htmlFor="name" className="form-label mb-0">
              Name
            </label>
            <input
              type="text"
              className="form-control mb-2 form"
              id="name"
              placeholder="Enter Name"
              name="name"
              value={form?.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
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
