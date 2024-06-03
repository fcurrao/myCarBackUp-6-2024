import { FlatList, StyleSheet, Text, View, Pressable,Alert } from 'react-native'
import React, { useEffect, useState } from "react";
import { colors } from '../Global/Colors'
import { useSelector, useDispatch } from "react-redux";
import { setUserServices } from "../features/User/userSlice";
import { useGetServicesQuery, useLazyGetServicesQuery, usePostServicesMutation } from "../Services/shopServices";

const ListServices = ({ setArrayToShow, arrayToShow, setResetComponent , resetComponent, localId }) => {

    const [mappedServices, setMappedServices] = useState([]); 

    const [triggerPostServices, result] = usePostServicesMutation();
    const dispatch = useDispatch();

    const showAlert = (title, subtitle, statusBtnCancel, statusCancelable) => {
        if (statusBtnCancel) {
            Alert.alert(
                title,
                subtitle,
                [
                    {
                        text: 'Aceptar',
                        onPress: () => console.log('Aceptar')
                    },
                    {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancelar'),
                        style: 'cancel'
                    }
                ],
                { cancelable: statusCancelable }
            );
        } else {
            Alert.alert(
                title,
                subtitle,
                [
                    {
                        text: 'Aceptar',
                        onPress: () => console.log('Aceptar')
                    },
                ],
                { cancelable: statusCancelable }
            );
        }

    }


    useEffect(() => {
        // if( mappedServices.length !== 0 ){
        //     // setArrayToShow(mappedServices)
        // } 
        console.log("arrayToShow ***********************", arrayToShow)
        const array = [...arrayToShow]; 
        const sortedArray = array.sort((a, b) => {
            const dateA = new Date(a.formatDate);
            const dateB = new Date(b.formatDate);
            return dateB - dateA;
        })
        sortedArray.map(item => ({ ...item, formatDate: new Date(item.formatDate).toISOString().split('T')[0] }));
        setMappedServices(sortedArray);
    }, [arrayToShow])


    confirmDelete = (id) => {
      Alert.alert(
        "Desea eliminar este servicio??",
                    "",
                    [
                        {
                            text: 'Aceptar',
                            onPress: () =>  deleteServices(id),
                        },
                        {
                            text: 'Cancelar',
                            onPress: () => console.log('Cancelar'),
                            style: 'cancel'
                        }
                    ],
                    { cancelable: false }
                ); 
    }

    deleteServices = async (id) => {
        setTimeout(() => {
            setResetComponent(!resetComponent);
        }, 300);
        console.log("**$$$$$$$$$", mappedServices);
        let  selectedItemArray = mappedServices.filter(item => item.id !== id); 
        showAlert('Servicio Eliminado...', "", false, false);
        
        console.log("**$$$$$$$$$", selectedItemArray);
            
            await triggerPostServices({ services: selectedItemArray, localId });
 
            dispatch(setUserServices(selectedItemArray));
            
    }





    return (
        <View style={styles.container}>
            <FlatList
                data={mappedServices}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.wrapper}
                horizontal={false}
                style={styles.flatlist}
                renderItem={({ item }) => (
                    <>
                        <Text style={styles.descript}>
                            {item.formatDate} || {item.id} || {item.titulo} || {item.descripcion} || {item.selectedValue} ||
                            <Pressable style={styles.button} onPress={() => confirmDelete(item.id)} title="delete">
                                <Text style={styles.textb2}>X</Text>
                            </Pressable>
                        </Text>
                        <Text style={styles.raya2}>
                            -----------------------------------------------------
                        </Text>
                    </>
                )}
            />

        </View>
    )
}

export default ListServices

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgray",
        justifyContent: 'flex-start',
        alignItems: 'center'
    }, label: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 150,
    },
    selectedValue: {
        fontSize: 18,
        marginTop: 20,
    },
    descript: {
        fontSize: 18,
        padding: 0,
    }, containerButton: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    }, flatlist: {
        width: "100%",
        height: '60%',
    }, raya: {
        borderWidth: 0.1,
        backgroundColor: "black",
        // borderRadius: 1,
        // marginBottom: 1,
        height: "1%",
        width: "100%"
    }, raya2: {
        // borderWidth: 0.1,
        // backgroundColor: "black",
        // borderRadius: 1,
        // marginBottom: 1,
        // height:"1%",
        width: "100%"
    }, wrapper: {
        paddingHorizontal: 5,
        gap: 10,
    }, espacio: {
        marginBottom: 1,
        width: "100%"
    }, text: {
        paddingVertical: 20,
        fontFamily: 'Josefin',
        fontSize: 18
    }, card: {
        height: "auto",
        backgroundColor: colors.colorblanco,
        padding: 2,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    card2: {
        margin: 14,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text2: {
        paddingLeft: "45%",
        paddingVertical: 20,
        fontFamily: 'Josefin',
        fontSize: 18
    }, input: {
        height: 40,
        width: 220,
        margin: 4,
        borderWidth: 1,
        padding: 10,
    }, pressable: {
        margin: 2,
        padding: 5,
        borderWidth: 1,
        borderRadius: 8,
    }, flex: {
        display: "flex",
        flexDirection: "row"
    }, sValues: {
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center"
    },
    button: {
        textAlign: "center",
        textAlignVertical: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        padding: 10,
        margin: 10,
    }
});