import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { toast } from "react-toastify";

// empty fields
const emptyData = {
  test_name_id: null,
  parameter_id: null,
  child_lower_value: null,
  child_upper_value: null,
  child_normal_value: null,
  male_lower_value: null,
  male_upper_value: null,
  male_normal_value: null,
  female_lower_value: null,
  female_upper_value: null,
  female_normal_value: null,
};

function TestNameConfig() {
  const [testNames, setTestNames] = useState(null);
  const [searchTestName, setSearchTestName] = useState("");
  const [parameters, setParameters] = useState(null);
  const [testId, setTestId] = useState(null);
  const [configData, setConfigData] = useState({ ...emptyData });

  const [btnLoading, setBtnLoading] = useState(false);


  useEffect(() => {
    //get TestNames  with Parameters from DB
    const getTestName = async () => {
      try {
        const response = await axios.get(`/new-test-name`);
        if (response.data.status === 200) {
          const allTestName = response.data.test_name || [];
          // filter test name with parameter
          const filteredTestName = allTestName.filter((item) => {
            return item.parameter.length > 0;
          });
          setTestNames(filteredTestName);
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

  useEffect(() => {
    const getParameters = async () => {
      try {
        const response = await axios.get(
          `/test-name-config-find-by-id/${configData.parameter_id}`
        );
        if (response?.data?.id) {
          setConfigData(response?.data);
        }
      } catch (error) {
        toast.error("Parameters not found");
      }
    };
    if (configData.parameter_id) {
      getParameters();
    }
  }, [configData.parameter_id, configData.test_name_id]);

  // clearing all field
  const clearingAllField = () => {
    setSearchTestName("");
    setTestId("");
    setParameters(null);
    setConfigData({ ...emptyData });
  };

  // handle change Parameter
  const handleChangeParameter = (e) => {
    setTestId(e.target.value);
    setConfigData({ ...configData, parameter_id: +e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      // check if all fields are required
      const fieldNames = Object.keys(configData);
      let fieldsIsRequired = false;
      fieldNames.forEach((fieldName) => {
        if (!configData[fieldName]) fieldsIsRequired = true;
      });

      if (fieldsIsRequired) {
        toast.error("All fields are required");
        return;
      }
      // send data to server
      const response = await axios.post("/test-name-config", configData, {
        headers: {
          "content-type": "application/json",
        },
      });
      // check response
      if (response.status !== 201 && response.status !== 200) {
        toast.error(response.data.message);
        return;
      }
      // success Message
      if (response.status === 201 || response.status === 200) {
        toast.success(response.data.message);
        setConfigData({ ...emptyData });
        clearingAllField();
        const form = e.target;
        form.reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
      return;
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="shadow-sm p-2 mb-3 bg-body rounded mt-1">
      <h6 className="mt-1 mx-2">Test Name Config</h6>
      <hr />
      <form onSubmit={handleSubmitForm}>
        <div className="d-flex items-start ">
          {/* for Test Name  */}
          <div style={{ width: "50%", padding: "0px 20px" }}>
            <label for="exampleFormControlInput2" className="form-label">
              <b>Test Name</b>
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
                setParameters(item.parameter);
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
              fuseOptions={{ keys: ["test_name"] }} // Search in the description text as well
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
          <div style={{ width: "50%", padding: "0px 20px" }}>
            <label for="exampleFormControlInput1" className="form-label">
              <b>Select Parameter</b>
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="parameter"
              onChange={handleChangeParameter}
            >
              <option selected>Select</option>
              {parameters?.map((parameter) => (
                <option value={parameter.id}>{parameter.parameter_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          {/* for Male */}
          <div className="col-md-12 d-flex ">
            <div className="mb-3 mt-3 col-3">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Gender</b>
              </label>
              <input
                type="text"
                value="Male"
                readOnly
                disabled
                className="form-control mt-1"
                id="exampleFormControlInput1"
              />
            </div>

            <div className="mb-3 mt-3 col-3">
              <label htmlFor="lower">
                <b>Lower Value</b>
              </label>
              <textarea
                onChange={(e) =>
                  setConfigData({
                    ...configData,
                    male_lower_value: e.target.value,
                  })
                }
                value={configData.male_lower_value || ""}
                className="form-control w-100"
                id="lower"
                rows="4"
              ></textarea>
            </div>

            <div className="mb-3 mt-3 col-3">
              <label htmlFor="upper">
                <b>Upper Value</b>
              </label>
              <textarea
                value={configData.male_upper_value || ""}
                onChange={(e) =>
                  setConfigData({
                    ...configData,
                    male_upper_value: e.target.value,
                  })
                }
                className="form-control w-100"
                id="upper"
                rows="4"
              ></textarea>
            </div>

            <div className="mb-3 mt-3 col-3">
              <label htmlFor="normal">
                <b>Normal Value</b>
              </label>
              <textarea
                value={configData.male_normal_value || ""}
                onChange={(e) =>
                  setConfigData({
                    ...configData,
                    male_normal_value: e.target.value,
                  })
                }
                className="form-control w-100"
                id="normal"
                rows="4"
              ></textarea>
            </div>
          </div>
          {/* for Female */}
          <div className="col-md-12 d-flex ">
            <div className="mb-3 mt-3 col-3">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Gender</b>
              </label>
              <input
                type="text"
                value="Female"
                readOnly
                disabled
                className="form-control mt-1"
                id="exampleFormControlInput1"
              />
            </div>

            <div className="mb-3 mt-3 col-3">
              <label htmlFor="lower">
                <b>Lower Value</b>
              </label>
              <textarea
                value={configData.female_lower_value || ""}
                onChange={(e) =>
                  setConfigData({
                    ...configData,
                    female_lower_value: e.target.value,
                  })
                }
                className="form-control w-100"
                id="lower"
                rows="4"
              ></textarea>
            </div>

            <div className="mb-3 mt-3 col-3">
              <label htmlFor="upper">
                <b>Upper Value</b>
              </label>
              <textarea
                className="form-control w-100"
                value={configData.female_upper_value || ""}
                onChange={(e) =>
                  setConfigData({
                    ...configData,
                    female_upper_value: e.target.value,
                  })
                }
                id="upper"
                rows="4"
              ></textarea>
            </div>

            <div className="mb-3 mt-3 col-3">
              <label htmlFor="normal">
                <b>Normal Value</b>
              </label>
              <textarea
                className="form-control w-100"
                id="normal"
                value={configData.female_normal_value || ""}
                rows="4"
                onChange={(e) =>
                  setConfigData({
                    ...configData,
                    female_normal_value: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
          {/* for Child */}
          <div className="col-md-12 d-flex ">
            <div className="mb-3 mt-3 col-3">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Gender</b>
              </label>
              <input
                type="text"
                value="Child"
                readOnly
                disabled
                className="form-control mt-1"
                id="exampleFormControlInput1"
              />
            </div>

            <div className="mb-3 mt-3 col-3">
              <label htmlFor="lower">
                <b>Lower Value</b>
              </label>
              <textarea
                className="form-control w-100"
                id="lower"
                value={configData.child_lower_value || ""}
                onChange={(e) =>
                  setConfigData({
                    ...configData,
                    child_lower_value: e.target.value,
                  })
                }
                rows="4"
              ></textarea>
            </div>

            <div className="mb-3 mt-3 col-3">
              <label htmlFor="upper">
                <b>Upper Value</b>
              </label>
              <textarea
                className="form-control w-100"
                id="upper"
                value={configData.child_upper_value || ""}
                onChange={(e) =>
                  setConfigData({
                    ...configData,
                    child_upper_value: e.target.value,
                  })
                }
                rows="4"
              ></textarea>
            </div>

            <div className="mb-3 mt-3 col-3">
              <label htmlFor="normal">
                <b>Normal Value</b>
              </label>
              <textarea
                className="form-control w-100"
                id="normal"
                value={configData.child_normal_value || ""}
                onChange={(e) =>
                  setConfigData({
                    ...configData,
                    child_normal_value: e.target.value,
                  })
                }
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="rx-one-button-group pb-4">
            <button disabled={btnLoading} className="btn float-end">
              {btnLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TestNameConfig;
