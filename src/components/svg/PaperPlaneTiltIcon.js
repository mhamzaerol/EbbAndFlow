import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PaperPlaneTiltIcon(props) {
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
        d="M26.012 3.526a1.987 1.987 0 012.462 2.462l-6.56 23.288v.005a2 2 0 01-3.746.303L13.11 18.891l-10.693-5.06a2 2 0 01.303-3.744l.005-.002 23.288-6.559zm.535 1.927L3.25 12.015l.014.006 10.386 4.914 5.154-5.155a1 1 0 011.415 1.415l-5.155 5.154 4.914 10.386.006.014.002-.008 6.56-23.288z"
        fill="#002"
      />
    </Svg>
  )
}

export default PaperPlaneTiltIcon
