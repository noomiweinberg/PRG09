import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import tailwind from "twrnc";
import List from "../components/List";


export default function Home({ navigation }) {
    return (
        <View style={tailwind`mt-4`} >
            <List nav={navigation} />
        </View>
    )
}
