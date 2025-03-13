import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
// initial Parameter

export default function LabTestParameters() {
  const params = useParams();
  const [btnLoading, setBtnLoading] = useState(false);
  const [normal_value, setNormalValue] = useState({
    id: "",
    reference_value: "",
    show_options: false,
    options: "",
  });
  const [parameterList, setParameterList] = useState([
    { id: "", parameter_name: "", parameter_unit: "" },
  ]);
  console.log("parameterList", normal_value);
  useEffect(() => {
    if (params?.id) {
      axios.get(`/parameter-test/${params?.id}`).then((res) => {
        if (res.data.status === 200) {
          if (res.data?.parameter.length > 0) {
            setParameterList(res?.data?.parameter);
          }
        }
      });
    }
  }, [params.id]);

  const saveParameter = async () => {
    try {
      setBtnLoading(true);
      axios
        .post(`/update-parameter-reference/${normal_value?.id}`, normal_value)
        .then((res) => {
          if (res.data.status === 200) {
            toast.success(`Parameter updated successfully`);
          }
        });
    } catch (error) {
      toast.error(`Error adding parameters`);
    } finally {
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
              setNormalValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Test Parameter" />
            )}
          />
        </div>
      </div>

      <div className="">
        {/* custom text area */}
        <div className="row">
          <div className="col-md-12 mb-2">
            <label
              for="exampleFormControlInput1"
              className="form-label mb-0 pb-0"
            >
              <b className="p-0 m-0">Reference Value</b>
            </label>
            <textarea
              className="form-control mt-1"
              id="exampleFormControlInput1"
              rows={5}
              value={normal_value?.reference_value}
              onChange={(e) =>
                setNormalValue({
                  ...normal_value,
                  reference_value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-12 mb-3">
            <div className="form-check ms-4">
              <input
                style={{ fontSize: "20px" }}
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                checked={normal_value?.show_options}
                onChange={(e) =>
                  setNormalValue({
                    ...normal_value,
                    show_options: e.target.checked,
                  })
                }
              />
              <label
                style={{ fontSize: "15px" }}
                className="mt-1"
                for="flexCheckDefault"
              >
                Show Options
              </label>
            </div>
            {normal_value?.show_options ? (
              <>
                <label
                  for="exampleFormControlInput1"
                  className="form-label mb-0 pb-0"
                >
                  <b className="p-0 m-0">Options</b>
                </label>
                <textarea
                  className="form-control mt-1"
                  id="exampleFormControlInput1"
                  rows={5}
                  value={normal_value?.options}
                  onChange={(e) =>
                    setNormalValue({
                      ...normal_value,
                      options: e.target.value,
                    })
                  }
                />
              </>
            ) : (
              <></>
            )}
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
