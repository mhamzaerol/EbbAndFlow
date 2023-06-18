import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CrossIcon(props) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.293 6.293a1 1 0 011.414 0L16 14.586l8.293-8.293a1 1 0 111.414 1.414L17.414 16l8.293 8.293a1 1 0 01-1.414 1.414L16 17.414l-8.293 8.293a1 1 0 01-1.414-1.414L14.586 16 6.293 7.707a1 1 0 010-1.414z"
        fill="#002"
      />
    </Svg>
  )
}

export default CrossIcon
