import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import AntenatalVisits from "./AntenatalVisits";
import { FaTrash } from "react-icons/fa";
import { LiaTimesCircle } from "react-icons/lia";
import useResizeObserver from "../../../hooks/useResizeObserver";
import { ImSpinner7 } from "react-icons/im";

export default function AntenatalVisitsAllData(props) {
  const { height, width } = useResizeObserver();
  const [modelOpen, setmodelOpen] = useState(false);
  const Styles = {
    content: {
      top: width > 900 ? "36%" : "33%",
      left: width > 900 ? "30%" : "21%",
      height: "83vh",
      width: width > 900 ? "75%" : "95%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      // overflow: "hidden",
    },
  };

  const [pAdata, setpAdata] = useState();
  const [imageModel, setimageModel] = useState(false);
  const [singleitem, setsingleitem] = useState();
  const [stateUpdate, setstateUpdate] = useState();

  const [loding, setloding] = useState(false);

  useEffect(() => {
    if (!loding) {
      setloding(true);
      axios.get(`/antenatal-visits/${props.patient_id}`).then((res) => {
        setpAdata(res.data.antenatalVisits);
        setloding(false);
      });
    }

    return () => {
      setloding(false);
    };
  }, [stateUpdate]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove Data",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/antenatal-visits/${id}`).then((res) => {
          setstateUpdate(Math.random());
        });
        Swal.fire("Update!", "Patient data has been updated.", "success");
      }
    });
  };

  return (
    <>
      <div className="d-flex my-2 justify-content-between rx-one-button-group">
        <h6>All data</h6>
        <button className="btn" onClick={() => setmodelOpen(true)}>
          Add
        </button>
      </div>

      <div
        className="simple-scrollbar"
        style={{
          height: "400px",
          width: "100%",
          overflow: "auto",
        }}
      >
        {loding ? (
          <ImSpinner7
            size={50}
            color="gray"
            style={{ marginLeft: "45%" }}
            className="fas fa-spinner fa-spin"
          />
        ) : (
          <MaterialTable
            columns={[
              {
                title: "SL",
                field: "SL",
                render: (item) => <div>{item.tableData.id + 1}</div>,
                cellStyle: {
                  width: "10%",
                },
              },

              {
                title: "Date",
                field: "created_at",
                render: (item) => (
                  <div>{moment(item.created_at).format("DD.MM.YYYY")}</div>
                ),
              },
              {
                title: "Details",
                render: (row) => (
                  <div
                    style={row.image && { cursor: "pointer" }}
                    onClick={() => {
                      setsingleitem(row.image);
                      if (row.image) {
                        setimageModel(true);
                      }
                    }}
                  >
                    {row.image && (
                      <img
                        src={row.image}
                        width="70px"
                        height="70px"
                        alt="Pediatric_Image"
                      />
                    )}
                  </div>
                ),
              },

              {
                title: "Action",
                render: (item) => (
                  <>
                    <FaTrash
                      size={15}
                      // color="red"
                      onClick={() => handleDelete(item.id)}
                      className="PrescribedRxDelete"
                    />
                  </>
                ),
                cellStyle: {
                  width: "10%",
                  alignContent: "center",
                },
              },
            ]}
            data={pAdata}
            options={{
              search: true,
              emptyRowsWhenPaging: false,
              pageSize: 3,
              pageSizeOptions: [3, 5, 10],
              maxBodyHeight: "300px",
              overflowY: "auto",
              showTitle: false,
              headerStyle: {
                backgroundColor: "#EEE",
                zIndex: -1,
              },
            }}
          />
        )}
      </div>

      <Modal isOpen={modelOpen} style={Styles}>
        <span
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
        >
          <LiaTimesCircle
            size={20}
            onClick={() => setmodelOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </span>
        <h6 style={{ fontSize: "14px" }}>Add Antenatal Visits</h6>
        <hr />
        <AntenatalVisits
          setmodelOpen={setmodelOpen}
          patient_id={props.patient_id}
          setstateUpdate={setstateUpdate}
        />
      </Modal>

      <Modal isOpen={imageModel} style={Styles}>
        <span className="float-end">
          <i
            className="fal fa-times"
            onClick={() => setimageModel(false)}
            style={{ cursor: "pointer" }}
          ></i>
        </span>
        <h6 style={{ fontSize: "14px" }}>Antenatal Visits</h6>
        <hr />
        {singleitem && <img src={singleitem} alt="pedi_image" sizes="500" />}
      </Modal>
    </>
  );
}
