import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import MHP from "../../Images/MHP.png";
import CarouselBar from "./CarouselBar";
import axios from "axios";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import CryptoJS from "crypto-js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setpasswordShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storageData = localStorage.getItem("userData");
    if (storageData != null) {
      navigate("/dashboard");
    }

    // let data = {
    //     name: "test"
    // }
    // const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), '45-sdaf-dsaf-54').toString();

    // console.log("encrypted", encrypted)

    // setTimeout(() => {
    //     const decrypted = CryptoJS.AES.decrypt(encrypted, '45-sdaf-dsaf-54').toString(CryptoJS.enc.Utf8);
    //     console.log("decrypted", JSON.parse(decrypted))
    // }, 8000);
  }, []);

  const [loding, setloding] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    setloding(true);
    axios
      .post("/login-with-saas", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem(
          "ZGDIO4sPbQEa",
          JSON.stringify(res.data.access_token)
        );
        const userData = res.data.user;
        userData.branch_code = res.data.user.branch_id
          ? "BC-100" + res.data.user.branch_id
          : null;
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/dashboard");
        setloding(false);
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
        setloding(false);
        if (err?.response?.status === 401) {
          swal("Alert !", err.response.data.message, "warning");
        } else {
          swal("Unauthorized !", "Invalid username or password", "error");
        }
      });
  };
  return (
    <section className="login-bg-img ">
      <div className="row mx-3 ">
        <div className="col-4 col-md-4  pt-3 border-end">
          <form onSubmit={handleSubmit} className="row  ms-3">
            <div className="form-group col-md-11 col-sm-11 mb-4 pt-0 text-center">
<div style={{display: "flex", justifyContent: "center"}}>
  <h5 style={{ color: "#089B1A", lineHeight: "1.5", cursor: "pointer", height: 50, display: "flex", justifyItems: "center", marginTop: "4%", marginLeft: "15px", fontSize: "30px", fontFamily: "system-ui",}}>
    SmartHealth
    </h5>
</div>
            </div>

            <div className="form-group col-md-11 col-sm-11">
              <h5 className="fw-bolder text-center pt-4 text-login ">Login</h5>
            </div>

            <div className="form-group col-md-11 col-sm-11 mb-2">
              <div className="input-group pt-3">
                {/* <span className="input-group-text"><i className="far fa-envelope"></i></span> */}
                <input
                  type="email"
                  autoFocus
                  name="email"
                  className="form-control"
                  placeholder="E-mail address"
                  aria-label="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group col-md-11 col-sm-11 pt-2">
              <div className="input-group ">
                {/* <span className="input-group-text"><i className="far fa-user"></i></span> */}
                <input
                  type={`${passwordShow ? "text" : "password"}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="password"
                  required
                />

                <span
                  className="input-group-text"
                  style={{ height: "27px", cursor: "pointer" }}
                >
                  {passwordShow ? (
                    <i
                      onClick={() => setpasswordShow(!passwordShow)}
                      class="fa-solid fa-eye-slash"
                    ></i>
                  ) : (
                    <i
                      onClick={() => setpasswordShow(!passwordShow)}
                      class="fa-solid fa-eye"
                    ></i>
                  )}
                </span>
              </div>
            </div>
            <div className="col-md-11 col-sm-11 pt-1">
              {/* <Link href="/user-signup"className=" text-decoration-none"><p className="forgot-password text-end"> User Sign Up </p></Link> */}
            </div>
            {/* <div className="col-md-11 col-sm-11 pt-2">
                            <div className="form-check">
                                <input className="form-check-input mt-2" type="checkbox" id="gridCheck" />
                                <label className="keepMeSiginIn" for="gridCheck">keep me sign in</label>
                            </div>
                        </div> */}
            <div className="col-md-11 col-sm-11 pt-3 ">
              {/* <a href="#"   className="text-decoration-none"> <input type="submit" style={{ backgroundColor: "#69B128" }} className="form-control  shadow rounded  fw-bolder text-white" value="Login" aria-label="login" required /></a> */}
              {/* <Link to ="/sidebar"   className="text-decoration-none"> <input type="submit" style={{ backgroundColor: "#69B128" }} className="form-control  shadow rounded  fw-bolder text-white" value="Login" aria-label="login" required /></Link> */}
              <input
                type="submit"
                style={{ backgroundColor: "#69B128" }}
                className="form-control  shadow rounded  fw-bolder text-white"
                value={`${loding ? "Request sending..." : "login"}`}
                aria-label="login"
                required
              />
            </div>
            {/* <div className="col-md-11 col-sm-11 pt-3">
                            <span className="text-center mb-0">Don't have a account yet? <a href="#" style={{ textDecoration: 'none' }} ><span className="text-register mb-0">Sign up</span></a></span>
                        </div> */}
          </form>
        </div>

        <div className="col-8 pt-5">
          <div className="container-md col-md-10 text-center">
            <h1 className="text-center pt-5">Clinical Management System</h1>
            <p className="text-muted fs-6 pt-1 ">
              SmartHealth helps to deliver superior healthcare for your
              doctors, clinics, diagnostics and pharmacy.
            </p>
            {/* <Link to={'/user-signup'} className="btn btn-sm m-2 btn-info"> User Sign Up </Link> */}
          </div>
    {/*
          <div className="col-md-8 pt-5 offset-md-2">
            <CarouselBar></CarouselBar>
          </div>
    */}
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
