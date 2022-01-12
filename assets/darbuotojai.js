import React from "react"
import { Dimensions } from "react-native";
import Svg, { Path, Rect, G, Circle, Polyline } from "react-native-svg"

const Darbuotojai = (props) => {
	var height = props.height
	var width = props.width
	const style = {fill:'none',stroke:'#FFFFFF',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round',strokeMiterlimit:10}
	return (
		
		<Svg  width={width} height={height} x={width} y={height}
		viewBox="0 0 87.77 45.64" style="enable-background:new 0 0 87.77 45.64;" >
 
   <Path style={style} d="M59.64,34.11c-2.54-7.64-7.89-13.46-15.87-13.46c-7.97,0-13.3,5.81-15.85,13.43"/>
   <Path style={style} d="M43.78,19.51c5.25,0,9.52-4.27,9.52-9.52c0-5.25-4.27-9.52-9.52-9.52s-9.52,4.27-9.52,9.52
	   C34.26,15.24,38.53,19.51,43.78,19.51z"/>
   <G>
	   <Path style={style} d="M87.29,45.15c-2.54-7.66-7.89-13.5-15.87-13.5c-7.97,0-13.3,5.82-15.85,13.46"/>
	   <Path style={style} d="M71.43,30.53c5.25,0,9.52-4.27,9.52-9.52c0-5.25-4.27-9.52-9.52-9.52s-9.52,4.27-9.52,9.52
		   C61.91,26.25,66.18,30.53,71.43,30.53z"/>
   </G>
   <G>
	   <Path style={style} d="M32.19,45.15c-2.54-7.66-7.89-13.5-15.87-13.5c-7.97,0-13.3,5.82-15.85,13.46"/>
	   <Path style={style} d="M16.33,30.53c5.25,0,9.52-4.27,9.52-9.52c0-5.25-4.27-9.52-9.52-9.52s-9.52,4.27-9.52,9.52
		   C6.81,26.25,11.08,30.53,16.33,30.53z"/>
   </G>
   </Svg>
	)
}
export default Darbuotojai