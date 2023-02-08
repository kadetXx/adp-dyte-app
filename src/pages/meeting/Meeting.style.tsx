import { Flex, styled } from "@adp/common";

export const StyledWrapper = styled("div", {
  height: "100vh",
  width: "100%",
  backgroundSize: "2.5rem 2.5rem",
  backgroundPosition: "center",
  backgroundImage: `linear-gradient(90deg,#ddd .063rem,#0000 0),linear-gradient(180deg,#ddd .063rem,#0000 0)`,
});

export const StyledContainer = styled("div", {
  height: "100vh",
  display: "grid",
  gap: "$container",
  padding: "0 $container",
  gridTemplateColumns: "1fr 1.5fr",
  background: "radial-gradient(circle,#fff9 0,#fff 100%)",

  "@desktop": {
    gridTemplateColumns: "1fr 1fr",
  },

  "@tablet": {
    gridTemplateColumns: "1fr",
    textAlign: "center",
  },
});

export const StyledCover = styled(Flex, {
  filter: "grayScale(50%)",
  padding: "0 0 0 15%",

  "@tablet": {
    display: "none",
  },
});