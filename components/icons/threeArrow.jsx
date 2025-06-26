import React from "react";
import { Svg, Path, G, Defs, Rect, ClipPath } from "react-native-svg";

const ThreeArrow = ({ size = 24, color = "red" }) => (
  <Svg
    width="50"
    height="22"
    viewBox="0 0 50 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M8.25 5L13.75 11.4167L8.25 17.8333"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.25 5L27.75 11.4167L22.25 17.8333"
      stroke="white"
      strokeOpacity="0.6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M36.25 5L41.75 11.4167L36.25 17.8333"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ThreeArrow;
