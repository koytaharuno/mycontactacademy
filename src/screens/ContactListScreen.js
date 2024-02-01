import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import realm from "../../store/realm";

const ContactListScreen = (props) => {
    const { navigation } = props
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = navigation.addListener("focus", () => {
            const data = realm.objects("Contact");
            setData(data);
        })
        return getData
    }, [])

    const deleteContact = (id) => {
        const data = realm.objects("Contact").filtered(`id=${id}`);
        realm.write(() => {
            realm.delete(data);
        })
        const collectData = realm.objects("Contact");
        setData(collectData);
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                contentContainerStyle={styles.flatlistContainer}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.mainDataContact}>
                            <View>
                                <Text style={styles.nameContact}>{item.name}</Text>
                                <Text style={styles.phoneNumberContact}>{item.phoneNumber}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteContact(item.id)}>
                                <Icon name="cross" type="entypo" />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddContactScreen")}>
                    <Icon name="plus" type="entypo" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    mainDataContact: {
        margin: 8,
        padding: 16,
        backgroundColor: "white",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    nameContact: {
        fontSize: 20,
        fontWeight: "bold"
    },
    phoneNumberContact: {
        fontSize: 18
    },
    buttonContainer: {
        position: "absolute",
        bottom: 16,
        right: 16
    },
    addButton: {
        backgroundColor: "#B7F1D4",
        padding: 16,
        borderRadius: 100
    }
})

export default ContactListScreen;