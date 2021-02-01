import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function BookmarksList(props) {

    const renderBookmark = ({ item }) => (
        <View>
            <View>
                <Text style = {{color: "#f83e3d"}}>{item.city}</Text>
                <Text style = {{color: "green"}}>{item.temp}</Text>
            </View>
            
        </View>
    );

    return(
        <View style = {styles.container}>

            <FlatList 
                data= {props.bookmarks}
                renderItem = {renderBookmark}
                keyExtractor = {item => item.temp}
            />
               
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

      backgroundColor: "white", 
      height: "100%"
    },
    userName: {
        fontSize: 20,
        fontWeight: "500", 
        marginTop: 3
    },
    closeText: {
        margin: 25, marginLeft: 10, 
        marginBottom: 0, fontSize: 18, 
        fontWeight: "700"
    },
    imageStyle: {
        height: 50, 
        width: 50,
        marginRight: 15,
        marginLeft: 10
    }, 
    button: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 3,
        position: "absolute", bottom: 5, left: 5, right: 5, padding: 15, backgroundColor: "#03b388", borderRadius: 5
    }

});

export default BookmarksList;
