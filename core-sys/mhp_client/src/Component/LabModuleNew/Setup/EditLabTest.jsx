import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaMinus } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import Swal from "sweetalert2";
export default function EditLabTest() {
  const [allTestGroup, setallTestGroup] = useState([]);
  const [testGroupId, setTestGroupId] = useState("");
  const [dependentTestCategory, setDependentTestCategory] = useState([]);
  const [allTestNames, setAllTestNames] = useState([]);
  const [allTestSubCategory, setAllTestSubCategory] = useState([]);
  const params = useParams();

  const [editTestData, setEditTestData] = useState({
    test_group_id: "",
    test_category_id: "",
    test_name: "",
    fee: "",
    test_sub_category_id: "",
    accounts_id: "",
    accounts_type_id: "",
    accounts_group_id: "",
    discount: 0,
    hide_test_name: 0,
  });
  const [editDependentTestCategory, setEditDependentTestCategory] = useState(
    []
  );
  const [parameterGroupList, setParameterGroupList] = useState([]);
  const [parameterGroupId, setParameterGroupId] = useState("");
  const navigate = useNavigate();
  console.log(editTestData);
  function TestNameUpdate(e) {
    e.preventDefault();
    const editData = {
      test_group_id: editTestData.test_group_id,
      test_category_id: editTestData.test_category_id,
      test_name: editTestData.test_name,
      fee: editTestData.fee,
      test_sub_category_id: editTestData.test_sub_category_id,
      accounts_id: editTestData.accounts_id,
      accounts_type_id: editTestData.accounts_type_id,
      accounts_group_id: editTestData.accounts_group_id,
      parameter_group_id: parameterGroupId,
      discount: editTestData.discount,
      hide_test_name: editTestData.hide_test_name,
      item_code: editTestData.item_code,
      parameter_data: JSON.stringify(parameterGroupList),
    };

    // console.log(editData, 'insideEditData');
    // return;
    axios.post(`/update-new-test-name/${params.id}`, editData).then((res) => {
      console.log(res, "dd");
      if (res.data.status === 200) {
        toast.success("Success", res.data.message, "success");
        navigate("/lab-module-new/test-name");
      }
    });
  }
  useEffect(() => {
    if (params.id) {
      axios.get(`/edit-new-test-name/${params.id}`).then((res) => {
        setEditTestData(res?.data?.test_name);
      });
    }
    // get Parameter Group
    axios
      .get(`parameter-group-by-test-name-id/${params.id}`)
      .then((res) => {
        if (res.status === 200) {
          const data = [...res.data];
          if (data?.length > 0) {
            data.map((item, i) => {
              if (!item.parameter?.length > 0) {
                return (item.parameter = [
                  {
                    id: "",
                    u_id: new Date().getTime() + Math.random() + i,
                    parameter_name: "",
                    parameter_unit: "",
                  },
                ]);
              } else {
                return item.parameter;
              }
            });
          }
          setParameterGroupList(data);
        }
      })
      .catch((err) => console.log(err));
    // }
  }, [params.id]);
  useEffect(() => {
    axios.get(`/new-test-group`).then((res) => {
      if (res.data.status === 200) {
        setallTestGroup(res.data.test_group);
      }
    });
    if (testGroupId) {
      axios.get(`/new-test-categories-by-id/${testGroupId}`).then((res) => {
        if (res.data.status === 200) {
          setDependentTestCategory(res.data.all_cat);
        }
      });
    }

    if (editTestData.test_group_id) {
      axios
        .get(`/new-test-categories-by-id/${editTestData.test_group_id}`)
        .then((res) => {
          if (res.data.status === 200) {
            setEditDependentTestCategory(res.data.all_cat);
          }
        });
    }
    axios.get(`/new-test-name`).then((res) => {
      if (res.data.status === 200) {
        setAllTestNames(res.data.test_name);
      }
    });
    if (editTestData.test_category_id) {
      axios
        .get(`/test-sub-categories-by-catId/${editTestData.test_category_id}`)
        .then((res) => {
          if (res.data.status === 200) {
            setAllTestSubCategory(res.data.sub_category);
          }
        });
    }
  }, [editTestData.test_category_id, editTestData.test_group_id, testGroupId]);

  const handleTestData = (e) => {
    setEditTestData({ ...editTestData, [e.target.name]: e.target.value });
  };

  // parameter group config

  const handleParameterInputChange = (e, index, i) => {
    const list = [...parameterGroupList];
    const { name, value } = e.target;
    list[index]["parameter"][i][name] = value;
    setParameterGroupList(list);
  };

  const handleInput = (index) => {
    const existing = [...parameterGroupList];
    existing[index]["parameter"].push({
      id: "",
      u_id: new Date().getTime() + Math.random(),
      parameter_name: "",
      parameter_unit: "",
    });
    setParameterGroupList(existing);
  };

  const handleRemoveInput = (index, i, params) => {
    if (params?.id) {
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
          axios.delete(`destroy-parameter/${params.id}`).then((res) => {
            if (res.data.status === 200) {
              Swal.fire("Deleted!", "Your data has been deleted.", "success");
              const param = [...parameterGroupList];
              param[index]["parameter"].splice(i, 1);
              setParameterGroupList(param);
            }
          });
        }
      });
    } else {
      const param = [...parameterGroupList];
      param[index]["parameter"].splice(i, 1);
      setParameterGroupList(param);
    }
  };
  // parameter group config

  return (
    <div className="card  mt-2 bg-white">
      <div className="card-header ">
        {/* <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i className="fal fa-times"></i></span> */}
        <Link to="/lab-module-new/test-name">
          <button className="btn btn-success btn-sm float-end " type="button">
            Back
          </button>
        </Link>

        <h6 className="">
          <b>Edit Test Name</b>
        </h6>
      </div>

      <div className="card-body">
        <div className="row ">
          <div className="col-md-6">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                Test Group Name
              </label>

              <select
                name="test_group_id"
                value={editTestData.test_group_id}
                onChange={handleTestData}
                className="form-select form-select-sm mb-2"
                aria-label="Default select example"
              >
                <option selected>Select</option>
                {allTestGroup.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.test_group_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-2 ">
              <label for="exampleFormControlInput1" className="form-label">
                Test Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(e) =>
                  setEditTestData({
                    ...editTestData,
                    test_name: e.target.value,
                  })
                }
                value={editTestData.test_name}
                name="test_name"
              />
            </div>
            <div className="mb-2 ">
              <label for="exampleFormControlInput1" className="form-label">
                Fee
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(e) =>
                  setEditTestData({ ...editTestData, fee: e.target.value })
                }
                value={editTestData.fee}
                name="fee"
              />
            </div>
            <div className="mb-2 ">
              <label for="exampleFormControlInput1" className="form-label">
                Item Code
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                name="item_code"
                onChange={handleTestData}
                value={editTestData?.item_code}
              />
            </div>
          </div>

          <div className="col-md-6">
            {/* <label className='mb-1'>Accounts Group</label>
            <select
              name='accounts_group_id'
              value={editTestData.accounts_group_id}
              onChange={handleTestData}
              className='form-select form-select-sm mb-2'
              aria-label='Default select example'
            >
              <option selected>Select</option>
              {accountsGroup.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.fee_name}
                  </option>
                );
              })}
            </select> */}
            <div className="mb-2 ">
              <label for="exampleFormControlInput1" className="form-label">
                Test Category Name
              </label>

              <select
                name="test_category_id"
                value={editTestData.test_category_id}
                onChange={handleTestData}
                className="form-select form-select-sm mb-2"
                aria-label="Default select example"
              >
                <option selected>Select</option>
                {editDependentTestCategory.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.test_category_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-2 ">
              <label for="exampleFormControlInput1" className="form-label">
                Test Sub Category Name
              </label>

              <select
                name="test_sub_category_id"
                value={editTestData.test_sub_category_id}
                onChange={handleTestData}
                className="form-select form-select-sm mb-2"
                aria-label="Default select example"
              >
                <option selected>Select</option>
                {allTestSubCategory.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.test_sub_category_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-2 ">
              <label for="exampleFormControlInput1" className="form-label">
                Discount %
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(e) =>
                  setEditTestData({ ...editTestData, discount: e.target.value })
                }
                value={editTestData?.discount || 0}
                name="discount"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="parameter-group-container">
              {parameterGroupList.map((item, index) => (
                <ParameterGroup
                  item={item}
                  key={item.id}
                  index={index}
                  handleParameterInputChange={handleParameterInputChange}
                  handleRemoveInput={handleRemoveInput}
                  handleInput={handleInput}
                />
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check ms-4">
              <input
                style={{ fontSize: "20px" }}
                className="form-check-input"
                type="checkbox"
                checked={
                  Number(editTestData?.hide_test_name) === 1 ? true : false
                }
                id="flexCheckDefault"
                onChange={(e) =>
                  setEditTestData({
                    ...editTestData,
                    hide_test_name: e.target.checked,
                  })
                }
              />
              <label
                style={{ fontSize: "15px" }}
                className="mt-1"
                for="flexCheckDefault"
              >
                Hide test name in report
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex my-2 justify-content-end">
              <button
                className="btn btn-success btn-sm float-end"
                type="submit"
                onClick={TestNameUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ParameterGroup = ({
  item,
  index,
  handleParameterInputChange,
  handleRemoveInput,
  handleInput,
}) => {
  return (
    <div className="single-parameter-group">
      <div
        style={{
          border: "1px solid #ced4da",
          borderRadius: "0.5rem",
          padding: "10px",
          margin: "10px",
        }}
      >
        <div>
          <h6 className="mb-1 fw-semibold">{item?.group_name}</h6>
        </div>
        {item?.parameter?.map((params, i) => (
          <div key={params.u_id} className="mb-1 row ">
            <div className="col-6">
              <label
                for="exampleFormControlInput1"
                className="form-label d-block"
              >
                Name
              </label>
              <input
                value={params.parameter_name}
                onChange={(e) => handleParameterInputChange(e, index, i)}
                type="text"
                required
                name="parameter_name"
                className="form-control form-control-sm"
              />
            </div>
            <div className="col-4">
              <label
                for="exampleFormControlInput1"
                className="form-label d-block"
              >
                Unit
              </label>
              <input
                value={params.parameter_unit}
                onChange={(e) => handleParameterInputChange(e, index, i)}
                type="text"
                required
                name="parameter_unit"
                className="form-control form-control-sm"
              />
            </div>
            <div className="col-2 d-flex gap-2 my-2 align-items-end justify-content-end">
              {item?.parameter?.length - 1 === i && (
                <button
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    color: "#495057",
                  }}
                  type="button"
                  onClick={() => handleInput(index)}
                >
                  <LuPlus size={20} color="#495057" />
                </button>
              )}

              <button
                style={{
                  all: "unset",
                  cursor: "pointer",
                  color: "#495057",
                }}
                type="button"
                onClick={() => handleRemoveInput(index, i, params)}
              >
                <FaMinus size={20} color="#495057" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
