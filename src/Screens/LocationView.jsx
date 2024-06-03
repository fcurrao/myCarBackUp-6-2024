import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import AddButton from "../Components/AddButton";
import { usePostUserLocationMutation } from "../Services/shopServices";
import { useGetUserLocationQuery } from "../Services/shopServices";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../features/User/userSlice";
import { colors } from "../Global/Colors";
import MapPreview from "../Components/MapPreview";
import { google_maps_api_key } from "../Database/firebaseConfig";
import { useRoute } from '@react-navigation/native';

const LocationView = ({ navigation}) => {

    const route = useRoute();
    const { location } = route.params;

    const [error, setError] = useState("");
 
    const [data, setData] = useState(null);
    const [locationByMap, setLocationByMap] = useState(null);

    const { localId } = useSelector(state => state.userReducer.value)
    const { data:  dataLocation } = useGetUserLocationQuery(localId)
    const [triggerPostAddress, result] = usePostUserLocationMutation();


 
    const goBack = () => {
        navigation.goBack()
    }


    useEffect(() => {

        console.log("aca esta : dataLocation? ----- ", location)
        // console.log("aca")
        // console.log(location)
        // console.log(dataLocation.inputtextoa)
        // console.log("aca 2 ",dataLocation)
        // console.log(localId)


    }, []);


    //Reverse geocoding
    useEffect(() => { 
        (async () => {
            try {
                if (location.latitude) { 
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${google_maps_api_key}`;
                    const response = await fetch(url_reverse_geocode);
                    const data = await response.json(); 
                    // setAddress(data.results[0].formatted_address);
                    // console.log("ASDASDASDASD", data.result[0])
                    // setData(data.results[0]) 
                    // const obje= {latitud: data.results[0].lat, longitude: data.results[0].lng}
                    // setDataLocation2(obje) 
                    // console.log("asdasdasdasda", dataLocation)
                }
            } catch (error) {
                setError(error.message);
            }
        })();
    }, [dataLocation]);

    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >Mi Ubicacion Guardada!</Text>
            {/* Flatlist con las directions */}
            {location ? (
                <>
                    <Text
                        style={styles.address}
                    >Lat: {location.latitude}, long: {location.longitude}.
                    </Text>
                    <MapPreview location={location} />
                    <Text style={styles.text}>
                         {location.address}
                    </Text>
                    <Text style={styles.address}>
                        {location == undefined   || location.inputtextoa == undefined  ? (<>
                        Comentario: {location.inputtextoa}</>) : (<>  Comentario: {location.inputtextoa} </>)}
                        
                    </Text>
                    <Text style={styles.address}>
                    {location == undefined   || location.inputtextob == undefined  ? (<>
                        Comentario: {location.inputtextob}</>) : (<>  Comentario: {location.inputtextob} </>)}
                    </Text>
                    <AddButton
                        onPress={goBack}
                        title="Volver"
                    />
                </>
            ) : (
                <>
                    <View style={styles.noLocationContainer}>
                        <Text>{error}Error</Text>
                    </View>
                </>
            )}
        </View>
    );
};

export default LocationView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    text: {
        paddingTop: 20,
        fontFamily: 'Josefin',
        fontSize: 18
    },
    noLocationContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.peach,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    address: {
        padding: 10,
        // fontFamily: "Ubuntu",
        fontSize: 16,
    },
});