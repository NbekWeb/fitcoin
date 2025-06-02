import React from "react";
import { Svg, Path, G, Defs, Rect, ClipPath } from "react-native-svg";

const Cash = ({ size = 24, color = "red" }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M6.375 10H10.375"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.2083 11H18.6058C16.8215 11 15.375 12.3431 15.375 14C15.375 15.6569 16.8215 17 18.6058 17H21.2083C21.2917 17 21.3333 17 21.3685 16.9979C21.9078 16.965 22.3373 16.5662 22.3727 16.0654C22.375 16.0327 22.375 15.994 22.375 15.9167V12.0833C22.375 12.006 22.375 11.9673 22.3727 11.9346C22.3373 11.4338 21.9078 11.035 21.3685 11.0021C21.3333 11 21.2917 11 21.2083 11Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <Path
      d="M21.34 11C21.2623 9.1277 21.0116 7.97975 20.2034 7.17157C19.0319 6 17.1462 6 13.375 6H10.375C6.60376 6 4.71815 6 3.54657 7.17157C2.375 8.34315 2.375 10.2288 2.375 14C2.375 17.7712 2.375 19.6569 3.54657 20.8284C4.71815 22 6.60376 22 10.375 22H13.375C17.1462 22 19.0319 22 20.2034 20.8284C21.0116 20.0203 21.2623 18.8723 21.34 17"
      stroke={color}
      strokeWidth="1.5"
    />
    <Path
      d="M6.375 6L10.1105 3.52313C11.1624 2.82562 12.5876 2.82562 13.6395 3.52313L17.375 6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M18.3662 14H18.3752"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Cash;
