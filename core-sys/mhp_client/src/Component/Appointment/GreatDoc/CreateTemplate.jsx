import axios from 'axios';
import JoditEditor from 'jodit-react'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';



export default function CreateTemplate(props) {
    const [note, setnote] = useState()
    const editor = useRef(null);


    useEffect(() => {
        const storageData = JSON.parse(localStorage.getItem('userData'))
        setnote(
            `<p style="text-align: right; line-height: 1;"><img src="${global.img_url}/logo/logo.png" alt="" width="91" style="float: left;" height="63"></p>
            <p style="text-align: right; line-height: 1;"><span style="color: rgb(106, 168, 79);"><strong style="font-family: Tahoma, Geneva, sans-serif;">&nbsp; Macrohealthplus Medical Centre</strong></span></p>
            <p style="text-align: right; line-height: 1;"><span style="color: rgb(106, 168, 79);">+01 234 567 889 | info@macrohealthplus.com</span></p>
            <hr>
            <p><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong>30th Jun 2022</strong></span></p>
            <p>Re: [Patient’s Name] Letter of Medical Necessity</p><p><br></p><p>Dear Dr. [Bariatric Surgeon’s Name],</p><p>I am referring [patient’s name] for evaluation and consideration for a weight
    management surgical procedure. (S)He currently weighs [# of lbs] pounds and is
    [# of in.] inches tall. Her/His BMI is [BMI #].
    <br></p><p><br></p><p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">Sincerely,</span></p>
            <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;"><strong>Aminur Rahman</strong></span></p>
            <p style="text-align: justify;"><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 14px;">[Signature]</span></p>`
        )
    }
        ,
        []
    );

    const config = {
        // removeButtons: ["source","iframe","xpath","wrap-nodes","video","table-keyboard-navigation","color","copy-format","drag-and-drop",'drag-and-drop-element',"enter","error-messages","file","focus","font","format-block","fullsize","hotkeys","hr","about","key-arrow-outside","limit","line-height","link","media","mobile","ordered-list","paste","paste-from-word","paste-storage","placeholder","powered-by-jodit","preview","print","backspace","add-new-line","clipboard"],
        readonly: false,
        removeButtons: ["fullsize", "about", "clean-html", "clipboard", "powered-by-jodit", "redo-undo"],
    };

    const [saveModelShow, setsaveModelShow] = useState(false)
    const saveModel = {
        content: {
            top: '35%',
            left: '21%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: "39%",
            height: "35%",
            marginLeft: "38%"
        },
    };
    const [tempName, setTempName] = useState('')

    const saveData = () => {
        const storageData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            name: tempName,
            data: note,
            user_id:storageData.user_id,
            user_type:storageData.user_type

        }
        console.log("data", data)
        axios.post('/save-custom-template', data).then(res => {
           props.setupdateTemDrop(Math.random())
           toast.success(res.data.message)
           props.setcreateTemModel(false)
        })
    }

    return (
        <div>
            <span className='float-end'><i onClick={() => props.setcreateTemModel(false)} className="fal fa-times" style={{ cursor: 'pointer' }}></i></span>
            <div className='d-flex'>
                <h6 style={{ fontSize: "14px" }}>Create Template</h6>
                <i onClick={() => setsaveModelShow(true)} class="fa-solid fa-floppy-disk createLeater"></i>
            </div>
            <Modal
                isOpen={saveModelShow}
                onRequestClose={saveModelShow}
                style={saveModel}
            >
                <span className='float-end'><i onClick={() => setsaveModelShow(false)} className="fal fa-times" style={{ cursor: 'pointer' }}></i></span>
                <h6 style={{ fontSize: "14px" }}>Save Template</h6>
                <hr />
                <div>
                    <div className='d-flex'>
                        <input type="text" onChange={(e) => setTempName(e.target.value)} className="form-control" placeholder="Enter templete name" />
                        {
                            tempName.length > 1 ?
                                <button onClick={saveData} type="submit" class="btn btn-outline-success tempSave">Save</button>
                                :
                                <button onClick={() => alert("Enter Your Template Name")} type="submit" class="btn btn-outline-secondary tempSave">Save</button>

                        }
                    </div>
                </div>
            </Modal>
            <JoditEditor
                ref={editor}
                value={note}
                config={config}
                tabIndex={1} // tabIndex of textarea
                 onBlur={(newContent) => setnote(newContent)}
                onChange={(newContent) => {
                  //  console.log("newContent", newContent)
                  //   setnote(newContent)
                }}
            />
          <button onClick={() => setsaveModelShow(true)} class="btn btn-outline-success temSaveEnd float-end mt-2">Save</button>
          <button onClick={() => props.setcreateTemModel(false)} class="btn btn-outline-success temSaveEnd float-end mt-2 mr-1">Back</button>
        </div>
    )
}
