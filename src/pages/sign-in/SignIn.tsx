import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Text, Button, Loader } from "@adp/common";
import { LockIcon } from "../../components/LockIcon";
import {
  StyledContainer,
  StyledContent,
  StyledIcon,
  StyledLink,
  StyledWrapper,
} from "./SignIn.styles";

export const SignIn = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    isAuthenticated && navigate("/meeting");
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledContent
          stretchy
          gap="1.5rem"
          direction="column"
          justify="center"
          align="center"
        >
          <StyledIcon>
            <LockIcon width="4rem" />
          </StyledIcon>

          <Flex direction="column" justify="center" align="center" gap="0.5rem">
            <Text variant="h2" align="center">
              Welcome 👋🏼
            </Text>

            <Text size="$lg" align="center">
              Sign in to you account to continue
            </Text>
          </Flex>

          <Flex stretchx direction="column" align="center" gap="0.7rem">
            <Button fullWidth size="large" onClick={() => loginWithRedirect()}>
              Sign In
            </Button>

            <Text variant="body2">
              Powerd By{" "}
              <StyledLink
                href="https://auth0.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Auth0
              </StyledLink>
            </Text>
          </Flex>
        </StyledContent>
      </StyledWrapper>
    </StyledContainer>
  );
};
