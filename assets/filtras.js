import React from "react"
import Svg, { Line,Circle} from "react-native-svg"

const Filtras = (props) => {
	var height = props.height
	var width = props.width
	const style = {fill:'none',stroke:'#1C2F5D',strokeWidth:3,strokeLinecap:'round',strokeLinejoin:'round',strokeMiterlimit:10}
	const style2 = {fill:'none',stroke:'#1C2F5D',strokeWidth:2,strokeMiterlimit:10}
	return (
		

<Svg   width={width} height={height} x={width} y={height} 	 viewBox="0 0 58.14 46.89" style="enable-background:new 0 0 58.14 46.89;">

<Line style={style} x1="1.51" y1="5.48" x2="56.59" y2="5.48"/>
<Line style={style} x1="1.51" y1="23.44" x2="56.59" y2="23.44"/>
<Line style={style} x1="1.51" y1="41.41" x2="56.59" y2="41.41"/>
<Circle style={style2} cx="27.41" cy="40.85" r="5.11"/>
<Circle style={style2} cx="43.75" cy="23.44" r="5.11"/>
<Circle style={style2} cx="13.02" cy="6.04" r="5.11"/>
</Svg>
	)
}
export default Filtras