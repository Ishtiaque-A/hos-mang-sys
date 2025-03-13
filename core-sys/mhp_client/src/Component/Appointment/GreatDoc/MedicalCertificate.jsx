import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { LiaTimesCircle } from "react-icons/lia";

export default function MedicalCertificate(props) {
  const [noteMC, setnoteMC] = useState();
  const editor = useRef(null);
  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));
    setnoteMC(`<h1 style="text-align: center;"><strong style="font-family: Tahoma, Geneva, sans-serif; font-size: 30px;">Hornsby Mall Medical Centre</strong></h1>
        <p style="text-align: center; line-height: 1;"><span style="font-size: 12px; font-family: Tahoma, Geneva, sans-serif;">Suite 1-2&nbsp;&nbsp;</span></p>
        <p style="text-align: center; line-height: 1;"><span style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 12px;">32 Florence </span><span style="font-size: 12px;">Street&nbsp;</span><span style="font-size: 12px;">Hornsby 2077 </span></span></p>
        <p style="text-align: center; line-height: 1;"><span style="font-size: 12px; font-family: Tahoma, Geneva, sans-serif;">Phone - 02-84112373 Fax - 02-84112315</span></p>
        <p style="text-align: center; line-height: 1;"><span style="font-size: 12px; font-family: Tahoma, Geneva, sans-serif;"><br></span></p>
        <div><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong>Dr Md Aminur RAHMAN&nbsp;&nbsp;</strong><br>MBBS, FRACGP<br>248267ET</span></div>
        <div style="text-align: center;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><img src="${global.img_url}/logo/mc1.png" alt="" width="404" height="42"></span><br></div>
        <p><br></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper ipsum tristique risus quis purus. Risus, enim faucibus viverra sodales velit pretium. Tristique cras lorem senectus aenean et magnis. Lorem bibendum id imperdiet id urna venenatis sed.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper ipsum tristique risus quis purus.</p>
        <p><br></p>
        <p>Regards,</p>
        <p>Dr Md Aminur RAHMAN</p>
        <p><br></p>
        <br>
        <p><br></p>`);
  }, []);

  const config = {
    // removeButtons: ["source","iframe","xpath","wrap-nodes","video","table-keyboard-navigation","color","copy-format","drag-and-drop",'drag-and-drop-element',"enter","error-messages","file","focus","font","format-block","fullsize","hotkeys","hr","about","key-arrow-outside","limit","line-height","link","media","mobile","ordered-list","paste","paste-from-word","paste-storage","placeholder","powered-by-jodit","preview","print","backspace","add-new-line","clipboard"],
    readonly: false,
    removeButtons: [
      "fullsize",
      "about",
      "clean-html",
      "clipboard",
      "powered-by-jodit",
      "redo-undo",
    ],
  };
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <span
        onClick={() => {
          props.setMSModelShow(false);
        }}
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "-10px",
          right: "-10px",
        }}
      >
        <LiaTimesCircle size={20} />
      </span>
      <h6 style={{ fontSize: "14px" }}>Medical Certificate</h6>
      <div
        style={{
          height: "450px",
          overflow: "auto",
        }}
        className="simple-scrollbar"
      >
        <JoditEditor
          ref={editor}
          value={noteMC}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setnoteMC(newContent)}
          onChange={(newContent) => {
            //  console.log("newContent", newContent)
            //   setnote(newContent)
          }}
        />
      </div>
      <button class="btn btn-outline-success temSaveEnd float-end mt-2">
        Save
      </button>
      <button
        onClick={() => props.setMSModelShow(false)}
        class="btn btn-outline-success temSaveEnd float-end mt-2 mr-1"
      >
        Back
      </button>
    </div>
  );
}
