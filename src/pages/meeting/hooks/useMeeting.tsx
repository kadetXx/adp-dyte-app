import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ROLE,
  STORAGE_KEYS,
  CreateMeetingResponse,
  JoinMeetingResponse,
} from "../types";

import axios from "axios";

export const useMeeting = () => {
  const api = import.meta.env.VITE_ADP_SERVER_URL;

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [invalidTitle, setInvalidTitle] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();

  const createMeeting = useCallback(async () => {
    if (meetingTitle.length < 3) {
      setInvalidTitle(true);
      return;
    }

    setLoading(true);

    try {
      const token = await getAccessTokenSilently();

      const { data } = await axios<CreateMeetingResponse>({
        method: "POST",
        url: `${api}/meeting/create`,
        headers: { authorization: `Bearer ${token}` },
        data: {
          title: meetingTitle,
        },
      });

      const id = data.data.id;
      const title = data.data.title;

      joinMeeting(id, title, true, (meetingId, meetingTitle) =>
        navigate(`/meeting/${meetingTitle}/${meetingId}`)
      );
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  }, [meetingTitle, getAccessTokenSilently]);

  const joinMeeting = useCallback(
    async (
      meetingId: string,
      meetingTitle: string,
      isHost?: boolean,
      onJoined?: (meetingId: string, meetingTitle: string) => void
    ) => {
      setLoading(true);

      try {
        const token = await getAccessTokenSilently();
        const userRole = isHost ? ROLE.HOST : ROLE.PARTICIPANT;

        const { data } = await axios<JoinMeetingResponse>({
          method: "POST",
          url: `${api}/meeting/join`,
          headers: { authorization: `Bearer ${token}` },
          data: {
            name: user?.nickname,
            custom_participant_id: user?.sub,
            preset_name: userRole,
            meetingId: meetingId,
          },
        });

        setLoading(false);

        sessionStorage.setItem(STORAGE_KEYS.MEETING_ID, meetingId);
        sessionStorage.setItem(STORAGE_KEYS.MEETING_AUTH, data.data.token);
        sessionStorage.setItem(STORAGE_KEYS.MEETING_ROLE, userRole);

        onJoined?.(meetingId, meetingTitle);
      } catch (error: any) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    },
    [meetingTitle, getAccessTokenSilently]
  );

  return {
    error,
    loading,
    joinMeeting,
    createMeeting,
    meetingTitle,
    setMeetingTitle,
    invalidTitle,
    setInvalidTitle,
  };
};
