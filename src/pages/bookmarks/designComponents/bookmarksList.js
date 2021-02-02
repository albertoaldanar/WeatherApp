import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function BookmarksList(props) {
    
    const renderBookmark = ({ item }) => (
        <TouchableOpacity style = {styles.cityCard} onPress = {() => props.navigation.navigate("CityDescription", {
            data: item
        })}>
            <Text style = {{fontSize: 18, fontWeight: "300"}}>{item.city}</Text>
            <Icon name ="arrow-right" size = {17} color = "gray"/>
        </TouchableOpacity>
    );

    return(
        <View style = {styles.container}>
            <Text style = {{color: "gray", margin: 15, fontSize: 17, fontWeight: "300"}}><Icon name ="bookmark" size = {17}/>  Saved Bookmarks</Text>
            <FlatList 
                data= {props.bookmarks.data}
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
    cityCard: {
        justifyContent: "space-between", 
        flexDirection: "row",
        backgroundColor: "#f5f5f5", 
        borderRadius: 10, 
        padding: 20, 
        margin: 10, 
    },
    imageStyle: {
        height: 50, 
        width: 50,
        marginRight: 15,
        marginLeft: 10
    }, 

});

export default BookmarksList;
