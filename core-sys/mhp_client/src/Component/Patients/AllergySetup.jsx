import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import "../../imageUrl";

const AllergySetup = () => {
  const [name, setname] = useState();
  const [desc, setdesc] = useState();
  const [status, setstatus] = useState();
  const [showUpadateBtn, setshowUpadateBtn] = useState(false);
  const [vsId, setvsId] = useState();
  const [icon, seticon] = useState({
    image: "",
  });

  const [allergyArray, setallergyArray] = useState([]);
  const [allergyUpdate, setallergyUpdate] = useState();
  useEffect(() => {
    axios.get("allergy").then((res) => {
      console.log("allergySign S", res.data.allergySign);
      setallergyArray(res.data.allergySign);
    });
  }, [allergyUpdate]);

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
    formData.append("desc", desc);
    formData.append("status_id", status);
    formData.append("image", icon.image);
    axios.post(`/save-allergy`, formData).then((res) => {
      console.log("Response aller", res.data);
    });

    const data = {
      name,
      desc,
      image: imageUrl,
    };

    setallergyArray([...allergyArray, data]);

    Swal.fire("VitalSign Inserted Successfully!", "done", "success");
    setname("");
    setdesc("");
    seticon({
      image: "",
    });
    setstatus("");
    setimageUrl();
    document.getElementById("iconUrl").value = "";
  };

  const [vsIndex, setvsIndex] = useState();

  const editeFun = (item, index) => {
    console.log("item", item);
    console.log("Index", index);

    setvsIndex(index);
    setvsId(item.id);
    setname(item.name);
    seticon(item.icon);
    setdesc(item.desc);
    setstatus(item.status_id);
    setshowUpadateBtn(true);
  };
  console.log("vs Id", vsId);
  console.log("vsIndex Id", vsIndex);

  const updateHandeler = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("status_id", status);
    formData.append("image", icon.image);

    axios.post(`/update-allergy/${vsId}`, formData).then((res) => {
      Swal.fire("VitalSign Updated Successfully!", "done", "success");

      setvsId("");
      setname("");
      setdesc("");
      seticon({ image: "" });
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
        axios.delete(`/delete-allergy/${getId}`).then((res) => {
          console.log("delete", res);
        });

        const list = [...allergyArray];
        list.splice(vsIndex, 1);
        setallergyArray(list);

        setname("");
        setdesc("");
        seticon({
          image: "",
        });
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
    setdesc("");
    seticon({
      image: "",
    });
    setstatus("");
    setimageUrl();
    document.getElementById("iconUrl").value = "";
    setshowUpadateBtn(false);
  };

  const handleSearchAllergy = (e) => {
    console.log("Name", e.target.value);
    const objet = allergyArray.filter((item) =>
      item.name.toLowerCase().match(e.target.value.toLowerCase())
    );

    if (e.target.value.length > 0) {
      setallergyArray(objet);
    } else {
      setallergyUpdate([...allergyArray]);
    }
  };

  return (
    <div className="ms-2 mt-2">
      <div className="custom-card flex-grow-1">
        <h5 className="fw-normal  text-start py-2 px-1 mb-2 text-login">
          Allergy Sign Setup
        </h5>
      </div>
      <div className="custom-card">
        <div className="vital-setup-container row p-1 mt-2">
          <div className="col-md-6 mt-3">
            <div class="row mb-3">
              <label
                for="colFormLabelSm"
                class="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Name
              </label>
              <div class="col-sm-9">
                <input
                  type="text"
                  name="vsName"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  class="form-control form-control-sm"
                  placeholder="Enter Name"
                />
              </div>
            </div>

            <div class="row mb-3">
              <label
                for="colFormLabelSm"
                class="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Description
              </label>
              <div class="col-sm-9">
                <textarea
                  name="desc"
                  value={desc}
                  onChange={(e) => setdesc(e.target.value)}
                  class="form-control"
                  placeholder="Description"
                  style={{ height: "100px" }}
                ></textarea>
              </div>
            </div>
            <div class="row mb-3">
              <label
                for="colFormLabelSm"
                class="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Image/Icon
              </label>
              <div class="col-sm-9">
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
                    {icon?.image == "" ? (
                      ""
                    ) : (
                      <img
                        src={`${global.img_url}/images/allergySignIcon//${icon}`}
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
                    <i onClick={closeImage} class="far fa-times-circle"></i>
                  </div>
                )}
              </div>
            </div>

            <div class="row mb-3">
              <label
                for="colFormLabelSm"
                class="col-sm-3 vital-setup-lebel col-form-label col-form-label-sm "
              >
                Status
              </label>
              <div class="col-sm-9">
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                  class="form-select form-select-sm"
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
              class="vaital-setup-btn-cancel float-end"
            >
              Cancel
            </button>
            {showUpadateBtn === true ? (
              <button
                onClick={updateHandeler}
                class="vaital-setup-btn float-end me-2"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                class="vaital-setup-btn float-end me-2"
              >
                Save
              </button>
            )}
          </div>
          <div className="col-md-6 mt-3">
            <div className="available-sign-container mx-3 mb-3 p-2">
              <h6>Available Allergy Signs</h6>
              <input
                type="text"
                class="fav-doc-search mt-3  mb-sm-1"
                onChange={handleSearchAllergy}
                placeholder="Search Allergy"
              />
              <div className="row all-vital-sign-container p-2">
                {allergyArray.length > 0 &&
                  allergyArray.map((item, i) => {
                    return (
                      <div
                        onClick={() => editeFun(item, i)}
                        key={i}
                        className="col-3 mb-3"
                      >
                        <div className="allergy-food-icon d-block mb-3">
                          <i
                            onClick={() => removeHandeler(item.id)}
                            className="float-end me-3 far fa-times-circle"
                          ></i>
                        </div>
                        <div className="food-name text-center">
                          <img
                            src={
                              item.image == null
                                ? `${global.img_url}/images/allergySignIcon/${item.icon}`
                                : item.image
                            }
                            alt=""
                            className="img-fluid mb-3"
                          />
                          <h6>{item.name}</h6>
                          <span>{item.desc}</span>
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

export default AllergySetup;
