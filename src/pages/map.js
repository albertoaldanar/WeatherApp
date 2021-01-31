import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, FlatList, Modal } from "react-native";


function Map(props) {

        const [showDescription, setShowDescription] = useState(false);
        const [appointmentSelected, setAppointmentSelected] = useState({});
    
        return(
            <View style = {styles.container}>

                <Text>MAP</Text>
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

    }

});

export default Map;



