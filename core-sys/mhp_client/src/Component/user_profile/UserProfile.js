import axios from "axios";
import React, { useEffect, useState } from "react";
import MHP from "../../Images/loginuser.png";
import useUserData from "../../hooks/useUserData";

const UserProfile = () => {
  const user = useUserData();
  const [userInfo, setuserInfo] = useState();
  const [doctorData, setDoctorData] = useState("");

  useEffect(() => {
    const storageData = localStorage.getItem("userData");
    const storageUser = JSON.parse(storageData);
    setuserInfo(storageUser);

    if (storageUser.user_type === "Doctor") {
      axios.get(`/single-doctor/${storageUser.user_id}`).then((res) => {
        if (res.data.status === 200) {
          setDoctorData(res.data.doctor);
        }
      });
    }
  }, []);
  const doctorGivenName =
    doctorData?.dr_given_name != null ? doctorData?.dr_given_name : " ";
  const doctordrMiddleName =
    doctorData?.dr_middle_name != null ? doctorData?.dr_middle_name : " ";
  const doctorDrLastName =
    doctorData?.dr_last_name != null ? doctorData?.dr_last_name : " ";
  const userName =
    doctorGivenName + " " + doctordrMiddleName + " " + doctorDrLastName;
  return (
    <>
      <div className="pt-5 vh-100">
        <div className="mt-5 d-flex justify-content-center">
          <div
            className="card d-flex justify-content-center text-center"
            style={{ width: "400px" }}
          >
            <div
              className="mb-4 pt-0 text-center"
              style={{ width: "200px", margin: "0 auto" }}
            >
              {doctorData ? (
                <img
                  className=" bg-light rounded-circle card-img-top p-2"
                  width="200"
                  height="200"
                  alt="MHP"
                  border="0"
                  src={`${global.img_url}/doctors/images/${doctorData.dr_images}`}
                />
              ) : (
                <img
                  src={MHP}
                  className=" bg-light rounded-circle card-img-top p-2"
                  width="200"
                  height="200"
                  alt="MHP"
                  border="0"
                />
              )}
            </div>
            <div className="card-body">
              <h5 className="card-title">
                {doctorData != null ? doctorData?.fullName : ""}
              </h5>
              <div className="row">
                <div className="col-2 d-flex justify-content-start ">
                  <p className="fw-bolder text-muted p-0 m-0">Name</p>
                </div>
                <div className="col-10 d-flex justify-content-start ">
                  <p className="fw-bolder text-muted p-0 m-0">
                    :{doctorData?.fullName ? " " + doctorData?.fullName : ""}
                  </p>
                </div>
                <div className="col-2 d-flex justify-content-start ">
                  <p className="fw-bolder text-muted p-0 m-0">Email</p>
                </div>
                <div className="col-10 d-flex justify-content-start ">
                  <p className="fw-bolder text-muted p-0 m-0">
                    :{userInfo != null ? " " + userInfo.email : ""}
                  </p>
                </div>
                <div className="col-2 d-flex justify-content-start ">
                  <p className="fw-bolder text-muted p-0 m-0">User</p>
                </div>
                <div className="col-10 d-flex justify-content-start ">
                  <p className="fw-bolder text-muted p-0 m-0">
                    :{user?.isSuperAdmin ? " Admin" : user?.branch_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
