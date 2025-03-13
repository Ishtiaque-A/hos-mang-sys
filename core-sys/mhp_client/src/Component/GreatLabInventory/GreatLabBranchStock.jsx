import MaterialTable, { MTableToolbar } from 'material-table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import useCredentialURL from '../../hooks/useCredentialURL';
import useUserData from '../../hooks/useUserData';
function GreatLabBranchStock() {
    const columns = [
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
            title: "Branch",
            field: `manufacturer`,
            render: (row) => <div className='text-center'>{branch.find(item => Number(item?.id) === Number(row?.branch_id))?.name}</div>,
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Location",
            field: `manufacturer`,
            render: (row) => <div className='text-center'>{row?.location?.name}</div>,
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Opening Stock",
            render: (row) => (
                // <p>{row.stock_out_sum_pcs ? row.stock_out_sum_pcs : 0}</p>
                <p className="text-center">{row?.opening_stock}</p>

            ),

        },
        {
            title: "Stock In",
            render: (row) => (
                // <p>{row.stock_out_sum_pcs ? row.stock_out_sum_pcs : 0}</p>
                <p className="text-center">{row?.stock_in?.length > 0 ? row?.stock_in?.filter(item => Number(item?.location_id) === Number(row?.location_id))?.reduce((a, b) => a + parseInt(b?.quantity || 0), 0) : 0}</p>

            ),

        },
        {
            title: "Stock Out",
            render: (row) => (
                // <p>{row.stock_out_sum_pcs ? row.stock_out_sum_pcs : 0}</p>
                <p className="text-center">{row?.stock_out?.length > 0 ? row?.stock_out?.filter(item => Number(item?.location_id) === Number(row?.location_id))?.reduce((a, b) => a + parseInt(b?.quantity || 0), 0) : 0}</p>

            ),

        },
        {
            title: "Stock",
            render: (row) => <p className="text-center">{parseFloat(row?.stock || 0) + parseFloat(row?.bonus_qty || 0)}</p>,
            cellStyle: {
                textAlign: "center",
                fontWeight: "bold",
                color: "red",
            },

        },

        {
            title: "PP",
            field: `unit`,
            render: row => <>{parseFloat(row?.price || 0).toFixed(2)}</>,

            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Vat",
            field: `unit`,
            render: row => <>{parseFloat(row?.vat ? row?.vat : 0).toFixed(2)}</>,

            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Total Price",
            field: `unit`,
            render: row => <>{((parseFloat(row?.price) + parseFloat(row.vat ? row?.vat : 0)) * parseInt(row?.stock)).toFixed(2)}</>,

            cellStyle: {
                textAlign: "center",
            },
        },
    ];
    const [sortedData, setSortedData] = useState([]);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [locations, setLocations] = useState([]);
    const [branch, setBranch] = useState([]);
    const { SaasAuthURL } = useCredentialURL();
    const user = useUserData();

    useEffect(() => {
        setLoading(true)
        axios.get('/great-lab-stock')
            .then((res) => {
                setData(res?.data?.stock)
                setSortedData(res?.data?.stock)
                setLoading(false)
            })
        axios.get('great-lab-stock-location')
            .then((res) => {
                setLocations(res?.data?.booths || [])
            })
        axios
            .get(`${SaasAuthURL}/branch/organization/${user?.organization_id}`)
            .then((res) => {
                if (res.status === 200) {
                    setBranch(res.data.data);
                }
            })
            .catch((err) => console.log(err));
    }, [])
    const handleCentralFilter = (e) => {
        if (e.id === "all") {
            setSortedData(data)
        } else {
            setSortedData(data?.filter((item) => Number(item?.location_id) === Number(e?.id)))
        }
    }

    return (
        <div className='home-main mt-2 ms-2'>
            <div className='ms-1'>
                <div className='row'>
                    <div className='custom-card'>
                        <h5 className='p-2'>Branch Stock</h5>
                    </div>
                    <div className='main-pan mt-2 '>
                        <div className='row'>
                            <MaterialTable
                                columns={columns}
                                data={sortedData}
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
                                                        options={[{ id: 'all', name: 'All' }, ...locations]}
                                                        onChange={(e) => handleCentralFilter(e)}
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

export default GreatLabBranchStock;
