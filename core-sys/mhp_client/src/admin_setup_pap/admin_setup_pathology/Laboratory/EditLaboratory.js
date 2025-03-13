import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import PathologySetupSidebar from "../PathologySetupSidebar";
import { set } from "date-fns";
import { toast } from "react-toastify";

const EditLaboratory = () => {
  const { id } = useParams();
  const [laboratory, setLaboratory] = useState(null);
  const [error, setError] = useState([]);
  const [labImage, setLabImage] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`/edit-labratory-name/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log("res", res.data.edit_labratory);
        setLaboratory(res.data.edit_labratory);
      } else if (res.data.status === 404) {
        setError(res.data.errors);
      }
    });
  }, [id]);

  console.log(laboratory, "laboratory");

  const handleInput = (e) => {
    e.persist();
    setLaboratory({
      ...laboratory,
      [e.target.name]: e.target.value,
    });
  };

  const updatePathologyLaboratory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("labratory_name", laboratory?.labratory_name);
    formData.append("address", laboratory?.address);
    formData.append("phone", laboratory?.phone);
    formData.append("fax", laboratory?.fax);
    formData.append("email", laboratory?.email);
    formData.append("websiteLink", laboratory?.websiteLink);
    formData.append("logo", labImage);

    axios.post(`/update-labratory-name/${id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        navigate(`/pathology-laboratory`);
        setLaboratory(null);
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
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
                  Edit Laboratory Name
                  <Link
                    to={"/add-laboratory-name"}
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
                  onSubmit={updatePathologyLaboratory}
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
                          value={laboratory?.labratory_name}
                          required
                          onChange={handleInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label
                          htmlFor="diagnosis_procedure_name"
                          className="col-form-label-sm"
                        >
                          Address{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={laboratory?.address}
                          required
                          onChange={handleInput}
                        />
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
                          value={laboratory?.phone}
                          required
                          onChange={handleInput}
                        />
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
                          value={laboratory?.fax}
                          required
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
                          value={laboratory?.email}
                          required
                          onChange={handleInput}
                        />
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
                          type="url"
                          className="form-control"
                          name="websiteLink"
                          value={laboratory?.websiteLink}
                          required
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
                            setLabImage(e.target.files[0]);
                          }}
                        />
                      </div>
                      <div className="float-right">
                        <button
                          type="submit"
                          className="btn btn-sm btn-primary text-uppercase float-end mt-2"
                        >
                          <i className="fas fa-save"></i> Update
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
  );
};

export default EditLaboratory;
