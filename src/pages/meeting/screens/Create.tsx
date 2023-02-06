import React, { useState } from "react";
import { StyledContainer, StyledCover } from "../Meeting.style";
import { Input, Button, Flex, Text, Header } from "@adp/common";
import { Illustration } from "../../../components/Illustration";
import { useAuth0 } from "@auth0/auth0-react";
import { useMeeting } from "../hooks/useMeeting";

export const Create: React.FC = () => {
  const { user, logout } = useAuth0();
  const { loading, error, meetingTitle, setMeetingTitle, createMeeting } =
    useMeeting();

  return (
    <>
      {user && (
        <Header
          profile={{
            username: user.name,
            avatarUrl: user.picture,
            onLogout: logout,
            profileUrl: import.meta.env.VITE_PROFILE_APP_URL,
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
              expectations and inform attendees
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
              placeholder="Meeting Title"
              value={meetingTitle}
              disabled={loading || error}
              onChange={e => setMeetingTitle(e.target.value)}
            />
            <Button
              type="submit"
              size="large"
              fullWidth
              loading={loading}
              disabled={meetingTitle.length < 3 || error}
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
