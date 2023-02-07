import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMeeting } from "../hooks/useMeeting";
import { useDyteClient } from "@dytesdk/react-web-core";
import { DyteMeeting, provideDyteDesignSystem } from "@dytesdk/react-ui-kit";
import { CallParams, ROLE, STORAGE_KEYS } from "../types";

export const Call = () => {
  const params = useParams<CallParams>();
  const navigate = useNavigate();
  const meetingEl = useRef(null);

  const [meeting, initMeeting] = useDyteClient();

  const meetingAuth = sessionStorage.getItem(STORAGE_KEYS.MEETING_AUTH);
  const meetingRole = sessionStorage.getItem(STORAGE_KEYS.MEETING_ROLE);

  const { joinMeeting } = useMeeting();

  useEffect(() => {
    const invalidParams = !params.id || !params.title;
    const hasExistingSession = meetingAuth && meetingRole;

    const init = async (token: string) => {
      const client = await initMeeting({
        authToken: token,
        roomName: "",
      });

      client.self.once("roomLeft", () => {
        sessionStorage.clear();
        navigate("/meeting");
      });
    };

    const join = (id: string, title: string) => {
      joinMeeting(id, title, meetingRole === ROLE.HOST, () => {
        window.location.reload();
      });
    };

    hasExistingSession
      ? init(meetingAuth)
      : !invalidParams
      ? join(params.id, params.title)
      : null;
  }, []);

  useEffect(() => {
    if (!meetingEl.current) return;

    provideDyteDesignSystem(meetingEl.current, {
      colors: {
        brand: {
          300: "#399999",
          400: "#208c8c",
          500: "#077F7F",
          600: "#067272",
          700: "#066666",
        },
      },
    });
  }, [meetingEl]);

  return <DyteMeeting meeting={meeting!} ref={meetingEl} />;
};
