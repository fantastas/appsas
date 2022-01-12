import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row'
  },
  cont30: {
    width: '30%',
    textAlign: "center",
    alignSelf: 'center',
    flex: 1,

  },
  btn: {
    alignSelf: 'center',
    // flex:1,     
    width: '90%',
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 20,
    justifyContent: 'flex-end',
    fontSize: "32px",
    backgroundColor: "#1C2F5D",
    color: "white",
  },
  text: {
    // alignSelf:'center',
    fontSize: 26,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  list: {
    // margin:'10px'
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  whiteBG: {
    backgroundColor: "#000000"
  },
  background: {
    backgroundColor: "#FFFFFF"
  },
  containerStyle: {
    backgroundColor: 'white',
    position: "absolute",
    flex: 1,
    // top:'50%',
    width: '100%',
    zIndex: 101, // works on ios
    elevation: 101, // works on android},
    // padding:,
    left: 0,
    // height:Dimensions.get('window').height,
    top: 0
  },
  label: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    width: "100%",
  },
  modal: {}
});

export default styles

