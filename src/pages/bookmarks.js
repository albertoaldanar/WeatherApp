import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image, ScrollView } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';

function Bookmarks(props) {

        console.log("propssss", props);

        return(
            <View style = {styles.container}>
                <View style = {styles.header}>
                    {/* <TouchableOpacity style = {{margin: 25, marginLeft: 15, marginBottom: 0, fontSize: 18, fontWeight: "700"}} onPress = {()  => props.navigation.goBack()}>
                        <Icon name= "arrow-left" size= {18} color =  "gray"/>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{margin: 25, marginRight: 15, marginBottom: 0, fontSize: 18, fontWeight: "700"}} >
                        <Icon name= "ellipsis-h" size= {18} color =  "gray"/>
                    </TouchableOpacity> */}
                </View>

                <View style = {{flexDirection: "row", marginTop: 20, marginBottom: 10}}>
                    
                    <View>
                        <Text style = {styles.userName}>albertoaldana</Text>
                        <TouchableOpacity>
                            <Text style = {{color: "#339afe", fontSize: 13, marginTop: 2}}>Ver perfil</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style = {{marginTop: 25}}>
                    <View style = {{flexDirection: "row", marginLeft: 10}}>
                        
                        <Text style = {{color: "gray", marginLeft: 7, marginTop: -1}}>Solicitud:</Text>
                    </View>
                    
                    <Text style = {{ marginLeft: 35, margin: 5}}>Llamada</Text>
                </View>

                <View style = {{marginTop: 25}}>
                    <View style = {{flexDirection: "row", marginLeft: 10}}>
                        
                        <Text style = {{color: "gray", marginLeft: 7, marginTop: -1}}>Tiempo aporximado:</Text>
                    </View>
                    
                    <Text style = {{ marginLeft: 35, margin: 5}}>40 min.</Text>
                </View>

                <View style = {{marginTop: 25}}>
                    <View style = {{flexDirection: "row", marginLeft: 10}}>
                  
                        <Text style = {{color: "gray", marginLeft: 7, marginTop: -1}}>Asunto:</Text>
                    </View>
                    
                    <Text style = {{ marginLeft: 35, margin: 5}}>gergergerge</Text>
                </View>

                <View style = {{marginTop: 25}}>
                    <View style = {{flexDirection: "row", marginLeft: 10}}>
                        
                        <Text style = {{color: "gray", marginLeft: 7, marginTop: -1}}>Fecha y hora:</Text>
                    </View>
                    
                    <Text style = {{ marginLeft: 35, margin: 5}}>gergerg</Text>
                </View>

                <TouchableOpacity style = {{position: "absolute", bottom: 5, left: 5, right: 5, padding: 10, backgroundColor: "#03b388", borderRadius: 5}}>
                    <Text style = {{color: "white", textAlign: "center", fontSize: 16}}>Aceptar</Text>
                </TouchableOpacity>
               
            </View>
        );
}

const styles = StyleSheet.create({
    container: {

      backgroundColor: "white", 
      height: "100%"
    },
    header: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 3,
        backgroundColor: "white",
        flexDirection: "row", justifyContent: "space-between", 
        paddingTop: Platform.OS == "android" ? 0 : 15,
        paddingBottom: 15

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

export default Bookmarks;
