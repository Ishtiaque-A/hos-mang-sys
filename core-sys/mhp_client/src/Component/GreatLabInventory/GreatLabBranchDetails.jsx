import React, { useState } from 'react';
import { useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import BoothStockOut from './BoothStockOut';
import AddGreatLabBranchRequisition from './AddGreatLabBranchRequisition';
import BranchStockOut from './BrachStockOut';

function GreatLabBranchDetails() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        setLoading(true)
        axios.get(`/great-lab-branch-stock/${id}`)
            .then((res) => {
                setData(res.data?.stocks)
                setLoading(false)
            })

    }, [refetch, id])

    const emptyProducts = {
        name: '',
        manufacturer: '',
        description: '',
        mrp: '',
        purchase_price: '',
        expiry_date: new Date(),
        category_id: '',
        sub_category_id: '',
        opening_stock: '',
    }
    const [productInfo, setProductInfo] = useState({
        name: '',
        manufacturer: '',
        description: '',
        mrp: '',
        purchase_price: '',
        expiry_date: new Date(),
        category_id: '',
        sub_category_id: '',
        opening_stock: '',
    })

    const columns = [
        {
            title: 'Item Code',
            field: `item_code`,
            render: (row) => <div>{row?.product?.item_code}</div>,
        },
        {
            title: 'Name',
            field: `name`,
            render: (row) => <div className=''>{row?.product?.name}</div>,
        },
        {
            title: 'Stock',
            field: `price`,
            render: (row) => <div className='text-center'>{parseFloat(row?.stock ? row?.stock : 0).toFixed(2)}</div>,
        },
        {
            title: 'Location',
            field: ``,
            render: (row) => <div >{row?.location?.name}</div>,
        },


        {
            title: 'MRP Price',
            field: `price`,
            render: (row) => <div className='text-center'>{parseFloat(row?.price ? row?.price : 0).toFixed(2)} tk</div>,
        },
        // {
        //     title: 'Action',
        //     field: 'patient',
        //     render: (row) => (
        //         <div>
        //             <button onClick={() => openModal(row)} class='btn btn-sm action-btn'>
        //                 <i className='far fa-edit'></i>
        //             </button>
        //             &nbsp;
        //             <button
        //                 onClick={(e) => deleteRowData(e, row.id)}
        //                 className='btn btn-sm action-btn'
        //             >

        //                 <i className='far fa-trash'></i>
        //             </button>
        //         </div>
        //     ),
        //     cellStyle: {
        //         textAlign: 'center',
        //     },
        // },
    ];
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (pd) => {
        setIsOpen(true);
        setProductInfo(pd);
    }
    return (
        <div className='page-content'>
            <div className='d-flex justify-content-between rx-one-button-group custom-card p-2 mb-2'>
                <h6>
                    Products List
                </h6>
                <div>
                    <BranchStockOut id={id} />
                    <button type="button" onClick={() => openModal(emptyProducts)} className='btn float-end'>
                        Add Requisition
                    </button>
                </div>
            </div>
            <MaterialTable
                columns={columns}
                data={data}
                isLoading={loading}
                options={{
                    search: true,
                    showTitle: false,
                    searchFieldAlignment: 'left',
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                }}
            />
            <AddGreatLabBranchRequisition refetch={refetch} id={id} setRefetch={setRefetch} productInfo={productInfo} setProductInfo={setProductInfo} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
}

export default GreatLabBranchDetails;
