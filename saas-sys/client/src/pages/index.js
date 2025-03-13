import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { connect, Provider } from "react-redux";
import Store from "../stateManagement/Store";
import getGlobalState from "../stateManagement/global/globalSelector";
import getAuthState from "../stateManagement/auth/AuthSelector";
import { useEffect } from "react";
import { APP_URL } from "../common/constantData/constants";
// import "./../style/global.css";

const now = new Date();
const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({});

const Page = (props) => {
  useEffect(() => {
    if (props.userProfile?.user_type > 2) {
      window.location.href = APP_URL + "billing-&-subscriptions";
    } else if (props.userProfile?.user_type <= 2) {
      window.location.href = APP_URL + "dashboard";
    }
  }, [props.userProfile]);

  return (
    <Provider store={Store}>
      <Head>
        <title>Overview | SmartHealth</title>
      </Head>
    </Provider>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);