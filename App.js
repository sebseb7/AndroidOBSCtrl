/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  PermissionsAndroid,
  Text,
  useColorScheme,
  View,
  Pressable
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Geolocation from '@react-native-community/geolocation';

const io = require("socket.io-client");
const socket = io("ws://------------:----"); 

const isGPSSent = false;

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

var gpsButtonC = '#55f';

function setGpsButtonColor(c) {
	gpsButtonC=c;
}

function getGpsButtonColor() {
	return gpsButtonC;
}

socket.on('connect', () => {
	socket.emit('getState');
});
socket.on('disconnect', () => {
});

var setter;
function registerT(f){setter=f};
function setT(t){
	if(setter)setter(t);
}

var socket_counter = 0;

var gps_active = false;

var setMapColG;
var setRecColG;
var setrtmp1ColG;
var setrtmp2ColG;
var setrtmp3ColG;
var setScene1ColG;
var setScene2ColG;
var setSceneMixColG;
var setIntroColG;
var setExtroColG;
var setSrt1ColG;
var setSrt2ColG;

var mapOn = false;
const socketMap = () => {
	if(mapOn){
		if(socket.connected){
			socket.emit('mapoff');
			mapOn=false;
			setMapColG('#55f');
		}
	}else{
		if(socket.connected){
			socket.emit('mapon');
			mapOn=true;
			setMapColG('#070');
		}
	}
}
const socketMapClear = () => {
	if(socket.connected){
		socket.emit('clear3');
	}
}
var recOn = false;
const socketRec = () => {
	if(recOn){
		if(socket.connected){
			socket.emit('recstop');
			recOn=false;
			setRecColG('#55f');
		}
	}else{
		if(socket.connected){
			socket.emit('recstart');
			recOn=true;
			setRecColG('#070');
		}
	}
}
var rtmp1On = false;
const socketRtmp1 = () => {
	if(rtmp1On){
		if(socket.connected){
			socket.emit('rtmp1stop');
			rtmp1On=false;
			setrtmp1ColG('#55f');
		}
	}else{
		if(socket.connected){
			socket.emit('rtmp1start');
			rtmp1On=true;
			setrtmp1ColG('#070');
		}
	}
}
var rtmp2On = false;
const socketRtmp2 = () => {
	if(rtmp2On){
		if(socket.connected){
			socket.emit('rtmp2stop');
			rtmp2On=false;
			setrtmp2ColG('#55f');
		}
	}else{
		if(socket.connected){
			socket.emit('rtmp2start');
			rtmp2On=true;
			setrtmp2ColG('#070');
		}
	}
}
var rtmp3On = false;
const socketRtmp3 = () => {
	if(rtmp3On){
		if(socket.connected){
			socket.emit('rtmp3stop');
			rtmp3On=false;
			setrtmp3ColG('#55f');
		}
	}else{
		if(socket.connected){
			socket.emit('rtmp3start');
			rtmp3On=true;
			setrtmp3ColG('#070');
		}
	}
}
var sceneMode=1;
const socketScene1 = () => {
	if(sceneMode!=1){
		if(socket.connected){
			socket.emit('scene1');
			sceneMode=1;
			setScene1ColG('#070');
			setScene2ColG('#55f');
			setSceneMixColG('#55f');
		}
	}
}
const socketScene2 = () => {
	if(sceneMode!=2){
		if(socket.connected){
			socket.emit('scene2');
			sceneMode=2;
			setScene1ColG('#55f');
			setScene2ColG('#070');
			setSceneMixColG('#55f');
		}
	}
}
const socketSceneMix = () => {
	if(sceneMode!=3){
		if(socket.connected){
			socket.emit('sceneMix');
			sceneMode=3;
			setScene1ColG('#55f');
			setScene2ColG('#55f');
			setSceneMixColG('#070');
		}
	}
}
var introOn = false;
const socketIntro = () => {
	if(!introOn){
		if(socket.connected){
			socket.emit('modeIntro');
			introOn=true;
			extroOn=false;
			setIntroColG('#070');
			setExtroColG('#55f');
		}
	}else{
		if(socket.connected){
			socket.emit('modeNormal');
			introOn=false;
			extroOn=false;
			setIntroColG('#55f');
			setExtroColG('#55f');
		}
	}
}
var extroOn = false;
const socketExtro = () => {
	if(!extroOn){
		if(socket.connected){
			socket.emit('modeExtro');
			introOn=false;
			extroOn=true;
			setIntroColG('#55f');
			setExtroColG('#070');
		}
	}else{
		if(socket.connected){
			socket.emit('modeNormal');
			introOn=false;
			extroOn=false;
			setIntroColG('#55f');
			setExtroColG('#55f');
		}
	}
}
const socketShot = () => {
}
socket.on('state', (state) => {
	if(!setScene1ColG) return;
	if(state.sceneMode == 1){
		sceneMode=1;
		setScene1ColG('#070');
		setScene2ColG('#55f');
		setSceneMixColG('#55f');
	}
	else if(state.sceneMode == 2){
		sceneMode=2;
		setScene1ColG('#55f');
		setScene2ColG('#070');
		setSceneMixColG('#55f');
	}
	else if(state.sceneMode == 3){
		sceneMode=3;
		setScene1ColG('#55f');
		setScene2ColG('#55f');
		setSceneMixColG('#070');
	}

	if(state.mode == 'intro'){
		introOn=true;
		extroOn=false;
		setIntroColG('#070');
		setExtroColG('#55f');
	}
	else if(state.mode == 'extro'){
		introOn=false;
		extroOn=true;
		setIntroColG('#55f');
		setExtroColG('#070');
	}
	else if(state.mode == 'normal'){
		introOn=false;
		extroOn=false;
		setIntroColG('#55f');
		setExtroColG('#55f');
	}

	if(state.map){
		mapOn=true;
		setMapColG('#070');
	}else{
		mapOn=false;
		setMapColG('#55f');
	}

	if(state.rec){
		recOn=true;
		setRecColG('#070');
	}else{
		recOn=false;
		setRecColG('#55f');
	}

	if(state.rtmp1){
		rtmp1On=true;
		setrtmp1ColG('#070');
	}else{
		rtmp1On=false;
		setrtmp1ColG('#55f');
	}

	if(state.rtmp2){
		rtmp2On=true;
		setrtmp2ColG('#070');
	}else{
		rtmp2On=false;
		setrtmp2ColG('#55f');
	}

	if(state.rtmp3){
		rtmp3On=true;
		setrtmp3ColG('#070');
	}else{
		rtmp3On=false;
		setrtmp3ColG('#55f');
	}

	if(state.srt1){
		setSrt1ColG('#070');
	}else{
		setSrt1ColG('#55f');
	}

	if(state.srt2){
		setSrt2ColG('#070');
	}else{
		setSrt2ColG('#55f');
	}
	console.log(JSON.stringify(state));
});

var watchId = null;

const requestLocationPermission = async () => {
  console.log(watchId);
  if(gps_active) {
  	if(watchId != null){
		Geolocation.clearWatch(watchId);
		Geolocation.stopObserving();
		watchId=null;
	  	gps_active=false;
      	setT('stopped');
		gpsButtonC = '#44f';
	}else{
		console.log('no watchid');
	}
  	return;
  }
  console.log("ask");
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Grant?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the GPS");
	  gps_active=true;
      setT('gps_ok');
	  
	 // setInterval(() => {
	  setGpsButtonColor('#000');
	  watchId = Geolocation.watchPosition(
        position => {
	  	  setT('got loc');
          const initialPosition = JSON.stringify(position);
          console.log('GPS:'+JSON.stringify(initialPosition));
		  if(socket.connected){
		  	socket.emit('tpv2',{lat:position.coords.latitude,lon:position.coords.longitude,speed:position.coords.speed});
			socket_counter++;
			console.log('sent_'+socket_counter);
	  		setT('sent_'+socket_counter);
			setGpsButtonColor('#070');
		  }else{
			setGpsButtonColor('#f00');
	  	  	setT('no soc');
		  }

        },
        error => {
			console.log(JSON.stringify(error));
			setGpsButtonColor('#f00');
	  		setT(JSON.stringify(error));
		},
        {enableHighAccuracy: true, distanceFilter:5});
	   console.log(watchId);
    } else {
      console.log("GPS permission denied");
	  setT('denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [gpsButtonColor,setGpsButtonColor2] = useState("gpsstate");
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [counter, setCounter] = useState(0);
// Emmulate componentDidMount lifecycle
  useEffect(() => {
    s = setInterval(() => {
      setCounter(
       gpsButtonC
	  );
    }, 1000);
  }, []);

  const [gpsText, setText] = useState('init');
  registerT(setText);
  
  const [mapcol, setMapCol] = useState('#55f');
  setMapColG=function(c){setMapCol(c)};
  const [reccol, setRecCol] = useState('#55f');
  setRecColG=function(c){setRecCol(c)};
  const [rtmp1col, setRtmp1Col] = useState('#55f');
  setrtmp1ColG=function(c){setRtmp1Col(c)};
  const [rtmp2col, setRtmp2Col] = useState('#55f');
  setrtmp2ColG=function(c){setRtmp2Col(c)};
  const [rtmp3col, setRtmp3Col] = useState('#55f');
  setrtmp3ColG=function(c){setRtmp3Col(c)};
  const [scene1col, setScene1Col] = useState('#070');
  setScene1ColG=function(c){setScene1Col(c)};
  const [scene2col, setScene2Col] = useState('#55f');
  setScene2ColG=function(c){setScene2Col(c)};
  const [sceneMixcol, setSceneMixCol] = useState('#55f');
  setSceneMixColG=function(c){setSceneMixCol(c)};
  const [introcol, setIntroCol] = useState('#55f');
  setIntroColG=function(c){setIntroCol(c)};
  const [extrocol, setExtroCol] = useState('#55f');
  setExtroColG=function(c){setExtroCol(c)};
  const [srt1col, setSrt1Col] = useState('#55f');
  setSrt1ColG=function(c){setSrt1Col(c)};
  const [srt2col, setSrt2Col] = useState('#55f');
  setSrt2ColG=function(c){setSrt2Col(c)};
	
  //if(socket.connected) socket.emit('getState');

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{margin:1}}>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 32,borderRadius: 14,elevation: 3,backgroundColor:counter}} onPress={requestLocationPermission}>
		      <Text style={styles.text}>{gpsText}</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:srt1col}}>
		      <Text style={styles.text}>SRT1</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:srt2col}}>
		      <Text style={styles.text}>SRT2</Text>
		    </Pressable>
		  </View>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:mapcol}} onPress={socketMap}>
		      <Text style={styles.text}>Map</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:'#55f'}} onPress={socketMapClear}>
		      <Text style={styles.text}>Clear</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:reccol}} onPress={socketRec}>
		      <Text style={styles.text}>Rec</Text>
		    </Pressable>
		  </View>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:rtmp1col}} onPress={socketRtmp1}>
		      <Text style={styles.text}>RTMP1</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:rtmp2col}} onPress={socketRtmp2}>
		      <Text style={styles.text}>RTMP2</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:rtmp3col}} onPress={socketRtmp3}>
		      <Text style={styles.text}>RTMP3</Text>
		    </Pressable>
		  </View>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:scene1col}} onPress={socketScene1}>
		      <Text style={styles.text}>1</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:scene2col}} onPress={socketScene2}>
		      <Text style={styles.text}>2</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:sceneMixcol}} onPress={socketSceneMix}>
		      <Text style={styles.text}>Mix</Text>
		    </Pressable>
		  </View>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:introcol}} onPress={socketIntro}>
		      <Text style={styles.text}>Intro</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:extrocol}} onPress={socketExtro}>
		      <Text style={styles.text}>Extro</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 12,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:'#55f'}} onPress={socketShot}>
		      <Text style={styles.text}>Shot</Text>
		    </Pressable>
		  </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
