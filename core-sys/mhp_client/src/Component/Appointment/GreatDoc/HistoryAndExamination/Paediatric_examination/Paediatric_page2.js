import React, { createRef, useState } from "react";
import "./PedriaticExam.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Popover } from "@mui/material";
import { useScreenshot } from "use-react-screenshot";
import { LuChevronRight } from "react-icons/lu";

function PaediatricPage2(props) {
  const [smileParents, setSmileParents] = useState("");
  const [smileParents1, setSmileParents1] = useState("");
  const [followsObjects, setFollowsObjects] = useState("");
  const [followsObjects1, setFollowsObjects1] = useState("");
  const [raisesHead, setRaisesHead] = useState("");
  const [raisesHead1, setRaisesHead1] = useState("");
  const [turnsEyes, setTurnsEyes] = useState("");
  const [turnsEyes1, setTurnsEyes1] = useState("");
  const [chucklesSqueals, setChucklesSqueals] = useState("");
  const [chucklesSqueals1, setChucklesSqueals1] = useState("");
  const [startsMake, setStartsMake] = useState("");
  const [startsMake1, setStartsMake1] = useState("");
  const [holdsHead, setHoldsHead] = useState("");
  const [holdsHead1, setHoldsHead1] = useState("");
  const [rollsOver, setRollsOver] = useState("");
  const [rollsOver1, setRollsOver1] = useState("");
  const [rollsOverTum, setRollsOverTum] = useState("");
  const [rollsOverTum1, setRollsOverTum1] = useState("");
  const [putThings, setPutThings] = useState("");
  const [putThings1, setPutThings1] = useState("");
  const [playsWith, setPlaysWith] = useState("");
  const [playsWith1, setPlaysWith1] = useState("");
  const [sitsWithout, setSitsWithout] = useState("");
  const [sitsWithout1, setSitsWithout1] = useState("");
  const [reachesOut, setReachesOut] = useState("");
  const [reachesOut1, setReachesOut1] = useState("");
  const [recognisesOwn, setRecognisesOwn] = useState("");
  const [recognisesOwn1, setRecognisesOwn1] = useState("");
  const [passesThings, setPassesThings] = useState("");
  const [passesThings1, setPassesThings1] = useState("");
  const [strangers, setStrangers] = useState("");
  const [strangers1, setStrangers1] = useState("");
  const [firstTooth, setFirstTooth] = useState("");
  const [firstTooth1, setFirstTooth1] = useState("");
  const [wavesGoodBye, setWavesGoodBye] = useState("");
  const [wavesGoodBye1, setWavesGoodBye1] = useState("");
  const [usesThumb, setUsesThumb] = useState("");
  const [usesThumb1, setUsesThumb1] = useState("");
  const [triesPull, setTriesPull] = useState("");
  const [triesPull1, setTriesPull1] = useState("");
  const [standsHolding, setStandsHolding] = useState("");
  const [standsHolding1, setStandsHolding1] = useState("");
  const [clapsHand, setClapsHand] = useState("");
  const [clapsHand1, setClapsHand1] = useState("");
  const [handHeld, setHandHeld] = useState("");
  const [handHeld1, setHandHeld1] = useState("");
  const [understandsSelfie, setUnderstandsSelfie] = useState("");
  const [understandsSelfie1, setUnderstandsSelfie1] = useState("");
  const [appropriately, setAppropriately] = useState("");
  const [appropriately1, setAppropriately1] = useState("");
  const [firstWord, setFirstWord] = useState("");
  const [firstWord1, setFirstWord1] = useState("");
  const [walksAlone, setWalksAlone] = useState("");
  const [walksAlone1, setWalksAlone1] = useState("");
  const [holdsCup, setHoldsCup] = useState("");
  const [holdsCup1, setHoldsCup1] = useState("");
  const [feedSelf, setFeedSelf] = useState("");
  const [feedSelf1, setFeedSelf1] = useState("");
  const [putsTwo, setPutsTwo] = useState("");
  const [putsTwo1, setPutsTwo1] = useState("");
  const [runs, setRuns] = useState("");
  const [runs1, setRuns1] = useState("");
  const [shortSentences, setShortSentences] = useState("");
  const [shortSentences1, setShortSentences1] = useState("");
  const [usuallyDry, setUsuallyDry] = useState("");
  const [usuallyDry1, setUsuallyDry1] = useState("");
  const [drawStraight, setDrawStraight] = useState("");
  const [drawStraight1, setDrawStraight1] = useState("");
  const [dressesself, setDressesself] = useState("");
  const [dressesself1, setDressesself1] = useState("");
  const [throughTheNight, setThroughTheNight] = useState("");
  const [throughTheNight1, setThroughTheNight1] = useState("");
  const [manageButtons, setManageButtons] = useState("");
  const [manageButtons1, setManageButtons1] = useState("");
  const [tiesShoes, setTiesShoes] = useState("");
  const [tiesShoes1, setTiesShoes1] = useState("");

  const [change1, setChange1] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  const [change2, setChange2] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  const [change3, setChange3] = useState(false);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open3 = Boolean(anchorEl3);
  const id3 = open3 ? "simple-popover" : undefined;

  const [change4, setChange4] = useState(false);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open4 = Boolean(anchorEl4);
  const id4 = open4 ? "simple-popover" : undefined;

  const [change5, setChange5] = useState(false);
  const [anchorEl5, setAnchorEl5] = useState(null);
  const open5 = Boolean(anchorEl5);
  const id5 = open5 ? "simple-popover" : undefined;

  const [change6, setChange6] = useState(false);
  const [anchorEl6, setAnchorEl6] = useState(null);
  const open6 = Boolean(anchorEl6);
  const id6 = open1 ? "simple-popover" : undefined;

  const [change7, setChange7] = useState(false);
  const [anchorEl7, setAnchorEl7] = useState(null);
  const open7 = Boolean(anchorEl7);
  const id7 = open7 ? "simple-popover" : undefined;

  const [change8, setChange8] = useState(false);
  const [anchorEl8, setAnchorEl8] = useState(null);
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;

  const [change9, setChange9] = useState(false);
  const [anchorEl9, setAnchorEl9] = useState(null);
  const open9 = Boolean(anchorEl9);
  const id9 = open9 ? "simple-popover" : undefined;

  const [change10, setChange10] = useState(false);
  const [anchorEl10, setAnchorEl10] = useState(null);
  const open10 = Boolean(anchorEl10);
  const id10 = open10 ? "simple-popover" : undefined;

  const [change11, setChange11] = useState(false);
  const [anchorEl11, setAnchorEl11] = useState(null);
  const open11 = Boolean(anchorEl11);
  const id11 = open11 ? "simple-popover" : undefined;

  const [change12, setChange12] = useState(false);
  const [anchorEl12, setAnchorEl12] = useState(null);
  const open12 = Boolean(anchorEl12);
  const id12 = open12 ? "simple-popover" : undefined;

  const [change13, setChange13] = useState(false);
  const [anchorEl13, setAnchorEl13] = useState(null);
  const open13 = Boolean(anchorEl13);
  const id13 = open13 ? "simple-popover" : undefined;

  const [change14, setChange14] = useState(false);
  const [anchorEl14, setAnchorEl14] = useState(null);
  const open14 = Boolean(anchorEl14);
  const id14 = open14 ? "simple-popover" : undefined;

  const [change15, setChange15] = useState(false);
  const [anchorEl15, setAnchorEl15] = useState(null);
  const open15 = Boolean(anchorEl15);
  const id15 = open15 ? "simple-popover" : undefined;

  const [change16, setChange16] = useState(false);
  const [anchorEl16, setAnchorEl16] = useState(null);
  const open16 = Boolean(anchorEl16);
  const id16 = open16 ? "simple-popover" : undefined;

  const [change17, setChange17] = useState(false);
  const [anchorEl17, setAnchorEl17] = useState(null);
  const open17 = Boolean(anchorEl17);
  const id17 = open17 ? "simple-popover" : undefined;

  const [change18, setChange18] = useState(false);
  const [anchorEl18, setAnchorEl18] = useState(null);
  const open18 = Boolean(anchorEl18);
  const id18 = open18 ? "simple-popover" : undefined;

  const [change19, setChange19] = useState(false);
  const [anchorEl19, setAnchorEl19] = useState(null);
  const open19 = Boolean(anchorEl19);
  const id19 = open19 ? "simple-popover" : undefined;

  const [change20, setChange20] = useState(false);
  const [anchorEl20, setAnchorEl20] = useState(null);
  const open20 = Boolean(anchorEl20);
  const id20 = open20 ? "simple-popover" : undefined;

  const [change21, setChange21] = useState(false);
  const [anchorEl21, setAnchorEl21] = useState(null);
  const open21 = Boolean(anchorEl21);
  const id21 = open21 ? "simple-popover" : undefined;

  const [change22, setChange22] = useState(false);
  const [anchorEl22, setAnchorEl22] = useState(null);
  const open22 = Boolean(anchorEl22);
  const id22 = open22 ? "simple-popover" : undefined;

  const [change23, setChange23] = useState(false);
  const [anchorEl23, setAnchorEl23] = useState(null);
  const open23 = Boolean(anchorEl23);
  const id23 = open23 ? "simple-popover" : undefined;

  const [change24, setChange24] = useState(false);
  const [anchorEl24, setAnchorEl24] = useState(null);
  const open24 = Boolean(anchorEl24);
  const id24 = open24 ? "simple-popover" : undefined;

  const [change25, setChange25] = useState(false);
  const [anchorEl25, setAnchorEl25] = useState(null);
  const open25 = Boolean(anchorEl25);
  const id25 = open25 ? "simple-popover" : undefined;

  const [change26, setChange26] = useState(false);
  const [anchorEl26, setAnchorEl26] = useState(null);
  const open26 = Boolean(anchorEl26);
  const id26 = open26 ? "simple-popover" : undefined;

  const [change27, setChange27] = useState(false);
  const [anchorEl27, setAnchorEl27] = useState(null);
  const open27 = Boolean(anchorEl27);
  const id27 = open27 ? "simple-popover" : undefined;

  const [change28, setChange28] = useState(false);
  const [anchorEl28, setAnchorEl28] = useState(null);
  const open28 = Boolean(anchorEl28);
  const id28 = open28 ? "simple-popover" : undefined;

  const [change29, setChange29] = useState(false);
  const [anchorEl29, setAnchorEl29] = useState(null);
  const open29 = Boolean(anchorEl29);
  const id29 = open29 ? "simple-popover" : undefined;

  const [change30, setChange30] = useState(false);
  const [anchorEl30, setAnchorEl30] = useState(null);
  const open30 = Boolean(anchorEl30);
  const id30 = open30 ? "simple-popover" : undefined;

  const [change31, setChange31] = useState(false);
  const [anchorEl31, setAnchorEl31] = useState(null);
  const open31 = Boolean(anchorEl31);
  const id31 = open31 ? "simple-popover" : undefined;

  const [change32, setChange32] = useState(false);
  const [anchorEl32, setAnchorEl32] = useState(null);
  const open32 = Boolean(anchorEl32);
  const id32 = open32 ? "simple-popover" : undefined;

  const [change33, setChange33] = useState(false);
  const [anchorEl33, setAnchorEl33] = useState(null);
  const open33 = Boolean(anchorEl33);
  const id33 = open33 ? "simple-popover" : undefined;

  const [change34, setChange34] = useState(false);
  const [anchorEl34, setAnchorEl34] = useState(null);
  const open34 = Boolean(anchorEl34);
  const id34 = open34 ? "simple-popover" : undefined;

  const [change35, setChange35] = useState(false);
  const [anchorEl35, setAnchorEl35] = useState(null);
  const open35 = Boolean(anchorEl35);
  const id35 = open35 ? "simple-popover" : undefined;

  const [change36, setChange36] = useState(false);
  const [anchorEl36, setAnchorEl36] = useState(null);
  const open36 = Boolean(anchorEl36);
  const id36 = open36 ? "simple-popover" : undefined;

  const [change37, setChange37] = useState(false);
  const [anchorEl37, setAnchorEl37] = useState(null);
  const open37 = Boolean(anchorEl37);
  const id37 = open37 ? "simple-popover" : undefined;

  const [change38, setChange38] = useState(false);
  const [anchorEl38, setAnchorEl38] = useState(null);
  const open38 = Boolean(anchorEl38);
  const id38 = open38 ? "simple-popover" : undefined;

  const milestone = {
    smileParents: smileParents,
    followsObjects: followsObjects,
    raisesHead: raisesHead,
    turnsEyes: turnsEyes,
    chucklesSqueals: chucklesSqueals,
    startsMake: startsMake,
    holdsHead: holdsHead,
    rollsOver: rollsOver,
    rollsOverTum: rollsOverTum,
    putThings: putThings,
    playsWith: playsWith,
    sitsWithout: sitsWithout,
    reachesOut: reachesOut,
    recognisesOwn: recognisesOwn,
    passesThings: passesThings,
    strangers: strangers,
    firstTooth: firstTooth,
    wavesGoodBye: wavesGoodBye,
    usesThumb: usesThumb,
    triesPull: triesPull,
    standsHolding: standsHolding,
    clapsHand: clapsHand,
    handHeld: handHeld,
    understandsSelfie: understandsSelfie,
    appropriately: appropriately,
    firstWord: firstWord,
    walksAlone: walksAlone,
    holdsCup: holdsCup,
    feedSelf: feedSelf,
    putsTwo: putsTwo,
    runs: runs,
    shortSentences: shortSentences,
    usuallyDry: usuallyDry,
    drawStraight: drawStraight,
    dressesself: dressesself,
    throughTheNight: throughTheNight,
    manageButtons: manageButtons,
    tiesShoes: tiesShoes,
    patient_id: props.patient_id,
  };

  const [image, takeScreenShot] = useScreenshot();
  const refPE1 = createRef(null);
  const [btnLoading, setbtnLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    if (image) {
      const pData = {
        patient_id: parseInt(props.propsData.patient_id),
        page_no: 2,
        image: image,
      };
      axios
        .post(`/paediatric`, pData)
        .then((res) => {
          toast.success(res.data.message);
          props.setstateUpdate(Math.random());
          setbtnLoading(false);
        })
        .catch((error) => {
          toast.error("Ops! Something is wrong");
        });
    }

    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (var checkbox of checkboxes) {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    }
    axios.post(`/save-paediatric-milestone`, milestone).then((res) => {
      if (res.data.status == 200) {
        toast.success("Data inserted successfully");
      }
    });
  };

  return (
    // ------------------------------------Page 2------------------------------------//

    <>
      <div
        // style={{
        //   height: "320px",
        //   overflow: "auto",
        // }}
        ref={refPE1}
        className="p-2"
      >
        <div>
          <p className="fw-bold">Milestone</p>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Smiles at parents when look</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Smiles at parents when look"
                      name="Smiles at parents when look"
                      onChange={(e) => {
                        setChange1(!change1);
                        setSmileParents("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl1(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change1 && (
                      <Popover
                        id={id1}
                        open={open1}
                        anchorEl={anchorEl1}
                        onClose={() => setAnchorEl1(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setSmileParents(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setSmileParents1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{smileParents}</span>
                <span className="ms-2">{smileParents1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Follows objects with eyes</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Follows objects with eyes"
                      name="Follows objects with eyes"
                      onChange={(e) => {
                        setChange2(!change2);
                        setFollowsObjects("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl2(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change2 && (
                      <Popover
                        id={id2}
                        open={open2}
                        anchorEl={anchorEl2}
                        onClose={() => setAnchorEl2(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setFollowsObjects(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setFollowsObjects1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{followsObjects}</span>
                <span className="ms-2">{followsObjects1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Raises head when lying on tummy</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Raises head when lying on tummy"
                      name="Raises head when lying on tummy"
                      onChange={(e) => {
                        setChange3(!change3);
                        setRaisesHead("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl3(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change3 && (
                      <Popover
                        id={id3}
                        open={open3}
                        anchorEl={anchorEl3}
                        onClose={() => setAnchorEl3(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setRaisesHead(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setRaisesHead1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{raisesHead}</span>
                <span className="ms-2">{raisesHead1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Turns eyes toward interesting sounds</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Turns eyes toward interesting sounds"
                      name="Turns eyes toward interesting sounds"
                      onChange={(e) => {
                        setChange4(!change4);
                        setTurnsEyes("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl4(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change4 && (
                      <Popover
                        id={id4}
                        open={open4}
                        anchorEl={anchorEl4}
                        onClose={() => setAnchorEl4(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setTurnsEyes(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setTurnsEyes1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{turnsEyes}</span>
                <span className="ms-2">{turnsEyes1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Chuckles, squeals, gurgles or laughs</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Chuckles, squeals, gurgles or laughs"
                      name="Chuckles, squeals, gurgles or laughs"
                      onChange={(e) => {
                        setChange5(!change5);
                        setChucklesSqueals("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl5(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change5 && (
                      <Popover
                        id={id5}
                        open={open5}
                        anchorEl={anchorEl5}
                        onClose={() => setAnchorEl5(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setChucklesSqueals(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setChucklesSqueals1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{chucklesSqueals}</span>
                <span className="ms-2">{chucklesSqueals1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Starts to make speech-like sounds</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Starts to make speech-like sounds"
                      name="Starts to make speech-like sounds"
                      onChange={(e) => {
                        setChange6(!change6);
                        setStartsMake("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl6(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change6 && (
                      <Popover
                        id={id6}
                        open={open6}
                        anchorEl={anchorEl6}
                        onClose={() => setAnchorEl6(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setStartsMake(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setStartsMake1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{startsMake}</span>
                <span className="ms-2">{startsMake1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Holds head up when sitting on your knee</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Holds head up when sitting on your knee"
                      name="Holds head up when sitting on your knee"
                      onChange={(e) => {
                        setChange7(!change7);
                        setHoldsHead("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl7(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change7 && (
                      <Popover
                        id={id7}
                        open={open7}
                        anchorEl={anchorEl7}
                        onClose={() => setAnchorEl7(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setHoldsHead(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setHoldsHead1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{holdsHead}</span>
                <span className="ms-2">{holdsHead1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Rolls over from tummy to back</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Rolls over from tummy to back"
                      name="Rolls over from tummy to back"
                      onChange={(e) => {
                        setChange8(!change8);
                        setRollsOver("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl8(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change8 && (
                      <Popover
                        id={id8}
                        open={open8}
                        anchorEl={anchorEl8}
                        onClose={() => setAnchorEl8(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setRollsOver(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setRollsOver1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{rollsOver}</span>
                <span className="ms-2">{rollsOver1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Rolls over from back to tum</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Rolls over from back to tumm"
                      name="Rolls over from back to tumm"
                      onChange={(e) => {
                        setChange9(!change9);
                        setRollsOverTum("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl9(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change9 && (
                      <Popover
                        id={id9}
                        open={open9}
                        anchorEl={anchorEl9}
                        onClose={() => setAnchorEl9(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setRollsOverTum(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setRollsOverTum1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{rollsOverTum}</span>
                <span className="ms-2">{rollsOverTum1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Puts things into mouth</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Puts things into mouth"
                      name="Puts things into mouth"
                      onChange={(e) => {
                        setChange10(!change10);
                        setPutThings("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl10(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change10 && (
                      <Popover
                        id={id10}
                        open={open10}
                        anchorEl={anchorEl10}
                        onClose={() => setAnchorEl10(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setPutThings(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setPutThings1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{putThings}</span>
                <span className="ms-2">{putThings1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Plays with toes</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Plays with toes"
                      name="Plays with toes"
                      onChange={(e) => {
                        setChange11(!change11);
                        setPlaysWith("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl11(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change11 && (
                      <Popover
                        id={id11}
                        open={open11}
                        anchorEl={anchorEl11}
                        onClose={() => setAnchorEl11(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setPlaysWith(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setPlaysWith1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{playsWith}</span>
                <span className="ms-2">{playsWith1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Sits up without support</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Sits up without support"
                      name="Sits up without support"
                      onChange={(e) => {
                        setChange12(!change12);
                        setSitsWithout("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl12(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change12 && (
                      <Popover
                        id={id12}
                        open={open12}
                        anchorEl={anchorEl12}
                        onClose={() => setAnchorEl12(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setSitsWithout(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setSitsWithout1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{sitsWithout}</span>
                <span className="ms-2">{sitsWithout1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Reaches out to be picked up</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Reaches out to be picked up"
                      name="Reaches out to be picked up"
                      onChange={(e) => {
                        setChange13(!change13);
                        setReachesOut("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl13(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change13 && (
                      <Popover
                        id={id13}
                        open={open13}
                        anchorEl={anchorEl13}
                        onClose={() => setAnchorEl13(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setReachesOut(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setReachesOut1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{reachesOut}</span>
                <span className="ms-2">{reachesOut1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Recognizes own name</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Recognizes own name"
                      name="Recognises own name"
                      onChange={(e) => {
                        setChange14(!change14);
                        setRecognisesOwn("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl14(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change14 && (
                      <Popover
                        id={id14}
                        open={open14}
                        anchorEl={anchorEl14}
                        onClose={() => setAnchorEl14(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setRecognisesOwn(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setRecognisesOwn1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{recognisesOwn}</span>
                <span className="ms-2">{recognisesOwn1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2 holds_hand">
              <div className="d-flex justify-content-around">
                <p className="w-75">Passes things from one hand to the other</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Passes things from one hand to the other"
                      name="Passes things from one hand to the other"
                      onChange={(e) => {
                        setChange15(!change15);
                        setPassesThings("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl15(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change15 && (
                      <Popover
                        id={id15}
                        open={open15}
                        anchorEl={anchorEl15}
                        onClose={() => setAnchorEl15(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setPassesThings(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setPassesThings1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{passesThings}</span>
                <span className="ms-2">{passesThings1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Is shy with strangers</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Is shy with strangers"
                      name="Is shy with strangers"
                      onChange={(e) => {
                        setChange16(!change16);
                        setStrangers("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl16(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change16 && (
                      <Popover
                        id={id16}
                        open={open16}
                        anchorEl={anchorEl16}
                        onClose={() => setAnchorEl16(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setStrangers(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setStrangers1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{strangers}</span>
                <span className="ms-2">{strangers1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">First tooth</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="First tooth"
                      name="First tooth"
                      onChange={(e) => {
                        setChange17(!change17);
                        setFirstTooth("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl17(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change17 && (
                      <Popover
                        id={id17}
                        open={open17}
                        anchorEl={anchorEl17}
                        onClose={() => setAnchorEl17(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setFirstTooth(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setFirstTooth1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{firstTooth}</span>
                <span className="ms-2">{firstTooth1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Waves goodbye</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Waves goodbye"
                      name="Waves goodbye"
                      onChange={(e) => {
                        setChange18(!change18);
                        setWavesGoodBye("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl18(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change18 && (
                      <Popover
                        id={id18}
                        open={open18}
                        anchorEl={anchorEl18}
                        onClose={() => setAnchorEl18(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setWavesGoodBye(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setWavesGoodBye1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{wavesGoodBye}</span>
                <span className="ms-2">{wavesGoodBye1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2 holds_hand">
              <div className="d-flex justify-content-around">
                <p className="w-75">Uses thumb and finger to pick things up</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Uses thumb and finger to pick things up"
                      name="Uses thumb and finger to pick things up"
                      onChange={(e) => {
                        setChange19(!change19);
                        setUsesThumb("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl19(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change19 && (
                      <Popover
                        id={id19}
                        open={open19}
                        anchorEl={anchorEl19}
                        onClose={() => setAnchorEl19(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setUsesThumb(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setUsesThumb1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{usesThumb}</span>
                <span className="ms-2">{usesThumb1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Tries to pull self up</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Tries to pull self up"
                      name="Tries to pull self up"
                      onChange={(e) => {
                        setChange20(!change20);
                        setTriesPull("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl20(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change20 && (
                      <Popover
                        id={id20}
                        open={open20}
                        anchorEl={anchorEl20}
                        onClose={() => setAnchorEl20(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setTriesPull(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setTriesPull1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{triesPull}</span>
                <span className="ms-2">{triesPull1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Stands holding on</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Stands holding on"
                      name="Stands holding on"
                      onChange={(e) => {
                        setChange21(!change21);
                        setStandsHolding("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl21(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change21 && (
                      <Popover
                        id={id21}
                        open={open21}
                        anchorEl={anchorEl21}
                        onClose={() => setAnchorEl21(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setStandsHolding(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setStandsHolding1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{standsHolding}</span>
                <span className="ms-2">{standsHolding1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Claps hands</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Claps hands"
                      name="Claps hands"
                      onChange={(e) => {
                        setChange22(!change22);
                        setClapsHand("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl22(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change22 && (
                      <Popover
                        id={id22}
                        open={open22}
                        anchorEl={anchorEl22}
                        onClose={() => setAnchorEl22(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setClapsHand(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setClapsHand1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{clapsHand}</span>
                <span className="ms-2">{clapsHand1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Walks with one hand held</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Walks with one hand held"
                      name="Walks with one hand held"
                      onChange={(e) => {
                        setChange23(!change23);
                        setHandHeld("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl23(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change23 && (
                      <Popover
                        id={id23}
                        open={open23}
                        anchorEl={anchorEl23}
                        onClose={() => setAnchorEl23(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setHandHeld(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setHandHeld1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{handHeld}</span>
                <span className="ms-2">{handHeld1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Understands simple commands</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Understands simple commands"
                      name="Understands simple commands"
                      onChange={(e) => {
                        setChange24(!change24);
                        setUnderstandsSelfie("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl24(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change24 && (
                      <Popover
                        id={id24}
                        open={open24}
                        anchorEl={anchorEl24}
                        onClose={() => setAnchorEl24(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setUnderstandsSelfie(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setUnderstandsSelfie1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{understandsSelfie}</span>
                <span className="ms-2">{understandsSelfie1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2 holds_hand">
              <div className="d-flex justify-content-around">
                <p className="w-75">Says ‘Ma-ma’ or ‘Da-da’ appropriately</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Says ‘Ma-ma’ or ‘Da-da’ appropriately"
                      name="Says ‘Ma-ma’ or ‘Da-da’ appropriately"
                      onChange={(e) => {
                        setChange25(!change25);
                        setAppropriately("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl25(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change25 && (
                      <Popover
                        id={id25}
                        open={open25}
                        anchorEl={anchorEl25}
                        onClose={() => setAnchorEl25(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setAppropriately(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setAppropriately1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{appropriately}</span>
                <span className="ms-2">{appropriately1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2 holds_hand">
              <div className="d-flex justify-content-around">
                <p className="w-75">
                  First word (other than ‘Ma-ma’ or ‘Da-da’)
                </p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="First word (other than ‘Ma-ma’ or ‘Da-da’)"
                      name="First word (other than ‘Ma-ma’ or ‘Da-da’)"
                      onChange={(e) => {
                        setChange26(!change25);
                        setFirstWord("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl26(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change26 && (
                      <Popover
                        id={id26}
                        open={open26}
                        anchorEl={anchorEl26}
                        onClose={() => setAnchorEl26(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setFirstWord(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setFirstWord1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{firstWord}</span>
                <span className="ms-2">{firstWord1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Walks alone</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Walks alone"
                      name="Walks alone"
                      onChange={(e) => {
                        setChange27(!change27);
                        setWalksAlone("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl27(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change27 && (
                      <Popover
                        id={id27}
                        open={open27}
                        anchorEl={anchorEl27}
                        onClose={() => setAnchorEl27(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setWalksAlone(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setWalksAlone1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{walksAlone}</span>
                <span className="ms-2">{walksAlone1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Holds cup and drinks by self</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Holds cup and drinks by self"
                      name="Holds cup and drinks by self"
                      onChange={(e) => {
                        setChange28(!change28);
                        setHoldsCup("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl28(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change28 && (
                      <Popover
                        id={id28}
                        open={open28}
                        anchorEl={anchorEl28}
                        onClose={() => setAnchorEl28(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setHoldsCup(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setHoldsCup1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{holdsCup}</span>
                <span className="ms-2">{holdsCup1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Feeds self with spoon</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Feeds self with spoon"
                      name="Feeds self with spoon"
                      onChange={(e) => {
                        setChange29(!change29);
                        setFeedSelf("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl29(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change29 && (
                      <Popover
                        id={id29}
                        open={open29}
                        anchorEl={anchorEl29}
                        onClose={() => setAnchorEl29(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setFeedSelf(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setFeedSelf1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{feedSelf}</span>
                <span className="ms-2">{feedSelf1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Puts two words together</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Puts two words together"
                      name="Puts two words together"
                      onChange={(e) => {
                        setChange30(!change30);
                        setPutsTwo("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl30(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change30 && (
                      <Popover
                        id={id30}
                        open={open30}
                        anchorEl={anchorEl30}
                        onClose={() => setAnchorEl30(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setPutsTwo(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setPutsTwo1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{putsTwo}</span>
                <span className="ms-2">{putsTwo1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Runs</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Runs"
                      name="Runs"
                      onChange={(e) => {
                        setChange31(!change31);
                        setRuns("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl31(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change31 && (
                      <Popover
                        id={id31}
                        open={open31}
                        anchorEl={anchorEl31}
                        onClose={() => setAnchorEl31(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setRuns(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setRuns1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{runs}</span>
                <span className="ms-2">{runs1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Speaks in short sentences</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Speaks in short sentences"
                      name="Speaks in short sentences"
                      onChange={(e) => {
                        setChange32(!change32);
                        setShortSentences("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl32(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change32 && (
                      <Popover
                        id={id32}
                        open={open32}
                        anchorEl={anchorEl32}
                        onClose={() => setAnchorEl32(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setShortSentences(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setShortSentences1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{shortSentences}</span>
                <span className="ms-2">{shortSentences1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Is usually dry during the day</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Is usually dry during the day"
                      name="Is usually dry during the day"
                      onChange={(e) => {
                        setChange33(!change33);
                        setUsuallyDry("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl33(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change33 && (
                      <Popover
                        id={id33}
                        open={open33}
                        anchorEl={anchorEl33}
                        onClose={() => setAnchorEl33(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setUsuallyDry(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setUsuallyDry1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{usuallyDry}</span>
                <span className="ms-2">{usuallyDry1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Can draw a straight line and circle</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Can draw a straight line and circle"
                      name="Can draw a straight line and circle"
                      onChange={(e) => {
                        setChange34(!change34);
                        setDrawStraight("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl34(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change34 && (
                      <Popover
                        id={id34}
                        open={open34}
                        anchorEl={anchorEl34}
                        onClose={() => setAnchorEl34(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setDrawStraight(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setDrawStraight1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{drawStraight}</span>
                <span className="ms-2">{drawStraight1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Dresses self</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Dresses self"
                      name="Dresses self"
                      onChange={(e) => {
                        setChange35(!change35);
                        setDressesself("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl35(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change35 && (
                      <Popover
                        id={id35}
                        open={open35}
                        anchorEl={anchorEl35}
                        onClose={() => setAnchorEl35(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setDressesself(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setDressesself1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{dressesself}</span>
                <span className="ms-2">{dressesself1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Is usually dry through the night</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Is usually dry through the night"
                      name="Is usually dry through the night"
                      onChange={(e) => {
                        setChange36(!change36);
                        setThroughTheNight("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl36(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change36 && (
                      <Popover
                        id={id36}
                        open={open36}
                        anchorEl={anchorEl36}
                        onClose={() => setAnchorEl36(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setThroughTheNight(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setThroughTheNight1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{throughTheNight}</span>
                <span className="ms-2">{throughTheNight1}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Manages buttons</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Manages buttons"
                      name="Manages buttons"
                      onChange={(e) => {
                        setChange37(!change37);
                        setManageButtons("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl37(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change37 && (
                      <Popover
                        id={id37}
                        open={open37}
                        anchorEl={anchorEl37}
                        onClose={() => setAnchorEl37(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setManageButtons(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setManageButtons1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{manageButtons}</span>
                <span className="ms-2">{manageButtons1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Ties shoe laces</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      class="form-control"
                      type="checkbox"
                      value="Ties shoe laces"
                      name="Ties shoe laces"
                      onChange={(e) => {
                        setChange38(!change38);
                        setTiesShoes("");
                      }}
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => setAnchorEl38(e.currentTarget)}
                      className="slider round"
                    ></div>
                    {change38 && (
                      <Popover
                        id={id38}
                        open={open38}
                        anchorEl={anchorEl38}
                        onClose={() => setAnchorEl38(null)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="left-popup">
                          <div className="">
                            <div className="d-flex justify-content-between gap-2">
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setTiesShoes(e.target.value);
                                  }}
                                />
                              </span>
                              <span style={{ border: "none", padding: "5px" }}>
                                <input
                                  class="form-control"
                                  type="text"
                                  id="quantity"
                                  name="quantity"
                                  min="1"
                                  max="5"
                                  onChange={(e) => {
                                    setTiesShoes1(e.target.value);
                                  }}
                                  placeholder="Age"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{tiesShoes}</span>
                <span className="ms-2">{tiesShoes1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pedriatric_btn">
        <button
          className="pedriatric_btn_left"
          onClick={props.closePaediatricExaminationModal}
        >
          Cancel
        </button>

        {btnLoading ? (
          <button className="pedriatric_btn_middle">Loading....</button>
        ) : (
          <button className="pedriatric_btn_middle" onClick={handleSave}>
            Save
          </button>
        )}

        <button
          className="pedriatric_btn_right"
          onClick={() => {
            props.passData(3);
            console.log("props check", props);
          }}
        >
          Next
          <LuChevronRight size={18} className="ms-2" />
        </button>
        <button
          className="previous_btn_left"
          onClick={() => {
            props.passData(1);
          }}
        >
          <i class="fa-solid fa-angle-left"></i> Previous Page
        </button>

        {btnLoading ? (
          <button className="pedriatric_btn_middle">Loading...</button>
        ) : (
          <button
            className="pedriatric_btn_right"
            onClick={() => {
              setbtnLoading(true);
              takeScreenShot(refPE1.current).then((res) => {
                toast.success("ScreenShot take successfully", {
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "light",
                });
                setbtnLoading(false);
              });
            }}
          >
            Take screenshot{" "}
          </button>
        )}
      </div>
    </>
  );
}

export default PaediatricPage2;
