import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./KIO.css";
import { toast } from "react-toastify";
import useResizeObserver from "../../../../hooks/useResizeObserver";

const KIO = (props) => {
  const {width} = useResizeObserver();
  const customStyles = {
    content: {
      top: "38%",
      left: "21%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: width > 900 ? "80%" : "90%",
      height: "85%",
      background: "#ffffff",
      padding: "10px",
      marginLeft: width > 900 ? "38%" : "31%",
    },
  };
  const [tableValue, setTableValue] = useState({});

  const [tableRow, ] = useState([
    {
      id: 1,
      question_name: "গত চার সপ্তাহে কতবার বিনা কারণে আপনি ক্লান্ত বোধ করেছেন?",
    },
    {
      id: 2,
      question_name: "গত চার সপ্তাহে কতবার আপনি বিচলিত অনুভব করেছেন ?",
    },
    {
      id: 3,
      question_name: "গত চার সপ্তাহে কতবার আপনি এত বেশী বিচলিত হয়েছেন যে কিছুতেই আপনাকে শান্ত করা যায় নি ?",
    },
    {
      id: 4,
      question_name: "গত চার সপ্তাহে কতবার আপনার হতাশ লেগেছে?",
    },
    {
      id: 5,
      question_name: "গত চার সপ্তাহে কতবার আপনি অস্থিরতা বা অস্বস্তি বোধ করেছেন?",
    },
    {
      id: 6,
      question_name: "গত চার সপ্তাহে কতবার আপনি এত বেশী অস্থিরতা বোধ করেছেন যে আপনি স্থির হয়ে বসে থাকতে পারেন নি?",
    },
    {
      id: 7,
      question_name: "গত চার সপ্তাহে কতবার আপনি বিষণ্ণ বোধ করেছেন?",
    },
    {
      id: 8,
      question_name: "গত চার সপ্তাহে আপনার কতবার মনেহয়েছে যে সব কিছুই খুব কষ্ট করে করতে হচ্ছে?",
    },
    {
      id: 9,
      question_name: "গত চার সপ্তাহে কতবার আপনার এত বিমর্ষ লেগেছে যে কোন কিছুই আপনাকে উৎফুল্ল করতে পারে নি?",
    },
    {
      id: 10,
      question_name: "গত চার সপ্তাহে নিজেকে কতবার অপদার্থ বলে মনে হয়েছে?",
    },
  ]);
  const [dropDownArray, setDropdownArray] = useState([
    {
      id: 1,
      option_question: "1-কোন সময়ই না",
      value: 1
    },
    {
      id: 2,
      option_question: "2-খুব অল্প সময়",
      value: 2
    },
    {
      id: 3,
      option_question: "3-কিছু কিছু সময়/ মাঝে মাঝে",
      value: 3
    },
    {
      id: 4,
      option_question: "4-সবসময়",
      value: 4
    },
    {
      id: 5,
      option_question: "5-অধিক সময়",
      value: 5
    },
  ])
  const [total, setTotal] = useState(0);


  const [tableRowBotttom, setTableRowBotttom] = useState([
    {
      id: 11,
      question_name: "গত চার সপ্তাহে আপনার এই সমস্ত অনুভূতির জন্য কতদিন আপনি কাজে, পড়াশোনায় অথবা প্রতিদিনের কাজকর্মে সম্পূর্ণ অক্ষম ছিলেন?",
    },
    {
      id: 12,
      question_name: "( ওই দিনগুলি ব্যতীত ) গত চার সপ্তাহে কতদিন আপনি কাজকর্ম, পড়াশোনা ও দৈনন্দিন কাজে অনেকটা সক্ষম হলেও এই সব অনুভূতির জন্য সেই কাজগুলো কিছুটা কমিয়ে দিতে হয়েছে?",
    },
    {
      id: 13,
      question_name: "গত চার সপ্তাহে আপনার এই সকল অনুভূতিগুলির জন্য কতদিন কোন ডাক্তার বা অন্য কোন ধরনের চিকিৎসকের সাথে সাক্ষাৎ করতে হয়েছে?",
    },
  ]);
  

  useEffect(() => {
    let a = 0;
    for (const [key, value] of Object.entries(tableValue)) {
      a = a + value;
      setTotal(a)
    }

  }, [tableValue])

  const [k10QuesValue, setk10QuesValue] = useState({})

  const k10Save = () => {
    props.setK10TotalScore(total)
    props.setk10bottomvalue(k10QuesValue)


    setTableValue({})
    setTotal(0)
    setk10QuesValue({})
    props.closekioModal()

    toast.success("K10 data save successfully")
  }


  return (
    <div className="k10-modal">
      <Modal
        isOpen={props.kioIsOpen}
        onRequestClose={props.closekioModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className='float-end' style={{ fontSize: "18px", cursor: "pointer", paddingBottom: "5px", }} onClick={() => {
          setTableValue({})
          setTotal(0)
          setk10QuesValue({})
          props.closekioModal()
        }}><i class="fal fa-times"></i></span>
        <h6 className="card-title">SR1 SELF REPORT MEASURES FOR ADULT AND OLDER PEOPLE K10 + LM - BENGALI/বাংলা </h6>
        <hr className='popup-hr' />
        <div className="row">
          <div className="col-lg-8 col-9">
            <div className="row mental-question-container">
              <table className="phq-table">
                <tbody>
                  <tr >
                    <td style={{ fontWeight: 500 }} colSpan={2}>
                      <p className="direction">নির্দেশনা:</p>
                      আপনি গত চার সপ্তাহ যাবৎ কি রকম বোধ করছেন সেই সম্বন্ধে নীচে দশটি
                      প্রশ্ন করা হয়েছে। প্রত্যেকটি প্রশ্নের উত্তরে যেটি আপনার ক্ষেত্রে
                      সবচেয়ে প্রযোজ্য সেখানে গোলাকৃতি চিহ্নে দাগ দিয়ে দেখান।
                    </td>
                  </tr>
                  {
                    tableRow.length > 0 ?
                      tableRow.map((item, i) => <tr key={i}>
                        <td style={{ width: width > 900 ? "400px" : "360px" }}>{item.id}. {item.question_name}</td>
                        <td>
                          <select defaultValue="0" name={item.id} onChange={(e) => { setTableValue({ ...tableValue, [e.target.name]: parseInt(e.target.value) }); }} className="form-select form-select-sm" aria-label=".form-select-sm example">
                            <option value="0">Select</option>
                            {
                              dropDownArray.map((item, i) => <option key={i} value={item.value}>{item.option_question}</option>)
                            }
                          </select>
                        </td>
                      </tr>)
                      :
                      <i style={{ fontSize: "26px", marginLeft: "40%" }} class="fas fa-spinner fa-spin"></i>
                  }
                  <tr >
                    <td className='phq-total'>Total Score:</td>
                    <td>
                      {total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4 col-3 overflow-hidden">
            <div className="phq-value p-1">
              <p className="k10-question">Use the following scal to choose the most appropriate answer: </p>
              <div className="phq-value-container m-2">
                <ul className="kio">
                  {
                    dropDownArray.map((item, i) => <li key={i}>{item.option_question}</li>)
                  }
                </ul>

              </div>
              <div className="kio_note position-absolute bottom-0">
                <p className="">KIO-10 score <i className="far fa-angle-right"></i>= 10: Likely major depression</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-lg-8 col-9">
            <div className="row mental-question-container">
              <table className="phq-table">
                <tbody>
                  <tr >
                    <td style={{ fontWeight: 500 }} colSpan={2}>
                      গত চার সপ্তাহে এই সমস্ত অনুভূতি কি ভাবে আপনাকে প্রভাবিত করেছেন সেই বিষয়ে নীচের প্রশ্নগুলো করা হয়েছে।
                      আপনি যদি উপরের সকল দশটি প্রশ্নে “কোন সময়ই না” উত্তর দিয়ে থাকেন তাহলে আপনাকে এই নীচের প্রশ্নগুলোর উত্তর দিতে হবে না।
                    </td>
                  </tr>
                  {
                    tableRowBotttom.length > 0 ?
                      tableRowBotttom.map((item, i) => <tr key={i}>
                        <td style={{ width: width > 900 ? "400px" : "360px" }}>{item.id}. {item.question_name}</td>
                        <td>
                          <input name={item.id} className="form-control form-control-sm" onChange={(e) => setk10QuesValue({ ...k10QuesValue, [e.target.name]: e.target.value })} type="text" placeholder="write text here ..." />
                        </td>
                      </tr>)
                      :
                      <i style={{ fontSize: "26px", marginLeft: "40%" }} class="fas fa-spinner fa-spin"></i>
                  }

                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4 col-3 overflow-hidden">
            <div className="phq-value p-1">
              <p className="k10-question">Use the following scal to choose the most appropriate answer: </p>
              <div className="phq-value-container m-2">
                <ul className="kio">
                  {
                    dropDownArray.map((item, i) => <li key={i}>{item.option_question}</li>)
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="pedriatric_btn">
          <button
            onClick={() => {
              setTableValue({})
              setTotal(0)
              setk10QuesValue({})
              props.closekioModal()
            }}
            className="pedriatric_btn_left"
          >
            Cancel
          </button>
          <button onClick={k10Save} className="pedriatric_btn_middle">
            Save
          </button>
        </div>

      </Modal>
    </div>
  );
};

export default KIO;
