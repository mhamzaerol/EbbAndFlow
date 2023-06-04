import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { useDispatch, useSelector } from 'react-redux';


export function GoBackArrowIcon(props) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.06 7.94a1.5 1.5 0 010 2.12L17.122 24l13.94 13.94a1.5 1.5 0 01-2.122 2.12l-15-15a1.5 1.5 0 010-2.12l15-15a1.5 1.5 0 012.122 0z"
        fill="#002"
      />
    </Svg>
  )
}
