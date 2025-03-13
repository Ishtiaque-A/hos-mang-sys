import React, { useState, useEffect } from "react";
import './LabModule.css'
import axios from "axios";
import MaterialTable, { MTableToolbar } from 'material-table';
import { Grid, Tooltip } from '@material-ui/core';
import PrintIcon from '@mui/icons-material/Print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const LabModuleRateList = () => {

    const [allTestNames, setAllTestNames] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/new-test-name`).then(res => {
            if (res.data.status === 200) {
                setAllTestNames(res.data.test_name);
                setLoading(false)
            }

        });
    }, []);


    const columns = [

        {
            title: "SL", field: "", render: (row) => <div class="mx-4">{row.tableData.id + 1}</div>,

        },
        {
            title: "Test Group", field: "test_group", render: (row) => <div class="">{row.group == null ? '' : row.group?.test_group_name}</div>,
        },
        { title: "Test Category", field: "test_category", render: (row) => <div class="">{row.category == null ? '' : row.category?.test_category_name}</div> },
        { title: "Test Sub Category", field: "test_category", render: (row) => <div class="">{row.sub_category == null ? '' : row.sub_category?.test_sub_category_name}</div> },
        {
            title: "Test Name", field: "test_name",
        },
        { title: "Fee", field: "fee", render: (row) => <div class="mx-5">{row.fee == null ? '' : row.fee}</div> },

    ];



    // export
    const printPdf = () => {
        const doc = new jsPDF();
        doc.text("Patient List", 90, 10);
        doc.autoTable({
            theme: "grid",
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: allTestNames
        })
        doc.save("Test Name.pdf")
    }


    return (
        <div class="shadow-sm p-2 bg-body rounded mt-2">
            <h6 className=" mx-2" >Rate List</h6>
            <hr />
            <div className="center-detail-sec">
                <div className="row">
                    <div className="col-md-12 px-2">
                        <p className="px-4">Available in ratelist under names:</p>



                        <div className="custom-card patient-table mt-2">
                            <MaterialTable
                                columns={columns}

                                data={allTestNames}
                                isLoading={loading}
                                options={{
                                    search: true,
                                    showTitle: false,
                                    searchFieldAlignment: "left",
                                    searchFieldStyle: { borderRadius: 16 },
                                    pageSize: 10,
                                    emptyRowsWhenPaging: false,
                                    pageSizeOptions: [5, 10, 20, 50, 100],
                                    // exportButton: true,

                                }}
                                components={{
                                    Toolbar: (props) => <div>
                                        <Grid style={{}}>
                                            <Tooltip title="Export to Pdf" placement="bottom"><PrintIcon className="float-end export-icon pe-auto me-3 mt-2 mb-3" onClick={() => printPdf()} /></Tooltip>
                                        </Grid>
                                        <MTableToolbar style={{ width: 80, fontSize: 14 }} {...props} />
                                    </div>
                                }}

                            />


                        </div>



                    </div>

                </div>

            </div>

        </div>
    );
};

export default LabModuleRateList;