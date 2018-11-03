import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
 } from 'react-native';

import getImageForWeather from './utils/getImageForWeather';
import {fetchWeather,fetchLocationId} from './utils/api'
import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  state = {
    location:"",
    loading:false,
    error:false,
    temperature:0,
    weather:''
  }

  componentDidMount=(props)=>{
    this.handleUpdateLocation('shanghai');
  }

  handleUpdateLocation =async city=>{
    if(!city) return;
    this.setState({loading:true},async ()=>{
      try{
        const locationId = await fetchLocationId(city)
        const {location,weather,temperature} = await fetchWeather(locationId)
        this.setState({
          loading:false,
          error:false,
          location,
          weather,
          temperature,
        })
      } catch(e){
        this.setState({
          loading:false,
          error:true
        })
      }
    })
  }



  render() {
    const {loading,location,temperature,weather,error} = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStley={styles.image}
        >
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading &&
            <View style={styles.detailsContainer}>
              {error && (
                <Text style={[styles.smallText,styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                  <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                  <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
                </View>
              )}

            <SearchInput
              placeholder="select a city"
              onSubmit = {this.handleUpdateLocation}
            />
          </View>}
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#34495E",
  },
  textStyle:{
    textAlign:"center",
    fontFamily:Platform.OS === "ios" ?'AvenirNext-Regular' : 'Roboto',
    color:"white",
  },
  largeText:{
    fontSize:48,
  },
  smallText:{
    fontSize:18
  },
  textInput:{
    backgroundColor:'#666',
    color:"white",
    height:40,
    width:300,
    marginTop:20,
    marginHorizontal:30,
    paddingHorizontal:10,
    alignSelf:"center"
  },
  imageContainer:{
    flex:1,
  },
  image:{
    flex:1,
    width:null,
    height:null,
    resizeMode:'cover'
  },
  detailsContainer:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
});
