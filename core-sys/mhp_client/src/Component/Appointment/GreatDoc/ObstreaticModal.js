import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function ObstreaticModal(props) {
    const [pregnancyData, setPregnancyData] = useState({
        pregnancy_no: "",
        actual_lmp: "",
        scan_date: "",
        finish_date: "",
        managed_by: "",
        edc_by_scan: "",
        edc_by_lmp: "",
        scan_weeks: "",
        use_scan_date: false,
        geston_weeks: "",
        scan_days: "",
        outcome: "",
        complication: "",
    })
    useEffect(() => {
        if (props.id) {
            axios.get(`/pregnancy-history-edit/${props.id}`).then(res => setPregnancyData(res.data.pregnancy));

        }
    }, []);
    return (
        <div>
            <div className="past-history-table">
                <table className="past_rx_table">
                    <thead>
                        <tr>
                            <th scope="col">Pregnancy No</th>
                            <th scope="col">Actual LMP</th>
                            <th scope="col">Scan Date</th>
                            <th scope="col">Scan Weeks</th>
                            <th scope="col">Scan Days</th>
                            <th scope="col">EDC by Scan </th>
                            <th scope="col">EDC by LMP</th>
                            <th scope="col">Finish Date</th>
                            <th scope="col">Gestion weeks</th>
                            <th scope="col">Outcome</th>
                            <th scope="col">Complications</th>
                            <th scope="col">Managed by</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>{pregnancyData.pregnancy_no}</td>
                            <td>{moment(pregnancyData.actual_lmp).format("DD/MM/YYYY")}</td>
                            <td>{moment(pregnancyData.scan_date).format("DD/MM/YYYY")}</td>
                            <td>{pregnancyData.scan_weeks}</td>
                            <td>{pregnancyData.scan_days}</td>
                            <td>{moment(pregnancyData.edc_by_scan).format("DD/MM/YYYY")}</td>
                            <td>{moment(pregnancyData.edc_by_lmp).format("DD/MM/YYYY")}</td>
                            <td>{moment(pregnancyData.finish_date).format("DD/MM/YYYY")}</td>
                            <td>{pregnancyData.geston_weeks}</td>
                            <td>{pregnancyData.outcome}</td>
                            <td>{pregnancyData.complication}</td>
                            <td>{pregnancyData.managed_by}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
