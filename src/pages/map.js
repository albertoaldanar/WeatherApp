import React, {useState} from "react";
import { useReducer } from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, FlatList, Modal } from "react-native";
import MapView, { PROVIDER_GOOGLE,  Marker, Polyline} from 'react-native-maps';

function Map(props) {

        const [showDescription, setShowDescription] = useState(false);
        const [appointmentSelected, setAppointmentSelected] = useState({});
        const region = {
            latitude: 24.80664999917974,
            longitude: -107.3964986262915,
            latitudeDelta: 0.16251275933643683,
            longitudeDelta: 0.10970118399998796
        }

        return(
            <View style = {styles.container}>

            <MapView
                showsUserLocation
                style={ styles.map}
                initialRegion={region}
            />
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

export default Map;



