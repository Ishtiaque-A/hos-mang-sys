import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
const ageData = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
  { value: 12 },
  { value: 13 },
  { value: 14 },
  { value: 15 },
  { value: 16 },
  { value: 17 },
  { value: 18 },
  { value: 19 },
  { value: 20 },
  { value: 21 },
  { value: 22 },
  { value: 23 },
  { value: 24 },
  { value: 25 },
  { value: 26 },
  { value: 27 },
  { value: 28 },
  { value: 29 },
  { value: 30 },
  { value: 31 },
  { value: 32 },
  { value: 33 },
  { value: 34 },
  { value: 35 },
  { value: 36 },
  { value: 37 },
  { value: 38 },
  { value: 39 },
  { value: 40 },
  { value: 41 },
  { value: 42 },
  { value: 43 },
  { value: 44 },
  { value: 45 },
  { value: 46 },
  { value: 47 },
  { value: 48 },
  { value: 49 },
  { value: 50 },
  { value: 51 },
  { value: 52 },
  { value: 53 },
  { value: 54 },
  { value: 55 },
  { value: 56 },
  { value: 57 },
  { value: 58 },
  { value: 59 },
  { value: 60 },
  { value: 61 },
  { value: 62 },
  { value: 63 },
  { value: 64 },
  { value: 65 },
  { value: 66 },
  { value: 67 },
  { value: 68 },
  { value: 69 },
  { value: 70 },
  { value: 71 },
  { value: 72 },
  { value: 73 },
  { value: 74 },
  { value: 75 },
  { value: 76 },
  { value: 77 },
  { value: 78 },
  { value: 79 },
  { value: 80 },
  { value: 81 },
  { value: 82 },
  { value: 83 },
  { value: 84 },
  { value: 85 },
  { value: 86 },
  { value: 87 },
  { value: 88 },
  { value: 89 },
  { value: 90 },
  { value: 91 },
  { value: 92 },
  { value: 93 },
  { value: 94 },
  { value: 95 },
  { value: 96 },
  { value: 97 },
  { value: 98 },
  { value: 99 },
  { value: 100 },
  { value: 101 },
  { value: 102 },
  { value: 103 },
  { value: 104 },
  { value: 105 },
  { value: 106 },
  { value: 107 },
  { value: 108 },
  { value: 109 },
  { value: 110 },
];

// initial Parameter
const parameterForMale = {
  gender: "male",
  minimum_age: "",
  maximum_age: "",
  lower_value: "",
  upper_value: "",
  in_words: "",
};
const parameterForFemale = {
  gender: "female",
  minimum_age: "",
  maximum_age: "",
  lower_value: "",
  upper_value: "",
  in_words: "",
};
const parameterForChild = {
  gender: "child",
  minimum_age: "",
  maximum_age: "",
  lower_value: "",
  upper_value: "",
  in_words: "",
};
export default function LabTestParametersBackup() {
  const params = useParams();
  const [btnLoading, setBtnLoading] = useState(false);
  const [normal_value, setNormalValue] = useState("");

  const [parameterList, setParameterList] = useState([
    { id: "", parameter_name: "", parameter_unit: "" },
  ]);
  useEffect(() => {
    if (params.id) {
      axios.get(`/edit-new-test-name/${params.id}`).then((res) => {
        if (res.data.status === 200) {
          if (res.data.test_name.parameter.length > 0) {
            setParameterList(res.data.test_name.parameter);
          }
        }
      });
    }
  }, [params.id]);
  const [parameterName, setParameterName] = useState("");
  const [obj1, setObj1] = useState({ ...parameterForMale });

  function obj1Change(e) {
    setObj1({
      ...obj1,
      [e.target.name]: e.target.value,
    });
  }

  const [obj2, setObj2] = useState({ ...parameterForFemale });

  function obj2Change(e) {
    setObj2({
      ...obj2,
      [e.target.name]: e.target.value,
    });
  }

  const [obj3, setObj3] = useState({ ...parameterForChild });

  function obj3Change(e) {
    setObj3({
      ...obj3,
      [e.target.name]: e.target.value,
    });
  }

  const myArray = [obj1, obj2, obj3];

  const saveParameter = async () => {
    try {
      // Set loading state to true when API calls start
      setBtnLoading(true);

      // formatted Data  for store DB
      const postData = myArray.map((item) => {
        return {
          ...item,
          parameter: parameterName,
          test_name_id: params.id,
          normal_value: normal_value,
        };
      });

      // Save all Parameters
      const responses = await Promise.all(
        postData.map((data) => axios.post(`/save-test-parameter`, data))
      );
      // check if all responses are successful
      const isSuccess = responses.every((res) => res.data.status === 200);
      // handle success or failure
      if (isSuccess) {
        toast.success(`All parameters added successfully`);
        setParameterName("");
        setObj1({ ...parameterForMale });
        setObj2({ ...parameterForFemale });
        setObj3({ ...parameterForChild });
        setNormalValue("");
      } else {
        toast.error(`Some parameters failed to add`);
      }
    } catch (error) {
      console.error("Error adding parameters:", error);
      toast.error(`Error adding parameters`);
    } finally {
      // Set loading state to false when API calls are complete
      setBtnLoading(false);
    }
  };
  return (
    <div className="shadow-sm p-2 mb-3 bg-body rounded mt-1">
      <h6 className="mt-1 mx-2">Normal value with Numeric Range</h6>
      <hr />
      <div className="d-flex ">
        <div className="col-md-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={parameterList}
            getOptionLabel={(option) => option.parameter_name}
            onChange={(e, newValue) => {
              console.log("sad", newValue);
              setParameterName(newValue.id);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Test Parameter" />
            )}
          />
        </div>
      </div>

      <div className="">
        {/* first parameter */}
        <div className="row">
          <div className="col-md-12 d-flex mt-4">
            <div className="mb-3 mt-3 col-3">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Gender </b>
              </label>
              <select
                disabled
                className="form-select"
                aria-label="Default select example"
                name="gender"
                value={obj1.gender}
                onChange={obj1Change}
              >
                <option selected value="Male">
                  Male
                </option>
                {/* <option value='Female'>Female</option>
                <option value='Child'>Child</option> */}
              </select>
            </div>

            <div className="mb-3 mt-3 col-3">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Minimum Age</b>{" "}
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="minimum_age"
                value={obj1.minimum_age}
                onChange={obj1Change}
              >
                <option selected>Select</option>
                {ageData.slice(0, 100).map((age) => (
                  <option value={age.value}>{age.value}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 mt-3 col-2">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Maximum Age</b>{" "}
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="maximum_age"
                value={obj1.maximum_age}
                onChange={obj1Change}
              >
                <option selected>Select</option>
                {ageData.map((age) => (
                  <option value={age.value}>{age.value}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 mt-3 col-2">
              <label for="exampleFormControlInput1" className="form-label">
                <b> Lower Value</b>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                id="exampleFormControlInput1"
                name="lower_value"
                value={obj1.lower_value}
                onChange={obj1Change}
              />
            </div>

            <div className="mb-3 mt-3 col-2">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Upper Value </b>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                id="exampleFormControlInput1"
                name="upper_value"
                value={obj1.upper_value}
                onChange={obj1Change}
              />
            </div>
          </div>
        </div>
        {/* second parameter */}
        <div className="row">
          <div className="col-md-12 d-flex ">
            <div className="mb-3 mt-3 col-3">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Gender </b>
              </label>
              <select
                disabled
                className="form-select"
                aria-label="Default select example"
                name="gender"
                value={obj2.gender}
                onChange={obj2Change}
              >
                {/* <option value='Male'>Male</option> */}
                <option selected value="Female">
                  Female
                </option>
                {/* <option value='Child'>Child</option> */}
              </select>
            </div>

            <div className="mb-3 mt-3 col-3">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Minimum Age</b>{" "}
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="minimum_age"
                value={obj2.minimum_age}
                onChange={obj2Change}
              >
                <option selected>Select</option>
                {ageData.slice(0, 100).map((age) => (
                  <option value={age.value}>{age.value}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 mt-3 col-2">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Maximum Age</b>{" "}
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="maximum_age"
                value={obj2.maximum_age}
                onChange={obj2Change}
              >
                <option selected>Select</option>
                {ageData.map((age) => (
                  <option value={age.value}>{age.value}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 mt-3 col-2">
              <label for="exampleFormControlInput1" className="form-label">
                <b> Lower Value</b>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                id="exampleFormControlInput1"
                name="lower_value"
                value={obj2.lower_value}
                onChange={obj2Change}
              />
            </div>

            <div className="mb-3 mt-3 col-2">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Upper Value </b>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                id="exampleFormControlInput1"
                name="upper_value"
                value={obj2.upper_value}
                onChange={obj2Change}
              />
            </div>
          </div>
        </div>
        {/* third parameter */}
        <div className="row">
          <div className="col-md-12 d-flex ">
            <div className="mb-3 mt-3 col-3">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Gender </b>
              </label>
              <select
                disabled
                className="form-select"
                aria-label="Default select example"
                name="gender"
                value={obj3.gender}
                onChange={obj3Change}
              >
                {/* <option value='Male'>Male</option> */}
                {/* <option value='Female'>Female</option> */}
                <option selected value="Child">
                  Child
                </option>
              </select>
            </div>

            <div className="mb-3 mt-3 col-3">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Minimum Age</b>{" "}
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="minimum_age"
                value={obj3.minimum_age}
                onChange={obj3Change}
              >
                <option selected>Select</option>
                {ageData.slice(0, 100).map((age) => (
                  <option value={age.value}>{age.value}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 mt-3 col-2">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Maximum Age</b>{" "}
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="maximum_age"
                value={obj3.maximum_age}
                onChange={obj3Change}
              >
                <option selected>Select</option>
                {ageData.map((age) => (
                  <option value={age.value}>{age.value}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 mt-3 col-2">
              <label for="exampleFormControlInput1" className="form-label">
                <b> Lower Value</b>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                id="exampleFormControlInput1"
                name="lower_value"
                value={obj3.lower_value}
                onChange={obj3Change}
              />
            </div>

            <div className="mb-3 mt-3 col-2">
              <label for="exampleFormControlInput1" className="form-label">
                <b>Upper Value</b>
              </label>
              <input
                type="text"
                className="form-control mt-1"
                id="exampleFormControlInput1"
                name="upper_value"
                value={obj3.upper_value}
                onChange={obj3Change}
              />
            </div>
          </div>
        </div>

        {/* custom text area */}
        <div className="row">
          <div className="col-md-12 mb-4">
            <label
              for="exampleFormControlInput1"
              className="form-label mb-0 pb-0"
            >
              <b className="p-0 m-0">Normal Value</b>
            </label>
            <textarea
              className="form-control mt-1"
              id="exampleFormControlInput1"
              rows={5}
              value={normal_value}
              onChange={(e) => setNormalValue(e.target.value)}
            />
          </div>
        </div>
        {/* save button */}
        <div className="rx-one-button-group pb-4">
          <button
            disabled={btnLoading}
            onClick={saveParameter}
            className="btn float-end"
          >
            {btnLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
