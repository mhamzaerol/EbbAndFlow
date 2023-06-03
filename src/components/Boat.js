import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function BoatSVG(props) {
  return (
    <Svg
      width={122}
      height={136}
      viewBox="0 0 122 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_364_5562)">
        <Path
          d="M67.557 97.778H1l5.302 10.534 6.214 12.344L18.729 133h84.286l5.602-12.344 5.602-12.344L119 97.778H67.557z"
          fill="#7C5D48"
        />
        <Path
          d="M67.557 27.005v70.773h25.576L67.557 27.005zM25.414 97.778h42.143V1L25.414 97.778z"
          fill="#F5E9DD"
        />
        <Path d="M67.557 1v26.005l29.645-10.534L67.557 1z" fill="#F4303E" />
        <Path
          d="M67.557 1L25.414 97.778M67.557 1v26.005m0-26.005l29.645 15.471-29.645 10.534m0 70.773H25.414m42.143 0V27.005m0 70.773h25.576m-67.72 0H1m92.133 0L67.557 27.005m25.576 70.773H119m-118 0h118m-118 0l5.302 10.534M119 97.778l-4.781 10.534m-107.917 0H114.22m-107.917 0l6.214 12.344m101.703-12.344l-5.602 12.344m-96.101 0L18.729 133h84.286l5.602-12.344m-96.101 0h96.101"
          stroke="#002"
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default BoatSVG
