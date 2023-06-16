import * as React from "react"
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg"

function Star(props) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={24} cy={24} r={11.5} fill={props.color} stroke="#1E1D1F" />
      <Circle cx={24} cy={24} r={24} fill="url(#paint0_radial_384_5522)" />
      <Defs>
        <RadialGradient
          id="paint0_radial_384_5522"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 24 -24 0 24 24)"
        >
          <Stop stopColor={props.color} />
          <Stop offset={1} stopColor={props.color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
    </Svg>
  )
}

export default Star
