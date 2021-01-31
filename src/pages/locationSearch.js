import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import LocationGif from '../assets/location.gif';

function LocationSearch(props) {

        useEffect(() => {
            setTimeout(() => {
                props.navigation.navigate("Home")
            }, 5000)
        })

        console.log("props => ", props);
        return(
            <View style = {styles.container}>
                <Image source = {LocationGif} style = {styles.imageStyle}/>
                <Text style = {{fontStyle: "italic", textAlign: "center", fontSize: 17, color: "gray"}}>Searching your location...</Text>
            </View>
        );
}

const mapStateToProps = (state) => {
    return {
        aldel: state.aldel,
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'ios' ? 19 : 10,
      backgroundColor: "white", 
      flex: 1
    },
    imageStyle: {
        height: 400, 
        width: 400,
        marginTop: "20%"
    }, 
});

export default connect(mapStateToProps)(LocationSearch);
