import React, { useEffect, useState } from "react";
import DoctorsSetupSidebar from "../doctors_setup_sidebar/DoctorsSetupSidebar";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import useResizeObserver from "../../hooks/useResizeObserver";
import { MdIndeterminateCheckBox } from "react-icons/md";

const DoctorAdvice = () => {
  const [addBtnLoading, setAddBtnLoading] = useState(false);
  const { width } = useResizeObserver();

  const [refetch, setRefetch] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [advises, setAdvises] = useState([]);
  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    const getAdvises = async () => {
      const res = await axios.get("advise-for-greatdoc-prescription");
      if (res.status === 200) {
        const modifiedData = res.data?.advise.map((ad) => ({
          ...ad,
          check: ad.check === 0 ? false : true,
        }));
        setAdvises(modifiedData);
      }
    };

    getAdvises();
  }, [refetch]);
  const handleAdviseSubmit = async (e) => {
    e.preventDefault();
    setAddBtnLoading(true);
    try {
      const data = {
        advise_name: e.target.advise_name.value || "",
      };
      const res = await axios.post("advise-for-greatdoc-prescription", data);
      if (res.status === 201) {
        onRefetch();
        toast.success("Advise Added Successfully");
        e.target.reset();
      }
    } catch (error) {
      toast.error("somthing went wrong");
      console.error(error);
    } finally {
      setAddBtnLoading(false);
    }
  };

  const saveAdviseValues = async () => {
    setIsChecking(true);
    try {
      const data = [...advises];
      const res = await axios.put(
        "advise-for-greatdoc-prescription-update",
        data
      );
      if (res.status === 200) {
        onRefetch();
        toast.success("Updated Successfully");
      }
    } catch (error) {
      toast.error("somthing went wrong");
      console.error(error);
    } finally {
      setIsChecking(false);
    }
  };

  const signleAdviseStyles = {
    display: "flex",
    gap: "5px",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px",
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const deleteAdvise = async (id) => {
    try {
      const res = await axios.delete(`advise-for-greatdoc-prescription/${id}`);
      if (res.status === 200) {
        onRefetch();
        toast.success("Advise Deleted Successfully");
      }
    } catch (error) {
      toast.error("something went wrong");
      console.error(error);
    }
  };

  const handleCheck = (e, id) => {
    const findAdvise = advises.find((advise) => advise.id === id);
    if (findAdvise) {
      setAdvises((prev) =>
        prev.map((advise) =>
          advise.id === id ? { ...advise, check: e.target.checked } : advise
        )
      );
    }
  };
  const isAllChecked =
    advises.length === advises.filter((item) => item.check).length ||
    advises.filter((item) => item.check).length === 0;

  const handleCheckAll = (e) => {
    setAdvises((prev) =>
      prev.map((advise) => ({ ...advise, check: e.target.checked }))
    );
  };
  const checkboxStyle = {
    display: isAllChecked ? "block" : "none",
  };

  const containerStyle = {
    display: "flex",
    width: width > 900 ? "75%" : "100%",
    alignItems: "center",
    gap: "5px",
    marginBottom: "-10px",
  };

  return (
    <div className="ms-2">
      <div className="row">
        <div className="col-md-3">
          <DoctorsSetupSidebar />
        </div>
        <div className="col-md-9 mt-2">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">Doctor Advice</h6>
            </div>
            <div className="card-body">
              {/*============== advise  start ===== */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <form
                  onSubmit={handleAdviseSubmit}
                  className="d-flex justify-content-between align-items-center gap-2"
                  style={{
                    width: width > 900 ? "75%" : "100%",
                  }}
                >
                  <input
                    type="text"
                    name="advise_name"
                    id="advise"
                    required
                    width={"50%"}
                    className="form-control m-0"
                    placeholder="Enter advise name"
                  />
                  <div className="rx-one-button-group d-flex justify-content-end">
                    <button disabled={addBtnLoading} className="btn">
                      {addBtnLoading ? "Loading..." : "Add"}
                    </button>
                  </div>
                </form>
                <div style={containerStyle}>
                  {advises.length ===
                    advises.filter((item) => item.check).length ||
                  advises.filter((item) => item.check).length === 0 ? (
                    ""
                  ) : (
                    <label htmlFor="checkAll">
                      <MdIndeterminateCheckBox size={18} color="#005CC8" />
                    </label>
                  )}
                  <input
                    style={checkboxStyle}
                    onChange={handleCheckAll}
                    type="checkbox"
                    id="checkAll"
                  />
                  <label htmlFor="checkAll"> Check all advice</label>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    alignItems: "center",
                    width: width > 900 ? "75%" : "100%",
                    overflowY: "auto",
                    height: "250px",
                  }}
                  className="simple-scrollbar"
                >
                  {advises.map((item, index) => (
                    <div key={index} style={signleAdviseStyles}>
                      <div className="d-flex align-items-center gap-1">
                        <input
                          type="checkbox"
                          id={item?.id}
                          onChange={(e) => handleCheck(e, item?.id)}
                          checked={item?.check}
                        />
                        <label className="m-0 p-0" htmlFor={item?.id}>
                          {item?.advise_name}
                        </label>
                      </div>
                      <button
                        style={{
                          all: "unset",
                          fontSize: "12px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteAdvise(item?.id)}
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    width: width > 900 ? "75%" : "100%",
                    margin: "10px auto",
                  }}
                >
                  {advises.length > 0 ? (
                    <div className="rx-one-button-group d-flex justify-content-end">
                      <button
                        disabled={isChecking}
                        onClick={saveAdviseValues}
                        className="btn"
                      >
                        {isChecking ? "Loading..." : "Save"}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAdvice;
