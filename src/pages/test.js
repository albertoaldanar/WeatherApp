
import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, FlatList, Modal, Dimensions } from "react-native";
//local imports
// import API from '../../apis/weather/weatherApi';

function Test(props) {

        const [cities, setCities] = useState([]);

        return(
            <View style = {styles.container}>
                <TouchableOpacity style = {{zIndex: 10, padding: 20}} >
                    <Text>Back</Text>
                </TouchableOpacity>
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


export default Test;
