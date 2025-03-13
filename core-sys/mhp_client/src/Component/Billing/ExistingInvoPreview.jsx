import React, { useEffect, useState } from 'react'
import './InvoicePreview.css'
import logo from '../../../src/Images/billing-logo.png';
import axios from 'axios';

export default function ExistingInvoPreview(props) {

    const {patient_first_name,patient_last_name,patient_email,patient_address1}=props.patientInvoiceData.patient_id
    const {invoice_number,issued_date,payment_amount,total_bill_amount}=props.patientInvoiceData
 
    useEffect(() => {
     props.setprintLoding(false)
    }, [props.patientInvoiceData])
    
    return (
    <>
    <div className='MainBody'>
        <header className="HeaderInvoice clearfix">
            <div id="logo">
                <img src={logo} />
            </div>
            <div id="company">
                <h2 className="name">Macrohealth Plus</h2>
                <div>455 Foggy Heights, AZ 85004, US</div>
                <div>(602) 519-0450</div>
                <div><a className='invoiceLink' href="mailto:invoice@macrohelthplus.org">invoice@macrohelthplus.org</a></div>
            </div>
        </header>
        <main>
            <div id="details" className="clearfix">
                <div id="client">
                    <div className="to">INVOICE TO:</div>
                    <h2 className="name">{patient_first_name} {patient_last_name}</h2>
                    <div className="address">{patient_address1}</div>
                </div>
                <div id="invoice">
                    <h1>{invoice_number}</h1>
                    <div className="date">Date of Invoice: {issued_date}</div>
                    <div className="date">Due Date: {issued_date}</div>
                </div>
            </div>
            <table className='invoiceTable' border={0} cellSpacing={0} cellPadding={0}>
                <thead>
                    <tr>
                        <th className="no">Item Code</th>
                        <th className="no">DESCRIPTION</th>
                        <th className="no">PRICE</th>
                        <th className="no">QUANTITY</th>
                        <th className="no">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                {
                        props.invoiceBilling.map((bill,i) => {
                            return(
                                <tr key={i}>
                                <td className="">{bill.item_code}</td>
                                <td className="">{bill.item_details}</td>
                                <td className="">{bill.rate}</td>
                                <td className="">{bill.qty == null ? 1 : bill.qty}</td>
                                <td className="">{bill.total}</td>
                            </tr>
                            )
                        })
                    }
                   
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2} />
                        <td colSpan={2}>SUBTOTAL</td>
                        <td>{total_bill_amount}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} />
                        <td colSpan={2}>TAX</td>
                        <td>0</td>
                    </tr>
                    
                    <tr>
                        <td colSpan={2} />
                        <td colSpan={2}>GRAND TOTAL</td>
                        <td>{total_bill_amount} BDT</td>
                    </tr>
                </tfoot>
            </table>
            <div id="thanks">Thank you!</div>
            <div id="notices">
                <div>NOTICE:</div>
                <div className="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
            </div>
        </main>
        <footer>
            Invoice was created on a computer and is valid without the signature and seal.
        </footer>
    </div>

</>
  )
}
