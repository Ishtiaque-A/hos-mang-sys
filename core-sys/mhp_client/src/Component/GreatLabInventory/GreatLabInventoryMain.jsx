import MaterialTable, { MTableToolbar } from "material-table";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
function GreatLabInventoryMain() {
  const location = useLocation();
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
      render: (row) => <div className="text-center">{row?.product?.name}</div>,
      cellStyle: {
        // whiteSpace: 'nowrap',
        textAlign: "center",
      },
    },

    {
      title: "Booth",
      field: `manufacturer`,
      render: (row) => <div className="text-center">{row?.booth?.name}</div>,
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
      render: (row) => <>{parseFloat(row?.price || 0).toFixed(2)}</>,

      cellStyle: {
        textAlign: "center",
      },
    },

    {
      title: "Total Price",
      field: `unit`,
      render: (row) => (
        <>{(parseFloat(row?.price) * parseInt(row?.quantity)).toFixed(2)}</>
      ),

      cellStyle: {
        textAlign: "center",
      },
    },
  ];
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
      render: (row) => <div className="text-center">{row?.product?.name}</div>,
      cellStyle: {
        // whiteSpace: 'nowrap',
        textAlign: "center",
      },
    },
    {
      title: "Branch",
      field: `manufacturer`,
      render: (row) => (
        <div className="text-center">
          {
            allBranch?.find(
              (item) => Number(item?.id) === Number(row?.branch_id)
            )?.name
          }
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Location",
      field: `manufacturer`,
      render: (row) => <div className="text-center">{row?.location?.name}</div>,
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
        <p className="text-center">
          {row?.stock_in?.length > 0
            ? row?.stock_in
                ?.filter(
                  (item) =>
                    Number(item?.location_id) === Number(row?.location_id)
                )
                ?.reduce((a, b) => a + parseInt(b?.quantity || 0), 0)
            : 0}
        </p>
      ),
    },
    {
      title: "Stock Out",
      render: (row) => (
        // <p>{row.stock_out_sum_pcs ? row.stock_out_sum_pcs : 0}</p>
        <p className="text-center">
          {row?.stock_out?.length > 0
            ? row?.stock_out
                ?.filter(
                  (item) =>
                    Number(item?.location_id) === Number(row?.location_id)
                )
                ?.reduce((a, b) => a + parseInt(b?.quantity || 0), 0)
            : 0}
        </p>
      ),
    },
    {
      title: "Stock",
      render: (row) => (
        <p className="text-center">
          {parseFloat(row?.stock || 0) + parseFloat(row?.bonus_qty || 0)}
        </p>
      ),
      cellStyle: {
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
      },
    },
    {
      title: "PP",
      field: `unit`,
      render: (row) => <>{parseFloat(row?.price || 0).toFixed(2)}</>,

      cellStyle: {
        textAlign: "center",
      },
    },

    {
      title: "Total Price",
      field: `unit`,
      render: (row) => (
        <>
          {(
            (parseFloat(row?.price) + parseFloat(row.vat ? row?.vat : 0)) *
            parseInt(row?.stock)
          ).toFixed(2)}
        </>
      ),

      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const columnsCentral = [
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
      render: (row) => <div className="text-center">{row?.product?.name}</div>,
      cellStyle: {
        // whiteSpace: 'nowrap',
        textAlign: "center",
      },
    },

    {
      title: "Opening Stock",
      field: `manufacturer`,
      render: (row) => <div className="text-center">{row?.opening_stock}</div>,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Stock In",
      field: `manufacturer`,
      render: (row) => (
        <div className="text-center">{row?.in_sum_quantity}</div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Stock Out",
      render: (row) => (
        // <p>{row.stock_out_sum_pcs ? row.stock_out_sum_pcs : 0}</p>
        <p className="text-center">{row?.out_sum_quantity}</p>
      ),
    },
    {
      title: "Stock",
      render: (row) => (
        <p className="text-center">
          {parseFloat(row?.stock || 0) + parseFloat(row?.bonus_qty || 0)}
        </p>
      ),
      cellStyle: {
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
      },
    },
    {
      title: "Bonus Qty",
      field: `bonus_qty`,
      // cellStyle: {
      //     textAlign: "center",
      // },
    },
    // {
    //     title: "Unit",
    //     field: `unit`,

    //     cellStyle: {
    //         textAlign: "center",
    //     },
    // },
    {
      title: "PP",
      field: `unit`,
      render: (row) => <>{parseFloat(row?.price || 0).toFixed(2)}</>,

      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Vat",
      field: `unit`,
      render: (row) => <>{parseFloat(row?.vat ? row?.vat : 0).toFixed(2)}</>,

      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Total Price",
      field: `unit`,
      render: (row) => (
        <>
          {(
            (parseFloat(row?.price) + parseFloat(row.vat ? row?.vat : 0)) *
            parseInt(row?.stock)
          ).toFixed(2)}
        </>
      ),

      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const user = useUserData();
  const [sortedCentralData, setSortedCentralData] = useState([]);
  const [centralData, setCentralData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [data, setData] = useState([]);
  const [sortedBoothData, setSortedBoothData] = useState([]);
  const [boothData, setBoothData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetchStock, setRefetchStock] = useState(false);
  const [locations, setLocations] = useState([]);
  const [booths, setBooths] = useState([]);
  const { SaasAuthURL } = useCredentialURL();
  const [allBranch, setAllBranch] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("/great-lab-central-stock").then((res) => {
      setCentralData(res?.data?.stock);
      setSortedCentralData(res?.data?.stock);
      setLoading(false);
    });
    axios.get("/great-lab-stock").then((res) => {
      setData(res?.data?.stock);
      setSortedData(res?.data?.stock);
    });
    axios.get("great-lab-stock-location").then((res) => {
      setLocations(res?.data?.booths || []);
    });
    axios.get("great-lab-booth-stock").then((res) => {
      setSortedBoothData(res?.data?.data || []);
      setBoothData(res?.data?.data || []);
    });
    axios.get("great-lab-booth").then((res) => {
      setBooths(res?.data?.booths || []);
    });
    axios
      .get(`${SaasAuthURL}/branch/organization/${user?.organization_id}`)
      .then((res) => {
        if (res.status === 200) {
          setAllBranch(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [refetchStock]);
  const handleCentralFilter = (e) => {
    if (e.id === "all") {
      setSortedData(data);
    } else {
      setSortedData(
        data?.filter((item) => Number(item?.branch_id) === Number(e?.id))
      );
    }
  };
  const handleBoothFilter = (e) => {
    if (e.id === "all") {
      setSortedBoothData(boothData);
    } else {
      setSortedBoothData(
        boothData?.filter((item) => Number(item?.booth_id) === Number(e?.id))
      );
    }
  };
  return (
    <div className="home-main mt-2 ms-2">
      <div className="ms-1">
        <div className="row">
          <div className="custom-card">
            <h5 className="p-2">Smart Lab Inventory</h5>
          </div>
          <div className="main-pan mt-2 ">
            <div className="row">
              <div className="col-md-2" style={{ cursor: "pointer" }}>
                {/* <div className='custom-card'> */}
                {/* <div className='card-body g-doc-scroll'> */}
                <ul className="setup-list">
                  <div className="custom-card p-2 mb-2">
                    <h6>Central Stock</h6>
                    <li className="">
                      <Link
                        to="/great-lab-inventory"
                        className={`${
                          location.pathname === "/great-lab-inventory"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>Current
                        Stock
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-purchase-in"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-purchase-in"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>Purchase
                        Order
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-stock-in"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-stock-in"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>Stock In
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="central-stock-out"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/central-stock-out"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Requisition From Branch
                      </Link>
                    </li>
                  </div>
                  <div className="custom-card p-2 mb-2">
                    <h6>All Setup</h6>
                    <li className="">
                      <Link
                        to="lab-stock-location"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-stock-location"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>Stock
                        Location
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-inventory-products"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-inventory-products"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Inventory Products
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-product-category"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-product-category"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>{" "}
                        Category
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-product-sub-category"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-product-sub-category"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i> Sub
                        Category
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-suppliers"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-suppliers"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Suppliers
                      </Link>
                    </li>
                  </div>
                  <div className="custom-card p-2 mb-2">
                    <h6>Branches</h6>
                    <li className="">
                      <Link
                        to="lab-branch"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-branch"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Branches
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-branch-requisition"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-branch-requisition"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Requisition
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-branch-stock"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-branch-stock"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Stock
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-branch-stock-out"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-branch-stock-out"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Requisition From Booth
                      </Link>
                    </li>
                  </div>
                  <div className="custom-card p-2">
                    <h6>Booths</h6>
                    <li className="">
                      <Link
                        to="lab-booth"
                        className={`${
                          location.pathname === "/great-lab-inventory/lab-booth"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Booths
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-booth-requisition"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-booth-requisition"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Requisition
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="lab-booth-stock"
                        className={`${
                          location.pathname ===
                          "/great-lab-inventory/lab-booth-stock"
                            ? "active-menu"
                            : ""
                        } text-decoration-none set-up-btn`}
                      >
                        <i className="fas menu-icon fa-plus-circle"></i>
                        Stock
                      </Link>
                    </li>
                  </div>
                  {/* <li className=''>
                                        <Link
                                            to='lab-stock-in-report'
                                            className={`${location.pathname ===
                                                '/great-lab-inventory/lab-stock-in-report'
                                                ? 'active-menu'
                                                : ''
                                                } text-decoration-none set-up-btn`}
                                        >
                                            <i className='fas menu-icon fa-plus-circle'></i>Stock In Report
                                        </Link>
                                    </li>
                                    <li className=''>
                                        <Link
                                            to='lab-stock-out-report'
                                            className={`${location.pathname ===
                                                '/great-lab-inventory/lab-stock-out-report'
                                                ? 'active-menu'
                                                : ''
                                                } text-decoration-none set-up-btn`}
                                        >
                                            <i className='fas menu-icon fa-plus-circle'></i>Stock Out Report
                                        </Link>
                                    </li> */}
                </ul>
                {/* </div> */}
                {/* </div> */}
              </div>
              <div className="col-md-10">
                {location.pathname === "/great-lab-inventory" && (
                  <>
                    <div className="shadow-sm p-2 mb-2 bg-body rounded">
                      <div className="cns-container">
                        <ul
                          class="nav nav-pills mb-3"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link active"
                              id="pills-setting-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-setting"
                              type="button"
                              role="tab"
                              aria-controls="pills-setting"
                              aria-selected="false"
                            >
                              Central Stock
                            </button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link "
                              id="pills-home-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              type="button"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="true"
                            >
                              Branch Stock
                            </button>
                          </li>
                          <li class="nav-item" role="presentation">
                            <button
                              class="nav-link"
                              id="pills-profile-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-profile"
                              type="button"
                              role="tab"
                              aria-controls="pills-profile"
                              aria-selected="false"
                            >
                              Booth Stock
                            </button>
                          </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                          <div
                            class="tab-pane fade show active"
                            id="pills-setting"
                            role="tabpanel"
                            aria-labelledby="pills-setting-tab"
                          >
                            <MaterialTable
                              columns={columnsCentral}
                              data={centralData}
                              isLoading={loading}
                              options={{
                                search: true,
                                showTitle: false,
                                searchFieldAlignment: "left",
                                pageSize: 10,
                                emptyRowsWhenPaging: false,
                                pageSizeOptions: [10, 20, 50, 100],
                              }}
                            />
                          </div>
                          <div
                            class="tab-pane fade"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                          >
                            <MaterialTable
                              columns={columns}
                              data={sortedData}
                              isLoading={loading}
                              components={{
                                Toolbar: (props) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div>
                                      <MTableToolbar {...props} />
                                    </div>
                                    <div
                                      style={{ width: "200px" }}
                                      className="me-1"
                                    >
                                      {/* <Select
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
                                                                                /> */}
                                      <Select
                                        options={[
                                          { id: "all", name: "All" },
                                          ...allBranch,
                                        ]}
                                        onChange={(e) => handleCentralFilter(e)}
                                        getOptionLabel={(data) =>
                                          `${data?.name}`
                                        }
                                        getOptionValue={(data) => `${data?.id}`}
                                        styles={{
                                          menu: (provided) => ({
                                            ...provided,
                                            maxHeight: "200px", // Set a maximum height for the dropdown menu
                                            overflowY: "auto", // Enable vertical scrolling
                                            "::-webkit-scrollbar": {
                                              width: "6px",
                                            },
                                            "::-webkit-scrollbar-thumb": {
                                              background: "gray",
                                              borderRadius: "10px",
                                            },
                                            zIndex: "100",
                                          }),
                                        }}
                                      />
                                    </div>
                                  </div>
                                ),
                              }}
                              options={{
                                search: true,
                                showTitle: false,
                                searchFieldAlignment: "left",
                                pageSize: 10,
                                emptyRowsWhenPaging: false,
                                pageSizeOptions: [10, 20, 50, 100],
                              }}
                            />
                          </div>
                          <div
                            class="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                          >
                            <MaterialTable
                              columns={columnsBooth}
                              data={sortedBoothData}
                              isLoading={loading}
                              components={{
                                Toolbar: (props) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div>
                                      <MTableToolbar {...props} />
                                    </div>
                                    <div
                                      style={{ width: "200px" }}
                                      className="me-1"
                                    >
                                      <Select
                                        options={[
                                          { id: "all", name: "All" },
                                          ...booths,
                                        ]}
                                        onChange={(e) => handleBoothFilter(e)}
                                        getOptionLabel={(data) =>
                                          `${data?.name}`
                                        }
                                        getOptionValue={(data) => `${data?.id}`}
                                        styles={{
                                          menu: (provided) => ({
                                            ...provided,
                                            maxHeight: "200px", // Set a maximum height for the dropdown menu
                                            overflowY: "auto", // Enable vertical scrolling
                                            "::-webkit-scrollbar": {
                                              width: "6px",
                                            },
                                            "::-webkit-scrollbar-thumb": {
                                              background: "gray",
                                              borderRadius: "10px",
                                            },
                                            zIndex: "100",
                                          }),
                                        }}
                                      />
                                    </div>
                                  </div>
                                ),
                              }}
                              options={{
                                search: true,
                                showTitle: false,
                                searchFieldAlignment: "left",
                                pageSize: 10,
                                emptyRowsWhenPaging: false,
                                pageSizeOptions: [10, 20, 50, 100],
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Outlet context={[refetchStock, setRefetchStock]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GreatLabInventoryMain;
