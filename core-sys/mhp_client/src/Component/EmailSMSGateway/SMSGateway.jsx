import React, { useEffect, useState } from "react";
import EmailSMSGatewaySidebar from "./EmailSMSGatewaySidebar";
import Button, { Loading } from "../../common/components/Button";
import ReactSelect, { components as Base } from "react-select";
import { countryCode } from "../../data/countryCode";
import Input from "../../common/components/Input";
import Toggle from "../../common/components/Toggle";
import { PiTrash } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import "./emailSMSgateway.css";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { NewModal as Modal } from "../../common/components/NewModal";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
const labelStyles = {
  fontSize: "16px",
  display: "inline-block",
  marginLeft: "0px",
  marginRight: "20px",
  marginBottom: "2px",
};

function generateUniqueId() {
  const randomNumber = Math.floor(Math.random() * 9000000) + 1000000; // Generate random 7-digit number
  return randomNumber;
}

const parameter = {
  key: null,
  value: null,
  id: "",
};

const gatewayOptions = [
  {
    label: "BoomCast",
    value: "BOOMCAST",
  },
  {
    label: "Infobip",
    value: "INFOBIP",
  },
  {
    label: "Alpha Net",
    value: "ALPHANET",
  },
];
const url = null;
const emptyValues = {
  uid: generateUniqueId(),
  name: null,
  provider_name: null,
  gateway_type: null,
  allowed_countries: [],
  is_api_type_parameter: false,
  url: url,
  user_name: null,
  password: null,
  authorization: null,
  from: null,
  api_credential: {
    parameters: [parameter],
  },
  status: false,
  message: null,
};

export const ReactSelectStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  menuPortal: (base) => ({
    ...base,
    borderRadius: "10px",
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "white",
    margin: "0px",
    padding: "0px",
    overflowX: "hidden",
    overflowY: "auto",
    maxHeight: "250px",
    // padding: "5px",
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#cccccc",
      borderRadius: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#fcfcfc",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#cccccc #fcfcfc",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected || state.isFocused ? "#69B128" : provided.color,
    backgroundColor:
      state.isSelected || state.isFocused
        ? " #fcfcfc"
        : provided.backgroundColor,
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#69B128" : provided.borderColor,
    boxShadow: state.isFocused ? "0 0 0 1px #69B128" : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "#69B128" : provided.borderColor,
    },
  }),
};

const SMSGateway = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [fromValues, setFromValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { SaasAuthURL } = useCredentialURL();

  const onRefetch = () => setRefetch(!refetch);

  useEffect(() => {
    const abort = new AbortController();
    const getGateway = async () => {
      const response = await axios.post(SaasAuthURL + "/sms/sms-gateway");
      // console.log(response.data, "gateway");
      if (response.data) {
        const modifiedData = response?.data?.map((item) => {
          return {
            ...item,
            api_credential: {
              parameters: item.credentials || [],
            },
            allowed_countries:
              item.countries?.map((item) => ({
                ...item,
                label: item.name,
                value: item.name,
              })) || [],
            status: item.status === 1 ? true : false,
            is_api_type_parameter:
              item.is_api_type_parameter === 1 ? false : true,
          };
        });
        setFromValues([...modifiedData]);
      }
    };
    getGateway();
    return () => {
      abort.abort();
    };
  }, [refetch]);

  const handleAddGateway = () => {
    const id = generateUniqueId();
    const newData = {
      ...emptyValues,
      uid: id,
    };
    setFromValues((prev) => [newData, ...prev]);
  };

  const handleTestGateway = async (event) => {
    event.preventDefault();
    const mobile = phoneNumber;
    const message = event.target.message.value;

    if (!mobile) {
      toast.error("Please enter mobile number");
      return;
    }
    const data = {
      mobile: mobile,
      sms: message,
    };
    setIsLoading(true);

    try {
      const res = await axios.post(SaasAuthURL + "/sms/test-helper", data);

      if (res.status === 200) {
        toast.success(res?.data?.message || "Message sent successfully");
        event.target.reset();
      } else {
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Modal size="sm" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header onClose={() => setIsOpen(false)}>
          <Modal.Title>Test SMS Gateway</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleTestGateway}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="mobile" className="form-label">
                Phone <span className="text-danger">*</span>
              </label>
              <div>
                <PhoneInput
                  className="form-control"
                  defaultCountry="us"
                  placeholder="Enter Phone number"
                  style={{
                    width: "100%",
                  }}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message <span className="text-danger">*</span>
              </label>
              <div>
                <textarea
                  required
                  className="form-control"
                  cols={"30"}
                  rows={"10"}
                  id="message"
                  name="message"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button isLoading={isLoading} disabled={isLoading} type="submit">
              Test
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className="row">
        <div className="col-md-3">
          <EmailSMSGatewaySidebar />
        </div>
        <div className="col-md-9 mt-2">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">SMS Gateway Setup</h6>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <Button onClick={() => setIsOpen(true)}>Test Gateway</Button>
                <Button onClick={handleAddGateway}>Add Gateway</Button>
              </div>
              <div className="mt-3 d-flex flex-column gap-3">
                {fromValues.length === 0 && (
                  <p className="text-center">Gateway not found</p>
                )}
                {fromValues?.length > 0 &&
                  fromValues?.map((value) => {
                    return (
                      <GatewayCard
                        key={value?.uid}
                        value={value}
                        fromValues={fromValues}
                        setFromValues={setFromValues}
                        onRefetch={onRefetch}
                      />
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

export default SMSGateway;

const GatewayCard = ({ setFromValues, fromValues, onRefetch, value }) => {
  const [loadingState, setLoadingState] = useState({
    submitting: false,
    testing: false,
    isStatus: false,
  });
  const [countryValidationError, setCountryValidationError] = useState({
    status: false,
    uid: null,
  });
  const userData = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  // useEffect(()=>{

  // },[value.id])

  const handleSubmitFrom = async (e) => {
    e.preventDefault();
    if (value?.allowed_countries?.length === 0) {
      setCountryValidationError({ status: true, uid: value.uid });
      return;
    }
    const modifiedValue = {
      ...value,
      status: value.status ? 1 : 0,
      is_api_type_parameter: !value?.is_api_type_parameter ? 1 : 0,
      countries: value?.allowed_countries || [],
      parameter: value?.api_credential?.parameters || [],
      user_id: userData?.s_uid,
    };

    setLoadingState({ ...loadingState, submitting: true });
    try {
      if (value?.id) {
        const res = await axios.post(
          SaasAuthURL + `/sms/update-sms-gateway/${value?.id}`,
          modifiedValue
        );
        if (res?.data?.status === 200) {
          toast.success("Gateway updated successfully");
          onRefetch();
        } else {
          toast.error("Something went wrong");
        }
      } else {
        const res = await axios.post(
          SaasAuthURL + "/sms/save-sms-gateway",
          modifiedValue
        );
        if (res?.data?.status === 200) {
          toast.success("Gateway added successfully");
          onRefetch();
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState({ ...loadingState, submitting: false });
    }

    console.log(modifiedValue, "currentValues");
  };

  const handleOnchange = ({ id, name, inputValue }) => {
    setFromValues(
      fromValues.map((v) => {
        if (v.uid === id) {
          return {
            ...v,
            [name]: inputValue,
          };
        } else {
          return v;
        }
      })
    );
  };

  const handleRemoveItem = (id) => {
    setFromValues((prev) => {
      return [...prev.filter((v) => v.uid !== id)];
    });
  };

  const handleCheckParametersOrUrl = ({ id, inputValue }) => {
    setFromValues((prevValues) =>
      prevValues.map((v) =>
        v.uid === id ? { ...v, is_api_type_parameter: inputValue === "url" } : v
      )
    );
  };

  const handleToggleStatus = ({ id, isTrue }) => {
    setFromValues((prevValues) => {
      return prevValues.map((v) => {
        if (v.uid === id) {
          return {
            ...v,
            status: isTrue,
          };
        } else {
          return {
            ...v,
            status: isTrue ? false : v.status,
          };
        }
      });
    });
    if (value?.id) {
      handleCallStatusFromBackend({ id: value?.id, status: isTrue });
    }
  };

  const handleCallStatusFromBackend = async ({ id, status }) => {
    setLoadingState({ ...loadingState, isStatus: true });
    try {
      const res = await axios.post(
        SaasAuthURL + `/sms/update-sms-gateway-status/${id}`,
        {
          status: status ? 1 : 0,
        }
      );
      if (res?.data?.status === 200) {
        onRefetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState({ ...loadingState, isStatus: false });
    }
  };

  const handleAddParams = (id) => {
    setFromValues((prevValues) => {
      return prevValues.map((v) => {
        if (v.uid === id) {
          return {
            ...v,
            api_credential: {
              ...v.api_credential,
              parameters: [...v.api_credential.parameters, parameter],
            },
          };
        } else {
          return v;
        }
      });
    });
  };
  const handleRemoveParams = ({ id, index }) => {
    const gateway = fromValues.find((v) => v.uid === id);
    if (gateway) {
      const isParameterExist = gateway?.api_credential?.parameters?.find(
        (p, i) => i === index
      );
      if (isParameterExist.id) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085D6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                SaasAuthURL + `/sms/delete-sms-param/${isParameterExist.id}`
              )
              .then((res) => {
                if (res.data.status === 200) {
                  setFromValues((prevValues) => {
                    return prevValues.map((v) => {
                      if (v.uid === id) {
                        return {
                          ...v,
                          api_credential: {
                            ...v.api_credential,
                            parameters: v.api_credential.parameters.filter(
                              (item) => item.id !== isParameterExist.id
                            ),
                          },
                        };
                      } else {
                        return v;
                      }
                    });
                  });
                } else {
                  toast.error("Something went wrong");
                }
              });
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Deleted!",
              text: "Your data has been deleted.",
              timer: 2500,
            });
          }
        });
      } else {
        setFromValues((prevValues) => {
          return prevValues.map((v) => {
            if (v.uid === id) {
              return {
                ...v,
                api_credential: {
                  ...v.api_credential,
                  parameters: v.api_credential.parameters.filter(
                    (_, i) => i !== index
                  ),
                },
              };
            } else {
              return v;
            }
          });
        });
      }
    }
  };

  const handleChangeParameter = ({ id, index, name, inputValue }) => {
    setFromValues((prevValues) => {
      return prevValues.map((v) => {
        if (v.uid === id) {
          return {
            ...v,
            api_credential: {
              ...v.api_credential,
              parameters: v.api_credential.parameters.map((p, i) => {
                if (i === index) {
                  return {
                    ...p,
                    [name]: inputValue,
                  };
                } else {
                  return p;
                }
              }),
            },
          };
        } else {
          return v;
        }
      });
    });
  };
  // console.log(value);
  const handleChangeSelectedCountry = (selectValue, id) => {
    console.log(selectValue, "selectValue");
    if (selectValue.length > value?.allowed_countries.length) {
      setFromValues((prevValues) => {
        return prevValues.map((v) => {
          if (v.uid === id) {
            return {
              ...v,
              allowed_countries: selectValue,
            };
          } else {
            return v;
          }
        });
      });
    } else {
      const existing = [...value?.allowed_countries];
      const deleted = existing.filter((item) => !selectValue.includes(item));
      console.log(existing, deleted, "finding");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setFromValues((prevValues) => {
            return prevValues.map((v) => {
              if (v.uid === id) {
                return {
                  ...v,
                  allowed_countries: selectValue,
                };
              } else {
                return v;
              }
            });
          });
          if (deleted[0]?.id) {
            axios
              .delete(SaasAuthURL + `/sms/delete-sms-country/${deleted[0].id}`)
              .then((res) => {
                if (res.data.status === 200) {
                  setFromValues((prevValues) => {
                    return prevValues.map((v) => {
                      if (v.uid === id) {
                        return {
                          ...v,
                          allowed_countries: selectValue,
                        };
                      } else {
                        return v;
                      }
                    });
                  });
                }
              });
          } else {
            setFromValues((prevValues) => {
              return prevValues.map((v) => {
                if (v.uid === id) {
                  return {
                    ...v,
                    allowed_countries: selectValue,
                  };
                } else {
                  return v;
                }
              });
            });
          }
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Deleted!",
            text: "Your data has been deleted.",
            timer: 2500,
          });
        }
      });
    }

    if (selectValue.length === 0) {
      setCountryValidationError({ status: true, uid: id });
    } else {
      setCountryValidationError({ status: false, uid: id });
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmitFrom}>
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <label
                htmlFor={`${value.uid}_name`}
                style={{ ...labelStyles }}
                className="form-label"
              >
                Name: <span className="text-danger">*</span>
              </label>
              <div className="flex-grow-1">
                <Input
                  required
                  id={`${value.uid}_name`}
                  value={value.name}
                  onChange={(e) =>
                    handleOnchange({
                      id: value.uid,
                      name: "name",
                      inputValue: e.target.value,
                    })
                  }
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <label
                htmlFor={`${value.uid}_gateway_type`}
                style={{ ...labelStyles, whiteSpace: "nowrap" }}
                className="form-label"
              >
                Gateway: <span className="text-danger">*</span>
              </label>
              <select
                id={`${value.uid}_gateway_type`}
                required
                className="form-select"
                onChange={(e) => {
                  handleOnchange({
                    id: value.uid,
                    name: "gateway_type",
                    inputValue: e.target.value,
                  });
                  handleCheckParametersOrUrl({
                    id: value.uid,
                    inputValue: "parameter",
                  });
                }}
              >
                <option value="">Select Gateway</option>
                {gatewayOptions.map((item) => {
                  return (
                    <option
                      selected={value.gateway_type === item.value}
                      value={item.value}
                      key={item.value}
                    >
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-1">
                {loadingState.isStatus ? <Loading /> : null}
                <label
                  className="form-label"
                  style={{ ...labelStyles, marginRight: "0.2rem" }}
                  htmlFor="status"
                >
                  {value.status ? "Active" : "Inactive"}
                </label>
                <Toggle
                  id="status"
                  disabled={loadingState.isStatus || false}
                  value={value.status}
                  title={value.status ? "Active" : "Inactive"}
                  onChange={() =>
                    handleToggleStatus({ id: value.uid, isTrue: !value.status })
                  }
                />
              </div>
              {!value.id ? (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => handleRemoveItem(value.uid)}
                >
                  <PiTrash
                    style={{
                      fontSize: "18px",
                      color: "white",
                    }}
                  />
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 d-flex flex-column gap-1 ">
              <label
                htmlFor={`${value.uid}_provider`}
                style={{ ...labelStyles }}
                className="form-label"
              >
                Provider <span className="text-danger">*</span>
              </label>
              <Input
                type="text"
                required
                className="flex-grow-1"
                placeholder="Enter provider"
                id={`${value.uid}_provider`}
                value={value.provider_name}
                onChange={(e) =>
                  handleOnchange({
                    id: value.uid,
                    name: "provider_name",
                    inputValue: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6 d-flex flex-column gap-1 ">
              <div className="d-flex align-items-center justify-content-between">
                <label
                  htmlFor={`${value.uid}_countries`}
                  style={{
                    ...labelStyles,
                    whiteSpace: "nowrap",
                  }}
                  className="form-label"
                >
                  Allowed Countries <span className="text-danger">*</span>
                </label>
                {value?.allowed_countries?.length ? (
                  <span className="badge bg-success">
                    {value?.allowed_countries?.length} Selected
                  </span>
                ) : null}
              </div>
              <MultipleSelect
                options={countryCode.map((item) => ({
                  ...item,
                  value: item.name,
                  label: item.name,
                  id: "",
                }))}
                id={`${value.uid}_countries`}
                value={value?.allowed_countries || []}
                placeholder={"Search Countries"}
                onChange={(selectValue) =>
                  handleChangeSelectedCountry(selectValue, value.uid)
                }
              />
              {countryValidationError.status &&
              countryValidationError.uid === value.uid ? (
                <span className="text-danger">
                  {" "}
                  Please select at least one country
                </span>
              ) : null}
            </div>
          </div>
          {value.gateway_type !== "ALPHANET" && (
            <div className="d-flex align-items-center gap-4 m-3">
              <div className="d-flex align-items-center gap-1">
                <input
                  type="radio"
                  name={`${value.uid}_api_type`}
                  className="form-check-input"
                  id={`${value.uid}_api_type_url`}
                  onChange={() =>
                    handleCheckParametersOrUrl({
                      id: value.uid,
                      inputValue: "url",
                    })
                  }
                  checked={value.is_api_type_parameter}
                />
                <label
                  style={{ ...labelStyles }}
                  htmlFor={`${value.uid}_api_type_url`}
                >
                  URL
                </label>
              </div>
              <div className="d-flex align-items-center gap-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`${value.uid}_api_type`}
                  onChange={() =>
                    handleCheckParametersOrUrl({
                      id: value.uid,
                      inputValue: "parameter",
                    })
                  }
                  checked={!value.is_api_type_parameter}
                  id={`${value.uid}_api_type_parameter`}
                />
                <label
                  style={{ ...labelStyles }}
                  htmlFor={`${value.uid}_api_type_parameter`}
                >
                  Parameter
                </label>
              </div>
            </div>
          )}
          {!value.is_api_type_parameter ? (
            <>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1">
                  <label
                    htmlFor={`${value.uid}_api_url`}
                    style={{ ...labelStyles }}
                    className="form-label"
                  >
                    API/URL <span className="text-danger">*</span>
                  </label>
                  <Input
                    type="url"
                    required
                    placeholder="Enter API URL"
                    id={`${value.uid}_api_url`}
                    name="api_url"
                    value={value?.url}
                    onChange={(e) =>
                      handleOnchange({
                        id: value.uid,
                        name: "url",
                        inputValue: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="row">
                  <div className=" col-md-5 d-flex flex-column my-1 gap-1 ">
                    <label
                      htmlFor={`${value.uid}_authorization`}
                      style={{ ...labelStyles, margin: "10px 0 0 0 " }}
                      className="form-label"
                    >
                      Authorization <span className="text-danger">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter authorization"
                      name="authorization"
                      required
                      id={`${value.uid}_authorization`}
                      value={value.authorization}
                      onChange={(e) =>
                        handleOnchange({
                          id: value.uid,
                          name: "authorization",
                          inputValue: e.target.value,
                        })
                      }
                    />
                  </div>
                  {value?.gateway_type !== "ALPHANET" ? (
                    <div className="col-md-5 d-flex flex-column my-1 gap-1 ">
                      <label
                        htmlFor={`${value.uid}_from`}
                        style={{ ...labelStyles, margin: "10px 0 0 0" }}
                        className="form-label"
                      >
                        SID <span className="text-danger">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter SID"
                        required
                        name="from"
                        id={`${value.uid}_from`}
                        value={value?.from}
                        onChange={(e) =>
                          handleOnchange({
                            id: value.uid,
                            name: "from",
                            inputValue: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : null}
                </div>
                {value?.api_credential?.parameters?.map((item, index) => {
                  return (
                    <div key={index} className="row">
                      <div className="col-md-5 my-1">
                        <Input
                          // required={index > 1 ? false : true}
                          type="text"
                          value={item.key}
                          onChange={(e) =>
                            handleChangeParameter({
                              id: value.uid,
                              index: index,
                              name: "key",
                              inputValue: e.target.value,
                            })
                          }
                          placeholder="Key"
                        />
                      </div>
                      <div className="col-md-5 my-1">
                        <Input
                          // required={index > 1 ? false : true}
                          type="text"
                          onChange={(e) =>
                            handleChangeParameter({
                              id: value.uid,
                              index: index,
                              name: "value",
                              inputValue: e.target.value,
                            })
                          }
                          value={item.value}
                          placeholder="Value"
                        />
                      </div>
                      <div className="col-md-2 my-1 d-flex align-items-center justify-content-end gap-2">
                        {index ===
                        value?.api_credential?.parameters?.length - 1 ? (
                          <Button
                            type="button"
                            className={"mt-0"}
                            style={{
                              fontSize: "12px",
                            }}
                            onClick={() => handleAddParams(value.uid)}
                          >
                            <FaPlus />
                          </Button>
                        ) : null}
                        {index > 0 ? (
                          <Button
                            onClick={() =>
                              handleRemoveParams({
                                id: value.uid,
                                index: index,
                              })
                            }
                            type="button"
                            style={{
                              fontSize: "12px",
                            }}
                            variant="danger"
                            className={"mt-0"}
                          >
                            {/* <PiMinusBold /> */}
                            <HiMinus />
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {value.gateway_type !== "ALPHANET" && (
                <>
                  <div className="d-flex gap-1 flex-column">
                    <label
                      htmlFor={`${value.uid}_api_url`}
                      style={{ ...labelStyles }}
                      className="form-label"
                    >
                      API/URL <span className="text-danger">*</span>
                    </label>
                    <Input
                      type="url"
                      required
                      placeholder="Enter API URL"
                      name="api_url"
                      id={`${value.uid}_api_url`}
                      value={value?.url}
                      onChange={(e) =>
                        handleOnchange({
                          id: value.uid,
                          name: "url",
                          inputValue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="row">
                    <div className=" col-md-6 d-flex flex-column gap-1 ">
                      <label
                        htmlFor={`${value.uid}_username`}
                        style={{ ...labelStyles, margin: "10px 0 0 0 " }}
                        className="form-label"
                      >
                        Username <span className="text-danger">*</span>
                      </label>
                      <Input
                        type="text"
                        id={`${value}_username`}
                        required
                        placeholder="Enter username"
                        name="username"
                        value={value.user_name}
                        onChange={(e) =>
                          handleOnchange({
                            id: value.uid,
                            name: "user_name",
                            inputValue: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 d-flex flex-column gap-1 ">
                      <label
                        aria-required
                        htmlFor={`${value.id}_password`}
                        style={{ ...labelStyles, margin: "10px 0 0 0" }}
                        className="form-label"
                      >
                        Password <span className="text-danger">*</span>
                      </label>
                      <Input
                        type="text"
                        id={`${value.uid}_password`}
                        required
                        placeholder="Enter password"
                        name="password"
                        value={value.password}
                        onChange={(e) =>
                          handleOnchange({
                            id: value.uid,
                            name: "password",
                            inputValue: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <div className="row mt-3">
            <div className="col-md-12">
              <label style={{ ...labelStyles }} htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={value?.message}
                placeholder="Enter message"
                rows={10}
                onChange={(e) =>
                  handleOnchange({
                    id: value.uid,
                    name: "message",
                    inputValue: e.target.value,
                  })
                }
                className="form-control"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-end gap-3">
          {/* <Button
            isDisabled={loadingState.submitting}
            isLoading={loadingState.submitting}
            type="button"
          >
            Test
          </Button> */}
          <Button
            isDisabled={loadingState.submitting || loadingState.isStatus}
            isLoading={loadingState.submitting}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export const MultipleSelect = ({
  components,
  value,
  options,
  onChange,
  placeholder,
  id,
}) => {
  const Option = (props) => {
    return (
      <Base.Option
        {...props}
        className="border d-flex align-items-center justify-content-between py-1"
      >
        <div className="d-flex align-items-center gap-2">
          <div className="form-check py-0">
            <input
              className="form-check-input"
              type="checkbox"
              checked={props.isSelected}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <img
              src={`https://flagsapi.com/${props?.data?.code}/flat/16.png`}
              alt={props?.data?.code}
            />
            <span
              className="ms-2"
              style={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {props.label}
            </span>
          </div>
        </div>
        <span>{props?.data?.dial_code}</span>
      </Base.Option>
    );
  };
  const IndicatorSeparator = () => null;
  const DropdownIndicator = () => null;
  const htmlId = generateUniqueId();
  return (
    <ReactSelect
      options={options || []}
      isMulti
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      controlShouldRenderValue={false}
      placeholder={placeholder}
      isSearchable
      // isClearable
      styles={{
        ...ReactSelectStyles,
      }}
      value={value}
      onChange={onChange}
      inputId={`${id ? id : htmlId}`}
      components={{
        Option,
        DropdownIndicator,
        IndicatorSeparator,
        ...components,
      }}
    />
  );
};
