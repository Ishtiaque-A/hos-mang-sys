import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { toast } from "react-toastify";
import Modal from "react-modal";
import MaterialTable from "material-table";
import Swal from "sweetalert2";

// empty fields
const emptyData = {
  test_name_id: null,
};
const customStyles = {
  content: {
    top: "30%",
    left: "30%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "350px",
    transform: "translate(-50%, -50%)",
  },
};

function ParameterGroup() {
  const [modalIsOpenForAdd, setModalIsOpenForAdd] = useState(false);
  const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
  const [updateDate, setUpdateData] = useState(null);

  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("all-parameters-group-show")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
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
        axios.delete(`/parameter-group-delete/${item.id}`).then((res) => {
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
      title: "Test Name",
      field: "test_name.test_name",
      cellStyle: {
        textAlign: "center !important",
      },
      // render: (row) => <p>{row?.test_name?.test_name}</p>,
    },
    {
      title: "Parameter Group Name",
      field: "group_name",
      cellStyle: {
        textAlign: "center !important",
      },
    },
    {
      title: "Action",
      field: "group_name",
      cellStyle: {
        textAlign: "center !important",
        width: "12%",
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
              {" "}
              <i className="far fa-edit"></i>{" "}
            </button>
            <button
              onClick={() => handleDelete(row)}
              style={{
                all: "unset",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {" "}
              <i className="far fa-trash"></i>{" "}
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="shadow-sm p-2 mb-3 bg-body rounded mt-1">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className="mt-1 mx-2">Parameter Group</h6>
        <button
          style={{
            backgroundColor: "#69B128",
            color: "white",
            fontWeight: "medium",
            border: "none",
            borderRadius: "7px",
            padding: "5px 15px",
          }}
          onClick={() => setModalIsOpenForAdd(true)}
        >
          Add
        </button>
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
              pageSizeOptions: [5, 10, 20, 50, 100],
            }}
          />
        </div>
      </div>
      <AddParameterGroup
        modalIsOpenForAdd={modalIsOpenForAdd}
        setModalIsOpenForAdd={setModalIsOpenForAdd}
        setRefetch={setRefetch}
        refetch={refetch}
      />
      <EditParameterGroup
        refetch={refetch}
        setRefetch={setRefetch}
        data={updateDate}
        modalIsOpenForEdit={modalIsOpenForEdit}
        setModalIsOpenForEdit={setModalIsOpenForEdit}
      />
    </div>
  );
}

export default ParameterGroup;

const EditParameterGroup = ({
  data,
  setModalIsOpenForEdit,
  setRefetch,
  refetch,
  modalIsOpenForEdit,
}) => {
  const [testNames, setTestNames] = useState(null);
  const [searchTestName, setSearchTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [configData, setConfigData] = useState({
    ...emptyData,
    test_name_id: data?.test_name?.id,
    hidden: data?.hidden,
  });

  const [btnLoading, setBtnLoading] = useState(false);
  const [groupName, setGroupName] = useState(data?.group_name || "");
  useEffect(() => {
    setConfigData((prev) => {
      return {
        ...prev,
        test_name_id: data?.test_name?.id,
        hidden: data?.hidden,
      };
    });
    setSearchTestName(data?.test_name?.test_name || "");
    setGroupName(data?.group_name || "");
  }, [data]);

  useEffect(() => {
    //get TestNames  with Parameters from DB
    const getTestName = async () => {
      try {
        const response = await axios.get(`/new-test-name`);
        if (response.data.status === 200) {
          const allTestName = response.data.test_name || [];
          setTestNames(allTestName);
        }
      } catch (error) {
        toast.error("Test Name not found");
      }
    };
    getTestName();
    return () => {
      // cleanup
    };
  }, []);

  // clearing all field
  const clearingAllField = () => {
    setSearchTestName("");
    setTestId("");
    setGroupName("");
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!groupName) {
      toast.error("Group Name is required");
      return;
    }
    if (!configData.test_name_id) {
      toast.error("Test Name is required");
      return;
    }
    setBtnLoading(true);

    try {
      const updateData = {
        group_name: groupName,
        test_name_id: configData.test_name_id,
        hidden: configData.hidden || 0,
      };

      axios
        .put(`parameter-group-edit/${data?.id}`, updateData)
        .then((res) => {
          toast.success(res.data.message);
          setRefetch(!refetch);
          setModalIsOpenForEdit(false);
          clearingAllField();
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setBtnLoading(false);
        });
    } catch (error) {
      setBtnLoading(false);
      console.error("Synchronous Error:", error);
    }
  };

  const handleCheckHidden = (e) => {
    if (e.target.checked) {
      setConfigData((prev) => {
        return {
          ...prev,
          hidden: 1,
        };
      });
    } else {
      setConfigData((prev) => {
        return {
          ...prev,
          hidden: 0,
        };
      });
    }
  };

  return (
    <div className="shadow-sm p-2 mb-3 bg-body rounded">
      <Modal
        isOpen={modalIsOpenForEdit}
        onRequestClose={() => setModalIsOpenForEdit(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {" "}
        <span
          className="float-end ms-3"
          style={{ fontSize: "15px", cursor: "pointer" }}
          onClick={() => setModalIsOpenForEdit(false)}
        >
          <i class="fal fa-times"></i>
        </span>
        <form onSubmit={handleSubmitForm}>
          <h6 className="text-center my-2">Update Parameter Group</h6>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* for Test Name  */}
            <div style={{ padding: "0px 20px" }}>
              <label for="exampleFormControlInput2" className="form-label">
                Select Test Name
              </label>
              <ReactSearchAutocomplete
                placeholder={"Search"}
                showIcon={false}
                items={testNames || []}
                inputSearchString={searchTestName || ""}
                onSearch={(value) => setSearchTestName(value)}
                onClear={clearingAllField}
                value={testNames?.find(
                  (el) => el.id === configData.test_name_id
                )}
                resultStringKeyName="test_name"
                onSelect={(item) => {
                  setConfigData({ ...configData, test_name_id: item.id });
                }}
                formatResult={(item) => {
                  return (
                    <p key={item.id} className="p-0 m-0">
                      {item.test_name}
                    </p>
                  );
                }}
                maxResults={7}
                fuseOptions={{ keys: ["test_name"] }}
                styling={{
                  borderRadius: "5px !important",
                  zIndex: 99,
                  boxShadow: "none",
                  height: "33px",
                  input: {
                    padding: 0,
                  },
                  width: "100%",
                }}
              />
            </div>
            <div style={{ padding: "0px 20px" }}>
              <label for="exampleFormControlInput1" className="form-label">
                Group Name
              </label>
              <textarea
                rows={1}
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="form-control form-control-md"
              ></textarea>
            </div>
            <div style={{ padding: " 0px 40px" }}>
              <input
                onChange={handleCheckHidden}
                type="checkbox"
                checked={Number(configData?.hidden) === 1 ? true : false}
                className="from-control form-check-input"
                id="hidden"
              />
              <label htmlFor="hidden">Hide group name</label>
            </div>
          </div>

          <div className="row">
            <div className="rx-one-button-group p-4">
              <button disabled={btnLoading} className="btn float-end">
                {btnLoading ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const AddParameterGroup = ({
  modalIsOpenForAdd,
  setModalIsOpenForAdd,
  setRefetch,
  refetch,
}) => {
  const [testNames, setTestNames] = useState(null);
  const [searchTestName, setSearchTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [configData, setConfigData] = useState({ ...emptyData });
  const [btnLoading, setBtnLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [hiddenGroupName, setHiddenGroupName] = useState(0);

  useEffect(() => {
    //get TestNames  with Parameters from DB
    const getTestName = async () => {
      try {
        const response = await axios.get(`/new-test-name`);
        if (response.data.status === 200) {
          const allTestName = response.data.test_name || [];
          setTestNames(allTestName);
        }
      } catch (error) {
        toast.error("Test Name not found");
      }
    };
    getTestName();
    return () => {
      // cleanup
    };
  }, []);

  // clearing all field
  const clearingAllField = () => {
    setSearchTestName("");
    setTestId("");
    setGroupName("");
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!groupName) {
      toast.error("Group Name is required");
      return;
    }
    if (!configData.test_name_id) {
      toast.error("Test Name is required");
      return;
    }
    setBtnLoading(true);

    try {
      const data = {
        group_name: groupName,
        test_name_id: configData.test_name_id,
        hidden: hiddenGroupName,
      };

      axios
        .post("parameter-group-add", data)
        .then((res) => {
          toast.success(res.data.message);
          setRefetch(!refetch);
          setModalIsOpenForAdd(false);
          clearingAllField();
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setBtnLoading(false);
        });
    } catch (error) {
      setBtnLoading(false);
      console.error("Synchronous Error:", error);
    }
  };
  const handleCheckHidden = (e) => {
    if (e.target.checked) {
      setHiddenGroupName(1);
    } else {
      setHiddenGroupName(0);
    }
  };

  return (
    <div className="shadow-sm p-2 mb-3 bg-body rounded">
      <Modal
        isOpen={modalIsOpenForAdd}
        onRequestClose={() => setModalIsOpenForAdd(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span
          className="float-end ms-3"
          style={{ fontSize: "15px", cursor: "pointer" }}
          onClick={() => setModalIsOpenForAdd(false)}
        >
          <i class="fal fa-times"></i>
        </span>
        <form onSubmit={handleSubmitForm}>
          <h6 className="text-center my-2">Add Parameter Group</h6>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* for Test Name  */}
            <div style={{ padding: "0px 20px" }}>
              <label for="exampleFormControlInput2" className="form-label">
                Select Test Name
              </label>
              <ReactSearchAutocomplete
                placeholder={"Search"}
                showIcon={false}
                items={testNames || []}
                inputSearchString={searchTestName || ""}
                onSearch={(value) => setSearchTestName(value)}
                onClear={clearingAllField}
                resultStringKeyName="test_name"
                onSelect={(item) => {
                  setConfigData({ ...configData, test_name_id: item.id });
                }}
                autoFocus
                formatResult={(item) => {
                  return (
                    <p key={item.id} className="p-0 m-0">
                      {item.test_name}
                    </p>
                  );
                }}
                maxResults={7}
                fuseOptions={{ keys: ["test_name"] }}
                styling={{
                  borderRadius: "5px !important",
                  zIndex: 99,
                  boxShadow: "none",
                  height: "33px",
                  input: {
                    padding: 0,
                  },
                  width: "100%",
                }}
              />
            </div>

            <div style={{ padding: "0px 20px" }}>
              <label for="exampleFormControlInput1" className="form-label">
                Group Name
              </label>
              <textarea
                rows={1}
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="form-control form-control-md"
              />
            </div>
            <div style={{ padding: " 0px 40px" }}>
              <input
                onChange={handleCheckHidden}
                type="checkbox"
                className=" from-control form-check-input"
                id="hidden"
              />
              <label htmlFor="hidden">Hide group name</label>
            </div>
          </div>

          <div className="row">
            <div className="rx-one-button-group p-4">
              <button disabled={btnLoading} className="btn float-end">
                {btnLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
