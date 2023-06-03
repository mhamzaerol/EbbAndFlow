import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DashedLine(props) {
  const viewBox = `0 0 ${props.width} ${props.height}`;
  const pathString = `M${props.startX} ${props.startY} L ${props.endX} ${props.endY}`;
  return (
    <Svg
      position="absolute"
      width={props.width}
      height={props.height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d={pathString} stroke="#002" strokeDasharray="2 2" />
    </Svg>
  )
}

export default DashedLine
