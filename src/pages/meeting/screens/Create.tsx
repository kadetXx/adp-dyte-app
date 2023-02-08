import React, { useState } from "react";
import { StyledContainer, StyledCover } from "../Meeting.style";
import { Input, Button, Flex, Text, Header } from "@adp/common";
import { Illustration } from "../../../components/Illustration";
import { useAuth0 } from "@auth0/auth0-react";
import { useMeeting } from "../hooks/useMeeting";
import { MeetingPageProps } from "../types";

export const Create: React.FC<MeetingPageProps> = ({ socket }) => {
  const { user, logout } = useAuth0();
  const {
    loading,
    error,
    meetingTitle,
    setMeetingTitle,
    setInvalidTitle,
    invalidTitle,
    createMeeting,
  } = useMeeting();

  return (
    <>
      {user && (
        <Header
          profile={{
            username: user.name,
            avatarUrl: user.picture,
            profileUrl: import.meta.env.VITE_PROFILE_APP_URL,
            onLogout: () => {
              socket.emit("logout", user.email);
              logout();
            },
          }}
        />
      )}

      <StyledContainer>
        <Flex stretchx direction="column" justify="center" gap="2rem">
          <Flex direction="column" gap="0.7rem">
            <Text variant="h1" align="center">
              Create new meeting
            </Text>
            <Text size="$lg" align="center">
              Give your meeting a title. Good meeting names help set
              expectations and inform attendees.
            </Text>
          </Flex>

          <Flex
            stretchx
            as="form"
            direction="column"
            justify="center"
            gap="1rem"
            onSubmit={e => {
              e.preventDefault();
              createMeeting();
            }}
          >
            <Input
              placeholder="Mentorship Session"
              error={invalidTitle && "Please give your meeting a title"}
              value={meetingTitle}
              disabled={loading || error}
              isDisabled={loading || error}
              onChange={e => {
                const value = e.target.value;
                setMeetingTitle(value);

                if (invalidTitle) {
                  value.length > 3 && setInvalidTitle(false);
                }
              }}
            />
            <Button
              type="submit"
              size="large"
              fullWidth
              loading={loading}
              disabled={invalidTitle}
            >
              Create Meeting
            </Button>
          </Flex>

          {error && (
            <Flex align="center" justify="center">
              <Text color="$danger" weight="bold">
                Opps! Something went wrong, please reload and try again
              </Text>
            </Flex>
          )}
        </Flex>

        <StyledCover justify="center" align="center">
          <Illustration width="100%" />
        </StyledCover>
      </StyledContainer>
    </>
  );
};
