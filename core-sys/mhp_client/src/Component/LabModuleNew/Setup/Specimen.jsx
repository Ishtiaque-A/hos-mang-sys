import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { NewModal } from "../../../common/components/NewModal";
import Button from "../../../common/components/Button";

function Specimen() {
  const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);
  const [modalIsOpenForAdd, setModalIsOpenForAdd] = useState(false);

  useEffect(() => {
    axios.get("specimen-for-test-name").then((res) => {
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
        axios.delete(`specimen-for-test-name/${item.id}`).then((res) => {
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
      title: "Specimen",
      field: "name",
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
        <h6 className="mt-1 mx-2">Specimen Setup</h6>
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
      <AddSpecimen
        modalIsOpenForAdd={modalIsOpenForAdd}
        setModalIsOpenForAdd={setModalIsOpenForAdd}
        onRefetch={onRefetch}
      />
      <EditSpecimen
        onRefetch={onRefetch}
        data={updateData}
        modalIsOpenForEdit={modalIsOpenForEdit}
        setModalIsOpenForEdit={setModalIsOpenForEdit}
      />
    </div>
  );
}

export default Specimen;

const customStyles = {
  content: {
    top: "30%",
    left: "30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "250px",
    transform: "translate(-50%, -50%)",
  },
};

const AddSpecimen = ({
  modalIsOpenForAdd,
  setModalIsOpenForAdd,
  onRefetch,
}) => {
  const [btnLoading, setBtnLoading] = useState(false);

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    try {
      e.preventDefault();
      const name = e.target.name.value;
      const res = await axios.post("specimen-for-test-name", { name });

      if (res.status === 201) {
        toast.success(res?.data?.message);
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
        <NewModal.Title>Add specimen</NewModal.Title>
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
              name="name"
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

const EditSpecimen = ({
  data,
  modalIsOpenForEdit,
  setModalIsOpenForEdit,
  onRefetch,
}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [updateData, setUpdateData] = useState(data);
  useEffect(() => {
    setUpdateData(data);
  }, [data]);
  const handleSubmit = async (e) => {
    setBtnLoading(true);
    try {
      e.preventDefault();
      const name = e.target.name.value;
      const res = await axios.put(`specimen-for-test-name/${data?.id}`, {
        name,
      });

      if (res.status === 200) {
        toast.success(res?.data?.message);
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
