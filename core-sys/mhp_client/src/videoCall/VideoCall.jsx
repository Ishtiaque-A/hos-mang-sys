import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Button from "../common/components/Button";
import { toast } from "react-toastify";

const VideoCall = () => {
  const { username, user_id, doctorname, doctor_id } = useParams();
  const [loading, setLoading] = useState(false);
  // username/:user_id/:doctorname/:doctor_id
  const appID = 1293432009;
  const serverSecret = "7fa4748d9e158a5e64e04c61803d71f4";
  let TOKEN;
  if (username && user_id && doctorname && doctor_id) {
    TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      doctor_id,
      doctorname
    );
  }

  const zp = ZegoUIKitPrebuilt.create(TOKEN);
  zp?.addPlugins({ ZIM });
  zp?.setCallInvitationConfig({
    enableNotifyWhenAppRunningInBackgroundOrQuit: true,
  });
  useEffect(() => {
    setLoading(true);
    if (user_id && doctor_id && doctorname && username) {
      if (!zp) {
        setLoading(false);
        return;
      } else {
        callFunc();
      }
    }
  }, [user_id, doctor_id, doctorname, username]);

  const callFunc = () => {
    const targetUser = {
        // userID: "1000000066",
        // userName: "taufiq elahi",
      userID: user_id.toString(),
      userName: username.toString(),
    };
    // return;
    window.onload = () => {
      setTimeout(() => {
        zp?.sendCallInvitation({
          // callees: [{ userID: "123", userName: "U_123" }],
          callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
          notificationConfig: {
            resourcesID: "digidoctor-resource",
            title: "Call invitation",
            message: "Incoming video call...",
          },
          callees: [{ ...targetUser }],
          // callType: ZegoUIKitPrebuilt?.InvitationTypeVideoCall,
          timeout: 60,
        })
          .then((res) => {
            setLoading(false);
            console.log(res, "call response");
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            toast.error("Something went wrong. Please try again later");
          });
      }, 2000);
    };
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 40,
      }}
    >
      {loading ? (
        <>
          <div class="divLoader">
            <svg
              class="svgLoader"
              viewBox="0 0 100 100"
              width="10em"
              height="10em"
            >
              <path
                ng-attr-d="{{config.pathCmd}}"
                ng-attr-fill="{{config.color}}"
                stroke="none"
                d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                fill="#51CACC"
                transform="rotate(179.719 50 51)"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  calcMode="linear"
                  values="0 50 51;360 50 51"
                  keyTimes="0;1"
                  dur="1s"
                  begin="0s"
                  repeatCount="indefinite"
                ></animateTransform>
              </path>
            </svg>
          </div>
        </>
      ) : (
        <Button
          onClick={() => {
            zp?.destroy();
            window.close();
          }}
        >
          Close Window
        </Button>
      )}
    </div>
  );
};

export default VideoCall;
