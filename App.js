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
  Image,
  Pressable
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Geolocation from '@react-native-community/geolocation';

import DeviceInfo from 'react-native-device-info';

const uniqueId = DeviceInfo.getUniqueId();

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
	socket.emit('getState',uniqueId);
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
var setMap2ColG;
var setRecColG;
var setClearColG;
var setClear2ColG;
var setrtmp1ColG;
var setrtmp2ColG;
var setrtmp3ColG;
var setScene1ColG;
var setScene2ColG;
var setSceneMixColG;
var setSceneMix1ColG;
var setSceneMixNoneColG;
var setSceneMix2ColG;
var setIntroColG;
var setExtroColG;
var setSrt1ColG;
var setSrt2ColG;
var setImgUriG;
var setImg2UriG;
var setTweetColG;
var setInfoTextG;
var setRtmp2TextG;
var srt1on = false;
var srt2on = false;
var mapOn = false;
var map2On = false;
const socketMap = () => {
	if(mapOn){
		if(socket.connected){
			socket.emit('mapoff',uniqueId);
			mapOn=false;
			setMapColG('#55f');
		}
	}else{
		if(socket.connected){
			socket.emit('mapon',uniqueId);
			mapOn=true;
			map2On=false;
			setMapColG('#070');
			setMap2ColG('#55f');
		}
	}
}
const socketMap2 = () => {
	if(map2On){
		if(socket.connected){
			socket.emit('mapoff2',uniqueId);
			map2On=false;
			setMap2ColG('#55f');
		}
	}else{
		if(socket.connected){
			socket.emit('mapon2',uniqueId);
			map2On=true;
			mapOn=false;
			setMap2ColG('#070');
			setMapColG('#55f');
		}
	}
}
var clearPress = false;
var clear2Press = false;
const socketMapClear = () => {
	if(!clearPress){
		setClearColG('#f55');
		clearPress=true;
		setTimeout(()=>{
			if(clearPress){
				setClearColG('#55f');
				clearPress=false;
			}
		},2000);
	}
	else if(socket.connected){
		clearPress=false;
		setClearColG('#55f');
		socket.emit('clear3',uniqueId);
	}
}
const socketMap2Clear = () => {
	if(!clear2Press){
		setClear2ColG('#f55');
		clear2Press=true;
		setTimeout(()=>{
			if(clear2Press){
				setClear2ColG('#55f');
				clear2Press=false;
			}
		},2000);
	}
	else if(socket.connected){
		clear2Press=false;
		setClear2ColG('#55f');
		socket.emit('clear2',uniqueId);
	}
}
var tweetPress = false;
const socketTweet = () => {
	if(!tweetPress){
		setTweetColG('#f55');
		tweetPress=true;
		setTimeout(()=>{
			if(tweetPress){
				setTweetColG('#55f');
				tweetPress=false;
			}
		},2000);
	}
	else if(socket.connected){
		socket.emit('tweet');
		tweetPress=false;
		setTweetColG('#55f');
	}
}
var recPress = false;
var rtmp1Press = false;
var rtmp2Press = false;
var rtmp3Press = false;
var recOn = false;
const socketRec = () => {
	if(recOn){
		if(!recPress){
			setRecColG('#f55');
			recPress=true;
			setTimeout(()=>{
				if(recPress){
					setRecColG('#070');
					recPress=false;
				}
			},2000);
		}
		else if(socket.connected){
			socket.emit('recstop',uniqueId);
			recPress=false;
			recOn=false;
			setRecColG('#55f');
		}
	}else{
		if(!recPress){
			setRecColG('#ff5');
			recPress=true;
			setTimeout(()=>{
				if(recPress){
					setRecColG('#55f');
					recPress=false;
				}
			},2000);
		}
		else if(socket.connected){
			socket.emit('recstart',uniqueId);
			recPress=false;
			recOn=true;
			setRecColG('#070');
		}
	}
}
var rtmp1On = false;
const socketRtmp1 = () => {
	if(rtmp1On){
		if(!rtmp1Press){
			setrtmp1ColG('#f55');
			rtmp1Press=true;
			setTimeout(()=>{
				if(rtmp1Press){
					setrtmp1ColG('#070');
					rtmp1Press=false;
				}
			},2000);
		}
		else if(socket.connected){
			socket.emit('rtmp1stop',uniqueId);
			rtmp1Press=false;
			rtmp1On=false;
			setrtmp1ColG('#55f');
		}
	}else{
		if(!rtmp1Press){
			setrtmp1ColG('#ff5');
			rtmp1Press=true;
			setTimeout(()=>{
				if(rtmp1Press){
					setrtmp1ColG('#55f');
					rtmp1Press=false;
				}
			},2000);
		}
		else if(socket.connected){
			socket.emit('rtmp1start',uniqueId);
			rtmp1Press=false;
			rtmp1On=true;
			setrtmp1ColG('#070');
		}
	}
}
var rtmp2On = false;
const socketRtmp2 = () => {
	if(rtmp2On){
		if(!rtmp2Press){
			setrtmp2ColG('#f55');
			rtmp2Press=true;
			setTimeout(()=>{
				if(rtmp2Press){
					setrtmp2ColG('#070');
					rtmp2Press=false;
				}
			},2000);
		}
		else if(socket.connected){
			socket.emit('rtmp2stop',uniqueId);
			rtmp2Press=false;
			rtmp2On=false;
			setrtmp2ColG('#55f');
		}
	}else{
		if(!rtmp2Press){
			setrtmp2ColG('#ff5');
			rtmp2Press=true;
			setTimeout(()=>{
				if(rtmp2Press){
					setrtmp2ColG('#55f');
					rtmp2Press=false;
				}
			},2000);
		}
		else if(socket.connected){
			socket.emit('rtmp2start',uniqueId);
			rtmp2Press=false;
			rtmp2On=true;
			setrtmp2ColG('#070');
		}
	}
}
var rtmp3On = false;
const socketRtmp3 = () => {
	if(rtmp3On){
		if(!rtmp3Press){
			setrtmp3ColG('#f55');
			rtmp3Press=true;
			setTimeout(()=>{
				if(rtmp3Press){
					setrtmp3ColG('#070');
					rtmp3Press=false;
				}
			},2000);
		}
		else if(socket.connected){
			socket.emit('rtmp3stop',uniqueId);
			rtmp3Press=false;
			rtmp3On=false;
			setrtmp3ColG('#55f');
		}
	}else{
		if(!rtmp3Press){
			setrtmp3ColG('#ff5');
			rtmp3Press=true;
			setTimeout(()=>{
				if(rtmp3Press){
					setrtmp3ColG('#55f');
					rtmp3Press=false;
				}
			},2000);
		}
		else if(socket.connected){
			socket.emit('rtmp3start',uniqueId);
			rtmp3Press=false;
			rtmp3On=true;
			setrtmp3ColG('#070');
		}
	}
}
var sceneMode=1;
const socketScene1 = () => {
	if(sceneMode!=1){
		if(socket.connected){
			socket.emit('scene1',uniqueId);
			sceneMode=1;
			setScene1ColG('#070');
			setScene2ColG('#55f');
			setSceneMixColG('#55f');
			setSceneMix1ColG('#55f');
			setSceneMix2ColG('#55f');
			setSceneMixNoneColG('#55f');
		}
	}
}
const socketScene2 = () => {
	if(sceneMode!=2){
		if(socket.connected){
			socket.emit('scene2',uniqueId);
			sceneMode=2;
			setScene1ColG('#55f');
			setScene2ColG('#070');
			setSceneMixColG('#55f');
			setSceneMix1ColG('#55f');
			setSceneMix2ColG('#55f');
			setSceneMixNoneColG('#55f');
		}
	}
}
const socketSceneMix = () => {
	if(sceneMode!=3){
		if(socket.connected){
			socket.emit('sceneMix',uniqueId);
			sceneMode=3;
			setScene1ColG('#55f');
			setScene2ColG('#55f');
			setSceneMixColG('#070');
			setSceneMix1ColG('#55f');
			setSceneMix2ColG('#55f');
			setSceneMixNoneColG('#55f');
		}
	}
}
const socketSceneMix1 = () => {
	if(sceneMode!=31){
		if(socket.connected){
			socket.emit('sceneMix1',uniqueId);
			sceneMode=31;
			setScene1ColG('#55f');
			setScene2ColG('#55f');
			setSceneMixColG('#55f');
			setSceneMix1ColG('#070');
			setSceneMix2ColG('#55f');
			setSceneMixNoneColG('#55f');
		}
	}
}
const socketSceneMix2 = () => {
	if(sceneMode!=32){
		if(socket.connected){
			socket.emit('sceneMix2',uniqueId);
			sceneMode=32;
			setScene1ColG('#55f');
			setScene2ColG('#55f');
			setSceneMixColG('#55f');
			setSceneMix1ColG('#55f');
			setSceneMix2ColG('#070');
			setSceneMixNoneColG('#55f');
		}
	}
}
const socketSceneMixNone = () => {
	if(sceneMode!=4){
		if(socket.connected){
			socket.emit('sceneMixNone',uniqueId);
			sceneMode=4;
			setScene1ColG('#55f');
			setScene2ColG('#55f');
			setSceneMixColG('#55f');
			setSceneMix1ColG('#55f');
			setSceneMix2ColG('#55f');
			setSceneMixNoneColG('#070');
		}
	}
}
var introOn = false;
const socketIntro = () => {
	if(!introOn){
		if(socket.connected){
			socket.emit('modeIntro',uniqueId);
			introOn=true;
			extroOn=false;
			setIntroColG('#070');
			setExtroColG('#55f');
		}
	}else{
		if(socket.connected){
			socket.emit('modeNormal',uniqueId);
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
			socket.emit('modeExtro',uniqueId);
			introOn=false;
			extroOn=true;
			setIntroColG('#55f');
			setExtroColG('#070');
		}
	}else{
		if(socket.connected){
			socket.emit('modeNormal',uniqueId);
			introOn=false;
			extroOn=false;
			setIntroColG('#55f');
			setExtroColG('#55f');
		}
	}
}
const socketShot = () => {
	socket.emit('getShot',uniqueId);
	socket.emit('getState',uniqueId);
	setImgUriG('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYwAAADYCAIAAAB3M0NIAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TxSItInYQcchQnayIijhKFYtgobQVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi6OSk6CIl/i8ptIjx4Lgf7+497t4BQqPCVLNrAlA1y0jFY2I2tyr2vEJAAP0YR0hipp5IL2bgOb7u4ePrXZRneZ/7c4SUvMkAn0g8x3TDIt4gntm0dM77xGFWkhTic+Ixgy5I/Mh12eU3zkWHBZ4ZNjKpeeIwsVjsYLmDWclQiaeJI4qqUb6QdVnhvMVZrdRY6578hcG8tpLmOs1hxLGEBJIQIaOGMiqwEKVVI8VEivZjHv4hx58kl0yuMhg5FlCFCsnxg//B727NwtSkmxSMAd0vtv0xAvTsAs26bX8f23bzBPA/A1da219tALOfpNfbWuQI6NsGLq7bmrwHXO4Ag0+6ZEiO5KcpFArA+xl9Uw4YuAV619zeWvs4fQAy1NXyDXBwCIwWKXvd492Bzt7+PdPq7wdmHHKiSMerMAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YCCBEvCyuXARIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABEElEQVR42u3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgLcB62UAATGAzeEAAAAASUVORK5CYII=');
}
const socketAudioLevel = () => {
	socket.emit('getAudioLevel',uniqueId);
	setImg2UriG('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYwAAADYCAIAAAB3M0NIAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TxSItInYQcchQnayIijhKFYtgobQVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi6OSk6CIl/i8ptIjx4Lgf7+497t4BQqPCVLNrAlA1y0jFY2I2tyr2vEJAAP0YR0hipp5IL2bgOb7u4ePrXZRneZ/7c4SUvMkAn0g8x3TDIt4gntm0dM77xGFWkhTic+Ixgy5I/Mh12eU3zkWHBZ4ZNjKpeeIwsVjsYLmDWclQiaeJI4qqUb6QdVnhvMVZrdRY6578hcG8tpLmOs1hxLGEBJIQIaOGMiqwEKVVI8VEivZjHv4hx58kl0yuMhg5FlCFCsnxg//B727NwtSkmxSMAd0vtv0xAvTsAs26bX8f23bzBPA/A1da219tALOfpNfbWuQI6NsGLq7bmrwHXO4Ag0+6ZEiO5KcpFArA+xl9Uw4YuAV619zeWvs4fQAy1NXyDXBwCIwWKXvd492Bzt7+PdPq7wdmHHKiSMerMAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YCCBEvCyuXARIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABEElEQVR42u3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgLcB62UAATGAzeEAAAAASUVORK5CYII=');
}
socket.on('shot', (data,id) => {
	if(id == null || uniqueId == id) {
		setImgUriG(data);
	}
});
socket.on('audioLevel', (data,id) => {
	if(id == null || uniqueId == id) {
		setImg2UriG(data);
	}
});
var currentBy;
var currentText;
socket.on('infoText', (data,by) => {
	setInfoTextG(data);
	currentBy = by;
	currentText = data;
	if(socket.connected){
		if(by)socket.emit('respond','delivered: '+data,by);
	}
});
socket.on('ytCount', (data) => {
	console.log(data);
	setRtmp2TextG(data);
});
const confirmText = () => {
	if(currentBy && currentText && socket.connected){
		if(currentBy) socket.emit('respond','confirmed: '+currentText,currentBy);
	}
}

console.log(uniqueId);
socket.on('state', (state,reply,id) => {
	console.log(reply);
	console.log(id);
	if(reply){
		if(uniqueId != id) {
			console.log('reply not for me');
			return;
		}
	}else{
		if(uniqueId == id) {
			console.log('state from self');
			return;
		}
	}
	if(!setScene1ColG){
		setTimeout(()=>{socket.emit('getState',uniqueId);},2000);
	}
	if(state.sceneMode == 1){
		sceneMode=1;
		setScene1ColG('#070');
		setScene2ColG('#55f');
		setSceneMixColG('#55f');
		setSceneMix1ColG('#55f');
		setSceneMix2ColG('#55f');
		setSceneMixNoneColG('#55f');
	}
	else if(state.sceneMode == 2){
		sceneMode=2;
		setScene1ColG('#55f');
		setScene2ColG('#070');
		setSceneMixColG('#55f');
		setSceneMix1ColG('#55f');
		setSceneMix2ColG('#55f');
		setSceneMixNoneColG('#55f');
	}
	else if(state.sceneMode == 3){
		sceneMode=3;
		setScene1ColG('#55f');
		setScene2ColG('#55f');
		setSceneMixColG('#070');
		setSceneMix1ColG('#55f');
		setSceneMix2ColG('#55f');
		setSceneMixNoneColG('#55f');
	}
	else if(state.sceneMode == 31){
		sceneMode=3;
		setScene1ColG('#55f');
		setScene2ColG('#55f');
		setSceneMixColG('#55f');
		setSceneMix1ColG('#070');
		setSceneMix2ColG('#55f');
		setSceneMixNoneColG('#55f');
	}
	else if(state.sceneMode == 32){
		sceneMode=3;
		setScene1ColG('#55f');
		setScene2ColG('#55f');
		setSceneMixColG('#55f');
		setSceneMix1ColG('#55f');
		setSceneMix2ColG('#070');
		setSceneMixNoneColG('#55f');
	}
	else if(state.sceneMode == 4){
		sceneMode=4;
		setScene1ColG('#55f');
		setScene2ColG('#55f');
		setSceneMixColG('#55f');
		setSceneMix1ColG('#55f');
		setSceneMix2ColG('#55f');
		setSceneMixNoneColG('#070');
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
	if(state.map2){
		map2On=true;
		setMap2ColG('#070');
	}else{
		map2On=false;
		setMap2ColG('#55f');
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
		srt1on = true;
		setSrt1ColG('#070');
	}else{
		srt1on = false;
		setSrt1ColG('#55f');
	}

	if(state.srt2){
		srt2on = true;
		setSrt2ColG('#070');
	}else{
		srt2on = false;
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
	  		setT(socket_counter);
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
  const [map2col, setMap2Col] = useState('#55f');
  setMap2ColG=function(c){setMap2Col(c)};
  const [reccol, setRecCol] = useState('#55f');
  setRecColG=function(c){setRecCol(c)};
  const [clearcol, setClearCol] = useState('#55f');
  setClearColG=function(c){setClearCol(c)};
  const [clear2col, setClear2Col] = useState('#55f');
  setClear2ColG=function(c){setClear2Col(c)};
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
  const [sceneMix1col, setSceneMix1Col] = useState('#55f');
  setSceneMix1ColG=function(c){setSceneMix1Col(c)};
  const [sceneMixNonecol, setSceneMixNoneCol] = useState('#55f');
  setSceneMixNoneColG=function(c){setSceneMixNoneCol(c)};
  const [sceneMix2col, setSceneMix2Col] = useState('#55f');
  setSceneMix2ColG=function(c){setSceneMix2Col(c)};
  const [introcol, setIntroCol] = useState('#55f');
  setIntroColG=function(c){setIntroCol(c)};
  const [extrocol, setExtroCol] = useState('#55f');
  setExtroColG=function(c){setExtroCol(c)};
  const [srt1col, setSrt1Col] = useState('#55f');
  setSrt1ColG=function(c){setSrt1Col(c)};
  const [srt2col, setSrt2Col] = useState('#55f');
  setSrt2ColG=function(c){setSrt2Col(c)};
  const [tweetcol, setTweetCol] = useState('#55f');
  setTweetColG=function(c){setTweetCol(c)};
  const [infoText, setInfoText] = useState('');
  setInfoTextG=function(c){setInfoText(c)};
  const [rtmp2Text, setRtmp2Text] = useState('RTMP2');
  setRtmp2TextG=function(c){setRtmp2Text(c)};
	
  const [imgUri, setImgUri] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYwAAADYCAIAAAB3M0NIAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TxSItInYQcchQnayIijhKFYtgobQVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi6OSk6CIl/i8ptIjx4Lgf7+497t4BQqPCVLNrAlA1y0jFY2I2tyr2vEJAAP0YR0hipp5IL2bgOb7u4ePrXZRneZ/7c4SUvMkAn0g8x3TDIt4gntm0dM77xGFWkhTic+Ixgy5I/Mh12eU3zkWHBZ4ZNjKpeeIwsVjsYLmDWclQiaeJI4qqUb6QdVnhvMVZrdRY6578hcG8tpLmOs1hxLGEBJIQIaOGMiqwEKVVI8VEivZjHv4hx58kl0yuMhg5FlCFCsnxg//B727NwtSkmxSMAd0vtv0xAvTsAs26bX8f23bzBPA/A1da219tALOfpNfbWuQI6NsGLq7bmrwHXO4Ag0+6ZEiO5KcpFArA+xl9Uw4YuAV619zeWvs4fQAy1NXyDXBwCIwWKXvd492Bzt7+PdPq7wdmHHKiSMerMAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YCCBEvCyuXARIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABEElEQVR42u3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgLcB62UAATGAzeEAAAAASUVORK5CYII=');
  const [img2Uri, setImg2Uri] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYwAAADYCAIAAAB3M0NIAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TxSItInYQcchQnayIijhKFYtgobQVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi6OSk6CIl/i8ptIjx4Lgf7+497t4BQqPCVLNrAlA1y0jFY2I2tyr2vEJAAP0YR0hipp5IL2bgOb7u4ePrXZRneZ/7c4SUvMkAn0g8x3TDIt4gntm0dM77xGFWkhTic+Ixgy5I/Mh12eU3zkWHBZ4ZNjKpeeIwsVjsYLmDWclQiaeJI4qqUb6QdVnhvMVZrdRY6578hcG8tpLmOs1hxLGEBJIQIaOGMiqwEKVVI8VEivZjHv4hx58kl0yuMhg5FlCFCsnxg//B727NwtSkmxSMAd0vtv0xAvTsAs26bX8f23bzBPA/A1da219tALOfpNfbWuQI6NsGLq7bmrwHXO4Ag0+6ZEiO5KcpFArA+xl9Uw4YuAV619zeWvs4fQAy1NXyDXBwCIwWKXvd492Bzt7+PdPq7wdmHHKiSMerMAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YCCBEvCyuXARIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABEElEQVR42u3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgLcB62UAATGAzeEAAAAASUVORK5CYII=');
  setImgUriG=function(c){setImgUri(c)};
  setImg2UriG=function(c){setImg2Uri(c)};
  //if(socket.connected) socket.emit('getState');

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{margin:1}}>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white}}>
	      <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:'#000'}} onPress={()=>{setInfoText('');confirmText();}}>
		  	<Text style={{color:'#f00'}}>{infoText}</Text>
		  </Pressable>
		</View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:counter}} onPress={requestLocationPermission}>
		      <Text style={styles.text}>{gpsText}</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:srt1col}}>
		      <Text style={styles.text}>SRT1</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:srt2col}}>
		      <Text style={styles.text}>SRT2</Text>
		    </Pressable>
		  </View>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:mapcol}} onPress={socketMap}>
		      <Text style={styles.text}>Map</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:clearcol}} onPress={socketMapClear}>
		      <Text style={styles.text}>Clear</Text>
		    </Pressable>
		  </View>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:map2col}} onPress={socketMap2}>
		      <Text style={styles.text}>Map2</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:clear2col}} onPress={socketMap2Clear}>
		      <Text style={styles.text}>Clear2</Text>
		    </Pressable>
		  </View>
		</View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:introcol}} onPress={socketIntro}>
		      <Text style={styles.text}>Intro</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:extrocol}} onPress={socketExtro}>
		      <Text style={styles.text}>Extro</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:tweetcol}} onPress={socketTweet}>
		      <Text style={styles.text}>Tweet</Text>
		    </Pressable>
		  </View>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:rtmp1col}} onPress={socketRtmp1}>
		      <Text style={styles.text}>RTMP1</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:rtmp2col}} onPress={socketRtmp2}>
		      <Text style={styles.text}>{rtmp2Text}</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:rtmp3col}} onPress={socketRtmp3}>
		      <Text style={styles.text}>RTMP3</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:reccol}} onPress={socketRec}>
		      <Text style={styles.text}>Rec</Text>
		    </Pressable>
		  </View>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
		  <View style={{ flex: 1,padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:scene1col}} onPress={socketScene1}>
		      <Text style={styles.text}>1</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:scene2col}} onPress={socketScene2}>
		      <Text style={styles.text}>2</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:sceneMixcol}} onPress={socketSceneMix}>
		      <Text style={styles.text}>Mix</Text>
		    </Pressable>
		  </View>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:sceneMix1col}} onPress={socketSceneMix1}>
		      <Text style={styles.text}>Mix1</Text>
		    </Pressable>
		  </View>
      	  <View style={{ flex: 1, padding:1 }}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:sceneMix2col}} onPress={socketSceneMix2}>
		      <Text style={styles.text}>Mix2</Text>
		    </Pressable>
		  </View>
          <View style={{ flex: 1 ,padding:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 2,paddingHorizontal: 0,borderRadius: 14,elevation: 3,backgroundColor:sceneMixNonecol}} onPress={socketSceneMixNone}>
		      <Text style={styles.text}>None</Text>
		    </Pressable>
		  </View>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 0,paddingHorizontal: 0,borderRadius: 0,elevation: 0}} onPress={socketShot}>
				<Image
					style={{width: 198,height: 108}}
					source={{
						uri: imgUri
					}}
				/>
		    </Pressable>
        </View>
		<View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white,flexDirection: "row",flex:1}}>
	        <Pressable style={{alignItems: 'center',justifyContent: 'center',paddingVertical: 0,paddingHorizontal: 0,borderRadius: 0,elevation: 0}} onPress={socketAudioLevel}>
				<Image
					style={{width: 198,height: 108}}
					source={{
						uri: img2Uri
					}}
				/>
		    </Pressable>
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
