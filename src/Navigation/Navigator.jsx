import {
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect , useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack"; 
import ListAddress from "../Screens/ListAddress";
import ListAddress2 from "../Screens/ListAddress2";
import * as Location from "expo-location";
import MyProfile from "../Screens/MyProfile";
import LocationSelector from "../Screens/LocationSelector";
import ImageSelector from "../Screens/ImageSelector";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../Global/Colors";
import {
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    AntDesign,
    FontAwesome,
    FontAwesome5,
    MaterialIcons, 

} from "@expo/vector-icons";
import OrderStack from "./OrderStack";
import AuthStack from "./AuthStack";
import { useDispatch, useSelector } from "react-redux";
import MyProfileStack from "./MyProfileStack";
import { getSession } from "../SQLite";
import { useSignInMutation } from "../Services/authServices";
import InicialStack from './InicialStack'
import { setUser } from "../features/User/userSlice";
import { deleteSession } from '../SQLite/index';
import Home from "../Screens/Home";
import { boolean } from "yup";

import { insertSession } from "../SQLite";
import { compose } from "@reduxjs/toolkit";

const Tab = createBottomTabNavigator();

const Navigator = () => {
    const userReducer = useSelector((state) => state.userReducer); 
    const { email, localId } = userReducer.value ? userReducer.value : {};  

    // const [email, setEmail] = useState(undefined)
    // const [localId, setLocalId] = useState("n8RpUdj7E2bo5ZZ334YfOs8DT673")

     const [triggerSignIn, resultSignIn] = useSignInMutation();
    const dispatch = useDispatch()

 


const withoutEmail = () => { 
    deleteSession("fEYZxGcydFP76EImhlGXgJxfV8v1")

    // setTimeout(() => {
        
    //     triggerSignIn({
        // pasarle todo completo con localID y todo !!!!!!!!!!!!!!!!!!
    //         email: "invitado@invitado.com",
    //         password: "invitado",
    //         returnSecureToken: true,
    //     });
    // }, 200);
}
 
 
        //Location requested on mount
        useEffect(() => { 
            (async () => {
                try {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== "granted") {
                        setError("Permission to access location was denied");
                        return;
                    }
    
                    let location = await Location.getCurrentPositionAsync({});
    
                } catch (error) {
                    console.log(error.message);
                    setError(error.message)
                }
            })();
        }, []);

    useEffect(() => { 
        (async () => {
            try {
                if (resultSignIn.isSuccess) {
                    //Insert session in SQLite database
                    console.log('inserting Session', resultSignIn.data.email);
                    console.log('inserting Session', resultSignIn.data.idToken);
                    console.log('inserting Session', resultSignIn.data.localId);
                    (resultSignIn.data.localId=="")? resultSignIn.data.localId="invitado" : "";
                    const response = await insertSession({
                        email: resultSignIn.data.email,
                        idToken: resultSignIn.data.idToken,
                        localId: resultSignIn.data.localId,
                    })
                    console.log('Session inserted: ');
                    console.log(response);
                    dispatch(setUser({
                        email: resultSignIn.data.email,
                        idToken: resultSignIn.data.idToken,
                        localId: resultSignIn.data.localId,
                        profileImage: "",
                        location: {
                            latitude: "",
                            longitude: "",
                        }
                    }))
                }
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [resultSignIn])

    useEffect(() => {
        (async () => {
            try {
                console.log('Getting session...');
                const session = await getSession()
                console.log('TENGO SESION =?? ', session);
                console.log('Sesion: ');
                console.log(session);
                console.log("session.rows", session[0])
                if (session[0] !== undefined) {
                    const user = session[0]
                    dispatch(setUser(user))
                } else {
                if (session) { 
                        const user = session[0]
                    dispatch(setUser(user))
                } 
                }

            } catch (error) {
                console.log('Error getting session');
                console.log(error.message);
            }
        })()
    }, [email])

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                {email!==undefined ? (
                    <Tab.Navigator
                        screenOptions={{
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarStyle: styles.tabBar,
                        }}
                    >
                         

                      <Tab.Screen
                            name="MyProfile"
                            component={MyProfileStack}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View style={styles.item}>
                                            <Ionicons
                                                name="person-circle-outline"
                                                size={
                                                    focused ? 54 : 34
                                                }
                                                color={
                                                    focused ? colors.color5 : colors.colorgris
                                                }
                                            />
                                        </View>
                                    );
                                },
                            }}
                        />

<Tab.Screen
                            name="ListAddress"
                            component={ListAddress}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View style={styles.item}>
                                           <AntDesign  
                                                name="car"
                                                size={
                                                    focused ? 54 : 34
                                                }
                                                color={
                                                    focused ? colors.color5 : colors.colorgris
                                                }
                                            />
                                        </View>
                                    );
                                },
                            }}
                        />

<Tab.Screen
                            name="ListAddress2"
                            component={ListAddress2}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View style={styles.item}>
                                           <FontAwesome5  
                                                name="motorcycle"
                                                size={
                                                    focused ? 54 : 34
                                                }
                                                color={
                                                    focused ? colors.color5 : colors.colorgris
                                                }
                                            />
                                        </View>
                                    );
                                },
                            }}
                        />




                    </Tab.Navigator>
                ) : (
                    <> 
                    <Pressable onPress={withoutEmail}  style={styles.navimportInvitado} ><Text style={styles.textInvitado}>INGRESAR SIN EMAIL</Text></Pressable>
                    <AuthStack />
                    </>
                )}
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default Navigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 5,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    textInvitado: {
        color: "white",  
        fontSize: 22,
        fontFamily: "Josefin",
        textAlign: "center"
    },
    navimportInvitado: {
        backgroundColor: "black",
        display: "flex",    
        height: "15%",
        justifyContent: "center"
    },
    tabBar: {
        backgroundColor: colors.colorblanco,
        shadowColor: "black",
        height: 60,
    },
});
