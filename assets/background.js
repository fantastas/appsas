import React from "react"
import { Dimensions } from "react-native";
import Svg, {Path,Rect, G, Ellipse} from "react-native-svg"

const Background = (props)=>{

	const windowWidth = Dimensions.get('window').width;
	const windowHeight = Dimensions.get('window').height;
return(
<Svg  width={windowWidth} height={windowHeight}
	 viewBox={`0 0 ${windowWidth} ${windowHeight}`}  >
	<G>
	<Rect x="0.39" y="0.23" style={{fill:'#FDB72E'}} width={windowWidth} height={windowHeight}/>
	<Ellipse style={{fill:'#1D305D'}} cx={-windowWidth/4}  cy={windowHeight/2.4} rx={windowWidth*1.2} ry={windowHeight/1.78}/>
	</G>
</Svg>

)

}


export default Background