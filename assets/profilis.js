import React from "react"
import { Dimensions } from "react-native";
import Svg, { Path, Rect, G, Circle, Polyline } from "react-native-svg"

const Profilis = (props) => {
	var height = props.height
	var width = props.width
	return (
<Svg width={width} height={height} x={width} y={height} viewBox="0 0 48.65 46.42" >
<Path style={{fill:'none',stroke:'#FFFFFF',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round',strokeMiterlimit:10}} d="M48.21,45.98c-3.43-10.32-13.13-18.19-23.88-18.19c-10.74,0-20.42,7.85-23.86,18.15"/>
<Path style={{fill:'none',stroke:'#FFFFFF',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round',strokeMiterlimit:10}} d="M24.33,26.27c7.07,0,12.83-5.76,12.83-12.83c0-7.07-5.76-12.83-12.83-12.83S11.5,6.37,11.5,13.44
	C11.5,20.52,17.25,26.27,24.33,26.27z"/>
</Svg>

)
}
export default Profilis