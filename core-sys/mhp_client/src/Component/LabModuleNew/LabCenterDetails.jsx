// import { Checkbox } from '@mui/material';
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";

const LabCenterDetails = () => {
  const [centerDetails, setCenterDetails] = useState({
    email: "",
    name: "",
    address1: "",
    address2: "",
    city_id: "",
    postal_code: "",
    country_id: "",
    phone: "",
    mobile: "",
  });
  const [service, setService] = useState([]);
  const handleSubmit = () => {
    const data = {
      email: centerDetails.email,
      address1: centerDetails.address1,
      address2: centerDetails.address2,
      city_id: centerDetails.city_id,
      postal_code: centerDetails.postal_code,
      country_id: centerDetails.country_id,
      phone: centerDetails.phone,
      mobile: centerDetails.mobile,
      name: centerDetails.name,
      service: service?.toString(),
    };
    if (centerDetails.id) {
      axios
        .post(`/update-lab-center-details/${centerDetails.id}`, data)
        .then((res) => {
          if (res.data.status === 200) {
            swal("Success", res.data.message, "success");
          }
        });
    } else {
      axios.post(`/save-lab-center-details`, data).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
        }
      });
    }
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const arr = [...service];
    if (checked) {
      arr.push(value);
      setService(arr);
    }
    if (!checked) {
      const filtered = arr.filter((item) => item !== value);
      setService(filtered);
    }
  };
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [servicesList, setServiceList] = useState([]);
  useEffect(() => {
    axios.get(`/city-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setCityList(res.data.city);
      }
    });

    axios.get(`/country`).then((res) => {
      if (res.data.status === 200) {
        setCountryList(res.data.country);
      }
    });
    axios.get(`/lab-center-services`).then((res) => {
      if (res.data.status === 200) {
        setServiceList(res.data.service);
      }
    });
    axios.get(`/lab-center-details`).then((res) => {
      if (res.data.status === 200) {
        setCenterDetails(res.data.center, "center details");
        if (res.data.center.service && service.length < 1) {
          setService([...res.data.center.service.split(",")]);
        } else {
          setService([]);
        }
      }
    });
  }, []);

  return (
    <div className="shadow-sm p-2 bg-body rounded mt-2">
      <div className="center-detail-sec p-2">
        <div className="row">
          <div className="col-md-7 px-2">
            <span
              className="px-2"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              Center Details
            </span>
            <div className=" d-flex flex-wrap py-1 px-2">
              {servicesList.map((item) => (
                <div
                  key={item.id}
                  className="form-check me-3 mt-3 home-1st-note"
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={item.name}
                    id="defaultCheck1"
                    onChange={handleCheckbox}
                    checked={service.find((sv) => sv === item.name)}
                  />

                  <label className="form-check-label mx-1" for="defaultCheck1">
                    {item?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5">
            <b className="d-block mx-1">Note:</b>
            <div className="inside-quo px-1 mt-1">
              <span className="home-1st-note">
                1. Center details will be used to print the bills.
              </span>
              <span className="home-1st-note">
                2. Center phone number will be used in the welcome sms.
              </span>

              <span className="mt-3 home-1st-note">Country: Bangladesh</span>
              <span className="home-1st-note">Currency symbol: Taka</span>
              <span className="home-1st-note">Time Zone: Dhaka</span>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                Center name
              </label>
              <input
                value={centerDetails?.name}
                onChange={(e) =>
                  setCenterDetails({ ...centerDetails, name: e.target.value })
                }
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                {" "}
                Address Line 1
              </label>
              <input
                value={centerDetails?.address1}
                onChange={(e) =>
                  setCenterDetails({
                    ...centerDetails,
                    address1: e.target.value,
                  })
                }
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
          </div>

          <div className="col-4">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                Address Line 2
              </label>
              <input
                value={centerDetails?.address2}
                onChange={(e) =>
                  setCenterDetails({
                    ...centerDetails,
                    address2: e.target.value,
                  })
                }
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                {" "}
                Email address
              </label>
              <input
                value={centerDetails?.email}
                onChange={(e) =>
                  setCenterDetails({ ...centerDetails, email: e.target.value })
                }
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                {" "}
                City
              </label>
              <select
                value={centerDetails?.city_id}
                onChange={(e) =>
                  setCenterDetails({
                    ...centerDetails,
                    city_id: e.target.value,
                  })
                }
                className="form-select form-select "
                aria-label=".form-select-lg example"
              >
                <option>Select</option>
                {cityList.map((item) => (
                  <option key={item?.id} value={item.id}>
                    {item?.city_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                {" "}
                Postal Code
              </label>
              <input
                value={centerDetails?.postal_code}
                onChange={(e) =>
                  setCenterDetails({
                    ...centerDetails,
                    postal_code: e.target.value,
                  })
                }
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                {" "}
                Country
              </label>
              <select
                value={centerDetails?.country_id}
                onChange={(e) =>
                  setCenterDetails({
                    ...centerDetails,
                    country_id: e.target.value,
                  })
                }
                className="form-select form-select "
                aria-label=".form-select-lg example"
              >
                <option>Select</option>
                {countryList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.country_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                {" "}
                Phone Number
              </label>
              <input
                value={centerDetails?.phone}
                onChange={(e) =>
                  setCenterDetails({ ...centerDetails, phone: e.target.value })
                }
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-2">
              <label for="exampleFormControlInput1" className="form-label">
                {" "}
                Mobile Number
              </label>
              <input
                value={centerDetails?.mobile}
                onChange={(e) =>
                  setCenterDetails({ ...centerDetails, mobile: e.target.value })
                }
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="rx-one-button-group">
              <button onClick={handleSubmit} className="btn mt-4 float-end">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabCenterDetails;
