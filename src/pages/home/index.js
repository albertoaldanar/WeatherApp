import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
//local imports
import API from '../../apis/weather/weatherApi';
import HomeHeader from '../home/designComponents/homeHeader';
import LocationWeatherDesign from '../home/designComponents/locationWeatherDesign';
import changeLocationState from '../../redux/actions/locationDataActions';
import LoaderModal from '../../utils/modalLoader';

function Home(props) {

    const [loadingModal, setLoadingModal] = useState(false);
    const  { locationData, changeLocationState } = props;

    async function getWeatherData() {
        setLoadingModal(true);

        try {
            const { locationData, changeLocationState } = props;

            const weatherResponse = await API.getLocationData(locationData);

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
        changeLocationState({
            units: unit
        });

        // getWeatherData();
    }
    
    return(
        <View style = {styles.container}>
            <LoaderModal visibleModal={loadingModal} text={'Loading...'} />

            <HomeHeader {...props}/>
            <LocationWeatherDesign locationData = {locationData} changeUnits = {() => changeUnits}/>
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
