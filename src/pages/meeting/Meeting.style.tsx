import { Flex, styled } from "@adp/common";

export const StyledContainer = styled("div", {
  display: "grid",
  height: "100vh",
  gridTemplateColumns: "1fr 1.5fr",
  padding: "0 $container",
  gap: "$container",

  "@mobile": {
    gridTemplateColumns: "1fr",
    textAlign: "center",
  },
});

export const StyledCover = styled(Flex, {
  filter: "grayScale(50%)",

  "@mobile": {
    display: "none",
  },
});
