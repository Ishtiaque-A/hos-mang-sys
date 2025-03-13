import React, { useRef, useState } from "react";
import Sidebar1 from "../../Sidebar1/Sidebar1";
import { toast } from "react-toastify";
import "./AddNewPatient.css";

import colorIcon from "../../../Images/color pallate.png";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const VitalSignSetup = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#ffff");
  const [name, setname] = useState();
  const [value, setvalue] = useState();
  const [desc, setdesc] = useState();
  const [units_id, setunits] = useState();
  const [status, setstatus] = useState();
  const [showUpadateBtn, setshowUpadateBtn] = useState(false);
  const [vsId, setvsId] = useState();
  const [icon, seticon] = useState({
    image: "",
  });

  const [vitalSignArray, setvitalSignArray] = useState([]);
  const [UnitsArray, setUnitsArray] = useState([]);
  const [vitalArrayUpdate, setvitalArrayUpdate] = useState();
  useEffect(() => {
    axios.get("vital-sign").then((res) => {
      setvitalSignArray(res.data.vitalSign);
    });

    axios.get("vital-unit").then((res) => {
      setUnitsArray(res.data.vitalunit);
    });
  }, [vitalArrayUpdate]);

  const handleInputColorField = (e) => {
    setColor(e.target.value);
  };
  const [image_error, setimage_error] = useState();
  const [imageUrl, setimageUrl] = useState();
  const handleImage = (e) => {
    e.persist();
    if (e.target.files[0].size < 200000) {
      seticon({ image: e.target.files[0] });
      setimage_error(null);
    } else {
      setimage_error("Icon size must be less than 200 kb!");
    }
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].size < 200000
    ) {
      setimageUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setimage_error("Icon size must be less than 200 kb!");
    }
  };

  const closeImage = () => {
    setimageUrl();
    document.getElementById("iconUrl").value = "";
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("value", value);
    formData.append("desc", desc);
    formData.append("color", color);
    formData.append("units_id", units_id);
    formData.append("status_id", status);
    formData.append("image", icon.image);
    axios.post(`/save-vital-sign`, formData).then((res) => {
      toast.success(res.data.message);
      setvitalArrayUpdate(Math.random());
    });

    const data = {
      name,
      value,
      color,
      image: imageUrl,
      units_id,
    };

    setvitalSignArray([...vitalSignArray, data]);

    Swal.fire("VitalSign Inserted Successfully!", "done", "success");
    setname("");
    setColor("");
    setvalue("");
    setdesc("");
    seticon({
      image: "",
    });
    setunits("");
    setstatus("");
    setimageUrl();
    document.getElementById("iconUrl").value = "";
    setShowColorPicker(false);
  };

  const [vsIndex, setvsIndex] = useState();

  const editeFun = (item, index) => {
    setvsIndex(index);
    setvsId(item.id);
    setname(item.name);
    seticon(item.icon);
    setvalue(item.value);
    setColor(item.color);
    setdesc(item.desc);
    setunits(item.units_id);
    setstatus(item.status_id);
    setshowUpadateBtn(true);
  };
  const updateHandeler = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("value", value);
    formData.append("desc", desc);
    formData.append("color", color);
    formData.append("units_id", units_id);
    formData.append("status_id", status);
    formData.append("image", icon.image);

    axios.post(`/update-vital-sign/${vsId}`, formData).then((res) => {
      Swal.fire("VitalSign Updated Successfully!", "done", "success");

      setvsId("");
      setname("");
      setColor("");
      setvalue("");
      setdesc("");
      seticon({
        image: "",
      });
      setunits("");
      setstatus("");
      setimageUrl();
      document.getElementById("iconUrl").value = "";
      setshowUpadateBtn(false);
    });
  };

  const removeHandeler = (getId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/delete-vital-sign/${getId}`).then((res) => {
          console.log("delete", res);
        });

        const list = [...vitalSignArray];
        list.splice(vsIndex, 1);
        setvitalSignArray(list);

        setname("");
        setColor("");
        setvalue("");
        setdesc("");
        seticon({
          image: "",
        });
        setunits("");
        setstatus("");
        setimageUrl();
        document.getElementById("iconUrl").value = "";
        setshowUpadateBtn(false);

        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const clearHandeler = () => {
    setname("");
    setColor("");
    setvalue("");
    setdesc("");
    seticon({
      image: "",
    });
    setunits("");
    setstatus("");
    setimageUrl();
    document.getElementById("iconUrl").value = "";
    setshowUpadateBtn(false);
  };

  return (
    <div className="ms-2 mt-2">
      <div className="custom-card flex-grow-1">
        <h5 className="fw-normal  text-start py-2 px-1 mb-2 text-login">
          Vital Sign Setup
        </h5>
      </div>
      <div className="custom-card mt-2">
        <div className="vital-setup-container row p-1 m-1">
          <div className="col-md-6 mt-3">
            <div className="row mb-3">
              <label
                for="colFormLabelSm"
                className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Name
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  name="vsName"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="form-control form-control-sm"
                  placeholder="Enter Name"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                for="colFormLabelSm"
                className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Default Value
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  value={value}
                  name="vsValue"
                  onChange={(e) => setvalue(e.target.value)}
                  className="form-control form-control-sm"
                  placeholder="Enter Default Value"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                for="colFormLabelSm"
                className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Units
              </label>
              <div className="col-sm-9">
                <select
                  name="vsUnit"
                  value={units_id}
                  onChange={(e) => setunits(e.target.value)}
                  className="form-select form-select-sm"
                  id="autoSizingSelect"
                >
                  <option selected>Select Title</option>
                  {UnitsArray.length > 0 &&
                    UnitsArray.map((item, i) => {
                      return (
                        <option key={i} value={item.vitalunit_name}>
                          {item.vitalunit_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label
                for="colFormLabelSm"
                className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Description
              </label>
              <div className="col-sm-9">
                <textarea
                  name="desc"
                  value={desc}
                  onChange={(e) => setdesc(e.target.value)}
                  className="form-control"
                  placeholder="Description"
                  style={{ height: "100px" }}
                ></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <label
                for="colFormLabelSm"
                className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Image/Icon
              </label>
              <div className="col-sm-9">
                <input
                  type="file"
                  name="image"
                  id="iconUrl"
                  className="form-control form-control-sm"
                  onChange={handleImage}
                />
                {image_error == null ? (
                  <p className="doc_image_size">
                    Icon size must be less than 200 Kb
                  </p>
                ) : (
                  <p className="docimage_error">{image_error}</p>
                )}
                {imageUrl == null ? (
                  <div>
                    {icon.image == "" ? (
                      ""
                    ) : (
                      <img
                        src={`${global.img_url}/images/VitalSignIcon/${icon}`}
                        className="vSignImagePreview"
                        alt="preview image"
                      />
                    )}
                  </div>
                ) : (
                  <div className="docImage">
                    <img
                      src={imageUrl}
                      className="vSignImagePreview"
                      alt="preview image"
                    />
                    <i onClick={closeImage} className="far fa-times-circle"></i>
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label
                for="colFormLabelSm"
                className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Preferred Color:
              </label>
              <div className="col-sm-9 d-flex">
                <div className="radio-container red mt-2 me-4 ms-2">
                  <input
                    type="radio"
                    className="radio-custom"
                    onChange={handleInputColorField}
                    value="#ff0000"
                    id="radio-1"
                    name="ColorRadio"
                  />
                </div>
                <div className="radio-container green mt-2 me-4 ms-2">
                  <input
                    type="radio"
                    className="radio-custom"
                    onChange={handleInputColorField}
                    value="#008000"
                    id="radio-1"
                    name="ColorRadio"
                  />
                </div>
                <div className="radio-container yellow mt-2 me-4 ms-2">
                  <input
                    type="radio"
                    className="radio-custom"
                    onChange={handleInputColorField}
                    value="#ffc100"
                    id="radio-1"
                    name="ColorRadio"
                  />
                </div>
                <div className="radio-container info mt-2 me-4 ms-2">
                  <input
                    type="radio"
                    className="radio-custom"
                    onChange={handleInputColorField}
                    value="#248afd"
                    id="radio-1"
                    name="ColorRadio"
                  />
                </div>
                <div className="radio-container primary mt-2 me-4 ms-2">
                  <input
                    type="radio"
                    className="radio-custom"
                    onChange={handleInputColorField}
                    value="#3f3e91"
                    id="radio-1"
                    name="ColorRadio"
                  />
                </div>
                <div
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="color-pallate"
                >
                  Custom
                  <img
                    className="ms-1"
                    style={{ width: "30px" }}
                    src={colorIcon}
                    alt=""
                  />
                </div>
              </div>
              {showColorPicker && (
                <div>
                  <div style={{ width: "130px" }} className="float-end mt-1">
                    <HexColorPicker color={color} onChange={setColor} />
                  </div>
                </div>
              )}
            </div>

            <div className="row mb-3">
              <label
                for="colFormLabelSm"
                className="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Status
              </label>
              <div className="col-sm-9">
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                  className="form-select form-select-sm"
                  id="autoSizingSelect"
                >
                  <option selected>Select Status</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
              </div>
            </div>
            <button
              onClick={clearHandeler}
              className="vaital-setup-btn-cancel float-end"
            >
              Cancel
            </button>
            {showUpadateBtn === true ? (
              <button
                onClick={updateHandeler}
                className="vaital-setup-btn float-end me-2"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="vaital-setup-btn float-end me-2"
              >
                Save
              </button>
            )}
          </div>
          <div className="col-md-6 mt-3">
            <div className="available-sign-container mx-3 mb-3 p-2">
              <h6>Available Signs</h6>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control form-control-sm fav-doc-search mt-3  mb-sm-1"
                    onChange={(e) => {
                      const objet = vitalSignArray.filter((item) =>
                        item.name
                          .toLowerCase()
                          .match(e.target.value.toLowerCase())
                      );

                      if (e.target.value.length > 0) {
                        setvitalSignArray(objet);
                      } else {
                        setvitalArrayUpdate([...vitalSignArray]);
                      }
                    }}
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="row all-vital-sign-container p-2">
                {vitalSignArray.length > 0 &&
                  vitalSignArray.map((item, i) => {
                    return (
                      <div
                        onClick={() => editeFun(item, i)}
                        key={i}
                        className=" col-md-6  mb-3"
                      >
                        <div className="vital-sign row m-1">
                          <div>
                            <i
                              onClick={() => removeHandeler(item.id)}
                              className="far fa-times-circle float-end vitalCloseIcon"
                            ></i>
                            <div
                              style={{ height: "3px", background: item.color }}
                              className="w-50 float-end"
                            ></div>
                          </div>
                          <div className="sign-title col-9">
                            <b>
                              <span className="ms-1 little-heading">
                                {item.name}
                              </span>
                            </b>{" "}
                            <br />
                            <input
                              className="d-inline"
                              placeholder={item.value}
                              type="text"
                            />
                            <span className="little-text">{item.units_id}</span>
                          </div>
                          <div className="sign-iocn col-3">
                            <img
                              src={
                                item.image !== null
                                  ? `${global.img_url}/images/VitalSignIcon/${item.icon}`
                                  : item.image
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalSignSetup;
