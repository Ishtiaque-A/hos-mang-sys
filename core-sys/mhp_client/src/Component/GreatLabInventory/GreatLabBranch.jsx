import React, { useState } from 'react';
import { useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useCredentialURL from '../../hooks/useCredentialURL';
import useUserData from '../../hooks/useUserData';

function GreatLabBranch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { SaasAuthURL } = useCredentialURL();
    const user = useUserData();
    useEffect(() => {
        setLoading(true)
        axios
            .get(`${SaasAuthURL}/branch/organization/${user?.organization_id}`)
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.data);
                    setLoading(false);
                }
            })
            .catch((err) => console.log(err));
    }, [user?.organization_id]);
    const columns = [
        {
            title: 'SL',
            field: `supplier_code`,
            render: (row) => <div>{row?.tableData?.id + 1}</div>,
        },
        {
            title: 'Name',
            field: `name`,
        },
        {
            title: 'Status',
            field: `status`,
            render: (row) => <div>
                <span className={`badge ${row?.status === '1' ? 'bg-success' : 'bg-warning'}`}>{row?.status === '1' ? 'Active' : 'Inactive'}</span>
            </div>,
        },
        {
            title: 'Action',
            field: 'patient',
            render: (row) => (
                <div>
                    <Link className='text-decoration-none text-dark' to={`/great-lab-inventory/branch-details/${row.id}`}>
                        <FaRegArrowAltCircleRight fontSize={18} />
                    </Link>
                    {/* <button
                        onClick={(e) => deleteRowData(e, row.id)}
                        className='btn btn-sm action-btn'
                    >

                        <i className='far fa-trash'></i>
                    </button> */}
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
                <h6> Branch List </h6>
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

export default GreatLabBranch;
