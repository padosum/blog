import { ButtonOutline, themeGet } from "@primer/components";
import styled from "styled-components";

const DarkButton = styled(ButtonOutline)`
  color: ${themeGet("colors.header.text")};
  background-color: transparent;
  box-shadow: none;
  &:hover {
    background-color: hsl(31, 45%, 20%);
  }
  &:hover > div {
    color: #fff;
  }
  &:hover svg {
    fill: #fff;
  }
`;

export default DarkButton;
