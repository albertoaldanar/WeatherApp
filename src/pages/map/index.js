
import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, FlatList, Modal, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE,  Marker, Polyline} from 'react-native-maps';
import { Icon } from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
//local imports
// import API from '../../apis/weather/weatherApi';

function Map(props) {

        const [cities, setCities] = useState([]);
        const { locationData } = props;

        const [region, setRegion] = useState({
            latitude: locationData.deviceLat,
            longitude: locationData.deviceLon,
            latitudeDelta: 10.9,
            longitudeDelta: 10.9 
        }); 

        async function getCitiesList(reg){
            console.log("log > ", reg);
            const { latitude, longitude, longitudeDelta } = reg;

            const tileZoom = (Math.log2(360 * (Dimensions.get("window").width / 256 / longitudeDelta)) + 1).toFixed()

            const tileY = ( Math.floor( (longitude + 180) / 360 * Math.pow(2, tileZoom)) ); 
            const tileX = (Math.floor((1-Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI/180)) / Math.PI) / 2 * Math.pow(2,tileZoom))); 

            console.log("X & Y  => ", tileY, tileX, tileZoom);

            try {

                const data = {
                    zoom: tileZoom, 
                    x: tileY, 
                    y: tileX
                }

                const weatherResponse = await API.mapData(data);
    
                console.log('weather response =>', weatherResponse);

                if (weatherResponse.features) {
                    console.log("success")
                    
                    setCities(weatherResponse.features)
                } else {
                    alert("error")
                    console.log("error!")
                }
              
            } catch (err) {
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

        console.log("cities =>", cities);
        return(
            <View style = {styles.container}>
                <TouchableOpacity style = {{zIndex: 10, padding: 20}}onPress = {() => props.navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>

                <MapView
                    showsUserLocation
                    style={ styles.map}
                    initialRegion={region}
                    onRegionChangeComplete = {region => getCitiesList(region)}
                >

                    {
                        cities.map(city => (

                            
                                <Marker
                                    onCalloutPress = {() => props.navigation.navigate("CityDescription", { 
                                        data: { 
                                            lat: city.geometry.coordinates[1], 
                                            lon: city.geometry.coordinates[0], 
                                            city: city.properties.city + ", " + city.properties.country 
                                        } 
                                    })}
                                    coordinate={{
                                        latitude: city.geometry.coordinates[1],
                                        longitude: city.geometry.coordinates[0]
                                    }}
                                    pinColor = "red"
                                    title={city.properties.city + ", " + city.properties.country + ":  " + city.properties.temp + "º" }
                                />
                        
                        ))
                    }
                </MapView>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {

      backgroundColor: "white", 
      height: "100%"
    },
    imageStyle: {
        height: 40, 
        width: 40,
        marginBottom: 9
    }, 
    listItemContainer: {
        margin: 10, 
        padding: 10, 
        borderRadius: 5, 
        borderColor: "gray",
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 3,
    }, 
    button: {
         padding: 7, backgroundColor: "#03b388", borderRadius: 5,
         paddingLeft: 20, 
         paddingRight: 20,

    }, 
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

});

const mapStateToProps = (state) => {
    return {
        locationData: state.locationData
    }
}

export default connect(mapStateToProps)(Map);
