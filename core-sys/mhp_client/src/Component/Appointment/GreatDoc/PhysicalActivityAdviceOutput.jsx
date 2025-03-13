import moment from 'moment';
import React, { useState } from 'react';
import Modal from "react-modal";
const PhysicalActivityAdviceOutput = ({ physicalActivity }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: '37%',
      left: '25%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "60%",
      height: "450px",
      background: "#ffff",
      zIndex: "200000",
      padding: "10px"
    },

  };
  const [note, setNote] = useState({
    details: "",
    date: ""
  })
  return (
    <div>
      <div className="past-history-table past-visit-table g-doc-scroll">
        {
          physicalActivity?.length > 0 ?
            <table className="past_rx_table">
              <thead>
                <tr>
                  <th width={"30%"} scope="col">Date</th>
                  {/* <th scope="col">Reason for visit</th> */}
                  <th scope="col">Doctor</th>
                  <th width={"20%"} scope="col">View</th>
                </tr>
              </thead>
              <tbody>
                {
                  physicalActivity?.length > 0 &&
                  physicalActivity?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                        {/* <td>{item.reason_for_visit}</td> */}
                        <td>{item.doctor?.dr_given_name}</td>
                        <td> <i onClick={(e) => { setNote({ details: item, date: item.created_at }); setModalIsOpen(true) }} className="fa-solid fa-eye"></i></td>
                      </tr>
                    )
                  })

                }

              </tbody>
            </table>
            :
            // <i style={{ fontSize: "26px", marginLeft: "40%", marginTop: "2%" }} class="fas fa-spinner fa-spin"></i>
            <p className="text-center mt-lg-5 mt-lg-2 text-danger">
              Records are not available
            </p>
        }

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <span className='float-end' style={{ fontSize: "15px", marginRight: "10px", cursor: "pointer" }} onClick={() => setModalIsOpen(false)}><i class="fal fa-times"></i></span>
          {/* <div className="d-flex justify-content-between">
                        <h6>Previous History</h6>
                        <p>{moment(note.date).format("DD/MM/YYYY")}</p>
                    </div> */}
          <div className='doctosNote'>
            <h6 className='mb-2'>Physical Activity and Advice : {moment(note.date).format("DD/MM/YYYY")}</h6>
            {/* <div dangerouslySetInnerHTML={{ __html: note.details }} /> */}
            <div>
              {
                note.details?.current__excercise__level__value &&
                <p><strong> Current Exercise Level</strong> : {note.details?.current__excercise__level__value} </p>
              }
              {
                note.details?.aerobic_exercise &&
                <p><strong> Aerobic Exercise</strong> : {note.details?.aerobic_exercise.toString()} </p>
              }
              {
                note.details?.strength_building &&
                <p><strong> Strength Building</strong> : {note.details?.strength_building.toString()} </p>
              }
              {
                (note.details?.balance__training__ternary === "1" || note.details?.flexibility__exercise__ternary === "1" || note.details?.moderate__intensity__exercise__ternary === "1") &&
                <div className="d-flex">
                  {
                    note.details?.balance__training__ternary === "1" &&
                    <p className='me-1'><strong> Balance Training</strong> : {note.details?.balance__training__ternary === "1" && "Yes"} </p>
                  }
                  {
                    note.details?.flexibility__exercise__ternary === "1" &&
                    <p className='me-1'><strong> Flexibility Exercise</strong> : {note.details?.flexibility__exercise__ternary === "1" && "Yes"} </p>
                  }
                  {
                    note.details?.moderate__intensity__exercise__ternary === "1" &&
                    <p className='me-1'><strong> Moderate Intensity Exercise</strong> : {note.details?.moderate__intensity__exercise__ternary === "1" && "Yes"} </p>
                  }
                </div>
              }
              {
                note.details?.frequency__value &&
                <p><strong> Frequency</strong> : {note.details?.frequency__value} </p>
              }
              {
                note.details?.endurance &&
                <p><strong> Endurance</strong> : {note.details?.endurance} </p>
              }
              {
                note.details?.previews__date &&
                <p><strong>Review date</strong> : {note.details?.previews__date} </p>
              }
            </div>
          </div>

        </Modal>
      </div>
    </div>
  );
};

export default PhysicalActivityAdviceOutput;