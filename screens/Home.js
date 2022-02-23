import React from "react";
import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tailwind from "twrnc";
import List from "../components/List";


export default function Home({navigation}) {
    return(
        <View style={tailwind`mt-4`} >
            <Button title="Monument aanmaken" onPress={() => navigation.navigate('Create')}/>
            <List nav={navigation} />
        </View>
    )
}
