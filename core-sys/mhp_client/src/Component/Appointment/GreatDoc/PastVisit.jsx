import moment from "moment";
import React, { useState } from "react";
import { NewModal as ReactModal } from "../../../common/components/NewModal";
import useUserData from "../../../hooks/useUserData";
const PastVisit = ({ pastVisit }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = useUserData();
  const [note, setNote] = useState({
    details: "",
    date: "",
  });
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <div className="past-history-table past-visit-table g-doc-scroll">
        {pastVisit?.length > 0 ? (
          <table className="past_rx_table">
            <thead>
              <tr>
                <th width={"20%"} scope="col">
                  Date
                </th>
                <th scope="col">Reason for visit</th>
                <th scope="col">Doctor</th>
                <th width={"15%"} scope="col">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {pastVisit?.length > 0 &&
                pastVisit?.map((item, i) => {
                  const isActive =
                    user?.bs_type === "B2B" ||
                    (user?.bs_type === "B2C" &&
                      Number(user?.user_id) === Number(item?.doctor_id));
                  return (
                    <tr key={i}>
                      <td>{moment(item?.created_at).format("DD/MM/YYYY")}</td>
                      <td>{item?.reason_for_visit}</td>
                      <td>{item.doctor?.fullName}</td>
                      <td>
                        
                        <i
                          onClick={(e) => {
                            isActive &&
                              setNote({
                                details: item?.doctors_note,
                                date: item?.created_at,
                              });
                            setModalIsOpen(true);
                          }}
                          className="fa-solid fa-eye"
                          style={{
                            cursor: isActive ? "pointer" : "not-allowed",
                            color: isActive ? "#69B128" : "lightgray",
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-lg-5 mt-lg-2 text-danger">
            Records are not available
          </p>
        )}
        <ReactModal size="xl" isOpen={modalIsOpen} onClose={closeModal}>
          <ReactModal.Header onClose={closeModal}>
            <ReactModal.Title>
              Previous History :{" "}
              {moment(note.date).format("DD/MM/YYYY: hh:mm A")}
            </ReactModal.Title>
          </ReactModal.Header>
          <ReactModal.Body>
            <div
              style={{ minHeight: "400px", minWidth: "500px" }}
              className="doctosNote"
            >
              <div dangerouslySetInnerHTML={{ __html: note.details }} />
            </div>
          </ReactModal.Body>
        </ReactModal>
      </div>
    </div>
  );
};

export default PastVisit;
