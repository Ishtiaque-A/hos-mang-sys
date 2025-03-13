import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';


function VoiceRecord(props) {

    const customStyles = {
        content: {
            top: '30%',
            left: '25%',
            height: '450px',
            width: '750px',
            backgroundColor:"white",
            transform: 'translate(-50%, -50%)'
        },
    };

    const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 650);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true
  });
  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.mediaBlobUrl);

      reader.onload = () =>
        resolve({
          fileName: file.title,
          base64: reader.result
        });
      reader.onerror = reject;
    });
  return (
    <Modal
    isOpen={props.vRmodelshow}
    onRequestClose={props.vRmodelshow}
    style={customStyles}
    contentLabel="Example Modal"
>
<span className='float-end' style={{
                        fontSize: "15px",
                        cursor: "pointer",
                        marginBottom: "5px"
                    }} onClick={()=>{
                      props.setvRmodelshow(false)
                      stopRecording();
                      }}><i className="fal fa-times"></i></span>              
                    <hr />


     <div
      style={{
        border: "1px solid black",
        backgroundColor: "black",
        width: "700px",
        height: "350px"
      }}
    >
      <div
        style={{
          height: "27px",
          border: "1px solid rgb(189, 159, 97)",
          backgroundColor: "rgb(100 82 44)",
          display: "flex",
          borderRadius: "50px"
        }}
      >
        <h4
          style={{
            marginLeft: "10px",
            textTransform: "capitalize",
            fontFamily: "sans-serif",
            fontSize: "18px",
            color: "white"
          }}
        >
          Patient Voice Record
           
        </h4>
      </div>
      <div style={{ height: "38px" }}>
        {" "}
        <video src={mediaBlobUrl} controls loop />
      </div>

      <div
        className="col-md-6 col-md-offset-3"
        style={{
          backgroundColor: "black",
          color: "white",
          marginLeft: "350px"
        }}
      >
        <button
          style={{
            backgroundColor: "black",
            borderRadius: "8px",
            color: "white"
          }}
          onClick={stopTimer}
        >
          Clear
        </button>
        <div style={{ marginLeft: "70px", fontSize: "54px" }}>
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </div>

        <div style={{ marginLeft: "20px", display: "flex" }}>
          <label
            style={{
              fontSize: "15px",
              fontWeight: "Normal"
              // marginTop: "20px"
            }}
            htmlFor="icon-button-file"
          >
            <h3 style={{ marginLeft: "15px", fontWeight: "normal" }}>
              Press the Start to record
            </h3>

            <div>
              <button
                style={{
                  padding: "0.8rem 2rem",
                  border: "none",
                  marginLeft: "15px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  backgroundColor: "#42b72a",
                  color: "white",
                  transition: "all 300ms ease-in-out",
                  transform: "translateY(0)"
                }}
                onClick={() => {
                  if (!isActive) {
                    startRecording();
                  } else {
                    pauseRecording();
                  }

                  setIsActive(!isActive);
                }}
              >
                {isActive ? "Pause" : "Start"}
              </button>
              <button
                style={{
                  padding: "0.8rem 2rem",
                  border: "none",
                  backgroundColor: "#df3636",
                  marginLeft: "15px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  color: "white",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  transition: "all 300ms ease-in-out",
                  transform: "translateY(0)"
                }}
                onClick={() => {
                  // pauseRecording();
                  stopRecording();
                  setIsActive(false);
                }}
              >
                Stop
              </button>

              {/* <button onClick={()=>startRecording()}>startRecording</button>
              <button onClick={()=>stopRecording()}>stopRecording</button>
              <button onClick={()=>pauseRecording()}>pauseRecording</button> */}

            </div>
          </label>
        </div>
        <b></b>
      </div>
    </div>

    </Modal>
   
    
  )
}

export default VoiceRecord