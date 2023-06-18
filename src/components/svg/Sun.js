import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg"

function Sun(props) {
  return (
    <Svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="url(#paint0_radial_249_3966)" d="M0 0H64V64H0z" />
      <Path
        d="M30 10V4a2 2 0 114 0v6a2 2 0 01-4 0zm18 22a16 16 0 11-16-16 16.017 16.017 0 0116 16zm-4 0a12 12 0 10-12 12 12.012 12.012 0 0012-12zM14.585 17.415a2.001 2.001 0 002.83-2.83l-4-4a2.001 2.001 0 00-2.83 2.83l4 4zm0 29.17l-4 4a2.001 2.001 0 002.83 2.83l4-4a2.002 2.002 0 00-2.83-2.83zM48 18a2.002 2.002 0 001.415-.585l4-4a2.001 2.001 0 00-2.83-2.83l-4 4A2 2 0 0048 18zm1.415 28.585a2.001 2.001 0 00-2.83 2.83l4 4a2.002 2.002 0 002.83-2.83l-4-4zM12 32a2 2 0 00-2-2H4a2 2 0 100 4h6a2 2 0 002-2zm20 20a2 2 0 00-2 2v6a2 2 0 004 0v-6a2 2 0 00-2-2zm28-22h-6a2 2 0 000 4h6a2 2 0 000-4z"
        fill="#FBAE43"
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_249_3966"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 32 -32 0 32 32)"
        >
          <Stop stopColor="#FBAE43" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </RadialGradient>
      </Defs>
    </Svg>
  )
}

export default Sun
