import { StyleSheet} from  'react-native';

const styles = StyleSheet.create({
  
  container:{
    flex:1,
  },
  centerContainer:{
      flex:1,
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center',
    alignContent:'center',
  },
  center:{
    alignItems:'center',
    
    
  }
  ,
  middleContainer:{
    alignSelf:'center',

  },
    row:{
        flexDirection:'row'
    },
   cont30:{
        width:'30%',
        textAlign: "center", 
        alignSelf:'center',
        flex:1,
        
   },
  btn:{ alignSelf:'center',
        // flex:1,     
        width:'90%',
        paddingTop:12,
        paddingBottom:12,
        marginBottom:20,
        justifyContent:'flex-end',
        fontSize:"32px",
        backgroundColor:"#1C2F5D",
  },
  text:{
    // alignSelf:'center',
    fontSize:26,
  },
  topText:{
    marginTop:30,
    fontSize:26,
  }
  ,
  list:{
    // margin:'10px'
    padding:20,
    alignSelf:'center',
    alignItems:'center',
  alignContent:'center',
  },
  textleft:{
    padding:20,
    // alignSelf:'center',
    // alignItems:'center',
//   alignContent:'center',
  },
  rightButton:{
      position:'absolute',
      right:0,
      top:15,
    //   width:20,
      height:'100%',
      zIndex:20
  },
  background:{
    backgroundColor:"#FFFFFF"
  },
  flex:{
    flex:1
  },
  inputText:{
    width:"90%",
    alignSelf:'center',
    height:40,
    borderColor:"#1C2F5D",
    backgroundColor:'#ffffff',
  },
  picker:{
    width:"60%"
  },
  textCM:{
    color:"#1C2F5D",
  }

  
});
export default styles