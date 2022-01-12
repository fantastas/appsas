import React from "react"
import { Dimensions } from "react-native";
import Svg, { Path, Rect, G, Circle } from "react-native-svg"

const Match = (props) => {
	var height = props.height
	var width = props.width
	return (
		<Svg width={width} height={height} x={width} y={height} viewBox="0 0 86.36 86.36" space="preserve">
			<Circle style={{ fill: '#1C2F5D' }} cx="43.18" cy="43.18" r="43.18" />
			<Circle style={{ fill: '#FFFFFF' }} cx="43.18" cy="43.18" r="38.48" />
			<Circle style={{ fill: '#1C2F5D' }} cx="64.88" cy="29.59" r="1.99" />
			<Circle style={{ fill: '#1C2F5D' }} cx="21.47" cy="58.61" r="1.99" />
			<G>
				<G>
					<Path style={{ fill: 'none', stroke: '#1C2F5D', strokeWidth: 1.5, strokeMiterlimit: 10 }} d="M28,54.79c0,0,16.77,0.03,17.46-0.03c0.7-0.06,3.76-0.18,3.96-3.88c0.13-2.25-1.34-3.11-2.5-3.44
			c-0.74-0.21-1.36-0.2-1.36-0.2l-6.01,0c-1.77,0-3.54-0.26-5.18-0.92c-10.69-4.3-9.81-19.73,1.41-22.93
			c1.29-0.37,2.65-0.5,3.99-0.5l18.27,0v4.36l-15.39,0c-0.99,0-1.98,0.09-2.97,0.23c-10.19,1.46-10.19,14.37,0.64,15.18
			c0.31,0.02,0.72,0.07,1.1,0.1c0.2,0.01,0.86,0.04,1.02,0.05l1.28,0.03"/>
					<Path style={{ fill: 'none', stroke: '#1C2F5D', strokeWidth: 1.5, strokeMiterlimit: 10 }} d="M58.29,31.69H41.45c-0.79,0-1.58,0.22-2.2,0.7c-0.62,0.48-1.21,1.27-1.32,2.59c-0.12,1.48,0.7,2.35,1.55,2.86
			c0.75,0.44,1.63,0.64,2.51,0.64h6.39c1.15,0,2.3,0.11,3.42,0.39c13.28,3.4,11.17,24.05-3.1,24.59c-0.07,0-19.46,0-20.26,0v-4.36
			c0.67,0,15.85-0.05,17,0c13.72,0.57,12.29-15.79,2.33-16.2"/>
				</G>
			</G>
		</Svg>
	)
}
export default Match