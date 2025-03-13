import React, { useState } from 'react';
import { useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import moment from 'moment';
import useCredentialURL from '../../hooks/useCredentialURL';
import useUserData from '../../hooks/useUserData';

function GreatLabBranchStockOut() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [branches, setBranches] = useState([]);
    const { SaasAuthURL } = useCredentialURL();
    const user = useUserData();
    useEffect(() => {
        setLoading(true)
        axios.get(`/great-lab-requisition`)
            .then((res) => {
                setData(res.data?.booths?.filter(item => item?.status === 'Approved' || item?.status === 'Delivered'))
                setLoading(false)
            })
        axios
            .get(`${SaasAuthURL}/branch/organization/${user?.organization_id}`)
            .then((res) => {
                if (res.status === 200) {
                    setBranches(res.data.data);
                }
            })
            .catch((err) => console.log(err));
    }, [refetch])
    const columns = [
        {
            title: 'Requisition No',
            field: `supplier_code`,
            render: (row) => <div>{row?.requisition_no}</div>,
        },
        {
            title: 'Date',
            field: `name`,
            render: (row) => <div>{moment(row?.date).format('DD-MM-YYYY')}</div>,
        },
        {
            title: 'Branch',
            field: `name`,
            render: (row) => <div>{branches.find(item => Number(item?.id) === Number(row?.branch_id))?.name}</div>,
        },
        {
            title: 'Booth',
            field: `name`,
            render: (row) => <div>{(row?.booth?.name)}</div>,
        },
        {
            title: 'Requisitor',
            field: `requisitor_name`,
        },
        {
            title: 'Status',
            field: `status`,
            render: (row) => <div>
                <span className={`badge ${row?.status === 'Approved' ? 'bg-info' : row?.status === 'Delivered' ? 'bg-success' : ''}`}>{row?.status === 'Approved' ? 'New' : row?.status === 'Delivered' ? 'Delivered' : 'Pending'}</span>
            </div>,
        },
        {
            title: 'Action',
            field: 'patient',
            render: (row) => (
                <div>
                    &nbsp;
                    {
                        (row?.status === 'Approved' || row?.status === 'Delivered') &&
                        <Link to={`/great-lab-inventory/lab-requisition-details/${row.id}`}>
                            <button class='btn btn-sm action-btn'>
                                <FaRegArrowAltCircleRight />
                            </button>
                        </Link>
                    }

                </div>
            ),
            cellStyle: {
                textAlign: 'center',
            },
        },
    ];

    return (
        <div className='page-content'>
            <div className='d-flex justify-content-between rx-one-button-group custom-card p-2 mb-2'>
                <h6> Requisition List </h6>
                {/* <button type="button" onClick={() => openModal(emptyBooth)} className='btn float-end'>
                    Add Booth
                </button> */}
            </div>
            <div>
                <MaterialTable
                    columns={columns}
                    data={data}
                    isLoading={loading}
                    options={{
                        search: true,
                        showTitle: false,
                        searchFieldAlignment: 'left',
                        pageSize: 5,
                        emptyRowsWhenPaging: false,
                        pageSizeOptions: [5, 10, 20, 50, 100],
                    }}
                />
            </div>
        </div>
    );
}

export default GreatLabBranchStockOut;
