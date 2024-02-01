import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import realm from "../../store/realm";

const AddContactScreen = (props) => {
    const { navigation } = props

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const saveContact = () => {
        if (name !== "" && phoneNumber !== "") {
            realm.write(() => {
                const data = realm.objects("Contact");
                const lastId = data.length === 0 ? 1 : data[data.length - 1].id;
                realm.create("Contact", {
                    id: data.length === 0 ? 1 : lastId + 1,
                    name: name,
                    phoneNumber: phoneNumber
                });
            })
            navigation.navigate("ContactListScreen");
        } else {
            Alert.alert("Warning", "Name and phone number must be filled");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Name</Text>
            <TextInput style={styles.input} placeholder="Write name here" onChangeText={(text) => setName(text)}></TextInput>
            <Text style={styles.title}>Phone Number</Text>
            <TextInput style={styles.input} placeholder="Write phone number here" onChangeText={(text) => setPhoneNumber(text)}></TextInput>
            <View style={styles.saveContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={() => saveContact()}>
                    <Text style={styles.saveTitle}>SAVE CONTACT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        marginBottom: 16
    },
    title: {
        marginBottom: 8,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 16
    },
    saveContainer: {
        alignItems: "center",
        margin: 16
    },
    saveButton: {
        backgroundColor: "#B7F1D4",
        padding: 16,
        borderRadius: 10
    },
    saveTitle: {
        fontWeight: "bold"
    }
})

export default AddContactScreen;