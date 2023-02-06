import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMeeting } from "../hooks/useMeeting";
import { useDyteClient } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import { CallParams, ROLE, STORAGE_KEYS } from "../types";

export const Call = () => {
  const params = useParams<CallParams>();
  const navigate = useNavigate();

  const [meeting, initMeeting] = useDyteClient();

  const meetingAuth = sessionStorage.getItem(STORAGE_KEYS.MEETING_AUTH);
  const meetingRole = sessionStorage.getItem(STORAGE_KEYS.MEETING_ROLE);

  const { joinMeeting } = useMeeting();

  useEffect(() => {
    const invalidParams = !params.id || !params.title;
    const hasExistingSession = meetingAuth && meetingRole;

    if (hasExistingSession) {
      initMeeting({
        authToken: meetingAuth,
        roomName: "",
      });
    } else if (!invalidParams) {
      joinMeeting(params.id, params.title, meetingRole === ROLE.HOST, () => {
        window.location.reload();
      });
    }
  }, []);

  return <DyteMeeting meeting={meeting!} />;
};
