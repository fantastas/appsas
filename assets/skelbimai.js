import React from "react"
import { Dimensions } from "react-native";
import Svg, { Path, Rect, G, Circle, Polyline, Line } from "react-native-svg"

const Pliusas = (props) => {
	var height = props.height
	var width = props.width
	const style = { fill: 'none', stroke: '#FFFFFF', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10, strokeWidth: 2 }
	return (

		<Svg width={width} height={height} x={width} y={height} viewBox="0 0 48.69 46.88" style="enable-background:new 0 0 48.69 46.88;">
			<G>
				<Line style={style} x1="24.34" y1="0.52" x2="24.34" y2="46.38" />
				<Line style={style} x1="48.17" y1="23.45" x2="0.51" y2="23.45" />
			</G>
		</Svg>
	)
}
export default Pliusas