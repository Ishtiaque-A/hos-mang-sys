import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useCredentialURL from "./useCredentialURL";

const useSendSMSAPI = () => {
  const [status, setStatus] = useState({
    complete: false,
    loading: false,
    error: false,
    message: "",
  });
  const { SaasAuthURL } = useCredentialURL();
  const sendSMSAPI = async (mobile, sms) => {
    setStatus({
      complete: false,
      loading: true,
      error: false,
      message: "",
    });
    try {
      const res = await axios.post(SaasAuthURL + "/sms/send-sms", {
        number: mobile,
        message: sms,
      });
      if (res.status === 200) {
        setStatus({
          complete: true,
          loading: false,
          error: false,
          message: res?.data?.message || "Message sent successfully",
        });
        toast.success(res?.data?.message || "Message sent successfully");
      } else {
        setStatus({
          complete: false,
          loading: false,
          error: true,
          message: res?.data?.message || "Something went wrong",
        });
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      setStatus({
        complete: false,
        loading: false,
        error: true,
        message: error?.response?.data?.error || "Something went wrong",
      });
      console.log(error.response, "response error");
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  return { sendSMSAPI, status };
};

export default useSendSMSAPI;
