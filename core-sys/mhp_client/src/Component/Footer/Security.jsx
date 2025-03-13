

export default function Security({ setSecurityModelOpen }) {
    return (
        <>
            <span className='float-end' style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }} onClick={() => setSecurityModelOpen(false)}><i className="fal fa-times"></i></span>
            <h2 className="text-center lead fw-semibold">Security Policy</h2>
            <hr className='top-hr' />
            <div className="row">
                <div className="col-12 px-3 condition-privacy">
                    <h5 >Date of Last Revision: June 23, 2023 </h5>
                    <p>
                        “Macrohealthplus Website” (hereinafter “the Website”) specifically complies with the “The Regulation on Electronic Processing of Personal Data Protection”, for the protection of the Website’s data and your own, and implements the following Website Security Policy to state the Website’s security practices.
                    </p>
                    <ol className="ms-3">
                        <li>
                            <b>
                                The Scope of the Policy
                            </b>
                            <br />
                            The following Website Security Policy is applicable to the collection, utilization, and protection of personal data when you are browsing the Website; however, it is not applicable to the other websites that are linked therefrom. When one follows links to other websites, the website security policies of that website apply.
                        </li>
                        <li>
                            <b>The Control of Data Access</b>
                            <ol type="i" className="ms-3">
                                <li>
                                    System data access and authorization requirements shall be implemented; written, electronic, or other means of notification shall be established to inform the staff and the users of the permissions and responsibilities of the site.
                                </li>
                                <li>
                                    The authorization privileges for various data resources shall be immediately canceled for staff who have resigned or have been terminated; this shall be regarded as the mandatory procedure for employment termination and resignation. For any adjustment or alteration of staff duty, authorization shall be adjusted within a certain period time according to the data access privileges of the new position.
                                </li>
                                <li>
                                    A user registration management system shall be established to strengthen user password management. User passwords, in principle, shall not be used for a period longer than six months.
                                </li>
                                <li>
                                    When system service vendors remotely log into the system for maintenance, security control measures shall be enhanced. A relevant roster shall be created for personnel with such responsibility.
                                </li>
                                <li>
                                    An auditing system for data security shall be established to periodically or randomly execute data security audits.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <b>The Website Security Procedures and Rules</b>
                            <br />
                            Any unauthorized action to intentionally upload or modify any services provided by the office or other relevant information is strictly prohibited, and may be in violation of the law. In order to attain website security and to ensure that services can be uninterruptedly provided to all internal users, the Website delivers the following security protection measures:
                            <ol type="i" className="ms-3">
                                <li>At the points connecting to external networks, a firewall will be established to control data transfer and source access between the external and internal network and an identification process will be strictly enforced.</li>
                                <li>
                                    In order to identify unauthorized intentional intruders trying to upload or modify website information, an Internet intrusion detection system will be utilized to monitor the flow of network traffic.
                                </li>
                                <li>
                                    Anti-virus software will be installed for periodic virus scans to ensure a safer browsing environment for the users.
                                </li>
                                <li>
                                    A system backup system will be established to execute necessary data and software backup and stand-by operations in order to immediately resume regular operation in the event of disasters or storage media failure.
                                </li>
                                <li>
                                    The simulation of hacker attacks shall be occasionally conducted to execute the system recovery drill in the event of security incidents and to provide a suitable security defense level.
                                </li>
                                <li>
                                    Any classified and sensitive data or documents shall not be stored in the public data system; classified documents shall not be transmitted by electronic mail.
                                </li>
                                <li>
                                    Electronic notifications about the security system and its maintenance will be automatically sent to all system and operation vendors. Patches will also be installed appropriately in accordance with the recommendations of such notices.
                                </li>
                                <li>
                                    The Internet data transmission cannot guarantee 100 percent security; the Website will strive to protect the personal data of the Website and your own. In certain situations, a standard SSL security system will be utilized to ensure data transmission security. However, the data transmission process is influenced by your own Internet surfing environment. As we cannot guarantee the security of the data transmission from this Website, you must pay attention to and assume the risks involved in Internet data transmission. Please understand that any consequence resulting from this is beyond the Website’s control.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <b>The security management of the firewall</b>
                            <ol className="mx-3" type="i">
                                <li>A firewall will be established as a network relay server (such as Proxy Server) that provides the transport and control of Internet services such as Telnet, FTP, and WWW.</li>
                                <li>
                                    The firewall will be the core of the entire network of this office. In case of unexpected events, a backup shall be prepared for all firewall host hardware and software.
                                </li>
                                <li>
                                    The office’s firewall system will routinely record the activities and incidents of the entire network. The data recorded—at minimum—shall include the date, time, originating IP, and communication protocol of the incident, for the purposes of routine management and future audit operations.
                                </li>
                                <li>
                                    The log of the office’s firewall will be examined and analyzed by firewall management personnel for any irregularities; such log shall be retained for at least one year.
                                </li>
                                <li>
                                    In order to ensure the security of the firewall host computer, the office’s firewall host computer shall only be logged into via system terminals; it shall not be logged into by any other method.
                                </li>
                                <li>
                                    The security control setting of the office’s firewall shall be reviewed frequently and adjusted as required to ensure that the goals of security control are attained.
                                </li>
                                <li>
                                    The office’s firewall system shall be backed up periodically. In addition, the backup shall be done on a stand-alone computer; any other method, including Internet backup, is not allowed.
                                </li>
                                <li>
                                    The office’s firewall system software will frequently update its version to be able to respond to a variety of network attacks.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <b>The principles of data backup operation</b>
                            <ol type="i" className="ms-3">
                                <li>
                                    The backup of significant data shall be maintained for at least three generations, in principle.
                                </li>
                                <li>
                                    The backup data shall be protected by suitable physical and environmental measures; the safety standard shall match the safety standards of the major workplaces as much as possible. The computer security control measures of major workplaces shall be applied to backup operation workplaces as much as possible.
                                </li>
                                <li>
                                    Periodic testing of backup data shall be conducted to ensure the usability of backup data.
                                </li>
                            </ol>
                        </li>
                        <li>
                            <b>Data recovery operation principles</b>
                            <ol type="i" className="ms-3">
                                <li>
                                    When executing data recoveries, the consistency and completeness of the data shall be checked first.
                                </li>
                                <li>
                                    When recovering website data, except in the event of unexpected major incidents resulting in difficulties for the computer facilities or network operation to recover, the data shall be restored to regular activities within 24 hours. The backup data shall be maintained and updated to the most recent data within two days to ensure that after the data has been recovered, programs and databases can all immediately resume normal operation.
                                </li>
                                <li>
                                    Backup data shall be tested regularly to ensure its usability.
                                </li>
                                <li>
                                    After the data recovery operation has been completed, relevant personnel shall continually monitor the system for three days to ensure its normal operation and the correctness of the newly added data.
                                </li>
                                <li>
                                    Due to rapid technological advancement, the unfinished implementation of relevant regulations, and other future unforeseeable environmental changes, the data security policy is subject to be changed by the Website as required to ensure proper Internet security protection. After the Website has completed any amendments to the data security policy, we will immediately publish the new policy on the Website, and clearly highlight the amended sections for your reference.
                                </li>
                                <li>
                                    For any questions or comments about the above terms and conditions, you are welcome to contact us through the details listed on the Website.
                                </li>


                            </ol>
                        </li>
                    </ol>
                </div>
            </div>
        </>
    )
}
