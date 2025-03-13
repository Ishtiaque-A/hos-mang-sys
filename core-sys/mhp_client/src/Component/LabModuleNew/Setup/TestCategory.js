import React, { useState, useEffect } from "react";
import "../LabModule.css";
import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
import axios from "axios";
import MaterialTable from "material-table";
import Modal from "react-modal";
import { toast } from "react-toastify";
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

function TestCategory() {
  const [allTestGroup, setallTestGroup] = useState([]);

  const [allTestCategoryRender, setAllTestCategoryRender] = useState("");

  useEffect(() => {
    axios.get(`/new-test-group`).then((res) => {
      if (res.data.status === 200) {
        setallTestGroup(res.data.test_group);
      }
    });
  }, []);

  const [allTestCatgeory, setallTestCategory] = useState([]);
  console.log("all test category", allTestCatgeory);
  useEffect(() => {
    axios.get(`/new-test-category`).then((res) => {
      if (res.data.status === 200) {
        setallTestCategory(res.data.test_category);
      }
    });
  }, [allTestCategoryRender]);

  const [editTestCategoryId, setEditTestCategoryId] = useState("");
  const [editTestgroupName, setEditTestGroupName] = useState("");

  const [editLabTestCategory, setEditlabTestCategory] = useState({
    test_group_id: "",
    test_category_name: "",
  });
  // console.log('eidited data', editLabTestCategory)
  // console.log('editTestgroupName ', editTestgroupName)

  useEffect(() => {
    axios.get(`/edit-new-test-category/${editTestCategoryId}`).then((res) => {
      console.log("akhm", res.data);
      if (res.data.status === 200) {
        setEditlabTestCategory(res.data.test_category);
        setEditTestGroupName(res.data.test_group);
      }
    });
  }, [editTestCategoryId]);

  function handleEdit(e) {
    setEditlabTestCategory({
      ...editLabTestCategory,
      [e.target.name]: e.target.value,
    });
  }

  function editTestCategory(e, editId) {
    e.preventDefault();
    setEditTestCategoryId(editId);
  }

  function TestCategoryUpdate(e) {
    const addData = {
      test_group_id: value2 === "" ? editLabTestCategory.test_group_id : value2,
      test_category_name: editLabTestCategory.test_category_name,
    };
    e.preventDefault();
    axios
      .post(`/update-new-test-category/${editTestCategoryId}`, addData)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Success", res.data.message, "success");
          setEditTestCategoryId("");
          setAllTestCategoryRender(res.data);
          setPageView("view");
          setEditlabTestCategory({
            test_group_id: "",
            test_category_name: "",
          });
          closeEditModal();
        }
        // else if (res.data.status == 400) {
        //     setbank({ ...bank, error_list: res.data.errors });

        // }
      });
  }

  const deleteallTestCategory = (e, id) => {
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
        axios.delete(`/delete-new-test-category/${id}`).then((res) => {
          if (res.data.status === 200) {
            // setallTestCategory(res.data.test_category);
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
      title: "Test Group",
      field: ``,

      render: (row) => <div>{row.test_group?.test_group_name}</div>,
    },

    {
      title: "Test Category",
      field: ``,

      render: (row) => <div>{row?.test_category_name}</div>,

      // cellStyle: {
      //     marginLeft: 50,
      //     width: 600
      // },
    },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <button className="btn btn-info btn-sm action-btn">
            {" "}
            <i
              className="fas fa-edit"
              onClick={(e) => {
                editTestCategory(e, row.id);
                EditMoalOpen(e, row.id);
                setPageView("edit");
              }}
            ></i>
          </button>
          <button
            onClick={(e) => deleteallTestCategory(e, row.id)}
            className="btn btn-danger btn-sm action-btn mx-1"
          >
            {" "}
            <i className="fas fa-trash"></i>{" "}
          </button>
        </div>
      ),
    },
  ];

  //add modal

  const customStyles = {
    content: {
      top: "35%",
      left: "30%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
      height: "300px",
      background: "#ffffff",
    },
    overlay: { zIndex: 1000 },
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function AddMoalOpen(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [modalEditIsOpen, setEditIsOpen] = React.useState(false);
  function EditMoalOpen(e, editId) {
    e.preventDefault();
    setEditIsOpen(true);
    setEditTestCategoryId(editId);
  }

  function closeEditModal() {
    setEditIsOpen(false);
  }

  const [test_group_name, settest_group_name] = useState("");
  // console.log('test group state', test_group_name)

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  console.log("value 2 check", value2);

  // console.log('hello check', value)
  const [testCategory, setTestCategory] = useState({
    test_group_id: "",
    test_category_name: "",
  });

  // console.log('bal',testCategory)

  function handleAdd(e) {
    setTestCategory({
      ...testCategory,
      [e.target.name]: e.target.value,
    });
  }
  function TestCategorySave(e) {
    e.preventDefault();
    const addData = {
      test_group_id: value,
      test_category_name: testCategory.test_category_name,
    };
    axios.post(`/save-new-test-category`, addData).then((res) => {
      if (res.data.status == 200) {
        toast.success("Success", res.data.message, "success");
        setTestCategory({
          test_group_id: "",
          test_category_name: "",
        });
        setPageView("view");
        setAllTestCategoryRender(res.data);
        closeModal();
      }
      // else if (res.data.status == 400) {
      //     setbank({ ...bank, error_list: res.data.errors });

      // }
    });
  }

  const [pageView, setPageView] = useState("view");

  return (
    <>
      {/* <div className="shadow-sm p-2 mb-3 mt-2 bg-body rounded">
                <h5 className="mx-2" >Test Panels</h5>
            </div> */}
      {/* <h6>Test Panels</h6> */}

      <div className="">
        <div className="row">
          <div className="rx-one-button-group">
            <button
              type="submit"
              className="btns float-end mt-2 "
              onClick={() => setPageView("add")}
            >
              Add New
            </button>
          </div>
          {/* 
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    > */}

          {pageView === "add" && (
            <>
              <div className="card  mt-2 bg-white">
                <div className="card-header rx-one-button-group ">
                  {/* <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i className="fal fa-times"></i></span> */}

                  <button
                    className="btn float-end "
                    type="submit"
                    onClick={() => setPageView("view")}
                  >
                    Back
                  </button>
                  <h6 className="">
                    {" "}
                    <b>Add Test Category</b>
                  </h6>

                  {/* <div className="line "></div> */}
                </div>
                <div className="card-body">
                  <div className="row ">
                    <div className="col-md-12">
                      <div className="mb-3 mt-3">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Test Group Name
                        </label>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          size="small"
                          options={allTestGroup}
                          getOptionLabel={(option) => option?.test_group_name}
                          onChange={(e, newValue) => {
                            console.log("New Value Doctor Name", newValue);
                            setValue(newValue.id);
                          }}
                          // sx={{ width: 200 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Test Group" />
                          )}
                        />
                      </div>

                      <div className="mb-3 mt-3">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Test Catgory Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          onChange={handleAdd}
                          value={testCategory?.test_category_name}
                          name="test_category_name"
                        />
                      </div>
                      <div className="rx-one-button-group">
                        <button
                          className="btn float-end "
                          type="submit"
                          onClick={TestCategorySave}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* </Modal> */}

          {/* /* {edit modal} */}

          {/* <Modal
                        isOpen={modalEditIsOpen}
                        onRequestClose={closeEditModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    > */}

          {pageView === "edit" && (
            <div className="card  mt-2 bg-white">
              <div className="card-header ">
                {/* <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i className="fal fa-times"></i></span> */}

                <button
                  className="btn btn-success btn-sm float-end "
                  type="submit"
                  onClick={() => setPageView("view")}
                >
                  Back
                </button>
                <h6 className="">
                  {" "}
                  <b>Edit Test Name</b>
                </h6>

                {/* <div className="line "></div> */}
              </div>

              <div className="card-body">
                {/* <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeEditModal}><i className="fal fa-times"></i></span>

                            <h5 className=""> <b>Edit Test Group</b></h5> */}

                {/* <div className="line "></div> */}

                <div className="row ">
                  <div className="col-md-12">
                    <div className="mb-3 mt-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Test Group Name
                      </label>
                      {/* <select className="form-select form-select-sm" aria-label=".form-select-sm example" name="test_group_id" value={editLabTestCategory.test_group_id} onChange={handleEdit}>
                                            <option selected>Select Test Group</option>
                                            {
                                                allTestGroup.map((item, i) => {
                                                    return (
                                                        <>
                                                            <option value={item.id}>{item.test_group_name}</option>

                                                        </>
                                                    )
                                                })
                                            }

                                        </select> */}

                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={allTestGroup}
                        getOptionLabel={(option) => option.test_group_name}
                        onChange={(e, newValue) => {
                          console.log("New edit ", newValue);
                          setValue2(newValue.id);
                        }}
                        // sx={{ width: 200 }}
                        renderInput={(params) => (
                          <TextField {...params} label={editTestgroupName} />
                        )}
                      />
                    </div>

                    <div className="mb-3 mt-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Test Catgory Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        onChange={handleEdit}
                        value={editLabTestCategory?.test_category_name}
                        name="test_category_name"
                      />
                    </div>
                    <button
                      className="btn btn-success btn-sm float-end "
                      type="submit"
                      onClick={TestCategoryUpdate}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* </Modal> */}

          {pageView === "view" && (
            <>
              <div className="col-md-12">
                <h6 className="px-2">Test Category</h6>

                <MaterialTable
                  columns={columns}
                  data={allTestCatgeory}
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TestCategory;
