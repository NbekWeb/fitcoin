import React from "react";
import { Svg, Circle, Ellipse } from "react-native-svg";

const Thunder = ({ size = 24, color = "red" }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx="12.125" cy="6" r="4" stroke={color} strokeWidth="1.5" />
    <Ellipse
      cx="12.125"
      cy="17"
      rx="7"
      ry="4"
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export default Thunder;
