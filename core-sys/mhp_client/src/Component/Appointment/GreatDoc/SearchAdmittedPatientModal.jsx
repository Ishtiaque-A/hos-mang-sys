import React, { useState } from "react";
import { NewModal } from "../../../common/components/NewModal";
import { formatPhoneNumber, formateHN } from "../../../utils/numberHelper";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import useUserData from "../../../hooks/useUserData";
import Button from "../../../common/components/Button";
import Swal from "sweetalert2";

const SearchAdmittedPatientModal = ({ isOpen, onClose, setUpdateSchedule }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [search, setSearch] = useState(null);
  const [options, setOptions] = useState("mobile");
  const user = useUserData();

  const searchHandler = (e) => {
    e.preventDefault();
    if (search !== null) {
      // console.log("serche data", search);
      axios
        .get(`/search-admitted-patient/${search.replace(/\s+/g, "")}`)
        .then((res) => {
          setSearchResult(res?.data?.data || []);
          setErrorData(null);
        })
        .catch((err) => {
          setErrorData("No Data Found , Please Check Again?");
          setSearchResult(null);
        });
    } else {
      toast.error("Please insert patient mobile or hn number");
    }
  };

  const clearHandle = () => {
    setSearchResult(null);
    setErrorData(null);
    setSearch(null);
  };

  const randomChange = (e) => {
    setSearch(null);
    setOptions(e.target.value);
  };
  const handleCloseModal = () => {
    setSearchResult(null);
    setErrorData(null);
    setSearch(null);
    onClose();
  };
  const handleAppoint = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("item", item);
        const AppointDetails = {
          doctors_id: user?.user_id.toString(),
          patient_name: item?.fullName,
          IsAllDay: false,
          StartTime: new Date(),
          EndTime: new Date(Date.now() + 10 * 60000),
          patient_mobile: item?.patient_mobile_phone,
          notes: "",
          patient_id: item?.patient_id,
          statusColor: "#020131",
          app_type: "IPD",
          statusName: "Arrived",
        };
        axios.post("/appointment-ipd", AppointDetails).then((res) => {
          if (res?.data?.status === 200) {
            toast.success("Appointment created successfully");
            setUpdateSchedule(Math.random());
            handleCloseModal();
          } else {
            toast.error("Something went wrong");
          }
        });
      }
    });
  };

  return (
    <NewModal isOpen={isOpen} onClose={handleCloseModal}>
      <NewModal.Header onClose={handleCloseModal}>
        <NewModal.Title>Admitted Patient List</NewModal.Title>
      </NewModal.Header>
      <NewModal.Body
        styles={{
          minHeight: "400px",
        }}
      >
        <>
          <div className="d-flex justify-content-center align-items-center">
            <div className="model_sub_heading">
              <label className="Label1">Chose an option</label>
              <select name="patient" id="patient" onChange={randomChange}>
                <option selected value={"mobile"}>
                  Mobile
                </option>
                <option value={"HN"}>HN</option>
                <option value={"DOB"}>DOB</option>
              </select>
              <input
                id="output"
                name="output"
                type={options === "DOB" ? "date" : "text"}
                placeholder="Search here..."
                value={search}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchHandler(e);
                  }
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />

              <button
                className="customButton1 search"
                onClick={searchHandler}
                type="button"
              >
                Search
              </button>
              <button
                className="customButton1 clear"
                type="button"
                onClick={clearHandle}
              >
                Clear
              </button>
            </div>
          </div>

          {errorData !== null && (
            <h4 className="errorH4" style={{ textAlign: "center" }}>
              {errorData}
            </h4>
          )}

          {searchResult !== null && (
            <div>
              <h5 className="h5" style={{ textAlign: "center" }}>
                Patient Information
              </h5>
              <table className="pTable">
                <thead>
                  <tr className="tr1">
                    <th className="th1">Patient Name</th>
                    <th className="th1">HN no</th>
                    <th className="th1">Phone no</th>
                    <th className="th1">DOB</th>
                    <th className="th1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult != null ? (
                    searchResult?.map((item) => {
                      return (
                        <tr key={item.id} className="tr1">
                          <td className="td1">{item.fullName}</td>
                          <td className="td1">
                            {formateHN(item.patient_hn_number)}
                          </td>
                          <td className="td1">
                            {formatPhoneNumber(item.patient_mobile_phone)}
                          </td>
                          <td className="td1">
                            {moment(item.patient_dob).format("DD/MM/YYYY")}
                          </td>
                          <td
                            className="td1"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              type="button"
                              onClick={() => handleAppoint(item)}
                            >
                              Appoint
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      </NewModal.Body>
      <NewModal.Footer>
        <button
          type="button"
          onClick={handleCloseModal}
          style={{ borderRadius: "5px" }}
          className="btn btn-sm btn-outline-danger"
        >
          Close
        </button>
      </NewModal.Footer>
    </NewModal>
  );
};

export default SearchAdmittedPatientModal;
