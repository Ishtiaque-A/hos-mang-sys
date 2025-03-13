const useCredentialURL = () => {
  const SaasBaseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_SAAS_URL
      : process.env.REACT_APP_PRO_SAAS_URL;
  const SaasBaseVersionOne = SaasBaseUrl + "/v1";
  const SaasAuthURL = SaasBaseVersionOne + "/auth";
  return {
    SaasBaseUrl,
    SaasBaseVersionOne,
    SaasAuthURL,
  };
};
export default useCredentialURL;
