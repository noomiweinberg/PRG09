import React from "react";
import { View, Button } from "react-native";
import tailwind from "twrnc";

//Database imports
import { app } from '../config'
import { doc,deleteDoc, getFirestore } from 'firebase/firestore'

export default function DeleteItem({ id }) {
    const Delete = () => {
        //Collectie aanhalen
        const docRef = doc(DB, "Bezienswaardigheden", id)

    deleteDoc(docRef)
        .then(() => {
            alert("Bezienwaardigheid verwijderd")
        }).catch((e) => {
            alert(e.message)
        })
    }
    return (
        <View style={tailwind`bg-red-500 shadow-lg m-4 rounded`}>
            <Button title="Verwijder" color="white" onPress={() => Delete()}/>
        </View>
    )
}