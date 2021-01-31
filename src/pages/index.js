import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";

function Home(props) {
        console.log("props => ", props);
        return(
            <View style = {styles.container}>
                <TouchableOpacity onPress = {() => props.navigation.navigate("Map")}>
                    <Text>HOME</Text>
                </TouchableOpacity>
            </View>
        );
}

const mapStateToProps = (state) => {
    return {
        locationData: state.locationData,
    }
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

export default connect(mapStateToProps)(Home);
