import { Flex, styled } from "@adp/common";

export const StyledWrapper = styled("div", {
  height: "100vh",
  width: "100%",
  backgroundSize: "2.5rem 2.5rem",
  backgroundPosition: "center",
  backgroundImage: `linear-gradient(90deg,#ddd .063rem,#0000 0),linear-gradient(180deg,#ddd .063rem,#0000 0)`,
});

export const StyledContainer = styled("div", {
  width: "100%",
  height: "100%",
  display: "grid",
  placeItems: "center",
  background: "radial-gradient(circle,#fff9 0,#fff 100%)",
});

export const StyledIcon = styled("div", {
  display: "grid",
  placeItems: "center",
  width: "8rem",
  height: "8rem",
  borderRadius: "50%",
  backgroundColor: "rgba(11, 36, 63, 0.1)",
});

export const StyledContent = styled(Flex, {
  padding: "0 $container",
  width: "50rem",

  "@tablet": {
    width: "95%",
  },
});

export const StyledLink = styled("a", {
  fontWeight: "bold",
});
