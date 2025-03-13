import React, { useEffect, useState } from "react";
import EmailSMSGatewaySidebar from "./EmailSMSGatewaySidebar";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import Button from "../../common/components/Button";
import axios from "axios";
import { Modal } from "../../common/components/Modal";
import { convertMonthToDate } from "./convertMonthToExDate";
import useCredentialURL from "../../hooks/useCredentialURL";
const packageData = [
  {
    id: 1,
    title: "Package 1",
    price: 100,
    currency: "BDT",
    services: [
      {
        name: "2400 SMS",
        description: "Send up to 2400 SMS messages",
        isTrue: true,
      },
      {
        name: "Expire Limit 30 days",
        description: "Package expires after 30 days",
        isTrue: true,
      },
      {
        name: "Voice Calls",
        description: "Voice calls within the network",
        isTrue: false,
      },
    ],
  },
  {
    id: 2,
    title: "Package 2",
    price: 200,
    currency: "BDT",
    services: [
      {
        name: "5000 SMS",
        description: "Send up to 5000 SMS messages",
        isTrue: true,
      },
      {
        name: "Expire Limit 2 Month",
        description: "Package expires after 2 Month",
        isTrue: true,
      },
      {
        name: "200 Voice Calls",
        description: "200 voice calls within the network",
        isTrue: true,
      },
    ],
  },
  {
    id: 3,
    title: "Package 3",
    price: 300,
    currency: "BDT",
    services: [
      {
        name: "10000 SMS",
        description: "Send up to 10000 SMS messages",
        isTrue: true,
      },
      {
        name: "Expire Limit 6 Months",
        description: "Package expires after 6 Months",
        isTrue: true,
      },
      {
        name: "Unlimited Voice Calls",
        description: "Unlimited voice calls within the network",
        isTrue: true,
      },
    ],
  },
];

const organization = JSON.parse(localStorage.getItem("userData"));
const SMSPackage = () => {
  const [packages, setPackages] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const { SaasAuthURL } = useCredentialURL();

  const fetchData = () => {
    axios
      .get(`${SaasAuthURL}/sms/get-active-sms-gateway`)
      .then((res) => {
        if (res.status === 200) {
          setPackages(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleBuyNow = (item) => {
    // Prepare data for payment
    const expire_date = convertMonthToDate(item?.duration);
    const data = {
      organization_id: organization?.organization_id,
      package_id: item?.id,
      organization_name: organization?.organization_name,
      phone_number: organization?.mobile,
      package_name: item?.title,
      buy_total_sms: item?.buy_sms_count,
      currency: item?.currency,
      expire_date: expire_date,
      email: organization?.email,
      organization_address: organization?.organization_address,
    };

    // Make a POST request to the backend to initiate payment
    axios
      .post(`${SaasAuthURL}/sms/pay-via-ajax-sms`, data)
      .then((res) => {
        // Extract payment gateway URL from response
        const paymentUrl = JSON.parse(res.data);
        console.log(paymentUrl.data);

        // Redirect to the payment gateway URL
        window.location.href = paymentUrl.data;
        // window.open(paymentUrl.data, "_blank");
      })
      .catch((err) => {
        console.error("Error initiating payment:", err);
        // Handle error
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <EmailSMSGatewaySidebar />
        </div>
        <div className="col-md-9 mt-2">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">SMS Package</h6>
            </div>
            <div className="card-body">
              <div className="row">
                {packages.length === 0 && (
                  <p className="text-center">No Package Found</p>
                )}
                {packages?.length > 0 &&
                  packages?.map((item, index) => {
                    return (
                      <div className="col-md-4">
                        <div key={index} className="card shadow-sm m-2">
                          <div className="card-header">
                            <h6 className="card-title text-center mb-0">
                              {item?.title}
                            </h6>
                            <h6 className="text-center">
                              {item.buy_sms_count} SMS
                            </h6>
                            <p className="card-text text-center">
                              {item?.currency + item?.price}/ for{" "}
                              {item?.duration === 12
                                ? "1 year"
                                : item?.duration}{" "}
                              {`${item?.duration === 1 ? "Month" : "Months"}`}
                            </p>
                            <div className="d-flex justify-content-center">
                              <Button
                                onClick={() => handleBuyNow(item)}
                                className={"text-center"}
                                style={{
                                  borderRadius: "5px",
                                }}
                              >
                                Buy Now
                              </Button>
                            </div>
                          </div>
                          <div
                            className="card-body"
                            style={{
                              minHeight: "150px",
                            }}
                          >
                            {item?.service_titles?.map((serve, i) => {
                              return (
                                <div
                                  key={i}
                                  className="d-flex align-items-center gap-2 card-text"
                                  title={serve?.description}
                                >
                                  {serve?.status ? (
                                    <IoMdCheckmarkCircleOutline color="green" />
                                  ) : (
                                    <RxCrossCircled color="red" />
                                  )}
                                  <p className=" mb-0">{serve.service_name}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSPackage;
