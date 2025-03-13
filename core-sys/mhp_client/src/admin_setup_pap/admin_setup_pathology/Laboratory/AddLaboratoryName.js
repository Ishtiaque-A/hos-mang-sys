import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert";

import PathologySetupSidebar from "../PathologySetupSidebar";

const AddLaboratoryName = () => {
  const [labratory, setlabratory] = useState();
  const [image, setimage] = useState();
  const location = useLocation();

  console.log("image", image);

  const handleInput = (e) => {
    setlabratory({
      ...labratory,
      [e.target.name]: e.target.value,
    });
  };

  console.log("labratory", labratory);

  const submitPathalogyLabratory = (e) => {
    e.preventDefault();
    console.log("data", labratory);

    const formData = new FormData();
    formData.append("labratory_name", labratory?.labratory_name);
    formData.append("address", labratory?.address);
    formData.append("phone", labratory?.phone);
    formData.append("fax", labratory?.fax);
    formData.append("email", labratory?.email);
    formData.append("websiteLink", labratory?.websiteLink);
    formData.append("image", image);

    axios
      .post(`/save-labratory-name`, formData)
      .then((res) => {
        console.log("res", res.data);
        swal("Success", res.data.message, "success");
        setlabratory();
        location("/pathology-laboratory");
      })
      .catch((err) => {
        console.log("err", err.data.message);
        swal("error", "Giving filed is requierd", "error");
      });
  };

  return (
    <div>
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <PathologySetupSidebar />
            </div>
            <div className="col-md-9 mt-2">
              <div className="card">
                <div className="card-header">
                  <h6 className="card-title">
                    {" "}
                    Add Laboratory Information
                    <Link
                      to={"/pathology-laboratory"}
                      className="btn btn-primary btn-sm float-end"
                    >
                      {" "}
                      Back{" "}
                    </Link>
                  </h6>
                </div>
                <div className="card-body">
                  <form
                    id="RadiologyCenterForm"
                    onSubmit={submitPathalogyLabratory}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="diagnosis_procedure_name"
                            className="col-form-label-sm"
                          >
                            {" "}
                            Name{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="labratory_name"
                            onChange={handleInput}
                          />
                          {/* <span className="text-danger">{labratory?.error_list?.labratory_name[0]}</span> */}
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="diagnosis_procedure_name"
                            className="col-form-label-sm"
                          >
                            {" "}
                            Address{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            onChange={handleInput}
                          />
                          {/* <span className="text-danger">{labratory?.error_list?.address[0]}</span> */}
                        </div>

                        <div className="form-group col-md-6">
                          <label
                            htmlFor="diagnosis_procedure_name"
                            className="col-form-label-sm"
                          >
                            {" "}
                            phone{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            onChange={handleInput}
                          />
                          {/* <span className="text-danger">{labratory?.error_list?.phone[0]}</span> */}
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="diagnosis_procedure_name"
                            className="col-form-label-sm"
                          >
                            {" "}
                            fax{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="fax"
                            onChange={handleInput}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="diagnosis_procedure_name"
                            className="col-form-label-sm"
                          >
                            {" "}
                            Email{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            onChange={handleInput}
                          />
                          {/* <span className="text-danger">{ labratory?.error_list?.email && labratory?.error_list?.email[0]}</span> */}
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="diagnosis_procedure_name"
                            className="col-form-label-sm"
                          >
                            {" "}
                            Website Link{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="websiteLink"
                            onChange={handleInput}
                          />
                          {/* <span className="text-danger">{labratory?.error_list?.websiteLink && labratory?.error_list?.websiteLink[0]}</span> */}
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            htmlFor="diagnosis_procedure_name"
                            className="col-form-label-sm"
                          >
                            {" "}
                            logo{" "}
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="logo"
                            onChange={(e) => {
                              setimage(e.target.files[0]);
                            }}
                          />
                        </div>
                        <div className="float-right">
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary text-uppercase float-end mt-2"
                          >
                            <i className="fas fa-save"></i> Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AddLaboratoryName;
