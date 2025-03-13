import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function AddLabTest() {
  const [allTestGroup, setallTestGroup] = useState([]);
  const [testGroupId, setTestGroupId] = useState("");
  const [test_name, setTest_name] = useState("");
  const [fee, setFee] = useState("");
  const [dependentTestCategory, setDependentTestCategory] = useState([]);
  const [testCategoryId, setTestCategoryId] = useState("");
  const [allTestNames, setAllTestNames] = useState([]);
  const [allTestSubCategory, setAllTestSubCategory] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [testData, setTestData] = useState({
    test_group_id: testGroupId,
    test_category_id: testCategoryId,
    test_sub_category_id: subCategoryId,
    test_name: test_name,
    fee: fee,
    accounts_id: "",
    accounts_type_id: "",
    accounts_group_id: "",
    specimen_id: "",
    discount: 0,
    hide_test_name: 0,
    item_code: "",
  });
  const [allSpecimen, setAllSpecimen] = useState([]);

  const handleTestData = (e) => {
    setTestData({ ...testData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  function TestNameSave(e) {
    e.preventDefault();

    const addData = {
      test_group_id: testGroupId,
      test_category_id: testCategoryId,
      test_sub_category_id: subCategoryId,
      test_name: test_name,
      fee: fee,
      accounts_id: testData.accounts_id,
      accounts_type_id: testData.accounts_type_id,
      accounts_group_id: testData.accounts_group_id,
      specimen_id: testData.specimen_id,
      discount: testData.discount,
      hide_test_name: testData.hide_test_name,
      item_code: testData.item_code,
    };
    axios.post(`/save-new-test-name`, addData).then((res) => {
      if (res.data.status === 200) {
        toast.success("Success", res.data.message, "success");
        setTest_name("");
        setTestGroupId("");
        setFee("");
        navigate("/lab-module-new/test-name");
      }
    });
  }
  useEffect(() => {
    axios.get("specimen-for-test-name").then((res) => {
      setAllSpecimen(res.data || []);
      console.log(res?.data);
    });
  }, []);
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
    axios.get(`/new-test-name`).then((res) => {
      if (res.data.status === 200) {
        setAllTestNames(res.data.test_name);
      }
    });
    if (testCategoryId) {
      axios
        .get(`/test-sub-categories-by-catId/${testCategoryId}`)
        .then((res) => {
          if (res.data.status === 200) {
            setAllTestSubCategory(res.data.sub_category);
          }
        });
    }
  }, [testGroupId, testCategoryId]);

  return (
    <div className="card  mt-2 bg-white">
      <div className="card-header rx-one-button-group">
        <Link to="/lab-module-new/test-name">
          <button className="btn float-end " type="submit">
            Back
          </button>
        </Link>
        <h6 className="">
          {" "}
          <b>Add Test Name</b>
        </h6>
      </div>
      <div className="card-body">
        <div className="row ">
          <div className="col-md-6">
            <div className="mb-3 ">
              <label for="exampleFormControlInput1" className="form-label">
                Test Group Name
              </label>
              <select
                name="accounts_type_id"
                value={testGroupId}
                onChange={(e) => setTestGroupId(e.target.value)}
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
            <div className="mb-3 mt-3">
              <label for="exampleFormControlInput1" className="form-label">
                Test Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setTest_name(e.target.value)}
                value={test_name}
                name="test_name"
              />
            </div>
            <div className="mb-3 mt-3">
              <label for="exampleFormControlInput1" className="form-label">
                Fee
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setFee(e.target.value)}
                value={fee}
                name="fee"
              />
            </div>
            <div className="mb-3 mt-3">
              <label for="exampleFormControlInput1" className="form-label">
                Item Code
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={handleTestData}
                name="item_code"
              />
            </div>
            <div className="form-check ms-4">
              <input
                style={{ fontSize: "20px" }}
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                onChange={(e) =>
                  setTestData({
                    ...testData,
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
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Test Category Name
              </label>
              <select
                name="accounts_type_id"
                value={testCategoryId}
                onChange={(e) => setTestCategoryId(e.target.value)}
                className="form-select form-select-sm mb-2"
                aria-label="Default select example"
              >
                <option selected>Select</option>
                {dependentTestCategory.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.test_category_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3 mt-3">
              <label for="exampleFormControlInput1" className="form-label">
                Test Sub Category Name
              </label>
              <select
                name="accounts_type_id"
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
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
              <div className="mb-3 mt-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Discount %
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  onChange={handleTestData}
                  value={testData?.discount}
                  name="discount"
                />
              </div>
              <div className="mb-3 mt-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Specimen Name
                </label>
                <select
                  value={testData?.specimen_id}
                  name="specimen_id"
                  className="form-select form-select-sm mb-2"
                  onChange={handleTestData}
                >
                  <option selected disabled value={""}>
                    Select
                  </option>
                  {allSpecimen.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-end rx-one-button-group">
                <button className="btn" type="submit" onClick={TestNameSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
