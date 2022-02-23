import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import tailwind from "twrnc";
import * as Location from 'expo-location';

//Database imports
import { app } from '../config'
import { doc, setDoc, getFirestore } from 'firebase/firestore'

export default function Create({ navigation }) {
    //Titel bijhouden
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const [location, setLocation] = useState(null);

    //Location permissie opvragen
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Locatie permissie niet toegestaan, verander in de instellingen');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location)
            getUserAddress(location)
        })();
    }, []);

    async function getUserAddress(location) {
        const address = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude })
        const street = address[0].street
        setAddress(street)
    }

    //Database aanhalen
    const DB = getFirestore(app)

    function CreateItem() {
        //Collectie aanhalen
        const docRef = doc(DB, "Bezienswaardigheden", name)

        //Data van input fields in een object
        const data = {
            "name": name,
            "description": description,
            "location": location
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
    return (
        <View>
            <Text style={tailwind`text-center mt-4`} >Naam Bezienswaardigheid</Text>
            <TextInput style={tailwind`border m-4 rounded p-2`} onChangeText={(text) => setName(text)}></TextInput>

            <Text style={tailwind`text-center mt-4 `} >Beschrijving Bezienswaardigheid</Text>
            <TextInput style={tailwind`border rounded m-4 p-2`} onChangeText={(text) => setDescription(text)}></TextInput>

            {address != null
                ? <Text style={tailwind`text-center`} >Current location:
                    <Text style={tailwind`font-bold`} > {address}</Text>
                </Text>
                : <Text style={tailwind`text-red-600 font-bold text-center`} >{errorMsg}</Text>
            }

            <View style={tailwind`bg-green-500 shadow-lg m-4 rounded`}>
                <Button title="Aanmaken" color="white" onPress={() => CreateItem()} disabled={errorMsg === null ? false : true} />
            </View>
        </View>
    )
}