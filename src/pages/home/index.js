import React, {useState} from "react";
import { Alert, View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
//local imports
import API from '../../apis/weather/weatherApi';
import HomeHeader from '../home/designComponents/homeHeader';
import LocationWeatherDesign from '../home/designComponents/locationWeatherDesign';
import changeLocationState from '../../redux/actions/locationDataActions';
import LoaderModal from '../../utils/modalLoader';

function Home(props) {

    const [ loadingModal, setLoadingModal ] = useState(false);
    const { locationData, changeLocationState } = props;

    async function getWeatherData(unit) {

        const data = {
            units: unit, 
            lat: locationData.lat, 
            lon: locationData.lon
        }

        setLoadingModal(true);

        try {

            const weatherResponse = await API.getLocationData(data);

            console.log('weather response =>', weatherResponse);

            if (weatherResponse.current) {
                setLoadingModal(false);

                changeLocationState({
                    hourlyData: weatherResponse.hourly.slice(0, 25), 
                    dailyData: weatherResponse.daily, 
                    currentMainData: weatherResponse.current 
                });
               
            } else {
                setLoadingModal(false);

                alert("error")
                console.log("error!")
            }
          
        } catch (err) {
            setLoadingModal(false);
            alert(err);

            if (err instanceof TypeError) {
                if (err.message == 'Network request failed') {
                    alert("No hay internet");
                       console.log("No hay internet")
                }
                else {
                    alert("El servicio esta fallando.")
                    console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
                }
            }
        }
    }

    const changeUnits = (unit) => {
        console.log("UNIT=> ",  unit)
        changeLocationState({
            units: unit
        });

        getWeatherData(unit);
    }

    async function addBookmark() {
        const db = firebase.firestore();

        await db.collection('bookmarks').doc(locationData.city).set({
            city: locationData.city, 
            lat: locationData.lat,
            lon: locationData.lon
        });

        Alert.alert(
            "Saved!",
            "Bookmark saved correctly",
            [

              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
      
    }   
    console.log("location => ", locationData);

    return(
        <View style = {styles.container}>
            <LoaderModal visibleModal={loadingModal} text={'Loading...'} />

            <HomeHeader {...props}/>
            <LocationWeatherDesign locationData = {locationData} changeUnits = {changeUnits}/>

            <TouchableOpacity style = {styles.saveButton} onPress = {() => addBookmark()}>
                <Text style = {styles.saveText}> <Icon name = "bookmark" size = {20}/> Save location</Text>
            </TouchableOpacity >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 19 : 10,
      backgroundColor: "#ffffff", 
      flex: 1
    },
    imageStyle: {
        height: 150, 
        width: 150,
        marginBottom: 30
    }, 
    saveButton: {
        position: "absolute", 
        bottom: 35, 
        alignSelf: "center"
    }, 
    saveText: {
        fontWeight: "300",
        color: "black"
    }
});

const mapStateToProps = (state) => {
    return {
        locationData: state.locationData,
    }
}

const mapDispatchToProps = dispatch => ({
    changeLocationState: (object) => dispatch(changeLocationState(object)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
