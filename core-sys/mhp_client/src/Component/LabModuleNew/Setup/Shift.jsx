import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { NewModal } from "../../../common/components/NewModal";
import Button from "../../../common/components/Button";
import moment from "moment";

function Shift() {
  const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);
  const [modalIsOpenForAdd, setModalIsOpenForAdd] = useState(false);

  useEffect(() => {
    axios.get("shift").then((res) => {
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
        axios.delete(`shift/${item.id}`).then((res) => {
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
      title: "ID",
      field: "id",
      cellStyle: {
        width: "5%",
        textAlign: "center !important",
      },
    },
    {
      title: "Shift",
      field: "name",
      cellStyle: {
        textAlign: "center !important",
      },
    },
    {
      title: "Start Time",
      field: "start_time",
      cellStyle: {
        textAlign: "center !important",
      },
    },
    {
      title: "End Time",
      field: "end_time",
      cellStyle: {
        textAlign: "center !important",
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
          <div className="d-flex gap-2 justify-content-center align-items-center">
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
            {/* <button
              onClick={() => handleDelete(row)}
              style={{
                all: "unset",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              <i className="far fa-trash"></i>
            </button> */}
          </div>
        );
      },
    },
  ];

  const onRefetch = () => setRefetch(!refetch);

  return (
    <div className="shadow-sm p-2 mb-3 bg-body rounded mt-1">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mt-1 mx-2">Shift Setup</h6>
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
      <AddShift
        modalIsOpenForAdd={modalIsOpenForAdd}
        setModalIsOpenForAdd={setModalIsOpenForAdd}
        onRefetch={onRefetch}
      />
      <EditShift
        onRefetch={onRefetch}
        data={updateData}
        modalIsOpenForEdit={modalIsOpenForEdit}
        setModalIsOpenForEdit={setModalIsOpenForEdit}
      />
    </div>
  );
}

export default Shift;

const AddShift = ({ modalIsOpenForAdd, setModalIsOpenForAdd, onRefetch }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [data, setData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const start_time = moment(e.target.start_time.value, "HH:mm:ss").format(
      "hh:mm A"
    );
    const end_time = moment(e.target.end_time.value, "HH:mm:ss").format(
      "hh:mm A"
    );
    const total_time = moment(end_time, "hh:mm A").diff(
      moment(start_time, "hh:mm A"),
      "hours",
      true
    );

    await axios
      .post("shift", {
        start_time: start_time,
        end_time: end_time,
        total_time,
        name: data.name,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          onRefetch();
          setModalIsOpenForAdd(false);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
        setBtnLoading(false);
      });
  };

  return (
    <NewModal
      size="sm"
      isOpen={modalIsOpenForAdd}
      onClose={() => setModalIsOpenForAdd(false)}
    >
      <NewModal.Header onClose={() => setModalIsOpenForAdd(false)}>
        <NewModal.Title>Add Shift</NewModal.Title>
      </NewModal.Header>
      <form onSubmit={handleSubmit} className="mt-3">
        <NewModal.Body>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Shift
            </label>
            <input
              type="text"
              className="form-control mb-2 form"
              id="name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="start" className="form-label">
              Start Time
            </label>
            <input
              type="time"
              className="form-control mb-2 form"
              id="start"
              name="start_time"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end" className="form-label">
              End Time
            </label>
            <input
              type="time"
              className="form-control mb-2 form"
              id="end"
              name="end_time"
              onChange={handleChange}
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

const EditShift = ({
  data,
  modalIsOpenForEdit,
  setModalIsOpenForEdit,
  onRefetch,
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [updateData, setUpdateData] = useState({});
  useEffect(() => {
    const start = moment(data?.start_time, "hh:mm A").format("HH:mm:ss");
    const end = moment(data?.end_time, "hh:mm A").format("HH:mm:ss");

    setUpdateData({
      ...data,
      start_time: start,
      end_time: end,
    });
  }, [data]);
  const handleSubmit = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const name = e.target.name.value;
    const start_time = moment(e.target.start_time.value, "HH:mm:ss").format(
      "hh:mm A"
    );
    const end_time = moment(e.target.end_time.value, "HH:mm:ss").format(
      "hh:mm A"
    );
    const total_time = moment(end_time, "hh:mm A").diff(
      moment(start_time, "hh:mm A"),
      "hours",
      true
    );
    await axios
      .put(`shift/${data?.id}`, {
        name,
        start_time,
        end_time,
        total_time,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setModalIsOpenForEdit(false);
          setBtnLoading(false);
          onRefetch();
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
        setBtnLoading(false);
      });
  };

  return (
    <NewModal
      size="sm"
      isOpen={modalIsOpenForEdit}
      onClose={() => setModalIsOpenForEdit(false)}
    >
      <NewModal.Header onClose={() => setModalIsOpenForEdit(false)}>
        <NewModal.Title>Update specimen</NewModal.Title>
      </NewModal.Header>
      <form onSubmit={handleSubmit} className="mt-3">
        <NewModal.Body>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Specimen Name
            </label>
            <input
              type="text"
              className="form-control mb-2 form"
              id="name"
              value={updateData?.name || ""}
              onChange={(e) =>
                setUpdateData({ ...updateData, name: e.target.value })
              }
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_time" className="form-label">
              Start Time
            </label>
            <input
              type="time"
              className="form-control mb-2 form"
              id="start_time"
              value={updateData?.start_time || ""}
              onChange={(e) =>
                setUpdateData({ ...updateData, start_time: e.target.value })
              }
              name="start_time"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_time" className="form-label">
              Start Time
            </label>
            <input
              type="time"
              className="form-control mb-2 form"
              id="end_time"
              value={updateData?.end_time || ""}
              onChange={(e) =>
                setUpdateData({ ...updateData, end_time: e.target.value })
              }
              name="end_time"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select form-select-sm mb-2 form"
              id="status"
              name="status"
              value={updateData?.status || ""}
              onChange={(e) =>
                setUpdateData({ ...updateData, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
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
