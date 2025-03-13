import MaterialTable, { MTableToolbar } from 'material-table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
function GreatLabBoothStock() {
    const columnsBooth = [
        {
            title: "Code",
            field: "",
            render: (row) => <div>{row?.product?.item_code}</div>,

            cellStyle: {
                textAlign: "center",
                width: "3%",
            },
        },

        {
            title: "Name",
            field: `name`,
            render: (row) => <div className='text-center'>{row?.product?.name}</div>,
            cellStyle: {
                // whiteSpace: 'nowrap',
                textAlign: "center",
            },
        },

        {
            title: "Booth",
            field: `manufacturer`,
            render: (row) => <div className='text-center'>{row?.booth?.name}</div>,
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Stock",
            render: (row) => (
                // <p>{row.stock_out_sum_pcs ? row.stock_out_sum_pcs : 0}</p>
                <p className="text-center">{parseFloat(row?.quantity || 0)}</p>

            ),

        },
        // {
        //     title: "Unit",
        //     field: `unit`,

        //     cellStyle: {
        //         textAlign: "center",
        //     },
        // },
        {
            title: "Price",
            field: `unit`,
            render: row => <>{parseFloat(row?.price || 0).toFixed(2)}</>,

            cellStyle: {
                textAlign: "center",
            },
        },

        {
            title: "Total Price",
            field: `unit`,
            render: row => <>{(parseFloat(row?.price) * parseInt(row?.quantity)).toFixed(2)}</>,

            cellStyle: {
                textAlign: "center",
            },
        },
    ];

    const [sortedBoothData, setSortedBoothData] = useState([])
    const [boothData, setBoothData] = useState([])
    const [loading, setLoading] = useState(false)
    const [booths, setBooths] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.get('great-lab-booth-stock')
            .then((res) => {
                setSortedBoothData(res?.data?.data || [])
                setBoothData(res?.data?.data || [])
                setLoading(false)
            })
        axios.get('great-lab-booth')
            .then((res) => {
                setBooths(res?.data?.booths || [])
            })
    }, [])

    const handleBoothFilter = (e) => {
        if (e.id === "all") {
            setSortedBoothData(boothData)
        } else {
            setSortedBoothData(boothData?.filter((item) => Number(item?.booth_id) === Number(e?.id)))
        }
    }
    return (
        <div className='home-main mt-2 ms-2'>
            <div className='ms-1'>
                <div className='row'>
                    <div className='custom-card'>
                        <h5 className='p-2'>Booth Stock</h5>
                    </div>
                    <div className='main-pan mt-2 '>
                        <div className='row'>
                            <MaterialTable
                                columns={columnsBooth}
                                data={sortedBoothData}
                                isLoading={loading}
                                components={
                                    {
                                        Toolbar: (props) => (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <MTableToolbar {...props} />
                                                </div>
                                                <div style={{ width: "200px" }} className="me-1">

                                                    <Select
                                                        options={[{ id: 'all', name: 'All' }, ...booths]}
                                                        onChange={(e) => handleBoothFilter(e)}
                                                        getOptionLabel={(data) => `${data?.name}`}
                                                        getOptionValue={(data) => `${data?.id}`}
                                                        styles={{
                                                            menu: (provided) => ({
                                                                ...provided,
                                                                maxHeight: '200px', // Set a maximum height for the dropdown menu
                                                                overflowY: 'auto',  // Enable vertical scrolling
                                                                '::-webkit-scrollbar': {
                                                                    width: '6px',
                                                                },
                                                                '::-webkit-scrollbar-thumb': {
                                                                    background: 'gray',
                                                                    borderRadius: '10px',
                                                                },
                                                                zIndex: "100"
                                                            }),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ),
                                    }
                                }
                                options={{
                                    search: true,
                                    showTitle: false,
                                    searchFieldAlignment: 'left',
                                    pageSize: 10,
                                    emptyRowsWhenPaging: false,
                                    pageSizeOptions: [10, 20, 50, 100],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GreatLabBoothStock;
