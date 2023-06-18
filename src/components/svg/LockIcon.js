import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LockIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M208 80h-32V56a48 48 0 00-96 0v24H48a16 16 0 00-16 16v112a16 16 0 0016 16h160a16 16 0 0016-16V96a16 16 0 00-16-16zM96 56a32 32 0 0164 0v24H96zm112 152H48V96h160v112zm-68-56a12 12 0 11-12-12 12 12 0 0112 12z" />
    </Svg>
  )
}

export default LockIcon
