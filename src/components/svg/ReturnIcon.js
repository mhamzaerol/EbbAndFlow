import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function ReturnIcon(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 110-2h11v-3a1 1 0 011-1z"
        fill="#002"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.707 13.293a1 1 0 010 1.414L11.414 17l2.293 2.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
        fill="#002"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 7a2 2 0 012-2h22a2 2 0 012 2v18a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm24 0H5v18h22V7z"
        fill="#002"
      />
    </Svg>
  )
}
