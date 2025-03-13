import React, { useEffect, useState } from "react";
import PaediatricExamMain from "./PaediatricExamMain";
import Modal from "react-modal";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import { ImSpinner7 } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { LiaTimesCircle } from "react-icons/lia";

export default function PaediatricAllData(props) {
  const [modelOpen, setmodelOpen] = useState(false);
  const closePaediatricExaminationModal = () => {
    setmodelOpen(false);
  };
  const Styles = {
    content: {
      top: "36%",
      left: "30%",
      height: "80vh",
      width: "75%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      // overflow: "hidden",
    },
  };

  const [paediatricAll, setpaediatricAll] = useState();
  const [imageModel, setimageModel] = useState(false);
  const [singleitem, setsingleitem] = useState();
  const [stateUpdate, setstateUpdate] = useState();

  const [loding, setloding] = useState(false);

  useEffect(() => {
    if (!loding) {
      setloding(true);
      axios.get(`/paediatric`).then((res) => {
        setpaediatricAll(res.data.all);
        setloding(false);
      });
    }

    return () => {
      setloding(false);
    };
  }, [stateUpdate]);

  return (
    <>
      <div className="d-flex justify-content-between rx-one-button-group">
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
            style={{ marginLeft: "45%", marginTop: "15%" }}
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
                cellStyle: {
                  width: "25%",
                },
              },
              {
                title: "Page No",
                field: "page_no",
                render: (row) => <div>Page {row.page_no}</div>,
                cellStyle: {
                  width: "25%",
                },
              },

              {
                title: "Image",
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
                        width="100px"
                        height="100px"
                        alt="Pediatric_Image"
                      />
                    )}
                  </div>
                ),
              },

              {
                title: "Act",
                render: (item) => (
                  <>
                    <FaTrash
                      size={15}
                      onClick={() => {
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
                            axios
                              .delete(`/paediatric/${item.id}`)
                              .then((res) => {
                                setstateUpdate(Math.random());
                              });
                            Swal.fire(
                              "Update!",
                              "Patient data has been updated.",
                              "success"
                            );
                          }
                        });
                      }}
                      class="fa fa-trash PrescribedRxDelete"
                    />
                  </>
                ),
                cellStyle: {
                  width: "10%",
                  alignContent: "center",
                },
              },
            ]}
            data={paediatricAll}
            options={{
              search: true,
              emptyRowsWhenPaging: false,
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
        <span className="float-end">
          {/* <i
            className="fal fa-times"
            onClick={() => setmodelOpen(false)}
            style={{ cursor: "pointer" }}
          ></i> */}
          <LiaTimesCircle
            style={{ cursor: "pointer" }}
            size={20}
            onClick={() => setmodelOpen(false)}
          />
        </span>
        <h6 style={{ fontSize: "14px" }}>Add Pediatric examination</h6>
        <hr />
        <PaediatricExamMain
          closePaediatricExaminationModal={closePaediatricExaminationModal}
          patient_id={props.patient_id}
          setstateUpdate={setstateUpdate}
        ></PaediatricExamMain>
      </Modal>

      <Modal isOpen={imageModel} style={Styles}>
        <span className="float-end">
          <i
            className="fal fa-times"
            onClick={() => setimageModel(false)}
            style={{ cursor: "pointer" }}
          ></i>
        </span>
        <h6 style={{ fontSize: "14px" }}>Paediatric examination</h6>
        <hr />
        {singleitem && <img src={singleitem} alt="pedi_image" sizes="500" />}
      </Modal>
    </>
  );
}
