import { StyleSheet} from  'react-native';

const styles = StyleSheet.create({
  
  container:{
    flex:1,
    padding:15
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
        paddingTop:8,
        paddingBottom:8,
        marginBottom:20,
        fontSize:"32px",
        backgroundColor:"#1C2F5D",
        borderRadius:8,
        alignItems:'center'
  },
  btnSetup:{ alignSelf:'center',
  // flex:1,     
  width:'90%',
  paddingTop:8,
  paddingBottom:8,
  fontSize:"32px",
  backgroundColor:"#1C2F5D",
  borderRadius:8,
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
      // width:20,
      height:'100%',
      zIndex:20
  },
  background:{
    backgroundColor:"#FFFFFF"
  },
  backgroundBlue:{
    backgroundColor:"#1C2F5D",

  },
  flex:{
    flex:1
  },
  inputText:{
    width:"100%",
    alignSelf:'center',
    height:38,
    borderColor:"#1C2F5D",
    borderWidth:2,
    backgroundColor:'#ffffff',
    borderRadius:8,
    borderTopEndRadius:8,
    borderTopLeftRadius:8,
    overflow:'hidden'
  },
  inputTexts:{
    width:"100%",
    alignSelf:'center',
    height:38,
    borderColor:"#1C2F5D",
    borderWidth:2,
    backgroundColor:'#ffffff',
    borderRadius:8,
    borderTopEndRadius:8,
    borderTopLeftRadius:8,
    overflow:'hidden',
    marginBottom:15
  },
  inputMulti:{
    width:"100%",
    alignSelf:'center',
    height:90,
    borderColor:"#1C2F5D",
    borderWidth:2,
    backgroundColor:'#ffffff',
    borderRadius:8,
    borderTopEndRadius:8,
    borderTopLeftRadius:8,
    overflow:'hidden',
    marginBottom:15
  },
  picker:{
    width:"60%"
  },
  textCM:{
    color:"#1C2F5D",
    fontSize:17,
  },
  textButton:{
    fontWeight:'bold'
  },
  textWhite:{
      color:'white'
  },
  relative:{
      position:'relative'
  },
  bannerText:{
      paddingTop:35,
      paddingLeft:40,
      fontSize:19,
      width:300
  },
  LoginText:{
      fontSize:20,
      paddingBottom:10,
      fontWeight:'bold',

  },
  socialConnect:{
      borderRadius:8
  },
  toploginRegistrationButtonContainer:{
    borderColor:'white',
    borderWidth:1,
    borderRadius:8,
    overflow:'hidden'
  },
  toploginRegistrationText:{
    fontSize:14,
    overflow:'visible',
    padding:2,
    textAlign:'center'
    },
  toploginRegistrationButton:{
    overflow:'visible',
    letterSpacing: 'normal',
    marginVertical:0,
    padding:0,
    borderRadius:0
  },
  paddingBottomInput:{
    paddingBottom:25
  },
  charCount:{
    textAlign:'left',
    alignSelf:'flex-end',
    color:'grey',
    fontSize:16
  },
  scobo:{
    color:'white',
    fontSize:28,
    fontWeight:'600'
  },
  innerSelect:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomWidth:1,
    borderBottomColor:'grey',
    padding:9,
    alignItems:'center',
   
  },
  innerSelectText:{
    fontSize:18
  },
  inputTextsPersonal:{
    width:"95%",
    alignSelf:'center',
    height:45,
    borderColor:"#1C2F5D",
    borderWidth:1,
    backgroundColor:'#ffffff',
    borderRadius:8,
    borderTopEndRadius:8,
    borderTopLeftRadius:8,
    overflow:'hidden',
    marginBottom:15,
    marginTop:15,
  }
  
});
export default styles