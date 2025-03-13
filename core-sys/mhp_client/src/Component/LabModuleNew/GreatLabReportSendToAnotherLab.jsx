import axios from "axios";
import React, { useEffect, useState } from "react";

export default function GreatLabReportSendToAnotherLab() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const [lab, setLab] = useState([]);
  useEffect(() => {
    axios.get("organization-list").then((res) => {
      setLab(res.data.data);
    });
  }, []);
  return (
    <div className="ms-2 lab-agent all-patients mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              {" "}
              Report Send To Another Lab
              {/* <Link to='/application' className="btn btn-primary me-3 btn-sm float-end"> Add Lab Agent</Link> */}
            </h5>
          </div>
          <div className="custom-card p-2 mt-2">
            <form action="">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-2">
                    <label htmlFor="lab">Select Lab</label>
                    <select
                      required
                      onChange={handleChange}
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option value="all">Select</option>
                      {lab?.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="Patient Id">Patient Id</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Patient Id"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="Upload File"> Support File</label>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-2">
                    <label htmlFor="lab">Select Doctor</label>
                    <select
                      onChange={handleChange}
                      required
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option value="all">Select</option>
                      <option value="sent">Sent to Lab</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="Upload File"> Report File</label>
                    <input
                      required
                      type="file"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <button
                      type="submit"
                      className="btn btn-success btn-s float-end mt-4"
                    >
                      {" "}
                      Send{" "}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
