import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import Swal from 'sweetalert2'
import { NewModal as Modal } from '../../common/components/NewModal'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import useUserData from '../../hooks/useUserData'
import Select from 'react-select';
import { useOutletContext } from "react-router-dom";
import { toast } from 'react-toastify'
export default function GreatLabAddPurchaseIn({ isOpen, setIsOpen, productInfo, refetch, setRefetch, setProductInfo, stockItems, setStockItems }) {
    // const [productInfo, setProductInfo] = useState({
    //     supplier: '',
    //     remarks: '',
    //     delivery_date: '',
    //     location_id: '',
    // })
    const [refetchStock, setRefetchStock] = useOutletContext();
    const user = useUserData();
    const [userData, setUserData] = useState({})
    const handleChange = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }
    // const [stockItems, setStockItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    const closeModal = () => {
        setIsOpen(false)
        setProductInfo({})
        setStockItems([]);
        setSearchText('')
    }
    const [loading, setLoading] = useState(false);
    const handleSave = (status) => {
        let totalPrice = stockItems.reduce((total, item) => {
            return total + ((parseFloat(item?.purchase_price) + parseFloat(item?.vat ? item?.vat : 0)) * parseFloat(item?.quantity))
        }, 0)
        const data = {
            ...productInfo,
            totalPrice: totalPrice,
            stock_in_by: userData?.name,
            status: status,
            date: productInfo?.date ? productInfo?.date : new Date(),
            stock_items: stockItems?.filter(item => item?.quantity > 0),
        }
        if (productInfo?.supplier_id && data?.stock_items?.length > 0) {
            setLoading(true)
            if (productInfo?.id) {
                axios.put(`great-lab-purchase/${productInfo?.id}`, data)
                    .then((res) => {
                        if (res.status === 200) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: "Data Added Successfully",
                            })
                            setLoading(false)
                            closeModal();
                            setRefetch(!refetch)
                            setRefetchStock(!refetchStock)
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: `${err?.response?.data?.message}`,
                        })
                    })
            } else {
                axios.post('great-lab-purchase', data)
                    .then((res) => {
                        if (res.status === 200) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: "Data Added Successfully",
                            })
                            setLoading(false)
                            closeModal();
                            setRefetch(!refetch)
                            setRefetchStock(!refetchStock)
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: `${err?.response?.data?.message}`,
                        })
                    })
            }
        } else if (!productInfo?.supplier_id) {
            toast.error('Please select supplier!')
        } else if (!data?.stock_items?.length) {
            toast.error('Please add quantity!')
        }

    }

    const [products, setProducts] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        axios.get(`/great-lab-inventory`)
            .then((res) => {
                setProducts(res.data?.products)
            })
        axios.get(`/great-lab-supplier`)
            .then((res) => {
                setSupplier(res.data?.suppliers)
            })
        axios.get(`/great-lab-stock-location`)
            .then((res) => {
                setLocations(res.data?.booths)
            })
        axios.get(`/get-user/${user?.id}`)
            .then((res) => {
                setUserData(res?.data?.user)
            })
    }, [user]);
    const clearBillingSearch = () => {
        setSearchText("");
    }
    const addProduct = (product) => {
        let temp = [...stockItems];
        let exist = temp.find((item) => Number(item?.id) === Number(product?.id));
        if (!exist) {
            temp.push({
                ...product,
                quantity: 0,
                bonus_quantity: 0,
                purchase_price: 0,
                vat: 0,
                tax: 0,

            });
            setStockItems([...temp])
        }

    }
    const purchasePriceHandler = (e, index) => {
        let temp = [...stockItems];
        temp[index][e.target.name] = e.target.value;
        setStockItems([...temp])
    }
    const removeTest = (index) => {
        let temp = [...stockItems];
        temp.splice(index, 1);
        setStockItems([...temp])
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/great-lab-purchase-in-details-delete/${id}`).then((res) => {
                    if (res.data.status === 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Your data has been deleted.',
                            timer: 2500,
                        });
                        setStockItems(stockItems.filter((item) => item?.id !== id));
                        setRefetch(!refetch)
                    }
                });

            }
        });
    };
    console.log(productInfo, "stockItems");
    return (
        <Modal size='md' isOpen={isOpen} onClose={closeModal}>
            <Modal.Header onClose={closeModal} >
                <Modal.Title>Purchase Order</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSave}>
                <Modal.Body styles={{ height: "450px" }} >
                    <div className="row custom-card p-2">
                        <div className="col-6">
                            {/* <div className="mb-2">
                                <label htmlFor="name">Supplier <span className='text-danger'>*</span></label>
                                <input value={productInfo?.supplier} onChange={handleChange} required type="text" id="supplier" name='supplier' className="form-control form-control-sm" />
                            </div> */}

                            <div className="mb-2">
                                <label htmlFor="supplier">Supplier <span className='text-danger'>*</span></label>
                                <Select
                                    options={supplier}
                                    onChange={(e) => setProductInfo({ ...productInfo, supplier_id: e?.id })}
                                    getOptionLabel={(data) => `${data?.name}`}
                                    getOptionValue={(data) => `${data?.id}`}
                                    value={supplier?.find((item) => Number(item?.id) === Number(productInfo?.supplier_id))}
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
                                        }),
                                    }}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="location_id">Order By <span className='text-danger'>*</span></label>
                                <input type="text" readOnly value={userData?.name} className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-2">
                                <label htmlFor="delivery_date">Date</label>
                                <ReactDatePicker
                                    placeholderText='Delivery Date'
                                    selected={productInfo?.date ? new Date(productInfo?.date) : new Date()}
                                    dateFormat={'dd/MM/yyyy'}
                                    name='date'
                                    autoFocus={false}
                                    onChange={(d) =>
                                        setProductInfo({
                                            ...productInfo,
                                            date: d ? d : new Date(),
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="remarks">Remarks </label>
                                <textarea value={productInfo?.remarks} onChange={handleChange} type="text" id="remarks" name='remarks' className="form-control form-control-sm" rows="1"></textarea>
                            </div>

                        </div>
                        <div className="m-">
                            <label htmlFor="">Select Product</label>
                            <div className="lab-agent-search" >
                                <ReactSearchAutocomplete
                                    showIcon={false}
                                    placeholder={
                                        "Search Product "
                                    }
                                    items={products}
                                    onClear={clearBillingSearch}
                                    inputSearchString={searchText || ""}
                                    onSearch={(value) => setSearchText(value)}
                                    formatResult={(item) => {
                                        return (
                                            <div
                                                style={{
                                                    padding: "3px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                    }}
                                                >
                                                    <div>
                                                        <p
                                                            style={{
                                                                fontWeight: "normal",
                                                                fontSize: "14px",
                                                                margin: "0px",
                                                                padding: "0px",
                                                            }}
                                                        >
                                                            <span className='me-1'>{item?.name}</span>
                                                        </p>

                                                    </div>
                                                    <div>
                                                        <p
                                                            style={{
                                                                fontWeight: "normal",
                                                                fontSize: "14px",
                                                                margin: "0px",
                                                                padding: "0px",
                                                            }}
                                                        >
                                                            <span className='me-1'>{item?.manufacturer}</span>
                                                        </p>

                                                    </div>
                                                </div>

                                            </div>
                                        );
                                    }}
                                    resultStringKeyName="name"
                                    onSelect={(item) => {
                                        addProduct(item)
                                    }}
                                    maxResults={3}
                                    fuseOptions={{
                                        keys: [
                                            "name",
                                            "manufacturer",
                                        ],
                                    }} // Search in the description text as well
                                    styling={{
                                        borderRadius: "5px !important",
                                        zIndex: "auto",
                                        width: "100%",
                                    }}
                                />
                            </div>
                        </div>
                        <table className="cart-table border bg-white rounded">
                            <tbody>
                                <tr className="cart-table-head">
                                    <td className="fw-bold">Item Code</td>
                                    <td width={"35%"} className="fw-bold">
                                        Product Name
                                    </td>
                                    {/* <td className="fw-bold">Manufacturer</td> */}
                                    {/* <td className="fw-bold">MRP</td> */}
                                    <td className="fw-bold">PP</td>
                                    <td className="fw-bold">Vat</td>
                                    <td className="fw-bold">Qty</td>
                                    {/* <td className="fw-bold">Bonus Qty</td> */}
                                    <td className="fw-bold">Action</td>
                                </tr>
                                {stockItems?.length > 0 &&
                                    stockItems?.map((test, i) => {
                                        // const amount =
                                        //     (Number(test.fee) * Number(test.discount)) / 100;
                                        // const total = test.fee - amount;

                                        return (
                                            <tr key={test.item_code}>
                                                <td>{test.item_code || test?.product?.item_code}</td>
                                                <td width={"25%"}>{test?.name || test?.product?.name}</td>
                                                {/* <td>{test?.manufacturer}</td> */}
                                                {/* <td>
                                                    {test?.mrp}
                                                </td> */}
                                                <td>
                                                    <div className='w-[40%] '>
                                                        <input
                                                            name="purchase_price"
                                                            onChange={(e) => purchasePriceHandler(e, i)}
                                                            value={test?.purchase_price}
                                                            style={{ width: '60px' }}
                                                            className='form-control form-control-sm text-center'
                                                            type='number'
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='w-[40%] '>
                                                        <input
                                                            name="vat"
                                                            onChange={(e) => purchasePriceHandler(e, i)}
                                                            value={test?.vat}
                                                            style={{ width: '60px' }}
                                                            className='form-control form-control-sm text-center'
                                                            type='number'
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='w-[40%] '>
                                                        <input
                                                            name="quantity"
                                                            onChange={(e) => purchasePriceHandler(e, i)}
                                                            value={test?.quantity}
                                                            style={{ width: '60px' }}
                                                            className='form-control form-control-sm text-center'
                                                            type='number'
                                                        />
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    <div className='w-[40%] mx-auto'>
                                                        <input
                                                            name="bonus_quantity"
                                                            onChange={(e) => purchasePriceHandler(e, i)}
                                                            value={test?.bonus_quantity}
                                                            style={{ width: '60px', margin: 'auto' }}
                                                            className='form-control form-control-sm text-center'
                                                            type='number'
                                                        />
                                                    </div>
                                                </td> */}
                                                <td>
                                                    {
                                                        test?.purchase_id ?
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(test?.id)}
                                                                className="btn  btn-sm action-btn">
                                                                <i className="far fa-trash"></i>
                                                            </button>
                                                            : <button
                                                                type="button"
                                                                onClick={() => removeTest(i)}
                                                                className="btn  btn-sm action-btn">
                                                                <i className="far fa-trash"></i>
                                                            </button>
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="mb-2 rx-one-button-group">
                        {
                            productInfo?.status === "Pending" && productInfo?.id ?
                                <>
                                    <button type='button' onClick={() => handleSave("Pending")} disabled={loading} className="btn float-end">
                                        {productInfo?.id ? 'Update' : 'Save'}
                                    </button>
                                    <button type='button' onClick={() => handleSave("Approved")} disabled={loading} className="btn float-end me-2">
                                        Approve
                                    </button>
                                </>
                                : productInfo?.id && productInfo?.status === "Approved" ?
                                    <></>
                                    :
                                    <>
                                        <button type='button' onClick={() => handleSave("Pending")} disabled={loading} className="btn float-end">
                                            {productInfo?.id ? 'Update' : 'Save'}
                                        </button>
                                    </>
                        }

                    </div>
                </Modal.Footer>
            </form>
        </Modal >

    )
}
