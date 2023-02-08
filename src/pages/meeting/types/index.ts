import { Socket } from "socket.io-client";

export interface MeetingPageProps {
  socket: Socket;
}

export interface CreateMeetingResponse {
  data: {
    id: string;
    title: string;
  };
}

export interface JoinMeetingResponse {
  data: {
    id: string;
    token: string;
  };
}

export type CallParams = {
  id: string;
  title: string;
};

export enum ROLE {
  HOST = "group_call_host",
  PARTICIPANT = "group_call_participant",
}

export enum STORAGE_KEYS {
  MEETING_ID = "MEETING_ID",
  MEETING_AUTH = "MEETING_AUTH",
  MEETING_TITLE = "MEETING_TITLE",
  MEETING_ROLE = "MEETING_ROLE",
}
