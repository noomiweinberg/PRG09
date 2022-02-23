import React from "react";
import { View, Text, Button } from "react-native";
import tailwind from "twrnc";

import { app } from '../config'
import { doc,deleteDoc, getFirestore } from 'firebase/firestore'

export default function Item({id, name, description, nav}) {

    const DB = getFirestore(app)

    function DeleteItem() {
             //Collectie aanhalen van ID
             const docRef = doc(DB, "Bezienswaardigheden", id)

             deleteDoc(docRef)
                 .then(() => {
                     alert("Bezienwaardigheid verwijderd")
                 }).catch((e) => {
                     alert(e.message)
                 })
    }

    return(
        <View style={tailwind`m-6 text-center`}>
            <Text style={tailwind`ml-auto mr-auto`} >Naam:</Text>
            <Text style={tailwind`text-center`}>{name}</Text>
            <Text style={tailwind`ml-auto mr-auto mt-4`} >Omschrijving:</Text>
            <Text style={tailwind`text-center`}>{description}</Text>
            <Button title="Aanpassen" onPress={() => {nav.navigate('Edit', {name: name, description: description, id: id})}} />
            <Button title="Delete"  onPress={() => DeleteItem()}/>
        </View>
    )
}