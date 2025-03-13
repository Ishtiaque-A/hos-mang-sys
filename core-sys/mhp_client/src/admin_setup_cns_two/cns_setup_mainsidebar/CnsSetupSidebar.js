// import React from 'react';
// import { Link,useLocation } from 'react-router-dom';
// import './AddDashboard.css'
// const HistorySetupSidebar = () => {
//     const location = useLocation();
//     return (
//         <div>
//             <div className="card mt-3">
//                 <div className="card-body">
//                     <ul className="setup-list ">
//                         <li>
//                             <Link className={`${location.pathname == "/olfactory" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/olfactory"><i className="fas menu-icon fa-plus-circle"></i>OL Factory</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/fundoscopy" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/fundoscopy"><i className="fas menu-icon fa-plus-circle"></i>Fundoscopy</Link>
//                         </li>  
//                         <li>
//                             <Link className={`${location.pathname == "/visualacuity" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/visualacuity"><i className="fas menu-icon fa-plus-circle"></i>Visual Acuity</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/visualfield" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/visualfield"><i className="fas menu-icon fa-plus-circle"></i>Visual Field</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/papillaryoedema" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/papillaryoedema"><i className="fas menu-icon fa-plus-circle"></i>Papillary Oedema</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/pupil" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/pupil"><i className="fas menu-icon fa-plus-circle"></i>Pupil</Link>
//                         </li>
                        
//                         <li>
//                             <Link className={`${location.pathname == "/lightreflex" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/lightreflex"><i className="fas menu-icon fa-plus-circle"></i>Light Reflex</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/eyemovements" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/eyemovements"><i className="fas menu-icon fa-plus-circle"></i>Eye Movements</Link>
//                         </li>

//                         <li>
//                             <Link className={`${location.pathname == "/sensory" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/sensory"><i className="fas menu-icon fa-plus-circle"></i>Sensory</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/jawjerk" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/jawjerk"><i className="fas menu-icon fa-plus-circle"></i>Jaw Jerk</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/lookingup" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/lookingup"><i className="fas menu-icon fa-plus-circle"></i>Looking Up</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/droopingcorner" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/droopingcorner"><i className="fas menu-icon fa-plus-circle"></i>Drooping Corner Of Mouth</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/earpalate" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/earpalate"><i className="fas menu-icon fa-plus-circle"></i>Ear & Palate</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/whispertest" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/whispertest"><i className="fas menu-icon fa-plus-circle"></i>Whisper Test</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/pinnestest" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/pinnestest"><i className="fas menu-icon fa-plus-circle"></i>Pine's Test</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/hallpike" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/hallpike"><i className="fas menu-icon fa-plus-circle"></i>Hallpike manoeuvre</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/uvula" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/uvula"><i className="fas menu-icon fa-plus-circle"></i>Uvula</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/gasreflex" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/gasreflex"><i className="fas menu-icon fa-plus-circle"></i>Gas Reflex</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/neckmovement" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/neckmovement"><i className="fas menu-icon fa-plus-circle"></i>Neck Movement</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/shrugshoulder" ? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/shrugshoulder"><i className="fas menu-icon fa-plus-circle"></i>Shrug The Shoulder</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/tasciculation"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/tasciculation"><i className="fas menu-icon fa-plus-circle"></i>Tasciculation</Link>
//                         </li>

//                         <li>
//                             <Link className={`${location.pathname == "/sensation"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/sensation"><i className="fas menu-icon fa-plus-circle"></i>Posterior third of tongue sensation (XI)</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/cnstongue"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnstongue"><i className="fas menu-icon fa-plus-circle"></i>Tongue</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/cnOne"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnOne"><i className="fas menu-icon fa-plus-circle"></i>Cn-I</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/cnTwo"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnTwo"><i className="fas menu-icon fa-plus-circle"></i>Cn-II</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/cnThree"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnThree"><i className="fas menu-icon fa-plus-circle"></i>Cn-III IV VI</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/cnFour"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnFour"><i className="fas menu-icon fa-plus-circle"></i>Cn-V</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/cnFive"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnFive"><i className="fas menu-icon fa-plus-circle"></i>Cn-VII</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/cnSix"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnSix"><i className="fas menu-icon fa-plus-circle"></i>Cn-VIII</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/cnSeven"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnSeven"><i className="fas menu-icon fa-plus-circle"></i>Cn-IX,X</Link>
//                         </li>

//                         <li>
//                             <Link className={`${location.pathname == "/cnEight"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnEight"><i className="fas menu-icon fa-plus-circle"></i>Cn-XI</Link>
//                         </li>

//                         <li>
//                             <Link className={`${location.pathname == "/cnNine"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnNine"><i className="fas menu-icon fa-plus-circle"></i>Cn-XII</Link>
//                         </li>

//                        {/* <li>
//                             <Link className={`${location.pathname == "/cnNine"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnNine"><i className="fas menu-icon fa-plus-circle"></i></Link>
//                         </li>
//                          <li>
//                             <Link className={`${location.pathname == "/cnTen"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/cnTen"><i className="fas menu-icon fa-plus-circle"></i>Cn-XIII</Link>
//                         </li> */}

//                         {/* morshed start */}
//                         <li>
//                             <Link className={`${location.pathname == "/motor"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/motor"><i className="fas menu-icon fa-plus-circle"></i>Motor</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/on-shutting-eye"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/on-shutting-eye"><i className="fas menu-icon fa-plus-circle"></i>On Shutting Eye</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/left-value"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/left-value"><i className="fas menu-icon fa-plus-circle"></i>Left Value</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/right-value"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/right-value"><i className="fas menu-icon fa-plus-circle"></i>Right Value</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/upper-limb"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/upper-limb"><i className="fas menu-icon fa-plus-circle"></i>UPPER LIMB</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/power"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/power"><i className="fas menu-icon fa-plus-circle"></i>Power</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/the-radial-nerve"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/the-radial-nerve"><i className="fas menu-icon fa-plus-circle"></i>The Radial Nerve</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/jerk-c1-c8"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/jerk-c1-c8"><i className="fas menu-icon fa-plus-circle"></i>Jerk (C1,C8)</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/finger-nose-test"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/finger-nose-test"><i className="fas menu-icon fa-plus-circle"></i>Finger Nose Test</Link>
//                         </li>
//                         <li>
//                             <Link className={`${location.pathname == "/picture-upper-limb-dermatomes"? "active-menu" : ""} text-decoration-none set-up-btn`}
//                                   to="/picture-upper-limb-dermatomes"><i className="fas menu-icon fa-plus-circle"></i>Picture upper limb dermatomes</Link>
//                         </li>
//                         {/* morshed start */}
//                     </ul>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HistorySetupSidebar;