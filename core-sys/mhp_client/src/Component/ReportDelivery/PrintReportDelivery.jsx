import Barcode from "react-barcode";
import useUserData from "../../hooks/useUserData";
const PrintLabAgentBilling = ({ userInfo, tests, invoice, invoiceNo }) => {
  const totalBill = tests.reduce(
    (totalBill, current) => totalBill + Number(current.fee),
    0
  );
  const discountTotal = tests.reduce(
    (totalDiscount, current) =>
      totalDiscount + (Number(current.fee) * Number(current.discount)) / 100,
    0
  );
  const user = useUserData();
  console.log(tests);
  return (
    <div className="delivery-invoice">
      <div style={{ padding: "60px" }} className="delivery-print">
        <div className="invoice-pharmacy-details d-flex justify-content-center">
          {/* <div className="text-center">
            <h5>Al Shifa Pharmacy</h5>
            <p>Location : Lalbagh</p>
            <p>Tel : 0171238765</p>
            <p>Vat Reg No :534565 </p>
          </div> */}
          <div className="invoice-pharmacy-details d-flex gap-2 align-items-center justify-content-start">
            <img
              src={user?.organization_logo}
              alt="logo"
              style={{ width: "80px", height: "80px" }}
            />
            <div className="text-start">
              <h5>{user?.organization_name}</h5>
              <p>
                {user?.organization_address}{" "}
                <span>Tel : {user?.organization_mobile}</span>
              </p>
              <p>(A Computerized Diagnostic and Consultation Centre)</p>
            </div>
          </div>
        </div>
        <div className="row agent-details mb-3">
          <div className="col-6">
            <p>Patient Name : {invoice?.patient_first_name}</p>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div>
              <p>Patient Phone : {invoice?.patient_mobile_phone}</p>
            </div>
          </div>
        </div>
        <div className="invoice-date d-flex justify-content-between invoice-border-dashed">
          <p>Invoice No : 1000354 </p>
          <p>Date : {new Date().toLocaleDateString("en-GB")} </p>
        </div>
        <div className="invoice-item-table">
          <table>
            <tr className="invoice-border-dashed">
              <td>Code</td>
              <td>Name</td>
              <td>Rate</td>
              <td className="text-end">Total</td>
            </tr>
            {tests.map((item, i) => (
              <tr key={i}>
                <td>{item.testCode}</td>
                <td className="text-start">{item.testName}</td>
                <td className="text-start">{item.fee}</td>
                {/* <td className='text-end'>{Number(item.fee) - ((Number(item.fee) * Number(item.discount)) / 100)}</td> */}
                <td className="text-end">{Number(item.fee)}</td>
              </tr>
            ))}
            <tr className="invoice-border-dashed-top">
              <td colSpan={3} className="text-end">
                Sub Total :{" "}
              </td>
              <td className="text-end">{totalBill} </td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end">
                VAT / TAX :{" "}
              </td>
              <td className="text-end">0</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end">
                Discount :{" "}
              </td>
              <td className="text-end">{discountTotal}</td>
            </tr>

            <tr className="invoice-border-dashed-top">
              <td colSpan={3} className="text-end">
                Bill Total :{" "}
              </td>
              <td className="text-end">{totalBill - discountTotal} </td>
            </tr>
          </table>
        </div>
        <div className="d-flex invoice-creator justify-content-between mt-1">
          <p>Provided By: Cashier</p>
          <p>Time : {new Date().toLocaleTimeString()}</p>
        </div>
        <div className="invoice-greeting d-flex justify-content-center align-items-center">
          <Barcode
            displayValue="false"
            height="30"
            width="2"
            value={invoiceNo}
          />
        </div>
        <div className="d-flex justify-content-center branding-section">
          <p>Thank You</p>
        </div>
        <div className="branding-section">
          <p>Technology Partner Zaimah Technologies Ltd.</p>
        </div>
      </div>
    </div>
  );
};

export default PrintLabAgentBilling;
