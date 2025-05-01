import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';

const WebFooter = () => {

    return (
        // Footer
        <View style={styles.footer} >
            <View style={styles.footerImageContainer}>
                <View>
                    <Image source={require("../assets/images/Habitude-Footer-Logo.png")} style={styles.footerImage} />
                </View>
                <View style={styles.verticalLine}></View>
                <View>
                    <Image source={require("../assets/images/CSUMB-COS-Logo.png")} style={styles.footerImage} />
                </View>
            </View>
            <View>
                <Text style={styles.footerText}>
                    2025 Habitude | Rull Mendez, Jayson Basilio, Dalia Cabrera Hurtado, Miguel Gonzalez, Justin Ho
                </Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#DFE7F6",
        paddingVertical: 18,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
    },
    footerImageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    footerImage: {
        width: 150,
        height: "0%",
        aspectRatio: 3,
        marginHorizontal: 25,
        resizeMode: "contain",
    },
    verticalLine: {
        height: "85%",
        width: 1,
        backgroundColor: "#093254",
    },
    footerText: {
        color: "#093254",
        fontSize: 14,
        marginBottom: 5,
        textAlign: "center",
        justifyContent: "center",
        fontFamily: "Arial",
    },
});

export default WebFooter;