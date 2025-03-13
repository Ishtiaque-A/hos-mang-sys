//import { Table } from "react-bootstrap";
// import Barcode from "react-barcode";
import "./PrintLabAgentBilling.css";
import useUserData from "../../hooks/useUserData";
import moment from "moment";
import { numberToWordsTaka } from "../../utils/numberToWords";
import Barcode from "react-barcode";
import { getAge } from "../../utils/getAge";
const PrintLabAgentBilling = ({
  userInfo,
  tests,
  time,
  date,
  selected,
  center,
  specialDiscount,
  dueAmount,
  moneyReceipt,
  slipTitle = "Money Receipt",
}) => {
  const user = useUserData();
  const totalBill = tests?.reduce(
    (totalBill, current) => totalBill + Number(current.fee),
    0
  );
  // const discount = tests?.reduce(
  //   (totalDiscount, current) =>
  //     totalDiscount + (Number(current.fee) * Number(current.discount)) / 100,
  //   0
  // );

  // const totalDiscount = discount + parseFloat(specialDiscount || 0);
  const totalDiscount = parseFloat(specialDiscount || 0);
  const paidAmount = totalBill - (totalDiscount + parseFloat(dueAmount || 0));
  const formatNumber = (num) => {
    return typeof num === "number" && !isNaN(num)
      ? new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num)
      : "0.00";
  };
  const age = getAge(userInfo?.patient_dob);
  return (
    <div className="sales-invoice">
      <div style={{ margin: "25px" }} className="invoice-print">
        <div className="invoice-pharmacy-details d-flex gap-2 align-items-center justify-content-start">
          <img
            src={user?.organization_logo}
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
          <div className="text-center w-100">
            <h5 className="fw-bold">{user?.organization_name}</h5>
            <p className="text-justify text-center">
              {user?.organization_address}
              <span className="ms-2">
                Contact : {center?.mobile || ""}, {center?.phone || ""}
              </span>
            </p>
            <p>(A Computerized Diagnostic and Consultation Centre)</p>
          </div>
        </div>
        <div className="row  mt-3 mb-1">
          <div className="row col-8">
            <div className="col-6 d-flex align-items-center">
              {slipTitle === "Money Receipt" && <p className="p-0 m-0">
                Invoice No:
                <span>{moneyReceipt?.invoice_number || 10001}</span>
              </p>}
            </div>
            <div className="col-6 d-flex justify-content-center">
              <h4
                className="text-center py-1 px-3  m-0"
                style={{
                  border: "1px dashed gray",
                  borderRadius: "20px",
                  display: "inline-block",
                  fontSize: "14px",
                }}
              >
                {slipTitle}
              </h4>
            </div>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <div className="d-flex justify-content-end align-items-center">
              <span className="me-1">Date </span>
              <span
                style={{
                  width: "133px",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                :
                <span>
                  {" "}
                  {moment(moneyReceipt?.created_at).format(
                    "DD/MM/YYYY hh:mm A"
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="row" style={{ borderBottom: "1px dashed gray" }}>
          <div className="col-8">
            <p className="m-0 p-0">
              <span
                style={{
                  width: "100px",
                  display: "inline-block",
                }}
              >
                Patient Name
              </span>
              : {userInfo?.fullName || "N/A"}
            </p>
            <p className="m-0 p-0">
              <span
                style={{
                  width: "100px",
                  display: "inline-block",
                }}
              >
                Phone Number
              </span>
              : {userInfo?.patient_mobile_phone || "N/A"}
            </p>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-end">
              <div>
                <p className="m-0 p-0">
                  <span
                    style={{
                      width: "40px",
                      display: "inline-block",
                    }}
                  >
                    Age
                  </span>
                  : {age}
                </p>
                <p className="m-0 p-0">
                  <span
                    style={{
                      width: "40px",
                      display: "inline-block",
                    }}
                  >
                    Sex
                  </span>
                  : {userInfo?.patient_birth_sex?.birth_sex_name || ""}
                </p>
              </div>
            </div>
          </div>

          <div className=" d-flex w-100">
            <div>
              <p style={{ width: "105px" }}>
                <span style={{ width: "100px" }} className="d-inline-block">
                  Referred By
                </span>
                :
              </p>
            </div>
            <div>
              <p>
                <span className="">
                  {selected?.fullName
                    ? `${selected?.title?.title_name || ""} ${selected?.fullName || ""
                    }  ${selected?.academic
                      ?.map((item) => item?.degree_id)
                      .join(", ")}`
                    : selected}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="invoice-item-table">
          <table>
            <tr className="invoice-border-dashed">
              <td colSpan={1}>SL </td>
              <td colSpan={4}>Test Name</td>
              {/* <td>Rate</td> */}
              <td className="text-end">Test Cost</td>
            </tr>
            {tests?.map((item, i) => (
              <tr key={i} className="invoice-border-dashed-top">
                <td className="text-start" colSpan={1}>
                  {i + 1}
                </td>
                <td className="text-start" colSpan={4}>
                  {item.testName}
                </td>
                {/* <td className="text-start">{item.fee}</td> */}
                <td className="text-end">
                  {formatNumber(parseFloat(item.fee))}
                </td>
              </tr>

            ))}
            <tr className="invoice-border-dashed-top">
              <td rowSpan={5} colSpan={4}>
                <p
                  style={{ marginTop: "-25px", fontSize: "12px" }}
                  className="p-0"
                >
                  {/* Amount In Words :{" "} */}
                  In Words : {numberToWordsTaka(parseFloat(paidAmount || 0))}
                  <span className=""> Only</span>
                </p>
                {dueAmount > 0 && (
                  <div className=" d-flex justify-content-center align-items-center">
                    <p
                      style={{
                        fontSize: "20px",
                        whiteSpace: "nowrap",
                        margin: "0",
                        padding: "0",
                        marginTop: "27px",
                      }}
                    >
                      Due Amount :
                      <span className="ms-1">
                        {formatNumber(parseFloat(dueAmount))}
                      </span>
                    </p>
                  </div>
                )}
              </td>
              <td colSpan={1} className="text-end">
                Sub Total :
              </td>
              <td className="text-end">
                {formatNumber(parseFloat(totalBill))}{" "}
              </td>
            </tr>
            <tr>
              <td colSpan={1} className="text-end">
                Discount :
              </td>
              <td className="text-end">
                {formatNumber(parseFloat(totalDiscount))}
              </td>
            </tr>

            <tr className="invoice-border-dashed-top">
              <td colSpan={1} className="text-end">
                Bill Total :
              </td>
              <td className="text-end">
                {formatNumber(parseFloat(totalBill - totalDiscount))}
              </td>
            </tr>
            <tr className="invoice-border-dashed-top">
              <td colSpan={1} className="text-end">
                Paid :
              </td>
              <td className="text-end">
                {formatNumber(parseFloat(paidAmount))}{" "}
              </td>
            </tr>
            {dueAmount > 0 && (
              <tr className="invoice-border-dashed-top">
                <td colSpan={1} className="text-end">
                  Due :
                </td>
                <td className="text-end">
                  {formatNumber(parseFloat(dueAmount))}
                </td>
              </tr>
            )}
          </table>
        </div>
        <div className="d-flex invoice-creator justify-content-between mt-4">
          <p>
            Delivery Date: {moment(date).format("DD/MM/YYYY")} -
            {moment(time, "HH:mm:ss").format("hh A")}
          </p>
          <p>Posted : {user?.name} </p>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-2">
          <Barcode
            displayValue="false"
            lineColor="#333333"
            width={2}
            height={20}
            value={moneyReceipt?.invoice_number || 10001}
          />
        </div>
      </div>
    </div>
  );
};

export default PrintLabAgentBilling;
