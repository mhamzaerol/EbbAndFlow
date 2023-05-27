import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EraserIcon(props) {
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
        d="M16.095 17.596a1.5 1.5 0 012.122 0l12.731 12.73a1.5 1.5 0 11-2.121 2.122L16.095 19.717a1.5 1.5 0 010-2.121z"
        fill="#002"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.458 8.793a1.482 1.482 0 00-1.623.325l-.006.005L7.618 30.335a1.48 1.48 0 000 2.105l.005.006 6.517 6.517h6.051l19.243-19.225a1.537 1.537 0 000-2.145L30.94 9.118a1.48 1.48 0 00-.482-.325zM40.5 41.963a1.5 1.5 0 100-3H24.436L41.56 21.854l.01-.01a4.537 4.537 0 000-6.358l-8.498-8.48-.004-.004a4.481 4.481 0 00-6.362.001l-.003.003L5.506 28.203l-.003.003a4.48 4.48 0 000 6.363l.003.003 6.95 6.951a1.5 1.5 0 001.062.44h26.98z"
        fill="#002"
      />
    </Svg>
  )
}

export default EraserIcon
