import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function NotePencilIcon(props) {
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
        d="M23.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-12 12A1 1 0 0116 21h-4a1 1 0 01-1-1v-4a1 1 0 01.293-.707l12-12zM13 16.414V19h2.586l11-11L24 5.414l-11 11z"
        fill="#002"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.293 6.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z"
        fill="#002"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.586 4.586A2 2 0 016 4h11a1 1 0 110 2H6v20h20V15a1 1 0 112 0v11a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 01.586-1.414z"
        fill="#002"
      />
    </Svg>
  )
}
