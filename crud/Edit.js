import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import tailwind from "twrnc";

//Database imports
import { app } from '../config'
import { doc,setDoc, getFirestore } from 'firebase/firestore'

export default function Edit({navigation}) {
    //Titel bijhouden
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const oldName = navigation.state.params.name
    const oldDescription = navigation.state.params.description
    const id = navigation.state.params.id

    //Database aanhalen
    const DB = getFirestore(app)
    
    function CreateItem() {
        const docRef = doc(DB, "Bezienswaardigheden", id)

        const data = {
            "name": name,
            "description": description
        }

        setDoc(docRef, data, { merge: data })
            .then(() => {
                alert("Bezienswaardigheid aangepast")
                navigation.navigate('Home')
            }).catch((err) => {
                alert(err.message)
            })

    } 
    return(
        <View>
            <Text style={tailwind`text-center mt-4`} >Naam Bezienswaardigheid</Text>
            <TextInput style={tailwind`border m-4 rounded p-2`} onChangeText={(text) => setName(text)} placeholder={oldName} ></TextInput>

            <Text style={tailwind`text-center mt-4 `} >Beschrijving Bezienswaardigheid</Text>
            <TextInput style={tailwind`border rounded m-4 p-2`} onChangeText={(text) => setDescription(text)} placeholder={oldDescription}></TextInput>
            
            <View style={tailwind`bg-green-500 shadow-lg m-4 rounded`}>
                <Button title="Aanmaken" color="white" onPress={() => CreateItem()}/>
            </View>
        </View>
    )
}