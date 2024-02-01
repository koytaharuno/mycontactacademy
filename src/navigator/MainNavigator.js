import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContactListScreen from "../screens/ContactListScreen";
import AddContactScreen from "../screens/AddContactScreen";

const stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name="ContactListScreen" component={ContactListScreen} options={{ title: "Contact List" }} />
                <stack.Screen name="AddContactScreen" component={AddContactScreen} options={{ title: "Add Contact" }} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;