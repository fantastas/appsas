import React from "react"
import { Dimensions } from "react-native";
import Svg, { Path, Rect, G, Circle, Polyline } from "react-native-svg"

const Sutape = (props) => {
	var height = props.height
	var width = props.width
	return (
		<Svg width={width} height={height} x={width} y={height} viewBox="0 0 56 49.15">
			<G>
				<Circle style={{ fill: '#FFFFFF' }} cx="53.65" cy="6.36" r="2.35" />
				<G>
					<Circle style={{ fill: '#FFFFFF' }} cx="2.35" cy="43" r="2.35" />
					<Path style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeMiterlimit: 10 }} d="M20.07,38.5c0,0,9.8,0.03,10.63-0.04c0.83-0.07,4.44-0.22,4.69-4.59c0.15-2.66-1.58-3.68-2.95-4.06
							c-0.88-0.25-1.61-0.24-1.61-0.24l-7.1,0c-2.09,0-4.18-0.31-6.12-1.09C4.97,23.4,6.01,5.16,19.27,1.39
							C20.8,0.95,22.4,0.8,23.99,0.8l21.6,0v5.16l-18.19,0c-1.17,0-2.34,0.11-3.51,0.27c-12.05,1.73-12.04,16.99,0.75,17.94
							c0.37,0.03,0.86,0.09,1.3,0.12c0.24,0.02,1.01,0.05,1.21,0.06l1.51,0.04"/>
					<Path style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeMiterlimit: 10 }} d="M41.64,11.2H25.95c-0.93,0-1.86,0.26-2.6,0.83c-0.73,0.56-1.43,1.5-1.56,3.06c-0.15,1.75,0.83,2.78,1.83,3.37
						c0.89,0.53,1.93,0.75,2.96,0.75h7.55c1.36,0,2.72,0.13,4.04,0.47c15.69,4.02,13.2,28.42-3.66,29.06c-0.09,0-23,0-23.94,0v-5.16
						c0.79,0,18.77,0.33,20.09,0c14.92-3.73,14.52-18.66,2.76-19.15"/>
					<Circle style={{ fill: '#FFFFFF', stroke: '#1C2F5D', strokeWidth: 2, strokeMiterlimit: 10 }} cx="28.68" cy="24.77" r="19.36" />
					<Polyline style={{ fill: 'none', stroke: '#1C2F5D', strokeWidth: 2, strokeMiterlimit: 1 }} points="20.07,24.58 27.82,32.53 37.29,17 		" />
				</G>
			</G>
		</Svg>
	)
}
export default Sutape