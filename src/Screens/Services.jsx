import { StyleSheet, Pressable, FlatList, TextInput, Clipboard, Platform, ScrollView, Alert, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../Global/Colors";
import { Picker } from '@react-native-picker/picker';
import AddButton from "../Components/AddButton";
import ListServices from "./ListServices";
import { setUserServices } from "../features/User/userSlice";
import { useGetServicesQuery, useLazyGetServicesQuery, usePostServicesMutation } from "../Services/shopServices";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, Entypo, MaterialCommunityIcons, AntDesign, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Services = ({ navigation }) => {
    const { location, localId } = useSelector((state) => state.userReducer.value);

    const [getServices, { data: services }] = useLazyGetServicesQuery();
    const [selectedValue, setSelectedValue] = useState("taller");
    const [id, setId] = useState('');
    const [arrayToShow, setArrayToShow] = useState([]);
    const [resetComponent, setResetComponent] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [triggerPostServices, result] = usePostServicesMutation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchServices()
    }, []);

    useEffect(() => {
        // let dateString = new Date().toISOString(); // Llama a toISOString() para obtener la cadena de fecha
        // setDate(dateString);
        fetchServices()
        if (services) {
            setArrayToShow(services);

        }
    }, [services, resetComponent]);

    const fetchServices = () => {
        getServices(localId);
    };


    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            setShow(Platform.OS === 'ios');
            setDate(selectedDate);
        }
    };



    const showDatepicker = () => {
        setShow(true);
    };

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


    const addService = async () => {
        if (id !== "" && titulo !== "" && descripcion !== "") {
            let kmIgualId =  arrayToShow.map(eachItem => {
                console.log("alsdjlaksdjlsajdlaskdj", id)
                console.log("alsdjlaksdjlsajdlaskdj", eachItem.id)
                if (eachItem.id === id) {
                    return true;
                } else {
                    console.log("asdlaskjda ACA CA CAC AC A")
                    return false;
                }
            })
            const hasTrue = kmIgualId.some(value => value === true); 
            if (hasTrue) {
                showAlert('Error', "ya tiene datos con esos kilometros (cambie el kilomentraje)", false, true);
            } else {

                const formatDate = date.toISOString().split('T')[0]; // Convertir la fecha a una cadena en formato ISO 8601
                console.log("text", id, titulo, descripcion, selectedValue, formatDate)
                const newService = { id, titulo, descripcion, selectedValue, formatDate }; // Usar la fecha formateada
                clearInputs();
                showAlert('Servicio Agregado...', "", false, false);

                const updatedArray = [...arrayToShow, newService];
                setArrayToShow(updatedArray);

                // Update services in Firebase
                await triggerPostServices({ services: updatedArray, localId });

                // Dispatch the updated services array to Redux
                dispatch(setUserServices(updatedArray));

                console.log("Updated Array:", updatedArray);
                console.log("Services:", services);

                setResetComponent(!resetComponent);
            }
        } else {
            showAlert('Error', "Tiene que completar todos los campos", false, true);
        }
    };



    const clearInputs = () => {
        setId('');
        setTitulo('');
        setDescripcion('');
        setResetComponent(!resetComponent);
    };

    return (
        <View>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.text}>Services</Text>
                    <TextInput
                        id='km'
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={setId}
                        value={id}
                        placeholder="Kilometraje"
                    />
                    <TextInput
                        id='tit'
                        style={styles.input}
                        onChangeText={setTitulo}
                        value={titulo}
                        placeholder="Dinero O Titulo"
                    />
                    <TextInput
                        id='descript'
                        style={styles.input}
                        onChangeText={setDescripcion}
                        value={descripcion}
                        placeholder="Descripcion"
                    />
                    <Pressable style={styles.input} onPress={showDatepicker} title="Seleccionar Fecha" >
                        <Text>Fecha: {date.toLocaleDateString()}</Text>
                    </Pressable>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="calendar"
                            onChange={onChangeDate}
                        />
                    )}
                    <View style={styles.flex}>
                        <Picker
                            selectedValue={selectedValue}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item style={styles.selectedValue} label="services completo" value="services completo" />
                            <Picker.Item style={styles.selectedValue} label="taller" value="taller" />
                            <Picker.Item style={styles.selectedValue} label="services otros" value="services otros" />
                            <Picker.Item style={styles.selectedValue} label="electricidad" value="electricidad" />
                            <Picker.Item style={styles.selectedValue} label="bateria" value="bateria" />
                            <Picker.Item style={styles.selectedValue} label="neumaticos" value="neumaticos" />
                        </Picker>
                        <View style={styles.containerButton}>
                            <Pressable style={styles.button} onPress={addService} title="Agregar">
                                <AntDesign name="check" size={22} color={colors.colorgris} />
                                <Text style={styles.textb2}>AGREGAR</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={clearInputs} title="Borrar">
                                <AntDesign name="close" size={22} color={colors.colorgris} />
                                <Text style={styles.textb2}>BORRAR</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                <Text style={styles.raya}></Text>
                <Text style={styles.raya}></Text>
            </View>
            <View>

                <ListServices style={styles.allw} arrayToShow={arrayToShow}  setResetComponent={setResetComponent} resetComponent={resetComponent} setArrayToShow={setArrayToShow} localId={localId} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "50%",
        backgroundColor: "lightgray",
    },
    allw: {
        width: "100%",
        backgroundColor: "red"
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 195,
    },
    selectedValue: {
        fontSize: 18,
        marginTop: 20,
    },
    descript: {
        fontSize: 18,
    },
    containerButton: {
        display: 'flex',
        flexDirection: 'row',
        width: '38%',
        justifyContent: 'center'
    },
    flatlist: {
        backgroundColor: "white",
        height: '50%',
    },
    raya: {
        borderWidth: 0.1,
        backgroundColor: "black",
        borderRadius: 1,
        marginBottom: 1,
        height: "1%",
        width: "100%"
    },
    wrapper: {
        paddingHorizontal: 5,
        gap: 10,
    },
    espacio: {
        marginBottom: 1,
        width: "100%"
    },
    text: {
        paddingVertical: 20,
        fontFamily: 'Josefin',
        fontSize: 18
    },
    card: {
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
    },
    input: {
        height: 40,
        width: 220,
        margin: 4,
        borderWidth: 1,
        padding: 10,
    },
    pressable: {
        margin: 2,
        padding: 5,
        borderWidth: 1,
        borderRadius: 8,
    },
    flex: {
        fontSize: 22,
        display: "flex",
        flexDirection: "row"
    },
    sValues: {
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center"
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    serviceItem: {
        marginVertical: 10,
    },
});

export default Services;
