import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import tailwind from "twrnc";

//Database imports
import { app } from '../config'
import { doc,setDoc, getFirestore } from 'firebase/firestore'

export default function Create({navigation}) {
    //Titel bijhouden
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    //Database aanhalen
    const DB = getFirestore(app)
    
    function CreateItem() {
        //Collectie aanhalen
        const docRef = doc(DB, "Bezienswaardigheden", name)

        //Data van input fields in een object
        const data = {
            "name": name,
            "description": description
        }

        //Naar de database schrijven
        setDoc(docRef, data)
        .then(() => {
            alert("Bezienswaardigheid aangemaakt")
            navigation.navigate('Home')
        }).catch((e) => {
            alert(e.message)
        })

    } 
    return(
        <View>
            <Text style={tailwind`text-center mt-4`} >Naam Bezienswaardigheid</Text>
            <TextInput style={tailwind`border m-4 rounded p-2`} onChangeText={(text) => setName(text)}></TextInput>

            <Text style={tailwind`text-center mt-4 `} >Beschrijving Bezienswaardigheid</Text>
            <TextInput style={tailwind`border rounded m-4 p-2`} onChangeText={(text) => setDescription(text)}></TextInput>
            
            <View style={tailwind`bg-green-500 shadow-lg m-4 rounded`}>
                <Button title="Aanmaken" color="white" onPress={() => CreateItem()}/>
            </View>
        </View>
    )
}