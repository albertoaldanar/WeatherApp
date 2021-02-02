import React, {useState} from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from "react-native";

function CityDescription(props) {

        return(
            <View>
                <View                     
                    style = {{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        marginTop: "25%"
                    }}
                >
                    <Text style = {{fontSize: 18, fontWeight: "600", marginBottom: 7}}>¡Aún no tienes ninguna cita agendada!</Text>
                    <Text style = {{fontSize: 14, fontWeight: "400", paddingLeft: 10, paddingRight: 10, color: "gray"}}>Para agendar una cita envia una solicitud a un consultor</Text>
                </View>

            </View>
        );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 150, 
        width: 150,
        marginBottom: 30
    }, 
});

export default CityDescription;



