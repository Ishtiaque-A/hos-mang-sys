import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import './AddDashboard.css';

const MusculoSkeletalExaminationSidebar = () => {
    const location = useLocation();
    return (
        <div>
            <div className="custom-card mt-2">
                <div className="card-body add-dashboard g-doc-scroll">
                    <ul className="setup-list">
                       
                        <li>
                            <Link className={`${location.pathname === "/movement" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/movement"><i className="fas menu-icon fa-plus-circle"></i> Movement</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/tender-over-spinus-process-at" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tender-over-spinus-process-at"><i className="fas menu-icon fa-plus-circle"></i> Tender Over Spinus Process at</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/tenerness-over-facet-join" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tenerness-over-facet-join"><i className="fas menu-icon fa-plus-circle"></i> Tenerness Over Facet Join</Link>
                        </li>
                     
                        <li>
                            <Link className={`${location.pathname === "/inspection" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/inspection"><i className="fas menu-icon fa-plus-circle"></i> Inspection</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pain-along-anterior" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pain-along-anterior"><i className="fas menu-icon fa-plus-circle"></i> Pain along anterior</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pain-over-posterior" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pain-over-posterior"><i className="fas menu-icon fa-plus-circle"></i> Pain over posterior</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/walk-on-heels" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/walk-on-heels"><i className="fas menu-icon fa-plus-circle"></i> Walk on heels</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/posture-thoraco" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/posture-thoraco"><i className="fas menu-icon fa-plus-circle"></i> Posture thoraco</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/tender-over-spinus-thoraco" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tender-over-spinus-thoraco"><i className="fas menu-icon fa-plus-circle"></i> Tender over spinus process (Thoraco)</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/tenderness-over-facet-thoraco" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tenderness-over-facet-thoraco"><i className="fas menu-icon fa-plus-circle"></i> Tenderness over facet at (Thoraco)</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/tenderness-over-facet-lrb-thoraco" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tenderness-over-facet-lrb-thoraco"><i className="fas menu-icon fa-plus-circle"></i> Tenderness over facet lrb</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/tender-tenerness-over-l1-to-l6-thoraco" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tender-tenerness-over-l1-to-l6-thoraco"><i className="fas menu-icon fa-plus-circle"></i> Tender/Tenderness L1 To L6 Thoraco</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/lying-on-couch" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/lying-on-couch"><i className="fas menu-icon fa-plus-circle"></i> Lying on couch</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/move-hip-pelvis" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/move-hip-pelvis"><i className="fas menu-icon fa-plus-circle"></i> Move Hip Pelvis</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/sudden-anaesthesia" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/sudden-anaesthesia"><i className="fas menu-icon fa-plus-circle"></i> Sudden Anaesthesia</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/thoracic-kyphosis" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/thoracic-kyphosis"><i className="fas menu-icon fa-plus-circle"></i> Thoracic Kyphosis</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/lumber-lordosis" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/lumber-lordosis"><i className="fas menu-icon fa-plus-circle"></i> Lumber Lordosis</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/spine" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/spine"><i className="fas menu-icon fa-plus-circle"></i> Spine</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pain-into-knee" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pain-into-knee"><i className="fas menu-icon fa-plus-circle"></i> Pain Into Knee</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/shape-and-contour" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/shape-and-contour"><i className="fas menu-icon fa-plus-circle"></i> Shape & Contour</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/anterior-view" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/anterior-view"><i className="fas menu-icon fa-plus-circle"></i> Anterior View</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/level-of-spine-of-scapula" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/level-of-spine-of-scapula"><i className="fas menu-icon fa-plus-circle"></i> Level of spine of scapula</Link>
                        </li>
                     
                        <li>
                            <Link className={`${location.pathname === "/winged-scapula" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/winged-scapula"><i className="fas menu-icon fa-plus-circle"></i> Winged Scapula</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/wrist" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/wrist"><i className="fas menu-icon fa-plus-circle"></i> Wrist</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/metacarpophalangeal-joint" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/metacarpophalangeal-joint"><i className="fas menu-icon fa-plus-circle"></i> Metacarpophalangeal Joint</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/proximal-interphalangeal-joint" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/proximal-interphalangeal-joint"><i className="fas menu-icon fa-plus-circle"></i> Proximal Interphalangeal Joint</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/distal-interphalangeal-joint" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/distal-interphalangeal-joint"><i className="fas menu-icon fa-plus-circle"></i> Distal Interphalangeal Joint</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/l1-and-l2-hip-flexion" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/l1-and-l2-hip-flexion"><i className="fas menu-icon fa-plus-circle"></i> L1 and L2. Hip Flexion</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/l3-to-l5-power" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/l3-to-l5-power"><i className="fas menu-icon fa-plus-circle"></i> L3 To L5 Power</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/l1-and-l2-sensation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/l1-and-l2-sensation"><i className="fas menu-icon fa-plus-circle"></i> L1 and L2 Sensation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/l3-to-l5-sensation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/l3-to-l5-sensation"><i className="fas menu-icon fa-plus-circle"></i> L3 To L5 Sensation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/s1-to-s4-test" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/s1-to-s4-test"><i className="fas menu-icon fa-plus-circle"></i> S1 To S4 Test</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/inspection-look-hip-pelvis" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/inspection-look-hip-pelvis"><i className="fas menu-icon fa-plus-circle"></i> Inspection Look</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/test-hip-pelvis" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/test-hip-pelvis"><i className="fas menu-icon fa-plus-circle"></i> Test Hip Pelvis</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/gait-limping" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/gait-limping"><i className="fas menu-icon fa-plus-circle"></i> Gait-Limping</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/shoulder-movements" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/shoulder-movements"><i className="fas menu-icon fa-plus-circle"></i> Shoulder Movements</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/painful-arc" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/painful-arc"><i className="fas menu-icon fa-plus-circle"></i> Painful Arc</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/resisted-movement" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/resisted-movement"><i className="fas menu-icon fa-plus-circle"></i> Resisted Movement</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/nails" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/nails"><i className="fas menu-icon fa-plus-circle"></i> Nails</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/dorsum-of-hand" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/dorsum-of-hand"><i className="fas menu-icon fa-plus-circle"></i> Dorsum of Hand</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/fingers" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/fingers"><i className="fas menu-icon fa-plus-circle"></i> Fingers</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/tenders" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/tenders"><i className="fas menu-icon fa-plus-circle"></i> Tenders</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/flexon-tendons" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/flexon-tendons"><i className="fas menu-icon fa-plus-circle"></i> Flexon Tendons</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/wrist-palpation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/wrist-palpation"><i className="fas menu-icon fa-plus-circle"></i> Wrist Palpation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/proximal-interphalangeal-palpation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/proximal-interphalangeal-palpation"><i className="fas menu-icon fa-plus-circle"></i> Proximal Interphalangeal Joint Palpation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/metacarpophalangeal-joint-palpation" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/metacarpophalangeal-joint-palpation"><i className="fas menu-icon fa-plus-circle"></i> Metacarpophalangeal Joint Palpation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/flexor-digitorum-profundus-test" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/flexor-digitorum-profundus-test"><i className="fas menu-icon fa-plus-circle"></i> Flexor Digitorum Profundus Test</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/flexor-digitorum-superficialis-test" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/flexor-digitorum-superficialis-test"><i className="fas menu-icon fa-plus-circle"></i> Flexor Digitorum Superficialis Test</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/inspection-male-female" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/inspection-male-female"><i className="fas menu-icon fa-plus-circle"></i> Inspection Male Female Degree</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/at-90-flextion" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/at-90-flextion"><i className="fas menu-icon fa-plus-circle"></i> At 90° Flextion Palpation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/at-full-flextion" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/at-full-flextion"><i className="fas menu-icon fa-plus-circle"></i> At full Flextion Palpation</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/flextion-0-to-150-examination" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/flextion-0-to-150-examination"><i className="fas menu-icon fa-plus-circle"></i> Flextion 0-150 Examination</Link>
                        </li>

                        <li>
                            <Link className={`${location.pathname === "/anterior-view-knee" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/anterior-view-knee"><i className="fas menu-icon fa-plus-circle"></i> Anterior View Knee</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/posterior-view-knee" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/posterior-view-knee"><i className="fas menu-icon fa-plus-circle"></i> Posterior View Knee</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/lateral-view-knee" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/lateral-view-knee"><i className="fas menu-icon fa-plus-circle"></i> Lateral View Knee</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/stance-swat-knee" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/stance-swat-knee"><i className="fas menu-icon fa-plus-circle"></i> Stance Swat Knee</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/margin-condyle-tibial" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/margin-condyle-tibial"><i className="fas menu-icon fa-plus-circle"></i> Margin Condyle Tibial</Link>
                        </li>
                        {/* Ankle & Foot */}
                        <li>
                            <Link className={`${location.pathname === "/toes-left" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/toes-left"><i className="fas menu-icon fa-plus-circle"></i> Toes Left</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/mtp-joint" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/mtp-joint"><i className="fas menu-icon fa-plus-circle"></i> MTP Joint</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/pip-joint" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/pip-joint"><i className="fas menu-icon fa-plus-circle"></i> PIP Joint</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/dip-joint" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/dip-joint"><i className="fas menu-icon fa-plus-circle"></i> DIP Joint</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/toes-right" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/toes-right"><i className="fas menu-icon fa-plus-circle"></i> Toes Right</Link>
                        </li>
                        <li>
                            <Link className={`${location.pathname === "/dorsum-of-foot" ? "active-menu" : ""} text-decoration-none set-up-btn`}
                                  to="/dorsum-of-foot"><i className="fas menu-icon fa-plus-circle"></i> Dorsum Of Foot</Link>
                        </li>
                     
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default MusculoSkeletalExaminationSidebar;